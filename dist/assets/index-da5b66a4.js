(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=s(i);fetch(i.href,o)}})();const j=new Set,X=new Set;function O(e){return typeof e=="function"&&!!e.isT}function R(e){return typeof e=="object"&&e!==null&&"$on"in e&&typeof e.$on=="function"}function re(e){return"$on"in e}function oe(e){return(t,s)=>{function n(){const i=Array.from(j);j.clear();const o=Array.from(X);X.clear(),i.forEach(r=>r(t,s)),o.forEach(r=>r()),j.size&&setTimeout(n)}j.size||setTimeout(n),j.add(e)}}const T=new Map;function P(e,t={}){if(R(e)||typeof e!="object")return e;const s=t.o||new Map,n=t.op||new Map,i=Array.isArray(e),o=[],r=i?[]:Object.create(e,{});for(const a in e){const d=e[a];typeof d=="object"&&d!==null?(r[a]=R(d)?d:P(d),o.push(a)):r[a]=d}const l=a=>(d,h)=>{let c=s.get(d),w=n.get(h);c||(c=new Set,s.set(d,c)),w||(w=new Set,n.set(h,w)),c[a](h),w[a](d)},u=l("add"),g=l("delete"),v=(a,d,h)=>{s.has(a)&&s.get(a).forEach(c=>c(d,h))},p={$on:u,$off:g,_em:v,_st:()=>({o:s,op:n,r,p:f._p}),_p:void 0},f=new Proxy(r,{has(a,d){return d in p||d in a},get(...a){const[,d]=a;if(Reflect.has(p,d))return Reflect.get(p,d);const h=Reflect.get(...a);return le(f,d),i&&d in Array.prototype?ae(d,r,f,h):h},set(...a){const[d,h,c]=a,w=Reflect.get(d,h);if(Reflect.has(p,h))return Reflect.set(p,h,c);if(c&&R(w)){const E=w,N=E._st(),H=R(c)?de(c,E):P(c,N);return Reflect.set(d,h,H),v(h,H),N.o.forEach((ze,B)=>{const q=Reflect.get(w,B),G=Reflect.get(H,B);q!==G&&E._em(B,G,q)}),!0}const y=Reflect.set(...a);return y&&(w!==c&&v(h,c,w),f._p&&f._p[1]._em(...f._p)),y}});return t.p&&(f._p=t.p),o.map(a=>{f[a]._p=[a,f]}),f}function le(e,t){T.forEach(s=>{let n=s.get(e);n||(n=new Set,s.set(e,n)),n.add(t)})}function ae(e,t,s,n){const i=(...o)=>{const r=Array.prototype[e].call(t,...o);if(t.forEach((l,u)=>s._em(String(u),l)),s._p){const[l,u]=s._p;u._em(l,s)}return r};switch(e){case"shift":case"pop":case"sort":case"reverse":case"copyWithin":return i;case"unshift":case"push":case"fill":return(...o)=>i(...o.map(r=>P(r)));case"splice":return(o,r,...l)=>i(o,r,...l.map(u=>P(u)));default:return n}}function de(e,t){const s=t._st();return s.o&&s.o.forEach((n,i)=>{n.forEach(o=>{e.$on(i,o)})}),s.p&&(e._p=s.p),e}function U(e,t){const s=Symbol();T.has(s)||T.set(s,new Map);let n=new Map;const i=oe(o);function o(){T.set(s,new Map);const r=e(),l=T.get(s);return T.delete(s),n.forEach((u,g)=>{const v=l.get(g);v&&v.forEach(k=>u.delete(k)),u.forEach(k=>g.$off(k,i))}),l.forEach((u,g)=>{u.forEach(v=>g.$on(v,i))}),n=l,t?t(r):r}return re(e)&&e.$on(o),o()}const D=new WeakMap,K={},V="➳❍",Y="❍⇚",Z=`<!--${V}-->`,ce=`<!--${Y}-->`;function S(e,...t){const s=[];let n="";const i=(l,u)=>{if(typeof l=="function"){let g=()=>{};return s.push(Object.assign((...v)=>l(...v),{e:l,$on:v=>{g=v},_up:v=>{l=v,g()}})),u+Z}return Array.isArray(l)?l.reduce((g,v)=>i(v,g),u):u+l},o=()=>(n||(!t.length&&e.length===1&&e[0]===""?n="<!---->":n=e.reduce(function(u,g,v){return u+=g,t[v]!==void 0?i(t[v],u):u},"")),n),r=l=>{const u=ee(o()),g=F(u,{i:0,e:s});return l?g(l):g()};return r.isT=!0,r._k=0,r._h=()=>[o(),s,r._k],r.key=l=>(r._k=l,r),r}function F(e,t){const s=document.createDocumentFragment();let n;for(;n=e.item(0);){if(n.nodeType===8&&n.nodeValue===V){s.append(ge(n,t));continue}n instanceof Element&&ue(n,t),n.hasChildNodes()&&F(n.childNodes,t)(n),s.append(n),n instanceof HTMLOptionElement&&(n.selected=n.defaultSelected)}return i=>i?(i.appendChild(s),i):s}function ue(e,t){var s;const n=[];let i=0,o;for(;o=e.attributes[i++];){if(t.i>=t.e.length)return;if(o.value!==Z)continue;let r=o.name;const l=t.e[t.i++];if(r.charAt(0)==="@"){const u=r.substring(1);e.addEventListener(u,l),D.has(e)||D.set(e,new Map),(s=D.get(e))===null||s===void 0||s.set(u,l),n.push(r)}else{const u=r==="value"&&"value"in e||r==="checked"||r.startsWith(".")&&(r=r.substring(1));U(l,g=>{u&&(e[r]=g,e.getAttribute(r)!=g&&(g=!1)),g!==!1?e.setAttribute(r,g):(e.removeAttribute(r),i--)})}}n.forEach(r=>e.removeAttribute(r))}function pe(e){e.forEach(fe)}function fe(e){var t;e.remove(),(t=D.get(e))===null||t===void 0||t.forEach((s,n)=>e.removeEventListener(n,s))}function ge(e,t){const s=document.createDocumentFragment();e.remove();const n=t.e[t.i++];if(n&&O(n.e))s.appendChild(W().add(n.e)());else{let i;s.appendChild((i=U(n,o=>he(o,i)))())}return s}function he(e,t){const s=typeof t=="function",n=s?t:W();return Array.isArray(e)?e.forEach(i=>n.add(i)):n.add(e),s&&n._up(),n}function ee(e){var t;const n=((t=K[e])!==null&&t!==void 0?t:(()=>{const i=document.createElement("template");return i.innerHTML=e,K[e]=i})()).content.cloneNode(!0);return n.normalize(),n.childNodes}function W(e=Symbol()){let t="",s={i:0,e:[]},n=[],i=[];const o=new Map,r=[],l=()=>{let p;if(n.length||g(),n.length===1&&!O(n[0].tpl)){const f=n[0];f.dom.length?f.dom[0].nodeValue=f.tpl:f.dom.push(document.createTextNode(f.tpl)),p=f.dom[0]}else p=v(F(ee(t),s)());return u(),p};l.ch=()=>i,l.l=0,l.add=p=>{if(!p&&p!==0)return l;let f=[],a,d="";O(p)&&([d,f,a]=p._h()),t+=d,t+=ce;const h=a&&o.get(a),c=h||{html:d,exp:f,dom:[],tpl:p,key:a};return n.push(c),a&&(h?h.exp.forEach((w,y)=>w._up(f[y].e)):o.set(a,c)),s.e.push(...f),l.l++,l},l._up=()=>{const p=W(e);let f=0,a=i[0].dom[0];n.length||g(document.createComment(""));const d=()=>{if(!p.l)return;const c=p(),w=c.lastChild;a[f?"after":"before"](c),k(p,n,f),a=w};n.forEach((c,w)=>{const y=i[w];c.key&&c.dom.length?(d(),(!y||y.dom!==c.dom)&&a[w?"after":"before"](...c.dom),a=c.dom[c.dom.length-1]):y&&c.html===y.html&&!y.key?(d(),y.exp.forEach((E,N)=>E._up(c.exp[N].e)),c.exp=y.exp,c.dom=y.dom,a=c.dom[c.dom.length-1],me(c)&&a instanceof Text&&(a.nodeValue=c.tpl)):(y&&c.html!==y.html&&!y.key&&r.push(...y.dom),p.l||(f=w),p.add(c.tpl))}),d();let h=a==null?void 0:a.nextSibling;for(;h&&e in h;)r.push(h),h=h.nextSibling;pe(r),u()};const u=()=>{r.length=0,t="",l.l=0,s={i:0,e:[]},i=[...n],n=[]},g=p=>{t="<!---->",n.push({html:t,exp:[],dom:p?[p]:[],tpl:S`${t}`,key:0})},v=p=>{let f=0;const a=[];return p.childNodes.forEach(d=>{if(d.nodeType===8&&d.data===Y){f++,a.push(d);return}Object.defineProperty(d,e,{value:e}),n[f].dom.push(d)}),a.forEach(d=>d.remove()),p},k=(p,f,a)=>{p.ch().forEach((d,h)=>{f[a+h].dom=d.dom})};return l}function me(e){return e.dom.length===1&&!O(e.tpl)}const b=S,C=P,te=U,A={xo:0,yo:.2,ho:9.4,wd:9.5,dy:12.4},L=e=>`S l1;${e.xo},${e.yo},${e.ho},${e.dy},${e.wd}`;function $(e,t){const s=e.split(`
`),n=Math.max(...s.map(g=>g.length)),i=t||9,o=3,r=i/(s.length/2.5),l=i/(n/5.5);return Number(Math.min(i,Math.max(o,Math.min(r,l))).toFixed(2))}function ne(e,t){const s=e.split(`
`),n=t||6,i=.5,o=n/(s.length/1.3);return Number(Math.min(n,Math.max(i,o)).toFixed(2))}function J(){return`m m
J
${L(A)}
O R
A 1
`}function xe(){return`m m
J
${L(A)}
T 0.5,4,0,3,pt5;WARMUP
O R
A 1
`}function be(e,t,s=7,n=-1){s===-1&&(s=$(e)),n===-1&&(n=ne(e)),console.log("fontSize:",s),console.log("lineHeight:",n);const o=e.split(`
`).map((r,l)=>`T 0.5,${2+n*l},0,3,pt${s};${r}`).join(`
`);return`${t>1?J():""}m m
J
${L(A)}
O R
${o}
A ${t}
`}function ve(e,t,s=!0,n=7){n===-1&&(n=$(e,11)),console.log("fontSize:",n);const i=5.8,o=A.wd-.5,l=e.split(`
`).map((u,g)=>`T 0.0,${i},0,3,pt${n}${s?",b":""};${u}[J:c${o}]`).join(`
`);return`${t>1?J():""}m m
J
${L(A)}
O R
${l}
A ${t}
`}function we(e,{label:t=null,labelBold:s=!0,amount:n=1,redundancyLevel:i=1}){let o=$(String(t),7);const r=A.wd-.5;let l=t?`B 1.6,0.5,0,QRCODE+EL${i},0.3;${e}[J:c${r}]
T 0,9.0,0,3,pt${o}${s?",b":""};${t}[J:c${r}]
`:`B 0.2,0.2,0,QRCODE+EL${i},0.4;${e}`;return`${n>1?J():""}m m
J
${L(A)}
O R
${l}
A ${n}
`}function ye(e,t,s=null,n=1){if(e=Number(e),t=Number(t),isNaN(e)||isNaN(t))return;let i=e<t;const o=Math.ceil((String(e).length+String(t).length)/2);let r=Math.abs(t-e)+1,l=String(e).length>String(t).length?String(e):String(t),u=`[SER:${String(e).padStart(o,"0")},${i?"1":"-1"},1]`,g=`${s?`${s} `:""}${u}`,v=$(`${s?`${s} `:""}${l}`,7);const k=A.wd-.5;let p=`B 1.5,0.5,0,QRCODE+EL${n},0.3;${u}[J:c${k}]
T 0,8.5,0,3,pt${v},b;${g}[J:c${k}]
`;return`${r>1?xe():""}m m
J
${L(A)}
O R
${p}
A ${r}
`}function $e(e){return`${e}
`}class ke{constructor(t,s){this.state=t,console.log("routesObject:",s),this.routes=s}routeToName(t){return t.toLowerCase().replace(/[\s_]/g,"-")}nameToRoute(t){return Object.entries(this.routes).find(([s,n])=>n.toLowerCase().replace(/[\s_]/g,"-")===t)[0]}restore(){const t=window.location.hash;if(t){console.log("this.routes:",this.routes);const s=Object.values(this.routes).find(n=>this.routeToName(n)===t.slice(1));s&&(this.state.nav=s)}}to(t){window.location.hash=this.routeToName(t),this.state.nav=t}}class se{constructor({baseUrl:t="http://localhost:3000",extension:s=""}){this.baseUrl=t,this.extension=s}async uploadFile(t){console.log("fileContents:",t),await(await fetch(`${this.baseUrl}/uploadFile${this.extension}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({content:t})})).json()}}const Q="data:image/png;base64,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",_={new:{description:"New Node.js-based backend @ EELPC011",config:{baseUrl:"http://eelpc011:3000",extension:""}},remote:{description:"Remote php-based backend @ poland.gsi.de",config:{baseUrl:"http://poland.gsi.de/labelPrinter/php",extension:".php"}},local:{description:"Local Node.js backend at port 3000",config:{baseUrl:"http://localhost:3000",extension:""}},forwarded:{description:"Remote Node.js backend",config:{baseUrl:"https://08shf4mf-3000.euw.devtunnels.ms",extension:""}}},x={PCB_QR_CODES:"PCB QR Codes",SIMPLE_TEXT:"Simple Text",MULTI_LINE_TEXT:"Multi-line Text",QR_CODE:"QR Code",CUSTOM:"Custom Label"},m=C({nav:x.PCB_QR_CODES,tabs:{},backend:"remote",maxSafeAmount:99,api:new se(_.remote)});te(()=>m.backend,e=>{m.api=new se(_[e].config)});console.log("tabs:",x);const ie=new ke(m,x);ie.restore();function z(e){if(e>m.maxSafeAmount){let t=prompt(`You're about to print a large number of labels. To continue, please enter the requested amount below. Requested amount: ${e}`);if(t===null)throw new Error("Aborted");if(Number(t)!==e)throw new Error("Amount not confirmed")}}function Ae(e){return(!e||typeof e!="function")&&(e=()=>{}),t=>{t.stopPropagation(),e(t)}}function Ce({trigger:e,content:t}){let s=C({showContent:!1});return b`
    <button type="button" @click="${()=>s.showContent=!s.showContent}">${()=>e}</button>
    ${()=>s.showContent?b`
      <div class="fixed inset-0 grid content-center place-content-center w-[100vw] h-[100vh] z-40 bg-black/20" @click="${()=>s.showContent=!1}">
        <div class="z-50 grid w-min content-center p-8" @click="${Ae()}">
          <div class="relative mx-auto w-full sm:max-w-md md:max-w-lg min-h-[16rem]">
            <button type="button" class="absolute top-0 right-0 p-4" @click="${()=>s.showContent=!1}">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            </button>
            ${()=>t}
          </div>
        </div>
      </div>
    `:null}
  `}const Te=b`
  <header class="flex flex-col gap-6 p-6 md:rounded-br-[4rem] md:max-w-[75vw] lg:max-w-[60vw] bg-background-blue mb-10">
    <h1 class="font-semibold text-3xl text-dark-blue">EEL Small Label Printer</h1>
    <p class="">Used for i.e. printing QR codes that identify PCBs within the AOI</p>
  </header>

  <div class="absolute top-6 right-6">
    ${()=>Ce({trigger:b`
        <button
          class="flex flex-row py-2 px-3 gap-2 bg-light-blue rounded-lg hover:bg-blue"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-[1.5] text-text-blue" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
          </svg>
          <span>Settings</span>
        </button>
      `,content:b`
        <div class="bg-background-blue p-8 rounded-lg flex flex-col gap-4 h-full">
          <h2 class="text-lg font-semibold mb-2">Settings</h2>
          <div class="flex flex-row gap-2">
            <span>Backend:</span>
            <select
              @change="${e=>{console.log("e:",e),m.backend=e.target.value,console.log("state.api:",m.api)}}"
            >
              ${()=>Object.entries(_).map(([e,t])=>(console.log("state.backend:",m.backend),console.log("key, value:",e,t),b`
                <option value="${e}" selected="${()=>m.backend==e}">${t.description}</option>
              `))}
            </select>
          </div>
        </div>
      `})}
  </div>
  
  `,Le=b`
  <nav style="grid-template-columns: repeat(${Object.keys(x).length}, minmax(0, 1fr));" class="grid gap-4 w-full bg-background-blue rounded-2xl p-2.5">
    ${()=>Object.values(x).map(e=>b`
      <button
        class="${()=>`items-center p-3 text-center rounded-xl ${m.nav===e?"bg-dark-blue text-white font-bold":"font-semibold text-text-blue bg-light-blue hover:bg-blue"}`}"
        @click="${()=>ie.to(e)}"
      >
        ${e}
      </button>
    `)}
  </nav>
`;function M(){return b`
    <button
      class="pl-3 hover:bg-blue bg-light-blue pr-4 active:bg-bluer text-text-blue py-2 rounded-lg justify-center items-center gap-2 flex"
      @click="${()=>{try{m.tabs[m.nav].validate();let e=m.tabs[m.nav].getCode();console.log("print job:",e),m.api.uploadFile(e)}catch(e){alert(e)}}}"
    >
      <svg
        class="stroke-[1.5px] w-6 h-6"
        viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2"></path>
        <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4"></path>
        <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z"></path>
      </svg>
      <span class="">Start Printing</span>
    </button>
  `}m.tabs[x.PCB_QR_CODES]=I(C({startId:1,endId:1,amount:1,includePrefix:!0,prefixText:"SN:"}),e=>ye(e.startId,e.endId,e.includePrefix?e.prefixText:null),e=>{z(e.amount)},e=>b`
    <div class="bg-background-blue px-12 py-8 bg-slate-100 rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
      <div class="flex flex-row items-center gap-8 w-full">
        <div class="flex flex-col gap-1 items-center">
          <div class="flex flex-row items-center gap-2">
            <div class="flex flex-col items-center gap-0.5">
              <div class="px-0.5 py-1 flex flex-col justify-center overflow-hidden items-center gap-0.5 w-24 h-24 font-medium bg-white rounded-xl">
                <div class="bg-white flex-shrink overflow-hidden aspect-square">
                  <img src="${Q}" />
                </div>
                ${()=>e.includePrefix?b`
                  <span style="${()=>`font-size: ${$(`${e.prefixText} ${e.startId}`)*2.6}px`}" class="leading-4 tracking-wide whitespace-nowrap font-semibold">${()=>`${e.prefixText} ${e.startId}`}</span>
                `:b`
                  <span style="${()=>`font-size: ${$(String(e.startId))*2.6}px`}" class="leading-4 tracking-wider whitespace-nowrap font-semibold">${()=>e.startId}</span>
                `}
              </div>
              <span class="text-xs">First Label</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-big-right-lines" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-3v-6h3z"></path>
              <path d="M3 9v6"></path>
              <path d="M6 9v6"></path>
            </svg>
            <div class="flex flex-col items-center gap-0.5">
              <div class="px-0.5 py-1 flex flex-col justify-center overflow-hidden items-center gap-0.5 w-24 h-24 font-medium bg-white rounded-xl">
                <div class="bg-white flex-shrink overflow-hidden aspect-square">
                  <img src="${Q}" />
                </div>
                ${()=>e.includePrefix?b`
                  <span style="${()=>`font-size: ${$(`${e.prefixText} ${e.endId}`)*2.6}px`}" class="leading-4 tracking-wide whitespace-nowrap font-semibold">${()=>`${e.prefixText} ${e.endId}`}</span>
                `:b`
                  <span style="${()=>`font-size: ${$(String(e.endId))*2.6}px`}" class="leading-4 tracking-wider whitespace-nowrap font-semibold">${()=>e.endId}</span>
                `}
              </div>
              <span class="text-xs">Last Label</span>
            </div>
          </div>
          <span class="text-sm">Preview</span>
        </div>
        <div class="grow shrink basis-0 ">Create a batch of QR codes containing continuous IDs, with an optional label below the QR code</div>
      </div>
      <div class="p-0 flex-col justify-start items-start gap-4 flex">
        <div class="p-0 flex-col justify-start items-start gap-2 flex">
          <div class="text-xs">Start ID (>= 0)</div>
          <input type="number" placeholder="15" class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" value="${()=>e.startId}" @input="${t=>{e.startId=Math.max(0,t.target.valueAsNumber),e.startId!=t.target.valueAsNumber&&(t.target.value=e.startId),e.amount=Math.abs(e.endId-e.startId)+1}}" />
        </div>
        <div class="p-0 justify-start items-center gap-4 inline-flex">
          <div class="p-0 flex-col justify-start items-start gap-2 inline-flex">
            <div class="text-xs">End ID (inclusive, >= 0)</div>
            <input type="number" placeholder="15" class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" value="${()=>e.endId}" @input="${t=>{e.endId=Math.max(0,t.target.valueAsNumber),e.endId!=t.target.valueAsNumber&&(t.target.value=e.endId),e.amount=Math.abs(e.endId-e.startId)+1}}" />
          </div>
          <div class="text-centertext-xs font-semibold">or</div>
          <div class="p-0 flex-col justify-start items-start gap-2 inline-flex">
            <div class="text-xs">Amount</div>
            <input type="number" placeholder="15" class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" value="${()=>e.amount}" @input="${t=>{e.amount=Math.abs(t.target.valueAsNumber),e.endId=Math.max(0,e.startId+e.amount-1)}}" />
          </div>
        </div>
        <div class="${()=>`rounded-lg flex-col justify-start items-start gap-3 flex ${e.includePrefix&&"border border-black pl-2 pr-4 pt-2 pb-4"}`}">
          <div class="p-0 justify-start items-center gap-2 inline-flex">
            <input type="checkbox" class="w-4 h-4" id="${`${x.PCB_QR_CODES}-prefix`}" checked="${()=>e.includePrefix}" @input="${t=>{e.includePrefix=t.target.checked}}" />
            <label class="" for="${`${x.PCB_QR_CODES}-prefix`}">Include Prefix</label>
          </div>
          <div class="${()=>`pl-8 flex-col justify-start items-start gap-2 flex ${!e.includePrefix&&"hidden"}`}">
            <div class="text-xs">Prefix Text</div>
            <input type="text" placeholder="SN: " class="w-48 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black disabled:cursor-not-allowed justify-start items-start gap-2 inline-flex" value="${()=>e.prefixText}" disabled="${()=>!e.includePrefix}" @input="${t=>{e.prefixText=t.target.value}}" />
          </div>
        </div>
      </div>
      ${M()}
    </div>
  `);m.tabs[x.SIMPLE_TEXT]=I(C({text:"text",amount:1,bold:!0,manualFontSize:!1,fontSize:7}),e=>ve(e.text,e.amount,e.bold,e.manualFontSize?e.fontSize:-1),e=>{z(e.amount)},e=>b`
  <div class="bg-background-blue px-12 py-8 bg-slate-100 rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
    <div class="flex flex-row items-center gap-8 w-full">
      <div class="flex flex-col gap-1 items-center">
        <div class="px-1.5 py-1 flex justify-center items-center gap-8 w-24 font-medium aspect-square bg-white rounded-xl overflow-hidden">
          <div style="${()=>`font-size: ${(e.manualFontSize?e.fontSize:$(e.text))*3.2}px;`}" class="tracking-wider w-full text-center flex-grow whitespace-pre-wrap">${()=>e.text}</div>
        </div>
        <span class="text-sm">Preview</span>
      </div>
      <div class="grow shrink basis-0 ">Create simple text labels that can contain multiple lines</div>
    </div>
    <div class="p-0 flex-col justify-start items-start gap-2 flex">
      <div class="text-xs">Text</div>
      <input
        class="w-48 overflow-hidden text-opacity-60 resize px-4 py-2 bg-white rounded-lg border border-black"
        placeholder="text"
        type="text"
        value="${()=>e.text}"
        @input="${t=>{e.text=t.target.value}}"
      />
    </div>
    <div class="p-0 flex-col justify-start items-start gap-2 inline-flex">
      <div class="text-xs">Amount</div>
      <input type="number" placeholder="15" class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" value="${()=>e.amount}" @input="${t=>{e.amount=t.target.valueAsNumber,e.endId=e.startId+e.amount}}" />
    </div>
    <div class="p-0 justify-start items-center gap-2 inline-flex">
      <input type="checkbox" id="${`${x.SIMPLE_TEXT}-bold-text`}" class="w-4 h-4" checked="${()=>e.bold}" @input="${t=>{console.log("e:",t),e.bold=t.target.checked}}" />
      <label class="" for="${`${x.SIMPLE_TEXT}-bold-text`}">Bold Text</label>
    </div>
    <div class="${()=>`rounded-lg flex-col justify-start items-start gap-3 flex ${e.manualFontSize&&"border border-black pl-2 pr-4 pt-2 pb-4"}`}">
      <div class="p-0 justify-start items-center gap-2 inline-flex">
        <input type="checkbox" id="${`${x.SIMPLE_TEXT}-manual-font-size`}" class="w-4 h-4" checked="${()=>e.manualFontSize}" @input="${t=>{console.log("e:",t),e.manualFontSize=t.target.checked}}" />
        <label class="" for="${`${x.SIMPLE_TEXT}-manual-font-size`}">Manually Set Font Size</label>
      </div>
      <div class="${()=>`pl-8 flex-col justify-start items-start gap-2 flex ${!e.manualFontSize&&"hidden"}`}">
        <div class="text-xs">Font Size</div>
        <input
          class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black disabled:cursor-not-allowed justify-start items-start gap-2 inline-flex" 
          type="number"
          placeholder="6"
          value="${()=>e.fontSize}"
          disabled="${()=>!e.manualFontSize}"
          @input="${t=>{e.fontSize=t.target.valueAsNumber}}"
        />
      </div>
    </div>
    <div class="${()=>`rounded-lg flex-col justify-start items-start gap-3 flex ${e.manualLineHeight&&"border border-black pl-2 pr-4 pt-2 pb-4"}`}">
      <div class="p-0 justify-start items-center gap-2 inline-flex">
        <input type="checkbox" id="${`${x.SIMPLE_TEXT}-manual-line-height`}" class="w-4 h-4" checked="${()=>e.manualLineHeight}" @input="${t=>{console.log("e:",t),e.manualLineHeight=t.target.checked}}" />
        <label class="" for="${`${x.SIMPLE_TEXT}-manual-line-height`}">Manually Set Line Height</label>
      </div>
      <div class="${()=>`pl-8 flex-col justify-start items-start gap-2 flex ${!e.manualLineHeight&&"hidden"}`}">
        <div class="text-xs">Line Height</div>
        <input
          class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black disabled:cursor-not-allowed justify-start items-start gap-2 inline-flex" 
          type="number"
          placeholder="3"
          value="${()=>e.lineHeight}"
          disabled="${()=>!e.manualLineHeight}"
          @input="${t=>{e.lineHeight=t.target.valueAsNumber}}"
        />
      </div>
    </div>
    ${M()}
  </div>
`);m.tabs[x.MULTI_LINE_TEXT]=I(C({text:`some
sample
text`,amount:1,manualFontSize:!1,fontSize:7,manualLineHeight:!1,lineHeight:3}),e=>be(e.text,e.amount,e.manualFontSize?e.fontSize:-1,e.manualLineHeight?e.lineHeight:-1),e=>{z(e.amount)},e=>b`
  <div class="bg-background-blue px-12 py-8 bg-slate-100 rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
    <div class="flex flex-row items-center gap-8 w-full">
      <div class="flex flex-col gap-1 items-center">
        <div class="px-1.5 py-1 flex justify-center items-start gap-8 w-24 font-medium aspect-square bg-white rounded-xl overflow-hidden">
          <div style="${()=>`font-size: ${(e.manualFontSize?e.fontSize:$(e.text))*3.2}px; line-height: ${(e.manualLineHeight?e.lineHeight:ne(e.text))*10}px`}" class="tracking-wider w-full h-full flex-grow whitespace-pre-wrap">${()=>e.text}</div>
        </div>
        <span class="text-sm">Preview</span>
      </div>
      <div class="grow shrink basis-0 ">Create multi-line text labels that can contain multiple lines</div>
    </div>
    <div class="p-0 flex-col justify-start items-start gap-2 flex">
      <div class="text-xs">Text</div>
      <textarea
        class="w-48 min-h-[6rem] overflow-hidden text-opacity-60 resize px-4 py-2 bg-white rounded-lg border border-black"
        placeholder="some\nsample\ntext"
        @input="${t=>{e.text=t.target.value}}"
      >${e.text}</textarea>
    </div>
    <div class="p-0 flex-col justify-start items-start gap-2 inline-flex">
      <div class="text-xs">Amount</div>
      <input type="number" placeholder="15" class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" value="${()=>e.amount}" @input="${t=>{e.amount=t.target.valueAsNumber,e.endId=e.startId+e.amount}}" />
    </div>
    <div class="${()=>`rounded-lg flex-col justify-start items-start gap-3 flex ${e.manualFontSize&&"border border-black pl-2 pr-4 pt-2 pb-4"}`}">
      <div class="p-0 justify-start items-center gap-2 inline-flex">
        <input type="checkbox" id="${`${x.MULTI_LINE_TEXT}-manual-font-size`}" class="w-4 h-4" checked="${()=>e.manualFontSize}" @input="${t=>{console.log("e:",t),e.manualFontSize=t.target.checked}}" />
        <label class="" for="${`${x.MULTI_LINE_TEXT}-manual-font-size`}">Manually Set Font Size</label>
      </div>
      <div class="${()=>`pl-8 flex-col justify-start items-start gap-2 flex ${!e.manualFontSize&&"hidden"}`}">
        <div class="text-xs">Font Size</div>
        <input
          class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black disabled:cursor-not-allowed justify-start items-start gap-2 inline-flex" 
          type="number"
          placeholder="6"
          value="${()=>e.fontSize}"
          disabled="${()=>!e.manualFontSize}"
          @input="${t=>{e.fontSize=t.target.valueAsNumber}}"
        />
      </div>
    </div>
    <div class="${()=>`rounded-lg flex-col justify-start items-start gap-3 flex ${e.manualLineHeight&&"border border-black pl-2 pr-4 pt-2 pb-4"}`}">
      <div class="p-0 justify-start items-center gap-2 inline-flex">
        <input type="checkbox" id="${`${x.MULTI_LINE_TEXT}-manual-line-height`}" class="w-4 h-4" checked="${()=>e.manualLineHeight}" @input="${t=>{console.log("e:",t),e.manualLineHeight=t.target.checked}}" />
        <label class="" for="${`${x.MULTI_LINE_TEXT}-manual-line-height`}">Manually Set Line Height</label>
      </div>
      <div class="${()=>`pl-8 flex-col justify-start items-start gap-2 flex ${!e.manualLineHeight&&"hidden"}`}">
        <div class="text-xs">Line Height</div>
        <input
          class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black disabled:cursor-not-allowed justify-start items-start gap-2 inline-flex" 
          type="number"
          placeholder="3"
          value="${()=>e.lineHeight}"
          disabled="${()=>!e.manualLineHeight}"
          @input="${t=>{e.lineHeight=t.target.valueAsNumber}}"
        />
      </div>
    </div>
    ${M()}
  </div>
`);m.tabs[x.QR_CODE]=I(C({text:"",amount:1,includeLabel:!1,labelText:"Label"}),e=>we(e.text,{label:e.includeLabel?e.labelText:null,amount:e.amount,redundancyLevel:1,labelBold:!0}),e=>{if(!e.text||e.text.length===0)throw new Error("Text must not be empty");if(e.amount<1)throw new Error("Amount must be at least 1");if(e.includeLabel&&e.labelText.length===0)throw new Error("Label text must not be empty if label is included");z(e.amount)},e=>b`
  <div class="bg-background-blue px-12 py-8 bg-slate-100 rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
    <div class="flex flex-row items-center gap-8 w-full">
      <div class="flex flex-col gap-1 items-center">
        <div class="p-2 flex flex-col justify-center overflow-hidden items-center gap-0.5 w-24 h-24 font-medium bg-white rounded-xl">
          <div class="bg-white flex-shrink overflow-hidden aspect-square">
            <img src="${Q}" />
          </div>
          ${()=>e.includeLabel?b`
            <span style="${()=>`font-size: ${$(e.labelText)*2.5}px`}" class="text-xs font-semibold -mb-1">${()=>e.labelText}</span>
          `:null}
        </div>
        <span class="text-sm">Preview</span>
      </div>
      <div class="grow shrink basis-0 ">Create QR codes containing custom text, with an optional label below the QR code</div>
    </div>
    <div class="p-0 flex-col w-full justify-start items-start gap-4 flex">
      <div class="p-0 flex-col w-full justify-start items-start gap-2 flex">
        <div class="text-xs">Text</div>
        <textarea
          class="w-full min-h-[6rem] overflow-hidden text-opacity-60 resize px-4 py-2 bg-white rounded-lg border border-black"
          placeholder="Content of QR Code"
          @input="${t=>{e.text=t.target.value}}"
        >${e.text}</textarea>
      </div>
      <div class="p-0 flex-col justify-start items-start gap-2 inline-flex">
        <div class="text-xs">Amount</div>
        <input type="number" placeholder="15" class="w-28 text-opacity-60 px-4 py-2 bg-white rounded-lg border border-black justify-start items-start gap-2 inline-flex" value="${()=>e.amount}" @input="${t=>{e.amount=t.target.valueAsNumber,e.endId=e.startId+e.amount}}" />
      </div>
      <div class="${()=>`rounded-lg flex-col justify-start items-start gap-3 flex ${e.includeLabel&&"border border-black pl-2 pr-4 pt-2 pb-4"}`}">
        <div class="p-0 justify-start items-center gap-2 inline-flex">
          <input type="checkbox" class="w-4 h-4" id="${`${x.QR_CODE}-label`}" checked="${()=>e.includeLabel}" @input="${t=>{e.includeLabel=t.target.checked}}" />
          <label class="" for="${`${x.QR_CODE}-label`}">Include Label</label>
        </div>
        <div class="${()=>`pl-8 flex-col justify-start items-start gap-2 flex ${!e.includeLabel&&"hidden"}`}">
          <div class="text-xs">Label Text</div>
          <input type="text" placeholder="Label" class="w-48 text-opacity-60 px-4 py-2 bg-white rounded-lg disabled:cursor-not-allowed border border-black justify-start items-start gap-2 inline-flex" value="${()=>e.labelText}" disabled="${()=>!e.includeLabel}" @input="${t=>{e.labelText=t.target.value}}" />
        </div>
      </div>
    </div>
    ${M()}
  </div>
`);m.tabs[x.CUSTOM]=I(C({content:`m m
J
S l1;0,0.2,9.4,12.4,9.5
O R
T 0.0,5.8,0,3,pt11,b;text[J:c9]
A 1`}),e=>$e(e.content),e=>{z(e.amount)},e=>b`
  <div class="bg-background-blue px-12 py-8 bg-slate-100 rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
    <div class="flex flex-row items-center gap-8 w-full">
      <div class="flex flex-col gap-1 items-center">
        <div class="px-1.5 py-1 flex justify-center items-center gap-8 w-24 font-medium aspect-square bg-white rounded-xl overflow-hidden">
          <div class="italic w-full text-center flex-grow whitespace-pre-wrap">preview not available</div>
        </div>
        <span class="text-sm">Preview</span>
      </div>
      <div class="grow shrink basis-0 ">Create simple text labels that can contain multiple lines</div>
    </div>
    <div class="w-full p-0 flex-col justify-start items-start gap-2 flex">
      <div class="text-xs">Content</div>
      <textarea
        class="w-full min-h-[12rem] overflow-auto text-opacity-60 resize px-1 py-0.25 bg-white rounded-lg border border-black"
        placeholder="some\nsample\ntext"
        @input="${t=>{e.content=t.target.value}}"
      >${e.content}</textarea>
    </div>
    ${M()}
  </div>
`);te(()=>m.tabs[x.SIMPLE_TEXT].state.text,e=>{console.log("newState:",e)});const Ee=b`
  ${()=>{var e;return(e=m.tabs[m.nav])==null?void 0:e.html}}
`;function I(e,t,s,n){return{state:e,preview:b`${()=>t(e)}`,html:n(e),validate:()=>s(e),getCode:()=>t(e)}}const je=b`
  <div class="relative border border-border rounded-2xl overflow-hidden h-full py-2 px-3">
    <pre class="overflow-y-auto max-h-[70dvh]">
${()=>{var e;return(e=m.tabs[m.nav])==null?void 0:e.preview}}
    </pre>
    <button
      class="absolute bottom-5 right-5 pl-3 hover:bg-blue bg-light-blue pr-4 active:bg-bluer text-text-blue py-2 rounded-lg justify-center items-center gap-2 flex"
      @click="${()=>{if(!navigator.clipboard){alert("Cannot write to clipboard, requires HTTPS");return}navigator.clipboard.writeText(m.tabs[m.nav].getCode())}}"
    >
      <svg
        class="stroke-[1.5px] w-6 h-6"
        viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
      </svg>
      <span class="font-sans">Copy To Clipboard</span>
    </button>
  </div>  
`,Pe=b`
  <div class="relative mt-2 grid grid-cols-2 gap-2 h-auto pb-20">
    ${()=>Ee}
    ${()=>je}
  </div>
`;b`
  ${()=>Te}
  <div class="px-10">
    ${()=>Le}
    ${()=>Pe}
  </div>
  <div class="pb-30"></div>
`(document.querySelector("#app"));
