var qe=Object.defineProperty;var Ke=Object.getOwnPropertyDescriptor;var w=(e,t,r,o)=>{for(var s=o>1?void 0:o?Ke(t,r):t,i=e.length-1,n;i>=0;i--)(n=e[i])&&(s=(o?n(t,r,s):n(s))||s);return o&&s&&qe(t,r,s),s};function ee(e,t){let r={waitUntilFirstUpdate:!1,...t};return(o,s)=>{let{update:i}=o,n=Array.isArray(e)?e:[e];o.update=function(a){n.forEach(l=>{let d=l;if(a.has(d)){let f=a.get(d),c=this[d];f!==c&&(!r.waitUntilFirstUpdate||this.hasUpdated)&&this[s](f,c)}}),i.call(this,a)}}}var Ve=Object.defineProperty,Je=Object.getOwnPropertyDescriptor,re=e=>{throw TypeError(e)},M=(e,t,r,o)=>{for(var s=o>1?void 0:o?Je(t,r):t,i=e.length-1,n;i>=0;i--)(n=e[i])&&(s=(o?n(t,r,s):n(s))||s);return o&&s&&Ve(t,r,s),s},oe=(e,t,r)=>t.has(e)||re("Cannot "+r),se=(e,t,r)=>(oe(e,t,"read from private field"),r?r.call(e):t.get(e)),ie=(e,t,r)=>t.has(e)?re("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),ne=(e,t,r,o)=>(oe(e,t,"write to private field"),o?o.call(e,r):t.set(e,r),r);var dt=globalThis,ht=dt.ShadowRoot&&(dt.ShadyCSS===void 0||dt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,le=Symbol(),ae=new WeakMap,F=class{constructor(t,r,o){if(this._$cssResult$=!0,o!==le)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o,r=this.t;if(ht&&t===void 0){let o=r!==void 0&&r.length===1;o&&(t=ae.get(r)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&ae.set(r,t))}return t}toString(){return this.cssText}},H=e=>new F(typeof e=="string"?e:e+"",void 0,le);var ce=(e,t)=>{if(ht)e.adoptedStyleSheets=t.map((r=>r instanceof CSSStyleSheet?r:r.styleSheet));else for(let r of t){let o=document.createElement("style"),s=dt.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=r.cssText,e.appendChild(o)}},jt=ht?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(let o of t.cssRules)r+=o.cssText;return H(r)})(e):e;var{is:Fe,defineProperty:Ge,getOwnPropertyDescriptor:Ze,getOwnPropertyNames:Ye,getOwnPropertySymbols:Qe,getPrototypeOf:Xe}=Object,ft=globalThis,pe=ft.trustedTypes,tr=pe?pe.emptyScript:"",er=ft.reactiveElementPolyfillSupport,G=(e,t)=>e,Z={toAttribute(e,t){switch(t){case Boolean:e=e?tr:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},ut=(e,t)=>!Fe(e,t),de={attribute:!0,type:String,converter:Z,reflect:!1,useDefault:!1,hasChanged:ut};Symbol.metadata??=Symbol("metadata"),ft.litPropertyMetadata??=new WeakMap;var O=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,r=de){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(t,r),!r.noAccessor){let o=Symbol(),s=this.getPropertyDescriptor(t,o,r);s!==void 0&&Ge(this.prototype,t,s)}}static getPropertyDescriptor(t,r,o){let{get:s,set:i}=Ze(this.prototype,t)??{get(){return this[r]},set(n){this[r]=n}};return{get:s,set(n){let a=s?.call(this);i?.call(this,n),this.requestUpdate(t,a,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??de}static _$Ei(){if(this.hasOwnProperty(G("elementProperties")))return;let t=Xe(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(G("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(G("properties"))){let r=this.properties,o=[...Ye(r),...Qe(r)];for(let s of o)this.createProperty(s,r[s])}let t=this[Symbol.metadata];if(t!==null){let r=litPropertyMetadata.get(t);if(r!==void 0)for(let[o,s]of r)this.elementProperties.set(o,s)}this._$Eh=new Map;for(let[r,o]of this.elementProperties){let s=this._$Eu(r,o);s!==void 0&&this._$Eh.set(s,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let r=[];if(Array.isArray(t)){let o=new Set(t.flat(1/0).reverse());for(let s of o)r.unshift(jt(s))}else t!==void 0&&r.push(jt(t));return r}static _$Eu(t,r){let o=r.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,r=this.constructor.elementProperties;for(let o of r.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ce(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,r,o){this._$AK(t,o)}_$ET(t,r){let o=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,o);if(s!==void 0&&o.reflect===!0){let i=(o.converter?.toAttribute!==void 0?o.converter:Z).toAttribute(r,o.type);this._$Em=t,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(t,r){let o=this.constructor,s=o._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let i=o.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:Z;this._$Em=s;let a=n.fromAttribute(r,i.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,r,o){if(t!==void 0){let s=this.constructor,i=this[t];if(o??=s.getPropertyOptions(t),!((o.hasChanged??ut)(i,r)||o.useDefault&&o.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,o))))return;this.C(t,r,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,r,{useDefault:o,reflect:s,wrapped:i},n){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??r??this[t]),i!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||o||(r=void 0),this._$AL.set(t,r)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[s,i]of o){let{wrapped:n}=i,a=this[s];n!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,i,a)}}let t=!1,r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(r)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(r)}willUpdate(t){}_$AE(t){this._$EO?.forEach((r=>r.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((r=>this._$ET(r,this[r]))),this._$EM()}updated(t){}firstUpdated(t){}};O.elementStyles=[],O.shadowRootOptions={mode:"open"},O[G("elementProperties")]=new Map,O[G("finalized")]=new Map,er?.({ReactiveElement:O}),(ft.reactiveElementVersions??=[]).push("2.1.1");var zt=globalThis,mt=zt.trustedTypes,he=mt?mt.createPolicy("lit-html",{createHTML:e=>e}):void 0,It="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,Wt="?"+T,rr=`<${Wt}>`,B=document,Q=()=>B.createComment(""),X=e=>e===null||typeof e!="object"&&typeof e!="function",qt=Array.isArray,ge=e=>qt(e)||typeof e?.[Symbol.iterator]=="function",Bt=`[ 	
\f\r]`,Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fe=/-->/g,ue=/>/g,N=RegExp(`>|${Bt}(?:([^\\s"'>=/]+)(${Bt}*=${Bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),me=/'/g,ye=/"/g,ve=/^(?:script|style|textarea|title)$/i,Kt=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),q=Kt(1),or=Kt(2),zr=Kt(3),g=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),be=new WeakMap,j=B.createTreeWalker(B,129);function xe(e,t){if(!qt(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return he!==void 0?he.createHTML(t):t}var Ee=(e,t)=>{let r=e.length-1,o=[],s,i=t===2?"<svg>":t===3?"<math>":"",n=Y;for(let a=0;a<r;a++){let l=e[a],d,f,c=-1,h=0;for(;h<l.length&&(n.lastIndex=h,f=n.exec(l),f!==null);)h=n.lastIndex,n===Y?f[1]==="!--"?n=fe:f[1]!==void 0?n=ue:f[2]!==void 0?(ve.test(f[2])&&(s=RegExp("</"+f[2],"g")),n=N):f[3]!==void 0&&(n=N):n===N?f[0]===">"?(n=s??Y,c=-1):f[1]===void 0?c=-2:(c=n.lastIndex-f[2].length,d=f[1],n=f[3]===void 0?N:f[3]==='"'?ye:me):n===ye||n===me?n=N:n===fe||n===ue?n=Y:(n=N,s=void 0);let p=n===N&&e[a+1].startsWith("/>")?" ":"";i+=n===Y?l+rr:c>=0?(o.push(d),l.slice(0,c)+It+l.slice(c)+T+p):l+T+(c===-2?a:p)}return[xe(e,i+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]},tt=class e{constructor({strings:t,_$litType$:r},o){let s;this.parts=[];let i=0,n=0,a=t.length-1,l=this.parts,[d,f]=Ee(t,r);if(this.el=e.createElement(d,o),j.currentNode=this.el.content,r===2||r===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=j.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(It)){let h=f[n++],p=s.getAttribute(c).split(T),u=/([.?@])?(.*)/.exec(h);l.push({type:1,index:i,name:u[2],strings:p,ctor:u[1]==="."?bt:u[1]==="?"?gt:u[1]==="@"?vt:I}),s.removeAttribute(c)}else c.startsWith(T)&&(l.push({type:6,index:i}),s.removeAttribute(c));if(ve.test(s.tagName)){let c=s.textContent.split(T),h=c.length-1;if(h>0){s.textContent=mt?mt.emptyScript:"";for(let p=0;p<h;p++)s.append(c[p],Q()),j.nextNode(),l.push({type:2,index:++i});s.append(c[h],Q())}}}else if(s.nodeType===8)if(s.data===Wt)l.push({type:2,index:i});else{let c=-1;for(;(c=s.data.indexOf(T,c+1))!==-1;)l.push({type:7,index:i}),c+=T.length-1}i++}}static createElement(t,r){let o=B.createElement("template");return o.innerHTML=t,o}};function z(e,t,r=e,o){if(t===g)return t;let s=o!==void 0?r._$Co?.[o]:r._$Cl,i=X(t)?void 0:t._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(e),s._$AT(e,r,o)),o!==void 0?(r._$Co??=[])[o]=s:r._$Cl=s),s!==void 0&&(t=z(e,s._$AS(e,t.values),s,o)),t}var yt=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:o}=this._$AD,s=(t?.creationScope??B).importNode(r,!0);j.currentNode=s;let i=j.nextNode(),n=0,a=0,l=o[0];for(;l!==void 0;){if(n===l.index){let d;l.type===2?d=new W(i,i.nextSibling,this,t):l.type===1?d=new l.ctor(i,l.name,l.strings,this,t):l.type===6&&(d=new xt(i,this,t)),this._$AV.push(d),l=o[++a]}n!==l?.index&&(i=j.nextNode(),n++)}return j.currentNode=B,s}p(t){let r=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,r),r+=o.strings.length-2):o._$AI(t[r])),r++}},W=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,o,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=z(this,t,r),X(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==g&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ge(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&X(this._$AH)?this._$AA.nextSibling.data=t:this.T(B.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:o}=t,s=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=tt.createElement(xe(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(r);else{let i=new yt(s,this),n=i.u(this.options);i.p(r),this.T(n),this._$AH=i}}_$AC(t){let r=be.get(t.strings);return r===void 0&&be.set(t.strings,r=new tt(t)),r}k(t){qt(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,o,s=0;for(let i of t)s===r.length?r.push(o=new e(this.O(Q()),this.O(Q()),this,this.options)):o=r[s],o._$AI(i),s++;s<r.length&&(this._$AR(o&&o._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let o=t.nextSibling;t.remove(),t=o}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},I=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,o,s,i){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=m}_$AI(t,r=this,o,s){let i=this.strings,n=!1;if(i===void 0)t=z(this,t,r,0),n=!X(t)||t!==this._$AH&&t!==g,n&&(this._$AH=t);else{let a=t,l,d;for(t=i[0],l=0;l<i.length-1;l++)d=z(this,a[o+l],r,l),d===g&&(d=this._$AH[l]),n||=!X(d)||d!==this._$AH[l],d===m?t=m:t!==m&&(t+=(d??"")+i[l+1]),this._$AH[l]=d}n&&!s&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},bt=class extends I{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},gt=class extends I{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},vt=class extends I{constructor(t,r,o,s,i){super(t,r,o,s,i),this.type=5}_$AI(t,r=this){if((t=z(this,t,r,0)??m)===g)return;let o=this._$AH,s=t===m&&o!==m||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,i=t!==m&&(o===m||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},xt=class{constructor(t,r,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}},we={M:It,P:T,A:Wt,C:1,L:Ee,R:yt,D:ge,V:z,I:W,H:I,N:gt,U:vt,B:bt,F:xt},sr=zt.litHtmlPolyfillSupport;sr?.(tt,W),(zt.litHtmlVersions??=[]).push("3.3.1");var et=(e,t,r)=>{let o=r?.renderBefore??t,s=o._$litPart$;if(s===void 0){let i=r?.renderBefore??null;o._$litPart$=s=new W(t.insertBefore(Q(),i),i,void 0,r??{})}return s._$AI(e),s};var Vt=globalThis,_=class extends O{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=et(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return g}};_._$litElement$=!0,_.finalized=!0,Vt.litElementHydrateSupport?.({LitElement:_});var ir=Vt.litElementPolyfillSupport;ir?.({LitElement:_});(Vt.litElementVersions??=[]).push("4.2.1");var rt=e=>(t,r)=>{r!==void 0?r.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};var nr={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:ut},ar=(e=nr,t,r)=>{let{kind:o,metadata:s}=r,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),o==="setter"&&((e=Object.create(e)).wrapped=!0),i.set(r.name,e),o==="accessor"){let{name:n}=r;return{set(a){let l=t.get.call(this);t.set.call(this,a),this.requestUpdate(n,l,e)},init(a){return a!==void 0&&this.C(n,void 0,e,a),a}}}if(o==="setter"){let{name:n}=r;return function(a){let l=this[n];t.call(this,a),this.requestUpdate(n,l,e)}}throw Error("Unsupported decorator location: "+o)};function $(e){return(t,r)=>typeof r=="object"?ar(e,t,r):((o,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,o),n?Object.getOwnPropertyDescriptor(s,i):void 0})(e,t,r)}function C(e){return $({...e,state:!0,attribute:!1})}var D=(e,t,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,r),r);function Jt(e,t){return(r,o,s)=>{let i=n=>n.renderRoot?.querySelector(e)??null;if(t){let{get:n,set:a}=typeof o=="object"?r:s??(()=>{let l=Symbol();return{get(){return this[l]},set(d){this[l]=d}}})();return D(r,o,{get(){let l=n.call(this);return l===void 0&&(l=i(this),(l!==null||this.hasUpdated)&&a.call(this,l)),l}})}return D(r,o,{get(){return i(this)}})}}function Ft(e){return(t,r)=>{let{slot:o,selector:s}=e??{},i="slot"+(o?`[name=${o}]`:":not([name])");return D(t,r,{get(){let n=this.renderRoot?.querySelector(i),a=n?.assignedElements(e)??[];return s===void 0?a:a.filter((l=>l.matches(s)))}})}}var cr=`:host {
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
`,Et,ot=class extends _{constructor(){super(),ie(this,Et,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(t,r)=>{if(this.internals?.states)try{r?this.internals.states.add(t):this.internals.states.delete(t)}catch(o){if(String(o).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw o}},has:t=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(t)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let e=this.constructor;for(let[t,r]of e.elementProperties)r.default==="inherit"&&r.initial!==void 0&&typeof t=="string"&&this.customStates.set(`initial-${t}-${r.initial}`,!0)}static get styles(){let e=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[cr,...e].map(t=>typeof t=="string"?H(t):t)}attributeChangedCallback(e,t,r){se(this,Et)||(this.constructor.elementProperties.forEach((o,s)=>{o.reflect&&this[s]!=null&&this.initialReflectedProperties.set(s,this[s])}),ne(this,Et,!0)),super.attributeChangedCallback(e,t,r)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,r)=>{e.has(r)&&this[r]==null&&(this[r]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(t=>{t.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(t){if(this.didSSR&&!this.hasUpdated){let r=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});r.error=t,this.dispatchEvent(r)}throw t}}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};Et=new WeakMap;M([$()],ot.prototype,"dir",2);M([$()],ot.prototype,"lang",2);M([$({type:Boolean,reflect:!0,attribute:"did-ssr"})],ot.prototype,"didSSR",2);var pr=class extends Event{constructor(e){super("wa-resize",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}},dr=`:host {
  display: contents;
}
`,K=class extends ot{constructor(){super(...arguments),this.observedElements=[],this.disabled=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>{this.dispatchEvent(new pr({entries:e}))}),this.disabled||this.updateComplete.then(()=>{this.startObserver()})}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){let e=this.shadowRoot.querySelector("slot");if(e!==null){let t=e.assignedElements({flatten:!0});this.observedElements.forEach(r=>this.resizeObserver.unobserve(r)),this.observedElements=[],t.forEach(r=>{this.resizeObserver.observe(r),this.observedElements.push(r)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return q` <slot @slotchange=${this.handleSlotChange}></slot> `}};K.css=dr;M([$({type:Boolean,reflect:!0})],K.prototype,"disabled",2);M([ee("disabled",{waitUntilFirstUpdate:!0})],K.prototype,"handleDisabledChange",1);K=M([rt("wa-resize-observer")],K);var x={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},P=e=>(...t)=>({_$litDirective$:e,values:t}),k=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,o){this._$Ct=t,this._$AM=r,this._$Ci=o}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var hr=P(class extends k{constructor(e){if(super(e),e.type!==x.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(let o in t)t[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(t)}let r=e.element.classList;for(let o of this.st)o in t||(r.remove(o),this.st.delete(o));for(let o in t){let s=!!t[o];s===this.st.has(o)||this.nt?.has(o)||(s?(r.add(o),this.st.add(o)):(r.remove(o),this.st.delete(o)))}return g}});var{I:fr}=we;var _e=e=>e.strings===void 0,$e=()=>document.createComment(""),V=(e,t,r)=>{let o=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(r===void 0){let i=o.insertBefore($e(),s),n=o.insertBefore($e(),s);r=new fr(i,n,e,e.options)}else{let i=r._$AB.nextSibling,n=r._$AM,a=n!==e;if(a){let l;r._$AQ?.(e),r._$AM=e,r._$AP!==void 0&&(l=e._$AU)!==n._$AU&&r._$AP(l)}if(i!==s||a){let l=r._$AA;for(;l!==i;){let d=l.nextSibling;o.insertBefore(l,s),l=d}}}return r},U=(e,t,r=e)=>(e._$AI(t,r),e),ur={},wt=(e,t=ur)=>e._$AH=t,ke=e=>e._$AH,$t=e=>{e._$AR(),e._$AA.remove()};var mr=P(class extends k{constructor(e){if(super(e),e.type!==x.PROPERTY&&e.type!==x.ATTRIBUTE&&e.type!==x.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!_e(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===g||t===m)return t;let r=e.element,o=e.name;if(e.type===x.PROPERTY){if(t===r[o])return g}else if(e.type===x.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(o))return g}else if(e.type===x.ATTRIBUTE&&r.getAttribute(o)===t+"")return g;return wt(e),t}});var Ae=(e,t,r)=>{let o=new Map;for(let s=t;s<=r;s++)o.set(e[s],s);return o},yr=P(class extends k{constructor(e){if(super(e),e.type!==x.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,r){let o;r===void 0?r=t:t!==void 0&&(o=t);let s=[],i=[],n=0;for(let a of e)s[n]=o?o(a,n):n,i[n]=r(a,n),n++;return{values:i,keys:s}}render(e,t,r){return this.dt(e,t,r).values}update(e,[t,r,o]){let s=ke(e),{values:i,keys:n}=this.dt(t,r,o);if(!Array.isArray(s))return this.ut=n,i;let a=this.ut??=[],l=[],d,f,c=0,h=s.length-1,p=0,u=i.length-1;for(;c<=h&&p<=u;)if(s[c]===null)c++;else if(s[h]===null)h--;else if(a[c]===n[p])l[p]=U(s[c],i[p]),c++,p++;else if(a[h]===n[u])l[u]=U(s[h],i[u]),h--,u--;else if(a[c]===n[u])l[u]=U(s[c],i[u]),V(e,l[u+1],s[c]),c++,u--;else if(a[h]===n[p])l[p]=U(s[h],i[p]),V(e,s[c],s[h]),h--,p++;else if(d===void 0&&(d=Ae(n,p,u),f=Ae(a,c,h)),d.has(a[c]))if(d.has(a[h])){let E=f.get(n[p]),Nt=E!==void 0?s[E]:null;if(Nt===null){let te=V(e,s[c]);U(te,i[p]),l[p]=te}else l[p]=U(Nt,i[p]),V(e,s[c],Nt),s[E]=null;p++}else $t(s[h]),h--;else $t(s[c]),c++;for(;p<=u;){let E=V(e,l[u+1]);U(E,i[p]),l[p++]=E}for(;c<=h;){let E=s[c++];E!==null&&$t(E)}return this.ut=n,wt(e,l),g}});var Se="important",br=" !"+Se,gr=P(class extends k{constructor(e){if(super(e),e.type!==x.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,r)=>{let o=e[r];return o==null?t:t+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`}),"")}update(e,[t]){let{style:r}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let o of this.ft)t[o]==null&&(this.ft.delete(o),o.includes("-")?r.removeProperty(o):r[o]=null);for(let o in t){let s=t[o];if(s!=null){this.ft.add(o);let i=typeof s=="string"&&s.endsWith(br);o.includes("-")||i?r.setProperty(o,i?s.slice(0,-11):s,i?Se:""):r[o]=s}}return g}});var st=class extends k{constructor(t){if(super(t),this.it=m,t.type!==x.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===m||t==null)return this._t=void 0,this.it=t;if(t===g)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};st.directiveName="unsafeHTML",st.resultType=1;var vr=P(st);var Gt=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function Zt(e,t,r,o){e.addEventListener?e.addEventListener(t,r,o):e.attachEvent&&e.attachEvent(`on${t}`,r)}function it(e,t,r,o){e&&(e.removeEventListener?e.removeEventListener(t,r,o):e.detachEvent&&e.detachEvent(`on${t}`,r))}function Oe(e,t){let r=t.slice(0,t.length-1),o=[];for(let s=0;s<r.length;s++)o.push(e[r[s].toLowerCase()]);return o}function Te(e){typeof e!="string"&&(e=""),e=e.replace(/\s/g,"");let t=e.split(","),r=t.lastIndexOf("");for(;r>=0;)t[r-1]+=",",t.splice(r,1),r=t.lastIndexOf("");return t}function xr(e,t){let r=e.length>=t.length?e:t,o=e.length>=t.length?t:e,s=!0;for(let i=0;i<r.length;i++)o.indexOf(r[i])===-1&&(s=!1);return s}function Re(e){let t=e.keyCode||e.which||e.charCode;return e.code&&/^Key[A-Z]$/.test(e.code)&&(t=e.code.charCodeAt(3)),t}var lt={backspace:8,"\u232B":8,tab:9,clear:12,enter:13,"\u21A9":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,arrowup:38,arrowdown:40,arrowleft:37,arrowright:39,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"\u21EA":20,",":188,".":190,"/":191,"`":192,"-":Gt?173:189,"=":Gt?61:187,";":Gt?59:186,"'":222,"{":219,"}":221,"[":219,"]":221,"\\":220},A={"\u21E7":16,shift:16,"\u2325":18,alt:18,option:18,"\u2303":17,ctrl:17,control:17,"\u2318":91,cmd:91,meta:91,command:91},nt={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},v={16:!1,18:!1,17:!1,91:!1},b={};for(let e=1;e<20;e++)lt[`f${e}`]=111+e;var y=[],at=null,Le="all",R=new Map,J=e=>lt[e.toLowerCase()]||A[e.toLowerCase()]||e.toUpperCase().charCodeAt(0),Er=e=>Object.keys(lt).find(t=>lt[t]===e),wr=e=>Object.keys(A).find(t=>A[t]===e),Me=e=>{Le=e||"all"},ct=()=>Le||"all",$r=()=>y.slice(0),_r=()=>y.map(e=>Er(e)||wr(e)||String.fromCharCode(e)),kr=()=>{let e=[];return Object.keys(b).forEach(t=>{b[t].forEach(({key:r,scope:o,mods:s,shortcut:i})=>{e.push({scope:o,shortcut:i,mods:s,keys:r.split("+").map(n=>J(n))})})}),e},De=e=>{let t=e.target||e.srcElement,{tagName:r}=t,o=!0,s=r==="INPUT"&&!["checkbox","radio","range","button","file","reset","submit","color"].includes(t.type);return(t.isContentEditable||(s||r==="TEXTAREA"||r==="SELECT")&&!t.readOnly)&&(o=!1),o},Ar=e=>(typeof e=="string"&&(e=J(e)),y.indexOf(e)!==-1),Sr=(e,t)=>{let r,o;e||(e=ct());for(let s in b)if(Object.prototype.hasOwnProperty.call(b,s))for(r=b[s],o=0;o<r.length;)r[o].scope===e?r.splice(o,1).forEach(({element:i})=>Qt(i)):o++;ct()===e&&Me(t||"all")};function Cr(e){let t=Re(e);e.key&&e.key.toLowerCase()==="capslock"&&(t=J(e.key));let r=y.indexOf(t);if(r>=0&&y.splice(r,1),e.key&&e.key.toLowerCase()==="meta"&&y.splice(0,y.length),(t===93||t===224)&&(t=91),t in v){v[t]=!1;for(let o in A)A[o]===t&&(L[o]=!1)}}var Ue=(e,...t)=>{if(typeof e>"u")Object.keys(b).forEach(r=>{Array.isArray(b[r])&&b[r].forEach(o=>_t(o)),delete b[r]}),Qt(null);else if(Array.isArray(e))e.forEach(r=>{r.key&&_t(r)});else if(typeof e=="object")e.key&&_t(e);else if(typeof e=="string"){let[r,o]=t;typeof r=="function"&&(o=r,r=""),_t({key:e,scope:r,method:o,splitKey:"+"})}},_t=({key:e,scope:t,method:r,splitKey:o="+"})=>{Te(e).forEach(s=>{let i=s.split(o),n=i.length,a=i[n-1],l=a==="*"?"*":J(a);if(!b[l])return;t||(t=ct());let d=n>1?Oe(A,i):[],f=[];b[l]=b[l].filter(c=>{let h=(r?c.method===r:!0)&&c.scope===t&&xr(c.mods,d);return h&&f.push(c.element),!h}),f.forEach(c=>Qt(c))})};function Ce(e,t,r,o){if(t.element!==o)return;let s;if(t.scope===r||t.scope==="all"){s=t.mods.length>0;for(let i in v)Object.prototype.hasOwnProperty.call(v,i)&&(!v[i]&&t.mods.indexOf(+i)>-1||v[i]&&t.mods.indexOf(+i)===-1)&&(s=!1);(t.mods.length===0&&!v[16]&&!v[18]&&!v[17]&&!v[91]||s||t.shortcut==="*")&&(t.keys=[],t.keys=t.keys.concat(y),t.method(e,t)===!1&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0)))}}function Pe(e,t){let r=b["*"],o=Re(e);if(e.key&&e.key.toLowerCase()==="capslock"||!(L.filter||De).call(this,e))return;if((o===93||o===224)&&(o=91),y.indexOf(o)===-1&&o!==229&&y.push(o),["metaKey","ctrlKey","altKey","shiftKey"].forEach(a=>{let l=nt[a];e[a]&&y.indexOf(l)===-1?y.push(l):!e[a]&&y.indexOf(l)>-1?y.splice(y.indexOf(l),1):a==="metaKey"&&e[a]&&(y=y.filter(d=>d in nt||d===o))}),o in v){v[o]=!0;for(let a in A)if(Object.prototype.hasOwnProperty.call(A,a)){let l=nt[A[a]];L[a]=e[l]}if(!r)return}for(let a in v)Object.prototype.hasOwnProperty.call(v,a)&&(v[a]=e[nt[a]]);e.getModifierState&&!(e.altKey&&!e.ctrlKey)&&e.getModifierState("AltGraph")&&(y.indexOf(17)===-1&&y.push(17),y.indexOf(18)===-1&&y.push(18),v[17]=!0,v[18]=!0);let s=ct();if(r)for(let a=0;a<r.length;a++)r[a].scope===s&&(e.type==="keydown"&&r[a].keydown||e.type==="keyup"&&r[a].keyup)&&Ce(e,r[a],s,t);if(!(o in b))return;let i=b[o],n=i.length;for(let a=0;a<n;a++)if((e.type==="keydown"&&i[a].keydown||e.type==="keyup"&&i[a].keyup)&&i[a].key){let l=i[a],{splitKey:d}=l,f=l.key.split(d),c=[];for(let h=0;h<f.length;h++)c.push(J(f[h]));c.sort().join("")===y.sort().join("")&&Ce(e,l,s,t)}}var L=function(e,t,r){y=[];let o=Te(e),s=[],i="all",n=document,a=0,l=!1,d=!0,f="+",c=!1,h=!1;if(r===void 0&&typeof t=="function"&&(r=t),Object.prototype.toString.call(t)==="[object Object]"){let p=t;p.scope&&(i=p.scope),p.element&&(n=p.element),p.keyup&&(l=p.keyup),p.keydown!==void 0&&(d=p.keydown),p.capture!==void 0&&(c=p.capture),typeof p.splitKey=="string"&&(f=p.splitKey),p.single===!0&&(h=!0)}for(typeof t=="string"&&(i=t),h&&Ue(e,i);a<o.length;a++){let p=o[a].split(f);s=[],p.length>1&&(s=Oe(A,p));let u=p[p.length-1];u=u==="*"?"*":J(u),u in b||(b[u]=[]),b[u].push({keyup:l,keydown:d,scope:i,mods:s,shortcut:o[a],method:r,key:o[a],splitKey:f,element:n})}if(typeof n<"u"&&typeof window<"u"){if(!R.has(n)){let p=(E=window.event)=>Pe(E,n),u=(E=window.event)=>{Pe(E,n),Cr(E)};R.set(n,{keydownListener:p,keyupListenr:u,capture:c}),Zt(n,"keydown",p,c),Zt(n,"keyup",u,c)}if(!at){let p=()=>{y=[]};at={listener:p,capture:c},Zt(window,"focus",p,c)}}};function Pr(e,t="all"){Object.keys(b).forEach(r=>{b[r].filter(o=>o.scope===t&&o.shortcut===e).forEach(o=>{o&&o.method&&o.method({},o)})})}function Qt(e){let t=Object.values(b).flat();if(t.findIndex(({element:r})=>r===e)<0&&e){let{keydownListener:r,keyupListenr:o,capture:s}=R.get(e)||{};r&&o&&(it(e,"keyup",o,s),it(e,"keydown",r,s),R.delete(e))}if((t.length<=0||R.size<=0)&&(Array.from(R.keys()).forEach(r=>{let{keydownListener:o,keyupListenr:s,capture:i}=R.get(r)||{};o&&s&&(it(r,"keyup",s,i),it(r,"keydown",o,i),R.delete(r))}),R.clear(),Object.keys(b).forEach(r=>delete b[r]),at)){let{listener:r,capture:o}=at;it(window,"focus",r,o),at=null}}var Yt={getPressedKeyString:_r,setScope:Me,getScope:ct,deleteScope:Sr,getPressedKeyCodes:$r,getAllKeyCodes:kr,isPressed:Ar,filter:De,trigger:Pr,unbind:Ue,keyMap:lt,modifier:A,modifierMap:nt};for(let e in Yt){let t=e;Object.prototype.hasOwnProperty.call(Yt,t)&&(L[t]=Yt[t])}if(typeof window<"u"){let e=window.hotkeys;L.noConflict=t=>(t&&window.hotkeys===L&&(window.hotkeys=e),L),window.hotkeys=L}var He=e=>{class t extends e{constructor(){super(...arguments);this.#t=!1;this.initialReflectedProperties=new Map}#t;attributeChangedCallback(s,i,n){if(!this.#t){let a=this;this.constructor.elementProperties.forEach((l,d)=>{l.reflect&&a[d]!=null&&this.initialReflectedProperties.set(d,a[d])}),this.initialReflectedProperties.set("slot",this.slot),this.#t=!0}super.attributeChangedCallback?.(s,i,n)}willUpdate(s){super.willUpdate?.(s);let i=this;this.initialReflectedProperties.forEach((n,a)=>{s.has(a)&&i[a]==null&&(i[a]=n)})}}return w([C()],t.prototype,"initialReflectedProperties",2),t};function kt(e){if(!e||typeof e!="object")return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype||Object.getPrototypeOf(t)===null?Object.prototype.toString.call(e)==="[object Object]":!1}function Xt(e){return e!=null}function At(e){return typeof e=="string"}var St=class extends Event{constructor(t,r){super(t,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=r}};var Ct=class extends St{constructor(t,r={}){super("lb-command",{bubbles:!0,cancelable:!1,composed:!0}),this.command=t,this.detail=r}};var Pt=class extends Event{constructor(t={value:void 0,oldValue:void 0}){super("lb-data",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ot=class extends Event{constructor(t={}){super("lb-display-mode-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Tt=class extends Event{constructor(t){super("lb-drag-end",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Rt=class extends Event{constructor(t){super("lb-drag-start",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Lt=class extends Event{constructor(t={}){super("lb-error",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Mt=class extends Event{constructor(t={}){super("lb-param-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Dt=class extends Event{constructor(t){super("lb-popover-close",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ut=class extends Event{constructor(t){super("lb-popover-open",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ht=class extends Event{constructor(t){super("lb-resize",{bubbles:!1,cancelable:!1,composed:!0}),this.detail=t}};var Ne={"lb-command":Ct,"lb-data":Pt,"lb-drag-start":Rt,"lb-drag-end":Tt,"lb-error":Lt,"lb-resize":Ht,"lb-popover-open":Ut,"lb-popover-close":Dt,"lb-param-change":Mt,"lb-display-mode-change":Ot};function je(e){return Ne[e]}function Be(){return window.location!==window.parent.location}var ze=`:host {
  box-sizing: border-box;
  color: var(--lookbook-text-base);
  font-weight: var(--lookbook-font-weight-normal);
  font-size: var(--lookbook-font-size-md);
  font-family: var(--lookbook-font-family);
  line-height: 1.1;
  display: block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  scrollbar-color: var(--lookbook-neutral-fill-quiet) transparent;
  scrollbar-width: thin;
}
:host *,
:host *::before,
:host *::after {
  box-sizing: border-box;
}
button {
  all: unset;
  display: revert;
}
ol,
ul,
menu {
  all: unset;
  display: revert;
}
input,
button,
textarea,
select {
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
:host([divider]) {
  border-width: 0;
  border-style: solid;
  border-color: var(--lookbook-divider-color);
}
:host([divider="block-start"]) {
  border-block-start-width: var(--lookbook-divider-width);
}
:host([divider="block-end"]) {
  border-block-end-width: var(--lookbook-divider-width);
}
:host([divider="inline-start"]) {
  border-inline-start-width: var(--lookbook-divider-width);
}
:host([divider="inline-end"]) {
  border-inline-end-width: var(--lookbook-divider-width);
}
:host([surface="1"]) {
  background-color: var(--lookbook-surface-1);
}
:host([surface="2"]) {
  background-color: var(--lookbook-surface-2);
}
:host([surface="3"]) {
  background-color: var(--lookbook-surface-3);
}
wa-split-panel {
  --divider-width: var(--lookbook-divider-width);
  &::part(divider) {
    background-color: var(--lookbook-divider-color);
  }
}
wa-popover {
  --wa-color-text-normal: var(--lookbook-neutral-text-on-quiet);
  --wa-font-size-m: var(--lookbook-font-size-md);
  --wa-panel-border-width: 1px;
  --wa-color-surface-border: var(--lookbook-divider-color);
  --wa-panel-border-radius: var(--lookbook-size-xs);
  --wa-panel-border-style: solid;
  --wa-shadow-l: var(--lookbook-shadow-quiet);
  --wa-color-surface-default: var(--lookbook-surface-1);
  --wa-line-height-normal: var(--lookbook-line-height);
  --arrow-size: 0;
  --max-width: 15rem;
  --hide-duration: 30ms;
  --show-duration: 30ms;
}
`;var pt=class extends He(_){constructor(){super();this.cleanupJobs=[]}static{this.shadowRootOptions={..._.shadowRootOptions,serializable:!0}}static{this.morphable=!0}static get styles(){let r=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[ze,...r].map(o=>typeof o=="string"?H(o):o)}afterMorph(){}get morphable(){return!!this.getStaticProperty("morphable")}disconnectedCallback(){this.cleanupJobs.forEach(r=>r()),super.disconnectedCallback()}addCleanupJob(r){this.cleanupJobs.push(r)}renderToTarget(r,o){et(o,r)}on(r,o){this.addEventListener(r,o),this.addCleanupJob(()=>this.removeEventListener(r,o))}delegate(r,o){document.addEventListener(r,o),this.addCleanupJob(()=>document.removeEventListener(r,o))}dispatch(r,...o){let s=je(r),i=this;if(!s){console.warn(`Unknown event type '${r}'`);return}let n=null;if(kt(o[0])?(n=o[0],o=[]):o.length>0&&kt(o[o.length-1])&&(n=o.pop()),n?.target){let l=At(n.target)?document.querySelector(`#${n.target}`):i;l&&(i=l)}let a=[...o,n].filter(Xt);i.dispatchEvent(new s(...a))}getStaticProperty(r){return this.constructor[r]}warn(r){At(r)&&(r=new Error(r)),this.dispatch("lb-error",{error:r}),console.error(r)}};w([C()],pt.prototype,"cleanupJobs",2);var Tr=()=>`${window.location.protocol}//${window.location.host}`;function Ie(e="message",t={}){let r=t.data||{},o=t.target||window.parent;r.source=window.location.href,o.postMessage({type:e,data:r},Tr())}var We=`:host {
}
::slotted(lb-viewport) {
  border: 0;
}
`;var S=class extends pt{constructor(){super(...arguments);this.hasPanels=!1}get viewport(){return this.viewportElements?.[0]}handlePanelSlotChange(){let r=this.panelSlot?.assignedElements({flatten:!0});r=r?r.filter(o=>o.localName==="lb-panel"):[],this.hasPanels=r.length>0}handleHeightChange(r){if(Be()){let{contentRect:o}=r.detail.entries[0],s=Math.max(Math.round(o.height),this.offsetHeight);Ie("lb-height-change",{data:{height:s}})}}render(){return q`
      <wa-resize-observer @wa-resize="${this.handleHeightChange}">
        <div id="preview">
          <slot></slot>
        </div>
        <lb-panels
          id="panels"
          persist-as="${this.persistAs}"
          divider="block-start"
          ?hidden="${!this.hasPanels}"
        >
          <lb-button-group slot="action"></lb-button-group>
          <slot
            name="panel"
            @slotchange="${this.handlePanelSlotChange}"
          ></slot>
        </lb-panels>
      </wa-resize-observer>
    `}};S.css=We,w([$({attribute:"persist-as"})],S.prototype,"persistAs",2),w([$({reflect:!0})],S.prototype,"src",2),w([C()],S.prototype,"hasPanels",2),w([Jt("#panels > slot")],S.prototype,"panelSlot",2),w([Ft({selector:"lb-viewport"})],S.prototype,"viewportElements",2),w([C()],S.prototype,"viewport",1),S=w([rt("lb-embed-inspector")],S);export{S as LookbookEmbedInspector};
/*! Bundled license information:

@awesome.me/webawesome/dist/chunks/chunk.N3AZYXKV.js:
@awesome.me/webawesome/dist/chunks/chunk.I37X32SU.js:
@awesome.me/webawesome/dist/chunks/chunk.LU7TFTYS.js:
@awesome.me/webawesome/dist/chunks/chunk.GN66Y47Q.js:
@awesome.me/webawesome/dist/components/resize-observer/resize-observer.js:
  (*! Copyright 2025 Fonticons, Inc. - https://webawesome.com/license *)

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
lit-html/directives/repeat.js:
lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
lit-html/directives/if-defined.js:
lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

hotkeys-js/dist/hotkeys-js.js:
  (*!
   * hotkeys-js v4.0.0-beta.7
   * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
   * 
   * @author kenny wong <wowohoo@qq.com>
   * @license MIT
   * @homepage https://jaywcjlove.github.io/hotkeys-js
   *)
*/
