"use strict";var g=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var u=Object.getOwnPropertyNames;var o=Object.prototype.hasOwnProperty;var y=(e,t,a)=>t in e?g(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var n=(e,t)=>g(e,"name",{value:t,configurable:!0});var v=(e,t)=>{for(var a in t)g(e,a,{get:t[a],enumerable:!0})},f=(e,t,a,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of u(t))!o.call(e,r)&&r!==a&&g(e,r,{get:()=>t[r],enumerable:!(i=m(t,r))||i.enumerable});return e};var d=e=>f(g({},"__esModule",{value:!0}),e);var p=(e,t,a)=>(y(e,typeof t!="symbol"?t+"":t,a),a);var b={};v(b,{default:()=>M});module.exports=d(b);var s=class{static addMeta(t,a,i){if(s.meta.has(t)){let r=s.meta.get(t);r[a]=i}else s.meta.set(t,{[a]:i});s.values.set(t.value,s.meta.get(t))}static getMeta(t){return s.meta.get(t)||s.values.get(t)}},c=s;n(c,"MetaStore"),p(c,"meta",new WeakMap),p(c,"values",new WeakMap);var l=c;function h(e,t){return(a,i,r)=>{l.addMeta(r,"header",{name:e,value:t})}}n(h,"Header");var M=h;0&&(module.exports={});
//# sourceMappingURL=header.js.map
