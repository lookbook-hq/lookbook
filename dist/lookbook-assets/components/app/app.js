var Dr=Object.defineProperty;var Lr=Object.getOwnPropertyDescriptor;var v=(e,t,r,o)=>{for(var i=o>1?void 0:o?Lr(t,r):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(i=(o?n(t,r,i):n(i))||i);return o&&i&&Dr(t,r,i),i};function Se(e,t){function r(i){let s=e.getBoundingClientRect(),n=e.ownerDocument.defaultView,a=s.left+n.pageXOffset,l=s.top+n.pageYOffset,f=i.pageX-a,d=i.pageY-l;t?.onMove&&t.onMove(f,d)}function o(){document.removeEventListener("pointermove",r),document.removeEventListener("pointerup",o),t?.onStop&&t.onStop()}document.addEventListener("pointermove",r,{passive:!0}),document.addEventListener("pointerup",o),t?.initialEvent instanceof PointerEvent&&r(t.initialEvent)}var Co=typeof window<"u"&&"ontouchstart"in window;var $e=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};function Xt(e,t,r){let o=i=>Object.is(i,-0)?0:i;return e<t?o(t):e>r?o(r):o(e)}var Zt=new Set,K=new Map,N,Qt="ltr",te="en",Ae=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Ae){let e=new MutationObserver(_e);Qt=document.documentElement.dir||"ltr",te=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function tt(...e){e.map(t=>{let r=t.$code.toLowerCase();K.has(r)?K.set(r,Object.assign(Object.assign({},K.get(r)),t)):K.set(r,t),N||(N=t)}),_e()}function _e(){Ae&&(Qt=document.documentElement.dir||"ltr",te=document.documentElement.lang||navigator.language),[...Zt.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate()})}var bt=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){Zt.add(this.host)}hostDisconnected(){Zt.delete(this.host)}dir(){return`${this.host.dir||Qt}`.toLowerCase()}lang(){return`${this.host.lang||te}`.toLowerCase()}getTranslationData(t){var r,o;let i=new Intl.Locale(t.replace(/_/g,"-")),s=i?.language.toLowerCase(),n=(o=(r=i?.region)===null||r===void 0?void 0:r.toLowerCase())!==null&&o!==void 0?o:"",a=K.get(`${s}-${n}`),l=K.get(s);return{locale:i,language:s,region:n,primary:a,secondary:l}}exists(t,r){var o;let{primary:i,secondary:s}=this.getTranslationData((o=r.lang)!==null&&o!==void 0?o:this.lang());return r=Object.assign({includeFallback:!1},r),!!(i&&i[t]||s&&s[t]||r.includeFallback&&N&&N[t])}term(t,...r){let{primary:o,secondary:i}=this.getTranslationData(this.lang()),s;if(o&&o[t])s=o[t];else if(i&&i[t])s=i[t];else if(N&&N[t])s=N[t];else return console.error(`No translation found for: ${String(t)}`),String(t);return typeof s=="function"?s(...r):s}date(t,r){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),r).format(t)}number(t,r){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),r).format(t)}relativeTime(t,r,o){return new Intl.RelativeTimeFormat(this.lang(),o).format(t,r)}};var ke={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>e===0?"No options selected":e===1?"1 option selected":`${e} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};tt(ke);var Ce=ke;var Pe=class extends bt{};tt(Ce);function vt(e,t){let r={waitUntilFirstUpdate:!1,...t};return(o,i)=>{let{update:s}=o,n=Array.isArray(e)?e:[e];o.update=function(a){n.forEach(l=>{let f=l;if(a.has(f)){let d=a.get(f),p=this[f];d!==p&&(!r.waitUntilFirstUpdate||this.hasUpdated)&&this[i](d,p)}}),s.call(this,a)}}}var Rr=Object.defineProperty,Mr=Object.getOwnPropertyDescriptor,Oe=e=>{throw TypeError(e)},w=(e,t,r,o)=>{for(var i=o>1?void 0:o?Mr(t,r):t,s=e.length-1,n;s>=0;s--)(n=e[s])&&(i=(o?n(t,r,i):n(i))||i);return o&&i&&Rr(t,r,i),i},Te=(e,t,r)=>t.has(e)||Oe("Cannot "+r),De=(e,t,r)=>(Te(e,t,"read from private field"),r?r.call(e):t.get(e)),Le=(e,t,r)=>t.has(e)?Oe("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),Re=(e,t,r,o)=>(Te(e,t,"write to private field"),o?o.call(e,r):t.set(e,r),r);var wt=globalThis,Et=wt.ShadowRoot&&(wt.ShadyCSS===void 0||wt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ie=Symbol(),Me=new WeakMap,et=class{constructor(t,r,o){if(this._$cssResult$=!0,o!==Ie)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=r}get styleSheet(){let t=this.o,r=this.t;if(Et&&t===void 0){let o=r!==void 0&&r.length===1;o&&(t=Me.get(r)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),o&&Me.set(r,t))}return t}toString(){return this.cssText}},B=e=>new et(typeof e=="string"?e:e+"",void 0,Ie);var Ne=(e,t)=>{if(Et)e.adoptedStyleSheets=t.map((r=>r instanceof CSSStyleSheet?r:r.styleSheet));else for(let r of t){let o=document.createElement("style"),i=wt.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=r.cssText,e.appendChild(o)}},ee=Et?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let r="";for(let o of t.cssRules)r+=o.cssText;return B(r)})(e):e;var{is:Ir,defineProperty:Nr,getOwnPropertyDescriptor:Br,getOwnPropertyNames:zr,getOwnPropertySymbols:Ur,getPrototypeOf:jr}=Object,St=globalThis,Be=St.trustedTypes,Wr=Be?Be.emptyScript:"",Hr=St.reactiveElementPolyfillSupport,rt=(e,t)=>e,ot={toAttribute(e,t){switch(t){case Boolean:e=e?Wr:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=e!==null;break;case Number:r=e===null?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch{r=null}}return r}},$t=(e,t)=>!Ir(e,t),ze={attribute:!0,type:String,converter:ot,reflect:!1,useDefault:!1,hasChanged:$t};Symbol.metadata??=Symbol("metadata"),St.litPropertyMetadata??=new WeakMap;var D=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,r=ze){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(t,r),!r.noAccessor){let o=Symbol(),i=this.getPropertyDescriptor(t,o,r);i!==void 0&&Nr(this.prototype,t,i)}}static getPropertyDescriptor(t,r,o){let{get:i,set:s}=Br(this.prototype,t)??{get(){return this[r]},set(n){this[r]=n}};return{get:i,set(n){let a=i?.call(this);s?.call(this,n),this.requestUpdate(t,a,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ze}static _$Ei(){if(this.hasOwnProperty(rt("elementProperties")))return;let t=jr(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(rt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(rt("properties"))){let r=this.properties,o=[...zr(r),...Ur(r)];for(let i of o)this.createProperty(i,r[i])}let t=this[Symbol.metadata];if(t!==null){let r=litPropertyMetadata.get(t);if(r!==void 0)for(let[o,i]of r)this.elementProperties.set(o,i)}this._$Eh=new Map;for(let[r,o]of this.elementProperties){let i=this._$Eu(r,o);i!==void 0&&this._$Eh.set(i,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let r=[];if(Array.isArray(t)){let o=new Set(t.flat(1/0).reverse());for(let i of o)r.unshift(ee(i))}else t!==void 0&&r.push(ee(t));return r}static _$Eu(t,r){let o=r.attribute;return o===!1?void 0:typeof o=="string"?o:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,r=this.constructor.elementProperties;for(let o of r.keys())this.hasOwnProperty(o)&&(t.set(o,this[o]),delete this[o]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ne(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,r,o){this._$AK(t,o)}_$ET(t,r){let o=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,o);if(i!==void 0&&o.reflect===!0){let s=(o.converter?.toAttribute!==void 0?o.converter:ot).toAttribute(r,o.type);this._$Em=t,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(t,r){let o=this.constructor,i=o._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let s=o.getPropertyOptions(i),n=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:ot;this._$Em=i;let a=n.fromAttribute(r,s.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,r,o){if(t!==void 0){let i=this.constructor,s=this[t];if(o??=i.getPropertyOptions(t),!((o.hasChanged??$t)(s,r)||o.useDefault&&o.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,o))))return;this.C(t,r,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,r,{useDefault:o,reflect:i,wrapped:s},n){o&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??r??this[t]),s!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||o||(r=void 0),this._$AL.set(t,r)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}let o=this.constructor.elementProperties;if(o.size>0)for(let[i,s]of o){let{wrapped:n}=s,a=this[i];n!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,s,a)}}let t=!1,r=this._$AL;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),this._$EO?.forEach((o=>o.hostUpdate?.())),this.update(r)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(r)}willUpdate(t){}_$AE(t){this._$EO?.forEach((r=>r.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((r=>this._$ET(r,this[r]))),this._$EM()}updated(t){}firstUpdated(t){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[rt("elementProperties")]=new Map,D[rt("finalized")]=new Map,Hr?.({ReactiveElement:D}),(St.reactiveElementVersions??=[]).push("2.1.1");var oe=globalThis,At=oe.trustedTypes,Ue=At?At.createPolicy("lit-html",{createHTML:e=>e}):void 0,ie="$lit$",L=`lit$${Math.random().toFixed(9).slice(2)}$`,se="?"+L,qr=`<${se}>`,j=document,st=()=>j.createComment(""),nt=e=>e===null||typeof e!="object"&&typeof e!="function",ne=Array.isArray,Ve=e=>ne(e)||typeof e?.[Symbol.iterator]=="function",re=`[ 	
\f\r]`,it=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,je=/-->/g,We=/>/g,z=RegExp(`>|${re}(?:([^\\s"'>=/]+)(${re}*=${re}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),He=/'/g,qe=/"/g,Fe=/^(?:script|style|textarea|title)$/i,ae=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),F=ae(1),Kr=ae(2),Jo=ae(3),b=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),Ke=new WeakMap,U=j.createTreeWalker(j,129);function Je(e,t){if(!ne(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ue!==void 0?Ue.createHTML(t):t}var Ge=(e,t)=>{let r=e.length-1,o=[],i,s=t===2?"<svg>":t===3?"<math>":"",n=it;for(let a=0;a<r;a++){let l=e[a],f,d,p=-1,m=0;for(;m<l.length&&(n.lastIndex=m,d=n.exec(l),d!==null);)m=n.lastIndex,n===it?d[1]==="!--"?n=je:d[1]!==void 0?n=We:d[2]!==void 0?(Fe.test(d[2])&&(i=RegExp("</"+d[2],"g")),n=z):d[3]!==void 0&&(n=z):n===z?d[0]===">"?(n=i??it,p=-1):d[1]===void 0?p=-2:(p=n.lastIndex-d[2].length,f=d[1],n=d[3]===void 0?z:d[3]==='"'?qe:He):n===qe||n===He?n=z:n===je||n===We?n=it:(n=z,i=void 0);let c=n===z&&e[a+1].startsWith("/>")?" ":"";s+=n===it?l+qr:p>=0?(o.push(f),l.slice(0,p)+ie+l.slice(p)+L+c):l+L+(p===-2?a:c)}return[Je(e,s+(e[r]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),o]},at=class e{constructor({strings:t,_$litType$:r},o){let i;this.parts=[];let s=0,n=0,a=t.length-1,l=this.parts,[f,d]=Ge(t,r);if(this.el=e.createElement(f,o),U.currentNode=this.el.content,r===2||r===3){let p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=U.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let p of i.getAttributeNames())if(p.endsWith(ie)){let m=d[n++],c=i.getAttribute(p).split(L),h=/([.?@])?(.*)/.exec(m);l.push({type:1,index:s,name:h[2],strings:c,ctor:h[1]==="."?kt:h[1]==="?"?Ct:h[1]==="@"?Pt:H}),i.removeAttribute(p)}else p.startsWith(L)&&(l.push({type:6,index:s}),i.removeAttribute(p));if(Fe.test(i.tagName)){let p=i.textContent.split(L),m=p.length-1;if(m>0){i.textContent=At?At.emptyScript:"";for(let c=0;c<m;c++)i.append(p[c],st()),U.nextNode(),l.push({type:2,index:++s});i.append(p[m],st())}}}else if(i.nodeType===8)if(i.data===se)l.push({type:2,index:s});else{let p=-1;for(;(p=i.data.indexOf(L,p+1))!==-1;)l.push({type:7,index:s}),p+=L.length-1}s++}}static createElement(t,r){let o=j.createElement("template");return o.innerHTML=t,o}};function W(e,t,r=e,o){if(t===b)return t;let i=o!==void 0?r._$Co?.[o]:r._$Cl,s=nt(t)?void 0:t._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(e),i._$AT(e,r,o)),o!==void 0?(r._$Co??=[])[o]=i:r._$Cl=i),i!==void 0&&(t=W(e,i._$AS(e,t.values),i,o)),t}var _t=class{constructor(t,r){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:r},parts:o}=this._$AD,i=(t?.creationScope??j).importNode(r,!0);U.currentNode=i;let s=U.nextNode(),n=0,a=0,l=o[0];for(;l!==void 0;){if(n===l.index){let f;l.type===2?f=new V(s,s.nextSibling,this,t):l.type===1?f=new l.ctor(s,l.name,l.strings,this,t):l.type===6&&(f=new Ot(s,this,t)),this._$AV.push(f),l=o[++a]}n!==l?.index&&(s=U.nextNode(),n++)}return U.currentNode=j,i}p(t){let r=0;for(let o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(t,o,r),r+=o.strings.length-2):o._$AI(t[r])),r++}},V=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,r,o,i){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=r,this._$AM=o,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,r=this._$AM;return r!==void 0&&t?.nodeType===11&&(t=r.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,r=this){t=W(this,t,r),nt(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ve(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&nt(this._$AH)?this._$AA.nextSibling.data=t:this.T(j.createTextNode(t)),this._$AH=t}$(t){let{values:r,_$litType$:o}=t,i=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=at.createElement(Je(o.h,o.h[0]),this.options)),o);if(this._$AH?._$AD===i)this._$AH.p(r);else{let s=new _t(i,this),n=s.u(this.options);s.p(r),this.T(n),this._$AH=s}}_$AC(t){let r=Ke.get(t.strings);return r===void 0&&Ke.set(t.strings,r=new at(t)),r}k(t){ne(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,o,i=0;for(let s of t)i===r.length?r.push(o=new e(this.O(st()),this.O(st()),this,this.options)):o=r[i],o._$AI(s),i++;i<r.length&&(this._$AR(o&&o._$AB.nextSibling,i),r.length=i)}_$AR(t=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);t!==this._$AB;){let o=t.nextSibling;t.remove(),t=o}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},H=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,r,o,i,s){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=r,this._$AM=i,this.options=s,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=u}_$AI(t,r=this,o,i){let s=this.strings,n=!1;if(s===void 0)t=W(this,t,r,0),n=!nt(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else{let a=t,l,f;for(t=s[0],l=0;l<s.length-1;l++)f=W(this,a[o+l],r,l),f===b&&(f=this._$AH[l]),n||=!nt(f)||f!==this._$AH[l],f===u?t=u:t!==u&&(t+=(f??"")+s[l+1]),this._$AH[l]=f}n&&!i&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},kt=class extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}},Ct=class extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}},Pt=class extends H{constructor(t,r,o,i,s){super(t,r,o,i,s),this.type=5}_$AI(t,r=this){if((t=W(this,t,r,0)??u)===b)return;let o=this._$AH,i=t===u&&o!==u||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==u&&(o===u||i);i&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ot=class{constructor(t,r,o){this.element=t,this.type=6,this._$AN=void 0,this._$AM=r,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}},Ye={M:ie,P:L,A:se,C:1,L:Ge,R:_t,D:Ve,V:W,I:V,H,N:Ct,U:Pt,B:kt,F:Ot},Vr=oe.litHtmlPolyfillSupport;Vr?.(at,V),(oe.litHtmlVersions??=[]).push("3.3.1");var lt=(e,t,r)=>{let o=r?.renderBefore??t,i=o._$litPart$;if(i===void 0){let s=r?.renderBefore??null;o._$litPart$=i=new V(t.insertBefore(st(),s),s,void 0,r??{})}return i._$AI(e),i};var le=globalThis,k=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=lt(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}};k._$litElement$=!0,k.finalized=!0,le.litElementHydrateSupport?.({LitElement:k});var Fr=le.litElementPolyfillSupport;Fr?.({LitElement:k});(le.litElementVersions??=[]).push("4.2.1");var pt=e=>(t,r)=>{r!==void 0?r.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};var Jr={attribute:!0,type:String,converter:ot,reflect:!1,hasChanged:$t},Gr=(e=Jr,t,r)=>{let{kind:o,metadata:i}=r,s=globalThis.litPropertyMetadata.get(i);if(s===void 0&&globalThis.litPropertyMetadata.set(i,s=new Map),o==="setter"&&((e=Object.create(e)).wrapped=!0),s.set(r.name,e),o==="accessor"){let{name:n}=r;return{set(a){let l=t.get.call(this);t.set.call(this,a),this.requestUpdate(n,l,e)},init(a){return a!==void 0&&this.C(n,void 0,e,a),a}}}if(o==="setter"){let{name:n}=r;return function(a){let l=this[n];t.call(this,a),this.requestUpdate(n,l,e)}}throw Error("Unsupported decorator location: "+o)};function y(e){return(t,r)=>typeof r=="object"?Gr(e,t,r):((o,i,s)=>{let n=i.hasOwnProperty(s);return i.constructor.createProperty(s,o),n?Object.getOwnPropertyDescriptor(i,s):void 0})(e,t,r)}function P(e){return y({...e,state:!0,attribute:!1})}var q=(e,t,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,r),r);function ct(e,t){return(r,o,i)=>{let s=n=>n.renderRoot?.querySelector(e)??null;if(t){let{get:n,set:a}=typeof o=="object"?r:i??(()=>{let l=Symbol();return{get(){return this[l]},set(f){this[l]=f}}})();return q(r,o,{get(){let l=n.call(this);return l===void 0&&(l=s(this),(l!==null||this.hasUpdated)&&a.call(this,l)),l}})}return q(r,o,{get(){return s(this)}})}}var Xr=`:host {
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
`,Tt,ft=class extends k{constructor(){super(),Le(this,Tt,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(t,r)=>{if(this.internals?.states)try{r?this.internals.states.add(t):this.internals.states.delete(t)}catch(o){if(String(o).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw o}},has:t=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(t)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let e=this.constructor;for(let[t,r]of e.elementProperties)r.default==="inherit"&&r.initial!==void 0&&typeof t=="string"&&this.customStates.set(`initial-${t}-${r.initial}`,!0)}static get styles(){let e=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Xr,...e].map(t=>typeof t=="string"?B(t):t)}attributeChangedCallback(e,t,r){De(this,Tt)||(this.constructor.elementProperties.forEach((o,i)=>{o.reflect&&this[i]!=null&&this.initialReflectedProperties.set(i,this[i])}),Re(this,Tt,!0)),super.attributeChangedCallback(e,t,r)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,r)=>{e.has(r)&&this[r]==null&&(this[r]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(t=>{t.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(t){if(this.didSSR&&!this.hasUpdated){let r=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});r.error=t,this.dispatchEvent(r)}throw t}}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};Tt=new WeakMap;w([y()],ft.prototype,"dir",2);w([y()],ft.prototype,"lang",2);w([y({type:Boolean,reflect:!0,attribute:"did-ssr"})],ft.prototype,"didSSR",2);var pe=e=>e??u;var Zr=`:host {
  --divider-width: 0.25rem;
  --divider-hit-area: 0.75rem;
  --min: 0%;
  --max: 100%;

  display: grid;
}

.start,
.end {
  overflow: hidden;
}

.divider {
  flex: 0 0 var(--divider-width);
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: var(--wa-color-neutral-border-normal);
  color: var(--wa-color-neutral-on-normal);
  z-index: 1;
}

.divider:focus {
  outline: none;
}

:host(:not([disabled])) .divider:focus-visible {
  outline: var(--wa-focus-ring);
}

:host([disabled]) .divider {
  cursor: not-allowed;
}

/* Horizontal */
:host(:not([orientation='vertical'], [disabled])) .divider {
  cursor: col-resize;
}

:host(:not([orientation='vertical'])) .divider::after {
  display: flex;
  content: '';
  position: absolute;
  height: 100%;
  left: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
  width: var(--divider-hit-area);
}

/* Vertical */
:host([orientation='vertical']) {
  flex-direction: column;
}

:host([orientation='vertical']:not([disabled])) .divider {
  cursor: row-resize;
}

:host([orientation='vertical']) .divider::after {
  content: '';
  position: absolute;
  width: 100%;
  top: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
  height: var(--divider-hit-area);
}

@media (forced-colors: active) {
  .divider {
    outline: solid 1px transparent;
  }
}
`,S=class extends ft{constructor(){super(...arguments),this.isCollapsed=!1,this.localize=new Pe(this),this.positionBeforeCollapsing=0,this.position=50,this.orientation="horizontal",this.disabled=!1,this.snapThreshold=12}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>this.handleResize(e)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.unobserve(this)}detectSize(){let{width:e,height:t}=this.getBoundingClientRect();this.size=this.orientation==="vertical"?t:e}percentageToPixels(e){return this.size*(e/100)}pixelsToPercentage(e){return e/this.size*100}handleDrag(e){let t=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";this.disabled||(e.cancelable&&e.preventDefault(),Se(this,{onMove:(r,o)=>{let i=this.orientation==="vertical"?o:r;this.primary==="end"&&(i=this.size-i),this.snap&&this.snap.split(" ").forEach(n=>{let a;n.endsWith("%")?a=this.size*(parseFloat(n)/100):a=parseFloat(n),t&&this.orientation==="horizontal"&&(a=this.size-a),i>=a-this.snapThreshold&&i<=a+this.snapThreshold&&(i=a)}),this.position=Xt(this.pixelsToPercentage(i),0,100)},initialEvent:e}))}handleKeyDown(e){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","Enter"].includes(e.key)){let t=this.position,r=(e.shiftKey?10:1)*(this.primary==="end"?-1:1);if(e.preventDefault(),(e.key==="ArrowLeft"&&this.orientation==="horizontal"||e.key==="ArrowUp"&&this.orientation==="vertical")&&(t-=r),(e.key==="ArrowRight"&&this.orientation==="horizontal"||e.key==="ArrowDown"&&this.orientation==="vertical")&&(t+=r),e.key==="Home"&&(t=this.primary==="end"?100:0),e.key==="End"&&(t=this.primary==="end"?0:100),e.key==="Enter")if(this.isCollapsed)t=this.positionBeforeCollapsing,this.isCollapsed=!1;else{let o=this.position;t=0,requestAnimationFrame(()=>{this.isCollapsed=!0,this.positionBeforeCollapsing=o})}this.position=Xt(t,0,100)}}handleResize(e){let{width:t,height:r}=e[0].contentRect;this.size=this.orientation==="vertical"?r:t,(isNaN(this.cachedPositionInPixels)||this.position===1/0)&&(this.cachedPositionInPixels=Number(this.getAttribute("position-in-pixels")),this.positionInPixels=Number(this.getAttribute("position-in-pixels")),this.position=this.pixelsToPercentage(this.positionInPixels)),this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels))}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.positionInPixels=this.percentageToPixels(this.position),this.isCollapsed=!1,this.positionBeforeCollapsing=0,this.dispatchEvent(new $e)}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels)}handleVerticalChange(){this.detectSize()}render(){let e=this.orientation==="vertical"?"gridTemplateRows":"gridTemplateColumns",t=this.orientation==="vertical"?"gridTemplateColumns":"gridTemplateRows",r=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl",o=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,i="auto";return this.style||(this.style={}),this.primary==="end"?r&&this.orientation==="horizontal"?this.style[e]=`${o} var(--divider-width) ${i}`:this.style[e]=`${i} var(--divider-width) ${o}`:r&&this.orientation==="horizontal"?this.style[e]=`${i} var(--divider-width) ${o}`:this.style[e]=`${o} var(--divider-width) ${i}`,this.style[t]="",F`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${pe(this.disabled?void 0:"0")}
        role="separator"
        aria-valuenow=${this.position}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label=${this.localize.term("resize")}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleDrag}
        @touchstart=${this.handleDrag}
      >
        <slot name="divider"></slot>
      </div>

      <slot name="end" part="panel end" class="end"></slot>
    `}};S.css=Zr;w([ct(".divider")],S.prototype,"divider",2);w([y({type:Number,reflect:!0})],S.prototype,"position",2);w([y({attribute:"position-in-pixels",type:Number})],S.prototype,"positionInPixels",2);w([y({reflect:!0})],S.prototype,"orientation",2);w([y({type:Boolean,reflect:!0})],S.prototype,"disabled",2);w([y()],S.prototype,"primary",2);w([y()],S.prototype,"snap",2);w([y({type:Number,attribute:"snap-threshold"})],S.prototype,"snapThreshold",2);w([vt("position")],S.prototype,"handlePositionChange",1);w([vt("positionInPixels")],S.prototype,"handlePositionInPixelsChange",1);w([vt("vertical")],S.prototype,"handleVerticalChange",1);S=w([pt("wa-split-panel")],S);var Xe={app:{splitPosition:300},inspector:{sidebarSplit:280,drawerSplit:400}};var $={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},T=e=>(...t)=>({_$litDirective$:e,values:t}),C=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,r,o){this._$Ct=t,this._$AM=r,this._$Ci=o}_$AS(t,r){return this.update(t,r)}update(t,r){return this.render(...r)}};var Qr=T(class extends C{constructor(e){if(super(e),e.type!==$.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(let o in t)t[o]&&!this.nt?.has(o)&&this.st.add(o);return this.render(t)}let r=e.element.classList;for(let o of this.st)o in t||(r.remove(o),this.st.delete(o));for(let o in t){let i=!!t[o];i===this.st.has(o)||this.nt?.has(o)||(i?(r.add(o),this.st.add(o)):(r.remove(o),this.st.delete(o)))}return b}});var{I:to}=Ye;var Qe=e=>e.strings===void 0,Ze=()=>document.createComment(""),J=(e,t,r)=>{let o=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(r===void 0){let s=o.insertBefore(Ze(),i),n=o.insertBefore(Ze(),i);r=new to(s,n,e,e.options)}else{let s=r._$AB.nextSibling,n=r._$AM,a=n!==e;if(a){let l;r._$AQ?.(e),r._$AM=e,r._$AP!==void 0&&(l=e._$AU)!==n._$AU&&r._$AP(l)}if(s!==i||a){let l=r._$AA;for(;l!==s;){let f=l.nextSibling;o.insertBefore(l,i),l=f}}}return r},I=(e,t,r=e)=>(e._$AI(t,r),e),eo={},Dt=(e,t=eo)=>e._$AH=t,tr=e=>e._$AH,Lt=e=>{e._$AR(),e._$AA.remove()};var ro=T(class extends C{constructor(e){if(super(e),e.type!==$.PROPERTY&&e.type!==$.ATTRIBUTE&&e.type!==$.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Qe(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===b||t===u)return t;let r=e.element,o=e.name;if(e.type===$.PROPERTY){if(t===r[o])return b}else if(e.type===$.BOOLEAN_ATTRIBUTE){if(!!t===r.hasAttribute(o))return b}else if(e.type===$.ATTRIBUTE&&r.getAttribute(o)===t+"")return b;return Dt(e),t}});var er=(e,t,r)=>{let o=new Map;for(let i=t;i<=r;i++)o.set(e[i],i);return o},oo=T(class extends C{constructor(e){if(super(e),e.type!==$.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,r){let o;r===void 0?r=t:t!==void 0&&(o=t);let i=[],s=[],n=0;for(let a of e)i[n]=o?o(a,n):n,s[n]=r(a,n),n++;return{values:s,keys:i}}render(e,t,r){return this.dt(e,t,r).values}update(e,[t,r,o]){let i=tr(e),{values:s,keys:n}=this.dt(t,r,o);if(!Array.isArray(i))return this.ut=n,s;let a=this.ut??=[],l=[],f,d,p=0,m=i.length-1,c=0,h=s.length-1;for(;p<=m&&c<=h;)if(i[p]===null)p++;else if(i[m]===null)m--;else if(a[p]===n[c])l[c]=I(i[p],s[c]),p++,c++;else if(a[m]===n[h])l[h]=I(i[m],s[h]),m--,h--;else if(a[p]===n[h])l[h]=I(i[p],s[h]),J(e,l[h+1],i[p]),p++,h--;else if(a[m]===n[c])l[c]=I(i[m],s[c]),J(e,i[p],i[m]),m--,c++;else if(f===void 0&&(f=er(n,c,h),d=er(a,p,m)),f.has(a[p]))if(f.has(a[m])){let A=d.get(n[c]),Yt=A!==void 0?i[A]:null;if(Yt===null){let Ee=J(e,i[p]);I(Ee,s[c]),l[c]=Ee}else l[c]=I(Yt,s[c]),J(e,i[p],Yt),i[A]=null;c++}else Lt(i[m]),m--;else Lt(i[p]),p++;for(;c<=h;){let A=J(e,l[h+1]);I(A,s[c]),l[c++]=A}for(;p<=m;){let A=i[p++];A!==null&&Lt(A)}return this.ut=n,Dt(e,l),b}});var rr="important",io=" !"+rr,so=T(class extends C{constructor(e){if(super(e),e.type!==$.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,r)=>{let o=e[r];return o==null?t:t+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`}),"")}update(e,[t]){let{style:r}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let o of this.ft)t[o]==null&&(this.ft.delete(o),o.includes("-")?r.removeProperty(o):r[o]=null);for(let o in t){let i=t[o];if(i!=null){this.ft.add(o);let s=typeof i=="string"&&i.endsWith(io);o.includes("-")||s?r.setProperty(o,s?i.slice(0,-11):i,s?rr:""):r[o]=i}}return b}});var dt=class extends C{constructor(t){if(super(t),this.it=u,t.type!==$.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===u||t==null)return this._t=void 0,this.it=t;if(t===b)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let r=[t];return r.raw=r,this._t={_$litType$:this.constructor.resultType,strings:r,values:[]}}};dt.directiveName="unsafeHTML",dt.resultType=1;var no=T(dt);var ce=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function fe(e,t,r,o){e.addEventListener?e.addEventListener(t,r,o):e.attachEvent&&e.attachEvent(`on${t}`,r)}function mt(e,t,r,o){e&&(e.removeEventListener?e.removeEventListener(t,r,o):e.detachEvent&&e.detachEvent(`on${t}`,r))}function sr(e,t){let r=t.slice(0,t.length-1),o=[];for(let i=0;i<r.length;i++)o.push(e[r[i].toLowerCase()]);return o}function nr(e){typeof e!="string"&&(e=""),e=e.replace(/\s/g,"");let t=e.split(","),r=t.lastIndexOf("");for(;r>=0;)t[r-1]+=",",t.splice(r,1),r=t.lastIndexOf("");return t}function ao(e,t){let r=e.length>=t.length?e:t,o=e.length>=t.length?t:e,i=!0;for(let s=0;s<r.length;s++)o.indexOf(r[s])===-1&&(i=!1);return i}function ar(e){let t=e.keyCode||e.which||e.charCode;return e.code&&/^Key[A-Z]$/.test(e.code)&&(t=e.code.charCodeAt(3)),t}var xt={backspace:8,"\u232B":8,tab:9,clear:12,enter:13,"\u21A9":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,arrowup:38,arrowdown:40,arrowleft:37,arrowright:39,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"\u21EA":20,",":188,".":190,"/":191,"`":192,"-":ce?173:189,"=":ce?61:187,";":ce?59:186,"'":222,"{":219,"}":221,"[":219,"]":221,"\\":220},O={"\u21E7":16,shift:16,"\u2325":18,alt:18,option:18,"\u2303":17,ctrl:17,control:17,"\u2318":91,cmd:91,meta:91,command:91},ht={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},E={16:!1,18:!1,17:!1,91:!1},g={};for(let e=1;e<20;e++)xt[`f${e}`]=111+e;var x=[],ut=null,lr="all",R=new Map,G=e=>xt[e.toLowerCase()]||O[e.toLowerCase()]||e.toUpperCase().charCodeAt(0),lo=e=>Object.keys(xt).find(t=>xt[t]===e),po=e=>Object.keys(O).find(t=>O[t]===e),pr=e=>{lr=e||"all"},gt=()=>lr||"all",co=()=>x.slice(0),fo=()=>x.map(e=>lo(e)||po(e)||String.fromCharCode(e)),mo=()=>{let e=[];return Object.keys(g).forEach(t=>{g[t].forEach(({key:r,scope:o,mods:i,shortcut:s})=>{e.push({scope:o,shortcut:s,mods:i,keys:r.split("+").map(n=>G(n))})})}),e},cr=e=>{let t=e.target||e.srcElement,{tagName:r}=t,o=!0,i=r==="INPUT"&&!["checkbox","radio","range","button","file","reset","submit","color"].includes(t.type);return(t.isContentEditable||(i||r==="TEXTAREA"||r==="SELECT")&&!t.readOnly)&&(o=!1),o},ho=e=>(typeof e=="string"&&(e=G(e)),x.indexOf(e)!==-1),uo=(e,t)=>{let r,o;e||(e=gt());for(let i in g)if(Object.prototype.hasOwnProperty.call(g,i))for(r=g[i],o=0;o<r.length;)r[o].scope===e?r.splice(o,1).forEach(({element:s})=>me(s)):o++;gt()===e&&pr(t||"all")};function xo(e){let t=ar(e);e.key&&e.key.toLowerCase()==="capslock"&&(t=G(e.key));let r=x.indexOf(t);if(r>=0&&x.splice(r,1),e.key&&e.key.toLowerCase()==="meta"&&x.splice(0,x.length),(t===93||t===224)&&(t=91),t in E){E[t]=!1;for(let o in O)O[o]===t&&(M[o]=!1)}}var fr=(e,...t)=>{if(typeof e>"u")Object.keys(g).forEach(r=>{Array.isArray(g[r])&&g[r].forEach(o=>Rt(o)),delete g[r]}),me(null);else if(Array.isArray(e))e.forEach(r=>{r.key&&Rt(r)});else if(typeof e=="object")e.key&&Rt(e);else if(typeof e=="string"){let[r,o]=t;typeof r=="function"&&(o=r,r=""),Rt({key:e,scope:r,method:o,splitKey:"+"})}},Rt=({key:e,scope:t,method:r,splitKey:o="+"})=>{nr(e).forEach(i=>{let s=i.split(o),n=s.length,a=s[n-1],l=a==="*"?"*":G(a);if(!g[l])return;t||(t=gt());let f=n>1?sr(O,s):[],d=[];g[l]=g[l].filter(p=>{let m=(r?p.method===r:!0)&&p.scope===t&&ao(p.mods,f);return m&&d.push(p.element),!m}),d.forEach(p=>me(p))})};function or(e,t,r,o){if(t.element!==o)return;let i;if(t.scope===r||t.scope==="all"){i=t.mods.length>0;for(let s in E)Object.prototype.hasOwnProperty.call(E,s)&&(!E[s]&&t.mods.indexOf(+s)>-1||E[s]&&t.mods.indexOf(+s)===-1)&&(i=!1);(t.mods.length===0&&!E[16]&&!E[18]&&!E[17]&&!E[91]||i||t.shortcut==="*")&&(t.keys=[],t.keys=t.keys.concat(x),t.method(e,t)===!1&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0)))}}function ir(e,t){let r=g["*"],o=ar(e);if(e.key&&e.key.toLowerCase()==="capslock"||!(M.filter||cr).call(this,e))return;if((o===93||o===224)&&(o=91),x.indexOf(o)===-1&&o!==229&&x.push(o),["metaKey","ctrlKey","altKey","shiftKey"].forEach(a=>{let l=ht[a];e[a]&&x.indexOf(l)===-1?x.push(l):!e[a]&&x.indexOf(l)>-1?x.splice(x.indexOf(l),1):a==="metaKey"&&e[a]&&(x=x.filter(f=>f in ht||f===o))}),o in E){E[o]=!0;for(let a in O)if(Object.prototype.hasOwnProperty.call(O,a)){let l=ht[O[a]];M[a]=e[l]}if(!r)return}for(let a in E)Object.prototype.hasOwnProperty.call(E,a)&&(E[a]=e[ht[a]]);e.getModifierState&&!(e.altKey&&!e.ctrlKey)&&e.getModifierState("AltGraph")&&(x.indexOf(17)===-1&&x.push(17),x.indexOf(18)===-1&&x.push(18),E[17]=!0,E[18]=!0);let i=gt();if(r)for(let a=0;a<r.length;a++)r[a].scope===i&&(e.type==="keydown"&&r[a].keydown||e.type==="keyup"&&r[a].keyup)&&or(e,r[a],i,t);if(!(o in g))return;let s=g[o],n=s.length;for(let a=0;a<n;a++)if((e.type==="keydown"&&s[a].keydown||e.type==="keyup"&&s[a].keyup)&&s[a].key){let l=s[a],{splitKey:f}=l,d=l.key.split(f),p=[];for(let m=0;m<d.length;m++)p.push(G(d[m]));p.sort().join("")===x.sort().join("")&&or(e,l,i,t)}}var M=function(e,t,r){x=[];let o=nr(e),i=[],s="all",n=document,a=0,l=!1,f=!0,d="+",p=!1,m=!1;if(r===void 0&&typeof t=="function"&&(r=t),Object.prototype.toString.call(t)==="[object Object]"){let c=t;c.scope&&(s=c.scope),c.element&&(n=c.element),c.keyup&&(l=c.keyup),c.keydown!==void 0&&(f=c.keydown),c.capture!==void 0&&(p=c.capture),typeof c.splitKey=="string"&&(d=c.splitKey),c.single===!0&&(m=!0)}for(typeof t=="string"&&(s=t),m&&fr(e,s);a<o.length;a++){let c=o[a].split(d);i=[],c.length>1&&(i=sr(O,c));let h=c[c.length-1];h=h==="*"?"*":G(h),h in g||(g[h]=[]),g[h].push({keyup:l,keydown:f,scope:s,mods:i,shortcut:o[a],method:r,key:o[a],splitKey:d,element:n})}if(typeof n<"u"&&typeof window<"u"){if(!R.has(n)){let c=(A=window.event)=>ir(A,n),h=(A=window.event)=>{ir(A,n),xo(A)};R.set(n,{keydownListener:c,keyupListenr:h,capture:p}),fe(n,"keydown",c,p),fe(n,"keyup",h,p)}if(!ut){let c=()=>{x=[]};ut={listener:c,capture:p},fe(window,"focus",c,p)}}};function go(e,t="all"){Object.keys(g).forEach(r=>{g[r].filter(o=>o.scope===t&&o.shortcut===e).forEach(o=>{o&&o.method&&o.method({},o)})})}function me(e){let t=Object.values(g).flat();if(t.findIndex(({element:r})=>r===e)<0&&e){let{keydownListener:r,keyupListenr:o,capture:i}=R.get(e)||{};r&&o&&(mt(e,"keyup",o,i),mt(e,"keydown",r,i),R.delete(e))}if((t.length<=0||R.size<=0)&&(Array.from(R.keys()).forEach(r=>{let{keydownListener:o,keyupListenr:i,capture:s}=R.get(r)||{};o&&i&&(mt(r,"keyup",i,s),mt(r,"keydown",o,s),R.delete(r))}),R.clear(),Object.keys(g).forEach(r=>delete g[r]),ut)){let{listener:r,capture:o}=ut;mt(window,"focus",r,o),ut=null}}var de={getPressedKeyString:fo,setScope:pr,getScope:gt,deleteScope:uo,getPressedKeyCodes:co,getAllKeyCodes:mo,isPressed:ho,filter:cr,trigger:go,unbind:fr,keyMap:xt,modifier:O,modifierMap:ht};for(let e in de){let t=e;Object.prototype.hasOwnProperty.call(de,t)&&(M[t]=de[t])}if(typeof window<"u"){let e=window.hotkeys;M.noConflict=t=>(t&&window.hotkeys===M&&(window.hotkeys=e),M),window.hotkeys=M}var dr=e=>{class t extends e{constructor(){super(...arguments);this.#t=!1;this.initialReflectedProperties=new Map}#t;attributeChangedCallback(i,s,n){if(!this.#t){let a=this;this.constructor.elementProperties.forEach((l,f)=>{l.reflect&&a[f]!=null&&this.initialReflectedProperties.set(f,a[f])}),this.initialReflectedProperties.set("slot",this.slot),this.#t=!0}super.attributeChangedCallback?.(i,s,n)}willUpdate(i){super.willUpdate?.(i);let s=this;this.initialReflectedProperties.forEach((n,a)=>{i.has(a)&&s[a]==null&&(s[a]=n)})}}return v([P()],t.prototype,"initialReflectedProperties",2),t};function he(e){let t=[];for(let r=0;r<e.length;r++){let o=e[r];o&&t.push(o)}return t}function mr(e){return typeof e=="symbol"||e instanceof Symbol}function hr(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function ur(e){return e==null?e===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}function Mt(e){if(!e||typeof e!="object")return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype||Object.getPrototypeOf(t)===null?Object.prototype.toString.call(e)==="[object Object]":!1}function Y(e){return e==="__proto__"}function X(e){if(typeof e!="object"||e==null)return!1;if(Object.getPrototypeOf(e)===null)return!0;if(Object.prototype.toString.call(e)!=="[object Object]"){let r=e[Symbol.toStringTag];return r==null||!Object.getOwnPropertyDescriptor(e,Symbol.toStringTag)?.writable?!1:e.toString()===`[object ${r}]`}let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function xr(e,t){return e===t||Number.isNaN(e)&&Number.isNaN(t)}function gr(e){return Number.isSafeInteger(e)&&e>=0}function ue(e){return e!=null}function It(e){return typeof e=="string"}function yr(e){return e!=null&&typeof e!="function"&&gr(e.length)}function br(e){switch(typeof e){case"number":case"symbol":return!1;case"string":return e.includes(".")||e.includes("[")||e.includes("]")}}function Z(e){return typeof e=="string"||typeof e=="symbol"?e:Object.is(e?.valueOf?.(),-0)?"-0":String(e)}function xe(e){if(e==null)return"";if(typeof e=="string")return e;if(Array.isArray(e))return e.map(xe).join(",");let t=String(e);return t==="0"&&Object.is(Number(e),-0)?"-0":t}function Nt(e){if(Array.isArray(e))return e.map(Z);if(typeof e=="symbol")return[e];e=xe(e);let t=[],r=e.length;if(r===0)return t;let o=0,i="",s="",n=!1;for(e.charCodeAt(0)===46&&(t.push(""),o++);o<r;){let a=e[o];s?a==="\\"&&o+1<r?(o++,i+=e[o]):a===s?s="":i+=a:n?a==='"'||a==="'"?s=a:a==="]"?(n=!1,t.push(i),i=""):i+=a:a==="["?(n=!0,i&&(t.push(i),i="")):a==="."?i&&(t.push(i),i=""):i+=a,o++}return i&&t.push(i),t}function Q(e,t,r){if(e==null)return r;switch(typeof t){case"string":{if(Y(t))return r;let o=e[t];return o===void 0?br(t)?Q(e,Nt(t),r):r:o}case"number":case"symbol":{typeof t=="number"&&(t=Z(t));let o=e[t];return o===void 0?r:o}default:{if(Array.isArray(t))return yo(e,t,r);if(Object.is(t?.valueOf(),-0)?t="-0":t=String(t),Y(t))return r;let o=e[t];return o===void 0?r:o}}}function yo(e,t,r){if(t.length===0)return r;let o=e;for(let i=0;i<t.length;i++){if(o==null||Y(t[i]))return r;o=o[t[i]]}return o===void 0?r:o}function ge(e){return e!==null&&(typeof e=="object"||typeof e=="function")}var bo=/^(?:0|[1-9]\d*)$/;function vr(e,t=Number.MAX_SAFE_INTEGER){switch(typeof e){case"number":return Number.isInteger(e)&&e>=0&&e<t;case"symbol":return!1;case"string":return bo.test(e)}}function wr(e){return e!==null&&typeof e=="object"&&ur(e)==="[object Arguments]"}var vo=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,wo=/^\w*$/;function Er(e,t){return Array.isArray(e)?!1:typeof e=="number"||typeof e=="boolean"||e==null||mr(e)?!0:typeof e=="string"&&(wo.test(e)||!vo.test(e))||t!=null&&Object.hasOwn(t,e)}var Sr=(e,t,r)=>{let o=e[t];(!(Object.hasOwn(e,t)&&xr(o,r))||r===void 0&&!(t in e))&&(e[t]=r)};function $r(e,t,r,o){if(e==null&&!ge(e))return e;let i=Er(t,e)?[t]:Array.isArray(t)?t:typeof t=="string"?Nt(t):[t],s=r(Q(e,i)),n=e;for(let a=0;a<i.length&&n!=null;a++){let l=Z(i[a]);if(Y(l))continue;let f;if(a===i.length-1)f=s;else{let d=n[l],p=o?.(d,l,e);f=p!==void 0?p:ge(d)?d:vr(i[a+1])?[]:{}}Sr(n,l,f),n=n[l]}return e}function ye(e,t,r){return $r(e,t,()=>r,()=>{})}function Ar(e){let t=e?.constructor,r=typeof t=="function"?t.prototype:Object.prototype;return e===r}function _r(e){return hr(e)}function be(e,...t){e=Object(e);for(let r=0;r<t.length;r++){let o=t[r];o!=null&&Bt(e,o,new WeakMap)}return e}function Bt(e,t,r){for(let o in t){let i=t[o],s=e[o];if(s===void 0||!Object.hasOwn(e,o)){e[o]=Eo(i,r);continue}r.get(i)!==s&&So(s,i,r)}}function Eo(e,t){if(t.has(e))return t.get(e);if(X(e)){let r={};return t.set(e,r),Bt(r,e,t),r}return e}function So(e,t,r){if(X(e)&&X(t)){r.set(t,e),Bt(e,t,r);return}Array.isArray(e)&&Array.isArray(t)&&(r.set(t,e),$o(e,t,r))}function $o(e,t,r){let o=Math.min(t.length,e.length);for(let i=0;i<o;i++)X(e[i])&&X(t[i])&&Bt(e[i],t[i],r);for(let i=o;i<t.length;i++)e.push(t[i])}function ve(e){if(e==null)return!0;if(yr(e))return typeof e.splice!="function"&&typeof e!="string"&&(typeof Buffer>"u"||!Buffer.isBuffer(e))&&!_r(e)&&!wr(e)?!1:e.length===0;if(typeof e=="object"){if(e instanceof Map||e instanceof Set)return e.size===0;let t=Object.keys(e);return Ar(e)?t.filter(r=>r!=="constructor").length===0:t.length===0}return!0}var we=class{constructor(t,r={}){let o=t.split(".");this.store=he(["lb",o.shift()]).join("-"),this.namespace=o.join("."),this.setPersistedData(be({},this.getPersistedData(),r))}namespacedPath(t){return`${this.namespace}.${t}`}get(t,r=null){return Q(this.getPersistedData(),this.namespacedPath(t),r)}set(t,r){let o=this.getPersistedData();return ye(o,this.namespacedPath(t),r),this.setPersistedData(o)}getPersistedData(){return JSON.parse(localStorage.getItem(this.store)||"{}")}setPersistedData(t){return localStorage.setItem(this.store,JSON.stringify(t)),this}},kr=e=>{class t extends e{static{this.persist=[]}connectedCallback(){if(super.connectedCallback(),ve(this.persistAs)){console.warn("Cannot persist data - missing `persist-as` attribute",this);return}this.persistanceStore=new we(this.persistAs);let o=this.constructor,i=this;o.persist.forEach(s=>{i[s]=this.persistanceStore.get(s,this[s])})}willUpdate(o){super.willUpdate?.(o),this.persistanceStore&&this.constructor.persist.forEach(s=>{o.get(s)!==void 0&&this.persistanceStore.set(s,this[s])})}afterMorph(){if(this.persistanceStore){let o=this.constructor,i=this;o.persist.forEach(s=>{i[s]=this.persistanceStore.get(s,this[s])})}}}return v([y({attribute:"persist-as"})],t.prototype,"persistAs",2),v([P()],t.prototype,"persistanceStore",2),t};var zt=class extends Event{constructor(t,r){super(t,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=r}};var Ut=class extends zt{constructor(t,r={}){super("lb-command",{bubbles:!0,cancelable:!1,composed:!0}),this.command=t,this.detail=r}};var jt=class extends Event{constructor(t={value:void 0,oldValue:void 0}){super("lb-data",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Wt=class extends Event{constructor(t={}){super("lb-display-mode-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ht=class extends Event{constructor(t){super("lb-drag-end",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var qt=class extends Event{constructor(t){super("lb-drag-start",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Kt=class extends Event{constructor(t={}){super("lb-error",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Vt=class extends Event{constructor(t={}){super("lb-param-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ft=class extends Event{constructor(t){super("lb-popover-close",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Jt=class extends Event{constructor(t){super("lb-popover-open",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Gt=class extends Event{constructor(t){super("lb-resize",{bubbles:!1,cancelable:!1,composed:!0}),this.detail=t}};var Cr={"lb-command":Ut,"lb-data":jt,"lb-drag-start":qt,"lb-drag-end":Ht,"lb-error":Kt,"lb-resize":Gt,"lb-popover-open":Jt,"lb-popover-close":Ft,"lb-param-change":Vt,"lb-display-mode-change":Wt};function Pr(e){return Cr[e]}var Or=`:host {
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
`;var yt=class extends dr(k){constructor(){super();this.cleanupJobs=[]}static{this.shadowRootOptions={...k.shadowRootOptions,serializable:!0}}static{this.morphable=!0}static get styles(){let r=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Or,...r].map(o=>typeof o=="string"?B(o):o)}afterMorph(){}get morphable(){return!!this.getStaticProperty("morphable")}disconnectedCallback(){this.cleanupJobs.forEach(r=>r()),super.disconnectedCallback()}addCleanupJob(r){this.cleanupJobs.push(r)}renderToTarget(r,o){lt(o,r)}on(r,o){this.addEventListener(r,o),this.addCleanupJob(()=>this.removeEventListener(r,o))}delegate(r,o){document.addEventListener(r,o),this.addCleanupJob(()=>document.removeEventListener(r,o))}dispatch(r,...o){let i=Pr(r),s=this;if(!i){console.warn(`Unknown event type '${r}'`);return}let n=null;if(Mt(o[0])?(n=o[0],o=[]):o.length>0&&Mt(o[o.length-1])&&(n=o.pop()),n?.target){let l=It(n.target)?document.querySelector(`#${n.target}`):s;l&&(s=l)}let a=[...o,n].filter(ue);s.dispatchEvent(new i(...a))}getStaticProperty(r){return this.constructor[r]}warn(r){It(r)&&(r=new Error(r)),this.dispatch("lb-error",{error:r}),console.error(r)}};v([P()],yt.prototype,"cleanupJobs",2);var Tr=`:host {
  display: grid;
  grid-template-rows: min-content 1fr;
  height: 100dvh;
  overflow: hidden;
  background-color: var(--lookbook-surface-3);
}
:host([dragging]) {
}
:host([has-active-popover]) {
  --lookbook--tooltip-visibility: hidden;
}
#splitter,
#sidebar,
#main {
  height: 100%;
  overflow: hidden;
}
#sidebar {
}
#main {
}
wa-split-panel {
  --divider-width: 1px;
}
lb-icon[slot=divider] {
  width: var(--lookbook-size-sm);
}
`;var _=class extends kr(yt){constructor(){super(...arguments);this.displayMode="light";this.splitPosition=Xe.app.splitPosition}updated(r){r.has("displayMode")&&(globalThis.displayMode=this.displayMode,this.dispatch("lb-display-mode-change",{mode:this.displayMode}))}handlePointerDown(){this.pointerdown=!0}handlePointerUp(){let r=this.dragging;this.pointerdown=!1,this.dragging=!1,r&&this.dispatch("lb-drag-end")}handlePointerMove(){this.pointerdown&&(this.dragging=!0,this.dispatch("lb-drag-start"))}handleSplitChange(){this.splitPosition=this.splitter.positionInPixels?this.splitter.positionInPixels:this.splitPosition}toggleDisplayMode(){this.displayMode==="light"?this.displayMode="dark":this.displayMode="light"}render(){return F`
      <div id="header">
        <lb-header id="app-header">
          <slot
            name="logo"
            slot="logo"
          ></slot>
          <slot
            name="header-link"
            slot="link"
          ></slot>

          <lb-button
            id="appearance"
            slot="action"
            label="appearance"
            @click="${this.toggleDisplayMode}"
          >
            <lb-icon name="${this.displayMode==="light"?"sun":"moon-star"}"></lb-icon>
          </lb-button>
        </lb-header>
      </div>
      <wa-split-panel
        id="splitter"
        primary="start"
        position-in-pixels="${this.splitPosition}"
        @wa-reposition="${this.handleSplitChange}"
        @pointerdown=${this.handlePointerDown}
        @pointermove=${this.handlePointerMove}
        @pointerup=${this.handlePointerUp}
        @lb-popover-open="${()=>this.hasActivePopover=!0}"
        @lb-popover-close="${()=>this.hasActivePopover=!1}"
      >
        <div
          id="sidebar"
          slot="start"
        >
          <slot name="sidebar"></slot>
        </div>

        <div
          id="main"
          slot="end"
        >
          <slot></slot>
        </div>
      </wa-split-panel>
    `}};_.css=Tr,_.persist=["version","splitPosition","displayMode"],v([y()],_.prototype,"version",2),v([y({type:Boolean,reflect:!0})],_.prototype,"dragging",2),v([y({type:Boolean,reflect:!0,attribute:"has-active-popover"})],_.prototype,"hasActivePopover",2),v([y({reflect:!0,attribute:"display-mode"})],_.prototype,"displayMode",2),v([P()],_.prototype,"splitPosition",2),v([P()],_.prototype,"pointerdown",2),v([ct("#splitter")],_.prototype,"splitter",2),_=v([pt("lb-app")],_);export{_ as LookbookApp};
/*! Bundled license information:

@awesome.me/webawesome/dist/chunks/chunk.CI74OXU3.js:
@awesome.me/webawesome/dist/chunks/chunk.AJ3PNG3J.js:
@awesome.me/webawesome/dist/chunks/chunk.2WYO32PF.js:
@awesome.me/webawesome/dist/chunks/chunk.OKWGTFUF.js:
@awesome.me/webawesome/dist/chunks/chunk.I24ISEJH.js:
@awesome.me/webawesome/dist/chunks/chunk.N3AZYXKV.js:
@awesome.me/webawesome/dist/chunks/chunk.I37X32SU.js:
@awesome.me/webawesome/dist/chunks/chunk.LU7TFTYS.js:
@awesome.me/webawesome/dist/chunks/chunk.XT5HTSFZ.js:
@awesome.me/webawesome/dist/components/split-panel/split-panel.js:
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

lit-html/directives/if-defined.js:
lit-html/directives/class-map.js:
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
