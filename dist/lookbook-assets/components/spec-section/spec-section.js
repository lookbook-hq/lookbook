var Ot=Object.defineProperty;var Lt=Object.getOwnPropertyDescriptor;var $=(t,e,o,r)=>{for(var s=r>1?void 0:r?Lt(e,o):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(s=(r?n(e,o,s):n(s))||s);return r&&s&&Ot(e,o,s),s};var ne=globalThis,ae=ne.ShadowRoot&&(ne.ShadyCSS===void 0||ne.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ze=Symbol(),Fe=new WeakMap,q=class{constructor(e,o,r){if(this._$cssResult$=!0,r!==Ze)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(ae&&e===void 0){let r=o!==void 0&&o.length===1;r&&(e=Fe.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&Fe.set(o,e))}return e}toString(){return this.cssText}},W=t=>new q(typeof t=="string"?t:t+"",void 0,Ze);var Ye=(t,e)=>{if(ae)t.adoptedStyleSheets=e.map((o=>o instanceof CSSStyleSheet?o:o.styleSheet));else for(let o of e){let r=document.createElement("style"),s=ne.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=o.cssText,t.appendChild(r)}},Me=ae?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let r of e.cssRules)o+=r.cssText;return W(o)})(t):t;var{is:Rt,defineProperty:Mt,getOwnPropertyDescriptor:Dt,getOwnPropertyNames:Ht,getOwnPropertySymbols:jt,getPrototypeOf:Ut}=Object,le=globalThis,Qe=le.trustedTypes,Nt=Qe?Qe.emptyScript:"",zt=le.reactiveElementPolyfillSupport,K=(t,e)=>t,V={toAttribute(t,e){switch(e){case Boolean:t=t?Nt:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},ce=(t,e)=>!Rt(t,e),Xe={attribute:!0,type:String,converter:V,reflect:!1,useDefault:!1,hasChanged:ce};Symbol.metadata??=Symbol("metadata"),le.litPropertyMetadata??=new WeakMap;var C=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=Xe){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(e,r,o);s!==void 0&&Mt(this.prototype,e,s)}}static getPropertyDescriptor(e,o,r){let{get:s,set:i}=Dt(this.prototype,e)??{get(){return this[o]},set(n){this[o]=n}};return{get:s,set(n){let a=s?.call(this);i?.call(this,n),this.requestUpdate(e,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Xe}static _$Ei(){if(this.hasOwnProperty(K("elementProperties")))return;let e=Ut(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(K("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(K("properties"))){let o=this.properties,r=[...Ht(o),...jt(o)];for(let s of r)this.createProperty(s,o[s])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[r,s]of o)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[o,r]of this.elementProperties){let s=this._$Eu(o,r);s!==void 0&&this._$Eh.set(s,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let s of r)o.unshift(Me(s))}else e!==void 0&&o.push(Me(e));return o}static _$Eu(e,o){let r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let r of o.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ye(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,o,r){this._$AK(e,r)}_$ET(e,o){let r=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,r);if(s!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:V).toAttribute(o,r.type);this._$Em=e,i==null?this.removeAttribute(s):this.setAttribute(s,i),this._$Em=null}}_$AK(e,o){let r=this.constructor,s=r._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let i=r.getPropertyOptions(s),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:V;this._$Em=s;let a=n.fromAttribute(o,i.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(e,o,r){if(e!==void 0){let s=this.constructor,i=this[e];if(r??=s.getPropertyOptions(e),!((r.hasChanged??ce)(i,o)||r.useDefault&&r.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,r))))return;this.C(e,o,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:r,reflect:s,wrapped:i},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??o??this[e]),i!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(o=void 0),this._$AL.set(e,o)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,i]of this._$Ep)this[s]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,i]of r){let{wrapped:n}=i,a=this[s];n!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,i,a)}}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(o)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach((o=>o.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((o=>this._$ET(o,this[o]))),this._$EM()}updated(e){}firstUpdated(e){}};C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[K("elementProperties")]=new Map,C[K("finalized")]=new Map,zt?.({ReactiveElement:C}),(le.reactiveElementVersions??=[]).push("2.1.1");var He=globalThis,pe=He.trustedTypes,et=pe?pe.createPolicy("lit-html",{createHTML:t=>t}):void 0,je="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,Ue="?"+S,Bt=`<${Ue}>`,M=document,G=()=>M.createComment(""),F=t=>t===null||typeof t!="object"&&typeof t!="function",Ne=Array.isArray,nt=t=>Ne(t)||typeof t?.[Symbol.iterator]=="function",De=`[ 	
\f\r]`,J=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,tt=/-->/g,ot=/>/g,L=RegExp(`>|${De}(?:([^\\s"'>=/]+)(${De}*=${De}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),rt=/'/g,st=/"/g,at=/^(?:script|style|textarea|title)$/i,ze=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),Y=ze(1),It=ze(2),xo=ze(3),y=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),it=new WeakMap,R=M.createTreeWalker(M,129);function lt(t,e){if(!Ne(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return et!==void 0?et.createHTML(e):e}var ct=(t,e)=>{let o=t.length-1,r=[],s,i=e===2?"<svg>":e===3?"<math>":"",n=J;for(let a=0;a<o;a++){let l=t[a],d,m,c=-1,h=0;for(;h<l.length&&(n.lastIndex=h,m=n.exec(l),m!==null);)h=n.lastIndex,n===J?m[1]==="!--"?n=tt:m[1]!==void 0?n=ot:m[2]!==void 0?(at.test(m[2])&&(s=RegExp("</"+m[2],"g")),n=L):m[3]!==void 0&&(n=L):n===L?m[0]===">"?(n=s??J,c=-1):m[1]===void 0?c=-2:(c=n.lastIndex-m[2].length,d=m[1],n=m[3]===void 0?L:m[3]==='"'?st:rt):n===st||n===rt?n=L:n===tt||n===ot?n=J:(n=L,s=void 0);let p=n===L&&t[a+1].startsWith("/>")?" ":"";i+=n===J?l+Bt:c>=0?(r.push(d),l.slice(0,c)+je+l.slice(c)+S+p):l+S+(c===-2?a:p)}return[lt(t,i+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},Z=class t{constructor({strings:e,_$litType$:o},r){let s;this.parts=[];let i=0,n=0,a=e.length-1,l=this.parts,[d,m]=ct(e,o);if(this.el=t.createElement(d,r),R.currentNode=this.el.content,o===2||o===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=R.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(je)){let h=m[n++],p=s.getAttribute(c).split(S),f=/([.?@])?(.*)/.exec(h);l.push({type:1,index:i,name:f[2],strings:p,ctor:f[1]==="."?he:f[1]==="?"?me:f[1]==="@"?fe:H}),s.removeAttribute(c)}else c.startsWith(S)&&(l.push({type:6,index:i}),s.removeAttribute(c));if(at.test(s.tagName)){let c=s.textContent.split(S),h=c.length-1;if(h>0){s.textContent=pe?pe.emptyScript:"";for(let p=0;p<h;p++)s.append(c[p],G()),R.nextNode(),l.push({type:2,index:++i});s.append(c[h],G())}}}else if(s.nodeType===8)if(s.data===Ue)l.push({type:2,index:i});else{let c=-1;for(;(c=s.data.indexOf(S,c+1))!==-1;)l.push({type:7,index:i}),c+=S.length-1}i++}}static createElement(e,o){let r=M.createElement("template");return r.innerHTML=e,r}};function D(t,e,o=t,r){if(e===y)return e;let s=r!==void 0?o._$Co?.[r]:o._$Cl,i=F(e)?void 0:e._$litDirective$;return s?.constructor!==i&&(s?._$AO?.(!1),i===void 0?s=void 0:(s=new i(t),s._$AT(t,o,r)),r!==void 0?(o._$Co??=[])[r]=s:o._$Cl=s),s!==void 0&&(e=D(t,s._$AS(t,e.values),s,r)),e}var de=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:r}=this._$AD,s=(e?.creationScope??M).importNode(o,!0);R.currentNode=s;let i=R.nextNode(),n=0,a=0,l=r[0];for(;l!==void 0;){if(n===l.index){let d;l.type===2?d=new z(i,i.nextSibling,this,e):l.type===1?d=new l.ctor(i,l.name,l.strings,this,e):l.type===6&&(d=new ue(i,this,e)),this._$AV.push(d),l=r[++a]}n!==l?.index&&(i=R.nextNode(),n++)}return R.currentNode=M,s}p(e){let o=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,o),o+=r.strings.length-2):r._$AI(e[o])),o++}},z=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,r,s){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=D(this,e,o),F(e)?e===u||e==null||e===""?(this._$AH!==u&&this._$AR(),this._$AH=u):e!==this._$AH&&e!==y&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):nt(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==u&&F(this._$AH)?this._$AA.nextSibling.data=e:this.T(M.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:r}=e,s=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=Z.createElement(lt(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(o);else{let i=new de(s,this),n=i.u(this.options);i.p(o),this.T(n),this._$AH=i}}_$AC(e){let o=it.get(e.strings);return o===void 0&&it.set(e.strings,o=new Z(e)),o}k(e){Ne(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,r,s=0;for(let i of e)s===o.length?o.push(r=new t(this.O(G()),this.O(G()),this,this.options)):r=o[s],r._$AI(i),s++;s<o.length&&(this._$AR(r&&r._$AB.nextSibling,s),o.length=s)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){let r=e.nextSibling;e.remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},H=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,r,s,i){this.type=1,this._$AH=u,this._$AN=void 0,this.element=e,this.name=o,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=u}_$AI(e,o=this,r,s){let i=this.strings,n=!1;if(i===void 0)e=D(this,e,o,0),n=!F(e)||e!==this._$AH&&e!==y,n&&(this._$AH=e);else{let a=e,l,d;for(e=i[0],l=0;l<i.length-1;l++)d=D(this,a[r+l],o,l),d===y&&(d=this._$AH[l]),n||=!F(d)||d!==this._$AH[l],d===u?e=u:e!==u&&(e+=(d??"")+i[l+1]),this._$AH[l]=d}n&&!s&&this.j(e)}j(e){e===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},he=class extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===u?void 0:e}},me=class extends H{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==u)}},fe=class extends H{constructor(e,o,r,s,i){super(e,o,r,s,i),this.type=5}_$AI(e,o=this){if((e=D(this,e,o,0)??u)===y)return;let r=this._$AH,s=e===u&&r!==u||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==u&&(r===u||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ue=class{constructor(e,o,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){D(this,e)}},pt={M:je,P:S,A:Ue,C:1,L:ct,R:de,D:nt,V:D,I:z,H,N:me,U:fe,B:he,F:ue},qt=He.litHtmlPolyfillSupport;qt?.(Z,z),(He.litHtmlVersions??=[]).push("3.3.1");var Q=(t,e,o)=>{let r=o?.renderBefore??e,s=r._$litPart$;if(s===void 0){let i=o?.renderBefore??null;r._$litPart$=s=new z(e.insertBefore(G(),i),i,void 0,o??{})}return s._$AI(t),s};var Be=globalThis,_=class extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Q(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return y}};_._$litElement$=!0,_.finalized=!0,Be.litElementHydrateSupport?.({LitElement:_});var Wt=Be.litElementPolyfillSupport;Wt?.({LitElement:_});(Be.litElementVersions??=[]).push("4.2.1");var Ie=t=>(e,o)=>{o!==void 0?o.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};var Kt={attribute:!0,type:String,converter:V,reflect:!1,hasChanged:ce},Vt=(t=Kt,e,o)=>{let{kind:r,metadata:s}=o,i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),r==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(o.name,t),r==="accessor"){let{name:n}=o;return{set(a){let l=e.get.call(this);e.set.call(this,a),this.requestUpdate(n,l,t)},init(a){return a!==void 0&&this.C(n,void 0,t,a),a}}}if(r==="setter"){let{name:n}=o;return function(a){let l=this[n];e.call(this,a),this.requestUpdate(n,l,t)}}throw Error("Unsupported decorator location: "+r)};function j(t){return(e,o)=>typeof o=="object"?Vt(t,e,o):((r,s,i)=>{let n=s.hasOwnProperty(i);return s.constructor.createProperty(i,r),n?Object.getOwnPropertyDescriptor(s,i):void 0})(t,e,o)}function U(t){return j({...t,state:!0,attribute:!1})}var v={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},A=t=>(...e)=>({_$litDirective$:t,values:e}),w=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,r){this._$Ct=e,this._$AM=o,this._$Ci=r}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};var Jt=A(class extends w{constructor(t){if(super(t),t.type!==v.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((r=>r!==""))));for(let r in e)e[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(e)}let o=t.element.classList;for(let r of this.st)r in e||(o.remove(r),this.st.delete(r));for(let r in e){let s=!!e[r];s===this.st.has(r)||this.nt?.has(r)||(s?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return y}});var{I:Gt}=pt;var ht=t=>t.strings===void 0,dt=()=>document.createComment(""),B=(t,e,o)=>{let r=t._$AA.parentNode,s=e===void 0?t._$AB:e._$AA;if(o===void 0){let i=r.insertBefore(dt(),s),n=r.insertBefore(dt(),s);o=new Gt(i,n,t,t.options)}else{let i=o._$AB.nextSibling,n=o._$AM,a=n!==t;if(a){let l;o._$AQ?.(t),o._$AM=t,o._$AP!==void 0&&(l=t._$AU)!==n._$AU&&o._$AP(l)}if(i!==s||a){let l=o._$AA;for(;l!==i;){let d=l.nextSibling;r.insertBefore(l,s),l=d}}}return o},O=(t,e,o=t)=>(t._$AI(e,o),t),Ft={},ge=(t,e=Ft)=>t._$AH=e,mt=t=>t._$AH,ye=t=>{t._$AR(),t._$AA.remove()};var Zt=A(class extends w{constructor(t){if(super(t),t.type!==v.PROPERTY&&t.type!==v.ATTRIBUTE&&t.type!==v.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ht(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===y||e===u)return e;let o=t.element,r=t.name;if(t.type===v.PROPERTY){if(e===o[r])return y}else if(t.type===v.BOOLEAN_ATTRIBUTE){if(!!e===o.hasAttribute(r))return y}else if(t.type===v.ATTRIBUTE&&o.getAttribute(r)===e+"")return y;return ge(t),e}});var ft=(t,e,o)=>{let r=new Map;for(let s=e;s<=o;s++)r.set(t[s],s);return r},Yt=A(class extends w{constructor(t){if(super(t),t.type!==v.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,o){let r;o===void 0?o=e:e!==void 0&&(r=e);let s=[],i=[],n=0;for(let a of t)s[n]=r?r(a,n):n,i[n]=o(a,n),n++;return{values:i,keys:s}}render(t,e,o){return this.dt(t,e,o).values}update(t,[e,o,r]){let s=mt(t),{values:i,keys:n}=this.dt(e,o,r);if(!Array.isArray(s))return this.ut=n,i;let a=this.ut??=[],l=[],d,m,c=0,h=s.length-1,p=0,f=i.length-1;for(;c<=h&&p<=f;)if(s[c]===null)c++;else if(s[h]===null)h--;else if(a[c]===n[p])l[p]=O(s[c],i[p]),c++,p++;else if(a[h]===n[f])l[f]=O(s[h],i[f]),h--,f--;else if(a[c]===n[f])l[f]=O(s[c],i[f]),B(t,l[f+1],s[c]),c++,f--;else if(a[h]===n[p])l[p]=O(s[h],i[p]),B(t,s[c],s[h]),h--,p++;else if(d===void 0&&(d=ft(n,p,f),m=ft(a,c,h)),d.has(a[c]))if(d.has(a[h])){let x=m.get(n[p]),Re=x!==void 0?s[x]:null;if(Re===null){let Ge=B(t,s[c]);O(Ge,i[p]),l[p]=Ge}else l[p]=O(Re,i[p]),B(t,s[c],Re),s[x]=null;p++}else ye(s[h]),h--;else ye(s[c]),c++;for(;p<=f;){let x=B(t,l[f+1]);O(x,i[p]),l[p++]=x}for(;c<=h;){let x=s[c++];x!==null&&ye(x)}return this.ut=n,ge(t,l),y}});var ut="important",Qt=" !"+ut,Xt=A(class extends w{constructor(t){if(super(t),t.type!==v.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,o)=>{let r=t[o];return r==null?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`}),"")}update(t,[e]){let{style:o}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let r of this.ft)e[r]==null&&(this.ft.delete(r),r.includes("-")?o.removeProperty(r):o[r]=null);for(let r in e){let s=e[r];if(s!=null){this.ft.add(r);let i=typeof s=="string"&&s.endsWith(Qt);r.includes("-")||i?o.setProperty(r,i?s.slice(0,-11):s,i?ut:""):o[r]=s}}return y}});var X=class extends w{constructor(e){if(super(e),this.it=u,e.type!==v.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===u||e==null)return this._t=void 0,this.it=e;if(e===y)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let o=[e];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};X.directiveName="unsafeHTML",X.resultType=1;var eo=A(X);var qe=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function We(t,e,o,r){t.addEventListener?t.addEventListener(e,o,r):t.attachEvent&&t.attachEvent(`on${e}`,o)}function ee(t,e,o,r){t&&(t.removeEventListener?t.removeEventListener(e,o,r):t.detachEvent&&t.detachEvent(`on${e}`,o))}function yt(t,e){let o=e.slice(0,e.length-1),r=[];for(let s=0;s<o.length;s++)r.push(t[o[s].toLowerCase()]);return r}function kt(t){typeof t!="string"&&(t=""),t=t.replace(/\s/g,"");let e=t.split(","),o=e.lastIndexOf("");for(;o>=0;)e[o-1]+=",",e.splice(o,1),o=e.lastIndexOf("");return e}function to(t,e){let o=t.length>=e.length?t:e,r=t.length>=e.length?e:t,s=!0;for(let i=0;i<o.length;i++)r.indexOf(o[i])===-1&&(s=!1);return s}function vt(t){let e=t.keyCode||t.which||t.charCode;return t.code&&/^Key[A-Z]$/.test(t.code)&&(e=t.code.charCodeAt(3)),e}var re={backspace:8,"\u232B":8,tab:9,clear:12,enter:13,"\u21A9":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,arrowup:38,arrowdown:40,arrowleft:37,arrowright:39,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"\u21EA":20,",":188,".":190,"/":191,"`":192,"-":qe?173:189,"=":qe?61:187,";":qe?59:186,"'":222,"{":219,"}":221,"[":219,"]":221,"\\":220},E={"\u21E7":16,shift:16,"\u2325":18,alt:18,option:18,"\u2303":17,ctrl:17,control:17,"\u2318":91,cmd:91,meta:91,command:91},te={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},k={16:!1,18:!1,17:!1,91:!1},g={};for(let t=1;t<20;t++)re[`f${t}`]=111+t;var b=[],oe=null,xt="all",P=new Map,I=t=>re[t.toLowerCase()]||E[t.toLowerCase()]||t.toUpperCase().charCodeAt(0),oo=t=>Object.keys(re).find(e=>re[e]===t),ro=t=>Object.keys(E).find(e=>E[e]===t),wt=t=>{xt=t||"all"},se=()=>xt||"all",so=()=>b.slice(0),io=()=>b.map(t=>oo(t)||ro(t)||String.fromCharCode(t)),no=()=>{let t=[];return Object.keys(g).forEach(e=>{g[e].forEach(({key:o,scope:r,mods:s,shortcut:i})=>{t.push({scope:r,shortcut:i,mods:s,keys:o.split("+").map(n=>I(n))})})}),t},Et=t=>{let e=t.target||t.srcElement,{tagName:o}=e,r=!0,s=o==="INPUT"&&!["checkbox","radio","range","button","file","reset","submit","color"].includes(e.type);return(e.isContentEditable||(s||o==="TEXTAREA"||o==="SELECT")&&!e.readOnly)&&(r=!1),r},ao=t=>(typeof t=="string"&&(t=I(t)),b.indexOf(t)!==-1),lo=(t,e)=>{let o,r;t||(t=se());for(let s in g)if(Object.prototype.hasOwnProperty.call(g,s))for(o=g[s],r=0;r<o.length;)o[r].scope===t?o.splice(r,1).forEach(({element:i})=>Ve(i)):r++;se()===t&&wt(e||"all")};function co(t){let e=vt(t);t.key&&t.key.toLowerCase()==="capslock"&&(e=I(t.key));let o=b.indexOf(e);if(o>=0&&b.splice(o,1),t.key&&t.key.toLowerCase()==="meta"&&b.splice(0,b.length),(e===93||e===224)&&(e=91),e in k){k[e]=!1;for(let r in E)E[r]===e&&(T[r]=!1)}}var $t=(t,...e)=>{if(typeof t>"u")Object.keys(g).forEach(o=>{Array.isArray(g[o])&&g[o].forEach(r=>ke(r)),delete g[o]}),Ve(null);else if(Array.isArray(t))t.forEach(o=>{o.key&&ke(o)});else if(typeof t=="object")t.key&&ke(t);else if(typeof t=="string"){let[o,r]=e;typeof o=="function"&&(r=o,o=""),ke({key:t,scope:o,method:r,splitKey:"+"})}},ke=({key:t,scope:e,method:o,splitKey:r="+"})=>{kt(t).forEach(s=>{let i=s.split(r),n=i.length,a=i[n-1],l=a==="*"?"*":I(a);if(!g[l])return;e||(e=se());let d=n>1?yt(E,i):[],m=[];g[l]=g[l].filter(c=>{let h=(o?c.method===o:!0)&&c.scope===e&&to(c.mods,d);return h&&m.push(c.element),!h}),m.forEach(c=>Ve(c))})};function bt(t,e,o,r){if(e.element!==r)return;let s;if(e.scope===o||e.scope==="all"){s=e.mods.length>0;for(let i in k)Object.prototype.hasOwnProperty.call(k,i)&&(!k[i]&&e.mods.indexOf(+i)>-1||k[i]&&e.mods.indexOf(+i)===-1)&&(s=!1);(e.mods.length===0&&!k[16]&&!k[18]&&!k[17]&&!k[91]||s||e.shortcut==="*")&&(e.keys=[],e.keys=e.keys.concat(b),e.method(t,e)===!1&&(t.preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation&&t.stopPropagation(),t.cancelBubble&&(t.cancelBubble=!0)))}}function gt(t,e){let o=g["*"],r=vt(t);if(t.key&&t.key.toLowerCase()==="capslock"||!(T.filter||Et).call(this,t))return;if((r===93||r===224)&&(r=91),b.indexOf(r)===-1&&r!==229&&b.push(r),["metaKey","ctrlKey","altKey","shiftKey"].forEach(a=>{let l=te[a];t[a]&&b.indexOf(l)===-1?b.push(l):!t[a]&&b.indexOf(l)>-1?b.splice(b.indexOf(l),1):a==="metaKey"&&t[a]&&(b=b.filter(d=>d in te||d===r))}),r in k){k[r]=!0;for(let a in E)if(Object.prototype.hasOwnProperty.call(E,a)){let l=te[E[a]];T[a]=t[l]}if(!o)return}for(let a in k)Object.prototype.hasOwnProperty.call(k,a)&&(k[a]=t[te[a]]);t.getModifierState&&!(t.altKey&&!t.ctrlKey)&&t.getModifierState("AltGraph")&&(b.indexOf(17)===-1&&b.push(17),b.indexOf(18)===-1&&b.push(18),k[17]=!0,k[18]=!0);let s=se();if(o)for(let a=0;a<o.length;a++)o[a].scope===s&&(t.type==="keydown"&&o[a].keydown||t.type==="keyup"&&o[a].keyup)&&bt(t,o[a],s,e);if(!(r in g))return;let i=g[r],n=i.length;for(let a=0;a<n;a++)if((t.type==="keydown"&&i[a].keydown||t.type==="keyup"&&i[a].keyup)&&i[a].key){let l=i[a],{splitKey:d}=l,m=l.key.split(d),c=[];for(let h=0;h<m.length;h++)c.push(I(m[h]));c.sort().join("")===b.sort().join("")&&bt(t,l,s,e)}}var T=function(t,e,o){b=[];let r=kt(t),s=[],i="all",n=document,a=0,l=!1,d=!0,m="+",c=!1,h=!1;if(o===void 0&&typeof e=="function"&&(o=e),Object.prototype.toString.call(e)==="[object Object]"){let p=e;p.scope&&(i=p.scope),p.element&&(n=p.element),p.keyup&&(l=p.keyup),p.keydown!==void 0&&(d=p.keydown),p.capture!==void 0&&(c=p.capture),typeof p.splitKey=="string"&&(m=p.splitKey),p.single===!0&&(h=!0)}for(typeof e=="string"&&(i=e),h&&$t(t,i);a<r.length;a++){let p=r[a].split(m);s=[],p.length>1&&(s=yt(E,p));let f=p[p.length-1];f=f==="*"?"*":I(f),f in g||(g[f]=[]),g[f].push({keyup:l,keydown:d,scope:i,mods:s,shortcut:r[a],method:o,key:r[a],splitKey:m,element:n})}if(typeof n<"u"&&typeof window<"u"){if(!P.has(n)){let p=(x=window.event)=>gt(x,n),f=(x=window.event)=>{gt(x,n),co(x)};P.set(n,{keydownListener:p,keyupListenr:f,capture:c}),We(n,"keydown",p,c),We(n,"keyup",f,c)}if(!oe){let p=()=>{b=[]};oe={listener:p,capture:c},We(window,"focus",p,c)}}};function po(t,e="all"){Object.keys(g).forEach(o=>{g[o].filter(r=>r.scope===e&&r.shortcut===t).forEach(r=>{r&&r.method&&r.method({},r)})})}function Ve(t){let e=Object.values(g).flat();if(e.findIndex(({element:o})=>o===t)<0&&t){let{keydownListener:o,keyupListenr:r,capture:s}=P.get(t)||{};o&&r&&(ee(t,"keyup",r,s),ee(t,"keydown",o,s),P.delete(t))}if((e.length<=0||P.size<=0)&&(Array.from(P.keys()).forEach(o=>{let{keydownListener:r,keyupListenr:s,capture:i}=P.get(o)||{};r&&s&&(ee(o,"keyup",s,i),ee(o,"keydown",r,i),P.delete(o))}),P.clear(),Object.keys(g).forEach(o=>delete g[o]),oe)){let{listener:o,capture:r}=oe;ee(window,"focus",o,r),oe=null}}var Ke={getPressedKeyString:io,setScope:wt,getScope:se,deleteScope:lo,getPressedKeyCodes:so,getAllKeyCodes:no,isPressed:ao,filter:Et,trigger:po,unbind:$t,keyMap:re,modifier:E,modifierMap:te};for(let t in Ke){let e=t;Object.prototype.hasOwnProperty.call(Ke,e)&&(T[e]=Ke[e])}if(typeof window<"u"){let t=window.hotkeys;T.noConflict=e=>(e&&window.hotkeys===T&&(window.hotkeys=t),T),window.hotkeys=T}var _t=t=>{class e extends t{constructor(){super(...arguments);this.#e=!1;this.initialReflectedProperties=new Map}#e;attributeChangedCallback(s,i,n){if(!this.#e){let a=this;this.constructor.elementProperties.forEach((l,d)=>{l.reflect&&a[d]!=null&&this.initialReflectedProperties.set(d,a[d])}),this.initialReflectedProperties.set("slot",this.slot),this.#e=!0}super.attributeChangedCallback?.(s,i,n)}willUpdate(s){super.willUpdate?.(s);let i=this;this.initialReflectedProperties.forEach((n,a)=>{s.has(a)&&i[a]==null&&(i[a]=n)})}}return $([U()],e.prototype,"initialReflectedProperties",2),e};function ve(t){if(!t||typeof t!="object")return!1;let e=Object.getPrototypeOf(t);return e===null||e===Object.prototype||Object.getPrototypeOf(e)===null?Object.prototype.toString.call(t)==="[object Object]":!1}function Je(t){return t!=null}function xe(t){return typeof t=="string"}var we=class extends Event{constructor(e,o){super(e,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=o}};var Ee=class extends we{constructor(e,o={}){super("lb-command",{bubbles:!0,cancelable:!1,composed:!0}),this.command=e,this.detail=o}};var $e=class extends Event{constructor(e={value:void 0,oldValue:void 0}){super("lb-data",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var _e=class extends Event{constructor(e={}){super("lb-display-mode-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Ae=class extends Event{constructor(e){super("lb-drag-end",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Ce=class extends Event{constructor(e){super("lb-drag-start",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Se=class extends Event{constructor(e={}){super("lb-error",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Pe=class extends Event{constructor(e={}){super("lb-param-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Te=class extends Event{constructor(e){super("lb-popover-close",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Oe=class extends Event{constructor(e){super("lb-popover-open",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Le=class extends Event{constructor(e){super("lb-resize",{bubbles:!1,cancelable:!1,composed:!0}),this.detail=e}};var At={"lb-command":Ee,"lb-data":$e,"lb-drag-start":Ce,"lb-drag-end":Ae,"lb-error":Se,"lb-resize":Le,"lb-popover-open":Oe,"lb-popover-close":Te,"lb-param-change":Pe,"lb-display-mode-change":_e};function Ct(t){return At[t]}var St=`:host {
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
`;var ie=class extends _t(_){constructor(){super();this.cleanupJobs=[]}static{this.shadowRootOptions={..._.shadowRootOptions,serializable:!0}}static{this.morphable=!0}static get styles(){let o=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[St,...o].map(r=>typeof r=="string"?W(r):r)}afterMorph(){}get morphable(){return!!this.getStaticProperty("morphable")}disconnectedCallback(){this.cleanupJobs.forEach(o=>o()),super.disconnectedCallback()}addCleanupJob(o){this.cleanupJobs.push(o)}renderToTarget(o,r){Q(r,o)}on(o,r){this.addEventListener(o,r),this.addCleanupJob(()=>this.removeEventListener(o,r))}delegate(o,r){document.addEventListener(o,r),this.addCleanupJob(()=>document.removeEventListener(o,r))}dispatch(o,...r){let s=Ct(o),i=this;if(!s){console.warn(`Unknown event type '${o}'`);return}let n=null;if(ve(r[0])?(n=r[0],r=[]):r.length>0&&ve(r[r.length-1])&&(n=r.pop()),n?.target){let l=xe(n.target)?document.querySelector(`#${n.target}`):i;l&&(i=l)}let a=[...r,n].filter(Je);i.dispatchEvent(new s(...a))}getStaticProperty(o){return this.constructor[o]}warn(o){xe(o)&&(o=new Error(o)),this.dispatch("lb-error",{error:o}),console.error(o)}};$([U()],ie.prototype,"cleanupJobs",2);var Pt=`.lb-prose {
  --max-line-length: 80ch;
  --element-max-width: --max-line-length;
  line-height: 1.65;
  color: var(--lookbook-text-base);
  font-family: var(--lookbook-font-family-prose);
  font-size: var(--lookbook-font-size-lg);
  address,
  audio,
  blockquote,
  dd,
  details,
  dl,
  fieldset,
  figure,
  iframe,
  ol,
  pre,
  table,
  ul,
  video {
    margin: 0;
    max-width: var(--max-line-length);
    &:not(:last-child) {
      margin-block-end: calc(var(--lookbook-prose-spacing) * 1.5);
    }
    & > :last-child {
      margin-block-end: 0;
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .lookbook-h1,
  .lookbook-h2,
  .lookbook-h3,
  .lookbook-h4 {
    margin: 0;
    font-weight: var(--lookbook-font-weight-semibold);
    line-height: 1.3;
    font-family: var(--lookbook-font-family-prose);
    text-wrap: balance;
    overflow-wrap: break-word;
    &:not(:first-child) {
      margin-block-start: 1.9em;
    }
    &:not(:last-child) {
      margin-block-end: 1em;
    }
  }
  h1,
  .lookbook-h1,
  h2,
  .lookbook-h2 {
    font-size: 1.5rem;
  }
  h3,
  .lookbook-h3 {
    font-size: 1.25rem;
  }
  h4,
  .lookbook-h4 {
    font-size: 1.1rem;
  }
  p {
    margin-block: 0;
    text-wrap: pretty;
    overflow-wrap: break-word;
    max-width: var(--max-line-length);
    &:not(:last-child) {
      margin-block-end: var(--lookbook-prose-spacing);
    }
  }
  lb-prose {
    max-width: var(--max-line-length);
    &:not(:last-child) {
      margin-block-end: calc(var(--lookbook-prose-spacing) * 1.5);
    }
  }
  lb-embed,
  lb-viewport,
  lb-snippet {
    max-width: var(--element-max-width);
    &:not(:last-child) {
      margin-block-end: calc(var(--lookbook-prose-spacing) * 1.5);
    }
  }
  blockquote {
    max-width: var(--max-line-length);
    position: relative;
    padding: calc(var(--lookbook-prose-spacing) / 1.5) var(--lookbook-prose-spacing);
    border-left: solid calc(var(--lookbook-divider-width) * 4) var(--lookbook-divider-color);
    color: var(--lookbook-text-muted);
    font-size: 1.125em;
  }
  q,
  cite {
    font-style: normal;
  }
  q {
    quotes: "\\201c" "\\201d" "\\2018" "\\2019";
  }
  cite {
    font-style: italic;
  }
  hr {
    max-width: var(--max-line-length);
    margin: calc(var(--lookbook-prose-spacing) * 1.5) 0;
    border: none;
    border-top: 1px solid var(--lookbook-neutral-stroke-quiet);
  }
  img,
  iframe,
  picture,
  video,
  canvas {
    display: block;
    margin-block: calc(var(--lookbook-prose-spacing) * 1.5);
    &.float-right {
      float: right;
      margin: 0 0 1rem 1rem;
    }
  }
  iframe {
    max-width: var(--element-max-width);
    aspect-ratio: 9 / 6;
    width: 100%;
    border: solid var(--lookbook-divider-width) var(--lookbook-divider-color);
    background-color: var(--lookbook-background-color);
  }
  a {
    color: var(--lookbook-accent-text-on-quiet);
    font-weight: var(--lookbook-font-weight-normal);
    text-decoration-thickness: 0.0625em;
    text-underline-offset: 0.125em;
    transition: 150ms color ease;
    text-decoration: underline;
    @media (hover: hover) {
      &:hover {
        color: color-mix(in oklab, var(--lookbook-accent-text-on-quiet), black 10%);
      }
    }
  }
  a,
  button {
    &:focus-visible {
      outline: var(--lookbook-focus-ring);
      outline-offset: var(--lookbook-focus-offset);
    }
  }
  a code,
  a pre {
    background-color: inherit;
    color: inherit;
  }
  abbr[title] {
    text-decoration: underline;
    text-decoration-style: dotted;
    text-decoration-color: var(--lookbook-neutral-fill-mid);
    text-decoration-thickness: 0.09375em;
    text-underline-offset: 0.125em;
    cursor: help;
  }
  del {
    text-decoration-style: solid;
    text-decoration-color: var(--lookbook-destructive-fill-mid);
    text-decoration-thickness: 0.09375em;
  }
  ins {
    text-decoration-style: solid;
    text-decoration-color: var(--lookbook-constructive-fill-mid);
    text-decoration-thickness: 0.09375em;
    text-underline-offset: 0.125em;
  }
  kbd {
    padding: 0.2125em 0.33em;
    border: solid max(1px, 0.0715em) var(--lookbook-neutral-fill-soft);
    border-radius: var(--lookbook-divider-radius-sm);
    box-shadow: 0 max(1px, 0.0715em) 0 0 var(--lookbook-neutral-fill-soft);
    font: inherit;
    font-size: 0.9375em;
    letter-spacing: 0.0625em;
    vertical-align: baseline;
  }
  mark {
    padding: 0.125em 0.25em;
    border-radius: 0;
    border-radius: var(--lookbook-divider-radius-sm);
    background-color: color-mix(in oklab, #f4dd01, transparent 75%);
    color: inherit;
  }
  small {
    color: var(--lookbook-text-muted);
    font-size: 0.875em;
  }
  strong {
    font-weight: var(--lookbook-font-weight-semibold);
  }
  u {
    text-decoration-thickness: 0.09375em;
    text-underline-offset: 0.125em;
  }
  code,
  samp,
  tt {
    padding: 0.125em 0.25em;
    border-radius: var(--lookbook-divider-radius-sm);
    background: var(--lookbook-neutral-fill-softer);
    color: var(--lookbook-neutral-text-on-soft);
    font-size: 0.875em;
    font-family: var(--lookbook-font-family-code);
    tab-size: 2;
  }
  a:has(code, samp, tt, pre) {
    font-weight: inherit;
  }
  pre,
  lb-snippet {
    position: relative;
    border-radius: var(--lookbook-divider-radius-md);
    background: var(--lookbook-neutral-fill-softer);
    color: var(--lookbook-neutral-text-on-soft);
    font-size: 0.9375rem;
    font-family: var(--lookbook-font-family-code);
    tab-size: 2;
    border: 1px solid var(--lookbook-divider-color);
    border-radius: var(--lookbook-border-radius-md);
    code {
      font-size: inherit;
    }
  }
  pre {
    padding: var(--lookbook-size-md);
  }
  ul,
  ol {
    margin-inline-start: 1.1em;
    padding: 0;
    li {
      margin-block-end: calc(var(--lookbook-prose-spacing) * 0.3);
    }
  }
  ul li {
    list-style-type: disc;
  }
  ol li {
    list-style-type: decimal;
  }
  li > ol,
  li > ul {
    margin-inline-start: 1.25em;
  }
  ul ul,
  ol ol {
    margin-block-end: 0;
  }
  figure {
    padding: calc(var(--lookbook-prose-spacing) / 2);
    border: solid var(--lookbook-divider-width) var(--lookbook-divider-color);
    border-radius: var(--lookbook-divider-radius-md);
    box-shadow: var(--lookbook-shadow-softer);
  }
  figcaption {
    padding-block-start: calc(var(--lookbook-prose-spacing) / 2);
  }
  dt {
    font-weight: var(--lookbook-font-weight-bold);
  }
  dd:not(:last-of-type) {
    margin-block-end: calc(var(--lookbook-prose-spacing) / 2);
  }
  details {
    padding-inline: calc(var(--lookbook-prose-spacing) / 2);
    border: solid var(--lookbook-divider-width) var(--lookbook-divider-color);
    border-radius: var(--lookbook-divider-radius-md);
    background-color: var(--lookbook-paper-color);
    box-shadow: var(--lookbook-shadow-softer);
    interpolate-size: allow-keywords;
    &[open] {
      padding-block-end: calc(var(--lookbook-prose-spacing) / 2);
    }
    &[open] > summary::before {
      rotate: 90deg;
    }
    &::details-content {
      height: 0;
      overflow: hidden;
      transition: height 200ms ease, content-visibility 200ms ease allow-discrete;
    }
    &[open]::details-content {
      height: auto;
    }
    @starting-style {
      &[open]::details-content {
        height: 0;
      }
    }
    summary {
      font-weight: var(--lookbook-font-weight-semibold);
      font-size: 0.9375em;
      text-wrap: balance;
      &:focus {
        outline: none;
      }
    }
    &:has(summary:focus-visible) {
      outline: var(--lookbook-focus-ring);
      outline-offset: var(--lookbook-focus-offset);
    }
    > :first-child {
      margin-block-start: 0;
    }
    + details {
      margin-block-start: calc(var(--lookbook-prose-spacing) / -1.5);
    }
  }
  summary {
    display: block;
    position: relative;
    margin-inline: -1rem;
    margin-block: 0;
    padding-inline-start: 1em;
    padding-inline-end: 2.5em;
    padding-block: calc(var(--lookbook-prose-spacing) / 2);
    cursor: pointer;
    user-select: none;
    ~ * {
      margin-block-start: 0;
    }
    &::before {
      position: absolute;
      top: calc(50% - 0.5em);
      right: 1em;
      width: 1em;
      height: 1em;
      transform-origin: center;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23222' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M9 6l6 6l-6 6' /%3E%3C/svg%3E");
      background-position: center;
      background-size: 1.25em;
      background-repeat: no-repeat;
      content: "";
      color: var(--lookbook-text-body);
      transition: rotate 200ms ease;
    }
    &::-webkit-details-marker {
      display: none;
    }
  }
  .lookbook-dark summary::before {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ddd' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M9 6l6 6l-6 6' /%3E%3C/svg%3E");
  }
  table {
    width: 100%;
    border-spacing: 0;
    font-size: 0.9375rem;
    caption {
      margin-block-start: 1em;
      color: var(--lookbook-text-muted);
      font-size: 0.9375em;
      caption-side: bottom;
    }
  }
  thead th,
  thead td,
  tr:not(:last-of-type) th,
  tr:not(:last-of-type) td {
    border-bottom: solid var(--lookbook-divider-width) var(--lookbook-divider-color);
  }
  tfoot th,
  tfoot td {
    border-top: solid var(--lookbook-divider-width) var(--lookbook-divider-color);
  }
  th,
  td[scope],
  tfoot td {
    font-weight: var(--lookbook-font-weight-bold);
  }
  th,
  td {
    padding: 0.75em;
    font-variant-numeric: tabular-nums;
    text-align: start;
  }
  table.lookbook-striped tbody tr:nth-child(2n) {
    background-color: color-mix(in oklab, var(--lookbook-neutral-fill-softer), transparent 50%);
  }
}
.lb-prose-condensed {
  --lookbook-prose-spacing: calc(var(--lookbook-prose-spacing) * 0.75);
}
`;var Tt=`:host {
}
#header {
  display: flex;
  align-items: center;
  margin-bottom: var(--lookbook-size-xl);
}
#header-container {
  display: contents;
}
#title {
  display: flex;
  align-items: center;
  column-gap: 0.5em;
  margin: 0;
  a {
    display: inline-block;
    text-decoration: none;
    color: var(--lookbook-text-base);
    font-weight: var(--lookbook-font-weight-semibold);
    line-height: 1;
    padding: var(--lookbook-size-2xs);
    background-color: var(--lookbook-accent-fill-quiet);
    border-radius: var(--lookbook-size-3xs);
    &:hover {
      text-decoration: underline;
    }
  }
}
#toolbar {
  margin-inline-start: auto;
  opacity: 0;
  transition: opacity 250ms ease;
  &::part(container) {
    padding: 0;
  }
}
#container:hover {
  #toolbar {
    opacity: 1;
  }
}
::slotted(*) {
  margin-block-end: calc(var(--lookbook-prose-spacing) * 1.2);
}
::slotted(*:last-child) {
  margin-block-end: 0;
}
`;var N=class extends ie{render(){return Y`
      <section id="container">
        ${this.heading?Y`
            <header
              id="header"
              class="lb-prose"
            >
              <div id="header-container">
              <h2
                id="title"
                class="lookbook-h4"
              >
                <a href="${this.link}">${this.heading}</a>
              </h2>
              <lb-toolbar id="toolbar">
                <lb-button-group slot="end">
                  <lb-button id="copy-permalink">
                    <lb-icon name="link"></lb-icon>
                    <lb-tooltip>Copy permalink</lb-tooltip>
                  </lb-button>
                  <lb-button
                    id="reload-preview"
                    href="${this.link}"
                  >
                    <lb-icon name="square-dashed-mouse-pointer"></lb-icon>
                    <lb-tooltip placement="top">Open in inspector</lb-tooltip>
                  </lb-button>
                </lb-button-group>
              </lb-toolbar>
            </header>
        `:u}

        <div id="content">
          <div id="content-container">
            <slot name="notes"></slot>
            <slot name="preview"></slot>
          </div>
        </div>
      </section>
    `}};N.css=[Pt,Tt],$([j()],N.prototype,"heading",2),$([j()],N.prototype,"link",2),N=$([Ie("lb-spec-section")],N);export{N as LookbookSpecSection};
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
