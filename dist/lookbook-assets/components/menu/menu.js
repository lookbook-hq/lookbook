var Oe=Object.defineProperty;var Le=Object.getOwnPropertyDescriptor;var A=(e,t,o,r)=>{for(var s=r>1?void 0:r?Le(t,o):t,n=e.length-1,i;n>=0;n--)(i=e[n])&&(s=(r?i(t,o,s):i(s))||s);return r&&s&&Oe(t,o,s),s};var at=globalThis,lt=at.ShadowRoot&&(at.ShadyCSS===void 0||at.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Yt=Symbol(),Zt=new WeakMap,q=class{constructor(t,o,r){if(this._$cssResult$=!0,r!==Yt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o,o=this.t;if(lt&&t===void 0){let r=o!==void 0&&o.length===1;r&&(t=Zt.get(o)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&Zt.set(o,t))}return t}toString(){return this.cssText}},K=e=>new q(typeof e=="string"?e:e+"",void 0,Yt);var Qt=(e,t)=>{if(lt)e.adoptedStyleSheets=t.map((o=>o instanceof CSSStyleSheet?o:o.styleSheet));else for(let o of t){let r=document.createElement("style"),s=at.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=o.cssText,e.appendChild(r)}},Dt=lt?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let o="";for(let r of t.cssRules)o+=r.cssText;return K(o)})(e):e;var{is:Re,defineProperty:De,getOwnPropertyDescriptor:Me,getOwnPropertyNames:He,getOwnPropertySymbols:je,getPrototypeOf:Ne}=Object,pt=globalThis,Xt=pt.trustedTypes,Ue=Xt?Xt.emptyScript:"",Be=pt.reactiveElementPolyfillSupport,V=(e,t)=>e,J={toAttribute(e,t){switch(t){case Boolean:e=e?Ue:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=e!==null;break;case Number:o=e===null?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch{o=null}}return o}},ct=(e,t)=>!Re(e,t),te={attribute:!0,type:String,converter:J,reflect:!1,useDefault:!1,hasChanged:ct};Symbol.metadata??=Symbol("metadata"),pt.litPropertyMetadata??=new WeakMap;var S=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,o=te){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(t,o),!o.noAccessor){let r=Symbol(),s=this.getPropertyDescriptor(t,r,o);s!==void 0&&De(this.prototype,t,s)}}static getPropertyDescriptor(t,o,r){let{get:s,set:n}=Me(this.prototype,t)??{get(){return this[o]},set(i){this[o]=i}};return{get:s,set(i){let a=s?.call(this);n?.call(this,i),this.requestUpdate(t,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??te}static _$Ei(){if(this.hasOwnProperty(V("elementProperties")))return;let t=Ne(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(V("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(V("properties"))){let o=this.properties,r=[...He(o),...je(o)];for(let s of r)this.createProperty(s,o[s])}let t=this[Symbol.metadata];if(t!==null){let o=litPropertyMetadata.get(t);if(o!==void 0)for(let[r,s]of o)this.elementProperties.set(r,s)}this._$Eh=new Map;for(let[o,r]of this.elementProperties){let s=this._$Eu(o,r);s!==void 0&&this._$Eh.set(s,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let o=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let s of r)o.unshift(Dt(s))}else t!==void 0&&o.push(Dt(t));return o}static _$Eu(t,o){let r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,o=this.constructor.elementProperties;for(let r of o.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Qt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,o,r){this._$AK(t,r)}_$ET(t,o){let r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){let n=(r.converter?.toAttribute!==void 0?r.converter:J).toAttribute(o,r.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,o){let r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=r.getPropertyOptions(s),i=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:J;this._$Em=s;let a=i.fromAttribute(o,n.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,o,r){if(t!==void 0){let s=this.constructor,n=this[t];if(r??=s.getPropertyOptions(t),!((r.hasChanged??ct)(n,o)||r.useDefault&&r.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,r))))return;this.C(t,o,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,o,{useDefault:r,reflect:s,wrapped:n},i){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??o??this[t]),n!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(o=void 0),this._$AL.set(t,o)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[s,n]of r){let{wrapped:i}=n,a=this[s];i!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,n,a)}}let t=!1,o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(o)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(o)}willUpdate(t){}_$AE(t){this._$EO?.forEach((o=>o.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((o=>this._$ET(o,this[o]))),this._$EM()}updated(t){}firstUpdated(t){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[V("elementProperties")]=new Map,S[V("finalized")]=new Map,Be?.({ReactiveElement:S}),(pt.reactiveElementVersions??=[]).push("2.1.1");var Ht=globalThis,dt=Ht.trustedTypes,ee=dt?dt.createPolicy("lit-html",{createHTML:e=>e}):void 0,jt="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,Nt="?"+C,Ie=`<${Nt}>`,D=document,F=()=>D.createComment(""),Z=e=>e===null||typeof e!="object"&&typeof e!="function",Ut=Array.isArray,ae=e=>Ut(e)||typeof e?.[Symbol.iterator]=="function",Mt=`[ 	
\f\r]`,G=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oe=/-->/g,re=/>/g,L=RegExp(`>|${Mt}(?:([^\\s"'>=/]+)(${Mt}*=${Mt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),se=/'/g,ne=/"/g,le=/^(?:script|style|textarea|title)$/i,Bt=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),Q=Bt(1),ze=Bt(2),vo=Bt(3),g=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),ie=new WeakMap,R=D.createTreeWalker(D,129);function pe(e,t){if(!Ut(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return ee!==void 0?ee.createHTML(t):t}var ce=(e,t)=>{let o=e.length-1,r=[],s,n=t===2?"<svg>":t===3?"<math>":"",i=G;for(let a=0;a<o;a++){let l=e[a],d,f,p=-1,h=0;for(;h<l.length&&(i.lastIndex=h,f=i.exec(l),f!==null);)h=i.lastIndex,i===G?f[1]==="!--"?i=oe:f[1]!==void 0?i=re:f[2]!==void 0?(le.test(f[2])&&(s=RegExp("</"+f[2],"g")),i=L):f[3]!==void 0&&(i=L):i===L?f[0]===">"?(i=s??G,p=-1):f[1]===void 0?p=-2:(p=i.lastIndex-f[2].length,d=f[1],i=f[3]===void 0?L:f[3]==='"'?ne:se):i===ne||i===se?i=L:i===oe||i===re?i=G:(i=L,s=void 0);let c=i===L&&e[a+1].startsWith("/>")?" ":"";n+=i===G?l+Ie:p>=0?(r.push(d),l.slice(0,p)+jt+l.slice(p)+C+c):l+C+(p===-2?a:c)}return[pe(e,n+(e[o]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Y=class e{constructor({strings:t,_$litType$:o},r){let s;this.parts=[];let n=0,i=0,a=t.length-1,l=this.parts,[d,f]=ce(t,o);if(this.el=e.createElement(d,r),R.currentNode=this.el.content,o===2||o===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(s=R.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let p of s.getAttributeNames())if(p.endsWith(jt)){let h=f[i++],c=s.getAttribute(p).split(C),u=/([.?@])?(.*)/.exec(h);l.push({type:1,index:n,name:u[2],strings:c,ctor:u[1]==="."?ft:u[1]==="?"?ut:u[1]==="@"?mt:H}),s.removeAttribute(p)}else p.startsWith(C)&&(l.push({type:6,index:n}),s.removeAttribute(p));if(le.test(s.tagName)){let p=s.textContent.split(C),h=p.length-1;if(h>0){s.textContent=dt?dt.emptyScript:"";for(let c=0;c<h;c++)s.append(p[c],F()),R.nextNode(),l.push({type:2,index:++n});s.append(p[h],F())}}}else if(s.nodeType===8)if(s.data===Nt)l.push({type:2,index:n});else{let p=-1;for(;(p=s.data.indexOf(C,p+1))!==-1;)l.push({type:7,index:n}),p+=C.length-1}n++}}static createElement(t,o){let r=D.createElement("template");return r.innerHTML=t,r}};function M(e,t,o=e,r){if(t===g)return t;let s=r!==void 0?o._$Co?.[r]:o._$Cl,n=Z(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(e),s._$AT(e,o,r)),r!==void 0?(o._$Co??=[])[r]=s:o._$Cl=s),s!==void 0&&(t=M(e,s._$AS(e,t.values),s,r)),t}var ht=class{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:o},parts:r}=this._$AD,s=(t?.creationScope??D).importNode(o,!0);R.currentNode=s;let n=R.nextNode(),i=0,a=0,l=r[0];for(;l!==void 0;){if(i===l.index){let d;l.type===2?d=new U(n,n.nextSibling,this,t):l.type===1?d=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(d=new yt(n,this,t)),this._$AV.push(d),l=r[++a]}i!==l?.index&&(n=R.nextNode(),i++)}return R.currentNode=D,s}p(t){let o=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,o),o+=r.strings.length-2):r._$AI(t[o])),o++}},U=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,o,r,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=r,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,o=this._$AM;return o!==void 0&&t?.nodeType===11&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){t=M(this,t,o),Z(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==g&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ae(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&Z(this._$AH)?this._$AA.nextSibling.data=t:this.T(D.createTextNode(t)),this._$AH=t}$(t){let{values:o,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Y.createElement(pe(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===s)this._$AH.p(o);else{let n=new ht(s,this),i=n.u(this.options);n.p(o),this.T(i),this._$AH=n}}_$AC(t){let o=ie.get(t.strings);return o===void 0&&ie.set(t.strings,o=new Y(t)),o}k(t){Ut(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,r,s=0;for(let n of t)s===o.length?o.push(r=new e(this.O(F()),this.O(F()),this,this.options)):r=o[s],r._$AI(n),s++;s<o.length&&(this._$AR(r&&r._$AB.nextSibling,s),o.length=s)}_$AR(t=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},H=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,o,r,s,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=o,this._$AM=s,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=m}_$AI(t,o=this,r,s){let n=this.strings,i=!1;if(n===void 0)t=M(this,t,o,0),i=!Z(t)||t!==this._$AH&&t!==g,i&&(this._$AH=t);else{let a=t,l,d;for(t=n[0],l=0;l<n.length-1;l++)d=M(this,a[r+l],o,l),d===g&&(d=this._$AH[l]),i||=!Z(d)||d!==this._$AH[l],d===m?t=m:t!==m&&(t+=(d??"")+n[l+1]),this._$AH[l]=d}i&&!s&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ft=class extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},ut=class extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},mt=class extends H{constructor(t,o,r,s,n){super(t,o,r,s,n),this.type=5}_$AI(t,o=this){if((t=M(this,t,o,0)??m)===g)return;let r=this._$AH,s=t===m&&r!==m||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==m&&(r===m||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},yt=class{constructor(t,o,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}},de={M:jt,P:C,A:Nt,C:1,L:ce,R:ht,D:ae,V:M,I:U,H,N:ut,U:mt,B:ft,F:yt},We=Ht.litHtmlPolyfillSupport;We?.(Y,U),(Ht.litHtmlVersions??=[]).push("3.3.1");var X=(e,t,o)=>{let r=o?.renderBefore??t,s=r._$litPart$;if(s===void 0){let n=o?.renderBefore??null;r._$litPart$=s=new U(t.insertBefore(F(),n),n,void 0,o??{})}return s._$AI(e),s};var It=globalThis,_=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=X(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return g}};_._$litElement$=!0,_.finalized=!0,It.litElementHydrateSupport?.({LitElement:_});var qe=It.litElementPolyfillSupport;qe?.({LitElement:_});(It.litElementVersions??=[]).push("4.2.1");var zt=e=>(t,o)=>{o!==void 0?o.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};var Ke={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:ct},Ve=(e=Ke,t,o)=>{let{kind:r,metadata:s}=o,n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),r==="setter"&&((e=Object.create(e)).wrapped=!0),n.set(o.name,e),r==="accessor"){let{name:i}=o;return{set(a){let l=t.get.call(this);t.set.call(this,a),this.requestUpdate(i,l,e)},init(a){return a!==void 0&&this.C(i,void 0,e,a),a}}}if(r==="setter"){let{name:i}=o;return function(a){let l=this[i];t.call(this,a),this.requestUpdate(i,l,e)}}throw Error("Unsupported decorator location: "+r)};function B(e){return(t,o)=>typeof o=="object"?Ve(e,t,o):((r,s,n)=>{let i=s.hasOwnProperty(n);return s.constructor.createProperty(n,r),i?Object.getOwnPropertyDescriptor(s,n):void 0})(e,t,o)}function j(e){return B({...e,state:!0,attribute:!1})}var I=(e,t,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,o),o);function Wt(e){return(t,o)=>{let{slot:r,selector:s}=e??{},n="slot"+(r?`[name=${r}]`:":not([name])");return I(t,o,{get(){let i=this.renderRoot?.querySelector(n),a=i?.assignedElements(e)??[];return s===void 0?a:a.filter((l=>l.matches(s)))}})}}var v={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},w=e=>(...t)=>({_$litDirective$:e,values:t}),k=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,o,r){this._$Ct=t,this._$AM=o,this._$Ci=r}_$AS(t,o){return this.update(t,o)}update(t,o){return this.render(...o)}};var Je=w(class extends k{constructor(e){if(super(e),e.type!==v.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((r=>r!==""))));for(let r in t)t[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(t)}let o=e.element.classList;for(let r of this.st)r in t||(o.remove(r),this.st.delete(r));for(let r in t){let s=!!t[r];s===this.st.has(r)||this.nt?.has(r)||(s?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return g}});var{I:Ge}=de;var fe=e=>e.strings===void 0,he=()=>document.createComment(""),z=(e,t,o)=>{let r=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(o===void 0){let n=r.insertBefore(he(),s),i=r.insertBefore(he(),s);o=new Ge(n,i,e,e.options)}else{let n=o._$AB.nextSibling,i=o._$AM,a=i!==e;if(a){let l;o._$AQ?.(e),o._$AM=e,o._$AP!==void 0&&(l=e._$AU)!==i._$AU&&o._$AP(l)}if(n!==s||a){let l=o._$AA;for(;l!==n;){let d=l.nextSibling;r.insertBefore(l,s),l=d}}}return o},O=(e,t,o=e)=>(e._$AI(t,o),e),Fe={},bt=(e,t=Fe)=>e._$AH=t,ue=e=>e._$AH,gt=e=>{e._$AR(),e._$AA.remove()};var Ze=w(class extends k{constructor(e){if(super(e),e.type!==v.PROPERTY&&e.type!==v.ATTRIBUTE&&e.type!==v.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!fe(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===g||t===m)return t;let o=e.element,r=e.name;if(e.type===v.PROPERTY){if(t===o[r])return g}else if(e.type===v.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(r))return g}else if(e.type===v.ATTRIBUTE&&o.getAttribute(r)===t+"")return g;return bt(e),t}});var me=(e,t,o)=>{let r=new Map;for(let s=t;s<=o;s++)r.set(e[s],s);return r},Ye=w(class extends k{constructor(e){if(super(e),e.type!==v.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,o){let r;o===void 0?o=t:t!==void 0&&(r=t);let s=[],n=[],i=0;for(let a of e)s[i]=r?r(a,i):i,n[i]=o(a,i),i++;return{values:n,keys:s}}render(e,t,o){return this.dt(e,t,o).values}update(e,[t,o,r]){let s=ue(e),{values:n,keys:i}=this.dt(t,o,r);if(!Array.isArray(s))return this.ut=i,n;let a=this.ut??=[],l=[],d,f,p=0,h=s.length-1,c=0,u=n.length-1;for(;p<=h&&c<=u;)if(s[p]===null)p++;else if(s[h]===null)h--;else if(a[p]===i[c])l[c]=O(s[p],n[c]),p++,c++;else if(a[h]===i[u])l[u]=O(s[h],n[u]),h--,u--;else if(a[p]===i[u])l[u]=O(s[p],n[u]),z(e,l[u+1],s[p]),p++,u--;else if(a[h]===i[c])l[c]=O(s[h],n[c]),z(e,s[p],s[h]),h--,c++;else if(d===void 0&&(d=me(i,c,u),f=me(a,p,h)),d.has(a[p]))if(d.has(a[h])){let E=f.get(i[c]),Rt=E!==void 0?s[E]:null;if(Rt===null){let Ft=z(e,s[p]);O(Ft,n[c]),l[c]=Ft}else l[c]=O(Rt,n[c]),z(e,s[p],Rt),s[E]=null;c++}else gt(s[h]),h--;else gt(s[p]),p++;for(;c<=u;){let E=z(e,l[u+1]);O(E,n[c]),l[c++]=E}for(;p<=h;){let E=s[p++];E!==null&&gt(E)}return this.ut=i,bt(e,l),g}});var ye="important",Qe=" !"+ye,Xe=w(class extends k{constructor(e){if(super(e),e.type!==v.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,o)=>{let r=e[o];return r==null?t:t+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`}),"")}update(e,[t]){let{style:o}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let r of this.ft)t[r]==null&&(this.ft.delete(r),r.includes("-")?o.removeProperty(r):o[r]=null);for(let r in t){let s=t[r];if(s!=null){this.ft.add(r);let n=typeof s=="string"&&s.endsWith(Qe);r.includes("-")||n?o.setProperty(r,n?s.slice(0,-11):s,n?ye:""):o[r]=s}}return g}});var tt=class extends k{constructor(t){if(super(t),this.it=m,t.type!==v.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===m||t==null)return this._t=void 0,this.it=t;if(t===g)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let o=[t];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};tt.directiveName="unsafeHTML",tt.resultType=1;var to=w(tt);var qt=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function Kt(e,t,o,r){e.addEventListener?e.addEventListener(t,o,r):e.attachEvent&&e.attachEvent(`on${t}`,o)}function et(e,t,o,r){e&&(e.removeEventListener?e.removeEventListener(t,o,r):e.detachEvent&&e.detachEvent(`on${t}`,o))}function xe(e,t){let o=t.slice(0,t.length-1),r=[];for(let s=0;s<o.length;s++)r.push(e[o[s].toLowerCase()]);return r}function ve(e){typeof e!="string"&&(e=""),e=e.replace(/\s/g,"");let t=e.split(","),o=t.lastIndexOf("");for(;o>=0;)t[o-1]+=",",t.splice(o,1),o=t.lastIndexOf("");return t}function eo(e,t){let o=e.length>=t.length?e:t,r=e.length>=t.length?t:e,s=!0;for(let n=0;n<o.length;n++)r.indexOf(o[n])===-1&&(s=!1);return s}function Ee(e){let t=e.keyCode||e.which||e.charCode;return e.code&&/^Key[A-Z]$/.test(e.code)&&(t=e.code.charCodeAt(3)),t}var st={backspace:8,"\u232B":8,tab:9,clear:12,enter:13,"\u21A9":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,arrowup:38,arrowdown:40,arrowleft:37,arrowright:39,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"\u21EA":20,",":188,".":190,"/":191,"`":192,"-":qt?173:189,"=":qt?61:187,";":qt?59:186,"'":222,"{":219,"}":221,"[":219,"]":221,"\\":220},$={"\u21E7":16,shift:16,"\u2325":18,alt:18,option:18,"\u2303":17,ctrl:17,control:17,"\u2318":91,cmd:91,meta:91,command:91},ot={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},x={16:!1,18:!1,17:!1,91:!1},b={};for(let e=1;e<20;e++)st[`f${e}`]=111+e;var y=[],rt=null,ke="all",P=new Map,W=e=>st[e.toLowerCase()]||$[e.toLowerCase()]||e.toUpperCase().charCodeAt(0),oo=e=>Object.keys(st).find(t=>st[t]===e),ro=e=>Object.keys($).find(t=>$[t]===e),$e=e=>{ke=e||"all"},nt=()=>ke||"all",so=()=>y.slice(0),no=()=>y.map(e=>oo(e)||ro(e)||String.fromCharCode(e)),io=()=>{let e=[];return Object.keys(b).forEach(t=>{b[t].forEach(({key:o,scope:r,mods:s,shortcut:n})=>{e.push({scope:r,shortcut:n,mods:s,keys:o.split("+").map(i=>W(i))})})}),e},Ae=e=>{let t=e.target||e.srcElement,{tagName:o}=t,r=!0,s=o==="INPUT"&&!["checkbox","radio","range","button","file","reset","submit","color"].includes(t.type);return(t.isContentEditable||(s||o==="TEXTAREA"||o==="SELECT")&&!t.readOnly)&&(r=!1),r},ao=e=>(typeof e=="string"&&(e=W(e)),y.indexOf(e)!==-1),lo=(e,t)=>{let o,r;e||(e=nt());for(let s in b)if(Object.prototype.hasOwnProperty.call(b,s))for(o=b[s],r=0;r<o.length;)o[r].scope===e?o.splice(r,1).forEach(({element:n})=>Jt(n)):r++;nt()===e&&$e(t||"all")};function po(e){let t=Ee(e);e.key&&e.key.toLowerCase()==="capslock"&&(t=W(e.key));let o=y.indexOf(t);if(o>=0&&y.splice(o,1),e.key&&e.key.toLowerCase()==="meta"&&y.splice(0,y.length),(t===93||t===224)&&(t=91),t in x){x[t]=!1;for(let r in $)$[r]===t&&(T[r]=!1)}}var _e=(e,...t)=>{if(typeof e>"u")Object.keys(b).forEach(o=>{Array.isArray(b[o])&&b[o].forEach(r=>xt(r)),delete b[o]}),Jt(null);else if(Array.isArray(e))e.forEach(o=>{o.key&&xt(o)});else if(typeof e=="object")e.key&&xt(e);else if(typeof e=="string"){let[o,r]=t;typeof o=="function"&&(r=o,o=""),xt({key:e,scope:o,method:r,splitKey:"+"})}},xt=({key:e,scope:t,method:o,splitKey:r="+"})=>{ve(e).forEach(s=>{let n=s.split(r),i=n.length,a=n[i-1],l=a==="*"?"*":W(a);if(!b[l])return;t||(t=nt());let d=i>1?xe($,n):[],f=[];b[l]=b[l].filter(p=>{let h=(o?p.method===o:!0)&&p.scope===t&&eo(p.mods,d);return h&&f.push(p.element),!h}),f.forEach(p=>Jt(p))})};function be(e,t,o,r){if(t.element!==r)return;let s;if(t.scope===o||t.scope==="all"){s=t.mods.length>0;for(let n in x)Object.prototype.hasOwnProperty.call(x,n)&&(!x[n]&&t.mods.indexOf(+n)>-1||x[n]&&t.mods.indexOf(+n)===-1)&&(s=!1);(t.mods.length===0&&!x[16]&&!x[18]&&!x[17]&&!x[91]||s||t.shortcut==="*")&&(t.keys=[],t.keys=t.keys.concat(y),t.method(e,t)===!1&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0)))}}function ge(e,t){let o=b["*"],r=Ee(e);if(e.key&&e.key.toLowerCase()==="capslock"||!(T.filter||Ae).call(this,e))return;if((r===93||r===224)&&(r=91),y.indexOf(r)===-1&&r!==229&&y.push(r),["metaKey","ctrlKey","altKey","shiftKey"].forEach(a=>{let l=ot[a];e[a]&&y.indexOf(l)===-1?y.push(l):!e[a]&&y.indexOf(l)>-1?y.splice(y.indexOf(l),1):a==="metaKey"&&e[a]&&(y=y.filter(d=>d in ot||d===r))}),r in x){x[r]=!0;for(let a in $)if(Object.prototype.hasOwnProperty.call($,a)){let l=ot[$[a]];T[a]=e[l]}if(!o)return}for(let a in x)Object.prototype.hasOwnProperty.call(x,a)&&(x[a]=e[ot[a]]);e.getModifierState&&!(e.altKey&&!e.ctrlKey)&&e.getModifierState("AltGraph")&&(y.indexOf(17)===-1&&y.push(17),y.indexOf(18)===-1&&y.push(18),x[17]=!0,x[18]=!0);let s=nt();if(o)for(let a=0;a<o.length;a++)o[a].scope===s&&(e.type==="keydown"&&o[a].keydown||e.type==="keyup"&&o[a].keyup)&&be(e,o[a],s,t);if(!(r in b))return;let n=b[r],i=n.length;for(let a=0;a<i;a++)if((e.type==="keydown"&&n[a].keydown||e.type==="keyup"&&n[a].keyup)&&n[a].key){let l=n[a],{splitKey:d}=l,f=l.key.split(d),p=[];for(let h=0;h<f.length;h++)p.push(W(f[h]));p.sort().join("")===y.sort().join("")&&be(e,l,s,t)}}var T=function(e,t,o){y=[];let r=ve(e),s=[],n="all",i=document,a=0,l=!1,d=!0,f="+",p=!1,h=!1;if(o===void 0&&typeof t=="function"&&(o=t),Object.prototype.toString.call(t)==="[object Object]"){let c=t;c.scope&&(n=c.scope),c.element&&(i=c.element),c.keyup&&(l=c.keyup),c.keydown!==void 0&&(d=c.keydown),c.capture!==void 0&&(p=c.capture),typeof c.splitKey=="string"&&(f=c.splitKey),c.single===!0&&(h=!0)}for(typeof t=="string"&&(n=t),h&&_e(e,n);a<r.length;a++){let c=r[a].split(f);s=[],c.length>1&&(s=xe($,c));let u=c[c.length-1];u=u==="*"?"*":W(u),u in b||(b[u]=[]),b[u].push({keyup:l,keydown:d,scope:n,mods:s,shortcut:r[a],method:o,key:r[a],splitKey:f,element:i})}if(typeof i<"u"&&typeof window<"u"){if(!P.has(i)){let c=(E=window.event)=>ge(E,i),u=(E=window.event)=>{ge(E,i),po(E)};P.set(i,{keydownListener:c,keyupListenr:u,capture:p}),Kt(i,"keydown",c,p),Kt(i,"keyup",u,p)}if(!rt){let c=()=>{y=[]};rt={listener:c,capture:p},Kt(window,"focus",c,p)}}};function co(e,t="all"){Object.keys(b).forEach(o=>{b[o].filter(r=>r.scope===t&&r.shortcut===e).forEach(r=>{r&&r.method&&r.method({},r)})})}function Jt(e){let t=Object.values(b).flat();if(t.findIndex(({element:o})=>o===e)<0&&e){let{keydownListener:o,keyupListenr:r,capture:s}=P.get(e)||{};o&&r&&(et(e,"keyup",r,s),et(e,"keydown",o,s),P.delete(e))}if((t.length<=0||P.size<=0)&&(Array.from(P.keys()).forEach(o=>{let{keydownListener:r,keyupListenr:s,capture:n}=P.get(o)||{};r&&s&&(et(o,"keyup",s,n),et(o,"keydown",r,n),P.delete(o))}),P.clear(),Object.keys(b).forEach(o=>delete b[o]),rt)){let{listener:o,capture:r}=rt;et(window,"focus",o,r),rt=null}}var Vt={getPressedKeyString:no,setScope:$e,getScope:nt,deleteScope:lo,getPressedKeyCodes:so,getAllKeyCodes:io,isPressed:ao,filter:Ae,trigger:co,unbind:_e,keyMap:st,modifier:$,modifierMap:ot};for(let e in Vt){let t=e;Object.prototype.hasOwnProperty.call(Vt,t)&&(T[t]=Vt[t])}if(typeof window<"u"){let e=window.hotkeys;T.noConflict=t=>(t&&window.hotkeys===T&&(window.hotkeys=e),T),window.hotkeys=T}var we=e=>{class t extends e{constructor(){super(...arguments);this.#t=!1;this.initialReflectedProperties=new Map}#t;attributeChangedCallback(s,n,i){if(!this.#t){let a=this;this.constructor.elementProperties.forEach((l,d)=>{l.reflect&&a[d]!=null&&this.initialReflectedProperties.set(d,a[d])}),this.initialReflectedProperties.set("slot",this.slot),this.#t=!0}super.attributeChangedCallback?.(s,n,i)}willUpdate(s){super.willUpdate?.(s);let n=this;this.initialReflectedProperties.forEach((i,a)=>{s.has(a)&&n[a]==null&&(n[a]=i)})}}return A([j()],t.prototype,"initialReflectedProperties",2),t};function vt(e){if(!e||typeof e!="object")return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype||Object.getPrototypeOf(t)===null?Object.prototype.toString.call(e)==="[object Object]":!1}function Gt(e){return e!=null}function Et(e){return typeof e=="string"}var kt=class extends Event{constructor(t,o){super(t,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=o}};var $t=class extends kt{constructor(t,o={}){super("lb-command",{bubbles:!0,cancelable:!1,composed:!0}),this.command=t,this.detail=o}};var At=class extends Event{constructor(t={value:void 0,oldValue:void 0}){super("lb-data",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var _t=class extends Event{constructor(t={}){super("lb-display-mode-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var wt=class extends Event{constructor(t){super("lb-drag-end",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var St=class extends Event{constructor(t){super("lb-drag-start",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ct=class extends Event{constructor(t={}){super("lb-error",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Pt=class extends Event{constructor(t={}){super("lb-param-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Tt=class extends Event{constructor(t){super("lb-popover-close",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ot=class extends Event{constructor(t){super("lb-popover-open",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Lt=class extends Event{constructor(t){super("lb-resize",{bubbles:!1,cancelable:!1,composed:!0}),this.detail=t}};var Se={"lb-command":$t,"lb-data":At,"lb-drag-start":St,"lb-drag-end":wt,"lb-error":Ct,"lb-resize":Lt,"lb-popover-open":Ot,"lb-popover-close":Tt,"lb-param-change":Pt,"lb-display-mode-change":_t};function Ce(e){return Se[e]}var Pe=`:host {
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
`;var it=class extends we(_){constructor(){super();this.cleanupJobs=[]}static{this.shadowRootOptions={..._.shadowRootOptions,serializable:!0}}static{this.morphable=!0}static get styles(){let o=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Pe,...o].map(r=>typeof r=="string"?K(r):r)}afterMorph(){}get morphable(){return!!this.getStaticProperty("morphable")}disconnectedCallback(){this.cleanupJobs.forEach(o=>o()),super.disconnectedCallback()}addCleanupJob(o){this.cleanupJobs.push(o)}renderToTarget(o,r){X(r,o)}on(o,r){this.addEventListener(o,r),this.addCleanupJob(()=>this.removeEventListener(o,r))}delegate(o,r){document.addEventListener(o,r),this.addCleanupJob(()=>document.removeEventListener(o,r))}dispatch(o,...r){let s=Ce(o),n=this;if(!s){console.warn(`Unknown event type '${o}'`);return}let i=null;if(vt(r[0])?(i=r[0],r=[]):r.length>0&&vt(r[r.length-1])&&(i=r.pop()),i?.target){let l=Et(i.target)?document.querySelector(`#${i.target}`):n;l&&(n=l)}let a=[...r,i].filter(Gt);n.dispatchEvent(new s(...a))}getStaticProperty(o){return this.constructor[o]}warn(o){Et(o)&&(o=new Error(o)),this.dispatch("lb-error",{error:o}),console.error(o)}};A([j()],it.prototype,"cleanupJobs",2);var Te=`:host {
  width: min-content;
  font-size: var(--lookbook-font-size-sm);
}
#label {
  padding: var(--lookbook-size-xs) var(--lookbook-size-md);
  font-size: var(--lookbook-font-size-2xs);
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--lookbook-text-quieter);
  border-bottom: 1px solid var(--lookbook-divider-quiet);
  text-align: center;
}
#items {
  padding-block-start: var(--lookbook-size-3xs);
  padding-block-end: var(--lookbook-size-xs);
}
`;var N=class extends it{updated(t){super.updated(t),Array.from(this.buttons).forEach(o=>{o.setAttribute("appearance","menu-item")})}render(){return Q`
      ${this.label?Q`<h4 id="label">${this.label}</h4>`:m}
      <div id="items">
        <slot></slot>
      </div>
    `}};N.css=Te,A([B()],N.prototype,"label",2),A([Wt({selector:"lb-button"})],N.prototype,"buttons",2),N=A([zt("lb-menu")],N);export{N as LookbookMenu};
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
