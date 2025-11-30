import{a as $,b as h,d as A}from"./chunk.DJWHC2VF.js";import{a as _,b as T,c as L}from"./chunk.KPKYWVQS.js";import{b as z}from"./chunk.SSXT3WVJ.js";import{a as p}from"./chunk.XPFMMO3L.js";function R(e,t){function i(n){let o=e.getBoundingClientRect(),a=e.ownerDocument.defaultView,l=o.left+a.pageXOffset,m=o.top+a.pageYOffset,f=n.pageX-l,w=n.pageY-m;t!=null&&t.onMove&&t.onMove(f,w)}function s(){document.removeEventListener("pointermove",i),document.removeEventListener("pointerup",s),t!=null&&t.onStop&&t.onStop()}document.addEventListener("pointermove",i,{passive:!0}),document.addEventListener("pointerup",s),(t==null?void 0:t.initialEvent)instanceof PointerEvent&&i(t.initialEvent)}var Z=typeof window!="undefined"&&"ontouchstart"in window;var I=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};function E(e,t,i){let s=n=>Object.is(n,-0)?0:n;return e<t?s(t):e>i?s(i):s(e)}var C=new Set,u=new Map,c,S="ltr",P="en",O=typeof MutationObserver!="undefined"&&typeof document!="undefined"&&typeof document.documentElement!="undefined";if(O){let e=new MutationObserver(U);S=document.documentElement.dir||"ltr",P=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function v(...e){e.map(t=>{let i=t.$code.toLowerCase();u.has(i)?u.set(i,Object.assign(Object.assign({},u.get(i)),t)):u.set(i,t),c||(c=t)}),U()}function U(){O&&(S=document.documentElement.dir||"ltr",P=document.documentElement.lang||navigator.language),[...C.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate()})}var y=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){C.add(this.host)}hostDisconnected(){C.delete(this.host)}dir(){return`${this.host.dir||S}`.toLowerCase()}lang(){return`${this.host.lang||P}`.toLowerCase()}getTranslationData(t){var i,s;let n=new Intl.Locale(t.replace(/_/g,"-")),o=n==null?void 0:n.language.toLowerCase(),a=(s=(i=n==null?void 0:n.region)===null||i===void 0?void 0:i.toLowerCase())!==null&&s!==void 0?s:"",l=u.get(`${o}-${a}`),m=u.get(o);return{locale:n,language:o,region:a,primary:l,secondary:m}}exists(t,i){var s;let{primary:n,secondary:o}=this.getTranslationData((s=i.lang)!==null&&s!==void 0?s:this.lang());return i=Object.assign({includeFallback:!1},i),!!(n&&n[t]||o&&o[t]||i.includeFallback&&c&&c[t])}term(t,...i){let{primary:s,secondary:n}=this.getTranslationData(this.lang()),o;if(s&&s[t])o=s[t];else if(n&&n[t])o=n[t];else if(c&&c[t])o=c[t];else return console.error(`No translation found for: ${String(t)}`),String(t);return typeof o=="function"?o(...i):o}date(t,i){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),i).format(t)}number(t,i){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),i).format(t)}relativeTime(t,i,s){return new Intl.RelativeTimeFormat(this.lang(),s).format(t,i)}};var M={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>e===0?"No options selected":e===1?"1 option selected":`${e} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};v(M);var N=M;var B=class extends y{};v(N);function b(e,t){let i=p({waitUntilFirstUpdate:!1},t);return(s,n)=>{let{update:o}=s,a=Array.isArray(e)?e:[e];s.update=function(l){a.forEach(m=>{let f=m;if(l.has(f)){let w=l.get(f),D=this[f];w!==D&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[n](w,D)}}),o.call(this,l)}}}var q=Object.defineProperty,G=Object.getOwnPropertyDescriptor,Y=e=>{throw TypeError(e)},r=(e,t,i,s)=>{for(var n=s>1?void 0:s?G(t,i):t,o=e.length-1,a;o>=0;o--)(a=e[o])&&(n=(s?a(t,i,n):a(n))||n);return s&&n&&q(t,i,n),n},k=(e,t,i)=>t.has(e)||Y("Cannot "+i),X=(e,t,i)=>(k(e,t,"read from private field"),i?i.call(e):t.get(e)),W=(e,t,i)=>t.has(e)?Y("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,i),F=(e,t,i,s)=>(k(e,t,"write to private field"),s?s.call(e,i):t.set(e,i),i);var j=`:host {
  box-sizing: border-box !important;
}

:host *,
:host *::before,
:host *::after {
  box-sizing: inherit !important;
}

[hidden] {
  display: none !important;
}
`,x,g=class extends L{constructor(){super(),W(this,x,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(t,i)=>{var s;if((s=this.internals)!=null&&s.states)try{i?this.internals.states.add(t):this.internals.states.delete(t)}catch(n){if(String(n).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw n}},has:t=>{var i;if(!((i=this.internals)!=null&&i.states))return!1;try{return this.internals.states.has(t)}catch(s){return!1}}};try{this.internals=this.attachInternals()}catch(t){console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let e=this.constructor;for(let[t,i]of e.elementProperties)i.default==="inherit"&&i.initial!==void 0&&typeof t=="string"&&this.customStates.set(`initial-${t}-${i.initial}`,!0)}static get styles(){let e=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[j,...e].map(t=>typeof t=="string"?z(t):t)}attributeChangedCallback(e,t,i){X(this,x)||(this.constructor.elementProperties.forEach((s,n)=>{s.reflect&&this[n]!=null&&this.initialReflectedProperties.set(n,this[n])}),F(this,x,!0)),super.attributeChangedCallback(e,t,i)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,i)=>{e.has(i)&&this[i]==null&&(this[i]=t)})}firstUpdated(e){var t;super.firstUpdated(e),this.didSSR&&((t=this.shadowRoot)==null||t.querySelectorAll("slot").forEach(i=>{i.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))}))}update(e){try{super.update(e)}catch(t){if(this.didSSR&&!this.hasUpdated){let i=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});i.error=t,this.dispatchEvent(i)}throw t}}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,p(p({},e),t)))}};x=new WeakMap;r([h()],g.prototype,"dir",2);r([h()],g.prototype,"lang",2);r([h({type:Boolean,reflect:!0,attribute:"did-ssr"})],g.prototype,"didSSR",2);var V=e=>e!=null?e:T;var K=`:host {
  --divider-width: 0.25rem;
  --divider-hit-area: 0.75rem;
  --min: 0%;
  --max: 100%;

  display: grid;
}

.start,
.end {
  overflow: hidden;
}

.divider {
  flex: 0 0 var(--divider-width);
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: var(--wa-color-neutral-border-normal);
  color: var(--wa-color-neutral-on-normal);
  z-index: 1;
}

.divider:focus {
  outline: none;
}

:host(:not([disabled])) .divider:focus-visible {
  outline: var(--wa-focus-ring);
}

:host([disabled]) .divider {
  cursor: not-allowed;
}

/* Horizontal */
:host(:not([orientation='vertical'], [disabled])) .divider {
  cursor: col-resize;
}

:host(:not([orientation='vertical'])) .divider::after {
  display: flex;
  content: '';
  position: absolute;
  height: 100%;
  left: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
  width: var(--divider-hit-area);
}

/* Vertical */
:host([orientation='vertical']) {
  flex-direction: column;
}

:host([orientation='vertical']:not([disabled])) .divider {
  cursor: row-resize;
}

:host([orientation='vertical']) .divider::after {
  content: '';
  position: absolute;
  width: 100%;
  top: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
  height: var(--divider-hit-area);
}

@media (forced-colors: active) {
  .divider {
    outline: solid 1px transparent;
  }
}
`,d=class extends g{constructor(){super(...arguments),this.isCollapsed=!1,this.localize=new B(this),this.positionBeforeCollapsing=0,this.position=50,this.orientation="horizontal",this.disabled=!1,this.snapThreshold=12}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>this.handleResize(e)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.resizeObserver)==null||e.unobserve(this)}detectSize(){let{width:e,height:t}=this.getBoundingClientRect();this.size=this.orientation==="vertical"?t:e}percentageToPixels(e){return this.size*(e/100)}pixelsToPercentage(e){return e/this.size*100}handleDrag(e){let t=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";this.disabled||(e.cancelable&&e.preventDefault(),R(this,{onMove:(i,s)=>{let n=this.orientation==="vertical"?s:i;this.primary==="end"&&(n=this.size-n),this.snap&&this.snap.split(" ").forEach(a=>{let l;a.endsWith("%")?l=this.size*(parseFloat(a)/100):l=parseFloat(a),t&&this.orientation==="horizontal"&&(l=this.size-l),n>=l-this.snapThreshold&&n<=l+this.snapThreshold&&(n=l)}),this.position=E(this.pixelsToPercentage(n),0,100)},initialEvent:e}))}handleKeyDown(e){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(e.key)){let t=this.position,i=(e.shiftKey?10:1)*(this.primary==="end"?-1:1);if(e.preventDefault(),(e.key==="ArrowLeft"&&this.orientation==="horizontal"||e.key==="ArrowUp"&&this.orientation==="vertical")&&(t-=i),(e.key==="ArrowRight"&&this.orientation==="horizontal"||e.key==="ArrowDown"&&this.orientation==="vertical")&&(t+=i),e.key==="Home"&&(t=this.primary==="end"?100:0),e.key==="End"&&(t=this.primary==="end"?0:100),e.key==="Enter")if(this.isCollapsed)t=this.positionBeforeCollapsing,this.isCollapsed=!1;else{let s=this.position;t=0,requestAnimationFrame(()=>{this.isCollapsed=!0,this.positionBeforeCollapsing=s})}this.position=E(t,0,100)}}handleResize(e){let{width:t,height:i}=e[0].contentRect;this.size=this.orientation==="vertical"?i:t,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels))}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.positionInPixels=this.percentageToPixels(this.position),this.isCollapsed=!1,this.positionBeforeCollapsing=0,this.dispatchEvent(new I)}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels)}handleVerticalChange(){this.detectSize()}render(){let e=this.orientation==="vertical"?"gridTemplateRows":"gridTemplateColumns",t=this.orientation==="vertical"?"gridTemplateColumns":"gridTemplateRows",i=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl",s=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,n="auto";return this.style||(this.style={}),this.primary==="end"?i&&this.orientation==="horizontal"?this.style[e]=`${s} var(--divider-width) ${n}`:this.style[e]=`${n} var(--divider-width) ${s}`:i&&this.orientation==="horizontal"?this.style[e]=`${n} var(--divider-width) ${s}`:this.style[e]=`${s} var(--divider-width) ${n}`,this.style[t]="",_`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${V(this.disabled?void 0:"0")}
        role="separator"
        aria-valuenow=${this.position}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.localize.term("resize")}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="divider"></slot>
      </div>

      <slot name="end" part="panel end" class="end"></slot>
    `}};d.css=K;r([A(".divider")],d.prototype,"divider",2);r([h({type:Number,reflect:!0})],d.prototype,"position",2);r([h({attribute:"position-in-pixels",type:Number})],d.prototype,"positionInPixels",2);r([h({reflect:!0})],d.prototype,"orientation",2);r([h({type:Boolean,reflect:!0})],d.prototype,"disabled",2);r([h()],d.prototype,"primary",2);r([h()],d.prototype,"snap",2);r([h({type:Number,attribute:"snap-threshold"})],d.prototype,"snapThreshold",2);r([b("position")],d.prototype,"handlePositionChange",1);r([b("positionInPixels")],d.prototype,"handlePositionInPixelsChange",1);r([b("vertical")],d.prototype,"handleVerticalChange",1);d=r([$("wa-split-panel")],d);var qt={app:{sidebarWidth:300},inspector:{panelHeight:400}};export{qt as a};
/*! Bundled license information:

@awesome.me/webawesome/dist/chunks/chunk.CI74OXU3.js:
@awesome.me/webawesome/dist/chunks/chunk.AJ3PNG3J.js:
@awesome.me/webawesome/dist/chunks/chunk.2WYO32PF.js:
@awesome.me/webawesome/dist/chunks/chunk.OKWGTFUF.js:
@awesome.me/webawesome/dist/chunks/chunk.I24ISEJH.js:
@awesome.me/webawesome/dist/chunks/chunk.N3AZYXKV.js:
@awesome.me/webawesome/dist/chunks/chunk.I37X32SU.js:
@awesome.me/webawesome/dist/chunks/chunk.LU7TFTYS.js:
@awesome.me/webawesome/dist/chunks/chunk.XT5HTSFZ.js:
@awesome.me/webawesome/dist/components/split-panel/split-panel.js:
  (*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license *)

lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
