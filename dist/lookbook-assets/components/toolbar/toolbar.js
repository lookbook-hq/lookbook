var tn=Object.defineProperty;var en=Object.getOwnPropertyDescriptor;var et=(e,t,o,r)=>{for(var n=r>1?void 0:r?en(t,o):t,i=e.length-1,s;i>=0;i--)(s=e[i])&&(n=(r?s(t,o,n):s(n))||n);return r&&n&&tn(t,o,n),n};var wo=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};var Ye=new Set,Lt=new Map,yt,Ge="ltr",Xe="en",xo=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(xo){let e=new MutationObserver(Eo);Ge=document.documentElement.dir||"ltr",Xe=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function jt(...e){e.map(t=>{let o=t.$code.toLowerCase();Lt.has(o)?Lt.set(o,Object.assign(Object.assign({},Lt.get(o)),t)):Lt.set(o,t),yt||(yt=t)}),Eo()}function Eo(){xo&&(Ge=document.documentElement.dir||"ltr",Xe=document.documentElement.lang||navigator.language),[...Ye.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate()})}var de=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){Ye.add(this.host)}hostDisconnected(){Ye.delete(this.host)}dir(){return`${this.host.dir||Ge}`.toLowerCase()}lang(){return`${this.host.lang||Xe}`.toLowerCase()}getTranslationData(t){var o,r;let n=new Intl.Locale(t.replace(/_/g,"-")),i=n?.language.toLowerCase(),s=(r=(o=n?.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&r!==void 0?r:"",a=Lt.get(`${i}-${s}`),l=Lt.get(i);return{locale:n,language:i,region:s,primary:a,secondary:l}}exists(t,o){var r;let{primary:n,secondary:i}=this.getTranslationData((r=o.lang)!==null&&r!==void 0?r:this.lang());return o=Object.assign({includeFallback:!1},o),!!(n&&n[t]||i&&i[t]||o.includeFallback&&yt&&yt[t])}term(t,...o){let{primary:r,secondary:n}=this.getTranslationData(this.lang()),i;if(r&&r[t])i=r[t];else if(n&&n[t])i=n[t];else if(yt&&yt[t])i=yt[t];else return console.error(`No translation found for: ${String(t)}`),String(t);return typeof i=="function"?i(...o):i}date(t,o){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),o).format(t)}number(t,o){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),o).format(t)}relativeTime(t,o,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(t,o)}};var Ao={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>e===0?"No options selected":e===1?"1 option selected":`${e} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};jt(Ao);var So=Ao;var Co=class extends de{};jt(So);var on=Object.defineProperty,rn=Object.getOwnPropertyDescriptor,ko=e=>{throw TypeError(e)},g=(e,t,o,r)=>{for(var n=r>1?void 0:r?rn(t,o):t,i=e.length-1,s;i>=0;i--)(s=e[i])&&(n=(r?s(t,o,n):s(n))||n);return r&&n&&on(t,o,n),n},$o=(e,t,o)=>t.has(e)||ko("Cannot "+o),_o=(e,t,o)=>($o(e,t,"read from private field"),o?o.call(e):t.get(e)),Po=(e,t,o)=>t.has(e)?ko("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),Oo=(e,t,o,r)=>($o(e,t,"write to private field"),r?r.call(e,o):t.set(e,o),o);var he=globalThis,fe=he.ShadowRoot&&(he.ShadyCSS===void 0||he.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ro=Symbol(),To=new WeakMap,It=class{constructor(t,o,r){if(this._$cssResult$=!0,r!==Ro)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o,o=this.t;if(fe&&t===void 0){let r=o!==void 0&&o.length===1;r&&(t=To.get(o)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&To.set(o,t))}return t}toString(){return this.cssText}},bt=e=>new It(typeof e=="string"?e:e+"",void 0,Ro);var Lo=(e,t)=>{if(fe)e.adoptedStyleSheets=t.map((o=>o instanceof CSSStyleSheet?o:o.styleSheet));else for(let o of t){let r=document.createElement("style"),n=he.litNonce;n!==void 0&&r.setAttribute("nonce",n),r.textContent=o.cssText,e.appendChild(r)}},Ze=fe?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let o="";for(let r of t.cssRules)o+=r.cssText;return bt(o)})(e):e;var{is:nn,defineProperty:sn,getOwnPropertyDescriptor:an,getOwnPropertyNames:ln,getOwnPropertySymbols:cn,getPrototypeOf:pn}=Object,ue=globalThis,Do=ue.trustedTypes,dn=Do?Do.emptyScript:"",hn=ue.reactiveElementPolyfillSupport,Ft=(e,t)=>e,Vt={toAttribute(e,t){switch(t){case Boolean:e=e?dn:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=e!==null;break;case Number:o=e===null?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch{o=null}}return o}},me=(e,t)=>!nn(e,t),Mo={attribute:!0,type:String,converter:Vt,reflect:!1,useDefault:!1,hasChanged:me};Symbol.metadata??=Symbol("metadata"),ue.litPropertyMetadata??=new WeakMap;var ot=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,o=Mo){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(t,o),!o.noAccessor){let r=Symbol(),n=this.getPropertyDescriptor(t,r,o);n!==void 0&&sn(this.prototype,t,n)}}static getPropertyDescriptor(t,o,r){let{get:n,set:i}=an(this.prototype,t)??{get(){return this[o]},set(s){this[o]=s}};return{get:n,set(s){let a=n?.call(this);i?.call(this,s),this.requestUpdate(t,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Mo}static _$Ei(){if(this.hasOwnProperty(Ft("elementProperties")))return;let t=pn(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(Ft("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ft("properties"))){let o=this.properties,r=[...ln(o),...cn(o)];for(let n of r)this.createProperty(n,o[n])}let t=this[Symbol.metadata];if(t!==null){let o=litPropertyMetadata.get(t);if(o!==void 0)for(let[r,n]of o)this.elementProperties.set(r,n)}this._$Eh=new Map;for(let[o,r]of this.elementProperties){let n=this._$Eu(o,r);n!==void 0&&this._$Eh.set(n,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let o=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let n of r)o.unshift(Ze(n))}else t!==void 0&&o.push(Ze(t));return o}static _$Eu(t,o){let r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,o=this.constructor.elementProperties;for(let r of o.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Lo(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,o,r){this._$AK(t,r)}_$ET(t,o){let r=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,r);if(n!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:Vt).toAttribute(o,r.type);this._$Em=t,i==null?this.removeAttribute(n):this.setAttribute(n,i),this._$Em=null}}_$AK(t,o){let r=this.constructor,n=r._$Eh.get(t);if(n!==void 0&&this._$Em!==n){let i=r.getPropertyOptions(n),s=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:Vt;this._$Em=n;let a=s.fromAttribute(o,i.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(t,o,r){if(t!==void 0){let n=this.constructor,i=this[t];if(r??=n.getPropertyOptions(t),!((r.hasChanged??me)(i,o)||r.useDefault&&r.reflect&&i===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,r))))return;this.C(t,o,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,o,{useDefault:r,reflect:n,wrapped:i},s){r&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,s??o??this[t]),i!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(o=void 0),this._$AL.set(t,o)),n===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,i]of this._$Ep)this[n]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[n,i]of r){let{wrapped:s}=i,a=this[n];s!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,i,a)}}let t=!1,o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(o)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(o)}willUpdate(t){}_$AE(t){this._$EO?.forEach((o=>o.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((o=>this._$ET(o,this[o]))),this._$EM()}updated(t){}firstUpdated(t){}};ot.elementStyles=[],ot.shadowRootOptions={mode:"open"},ot[Ft("elementProperties")]=new Map,ot[Ft("finalized")]=new Map,hn?.({ReactiveElement:ot}),(ue.reactiveElementVersions??=[]).push("2.1.1");var to=globalThis,ge=to.trustedTypes,Bo=ge?ge.createPolicy("lit-html",{createHTML:e=>e}):void 0,eo="$lit$",rt=`lit$${Math.random().toFixed(9).slice(2)}$`,oo="?"+rt,fn=`<${oo}>`,xt=document,Kt=()=>xt.createComment(""),Jt=e=>e===null||typeof e!="object"&&typeof e!="function",ro=Array.isArray,jo=e=>ro(e)||typeof e?.[Symbol.iterator]=="function",Qe=`[ 	
\f\r]`,qt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,No=/-->/g,zo=/>/g,vt=RegExp(`>|${Qe}(?:([^\\s"'>=/]+)(${Qe}*=${Qe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ho=/'/g,Uo=/"/g,Io=/^(?:script|style|textarea|title)$/i,no=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),nt=no(1),un=no(2),Ni=no(3),_=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),Wo=new WeakMap,wt=xt.createTreeWalker(xt,129);function Fo(e,t){if(!ro(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Bo!==void 0?Bo.createHTML(t):t}var Vo=(e,t)=>{let o=e.length-1,r=[],n,i=t===2?"<svg>":t===3?"<math>":"",s=qt;for(let a=0;a<o;a++){let l=e[a],p,h,c=-1,f=0;for(;f<l.length&&(s.lastIndex=f,h=s.exec(l),h!==null);)f=s.lastIndex,s===qt?h[1]==="!--"?s=No:h[1]!==void 0?s=zo:h[2]!==void 0?(Io.test(h[2])&&(n=RegExp("</"+h[2],"g")),s=vt):h[3]!==void 0&&(s=vt):s===vt?h[0]===">"?(s=n??qt,c=-1):h[1]===void 0?c=-2:(c=s.lastIndex-h[2].length,p=h[1],s=h[3]===void 0?vt:h[3]==='"'?Uo:Ho):s===Uo||s===Ho?s=vt:s===No||s===zo?s=qt:(s=vt,n=void 0);let d=s===vt&&e[a+1].startsWith("/>")?" ":"";i+=s===qt?l+fn:c>=0?(r.push(p),l.slice(0,c)+eo+l.slice(c)+rt+d):l+rt+(c===-2?a:d)}return[Fo(e,i+(e[o]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},Yt=class e{constructor({strings:t,_$litType$:o},r){let n;this.parts=[];let i=0,s=0,a=t.length-1,l=this.parts,[p,h]=Vo(t,o);if(this.el=e.createElement(p,r),wt.currentNode=this.el.content,o===2||o===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(n=wt.nextNode())!==null&&l.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(let c of n.getAttributeNames())if(c.endsWith(eo)){let f=h[s++],d=n.getAttribute(c).split(rt),u=/([.?@])?(.*)/.exec(f);l.push({type:1,index:i,name:u[2],strings:d,ctor:u[1]==="."?be:u[1]==="?"?ve:u[1]==="@"?we:At}),n.removeAttribute(c)}else c.startsWith(rt)&&(l.push({type:6,index:i}),n.removeAttribute(c));if(Io.test(n.tagName)){let c=n.textContent.split(rt),f=c.length-1;if(f>0){n.textContent=ge?ge.emptyScript:"";for(let d=0;d<f;d++)n.append(c[d],Kt()),wt.nextNode(),l.push({type:2,index:++i});n.append(c[f],Kt())}}}else if(n.nodeType===8)if(n.data===oo)l.push({type:2,index:i});else{let c=-1;for(;(c=n.data.indexOf(rt,c+1))!==-1;)l.push({type:7,index:i}),c+=rt.length-1}i++}}static createElement(t,o){let r=xt.createElement("template");return r.innerHTML=t,r}};function Et(e,t,o=e,r){if(t===_)return t;let n=r!==void 0?o._$Co?.[r]:o._$Cl,i=Jt(t)?void 0:t._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),i===void 0?n=void 0:(n=new i(e),n._$AT(e,o,r)),r!==void 0?(o._$Co??=[])[r]=n:o._$Cl=n),n!==void 0&&(t=Et(e,n._$AS(e,t.values),n,r)),t}var ye=class{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:o},parts:r}=this._$AD,n=(t?.creationScope??xt).importNode(o,!0);wt.currentNode=n;let i=wt.nextNode(),s=0,a=0,l=r[0];for(;l!==void 0;){if(s===l.index){let p;l.type===2?p=new Dt(i,i.nextSibling,this,t):l.type===1?p=new l.ctor(i,l.name,l.strings,this,t):l.type===6&&(p=new xe(i,this,t)),this._$AV.push(p),l=r[++a]}s!==l?.index&&(i=wt.nextNode(),s++)}return wt.currentNode=xt,n}p(t){let o=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,o),o+=r.strings.length-2):r._$AI(t[o])),o++}},Dt=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,o,r,n){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=r,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,o=this._$AM;return o!==void 0&&t?.nodeType===11&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){t=Et(this,t,o),Jt(t)?t===A||t==null||t===""?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==_&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):jo(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==A&&Jt(this._$AH)?this._$AA.nextSibling.data=t:this.T(xt.createTextNode(t)),this._$AH=t}$(t){let{values:o,_$litType$:r}=t,n=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=Yt.createElement(Fo(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===n)this._$AH.p(o);else{let i=new ye(n,this),s=i.u(this.options);i.p(o),this.T(s),this._$AH=i}}_$AC(t){let o=Wo.get(t.strings);return o===void 0&&Wo.set(t.strings,o=new Yt(t)),o}k(t){ro(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,r,n=0;for(let i of t)n===o.length?o.push(r=new e(this.O(Kt()),this.O(Kt()),this,this.options)):r=o[n],r._$AI(i),n++;n<o.length&&(this._$AR(r&&r._$AB.nextSibling,n),o.length=n)}_$AR(t=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);t!==this._$AB;){let r=t.nextSibling;t.remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},At=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,o,r,n,i){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=o,this._$AM=n,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=A}_$AI(t,o=this,r,n){let i=this.strings,s=!1;if(i===void 0)t=Et(this,t,o,0),s=!Jt(t)||t!==this._$AH&&t!==_,s&&(this._$AH=t);else{let a=t,l,p;for(t=i[0],l=0;l<i.length-1;l++)p=Et(this,a[r+l],o,l),p===_&&(p=this._$AH[l]),s||=!Jt(p)||p!==this._$AH[l],p===A?t=A:t!==A&&(t+=(p??"")+i[l+1]),this._$AH[l]=p}s&&!n&&this.j(t)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},be=class extends At{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}},ve=class extends At{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}},we=class extends At{constructor(t,o,r,n,i){super(t,o,r,n,i),this.type=5}_$AI(t,o=this){if((t=Et(this,t,o,0)??A)===_)return;let r=this._$AH,n=t===A&&r!==A||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==A&&(r===A||n);n&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},xe=class{constructor(t,o,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Et(this,t)}},qo={M:eo,P:rt,A:oo,C:1,L:Vo,R:ye,D:jo,V:Et,I:Dt,H:At,N:ve,U:we,B:be,F:xe},mn=to.litHtmlPolyfillSupport;mn?.(Yt,Dt),(to.litHtmlVersions??=[]).push("3.3.1");var Gt=(e,t,o)=>{let r=o?.renderBefore??t,n=r._$litPart$;if(n===void 0){let i=o?.renderBefore??null;r._$litPart$=n=new Dt(t.insertBefore(Kt(),i),i,void 0,o??{})}return n._$AI(e),n};var io=globalThis,N=class extends ot{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Gt(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return _}};N._$litElement$=!0,N.finalized=!0,io.litElementHydrateSupport?.({LitElement:N});var gn=io.litElementPolyfillSupport;gn?.({LitElement:N});(io.litElementVersions??=[]).push("4.2.1");var St=e=>(t,o)=>{o!==void 0?o.addInitializer((()=>{customElements.define(e,t)})):customElements.define(e,t)};var yn={attribute:!0,type:String,converter:Vt,reflect:!1,hasChanged:me},bn=(e=yn,t,o)=>{let{kind:r,metadata:n}=o,i=globalThis.litPropertyMetadata.get(n);if(i===void 0&&globalThis.litPropertyMetadata.set(n,i=new Map),r==="setter"&&((e=Object.create(e)).wrapped=!0),i.set(o.name,e),r==="accessor"){let{name:s}=o;return{set(a){let l=t.get.call(this);t.set.call(this,a),this.requestUpdate(s,l,e)},init(a){return a!==void 0&&this.C(s,void 0,e,a),a}}}if(r==="setter"){let{name:s}=o;return function(a){let l=this[s];t.call(this,a),this.requestUpdate(s,l,e)}}throw Error("Unsupported decorator location: "+r)};function y(e){return(t,o)=>typeof o=="object"?bn(e,t,o):((r,n,i)=>{let s=n.hasOwnProperty(i);return n.constructor.createProperty(i,r),s?Object.getOwnPropertyDescriptor(n,i):void 0})(e,t,o)}function it(e){return y({...e,state:!0,attribute:!1})}var Ct=(e,t,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,o),o);function ut(e,t){return(o,r,n)=>{let i=s=>s.renderRoot?.querySelector(e)??null;if(t){let{get:s,set:a}=typeof r=="object"?o:n??(()=>{let l=Symbol();return{get(){return this[l]},set(p){this[l]=p}}})();return Ct(o,r,{get(){let l=s.call(this);return l===void 0&&(l=i(this),(l!==null||this.hasUpdated)&&a.call(this,l)),l}})}return Ct(o,r,{get(){return i(this)}})}}var wn=`:host {
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
`,Ee,kt=class extends N{constructor(){super(),Po(this,Ee,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(t,o)=>{if(this.internals?.states)try{o?this.internals.states.add(t):this.internals.states.delete(t)}catch(r){if(String(r).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw r}},has:t=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(t)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let e=this.constructor;for(let[t,o]of e.elementProperties)o.default==="inherit"&&o.initial!==void 0&&typeof t=="string"&&this.customStates.set(`initial-${t}-${o.initial}`,!0)}static get styles(){let e=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[wn,...e].map(t=>typeof t=="string"?bt(t):t)}attributeChangedCallback(e,t,o){_o(this,Ee)||(this.constructor.elementProperties.forEach((r,n)=>{r.reflect&&this[n]!=null&&this.initialReflectedProperties.set(n,this[n])}),Oo(this,Ee,!0)),super.attributeChangedCallback(e,t,o)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,o)=>{e.has(o)&&this[o]==null&&(this[o]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(t=>{t.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(t){if(this.didSSR&&!this.hasUpdated){let o=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});o.error=t,this.dispatchEvent(o)}throw t}}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};Ee=new WeakMap;g([y()],kt.prototype,"dir",2);g([y()],kt.prototype,"lang",2);g([y({type:Boolean,reflect:!0,attribute:"did-ssr"})],kt.prototype,"didSSR",2);var G=Math.min,L=Math.max,Zt=Math.round,Qt=Math.floor,F=e=>({x:e,y:e}),xn={left:"right",right:"left",bottom:"top",top:"bottom"},En={start:"end",end:"start"};function Se(e,t,o){return L(e,G(t,o))}function $t(e,t){return typeof e=="function"?e(t):e}function st(e){return e.split("-")[0]}function _t(e){return e.split("-")[1]}function so(e){return e==="x"?"y":"x"}function Ce(e){return e==="y"?"height":"width"}var An=new Set(["top","bottom"]);function X(e){return An.has(st(e))?"y":"x"}function ke(e){return so(X(e))}function Yo(e,t,o){o===void 0&&(o=!1);let r=_t(e),n=ke(e),i=Ce(n),s=n==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[i]>t.floating[i]&&(s=Xt(s)),[s,Xt(s)]}function Go(e){let t=Xt(e);return[Ae(e),t,Ae(t)]}function Ae(e){return e.replace(/start|end/g,t=>En[t])}var Ko=["left","right"],Jo=["right","left"],Sn=["top","bottom"],Cn=["bottom","top"];function kn(e,t,o){switch(e){case"top":case"bottom":return o?t?Jo:Ko:t?Ko:Jo;case"left":case"right":return t?Sn:Cn;default:return[]}}function Xo(e,t,o,r){let n=_t(e),i=kn(st(e),o==="start",r);return n&&(i=i.map(s=>s+"-"+n),t&&(i=i.concat(i.map(Ae)))),i}function Xt(e){return e.replace(/left|right|bottom|top/g,t=>xn[t])}function $n(e){return{top:0,right:0,bottom:0,left:0,...e}}function ao(e){return typeof e!="number"?$n(e):{top:e,right:e,bottom:e,left:e}}function Pt(e){let{x:t,y:o,width:r,height:n}=e;return{width:r,height:n,top:o,left:t,right:t+r,bottom:o+n,x:t,y:o}}function Zo(e,t,o){let{reference:r,floating:n}=e,i=X(t),s=ke(t),a=Ce(s),l=st(t),p=i==="y",h=r.x+r.width/2-n.width/2,c=r.y+r.height/2-n.height/2,f=r[a]/2-n[a]/2,d;switch(l){case"top":d={x:h,y:r.y-n.height};break;case"bottom":d={x:h,y:r.y+r.height};break;case"right":d={x:r.x+r.width,y:c};break;case"left":d={x:r.x-n.width,y:c};break;default:d={x:r.x,y:r.y}}switch(_t(t)){case"start":d[s]-=f*(o&&p?-1:1);break;case"end":d[s]+=f*(o&&p?-1:1);break}return d}var Qo=async(e,t,o)=>{let{placement:r="bottom",strategy:n="absolute",middleware:i=[],platform:s}=o,a=i.filter(Boolean),l=await(s.isRTL==null?void 0:s.isRTL(t)),p=await s.getElementRects({reference:e,floating:t,strategy:n}),{x:h,y:c}=Zo(p,r,l),f=r,d={},u=0;for(let m=0;m<a.length;m++){let{name:v,fn:b}=a[m],{x:w,y:E,data:P,reset:$}=await b({x:h,y:c,initialPlacement:r,placement:f,strategy:n,middlewareData:d,rects:p,platform:s,elements:{reference:e,floating:t}});h=w??h,c=E??c,d={...d,[v]:{...d[v],...P}},$&&u<=50&&(u++,typeof $=="object"&&($.placement&&(f=$.placement),$.rects&&(p=$.rects===!0?await s.getElementRects({reference:e,floating:t,strategy:n}):$.rects),{x:h,y:c}=Zo(p,f,l)),m=-1)}return{x:h,y:c,placement:f,strategy:n,middlewareData:d}};async function $e(e,t){var o;t===void 0&&(t={});let{x:r,y:n,platform:i,rects:s,elements:a,strategy:l}=e,{boundary:p="clippingAncestors",rootBoundary:h="viewport",elementContext:c="floating",altBoundary:f=!1,padding:d=0}=$t(t,e),u=ao(d),v=a[f?c==="floating"?"reference":"floating":c],b=Pt(await i.getClippingRect({element:(o=await(i.isElement==null?void 0:i.isElement(v)))==null||o?v:v.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(a.floating)),boundary:p,rootBoundary:h,strategy:l})),w=c==="floating"?{x:r,y:n,width:s.floating.width,height:s.floating.height}:s.reference,E=await(i.getOffsetParent==null?void 0:i.getOffsetParent(a.floating)),P=await(i.isElement==null?void 0:i.isElement(E))?await(i.getScale==null?void 0:i.getScale(E))||{x:1,y:1}:{x:1,y:1},$=Pt(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:w,offsetParent:E,strategy:l}):w);return{top:(b.top-$.top+u.top)/P.y,bottom:($.bottom-b.bottom+u.bottom)/P.y,left:(b.left-$.left+u.left)/P.x,right:($.right-b.right+u.right)/P.x}}var tr=e=>({name:"arrow",options:e,async fn(t){let{x:o,y:r,placement:n,rects:i,platform:s,elements:a,middlewareData:l}=t,{element:p,padding:h=0}=$t(e,t)||{};if(p==null)return{};let c=ao(h),f={x:o,y:r},d=ke(n),u=Ce(d),m=await s.getDimensions(p),v=d==="y",b=v?"top":"left",w=v?"bottom":"right",E=v?"clientHeight":"clientWidth",P=i.reference[u]+i.reference[d]-f[d]-i.floating[u],$=f[d]-i.reference[d],W=await(s.getOffsetParent==null?void 0:s.getOffsetParent(p)),T=W?W[E]:0;(!T||!await(s.isElement==null?void 0:s.isElement(W)))&&(T=a.floating[E]||i.floating[u]);let Q=P/2-$/2,J=T/2-m[u]/2-1,B=G(c[b],J),dt=G(c[w],J),Y=B,ht=T-m[u]-dt,R=T/2-m[u]/2+Q,gt=Se(Y,R,ht),tt=!l.arrow&&_t(n)!=null&&R!==gt&&i.reference[u]/2-(R<Y?B:dt)-m[u]/2<0,j=tt?R<Y?R-Y:R-ht:0;return{[d]:f[d]+j,data:{[d]:gt,centerOffset:R-gt-j,...tt&&{alignmentOffset:j}},reset:tt}}});var er=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var o,r;let{placement:n,middlewareData:i,rects:s,initialPlacement:a,platform:l,elements:p}=t,{mainAxis:h=!0,crossAxis:c=!0,fallbackPlacements:f,fallbackStrategy:d="bestFit",fallbackAxisSideDirection:u="none",flipAlignment:m=!0,...v}=$t(e,t);if((o=i.arrow)!=null&&o.alignmentOffset)return{};let b=st(n),w=X(a),E=st(a)===a,P=await(l.isRTL==null?void 0:l.isRTL(p.floating)),$=f||(E||!m?[Xt(a)]:Go(a)),W=u!=="none";!f&&W&&$.push(...Xo(a,m,u,P));let T=[a,...$],Q=await $e(t,v),J=[],B=((r=i.flip)==null?void 0:r.overflows)||[];if(h&&J.push(Q[b]),c){let R=Yo(n,s,P);J.push(Q[R[0]],Q[R[1]])}if(B=[...B,{placement:n,overflows:J}],!J.every(R=>R<=0)){var dt,Y;let R=(((dt=i.flip)==null?void 0:dt.index)||0)+1,gt=T[R];if(gt&&(!(c==="alignment"?w!==X(gt):!1)||B.every(I=>X(I.placement)===w?I.overflows[0]>0:!0)))return{data:{index:R,overflows:B},reset:{placement:gt}};let tt=(Y=B.filter(j=>j.overflows[0]<=0).sort((j,I)=>j.overflows[1]-I.overflows[1])[0])==null?void 0:Y.placement;if(!tt)switch(d){case"bestFit":{var ht;let j=(ht=B.filter(I=>{if(W){let ft=X(I.placement);return ft===w||ft==="y"}return!0}).map(I=>[I.placement,I.overflows.filter(ft=>ft>0).reduce((ft,Qr)=>ft+Qr,0)]).sort((I,ft)=>I[1]-ft[1])[0])==null?void 0:ht[0];j&&(tt=j);break}case"initialPlacement":tt=a;break}if(n!==tt)return{reset:{placement:tt}}}return{}}}};var _n=new Set(["left","top"]);async function Pn(e,t){let{placement:o,platform:r,elements:n}=e,i=await(r.isRTL==null?void 0:r.isRTL(n.floating)),s=st(o),a=_t(o),l=X(o)==="y",p=_n.has(s)?-1:1,h=i&&l?-1:1,c=$t(t,e),{mainAxis:f,crossAxis:d,alignmentAxis:u}=typeof c=="number"?{mainAxis:c,crossAxis:0,alignmentAxis:null}:{mainAxis:c.mainAxis||0,crossAxis:c.crossAxis||0,alignmentAxis:c.alignmentAxis};return a&&typeof u=="number"&&(d=a==="end"?u*-1:u),l?{x:d*h,y:f*p}:{x:f*p,y:d*h}}var or=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var o,r;let{x:n,y:i,placement:s,middlewareData:a}=t,l=await Pn(t,e);return s===((o=a.offset)==null?void 0:o.placement)&&(r=a.arrow)!=null&&r.alignmentOffset?{}:{x:n+l.x,y:i+l.y,data:{...l,placement:s}}}}},rr=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){let{x:o,y:r,placement:n}=t,{mainAxis:i=!0,crossAxis:s=!1,limiter:a={fn:v=>{let{x:b,y:w}=v;return{x:b,y:w}}},...l}=$t(e,t),p={x:o,y:r},h=await $e(t,l),c=X(st(n)),f=so(c),d=p[f],u=p[c];if(i){let v=f==="y"?"top":"left",b=f==="y"?"bottom":"right",w=d+h[v],E=d-h[b];d=Se(w,d,E)}if(s){let v=c==="y"?"top":"left",b=c==="y"?"bottom":"right",w=u+h[v],E=u-h[b];u=Se(w,u,E)}let m=a.fn({...t,[f]:d,[c]:u});return{...m,data:{x:m.x-o,y:m.y-r,enabled:{[f]:i,[c]:s}}}}}};var nr=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){var o,r;let{placement:n,rects:i,platform:s,elements:a}=t,{apply:l=()=>{},...p}=$t(e,t),h=await $e(t,p),c=st(n),f=_t(n),d=X(n)==="y",{width:u,height:m}=i.floating,v,b;c==="top"||c==="bottom"?(v=c,b=f===(await(s.isRTL==null?void 0:s.isRTL(a.floating))?"start":"end")?"left":"right"):(b=c,v=f==="end"?"top":"bottom");let w=m-h.top-h.bottom,E=u-h.left-h.right,P=G(m-h[v],w),$=G(u-h[b],E),W=!t.middlewareData.shift,T=P,Q=$;if((o=t.middlewareData.shift)!=null&&o.enabled.x&&(Q=E),(r=t.middlewareData.shift)!=null&&r.enabled.y&&(T=w),W&&!f){let B=L(h.left,0),dt=L(h.right,0),Y=L(h.top,0),ht=L(h.bottom,0);d?Q=u-2*(B!==0||dt!==0?B+dt:L(h.left,h.right)):T=m-2*(Y!==0||ht!==0?Y+ht:L(h.top,h.bottom))}await l({...t,availableWidth:Q,availableHeight:T});let J=await s.getDimensions(a.floating);return u!==J.width||m!==J.height?{reset:{rects:!0}}:{}}}};function _e(){return typeof window<"u"}function Ot(e){return sr(e)?(e.nodeName||"").toLowerCase():"#document"}function M(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function V(e){var t;return(t=(sr(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function sr(e){return _e()?e instanceof Node||e instanceof M(e).Node:!1}function z(e){return _e()?e instanceof Element||e instanceof M(e).Element:!1}function q(e){return _e()?e instanceof HTMLElement||e instanceof M(e).HTMLElement:!1}function ir(e){return!_e()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof M(e).ShadowRoot}var On=new Set(["inline","contents"]);function Mt(e){let{overflow:t,overflowX:o,overflowY:r,display:n}=H(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+o)&&!On.has(n)}var Tn=new Set(["table","td","th"]);function ar(e){return Tn.has(Ot(e))}var Rn=[":popover-open",":modal"];function te(e){return Rn.some(t=>{try{return e.matches(t)}catch{return!1}})}var Ln=["transform","translate","scale","rotate","perspective"],Dn=["transform","translate","scale","rotate","perspective","filter"],Mn=["paint","layout","strict","content"];function Bt(e){let t=Pe(),o=z(e)?H(e):e;return Ln.some(r=>o[r]?o[r]!=="none":!1)||(o.containerType?o.containerType!=="normal":!1)||!t&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!t&&(o.filter?o.filter!=="none":!1)||Dn.some(r=>(o.willChange||"").includes(r))||Mn.some(r=>(o.contain||"").includes(r))}function lr(e){let t=at(e);for(;q(t)&&!Tt(t);){if(Bt(t))return t;if(te(t))return null;t=at(t)}return null}function Pe(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}var Bn=new Set(["html","body","#document"]);function Tt(e){return Bn.has(Ot(e))}function H(e){return M(e).getComputedStyle(e)}function ee(e){return z(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function at(e){if(Ot(e)==="html")return e;let t=e.assignedSlot||e.parentNode||ir(e)&&e.host||V(e);return ir(t)?t.host:t}function cr(e){let t=at(e);return Tt(t)?e.ownerDocument?e.ownerDocument.body:e.body:q(t)&&Mt(t)?t:cr(t)}function lt(e,t,o){var r;t===void 0&&(t=[]),o===void 0&&(o=!0);let n=cr(e),i=n===((r=e.ownerDocument)==null?void 0:r.body),s=M(n);if(i){let a=Oe(s);return t.concat(s,s.visualViewport||[],Mt(n)?n:[],a&&o?lt(a):[])}return t.concat(n,lt(n,[],o))}function Oe(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function fr(e){let t=H(e),o=parseFloat(t.width)||0,r=parseFloat(t.height)||0,n=q(e),i=n?e.offsetWidth:o,s=n?e.offsetHeight:r,a=Zt(o)!==i||Zt(r)!==s;return a&&(o=i,r=s),{width:o,height:r,$:a}}function co(e){return z(e)?e:e.contextElement}function Nt(e){let t=co(e);if(!q(t))return F(1);let o=t.getBoundingClientRect(),{width:r,height:n,$:i}=fr(t),s=(i?Zt(o.width):o.width)/r,a=(i?Zt(o.height):o.height)/n;return(!s||!Number.isFinite(s))&&(s=1),(!a||!Number.isFinite(a))&&(a=1),{x:s,y:a}}var Nn=F(0);function ur(e){let t=M(e);return!Pe()||!t.visualViewport?Nn:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function zn(e,t,o){return t===void 0&&(t=!1),!o||t&&o!==M(e)?!1:t}function Rt(e,t,o,r){t===void 0&&(t=!1),o===void 0&&(o=!1);let n=e.getBoundingClientRect(),i=co(e),s=F(1);t&&(r?z(r)&&(s=Nt(r)):s=Nt(e));let a=zn(i,o,r)?ur(i):F(0),l=(n.left+a.x)/s.x,p=(n.top+a.y)/s.y,h=n.width/s.x,c=n.height/s.y;if(i){let f=M(i),d=r&&z(r)?M(r):r,u=f,m=Oe(u);for(;m&&r&&d!==u;){let v=Nt(m),b=m.getBoundingClientRect(),w=H(m),E=b.left+(m.clientLeft+parseFloat(w.paddingLeft))*v.x,P=b.top+(m.clientTop+parseFloat(w.paddingTop))*v.y;l*=v.x,p*=v.y,h*=v.x,c*=v.y,l+=E,p+=P,u=M(m),m=Oe(u)}}return Pt({width:h,height:c,x:l,y:p})}function Te(e,t){let o=ee(e).scrollLeft;return t?t.left+o:Rt(V(e)).left+o}function mr(e,t){let o=e.getBoundingClientRect(),r=o.left+t.scrollLeft-Te(e,o),n=o.top+t.scrollTop;return{x:r,y:n}}function Hn(e){let{elements:t,rect:o,offsetParent:r,strategy:n}=e,i=n==="fixed",s=V(r),a=t?te(t.floating):!1;if(r===s||a&&i)return o;let l={scrollLeft:0,scrollTop:0},p=F(1),h=F(0),c=q(r);if((c||!c&&!i)&&((Ot(r)!=="body"||Mt(s))&&(l=ee(r)),q(r))){let d=Rt(r);p=Nt(r),h.x=d.x+r.clientLeft,h.y=d.y+r.clientTop}let f=s&&!c&&!i?mr(s,l):F(0);return{width:o.width*p.x,height:o.height*p.y,x:o.x*p.x-l.scrollLeft*p.x+h.x+f.x,y:o.y*p.y-l.scrollTop*p.y+h.y+f.y}}function Un(e){return Array.from(e.getClientRects())}function Wn(e){let t=V(e),o=ee(e),r=e.ownerDocument.body,n=L(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),i=L(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),s=-o.scrollLeft+Te(e),a=-o.scrollTop;return H(r).direction==="rtl"&&(s+=L(t.clientWidth,r.clientWidth)-n),{width:n,height:i,x:s,y:a}}var pr=25;function jn(e,t){let o=M(e),r=V(e),n=o.visualViewport,i=r.clientWidth,s=r.clientHeight,a=0,l=0;if(n){i=n.width,s=n.height;let h=Pe();(!h||h&&t==="fixed")&&(a=n.offsetLeft,l=n.offsetTop)}let p=Te(r);if(p<=0){let h=r.ownerDocument,c=h.body,f=getComputedStyle(c),d=h.compatMode==="CSS1Compat"&&parseFloat(f.marginLeft)+parseFloat(f.marginRight)||0,u=Math.abs(r.clientWidth-c.clientWidth-d);u<=pr&&(i-=u)}else p<=pr&&(i+=p);return{width:i,height:s,x:a,y:l}}var In=new Set(["absolute","fixed"]);function Fn(e,t){let o=Rt(e,!0,t==="fixed"),r=o.top+e.clientTop,n=o.left+e.clientLeft,i=q(e)?Nt(e):F(1),s=e.clientWidth*i.x,a=e.clientHeight*i.y,l=n*i.x,p=r*i.y;return{width:s,height:a,x:l,y:p}}function dr(e,t,o){let r;if(t==="viewport")r=jn(e,o);else if(t==="document")r=Wn(V(e));else if(z(t))r=Fn(t,o);else{let n=ur(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return Pt(r)}function gr(e,t){let o=at(e);return o===t||!z(o)||Tt(o)?!1:H(o).position==="fixed"||gr(o,t)}function Vn(e,t){let o=t.get(e);if(o)return o;let r=lt(e,[],!1).filter(a=>z(a)&&Ot(a)!=="body"),n=null,i=H(e).position==="fixed",s=i?at(e):e;for(;z(s)&&!Tt(s);){let a=H(s),l=Bt(s);!l&&a.position==="fixed"&&(n=null),(i?!l&&!n:!l&&a.position==="static"&&!!n&&In.has(n.position)||Mt(s)&&!l&&gr(e,s))?r=r.filter(h=>h!==s):n=a,s=at(s)}return t.set(e,r),r}function qn(e){let{element:t,boundary:o,rootBoundary:r,strategy:n}=e,s=[...o==="clippingAncestors"?te(t)?[]:Vn(t,this._c):[].concat(o),r],a=s[0],l=s.reduce((p,h)=>{let c=dr(t,h,n);return p.top=L(c.top,p.top),p.right=G(c.right,p.right),p.bottom=G(c.bottom,p.bottom),p.left=L(c.left,p.left),p},dr(t,a,n));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Kn(e){let{width:t,height:o}=fr(e);return{width:t,height:o}}function Jn(e,t,o){let r=q(t),n=V(t),i=o==="fixed",s=Rt(e,!0,i,t),a={scrollLeft:0,scrollTop:0},l=F(0);function p(){l.x=Te(n)}if(r||!r&&!i)if((Ot(t)!=="body"||Mt(n))&&(a=ee(t)),r){let d=Rt(t,!0,i,t);l.x=d.x+t.clientLeft,l.y=d.y+t.clientTop}else n&&p();i&&!r&&n&&p();let h=n&&!r&&!i?mr(n,a):F(0),c=s.left+a.scrollLeft-l.x-h.x,f=s.top+a.scrollTop-l.y-h.y;return{x:c,y:f,width:s.width,height:s.height}}function lo(e){return H(e).position==="static"}function hr(e,t){if(!q(e)||H(e).position==="fixed")return null;if(t)return t(e);let o=e.offsetParent;return V(e)===o&&(o=o.ownerDocument.body),o}function yr(e,t){let o=M(e);if(te(e))return o;if(!q(e)){let n=at(e);for(;n&&!Tt(n);){if(z(n)&&!lo(n))return n;n=at(n)}return o}let r=hr(e,t);for(;r&&ar(r)&&lo(r);)r=hr(r,t);return r&&Tt(r)&&lo(r)&&!Bt(r)?o:r||lr(e)||o}var Yn=async function(e){let t=this.getOffsetParent||yr,o=this.getDimensions,r=await o(e.floating);return{reference:Jn(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Gn(e){return H(e).direction==="rtl"}var oe={convertOffsetParentRelativeRectToViewportRelativeRect:Hn,getDocumentElement:V,getClippingRect:qn,getOffsetParent:yr,getElementRects:Yn,getClientRects:Un,getDimensions:Kn,getScale:Nt,isElement:z,isRTL:Gn};function br(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function Xn(e,t){let o=null,r,n=V(e);function i(){var a;clearTimeout(r),(a=o)==null||a.disconnect(),o=null}function s(a,l){a===void 0&&(a=!1),l===void 0&&(l=1),i();let p=e.getBoundingClientRect(),{left:h,top:c,width:f,height:d}=p;if(a||t(),!f||!d)return;let u=Qt(c),m=Qt(n.clientWidth-(h+f)),v=Qt(n.clientHeight-(c+d)),b=Qt(h),E={rootMargin:-u+"px "+-m+"px "+-v+"px "+-b+"px",threshold:L(0,G(1,l))||1},P=!0;function $(W){let T=W[0].intersectionRatio;if(T!==l){if(!P)return s();T?s(!1,T):r=setTimeout(()=>{s(!1,1e-7)},1e3)}T===1&&!br(p,e.getBoundingClientRect())&&s(),P=!1}try{o=new IntersectionObserver($,{...E,root:n.ownerDocument})}catch{o=new IntersectionObserver($,E)}o.observe(e)}return s(!0),i}function vr(e,t,o,r){r===void 0&&(r={});let{ancestorScroll:n=!0,ancestorResize:i=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:l=!1}=r,p=co(e),h=n||i?[...p?lt(p):[],...lt(t)]:[];h.forEach(b=>{n&&b.addEventListener("scroll",o,{passive:!0}),i&&b.addEventListener("resize",o)});let c=p&&a?Xn(p,o):null,f=-1,d=null;s&&(d=new ResizeObserver(b=>{let[w]=b;w&&w.target===p&&d&&(d.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var E;(E=d)==null||E.observe(t)})),o()}),p&&!l&&d.observe(p),d.observe(t));let u,m=l?Rt(e):null;l&&v();function v(){let b=Rt(e);m&&!br(m,b)&&o(),m=b,u=requestAnimationFrame(v)}return o(),()=>{var b;h.forEach(w=>{n&&w.removeEventListener("scroll",o),i&&w.removeEventListener("resize",o)}),c?.(),(b=d)==null||b.disconnect(),d=null,l&&cancelAnimationFrame(u)}}var wr=or;var xr=rr,Er=er,po=nr;var Ar=tr;var Sr=(e,t,o)=>{let r=new Map,n={platform:oe,...o},i={...n.platform,_c:r};return Qo(e,t,{...n,platform:i})};function Cr(e){return Zn(e)}function ho(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function Zn(e){for(let t=e;t;t=ho(t))if(t instanceof Element&&getComputedStyle(t).display==="none")return null;for(let t=ho(e);t;t=ho(t)){if(!(t instanceof Element))continue;let o=getComputedStyle(t);if(o.display!=="contents"&&(o.position!=="static"||Bt(o)||t.tagName==="BODY"))return t}return null}var D={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Z=e=>(...t)=>({_$litDirective$:e,values:t}),U=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,o,r){this._$Ct=t,this._$AM=o,this._$Ci=r}_$AS(t,o){return this.update(t,o)}update(t,o){return this.render(...o)}};var zt=Z(class extends U{constructor(e){if(super(e),e.type!==D.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter((r=>r!==""))));for(let r in t)t[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(t)}let o=e.element.classList;for(let r of this.st)r in t||(o.remove(r),this.st.delete(r));for(let r in t){let n=!!t[r];n===this.st.has(r)||this.nt?.has(r)||(n?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return _}});var Qn=`:host {
  --arrow-color: black;
  --arrow-size: var(--wa-tooltip-arrow-size);
  --show-duration: 100ms;
  --hide-duration: 100ms;

  /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45\xBA. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
  --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
  --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

  display: contents;
}

.popup {
  position: absolute;
  isolation: isolate;
  max-width: var(--auto-size-available-width, none);
  max-height: var(--auto-size-available-height, none);

  /* Clear UA styles for [popover] */
  :where(&) {
    inset: unset;
    padding: unset;
    margin: unset;
    width: unset;
    height: unset;
    color: unset;
    background: unset;
    border: unset;
    overflow: unset;
  }
}

.popup-fixed {
  position: fixed;
}

.popup:not(.popup-active) {
  display: none;
}

.arrow {
  position: absolute;
  width: calc(var(--arrow-size-diagonal) * 2);
  height: calc(var(--arrow-size-diagonal) * 2);
  rotate: 45deg;
  background: var(--arrow-color);
  z-index: 3;
}

:host([data-current-placement~='left']) .arrow {
  rotate: -45deg;
}

:host([data-current-placement~='right']) .arrow {
  rotate: 135deg;
}

:host([data-current-placement~='bottom']) .arrow {
  rotate: 225deg;
}

/* Hover bridge */
.popup-hover-bridge:not(.popup-hover-bridge-visible) {
  display: none;
}

.popup-hover-bridge {
  position: fixed;
  z-index: 899;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  clip-path: polygon(
    var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
    var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
    var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
    var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
  );
}

/* Built-in animations */
.show {
  animation: show var(--show-duration) ease;
}

.hide {
  animation: show var(--hide-duration) ease reverse;
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.show-with-scale {
  animation: show-with-scale var(--show-duration) ease;
}

.hide-with-scale {
  animation: show-with-scale var(--hide-duration) ease reverse;
}

@keyframes show-with-scale {
  from {
    opacity: 0;
    scale: 0.8;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}
`;function kr(e){return e!==null&&typeof e=="object"&&"getBoundingClientRect"in e&&("contextElement"in e?e instanceof Element:!0)}var Re=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),x=class extends kt{constructor(){super(...arguments),this.localize=new Co(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom"),r=0,n=0,i=0,s=0,a=0,l=0,p=0,h=0;o?e.top<t.top?(r=e.left,n=e.bottom,i=e.right,s=e.bottom,a=t.left,l=t.top,p=t.right,h=t.top):(r=t.left,n=t.bottom,i=t.right,s=t.bottom,a=e.left,l=e.top,p=e.right,h=e.top):e.left<t.left?(r=e.right,n=e.top,i=t.left,s=t.top,a=e.right,l=e.bottom,p=t.left,h=t.bottom):(r=t.right,n=t.top,i=e.left,s=e.top,a=t.right,l=t.bottom,p=e.left,h=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${n}px`),this.style.setProperty("--hover-bridge-top-right-x",`${i}px`),this.style.setProperty("--hover-bridge-top-right-y",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${h}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchor instanceof Element||kr(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||(this.popup.showPopover?.(),this.cleanup=vr(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.popup.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){if(!this.active||!this.anchorEl)return;let e=[wr({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(po({apply:({rects:r})=>{let n=this.sync==="width"||this.sync==="both",i=this.sync==="height"||this.sync==="both";this.popup.style.width=n?`${r.reference.width}px`:"",this.popup.style.height=i?`${r.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let t;Re&&!kr(this.anchor)&&this.boundary==="scroll"&&(t=lt(this.anchorEl).filter(r=>r instanceof Element)),this.flip&&e.push(Er({boundary:this.flipBoundary||t,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&e.push(xr({boundary:this.shiftBoundary||t,padding:this.shiftPadding})),this.autoSize?e.push(po({boundary:this.autoSizeBoundary||t,padding:this.autoSizePadding,apply:({availableWidth:r,availableHeight:n})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${n}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${r}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&e.push(Ar({element:this.arrowEl,padding:this.arrowPadding}));let o=Re?r=>oe.getOffsetParent(r,Cr):oe.getOffsetParent;Sr(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:Re?"absolute":"fixed",platform:{...oe,getOffsetParent:o}}).then(({x:r,y:n,middlewareData:i,placement:s})=>{let a=this.localize.dir()==="rtl",l={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${r}px`,top:`${n}px`}),this.arrow){let p=i.arrow.x,h=i.arrow.y,c="",f="",d="",u="";if(this.arrowPlacement==="start"){let m=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";c=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",f=a?m:"",u=a?"":m}else if(this.arrowPlacement==="end"){let m=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";f=a?"":m,u=a?m:"",d=typeof h=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(u=typeof p=="number"?"calc(50% - var(--arrow-size-diagonal))":"",c=typeof h=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(u=typeof p=="number"?`${p}px`:"",c=typeof h=="number"?`${h}px`:"");Object.assign(this.arrowEl.style,{top:c,right:f,bottom:d,left:u,[l]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new wo)}render(){return nt`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${zt({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${zt({popup:!0,"popup-active":this.active,"popup-fixed":!Re,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?nt`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};x.css=Qn;g([ut(".popup")],x.prototype,"popup",2);g([ut(".arrow")],x.prototype,"arrowEl",2);g([y()],x.prototype,"anchor",2);g([y({type:Boolean,reflect:!0})],x.prototype,"active",2);g([y({reflect:!0})],x.prototype,"placement",2);g([y()],x.prototype,"boundary",2);g([y({type:Number})],x.prototype,"distance",2);g([y({type:Number})],x.prototype,"skidding",2);g([y({type:Boolean})],x.prototype,"arrow",2);g([y({attribute:"arrow-placement"})],x.prototype,"arrowPlacement",2);g([y({attribute:"arrow-padding",type:Number})],x.prototype,"arrowPadding",2);g([y({type:Boolean})],x.prototype,"flip",2);g([y({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(t=>t.trim()).filter(t=>t!==""),toAttribute:e=>e.join(" ")}})],x.prototype,"flipFallbackPlacements",2);g([y({attribute:"flip-fallback-strategy"})],x.prototype,"flipFallbackStrategy",2);g([y({type:Object})],x.prototype,"flipBoundary",2);g([y({attribute:"flip-padding",type:Number})],x.prototype,"flipPadding",2);g([y({type:Boolean})],x.prototype,"shift",2);g([y({type:Object})],x.prototype,"shiftBoundary",2);g([y({attribute:"shift-padding",type:Number})],x.prototype,"shiftPadding",2);g([y({attribute:"auto-size"})],x.prototype,"autoSize",2);g([y()],x.prototype,"sync",2);g([y({type:Object})],x.prototype,"autoSizeBoundary",2);g([y({attribute:"auto-size-padding",type:Number})],x.prototype,"autoSizePadding",2);g([y({attribute:"hover-bridge",type:Boolean})],x.prototype,"hoverBridge",2);x=g([St("wa-popup")],x);var $r=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}},_r=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}},Pr=class extends Event{constructor(e){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}},Or=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};var Tr="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";var Rr=(e=21)=>{let t="",o=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)t+=Tr[o[e]&63];return t};function Lr(e=""){return`${e}${Rr()}`}function fo(e,t){return new Promise(o=>{function r(n){n.target===e&&(e.removeEventListener(t,r),o())}e.addEventListener(t,r)})}function uo(e,t){return new Promise(o=>{let r=new AbortController,{signal:n}=r;if(e.classList.contains(t))return;e.classList.remove(t),e.classList.add(t);let i=()=>{e.classList.remove(t),o(),r.abort()};e.addEventListener("animationend",i,{once:!0,signal:n}),e.addEventListener("animationcancel",i,{once:!0,signal:n})})}function re(e,t){let o={waitUntilFirstUpdate:!1,...t};return(r,n)=>{let{update:i}=r,s=Array.isArray(e)?e:[e];r.update=function(a){s.forEach(l=>{let p=l;if(a.has(p)){let h=a.get(p),c=this[p];h!==c&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[n](h,c)}}),i.call(this,a)}}}var ti=`:host {
  --max-width: 30ch;

  /** These styles are added so we don't interfere in the DOM. */
  display: inline-block;
  position: absolute;

  /** Defaults for inherited CSS properties */
  color: var(--wa-tooltip-content-color);
  font-size: var(--wa-tooltip-font-size);
  line-height: var(--wa-tooltip-line-height);
  text-align: start;
  white-space: normal;
}

.tooltip {
  --arrow-size: var(--wa-tooltip-arrow-size);
  --arrow-color: var(--wa-tooltip-background-color);
}

.tooltip::part(popup) {
  z-index: 1000;
}

.tooltip[placement^='top']::part(popup) {
  transform-origin: bottom;
}

.tooltip[placement^='bottom']::part(popup) {
  transform-origin: top;
}

.tooltip[placement^='left']::part(popup) {
  transform-origin: right;
}

.tooltip[placement^='right']::part(popup) {
  transform-origin: left;
}

.body {
  display: block;
  width: max-content;
  max-width: var(--max-width);
  border-radius: var(--wa-tooltip-border-radius);
  background-color: var(--wa-tooltip-background-color);
  border: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
  padding: 0.25em 0.5em;
  user-select: none;
  -webkit-user-select: none;
}

.tooltip::part(arrow) {
  border-bottom: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
  border-right: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
}
`,C=class extends kt{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=e=>{e.key==="Escape"&&(e.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),this.hideDelay))}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=Lr("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(e){return this.trigger.split(" ").includes(e)}addToAriaLabelledBy(e,t){let r=(e.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);r.includes(t)||(r.push(t),e.setAttribute("aria-labelledby",r.join(" ")))}removeFromAriaLabelledBy(e,t){let n=(e.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(i=>i!==t);n.length>0?e.setAttribute("aria-labelledby",n.join(" ")):e.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;let e=new Or;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),this.body.hidden=!1,this.popup.active=!0,await uo(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new _r)}else{let e=new Pr;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),await uo(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new $r)}}handleForChange(){let e=this.getRootNode();if(!e)return;let t=this.for?e.getElementById(this.for):null,o=this.anchor;if(t===o)return;let{signal:r}=this.eventController;t&&(this.addToAriaLabelledBy(t,this.id),t.addEventListener("blur",this.handleBlur,{capture:!0,signal:r}),t.addEventListener("focus",this.handleFocus,{capture:!0,signal:r}),t.addEventListener("click",this.handleClick,{signal:r}),t.addEventListener("mouseover",this.handleMouseOver,{signal:r}),t.addEventListener("mouseout",this.handleMouseOut,{signal:r})),o&&(this.removeFromAriaLabelledBy(o,this.id),o.removeEventListener("blur",this.handleBlur,{capture:!0}),o.removeEventListener("focus",this.handleFocus,{capture:!0}),o.removeEventListener("click",this.handleClick),o.removeEventListener("mouseover",this.handleMouseOver),o.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=t}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,fo(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,fo(this,"wa-after-hide")}render(){return nt`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${zt({tooltip:!0,"tooltip-open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        ?arrow=${!this.withoutArrow}
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body">
          <slot></slot>
        </div>
      </wa-popup>
    `}};C.css=ti;C.dependencies={"wa-popup":x};g([ut("slot:not([name])")],C.prototype,"defaultSlot",2);g([ut(".body")],C.prototype,"body",2);g([ut("wa-popup")],C.prototype,"popup",2);g([y()],C.prototype,"placement",2);g([y({type:Boolean,reflect:!0})],C.prototype,"disabled",2);g([y({type:Number})],C.prototype,"distance",2);g([y({type:Boolean,reflect:!0})],C.prototype,"open",2);g([y({type:Number})],C.prototype,"skidding",2);g([y({attribute:"show-delay",type:Number})],C.prototype,"showDelay",2);g([y({attribute:"hide-delay",type:Number})],C.prototype,"hideDelay",2);g([y()],C.prototype,"trigger",2);g([y({attribute:"without-arrow",type:Boolean,reflect:!0})],C.prototype,"withoutArrow",2);g([y()],C.prototype,"for",2);g([it()],C.prototype,"anchor",2);g([re("open",{waitUntilFirstUpdate:!0})],C.prototype,"handleOpenChange",1);g([re("for")],C.prototype,"handleForChange",1);g([re(["distance","placement","skidding"])],C.prototype,"handleOptionsChange",1);g([re("disabled")],C.prototype,"handleDisabledChange",1);C=g([St("wa-tooltip")],C);var{I:ei}=qo;var Mr=e=>e.strings===void 0,Dr=()=>document.createComment(""),Ht=(e,t,o)=>{let r=e._$AA.parentNode,n=t===void 0?e._$AB:t._$AA;if(o===void 0){let i=r.insertBefore(Dr(),n),s=r.insertBefore(Dr(),n);o=new ei(i,s,e,e.options)}else{let i=o._$AB.nextSibling,s=o._$AM,a=s!==e;if(a){let l;o._$AQ?.(e),o._$AM=e,o._$AP!==void 0&&(l=e._$AU)!==s._$AU&&o._$AP(l)}if(i!==n||a){let l=o._$AA;for(;l!==i;){let p=l.nextSibling;r.insertBefore(l,n),l=p}}}return o},mt=(e,t,o=e)=>(e._$AI(t,o),e),oi={},Le=(e,t=oi)=>e._$AH=t,Br=e=>e._$AH,De=e=>{e._$AR(),e._$AA.remove()};var ri=Z(class extends U{constructor(e){if(super(e),e.type!==D.PROPERTY&&e.type!==D.ATTRIBUTE&&e.type!==D.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Mr(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===_||t===A)return t;let o=e.element,r=e.name;if(e.type===D.PROPERTY){if(t===o[r])return _}else if(e.type===D.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(r))return _}else if(e.type===D.ATTRIBUTE&&o.getAttribute(r)===t+"")return _;return Le(e),t}});var Nr=(e,t,o)=>{let r=new Map;for(let n=t;n<=o;n++)r.set(e[n],n);return r},ni=Z(class extends U{constructor(e){if(super(e),e.type!==D.CHILD)throw Error("repeat() can only be used in text expressions")}dt(e,t,o){let r;o===void 0?o=t:t!==void 0&&(r=t);let n=[],i=[],s=0;for(let a of e)n[s]=r?r(a,s):s,i[s]=o(a,s),s++;return{values:i,keys:n}}render(e,t,o){return this.dt(e,t,o).values}update(e,[t,o,r]){let n=Br(e),{values:i,keys:s}=this.dt(t,o,r);if(!Array.isArray(n))return this.ut=s,i;let a=this.ut??=[],l=[],p,h,c=0,f=n.length-1,d=0,u=i.length-1;for(;c<=f&&d<=u;)if(n[c]===null)c++;else if(n[f]===null)f--;else if(a[c]===s[d])l[d]=mt(n[c],i[d]),c++,d++;else if(a[f]===s[u])l[u]=mt(n[f],i[u]),f--,u--;else if(a[c]===s[u])l[u]=mt(n[c],i[u]),Ht(e,l[u+1],n[c]),c++,u--;else if(a[f]===s[d])l[d]=mt(n[f],i[d]),Ht(e,n[c],n[f]),f--,d++;else if(p===void 0&&(p=Nr(s,d,u),h=Nr(a,c,f)),p.has(a[c]))if(p.has(a[f])){let m=h.get(s[d]),v=m!==void 0?n[m]:null;if(v===null){let b=Ht(e,n[c]);mt(b,i[d]),l[d]=b}else l[d]=mt(v,i[d]),Ht(e,n[c],v),n[m]=null;d++}else De(n[f]),f--;else De(n[c]),c++;for(;d<=u;){let m=Ht(e,l[u+1]);mt(m,i[d]),l[d++]=m}for(;c<=f;){let m=n[c++];m!==null&&De(m)}return this.ut=s,Le(e,l),_}});var zr="important",ii=" !"+zr,si=Z(class extends U{constructor(e){if(super(e),e.type!==D.ATTRIBUTE||e.name!=="style"||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,o)=>{let r=e[o];return r==null?t:t+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`}),"")}update(e,[t]){let{style:o}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let r of this.ft)t[r]==null&&(this.ft.delete(r),r.includes("-")?o.removeProperty(r):o[r]=null);for(let r in t){let n=t[r];if(n!=null){this.ft.add(r);let i=typeof n=="string"&&n.endsWith(ii);r.includes("-")||i?o.setProperty(r,i?n.slice(0,-11):n,i?zr:""):o[r]=n}}return _}});var ne=class extends U{constructor(t){if(super(t),this.it=A,t.type!==D.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===A||t==null)return this._t=void 0,this.it=t;if(t===_)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;let o=[t];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};ne.directiveName="unsafeHTML",ne.resultType=1;var ai=Z(ne);var mo=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function go(e,t,o,r){e.addEventListener?e.addEventListener(t,o,r):e.attachEvent&&e.attachEvent(`on${t}`,o)}function ie(e,t,o,r){e&&(e.removeEventListener?e.removeEventListener(t,o,r):e.detachEvent&&e.detachEvent(`on${t}`,o))}function Wr(e,t){let o=t.slice(0,t.length-1),r=[];for(let n=0;n<o.length;n++)r.push(e[o[n].toLowerCase()]);return r}function jr(e){typeof e!="string"&&(e=""),e=e.replace(/\s/g,"");let t=e.split(","),o=t.lastIndexOf("");for(;o>=0;)t[o-1]+=",",t.splice(o,1),o=t.lastIndexOf("");return t}function li(e,t){let o=e.length>=t.length?e:t,r=e.length>=t.length?t:e,n=!0;for(let i=0;i<o.length;i++)r.indexOf(o[i])===-1&&(n=!1);return n}function Ir(e){let t=e.keyCode||e.which||e.charCode;return e.code&&/^Key[A-Z]$/.test(e.code)&&(t=e.code.charCodeAt(3)),t}var le={backspace:8,"\u232B":8,tab:9,clear:12,enter:13,"\u21A9":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,arrowup:38,arrowdown:40,arrowleft:37,arrowright:39,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"\u21EA":20,",":188,".":190,"/":191,"`":192,"-":mo?173:189,"=":mo?61:187,";":mo?59:186,"'":222,"{":219,"}":221,"[":219,"]":221,"\\":220},K={"\u21E7":16,shift:16,"\u2325":18,alt:18,option:18,"\u2303":17,ctrl:17,control:17,"\u2318":91,cmd:91,meta:91,command:91},se={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},O={16:!1,18:!1,17:!1,91:!1},k={};for(let e=1;e<20;e++)le[`f${e}`]=111+e;var S=[],ae=null,Fr="all",ct=new Map,Ut=e=>le[e.toLowerCase()]||K[e.toLowerCase()]||e.toUpperCase().charCodeAt(0),ci=e=>Object.keys(le).find(t=>le[t]===e),pi=e=>Object.keys(K).find(t=>K[t]===e),Vr=e=>{Fr=e||"all"},ce=()=>Fr||"all",di=()=>S.slice(0),hi=()=>S.map(e=>ci(e)||pi(e)||String.fromCharCode(e)),fi=()=>{let e=[];return Object.keys(k).forEach(t=>{k[t].forEach(({key:o,scope:r,mods:n,shortcut:i})=>{e.push({scope:r,shortcut:i,mods:n,keys:o.split("+").map(s=>Ut(s))})})}),e},qr=e=>{let t=e.target||e.srcElement,{tagName:o}=t,r=!0,n=o==="INPUT"&&!["checkbox","radio","range","button","file","reset","submit","color"].includes(t.type);return(t.isContentEditable||(n||o==="TEXTAREA"||o==="SELECT")&&!t.readOnly)&&(r=!1),r},ui=e=>(typeof e=="string"&&(e=Ut(e)),S.indexOf(e)!==-1),mi=(e,t)=>{let o,r;e||(e=ce());for(let n in k)if(Object.prototype.hasOwnProperty.call(k,n))for(o=k[n],r=0;r<o.length;)o[r].scope===e?o.splice(r,1).forEach(({element:i})=>bo(i)):r++;ce()===e&&Vr(t||"all")};function gi(e){let t=Ir(e);e.key&&e.key.toLowerCase()==="capslock"&&(t=Ut(e.key));let o=S.indexOf(t);if(o>=0&&S.splice(o,1),e.key&&e.key.toLowerCase()==="meta"&&S.splice(0,S.length),(t===93||t===224)&&(t=91),t in O){O[t]=!1;for(let r in K)K[r]===t&&(pt[r]=!1)}}var Kr=(e,...t)=>{if(typeof e>"u")Object.keys(k).forEach(o=>{Array.isArray(k[o])&&k[o].forEach(r=>Me(r)),delete k[o]}),bo(null);else if(Array.isArray(e))e.forEach(o=>{o.key&&Me(o)});else if(typeof e=="object")e.key&&Me(e);else if(typeof e=="string"){let[o,r]=t;typeof o=="function"&&(r=o,o=""),Me({key:e,scope:o,method:r,splitKey:"+"})}},Me=({key:e,scope:t,method:o,splitKey:r="+"})=>{jr(e).forEach(n=>{let i=n.split(r),s=i.length,a=i[s-1],l=a==="*"?"*":Ut(a);if(!k[l])return;t||(t=ce());let p=s>1?Wr(K,i):[],h=[];k[l]=k[l].filter(c=>{let f=(o?c.method===o:!0)&&c.scope===t&&li(c.mods,p);return f&&h.push(c.element),!f}),h.forEach(c=>bo(c))})};function Hr(e,t,o,r){if(t.element!==r)return;let n;if(t.scope===o||t.scope==="all"){n=t.mods.length>0;for(let i in O)Object.prototype.hasOwnProperty.call(O,i)&&(!O[i]&&t.mods.indexOf(+i)>-1||O[i]&&t.mods.indexOf(+i)===-1)&&(n=!1);(t.mods.length===0&&!O[16]&&!O[18]&&!O[17]&&!O[91]||n||t.shortcut==="*")&&(t.keys=[],t.keys=t.keys.concat(S),t.method(e,t)===!1&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0)))}}function Ur(e,t){let o=k["*"],r=Ir(e);if(e.key&&e.key.toLowerCase()==="capslock"||!(pt.filter||qr).call(this,e))return;if((r===93||r===224)&&(r=91),S.indexOf(r)===-1&&r!==229&&S.push(r),["metaKey","ctrlKey","altKey","shiftKey"].forEach(a=>{let l=se[a];e[a]&&S.indexOf(l)===-1?S.push(l):!e[a]&&S.indexOf(l)>-1?S.splice(S.indexOf(l),1):a==="metaKey"&&e[a]&&(S=S.filter(p=>p in se||p===r))}),r in O){O[r]=!0;for(let a in K)if(Object.prototype.hasOwnProperty.call(K,a)){let l=se[K[a]];pt[a]=e[l]}if(!o)return}for(let a in O)Object.prototype.hasOwnProperty.call(O,a)&&(O[a]=e[se[a]]);e.getModifierState&&!(e.altKey&&!e.ctrlKey)&&e.getModifierState("AltGraph")&&(S.indexOf(17)===-1&&S.push(17),S.indexOf(18)===-1&&S.push(18),O[17]=!0,O[18]=!0);let n=ce();if(o)for(let a=0;a<o.length;a++)o[a].scope===n&&(e.type==="keydown"&&o[a].keydown||e.type==="keyup"&&o[a].keyup)&&Hr(e,o[a],n,t);if(!(r in k))return;let i=k[r],s=i.length;for(let a=0;a<s;a++)if((e.type==="keydown"&&i[a].keydown||e.type==="keyup"&&i[a].keyup)&&i[a].key){let l=i[a],{splitKey:p}=l,h=l.key.split(p),c=[];for(let f=0;f<h.length;f++)c.push(Ut(h[f]));c.sort().join("")===S.sort().join("")&&Hr(e,l,n,t)}}var pt=function(e,t,o){S=[];let r=jr(e),n=[],i="all",s=document,a=0,l=!1,p=!0,h="+",c=!1,f=!1;if(o===void 0&&typeof t=="function"&&(o=t),Object.prototype.toString.call(t)==="[object Object]"){let d=t;d.scope&&(i=d.scope),d.element&&(s=d.element),d.keyup&&(l=d.keyup),d.keydown!==void 0&&(p=d.keydown),d.capture!==void 0&&(c=d.capture),typeof d.splitKey=="string"&&(h=d.splitKey),d.single===!0&&(f=!0)}for(typeof t=="string"&&(i=t),f&&Kr(e,i);a<r.length;a++){let d=r[a].split(h);n=[],d.length>1&&(n=Wr(K,d));let u=d[d.length-1];u=u==="*"?"*":Ut(u),u in k||(k[u]=[]),k[u].push({keyup:l,keydown:p,scope:i,mods:n,shortcut:r[a],method:o,key:r[a],splitKey:h,element:s})}if(typeof s<"u"&&typeof window<"u"){if(!ct.has(s)){let d=(m=window.event)=>Ur(m,s),u=(m=window.event)=>{Ur(m,s),gi(m)};ct.set(s,{keydownListener:d,keyupListenr:u,capture:c}),go(s,"keydown",d,c),go(s,"keyup",u,c)}if(!ae){let d=()=>{S=[]};ae={listener:d,capture:c},go(window,"focus",d,c)}}};function yi(e,t="all"){Object.keys(k).forEach(o=>{k[o].filter(r=>r.scope===t&&r.shortcut===e).forEach(r=>{r&&r.method&&r.method({},r)})})}function bo(e){let t=Object.values(k).flat();if(t.findIndex(({element:o})=>o===e)<0&&e){let{keydownListener:o,keyupListenr:r,capture:n}=ct.get(e)||{};o&&r&&(ie(e,"keyup",r,n),ie(e,"keydown",o,n),ct.delete(e))}if((t.length<=0||ct.size<=0)&&(Array.from(ct.keys()).forEach(o=>{let{keydownListener:r,keyupListenr:n,capture:i}=ct.get(o)||{};r&&n&&(ie(o,"keyup",n,i),ie(o,"keydown",r,i),ct.delete(o))}),ct.clear(),Object.keys(k).forEach(o=>delete k[o]),ae)){let{listener:o,capture:r}=ae;ie(window,"focus",o,r),ae=null}}var yo={getPressedKeyString:hi,setScope:Vr,getScope:ce,deleteScope:mi,getPressedKeyCodes:di,getAllKeyCodes:fi,isPressed:ui,filter:qr,trigger:yi,unbind:Kr,keyMap:le,modifier:K,modifierMap:se};for(let e in yo){let t=e;Object.prototype.hasOwnProperty.call(yo,t)&&(pt[t]=yo[t])}if(typeof window<"u"){let e=window.hotkeys;pt.noConflict=t=>(t&&window.hotkeys===pt&&(window.hotkeys=e),pt),window.hotkeys=pt}var Jr=e=>{class t extends e{constructor(){super(...arguments);this.#t=!1;this.initialReflectedProperties=new Map}#t;attributeChangedCallback(n,i,s){if(!this.#t){let a=this;this.constructor.elementProperties.forEach((l,p)=>{l.reflect&&a[p]!=null&&this.initialReflectedProperties.set(p,a[p])}),this.initialReflectedProperties.set("slot",this.slot),this.#t=!0}super.attributeChangedCallback?.(n,i,s)}willUpdate(n){super.willUpdate?.(n);let i=this;this.initialReflectedProperties.forEach((s,a)=>{n.has(a)&&i[a]==null&&(i[a]=s)})}}return et([it()],t.prototype,"initialReflectedProperties",2),t};function Be(e){if(!e||typeof e!="object")return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype||Object.getPrototypeOf(t)===null?Object.prototype.toString.call(e)==="[object Object]":!1}function vo(e){return e!=null}function Ne(e){return typeof e=="string"}var ze=class extends Event{constructor(t,o){super(t,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=o}};var He=class extends ze{constructor(t,o={}){super("lb-command",{bubbles:!0,cancelable:!1,composed:!0}),this.command=t,this.detail=o}};var Ue=class extends Event{constructor(t={value:void 0,oldValue:void 0}){super("lb-data",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var We=class extends Event{constructor(t={}){super("lb-display-mode-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var je=class extends Event{constructor(t){super("lb-drag-end",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ie=class extends Event{constructor(t){super("lb-drag-start",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Fe=class extends Event{constructor(t={}){super("lb-error",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ve=class extends Event{constructor(t={}){super("lb-param-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var qe=class extends Event{constructor(t){super("lb-popover-close",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ke=class extends Event{constructor(t){super("lb-popover-open",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Je=class extends Event{constructor(t){super("lb-resize",{bubbles:!1,cancelable:!1,composed:!0}),this.detail=t}};var Yr={"lb-command":He,"lb-data":Ue,"lb-drag-start":Ie,"lb-drag-end":je,"lb-error":Fe,"lb-resize":Je,"lb-popover-open":Ke,"lb-popover-close":qe,"lb-param-change":Ve,"lb-display-mode-change":We};function Gr(e){return Yr[e]}var Xr=`:host {
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
`;var pe=class extends Jr(N){constructor(){super();this.cleanupJobs=[]}static{this.shadowRootOptions={...N.shadowRootOptions,serializable:!0}}static{this.morphable=!0}static get styles(){let o=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Xr,...o].map(r=>typeof r=="string"?bt(r):r)}afterMorph(){}get morphable(){return!!this.getStaticProperty("morphable")}disconnectedCallback(){this.cleanupJobs.forEach(o=>o()),super.disconnectedCallback()}addCleanupJob(o){this.cleanupJobs.push(o)}renderToTarget(o,r){Gt(r,o)}on(o,r){this.addEventListener(o,r),this.addCleanupJob(()=>this.removeEventListener(o,r))}delegate(o,r){document.addEventListener(o,r),this.addCleanupJob(()=>document.removeEventListener(o,r))}dispatch(o,...r){let n=Gr(o),i=this;if(!n){console.warn(`Unknown event type '${o}'`);return}let s=null;if(Be(r[0])?(s=r[0],r=[]):r.length>0&&Be(r[r.length-1])&&(s=r.pop()),s?.target){let l=Ne(s.target)?document.querySelector(`#${s.target}`):i;l&&(i=l)}let a=[...r,s].filter(vo);i.dispatchEvent(new n(...a))}getStaticProperty(o){return this.constructor[o]}warn(o){Ne(o)&&(o=new Error(o)),this.dispatch("lb-error",{error:o}),console.error(o)}};et([it()],pe.prototype,"cleanupJobs",2);var Zr=`#container {
  box-sizing: content-box !important;
  height: var(--lookbook-form-control-height-sm);
  padding-block: var(--lookbook-size-2xs);
  padding-inline: var(--lookbook-size-2xs);
  display: flex;
  align-items: center;
}
#start {
  margin-inline-end: auto;
  display: flex;
  align-items: center;
  column-gap: var(--lookbook-size-3xs);
}
#end {
  margin-inline-start: auto;
  display: flex;
  align-items: center;
}
`;var Wt=class extends pe{render(){return nt`
      <div
        id="container"
        part="container"
        class="flex-row"
      >
        <div id="start">
          <slot name="start"></slot>
        </div>
        <div id="end">
          <slot name="end"></slot>
        </div>
      </div>
    `}};Wt.css=Zr,et([y({reflect:!0})],Wt.prototype,"divider",2),Wt=et([St("lb-toolbar")],Wt);export{Wt as LookbookToolbar};
/*! Bundled license information:

@awesome.me/webawesome/dist/chunks/chunk.AJ3PNG3J.js:
@awesome.me/webawesome/dist/chunks/chunk.OKWGTFUF.js:
@awesome.me/webawesome/dist/chunks/chunk.I24ISEJH.js:
@awesome.me/webawesome/dist/chunks/chunk.I37X32SU.js:
@awesome.me/webawesome/dist/chunks/chunk.LU7TFTYS.js:
@awesome.me/webawesome/dist/chunks/chunk.7ED5PZU6.js:
@awesome.me/webawesome/dist/chunks/chunk.DTCJCEYF.js:
@awesome.me/webawesome/dist/chunks/chunk.2WYO32PF.js:
@awesome.me/webawesome/dist/chunks/chunk.MDCY6RAP.js:
@awesome.me/webawesome/dist/chunks/chunk.EFWMJOG7.js:
@awesome.me/webawesome/dist/chunks/chunk.N3AZYXKV.js:
@awesome.me/webawesome/dist/chunks/chunk.4T63CWPX.js:
@awesome.me/webawesome/dist/components/tooltip/tooltip.js:
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
