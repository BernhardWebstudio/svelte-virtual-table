import{Z as E,_ as b,$ as P,G as N,a0 as H,a1 as M,a2 as W,q as Y,a3 as L,D as $,a4 as B,a5 as j,a6 as T,a7 as w,J as O,I as G,c as p,a8 as J,a9 as Z,aa as z,ab as F,ac as K,ad as Q,C as U,a as X,h as R,R as x,e as tt,V as rt}from"./CRAC5efH.js";import{b as et}from"./XwmG38ir.js";const at=["touchstart","touchmove"];function nt(t){return at.includes(t)}let A=!1;function st(){A||(A=!0,document.addEventListener("reset",t=>{Promise.resolve().then(()=>{var r;if(!t.defaultPrevented)for(const a of t.target.elements)(r=a.__on_r)==null||r.call(a)})},{capture:!0}))}function V(t){var r=P,a=N;E(null),b(null);try{return t()}finally{E(r),b(a)}}function _t(t,r,a,i=a){t.addEventListener(r,()=>V(a));const n=t.__on_r;n?t.__on_r=()=>{n(),i(!0)}:t.__on_r=()=>i(!0),st()}const it=new Set,I=new Set;function ot(t,r,a,i={}){function n(e){if(i.capture||y.call(r,e),!e.cancelBubble)return V(()=>a==null?void 0:a.call(this,e))}return t.startsWith("pointer")||t.startsWith("touch")||t==="wheel"?Y(()=>{r.addEventListener(t,n,i)}):r.addEventListener(t,n,i),n}function lt(t,r,a,i,n){var e={capture:i,passive:n},u=ot(t,r,a,e);(r===document.body||r===window||r===document)&&W(()=>{r.removeEventListener(t,u,e)})}function y(t){var D;var r=this,a=r.ownerDocument,i=t.type,n=((D=t.composedPath)==null?void 0:D.call(t))||[],e=n[0]||t.target,u=0,d=t.__root;if(d){var _=n.indexOf(d);if(_!==-1&&(r===document||r===window)){t.__root=r;return}var v=n.indexOf(r);if(v===-1)return;_<=v&&(u=_)}if(e=n[u]||t.target,e!==r){H(t,"currentTarget",{configurable:!0,get(){return e||a}});var m=P,f=N;E(null),b(null);try{for(var s,o=[];e!==null;){var c=e.assignedSlot||e.parentNode||e.host||null;try{var l=e["__"+i];if(l!=null&&(!e.disabled||t.target===e))if(M(l)){var[q,...C]=l;q.apply(e,[t,...C])}else l.call(e,t)}catch(g){s?o.push(g):s=g}if(t.cancelBubble||c===r||c===null)break;e=c}if(s){for(let g of o)queueMicrotask(()=>{throw g});throw s}}finally{t.__root=r,delete t.currentTarget,E(m),b(f)}}}function dt(t,r){var a=r==null?"":typeof r=="object"?r+"":r;a!==(t.__t??(t.__t=t.nodeValue))&&(t.__t=a,t.nodeValue=a+"")}function ut(t,r){return k(t,r)}function vt(t,r){L(),r.intro=r.intro??!1;const a=r.target,i=R,n=p;try{for(var e=$(a);e&&(e.nodeType!==8||e.data!==B);)e=j(e);if(!e)throw T;w(!0),O(e),G();const u=k(t,{...r,anchor:e});if(p===null||p.nodeType!==8||p.data!==J)throw Z(),T;return w(!1),u}catch(u){if(u===T)return r.recover===!1&&z(),L(),F(a),w(!1),ut(t,r);throw u}finally{w(i),O(n)}}const h=new Map;function k(t,{target:r,anchor:a,props:i={},events:n,context:e,intro:u=!0}){L();var d=new Set,_=f=>{for(var s=0;s<f.length;s++){var o=f[s];if(!d.has(o)){d.add(o);var c=nt(o);r.addEventListener(o,y,{passive:c});var l=h.get(o);l===void 0?(document.addEventListener(o,y,{passive:c}),h.set(o,1)):h.set(o,l+1)}}};_(K(it)),I.add(_);var v=void 0,m=Q(()=>{var f=a??r.appendChild(U());return X(()=>{if(e){x({});var s=tt;s.c=e}n&&(i.$$events=n),R&&et(f,null),v=t(f,i)||{},R&&(N.nodes_end=p),e&&rt()}),()=>{var c;for(var s of d){r.removeEventListener(s,y);var o=h.get(s);--o===0?(document.removeEventListener(s,y),h.delete(s)):h.set(s,o)}I.delete(_),f!==a&&((c=f.parentNode)==null||c.removeChild(f))}});return S.set(v,m),v}let S=new WeakMap;function ht(t,r){const a=S.get(t);return a?(S.delete(t),a(r)):Promise.resolve()}export{st as a,lt as e,vt as h,_t as l,ut as m,dt as s,ht as u};
