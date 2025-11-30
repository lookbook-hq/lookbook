var Te=Object.defineProperty;var Oe=Object.getOwnPropertyDescriptor;var w=(e,t,o,r)=>{for(var s=r>1?void 0:r?Oe(t,o):t,n=e.length-1,i;n>=0;n--)(i=e[n])&&(s=(r?i(t,o,s):i(s))||s);return r&&s&&Te(t,o,s),s};var nt=globalThis,it=nt.ShadowRoot&&(nt.ShadyCSS===void 0||nt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Zt=Symbol(),Ft=new WeakMap,W=class{constructor(t,o,r){if(this._$cssResult$=!0,r!==Zt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o,o=this.t;if(it&&t===void 0){let r=o!==void 0&&o.length===1;r&&(t=Ft.get(o)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&Ft.set(o,t))}return t}toString(){return this.cssText}},q=e=>new W(typeof e=="string"?e:e+"",void 0,Zt);var Yt=(e,t)=>{if(it)e.adoptedStyleSheets=t.map((o=>o instanceof CSSStyleSheet?o:o.styleSheet));else for(let o of t){let r=document.createElement("style"),s=nt.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=o.cssText,e.appendChild(r)}},Mt=it?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let o="";for(let r of t.cssRules)o+=r.cssText;return q(o)})(e):e;var{is:Le,defineProperty:Re,getOwnPropertyDescriptor:Me,getOwnPropertyNames:De,getOwnPropertySymbols:je,getPrototypeOf:Ue}=Object,at=globalThis,Qt=at.trustedTypes,Ne=Qt?Qt.emptyScript:"",He=at.reactiveElementPolyfillSupport,K=(e,t)=>e,V={toAttribute(e,t){switch(t){case Boolean:e=e?Ne:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=e!==null;break;case Number:o=e===null?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch{o=null}}return o}},lt=(e,t)=>!Le(e,t),Xt={attribute:!0,type:String,converter:V,reflect:!1,useDefault:!1,hasChanged:lt};Symbol.metadata??=Symbol("metadata"),at.litPropertyMetadata??=new WeakMap;var S=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,o=Xt){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(t,o),!o.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,o);s!==void 0&&Re(this.prototype,t,s)}}static getPropertyDescriptor(t,o,r){let{get:s,set:n}=Me(this.prototype,t)??{get(){return this[o]},set(i){this[o]=i}};return{get:s,set(i){let a=s?.call(this);n?.call(this,i),this.requestUpdate(t,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Xt}static _$Ei(){if(this.hasOwnProperty(K("elementProperties")))return;let t=Ue(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(K("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(K("properties"))){let o=this.properties,r=[...De(o),...je(o)];for(let s of r)this.createProperty(s,o[s])}let t=this[Symbol.metadata];if(t!==null){let o=litPropertyMetadata.get(t);if(o!==void 0)for(let[r,s]of o)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[o,r]of this.elementProperties){let s=this._$Eu(o,r);s!==void 0&&this._$Eh.set(s,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let o=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let s of r)o.unshift(Mt(s))}else t!==void 0&&o.push(Mt(t));return o}static _$Eu(t,o){let r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,o=this.constructor.elementProperties;for(let r of o.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Yt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,o,r){this._$AK(t,r)}_$ET(t,o){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){let n=(r.converter?.toAttribute!==void 0?r.converter:V).toAttribute(o,r.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,o){let r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=r.getPropertyOptions(s),i=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:V;this._$Em=s;let a=i.fromAttribute(o,n.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,o,r){if(t!==void 0){let s=this.constructor,n=this[t];if(r??=s.getPropertyOptions(t),!((r.hasChanged??lt)(n,o)||r.useDefault&&r.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,r))))return;this.C(t,o,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,o,{useDefault:r,reflect:s,wrapped:n},i){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??o??this[t]),n!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(o=void 0),this._$AL.set(t,o)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,n]of r){let{wrapped:i}=n,a=this[s];i!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,n,a)}}let t=!1,o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(o)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(o)}willUpdate(t){}_$AE(t){this._$EO?.forEach((o=>o.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((o=>this._$ET(o,this[o]))),this._$EM()}updated(t){}firstUpdated(t){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[K("elementProperties")]=new Map,S[K("finalized")]=new Map,He?.({ReactiveElement:S}),(at.reactiveElementVersions??=[]).push("2.1.1");var jt=globalThis,ct=jt.trustedTypes,te=ct?ct.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ut="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,Nt="?"+C,Be=`<${Nt}>`,M=document,G=()=>M.createComment(""),F=e=>e===null||typeof e!="object"&&typeof e!="function",Ht=Array.isArray,ie=e=>Ht(e)||typeof e?.[Symbol.iterator]=="function",Dt=`[ 	
\f\r]`,J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ee=/-->/g,oe=/>/g,L=RegExp(`>|${Dt}(?:([^\\s"'>=/]+)(${Dt}*=${Dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),re=/'/g,se=/"/g,ae=/^(?:script|style|textarea|title)$/i,Bt=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),mt=Bt(1),Ie=Bt(2),xo=Bt(3),g=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),ne=new WeakMap,R=M.createTreeWalker(M,129);function le(e,t){if(!Ht(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return te!==void 0?te.createHTML(t):t}var ce=(e,t)=>{let o=e.length-1,r=[],s,n=t===2?"<svg>":t===3?"<math>":"",i=J;for(let a=0;a<o;a++){let l=e[a],d,f,c=-1,h=0;for(;h<l.length&&(i.lastIndex=h,f=i.exec(l),f!==null);)h=i.lastIndex,i===J?f[1]==="!--"?i=ee:f[1]!==void 0?i=oe:f[2]!==void 0?(ae.test(f[2])&&(s=RegExp("</"+f[2],"g")),i=L):f[3]!==void 0&&(i=L):i===L?f[0]===">"?(i=s??J,c=-1):f[1]===void 0?c=-2:(c=i.lastIndex-f[2].length,d=f[1],i=f[3]===void 0?L:f[3]==='"'?se:re):i===se||i===re?i=L:i===ee||i===oe?i=J:(i=L,s=void 0);let p=i===L&&e[a+1].startsWith("/>")?" ":"";n+=i===J?l+Be:c>=0?(r.push(d),l.slice(0,c)+Ut+l.slice(c)+C+p):l+C+(c===-2?a:p)}return[le(e,n+(e[o]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Z=class e{constructor({strings:t,_$litType$:o},r){let s;this.parts=[];let n=0,i=0,a=t.length-1,l=this.parts,[d,f]=ce(t,o);if(this.el=e.createElement(d,r),R.currentNode=this.el.content,o===2||o===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=R.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(Ut)){let h=f[i++],p=s.getAttribute(c).split(C),u=/([.?@])?(.*)/.exec(h);l.push({type:1,index:n,name:u[2],strings:p,ctor:u[1]==="."?dt:u[1]==="?"?ht:u[1]==="@"?ft:j}),s.removeAttribute(c)}else c.startsWith(C)&&(l.push({type:6,index:n}),s.removeAttribute(c));if(ae.test(s.tagName)){let c=s.textContent.split(C),h=c.length-1;if(h>0){s.textContent=ct?ct.emptyScript:"";for(let p=0;p<h;p++)s.append(c[p],G()),R.nextNode(),l.push({type:2,index:++n});s.append(c[h],G())}}}else if(s.nodeType===8)if(s.data===Nt)l.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf(C,c+1))!==-1;)l.push({type:7,index:n}),c+=C.length-1}n++}}static createElement(t,o){let r=M.createElement("template");return r.innerHTML=t,r}};function D(e,t,o=e,r){if(t===g)return t;let s=r!==void 0?o._$Co?.[r]:o._$Cl,n=F(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(e),s._$AT(e,o,r)),r!==void 0?(o._$Co??=[])[r]=s:o._$Cl=s),s!==void 0&&(t=D(e,s._$AS(e,t.values),s,r)),t}var pt=class{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:o},parts:r}=this._$AD,s=(t?.creationScope??M).importNode(o,!0);R.currentNode=s;let n=R.nextNode(),i=0,a=0,l=r[0];for(;l!==void 0;){if(i===l.index){let d;l.type===2?d=new N(n,n.nextSibling,this,t):l.type===1?d=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(d=new ut(n,this,t)),this._$AV.push(d),l=r[++a]}i!==l?.index&&(n=R.nextNode(),i++)}return R.currentNode=M,s}p(t){let o=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,o),o+=r.strings.length-2):r._$AI(t[o])),o++}},N=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,o,r,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,o=this._$AM;return o!==void 0&&t?.nodeType===11&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){t=D(this,t,o),F(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==g&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ie(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&F(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){let{values:o,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Z.createElement(le(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(o);else{let n=new pt(s,this),i=n.u(this.options);n.p(o),this.T(i),this._$AH=n}}_$AC(t){let o=ne.get(t.strings);return o===void 0&&ne.set(t.strings,o=new Z(t)),o}k(t){Ht(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,r,s=0;for(let n of t)s===o.length?o.push(r=new e(this.O(G()),this.O(G()),this,this.options)):r=o[s],r._$AI(n),s++;s<o.length&&(this._$AR(r&&r._$AB.nextSibling,s),o.length=s)}_$AR(t=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},j=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,o,r,s,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=o,this._$AM=s,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=m}_$AI(t,o=this,r,s){let n=this.strings,i=!1;if(n===void 0)t=D(this,t,o,0),i=!F(t)||t!==this._$AH&&t!==g,i&&(this._$AH=t);else{let a=t,l,d;for(t=n[0],l=0;l<n.length-1;l++)d=D(this,a[r+l],o,l),d===g&&(d=this._$AH[l]),i||=!F(d)||d!==this._$AH[l],d===m?t=m:t!==m&&(t+=(d??"")+n[l+1]),this._$AH[l]=d}i&&!s&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},dt=class extends j{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},ht=class extends j{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},ft=class extends j{constructor(t,o,r,s,n){super(t,o,r,s,n),this.type=5}_$AI(t,o=this){if((t=D(this,t,o,0)??m)===g)return;let r=this._$AH,s=t===m&&r!==m||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==m&&(r===m||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ut=class{constructor(t,o,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){D(this,t)}},pe={M:Ut,P:C,A:Nt,C:1,L:ce,R:pt,D:ie,V:D,I:N,H:j,N:ht,U:ft,B:dt,F:ut},ze=jt.litHtmlPolyfillSupport;ze?.(Z,N),(jt.litHtmlVersions??=[]).push("3.3.1");var Y=(e,t,o)=>{let r=o?.renderBefore??t,s=r._$litPart$;if(s===void 0){let n=o?.renderBefore??null;r._$litPart$=s=new N(t.insertBefore(G(),n),n,void 0,o??{})}return s._$AI(e),s};var It=globalThis,_=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Y(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return g}};_._$litElement$=!0,_.finalized=!0,It.litElementHydrateSupport?.({LitElement:_});var We=It.litElementPolyfillSupport;We?.({LitElement:_});(It.litElementVersions??=[]).push("4.2.1");var zt=e=>(t,o)=>{o!==void 0?o.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};var qe={attribute:!0,type:String,converter:V,reflect:!1,hasChanged:lt},Ke=(e=qe,t,o)=>{let{kind:r,metadata:s}=o,n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),r==="setter"&&((e=Object.create(e)).wrapped=!0),n.set(o.name,e),r==="accessor"){let{name:i}=o;return{set(a){let l=t.get.call(this);t.set.call(this,a),this.requestUpdate(i,l,e)},init(a){return a!==void 0&&this.C(i,void 0,e,a),a}}}if(r==="setter"){let{name:i}=o;return function(a){let l=this[i];t.call(this,a),this.requestUpdate(i,l,e)}}throw Error("Unsupported decorator location: "+r)};function H(e){return(t,o)=>typeof o=="object"?Ke(e,t,o):((r,s,n)=>{let i=s.hasOwnProperty(n);return s.constructor.createProperty(n,r),i?Object.getOwnPropertyDescriptor(s,n):void 0})(e,t,o)}function U(e){return H({...e,state:!0,attribute:!1})}var v={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},A=e=>(...t)=>({_$litDirective$:e,values:t}),E=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,o,r){this._$Ct=t,this._$AM=o,this._$Ci=r}_$AS(t,o){return this.update(t,o)}update(t,o){return this.render(...o)}};var Ve=A(class extends E{constructor(e){if(super(e),e.type!==v.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((r=>r!==""))));for(let r in t)t[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(t)}let o=e.element.classList;for(let r of this.st)r in t||(o.remove(r),this.st.delete(r));for(let r in t){let s=!!t[r];s===this.st.has(r)||this.nt?.has(r)||(s?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return g}});var{I:Je}=pe;var he=e=>e.strings===void 0,de=()=>document.createComment(""),B=(e,t,o)=>{let r=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(o===void 0){let n=r.insertBefore(de(),s),i=r.insertBefore(de(),s);o=new Je(n,i,e,e.options)}else{let n=o._$AB.nextSibling,i=o._$AM,a=i!==e;if(a){let l;o._$AQ?.(e),o._$AM=e,o._$AP!==void 0&&(l=e._$AU)!==i._$AU&&o._$AP(l)}if(n!==s||a){let l=o._$AA;for(;l!==n;){let d=l.nextSibling;r.insertBefore(l,s),l=d}}}return o},O=(e,t,o=e)=>(e._$AI(t,o),e),Ge={},bt=(e,t=Ge)=>e._$AH=t,fe=e=>e._$AH,gt=e=>{e._$AR(),e._$AA.remove()};var Fe=A(class extends E{constructor(e){if(super(e),e.type!==v.PROPERTY&&e.type!==v.ATTRIBUTE&&e.type!==v.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!he(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===g||t===m)return t;let o=e.element,r=e.name;if(e.type===v.PROPERTY){if(t===o[r])return g}else if(e.type===v.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(r))return g}else if(e.type===v.ATTRIBUTE&&o.getAttribute(r)===t+"")return g;return bt(e),t}});var ue=(e,t,o)=>{let r=new Map;for(let s=t;s<=o;s++)r.set(e[s],s);return r},Ze=A(class extends E{constructor(e){if(super(e),e.type!==v.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,o){let r;o===void 0?o=t:t!==void 0&&(r=t);let s=[],n=[],i=0;for(let a of e)s[i]=r?r(a,i):i,n[i]=o(a,i),i++;return{values:n,keys:s}}render(e,t,o){return this.dt(e,t,o).values}update(e,[t,o,r]){let s=fe(e),{values:n,keys:i}=this.dt(t,o,r);if(!Array.isArray(s))return this.ut=i,n;let a=this.ut??=[],l=[],d,f,c=0,h=s.length-1,p=0,u=n.length-1;for(;c<=h&&p<=u;)if(s[c]===null)c++;else if(s[h]===null)h--;else if(a[c]===i[p])l[p]=O(s[c],n[p]),c++,p++;else if(a[h]===i[u])l[u]=O(s[h],n[u]),h--,u--;else if(a[c]===i[u])l[u]=O(s[c],n[u]),B(e,l[u+1],s[c]),c++,u--;else if(a[h]===i[p])l[p]=O(s[h],n[p]),B(e,s[c],s[h]),h--,p++;else if(d===void 0&&(d=ue(i,p,u),f=ue(a,c,h)),d.has(a[c]))if(d.has(a[h])){let k=f.get(i[p]),Rt=k!==void 0?s[k]:null;if(Rt===null){let Gt=B(e,s[c]);O(Gt,n[p]),l[p]=Gt}else l[p]=O(Rt,n[p]),B(e,s[c],Rt),s[k]=null;p++}else gt(s[h]),h--;else gt(s[c]),c++;for(;p<=u;){let k=B(e,l[u+1]);O(k,n[p]),l[p++]=k}for(;c<=h;){let k=s[c++];k!==null&&gt(k)}return this.ut=i,bt(e,l),g}});var me="important",Ye=" !"+me,Qe=A(class extends E{constructor(e){if(super(e),e.type!==v.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,o)=>{let r=e[o];return r==null?t:t+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`}),"")}update(e,[t]){let{style:o}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let r of this.ft)t[r]==null&&(this.ft.delete(r),r.includes("-")?o.removeProperty(r):o[r]=null);for(let r in t){let s=t[r];if(s!=null){this.ft.add(r);let n=typeof s=="string"&&s.endsWith(Ye);r.includes("-")||n?o.setProperty(r,n?s.slice(0,-11):s,n?me:""):o[r]=s}}return g}});var Q=class extends E{constructor(t){if(super(t),this.it=m,t.type!==v.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===m||t==null)return this._t=void 0,this.it=t;if(t===g)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let o=[t];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};Q.directiveName="unsafeHTML",Q.resultType=1;var Xe=A(Q);var Wt=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function qt(e,t,o,r){e.addEventListener?e.addEventListener(t,o,r):e.attachEvent&&e.attachEvent(`on${t}`,o)}function X(e,t,o,r){e&&(e.removeEventListener?e.removeEventListener(t,o,r):e.detachEvent&&e.detachEvent(`on${t}`,o))}function ge(e,t){let o=t.slice(0,t.length-1),r=[];for(let s=0;s<o.length;s++)r.push(e[o[s].toLowerCase()]);return r}function xe(e){typeof e!="string"&&(e=""),e=e.replace(/\s/g,"");let t=e.split(","),o=t.lastIndexOf("");for(;o>=0;)t[o-1]+=",",t.splice(o,1),o=t.lastIndexOf("");return t}function to(e,t){let o=e.length>=t.length?e:t,r=e.length>=t.length?t:e,s=!0;for(let n=0;n<o.length;n++)r.indexOf(o[n])===-1&&(s=!1);return s}function ve(e){let t=e.keyCode||e.which||e.charCode;return e.code&&/^Key[A-Z]$/.test(e.code)&&(t=e.code.charCodeAt(3)),t}var ot={backspace:8,"\u232B":8,tab:9,clear:12,enter:13,"\u21A9":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,arrowup:38,arrowdown:40,arrowleft:37,arrowright:39,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"\u21EA":20,",":188,".":190,"/":191,"`":192,"-":Wt?173:189,"=":Wt?61:187,";":Wt?59:186,"'":222,"{":219,"}":221,"[":219,"]":221,"\\":220},$={"\u21E7":16,shift:16,"\u2325":18,alt:18,option:18,"\u2303":17,ctrl:17,control:17,"\u2318":91,cmd:91,meta:91,command:91},tt={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},x={16:!1,18:!1,17:!1,91:!1},b={};for(let e=1;e<20;e++)ot[`f${e}`]=111+e;var y=[],et=null,ke="all",P=new Map,I=e=>ot[e.toLowerCase()]||$[e.toLowerCase()]||e.toUpperCase().charCodeAt(0),eo=e=>Object.keys(ot).find(t=>ot[t]===e),oo=e=>Object.keys($).find(t=>$[t]===e),Ee=e=>{ke=e||"all"},rt=()=>ke||"all",ro=()=>y.slice(0),so=()=>y.map(e=>eo(e)||oo(e)||String.fromCharCode(e)),no=()=>{let e=[];return Object.keys(b).forEach(t=>{b[t].forEach(({key:o,scope:r,mods:s,shortcut:n})=>{e.push({scope:r,shortcut:n,mods:s,keys:o.split("+").map(i=>I(i))})})}),e},$e=e=>{let t=e.target||e.srcElement,{tagName:o}=t,r=!0,s=o==="INPUT"&&!["checkbox","radio","range","button","file","reset","submit","color"].includes(t.type);return(t.isContentEditable||(s||o==="TEXTAREA"||o==="SELECT")&&!t.readOnly)&&(r=!1),r},io=e=>(typeof e=="string"&&(e=I(e)),y.indexOf(e)!==-1),ao=(e,t)=>{let o,r;e||(e=rt());for(let s in b)if(Object.prototype.hasOwnProperty.call(b,s))for(o=b[s],r=0;r<o.length;)o[r].scope===e?o.splice(r,1).forEach(({element:n})=>Vt(n)):r++;rt()===e&&Ee(t||"all")};function lo(e){let t=ve(e);e.key&&e.key.toLowerCase()==="capslock"&&(t=I(e.key));let o=y.indexOf(t);if(o>=0&&y.splice(o,1),e.key&&e.key.toLowerCase()==="meta"&&y.splice(0,y.length),(t===93||t===224)&&(t=91),t in x){x[t]=!1;for(let r in $)$[r]===t&&(T[r]=!1)}}var _e=(e,...t)=>{if(typeof e>"u")Object.keys(b).forEach(o=>{Array.isArray(b[o])&&b[o].forEach(r=>xt(r)),delete b[o]}),Vt(null);else if(Array.isArray(e))e.forEach(o=>{o.key&&xt(o)});else if(typeof e=="object")e.key&&xt(e);else if(typeof e=="string"){let[o,r]=t;typeof o=="function"&&(r=o,o=""),xt({key:e,scope:o,method:r,splitKey:"+"})}},xt=({key:e,scope:t,method:o,splitKey:r="+"})=>{xe(e).forEach(s=>{let n=s.split(r),i=n.length,a=n[i-1],l=a==="*"?"*":I(a);if(!b[l])return;t||(t=rt());let d=i>1?ge($,n):[],f=[];b[l]=b[l].filter(c=>{let h=(o?c.method===o:!0)&&c.scope===t&&to(c.mods,d);return h&&f.push(c.element),!h}),f.forEach(c=>Vt(c))})};function ye(e,t,o,r){if(t.element!==r)return;let s;if(t.scope===o||t.scope==="all"){s=t.mods.length>0;for(let n in x)Object.prototype.hasOwnProperty.call(x,n)&&(!x[n]&&t.mods.indexOf(+n)>-1||x[n]&&t.mods.indexOf(+n)===-1)&&(s=!1);(t.mods.length===0&&!x[16]&&!x[18]&&!x[17]&&!x[91]||s||t.shortcut==="*")&&(t.keys=[],t.keys=t.keys.concat(y),t.method(e,t)===!1&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0)))}}function be(e,t){let o=b["*"],r=ve(e);if(e.key&&e.key.toLowerCase()==="capslock"||!(T.filter||$e).call(this,e))return;if((r===93||r===224)&&(r=91),y.indexOf(r)===-1&&r!==229&&y.push(r),["metaKey","ctrlKey","altKey","shiftKey"].forEach(a=>{let l=tt[a];e[a]&&y.indexOf(l)===-1?y.push(l):!e[a]&&y.indexOf(l)>-1?y.splice(y.indexOf(l),1):a==="metaKey"&&e[a]&&(y=y.filter(d=>d in tt||d===r))}),r in x){x[r]=!0;for(let a in $)if(Object.prototype.hasOwnProperty.call($,a)){let l=tt[$[a]];T[a]=e[l]}if(!o)return}for(let a in x)Object.prototype.hasOwnProperty.call(x,a)&&(x[a]=e[tt[a]]);e.getModifierState&&!(e.altKey&&!e.ctrlKey)&&e.getModifierState("AltGraph")&&(y.indexOf(17)===-1&&y.push(17),y.indexOf(18)===-1&&y.push(18),x[17]=!0,x[18]=!0);let s=rt();if(o)for(let a=0;a<o.length;a++)o[a].scope===s&&(e.type==="keydown"&&o[a].keydown||e.type==="keyup"&&o[a].keyup)&&ye(e,o[a],s,t);if(!(r in b))return;let n=b[r],i=n.length;for(let a=0;a<i;a++)if((e.type==="keydown"&&n[a].keydown||e.type==="keyup"&&n[a].keyup)&&n[a].key){let l=n[a],{splitKey:d}=l,f=l.key.split(d),c=[];for(let h=0;h<f.length;h++)c.push(I(f[h]));c.sort().join("")===y.sort().join("")&&ye(e,l,s,t)}}var T=function(e,t,o){y=[];let r=xe(e),s=[],n="all",i=document,a=0,l=!1,d=!0,f="+",c=!1,h=!1;if(o===void 0&&typeof t=="function"&&(o=t),Object.prototype.toString.call(t)==="[object Object]"){let p=t;p.scope&&(n=p.scope),p.element&&(i=p.element),p.keyup&&(l=p.keyup),p.keydown!==void 0&&(d=p.keydown),p.capture!==void 0&&(c=p.capture),typeof p.splitKey=="string"&&(f=p.splitKey),p.single===!0&&(h=!0)}for(typeof t=="string"&&(n=t),h&&_e(e,n);a<r.length;a++){let p=r[a].split(f);s=[],p.length>1&&(s=ge($,p));let u=p[p.length-1];u=u==="*"?"*":I(u),u in b||(b[u]=[]),b[u].push({keyup:l,keydown:d,scope:n,mods:s,shortcut:r[a],method:o,key:r[a],splitKey:f,element:i})}if(typeof i<"u"&&typeof window<"u"){if(!P.has(i)){let p=(k=window.event)=>be(k,i),u=(k=window.event)=>{be(k,i),lo(k)};P.set(i,{keydownListener:p,keyupListenr:u,capture:c}),qt(i,"keydown",p,c),qt(i,"keyup",u,c)}if(!et){let p=()=>{y=[]};et={listener:p,capture:c},qt(window,"focus",p,c)}}};function co(e,t="all"){Object.keys(b).forEach(o=>{b[o].filter(r=>r.scope===t&&r.shortcut===e).forEach(r=>{r&&r.method&&r.method({},r)})})}function Vt(e){let t=Object.values(b).flat();if(t.findIndex(({element:o})=>o===e)<0&&e){let{keydownListener:o,keyupListenr:r,capture:s}=P.get(e)||{};o&&r&&(X(e,"keyup",r,s),X(e,"keydown",o,s),P.delete(e))}if((t.length<=0||P.size<=0)&&(Array.from(P.keys()).forEach(o=>{let{keydownListener:r,keyupListenr:s,capture:n}=P.get(o)||{};r&&s&&(X(o,"keyup",s,n),X(o,"keydown",r,n),P.delete(o))}),P.clear(),Object.keys(b).forEach(o=>delete b[o]),et)){let{listener:o,capture:r}=et;X(window,"focus",o,r),et=null}}var Kt={getPressedKeyString:so,setScope:Ee,getScope:rt,deleteScope:ao,getPressedKeyCodes:ro,getAllKeyCodes:no,isPressed:io,filter:$e,trigger:co,unbind:_e,keyMap:ot,modifier:$,modifierMap:tt};for(let e in Kt){let t=e;Object.prototype.hasOwnProperty.call(Kt,t)&&(T[t]=Kt[t])}if(typeof window<"u"){let e=window.hotkeys;T.noConflict=t=>(t&&window.hotkeys===T&&(window.hotkeys=e),T),window.hotkeys=T}var Ae=e=>{class t extends e{constructor(){super(...arguments);this.#t=!1;this.initialReflectedProperties=new Map}#t;attributeChangedCallback(s,n,i){if(!this.#t){let a=this;this.constructor.elementProperties.forEach((l,d)=>{l.reflect&&a[d]!=null&&this.initialReflectedProperties.set(d,a[d])}),this.initialReflectedProperties.set("slot",this.slot),this.#t=!0}super.attributeChangedCallback?.(s,n,i)}willUpdate(s){super.willUpdate?.(s);let n=this;this.initialReflectedProperties.forEach((i,a)=>{s.has(a)&&n[a]==null&&(n[a]=i)})}}return w([U()],t.prototype,"initialReflectedProperties",2),t};function vt(e){if(!e||typeof e!="object")return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype||Object.getPrototypeOf(t)===null?Object.prototype.toString.call(e)==="[object Object]":!1}function Jt(e){return e!=null}function kt(e){return typeof e=="string"}var Et=class extends Event{constructor(t,o){super(t,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=o}};var $t=class extends Et{constructor(t,o={}){super("lb-command",{bubbles:!0,cancelable:!1,composed:!0}),this.command=t,this.detail=o}};var _t=class extends Event{constructor(t={value:void 0,oldValue:void 0}){super("lb-data",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var At=class extends Event{constructor(t={}){super("lb-display-mode-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var wt=class extends Event{constructor(t){super("lb-drag-end",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var St=class extends Event{constructor(t){super("lb-drag-start",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ct=class extends Event{constructor(t={}){super("lb-error",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Pt=class extends Event{constructor(t={}){super("lb-param-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Tt=class extends Event{constructor(t){super("lb-popover-close",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ot=class extends Event{constructor(t){super("lb-popover-open",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Lt=class extends Event{constructor(t){super("lb-resize",{bubbles:!1,cancelable:!1,composed:!0}),this.detail=t}};var we={"lb-command":$t,"lb-data":_t,"lb-drag-start":St,"lb-drag-end":wt,"lb-error":Ct,"lb-resize":Lt,"lb-popover-open":Ot,"lb-popover-close":Tt,"lb-param-change":Pt,"lb-display-mode-change":At};function Se(e){return we[e]}var Ce=`:host {
  box-sizing: border-box;
  color: var(--lookbook-text-base);
  font-weight: var(--lookbook-font-weight-normal);
  font-size: var(--lookbook-font-size-md);
  font-family: var(--lookbook-font-family);
  line-height: 1.1;
  display: block;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scrollbar-color: var(--lookbook-neutral-fill-quiet) transparent;
  scrollbar-width: thin;
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
ol,
button {
  all: unset;
  display: revert;
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
`;var st=class extends Ae(_){constructor(){super();this.cleanupJobs=[]}static{this.shadowRootOptions={..._.shadowRootOptions,serializable:!0}}static{this.morphable=!0}static get styles(){let o=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Ce,...o].map(r=>typeof r=="string"?q(r):r)}afterMorph(){}get morphable(){return!!this.getStaticProperty("morphable")}disconnectedCallback(){this.cleanupJobs.forEach(o=>o()),super.disconnectedCallback()}addCleanupJob(o){this.cleanupJobs.push(o)}renderToTarget(o,r){Y(r,o)}on(o,r){this.addEventListener(o,r),this.addCleanupJob(()=>this.removeEventListener(o,r))}delegate(o,r){document.addEventListener(o,r),this.addCleanupJob(()=>document.removeEventListener(o,r))}dispatch(o,...r){let s=Se(o),n=this;if(!s){console.warn(`Unknown event type '${o}'`);return}let i=null;if(vt(r[0])?(i=r[0],r=[]):r.length>0&&vt(r[r.length-1])&&(i=r.pop()),i?.target){let l=kt(i.target)?document.querySelector(`#${i.target}`):n;l&&(n=l)}let a=[...r,i].filter(Jt);n.dispatchEvent(new s(...a))}getStaticProperty(o){return this.constructor[o]}warn(o){kt(o)&&(o=new Error(o)),this.dispatch("lb-error",{error:o}),console.error(o)}};w([U()],st.prototype,"cleanupJobs",2);var Pe=`:host {
  box-sizing: border-box;
  height: 44px;
  color: var(--lookbook-neutral-text-on-mid);
  background-color: var(--lookbook-accent-fill-mid);
}
#container {
  display: flex;
  align-items: stretch;
  height: 100%;
  padding-inline: var(--lookbook-size-md) var(--lookbook-size-2xs);
}
#logo {
  display: flex;
  align-items: center;
}
#logo ::slotted(*) {
  display: block;
  height: var(--lookbook-size-lg);
  transform: scale(97%) rotate(-3deg);
}
#logo,
#links,
#actions {
  position: relative;
  top: -1px;
}
#links {
  margin-left: auto;
  margin-right: var(--lookbook-size-xs);
  display: flex;
  align-items: center;
  column-gap: var(--lookbook-size-2xs);
  ::slotted(lb-button) {
    padding-block: var(--lookbook-size-2xs);
    opacity: 0.9;
  }
  ::slotted(lb-button:hover) {
    opacity: 1;
    background-color: color-mix(in oklab, var(--lookbook-accent-fill-mid), black 10%);
  }
  ::slotted(lb-button[active]) {
    pointer-events: none;
    cursor: default;
    opacity: 1;
    background-color: color-mix(in oklab, var(--lookbook-accent-fill-mid), black 20%);
  }
}
#actions {
  display: flex;
  align-items: center;
  border-color: color-mix(in oklab, var(--lookbook-accent-fill-mid), white 20%);
  ::slotted(lb-button) {
    color: var(--lookbook-neutral-text-on-mid);
  }
  ::slotted(lb-button:hover) {
    background-color: color-mix(in oklab, var(--lookbook-accent-fill-mid), black 8%);
  }
  ::slotted(lb-button:active) {
    background-color: color-mix(in oklab, var(--lookbook-accent-fill-mid), black 14%);
  }
}
`;var z=class extends st{render(){return mt`
      <div id="container">
        <a
          href="${this.homePath}"
          id="logo"
        >
          <slot name="logo"></slot>
        </a>

        <div id="links">
          <slot name="link"></slot>
        </div>

        <lb-button-group
          id="actions"
          divider="inline-start"
        >
          <slot name="action"></slot>
        </lb-button-group>
      </div>
    `}};z.css=Pe,w([H({attribute:"homepath"})],z.prototype,"homePath",2),z=w([zt("lb-header")],z);export{z as LookbookHeader};
/*! Bundled license information:

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
