<script>
    /*
        attributes is an array of attributes that need to be stored.
     */


    import {storable} from "./stores.js";
    import {writable} from "svelte/store";

    // let attributes = storable('attributes', []);
    let attributes = writable([]);
    try {
        attributes.set([
            {name: 'status', type: 'bool', category: 'single', size: 1, null_termination: false},
            {name: 'data', type: 'uint8_t', category: 'FLA', size: 10, null_termination: false},
            {name: 'floats', type: 'float', category: 'VLA', size: 0, null_termination: false},
            {name: 'name', type: 'char', category: 'VLA', size: 0, null_termination: true}
        ]);
    } catch (e) {

    }
    let remove = (i) => {
        attributes.update(a => {
            a.splice(i, 1);
            return a;
        });
    }

    let add = () => {
        attributes.update(a => {
            // fixed can be true, 'array' or 'string'
            //Element example: bool status;
            //Element example: uint8_t data[10];
            //Element example: string data;
            //The category can be 'VLA', 'FLA', 'single';
            a.push({name: '', type: '', category: 'single', size: 1, null_termination: false});
            return a;
        });
    }

    let types = {
        'uint8_t': 1,
        'uint16_t': 2,
        'uint32_t': 4,
        'uint64_t': 8,
        'int8_t': 1,
        'int16_t': 2,
        'int32_t': 4,
        'int64_t': 8,
        'float': 4,
        'char': 1,
        'bool': 1
    }

    let protocolName = 'BMSData';

    function update() {
        const size = getSize($attributes);
        const fixedSize = typeof size !== 'string';
        let unionName = `${protocolName}Type`;
        let structName = `${protocolName}PayloadType`;

        structStr = `typedef struct {\n`;
        $attributes.forEach(attr => {
            structStr += `\t${getDeclaration(attr)}\n`;
        });
        structStr += `} ${structName};`;
        //if a fixed size, we should create a union with a struct, and an uint8_t[size] array.
        if (fixedSize) {
            structStr += '\n\n\/\/This is a union that allows you to access the payload as a struct, or as a raw array.'
            structStr += `\ntypedef union ${protocolName}_unused_union_typedef {\n\t${structName} p;\n\tuint8_t raw_data[${size}];\n} ${unionName};`;
        }

        buildStr = '\/\/This is code that will be used to send the payload once a struct as been created.\n'
        //     we have two options - the code does not include variable length arrays, or it does.
        if (fixedSize) {
            //If it is a fixed size, the user just needs to create a struct, set the payload
            buildStr += `//To send data, create a buffer by creating an instance of ${unionName}.\n//Ex: In a function:`
            buildStr += `\n${unionName} my${protocolName};\n//Then set the payload...\n`;
            for (const attribute of $attributes) {
                buildStr += `my${protocolName}.p.${attribute.name} = ${getDummyValues(attribute)}//Set it correctly here...\n`;
            }
            buildStr += `//Then send the data:\n`;
            buildStr += 'for(size_t i = 0; i < sizeof(myBMSData); i++){\n\t';
            buildStr += 'send(myBMSData.raw_data[i]);\n}\n';

        } else {
            //if it is not a fixed size, then we need to create a function that will build the data.
            //The following function will take a pointer to the struct, and a pointer to the buffer.
            buildStr += `//To send data, create an instance of ${structName} and a suitable sized buffer.\n`
            buildStr += `size_t ${protocolName}_build(${structName} *payload, uint8_t *buffer) {\n\tuint8_t *ptr = buffer;\n`;
            $attributes.forEach(attr => {
                buildStr += `\t//Loading ${attr.category} attribute: ${attr.name}\n`;
                if (attr.category === 'single') {
                    buildStr += `\tmemcpy(ptr, &payload->${attr.name}, sizeof(${attr.type}));\n\t`;
                    buildStr += `ptr += sizeof(${attr.type});\n`;
                } else if (attr.category === 'FLA') {
                    buildStr += `\tmemcpy(ptr, payload->${attr.name}, sizeof(${attr.type}) * ${attr.size});\n\t`;
                    buildStr += `ptr += sizeof(${attr.type}) * ${attr.size};\n`;
                } else if (attr.category === 'VLA') {
                    if (attr.null_termination) {
                        // loop through the array until we find a null termination.
                        buildStr += `\tfor(size_t i = 0;; i++) {\n`;
                        buildStr += `\t\tmemcpy(ptr, &payload->${attr.name}[i], sizeof(${attr.type}));\n`;
                        buildStr += `\t\tptr += sizeof(${attr.type});\n`;
                        buildStr += `\t\tif(payload->${attr.name}[i] == NULL) {\n\t\t\tbreak;\n\t\t}\n`;
                        buildStr += '\t}\n';
                    } else {
                        //Since the size of the array is known at runtime, make the first element the size.
                        buildStr += `\tmemcpy(ptr, &payload->${attr.name}_size, sizeof(size_t));\n`;
                        buildStr += `\tptr += sizeof(size_t);\n`;
                        buildStr += `\tmemcpy(ptr, payload->${attr.name}, sizeof(${attr.type}) * payload->${attr.name}_size);\n\t`;
                        buildStr += `ptr += sizeof(${attr.type}) * payload->${attr.name}_size;\n`;
                    }
                }
            });
            buildStr += '\treturn ptr - buffer;\n';
            buildStr += '}';
        }

        //Now we need to create a function that will parse the data.
        readStr = '\/\/This is code that will be used to parse the payload once a struct as been created.\n'
        //     we have two options - the code does not include variable length arrays, or it does.
        if (fixedSize) {
            //If it is a fixed size, the user just needs to create a struct, set the payload
            readStr += `//To read data, create a buffer by creating an instance of ${unionName}.\n//Ex: In a function:`
            readStr += `\n${unionName} my${protocolName};\n//Then read the data:\n`;
            readStr += 'for(size_t i = 0; i < sizeof(myBMSData); i++){\n\t';
            readStr += 'myBMSData.raw_data[i] = read();\n}\n';
            readStr += `//Then access the payload...\n`;
            for (const attribute of $attributes) {
                readStr += `print(my${protocolName}.p.${attribute.name});\n`;
            }
        } else {
            //if it is not a fixed size, then we need to create a function that will build the data.
            //The following function will take a pointer to the struct, and a pointer to the buffer.
            readStr += `//To read data, create an instance of ${structName} and load the data into a suitable sized buffer.\n`
            readStr += `void ${protocolName}_read(${structName} *payload, uint8_t *buffer) {\n\tuint8_t *ptr = buffer;\n`;
            let countVariableCreated = false;
            $attributes.forEach(attr => {
                readStr += `\t//Loading ${attr.category} attribute: ${attr.name}\n`;
                if (attr.category === 'single') {
                    readStr += `\tmemcpy(&payload->${attr.name}, ptr, sizeof(${attr.type}));\n\t`;
                    readStr += `ptr += sizeof(${attr.type});\n`;
                } else if (attr.category === 'FLA') {
                    readStr += `\tmemcpy(payload->${attr.name}, ptr, sizeof(${attr.type}) * ${attr.size});\n\t`;
                    readStr += `ptr += sizeof(${attr.type}) * ${attr.size};\n`;
                } else if (attr.category === 'VLA') {
                    if (attr.null_termination) {
                        //First, find the size of the array.
                        if (!countVariableCreated) {
                            countVariableCreated = true;
                            readStr += `\tuint16_t attribute_length_count = 0;\n`;
                        }
                        readStr += `\tattribute_length_count = 0;\n`;
                        //While ptr+${attr.name}_size (cast to a pointer of the correct type and dereferenced) is not null, increment ${attr.name}_size
                        readStr += `\twhile(*((char*) ptr + attribute_length_count) != NULL) {\n`;
                        readStr += `\t\tattribute_length_count++;\n`;
                        readStr += '\t}\n';
                        //Now that we have the size, we can allocate the memory.
                        if (allocateDuplicatesForArrays) {
                            attr.size = 'attribute_length_count';
                            readStr += `\tpayload->${attr.name} = ${makeMalloc(attr)}\n`;
                        }
                        // loop through the array until we find a null termination.
                        readStr += '\t//Copying data into the array. Also copies the null object at the end.\n'
                        readStr += `\tfor(uint16_t i = 0; i < attribute_length_count + 1; i++) {\n`;
                        readStr += `\t\tmemcpy(&payload->${attr.name}[i], ptr, sizeof(${attr.type}));\n`;
                        readStr += `\t\tptr += sizeof(${attr.type});\n`;
                        readStr += '\t}\n';
                    } else {
                        //Since the size of the array is known at runtime, make the first element the size.
                        readStr += `\tmemcpy(&payload->${attr.name}_size, ptr, sizeof(size_t));\n`;
                        readStr += `\tptr += sizeof(size_t);\n`;
                        if (allocateDuplicatesForArrays) {
                            attr.size = "payload->" + attr.name + '_size';
                            readStr += `\tpayload->${attr.name} = ${makeMalloc(attr)}\n`;
                        }
                        readStr += `\tmemcpy(payload->${attr.name}, ptr, sizeof(${attr.type}) * payload->${attr.name}_size);\n\t`;
                        readStr += `ptr += sizeof(${attr.type}) * payload->${attr.name}_size;\n`;
                    }
                }
            });
            readStr += '}';
        }

    }

    function getSize($attributes) {
        let size = 0;
        for (const attr of $attributes) {
            if (attr.category === 'single') {
                size += types[attr.type];
            } else if (attr.category === 'FLA') {
                size += types[attr.type] * attr.size;
            } else if (attr.category === 'VLA') {
                return 'Cannot calculate size - your payload has a Variable length member.';
            }
        }
        return size;
    }

    function getDeclaration({name, type, category, size, null_termination}) {
        if (!name || !type || !category) {
            return '';
        }
        switch (category) {
            case 'VLA': //pointer
                return `${null_termination ? '' : `size_t ${name}_size;\n\t`}${type} *${name};`;
            case 'FLA': //array
                return `${type} ${name}[${size}];`;
            case 'single': //single
                return `${type} ${name};`;
            default:
                return 'category unset';
        }
    }

    function getDummyValues({name, type, category, size, null_termination}) {
        if (!name || !type || !category) {
            return '';
        }
        switch (category) {
            case 'VLA': //pointer
                return `NULL;${null_termination ? '' : `\n\t${name}_size = 0;`}`;
            case 'FLA': //array should have dummy values of 0 but size times
                return '{' + new Array(size).fill(0).join(', ') + '};';
            case 'single': //single
                return `0;`;
        }
    }

    function makeMalloc({name, type, size, null_termination}) {
        return `(${type}*) malloc(sizeof(${type}) * ${size === 0 ? `${name}_size` : size}${null_termination ? ' + 1' : ''});`;
    }

    function validateProtocolName(pn) {
        //     should not include spaces, be empty, start with a number or include any non alphanumeric characters
        //     should not be a reserved word
        if (pn === undefined) {
            return false;
        }
        if (pn === '') {
            return false;
        }
        if (pn[0] >= '0' && pn[0] <= '9') {
            return false;
        }
        for (let i = 0; i < pn.length; i++) {
            if (!((pn[i] >= 'a' && pn[i] <= 'z') || (pn[i] >= 'A' && pn[i] <= 'Z') || (pn[i] >= '0' && pn[i] <= '9'))) {
                return false;
            }
        }
        return true;
    }

    let structStr = '';
    let buildStr = '';
    let readStr = '';
    let autoBuild = true;
    let allocateDuplicatesForArrays = true;
    $: // noinspection SuspiciousTypeOfGuard
        if (autoBuild && validateProtocolName(protocolName) && $attributes.length > 0 && typeof allocateDuplicatesForArrays === 'boolean') {
            update();
        }
