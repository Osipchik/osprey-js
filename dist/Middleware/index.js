import e from"@/utils/Logger/concollor";const t={b:1,f:2,i:3,u:4,l:5,h:6,n:7,c:8,s:9},r=["black","red","green","yellow","blue","magenta","cyan","white","crimson"];function a(e,t){return e?`[${e}m${t}[0m`:t}function l(e,l){for(const s of e.split(","))if(1===s.length)l=a(t[s],l);else{const[e,t]=s.split("/"),o=r.indexOf(e),n=r.indexOf(t);o>-1&&(l=a(30+o,l)),n>-1&&(l=a(40+n,l))}return l}function s(e){return(t,...r)=>{if("string"==typeof t)return l(e,t);const a=[t[0]];let s=1;for(const e of r){const r=t[s++];a.push(String(e),r)}return l(e,a.join(""))}}module.exports=l,module.exports=s;const o={titleTag:s("b,i,red/red"),messageTag:s("red/red"),defaultTitle:"Error"},n={titleTag:s("b,i,yellow/yellow"),messageTag:s("yellow/yellow"),defaultTitle:"Warn"},i={titleTag:s("b,blue"),messageTag:s("blue"),defaultTitle:"Info"},c={titleTag:s("b,green"),messageTag:s("green"),defaultTitle:"Success"},g={titleTag:s("b,cyan"),messageTag:s("cyan"),defaultTitle:"Put"},u={titleTag:s("b,crimson"),messageTag:s("crimson"),defaultTitle:"Patch"},d={titleTag:s("b,magenta"),messageTag:s("magenta"),defaultTitle:"Data"},f=/(https?:\/\/\S+)/gm;function m(t){const r=String(t);console.log(r.replace(f,(t=>e`${t}(u,blue)`)))}function T({titleTag:e,messageTag:t,defaultTitle:r}){return function(a,l){console.log(e(`${l??r}: `)+t(`${a}`))}}m.error=T(o),m.warn=T(n),m.info=T(i),m.success=T(c),m.put=T(g),m.patch=T(u),m.data=T(d),module.exports=m;class w{static middlewares=[];static asyncMiddlewares=[];runMiddlewaresSync(e,t){const r=e=>{if(e instanceof Error)throw t=e.message,r="Middleware",m.error(t,`Middleware Error in ${r}`),new Error(t);var t,r};for(const a of w.middlewares)a(e,t,r)}static use(e){w.middlewares.push(e)}}module.exports=w;export{w as default};
//# sourceMappingURL=index.js.map
