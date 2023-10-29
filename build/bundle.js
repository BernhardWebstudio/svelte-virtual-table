var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t,e,n,o){if(t){const r=l(t,e,n,o);return t[0](r)}}function l(t,e,n,o){return t[1]&&o?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](o(e))):n.ctx}function c(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|r[o];return t}return e.dirty|r}return e.dirty}function a(t,e,n,o,r,s){if(r){const i=l(e,n,o,s);t.p(i,r)}}function u(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}function d(t,e){t.appendChild(e)}function h(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode&&t.parentNode.removeChild(t)}function p(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function g(){return m(" ")}function b(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function $(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function v(t,e){e=""+e,t.data!==e&&(t.data=e)}function w(t,e){t.value=null==e?"":e}function x(t,e,n,o){null==n?t.style.removeProperty(e):t.style.setProperty(e,n,o?"important":"")}let y,k;function _(){if(void 0===y){y=!1;try{"undefined"!=typeof window&&window.parent&&window.parent.document}catch(t){y=!0}}return y}function T(t,e){"static"===getComputedStyle(t).position&&(t.style.position="relative");const n=p("iframe");n.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),n.setAttribute("aria-hidden","true"),n.tabIndex=-1;const o=_();let r;return o?(n.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",r=b(window,"message",(t=>{t.source===n.contentWindow&&e()}))):(n.src="about:blank",n.onload=()=>{r=b(n.contentWindow,"resize",e),e()}),d(t,n),()=>{(o||r&&n.contentWindow)&&r(),f(n)}}function C(t,e,n){t.classList.toggle(e,!!n)}function j(t){k=t}function E(){if(!k)throw new Error("Function called outside component initialization");return k}const H=[],B=[];let N=[];const M=[],S=Promise.resolve();let q=!1;function A(){q||(q=!0,S.then(z))}function L(){return A(),S}function W(t){N.push(t)}function I(t){M.push(t)}const O=new Set;let R=0;function z(){if(0!==R)return;const t=k;do{try{for(;R<H.length;){const t=H[R];R++,j(t),D(t.$$)}}catch(t){throw H.length=0,R=0,t}for(j(null),H.length=0,R=0;B.length;)B.pop()();for(let t=0;t<N.length;t+=1){const e=N[t];O.has(e)||(O.add(e),e())}N.length=0}while(H.length);for(;M.length;)M.pop()();q=!1,O.clear(),j(t)}function D(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(W)}}const U=new Set;let F;function P(){F={r:0,c:[],p:F}}function G(){F.r||o(F.c),F=F.p}function V(t,e){t&&t.i&&(U.delete(t),t.i(e))}function K(t,e,n,o){if(t&&t.o){if(U.has(t))return;U.add(t),F.c.push((()=>{U.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}else o&&o()}function J(t){return void 0!==t?.length?t:Array.from(t)}function Q(t,e,n){const o=t.$$.props[e];void 0!==o&&(t.$$.bound[o]=n,n(t.$$.ctx[o]))}function X(t){t&&t.c()}function Y(t,n,s){const{fragment:i,after_update:l}=t.$$;i&&i.m(n,s),W((()=>{const n=t.$$.on_mount.map(e).filter(r);t.$$.on_destroy?t.$$.on_destroy.push(...n):o(n),t.$$.on_mount=[]})),l.forEach(W)}function Z(t,e){const n=t.$$;null!==n.fragment&&(!function(t){const e=[],n=[];N.forEach((o=>-1===t.indexOf(o)?e.push(o):n.push(o))),n.forEach((t=>t())),N=e}(n.after_update),o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function tt(e,r,s,i,l,c,a=null,u=[-1]){const d=k;j(e);const h=e.$$={fragment:null,ctx:[],props:c,update:t,not_equal:l,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(d?d.$$.context:[])),callbacks:n(),dirty:u,skip_bound:!1,root:r.target||d.$$.root};a&&a(h.root);let p=!1;if(h.ctx=s?s(e,r.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return h.ctx&&l(h.ctx[t],h.ctx[t]=r)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](r),p&&function(t,e){-1===t.$$.dirty[0]&&(H.push(t),A(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(e,t)),n})):[],h.update(),p=!0,o(h.before_update),h.fragment=!!i&&i(h.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);h.fragment&&h.fragment.l(t),t.forEach(f)}else h.fragment&&h.fragment.c();r.intro&&V(e.$$.fragment),Y(e,r.target,r.anchor),z()}j(d)}class et{$$=void 0;$$set=void 0;$destroy(){Z(this,1),this.$destroy=t}$on(e,n){if(!r(n))return t;const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const t=o.indexOf(n);-1!==t&&o.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}"undefined"!=typeof window&&(window.__svelte||(window.__svelte={v:new Set})).v.add("4");const nt=t=>({}),ot=t=>({});function rt(t,e,n){const o=t.slice();return o[36]=e[n],o}const st=t=>({item:4096&t[0],index:4096&t[0]}),it=t=>({item:t[36].data,index:t[36].index}),lt=t=>({}),ct=t=>({});function at(t){let e;const n=t[23].tbody,o=i(n,t,t[22],it),r=o||function(t){let e;return{c(){e=m("Missing Table Row\n                ")},m(t,n){h(t,e,n)},d(t){t&&f(e)}}}();return{c(){r&&r.c()},m(t,n){r&&r.m(t,n),e=!0},p(t,r){o&&o.p&&(!e||4198400&r[0])&&a(o,n,t,t[22],e?c(n,t[22],r,st):u(t[22]),it)},i(t){e||(V(r,t),e=!0)},o(t){K(r,t),e=!1},d(t){r&&r.d(t)}}}function ut(t){let e,n,o,r,s,l,m,v,w,y,k,_,j,E;const H=t[23].thead,B=i(H,t,t[22],ct);let N=J(t[12]),M=[];for(let e=0;e<N.length;e+=1)M[e]=at(rt(t,N,e));const S=t=>K(M[t],1,1,(()=>{M[t]=null})),q=t[23].tfoot,A=i(q,t,t[22],ot);return{c(){e=p("svelte-virtual-table-viewport"),n=p("table"),o=p("thead"),B&&B.c(),s=g(),l=p("tbody");for(let t=0;t<M.length;t+=1)M[t].c();m=g(),v=p("tfoot"),A&&A.c(),$(o,"class","thead svelte-mvio91"),$(o,"role","rowgroup"),W((()=>t[25].call(o))),$(l,"class","tbody svelte-mvio91"),$(l,"role","rowgroup"),$(v,"class","tfoot svelte-mvio91"),$(v,"role","rowgroup"),W((()=>t[27].call(v))),$(n,"class",y=dt+" "+t[1]+" table svelte-mvio91"),$(n,"role","table"),x(n,"height",t[2]),x(n,"--bw-svt-p-top",t[10]+"px"),x(n,"--bw-svt-p-bottom",t[5]+"px"),x(n,"--bw-svt-head-height",t[7]+"px"),x(n,"--bw-svt-foot-height",t[8]+"px"),x(n,"--bw-svt-avg-row-height",t[4]+"px"),W((()=>t[29].call(n))),C(n,"require-border-collapse",t[0])},m(i,c){h(i,e,c),d(e,n),d(n,o),B&&B.m(o,null),t[24](o),r=T(o,t[25].bind(o)),d(n,s),d(n,l);for(let t=0;t<M.length;t+=1)M[t]&&M[t].m(l,null);t[26](l),d(n,m),d(n,v),A&&A.m(v,null),w=T(v,t[27].bind(v)),t[28](n),k=T(n,t[29].bind(n)),_=!0,j||(E=b(n,"scroll",t[13]),j=!0)},p(t,e){if(B&&B.p&&(!_||4194304&e[0])&&a(B,H,t,t[22],_?c(H,t[22],e,lt):u(t[22]),ct),4198400&e[0]){let n;for(N=J(t[12]),n=0;n<N.length;n+=1){const o=rt(t,N,n);M[n]?(M[n].p(o,e),V(M[n],1)):(M[n]=at(o),M[n].c(),V(M[n],1),M[n].m(l,null))}for(P(),n=N.length;n<M.length;n+=1)S(n);G()}A&&A.p&&(!_||4194304&e[0])&&a(A,q,t,t[22],_?c(q,t[22],e,nt):u(t[22]),ot),(!_||2&e[0]&&y!==(y=dt+" "+t[1]+" table svelte-mvio91"))&&$(n,"class",y),(!_||4&e[0])&&x(n,"height",t[2]),(!_||1024&e[0])&&x(n,"--bw-svt-p-top",t[10]+"px"),(!_||32&e[0])&&x(n,"--bw-svt-p-bottom",t[5]+"px"),(!_||128&e[0])&&x(n,"--bw-svt-head-height",t[7]+"px"),(!_||256&e[0])&&x(n,"--bw-svt-foot-height",t[8]+"px"),(!_||16&e[0])&&x(n,"--bw-svt-avg-row-height",t[4]+"px"),(!_||3&e[0])&&C(n,"require-border-collapse",t[0])},i(t){if(!_){V(B,t);for(let t=0;t<N.length;t+=1)V(M[t]);V(A,t),_=!0}},o(t){K(B,t),M=M.filter(Boolean);for(let t=0;t<M.length;t+=1)K(M[t]);K(A,t),_=!1},d(n){n&&f(e),B&&B.d(n),t[24](null),r(),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(M,n),t[26](null),A&&A.d(n),w(),t[28](null),k(),j=!1,E()}}}const dt="tablesort",ht="sortable",ft="ascending",pt="descending";function mt(t,e,n){const o=getComputedStyle(t,e);return parseInt(o[n])}function gt(t,e,n){let o,r,s,i,l,c,a,u,{$$slots:d={},$$scope:h}=e,{items:f}=e,{requireBorderCollapse:p=!1}=e,{class:m=""}=e,{height:g="100%"}=e,{itemHeight:b}=e,{start:$=0}=e,{end:v=0}=e,w=0,x=0,y=0,k=[],_=0,T=0;async function C(t,e,o){const{scrollTop:s}=a;await L();let i=_-(s-x),c=$;for(;i<e-x&&c<t.length;){let t=l[c-$];t||(n(15,v=c+1),await L(),t=l[c-$]);i+=k[c]=o||t.getBoundingClientRect().height,c+=1}n(15,v=c);const u=t.length-v;n(4,r=(_+i)/v),n(5,w=u*r+y),k.length=t.length,await j(0,{behavior:"auto"})}async function j(t,e){const{scrollTop:n}=a;e={left:0,top:n+(t-$)*(b||r),behavior:"smooth",...e},a.scrollTo(e)}let H=[[]];function N(t,e){const o=t.dataset.sort;e?H[H.length-1][0]===o?n(20,H[H.length-1]=[o,(H[H.length-1][1]+1)%2],H):n(20,H=[...H,[o,0]]):1===H.length&&H[0][0]===o?n(20,H[0]=[o,(H[0][1]+1)%2],H):(!function(){const t=c.getElementsByTagName("th");for(let e=0;e<t.length;e++)t[e].dataset.sort&&(t[e].className=ht)}(),n(20,H=[[o,0]])),t.className="sortable "+(H[H.length-1][1]?pt:ft)}var M;return M=()=>{l=s.children,n(19,i=!0),C(f,T,b);const t=c.getElementsByTagName("th");for(let e=0;e<t.length;e++)t[e].dataset.sort&&(t[e].className=ht,t[e].onclick=n=>N(t[e],n.shiftKey)),"descending"===t[e].dataset.sortInitial?(t[e].className="sortable descending",n(20,H=[...H,[t[e].dataset.sort,1]])):null!=t[e].dataset.sortInitial&&(t[e].className="sortable ascending",n(20,H=[...H,[t[e].dataset.sort,0]]))},E().$$.on_mount.push(M),t.$$set=t=>{"items"in t&&n(16,f=t.items),"requireBorderCollapse"in t&&n(0,p=t.requireBorderCollapse),"class"in t&&n(1,m=t.class),"height"in t&&n(2,g=t.height),"itemHeight"in t&&n(17,b=t.itemHeight),"start"in t&&n(14,$=t.start),"end"in t&&n(15,v=t.end),"$$scope"in t&&n(22,h=t.$$scope)},t.$$.update=()=>{1114112&t.$$.dirty[0]&&n(21,o=function(t,e){return t.sort(((t,n)=>{for(let[o,r]of e){const e=0===r?1:-1;let s=0;if(s="number"==typeof t[o]?e*(t[o]-n[o]):e*t[o].localeCompare(n[o]),s)return s}return 0})),t}([...f],H)),2752520&t.$$.dirty[0]&&i&&C(o,T,b),2146304&t.$$.dirty[0]&&n(12,u=o.slice($,v).map(((t,e)=>({index:e+$,data:t}))))},[p,m,g,T,r,w,s,x,y,c,_,a,u,async function(){l=s.children;const t=o.length<$,e=mt(l[1],null,"border-bottom-width"),i=mt(l[1],null,"border-top-width"),u=mt(c,null,"border-top-width"),d=mt(c,null,"border-bottom-width"),h=p?Math.max(e,i):0;t&&await j(o.length-1,{behavior:"auto"});const{scrollTop:f}=a;let m=0;for(let t=0;t<l.length;t+=1)k[$+t]=b||l[t].getBoundingClientRect().height;let g=0,y=x+i/2,C=[];for(;g<o.length;){const t=k[g]||r;if(C[g]=t,y+t+h>f){m=g,n(10,_=y-(p?(d+u)/2:x+i/2));break}y+=t,g+=1}for(m=Math.max(0,m);g<o.length;){if(y+=k[g]||r,g+=1,y>f+T)break}n(14,$=m),n(15,v=g);const E=o.length-v;0===v&&n(15,v=10),n(4,r=y/v);let H=E*r;for(;g<o.length;)g+=1,k[g]=r;n(5,w=H),isFinite(w)||n(5,w=2e5)},$,v,f,b,j,i,H,o,h,d,function(t){B[t?"unshift":"push"]((()=>{c=t,n(9,c)}))},function(){x=this.offsetHeight,n(7,x)},function(t){B[t?"unshift":"push"]((()=>{s=t,n(6,s)}))},function(){y=this.offsetHeight,n(8,y)},function(t){B[t?"unshift":"push"]((()=>{a=t,n(11,a)}))},function(){T=this.offsetHeight,n(3,T)}]}class bt extends et{constructor(t){super(),tt(this,t,gt,ut,s,{items:16,requireBorderCollapse:0,class:1,height:2,itemHeight:17,start:14,end:15,scrollToIndex:18},null,[-1,-1])}get scrollToIndex(){return this.$$.ctx[18]}}function $t(e){let n;return{c(){n=p("p"),n.textContent=`${e[15].message}`,x(n,"color","red")},m(t,e){h(t,n,e)},p:t,i:t,o:t,d(t){t&&f(n)}}}function vt(t){let e,n,o,r,s,i,l,c,a,u,b,$,w,x,y,k,_,T,C,j,E,H,N,M;function S(e){t[9](e)}function q(e){t[10](e)}let A={items:t[5],class:"test1 test2",$$slots:{tbody:[xt,({item:t})=>({14:t}),({item:t})=>t?16384:0],thead:[wt]},$$scope:{ctx:t}};function L(e){t[11](e)}function W(e){t[12](e)}void 0!==t[1]&&(A.start=t[1]),void 0!==t[3]&&(A.end=t[3]),a=new bt({props:A}),B.push((()=>Q(a,"start",S))),B.push((()=>Q(a,"end",q)));let O={items:t[5],class:"test1 test2",requireBorderCollapse:"true",$$slots:{tbody:[kt,({item:t})=>({14:t}),({item:t})=>t?16384:0],thead:[yt]},$$scope:{ctx:t}};return void 0!==t[2]&&(O.start=t[2]),void 0!==t[4]&&(O.end=t[4]),E=new bt({props:O}),B.push((()=>Q(E,"start",L))),B.push((()=>Q(E,"end",W))),{c(){e=p("p"),e.textContent="Without border-collapse:",n=g(),o=p("p"),r=m("Start: "),s=m(t[1]),i=m(", end: "),l=m(t[3]),c=g(),X(a.$$.fragment),$=g(),w=p("p"),w.textContent="With border-collapse:",x=g(),y=p("p"),k=m("Start: "),_=m(t[2]),T=m(", end: "),C=m(t[4]),j=g(),X(E.$$.fragment)},m(t,u){h(t,e,u),h(t,n,u),h(t,o,u),d(o,r),d(o,s),d(o,i),d(o,l),h(t,c,u),Y(a,t,u),h(t,$,u),h(t,w,u),h(t,x,u),h(t,y,u),d(y,k),d(y,_),d(y,T),d(y,C),h(t,j,u),Y(E,t,u),M=!0},p(t,e){(!M||2&e)&&v(s,t[1]),(!M||8&e)&&v(l,t[3]);const n={};32&e&&(n.items=t[5]),81920&e&&(n.$$scope={dirty:e,ctx:t}),!u&&2&e&&(u=!0,n.start=t[1],I((()=>u=!1))),!b&&8&e&&(b=!0,n.end=t[3],I((()=>b=!1))),a.$set(n),(!M||4&e)&&v(_,t[2]),(!M||16&e)&&v(C,t[4]);const o={};32&e&&(o.items=t[5]),81920&e&&(o.$$scope={dirty:e,ctx:t}),!H&&4&e&&(H=!0,o.start=t[2],I((()=>H=!1))),!N&&16&e&&(N=!0,o.end=t[4],I((()=>N=!1))),E.$set(o)},i(t){M||(V(a.$$.fragment,t),V(E.$$.fragment,t),M=!0)},o(t){K(a.$$.fragment,t),K(E.$$.fragment,t),M=!1},d(t){t&&(f(e),f(n),f(o),f(c),f($),f(w),f(x),f(y),f(j)),Z(a,t),Z(E,t)}}}function wt(e){let n;return{c(){n=p("tr"),n.innerHTML='<th data-sort="title">Title</th> <th data-sort="user">User</th> <th data-sort="domain">Domain</th> <th data-sort="time" data-sort-initial="descending">Time ago</th> <th data-sort="comments_count">Comments</th>',$(n,"slot","thead"),$(n,"role","row")},m(t,e){h(t,n,e)},p:t,d(t){t&&f(n)}}}function xt(t){let e,n,o,r,s,i,l,c,a,u,b,w,x,y,k,_,T,C=t[14].title+"",j=t[14].user+"",E=t[14].domain+"",H=t[14].time_ago+"",B=t[14].comments_count+"";return{c(){e=p("tr"),n=p("td"),o=p("a"),r=m(C),i=g(),l=p("td"),c=m(j),a=g(),u=p("td"),b=m(E),w=g(),x=p("td"),y=m(H),k=g(),_=p("td"),T=m(B),$(o,"href",s=t[14].url),$(o,"target","_blank"),$(n,"class","td svelte-1gijx4l"),$(l,"class","td svelte-1gijx4l"),$(u,"class","td svelte-1gijx4l"),$(x,"class","td svelte-1gijx4l"),$(_,"class","td svelte-1gijx4l"),$(e,"slot","tbody"),$(e,"class","tr"),$(e,"role","row")},m(t,s){h(t,e,s),d(e,n),d(n,o),d(o,r),d(e,i),d(e,l),d(l,c),d(e,a),d(e,u),d(u,b),d(e,w),d(e,x),d(x,y),d(e,k),d(e,_),d(_,T)},p(t,e){16384&e&&C!==(C=t[14].title+"")&&v(r,C),16384&e&&s!==(s=t[14].url)&&$(o,"href",s),16384&e&&j!==(j=t[14].user+"")&&v(c,j),16384&e&&E!==(E=t[14].domain+"")&&v(b,E),16384&e&&H!==(H=t[14].time_ago+"")&&v(y,H),16384&e&&B!==(B=t[14].comments_count+"")&&v(T,B)},d(t){t&&f(e)}}}function yt(e){let n;return{c(){n=p("tr"),n.innerHTML='<th data-sort="title">Title</th> <th data-sort="user">User</th> <th data-sort="domain">Domain</th> <th data-sort="time" data-sort-initial="descending">Time ago</th> <th data-sort="comments_count">Comments</th>',$(n,"slot","thead"),$(n,"role","row")},m(t,e){h(t,n,e)},p:t,d(t){t&&f(n)}}}function kt(t){let e,n,o,r,s,i,l,c,a,u,b,w,x,y,k,_,T,C=t[14].title+"",j=t[14].user+"",E=t[14].domain+"",H=t[14].time_ago+"",B=t[14].comments_count+"";return{c(){e=p("tr"),n=p("td"),o=p("a"),r=m(C),i=g(),l=p("td"),c=m(j),a=g(),u=p("td"),b=m(E),w=g(),x=p("td"),y=m(H),k=g(),_=p("td"),T=m(B),$(o,"href",s=t[14].url),$(o,"target","_blank"),$(n,"class","td svelte-1gijx4l"),$(l,"class","td svelte-1gijx4l"),$(u,"class","td svelte-1gijx4l"),$(x,"class","td svelte-1gijx4l"),$(_,"class","td svelte-1gijx4l"),$(e,"slot","tbody"),$(e,"class","tr"),$(e,"role","row")},m(t,s){h(t,e,s),d(e,n),d(n,o),d(o,r),d(e,i),d(e,l),d(l,c),d(e,a),d(e,u),d(u,b),d(e,w),d(e,x),d(x,y),d(e,k),d(e,_),d(_,T)},p(t,e){16384&e&&C!==(C=t[14].title+"")&&v(r,C),16384&e&&s!==(s=t[14].url)&&$(o,"href",s),16384&e&&j!==(j=t[14].user+"")&&v(c,j),16384&e&&E!==(E=t[14].domain+"")&&v(b,E),16384&e&&H!==(H=t[14].time_ago+"")&&v(y,H),16384&e&&B!==(B=t[14].comments_count+"")&&v(T,B)},d(t){t&&f(e)}}}function _t(e){let n;return{c(){n=m("Loading...")},m(t,e){h(t,n,e)},p:t,i:t,o:t,d(t){t&&f(n)}}}function Tt(t){let e,n,o,r,s,i,l,c,a,u,d,$={ctx:t,current:null,token:null,hasCatch:!0,pending:_t,then:vt,catch:$t,error:15,blocks:[,,,]};return function(t,e){const n=e.token={};function o(t,o,r,s){if(e.token!==n)return;e.resolved=s;let i=e.ctx;void 0!==r&&(i=i.slice(),i[r]=s);const l=t&&(e.current=t)(i);let c=!1;e.block&&(e.blocks?e.blocks.forEach(((t,n)=>{n!==o&&t&&(P(),K(t,1,1,(()=>{e.blocks[n]===t&&(e.blocks[n]=null)})),G())})):e.block.d(1),l.c(),V(l,1),l.m(e.mount(),e.anchor),c=!0),e.block=l,e.blocks&&(e.blocks[o]=l),c&&z()}if(!(r=t)||"object"!=typeof r&&"function"!=typeof r||"function"!=typeof r.then){if(e.current!==e.then)return o(e.then,1,e.value,t),!0;e.resolved=t}else{const n=E();if(t.then((t=>{j(n),o(e.then,1,e.value,t),j(null)}),(t=>{if(j(n),o(e.catch,2,e.error,t),j(null),!e.hasCatch)throw t})),e.current!==e.pending)return o(e.pending,0),!0}var r}(t[6],$),{c(){e=p("h1"),e.textContent="Virtual Table Test",n=g(),o=p("p"),o.innerHTML='This is an example-project for the Svelte Virtual (Sortable) Table\n    component. Checkout the source on <a href="https://github.com/BernhardWebstudio/svelte-virtual-table">GitHub</a>. The table&#39;s example content is loaded from HackerNews — all rights\n    reserved. The author has no association with Svelte or Hacker News and is\n    not liable and/or otherwise responsible for any of the contents in these tables.',r=m("\n\nFilter:\n"),s=p("input"),i=g(),$.block.c(),l=g(),c=p("p"),c.innerHTML='Thanks for checking out this Demo. Refer to the <a href="https://github.com/BernhardWebstudio/svelte-virtual-table#readme">README</a>\n    of the original project on how to use this component and the\n    <a href="https://github.com/BernhardWebstudio/svelte-virtual-table/issues">GitHub-project</a> in general for known issues.'},m(f,p){h(f,e,p),h(f,n,p),h(f,o,p),h(f,r,p),h(f,s,p),w(s,t[0]),h(f,i,p),$.block.m(f,$.anchor=p),$.mount=()=>l.parentNode,$.anchor=l,h(f,l,p),h(f,c,p),a=!0,u||(d=b(s,"input",t[8]),u=!0)},p(e,[n]){t=e,1&n&&s.value!==t[0]&&w(s,t[0]),function(t,e,n){const o=e.slice(),{resolved:r}=t;t.current===t.then&&(o[t.value]=r),t.current===t.catch&&(o[t.error]=r),t.block.p(o,n)}($,t,n)},i(t){a||(V($.block),a=!0)},o(t){for(let t=0;t<3;t+=1){K($.blocks[t])}a=!1},d(t){t&&(f(e),f(n),f(o),f(r),f(s),f(i),f(l),f(c)),$.block.d(t),$.token=null,$=null,u=!1,d()}}}function Ct(t,e,n){let o,r=[];const s=async function(){let t=[];for(let e=1;e<5;e++){let n=await fetch(`https://node-hnapi.herokuapp.com/news?page=${e}`),o=await n.json();t=t.concat(o)}return n(7,r=t),r}();let i,l,c,a,u="";return t.$$.update=()=>{129&t.$$.dirty&&n(5,o=r.filter((t=>-1!==t.title.toUpperCase().indexOf(u.toUpperCase()))))},[u,i,l,c,a,o,s,r,function(){u=this.value,n(0,u)},function(t){i=t,n(1,i)},function(t){c=t,n(3,c)},function(t){l=t,n(2,l)},function(t){a=t,n(4,a)}]}return new class extends et{constructor(t){super(),tt(this,t,Ct,Tt,s,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