</script>

<main>
    <h1>Fixed Schema Serialization Protocol Generator</h1>
    <p>The following is a way to generate a purely C no overhead data protocol that has a fixed schema. You might
        serialize data over a serial port, over CAN Bus, or over anything else where you need to send bytes but only
        have variables.</p>
    <input type="text" bind:value={protocolName}
           style="outline: none; border-color: {validateProtocolName(protocolName) ? '': 'red'}"/>
    <p>Size: {getSize($attributes)}</p>
    <table>
        <tr>
            <td>Type</td>
            <td>Name</td>
            <td>Other</td>
            <td>Declaration</td>
            <td></td>
        </tr>
        {#each $attributes as attr, i}
            <tr>
                <td>
                    <select bind:value={attr.type}>
                        {#each Object.keys(types) as t}
                            <option value={t}>
                                {t}
                            </option>
                        {/each}
                    </select>
                </td>
                <td><input type="text" bind:value={attr.name}/></td>
                <td>
                    <select bind:value={attr.category}>
                        <option value="single">
                            Single
                        </option>
                        <option value="VLA">
                            VLA
                        </option>
                        <option value="FLA">
                            FLA
                        </option>
                    </select>
                    {#if attr.category === 'FLA'}
                        <input type="number" bind:value={attr.size} min="1"/>
                    {/if}
                    {#if attr.category === 'VLA'}
                        Null terminated? <input type="checkbox" bind:checked={attr.null_termination}/>
                    {/if}
                </td>
                <td>
                    {getDeclaration(attr)}
                </td>

                <td>
                    <button on:click={() => remove(i)}>
                        Remove
                    </button>
                </td>
            </tr>
        {/each}
        <tr>
            <td>
                <button on:click={add}>
                    Add
                </button>
            </td>
        </tr>
    </table>
    Autobuild
    <input type="checkbox" bind:checked={autoBuild}>
    <button on:click={update}>Build</button>
    <div>
        {#if typeof getSize($attributes) !== 'string'}
            Your payload size is a fixed {getSize($attributes)} bytes. This means you can use a simple struct and union
            configuration to turn your bytes unto your payload and vice versa.
        {:else}
            Your payload is not a fixed size - you will need to use a more complex configuration. The sender and
            receiver must utilize the autogenerated functions to send and receive the payload. You will need 2x the
            RAM of the payload to send or receive it - one to store the payload and one to store the contiguous bytes
            representation. Consider picking a maximum length for your arrays and using a fixed length array instead.
            <br>
            Allocate Duplicates for Arrays? <input type="checkbox" bind:checked={allocateDuplicatesForArrays}><br>
            <small>When receiving data, you have the option of setting the array to just point to the correct spot in
                the original received data. This requires that the original array stays intact - if allocated on the
                stack it probably will not. If checked, the generated programs will allocate enough memory to hold the
                array data using malloc.</small>
        {/if}
    </div>
    <button on:click={() => navigator.clipboard.writeText(structStr + '\n\n' + buildStr + '\n\n' + readStr)}>Copy All</button>
    Common to senders and receivers:
    <textarea bind:value={structStr} style="width: 100%; height: 150px;" disabled/>
    Sender
    <textarea bind:value={buildStr} style="width: 100%; height: 150px;" disabled/>
    Receiver
    <textarea bind:value={readStr} style="width: 100%; height: 150px;" disabled/>
</main>

<style>
    table {
        border-collapse: collapse;
    }

    td {
        padding: 5px;
        border: 1px solid black;
    }


</style>
