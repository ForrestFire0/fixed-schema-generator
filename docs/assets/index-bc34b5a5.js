(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))o(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerpolicy&&(s.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?s.credentials="include":l.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(l){if(l.ep)return;l.ep=!0;const s=n(l);fetch(l.href,s)}})();function U(){}function Ne(e){return e()}function me(){return Object.create(null)}function ne(e){e.forEach(Ne)}function Ee(e){return typeof e=="function"}function Ve(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function Me(e){return Object.keys(e).length===0}function Oe(e,...t){if(e==null)return U;const n=e.subscribe(...t);return n.unsubscribe?()=>n.unsubscribe():n}function je(e,t,n){e.$$.on_destroy.push(Oe(t,n))}function u(e,t){e.appendChild(t)}function C(e,t,n){e.insertBefore(t,n||null)}function S(e){e.parentNode&&e.parentNode.removeChild(e)}function Fe(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function m(e){return document.createElement(e)}function F(e){return document.createTextNode(e)}function w(){return F(" ")}function V(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function D(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function Be(e){return e===""?null:+e}function Pe(e){return Array.from(e.childNodes)}function pe(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function j(e,t){e.value=t??""}function Z(e,t,n,o){n===null?e.style.removeProperty(t):e.style.setProperty(t,n,o?"important":"")}function ie(e,t){for(let n=0;n<e.options.length;n+=1){const o=e.options[n];if(o.__value===t){o.selected=!0;return}}e.selectedIndex=-1}function be(e){const t=e.querySelector(":checked")||e.options[0];return t&&t.__value}let de;function oe(e){de=e}const te=[],ge=[],se=[],ze=[],Ie=Promise.resolve();let fe=!1;function qe(){fe||(fe=!0,Ie.then(De))}function le(e){se.push(e)}const ue=new Set;let $=0;function De(){if($!==0)return;const e=de;do{try{for(;$<te.length;){const t=te[$];$++,oe(t),Ye(t.$$)}}catch(t){throw te.length=0,$=0,t}for(oe(null),te.length=0,$=0;ge.length;)ge.pop()();for(let t=0;t<se.length;t+=1){const n=se[t];ue.has(n)||(ue.add(n),n())}se.length=0}while(te.length);for(;ze.length;)ze.pop()();fe=!1,ue.clear(),oe(e)}function Ye(e){if(e.fragment!==null){e.update(),ne(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(le)}}const Re=new Set;function Ue(e,t){e&&e.i&&(Re.delete(e),e.i(t))}function ve(e,t,n,o){const{fragment:l,after_update:s}=e.$$;l&&l.m(t,n),o||le(()=>{const r=e.$$.on_mount.map(Ne).filter(Ee);e.$$.on_destroy?e.$$.on_destroy.push(...r):ne(r),e.$$.on_mount=[]}),s.forEach(le)}function Ge(e,t){const n=e.$$;n.fragment!==null&&(ne(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function He(e,t){e.$$.dirty[0]===-1&&(te.push(e),qe(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Ke(e,t,n,o,l,s,r,g=[-1]){const d=de;oe(e);const a=e.$$={fragment:null,ctx:[],props:s,update:U,not_equal:l,bound:me(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(d?d.$$.context:[])),callbacks:me(),dirty:g,skip_bound:!1,root:t.target||d.$$.root};r&&r(a.root);let b=!1;if(a.ctx=n?n(e,t.props||{},(y,h,...f)=>{const N=f.length?f[0]:h;return a.ctx&&l(a.ctx[y],a.ctx[y]=N)&&(!a.skip_bound&&a.bound[y]&&a.bound[y](N),b&&He(e,y)),h}):[],a.update(),b=!0,ne(a.before_update),a.fragment=o?o(a.ctx):!1,t.target){if(t.hydrate){const y=Pe(t.target);a.fragment&&a.fragment.l(y),y.forEach(S)}else a.fragment&&a.fragment.c();t.intro&&Ue(e.$$.fragment),ve(e,t.target,t.anchor,t.customElement),De()}oe(d)}class We{$destroy(){Ge(this,1),this.$destroy=U}$on(t,n){if(!Ee(n))return U;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const l=o.indexOf(n);l!==-1&&o.splice(l,1)}}$set(t){this.$$set&&!Me(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ee=[];function Ze(e,t=U){let n;const o=new Set;function l(g){if(Ve(e,g)&&(e=g,n)){const d=!ee.length;for(const a of o)a[1](),ee.push(a,e);if(d){for(let a=0;a<ee.length;a+=2)ee[a][0](ee[a+1]);ee.length=0}}}function s(g){l(g(e))}function r(g,d=U){const a=[g,d];return o.add(a),o.size===1&&(n=t(l)||U),g(e),()=>{o.delete(a),o.size===0&&(n(),n=null)}}return{set:l,update:s,subscribe:r}}function ke(e,t,n){const o=e.slice();return o[26]=t[n],o[27]=t,o[28]=n,o}function Ae(e,t,n){const o=e.slice();return o[29]=t[n],o}function Le(e){let t,n=e[29]+"",o,l;return{c(){t=m("option"),o=F(n),l=w(),t.__value=e[29],t.value=t.__value},m(s,r){C(s,t,r),u(t,o),u(t,l)},p:U,d(s){s&&S(t)}}}function we(e){let t,n,o;function l(){e[17].call(t,e[27],e[28])}return{c(){t=m("input"),D(t,"type","number"),D(t,"min","1")},m(s,r){C(s,t,r),j(t,e[26].size),n||(o=V(t,"input",l),n=!0)},p(s,r){e=s,r[0]&1032&&Be(t.value)!==e[26].size&&j(t,e[26].size)},d(s){s&&S(t),n=!1,o()}}}function Se(e){let t,n,o,l;function s(){e[18].call(n,e[27],e[28])}return{c(){t=F("Null terminated? "),n=m("input"),D(n,"type","checkbox")},m(r,g){C(r,t,g),C(r,n,g),n.checked=e[26].null_termination,o||(l=V(n,"change",s),o=!0)},p(r,g){e=r,g[0]&1032&&(n.checked=e[26].null_termination)},d(r){r&&S(t),r&&S(n),o=!1,l()}}}function Te(e){let t,n,o,l,s,r,g,d,a,b,y,h,f,N,O,I,q=ce(e[26])+"",Y,v,G,M,J,H,P=Object.keys(e[10]),A=[];for(let z=0;z<P.length;z+=1)A[z]=Le(Ae(e,P,z));function K(){e[14].call(o,e[27],e[28])}function Q(){e[15].call(r,e[27],e[28])}function W(){e[16].call(a,e[27],e[28])}let _=e[26].category==="FLA"&&we(e),p=e[26].category==="VLA"&&Se(e);function L(){return e[19](e[28])}return{c(){t=m("tr"),n=m("td"),o=m("select");for(let z=0;z<A.length;z+=1)A[z].c();l=w(),s=m("td"),r=m("input"),g=w(),d=m("td"),a=m("select"),b=m("option"),b.textContent=`Single
                        `,y=m("option"),y.textContent=`VLA
                        `,h=m("option"),h.textContent="FLA",f=w(),_&&_.c(),N=w(),p&&p.c(),O=w(),I=m("td"),Y=F(q),v=w(),G=m("td"),M=m("button"),M.textContent="Remove",e[26].type===void 0&&le(K),D(n,"class","svelte-1hdehek"),D(r,"type","text"),D(s,"class","svelte-1hdehek"),b.__value="single",b.value=b.__value,y.__value="VLA",y.value=y.__value,h.__value="FLA",h.value=h.__value,e[26].category===void 0&&le(W),D(d,"class","svelte-1hdehek"),D(I,"class","svelte-1hdehek"),D(G,"class","svelte-1hdehek")},m(z,c){C(z,t,c),u(t,n),u(n,o);for(let i=0;i<A.length;i+=1)A[i].m(o,null);ie(o,e[26].type),u(t,l),u(t,s),u(s,r),j(r,e[26].name),u(t,g),u(t,d),u(d,a),u(a,b),u(a,y),u(a,h),ie(a,e[26].category),u(d,f),_&&_.m(d,null),u(d,N),p&&p.m(d,null),u(t,O),u(t,I),u(I,Y),u(t,v),u(t,G),u(G,M),J||(H=[V(o,"change",K),V(r,"input",Q),V(a,"change",W),V(M,"click",L)],J=!0)},p(z,c){if(e=z,c[0]&1024){P=Object.keys(e[10]);let i;for(i=0;i<P.length;i+=1){const X=Ae(e,P,i);A[i]?A[i].p(X,c):(A[i]=Le(X),A[i].c(),A[i].m(o,null))}for(;i<A.length;i+=1)A[i].d(1);A.length=P.length}c[0]&1032&&ie(o,e[26].type),c[0]&1032&&r.value!==e[26].name&&j(r,e[26].name),c[0]&1032&&ie(a,e[26].category),e[26].category==="FLA"?_?_.p(e,c):(_=we(e),_.c(),_.m(d,N)):_&&(_.d(1),_=null),e[26].category==="VLA"?p?p.p(e,c):(p=Se(e),p.c(),p.m(d,null)):p&&(p.d(1),p=null),c[0]&8&&q!==(q=ce(e[26])+"")&&pe(Y,q)},d(z){z&&S(t),Fe(A,z),_&&_.d(),p&&p.d(),J=!1,ne(H)}}}function Je(e){let t,n,o,l,s,r,g,d,a;return{c(){t=F(`Your payload is not a fixed size - you will need to use a more complex configuration. The sender and
            receiver must utilize the autogenerated functions to send and receive the payload. You will need 2x the
            RAM of the payload to send or receive it - one to store the payload and one to store the contiguous bytes
            representation. Consider picking a maximum length for your arrays and using a fixed length array instead.
            `),n=m("br"),o=F(`
            Allocate Duplicates for Arrays? `),l=m("input"),s=m("br"),r=w(),g=m("small"),g.textContent=`When receiving data, you have the option of setting the array to just point to the correct spot in
                the original received data. This requires that the original array stays intact - if allocated on the
                stack it probably will not. If checked, the generated programs will allocate enough memory to hold the
                array data using malloc.`,D(l,"type","checkbox")},m(b,y){C(b,t,y),C(b,n,y),C(b,o,y),C(b,l,y),l.checked=e[2],C(b,s,y),C(b,r,y),C(b,g,y),d||(a=V(l,"change",e[21]),d=!0)},p(b,y){y[0]&4&&(l.checked=b[2])},d(b){b&&S(t),b&&S(n),b&&S(o),b&&S(l),b&&S(s),b&&S(r),b&&S(g),d=!1,a()}}}function Qe(e){let t,n=e[12](e[3])+"",o,l;return{c(){t=F("Your payload size is a fixed "),o=F(n),l=F(` bytes. This means you can use a simple struct and union
            configuration to turn your bytes unto your payload and vice versa.`)},m(s,r){C(s,t,r),C(s,o,r),C(s,l,r)},p(s,r){r[0]&8&&n!==(n=s[12](s[3])+"")&&pe(o,n)},d(s){s&&S(t),s&&S(o),s&&S(l)}}}function Xe(e){let t,n,o,l,s,r,g,d,a,b=e[12](e[3])+"",y,h,f,N,O,I,q,Y,v,G,M,J,H,P,A,K,Q,W,_,p,L,z,c,i,X,he,x=e[3],B=[];for(let k=0;k<x.length;k+=1)B[k]=Te(ke(e,x,k));function _e(k,E){return E[0]&8&&(K=null),K==null&&(K=typeof k[12](k[3])!="string"),K?Qe:Je}let re=_e(e,[-1,-1]),R=re(e);return{c(){t=m("main"),n=m("h1"),n.textContent="Fixed Schema Serialization Protocol Generator",o=w(),l=m("p"),l.textContent=`The following is a way to generate a purely C no overhead data protocol that has a fixed schema. You might
        serialize data over a serial port, over CAN Bus, or over anything else where you need to send bytes but only
        have variables.`,s=w(),r=m("input"),g=w(),d=m("p"),a=F("Size: "),y=F(b),h=w(),f=m("table"),N=m("tr"),N.innerHTML=`<td class="svelte-1hdehek">Type</td> 
            <td class="svelte-1hdehek">Name</td> 
            <td class="svelte-1hdehek">Other</td> 
            <td class="svelte-1hdehek">Declaration</td> 
            <td class="svelte-1hdehek"></td>`,O=w();for(let k=0;k<B.length;k+=1)B[k].c();I=w(),q=m("tr"),Y=m("td"),v=m("button"),v.textContent="Add",G=F(`
    Autobuild
    `),M=m("input"),J=w(),H=m("button"),H.textContent="Build",P=w(),A=m("div"),R.c(),Q=w(),W=m("button"),W.textContent="Copy All",_=F(`
    Common to senders and receivers:
    `),p=m("textarea"),L=F(`
    Sender
    `),z=m("textarea"),c=F(`
    Receiver
    `),i=m("textarea"),D(r,"type","text"),Z(r,"outline","none"),Z(r,"border-color",ae(e[0])?"":"red"),D(Y,"class","svelte-1hdehek"),D(f,"class","svelte-1hdehek"),D(M,"type","checkbox"),Z(p,"width","100%"),Z(p,"height","150px"),p.disabled=!0,Z(z,"width","100%"),Z(z,"height","150px"),z.disabled=!0,Z(i,"width","100%"),Z(i,"height","150px"),i.disabled=!0},m(k,E){C(k,t,E),u(t,n),u(t,o),u(t,l),u(t,s),u(t,r),j(r,e[0]),u(t,g),u(t,d),u(d,a),u(d,y),u(t,h),u(t,f),u(f,N),u(f,O);for(let T=0;T<B.length;T+=1)B[T].m(f,null);u(f,I),u(f,q),u(q,Y),u(Y,v),u(t,G),u(t,M),M.checked=e[1],u(t,J),u(t,H),u(t,P),u(t,A),R.m(A,null),u(t,Q),u(t,W),u(t,_),u(t,p),j(p,e[4]),u(t,L),u(t,z),j(z,e[5]),u(t,c),u(t,i),j(i,e[6]),X||(he=[V(r,"input",e[13]),V(v,"click",e[9]),V(M,"change",e[20]),V(H,"click",e[11]),V(W,"click",e[22]),V(p,"input",e[23]),V(z,"input",e[24]),V(i,"input",e[25])],X=!0)},p(k,E){if(E[0]&1&&Z(r,"border-color",ae(k[0])?"":"red"),E[0]&1&&r.value!==k[0]&&j(r,k[0]),E[0]&8&&b!==(b=k[12](k[3])+"")&&pe(y,b),E[0]&1288){x=k[3];let T;for(T=0;T<x.length;T+=1){const ye=ke(k,x,T);B[T]?B[T].p(ye,E):(B[T]=Te(ye),B[T].c(),B[T].m(f,I))}for(;T<B.length;T+=1)B[T].d(1);B.length=x.length}E[0]&2&&(M.checked=k[1]),re===(re=_e(k,E))&&R?R.p(k,E):(R.d(1),R=re(k),R&&(R.c(),R.m(A,null))),E[0]&16&&j(p,k[4]),E[0]&32&&j(z,k[5]),E[0]&64&&j(i,k[6])},i:U,o:U,d(k){k&&S(t),Fe(B,k),R.d(),X=!1,ne(he)}}}function ce({name:e,type:t,category:n,size:o,null_termination:l}){if(!e||!t||!n)return"";switch(n){case"VLA":return`${l?"":`size_t ${e}_size;
	`}${t} *${e};`;case"FLA":return`${t} ${e}[${o}];`;case"single":return`${t} ${e};`;default:return"category unset"}}function xe({name:e,type:t,category:n,size:o,null_termination:l}){if(!e||!t||!n)return"";switch(n){case"VLA":return`NULL;${l?"":`
	${e}_size = 0;`}`;case"FLA":return"{"+new Array(o).fill(0).join(", ")+"};";case"single":return"0;"}}function Ce({name:e,type:t,size:n,null_termination:o}){return`(${t}*) malloc(sizeof(${t}) * ${n===0?`${e}_size`:n}${o?" + 1":""});`}function ae(e){if(e===void 0||e===""||e[0]>="0"&&e[0]<="9")return!1;for(let t=0;t<e.length;t++)if(!(e[t]>="a"&&e[t]<="z"||e[t]>="A"&&e[t]<="Z"||e[t]>="0"&&e[t]<="9"))return!1;return!0}function $e(e,t,n){let o,l=Ze([]);je(e,l,_=>n(3,o=_));try{l.set([{name:"status",type:"bool",category:"single",size:1,null_termination:!1},{name:"data",type:"uint8_t",category:"FLA",size:10,null_termination:!1},{name:"floats",type:"float",category:"VLA",size:0,null_termination:!1},{name:"name",type:"char",category:"VLA",size:0,null_termination:!0}])}catch{}let s=_=>{l.update(p=>(p.splice(_,1),p))},r=()=>{l.update(_=>(_.push({name:"",type:"",category:"single",size:1,null_termination:!1}),_))},g={uint8_t:1,uint16_t:2,uint32_t:4,uint64_t:8,int8_t:1,int16_t:2,int32_t:4,int64_t:8,float:4,char:1,bool:1},d="BMSData";function a(){const _=b(o),p=typeof _!="string";let L=`${d}Type`,z=`${d}PayloadType`;if(n(4,y=`typedef struct {
`),o.forEach(c=>{n(4,y+=`	${ce(c)}
`)}),n(4,y+=`} ${z};`),p&&(n(4,y+=`

//This is a union that allows you to access the payload as a struct, or as a raw array.`),n(4,y+=`
typedef union ${d}_unused_union_typedef {
	${z} p;
	uint8_t raw_data[${_}];
} ${L};`)),n(5,h=`//This is code that will be used to send the payload once a struct as been created.
`),p){n(5,h+=`//To send data, create a buffer by creating an instance of ${L}.
//Ex: In a function:`),n(5,h+=`
${L} my${d};
//Then set the payload...
`);for(const c of o)n(5,h+=`my${d}.p.${c.name} = ${xe(c)}//Set it correctly here...
`);n(5,h+=`//Then send the data:
`),n(5,h+=`for(size_t i = 0; i < sizeof(myBMSData); i++){
	`),n(5,h+=`send(myBMSData.raw_data[i]);
}
`)}else n(5,h+=`//To send data, create an instance of ${z} and a suitable sized buffer.
`),n(5,h+=`size_t ${d}_build(${z} *payload, uint8_t *buffer) {
	uint8_t *ptr = buffer;
`),o.forEach(c=>{n(5,h+=`	//Loading ${c.category} attribute: ${c.name}
`),c.category==="single"?(n(5,h+=`	memcpy(ptr, &payload->${c.name}, sizeof(${c.type}));
	`),n(5,h+=`ptr += sizeof(${c.type});
`)):c.category==="FLA"?(n(5,h+=`	memcpy(ptr, payload->${c.name}, sizeof(${c.type}) * ${c.size});
	`),n(5,h+=`ptr += sizeof(${c.type}) * ${c.size};
`)):c.category==="VLA"&&(c.null_termination?(n(5,h+=`	for(size_t i = 0;; i++) {
`),n(5,h+=`		memcpy(ptr, &payload->${c.name}[i], sizeof(${c.type}));
`),n(5,h+=`		ptr += sizeof(${c.type});
`),n(5,h+=`		if(payload->${c.name}[i] == NULL) {
			break;
		}
`),n(5,h+=`	}
`)):(n(5,h+=`	memcpy(ptr, &payload->${c.name}_size, sizeof(size_t));
`),n(5,h+=`	ptr += sizeof(size_t);
`),n(5,h+=`	memcpy(ptr, payload->${c.name}, sizeof(${c.type}) * payload->${c.name}_size);
	`),n(5,h+=`ptr += sizeof(${c.type}) * payload->${c.name}_size;
`)))}),n(5,h+=`	return ptr - buffer;
`),n(5,h+="}");if(n(6,f=`//This is code that will be used to parse the payload once a struct as been created.
`),p){n(6,f+=`//To read data, create a buffer by creating an instance of ${L}.
//Ex: In a function:`),n(6,f+=`
${L} my${d};
//Then read the data:
`),n(6,f+=`for(size_t i = 0; i < sizeof(myBMSData); i++){
	`),n(6,f+=`myBMSData.raw_data[i] = read();
}
`),n(6,f+=`//Then access the payload...
`);for(const c of o)n(6,f+=`print(my${d}.p.${c.name});
`)}else{n(6,f+=`//To read data, create an instance of ${z} and load the data into a suitable sized buffer.
`),n(6,f+=`void ${d}_read(${z} *payload, uint8_t *buffer) {
	uint8_t *ptr = buffer;
`);let c=!1;o.forEach(i=>{n(6,f+=`	//Loading ${i.category} attribute: ${i.name}
`),i.category==="single"?(n(6,f+=`	memcpy(&payload->${i.name}, ptr, sizeof(${i.type}));
	`),n(6,f+=`ptr += sizeof(${i.type});
`)):i.category==="FLA"?(n(6,f+=`	memcpy(payload->${i.name}, ptr, sizeof(${i.type}) * ${i.size});
	`),n(6,f+=`ptr += sizeof(${i.type}) * ${i.size};
`)):i.category==="VLA"&&(i.null_termination?(c||(c=!0,n(6,f+=`	uint16_t attribute_length_count = 0;
`)),n(6,f+=`	attribute_length_count = 0;
`),n(6,f+=`	while(*((char*) ptr + attribute_length_count) != NULL) {
`),n(6,f+=`		attribute_length_count++;
`),n(6,f+=`	}
`),O&&(i.size="attribute_length_count",n(6,f+=`	payload->${i.name} = ${Ce(i)}
`)),n(6,f+=`	//Copying data into the array. Also copies the null object at the end.
`),n(6,f+=`	for(uint16_t i = 0; i < attribute_length_count + 1; i++) {
`),n(6,f+=`		memcpy(&payload->${i.name}[i], ptr, sizeof(${i.type}));
`),n(6,f+=`		ptr += sizeof(${i.type});
`),n(6,f+=`	}
`)):(n(6,f+=`	memcpy(&payload->${i.name}_size, ptr, sizeof(size_t));
`),n(6,f+=`	ptr += sizeof(size_t);
`),O&&(i.size="payload->"+i.name+"_size",n(6,f+=`	payload->${i.name} = ${Ce(i)}
`)),n(6,f+=`	memcpy(payload->${i.name}, ptr, sizeof(${i.type}) * payload->${i.name}_size);
	`),n(6,f+=`ptr += sizeof(${i.type}) * payload->${i.name}_size;
`)))}),n(6,f+="}")}}function b(_){let p=0;for(const L of _)if(L.category==="single")p+=g[L.type];else if(L.category==="FLA")p+=g[L.type]*L.size;else if(L.category==="VLA")return"Cannot calculate size - your payload has a Variable length member.";return p}let y="",h="",f="",N=!0,O=!0;function I(){d=this.value,n(0,d)}function q(_,p){_[p].type=be(this),l.set(o),n(10,g)}function Y(_,p){_[p].name=this.value,l.set(o),n(10,g)}function v(_,p){_[p].category=be(this),l.set(o),n(10,g)}function G(_,p){_[p].size=Be(this.value),l.set(o),n(10,g)}function M(_,p){_[p].null_termination=this.checked,l.set(o),n(10,g)}const J=_=>s(_);function H(){N=this.checked,n(1,N)}function P(){O=this.checked,n(2,O)}const A=()=>navigator.clipboard.writeText(y+`

`+h+`

`+f);function K(){y=this.value,n(4,y)}function Q(){h=this.value,n(5,h)}function W(){f=this.value,n(6,f)}return e.$$.update=()=>{e.$$.dirty[0]&15&&N&&ae(d)&&o.length>0&&typeof O=="boolean"&&a()},[d,N,O,o,y,h,f,l,s,r,g,a,b,I,q,Y,v,G,M,J,H,P,A,K,Q,W]}class et extends We{constructor(t){super(),Ke(this,t,$e,Xe,Ve,{},null,[-1,-1])}}new et({target:document.getElementById("app")});
