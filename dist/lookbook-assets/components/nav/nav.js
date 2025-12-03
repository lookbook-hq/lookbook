var Hr=Object.defineProperty;var Vr=Object.getOwnPropertyDescriptor;var $=(e,t,o,r)=>{for(var n=r>1?void 0:r?Vr(t,o):t,s=e.length-1,i;s>=0;s--)(i=e[s])&&(n=(r?i(t,o,n):i(n))||n);return r&&n&&Hr(t,o,n),n};async function gt(e,t,o){return e.animate(t,o).finished.catch(()=>{})}function yt(e){return e=e.toString().toLowerCase(),e.indexOf("ms")>-1?parseFloat(e)||0:e.indexOf("s")>-1?(parseFloat(e)||0)*1e3:parseFloat(e)||0}var xt=new Set,ne=new Map,G,bt="ltr",vt="en",eo=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(eo){let e=new MutationObserver(to);bt=document.documentElement.dir||"ltr",vt=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function me(...e){e.map(t=>{let o=t.$code.toLowerCase();ne.has(o)?ne.set(o,Object.assign(Object.assign({},ne.get(o)),t)):ne.set(o,t),G||(G=t)}),to()}function to(){eo&&(bt=document.documentElement.dir||"ltr",vt=document.documentElement.lang||navigator.language),[...xt.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate()})}var ze=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){xt.add(this.host)}hostDisconnected(){xt.delete(this.host)}dir(){return`${this.host.dir||bt}`.toLowerCase()}lang(){return`${this.host.lang||vt}`.toLowerCase()}getTranslationData(t){var o,r;let n=new Intl.Locale(t.replace(/_/g,"-")),s=n?.language.toLowerCase(),i=(r=(o=n?.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&r!==void 0?r:"",a=ne.get(`${s}-${i}`),l=ne.get(s);return{locale:n,language:s,region:i,primary:a,secondary:l}}exists(t,o){var r;let{primary:n,secondary:s}=this.getTranslationData((r=o.lang)!==null&&r!==void 0?r:this.lang());return o=Object.assign({includeFallback:!1},o),!!(n&&n[t]||s&&s[t]||o.includeFallback&&G&&G[t])}term(t,...o){let{primary:r,secondary:n}=this.getTranslationData(this.lang()),s;if(r&&r[t])s=r[t];else if(n&&n[t])s=n[t];else if(G&&G[t])s=G[t];else return console.error(`No translation found for: ${String(t)}`),String(t);return typeof s=="function"?s(...o):s}date(t,o){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),o).format(t)}number(t,o){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),o).format(t)}relativeTime(t,o,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(t,o)}};var oo={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>e===0?"No options selected":e===1?"1 option selected":`${e} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};me(oo);var ro=oo;var se=class extends ze{};me(ro);function A(e,t){let o={waitUntilFirstUpdate:!1,...t};return(r,n)=>{let{update:s}=r,i=Array.isArray(e)?e:[e];r.update=function(a){i.forEach(l=>{let d=l;if(a.has(d)){let u=a.get(d),c=this[d];u!==c&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[n](u,c)}}),s.call(this,a)}}}var Kr=Object.defineProperty,Jr=Object.getOwnPropertyDescriptor,no=e=>{throw TypeError(e)},p=(e,t,o,r)=>{for(var n=r>1?void 0:r?Jr(t,o):t,s=e.length-1,i;s>=0;s--)(i=e[s])&&(n=(r?i(t,o,n):i(n))||n);return r&&n&&Kr(t,o,n),n},so=(e,t,o)=>t.has(e)||no("Cannot "+o),io=(e,t,o)=>(so(e,t,"read from private field"),o?o.call(e):t.get(e)),ao=(e,t,o)=>t.has(e)?no("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),lo=(e,t,o,r)=>(so(e,t,"write to private field"),r?r.call(e,o):t.set(e,o),o);var Me=globalThis,De=Me.ShadowRoot&&(Me.ShadyCSS===void 0||Me.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,po=Symbol(),co=new WeakMap,ue=class{constructor(t,o,r){if(this._$cssResult$=!0,r!==po)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o,o=this.t;if(De&&t===void 0){let r=o!==void 0&&o.length===1;r&&(t=co.get(o)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&co.set(o,t))}return t}toString(){return this.cssText}},Z=e=>new ue(typeof e=="string"?e:e+"",void 0,po);var fo=(e,t)=>{if(De)e.adoptedStyleSheets=t.map((o=>o instanceof CSSStyleSheet?o:o.styleSheet));else for(let o of t){let r=document.createElement("style"),n=Me.litNonce;n!==void 0&&r.setAttribute("nonce",n),r.textContent=o.cssText,e.appendChild(r)}},wt=De?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let o="";for(let r of t.cssRules)o+=r.cssText;return Z(o)})(e):e;var{is:Gr,defineProperty:Zr,getOwnPropertyDescriptor:Yr,getOwnPropertyNames:Xr,getOwnPropertySymbols:Qr,getPrototypeOf:en}=Object,Be=globalThis,ho=Be.trustedTypes,tn=ho?ho.emptyScript:"",on=Be.reactiveElementPolyfillSupport,ge=(e,t)=>e,ye={toAttribute(e,t){switch(t){case Boolean:e=e?tn:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=e!==null;break;case Number:o=e===null?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch{o=null}}return o}},je=(e,t)=>!Gr(e,t),mo={attribute:!0,type:String,converter:ye,reflect:!1,useDefault:!1,hasChanged:je};Symbol.metadata??=Symbol("metadata"),Be.litPropertyMetadata??=new WeakMap;var N=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,o=mo){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(t,o),!o.noAccessor){let r=Symbol(),n=this.getPropertyDescriptor(t,r,o);n!==void 0&&Zr(this.prototype,t,n)}}static getPropertyDescriptor(t,o,r){let{get:n,set:s}=Yr(this.prototype,t)??{get(){return this[o]},set(i){this[o]=i}};return{get:n,set(i){let a=n?.call(this);s?.call(this,i),this.requestUpdate(t,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??mo}static _$Ei(){if(this.hasOwnProperty(ge("elementProperties")))return;let t=en(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ge("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ge("properties"))){let o=this.properties,r=[...Xr(o),...Qr(o)];for(let n of r)this.createProperty(n,o[n])}let t=this[Symbol.metadata];if(t!==null){let o=litPropertyMetadata.get(t);if(o!==void 0)for(let[r,n]of o)this.elementProperties.set(r,n)}this._$Eh=new Map;for(let[o,r]of this.elementProperties){let n=this._$Eu(o,r);n!==void 0&&this._$Eh.set(n,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let o=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let n of r)o.unshift(wt(n))}else t!==void 0&&o.push(wt(t));return o}static _$Eu(t,o){let r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,o=this.constructor.elementProperties;for(let r of o.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return fo(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,o,r){this._$AK(t,r)}_$ET(t,o){let r=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,r);if(n!==void 0&&r.reflect===!0){let s=(r.converter?.toAttribute!==void 0?r.converter:ye).toAttribute(o,r.type);this._$Em=t,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,o){let r=this.constructor,n=r._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let s=r.getPropertyOptions(n),i=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:ye;this._$Em=n;let a=i.fromAttribute(o,s.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(t,o,r){if(t!==void 0){let n=this.constructor,s=this[t];if(r??=n.getPropertyOptions(t),!((r.hasChanged??je)(s,o)||r.useDefault&&r.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,r))))return;this.C(t,o,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,o,{useDefault:r,reflect:n,wrapped:s},i){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,i??o??this[t]),s!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(o=void 0),this._$AL.set(t,o)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[n,s]of r){let{wrapped:i}=s,a=this[n];i!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,s,a)}}let t=!1,o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(o)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(o)}willUpdate(t){}_$AE(t){this._$EO?.forEach((o=>o.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((o=>this._$ET(o,this[o]))),this._$EM()}updated(t){}firstUpdated(t){}};N.elementStyles=[],N.shadowRootOptions={mode:"open"},N[ge("elementProperties")]=new Map,N[ge("finalized")]=new Map,on?.({ReactiveElement:N}),(Be.reactiveElementVersions??=[]).push("2.1.1");var Et=globalThis,Ue=Et.trustedTypes,uo=Ue?Ue.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ct="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,At="?"+F,rn=`<${At}>`,Q=document,be=()=>Q.createComment(""),ve=e=>e===null||typeof e!="object"&&typeof e!="function",St=Array.isArray,wo=e=>St(e)||typeof e?.[Symbol.iterator]=="function",kt=`[ 	
\f\r]`,xe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,go=/-->/g,yo=/>/g,Y=RegExp(`>|${kt}(?:([^\\s"'>=/]+)(${kt}*=${kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),xo=/'/g,bo=/"/g,ko=/^(?:script|style|textarea|title)$/i,$t=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),v=$t(1),nn=$t(2),ws=$t(3),k=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),vo=new WeakMap,X=Q.createTreeWalker(Q,129);function Eo(e,t){if(!St(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return uo!==void 0?uo.createHTML(t):t}var Co=(e,t)=>{let o=e.length-1,r=[],n,s=t===2?"<svg>":t===3?"<math>":"",i=xe;for(let a=0;a<o;a++){let l=e[a],d,u,c=-1,m=0;for(;m<l.length&&(i.lastIndex=m,u=i.exec(l),u!==null);)m=i.lastIndex,i===xe?u[1]==="!--"?i=go:u[1]!==void 0?i=yo:u[2]!==void 0?(ko.test(u[2])&&(n=RegExp("</"+u[2],"g")),i=Y):u[3]!==void 0&&(i=Y):i===Y?u[0]===">"?(i=n??xe,c=-1):u[1]===void 0?c=-2:(c=i.lastIndex-u[2].length,d=u[1],i=u[3]===void 0?Y:u[3]==='"'?bo:xo):i===bo||i===xo?i=Y:i===go||i===yo?i=xe:(i=Y,n=void 0);let f=i===Y&&e[a+1].startsWith("/>")?" ":"";s+=i===xe?l+rn:c>=0?(r.push(d),l.slice(0,c)+Ct+l.slice(c)+F+f):l+F+(c===-2?a:f)}return[Eo(e,s+(e[o]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},we=class e{constructor({strings:t,_$litType$:o},r){let n;this.parts=[];let s=0,i=0,a=t.length-1,l=this.parts,[d,u]=Co(t,o);if(this.el=e.createElement(d,r),X.currentNode=this.el.content,o===2||o===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(n=X.nextNode())!==null&&l.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(let c of n.getAttributeNames())if(c.endsWith(Ct)){let m=u[i++],f=n.getAttribute(c).split(F),y=/([.?@])?(.*)/.exec(m);l.push({type:1,index:s,name:y[2],strings:f,ctor:y[1]==="."?Fe:y[1]==="?"?We:y[1]==="@"?qe:te}),n.removeAttribute(c)}else c.startsWith(F)&&(l.push({type:6,index:s}),n.removeAttribute(c));if(ko.test(n.tagName)){let c=n.textContent.split(F),m=c.length-1;if(m>0){n.textContent=Ue?Ue.emptyScript:"";for(let f=0;f<m;f++)n.append(c[f],be()),X.nextNode(),l.push({type:2,index:++s});n.append(c[m],be())}}}else if(n.nodeType===8)if(n.data===At)l.push({type:2,index:s});else{let c=-1;for(;(c=n.data.indexOf(F,c+1))!==-1;)l.push({type:7,index:s}),c+=F.length-1}s++}}static createElement(t,o){let r=Q.createElement("template");return r.innerHTML=t,r}};function ee(e,t,o=e,r){if(t===k)return t;let n=r!==void 0?o._$Co?.[r]:o._$Cl,s=ve(t)?void 0:t._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),s===void 0?n=void 0:(n=new s(e),n._$AT(e,o,r)),r!==void 0?(o._$Co??=[])[r]=n:o._$Cl=n),n!==void 0&&(t=ee(e,n._$AS(e,t.values),n,r)),t}var Ne=class{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:o},parts:r}=this._$AD,n=(t?.creationScope??Q).importNode(o,!0);X.currentNode=n;let s=X.nextNode(),i=0,a=0,l=r[0];for(;l!==void 0;){if(i===l.index){let d;l.type===2?d=new ie(s,s.nextSibling,this,t):l.type===1?d=new l.ctor(s,l.name,l.strings,this,t):l.type===6&&(d=new He(s,this,t)),this._$AV.push(d),l=r[++a]}i!==l?.index&&(s=X.nextNode(),i++)}return X.currentNode=Q,n}p(t){let o=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,o),o+=r.strings.length-2):r._$AI(t[o])),o++}},ie=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,o,r,n){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=r,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,o=this._$AM;return o!==void 0&&t?.nodeType===11&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){t=ee(this,t,o),ve(t)?t===x||t==null||t===""?(this._$AH!==x&&this._$AR(),this._$AH=x):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):wo(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==x&&ve(this._$AH)?this._$AA.nextSibling.data=t:this.T(Q.createTextNode(t)),this._$AH=t}$(t){let{values:o,_$litType$:r}=t,n=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=we.createElement(Eo(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===n)this._$AH.p(o);else{let s=new Ne(n,this),i=s.u(this.options);s.p(o),this.T(i),this._$AH=s}}_$AC(t){let o=vo.get(t.strings);return o===void 0&&vo.set(t.strings,o=new we(t)),o}k(t){St(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,r,n=0;for(let s of t)n===o.length?o.push(r=new e(this.O(be()),this.O(be()),this,this.options)):r=o[n],r._$AI(s),n++;n<o.length&&(this._$AR(r&&r._$AB.nextSibling,n),o.length=n)}_$AR(t=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},te=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,o,r,n,s){this.type=1,this._$AH=x,this._$AN=void 0,this.element=t,this.name=o,this._$AM=n,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=x}_$AI(t,o=this,r,n){let s=this.strings,i=!1;if(s===void 0)t=ee(this,t,o,0),i=!ve(t)||t!==this._$AH&&t!==k,i&&(this._$AH=t);else{let a=t,l,d;for(t=s[0],l=0;l<s.length-1;l++)d=ee(this,a[r+l],o,l),d===k&&(d=this._$AH[l]),i||=!ve(d)||d!==this._$AH[l],d===x?t=x:t!==x&&(t+=(d??"")+s[l+1]),this._$AH[l]=d}i&&!n&&this.j(t)}j(t){t===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Fe=class extends te{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===x?void 0:t}},We=class extends te{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==x)}},qe=class extends te{constructor(t,o,r,n,s){super(t,o,r,n,s),this.type=5}_$AI(t,o=this){if((t=ee(this,t,o,0)??x)===k)return;let r=this._$AH,n=t===x&&r!==x||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==x&&(r===x||n);n&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},He=class{constructor(t,o,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){ee(this,t)}},Ao={M:Ct,P:F,A:At,C:1,L:Co,R:Ne,D:wo,V:ee,I:ie,H:te,N:We,U:qe,B:Fe,F:He},sn=Et.litHtmlPolyfillSupport;sn?.(we,ie),(Et.litHtmlVersions??=[]).push("3.3.1");var ke=(e,t,o)=>{let r=o?.renderBefore??t,n=r._$litPart$;if(n===void 0){let s=o?.renderBefore??null;r._$litPart$=n=new ie(t.insertBefore(be(),s),s,void 0,o??{})}return n._$AI(e),n};var _t=globalThis,R=class extends N{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ke(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};R._$litElement$=!0,R.finalized=!0,_t.litElementHydrateSupport?.({LitElement:R});var an=_t.litElementPolyfillSupport;an?.({LitElement:R});(_t.litElementVersions??=[]).push("4.2.1");var I=e=>(t,o)=>{o!==void 0?o.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};var ln={attribute:!0,type:String,converter:ye,reflect:!1,hasChanged:je},cn=(e=ln,t,o)=>{let{kind:r,metadata:n}=o,s=globalThis.litPropertyMetadata.get(n);if(s===void 0&&globalThis.litPropertyMetadata.set(n,s=new Map),r==="setter"&&((e=Object.create(e)).wrapped=!0),s.set(o.name,e),r==="accessor"){let{name:i}=o;return{set(a){let l=t.get.call(this);t.set.call(this,a),this.requestUpdate(i,l,e)},init(a){return a!==void 0&&this.C(i,void 0,e,a),a}}}if(r==="setter"){let{name:i}=o;return function(a){let l=this[i];t.call(this,a),this.requestUpdate(i,l,e)}}throw Error("Unsupported decorator location: "+r)};function h(e){return(t,o)=>typeof o=="object"?cn(e,t,o):((r,n,s)=>{let i=n.hasOwnProperty(s);return n.constructor.createProperty(s,r),i?Object.getOwnPropertyDescriptor(n,s):void 0})(e,t,o)}function E(e){return h({...e,state:!0,attribute:!1})}var oe=(e,t,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,o),o);function O(e,t){return(o,r,n)=>{let s=i=>i.renderRoot?.querySelector(e)??null;if(t){let{get:i,set:a}=typeof r=="object"?o:n??(()=>{let l=Symbol();return{get(){return this[l]},set(d){this[l]=d}}})();return oe(o,r,{get(){let l=i.call(this);return l===void 0&&(l=s(this),(l!==null||this.hasUpdated)&&a.call(this,l)),l}})}return oe(o,r,{get(){return s(this)}})}}var pn=`:host {
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
`,Ve,P=class extends R{constructor(){super(),ao(this,Ve,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(t,o)=>{if(this.internals?.states)try{o?this.internals.states.add(t):this.internals.states.delete(t)}catch(r){if(String(r).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw r}},has:t=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(t)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let e=this.constructor;for(let[t,o]of e.elementProperties)o.default==="inherit"&&o.initial!==void 0&&typeof t=="string"&&this.customStates.set(`initial-${t}-${o.initial}`,!0)}static get styles(){let e=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[pn,...e].map(t=>typeof t=="string"?Z(t):t)}attributeChangedCallback(e,t,o){io(this,Ve)||(this.constructor.elementProperties.forEach((r,n)=>{r.reflect&&this[n]!=null&&this.initialReflectedProperties.set(n,this[n])}),lo(this,Ve,!0)),super.attributeChangedCallback(e,t,o)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,o)=>{e.has(o)&&this[o]==null&&(this[o]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(t=>{t.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(t){if(this.didSSR&&!this.hasUpdated){let o=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});o.error=t,this.dispatchEvent(o)}throw t}}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};Ve=new WeakMap;p([h()],P.prototype,"dir",2);p([h()],P.prototype,"lang",2);p([h({type:Boolean,reflect:!0,attribute:"did-ssr"})],P.prototype,"didSSR",2);var _={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},j=e=>(...t)=>({_$litDirective$:e,values:t}),z=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,o,r){this._$Ct=t,this._$AM=o,this._$Ci=r}_$AS(t,o){return this.update(t,o)}update(t,o){return this.render(...o)}};var K=j(class extends z{constructor(e){if(super(e),e.type!==_.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((r=>r!==""))));for(let r in t)t[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(t)}let o=e.element.classList;for(let r of this.st)r in t||(o.remove(r),this.st.delete(r));for(let r in t){let n=!!t[r];n===this.st.has(r)||this.nt?.has(r)||(n?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return k}});var{I:dn}=Ao;var $o=(e,t)=>t===void 0?e?._$litType$!==void 0:e?._$litType$===t;var _o=e=>e.strings===void 0,So=()=>document.createComment(""),ae=(e,t,o)=>{let r=e._$AA.parentNode,n=t===void 0?e._$AB:t._$AA;if(o===void 0){let s=r.insertBefore(So(),n),i=r.insertBefore(So(),n);o=new dn(s,i,e,e.options)}else{let s=o._$AB.nextSibling,i=o._$AM,a=i!==e;if(a){let l;o._$AQ?.(e),o._$AM=e,o._$AP!==void 0&&(l=e._$AU)!==i._$AU&&o._$AP(l)}if(s!==n||a){let l=o._$AA;for(;l!==s;){let d=l.nextSibling;r.insertBefore(l,n),l=d}}}return o},J=(e,t,o=e)=>(e._$AI(t,o),e),fn={},Ke=(e,t=fn)=>e._$AH=t,To=e=>e._$AH,Je=e=>{e._$AR(),e._$AA.remove()};var le=j(class extends z{constructor(e){if(super(e),e.type!==_.PROPERTY&&e.type!==_.ATTRIBUTE&&e.type!==_.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!_o(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===k||t===x)return t;let o=e.element,r=e.name;if(e.type===_.PROPERTY){if(t===o[r])return k}else if(e.type===_.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(r))return k}else if(e.type===_.ATTRIBUTE&&o.getAttribute(r)===t+"")return k;return Ke(e),t}});function Tt(e,t,o){return e?t(e):o?.(e)}var hn=class extends Event{constructor(){super("wa-after-collapse",{bubbles:!0,cancelable:!1,composed:!0})}},mn=class extends Event{constructor(){super("wa-after-expand",{bubbles:!0,cancelable:!1,composed:!0})}},un=class extends Event{constructor(){super("wa-collapse",{bubbles:!0,cancelable:!1,composed:!0})}},gn=class extends Event{constructor(){super("wa-expand",{bubbles:!0,cancelable:!1,composed:!0})}},yn=class extends Event{constructor(){super("wa-lazy-change",{bubbles:!0,cancelable:!1,composed:!0})}},xn=class extends Event{constructor(){super("wa-lazy-load",{bubbles:!0,cancelable:!1,composed:!0})}},bn=`:host {
  --show-duration: 200ms;
  --hide-duration: 200ms;

  display: block;
  color: var(--wa-color-text-normal);
  outline: 0;
  z-index: 0;
}

:host(:focus) {
  outline: none;
}

slot:not([name])::slotted(wa-icon) {
  margin-inline-end: var(--wa-space-xs);
}

.tree-item {
  position: relative;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  cursor: default;
  user-select: none;
  -webkit-user-select: none;
}

.checkbox {
  line-height: var(--wa-form-control-value-line-height);
  pointer-events: none;
}

.expand-button,
.checkbox,
.label {
  font-family: inherit;
  font-size: var(--wa-font-size-m);
  font-weight: inherit;
}

.checkbox::part(base) {
  display: flex;
  align-items: center;
}

.indentation {
  display: block;
  width: 1em;
  flex-shrink: 0;
}

.expand-button {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--wa-color-text-quiet);
  width: 2em;
  height: 2em;
  flex-shrink: 0;
  cursor: pointer;
}

.expand-button {
  transition: rotate var(--wa-transition-normal) var(--wa-transition-easing);
}

.tree-item-expanded .expand-button {
  rotate: 90deg;
}

.tree-item-expanded:dir(rtl) .expand-button {
  rotate: -90deg;
}

.tree-item-expanded slot[name='expand-icon'],
.tree-item:not(.tree-item-expanded) slot[name='collapse-icon'] {
  display: none;
}

.tree-item:not(.tree-item-has-expand-button) .expand-icon-slot {
  display: none;
}

.expand-button-visible {
  cursor: pointer;
}

.item {
  display: flex;
  align-items: center;
  border-inline-start: solid 3px transparent;
}

:host([disabled]) .item {
  opacity: 0.5;
  outline: none;
  cursor: not-allowed;
}

:host(:focus-visible) .item {
  outline: var(--wa-focus-ring);
  outline-offset: var(--wa-focus-ring-offset);
  z-index: 2;
}

:host(:not([aria-disabled='true'])) .tree-item-selected .item {
  background-color: var(--wa-color-neutral-fill-quiet);
  border-inline-start-color: var(--wa-color-brand-fill-loud);
}

:host(:not([aria-disabled='true'])) .expand-button {
  color: var(--wa-color-text-quiet);
}

.label {
  display: flex;
  align-items: center;
  transition: color var(--wa-transition-normal) var(--wa-transition-easing);
}

.children {
  display: block;
  font-size: calc(1em + var(--indent-size, var(--wa-space-m)));
}

/* Indentation lines */
.children {
  position: relative;
}

.children::before {
  content: '';
  position: absolute;
  top: var(--indent-guide-offset);
  bottom: var(--indent-guide-offset);
  inset-inline-start: calc(1em - (var(--indent-guide-width) / 2) - 1px);
  border-inline-end: var(--indent-guide-width) var(--indent-guide-style) var(--indent-guide-color);
  z-index: 1;
}

@media (forced-colors: active) {
  :host(:not([aria-disabled='true'])) .tree-item-selected .item {
    outline: dashed 1px SelectedItem;
  }
}
`,g=class extends P{constructor(){super(...arguments),this.localize=new se(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(e){return e instanceof Element&&e.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange()}async animateCollapse(){this.dispatchEvent(new un);let e=yt(getComputedStyle(this.childrenContainer).getPropertyValue("--hide-duration"));await gt(this.childrenContainer,[{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],{duration:e,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.hidden=!0,this.dispatchEvent(new hn)}isNestedItem(){let e=this.parentElement;return!!e&&g.isTreeItem(e)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0}willUpdate(e){e.has("selected")&&!e.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.dispatchEvent(new gn),this.childrenContainer.hidden=!1;let e=yt(getComputedStyle(this.childrenContainer).getPropertyValue("--show-duration"));await gt(this.childrenContainer,[{height:"0",opacity:"0",overflow:"hidden"},{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"}],{duration:e,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.style.height="auto",this.dispatchEvent(new mn)}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleExpandedState(){this.customStates.set("expanded",this.expanded)}handleIndeterminateStateChange(){this.customStates.set("indeterminate",this.indeterminate)}handleSelectedChange(){this.customStates.set("selected",this.selected),this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.dispatchEvent(new xn)):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.dispatchEvent(new yn)}getChildrenItems({includeDisabled:e=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(t=>g.isTreeItem(t)&&(e||!t.disabled)):[]}render(){let e=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl",t=!this.loading&&(!this.isLeaf||this.lazy);return v`
      <div
        part="base"
        class="${K({"tree-item":!0,"tree-item-expanded":this.expanded,"tree-item-selected":this.selected,"tree-item-leaf":this.isLeaf,"tree-item-has-expand-button":t})}"
      >
        <div class="item" part="item">
          <div class="indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${K({"expand-button":!0,"expand-button-visible":t})}
            aria-hidden="true"
          >
            <slot class="expand-icon-slot" name="expand-icon">
              ${Tt(this.loading,()=>v` <wa-spinner part="spinner" exportparts="base:spinner__base"></wa-spinner> `)}
              <wa-icon name=${e?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
            </slot>
            <slot class="expand-icon-slot" name="collapse-icon">
              <wa-icon name=${e?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
            </slot>
          </div>

          ${Tt(this.selectable,()=>v`
              <wa-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="checkbox"
                ?disabled="${this.disabled}"
                ?checked="${le(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></wa-checkbox>
            `)}

          <slot class="label" part="label"></slot>
        </div>

        <div class="children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `}};g.css=bn;p([E()],g.prototype,"indeterminate",2);p([E()],g.prototype,"isLeaf",2);p([E()],g.prototype,"loading",2);p([E()],g.prototype,"selectable",2);p([h({type:Boolean,reflect:!0})],g.prototype,"expanded",2);p([h({type:Boolean,reflect:!0})],g.prototype,"selected",2);p([h({type:Boolean,reflect:!0})],g.prototype,"disabled",2);p([h({type:Boolean,reflect:!0})],g.prototype,"lazy",2);p([O("slot:not([name])")],g.prototype,"defaultSlot",2);p([O("slot[name=children]")],g.prototype,"childrenSlot",2);p([O(".item")],g.prototype,"itemElement",2);p([O(".children")],g.prototype,"childrenContainer",2);p([O(".expand-button slot")],g.prototype,"expandButtonSlot",2);p([A("loading",{waitUntilFirstUpdate:!0})],g.prototype,"handleLoadingChange",1);p([A("disabled")],g.prototype,"handleDisabledChange",1);p([A("expanded")],g.prototype,"handleExpandedState",1);p([A("indeterminate")],g.prototype,"handleIndeterminateStateChange",1);p([A("selected")],g.prototype,"handleSelectedChange",1);p([A("expanded",{waitUntilFirstUpdate:!0})],g.prototype,"handleExpandedChange",1);p([A("expanded",{waitUntilFirstUpdate:!0})],g.prototype,"handleExpandAnimation",1);p([A("lazy",{waitUntilFirstUpdate:!0})],g.prototype,"handleLazyChange",1);g=p([I("wa-tree-item")],g);var Lo=(e={})=>{let{validationElement:t,validationProperty:o}=e;t||(t=Object.assign(document.createElement("input"),{required:!0})),o||(o="value");let r={observedAttributes:["required"],message:t.validationMessage,checkValidity(n){let s={message:"",isValid:!0,invalidKeys:[]};return(n.required??n.hasAttribute("required"))&&!n[o]&&(s.message=typeof r.message=="function"?r.message(n):r.message||"",s.isValid=!1,s.invalidKeys.push("valueMissing")),s}};return r};var Io=`:host {
  display: flex;
  flex-direction: column;
}

/* Label */
:is([part~='form-control-label'], [part~='label']):has(*:not(:empty)) {
  display: inline-flex;
  color: var(--wa-form-control-label-color);
  font-weight: var(--wa-form-control-label-font-weight);
  line-height: var(--wa-form-control-label-line-height);
  margin-block-end: 0.5em;
}

:host([required]) :is([part~='form-control-label'], [part~='label'])::after {
  content: var(--wa-form-control-required-content);
  margin-inline-start: var(--wa-form-control-required-content-offset);
  color: var(--wa-form-control-required-content-color);
}

/* Help text */
[part~='hint'] {
  display: block;
  color: var(--wa-form-control-hint-color);
  font-weight: var(--wa-form-control-hint-font-weight);
  line-height: var(--wa-form-control-hint-line-height);
  margin-block-start: 0.5em;
  font-size: var(--wa-font-size-smaller);
  line-height: var(--wa-form-control-label-line-height);

  &:not(.has-slotted) {
    display: none;
  }
}
`;var vn=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}},wn=()=>({observedAttributes:["custom-error"],checkValidity(e){let t={message:"",isValid:!0,invalidKeys:[]};return e.customError&&(t.message=e.customError,t.isValid=!1,t.invalidKeys=["customError"]),t}}),U=class extends P{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=e=>{e.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new vn))},this.handleInteraction=e=>{let t=this.emittedEvents;t.includes(e.type)||t.push(e.type),t.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[wn()]}static get observedAttributes(){let e=new Set(super.observedAttributes||[]);for(let t of this.validators)if(t.observedAttributes)for(let o of t.observedAttributes)e.add(o);return[...e]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(e=>{this.addEventListener(e,this.handleInteraction)})}firstUpdated(...e){super.firstUpdated(...e),this.updateValidity()}willUpdate(e){if(!!1&&e.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),e.has("value")||e.has("disabled")){let t=this.value;if(Array.isArray(t)){if(this.name){let o=new FormData;for(let r of t)o.append(this.name,r);this.setValue(o,o)}}else this.setValue(t,t)}e.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!!1&&!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),this.updateValidity(),super.willUpdate(e)}get labels(){return this.internals.labels}getForm(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...e){let t=e[0],o=e[1],r=e[2];r||(r=this.validationTarget),this.internals.setValidity(t,o,r||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let e=!!this.required,t=this.internals.validity.valid,o=this.hasInteracted;this.customStates.set("required",e),this.customStates.set("optional",!e),this.customStates.set("invalid",!t),this.customStates.set("valid",t),this.customStates.set("user-invalid",!t&&o),this.customStates.set("user-valid",t&&o)}setCustomValidity(e){if(!e){this.customError=null,this.setValidity({});return}this.customError=e,this.setValidity({customError:!0},e,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(e){this.disabled=e,this.updateValidity()}formStateRestoreCallback(e,t){this.value=e,t==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...e){let[t,o]=e;this.internals.setFormValue(t,o)}get allValidators(){let e=this.constructor.validators||[],t=this.validators||[];return[...e,...t]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}let e=this.allValidators;if(!e?.length)return;let t={customError:!!this.customError},o=this.validationTarget||this.input||void 0,r="";for(let n of e){let{isValid:s,message:i,invalidKeys:a}=n.checkValidity(this);s||(r||(r=i),a?.length>=0&&a.forEach(l=>t[l]=!0))}r||(r=this.validationMessage),this.setValidity(t,r,o)}};U.formAssociated=!0;p([h({reflect:!0})],U.prototype,"name",2);p([h({type:Boolean})],U.prototype,"disabled",2);p([h({state:!0,attribute:!1})],U.prototype,"valueHasChanged",2);p([h({state:!0,attribute:!1})],U.prototype,"hasInteracted",2);p([h({attribute:"custom-error",reflect:!0})],U.prototype,"customError",2);p([h({attribute:!1,state:!0,type:Object})],U.prototype,"validity",1);var Oo=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=o=>{let r=o.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return[...this.host.childNodes].some(e=>{if(e.nodeType===Node.TEXT_NODE&&e.textContent.trim()!=="")return!0;if(e.nodeType===Node.ELEMENT_NODE){let t=e;if(t.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!t.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(e){return this.host.querySelector(`:scope > [slot="${e}"]`)!==null}test(e){return e==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};var Po=`@layer wa-utilities {
  :host([size='small']),
  .wa-size-s {
    font-size: var(--wa-font-size-s);
  }

  :host([size='medium']),
  .wa-size-m {
    font-size: var(--wa-font-size-m);
  }

  :host([size='large']),
  .wa-size-l {
    font-size: var(--wa-font-size-l);
  }
}
`;var Lt=e=>e??x;var kn=`:host {
  --checked-icon-color: var(--wa-color-brand-on-loud);
  --checked-icon-scale: 0.8;

  display: inline-flex;
  color: var(--wa-form-control-value-color);
  font-family: inherit;
  font-weight: var(--wa-form-control-value-font-weight);
  line-height: var(--wa-form-control-value-line-height);
  user-select: none;
  -webkit-user-select: none;
}

[part~='control'] {
  display: inline-flex;
  flex: 0 0 auto;
  position: relative;
  align-items: center;
  justify-content: center;
  width: var(--wa-form-control-toggle-size);
  height: var(--wa-form-control-toggle-size);
  border-color: var(--wa-form-control-border-color);
  border-radius: min(
    calc(var(--wa-form-control-toggle-size) * 0.375),
    var(--wa-border-radius-s)
  ); /* min prevents entirely circular checkbox */
  border-style: var(--wa-border-style);
  border-width: var(--wa-form-control-border-width);
  background-color: var(--wa-form-control-background-color);
  transition:
    background var(--wa-transition-normal),
    border-color var(--wa-transition-fast),
    box-shadow var(--wa-transition-fast),
    color var(--wa-transition-fast);
  transition-timing-function: var(--wa-transition-easing);

  margin-inline-end: 0.5em;
}

[part~='base'] {
  display: flex;
  align-items: flex-start;
  position: relative;
  color: currentColor;
  vertical-align: middle;
  cursor: pointer;
}

[part~='label'] {
  display: inline;
}

/* Checked */
[part~='control']:has(:checked, :indeterminate) {
  color: var(--checked-icon-color);
  border-color: var(--wa-form-control-activated-color);
  background-color: var(--wa-form-control-activated-color);
}

/* Focus */
[part~='control']:has(> input:focus-visible:not(:disabled)) {
  outline: var(--wa-focus-ring);
  outline-offset: var(--wa-focus-ring-offset);
}

/* Disabled */
:host [part~='base']:has(input:disabled) {
  opacity: 0.5;
  cursor: not-allowed;
}

input {
  position: absolute;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  pointer-events: none;
}

[part~='icon'] {
  display: flex;
  scale: var(--checked-icon-scale);

  /* Without this, Safari renders the icon slightly to the left */
  &::part(svg) {
    translate: 0.0009765625em;
  }

  input:not(:checked, :indeterminate) + & {
    visibility: hidden;
  }
}

:host([required]) [part~='label']::after {
  content: var(--wa-form-control-required-content);
  color: var(--wa-form-control-required-content-color);
  margin-inline-start: var(--wa-form-control-required-content-offset);
}
`,C=class extends U{constructor(){super(...arguments),this.hasSlotController=new Oo(this,"hint"),this.title="",this.name="",this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.form=null,this.required=!1,this.hint=""}static get validators(){let e=[Lo({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...e]}get value(){let e=this._value||"on";return this.checked?e:null}set value(e){this._value=e}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleDefaultCheckedChange(){!this.hasInteracted&&this.checked!==this.defaultChecked&&(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(e){super.willUpdate(e),e.has("defaultChecked")&&(this.hasInteracted||(this.checked=this.defaultChecked)),(e.has("value")||e.has("checked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}render(){let e=this.hasSlotController.test("hint"),t=this.hint?!0:!!e,o=!this.checked&&this.indeterminate,r=o?"indeterminate":"check",n=o?"indeterminate":"check";return v`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${Lt(this._value)}
            .indeterminate=${le(this.indeterminate)}
            .checked=${le(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${n}-icon icon" library="system" name=${r}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${t?"false":"true"}
        class="${K({"has-slotted":t})}"
      >
        ${this.hint}
      </slot>
    `}};C.css=[Io,Po,kn];C.shadowRootOptions={...U.shadowRootOptions,delegatesFocus:!0};p([O('input[type="checkbox"]')],C.prototype,"input",2);p([h()],C.prototype,"title",2);p([h({reflect:!0})],C.prototype,"name",2);p([h({reflect:!0})],C.prototype,"value",1);p([h({reflect:!0})],C.prototype,"size",2);p([h({type:Boolean})],C.prototype,"disabled",2);p([h({type:Boolean,reflect:!0})],C.prototype,"indeterminate",2);p([h({type:Boolean,attribute:!1})],C.prototype,"checked",2);p([h({type:Boolean,reflect:!0,attribute:"checked"})],C.prototype,"defaultChecked",2);p([h({reflect:!0})],C.prototype,"form",2);p([h({type:Boolean,reflect:!0})],C.prototype,"required",2);p([h()],C.prototype,"hint",2);p([A("defaultChecked")],C.prototype,"handleDefaultCheckedChange",1);p([A(["checked","indeterminate"])],C.prototype,"handleStateChange",1);p([A("disabled")],C.prototype,"handleDisabledChange",1);C=p([I("wa-checkbox")],C);var En=`:host {
  --track-width: 2px;
  --track-color: var(--wa-color-neutral-fill-normal);
  --indicator-color: var(--wa-color-brand-fill-loud);
  --speed: 2s;

  /* Resizing a spinner element using anything but font-size will break the animation because the animation uses em units.
   Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can grow/shrink and
   break the animation. The use of \`flex: none\` on the host element prevents this by always having the spinner sized
   according to its actual dimensions.
  */
  flex: none;
  display: inline-flex;
  width: 1em;
  height: 1em;
}

svg {
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  animation: spin var(--speed) linear infinite;
}

.track {
  stroke: var(--track-color);
}

.indicator {
  stroke: var(--indicator-color);
  stroke-dasharray: 75, 100;
  stroke-dashoffset: -5;
  animation: dash 1.5s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
`,It=class extends P{constructor(){super(...arguments),this.localize=new se(this)}render(){return v`
      <svg
        part="base"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
        <circle class="indicator" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
      </svg>
    `}};It.css=En;It=p([I("wa-spinner")],It);var Ro=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};var Ot="";function Cn(e){Ot=e}function An(){if(!Ot){let e=document.querySelector("[data-fa-kit-code]");e&&Cn(e.getAttribute("data-fa-kit-code")||"")}return Ot}var W="7.0.1";function Sn(e,t,o){let r=An(),n=r.length>0,s="solid";return t==="notdog"?(o==="solid"&&(s="solid"),o==="duo-solid"&&(s="duo-solid"),`https://ka-p.fontawesome.com/releases/v${W}/svgs/notdog-${s}/${e}.svg?token=${encodeURIComponent(r)}`):t==="chisel"?`https://ka-p.fontawesome.com/releases/v${W}/svgs/chisel-regular/${e}.svg?token=${encodeURIComponent(r)}`:t==="etch"?`https://ka-p.fontawesome.com/releases/v${W}/svgs/etch-solid/${e}.svg?token=${encodeURIComponent(r)}`:t==="jelly"?(o==="regular"&&(s="regular"),o==="duo-regular"&&(s="duo-regular"),o==="fill-regular"&&(s="fill-regular"),`https://ka-p.fontawesome.com/releases/v${W}/svgs/jelly-${s}/${e}.svg?token=${encodeURIComponent(r)}`):t==="slab"?((o==="solid"||o==="regular")&&(s="regular"),o==="press-regular"&&(s="press-regular"),`https://ka-p.fontawesome.com/releases/v${W}/svgs/slab-${s}/${e}.svg?token=${encodeURIComponent(r)}`):t==="thumbprint"?`https://ka-p.fontawesome.com/releases/v${W}/svgs/thumbprint-light/${e}.svg?token=${encodeURIComponent(r)}`:t==="whiteboard"?`https://ka-p.fontawesome.com/releases/v${W}/svgs/whiteboard-semibold/${e}.svg?token=${encodeURIComponent(r)}`:(t==="classic"&&(o==="thin"&&(s="thin"),o==="light"&&(s="light"),o==="regular"&&(s="regular"),o==="solid"&&(s="solid")),t==="sharp"&&(o==="thin"&&(s="sharp-thin"),o==="light"&&(s="sharp-light"),o==="regular"&&(s="sharp-regular"),o==="solid"&&(s="sharp-solid")),t==="duotone"&&(o==="thin"&&(s="duotone-thin"),o==="light"&&(s="duotone-light"),o==="regular"&&(s="duotone-regular"),o==="solid"&&(s="duotone")),t==="sharp-duotone"&&(o==="thin"&&(s="sharp-duotone-thin"),o==="light"&&(s="sharp-duotone-light"),o==="regular"&&(s="sharp-duotone-regular"),o==="solid"&&(s="sharp-duotone-solid")),t==="brands"&&(s="brands"),n?`https://ka-p.fontawesome.com/releases/v${W}/svgs/${s}/${e}.svg?token=${encodeURIComponent(r)}`:`https://ka-f.fontawesome.com/releases/v${W}/svgs/${s}/${e}.svg`)}var $n={name:"default",resolver:(e,t="classic",o="solid")=>Sn(e,t,o),mutator:(e,t)=>{if(t?.family&&!e.hasAttribute("data-duotone-initialized")){let{family:o,variant:r}=t;if(o==="duotone"||o==="sharp-duotone"||o==="notdog"&&r==="duo-solid"||o==="jelly"&&r==="duo-regular"||o==="thumbprint"){let n=[...e.querySelectorAll("path")],s=n.find(a=>!a.hasAttribute("opacity")),i=n.find(a=>a.hasAttribute("opacity"));if(!s||!i)return;if(s.setAttribute("data-duotone-primary",""),i.setAttribute("data-duotone-secondary",""),t.swapOpacity&&s&&i){let a=i.getAttribute("opacity")||"0.4";s.style.setProperty("--path-opacity",a),i.style.setProperty("--path-opacity","1")}e.setAttribute("data-duotone-initialized","")}}}},zo=$n;function _n(e){return`data:image/svg+xml,${encodeURIComponent(e)}`}var Pt={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},Tn={name:"system",resolver:(e,t="classic",o="solid")=>{let n=Pt[o][e]??Pt.regular[e]??Pt.regular["circle-question"];return n?_n(n):""}},Mo=Tn;var Ln="classic",In=[zo,Mo],Rt=[];function Do(e){Rt.push(e)}function Bo(e){Rt=Rt.filter(t=>t!==e)}function Ge(e){return In.find(t=>t.name===e)}function jo(){return Ln}var On=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}},Pn=`:host {
  --primary-color: currentColor;
  --primary-opacity: 1;
  --secondary-color: currentColor;
  --secondary-opacity: 0.4;

  box-sizing: content-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: -0.125em;
}

/* Standard */
:host(:not([auto-width])) {
  width: 1.25em;
  height: 1em;
}

/* Auto-width */
:host([auto-width]) {
  width: auto;
  height: 1em;
}

svg {
  height: 1em;
  fill: currentColor;
  overflow: visible;

  /* Duotone colors with path-specific opacity fallback */
  path[data-duotone-primary] {
    color: var(--primary-color);
    opacity: var(--path-opacity, var(--primary-opacity));
  }

  path[data-duotone-secondary] {
    color: var(--secondary-color);
    opacity: var(--path-opacity, var(--secondary-opacity));
  }
}
`,Ee=Symbol(),Ze=Symbol(),zt,Mt=new Map,L=class extends P{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.resolveIcon=async(e,t)=>{let o;if(t?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=v`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,await this.updateComplete;let r=this.shadowRoot.querySelector("[part='svg']");return typeof t.mutator=="function"&&t.mutator(r,this),this.svg}try{if(o=await fetch(e,{mode:"cors"}),!o.ok)return o.status===410?Ee:Ze}catch{return Ze}try{let r=document.createElement("div");r.innerHTML=await o.text();let n=r.firstElementChild;if(n?.tagName?.toLowerCase()!=="svg")return Ee;zt||(zt=new DOMParser);let i=zt.parseFromString(n.outerHTML,"text/html").body.querySelector("svg");return i?(i.part.add("svg"),document.adoptNode(i)):Ee}catch{return Ee}}}connectedCallback(){super.connectedCallback(),Do(this)}firstUpdated(e){super.firstUpdated(e),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),Bo(this)}getIconSource(){let e=Ge(this.library),t=this.family||jo();return this.name&&e?{url:e.resolver(this.name,t,this.variant,this.autoWidth),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:e,fromLibrary:t}=this.getIconSource(),o=t?Ge(this.library):void 0;if(!e){this.svg=null;return}let r=Mt.get(e);r||(r=this.resolveIcon(e,o),Mt.set(e,r));let n=await r;if(n===Ze&&Mt.delete(e),e===this.getIconSource().url){if($o(n)){this.svg=n;return}switch(n){case Ze:case Ee:this.svg=null,this.dispatchEvent(new On);break;default:this.svg=n.cloneNode(!0),o?.mutator?.(this.svg,this),this.dispatchEvent(new Ro)}}}updated(e){super.updated(e);let t=Ge(this.library),o=this.shadowRoot?.querySelector("svg");o&&t?.mutator?.(o,this)}render(){return this.hasUpdated?this.svg:v`<svg part="svg" fill="currentColor" width="16" height="16"></svg>`}};L.css=Pn;p([E()],L.prototype,"svg",2);p([h({reflect:!0})],L.prototype,"name",2);p([h({reflect:!0})],L.prototype,"family",2);p([h({reflect:!0})],L.prototype,"variant",2);p([h({attribute:"auto-width",type:Boolean,reflect:!0})],L.prototype,"autoWidth",2);p([h({attribute:"swap-opacity",type:Boolean,reflect:!0})],L.prototype,"swapOpacity",2);p([h()],L.prototype,"src",2);p([h()],L.prototype,"label",2);p([h({reflect:!0})],L.prototype,"library",2);p([A("label")],L.prototype,"handleLabelChange",1);p([A(["family","name","library","variant","src","autoWidth","swapOpacity"])],L.prototype,"setIcon",1);L=p([I("wa-icon")],L);function Uo(e,t,o){let r=n=>Object.is(n,-0)?0:n;return e<t?r(t):e>o?r(o):r(e)}var Rn=class extends Event{constructor(e){super("wa-selection-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}},zn=`:host {
  /*
     * These are actually used by tree item, but we define them here so they can more easily be set and all tree items
     * stay consistent.
     */
  --indent-guide-color: var(--wa-color-surface-border);
  --indent-guide-offset: 0;
  --indent-guide-style: solid;
  --indent-guide-width: 0;
  --indent-size: var(--wa-space-l);

  display: block;

  /*
     * Tree item indentation uses the "em" unit to increment its width on each level, so setting the font size to zero
     * here removes the indentation for all the nodes on the first level.
     */
  font-size: 0;
}
`;function No(e,t=!1){function o(s){let i=s.getChildrenItems({includeDisabled:!1});if(i.length){let a=i.every(d=>d.selected),l=i.every(d=>!d.selected&&!d.indeterminate);s.selected=a,s.indeterminate=!a&&!l}}function r(s){let i=s.parentElement;g.isTreeItem(i)&&(o(i),r(i))}function n(s){for(let i of s.getChildrenItems())i.selected=t?s.selected||i.selected:!i.disabled&&s.selected,n(i);t&&o(s)}n(e),r(e)}var q=class extends P{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new se(this),this.initTreeItem=e=>{e.updateComplete.then(()=>{e.selectable=this.selection==="multiple",["expand","collapse"].filter(t=>!!this.querySelector(`[slot="${t}-icon"]`)).forEach(t=>{let o=e.querySelector(`[slot="${t}-icon"]`),r=this.getExpandButtonIcon(t);r&&(o===null?e.append(r):o.hasAttribute("data-default")&&o.replaceWith(r))})})},this.handleTreeChanged=e=>{for(let t of e){let o=[...t.addedNodes].filter(g.isTreeItem),r=[...t.removedNodes].filter(g.isTreeItem);o.forEach(this.initTreeItem),this.lastFocusedItem&&r.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=e=>{let t=e.relatedTarget;(!t||!this.contains(t))&&(this.tabIndex=0)},this.handleFocusIn=e=>{let t=e.target;e.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),g.isTreeItem(t)&&!t.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=t,this.tabIndex=-1,t.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("wa-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect()}getExpandButtonIcon(e){let o=(e==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(o){let r=o.cloneNode(!0);return[r,...r.querySelectorAll("[id]")].forEach(n=>n.removeAttribute("id")),r.setAttribute("data-default",""),r.slot=`${e}-icon`,r}return null}selectItem(e){let t=[...this.selectedItems];if(this.selection==="multiple")e.selected=!e.selected,e.lazy&&(e.expanded=!0),No(e);else if(this.selection==="single"||e.isLeaf){let r=this.getAllTreeItems();for(let n of r)n.selected=n===e}else this.selection==="leaf"&&(e.expanded=!e.expanded);let o=this.selectedItems;(t.length!==o.length||o.some(r=>!t.includes(r)))&&Promise.all(o.map(r=>r.updateComplete)).then(()=>{this.dispatchEvent(new Rn({selection:o}))})}getAllTreeItems(){return[...this.querySelectorAll("wa-tree-item")]}focusItem(e){e?.focus()}handleKeyDown(e){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(e.key)||e.composedPath().some(n=>["input","textarea"].includes(n?.tagName?.toLowerCase())))return;let t=this.getFocusableItems(),o=this.matches(":dir(ltr)"),r=this.localize.dir()==="rtl";if(t.length>0){e.preventDefault();let n=t.findIndex(l=>l.matches(":focus")),s=t[n],i=l=>{let d=t[Uo(l,0,t.length-1)];this.focusItem(d)},a=l=>{s.expanded=l};e.key==="ArrowDown"?i(n+1):e.key==="ArrowUp"?i(n-1):o&&e.key==="ArrowRight"||r&&e.key==="ArrowLeft"?!s||s.disabled||s.expanded||s.isLeaf&&!s.lazy?i(n+1):a(!0):o&&e.key==="ArrowLeft"||r&&e.key==="ArrowRight"?!s||s.disabled||s.isLeaf||!s.expanded?i(n-1):a(!1):e.key==="Home"?i(0):e.key==="End"?i(t.length-1):(e.key==="Enter"||e.key===" ")&&(s.disabled||this.selectItem(s))}}handleClick(e){let t=e.target,o=t.closest("wa-tree-item"),r=e.composedPath().some(n=>n?.classList?.contains("expand-button"));!o||o.disabled||t!==this.clickTarget||(r?o.expanded=!o.expanded:this.selectItem(o))}handleMouseDown(e){this.clickTarget=e.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){let e=this.selection==="multiple",t=this.getAllTreeItems();this.setAttribute("aria-multiselectable",e?"true":"false");for(let o of t)o.updateComplete.then(()=>{o.selectable=e});e&&(await this.updateComplete,[...this.querySelectorAll(":scope > wa-tree-item")].forEach(o=>{o.updateComplete.then(()=>{No(o,!0)})}))}get selectedItems(){let e=this.getAllTreeItems(),t=o=>o.selected;return e.filter(t)}getFocusableItems(){let e=this.getAllTreeItems(),t=new Set;return e.filter(o=>{if(o.disabled)return!1;let r=o.parentElement?.closest("[role=treeitem]");return r&&(!r.expanded||r.loading||t.has(r))&&t.add(o),!t.has(o)})}render(){return v`
      <div
        part="base"
        class="tree"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
        <span hidden aria-hidden="true"><slot name="expand-icon"></slot></span>
        <span hidden aria-hidden="true"><slot name="collapse-icon"></slot></span>
      </div>
    `}};q.css=zn;p([O("slot:not([name])")],q.prototype,"defaultSlot",2);p([O("slot[name=expand-icon]")],q.prototype,"expandedIconSlot",2);p([O("slot[name=collapse-icon]")],q.prototype,"collapsedIconSlot",2);p([h()],q.prototype,"selection",2);p([A("selection")],q.prototype,"handleSelectionChange",1);q=p([I("wa-tree")],q);var Fo=(e,t,o)=>{let r=new Map;for(let n=t;n<=o;n++)r.set(e[n],n);return r},Ye=j(class extends z{constructor(e){if(super(e),e.type!==_.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,o){let r;o===void 0?o=t:t!==void 0&&(r=t);let n=[],s=[],i=0;for(let a of e)n[i]=r?r(a,i):i,s[i]=o(a,i),i++;return{values:s,keys:n}}render(e,t,o){return this.dt(e,t,o).values}update(e,[t,o,r]){let n=To(e),{values:s,keys:i}=this.dt(t,o,r);if(!Array.isArray(n))return this.ut=i,s;let a=this.ut??=[],l=[],d,u,c=0,m=n.length-1,f=0,y=s.length-1;for(;c<=m&&f<=y;)if(n[c]===null)c++;else if(n[m]===null)m--;else if(a[c]===i[f])l[f]=J(n[c],s[f]),c++,f++;else if(a[m]===i[y])l[y]=J(n[m],s[y]),m--,y--;else if(a[c]===i[y])l[y]=J(n[c],s[y]),ae(e,l[y+1],n[c]),c++,y--;else if(a[m]===i[f])l[f]=J(n[m],s[f]),ae(e,n[c],n[m]),m--,f++;else if(d===void 0&&(d=Fo(i,f,y),u=Fo(a,c,m)),d.has(a[c]))if(d.has(a[m])){let T=u.get(i[f]),ut=T!==void 0?n[T]:null;if(ut===null){let Qt=ae(e,n[c]);J(Qt,s[f]),l[f]=Qt}else l[f]=J(ut,s[f]),ae(e,n[c],ut),n[T]=null;f++}else Je(n[m]),m--;else Je(n[c]),c++;for(;f<=y;){let T=ae(e,l[y+1]);J(T,s[f]),l[f++]=T}for(;c<=m;){let T=n[c++];T!==null&&Je(T)}return this.ut=i,Ke(e,l),k}});var Wo="important",Mn=" !"+Wo,Dn=j(class extends z{constructor(e){if(super(e),e.type!==_.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,o)=>{let r=e[o];return r==null?t:t+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`}),"")}update(e,[t]){let{style:o}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let r of this.ft)t[r]==null&&(this.ft.delete(r),r.includes("-")?o.removeProperty(r):o[r]=null);for(let r in t){let n=t[r];if(n!=null){this.ft.add(r);let s=typeof n=="string"&&n.endsWith(Mn);r.includes("-")||s?o.setProperty(r,s?n.slice(0,-11):n,s?Wo:""):o[r]=n}}return k}});var Ce=class extends z{constructor(t){if(super(t),this.it=x,t.type!==_.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===x||t==null)return this._t=void 0,this.it=t;if(t===k)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let o=[t];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};Ce.directiveName="unsafeHTML",Ce.resultType=1;var Bn=j(Ce);var Dt=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function Bt(e,t,o,r){e.addEventListener?e.addEventListener(t,o,r):e.attachEvent&&e.attachEvent(`on${t}`,o)}function Ae(e,t,o,r){e&&(e.removeEventListener?e.removeEventListener(t,o,r):e.detachEvent&&e.detachEvent(`on${t}`,o))}function Vo(e,t){let o=t.slice(0,t.length-1),r=[];for(let n=0;n<o.length;n++)r.push(e[o[n].toLowerCase()]);return r}function Ko(e){typeof e!="string"&&(e=""),e=e.replace(/\s/g,"");let t=e.split(","),o=t.lastIndexOf("");for(;o>=0;)t[o-1]+=",",t.splice(o,1),o=t.lastIndexOf("");return t}function jn(e,t){let o=e.length>=t.length?e:t,r=e.length>=t.length?t:e,n=!0;for(let s=0;s<o.length;s++)r.indexOf(o[s])===-1&&(n=!1);return n}function Jo(e){let t=e.keyCode||e.which||e.charCode;return e.code&&/^Key[A-Z]$/.test(e.code)&&(t=e.code.charCodeAt(3)),t}var _e={backspace:8,"\u232B":8,tab:9,clear:12,enter:13,"\u21A9":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,arrowup:38,arrowdown:40,arrowleft:37,arrowright:39,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"\u21EA":20,",":188,".":190,"/":191,"`":192,"-":Dt?173:189,"=":Dt?61:187,";":Dt?59:186,"'":222,"{":219,"}":221,"[":219,"]":221,"\\":220},D={"\u21E7":16,shift:16,"\u2325":18,alt:18,option:18,"\u2303":17,ctrl:17,control:17,"\u2318":91,cmd:91,meta:91,command:91},Se={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},S={16:!1,18:!1,17:!1,91:!1},w={};for(let e=1;e<20;e++)_e[`f${e}`]=111+e;var b=[],$e=null,Go="all",H=new Map,ce=e=>_e[e.toLowerCase()]||D[e.toLowerCase()]||e.toUpperCase().charCodeAt(0),Un=e=>Object.keys(_e).find(t=>_e[t]===e),Nn=e=>Object.keys(D).find(t=>D[t]===e),Zo=e=>{Go=e||"all"},Te=()=>Go||"all",Fn=()=>b.slice(0),Wn=()=>b.map(e=>Un(e)||Nn(e)||String.fromCharCode(e)),qn=()=>{let e=[];return Object.keys(w).forEach(t=>{w[t].forEach(({key:o,scope:r,mods:n,shortcut:s})=>{e.push({scope:r,shortcut:s,mods:n,keys:o.split("+").map(i=>ce(i))})})}),e},Yo=e=>{let t=e.target||e.srcElement,{tagName:o}=t,r=!0,n=o==="INPUT"&&!["checkbox","radio","range","button","file","reset","submit","color"].includes(t.type);return(t.isContentEditable||(n||o==="TEXTAREA"||o==="SELECT")&&!t.readOnly)&&(r=!1),r},Hn=e=>(typeof e=="string"&&(e=ce(e)),b.indexOf(e)!==-1),Vn=(e,t)=>{let o,r;e||(e=Te());for(let n in w)if(Object.prototype.hasOwnProperty.call(w,n))for(o=w[n],r=0;r<o.length;)o[r].scope===e?o.splice(r,1).forEach(({element:s})=>Ut(s)):r++;Te()===e&&Zo(t||"all")};function Kn(e){let t=Jo(e);e.key&&e.key.toLowerCase()==="capslock"&&(t=ce(e.key));let o=b.indexOf(t);if(o>=0&&b.splice(o,1),e.key&&e.key.toLowerCase()==="meta"&&b.splice(0,b.length),(t===93||t===224)&&(t=91),t in S){S[t]=!1;for(let r in D)D[r]===t&&(V[r]=!1)}}var Xo=(e,...t)=>{if(typeof e>"u")Object.keys(w).forEach(o=>{Array.isArray(w[o])&&w[o].forEach(r=>Xe(r)),delete w[o]}),Ut(null);else if(Array.isArray(e))e.forEach(o=>{o.key&&Xe(o)});else if(typeof e=="object")e.key&&Xe(e);else if(typeof e=="string"){let[o,r]=t;typeof o=="function"&&(r=o,o=""),Xe({key:e,scope:o,method:r,splitKey:"+"})}},Xe=({key:e,scope:t,method:o,splitKey:r="+"})=>{Ko(e).forEach(n=>{let s=n.split(r),i=s.length,a=s[i-1],l=a==="*"?"*":ce(a);if(!w[l])return;t||(t=Te());let d=i>1?Vo(D,s):[],u=[];w[l]=w[l].filter(c=>{let m=(o?c.method===o:!0)&&c.scope===t&&jn(c.mods,d);return m&&u.push(c.element),!m}),u.forEach(c=>Ut(c))})};function qo(e,t,o,r){if(t.element!==r)return;let n;if(t.scope===o||t.scope==="all"){n=t.mods.length>0;for(let s in S)Object.prototype.hasOwnProperty.call(S,s)&&(!S[s]&&t.mods.indexOf(+s)>-1||S[s]&&t.mods.indexOf(+s)===-1)&&(n=!1);(t.mods.length===0&&!S[16]&&!S[18]&&!S[17]&&!S[91]||n||t.shortcut==="*")&&(t.keys=[],t.keys=t.keys.concat(b),t.method(e,t)===!1&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0)))}}function Ho(e,t){let o=w["*"],r=Jo(e);if(e.key&&e.key.toLowerCase()==="capslock"||!(V.filter||Yo).call(this,e))return;if((r===93||r===224)&&(r=91),b.indexOf(r)===-1&&r!==229&&b.push(r),["metaKey","ctrlKey","altKey","shiftKey"].forEach(a=>{let l=Se[a];e[a]&&b.indexOf(l)===-1?b.push(l):!e[a]&&b.indexOf(l)>-1?b.splice(b.indexOf(l),1):a==="metaKey"&&e[a]&&(b=b.filter(d=>d in Se||d===r))}),r in S){S[r]=!0;for(let a in D)if(Object.prototype.hasOwnProperty.call(D,a)){let l=Se[D[a]];V[a]=e[l]}if(!o)return}for(let a in S)Object.prototype.hasOwnProperty.call(S,a)&&(S[a]=e[Se[a]]);e.getModifierState&&!(e.altKey&&!e.ctrlKey)&&e.getModifierState("AltGraph")&&(b.indexOf(17)===-1&&b.push(17),b.indexOf(18)===-1&&b.push(18),S[17]=!0,S[18]=!0);let n=Te();if(o)for(let a=0;a<o.length;a++)o[a].scope===n&&(e.type==="keydown"&&o[a].keydown||e.type==="keyup"&&o[a].keyup)&&qo(e,o[a],n,t);if(!(r in w))return;let s=w[r],i=s.length;for(let a=0;a<i;a++)if((e.type==="keydown"&&s[a].keydown||e.type==="keyup"&&s[a].keyup)&&s[a].key){let l=s[a],{splitKey:d}=l,u=l.key.split(d),c=[];for(let m=0;m<u.length;m++)c.push(ce(u[m]));c.sort().join("")===b.sort().join("")&&qo(e,l,n,t)}}var V=function(e,t,o){b=[];let r=Ko(e),n=[],s="all",i=document,a=0,l=!1,d=!0,u="+",c=!1,m=!1;if(o===void 0&&typeof t=="function"&&(o=t),Object.prototype.toString.call(t)==="[object Object]"){let f=t;f.scope&&(s=f.scope),f.element&&(i=f.element),f.keyup&&(l=f.keyup),f.keydown!==void 0&&(d=f.keydown),f.capture!==void 0&&(c=f.capture),typeof f.splitKey=="string"&&(u=f.splitKey),f.single===!0&&(m=!0)}for(typeof t=="string"&&(s=t),m&&Xo(e,s);a<r.length;a++){let f=r[a].split(u);n=[],f.length>1&&(n=Vo(D,f));let y=f[f.length-1];y=y==="*"?"*":ce(y),y in w||(w[y]=[]),w[y].push({keyup:l,keydown:d,scope:s,mods:n,shortcut:r[a],method:o,key:r[a],splitKey:u,element:i})}if(typeof i<"u"&&typeof window<"u"){if(!H.has(i)){let f=(T=window.event)=>Ho(T,i),y=(T=window.event)=>{Ho(T,i),Kn(T)};H.set(i,{keydownListener:f,keyupListenr:y,capture:c}),Bt(i,"keydown",f,c),Bt(i,"keyup",y,c)}if(!$e){let f=()=>{b=[]};$e={listener:f,capture:c},Bt(window,"focus",f,c)}}};function Jn(e,t="all"){Object.keys(w).forEach(o=>{w[o].filter(r=>r.scope===t&&r.shortcut===e).forEach(r=>{r&&r.method&&r.method({},r)})})}function Ut(e){let t=Object.values(w).flat();if(t.findIndex(({element:o})=>o===e)<0&&e){let{keydownListener:o,keyupListenr:r,capture:n}=H.get(e)||{};o&&r&&(Ae(e,"keyup",r,n),Ae(e,"keydown",o,n),H.delete(e))}if((t.length<=0||H.size<=0)&&(Array.from(H.keys()).forEach(o=>{let{keydownListener:r,keyupListenr:n,capture:s}=H.get(o)||{};r&&n&&(Ae(o,"keyup",n,s),Ae(o,"keydown",r,s),H.delete(o))}),H.clear(),Object.keys(w).forEach(o=>delete w[o]),$e)){let{listener:o,capture:r}=$e;Ae(window,"focus",o,r),$e=null}}var jt={getPressedKeyString:Wn,setScope:Zo,getScope:Te,deleteScope:Vn,getPressedKeyCodes:Fn,getAllKeyCodes:qn,isPressed:Hn,filter:Yo,trigger:Jn,unbind:Xo,keyMap:_e,modifier:D,modifierMap:Se};for(let e in jt){let t=e;Object.prototype.hasOwnProperty.call(jt,t)&&(V[t]=jt[t])}if(typeof window<"u"){let e=window.hotkeys;V.noConflict=t=>(t&&window.hotkeys===V&&(window.hotkeys=e),V),window.hotkeys=V}var Qo=e=>{class t extends e{constructor(){super(...arguments);this.#e=!1;this.initialReflectedProperties=new Map}#e;attributeChangedCallback(n,s,i){if(!this.#e){let a=this;this.constructor.elementProperties.forEach((l,d)=>{l.reflect&&a[d]!=null&&this.initialReflectedProperties.set(d,a[d])}),this.initialReflectedProperties.set("slot",this.slot),this.#e=!0}super.attributeChangedCallback?.(n,s,i)}willUpdate(n){super.willUpdate?.(n);let s=this;this.initialReflectedProperties.forEach((i,a)=>{n.has(a)&&s[a]==null&&(s[a]=i)})}}return $([E()],t.prototype,"initialReflectedProperties",2),t};function Nt(e){let t=[];for(let o=0;o<e.length;o++){let r=e[o];r&&t.push(r)}return t}function er(e,t){let o=new Set(t);return e.filter(r=>!o.has(r))}function tr(e){return typeof e=="symbol"||e instanceof Symbol}function Ft(e){return[...new Set(e)]}function Wt(e,...t){return er(e,t)}function or(){}function rr(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function qt(e){return Object.getOwnPropertySymbols(e).filter(t=>Object.prototype.propertyIsEnumerable.call(e,t))}function Le(e){return e==null?e===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}var nr="[object RegExp]",sr="[object String]",ir="[object Number]",ar="[object Boolean]",Ht="[object Arguments]",lr="[object Symbol]",cr="[object Date]",pr="[object Map]",dr="[object Set]",fr="[object Array]",hr="[object Function]",mr="[object ArrayBuffer]",Qe="[object Object]",ur="[object Error]",gr="[object DataView]",yr="[object Uint8Array]",xr="[object Uint8ClampedArray]",br="[object Uint16Array]",vr="[object Uint32Array]",wr="[object BigUint64Array]",kr="[object Int8Array]",Er="[object Int16Array]",Cr="[object Int32Array]",Ar="[object BigInt64Array]",Sr="[object Float32Array]",$r="[object Float64Array]";function re(e){if(!e||typeof e!="object")return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype||Object.getPrototypeOf(t)===null?Object.prototype.toString.call(e)==="[object Object]":!1}function pe(e){return e==="__proto__"}function de(e){if(typeof e!="object"||e==null)return!1;if(Object.getPrototypeOf(e)===null)return!0;if(Object.prototype.toString.call(e)!=="[object Object]"){let o=e[Symbol.toStringTag];return o==null||!Object.getOwnPropertyDescriptor(e,Symbol.toStringTag)?.writable?!1:e.toString()===`[object ${o}]`}let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function et(e,t){return e===t||Number.isNaN(e)&&Number.isNaN(t)}function _r(e,t,o){return Ie(e,t,void 0,void 0,void 0,void 0,o)}function Ie(e,t,o,r,n,s,i){let a=i(e,t,o,r,n,s);if(a!==void 0)return a;if(typeof e==typeof t)switch(typeof e){case"bigint":case"string":case"boolean":case"symbol":case"undefined":return e===t;case"number":return e===t||Object.is(e,t);case"function":return e===t;case"object":return Oe(e,t,s,i)}return Oe(e,t,s,i)}function Oe(e,t,o,r){if(Object.is(e,t))return!0;let n=Le(e),s=Le(t);if(n===Ht&&(n=Qe),s===Ht&&(s=Qe),n!==s)return!1;switch(n){case sr:return e.toString()===t.toString();case ir:{let l=e.valueOf(),d=t.valueOf();return et(l,d)}case ar:case cr:case lr:return Object.is(e.valueOf(),t.valueOf());case nr:return e.source===t.source&&e.flags===t.flags;case hr:return e===t}o=o??new Map;let i=o.get(e),a=o.get(t);if(i!=null&&a!=null)return i===t;o.set(e,t),o.set(t,e);try{switch(n){case pr:{if(e.size!==t.size)return!1;for(let[l,d]of e.entries())if(!t.has(l)||!Ie(d,t.get(l),l,e,t,o,r))return!1;return!0}case dr:{if(e.size!==t.size)return!1;let l=Array.from(e.values()),d=Array.from(t.values());for(let u=0;u<l.length;u++){let c=l[u],m=d.findIndex(f=>Ie(c,f,void 0,e,t,o,r));if(m===-1)return!1;d.splice(m,1)}return!0}case fr:case yr:case xr:case br:case vr:case wr:case kr:case Er:case Cr:case Ar:case Sr:case $r:{if(typeof Buffer<"u"&&Buffer.isBuffer(e)!==Buffer.isBuffer(t)||e.length!==t.length)return!1;for(let l=0;l<e.length;l++)if(!Ie(e[l],t[l],l,e,t,o,r))return!1;return!0}case mr:return e.byteLength!==t.byteLength?!1:Oe(new Uint8Array(e),new Uint8Array(t),o,r);case gr:return e.byteLength!==t.byteLength||e.byteOffset!==t.byteOffset?!1:Oe(new Uint8Array(e),new Uint8Array(t),o,r);case ur:return e.name===t.name&&e.message===t.message;case Qe:{if(!(Oe(e.constructor,t.constructor,o,r)||re(e)&&re(t)))return!1;let d=[...Object.keys(e),...qt(e)],u=[...Object.keys(t),...qt(t)];if(d.length!==u.length)return!1;for(let c=0;c<d.length;c++){let m=d[c],f=e[m];if(!Object.hasOwn(t,m))return!1;let y=t[m];if(!Ie(f,y,m,e,t,o,r))return!1}return!0}default:return!1}}finally{o.delete(e),o.delete(t)}}function Vt(e,t){return _r(e,t,or)}function Tr(e){return Number.isSafeInteger(e)&&e>=0}function Kt(e){return e!=null}function tt(e){return typeof e=="string"}function Lr(e){return e!=null&&typeof e!="function"&&Tr(e.length)}function Ir(e){switch(typeof e){case"number":case"symbol":return!1;case"string":return e.includes(".")||e.includes("[")||e.includes("]")}}function fe(e){return typeof e=="string"||typeof e=="symbol"?e:Object.is(e?.valueOf?.(),-0)?"-0":String(e)}function Jt(e){if(e==null)return"";if(typeof e=="string")return e;if(Array.isArray(e))return e.map(Jt).join(",");let t=String(e);return t==="0"&&Object.is(Number(e),-0)?"-0":t}function ot(e){if(Array.isArray(e))return e.map(fe);if(typeof e=="symbol")return[e];e=Jt(e);let t=[],o=e.length;if(o===0)return t;let r=0,n="",s="",i=!1;for(e.charCodeAt(0)===46&&(t.push(""),r++);r<o;){let a=e[r];s?a==="\\"&&r+1<o?(r++,n+=e[r]):a===s?s="":n+=a:i?a==='"'||a==="'"?s=a:a==="]"?(i=!1,t.push(n),n=""):n+=a:a==="["?(i=!0,n&&(t.push(n),n="")):a==="."?n&&(t.push(n),n=""):n+=a,r++}return n&&t.push(n),t}function he(e,t,o){if(e==null)return o;switch(typeof t){case"string":{if(pe(t))return o;let r=e[t];return r===void 0?Ir(t)?he(e,ot(t),o):o:r}case"number":case"symbol":{typeof t=="number"&&(t=fe(t));let r=e[t];return r===void 0?o:r}default:{if(Array.isArray(t))return Gn(e,t,o);if(Object.is(t?.valueOf(),-0)?t="-0":t=String(t),pe(t))return o;let r=e[t];return r===void 0?o:r}}}function Gn(e,t,o){if(t.length===0)return o;let r=e;for(let n=0;n<t.length;n++){if(r==null||pe(t[n]))return o;r=r[t[n]]}return r===void 0?o:r}function Gt(e){return e!==null&&(typeof e=="object"||typeof e=="function")}var Zn=/^(?:0|[1-9]\d*)$/;function Or(e,t=Number.MAX_SAFE_INTEGER){switch(typeof e){case"number":return Number.isInteger(e)&&e>=0&&e<t;case"symbol":return!1;case"string":return Zn.test(e)}}function Pr(e){return e!==null&&typeof e=="object"&&Le(e)==="[object Arguments]"}var Yn=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Xn=/^\w*$/;function Rr(e,t){return Array.isArray(e)?!1:typeof e=="number"||typeof e=="boolean"||e==null||tr(e)?!0:typeof e=="string"&&(Xn.test(e)||!Yn.test(e))||t!=null&&Object.hasOwn(t,e)}var zr=(e,t,o)=>{let r=e[t];(!(Object.hasOwn(e,t)&&et(r,o))||o===void 0&&!(t in e))&&(e[t]=o)};function Mr(e,t,o,r){if(e==null&&!Gt(e))return e;let n=Rr(t,e)?[t]:Array.isArray(t)?t:typeof t=="string"?ot(t):[t],s=o(he(e,n)),i=e;for(let a=0;a<n.length&&i!=null;a++){let l=fe(n[a]);if(pe(l))continue;let d;if(a===n.length-1)d=s;else{let u=i[l],c=r?.(u,l,e);d=c!==void 0?c:Gt(u)?u:Or(n[a+1])?[]:{}}zr(i,l,d),i=i[l]}return e}function Zt(e,t,o){return Mr(e,t,()=>o,()=>{})}function Dr(e){let t=e?.constructor,o=typeof t=="function"?t.prototype:Object.prototype;return e===o}function Br(e){return rr(e)}function Yt(e,...t){e=Object(e);for(let o=0;o<t.length;o++){let r=t[o];r!=null&&rt(e,r,new WeakMap)}return e}function rt(e,t,o){for(let r in t){let n=t[r],s=e[r];if(s===void 0||!Object.hasOwn(e,r)){e[r]=Qn(n,o);continue}o.get(n)!==s&&es(s,n,o)}}function Qn(e,t){if(t.has(e))return t.get(e);if(de(e)){let o={};return t.set(e,o),rt(o,e,t),o}return e}function es(e,t,o){if(de(e)&&de(t)){o.set(t,e),rt(e,t,o);return}Array.isArray(e)&&Array.isArray(t)&&(o.set(t,e),ts(e,t,o))}function ts(e,t,o){let r=Math.min(t.length,e.length);for(let n=0;n<r;n++)de(e[n])&&de(t[n])&&rt(e[n],t[n],o);for(let n=r;n<t.length;n++)e.push(t[n])}function Pe(e){if(e==null)return!0;if(Lr(e))return typeof e.splice!="function"&&typeof e!="string"&&(typeof Buffer>"u"||!Buffer.isBuffer(e))&&!Br(e)&&!Pr(e)?!1:e.length===0;if(typeof e=="object"){if(e instanceof Map||e instanceof Set)return e.size===0;let t=Object.keys(e);return Dr(e)?t.filter(o=>o!=="constructor").length===0:t.length===0}return!0}var Xt=class{constructor(t,o={}){let r=t.split(".");this.store=Nt(["lb",r.shift()]).join("-"),this.namespace=r.join("."),this.setPersistedData(Yt({},this.getPersistedData(),o))}namespacedPath(t){return`${this.namespace}.${t}`}get(t,o=null){return he(this.getPersistedData(),this.namespacedPath(t),o)}set(t,o){let r=this.getPersistedData();return Zt(r,this.namespacedPath(t),o),this.setPersistedData(r)}getPersistedData(){return JSON.parse(localStorage.getItem(this.store)||"{}")}setPersistedData(t){return localStorage.setItem(this.store,JSON.stringify(t)),this}},jr=e=>{class t extends e{static{this.persist=[]}connectedCallback(){if(super.connectedCallback(),Pe(this.persistAs)){console.warn("Cannot persist data - missing `persist-as` attribute",this);return}this.persistanceStore=new Xt(this.persistAs);let r=this.constructor,n=this;r.persist.forEach(s=>{n[s]=this.persistanceStore.get(s,this[s])})}willUpdate(r){super.willUpdate?.(r),this.persistanceStore&&this.constructor.persist.forEach(s=>{r.get(s)!==void 0&&this.persistanceStore.set(s,this[s])})}afterMorph(){if(this.persistanceStore){let r=this.constructor,n=this;r.persist.forEach(s=>{n[s]=this.persistanceStore.get(s,this[s])})}}}return $([h({attribute:"persist-as"})],t.prototype,"persistAs",2),$([E()],t.prototype,"persistanceStore",2),t};var nt=class extends Event{constructor(t,o){super(t,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=o}};var st=class extends nt{constructor(t,o={}){super("lb-command",{bubbles:!0,cancelable:!1,composed:!0}),this.command=t,this.detail=o}};var it=class extends Event{constructor(t={value:void 0,oldValue:void 0}){super("lb-data",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var at=class extends Event{constructor(t={}){super("lb-display-mode-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var lt=class extends Event{constructor(t){super("lb-drag-end",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var ct=class extends Event{constructor(t){super("lb-drag-start",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var pt=class extends Event{constructor(t={}){super("lb-error",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var dt=class extends Event{constructor(t={}){super("lb-param-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var ft=class extends Event{constructor(t){super("lb-popover-close",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var ht=class extends Event{constructor(t){super("lb-popover-open",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var mt=class extends Event{constructor(t){super("lb-resize",{bubbles:!1,cancelable:!1,composed:!0}),this.detail=t}};var Ur={"lb-command":st,"lb-data":it,"lb-drag-start":ct,"lb-drag-end":lt,"lb-error":pt,"lb-resize":mt,"lb-popover-open":ht,"lb-popover-close":ft,"lb-param-change":dt,"lb-display-mode-change":at};function Nr(e){return Ur[e]}function Fr(e,t){return!Vt(e,t)}var Wr=`:host {
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
`;var Re=class extends Qo(R){constructor(){super();this.cleanupJobs=[]}static{this.shadowRootOptions={...R.shadowRootOptions,serializable:!0}}static{this.morphable=!0}static get styles(){let o=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Wr,...o].map(r=>typeof r=="string"?Z(r):r)}afterMorph(){}get morphable(){return!!this.getStaticProperty("morphable")}disconnectedCallback(){this.cleanupJobs.forEach(o=>o()),super.disconnectedCallback()}addCleanupJob(o){this.cleanupJobs.push(o)}renderToTarget(o,r){ke(r,o)}on(o,r){this.addEventListener(o,r),this.addCleanupJob(()=>this.removeEventListener(o,r))}delegate(o,r){document.addEventListener(o,r),this.addCleanupJob(()=>document.removeEventListener(o,r))}dispatch(o,...r){let n=Nr(o),s=this;if(!n){console.warn(`Unknown event type '${o}'`);return}let i=null;if(re(r[0])?(i=r[0],r=[]):r.length>0&&re(r[r.length-1])&&(i=r.pop()),i?.target){let l=tt(i.target)?document.querySelector(`#${i.target}`):s;l&&(s=l)}let a=[...r,i].filter(Kt);s.dispatchEvent(new n(...a))}getStaticProperty(o){return this.constructor[o]}warn(o){tt(o)&&(o=new Error(o)),this.dispatch("lb-error",{error:o}),console.error(o)}};$([E()],Re.prototype,"cleanupJobs",2);var qr=`:host {
  --wa-color-text-normal: var(--lookbook-text-base);
  --wa-space-xs: var(--lookbook-size-xs);
  --wa-space-m: var(--lookbook-size-xs);
  --wa-form-control-value-line-height: 1.2;
  --wa-font-size-m: var(--lookbook-font-size-md);
  --wa-color-text-quiet: var(--lookbook-text-base);
  --wa-color-neutral-fill-quiet: var(--lookbook-neutral-fill-quietest);
  --wa-color-brand-fill-loud: var(--lookbook-accent-fill-mid);
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#container {
  height: 100%;
  overflow: auto;
}
wa-tree {
  --indent-size: 16px;
  --indent-guide-color: var(--lookbook-divider-quiet);
  --indent-guide-offset: 1px;
  --indent-guide-style: solid;
  --indent-guide-width: 1px;
  padding-block: var(--lookbook-size-sm);
  cursor: pointer;
}
wa-tree-item {
  --show-duration: 200ms;
  --hide-duration: 200ms;
  color: var(--lookbook-text-quiet);
  lb-icon {
    width: 16px;
    color: var(--lookbook-accent-stroke-loud);
  }
  &::part(base) {
    cursor: pointer;
    width: 100%;
  }
  &::part(label) {
    font-size: var(--lookbook-font-size-sm);
    white-space: nowrap;
    font-weight: var(--lookbook-font-weight-semibold);
    width: 100%;
    padding-inline-end: var(--lookbook-size-2xs);
  }
  &::part(item) {
    transition: all 250ms ease;
  }
  &::part(expand-button),
  &::part(collapse-button) {
    width: auto;
    height: auto;
    padding-inline: 4px;
  }
  .nav-label {
    display: flex;
    align-items: center;
    column-gap: var(--lookbook-size-2xs);
    padding-block: 5px;
    width: 100%;
  }
  .nav-label-leaf {
    padding-inline-start: 8px;
    font-weight: var(--lookbook-font-weight-normal);
  }
  .child-count {
    font-style: normal;
    font-weight: var(--lookbook-font-weight-normal);
    color: var(--lookbook-text-quietest);
    font-family: var(--lookbook-font-family-code);
    position: relative;
    top: -1px;
    margin-left: auto;
    transition: color 200ms ease;
  }
  &:hover .child-count {
    color: var(--lookbook-text-quiet);
  }
  &[selected] > .nav-label,
  &[selected] > .nav-label-leaf {
    color: var(--lookbook-accent-text);
    lb-icon::part(svg) {
      stroke-width: 2 !important;
    }
  }
  &[selected] > .nav-label {
    font-weight: var(--lookbook-font-weight-semibold);
  }
  &[selected] > .nav-label-leaf {
    font-weight: var(--lookbook-font-weight-medium);
  }
}
`;var M=class extends jr(Re){constructor(){super(...arguments);this.collapsed=[];this.allItems=[];this.filtered=!1}get items(){return this.filtered?this.filteredItems:this.allItems}get filteredItems(){return this.allItems}handleData(o){let r=o.detail.value||[];Array.isArray(r)?this.allItems=r:this.warn("Data provided to the `lb-nav` component must be an array")}handleCollapse(o){if(o.target?.id){let r=Ft([...this.collapsed,o.target.id]);this.collapsed=r}o.stopPropagation()}handleExpand(o){o.target?.id&&(this.collapsed=Wt(this.collapsed,o.target.id)),o.stopPropagation()}toggleItem(o){if(!o.target)return;let r=o.target.closest("wa-tree-item");r.expanded=!r.expanded,o.preventDefault(),o.stopImmediatePropagation()}handleLinkClick(o){if(!o.target)return;let r=o.target.closest("wa-tree-item");r.getChildrenItems().length&&(r.expanded=r.selected?!r.expanded:!0),o.preventDefault()}handleSelection(o){let r=o.detail.selection[0].querySelector("a[href]");r&&(this.dispatch("lb-command","visit",{url:r.href}),o.preventDefault())}renderItem(o){let r=!this.collapsed.includes(o.id),n=!Pe(o.href),s=K({"nav-label":!0,"nav-label-leaf":o.leaf}),i=()=>v`
      ${o.icon?v`<lb-icon name="${o.icon}"></lb-icon>`:x}
      <span>${o.label}</span>
      ${!r&&o.children.length?v`<small class="child-count">[${o.children.length}]</small>`:x}
    `;return v`
      <wa-tree-item
        ?selected="${o.href===this.activePath}"
        ?expanded="${r}"
        id="${o.id}"
        data-node-type="${o.children.length?"branch":"leaf"}"
        @wa-collapse="${a=>this.handleCollapse(a)}"
        @wa-expand="${a=>this.handleExpand(a)}"
      >
        <lb-icon
          name="chevron-right"
          slot="expand-icon"
        ></lb-icon>
        <lb-icon
          name="chevron-right"
          slot="collapse-icon"
        ></lb-icon>
        ${n?v`
              <a
                href="${o.href}"
                class="${s}"
                @click="${this.handleLinkClick}"
              >
                ${i()}
              </a>
            `:v`
            <button class="${s}" @click="${this.toggleItem}">${i()}</span>
          `}
        ${Ye(o.children,a=>a.id,this.renderItem.bind(this))}
      </wa-tree-item>
    `}render(){return v`
      <div
        id="container"
        @lb-data="${o=>this.handleData(o)}"
        @wa-selection-change="${o=>this.handleSelection(o)}"
      >
        <wa-tree selection="single">
          ${Ye(this.items,o=>o.id,o=>this.renderItem(o))}
        </wa-tree>
        <div
          id="blank-slate"
          ?hidden="${this.allItems.length>0}"
        >
          <slot name="blank-slate"></slot>
        </div>
        <div
          id="no-results"
          ?hidden="${!this.filtered||this.filteredItems.length>0}"
        >
          <slot name="no-results"></slot>
        </div>
        <slot
          name="items"
          hidden
        ></slot>
      </div>
    `}};M.css=qr,M.persist=["collapsed"],$([h({type:Array,useDefault:!0})],M.prototype,"collapsed",2),$([h({attribute:"activepath"})],M.prototype,"activePath",2),$([E({hasChanged:Fr})],M.prototype,"allItems",2),$([E()],M.prototype,"filtered",2),$([E()],M.prototype,"items",1),$([E()],M.prototype,"filteredItems",1),M=$([I("lb-nav")],M);export{M as LookbookNav};
/*! Bundled license information:

@awesome.me/webawesome/dist/chunks/chunk.EFWMJOG7.js:
@awesome.me/webawesome/dist/chunks/chunk.OKWGTFUF.js:
@awesome.me/webawesome/dist/chunks/chunk.I24ISEJH.js:
@awesome.me/webawesome/dist/chunks/chunk.N3AZYXKV.js:
@awesome.me/webawesome/dist/chunks/chunk.I37X32SU.js:
@awesome.me/webawesome/dist/chunks/chunk.LU7TFTYS.js:
@awesome.me/webawesome/dist/chunks/chunk.VKL62CYC.js:
@awesome.me/webawesome/dist/chunks/chunk.EHXOY5WV.js:
@awesome.me/webawesome/dist/chunks/chunk.E2QYHS4N.js:
@awesome.me/webawesome/dist/chunks/chunk.4VLK2F22.js:
@awesome.me/webawesome/dist/chunks/chunk.SFADIYDM.js:
@awesome.me/webawesome/dist/chunks/chunk.GY3LNU3J.js:
@awesome.me/webawesome/dist/chunks/chunk.62OYSVRO.js:
@awesome.me/webawesome/dist/chunks/chunk.RVKKM2WU.js:
@awesome.me/webawesome/dist/chunks/chunk.YNHANM3W.js:
@awesome.me/webawesome/dist/chunks/chunk.I3WWI2TE.js:
@awesome.me/webawesome/dist/chunks/chunk.64T5YF4D.js:
@awesome.me/webawesome/dist/chunks/chunk.LTSJC6DR.js:
@awesome.me/webawesome/dist/chunks/chunk.7VQYTP6Y.js:
@awesome.me/webawesome/dist/components/tree-item/tree-item.js:
@awesome.me/webawesome/dist/chunks/chunk.2WYO32PF.js:
@awesome.me/webawesome/dist/chunks/chunk.AB774LQV.js:
@awesome.me/webawesome/dist/components/tree/tree.js:
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
lit-html/directives/when.js:
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
