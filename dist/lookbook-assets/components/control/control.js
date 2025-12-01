var Mt=Object.defineProperty;var Rt=Object.getOwnPropertyDescriptor;var x=(t,e,o,r)=>{for(var s=r>1?void 0:r?Rt(e,o):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(s=(r?n(e,o,s):n(s))||s);return r&&s&&Mt(e,o,s),s};var ne=globalThis,ae=ne.ShadowRoot&&(ne.ShadyCSS===void 0||ne.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ye=Symbol(),Ge=new WeakMap,V=class{constructor(e,o,r){if(this._$cssResult$=!0,r!==Ye)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(ae&&e===void 0){let r=o!==void 0&&o.length===1;r&&(e=Ge.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&Ge.set(o,e))}return e}toString(){return this.cssText}},q=t=>new V(typeof t=="string"?t:t+"",void 0,Ye);var Ze=(t,e)=>{if(ae)t.adoptedStyleSheets=e.map((o=>o instanceof CSSStyleSheet?o:o.styleSheet));else for(let o of e){let r=document.createElement("style"),s=ne.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=o.cssText,t.appendChild(r)}},Re=ae?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let r of e.cssRules)o+=r.cssText;return q(o)})(t):t;var{is:Dt,defineProperty:jt,getOwnPropertyDescriptor:Ht,getOwnPropertyNames:Ut,getOwnPropertySymbols:Nt,getPrototypeOf:zt}=Object,le=globalThis,Xe=le.trustedTypes,Bt=Xe?Xe.emptyScript:"",It=le.reactiveElementPolyfillSupport,K=(t,e)=>t,J={toAttribute(t,e){switch(e){case Boolean:t=t?Bt:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},ce=(t,e)=>!Dt(t,e),Qe={attribute:!0,type:String,converter:J,reflect:!1,useDefault:!1,hasChanged:ce};Symbol.metadata??=Symbol("metadata"),le.litPropertyMetadata??=new WeakMap;var P=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=Qe){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(e,r,o);s!==void 0&&jt(this.prototype,e,s)}}static getPropertyDescriptor(e,o,r){let{get:s,set:i}=Ht(this.prototype,e)??{get(){return this[o]},set(n){this[o]=n}};return{get:s,set(n){let a=s?.call(this);i?.call(this,n),this.requestUpdate(e,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Qe}static _$Ei(){if(this.hasOwnProperty(K("elementProperties")))return;let e=zt(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(K("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(K("properties"))){let o=this.properties,r=[...Ut(o),...Nt(o)];for(let s of r)this.createProperty(s,o[s])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[r,s]of o)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[o,r]of this.elementProperties){let s=this._$Eu(o,r);s!==void 0&&this._$Eh.set(s,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let s of r)o.unshift(Re(s))}else e!==void 0&&o.push(Re(e));return o}static _$Eu(e,o){let r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let r of o.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ze(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,o,r){this._$AK(e,r)}_$ET(e,o){let r=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,r);if(s!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:J).toAttribute(o,r.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,o){let r=this.constructor,s=r._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let i=r.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:J;this._$Em=s;let a=n.fromAttribute(o,i.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(e,o,r){if(e!==void 0){let s=this.constructor,i=this[e];if(r??=s.getPropertyOptions(e),!((r.hasChanged??ce)(i,o)||r.useDefault&&r.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,r))))return;this.C(e,o,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:r,reflect:s,wrapped:i},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??o??this[e]),i!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(o=void 0),this._$AL.set(e,o)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,i]of r){let{wrapped:n}=i,a=this[s];n!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,i,a)}}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(o)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach((o=>o.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((o=>this._$ET(o,this[o]))),this._$EM()}updated(e){}firstUpdated(e){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[K("elementProperties")]=new Map,P[K("finalized")]=new Map,It?.({ReactiveElement:P}),(le.reactiveElementVersions??=[]).push("2.1.1");var je=globalThis,pe=je.trustedTypes,et=pe?pe.createPolicy("lit-html",{createHTML:t=>t}):void 0,He="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,Ue="?"+O,Wt=`<${Ue}>`,U=document,G=()=>U.createComment(""),Y=t=>t===null||typeof t!="object"&&typeof t!="function",Ne=Array.isArray,nt=t=>Ne(t)||typeof t?.[Symbol.iterator]=="function",De=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,tt=/-->/g,ot=/>/g,j=RegExp(`>|${De}(?:([^\\s"'>=/]+)(${De}*=${De}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),rt=/'/g,st=/"/g,at=/^(?:script|style|textarea|title)$/i,ze=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),S=ze(1),Vt=ze(2),$o=ze(3),g=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),it=new WeakMap,H=U.createTreeWalker(U,129);function lt(t,e){if(!Ne(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return et!==void 0?et.createHTML(e):e}var ct=(t,e)=>{let o=t.length-1,r=[],s,i=e===2?"<svg>":e===3?"<math>":"",n=F;for(let a=0;a<o;a++){let l=t[a],d,u,c=-1,h=0;for(;h<l.length&&(n.lastIndex=h,u=n.exec(l),u!==null);)h=n.lastIndex,n===F?u[1]==="!--"?n=tt:u[1]!==void 0?n=ot:u[2]!==void 0?(at.test(u[2])&&(s=RegExp("</"+u[2],"g")),n=j):u[3]!==void 0&&(n=j):n===j?u[0]===">"?(n=s??F,c=-1):u[1]===void 0?c=-2:(c=n.lastIndex-u[2].length,d=u[1],n=u[3]===void 0?j:u[3]==='"'?st:rt):n===st||n===rt?n=j:n===tt||n===ot?n=F:(n=j,s=void 0);let p=n===j&&t[a+1].startsWith("/>")?" ":"";i+=n===F?l+Wt:c>=0?(r.push(d),l.slice(0,c)+He+l.slice(c)+O+p):l+O+(c===-2?a:p)}return[lt(t,i+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},Z=class t{constructor({strings:e,_$litType$:o},r){let s;this.parts=[];let i=0,n=0,a=e.length-1,l=this.parts,[d,u]=ct(e,o);if(this.el=t.createElement(d,r),H.currentNode=this.el.content,o===2||o===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=H.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(He)){let h=u[n++],p=s.getAttribute(c).split(O),f=/([.?@])?(.*)/.exec(h);l.push({type:1,index:i,name:f[2],strings:p,ctor:f[1]==="."?he:f[1]==="?"?ue:f[1]==="@"?fe:z}),s.removeAttribute(c)}else c.startsWith(O)&&(l.push({type:6,index:i}),s.removeAttribute(c));if(at.test(s.tagName)){let c=s.textContent.split(O),h=c.length-1;if(h>0){s.textContent=pe?pe.emptyScript:"";for(let p=0;p<h;p++)s.append(c[p],G()),H.nextNode(),l.push({type:2,index:++i});s.append(c[h],G())}}}else if(s.nodeType===8)if(s.data===Ue)l.push({type:2,index:i});else{let c=-1;for(;(c=s.data.indexOf(O,c+1))!==-1;)l.push({type:7,index:i}),c+=O.length-1}i++}}static createElement(e,o){let r=U.createElement("template");return r.innerHTML=e,r}};function N(t,e,o=t,r){if(e===g)return e;let s=r!==void 0?o._$Co?.[r]:o._$Cl,i=Y(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(t),s._$AT(t,o,r)),r!==void 0?(o._$Co??=[])[r]=s:o._$Cl=s),s!==void 0&&(e=N(t,s._$AS(t,e.values),s,r)),e}var de=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:r}=this._$AD,s=(e?.creationScope??U).importNode(o,!0);H.currentNode=s;let i=H.nextNode(),n=0,a=0,l=r[0];for(;l!==void 0;){if(n===l.index){let d;l.type===2?d=new B(i,i.nextSibling,this,e):l.type===1?d=new l.ctor(i,l.name,l.strings,this,e):l.type===6&&(d=new me(i,this,e)),this._$AV.push(d),l=r[++a]}n!==l?.index&&(i=H.nextNode(),n++)}return H.currentNode=U,s}p(e){let o=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,o),o+=r.strings.length-2):r._$AI(e[o])),o++}},B=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,r,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=N(this,e,o),Y(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==g&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):nt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==m&&Y(this._$AH)?this._$AA.nextSibling.data=e:this.T(U.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:r}=e,s=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=Z.createElement(lt(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(o);else{let i=new de(s,this),n=i.u(this.options);i.p(o),this.T(n),this._$AH=i}}_$AC(e){let o=it.get(e.strings);return o===void 0&&it.set(e.strings,o=new Z(e)),o}k(e){Ne(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,r,s=0;for(let i of e)s===o.length?o.push(r=new t(this.O(G()),this.O(G()),this,this.options)):r=o[s],r._$AI(i),s++;s<o.length&&(this._$AR(r&&r._$AB.nextSibling,s),o.length=s)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){let r=e.nextSibling;e.remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,r,s,i){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=o,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=m}_$AI(e,o=this,r,s){let i=this.strings,n=!1;if(i===void 0)e=N(this,e,o,0),n=!Y(e)||e!==this._$AH&&e!==g,n&&(this._$AH=e);else{let a=e,l,d;for(e=i[0],l=0;l<i.length-1;l++)d=N(this,a[r+l],o,l),d===g&&(d=this._$AH[l]),n||=!Y(d)||d!==this._$AH[l],d===m?e=m:e!==m&&(e+=(d??"")+i[l+1]),this._$AH[l]=d}n&&!s&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},he=class extends z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}},ue=class extends z{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==m)}},fe=class extends z{constructor(e,o,r,s,i){super(e,o,r,s,i),this.type=5}_$AI(e,o=this){if((e=N(this,e,o,0)??m)===g)return;let r=this._$AH,s=e===m&&r!==m||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==m&&(r===m||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},me=class{constructor(e,o,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){N(this,e)}},pt={M:He,P:O,A:Ue,C:1,L:ct,R:de,D:nt,V:N,I:B,H:z,N:ue,U:fe,B:he,F:me},qt=je.litHtmlPolyfillSupport;qt?.(Z,B),(je.litHtmlVersions??=[]).push("3.3.1");var X=(t,e,o)=>{let r=o?.renderBefore??e,s=r._$litPart$;if(s===void 0){let i=o?.renderBefore??null;r._$litPart$=s=new B(e.insertBefore(G(),i),i,void 0,o??{})}return s._$AI(t),s};var Be=globalThis,C=class extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=X(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return g}};C._$litElement$=!0,C.finalized=!0,Be.litElementHydrateSupport?.({LitElement:C});var Kt=Be.litElementPolyfillSupport;Kt?.({LitElement:C});(Be.litElementVersions??=[]).push("4.2.1");var Ie=t=>(e,o)=>{o!==void 0?o.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};var Jt={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:ce},Ft=(t=Jt,e,o)=>{let{kind:r,metadata:s}=o,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),r==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(o.name,t),r==="accessor"){let{name:n}=o;return{set(a){let l=e.get.call(this);e.set.call(this,a),this.requestUpdate(n,l,t)},init(a){return a!==void 0&&this.C(n,void 0,t,a),a}}}if(r==="setter"){let{name:n}=o;return function(a){let l=this[n];e.call(this,a),this.requestUpdate(n,l,t)}}throw Error("Unsupported decorator location: "+r)};function $(t){return(e,o)=>typeof o=="object"?Ft(t,e,o):((r,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,r),n?Object.getOwnPropertyDescriptor(s,i):void 0})(t,e,o)}function L(t){return $({...t,state:!0,attribute:!1})}var E={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},T=t=>(...e)=>({_$litDirective$:t,values:e}),A=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,r){this._$Ct=e,this._$AM=o,this._$Ci=r}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};var Gt=T(class extends A{constructor(t){if(super(t),t.type!==E.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((r=>r!==""))));for(let r in e)e[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(e)}let o=t.element.classList;for(let r of this.st)r in e||(o.remove(r),this.st.delete(r));for(let r in e){let s=!!e[r];s===this.st.has(r)||this.nt?.has(r)||(s?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return g}});var{I:Yt}=pt;var ht=t=>t.strings===void 0,dt=()=>document.createComment(""),I=(t,e,o)=>{let r=t._$AA.parentNode,s=e===void 0?t._$AB:e._$AA;if(o===void 0){let i=r.insertBefore(dt(),s),n=r.insertBefore(dt(),s);o=new Yt(i,n,t,t.options)}else{let i=o._$AB.nextSibling,n=o._$AM,a=n!==t;if(a){let l;o._$AQ?.(t),o._$AM=t,o._$AP!==void 0&&(l=t._$AU)!==n._$AU&&o._$AP(l)}if(i!==s||a){let l=o._$AA;for(;l!==i;){let d=l.nextSibling;r.insertBefore(l,s),l=d}}}return o},D=(t,e,o=t)=>(t._$AI(e,o),t),Zt={},ye=(t,e=Zt)=>t._$AH=e,ut=t=>t._$AH,ge=t=>{t._$AR(),t._$AA.remove()};var Xt=T(class extends A{constructor(t){if(super(t),t.type!==E.PROPERTY&&t.type!==E.ATTRIBUTE&&t.type!==E.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ht(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===g||e===m)return e;let o=t.element,r=t.name;if(t.type===E.PROPERTY){if(e===o[r])return g}else if(t.type===E.BOOLEAN_ATTRIBUTE){if(!!e===o.hasAttribute(r))return g}else if(t.type===E.ATTRIBUTE&&o.getAttribute(r)===e+"")return g;return ye(t),e}});var ft=(t,e,o)=>{let r=new Map;for(let s=e;s<=o;s++)r.set(t[s],s);return r},Qt=T(class extends A{constructor(t){if(super(t),t.type!==E.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,o){let r;o===void 0?o=e:e!==void 0&&(r=e);let s=[],i=[],n=0;for(let a of t)s[n]=r?r(a,n):n,i[n]=o(a,n),n++;return{values:i,keys:s}}render(t,e,o){return this.dt(t,e,o).values}update(t,[e,o,r]){let s=ut(t),{values:i,keys:n}=this.dt(e,o,r);if(!Array.isArray(s))return this.ut=n,i;let a=this.ut??=[],l=[],d,u,c=0,h=s.length-1,p=0,f=i.length-1;for(;c<=h&&p<=f;)if(s[c]===null)c++;else if(s[h]===null)h--;else if(a[c]===n[p])l[p]=D(s[c],i[p]),c++,p++;else if(a[h]===n[f])l[f]=D(s[h],i[f]),h--,f--;else if(a[c]===n[f])l[f]=D(s[c],i[f]),I(t,l[f+1],s[c]),c++,f--;else if(a[h]===n[p])l[p]=D(s[h],i[p]),I(t,s[c],s[h]),h--,p++;else if(d===void 0&&(d=ft(n,p,f),u=ft(a,c,h)),d.has(a[c]))if(d.has(a[h])){let w=u.get(n[p]),Me=w!==void 0?s[w]:null;if(Me===null){let Fe=I(t,s[c]);D(Fe,i[p]),l[p]=Fe}else l[p]=D(Me,i[p]),I(t,s[c],Me),s[w]=null;p++}else ge(s[h]),h--;else ge(s[c]),c++;for(;p<=f;){let w=I(t,l[f+1]);D(w,i[p]),l[p++]=w}for(;c<=h;){let w=s[c++];w!==null&&ge(w)}return this.ut=n,ye(t,l),g}});var mt="important",eo=" !"+mt,to=T(class extends A{constructor(t){if(super(t),t.type!==E.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,o)=>{let r=t[o];return r==null?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`}),"")}update(t,[e]){let{style:o}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let r of this.ft)e[r]==null&&(this.ft.delete(r),r.includes("-")?o.removeProperty(r):o[r]=null);for(let r in e){let s=e[r];if(s!=null){this.ft.add(r);let i=typeof s=="string"&&s.endsWith(eo);r.includes("-")||i?o.setProperty(r,i?s.slice(0,-11):s,i?mt:""):o[r]=s}}return g}});var Q=class extends A{constructor(e){if(super(e),this.it=m,e.type!==E.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===m||e==null)return this._t=void 0,this.it=e;if(e===g)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let o=[e];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};Q.directiveName="unsafeHTML",Q.resultType=1;var oo=T(Q);var We=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function Ve(t,e,o,r){t.addEventListener?t.addEventListener(e,o,r):t.attachEvent&&t.attachEvent(`on${e}`,o)}function ee(t,e,o,r){t&&(t.removeEventListener?t.removeEventListener(e,o,r):t.detachEvent&&t.detachEvent(`on${e}`,o))}function gt(t,e){let o=e.slice(0,e.length-1),r=[];for(let s=0;s<o.length;s++)r.push(t[o[s].toLowerCase()]);return r}function xt(t){typeof t!="string"&&(t=""),t=t.replace(/\s/g,"");let e=t.split(","),o=e.lastIndexOf("");for(;o>=0;)e[o-1]+=",",e.splice(o,1),o=e.lastIndexOf("");return e}function ro(t,e){let o=t.length>=e.length?t:e,r=t.length>=e.length?e:t,s=!0;for(let i=0;i<o.length;i++)r.indexOf(o[i])===-1&&(s=!1);return s}function vt(t){let e=t.keyCode||t.which||t.charCode;return t.code&&/^Key[A-Z]$/.test(t.code)&&(e=t.code.charCodeAt(3)),e}var re={backspace:8,"\u232B":8,tab:9,clear:12,enter:13,"\u21A9":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,arrowup:38,arrowdown:40,arrowleft:37,arrowright:39,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"\u21EA":20,",":188,".":190,"/":191,"`":192,"-":We?173:189,"=":We?61:187,";":We?59:186,"'":222,"{":219,"}":221,"[":219,"]":221,"\\":220},_={"\u21E7":16,shift:16,"\u2325":18,alt:18,option:18,"\u2303":17,ctrl:17,control:17,"\u2318":91,cmd:91,meta:91,command:91},te={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},v={16:!1,18:!1,17:!1,91:!1},y={};for(let t=1;t<20;t++)re[`f${t}`]=111+t;var b=[],oe=null,kt="all",M=new Map,W=t=>re[t.toLowerCase()]||_[t.toLowerCase()]||t.toUpperCase().charCodeAt(0),so=t=>Object.keys(re).find(e=>re[e]===t),io=t=>Object.keys(_).find(e=>_[e]===t),Et=t=>{kt=t||"all"},se=()=>kt||"all",no=()=>b.slice(0),ao=()=>b.map(t=>so(t)||io(t)||String.fromCharCode(t)),lo=()=>{let t=[];return Object.keys(y).forEach(e=>{y[e].forEach(({key:o,scope:r,mods:s,shortcut:i})=>{t.push({scope:r,shortcut:i,mods:s,keys:o.split("+").map(n=>W(n))})})}),t},wt=t=>{let e=t.target||t.srcElement,{tagName:o}=e,r=!0,s=o==="INPUT"&&!["checkbox","radio","range","button","file","reset","submit","color"].includes(e.type);return(e.isContentEditable||(s||o==="TEXTAREA"||o==="SELECT")&&!e.readOnly)&&(r=!1),r},co=t=>(typeof t=="string"&&(t=W(t)),b.indexOf(t)!==-1),po=(t,e)=>{let o,r;t||(t=se());for(let s in y)if(Object.prototype.hasOwnProperty.call(y,s))for(o=y[s],r=0;r<o.length;)o[r].scope===t?o.splice(r,1).forEach(({element:i})=>Ke(i)):r++;se()===t&&Et(e||"all")};function ho(t){let e=vt(t);t.key&&t.key.toLowerCase()==="capslock"&&(e=W(t.key));let o=b.indexOf(e);if(o>=0&&b.splice(o,1),t.key&&t.key.toLowerCase()==="meta"&&b.splice(0,b.length),(e===93||e===224)&&(e=91),e in v){v[e]=!1;for(let r in _)_[r]===e&&(R[r]=!1)}}var $t=(t,...e)=>{if(typeof t>"u")Object.keys(y).forEach(o=>{Array.isArray(y[o])&&y[o].forEach(r=>xe(r)),delete y[o]}),Ke(null);else if(Array.isArray(t))t.forEach(o=>{o.key&&xe(o)});else if(typeof t=="object")t.key&&xe(t);else if(typeof t=="string"){let[o,r]=e;typeof o=="function"&&(r=o,o=""),xe({key:t,scope:o,method:r,splitKey:"+"})}},xe=({key:t,scope:e,method:o,splitKey:r="+"})=>{xt(t).forEach(s=>{let i=s.split(r),n=i.length,a=i[n-1],l=a==="*"?"*":W(a);if(!y[l])return;e||(e=se());let d=n>1?gt(_,i):[],u=[];y[l]=y[l].filter(c=>{let h=(o?c.method===o:!0)&&c.scope===e&&ro(c.mods,d);return h&&u.push(c.element),!h}),u.forEach(c=>Ke(c))})};function bt(t,e,o,r){if(e.element!==r)return;let s;if(e.scope===o||e.scope==="all"){s=e.mods.length>0;for(let i in v)Object.prototype.hasOwnProperty.call(v,i)&&(!v[i]&&e.mods.indexOf(+i)>-1||v[i]&&e.mods.indexOf(+i)===-1)&&(s=!1);(e.mods.length===0&&!v[16]&&!v[18]&&!v[17]&&!v[91]||s||e.shortcut==="*")&&(e.keys=[],e.keys=e.keys.concat(b),e.method(t,e)===!1&&(t.preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation&&t.stopPropagation(),t.cancelBubble&&(t.cancelBubble=!0)))}}function yt(t,e){let o=y["*"],r=vt(t);if(t.key&&t.key.toLowerCase()==="capslock"||!(R.filter||wt).call(this,t))return;if((r===93||r===224)&&(r=91),b.indexOf(r)===-1&&r!==229&&b.push(r),["metaKey","ctrlKey","altKey","shiftKey"].forEach(a=>{let l=te[a];t[a]&&b.indexOf(l)===-1?b.push(l):!t[a]&&b.indexOf(l)>-1?b.splice(b.indexOf(l),1):a==="metaKey"&&t[a]&&(b=b.filter(d=>d in te||d===r))}),r in v){v[r]=!0;for(let a in _)if(Object.prototype.hasOwnProperty.call(_,a)){let l=te[_[a]];R[a]=t[l]}if(!o)return}for(let a in v)Object.prototype.hasOwnProperty.call(v,a)&&(v[a]=t[te[a]]);t.getModifierState&&!(t.altKey&&!t.ctrlKey)&&t.getModifierState("AltGraph")&&(b.indexOf(17)===-1&&b.push(17),b.indexOf(18)===-1&&b.push(18),v[17]=!0,v[18]=!0);let s=se();if(o)for(let a=0;a<o.length;a++)o[a].scope===s&&(t.type==="keydown"&&o[a].keydown||t.type==="keyup"&&o[a].keyup)&&bt(t,o[a],s,e);if(!(r in y))return;let i=y[r],n=i.length;for(let a=0;a<n;a++)if((t.type==="keydown"&&i[a].keydown||t.type==="keyup"&&i[a].keyup)&&i[a].key){let l=i[a],{splitKey:d}=l,u=l.key.split(d),c=[];for(let h=0;h<u.length;h++)c.push(W(u[h]));c.sort().join("")===b.sort().join("")&&bt(t,l,s,e)}}var R=function(t,e,o){b=[];let r=xt(t),s=[],i="all",n=document,a=0,l=!1,d=!0,u="+",c=!1,h=!1;if(o===void 0&&typeof e=="function"&&(o=e),Object.prototype.toString.call(e)==="[object Object]"){let p=e;p.scope&&(i=p.scope),p.element&&(n=p.element),p.keyup&&(l=p.keyup),p.keydown!==void 0&&(d=p.keydown),p.capture!==void 0&&(c=p.capture),typeof p.splitKey=="string"&&(u=p.splitKey),p.single===!0&&(h=!0)}for(typeof e=="string"&&(i=e),h&&$t(t,i);a<r.length;a++){let p=r[a].split(u);s=[],p.length>1&&(s=gt(_,p));let f=p[p.length-1];f=f==="*"?"*":W(f),f in y||(y[f]=[]),y[f].push({keyup:l,keydown:d,scope:i,mods:s,shortcut:r[a],method:o,key:r[a],splitKey:u,element:n})}if(typeof n<"u"&&typeof window<"u"){if(!M.has(n)){let p=(w=window.event)=>yt(w,n),f=(w=window.event)=>{yt(w,n),ho(w)};M.set(n,{keydownListener:p,keyupListenr:f,capture:c}),Ve(n,"keydown",p,c),Ve(n,"keyup",f,c)}if(!oe){let p=()=>{b=[]};oe={listener:p,capture:c},Ve(window,"focus",p,c)}}};function uo(t,e="all"){Object.keys(y).forEach(o=>{y[o].filter(r=>r.scope===e&&r.shortcut===t).forEach(r=>{r&&r.method&&r.method({},r)})})}function Ke(t){let e=Object.values(y).flat();if(e.findIndex(({element:o})=>o===t)<0&&t){let{keydownListener:o,keyupListenr:r,capture:s}=M.get(t)||{};o&&r&&(ee(t,"keyup",r,s),ee(t,"keydown",o,s),M.delete(t))}if((e.length<=0||M.size<=0)&&(Array.from(M.keys()).forEach(o=>{let{keydownListener:r,keyupListenr:s,capture:i}=M.get(o)||{};r&&s&&(ee(o,"keyup",s,i),ee(o,"keydown",r,i),M.delete(o))}),M.clear(),Object.keys(y).forEach(o=>delete y[o]),oe)){let{listener:o,capture:r}=oe;ee(window,"focus",o,r),oe=null}}var qe={getPressedKeyString:ao,setScope:Et,getScope:se,deleteScope:po,getPressedKeyCodes:no,getAllKeyCodes:lo,isPressed:co,filter:wt,trigger:uo,unbind:$t,keyMap:re,modifier:_,modifierMap:te};for(let t in qe){let e=t;Object.prototype.hasOwnProperty.call(qe,e)&&(R[e]=qe[e])}if(typeof window<"u"){let t=window.hotkeys;R.noConflict=e=>(e&&window.hotkeys===R&&(window.hotkeys=t),R),window.hotkeys=R}var At=t=>{class e extends t{constructor(){super(...arguments);this.#e=!1;this.initialReflectedProperties=new Map}#e;attributeChangedCallback(s,i,n){if(!this.#e){let a=this;this.constructor.elementProperties.forEach((l,d)=>{l.reflect&&a[d]!=null&&this.initialReflectedProperties.set(d,a[d])}),this.initialReflectedProperties.set("slot",this.slot),this.#e=!0}super.attributeChangedCallback?.(s,i,n)}willUpdate(s){super.willUpdate?.(s);let i=this;this.initialReflectedProperties.forEach((n,a)=>{s.has(a)&&i[a]==null&&(i[a]=n)})}}return x([L()],e.prototype,"initialReflectedProperties",2),e};function ve(t){if(!t||typeof t!="object")return!1;let e=Object.getPrototypeOf(t);return e===null||e===Object.prototype||Object.getPrototypeOf(e)===null?Object.prototype.toString.call(t)==="[object Object]":!1}function Je(t){return t!=null}function ke(t){return typeof t=="string"}var _t=t=>{class e extends t{constructor(...s){super(...s);this.customStates={set:(s,i)=>{try{this.internals.states[i?"add":"delete"](s)}catch{this.internals.states[i?"add":"delete"](`--${s}`)}},has:s=>{try{return this.internals.states.has(s)}catch{return this.internals.states.has(`--${s}`)}}};this.internals=this.attachInternals()}static{this.formAssociated=!1}}return e};var Ee=class extends Event{constructor(e,o){super(e,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=o}};var we=class extends Ee{constructor(e,o={}){super("lb-command",{bubbles:!0,cancelable:!1,composed:!0}),this.command=e,this.detail=o}};var $e=class extends Event{constructor(e={value:void 0,oldValue:void 0}){super("lb-data",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Ae=class extends Event{constructor(e={}){super("lb-display-mode-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var _e=class extends Event{constructor(e){super("lb-drag-end",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Se=class extends Event{constructor(e){super("lb-drag-start",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Ce=class extends Event{constructor(e={}){super("lb-error",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Te=class extends Event{constructor(e={}){super("lb-param-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Pe=class extends Event{constructor(e){super("lb-popover-close",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Oe=class extends Event{constructor(e){super("lb-popover-open",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Le=class extends Event{constructor(e){super("lb-resize",{bubbles:!1,cancelable:!1,composed:!0}),this.detail=e}};var St={"lb-command":we,"lb-data":$e,"lb-drag-start":Se,"lb-drag-end":_e,"lb-error":Ce,"lb-resize":Le,"lb-popover-open":Oe,"lb-popover-close":Pe,"lb-param-change":Te,"lb-display-mode-change":Ae};function Ct(t){return St[t]}var Tt=`:host {
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
`;var ie=class extends At(C){constructor(){super();this.cleanupJobs=[]}static{this.shadowRootOptions={...C.shadowRootOptions,serializable:!0}}static{this.morphable=!0}static get styles(){let o=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Tt,...o].map(r=>typeof r=="string"?q(r):r)}afterMorph(){}get morphable(){return!!this.getStaticProperty("morphable")}disconnectedCallback(){this.cleanupJobs.forEach(o=>o()),super.disconnectedCallback()}addCleanupJob(o){this.cleanupJobs.push(o)}renderToTarget(o,r){X(r,o)}on(o,r){this.addEventListener(o,r),this.addCleanupJob(()=>this.removeEventListener(o,r))}delegate(o,r){document.addEventListener(o,r),this.addCleanupJob(()=>document.removeEventListener(o,r))}dispatch(o,...r){let s=Ct(o),i=this;if(!s){console.warn(`Unknown event type '${o}'`);return}let n=null;if(ve(r[0])?(n=r[0],r=[]):r.length>0&&ve(r[r.length-1])&&(n=r.pop()),n?.target){let l=ke(n.target)?document.querySelector(`#${n.target}`):i;l&&(i=l)}let a=[...r,n].filter(Je);i.dispatchEvent(new s(...a))}getStaticProperty(o){return this.constructor[o]}warn(o){ke(o)&&(o=new Error(o)),this.dispatch("lb-error",{error:o}),console.error(o)}};x([L()],ie.prototype,"cleanupJobs",2);var Pt=`#input-field {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  margin: auto 0;
  padding: 0;
  border: none;
  background: none;
  cursor: inherit;
  &:not([type=checkbox]) {
    border-radius: var(--lookbook-border-radius-md);
    border: 1px solid var(--lookbook-neutral-stroke-quiet);
    width: 100%;
    height: var(--lookbook-form-control-height-md);
    padding-inline: var(--lookbook-size-sm);
    font-size: var(--lookbook-form-control-font-size-sm);
    background-color: var(--lookbook-surface-1);
    font-family: var(--lookbook-font-family-code);
    color: var(--lookbook-text-base);
    line-height: 1.5;
  }
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline: var(--lookbook-border-style) calc(var(--lookbook-border-width) + 1px) var(--lookbook-focus-color);
    outline-offset: calc(-1 * var(--lookbook-border-width));
  }
  &::placeholder {
    color: var(--lookbook-form-control-placeholder-color);
    user-select: none;
    -webkit-user-select: none;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-background-clip: text;
    background-color: transparent;
    -webkit-text-fill-color: inherit;
  }
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
  &[type=number]::-webkit-inner-spin-button {
    width: 1em;
    height: 2em;
  }
  &::-webkit-datetime-edit-year-field:focus,
  &::-webkit-datetime-edit-month-field:focus,
  &::-webkit-datetime-edit-week-field:focus,
  &::-webkit-datetime-edit-day-field:focus,
  &::-webkit-datetime-edit-ampm-field:focus,
  &::-webkit-datetime-edit-meridiem-field:focus,
  &::-webkit-datetime-edit-hour-field:focus,
  &::-webkit-datetime-edit-millisecond-field:focus,
  &::-webkit-datetime-edit-minute-field:focus,
  &::-webkit-datetime-edit-second-field:focus {
    outline: none;
    background-color: var(--lookbook-selection-background-color);
    color: var(--lookbook-selection-color);
  }
  &:is(textarea) {
    height: auto;
    padding: 10px var(--lookbook-size-sm);
    &[resize=auto] {
      field-sizing: content;
    }
  }
  &:is(select) {
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/></svg>');
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 18px;
  }
  &:where([type=checkbox][role=switch]) {
    position: relative;
    background-color: var(--lookbook-surface-1);
    font-size: inherit;
    width: calc(var(--lookbook-form-control-height-xs) * 1.8);
    height: var(--lookbook-form-control-height-xs);
    box-sizing: content-box;
    border: 1px solid var(--lookbook-neutral-stroke-quiet);
    border-radius: var(--lookbook-form-control-height-sm);
    vertical-align: text-bottom;
    margin: auto;
    cursor: pointer;
    transition: all 150ms ease-in-out;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      box-sizing: border-box;
      width: calc(var(--lookbook-form-control-height-xs) - 6px);
      height: calc(var(--lookbook-form-control-height-xs) - 6px);
      margin: 0 3px;
      border-radius: var(--lookbook-form-control-height-sm);
      background-color: var(--lookbook-neutral-fill-quiet);
      transition: all 150ms ease-in-out;
    }
    &:checked {
      background-color: var(--lookbook-positive-fill-mid);
      &::before {
        background-color: var(--lookbook-surface-1);
        left: calc(var(--lookbook-form-control-height-xs) - 6px);
      }
    }
    &:disabled {
      opacity: 0.4;
    }
  }
  &[type=date],
  &[type=datetime-local],
  &[type=month],
  &[type=time],
  &[type=week] {
    display: inline-flex;
    appearance: none;
    align-items: center;
    width: 100%;
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="color: %2382848d;"%3E%3Cpath stroke="none" d="M0 0h24v24H0z" fill="none"/%3E%3Cpath d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /%3E%3Cpath d="M16 3v4" /%3E%3Cpath d="M8 3v4" /%3E%3Cpath d="M4 11h16" /%3E%3Cpath d="M11 15h1" /%3E%3Cpath d="M12 15v3" /%3E%3C/svg%3E');
    background-position: 100% center;
    background-size: 1.25em;
    background-repeat: no-repeat;
    &::-webkit-calendar-picker-indicator {
      display: none;
    }
    &::-webkit-date-and-time-value {
      text-align: start;
    }
  }
  &[type=time] {
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: %2382848d;"%3E%3Cpath stroke="none" d="M0 0h24v24H0z" fill="none"/%3E%3Cpath d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /%3E%3Cpath d="M12 12l3 2" /%3E%3Cpath d="M12 7v5" /%3E%3C/svg%3E');
  }
}
`;var Ot=`:host {
  max-width: 40rem;
}
label {
  display: block;
  margin-block-end: var(--lookbook-size-xs);
  font-size: var(--lookbook-form-control-font-size-sm);
  font-weight: var(--lookbook-font-weight-semibold);
  cursor: pointer;
}
textarea {
  min-height: 4.3rem;
}
:host([field="toggle"]),
:host([field="checkbox"]) {
  #container {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: start;
    column-gap: var(--lookbook-size-sm);
  }
  label {
    margin-block-end: 0;
  }
  #input-field {
    margin: 0;
  }
}
`;var Lt=["text","email","number","password","date","datetime-local","month","time","week"],yo=["toggle","checkbox"],k=class extends _t(ie){constructor(){super(...arguments);this.field="text";this.choices=[];this.options={}}get fieldType(){return Lt.includes(this.field)?"input":yo.includes(this.field)?"checkbox":this.field}updated(o){o.has("value")&&o.get("value")!==void 0&&(this.internals.setFormValue(this.value),this.dispatch("lb-param-change",{name:this.name,value:this.value}))}updateValue(o){this.value=o.target.value}renderField(){switch(this.fieldType){case"input":return this.renderInput();case"textarea":return this.renderTextarea();case"select":return this.renderSelect();case"checkbox":return this.renderCheckbox();default:return S`<small>Unknown control type '${this.fieldType}'</small>`}}renderInput(){let o=Lt.includes(this.field)||m;return S`
      <input
        id="input-field"
        type="${o}"
        name="${this.name}"
        value="${this.value}"
        @input="${this.updateValue}"
      />
    `}renderSelect(){return S`
      <select
        id="input-field"
        name="${this.name}"
        @change="${this.updateValue}"
      >
        ${this.choices?.map(([o,r])=>S`<option
            value="${r}"
            ?selected="${this.value===r}"
          >
            ${o}
          </option>`)}
      </select>
    `}renderTextarea(){return S`
      <textarea
        id="input-field"
        name="${this.name}"
        resize="auto"
        @input="${this.updateValue}"
      >
${this.value}</textarea
      >
    `}renderCheckbox(){let o=this.field==="toggle"?"switch":"checkbox";return S`
      <input
        id="input-field"
        name="${this.name}"
        type="checkbox"
        value="${this.value==="true"?"false":"true"}"
        role="${o}"
        ?checked="${this.value==="true"}"
        @change="${this.updateValue}"
      />
    `}render(){return S`
      <div id="container">
        <label for="input-field">${this.label}</label>
        ${this.renderField()}
      </div>
    `}};k.css=[Pt,Ot],k.formAssociated=!0,x([$()],k.prototype,"label",2),x([$()],k.prototype,"hint",2),x([$()],k.prototype,"description",2),x([$()],k.prototype,"target",2),x([$()],k.prototype,"name",2),x([$({reflect:!0})],k.prototype,"value",2),x([$()],k.prototype,"field",2),x([$({type:Array})],k.prototype,"choices",2),x([$({type:Object})],k.prototype,"options",2),x([L()],k.prototype,"fieldType",1),k=x([Ie("lb-control")],k);export{k as LookbookControl};
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
