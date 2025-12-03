var wr=Object.defineProperty;var Er=Object.getOwnPropertyDescriptor;var h=(t,e,r,o)=>{for(var s=o>1?void 0:o?Er(e,r):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(s=(o?n(e,r,s):n(s))||s);return o&&s&&wr(e,r,s),s};function xt(t,e){let r={waitUntilFirstUpdate:!1,...e};return(o,s)=>{let{update:i}=o,n=Array.isArray(t)?t:[t];o.update=function(a){n.forEach(l=>{let c=l;if(a.has(c)){let d=a.get(c),p=this[c];d!==p&&(!r.waitUntilFirstUpdate||this.hasUpdated)&&this[s](d,p)}}),i.call(this,a)}}}var $r=Object.defineProperty,Ar=Object.getOwnPropertyDescriptor,gt=t=>{throw TypeError(t)},L=(t,e,r,o)=>{for(var s=o>1?void 0:o?Ar(e,r):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(s=(o?n(e,r,s):n(s))||s);return o&&s&&$r(e,r,s),s},bt=(t,e,r)=>e.has(t)||gt("Cannot "+r),yt=(t,e,r)=>(bt(t,e,"read from private field"),r?r.call(t):e.get(t)),vt=(t,e,r)=>e.has(t)?gt("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,r),wt=(t,e,r,o)=>(bt(t,e,"write to private field"),o?o.call(t,r):e.set(t,r),r);var ge=globalThis,be=ge.ShadowRoot&&(ge.ShadyCSS===void 0||ge.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$t=Symbol(),Et=new WeakMap,ee=class{constructor(e,r,o){if(this._$cssResult$=!0,o!==$t)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o,r=this.t;if(be&&e===void 0){let o=r!==void 0&&r.length===1;o&&(e=Et.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Et.set(r,e))}return e}toString(){return this.cssText}},I=t=>new ee(typeof t=="string"?t:t+"",void 0,$t);var At=(t,e)=>{if(be)t.adoptedStyleSheets=e.map((r=>r instanceof CSSStyleSheet?r:r.styleSheet));else for(let r of e){let o=document.createElement("style"),s=ge.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=r.cssText,t.appendChild(o)}},Je=be?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(let o of e.cssRules)r+=o.cssText;return I(r)})(t):t;var{is:kr,defineProperty:Sr,getOwnPropertyDescriptor:_r,getOwnPropertyNames:Cr,getOwnPropertySymbols:Or,getPrototypeOf:Pr}=Object,ye=globalThis,kt=ye.trustedTypes,zr=kt?kt.emptyScript:"",Rr=ye.reactiveElementPolyfillSupport,te=(t,e)=>t,re={toAttribute(t,e){switch(e){case Boolean:t=t?zr:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},ve=(t,e)=>!kr(t,e),St={attribute:!0,type:String,converter:re,reflect:!1,useDefault:!1,hasChanged:ve};Symbol.metadata??=Symbol("metadata"),ye.litPropertyMetadata??=new WeakMap;var R=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=St){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){let o=Symbol(),s=this.getPropertyDescriptor(e,o,r);s!==void 0&&Sr(this.prototype,e,s)}}static getPropertyDescriptor(e,r,o){let{get:s,set:i}=_r(this.prototype,e)??{get(){return this[r]},set(n){this[r]=n}};return{get:s,set(n){let a=s?.call(this);i?.call(this,n),this.requestUpdate(e,a,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??St}static _$Ei(){if(this.hasOwnProperty(te("elementProperties")))return;let e=Pr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(te("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(te("properties"))){let r=this.properties,o=[...Cr(r),...Or(r)];for(let s of o)this.createProperty(s,r[s])}let e=this[Symbol.metadata];if(e!==null){let r=litPropertyMetadata.get(e);if(r!==void 0)for(let[o,s]of r)this.elementProperties.set(o,s)}this._$Eh=new Map;for(let[r,o]of this.elementProperties){let s=this._$Eu(r,o);s!==void 0&&this._$Eh.set(s,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let r=[];if(Array.isArray(e)){let o=new Set(e.flat(1/0).reverse());for(let s of o)r.unshift(Je(s))}else e!==void 0&&r.push(Je(e));return r}static _$Eu(e,r){let o=r.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,r=this.constructor.elementProperties;for(let o of r.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return At(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,r,o){this._$AK(e,o)}_$ET(e,r){let o=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,o);if(s!==void 0&&o.reflect===!0){let i=(o.converter?.toAttribute!==void 0?o.converter:re).toAttribute(r,o.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,r){let o=this.constructor,s=o._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let i=o.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:re;this._$Em=s;let a=n.fromAttribute(r,i.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(e,r,o){if(e!==void 0){let s=this.constructor,i=this[e];if(o??=s.getPropertyOptions(e),!((o.hasChanged??ve)(i,r)||o.useDefault&&o.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,o))))return;this.C(e,r,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:o,reflect:s,wrapped:i},n){o&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??r??this[e]),i!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(r=void 0),this._$AL.set(e,r)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[s,i]of o){let{wrapped:n}=i,a=this[s];n!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,i,a)}}let e=!1,r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(r)):this._$EM()}catch(o){throw e=!1,this._$EM(),o}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach((r=>r.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((r=>this._$ET(r,this[r]))),this._$EM()}updated(e){}firstUpdated(e){}};R.elementStyles=[],R.shadowRootOptions={mode:"open"},R[te("elementProperties")]=new Map,R[te("finalized")]=new Map,Rr?.({ReactiveElement:R}),(ye.reactiveElementVersions??=[]).push("2.1.1");var Ye=globalThis,we=Ye.trustedTypes,_t=we?we.createPolicy("lit-html",{createHTML:t=>t}):void 0,Xe="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,Ze="?"+T,Tr=`<${Ze}>`,U=document,se=()=>U.createComment(""),ie=t=>t===null||typeof t!="object"&&typeof t!="function",Qe=Array.isArray,Tt=t=>Qe(t)||typeof t?.[Symbol.iterator]=="function",Ge=`[ 	
\f\r]`,oe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ct=/-->/g,Ot=/>/g,N=RegExp(`>|${Ge}(?:([^\\s"'>=/]+)(${Ge}*=${Ge}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Pt=/'/g,zt=/"/g,Mt=/^(?:script|style|textarea|title)$/i,Ve=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),P=Ve(1),Mr=Ve(2),ko=Ve(3),w=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),Rt=new WeakMap,B=U.createTreeWalker(U,129);function Dt(t,e){if(!Qe(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return _t!==void 0?_t.createHTML(e):e}var Lt=(t,e)=>{let r=t.length-1,o=[],s,i=e===2?"<svg>":e===3?"<math>":"",n=oe;for(let a=0;a<r;a++){let l=t[a],c,d,p=-1,u=0;for(;u<l.length&&(n.lastIndex=u,d=n.exec(l),d!==null);)u=n.lastIndex,n===oe?d[1]==="!--"?n=Ct:d[1]!==void 0?n=Ot:d[2]!==void 0?(Mt.test(d[2])&&(s=RegExp("</"+d[2],"g")),n=N):d[3]!==void 0&&(n=N):n===N?d[0]===">"?(n=s??oe,p=-1):d[1]===void 0?p=-2:(p=n.lastIndex-d[2].length,c=d[1],n=d[3]===void 0?N:d[3]==='"'?zt:Pt):n===zt||n===Pt?n=N:n===Ct||n===Ot?n=oe:(n=N,s=void 0);let f=n===N&&t[a+1].startsWith("/>")?" ":"";i+=n===oe?l+Tr:p>=0?(o.push(c),l.slice(0,p)+Xe+l.slice(p)+T+f):l+T+(p===-2?a:f)}return[Dt(t,i+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]},ne=class t{constructor({strings:e,_$litType$:r},o){let s;this.parts=[];let i=0,n=0,a=e.length-1,l=this.parts,[c,d]=Lt(e,r);if(this.el=t.createElement(c,o),B.currentNode=this.el.content,r===2||r===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=B.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(Xe)){let u=d[n++],f=s.getAttribute(p).split(T),g=/([.?@])?(.*)/.exec(u);l.push({type:1,index:i,name:g[2],strings:f,ctor:g[1]==="."?$e:g[1]==="?"?Ae:g[1]==="@"?ke:q}),s.removeAttribute(p)}else p.startsWith(T)&&(l.push({type:6,index:i}),s.removeAttribute(p));if(Mt.test(s.tagName)){let p=s.textContent.split(T),u=p.length-1;if(u>0){s.textContent=we?we.emptyScript:"";for(let f=0;f<u;f++)s.append(p[f],se()),B.nextNode(),l.push({type:2,index:++i});s.append(p[u],se())}}}else if(s.nodeType===8)if(s.data===Ze)l.push({type:2,index:i});else{let p=-1;for(;(p=s.data.indexOf(T,p+1))!==-1;)l.push({type:7,index:i}),p+=T.length-1}i++}}static createElement(e,r){let o=U.createElement("template");return o.innerHTML=e,o}};function j(t,e,r=t,o){if(e===w)return e;let s=o!==void 0?r._$Co?.[o]:r._$Cl,i=ie(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(t),s._$AT(t,r,o)),o!==void 0?(r._$Co??=[])[o]=s:r._$Cl=s),s!==void 0&&(e=j(t,s._$AS(t,e.values),s,o)),e}var Ee=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:o}=this._$AD,s=(e?.creationScope??U).importNode(r,!0);B.currentNode=s;let i=B.nextNode(),n=0,a=0,l=o[0];for(;l!==void 0;){if(n===l.index){let c;l.type===2?c=new K(i,i.nextSibling,this,e):l.type===1?c=new l.ctor(i,l.name,l.strings,this,e):l.type===6&&(c=new Se(i,this,e)),this._$AV.push(c),l=o[++a]}n!==l?.index&&(i=B.nextNode(),n++)}return B.currentNode=U,s}p(e){let r=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,r),r+=o.strings.length-2):o._$AI(e[r])),r++}},K=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,o,s){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=j(this,e,r),ie(e)?e===x||e==null||e===""?(this._$AH!==x&&this._$AR(),this._$AH=x):e!==this._$AH&&e!==w&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Tt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==x&&ie(this._$AH)?this._$AA.nextSibling.data=e:this.T(U.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:o}=e,s=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=ne.createElement(Dt(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(r);else{let i=new Ee(s,this),n=i.u(this.options);i.p(r),this.T(n),this._$AH=i}}_$AC(e){let r=Rt.get(e.strings);return r===void 0&&Rt.set(e.strings,r=new ne(e)),r}k(e){Qe(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,o,s=0;for(let i of e)s===r.length?r.push(o=new t(this.O(se()),this.O(se()),this,this.options)):o=r[s],o._$AI(i),s++;s<r.length&&(this._$AR(o&&o._$AB.nextSibling,s),r.length=s)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let o=e.nextSibling;e.remove(),e=o}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},q=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,o,s,i){this.type=1,this._$AH=x,this._$AN=void 0,this.element=e,this.name=r,this._$AM=s,this.options=i,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=x}_$AI(e,r=this,o,s){let i=this.strings,n=!1;if(i===void 0)e=j(this,e,r,0),n=!ie(e)||e!==this._$AH&&e!==w,n&&(this._$AH=e);else{let a=e,l,c;for(e=i[0],l=0;l<i.length-1;l++)c=j(this,a[o+l],r,l),c===w&&(c=this._$AH[l]),n||=!ie(c)||c!==this._$AH[l],c===x?e=x:e!==x&&(e+=(c??"")+i[l+1]),this._$AH[l]=c}n&&!s&&this.j(e)}j(e){e===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},$e=class extends q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===x?void 0:e}},Ae=class extends q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==x)}},ke=class extends q{constructor(e,r,o,s,i){super(e,r,o,s,i),this.type=5}_$AI(e,r=this){if((e=j(this,e,r,0)??x)===w)return;let o=this._$AH,s=e===x&&o!==x||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,i=e!==x&&(o===x||s);s&&this.element.removeEventListener(this.name,this,o),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Se=class{constructor(e,r,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){j(this,e)}},Ht={M:Xe,P:T,A:Ze,C:1,L:Lt,R:Ee,D:Tt,V:j,I:K,H:q,N:Ae,U:ke,B:$e,F:Se},Dr=Ye.litHtmlPolyfillSupport;Dr?.(ne,K),(Ye.litHtmlVersions??=[]).push("3.3.1");var ae=(t,e,r)=>{let o=r?.renderBefore??e,s=o._$litPart$;if(s===void 0){let i=r?.renderBefore??null;o._$litPart$=s=new K(e.insertBefore(se(),i),i,void 0,r??{})}return s._$AI(t),s};var et=globalThis,S=class extends R{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ae(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};S._$litElement$=!0,S.finalized=!0,et.litElementHydrateSupport?.({LitElement:S});var Lr=et.litElementPolyfillSupport;Lr?.({LitElement:S});(et.litElementVersions??=[]).push("4.2.1");var le=t=>(e,r)=>{r!==void 0?r.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};var Hr={attribute:!0,type:String,converter:re,reflect:!1,hasChanged:ve},Wr=(t=Hr,e,r)=>{let{kind:o,metadata:s}=r,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),o==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(r.name,t),o==="accessor"){let{name:n}=r;return{set(a){let l=e.get.call(this);e.set.call(this,a),this.requestUpdate(n,l,t)},init(a){return a!==void 0&&this.C(n,void 0,t,a),a}}}if(o==="setter"){let{name:n}=r;return function(a){let l=this[n];e.call(this,a),this.requestUpdate(n,l,t)}}throw Error("Unsupported decorator location: "+o)};function E(t){return(e,r)=>typeof r=="object"?Wr(t,e,r):((o,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,o),n?Object.getOwnPropertyDescriptor(s,i):void 0})(t,e,r)}function b(t){return E({...t,state:!0,attribute:!1})}var H=(t,e,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,r),r);function F(t,e){return(r,o,s)=>{let i=n=>n.renderRoot?.querySelector(t)??null;if(e){let{get:n,set:a}=typeof o=="object"?r:s??(()=>{let l=Symbol();return{get(){return this[l]},set(c){this[l]=c}}})();return H(r,o,{get(){let l=n.call(this);return l===void 0&&(l=i(this),(l!==null||this.hasUpdated)&&a.call(this,l)),l}})}return H(r,o,{get(){return i(this)}})}}var Ir;function tt(t){return(e,r)=>H(e,r,{get(){return(this.renderRoot??(Ir??=document.createDocumentFragment())).querySelectorAll(t)}})}var Br=`:host {
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
`,_e,pe=class extends S{constructor(){super(),vt(this,_e,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,r)=>{if(this.internals?.states)try{r?this.internals.states.add(e):this.internals.states.delete(e)}catch(o){if(String(o).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw o}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,r]of t.elementProperties)r.default==="inherit"&&r.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${r.initial}`,!0)}static get styles(){let t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Br,...t].map(e=>typeof e=="string"?I(e):e)}attributeChangedCallback(t,e,r){yt(this,_e)||(this.constructor.elementProperties.forEach((o,s)=>{o.reflect&&this[s]!=null&&this.initialReflectedProperties.set(s,this[s])}),wt(this,_e,!0)),super.attributeChangedCallback(t,e,r)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,r)=>{t.has(r)&&this[r]==null&&(this[r]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){let r=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});r.error=e,this.dispatchEvent(r)}throw e}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};_e=new WeakMap;L([E()],pe.prototype,"dir",2);L([E()],pe.prototype,"lang",2);L([E({type:Boolean,reflect:!0,attribute:"did-ssr"})],pe.prototype,"didSSR",2);var Ur=class extends Event{constructor(t){super("wa-resize",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}},jr=`:host {
  display: contents;
}
`,J=class extends pe{constructor(){super(...arguments),this.observedElements=[],this.disabled=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(t=>{this.dispatchEvent(new Ur({entries:t}))}),this.disabled||this.updateComplete.then(()=>{this.startObserver()})}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){let t=this.shadowRoot.querySelector("slot");if(t!==null){let e=t.assignedElements({flatten:!0});this.observedElements.forEach(r=>this.resizeObserver.unobserve(r)),this.observedElements=[],e.forEach(r=>{this.resizeObserver.observe(r),this.observedElements.push(r)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return P` <slot @slotchange=${this.handleSlotChange}></slot> `}};J.css=jr;L([E({type:Boolean,reflect:!0})],J.prototype,"disabled",2);L([xt("disabled",{waitUntilFirstUpdate:!0})],J.prototype,"handleDisabledChange",1);J=L([le("wa-resize-observer")],J);var A={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},z=t=>(...e)=>({_$litDirective$:t,values:e}),_=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,o){this._$Ct=e,this._$AM=r,this._$Ci=o}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var qr=z(class extends _{constructor(t){if(super(t),t.type!==A.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(let o in e)e[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(e)}let r=t.element.classList;for(let o of this.st)o in e||(r.remove(o),this.st.delete(o));for(let o in e){let s=!!e[o];s===this.st.has(o)||this.nt?.has(o)||(s?(r.add(o),this.st.add(o)):(r.remove(o),this.st.delete(o)))}return w}});var{I:Kr}=Ht;var It=t=>t.strings===void 0,Wt=()=>document.createComment(""),G=(t,e,r)=>{let o=t._$AA.parentNode,s=e===void 0?t._$AB:e._$AA;if(r===void 0){let i=o.insertBefore(Wt(),s),n=o.insertBefore(Wt(),s);r=new Kr(i,n,t,t.options)}else{let i=r._$AB.nextSibling,n=r._$AM,a=n!==t;if(a){let l;r._$AQ?.(t),r._$AM=t,r._$AP!==void 0&&(l=t._$AU)!==n._$AU&&r._$AP(l)}if(i!==s||a){let l=r._$AA;for(;l!==i;){let c=l.nextSibling;o.insertBefore(l,s),l=c}}}return r},W=(t,e,r=t)=>(t._$AI(e,r),t),Fr={},Ce=(t,e=Fr)=>t._$AH=e,Nt=t=>t._$AH,Oe=t=>{t._$AR(),t._$AA.remove()};var Jr=z(class extends _{constructor(t){if(super(t),t.type!==A.PROPERTY&&t.type!==A.ATTRIBUTE&&t.type!==A.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!It(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===w||e===x)return e;let r=t.element,o=t.name;if(t.type===A.PROPERTY){if(e===r[o])return w}else if(t.type===A.BOOLEAN_ATTRIBUTE){if(!!e===r.hasAttribute(o))return w}else if(t.type===A.ATTRIBUTE&&r.getAttribute(o)===e+"")return w;return Ce(t),e}});var Bt=(t,e,r)=>{let o=new Map;for(let s=e;s<=r;s++)o.set(t[s],s);return o},Gr=z(class extends _{constructor(t){if(super(t),t.type!==A.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,r){let o;r===void 0?r=e:e!==void 0&&(o=e);let s=[],i=[],n=0;for(let a of t)s[n]=o?o(a,n):n,i[n]=r(a,n),n++;return{values:i,keys:s}}render(t,e,r){return this.dt(t,e,r).values}update(t,[e,r,o]){let s=Nt(t),{values:i,keys:n}=this.dt(e,r,o);if(!Array.isArray(s))return this.ut=n,i;let a=this.ut??=[],l=[],c,d,p=0,u=s.length-1,f=0,g=i.length-1;for(;p<=u&&f<=g;)if(s[p]===null)p++;else if(s[u]===null)u--;else if(a[p]===n[f])l[f]=W(s[p],i[f]),p++,f++;else if(a[u]===n[g])l[g]=W(s[u],i[g]),u--,g--;else if(a[p]===n[g])l[g]=W(s[p],i[g]),G(t,l[g+1],s[p]),p++,g--;else if(a[u]===n[f])l[f]=W(s[u],i[f]),G(t,s[p],s[u]),u--,f++;else if(c===void 0&&(c=Bt(n,f,g),d=Bt(a,p,u)),c.has(a[p]))if(c.has(a[u])){let k=d.get(n[f]),Fe=k!==void 0?s[k]:null;if(Fe===null){let ut=G(t,s[p]);W(ut,i[f]),l[f]=ut}else l[f]=W(Fe,i[f]),G(t,s[p],Fe),s[k]=null;f++}else Oe(s[u]),u--;else Oe(s[p]),p++;for(;f<=g;){let k=G(t,l[g+1]);W(k,i[f]),l[f++]=k}for(;p<=u;){let k=s[p++];k!==null&&Oe(k)}return this.ut=n,Ce(t,l),w}});var Ut="important",Yr=" !"+Ut,rt=z(class extends _{constructor(t){if(super(t),t.type!==A.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{let o=t[r];return o==null?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`}),"")}update(t,[e]){let{style:r}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let o of this.ft)e[o]==null&&(this.ft.delete(o),o.includes("-")?r.removeProperty(o):r[o]=null);for(let o in e){let s=e[o];if(s!=null){this.ft.add(o);let i=typeof s=="string"&&s.endsWith(Yr);o.includes("-")||i?r.setProperty(o,i?s.slice(0,-11):s,i?Ut:""):r[o]=s}}return w}});var ce=class extends _{constructor(e){if(super(e),this.it=x,e.type!==A.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===x||e==null)return this._t=void 0,this.it=e;if(e===w)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let r=[e];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};ce.directiveName="unsafeHTML",ce.resultType=1;var Xr=z(ce);var ot=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function st(t,e,r,o){t.addEventListener?t.addEventListener(e,r,o):t.attachEvent&&t.attachEvent(`on${e}`,r)}function fe(t,e,r,o){t&&(t.removeEventListener?t.removeEventListener(e,r,o):t.detachEvent&&t.detachEvent(`on${e}`,r))}function Kt(t,e){let r=e.slice(0,e.length-1),o=[];for(let s=0;s<r.length;s++)o.push(t[r[s].toLowerCase()]);return o}function Ft(t){typeof t!="string"&&(t=""),t=t.replace(/\s/g,"");let e=t.split(","),r=e.lastIndexOf("");for(;r>=0;)e[r-1]+=",",e.splice(r,1),r=e.lastIndexOf("");return e}function Zr(t,e){let r=t.length>=e.length?t:e,o=t.length>=e.length?e:t,s=!0;for(let i=0;i<r.length;i++)o.indexOf(r[i])===-1&&(s=!1);return s}function Jt(t){let e=t.keyCode||t.which||t.charCode;return t.code&&/^Key[A-Z]$/.test(t.code)&&(e=t.code.charCodeAt(3)),e}var me={backspace:8,"\u232B":8,tab:9,clear:12,enter:13,"\u21A9":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,arrowup:38,arrowdown:40,arrowleft:37,arrowright:39,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"\u21EA":20,",":188,".":190,"/":191,"`":192,"-":ot?173:189,"=":ot?61:187,";":ot?59:186,"'":222,"{":219,"}":221,"[":219,"]":221,"\\":220},O={"\u21E7":16,shift:16,"\u2325":18,alt:18,option:18,"\u2303":17,ctrl:17,control:17,"\u2318":91,cmd:91,meta:91,command:91},de={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},$={16:!1,18:!1,17:!1,91:!1},v={};for(let t=1;t<20;t++)me[`f${t}`]=111+t;var y=[],he=null,Gt="all",M=new Map,Y=t=>me[t.toLowerCase()]||O[t.toLowerCase()]||t.toUpperCase().charCodeAt(0),Qr=t=>Object.keys(me).find(e=>me[e]===t),Vr=t=>Object.keys(O).find(e=>O[e]===t),Yt=t=>{Gt=t||"all"},ue=()=>Gt||"all",eo=()=>y.slice(0),to=()=>y.map(t=>Qr(t)||Vr(t)||String.fromCharCode(t)),ro=()=>{let t=[];return Object.keys(v).forEach(e=>{v[e].forEach(({key:r,scope:o,mods:s,shortcut:i})=>{t.push({scope:o,shortcut:i,mods:s,keys:r.split("+").map(n=>Y(n))})})}),t},Xt=t=>{let e=t.target||t.srcElement,{tagName:r}=e,o=!0,s=r==="INPUT"&&!["checkbox","radio","range","button","file","reset","submit","color"].includes(e.type);return(e.isContentEditable||(s||r==="TEXTAREA"||r==="SELECT")&&!e.readOnly)&&(o=!1),o},oo=t=>(typeof t=="string"&&(t=Y(t)),y.indexOf(t)!==-1),so=(t,e)=>{let r,o;t||(t=ue());for(let s in v)if(Object.prototype.hasOwnProperty.call(v,s))for(r=v[s],o=0;o<r.length;)r[o].scope===t?r.splice(o,1).forEach(({element:i})=>nt(i)):o++;ue()===t&&Yt(e||"all")};function io(t){let e=Jt(t);t.key&&t.key.toLowerCase()==="capslock"&&(e=Y(t.key));let r=y.indexOf(e);if(r>=0&&y.splice(r,1),t.key&&t.key.toLowerCase()==="meta"&&y.splice(0,y.length),(e===93||e===224)&&(e=91),e in $){$[e]=!1;for(let o in O)O[o]===e&&(D[o]=!1)}}var Zt=(t,...e)=>{if(typeof t>"u")Object.keys(v).forEach(r=>{Array.isArray(v[r])&&v[r].forEach(o=>Pe(o)),delete v[r]}),nt(null);else if(Array.isArray(t))t.forEach(r=>{r.key&&Pe(r)});else if(typeof t=="object")t.key&&Pe(t);else if(typeof t=="string"){let[r,o]=e;typeof r=="function"&&(o=r,r=""),Pe({key:t,scope:r,method:o,splitKey:"+"})}},Pe=({key:t,scope:e,method:r,splitKey:o="+"})=>{Ft(t).forEach(s=>{let i=s.split(o),n=i.length,a=i[n-1],l=a==="*"?"*":Y(a);if(!v[l])return;e||(e=ue());let c=n>1?Kt(O,i):[],d=[];v[l]=v[l].filter(p=>{let u=(r?p.method===r:!0)&&p.scope===e&&Zr(p.mods,c);return u&&d.push(p.element),!u}),d.forEach(p=>nt(p))})};function jt(t,e,r,o){if(e.element!==o)return;let s;if(e.scope===r||e.scope==="all"){s=e.mods.length>0;for(let i in $)Object.prototype.hasOwnProperty.call($,i)&&(!$[i]&&e.mods.indexOf(+i)>-1||$[i]&&e.mods.indexOf(+i)===-1)&&(s=!1);(e.mods.length===0&&!$[16]&&!$[18]&&!$[17]&&!$[91]||s||e.shortcut==="*")&&(e.keys=[],e.keys=e.keys.concat(y),e.method(t,e)===!1&&(t.preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation&&t.stopPropagation(),t.cancelBubble&&(t.cancelBubble=!0)))}}function qt(t,e){let r=v["*"],o=Jt(t);if(t.key&&t.key.toLowerCase()==="capslock"||!(D.filter||Xt).call(this,t))return;if((o===93||o===224)&&(o=91),y.indexOf(o)===-1&&o!==229&&y.push(o),["metaKey","ctrlKey","altKey","shiftKey"].forEach(a=>{let l=de[a];t[a]&&y.indexOf(l)===-1?y.push(l):!t[a]&&y.indexOf(l)>-1?y.splice(y.indexOf(l),1):a==="metaKey"&&t[a]&&(y=y.filter(c=>c in de||c===o))}),o in $){$[o]=!0;for(let a in O)if(Object.prototype.hasOwnProperty.call(O,a)){let l=de[O[a]];D[a]=t[l]}if(!r)return}for(let a in $)Object.prototype.hasOwnProperty.call($,a)&&($[a]=t[de[a]]);t.getModifierState&&!(t.altKey&&!t.ctrlKey)&&t.getModifierState("AltGraph")&&(y.indexOf(17)===-1&&y.push(17),y.indexOf(18)===-1&&y.push(18),$[17]=!0,$[18]=!0);let s=ue();if(r)for(let a=0;a<r.length;a++)r[a].scope===s&&(t.type==="keydown"&&r[a].keydown||t.type==="keyup"&&r[a].keyup)&&jt(t,r[a],s,e);if(!(o in v))return;let i=v[o],n=i.length;for(let a=0;a<n;a++)if((t.type==="keydown"&&i[a].keydown||t.type==="keyup"&&i[a].keyup)&&i[a].key){let l=i[a],{splitKey:c}=l,d=l.key.split(c),p=[];for(let u=0;u<d.length;u++)p.push(Y(d[u]));p.sort().join("")===y.sort().join("")&&jt(t,l,s,e)}}var D=function(t,e,r){y=[];let o=Ft(t),s=[],i="all",n=document,a=0,l=!1,c=!0,d="+",p=!1,u=!1;if(r===void 0&&typeof e=="function"&&(r=e),Object.prototype.toString.call(e)==="[object Object]"){let f=e;f.scope&&(i=f.scope),f.element&&(n=f.element),f.keyup&&(l=f.keyup),f.keydown!==void 0&&(c=f.keydown),f.capture!==void 0&&(p=f.capture),typeof f.splitKey=="string"&&(d=f.splitKey),f.single===!0&&(u=!0)}for(typeof e=="string"&&(i=e),u&&Zt(t,i);a<o.length;a++){let f=o[a].split(d);s=[],f.length>1&&(s=Kt(O,f));let g=f[f.length-1];g=g==="*"?"*":Y(g),g in v||(v[g]=[]),v[g].push({keyup:l,keydown:c,scope:i,mods:s,shortcut:o[a],method:r,key:o[a],splitKey:d,element:n})}if(typeof n<"u"&&typeof window<"u"){if(!M.has(n)){let f=(k=window.event)=>qt(k,n),g=(k=window.event)=>{qt(k,n),io(k)};M.set(n,{keydownListener:f,keyupListenr:g,capture:p}),st(n,"keydown",f,p),st(n,"keyup",g,p)}if(!he){let f=()=>{y=[]};he={listener:f,capture:p},st(window,"focus",f,p)}}};function no(t,e="all"){Object.keys(v).forEach(r=>{v[r].filter(o=>o.scope===e&&o.shortcut===t).forEach(o=>{o&&o.method&&o.method({},o)})})}function nt(t){let e=Object.values(v).flat();if(e.findIndex(({element:r})=>r===t)<0&&t){let{keydownListener:r,keyupListenr:o,capture:s}=M.get(t)||{};r&&o&&(fe(t,"keyup",o,s),fe(t,"keydown",r,s),M.delete(t))}if((e.length<=0||M.size<=0)&&(Array.from(M.keys()).forEach(r=>{let{keydownListener:o,keyupListenr:s,capture:i}=M.get(r)||{};o&&s&&(fe(r,"keyup",s,i),fe(r,"keydown",o,i),M.delete(r))}),M.clear(),Object.keys(v).forEach(r=>delete v[r]),he)){let{listener:r,capture:o}=he;fe(window,"focus",r,o),he=null}}var it={getPressedKeyString:to,setScope:Yt,getScope:ue,deleteScope:so,getPressedKeyCodes:eo,getAllKeyCodes:ro,isPressed:oo,filter:Xt,trigger:no,unbind:Zt,keyMap:me,modifier:O,modifierMap:de};for(let t in it){let e=t;Object.prototype.hasOwnProperty.call(it,e)&&(D[e]=it[e])}if(typeof window<"u"){let t=window.hotkeys;D.noConflict=e=>(e&&window.hotkeys===D&&(window.hotkeys=t),D),window.hotkeys=D}var Qt=t=>{class e extends t{constructor(){super(...arguments);this.#e=!1;this.initialReflectedProperties=new Map}#e;attributeChangedCallback(s,i,n){if(!this.#e){let a=this;this.constructor.elementProperties.forEach((l,c)=>{l.reflect&&a[c]!=null&&this.initialReflectedProperties.set(c,a[c])}),this.initialReflectedProperties.set("slot",this.slot),this.#e=!0}super.attributeChangedCallback?.(s,i,n)}willUpdate(s){super.willUpdate?.(s);let i=this;this.initialReflectedProperties.forEach((n,a)=>{s.has(a)&&i[a]==null&&(i[a]=n)})}}return h([b()],e.prototype,"initialReflectedProperties",2),e};function at(t){let e=[];for(let r=0;r<t.length;r++){let o=t[r];o&&e.push(o)}return e}function Vt(t){return typeof t=="symbol"||t instanceof Symbol}function er(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function tr(t){return t==null?t===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}function ze(t){if(!t||typeof t!="object")return!1;let e=Object.getPrototypeOf(t);return e===null||e===Object.prototype||Object.getPrototypeOf(e)===null?Object.prototype.toString.call(t)==="[object Object]":!1}function X(t){return t==="__proto__"}function Z(t){if(typeof t!="object"||t==null)return!1;if(Object.getPrototypeOf(t)===null)return!0;if(Object.prototype.toString.call(t)!=="[object Object]"){let r=t[Symbol.toStringTag];return r==null||!Object.getOwnPropertyDescriptor(t,Symbol.toStringTag)?.writable?!1:t.toString()===`[object ${r}]`}let e=t;for(;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}function rr(t,e){return t===e||Number.isNaN(t)&&Number.isNaN(e)}function or(t){return Number.isSafeInteger(t)&&t>=0}function lt(t){return t!=null}function Re(t){return typeof t=="string"}function sr(t){return t!=null&&typeof t!="function"&&or(t.length)}function ir(t){switch(typeof t){case"number":case"symbol":return!1;case"string":return t.includes(".")||t.includes("[")||t.includes("]")}}function Q(t){return typeof t=="string"||typeof t=="symbol"?t:Object.is(t?.valueOf?.(),-0)?"-0":String(t)}function pt(t){if(t==null)return"";if(typeof t=="string")return t;if(Array.isArray(t))return t.map(pt).join(",");let e=String(t);return e==="0"&&Object.is(Number(t),-0)?"-0":e}function Te(t){if(Array.isArray(t))return t.map(Q);if(typeof t=="symbol")return[t];t=pt(t);let e=[],r=t.length;if(r===0)return e;let o=0,s="",i="",n=!1;for(t.charCodeAt(0)===46&&(e.push(""),o++);o<r;){let a=t[o];i?a==="\\"&&o+1<r?(o++,s+=t[o]):a===i?i="":s+=a:n?a==='"'||a==="'"?i=a:a==="]"?(n=!1,e.push(s),s=""):s+=a:a==="["?(n=!0,s&&(e.push(s),s="")):a==="."?s&&(e.push(s),s=""):s+=a,o++}return s&&e.push(s),e}function V(t,e,r){if(t==null)return r;switch(typeof e){case"string":{if(X(e))return r;let o=t[e];return o===void 0?ir(e)?V(t,Te(e),r):r:o}case"number":case"symbol":{typeof e=="number"&&(e=Q(e));let o=t[e];return o===void 0?r:o}default:{if(Array.isArray(e))return ao(t,e,r);if(Object.is(e?.valueOf(),-0)?e="-0":e=String(e),X(e))return r;let o=t[e];return o===void 0?r:o}}}function ao(t,e,r){if(e.length===0)return r;let o=t;for(let s=0;s<e.length;s++){if(o==null||X(e[s]))return r;o=o[e[s]]}return o===void 0?r:o}function ct(t){return t!==null&&(typeof t=="object"||typeof t=="function")}var lo=/^(?:0|[1-9]\d*)$/;function nr(t,e=Number.MAX_SAFE_INTEGER){switch(typeof t){case"number":return Number.isInteger(t)&&t>=0&&t<e;case"symbol":return!1;case"string":return lo.test(t)}}function ar(t){return t!==null&&typeof t=="object"&&tr(t)==="[object Arguments]"}var po=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,co=/^\w*$/;function lr(t,e){return Array.isArray(t)?!1:typeof t=="number"||typeof t=="boolean"||t==null||Vt(t)?!0:typeof t=="string"&&(co.test(t)||!po.test(t))||e!=null&&Object.hasOwn(e,t)}var pr=(t,e,r)=>{let o=t[e];(!(Object.hasOwn(t,e)&&rr(o,r))||r===void 0&&!(e in t))&&(t[e]=r)};function cr(t,e,r,o){if(t==null&&!ct(t))return t;let s=lr(e,t)?[e]:Array.isArray(e)?e:typeof e=="string"?Te(e):[e],i=r(V(t,s)),n=t;for(let a=0;a<s.length&&n!=null;a++){let l=Q(s[a]);if(X(l))continue;let c;if(a===s.length-1)c=i;else{let d=n[l],p=o?.(d,l,t);c=p!==void 0?p:ct(d)?d:nr(s[a+1])?[]:{}}pr(n,l,c),n=n[l]}return t}function ft(t,e,r){return cr(t,e,()=>r,()=>{})}function fr(t){let e=t?.constructor,r=typeof e=="function"?e.prototype:Object.prototype;return t===r}function dr(t){return er(t)}function dt(t,...e){t=Object(t);for(let r=0;r<e.length;r++){let o=e[r];o!=null&&Me(t,o,new WeakMap)}return t}function Me(t,e,r){for(let o in e){let s=e[o],i=t[o];if(i===void 0||!Object.hasOwn(t,o)){t[o]=fo(s,r);continue}r.get(s)!==i&&ho(i,s,r)}}function fo(t,e){if(e.has(t))return e.get(t);if(Z(t)){let r={};return e.set(t,r),Me(r,t,e),r}return t}function ho(t,e,r){if(Z(t)&&Z(e)){r.set(e,t),Me(t,e,r);return}Array.isArray(t)&&Array.isArray(e)&&(r.set(e,t),mo(t,e,r))}function mo(t,e,r){let o=Math.min(e.length,t.length);for(let s=0;s<o;s++)Z(t[s])&&Z(e[s])&&Me(t[s],e[s],r);for(let s=o;s<e.length;s++)t.push(e[s])}function ht(t){if(t==null)return!0;if(sr(t))return typeof t.splice!="function"&&typeof t!="string"&&(typeof Buffer>"u"||!Buffer.isBuffer(t))&&!dr(t)&&!ar(t)?!1:t.length===0;if(typeof t=="object"){if(t instanceof Map||t instanceof Set)return t.size===0;let e=Object.keys(t);return fr(t)?e.filter(r=>r!=="constructor").length===0:e.length===0}return!0}var mt=class{constructor(e,r={}){let o=e.split(".");this.store=at(["lb",o.shift()]).join("-"),this.namespace=o.join("."),this.setPersistedData(dt({},this.getPersistedData(),r))}namespacedPath(e){return`${this.namespace}.${e}`}get(e,r=null){return V(this.getPersistedData(),this.namespacedPath(e),r)}set(e,r){let o=this.getPersistedData();return ft(o,this.namespacedPath(e),r),this.setPersistedData(o)}getPersistedData(){return JSON.parse(localStorage.getItem(this.store)||"{}")}setPersistedData(e){return localStorage.setItem(this.store,JSON.stringify(e)),this}},hr=t=>{class e extends t{static{this.persist=[]}connectedCallback(){if(super.connectedCallback(),ht(this.persistAs)){console.warn("Cannot persist data - missing `persist-as` attribute",this);return}this.persistanceStore=new mt(this.persistAs);let o=this.constructor,s=this;o.persist.forEach(i=>{s[i]=this.persistanceStore.get(i,this[i])})}willUpdate(o){super.willUpdate?.(o),this.persistanceStore&&this.constructor.persist.forEach(i=>{o.get(i)!==void 0&&this.persistanceStore.set(i,this[i])})}afterMorph(){if(this.persistanceStore){let o=this.constructor,s=this;o.persist.forEach(i=>{s[i]=this.persistanceStore.get(i,this[i])})}}}return h([E({attribute:"persist-as"})],e.prototype,"persistAs",2),h([b()],e.prototype,"persistanceStore",2),e};var De=class extends Event{constructor(e,r){super(e,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=r}};var Le=class extends De{constructor(e,r={}){super("lb-command",{bubbles:!0,cancelable:!1,composed:!0}),this.command=e,this.detail=r}};var He=class extends Event{constructor(e={value:void 0,oldValue:void 0}){super("lb-data",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var We=class extends Event{constructor(e={}){super("lb-display-mode-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Ie=class extends Event{constructor(e){super("lb-drag-end",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Ne=class extends Event{constructor(e){super("lb-drag-start",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Be=class extends Event{constructor(e={}){super("lb-error",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Ue=class extends Event{constructor(e={}){super("lb-param-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var je=class extends Event{constructor(e){super("lb-popover-close",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var qe=class extends Event{constructor(e){super("lb-popover-open",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Ke=class extends Event{constructor(e){super("lb-resize",{bubbles:!1,cancelable:!1,composed:!0}),this.detail=e}};var mr={"lb-command":Le,"lb-data":He,"lb-drag-start":Ne,"lb-drag-end":Ie,"lb-error":Be,"lb-resize":Ke,"lb-popover-open":qe,"lb-popover-close":je,"lb-param-change":Ue,"lb-display-mode-change":We};function ur(t){return mr[t]}var xr=`:host {
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
`;var xe=class extends Qt(S){constructor(){super();this.cleanupJobs=[]}static{this.shadowRootOptions={...S.shadowRootOptions,serializable:!0}}static{this.morphable=!0}static get styles(){let r=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[xr,...r].map(o=>typeof o=="string"?I(o):o)}afterMorph(){}get morphable(){return!!this.getStaticProperty("morphable")}disconnectedCallback(){this.cleanupJobs.forEach(r=>r()),super.disconnectedCallback()}addCleanupJob(r){this.cleanupJobs.push(r)}renderToTarget(r,o){ae(o,r)}on(r,o){this.addEventListener(r,o),this.addCleanupJob(()=>this.removeEventListener(r,o))}delegate(r,o){document.addEventListener(r,o),this.addCleanupJob(()=>document.removeEventListener(r,o))}dispatch(r,...o){let s=ur(r),i=this;if(!s){console.warn(`Unknown event type '${r}'`);return}let n=null;if(ze(o[0])?(n=o[0],o=[]):o.length>0&&ze(o[o.length-1])&&(n=o.pop()),n?.target){let l=Re(n.target)?document.querySelector(`#${n.target}`):i;l&&(i=l)}let a=[...o,n].filter(lt);i.dispatchEvent(new s(...a))}getStaticProperty(r){return this.constructor[r]}warn(r){Re(r)&&(r=new Error(r)),this.dispatch("lb-error",{error:r}),console.error(r)}};h([b()],xe.prototype,"cleanupJobs",2);var gr=()=>`${window.location.protocol}//${window.location.host}`;function br(t,e,r){if(t.origin!==gr()){console.error(`Unknown message origin '${t.origin}'`,gr());return}t.data.type===e&&r(t.data.data)}var yr=`:host {
  --viewport-resize-handle-size: var(--lookbook-size-md);
  height: 100%;
  width: 100%;
  overflow: hidden;
  border: 1px solid var(--lookbook-divider-color);
  background-color: var(--lookbook-surface-1);
  border-radius: var(--lookbook-size-3xs);
}
#viewer {
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
}
:host([toolbar]) {
  #viewer {
    grid-template-rows: min-content 1fr;
  }
}
#window {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  background-color: var(--lookbook-surface-2);
  user-select: none;
  touch-action: none;
  position: relative;
}
#resizer {
  background-color: var(--lookbook-surface-1);
  outline: var(--lookbook-divider-width) solid var(--lookbook-divider-quiet);
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  box-shadow: 0px 0px 24px -10px rgba(0, 0, 0, 0.2);
  border-end-end-radius: var(--lookbook-size-3xs);
  border-end-start-radius: var(--lookbook-size-3xs);
  overflow: hidden;
  &:hover {
    outline-style: solid;
  }
}
:host([active-mode="responsive"]) {
  #resizer {
    display: grid;
    grid-template-columns: 1fr var(--viewport-resize-handle-size);
    grid-template-rows: 1fr var(--viewport-resize-handle-size);
  }
}
#iframe {
  border: 0;
  height: 100%;
  width: 100%;
  min-height: 0;
  min-width: 0;
}
.handle {
  position: absolute;
  display: grid;
  place-items: center;
  background-color: var(--lookbook-surface-1);
  color: var(--lookbook-neutral-text-on-soft);
  overflow: hidden;
  transition: all 150ms ease-out;
  lb-icon {
    color: var(--lookbook-text-quiet);
  }
}
#x-handle {
  border-inline-start: var(--lookbook-divider-width) solid var(--lookbook-divider-quiet);
  width: var(--viewport-resize-handle-size);
  height: 100%;
  cursor: ew-resize;
  top: 0;
  bottom: 0;
  right: 0;
  lb-icon {
    width: var(--viewport-resize-handle-size);
  }
  #resizer:hover & {
    border-inline-start-style: solid;
  }
}
#y-handle {
  border-top: var(--lookbook-divider-width) solid var(--lookbook-divider-quiet);
  height: var(--viewport-resize-handle-size);
  width: 100%;
  cursor: ns-resize;
  bottom: 0;
  left: 0;
  right: 0;
  lb-icon {
    height: var(--viewport-resize-handle-size);
    position: relative;
    top: -1px;
  }
  #resizer:hover & {
    border-block-start-style: solid;
  }
}
#xy-handle {
  width: var(--viewport-resize-handle-size);
  height: var(--viewport-resize-handle-size);
  cursor: nwse-resize;
  bottom: 0;
  right: 0;
  lb-icon {
    width: calc(var(--viewport-resize-handle-size) * 0.9);
    position: relative;
    left: -1.5px;
    top: -1.5px;
    transform: rotate(-45deg);
  }
}
#viewport-dimensions {
  display: flex;
  align-items: end;
  padding-block: var(--lookbook-size-xs);
  margin-inline-start: var(--lookbook-size-3xs);
  column-gap: var(--lookbook-size-3xs);
  font-family: var(--lookbook-font-family-code);
  font-size: var(--lookbook-font-size-sm);
  border-radius: var(--lookbook-size-3xs);
  position: relative;
  .dimension {
    display: flex;
    align-items: baseline;
    font-weight: var(--lookbook-font-weight-normal);
  }
  .times {
    font-size: var(--lookbook-font-size-md);
    line-height: 1;
    opacity: 0.6;
    font-weight: var(--lookbook-font-weight-normal);
  }
  abbr {
    font-size: 0.9em;
  }
}
#preview-width,
#preview-height {
  width: 5ch;
  font-family: var(--lookbook-font-family-code);
}
#preview-width {
  &::part(text-box) {
    text-align: end;
  }
}
`;var vr=16,C=1e6,m=class extends hr(xe){constructor(){super();this.toolbar=!1;this.mode="toggle";this.resize="both";this.width=C;this.height=C;this.minWidth=100;this.minHeight=100;this.resizeData=null;this.containerSizeObserver=null;this.viewportSizeObserver=null;this.handleResize=this.handleResize.bind(this),this.stopResize=this.stopResize.bind(this)}get responsive(){return this.activeMode==="responsive"&&this.resize!=="none"}get horizontallyResizable(){return["horizontal","both"].includes(this.resize)}get verticallyResizable(){return["vertical","both"].includes(this.resize)}get resizable(){return this.activeMode==="responsive"&&(this.verticallyResizable||this.horizontallyResizable)}get resizing(){return this.resizeData!==null}get expandable(){return this.width<this.maxWidth||this.height<this.maxHeight}connectedCallback(){super.connectedCallback(),this.activeMode=this.activeMode||(["responsive","toggle"].includes(this.mode)?"responsive":"fixed"),this.width=this.width||C,this.height=this.height||C;let r=this.handleMessage.bind(this);window.addEventListener("message",r),this.addCleanupJob(()=>window.removeEventListener("message",r)),this.delegate("lb-drag-start",()=>{this.iframe.inert=!0}),this.delegate("lb-drag-end",()=>{this.iframe.inert=!1})}expandToFullSize(){this.width=C,this.height=C}reload(){this.contentWindow?.location.reload()}setFixedHeight(r){this.style.height=`${r+(this.toolbar?.offsetHeight||0)}px`,this.height=this.maxHeight=r}get contentWindow(){return this.iframe?.contentWindow}startResize(r){if(!this.responsive||this.resizing)return;let o=r.target;this.resizeData={startX:r.clientX,startY:r.clientY,startWidth:this.resizer.offsetWidth,startHeight:this.resizer.offsetHeight,handle:o},document.addEventListener("pointermove",this.handleResize),document.addEventListener("pointerup",this.stopResize),o.setPointerCapture(r.pointerId),r.preventDefault()}handleResize(r){if(!this.resizing||!this.resizeData)return;let{startWidth:o,startHeight:s,startY:i,startX:n,handle:a}=this.resizeData,l=a.getAttribute("axis")||"xy";if(l.includes("x")){let c=Math.round(o+(r.clientX-n)*2),d=Math.max(Math.min(c,this.maxWidth),this.minWidth);this.width=d>=this.maxWidth?C:d}if(l.includes("y")){let c=Math.round(s+(r.clientY-i)),d=Math.max(Math.min(c,this.maxHeight),this.minHeight);this.height=d>=this.maxHeight?C:d}}stopResize(r){if(!this.resizing)return;let{handle:o}=this.resizeData;this.resizeData=null,document.removeEventListener("pointermove",this.handleResize),document.removeEventListener("pointerup",this.stopResize),o.releasePointerCapture(r.pointerId)}toggleFullWidth(){this.width===C?this.width=this.lastWidth:(this.lastWidth=this.width,this.width=C)}toggleFullHeight(){this.height===C?this.height=this.lastHeight:(this.lastHeight=this.height,this.height=C)}toggleFullSize(){this.toggleFullWidth(),this.toggleFullHeight()}toggleActiveMode(){this.activeMode=this.activeMode==="responsive"?"fixed":"responsive"}handleContainerSizeChange(r){let o=r.detail.entries[0].contentRect;this.maxWidth=Math.round(o.width),this.maxHeight=Math.round(o.height),r.stopPropagation()}handleViewportSizeChange(r){let o=r.detail.entries[0].contentRect;this.displayWidth=Math.round(o.width),this.displayHeight=Math.round(o.height),r.stopPropagation()}handleMessage(r){this.verticallyResizable||(br(r,"lb-height-change",o=>{let{source:s,height:i}=o;this.iframe.contentWindow?.location.href===s&&this.setFixedHeight(i)}),r.stopPropagation())}renderDimensions(){return P`
      <div
        id="viewport-dimensions"
        slot="start"
      >
        <output
          class="dimension"
          name="viewport-width"
        >
          ${this.displayWidth}
          <abbr>px</abbr>
        </output>
        <span class="times">&times;</span>
        <output
          class="dimension"
          name="viewport-height"
        >
          <span>${this.displayHeight}</span>
          <abbr>px</abbr>
        </output>
      </div>
    `}renderDragHandles(){return P`
      <div
        id="x-handle"
        class="handle"
        axis="x"
        @pointerdown="${this.startResize}"
        @dblclick="${this.toggleFullWidth}"
        ?hidden="${!this.horizontallyResizable}"
      >
        <lb-icon name="grip-vertical"></lb-icon>
      </div>
      <div
        id="y-handle"
        class="handle"
        axis="y"
        @pointerdown="${this.startResize}"
        @dblclick="${this.toggleFullHeight}"
        ?hidden="${!this.verticallyResizable}"
      >
        <lb-icon name="grip-horizontal"></lb-icon>
      </div>
      <div
        id="xy-handle"
        class="handle"
        @pointerdown="${this.startResize}"
        @dblclick="${this.toggleFullSize}"
        ?hidden="${!(this.horizontallyResizable&&this.verticallyResizable)}"
      >
        <lb-icon name="grip-horizontal"></lb-icon>
      </div>
    `}renderToolbar(){return P`
      <lb-toolbar
        id="toolbar"
        divider="block-end"
      >
        <lb-button-group slot="start">
          ${this.mode==="toggle"?P`
                <lb-button
                  id="toggle-responsive-mode"
                  @click="${this.toggleActiveMode}"
                  ?active=${this.responsive}
                >
                  <lb-icon name="tablet-smartphone"></lb-icon>
                  <lb-tooltip>${"Toggle device mode"}</lb-tooltip>
                </lb-button>
              `:x}
        </lb-button-group>
        ${this.renderDimensions()}

        <lb-button-group slot="end">
          <lb-button
            id="reload-preview"
            @click="${this.reload}"
          >
            <lb-icon name="refresh-cw"></lb-icon>
            <lb-tooltip placement="top">Refresh preview</lb-tooltip>
          </lb-button>

          <lb-button
            id="open-in-new-window"
            href="${this.src}"
            target="_blank"
          >
            <lb-icon name="square-arrow-out-up-right"></lb-icon>
            <lb-tooltip placement="top">Open in new window</lb-tooltip>
          </lb-button>
        </lb-button-group>
      </lb-toolbar>
    `}render(){let r={width:!this.responsive||this.width>=this.maxWidth?"100%":`${this.width-vr}px`,height:!this.responsive||this.height>=this.maxHeight?"100%":`${this.height-vr}px`};return P`
      <div id="viewer">
        ${this.toolbar?this.renderToolbar():x}
        <wa-resize-observer @wa-resize="${this.handleContainerSizeChange}">
          <div id="window">
            <div
              id="resizer"
              style="${rt(r)}"
            >
              <wa-resize-observer @wa-resize="${this.handleViewportSizeChange}">
                <iframe
                  id="iframe"
                  type="text/html"
                  src="${this.src}"
                  title="${this.description}"
                ></iframe>
              </wa-resize-observer>
              ${this.responsive?this.renderDragHandles():x}
            </div>
          </div>
        </wa-resize-observer>
      </div>
    `}};m.css=yr,m.persist=["width","height","lastWidth","lastHeight","resize","activeMode"],h([F("#iframe")],m.prototype,"iframe",2),h([F("#window")],m.prototype,"window",2),h([F("#resizer")],m.prototype,"resizer",2),h([F("#toolbar")],m.prototype,"toolbarEl",2),h([tt(".handle")],m.prototype,"handles",2),h([E()],m.prototype,"src",2),h([E()],m.prototype,"srcdoc",2),h([E()],m.prototype,"description",2),h([E({type:Boolean})],m.prototype,"toolbar",2),h([E()],m.prototype,"mode",2),h([E({attribute:"activemode",reflect:!0})],m.prototype,"activeMode",2),h([E({reflect:!0,type:String})],m.prototype,"resize",2),h([b()],m.prototype,"width",2),h([b()],m.prototype,"height",2),h([b()],m.prototype,"minWidth",2),h([b()],m.prototype,"minHeight",2),h([b()],m.prototype,"maxWidth",2),h([b()],m.prototype,"maxHeight",2),h([b()],m.prototype,"lastWidth",2),h([b()],m.prototype,"lastHeight",2),h([b()],m.prototype,"displayWidth",2),h([b()],m.prototype,"displayHeight",2),h([b()],m.prototype,"resizeData",2),h([b()],m.prototype,"containerSizeObserver",2),h([b()],m.prototype,"viewportSizeObserver",2),h([b()],m.prototype,"responsive",1),h([b()],m.prototype,"horizontallyResizable",1),h([b()],m.prototype,"verticallyResizable",1),h([b()],m.prototype,"resizable",1),h([b()],m.prototype,"resizing",1),h([b()],m.prototype,"expandable",1),m=h([le("lb-viewport")],m);export{m as LookbookViewport};
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
