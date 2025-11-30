import{d as f,e as h}from"./chunk.SSXT3WVJ.js";import{a as d,b as m}from"./chunk.XPFMMO3L.js";var q=t=>(r,e)=>{e!==void 0?e.addInitializer((()=>{customElements.define(t,r)})):customElements.define(t,r)};var x={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:h},b=(t=x,r,e)=>{let{kind:s,metadata:c}=e,i=globalThis.litPropertyMetadata.get(c);if(i===void 0&&globalThis.litPropertyMetadata.set(c,i=new Map),s==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(e.name,t),s==="accessor"){let{name:n}=e;return{set(a){let o=r.get.call(this);r.set.call(this,a),this.requestUpdate(n,o,t)},init(a){return a!==void 0&&this.C(n,void 0,t,a),a}}}if(s==="setter"){let{name:n}=e;return function(a){let o=this[n];r.call(this,a),this.requestUpdate(n,o,t)}}throw Error("Unsupported decorator location: "+s)};function y(t){return(r,e)=>typeof e=="object"?b(t,r,e):((s,c,i)=>{let n=c.hasOwnProperty(i);return c.constructor.createProperty(i,s),n?Object.getOwnPropertyDescriptor(c,i):void 0})(t,r,e)}function P(t){return y(m(d({},t),{state:!0,attribute:!1}))}var u=(t,r,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof r!="object"&&Object.defineProperty(t,r,e),e);function C(t,r){return(e,s,c)=>{let i=n=>{var a,o;return(o=(a=n.renderRoot)==null?void 0:a.querySelector(t))!=null?o:null};if(r){let{get:n,set:a}=typeof s=="object"?e:c!=null?c:(()=>{let o=Symbol();return{get(){return this[o]},set(l){this[o]=l}}})();return u(e,s,{get(){let o=n.call(this);return o===void 0&&(o=i(this),(o!==null||this.hasUpdated)&&a.call(this,o)),o}})}return u(e,s,{get(){return i(this)}})}}var p;function D(t){return(r,e)=>u(r,e,{get(){var s;return((s=this.renderRoot)!=null?s:p!=null?p:p=document.createDocumentFragment()).querySelectorAll(t)}})}function $(t){return(r,e)=>{let{slot:s,selector:c}=t!=null?t:{},i="slot"+(s?`[name=${s}]`:":not([name])");return u(r,e,{get(){var o,l;let n=(o=this.renderRoot)==null?void 0:o.querySelector(i),a=(l=n==null?void 0:n.assignedElements(t))!=null?l:[];return c===void 0?a:a.filter((g=>g.matches(c)))}})}}export{q as a,y as b,P as c,C as d,D as e,$ as f};
/*! Bundled license information:

@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
