import {writable} from "svelte/store";

export function storable(localStorageKey, initial) {
    if (typeof storable.usedKeys == 'undefined') {
        // It has not... perform the initialization
        storable.usedKeys = [];
    }
    if (storable.usedKeys.includes(localStorageKey)) {
        console.log('Err: cannot use the same key')
        console.log(storable.usedKeys)
        throw new Error('cannot use the same key')
    }
    if (typeof localStorageKey != 'string') {
        throw new Error('Err: localStorageKey must be a string');
    }
    storable.usedKeys.push(localStorageKey)
    let initial_value = JSON.parse(localStorage.getItem(localStorageKey) ? localStorage[localStorageKey] : JSON.stringify(initial));
    if (initial instanceof Date) {
        console.log(initial_value)
        const b = initial_value.split(/\D+/);
        initial_value = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }
    const ret = writable(initial_value);
    ret.subscribe((value) => localStorage.setItem(localStorageKey, JSON.stringify(value)))
    if (Array.isArray(initial_value)) {
        ret.push = (push_me) => ret.update(e => {
            e.push(push_me);
            return e;
        })
    }
    ret.get = () => get(ret);
    return ret;
}