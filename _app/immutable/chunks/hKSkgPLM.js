import{S as N,o as j,i as C,s as I,j as G,k as P,U as l,m as y,p as m,q as z,r as K,t as Z,v as $,w as F,x as H,g as o,y as J,z as V,L as Q,A as U,B as W,P as X,C as k,D as p,F as ee,G as re,l as te,H as ie,I as ne,J as ae}from"./CJlrEtdq.js";function A(r,s=null,g){if(typeof r!="object"||r===null||N in r)return r;const b=Z(r);if(b!==j&&b!==C)return r;var a=new Map,v=$(r),w=I(0);v&&a.set("length",I(r.length));var S;return new Proxy(r,{defineProperty(f,e,t){(!("value"in t)||t.configurable===!1||t.enumerable===!1||t.writable===!1)&&K();var n=a.get(e);return n===void 0?(n=I(t.value),a.set(e,n)):y(n,A(t.value,S)),!0},deleteProperty(f,e){var t=a.get(e);if(t===void 0)e in f&&a.set(e,I(l));else{if(v&&typeof e=="string"){var n=a.get("length"),i=Number(e);Number.isInteger(i)&&i<n.v&&y(n,i)}y(t,l),M(w)}return!0},get(f,e,t){var _;if(e===N)return r;var n=a.get(e),i=e in f;if(n===void 0&&(!i||(_=m(f,e))!=null&&_.writable)&&(n=I(A(i?f[e]:l,S)),a.set(e,n)),n!==void 0){var u=P(n);return u===l?void 0:u}return Reflect.get(f,e,t)},getOwnPropertyDescriptor(f,e){var t=Reflect.getOwnPropertyDescriptor(f,e);if(t&&"value"in t){var n=a.get(e);n&&(t.value=P(n))}else if(t===void 0){var i=a.get(e),u=i==null?void 0:i.v;if(i!==void 0&&u!==l)return{enumerable:!0,configurable:!0,value:u,writable:!0}}return t},has(f,e){var u;if(e===N)return!0;var t=a.get(e),n=t!==void 0&&t.v!==l||Reflect.has(f,e);if(t!==void 0||z!==null&&(!n||(u=m(f,e))!=null&&u.writable)){t===void 0&&(t=I(n?A(f[e],S):l),a.set(e,t));var i=P(t);if(i===l)return!1}return n},set(f,e,t,n){var h;var i=a.get(e),u=e in f;if(v&&e==="length")for(var _=t;_<i.v;_+=1){var R=a.get(_+"");R!==void 0?y(R,l):_ in f&&(R=I(l),a.set(_+"",R))}i===void 0?(!u||(h=m(f,e))!=null&&h.writable)&&(i=I(void 0),y(i,A(t,S)),a.set(e,i)):(u=i.v!==l,y(i,A(t,S)));var c=Reflect.getOwnPropertyDescriptor(f,e);if(c!=null&&c.set&&c.set.call(n,t),!u){if(v&&typeof e=="string"){var D=a.get("length"),E=Number(e);Number.isInteger(E)&&E>=D.v&&y(D,E+1)}M(w)}return!0},ownKeys(f){P(w);var e=Reflect.ownKeys(f).filter(i=>{var u=a.get(i);return u===void 0||u.v!==l});for(var[t,n]of a)n.v!==l&&!(t in f)&&e.push(t);return e},setPrototypeOf(){G()}})}function M(r,s=1){y(r,r.v+s)}function Y(r,s){return r===s||(r==null?void 0:r[N])===s}function ue(r={},s,g,b){return F(()=>{var a,v;return H(()=>{a=v,v=[],o(()=>{r!==g(...v)&&(s(r,...v),a&&Y(g(...a),r)&&s(null,...a))})}),()=>{J(()=>{v&&Y(g(...v),r)&&s(null,...v)})}}),r}let x=!1;function fe(r){var s=x;try{return x=!1,[r(),x]}finally{x=s}}function ve(r,s,g,b){var B;var a=(g&ne)!==0,v=!te||(g&ie)!==0,w=(g&ee)!==0,S=(g&ae)!==0,f=!1,e;w?[e,f]=fe(()=>r[s]):e=r[s];var t=N in r||re in r,n=w&&(((B=m(r,s))==null?void 0:B.set)??(t&&s in r&&(d=>r[s]=d)))||void 0,i=b,u=!0,_=!1,R=()=>(_=!0,u&&(u=!1,S?i=o(b):i=b),i);e===void 0&&b!==void 0&&(n&&v&&V(),e=R(),n&&n(e));var c;if(v)c=()=>{var d=r[s];return d===void 0?R():(u=!0,_=!1,d)};else{var D=(a?U:W)(()=>r[s]);D.f|=Q,c=()=>{var d=P(D);return d!==void 0&&(i=void 0),d===void 0?i:d}}if(!(g&X))return c;if(n){var E=r.$$legacy;return function(d,O){return arguments.length>0?((!v||!O||E||f)&&n(O?c():d),d):c()}}var h=!1,q=p(e),L=U(()=>{var d=c(),O=P(q);return h?(h=!1,O):q.v=d});return a||(L.equals=k),function(d,O){if(arguments.length>0){const T=O?P(L):v&&w?A(d):d;return L.equals(T)||(h=!0,y(q,T),_&&i!==void 0&&(i=T),o(()=>P(L))),d}return P(L)}}export{A as a,ue as b,ve as p};
