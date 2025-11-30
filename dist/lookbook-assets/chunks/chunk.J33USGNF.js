import{b,c as f}from"./chunk.DJWHC2VF.js";import{a as g,c as p}from"./chunk.KPKYWVQS.js";import{b as y}from"./chunk.SSXT3WVJ.js";import{a as h,b as v,e as n,g as d,h as u,i as S}from"./chunk.XPFMMO3L.js";var k=`:host {
  box-sizing: border-box;
  color: var(--lookbook-text-body);
  font-weight: var(--lookbook-font-weight-normal);
  font-size: var(--lookbook-font-size-md);
  font-family: var(--lookbook-font-family);
  line-height: 1.1;
  text-rendering: optimizeLegibility;
  scrollbar-color: var(--lookbook-neutral-fill-mid) transparent;
  display: block;
}
:host *,
:host *::before,
:host *::after {
  box-sizing: border-box;
}
h1,
h2,
h3,
h4,
p,
ul,
ol {
  all: unset;
  display: revert;
  font-size: var(--lookbook-font-size-md);
}
ol,
ul,
menu {
  all: unset;
  display: revert;
  list-style: none;
}
input,
button,
textarea,
select {
  appearance: none;
  font-family: inherit;
  font-size: inherit;
}
a {
  text-decoration: none;
  color: currentColor;
}
[hidden] {
  display: none !important;
}
::selection {
  background-color: var(--lookbook-selection-background-color);
  color: var(--lookbook-selection-color);
  text-shadow: none !important;
}
.vh {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  white-space: nowrap;
  clip-path: inset(50%);
}
[divider] {
  border-style: solid;
  border-color: var(--lookbook-divider-color);
}
:host([divider="block-start"]) {
  border-block-start-width: var(--lookbook-border-width);
}
:host([divider="block-end"]) {
  border-block-end-width: var(--lookbook-border-width);
}
:host([divider="inline-start"]) {
  border-inline-start-width: var(--lookbook-border-width);
}
:host([divider="inline-end"]) {
  border-inline-end-width: var(--lookbook-border-width);
}
wa-split-panel {
  --divider-width: var(--lookbook-border-width);
  &::part(divider) {
    background-color: var(--lookbook-divider-color);
  }
}
`;var l,a,r=class extends p{constructor(){super();this.cleanupJobs=[];this.slotsWithContent=new Set;this.customStates={set:(t,e)=>{e?this.internals.states.add(t):this.internals.states.delete(t)},has:t=>this.internals.states.has(t)};u(this,l,!1);u(this,a,new Map)}static get styles(){let t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[k,...t].map(e=>typeof e=="string"?y(e):e)}firstUpdated(){let t=this.getStaticProperty("slotAttributeDefault");!this.hasAttribute("slot")&&t&&this.setAttribute("slot",t)}connectedCallback(){super.connectedCallback(),this.constructor.observeSlots&&(this.updateSlotsWithContent(),this.shadowRoot.addEventListener("slotchange",()=>{this.updateSlotsWithContent()}))}disconnectedCallback(){this.cleanupJobs.forEach(t=>t()),super.disconnectedCallback()}addCleanupJob(t){}updateSlotsWithContent(){let t=new Set([...this.querySelectorAll(":scope > [slot]")].map(e=>e.slot));JSON.stringify([...t].sort())!==JSON.stringify([...this.slotsWithContent].sort())&&(this.slotsWithContent=t)}whenSlotted(t,e,o){let s=h({force:!1},o);return this.slotsWithContent.has(t)||s.force?e:g`<slot
          name="${t}"
          hidden
        ></slot>`}attributeChangedCallback(t,e,o){var s;if(!d(this,l)){let i=(w,c)=>{w.reflect&&i[c]!=null&&d(this,a).set(c,i[c])};S(this,l,!0)}(s=super.attributeChangedCallback)==null||s.call(this,t,e,o)}willUpdate(t){var o;(o=super.willUpdate)==null||o.call(this,t);let e=this;d(this,a).forEach((s,i)=>{t.has(i)&&e[i]==null&&(e[i]=s)})}on(t,e){this.addEventListener(t,e),this.addCleanupJob(()=>this.removeEventListener(t,e))}delegate(...t){let[e,o,s]=t.length===2?[document,...t]:t;e.addEventListener(o,s),this.addCleanupJob(()=>e.removeEventListener(o,s))}async dispatch(t,e={}){let o=new CustomEvent(t,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(o)}getStaticProperty(t){return this.constructor[t]}};l=new WeakMap,a=new WeakMap,r.shadowRootOptions=v(h({},p.shadowRootOptions),{serializable:!0}),r.slotAttributeDefault=null,r.observeSlots=!1,n([f()],r.prototype,"cleanupJobs",2),n([f()],r.prototype,"slotsWithContent",2),n([b()],r.prototype,"dir",2),n([b()],r.prototype,"lang",2);export{r as a};
