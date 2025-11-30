var hr=Object.defineProperty;var ur=Object.getOwnPropertyDescriptor;var A=(e,t,r,o)=>{for(var s=o>1?void 0:o?ur(t,r):t,n=e.length-1,i;n>=0;n--)(i=e[n])&&(s=(o?i(t,r,s):i(s))||s);return o&&s&&hr(t,r,s),s};var lt=globalThis,ct=lt.ShadowRoot&&(lt.ShadyCSS===void 0||lt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,se=Symbol(),oe=new WeakMap,K=class{constructor(t,r,o){if(this._$cssResult$=!0,o!==se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o,r=this.t;if(ct&&t===void 0){let o=r!==void 0&&r.length===1;o&&(t=oe.get(r)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&oe.set(r,t))}return t}toString(){return this.cssText}},q=e=>new K(typeof e=="string"?e:e+"",void 0,se);var ne=(e,t)=>{if(ct)e.adoptedStyleSheets=t.map((r=>r instanceof CSSStyleSheet?r:r.styleSheet));else for(let r of t){let o=document.createElement("style"),s=lt.litNonce;s!==void 0&&o.setAttribute("nonce",s),o.textContent=r.cssText,e.appendChild(o)}},Ut=ct?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(let o of t.cssRules)r+=o.cssText;return q(r)})(e):e;var{is:mr,defineProperty:yr,getOwnPropertyDescriptor:gr,getOwnPropertyNames:br,getOwnPropertySymbols:xr,getPrototypeOf:vr}=Object,pt=globalThis,ie=pt.trustedTypes,Er=ie?ie.emptyScript:"",Ar=pt.reactiveElementPolyfillSupport,V=(e,t)=>e,J={toAttribute(e,t){switch(t){case Boolean:e=e?Er:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},dt=(e,t)=>!mr(e,t),ae={attribute:!0,type:String,converter:J,reflect:!1,useDefault:!1,hasChanged:dt};Symbol.metadata??=Symbol("metadata"),pt.litPropertyMetadata??=new WeakMap;var T=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,r=ae){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(t,r),!r.noAccessor){let o=Symbol(),s=this.getPropertyDescriptor(t,o,r);s!==void 0&&yr(this.prototype,t,s)}}static getPropertyDescriptor(t,r,o){let{get:s,set:n}=gr(this.prototype,t)??{get(){return this[r]},set(i){this[r]=i}};return{get:s,set(i){let l=s?.call(this);n?.call(this,i),this.requestUpdate(t,l,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ae}static _$Ei(){if(this.hasOwnProperty(V("elementProperties")))return;let t=vr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(V("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(V("properties"))){let r=this.properties,o=[...br(r),...xr(r)];for(let s of o)this.createProperty(s,r[s])}let t=this[Symbol.metadata];if(t!==null){let r=litPropertyMetadata.get(t);if(r!==void 0)for(let[o,s]of r)this.elementProperties.set(o,s)}this._$Eh=new Map;for(let[r,o]of this.elementProperties){let s=this._$Eu(r,o);s!==void 0&&this._$Eh.set(s,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let r=[];if(Array.isArray(t)){let o=new Set(t.flat(1/0).reverse());for(let s of o)r.unshift(Ut(s))}else t!==void 0&&r.push(Ut(t));return r}static _$Eu(t,r){let o=r.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,r=this.constructor.elementProperties;for(let o of r.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ne(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,r,o){this._$AK(t,o)}_$ET(t,r){let o=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,o);if(s!==void 0&&o.reflect===!0){let n=(o.converter?.toAttribute!==void 0?o.converter:J).toAttribute(r,o.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,r){let o=this.constructor,s=o._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=o.getPropertyOptions(s),i=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:J;this._$Em=s;let l=i.fromAttribute(r,n.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(t,r,o){if(t!==void 0){let s=this.constructor,n=this[t];if(o??=s.getPropertyOptions(t),!((o.hasChanged??dt)(n,r)||o.useDefault&&o.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,o))))return;this.C(t,r,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,r,{useDefault:o,reflect:s,wrapped:n},i){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??r??this[t]),n!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||o||(r=void 0),this._$AL.set(t,r)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[s,n]of o){let{wrapped:i}=n,l=this[s];i!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,n,l)}}let t=!1,r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(r)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(r)}willUpdate(t){}_$AE(t){this._$EO?.forEach((r=>r.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((r=>this._$ET(r,this[r]))),this._$EM()}updated(t){}firstUpdated(t){}};T.elementStyles=[],T.shadowRootOptions={mode:"open"},T[V("elementProperties")]=new Map,T[V("finalized")]=new Map,Ar?.({ReactiveElement:T}),(pt.reactiveElementVersions??=[]).push("2.1.1");var Ht=globalThis,ft=Ht.trustedTypes,le=ft?ft.createPolicy("lit-html",{createHTML:e=>e}):void 0,Bt="$lit$",O=`lit$${Math.random().toFixed(9).slice(2)}$`,It="?"+O,$r=`<${It}>`,M=document,G=()=>M.createComment(""),Z=e=>e===null||typeof e!="object"&&typeof e!="function",zt=Array.isArray,ue=e=>zt(e)||typeof e?.[Symbol.iterator]=="function",Nt=`[ 	
\f\r]`,F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ce=/-->/g,pe=/>/g,R=RegExp(`>|${Nt}(?:([^\\s"'>=/]+)(${Nt}*=${Nt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),de=/'/g,fe=/"/g,me=/^(?:script|style|textarea|title)$/i,Wt=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),bt=Wt(1),wr=Wt(2),ro=Wt(3),b=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),he=new WeakMap,D=M.createTreeWalker(M,129);function ye(e,t){if(!zt(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return le!==void 0?le.createHTML(t):t}var ge=(e,t)=>{let r=e.length-1,o=[],s,n=t===2?"<svg>":t===3?"<math>":"",i=F;for(let l=0;l<r;l++){let a=e[l],d,h,c=-1,f=0;for(;f<a.length&&(i.lastIndex=f,h=i.exec(a),h!==null);)f=i.lastIndex,i===F?h[1]==="!--"?i=ce:h[1]!==void 0?i=pe:h[2]!==void 0?(me.test(h[2])&&(s=RegExp("</"+h[2],"g")),i=R):h[3]!==void 0&&(i=R):i===R?h[0]===">"?(i=s??F,c=-1):h[1]===void 0?c=-2:(c=i.lastIndex-h[2].length,d=h[1],i=h[3]===void 0?R:h[3]==='"'?fe:de):i===fe||i===de?i=R:i===ce||i===pe?i=F:(i=R,s=void 0);let p=i===R&&e[l+1].startsWith("/>")?" ":"";n+=i===F?a+$r:c>=0?(o.push(d),a.slice(0,c)+Bt+a.slice(c)+O+p):a+O+(c===-2?l:p)}return[ye(e,n+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]},Y=class e{constructor({strings:t,_$litType$:r},o){let s;this.parts=[];let n=0,i=0,l=t.length-1,a=this.parts,[d,h]=ge(t,r);if(this.el=e.createElement(d,o),D.currentNode=this.el.content,r===2||r===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=D.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(Bt)){let f=h[i++],p=s.getAttribute(c).split(O),u=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:u[2],strings:p,ctor:u[1]==="."?ut:u[1]==="?"?mt:u[1]==="@"?yt:N}),s.removeAttribute(c)}else c.startsWith(O)&&(a.push({type:6,index:n}),s.removeAttribute(c));if(me.test(s.tagName)){let c=s.textContent.split(O),f=c.length-1;if(f>0){s.textContent=ft?ft.emptyScript:"";for(let p=0;p<f;p++)s.append(c[p],G()),D.nextNode(),a.push({type:2,index:++n});s.append(c[f],G())}}}else if(s.nodeType===8)if(s.data===It)a.push({type:2,index:n});else{let c=-1;for(;(c=s.data.indexOf(O,c+1))!==-1;)a.push({type:7,index:n}),c+=O.length-1}n++}}static createElement(t,r){let o=M.createElement("template");return o.innerHTML=t,o}};function U(e,t,r=e,o){if(t===b)return t;let s=o!==void 0?r._$Co?.[o]:r._$Cl,n=Z(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(e),s._$AT(e,r,o)),o!==void 0?(r._$Co??=[])[o]=s:r._$Cl=s),s!==void 0&&(t=U(e,s._$AS(e,t.values),s,o)),t}var ht=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:o}=this._$AD,s=(t?.creationScope??M).importNode(r,!0);D.currentNode=s;let n=D.nextNode(),i=0,l=0,a=o[0];for(;a!==void 0;){if(i===a.index){let d;a.type===2?d=new I(n,n.nextSibling,this,t):a.type===1?d=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(d=new gt(n,this,t)),this._$AV.push(d),a=o[++l]}i!==a?.index&&(n=D.nextNode(),i++)}return D.currentNode=M,s}p(t){let r=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,r),r+=o.strings.length-2):o._$AI(t[r])),r++}},I=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,o,s){this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=o,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=U(this,t,r),Z(t)?t===m||t==null||t===""?(this._$AH!==m&&this._$AR(),this._$AH=m):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ue(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==m&&Z(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:o}=t,s=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=Y.createElement(ye(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===s)this._$AH.p(r);else{let n=new ht(s,this),i=n.u(this.options);n.p(r),this.T(i),this._$AH=n}}_$AC(t){let r=he.get(t.strings);return r===void 0&&he.set(t.strings,r=new Y(t)),r}k(t){zt(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,o,s=0;for(let n of t)s===r.length?r.push(o=new e(this.O(G()),this.O(G()),this,this.options)):o=r[s],o._$AI(n),s++;s<r.length&&(this._$AR(o&&o._$AB.nextSibling,s),r.length=s)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let o=t.nextSibling;t.remove(),t=o}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},N=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,o,s,n){this.type=1,this._$AH=m,this._$AN=void 0,this.element=t,this.name=r,this._$AM=s,this.options=n,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=m}_$AI(t,r=this,o,s){let n=this.strings,i=!1;if(n===void 0)t=U(this,t,r,0),i=!Z(t)||t!==this._$AH&&t!==b,i&&(this._$AH=t);else{let l=t,a,d;for(t=n[0],a=0;a<n.length-1;a++)d=U(this,l[o+a],r,a),d===b&&(d=this._$AH[a]),i||=!Z(d)||d!==this._$AH[a],d===m?t=m:t!==m&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}i&&!s&&this.j(t)}j(t){t===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ut=class extends N{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===m?void 0:t}},mt=class extends N{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==m)}},yt=class extends N{constructor(t,r,o,s,n){super(t,r,o,s,n),this.type=5}_$AI(t,r=this){if((t=U(this,t,r,0)??m)===b)return;let o=this._$AH,s=t===m&&o!==m||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,n=t!==m&&(o===m||s);s&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},gt=class{constructor(t,r,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){U(this,t)}},be={M:Bt,P:O,A:It,C:1,L:ge,R:ht,D:ue,V:U,I,H:N,N:mt,U:yt,B:ut,F:gt},kr=Ht.litHtmlPolyfillSupport;kr?.(Y,I),(Ht.litHtmlVersions??=[]).push("3.3.1");var Q=(e,t,r)=>{let o=r?.renderBefore??t,s=o._$litPart$;if(s===void 0){let n=r?.renderBefore??null;o._$litPart$=s=new I(t.insertBefore(G(),n),n,void 0,r??{})}return s._$AI(e),s};var Kt=globalThis,S=class extends T{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Q(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};S._$litElement$=!0,S.finalized=!0,Kt.litElementHydrateSupport?.({LitElement:S});var _r=Kt.litElementPolyfillSupport;_r?.({LitElement:S});(Kt.litElementVersions??=[]).push("4.2.1");var qt=e=>(t,r)=>{r!==void 0?r.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};var Sr={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:dt},Cr=(e=Sr,t,r)=>{let{kind:o,metadata:s}=r,n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),o==="setter"&&((e=Object.create(e)).wrapped=!0),n.set(r.name,e),o==="accessor"){let{name:i}=r;return{set(l){let a=t.get.call(this);t.set.call(this,l),this.requestUpdate(i,a,e)},init(l){return l!==void 0&&this.C(i,void 0,e,l),l}}}if(o==="setter"){let{name:i}=r;return function(l){let a=this[i];t.call(this,l),this.requestUpdate(i,a,e)}}throw Error("Unsupported decorator location: "+o)};function w(e){return(t,r)=>typeof r=="object"?Cr(e,t,r):((o,s,n)=>{let i=s.hasOwnProperty(n);return s.constructor.createProperty(n,o),i?Object.getOwnPropertyDescriptor(s,n):void 0})(e,t,r)}function H(e){return w({...e,state:!0,attribute:!1})}var v={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},C=e=>(...t)=>({_$litDirective$:e,values:t}),$=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,o){this._$Ct=t,this._$AM=r,this._$Ci=o}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Tr=C(class extends ${constructor(e){if(super(e),e.type!==v.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(let o in t)t[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(t)}let r=e.element.classList;for(let o of this.st)o in t||(r.remove(o),this.st.delete(o));for(let o in t){let s=!!t[o];s===this.st.has(o)||this.nt?.has(o)||(s?(r.add(o),this.st.add(o)):(r.remove(o),this.st.delete(o)))}return b}});var{I:Or}=be;var ve=e=>e.strings===void 0,xe=()=>document.createComment(""),z=(e,t,r)=>{let o=e._$AA.parentNode,s=t===void 0?e._$AB:t._$AA;if(r===void 0){let n=o.insertBefore(xe(),s),i=o.insertBefore(xe(),s);r=new Or(n,i,e,e.options)}else{let n=r._$AB.nextSibling,i=r._$AM,l=i!==e;if(l){let a;r._$AQ?.(e),r._$AM=e,r._$AP!==void 0&&(a=e._$AU)!==i._$AU&&r._$AP(a)}if(n!==s||l){let a=r._$AA;for(;a!==n;){let d=a.nextSibling;o.insertBefore(a,s),a=d}}}return r},j=(e,t,r=e)=>(e._$AI(t,r),e),Pr={},vt=(e,t=Pr)=>e._$AH=t,Ee=e=>e._$AH,Et=e=>{e._$AR(),e._$AA.remove()};var Lr=C(class extends ${constructor(e){if(super(e),e.type!==v.PROPERTY&&e.type!==v.ATTRIBUTE&&e.type!==v.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ve(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===b||t===m)return t;let r=e.element,o=e.name;if(e.type===v.PROPERTY){if(t===r[o])return b}else if(e.type===v.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(o))return b}else if(e.type===v.ATTRIBUTE&&r.getAttribute(o)===t+"")return b;return vt(e),t}});var Ae=(e,t,r)=>{let o=new Map;for(let s=t;s<=r;s++)o.set(e[s],s);return o},jr=C(class extends ${constructor(e){if(super(e),e.type!==v.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,r){let o;r===void 0?r=t:t!==void 0&&(o=t);let s=[],n=[],i=0;for(let l of e)s[i]=o?o(l,i):i,n[i]=r(l,i),i++;return{values:n,keys:s}}render(e,t,r){return this.dt(e,t,r).values}update(e,[t,r,o]){let s=Ee(e),{values:n,keys:i}=this.dt(t,r,o);if(!Array.isArray(s))return this.ut=i,n;let l=this.ut??=[],a=[],d,h,c=0,f=s.length-1,p=0,u=n.length-1;for(;c<=f&&p<=u;)if(s[c]===null)c++;else if(s[f]===null)f--;else if(l[c]===i[p])a[p]=j(s[c],n[p]),c++,p++;else if(l[f]===i[u])a[u]=j(s[f],n[u]),f--,u--;else if(l[c]===i[u])a[u]=j(s[c],n[u]),z(e,a[u+1],s[c]),c++,u--;else if(l[f]===i[p])a[p]=j(s[f],n[p]),z(e,s[c],s[f]),f--,p++;else if(d===void 0&&(d=Ae(i,p,u),h=Ae(l,c,f)),d.has(l[c]))if(d.has(l[f])){let E=h.get(i[p]),Mt=E!==void 0?s[E]:null;if(Mt===null){let re=z(e,s[c]);j(re,n[p]),a[p]=re}else a[p]=j(Mt,n[p]),z(e,s[c],Mt),s[E]=null;p++}else Et(s[f]),f--;else Et(s[c]),c++;for(;p<=u;){let E=z(e,a[u+1]);j(E,n[p]),a[p++]=E}for(;c<=f;){let E=s[c++];E!==null&&Et(E)}return this.ut=i,vt(e,a),b}});var $e="important",Rr=" !"+$e,Dr=C(class extends ${constructor(e){if(super(e),e.type!==v.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,r)=>{let o=e[r];return o==null?t:t+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`}),"")}update(e,[t]){let{style:r}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let o of this.ft)t[o]==null&&(this.ft.delete(o),o.includes("-")?r.removeProperty(o):r[o]=null);for(let o in t){let s=t[o];if(s!=null){this.ft.add(o);let n=typeof s=="string"&&s.endsWith(Rr);o.includes("-")||n?r.setProperty(o,n?s.slice(0,-11):s,n?$e:""):r[o]=s}}return b}});var X=class extends ${constructor(t){if(super(t),this.it=m,t.type!==v.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===m||t==null)return this._t=void 0,this.it=t;if(t===b)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};X.directiveName="unsafeHTML",X.resultType=1;var Mr=C(X);var Vt=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function Jt(e,t,r,o){e.addEventListener?e.addEventListener(t,r,o):e.attachEvent&&e.attachEvent(`on${t}`,r)}function tt(e,t,r,o){e&&(e.removeEventListener?e.removeEventListener(t,r,o):e.detachEvent&&e.detachEvent(`on${t}`,r))}function _e(e,t){let r=t.slice(0,t.length-1),o=[];for(let s=0;s<r.length;s++)o.push(e[r[s].toLowerCase()]);return o}function Se(e){typeof e!="string"&&(e=""),e=e.replace(/\s/g,"");let t=e.split(","),r=t.lastIndexOf("");for(;r>=0;)t[r-1]+=",",t.splice(r,1),r=t.lastIndexOf("");return t}function Ur(e,t){let r=e.length>=t.length?e:t,o=e.length>=t.length?t:e,s=!0;for(let n=0;n<r.length;n++)o.indexOf(r[n])===-1&&(s=!1);return s}function Ce(e){let t=e.keyCode||e.which||e.charCode;return e.code&&/^Key[A-Z]$/.test(e.code)&&(t=e.code.charCodeAt(3)),t}var ot={backspace:8,"\u232B":8,tab:9,clear:12,enter:13,"\u21A9":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,arrowup:38,arrowdown:40,arrowleft:37,arrowright:39,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"\u21EA":20,",":188,".":190,"/":191,"`":192,"-":Vt?173:189,"=":Vt?61:187,";":Vt?59:186,"'":222,"{":219,"}":221,"[":219,"]":221,"\\":220},k={"\u21E7":16,shift:16,"\u2325":18,alt:18,option:18,"\u2303":17,ctrl:17,control:17,"\u2318":91,cmd:91,meta:91,command:91},et={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},x={16:!1,18:!1,17:!1,91:!1},g={};for(let e=1;e<20;e++)ot[`f${e}`]=111+e;var y=[],rt=null,Te="all",P=new Map,W=e=>ot[e.toLowerCase()]||k[e.toLowerCase()]||e.toUpperCase().charCodeAt(0),Nr=e=>Object.keys(ot).find(t=>ot[t]===e),Hr=e=>Object.keys(k).find(t=>k[t]===e),Oe=e=>{Te=e||"all"},st=()=>Te||"all",Br=()=>y.slice(0),Ir=()=>y.map(e=>Nr(e)||Hr(e)||String.fromCharCode(e)),zr=()=>{let e=[];return Object.keys(g).forEach(t=>{g[t].forEach(({key:r,scope:o,mods:s,shortcut:n})=>{e.push({scope:o,shortcut:n,mods:s,keys:r.split("+").map(i=>W(i))})})}),e},Pe=e=>{let t=e.target||e.srcElement,{tagName:r}=t,o=!0,s=r==="INPUT"&&!["checkbox","radio","range","button","file","reset","submit","color"].includes(t.type);return(t.isContentEditable||(s||r==="TEXTAREA"||r==="SELECT")&&!t.readOnly)&&(o=!1),o},Wr=e=>(typeof e=="string"&&(e=W(e)),y.indexOf(e)!==-1),Kr=(e,t)=>{let r,o;e||(e=st());for(let s in g)if(Object.prototype.hasOwnProperty.call(g,s))for(r=g[s],o=0;o<r.length;)r[o].scope===e?r.splice(o,1).forEach(({element:n})=>Gt(n)):o++;st()===e&&Oe(t||"all")};function qr(e){let t=Ce(e);e.key&&e.key.toLowerCase()==="capslock"&&(t=W(e.key));let r=y.indexOf(t);if(r>=0&&y.splice(r,1),e.key&&e.key.toLowerCase()==="meta"&&y.splice(0,y.length),(t===93||t===224)&&(t=91),t in x){x[t]=!1;for(let o in k)k[o]===t&&(L[o]=!1)}}var Le=(e,...t)=>{if(typeof e>"u")Object.keys(g).forEach(r=>{Array.isArray(g[r])&&g[r].forEach(o=>At(o)),delete g[r]}),Gt(null);else if(Array.isArray(e))e.forEach(r=>{r.key&&At(r)});else if(typeof e=="object")e.key&&At(e);else if(typeof e=="string"){let[r,o]=t;typeof r=="function"&&(o=r,r=""),At({key:e,scope:r,method:o,splitKey:"+"})}},At=({key:e,scope:t,method:r,splitKey:o="+"})=>{Se(e).forEach(s=>{let n=s.split(o),i=n.length,l=n[i-1],a=l==="*"?"*":W(l);if(!g[a])return;t||(t=st());let d=i>1?_e(k,n):[],h=[];g[a]=g[a].filter(c=>{let f=(r?c.method===r:!0)&&c.scope===t&&Ur(c.mods,d);return f&&h.push(c.element),!f}),h.forEach(c=>Gt(c))})};function we(e,t,r,o){if(t.element!==o)return;let s;if(t.scope===r||t.scope==="all"){s=t.mods.length>0;for(let n in x)Object.prototype.hasOwnProperty.call(x,n)&&(!x[n]&&t.mods.indexOf(+n)>-1||x[n]&&t.mods.indexOf(+n)===-1)&&(s=!1);(t.mods.length===0&&!x[16]&&!x[18]&&!x[17]&&!x[91]||s||t.shortcut==="*")&&(t.keys=[],t.keys=t.keys.concat(y),t.method(e,t)===!1&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0)))}}function ke(e,t){let r=g["*"],o=Ce(e);if(e.key&&e.key.toLowerCase()==="capslock"||!(L.filter||Pe).call(this,e))return;if((o===93||o===224)&&(o=91),y.indexOf(o)===-1&&o!==229&&y.push(o),["metaKey","ctrlKey","altKey","shiftKey"].forEach(l=>{let a=et[l];e[l]&&y.indexOf(a)===-1?y.push(a):!e[l]&&y.indexOf(a)>-1?y.splice(y.indexOf(a),1):l==="metaKey"&&e[l]&&(y=y.filter(d=>d in et||d===o))}),o in x){x[o]=!0;for(let l in k)if(Object.prototype.hasOwnProperty.call(k,l)){let a=et[k[l]];L[l]=e[a]}if(!r)return}for(let l in x)Object.prototype.hasOwnProperty.call(x,l)&&(x[l]=e[et[l]]);e.getModifierState&&!(e.altKey&&!e.ctrlKey)&&e.getModifierState("AltGraph")&&(y.indexOf(17)===-1&&y.push(17),y.indexOf(18)===-1&&y.push(18),x[17]=!0,x[18]=!0);let s=st();if(r)for(let l=0;l<r.length;l++)r[l].scope===s&&(e.type==="keydown"&&r[l].keydown||e.type==="keyup"&&r[l].keyup)&&we(e,r[l],s,t);if(!(o in g))return;let n=g[o],i=n.length;for(let l=0;l<i;l++)if((e.type==="keydown"&&n[l].keydown||e.type==="keyup"&&n[l].keyup)&&n[l].key){let a=n[l],{splitKey:d}=a,h=a.key.split(d),c=[];for(let f=0;f<h.length;f++)c.push(W(h[f]));c.sort().join("")===y.sort().join("")&&we(e,a,s,t)}}var L=function(e,t,r){y=[];let o=Se(e),s=[],n="all",i=document,l=0,a=!1,d=!0,h="+",c=!1,f=!1;if(r===void 0&&typeof t=="function"&&(r=t),Object.prototype.toString.call(t)==="[object Object]"){let p=t;p.scope&&(n=p.scope),p.element&&(i=p.element),p.keyup&&(a=p.keyup),p.keydown!==void 0&&(d=p.keydown),p.capture!==void 0&&(c=p.capture),typeof p.splitKey=="string"&&(h=p.splitKey),p.single===!0&&(f=!0)}for(typeof t=="string"&&(n=t),f&&Le(e,n);l<o.length;l++){let p=o[l].split(h);s=[],p.length>1&&(s=_e(k,p));let u=p[p.length-1];u=u==="*"?"*":W(u),u in g||(g[u]=[]),g[u].push({keyup:a,keydown:d,scope:n,mods:s,shortcut:o[l],method:r,key:o[l],splitKey:h,element:i})}if(typeof i<"u"&&typeof window<"u"){if(!P.has(i)){let p=(E=window.event)=>ke(E,i),u=(E=window.event)=>{ke(E,i),qr(E)};P.set(i,{keydownListener:p,keyupListenr:u,capture:c}),Jt(i,"keydown",p,c),Jt(i,"keyup",u,c)}if(!rt){let p=()=>{y=[]};rt={listener:p,capture:c},Jt(window,"focus",p,c)}}};function Vr(e,t="all"){Object.keys(g).forEach(r=>{g[r].filter(o=>o.scope===t&&o.shortcut===e).forEach(o=>{o&&o.method&&o.method({},o)})})}function Gt(e){let t=Object.values(g).flat();if(t.findIndex(({element:r})=>r===e)<0&&e){let{keydownListener:r,keyupListenr:o,capture:s}=P.get(e)||{};r&&o&&(tt(e,"keyup",o,s),tt(e,"keydown",r,s),P.delete(e))}if((t.length<=0||P.size<=0)&&(Array.from(P.keys()).forEach(r=>{let{keydownListener:o,keyupListenr:s,capture:n}=P.get(r)||{};o&&s&&(tt(r,"keyup",s,n),tt(r,"keydown",o,n),P.delete(r))}),P.clear(),Object.keys(g).forEach(r=>delete g[r]),rt)){let{listener:r,capture:o}=rt;tt(window,"focus",r,o),rt=null}}var Ft={getPressedKeyString:Ir,setScope:Oe,getScope:st,deleteScope:Kr,getPressedKeyCodes:Br,getAllKeyCodes:zr,isPressed:Wr,filter:Pe,trigger:Vr,unbind:Le,keyMap:ot,modifier:k,modifierMap:et};for(let e in Ft){let t=e;Object.prototype.hasOwnProperty.call(Ft,t)&&(L[t]=Ft[t])}if(typeof window<"u"){let e=window.hotkeys;L.noConflict=t=>(t&&window.hotkeys===L&&(window.hotkeys=e),L),window.hotkeys=L}var je=e=>{class t extends e{constructor(){super(...arguments);this.#t=!1;this.initialReflectedProperties=new Map}#t;attributeChangedCallback(s,n,i){if(!this.#t){let l=this;this.constructor.elementProperties.forEach((a,d)=>{a.reflect&&l[d]!=null&&this.initialReflectedProperties.set(d,l[d])}),this.initialReflectedProperties.set("slot",this.slot),this.#t=!0}super.attributeChangedCallback?.(s,n,i)}willUpdate(s){super.willUpdate?.(s);let n=this;this.initialReflectedProperties.forEach((i,l)=>{s.has(l)&&n[l]==null&&(n[l]=i)})}}return A([H()],t.prototype,"initialReflectedProperties",2),t};function Re(){}function Zt(e){return Object.getOwnPropertySymbols(e).filter(t=>Object.prototype.propertyIsEnumerable.call(e,t))}function Yt(e){return e==null?e===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}var De="[object RegExp]",Me="[object String]",Ue="[object Number]",Ne="[object Boolean]",Qt="[object Arguments]",He="[object Symbol]",Be="[object Date]",Ie="[object Map]",ze="[object Set]",We="[object Array]",Ke="[object Function]",qe="[object ArrayBuffer]",$t="[object Object]",Ve="[object Error]",Je="[object DataView]",Fe="[object Uint8Array]",Ge="[object Uint8ClampedArray]",Ze="[object Uint16Array]",Ye="[object Uint32Array]",Qe="[object BigUint64Array]",Xe="[object Int8Array]",tr="[object Int16Array]",er="[object Int32Array]",rr="[object BigInt64Array]",or="[object Float32Array]",sr="[object Float64Array]";function B(e){if(!e||typeof e!="object")return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype||Object.getPrototypeOf(t)===null?Object.prototype.toString.call(e)==="[object Object]":!1}var Jr=/\p{Lu}?\p{Ll}+|[0-9]+|\p{Lu}+(?!\p{Ll})|\p{Emoji_Presentation}|\p{Extended_Pictographic}|\p{L}+/gu;function nr(e){return Array.from(e.match(Jr)??[])}function ir(e,t){return e===t||Number.isNaN(e)&&Number.isNaN(t)}function ar(e,t,r){return nt(e,t,void 0,void 0,void 0,void 0,r)}function nt(e,t,r,o,s,n,i){let l=i(e,t,r,o,s,n);if(l!==void 0)return l;if(typeof e==typeof t)switch(typeof e){case"bigint":case"string":case"boolean":case"symbol":case"undefined":return e===t;case"number":return e===t||Object.is(e,t);case"function":return e===t;case"object":return it(e,t,n,i)}return it(e,t,n,i)}function it(e,t,r,o){if(Object.is(e,t))return!0;let s=Yt(e),n=Yt(t);if(s===Qt&&(s=$t),n===Qt&&(n=$t),s!==n)return!1;switch(s){case Me:return e.toString()===t.toString();case Ue:{let a=e.valueOf(),d=t.valueOf();return ir(a,d)}case Ne:case Be:case He:return Object.is(e.valueOf(),t.valueOf());case De:return e.source===t.source&&e.flags===t.flags;case Ke:return e===t}r=r??new Map;let i=r.get(e),l=r.get(t);if(i!=null&&l!=null)return i===t;r.set(e,t),r.set(t,e);try{switch(s){case Ie:{if(e.size!==t.size)return!1;for(let[a,d]of e.entries())if(!t.has(a)||!nt(d,t.get(a),a,e,t,r,o))return!1;return!0}case ze:{if(e.size!==t.size)return!1;let a=Array.from(e.values()),d=Array.from(t.values());for(let h=0;h<a.length;h++){let c=a[h],f=d.findIndex(p=>nt(c,p,void 0,e,t,r,o));if(f===-1)return!1;d.splice(f,1)}return!0}case We:case Fe:case Ge:case Ze:case Ye:case Qe:case Xe:case tr:case er:case rr:case or:case sr:{if(typeof Buffer<"u"&&Buffer.isBuffer(e)!==Buffer.isBuffer(t)||e.length!==t.length)return!1;for(let a=0;a<e.length;a++)if(!nt(e[a],t[a],a,e,t,r,o))return!1;return!0}case qe:return e.byteLength!==t.byteLength?!1:it(new Uint8Array(e),new Uint8Array(t),r,o);case Je:return e.byteLength!==t.byteLength||e.byteOffset!==t.byteOffset?!1:it(new Uint8Array(e),new Uint8Array(t),r,o);case Ve:return e.name===t.name&&e.message===t.message;case $t:{if(!(it(e.constructor,t.constructor,r,o)||B(e)&&B(t)))return!1;let d=[...Object.keys(e),...Zt(e)],h=[...Object.keys(t),...Zt(t)];if(d.length!==h.length)return!1;for(let c=0;c<d.length;c++){let f=d[c],p=e[f];if(!Object.hasOwn(t,f))return!1;let u=t[f];if(!nt(p,u,f,e,t,r,o))return!1}return!0}default:return!1}}finally{r.delete(e),r.delete(t)}}function Xt(e,t){return ar(e,t,Re)}function te(e){return e!=null}function wt(e){return typeof e=="string"}function ee(e){let t=nr(e.trim()),r="";for(let o=0;o<t.length;o++){let s=t[o];r&&(r+=" "),r+=s[0].toUpperCase()+s.slice(1).toLowerCase()}return r}var kt=class extends Event{constructor(t,r){super(t,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=r}};var _t=class extends kt{constructor(t,r={}){super("lb-command",{bubbles:!0,cancelable:!1,composed:!0}),this.command=t,this.detail=r}};var St=class extends Event{constructor(t={value:void 0,oldValue:void 0}){super("lb-data",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ct=class extends Event{constructor(t={}){super("lb-display-mode-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Tt=class extends Event{constructor(t){super("lb-drag-end",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ot=class extends Event{constructor(t){super("lb-drag-start",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Pt=class extends Event{constructor(t={}){super("lb-error",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Lt=class extends Event{constructor(t={}){super("lb-param-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var jt=class extends Event{constructor(t){super("lb-popover-close",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Rt=class extends Event{constructor(t){super("lb-popover-open",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Dt=class extends Event{constructor(t){super("lb-resize",{bubbles:!1,cancelable:!1,composed:!0}),this.detail=t}};var lr={"lb-command":_t,"lb-data":St,"lb-drag-start":Ot,"lb-drag-end":Tt,"lb-error":Pt,"lb-resize":Dt,"lb-popover-open":Rt,"lb-popover-close":jt,"lb-param-change":Lt,"lb-display-mode-change":Ct};function cr(e){return lr[e]}function pr(e,t){return!Xt(e,t)}var dr=`:host {
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
`;var at=class extends je(S){constructor(){super();this.cleanupJobs=[]}static{this.shadowRootOptions={...S.shadowRootOptions,serializable:!0}}static{this.morphable=!0}static get styles(){let r=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[dr,...r].map(o=>typeof o=="string"?q(o):o)}afterMorph(){}get morphable(){return!!this.getStaticProperty("morphable")}disconnectedCallback(){this.cleanupJobs.forEach(r=>r()),super.disconnectedCallback()}addCleanupJob(r){this.cleanupJobs.push(r)}renderToTarget(r,o){Q(o,r)}on(r,o){this.addEventListener(r,o),this.addCleanupJob(()=>this.removeEventListener(r,o))}delegate(r,o){document.addEventListener(r,o),this.addCleanupJob(()=>document.removeEventListener(r,o))}dispatch(r,...o){let s=cr(r),n=this;if(!s){console.warn(`Unknown event type '${r}'`);return}let i=null;if(B(o[0])?(i=o[0],o=[]):o.length>0&&B(o[o.length-1])&&(i=o.pop()),i?.target){let a=wt(i.target)?document.querySelector(`#${i.target}`):n;a&&(n=a)}let l=[...o,i].filter(te);n.dispatchEvent(new s(...l))}getStaticProperty(r){return this.constructor[r]}warn(r){wt(r)&&(r=new Error(r)),this.dispatch("lb-error",{error:r}),console.error(r)}};A([H()],at.prototype,"cleanupJobs",2);var fr=`:host {
  height: 100%;
  overflow: hidden;
  display: none;
  background-color: var(--lookbook-surface-1);
}
:host([visible]) {
  display: block;
}
#container {
  display: contents;
}
#scroller {
  height: 100%;
  overflow: auto;
}
lb-toolbar {
  background-color: var(--lookbook-surface-1);
}
`;var _=class extends at{constructor(){super(...arguments);this.surface=1;this.active=!1;this.visible=!1}firstUpdated(r){super.firstUpdated(r),this.label=this.label||ee(this.name),this.role=this.role||"tabpanel"}handleDataChange(r){this.data=r.detail.value}render(){return bt`
      <div
        id="container"
        @lb-data="${r=>this.handleDataChange(r)}"
      >
        <div id="scroller">
          <slot></slot>
        </div>
      </div>
    `}};_.css=fr,A([w()],_.prototype,"name",2),A([w()],_.prototype,"label",2),A([w({type:Number})],_.prototype,"surface",2),A([w({hasChanged:pr})],_.prototype,"data",2),A([w({reflect:!0,type:Boolean})],_.prototype,"active",2),A([w({reflect:!0,type:Boolean})],_.prototype,"visible",2),_=A([qt("lb-panel")],_);export{_ as LookbookPanel};
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
