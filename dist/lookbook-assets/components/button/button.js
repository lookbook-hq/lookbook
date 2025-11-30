var Ne=Object.defineProperty;var Ie=Object.getOwnPropertyDescriptor;var g=(e,t,o,r)=>{for(var s=r>1?void 0:r?Ie(t,o):t,n=e.length-1,i;n>=0;n--)(i=e[n])&&(s=(r?i(t,o,s):i(s))||s);return r&&s&&Ne(t,o,s),s};var it=globalThis,at=it.ShadowRoot&&(it.ShadyCSS===void 0||it.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,te=Symbol(),Xt=new WeakMap,W=class{constructor(t,o,r){if(this._$cssResult$=!0,r!==te)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o,o=this.t;if(at&&t===void 0){let r=o!==void 0&&o.length===1;r&&(t=Xt.get(o)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&Xt.set(o,t))}return t}toString(){return this.cssText}},K=e=>new W(typeof e=="string"?e:e+"",void 0,te);var ee=(e,t)=>{if(at)e.adoptedStyleSheets=t.map((o=>o instanceof CSSStyleSheet?o:o.styleSheet));else for(let o of t){let r=document.createElement("style"),s=it.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=o.cssText,e.appendChild(r)}},Mt=at?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let o="";for(let r of t.cssRules)o+=r.cssText;return K(o)})(e):e;var{is:ze,defineProperty:qe,getOwnPropertyDescriptor:Be,getOwnPropertyNames:We,getOwnPropertySymbols:Ke,getPrototypeOf:Ve}=Object,lt=globalThis,oe=lt.trustedTypes,Je=oe?oe.emptyScript:"",Fe=lt.reactiveElementPolyfillSupport,V=(e,t)=>e,J={toAttribute(e,t){switch(t){case Boolean:e=e?Je:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=e!==null;break;case Number:o=e===null?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch{o=null}}return o}},pt=(e,t)=>!ze(e,t),re={attribute:!0,type:String,converter:J,reflect:!1,useDefault:!1,hasChanged:pt};Symbol.metadata??=Symbol("metadata"),lt.litPropertyMetadata??=new WeakMap;var T=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,o=re){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(t,o),!o.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,o);s!==void 0&&qe(this.prototype,t,s)}}static getPropertyDescriptor(t,o,r){let{get:s,set:n}=Be(this.prototype,t)??{get(){return this[o]},set(i){this[o]=i}};return{get:s,set(i){let a=s?.call(this);n?.call(this,i),this.requestUpdate(t,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??re}static _$Ei(){if(this.hasOwnProperty(V("elementProperties")))return;let t=Ve(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(V("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(V("properties"))){let o=this.properties,r=[...We(o),...Ke(o)];for(let s of r)this.createProperty(s,o[s])}let t=this[Symbol.metadata];if(t!==null){let o=litPropertyMetadata.get(t);if(o!==void 0)for(let[r,s]of o)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[o,r]of this.elementProperties){let s=this._$Eu(o,r);s!==void 0&&this._$Eh.set(s,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let o=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let s of r)o.unshift(Mt(s))}else t!==void 0&&o.push(Mt(t));return o}static _$Eu(t,o){let r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,o=this.constructor.elementProperties;for(let r of o.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ee(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,o,r){this._$AK(t,r)}_$ET(t,o){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){let n=(r.converter?.toAttribute!==void 0?r.converter:J).toAttribute(o,r.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,o){let r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=r.getPropertyOptions(s),i=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:J;this._$Em=s;let a=i.fromAttribute(o,n.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,o,r){if(t!==void 0){let s=this.constructor,n=this[t];if(r??=s.getPropertyOptions(t),!((r.hasChanged??pt)(n,o)||r.useDefault&&r.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,r))))return;this.C(t,o,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,o,{useDefault:r,reflect:s,wrapped:n},i){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??o??this[t]),n!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(o=void 0),this._$AL.set(t,o)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,n]of r){let{wrapped:i}=n,a=this[s];i!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,n,a)}}let t=!1,o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(o)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(o)}willUpdate(t){}_$AE(t){this._$EO?.forEach((o=>o.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((o=>this._$ET(o,this[o]))),this._$EM()}updated(t){}firstUpdated(t){}};T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[V("elementProperties")]=new Map,T[V("finalized")]=new Map,Fe?.({ReactiveElement:T}),(lt.reactiveElementVersions??=[]).push("2.1.1");var jt=globalThis,ct=jt.trustedTypes,se=ct?ct.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ht="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,Ut="?"+O,Ge=`<${Ut}>`,H=document,G=()=>H.createComment(""),Y=e=>e===null||typeof e!="object"&&typeof e!="function",Nt=Array.isArray,ce=e=>Nt(e)||typeof e?.[Symbol.iterator]=="function",Dt=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ne=/-->/g,ie=/>/g,D=RegExp(`>|${Dt}(?:([^\\s"'>=/]+)(${Dt}*=${Dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ae=/'/g,le=/"/g,de=/^(?:script|style|textarea|title)$/i,It=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),Q=It(1),zt=It(2),he=It(3),v=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),pe=new WeakMap,j=H.createTreeWalker(H,129);function ue(e,t){if(!Nt(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return se!==void 0?se.createHTML(t):t}var fe=(e,t)=>{let o=e.length-1,r=[],s,n=t===2?"<svg>":t===3?"<math>":"",i=F;for(let a=0;a<o;a++){let l=e[a],d,f,p=-1,h=0;for(;h<l.length&&(i.lastIndex=h,f=i.exec(l),f!==null);)h=i.lastIndex,i===F?f[1]==="!--"?i=ne:f[1]!==void 0?i=ie:f[2]!==void 0?(de.test(f[2])&&(s=RegExp("</"+f[2],"g")),i=D):f[3]!==void 0&&(i=D):i===D?f[0]===">"?(i=s??F,p=-1):f[1]===void 0?p=-2:(p=i.lastIndex-f[2].length,d=f[1],i=f[3]===void 0?D:f[3]==='"'?le:ae):i===le||i===ae?i=D:i===ne||i===ie?i=F:(i=D,s=void 0);let c=i===D&&e[a+1].startsWith("/>")?" ":"";n+=i===F?l+Ge:p>=0?(r.push(d),l.slice(0,p)+Ht+l.slice(p)+O+c):l+O+(p===-2?a:c)}return[ue(e,n+(e[o]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Z=class e{constructor({strings:t,_$litType$:o},r){let s;this.parts=[];let n=0,i=0,a=t.length-1,l=this.parts,[d,f]=fe(t,o);if(this.el=e.createElement(d,r),j.currentNode=this.el.content,o===2||o===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=j.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(Ht)){let h=f[i++],c=s.getAttribute(p).split(O),m=/([.?@])?(.*)/.exec(h);l.push({type:1,index:n,name:m[2],strings:c,ctor:m[1]==="."?ht:m[1]==="?"?ut:m[1]==="@"?ft:N}),s.removeAttribute(p)}else p.startsWith(O)&&(l.push({type:6,index:n}),s.removeAttribute(p));if(de.test(s.tagName)){let p=s.textContent.split(O),h=p.length-1;if(h>0){s.textContent=ct?ct.emptyScript:"";for(let c=0;c<h;c++)s.append(p[c],G()),j.nextNode(),l.push({type:2,index:++n});s.append(p[h],G())}}}else if(s.nodeType===8)if(s.data===Ut)l.push({type:2,index:n});else{let p=-1;for(;(p=s.data.indexOf(O,p+1))!==-1;)l.push({type:7,index:n}),p+=O.length-1}n++}}static createElement(t,o){let r=H.createElement("template");return r.innerHTML=t,r}};function U(e,t,o=e,r){if(t===v)return t;let s=r!==void 0?o._$Co?.[r]:o._$Cl,n=Y(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(e),s._$AT(e,o,r)),r!==void 0?(o._$Co??=[])[r]=s:o._$Cl=s),s!==void 0&&(t=U(e,s._$AS(e,t.values),s,r)),t}var dt=class{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:o},parts:r}=this._$AD,s=(t?.creationScope??H).importNode(o,!0);j.currentNode=s;let n=j.nextNode(),i=0,a=0,l=r[0];for(;l!==void 0;){if(i===l.index){let d;l.type===2?d=new I(n,n.nextSibling,this,t):l.type===1?d=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(d=new mt(n,this,t)),this._$AV.push(d),l=r[++a]}i!==l?.index&&(n=j.nextNode(),i++)}return j.currentNode=H,s}p(t){let o=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,o),o+=r.strings.length-2):r._$AI(t[o])),o++}},I=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,o,r,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,o=this._$AM;return o!==void 0&&t?.nodeType===11&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){t=U(this,t,o),Y(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==v&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ce(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&Y(this._$AH)?this._$AA.nextSibling.data=t:this.T(H.createTextNode(t)),this._$AH=t}$(t){let{values:o,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Z.createElement(ue(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(o);else{let n=new dt(s,this),i=n.u(this.options);n.p(o),this.T(i),this._$AH=n}}_$AC(t){let o=pe.get(t.strings);return o===void 0&&pe.set(t.strings,o=new Z(t)),o}k(t){Nt(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,r,s=0;for(let n of t)s===o.length?o.push(r=new e(this.O(G()),this.O(G()),this,this.options)):r=o[s],r._$AI(n),s++;s<o.length&&(this._$AR(r&&r._$AB.nextSibling,s),o.length=s)}_$AR(t=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},N=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,o,r,s,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=o,this._$AM=s,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=u}_$AI(t,o=this,r,s){let n=this.strings,i=!1;if(n===void 0)t=U(this,t,o,0),i=!Y(t)||t!==this._$AH&&t!==v,i&&(this._$AH=t);else{let a=t,l,d;for(t=n[0],l=0;l<n.length-1;l++)d=U(this,a[r+l],o,l),d===v&&(d=this._$AH[l]),i||=!Y(d)||d!==this._$AH[l],d===u?t=u:t!==u&&(t+=(d??"")+n[l+1]),this._$AH[l]=d}i&&!s&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ht=class extends N{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}},ut=class extends N{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}},ft=class extends N{constructor(t,o,r,s,n){super(t,o,r,s,n),this.type=5}_$AI(t,o=this){if((t=U(this,t,o,0)??u)===v)return;let r=this._$AH,s=t===u&&r!==u||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==u&&(r===u||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},mt=class{constructor(t,o,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){U(this,t)}},me={M:Ht,P:O,A:Ut,C:1,L:fe,R:dt,D:ce,V:U,I,H:N,N:ut,U:ft,B:ht,F:mt},Ye=jt.litHtmlPolyfillSupport;Ye?.(Z,I),(jt.litHtmlVersions??=[]).push("3.3.1");var X=(e,t,o)=>{let r=o?.renderBefore??t,s=r._$litPart$;if(s===void 0){let n=o?.renderBefore??null;r._$litPart$=s=new I(t.insertBefore(G(),n),n,void 0,o??{})}return s._$AI(e),s};var qt=globalThis,C=class extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=X(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return v}};C._$litElement$=!0,C.finalized=!0,qt.litElementHydrateSupport?.({LitElement:C});var Ze=qt.litElementPolyfillSupport;Ze?.({LitElement:C});(qt.litElementVersions??=[]).push("4.2.1");var Bt=e=>(t,o)=>{o!==void 0?o.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};var Qe={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:pt},Xe=(e=Qe,t,o)=>{let{kind:r,metadata:s}=o,n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),r==="setter"&&((e=Object.create(e)).wrapped=!0),n.set(o.name,e),r==="accessor"){let{name:i}=o;return{set(a){let l=t.get.call(this);t.set.call(this,a),this.requestUpdate(i,l,e)},init(a){return a!==void 0&&this.C(i,void 0,e,a),a}}}if(r==="setter"){let{name:i}=o;return function(a){let l=this[i];t.call(this,a),this.requestUpdate(i,l,e)}}throw Error("Unsupported decorator location: "+r)};function k(e){return(t,o)=>typeof o=="object"?Xe(e,t,o):((r,s,n)=>{let i=s.hasOwnProperty(n);return s.constructor.createProperty(n,r),i?Object.getOwnPropertyDescriptor(s,n):void 0})(e,t,o)}function A(e){return k({...e,state:!0,attribute:!1})}var $={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},P=e=>(...t)=>({_$litDirective$:e,values:t}),_=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,o,r){this._$Ct=t,this._$AM=o,this._$Ci=r}_$AS(t,o){return this.update(t,o)}update(t,o){return this.render(...o)}};var to=P(class extends _{constructor(e){if(super(e),e.type!==$.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((r=>r!==""))));for(let r in t)t[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(t)}let o=e.element.classList;for(let r of this.st)r in t||(o.remove(r),this.st.delete(r));for(let r in t){let s=!!t[r];s===this.st.has(r)||this.nt?.has(r)||(s?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return v}});var{I:eo}=me;var ye=e=>e.strings===void 0,be=()=>document.createComment(""),z=(e,t,o)=>{let r=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(o===void 0){let n=r.insertBefore(be(),s),i=r.insertBefore(be(),s);o=new eo(n,i,e,e.options)}else{let n=o._$AB.nextSibling,i=o._$AM,a=i!==e;if(a){let l;o._$AQ?.(e),o._$AM=e,o._$AP!==void 0&&(l=e._$AU)!==i._$AU&&o._$AP(l)}if(n!==s||a){let l=o._$AA;for(;l!==n;){let d=l.nextSibling;r.insertBefore(l,s),l=d}}}return o},M=(e,t,o=e)=>(e._$AI(t,o),e),oo={},yt=(e,t=oo)=>e._$AH=t,ge=e=>e._$AH,gt=e=>{e._$AR(),e._$AA.remove()};var ro=P(class extends _{constructor(e){if(super(e),e.type!==$.PROPERTY&&e.type!==$.ATTRIBUTE&&e.type!==$.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ye(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===v||t===u)return t;let o=e.element,r=e.name;if(e.type===$.PROPERTY){if(t===o[r])return v}else if(e.type===$.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(r))return v}else if(e.type===$.ATTRIBUTE&&o.getAttribute(r)===t+"")return v;return yt(e),t}});var ve=(e,t,o)=>{let r=new Map;for(let s=t;s<=o;s++)r.set(e[s],s);return r},so=P(class extends _{constructor(e){if(super(e),e.type!==$.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,o){let r;o===void 0?o=t:t!==void 0&&(r=t);let s=[],n=[],i=0;for(let a of e)s[i]=r?r(a,i):i,n[i]=o(a,i),i++;return{values:n,keys:s}}render(e,t,o){return this.dt(e,t,o).values}update(e,[t,o,r]){let s=ge(e),{values:n,keys:i}=this.dt(t,o,r);if(!Array.isArray(s))return this.ut=i,n;let a=this.ut??=[],l=[],d,f,p=0,h=s.length-1,c=0,m=n.length-1;for(;p<=h&&c<=m;)if(s[p]===null)p++;else if(s[h]===null)h--;else if(a[p]===i[c])l[c]=M(s[p],n[c]),p++,c++;else if(a[h]===i[m])l[m]=M(s[h],n[m]),h--,m--;else if(a[p]===i[m])l[m]=M(s[p],n[m]),z(e,l[m+1],s[p]),p++,m--;else if(a[h]===i[c])l[c]=M(s[h],n[c]),z(e,s[p],s[h]),h--,c++;else if(d===void 0&&(d=ve(i,c,m),f=ve(a,p,h)),d.has(a[p]))if(d.has(a[h])){let w=f.get(i[c]),Rt=w!==void 0?s[w]:null;if(Rt===null){let Qt=z(e,s[p]);M(Qt,n[c]),l[c]=Qt}else l[c]=M(Rt,n[c]),z(e,s[p],Rt),s[w]=null;c++}else gt(s[h]),h--;else gt(s[p]),p++;for(;c<=m;){let w=z(e,l[m+1]);M(w,n[c]),l[c++]=w}for(;p<=h;){let w=s[p++];w!==null&&gt(w)}return this.ut=i,yt(e,l),v}});var xe="important",no=" !"+xe,io=P(class extends _{constructor(e){if(super(e),e.type!==$.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,o)=>{let r=e[o];return r==null?t:t+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`}),"")}update(e,[t]){let{style:o}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let r of this.ft)t[r]==null&&(this.ft.delete(r),r.includes("-")?o.removeProperty(r):o[r]=null);for(let r in t){let s=t[r];if(s!=null){this.ft.add(r);let n=typeof s=="string"&&s.endsWith(no);r.includes("-")||n?o.setProperty(r,n?s.slice(0,-11):s,n?xe:""):o[r]=s}}return v}});var tt=class extends _{constructor(t){if(super(t),this.it=u,t.type!==$.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===u||t==null)return this._t=void 0,this.it=t;if(t===v)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let o=[t];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};tt.directiveName="unsafeHTML",tt.resultType=1;var ao=P(tt);var Wt=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function Kt(e,t,o,r){e.addEventListener?e.addEventListener(t,o,r):e.attachEvent&&e.attachEvent(`on${t}`,o)}function et(e,t,o,r){e&&(e.removeEventListener?e.removeEventListener(t,o,r):e.detachEvent&&e.detachEvent(`on${t}`,o))}function $e(e,t){let o=t.slice(0,t.length-1),r=[];for(let s=0;s<o.length;s++)r.push(e[o[s].toLowerCase()]);return r}function we(e){typeof e!="string"&&(e=""),e=e.replace(/\s/g,"");let t=e.split(","),o=t.lastIndexOf("");for(;o>=0;)t[o-1]+=",",t.splice(o,1),o=t.lastIndexOf("");return t}function lo(e,t){let o=e.length>=t.length?e:t,r=e.length>=t.length?t:e,s=!0;for(let n=0;n<o.length;n++)r.indexOf(o[n])===-1&&(s=!1);return s}function _e(e){let t=e.keyCode||e.which||e.charCode;return e.code&&/^Key[A-Z]$/.test(e.code)&&(t=e.code.charCodeAt(3)),t}var st={backspace:8,"\u232B":8,tab:9,clear:12,enter:13,"\u21A9":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,arrowup:38,arrowdown:40,arrowleft:37,arrowright:39,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"\u21EA":20,",":188,".":190,"/":191,"`":192,"-":Wt?173:189,"=":Wt?61:187,";":Wt?59:186,"'":222,"{":219,"}":221,"[":219,"]":221,"\\":220},S={"\u21E7":16,shift:16,"\u2325":18,alt:18,option:18,"\u2303":17,ctrl:17,control:17,"\u2318":91,cmd:91,meta:91,command:91},ot={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},E={16:!1,18:!1,17:!1,91:!1},y={};for(let e=1;e<20;e++)st[`f${e}`]=111+e;var b=[],rt=null,Ae="all",L=new Map,q=e=>st[e.toLowerCase()]||S[e.toLowerCase()]||e.toUpperCase().charCodeAt(0),po=e=>Object.keys(st).find(t=>st[t]===e),co=e=>Object.keys(S).find(t=>S[t]===e),Se=e=>{Ae=e||"all"},nt=()=>Ae||"all",ho=()=>b.slice(0),uo=()=>b.map(e=>po(e)||co(e)||String.fromCharCode(e)),fo=()=>{let e=[];return Object.keys(y).forEach(t=>{y[t].forEach(({key:o,scope:r,mods:s,shortcut:n})=>{e.push({scope:r,shortcut:n,mods:s,keys:o.split("+").map(i=>q(i))})})}),e},Ce=e=>{let t=e.target||e.srcElement,{tagName:o}=t,r=!0,s=o==="INPUT"&&!["checkbox","radio","range","button","file","reset","submit","color"].includes(t.type);return(t.isContentEditable||(s||o==="TEXTAREA"||o==="SELECT")&&!t.readOnly)&&(r=!1),r},mo=e=>(typeof e=="string"&&(e=q(e)),b.indexOf(e)!==-1),bo=(e,t)=>{let o,r;e||(e=nt());for(let s in y)if(Object.prototype.hasOwnProperty.call(y,s))for(o=y[s],r=0;r<o.length;)o[r].scope===e?o.splice(r,1).forEach(({element:n})=>Jt(n)):r++;nt()===e&&Se(t||"all")};function yo(e){let t=_e(e);e.key&&e.key.toLowerCase()==="capslock"&&(t=q(e.key));let o=b.indexOf(t);if(o>=0&&b.splice(o,1),e.key&&e.key.toLowerCase()==="meta"&&b.splice(0,b.length),(t===93||t===224)&&(t=91),t in E){E[t]=!1;for(let r in S)S[r]===t&&(R[r]=!1)}}var Pe=(e,...t)=>{if(typeof e>"u")Object.keys(y).forEach(o=>{Array.isArray(y[o])&&y[o].forEach(r=>vt(r)),delete y[o]}),Jt(null);else if(Array.isArray(e))e.forEach(o=>{o.key&&vt(o)});else if(typeof e=="object")e.key&&vt(e);else if(typeof e=="string"){let[o,r]=t;typeof o=="function"&&(r=o,o=""),vt({key:e,scope:o,method:r,splitKey:"+"})}},vt=({key:e,scope:t,method:o,splitKey:r="+"})=>{we(e).forEach(s=>{let n=s.split(r),i=n.length,a=n[i-1],l=a==="*"?"*":q(a);if(!y[l])return;t||(t=nt());let d=i>1?$e(S,n):[],f=[];y[l]=y[l].filter(p=>{let h=(o?p.method===o:!0)&&p.scope===t&&lo(p.mods,d);return h&&f.push(p.element),!h}),f.forEach(p=>Jt(p))})};function Ee(e,t,o,r){if(t.element!==r)return;let s;if(t.scope===o||t.scope==="all"){s=t.mods.length>0;for(let n in E)Object.prototype.hasOwnProperty.call(E,n)&&(!E[n]&&t.mods.indexOf(+n)>-1||E[n]&&t.mods.indexOf(+n)===-1)&&(s=!1);(t.mods.length===0&&!E[16]&&!E[18]&&!E[17]&&!E[91]||s||t.shortcut==="*")&&(t.keys=[],t.keys=t.keys.concat(b),t.method(e,t)===!1&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0)))}}function ke(e,t){let o=y["*"],r=_e(e);if(e.key&&e.key.toLowerCase()==="capslock"||!(R.filter||Ce).call(this,e))return;if((r===93||r===224)&&(r=91),b.indexOf(r)===-1&&r!==229&&b.push(r),["metaKey","ctrlKey","altKey","shiftKey"].forEach(a=>{let l=ot[a];e[a]&&b.indexOf(l)===-1?b.push(l):!e[a]&&b.indexOf(l)>-1?b.splice(b.indexOf(l),1):a==="metaKey"&&e[a]&&(b=b.filter(d=>d in ot||d===r))}),r in E){E[r]=!0;for(let a in S)if(Object.prototype.hasOwnProperty.call(S,a)){let l=ot[S[a]];R[a]=e[l]}if(!o)return}for(let a in E)Object.prototype.hasOwnProperty.call(E,a)&&(E[a]=e[ot[a]]);e.getModifierState&&!(e.altKey&&!e.ctrlKey)&&e.getModifierState("AltGraph")&&(b.indexOf(17)===-1&&b.push(17),b.indexOf(18)===-1&&b.push(18),E[17]=!0,E[18]=!0);let s=nt();if(o)for(let a=0;a<o.length;a++)o[a].scope===s&&(e.type==="keydown"&&o[a].keydown||e.type==="keyup"&&o[a].keyup)&&Ee(e,o[a],s,t);if(!(r in y))return;let n=y[r],i=n.length;for(let a=0;a<i;a++)if((e.type==="keydown"&&n[a].keydown||e.type==="keyup"&&n[a].keyup)&&n[a].key){let l=n[a],{splitKey:d}=l,f=l.key.split(d),p=[];for(let h=0;h<f.length;h++)p.push(q(f[h]));p.sort().join("")===b.sort().join("")&&Ee(e,l,s,t)}}var R=function(e,t,o){b=[];let r=we(e),s=[],n="all",i=document,a=0,l=!1,d=!0,f="+",p=!1,h=!1;if(o===void 0&&typeof t=="function"&&(o=t),Object.prototype.toString.call(t)==="[object Object]"){let c=t;c.scope&&(n=c.scope),c.element&&(i=c.element),c.keyup&&(l=c.keyup),c.keydown!==void 0&&(d=c.keydown),c.capture!==void 0&&(p=c.capture),typeof c.splitKey=="string"&&(f=c.splitKey),c.single===!0&&(h=!0)}for(typeof t=="string"&&(n=t),h&&Pe(e,n);a<r.length;a++){let c=r[a].split(f);s=[],c.length>1&&(s=$e(S,c));let m=c[c.length-1];m=m==="*"?"*":q(m),m in y||(y[m]=[]),y[m].push({keyup:l,keydown:d,scope:n,mods:s,shortcut:r[a],method:o,key:r[a],splitKey:f,element:i})}if(typeof i<"u"&&typeof window<"u"){if(!L.has(i)){let c=(w=window.event)=>ke(w,i),m=(w=window.event)=>{ke(w,i),yo(w)};L.set(i,{keydownListener:c,keyupListenr:m,capture:p}),Kt(i,"keydown",c,p),Kt(i,"keyup",m,p)}if(!rt){let c=()=>{b=[]};rt={listener:c,capture:p},Kt(window,"focus",c,p)}}};function go(e,t="all"){Object.keys(y).forEach(o=>{y[o].filter(r=>r.scope===t&&r.shortcut===e).forEach(r=>{r&&r.method&&r.method({},r)})})}function Jt(e){let t=Object.values(y).flat();if(t.findIndex(({element:o})=>o===e)<0&&e){let{keydownListener:o,keyupListenr:r,capture:s}=L.get(e)||{};o&&r&&(et(e,"keyup",r,s),et(e,"keydown",o,s),L.delete(e))}if((t.length<=0||L.size<=0)&&(Array.from(L.keys()).forEach(o=>{let{keydownListener:r,keyupListenr:s,capture:n}=L.get(o)||{};r&&s&&(et(o,"keyup",s,n),et(o,"keydown",r,n),L.delete(o))}),L.clear(),Object.keys(y).forEach(o=>delete y[o]),rt)){let{listener:o,capture:r}=rt;et(window,"focus",o,r),rt=null}}var Vt={getPressedKeyString:uo,setScope:Se,getScope:nt,deleteScope:bo,getPressedKeyCodes:ho,getAllKeyCodes:fo,isPressed:mo,filter:Ce,trigger:go,unbind:Pe,keyMap:st,modifier:S,modifierMap:ot};for(let e in Vt){let t=e;Object.prototype.hasOwnProperty.call(Vt,t)&&(R[t]=Vt[t])}if(typeof window<"u"){let e=window.hotkeys;R.noConflict=t=>(t&&window.hotkeys===R&&(window.hotkeys=e),R),window.hotkeys=R}var Te=e=>{class t extends e{constructor(){super(...arguments);this.#t=!1;this.initialReflectedProperties=new Map}#t;attributeChangedCallback(s,n,i){if(!this.#t){let a=this;this.constructor.elementProperties.forEach((l,d)=>{l.reflect&&a[d]!=null&&this.initialReflectedProperties.set(d,a[d])}),this.initialReflectedProperties.set("slot",this.slot),this.#t=!0}super.attributeChangedCallback?.(s,n,i)}willUpdate(s){super.willUpdate?.(s);let n=this;this.initialReflectedProperties.forEach((i,a)=>{s.has(a)&&n[a]==null&&(n[a]=i)})}}return g([A()],t.prototype,"initialReflectedProperties",2),t};function xt(e){if(!e||typeof e!="object")return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype||Object.getPrototypeOf(t)===null?Object.prototype.toString.call(e)==="[object Object]":!1}function Ft(e){return e!=null}function Et(e){return typeof e=="string"}var Oe=e=>{class t extends e{constructor(){super(...arguments);this.slotsWithContent=new Set}connectedCallback(){super.connectedCallback(),this.updateSlotsWithContent(),this.shadowRoot?.addEventListener("slotchange",()=>{this.updateSlotsWithContent()})}updateSlotsWithContent(){let s=new Set([...this.querySelectorAll(":scope > [slot]")].map(n=>n.slot));JSON.stringify([...s].sort())!==JSON.stringify([...this.slotsWithContent].sort())&&(this.slotsWithContent=s)}whenSlotted(s,n,i,a){let l={force:!1,...a};return this.slotsWithContent.has(s)||l.force?n:Q`<slot
            name="${s}"
            hidden
            >${i||u}</slot
          >`}}return g([A()],t.prototype,"slotsWithContent",2),t};var kt=class extends Event{constructor(t,o){super(t,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=o}};var $t=class extends kt{constructor(t,o={}){super("lb-command",{bubbles:!0,cancelable:!1,composed:!0}),this.command=t,this.detail=o}};var wt=class extends Event{constructor(t={value:void 0,oldValue:void 0}){super("lb-data",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var _t=class extends Event{constructor(t={}){super("lb-display-mode-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var At=class extends Event{constructor(t){super("lb-drag-end",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var St=class extends Event{constructor(t){super("lb-drag-start",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ct=class extends Event{constructor(t={}){super("lb-error",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Pt=class extends Event{constructor(t={}){super("lb-param-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Tt=class extends Event{constructor(t){super("lb-popover-close",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ot=class extends Event{constructor(t){super("lb-popover-open",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Lt=class extends Event{constructor(t){super("lb-resize",{bubbles:!1,cancelable:!1,composed:!0}),this.detail=t}};var Le={"lb-command":$t,"lb-data":wt,"lb-drag-start":St,"lb-drag-end":At,"lb-error":Ct,"lb-resize":Lt,"lb-popover-open":Ot,"lb-popover-close":Tt,"lb-param-change":Pt,"lb-display-mode-change":_t};function Re(e=null){return[e,vo()].filter(t=>t).join("-")}function vo(){return Math.random().toString(36).replace(/^0\./,"").replace(/^[0-9]+/,"")}function Me(e){return Le[e]}var De=`:host {
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
`;var B=class extends Te(C){constructor(){super();this.cleanupJobs=[]}static{this.shadowRootOptions={...C.shadowRootOptions,serializable:!0}}static{this.morphable=!0}static get styles(){let o=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[De,...o].map(r=>typeof r=="string"?K(r):r)}afterMorph(){}get morphable(){return!!this.getStaticProperty("morphable")}disconnectedCallback(){this.cleanupJobs.forEach(o=>o()),super.disconnectedCallback()}addCleanupJob(o){this.cleanupJobs.push(o)}renderToTarget(o,r){X(r,o)}on(o,r){this.addEventListener(o,r),this.addCleanupJob(()=>this.removeEventListener(o,r))}delegate(o,r){document.addEventListener(o,r),this.addCleanupJob(()=>document.removeEventListener(o,r))}dispatch(o,...r){let s=Me(o),n=this;if(!s){console.warn(`Unknown event type '${o}'`);return}let i=null;if(xt(r[0])?(i=r[0],r=[]):r.length>0&&xt(r[r.length-1])&&(i=r.pop()),i?.target){let l=Et(i.target)?document.querySelector(`#${i.target}`):n;l&&(n=l)}let a=[...r,i].filter(Ft);n.dispatchEvent(new s(...a))}getStaticProperty(o){return this.constructor[o]}warn(o){Et(o)&&(o=new Error(o)),this.dispatch("lb-error",{error:o}),console.error(o)}};g([A()],B.prototype,"cleanupJobs",2);var He=Symbol.for(""),Eo=e=>{if(e?.r===He)return e?._$litStatic$};var Gt=(e,...t)=>({_$litStatic$:t.reduce(((o,r,s)=>o+(n=>{if(n._$litStatic$!==void 0)return n._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${n}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+e[s+1]),e[0]),r:He}),je=new Map,Yt=e=>(t,...o)=>{let r=o.length,s,n,i=[],a=[],l,d=0,f=!1;for(;d<r;){for(l=t[d];d<r&&(n=o[d],(s=Eo(n))!==void 0);)l+=s+t[++d],f=!0;d!==r&&a.push(n),i.push(l),d++}if(d===r&&i.push(t[r]),f){let p=i.join("$$lit$$");(t=je.get(p))===void 0&&(i.raw=i,je.set(p,t=i)),o=a}return e(t,...o)},Zt=Yt(Q),Hn=Yt(zt),Un=Yt(he);var Ue=`:host {
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: auto;
  cursor: pointer;
  transition: all 150ms ease-in;
}
#button {
  display: inline-flex;
  cursor: pointer;
  transition: all 150ms ease-in;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 0.4em;
  height: var(--lookbook-form-control-height-sm);
  min-width: var(--lookbook-form-control-height-sm);
  font-size: var(--lookbook-font-size-sm);
  border-radius: var(--lookbook-size-3xs);
  border: 1px solid transparent;
  color: var(--lookbook-neutral-text-on-quieter);
  ::slotted(lb-icon) {
    width: var(--lookbook-size-md);
    height: var(--lookbook-size-md);
  }
}
:host([disabled]) {
  pointer-events: none;
  opacity: 0.5;
  cursor: default;
}
:host([appearance="button"][role="tab"]) {
  #button {
    padding-inline: var(--lookbook-size-sm);
  }
}
:host([appearance="button"]][role="tab"]:hover) {
  background-color: var(--lookbook-neutral-fill-quietest);
}
:host([appearance="button"]][role="tab"]:active) {
  color: var(--lookbook-neutral-text-on-quiet);
  background-color: var(--lookbook-accent-fill-quiet);
}
:host([appearance="button"][role="tab"][active]) {
  #button {
    background-color: var(--lookbook-accent-fill-mid);
    color: var(--lookbook-neutral-text-on-mid);
  }
}
:host([appearance="button"]) {
  color: var(--lookbook-text-quieter);
  border-radius: var(--lookbook-border-radius-md);
  ::slotted(lb-icon) {
    width: 18px !important;
    height: 18px !important;
  }
}
:host([appearance="button"]:hover) {
  color: var(--lookbook-text-base);
  background-color: var(--lookbook-neutral-fill-quietest);
  transform: translateY(-1px);
}
:host([appearance="button"]:active) {
  background-color: var(--lookbook-accent-fill-quieter);
}
:host([appearance="button"][active]) {
  #button {
    color: var(--lookbook-accent-text-on-quiet);
    background-color: var(--lookbook-accent-fill-quieter);
  }
}
:host([appearance="button"][active]:hover) {
  transform: translateY(0);
}
:host([appearance="text"]) {
  color: var(--lookbook-accent-text-on-quieter);
  border-radius: var(--lookbook-border-radius-md);
  #button {
    height: auto;
    font-size: var(--lookbook-font-size-xs);
    padding-inline: var(--lookbook-size-xs);
  }
}
:host([role="button"][appearance="menu-item"]) {
  padding: 0;
  #button {
    display: flex;
    width: 100%;
    white-space: nowrap;
    font-size: var(--lookbook-font-size-sm);
    padding-block: 10px;
    padding-inline: var(--lookbook-size-md);
    height: auto;
    justify-content: start;
  }
}
`;var x=class extends Oe(B){constructor(){super(...arguments);this.type="button";this.appearance="button";this.role="button";this.disabled=!1;this.active=!1;this.popoverPlacement="bottom-end"}get commandForTarget(){return this.commandFor?this.shadowRoot.getElementById(this.commandFor):void 0}get isLink(){return typeof this.href=="string"}firstUpdated(){this.id=this.id||Re()}handlePopoverShow(o){this.active=!0,this.dispatch("lb-popover-open",{popover:o.target})}handlePopoverHide(o){this.dispatch("lb-popover-close",{popover:o.target}),this.active=!1}renderPopover(){return Zt`
      <wa-popover
        for="button"
        placement="${this.popoverPlacement}"
        distance="0"
        skidding="10"
        @wa-show="${this.handlePopoverShow}"
        @wa-hide="${this.handlePopoverHide}"
      >
        <div id="popover-content">
          <slot name="popover"></slot>
        </div>
      </wa-popover>
    `}handleTooltipChange(o){let r=o.target?.assignedElements()?.[0];r&&(r.for=this.id)}render(){let o=this.isLink?Gt`a`:Gt`button`;return Zt`
      <${o}
        id="button"
        part="button"
        type="${this.isLink?u:this.type}"
        href="${this.isLink&&!this.disabled?this.href:u}"
        target="${this.isLink?this.target:u}"
        aria-label="${this.label||this.tooltip||u}"
        ?disabled="${this.isLink?u:this.disabled}"
      >
        <slot id="start" name="start"></slot>
        <slot id="label" part="label"></slot>
        <slot id="end" name="end"></slot>
      </${o}>



      ${this.whenSlotted("popover",this.renderPopover())}
      <slot name="tooltip" @slotchange="${this.handleTooltipChange}"></slot>
    `}};x.shadowRootOptions={...B.shadowRootOptions,delegatesFocus:!0},x.css=Ue,g([k()],x.prototype,"href",2),g([k()],x.prototype,"label",2),g([k()],x.prototype,"type",2),g([k()],x.prototype,"target",2),g([k({reflect:!0})],x.prototype,"appearance",2),g([k({reflect:!0})],x.prototype,"role",2),g([k({type:Boolean,reflect:!0})],x.prototype,"disabled",2),g([k({type:Boolean,reflect:!0})],x.prototype,"active",2),g([k({attribute:"popover-placement"})],x.prototype,"popoverPlacement",2),g([k({attribute:"commandfor",type:String,reflect:!0})],x.prototype,"commandFor",2),g([k({attribute:"command",type:String})],x.prototype,"command",2),g([A()],x.prototype,"commandForTarget",1),g([A()],x.prototype,"isLink",1),x=g([Bt("lb-button")],x);export{x as LookbookButton};
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
lit-html/static.js:
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
