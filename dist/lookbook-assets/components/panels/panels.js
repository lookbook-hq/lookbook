var Tn=Object.defineProperty;var Rn=Object.getOwnPropertyDescriptor;var O=(t,e,o,r)=>{for(var n=r>1?void 0:r?Rn(e,o):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(n=(r?s(e,o,n):s(n))||n);return r&&n&&Tn(e,o,n),n};var Do=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};var oo=new Set,Mt=new Map,bt,ro="ltr",no="en",Mo=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Mo){let t=new MutationObserver(Bo);ro=document.documentElement.dir||"ltr",no=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function Gt(...t){t.map(e=>{let o=e.$code.toLowerCase();Mt.has(o)?Mt.set(o,Object.assign(Object.assign({},Mt.get(o)),e)):Mt.set(o,e),bt||(bt=e)}),Bo()}function Bo(){Mo&&(ro=document.documentElement.dir||"ltr",no=document.documentElement.lang||navigator.language),[...oo.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}var ye=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){oo.add(this.host)}hostDisconnected(){oo.delete(this.host)}dir(){return`${this.host.dir||ro}`.toLowerCase()}lang(){return`${this.host.lang||no}`.toLowerCase()}getTranslationData(e){var o,r;let n=new Intl.Locale(e.replace(/_/g,"-")),i=n?.language.toLowerCase(),s=(r=(o=n?.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&r!==void 0?r:"",a=Mt.get(`${i}-${s}`),l=Mt.get(i);return{locale:n,language:i,region:s,primary:a,secondary:l}}exists(e,o){var r;let{primary:n,secondary:i}=this.getTranslationData((r=o.lang)!==null&&r!==void 0?r:this.lang());return o=Object.assign({includeFallback:!1},o),!!(n&&n[e]||i&&i[e]||o.includeFallback&&bt&&bt[e])}term(e,...o){let{primary:r,secondary:n}=this.getTranslationData(this.lang()),i;if(r&&r[e])i=r[e];else if(n&&n[e])i=n[e];else if(bt&&bt[e])i=bt[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof i=="function"?i(...o):i}date(e,o){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),o).format(e)}number(e,o){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),o).format(e)}relativeTime(e,o,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(e,o)}};var No={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};Gt(No);var zo=No;var Wo=class extends ye{};Gt(zo);var Ln=Object.defineProperty,Dn=Object.getOwnPropertyDescriptor,Io=t=>{throw TypeError(t)},g=(t,e,o,r)=>{for(var n=r>1?void 0:r?Dn(e,o):e,i=t.length-1,s;i>=0;i--)(s=t[i])&&(n=(r?s(e,o,n):s(n))||n);return r&&n&&Ln(e,o,n),n},Ho=(t,e,o)=>e.has(t)||Io("Cannot "+o),jo=(t,e,o)=>(Ho(t,e,"read from private field"),o?o.call(t):e.get(t)),Uo=(t,e,o)=>e.has(t)?Io("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),Fo=(t,e,o,r)=>(Ho(t,e,"write to private field"),r?r.call(t,o):e.set(t,o),o);var xe=globalThis,be=xe.ShadowRoot&&(xe.ShadyCSS===void 0||xe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Vo=Symbol(),qo=new WeakMap,Yt=class{constructor(e,o,r){if(this._$cssResult$=!0,r!==Vo)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(be&&e===void 0){let r=o!==void 0&&o.length===1;r&&(e=qo.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&qo.set(o,e))}return e}toString(){return this.cssText}},vt=t=>new Yt(typeof t=="string"?t:t+"",void 0,Vo);var Ko=(t,e)=>{if(be)t.adoptedStyleSheets=e.map((o=>o instanceof CSSStyleSheet?o:o.styleSheet));else for(let o of e){let r=document.createElement("style"),n=xe.litNonce;n!==void 0&&r.setAttribute("nonce",n),r.textContent=o.cssText,t.appendChild(r)}},io=be?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let r of e.cssRules)o+=r.cssText;return vt(o)})(t):t;var{is:Mn,defineProperty:Bn,getOwnPropertyDescriptor:Nn,getOwnPropertyNames:zn,getOwnPropertySymbols:Wn,getPrototypeOf:In}=Object,ve=globalThis,Jo=ve.trustedTypes,Hn=Jo?Jo.emptyScript:"",jn=ve.reactiveElementPolyfillSupport,Xt=(t,e)=>t,Zt={toAttribute(t,e){switch(e){case Boolean:t=t?Hn:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},we=(t,e)=>!Mn(t,e),Go={attribute:!0,type:String,converter:Zt,reflect:!1,useDefault:!1,hasChanged:we};Symbol.metadata??=Symbol("metadata"),ve.litPropertyMetadata??=new WeakMap;var st=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=Go){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){let r=Symbol(),n=this.getPropertyDescriptor(e,r,o);n!==void 0&&Bn(this.prototype,e,n)}}static getPropertyDescriptor(e,o,r){let{get:n,set:i}=Nn(this.prototype,e)??{get(){return this[o]},set(s){this[o]=s}};return{get:n,set(s){let a=n?.call(this);i?.call(this,s),this.requestUpdate(e,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Go}static _$Ei(){if(this.hasOwnProperty(Xt("elementProperties")))return;let e=In(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Xt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Xt("properties"))){let o=this.properties,r=[...zn(o),...Wn(o)];for(let n of r)this.createProperty(n,o[n])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[r,n]of o)this.elementProperties.set(r,n)}this._$Eh=new Map;for(let[o,r]of this.elementProperties){let n=this._$Eu(o,r);n!==void 0&&this._$Eh.set(n,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let n of r)o.unshift(io(n))}else e!==void 0&&o.push(io(e));return o}static _$Eu(e,o){let r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((e=>e(this)))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let r of o.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ko(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((e=>e.hostConnected?.()))}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach((e=>e.hostDisconnected?.()))}attributeChangedCallback(e,o,r){this._$AK(e,r)}_$ET(e,o){let r=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,r);if(n!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:Zt).toAttribute(o,r.type);this._$Em=e,i==null?this.removeAttribute(n):this.setAttribute(n,i),this._$Em=null}}_$AK(e,o){let r=this.constructor,n=r._$Eh.get(e);if(n!==void 0&&this._$Em!==n){let i=r.getPropertyOptions(n),s=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:Zt;this._$Em=n;let a=s.fromAttribute(o,i.type);this[n]=a??this._$Ej?.get(n)??a,this._$Em=null}}requestUpdate(e,o,r){if(e!==void 0){let n=this.constructor,i=this[e];if(r??=n.getPropertyOptions(e),!((r.hasChanged??we)(i,o)||r.useDefault&&r.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,o,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:r,reflect:n,wrapped:i},s){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??o??this[e]),i!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(o=void 0),this._$AL.set(e,o)),n===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,i]of this._$Ep)this[n]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[n,i]of r){let{wrapped:s}=i,a=this[n];s!==!0||this._$AL.has(n)||a===void 0||this.C(n,void 0,i,a)}}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach((r=>r.hostUpdate?.())),this.update(o)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach((o=>o.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach((o=>this._$ET(o,this[o]))),this._$EM()}updated(e){}firstUpdated(e){}};st.elementStyles=[],st.shadowRootOptions={mode:"open"},st[Xt("elementProperties")]=new Map,st[Xt("finalized")]=new Map,jn?.({ReactiveElement:st}),(ve.reactiveElementVersions??=[]).push("2.1.1");var ao=globalThis,Ee=ao.trustedTypes,Yo=Ee?Ee.createPolicy("lit-html",{createHTML:t=>t}):void 0,lo="$lit$",at=`lit$${Math.random().toFixed(9).slice(2)}$`,co="?"+at,Un=`<${co}>`,At=document,te=()=>At.createComment(""),ee=t=>t===null||typeof t!="object"&&typeof t!="function",po=Array.isArray,or=t=>po(t)||typeof t?.[Symbol.iterator]=="function",so=`[ 	
\f\r]`,Qt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Xo=/-->/g,Zo=/>/g,wt=RegExp(`>|${so}(?:([^\\s"'>=/]+)(${so}*=${so}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qo=/'/g,tr=/"/g,rr=/^(?:script|style|textarea|title)$/i,fo=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),z=fo(1),Fn=fo(2),ws=fo(3),P=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),er=new WeakMap,Et=At.createTreeWalker(At,129);function nr(t,e){if(!po(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Yo!==void 0?Yo.createHTML(e):e}var ir=(t,e)=>{let o=t.length-1,r=[],n,i=e===2?"<svg>":e===3?"<math>":"",s=Qt;for(let a=0;a<o;a++){let l=t[a],p,d,c=-1,h=0;for(;h<l.length&&(s.lastIndex=h,d=s.exec(l),d!==null);)h=s.lastIndex,s===Qt?d[1]==="!--"?s=Xo:d[1]!==void 0?s=Zo:d[2]!==void 0?(rr.test(d[2])&&(n=RegExp("</"+d[2],"g")),s=wt):d[3]!==void 0&&(s=wt):s===wt?d[0]===">"?(s=n??Qt,c=-1):d[1]===void 0?c=-2:(c=s.lastIndex-d[2].length,p=d[1],s=d[3]===void 0?wt:d[3]==='"'?tr:Qo):s===tr||s===Qo?s=wt:s===Xo||s===Zo?s=Qt:(s=wt,n=void 0);let f=s===wt&&t[a+1].startsWith("/>")?" ":"";i+=s===Qt?l+Un:c>=0?(r.push(p),l.slice(0,c)+lo+l.slice(c)+at+f):l+at+(c===-2?a:f)}return[nr(t,i+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},oe=class t{constructor({strings:e,_$litType$:o},r){let n;this.parts=[];let i=0,s=0,a=e.length-1,l=this.parts,[p,d]=ir(e,o);if(this.el=t.createElement(p,r),Et.currentNode=this.el.content,o===2||o===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(n=Et.nextNode())!==null&&l.length<a;){if(n.nodeType===1){if(n.hasAttributes())for(let c of n.getAttributeNames())if(c.endsWith(lo)){let h=d[s++],f=n.getAttribute(c).split(at),u=/([.?@])?(.*)/.exec(h);l.push({type:1,index:i,name:u[2],strings:f,ctor:u[1]==="."?Se:u[1]==="?"?Ce:u[1]==="@"?ke:Ct}),n.removeAttribute(c)}else c.startsWith(at)&&(l.push({type:6,index:i}),n.removeAttribute(c));if(rr.test(n.tagName)){let c=n.textContent.split(at),h=c.length-1;if(h>0){n.textContent=Ee?Ee.emptyScript:"";for(let f=0;f<h;f++)n.append(c[f],te()),Et.nextNode(),l.push({type:2,index:++i});n.append(c[h],te())}}}else if(n.nodeType===8)if(n.data===co)l.push({type:2,index:i});else{let c=-1;for(;(c=n.data.indexOf(at,c+1))!==-1;)l.push({type:7,index:i}),c+=at.length-1}i++}}static createElement(e,o){let r=At.createElement("template");return r.innerHTML=e,r}};function St(t,e,o=t,r){if(e===P)return e;let n=r!==void 0?o._$Co?.[r]:o._$Cl,i=ee(e)?void 0:e._$litDirective$;return n?.constructor!==i&&(n?._$AO?.(!1),i===void 0?n=void 0:(n=new i(t),n._$AT(t,o,r)),r!==void 0?(o._$Co??=[])[r]=n:o._$Cl=n),n!==void 0&&(e=St(t,n._$AS(t,e.values),n,r)),e}var Ae=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:r}=this._$AD,n=(e?.creationScope??At).importNode(o,!0);Et.currentNode=n;let i=Et.nextNode(),s=0,a=0,l=r[0];for(;l!==void 0;){if(s===l.index){let p;l.type===2?p=new Bt(i,i.nextSibling,this,e):l.type===1?p=new l.ctor(i,l.name,l.strings,this,e):l.type===6&&(p=new $e(i,this,e)),this._$AV.push(p),l=r[++a]}s!==l?.index&&(i=Et.nextNode(),s++)}return Et.currentNode=At,n}p(e){let o=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,o),o+=r.strings.length-2):r._$AI(e[o])),o++}},Bt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,r,n){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=r,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=St(this,e,o),ee(e)?e===A||e==null||e===""?(this._$AH!==A&&this._$AR(),this._$AH=A):e!==this._$AH&&e!==P&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):or(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==A&&ee(this._$AH)?this._$AA.nextSibling.data=e:this.T(At.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:r}=e,n=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=oe.createElement(nr(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===n)this._$AH.p(o);else{let i=new Ae(n,this),s=i.u(this.options);i.p(o),this.T(s),this._$AH=i}}_$AC(e){let o=er.get(e.strings);return o===void 0&&er.set(e.strings,o=new oe(e)),o}k(e){po(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,r,n=0;for(let i of e)n===o.length?o.push(r=new t(this.O(te()),this.O(te()),this,this.options)):r=o[n],r._$AI(i),n++;n<o.length&&(this._$AR(r&&r._$AB.nextSibling,n),o.length=n)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){let r=e.nextSibling;e.remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ct=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,r,n,i){this.type=1,this._$AH=A,this._$AN=void 0,this.element=e,this.name=o,this._$AM=n,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=A}_$AI(e,o=this,r,n){let i=this.strings,s=!1;if(i===void 0)e=St(this,e,o,0),s=!ee(e)||e!==this._$AH&&e!==P,s&&(this._$AH=e);else{let a=e,l,p;for(e=i[0],l=0;l<i.length-1;l++)p=St(this,a[r+l],o,l),p===P&&(p=this._$AH[l]),s||=!ee(p)||p!==this._$AH[l],p===A?e=A:e!==A&&(e+=(p??"")+i[l+1]),this._$AH[l]=p}s&&!n&&this.j(e)}j(e){e===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Se=class extends Ct{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===A?void 0:e}},Ce=class extends Ct{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==A)}},ke=class extends Ct{constructor(e,o,r,n,i){super(e,o,r,n,i),this.type=5}_$AI(e,o=this){if((e=St(this,e,o,0)??A)===P)return;let r=this._$AH,n=e===A&&r!==A||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==A&&(r===A||n);n&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},$e=class{constructor(e,o,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){St(this,e)}},sr={M:lo,P:at,A:co,C:1,L:ir,R:Ae,D:or,V:St,I:Bt,H:Ct,N:Ce,U:ke,B:Se,F:$e},qn=ao.litHtmlPolyfillSupport;qn?.(oe,Bt),(ao.litHtmlVersions??=[]).push("3.3.1");var re=(t,e,o)=>{let r=o?.renderBefore??e,n=r._$litPart$;if(n===void 0){let i=o?.renderBefore??null;r._$litPart$=n=new Bt(e.insertBefore(te(),i),i,void 0,o??{})}return n._$AI(t),n};var ho=globalThis,W=class extends st{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=re(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return P}};W._$litElement$=!0,W.finalized=!0,ho.litElementHydrateSupport?.({LitElement:W});var Vn=ho.litElementPolyfillSupport;Vn?.({LitElement:W});(ho.litElementVersions??=[]).push("4.2.1");var lt=t=>(e,o)=>{o!==void 0?o.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)};var Kn={attribute:!0,type:String,converter:Zt,reflect:!1,hasChanged:we},Jn=(t=Kn,e,o)=>{let{kind:r,metadata:n}=o,i=globalThis.litPropertyMetadata.get(n);if(i===void 0&&globalThis.litPropertyMetadata.set(n,i=new Map),r==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(o.name,t),r==="accessor"){let{name:s}=o;return{set(a){let l=e.get.call(this);e.set.call(this,a),this.requestUpdate(s,l,t)},init(a){return a!==void 0&&this.C(s,void 0,t,a),a}}}if(r==="setter"){let{name:s}=o;return function(a){let l=this[s];e.call(this,a),this.requestUpdate(s,l,t)}}throw Error("Unsupported decorator location: "+r)};function y(t){return(e,o)=>typeof o=="object"?Jn(t,e,o):((r,n,i)=>{let s=n.hasOwnProperty(i);return n.constructor.createProperty(i,r),s?Object.getOwnPropertyDescriptor(n,i):void 0})(t,e,o)}function I(t){return y({...t,state:!0,attribute:!1})}var kt=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);function J(t,e){return(o,r,n)=>{let i=s=>s.renderRoot?.querySelector(t)??null;if(e){let{get:s,set:a}=typeof r=="object"?o:n??(()=>{let l=Symbol();return{get(){return this[l]},set(p){this[l]=p}}})();return kt(o,r,{get(){let l=s.call(this);return l===void 0&&(l=i(this),(l!==null||this.hasUpdated)&&a.call(this,l)),l}})}return kt(o,r,{get(){return i(this)}})}}var Yn=`:host {
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
`,Pe,$t=class extends W{constructor(){super(),Uo(this,Pe,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,o)=>{if(this.internals?.states)try{o?this.internals.states.add(e):this.internals.states.delete(e)}catch(r){if(String(r).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw r}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,o]of t.elementProperties)o.default==="inherit"&&o.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${o.initial}`,!0)}static get styles(){let t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Yn,...t].map(e=>typeof e=="string"?vt(e):e)}attributeChangedCallback(t,e,o){jo(this,Pe)||(this.constructor.elementProperties.forEach((r,n)=>{r.reflect&&this[n]!=null&&this.initialReflectedProperties.set(n,this[n])}),Fo(this,Pe,!0)),super.attributeChangedCallback(t,e,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,o)=>{t.has(o)&&this[o]==null&&(this[o]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){let o=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});o.error=e,this.dispatchEvent(o)}throw e}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};Pe=new WeakMap;g([y()],$t.prototype,"dir",2);g([y()],$t.prototype,"lang",2);g([y({type:Boolean,reflect:!0,attribute:"did-ssr"})],$t.prototype,"didSSR",2);var et=Math.min,D=Math.max,ie=Math.round,se=Math.floor,G=t=>({x:t,y:t}),Xn={left:"right",right:"left",bottom:"top",top:"bottom"},Zn={start:"end",end:"start"};function _e(t,e,o){return D(t,et(e,o))}function Pt(t,e){return typeof t=="function"?t(e):t}function ct(t){return t.split("-")[0]}function Ot(t){return t.split("-")[1]}function uo(t){return t==="x"?"y":"x"}function Te(t){return t==="y"?"height":"width"}var Qn=new Set(["top","bottom"]);function ot(t){return Qn.has(ct(t))?"y":"x"}function Re(t){return uo(ot(t))}function cr(t,e,o){o===void 0&&(o=!1);let r=Ot(t),n=Re(t),i=Te(n),s=n==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[i]>e.floating[i]&&(s=ne(s)),[s,ne(s)]}function pr(t){let e=ne(t);return[Oe(t),e,Oe(e)]}function Oe(t){return t.replace(/start|end/g,e=>Zn[e])}var ar=["left","right"],lr=["right","left"],ti=["top","bottom"],ei=["bottom","top"];function oi(t,e,o){switch(t){case"top":case"bottom":return o?e?lr:ar:e?ar:lr;case"left":case"right":return e?ti:ei;default:return[]}}function fr(t,e,o,r){let n=Ot(t),i=oi(ct(t),o==="start",r);return n&&(i=i.map(s=>s+"-"+n),e&&(i=i.concat(i.map(Oe)))),i}function ne(t){return t.replace(/left|right|bottom|top/g,e=>Xn[e])}function ri(t){return{top:0,right:0,bottom:0,left:0,...t}}function mo(t){return typeof t!="number"?ri(t):{top:t,right:t,bottom:t,left:t}}function _t(t){let{x:e,y:o,width:r,height:n}=t;return{width:r,height:n,top:o,left:e,right:e+r,bottom:o+n,x:e,y:o}}function dr(t,e,o){let{reference:r,floating:n}=t,i=ot(e),s=Re(e),a=Te(s),l=ct(e),p=i==="y",d=r.x+r.width/2-n.width/2,c=r.y+r.height/2-n.height/2,h=r[a]/2-n[a]/2,f;switch(l){case"top":f={x:d,y:r.y-n.height};break;case"bottom":f={x:d,y:r.y+r.height};break;case"right":f={x:r.x+r.width,y:c};break;case"left":f={x:r.x-n.width,y:c};break;default:f={x:r.x,y:r.y}}switch(Ot(e)){case"start":f[s]-=h*(o&&p?-1:1);break;case"end":f[s]+=h*(o&&p?-1:1);break}return f}var hr=async(t,e,o)=>{let{placement:r="bottom",strategy:n="absolute",middleware:i=[],platform:s}=o,a=i.filter(Boolean),l=await(s.isRTL==null?void 0:s.isRTL(e)),p=await s.getElementRects({reference:t,floating:e,strategy:n}),{x:d,y:c}=dr(p,r,l),h=r,f={},u=0;for(let m=0;m<a.length;m++){let{name:b,fn:x}=a[m],{x:v,y:E,data:_,reset:$}=await x({x:d,y:c,initialPlacement:r,placement:h,strategy:n,middlewareData:f,rects:p,platform:s,elements:{reference:t,floating:e}});d=v??d,c=E??c,f={...f,[b]:{...f[b],..._}},$&&u<=50&&(u++,typeof $=="object"&&($.placement&&(h=$.placement),$.rects&&(p=$.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:n}):$.rects),{x:d,y:c}=dr(p,h,l)),m=-1)}return{x:d,y:c,placement:h,strategy:n,middlewareData:f}};async function Le(t,e){var o;e===void 0&&(e={});let{x:r,y:n,platform:i,rects:s,elements:a,strategy:l}=t,{boundary:p="clippingAncestors",rootBoundary:d="viewport",elementContext:c="floating",altBoundary:h=!1,padding:f=0}=Pt(e,t),u=mo(f),b=a[h?c==="floating"?"reference":"floating":c],x=_t(await i.getClippingRect({element:(o=await(i.isElement==null?void 0:i.isElement(b)))==null||o?b:b.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(a.floating)),boundary:p,rootBoundary:d,strategy:l})),v=c==="floating"?{x:r,y:n,width:s.floating.width,height:s.floating.height}:s.reference,E=await(i.getOffsetParent==null?void 0:i.getOffsetParent(a.floating)),_=await(i.isElement==null?void 0:i.isElement(E))?await(i.getScale==null?void 0:i.getScale(E))||{x:1,y:1}:{x:1,y:1},$=_t(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:v,offsetParent:E,strategy:l}):v);return{top:(x.top-$.top+u.top)/_.y,bottom:($.bottom-x.bottom+u.bottom)/_.y,left:(x.left-$.left+u.left)/_.x,right:($.right-x.right+u.right)/_.x}}var ur=t=>({name:"arrow",options:t,async fn(e){let{x:o,y:r,placement:n,rects:i,platform:s,elements:a,middlewareData:l}=e,{element:p,padding:d=0}=Pt(t,e)||{};if(p==null)return{};let c=mo(d),h={x:o,y:r},f=Re(n),u=Te(f),m=await s.getDimensions(p),b=f==="y",x=b?"top":"left",v=b?"bottom":"right",E=b?"clientHeight":"clientWidth",_=i.reference[u]+i.reference[f]-h[f]-i.floating[u],$=h[f]-i.reference[f],q=await(s.getOffsetParent==null?void 0:s.getOffsetParent(p)),R=q?q[E]:0;(!R||!await(s.isElement==null?void 0:s.isElement(q)))&&(R=a.floating[E]||i.floating[u]);let nt=_/2-$/2,Q=R/2-m[u]/2-1,N=et(c[x],Q),ut=et(c[v],Q),tt=N,mt=R-m[u]-ut,L=R/2-m[u]/2+nt,xt=_e(tt,L,mt),it=!l.arrow&&Ot(n)!=null&&L!==xt&&i.reference[u]/2-(L<tt?N:ut)-m[u]/2<0,V=it?L<tt?L-tt:L-mt:0;return{[f]:h[f]+V,data:{[f]:xt,centerOffset:L-xt-V,...it&&{alignmentOffset:V}},reset:it}}});var mr=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o,r;let{placement:n,middlewareData:i,rects:s,initialPlacement:a,platform:l,elements:p}=e,{mainAxis:d=!0,crossAxis:c=!0,fallbackPlacements:h,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:u="none",flipAlignment:m=!0,...b}=Pt(t,e);if((o=i.arrow)!=null&&o.alignmentOffset)return{};let x=ct(n),v=ot(a),E=ct(a)===a,_=await(l.isRTL==null?void 0:l.isRTL(p.floating)),$=h||(E||!m?[ne(a)]:pr(a)),q=u!=="none";!h&&q&&$.push(...fr(a,m,u,_));let R=[a,...$],nt=await Le(e,b),Q=[],N=((r=i.flip)==null?void 0:r.overflows)||[];if(d&&Q.push(nt[x]),c){let L=cr(n,s,_);Q.push(nt[L[0]],nt[L[1]])}if(N=[...N,{placement:n,overflows:Q}],!Q.every(L=>L<=0)){var ut,tt;let L=(((ut=i.flip)==null?void 0:ut.index)||0)+1,xt=R[L];if(xt&&(!(c==="alignment"?v!==ot(xt):!1)||N.every(K=>ot(K.placement)===v?K.overflows[0]>0:!0)))return{data:{index:L,overflows:N},reset:{placement:xt}};let it=(tt=N.filter(V=>V.overflows[0]<=0).sort((V,K)=>V.overflows[1]-K.overflows[1])[0])==null?void 0:tt.placement;if(!it)switch(f){case"bestFit":{var mt;let V=(mt=N.filter(K=>{if(q){let gt=ot(K.placement);return gt===v||gt==="y"}return!0}).map(K=>[K.placement,K.overflows.filter(gt=>gt>0).reduce((gt,_n)=>gt+_n,0)]).sort((K,gt)=>K[1]-gt[1])[0])==null?void 0:mt[0];V&&(it=V);break}case"initialPlacement":it=a;break}if(n!==it)return{reset:{placement:it}}}return{}}}};var ni=new Set(["left","top"]);async function ii(t,e){let{placement:o,platform:r,elements:n}=t,i=await(r.isRTL==null?void 0:r.isRTL(n.floating)),s=ct(o),a=Ot(o),l=ot(o)==="y",p=ni.has(s)?-1:1,d=i&&l?-1:1,c=Pt(e,t),{mainAxis:h,crossAxis:f,alignmentAxis:u}=typeof c=="number"?{mainAxis:c,crossAxis:0,alignmentAxis:null}:{mainAxis:c.mainAxis||0,crossAxis:c.crossAxis||0,alignmentAxis:c.alignmentAxis};return a&&typeof u=="number"&&(f=a==="end"?u*-1:u),l?{x:f*d,y:h*p}:{x:h*p,y:f*d}}var gr=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var o,r;let{x:n,y:i,placement:s,middlewareData:a}=e,l=await ii(e,t);return s===((o=a.offset)==null?void 0:o.placement)&&(r=a.arrow)!=null&&r.alignmentOffset?{}:{x:n+l.x,y:i+l.y,data:{...l,placement:s}}}}},yr=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:o,y:r,placement:n}=e,{mainAxis:i=!0,crossAxis:s=!1,limiter:a={fn:b=>{let{x,y:v}=b;return{x,y:v}}},...l}=Pt(t,e),p={x:o,y:r},d=await Le(e,l),c=ot(ct(n)),h=uo(c),f=p[h],u=p[c];if(i){let b=h==="y"?"top":"left",x=h==="y"?"bottom":"right",v=f+d[b],E=f-d[x];f=_e(v,f,E)}if(s){let b=c==="y"?"top":"left",x=c==="y"?"bottom":"right",v=u+d[b],E=u-d[x];u=_e(v,u,E)}let m=a.fn({...e,[h]:f,[c]:u});return{...m,data:{x:m.x-o,y:m.y-r,enabled:{[h]:i,[c]:s}}}}}};var xr=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){var o,r;let{placement:n,rects:i,platform:s,elements:a}=e,{apply:l=()=>{},...p}=Pt(t,e),d=await Le(e,p),c=ct(n),h=Ot(n),f=ot(n)==="y",{width:u,height:m}=i.floating,b,x;c==="top"||c==="bottom"?(b=c,x=h===(await(s.isRTL==null?void 0:s.isRTL(a.floating))?"start":"end")?"left":"right"):(x=c,b=h==="end"?"top":"bottom");let v=m-d.top-d.bottom,E=u-d.left-d.right,_=et(m-d[b],v),$=et(u-d[x],E),q=!e.middlewareData.shift,R=_,nt=$;if((o=e.middlewareData.shift)!=null&&o.enabled.x&&(nt=E),(r=e.middlewareData.shift)!=null&&r.enabled.y&&(R=v),q&&!h){let N=D(d.left,0),ut=D(d.right,0),tt=D(d.top,0),mt=D(d.bottom,0);f?nt=u-2*(N!==0||ut!==0?N+ut:D(d.left,d.right)):R=m-2*(tt!==0||mt!==0?tt+mt:D(d.top,d.bottom))}await l({...e,availableWidth:nt,availableHeight:R});let Q=await s.getDimensions(a.floating);return u!==Q.width||m!==Q.height?{reset:{rects:!0}}:{}}}};function De(){return typeof window<"u"}function Tt(t){return vr(t)?(t.nodeName||"").toLowerCase():"#document"}function B(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function Y(t){var e;return(e=(vr(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function vr(t){return De()?t instanceof Node||t instanceof B(t).Node:!1}function H(t){return De()?t instanceof Element||t instanceof B(t).Element:!1}function X(t){return De()?t instanceof HTMLElement||t instanceof B(t).HTMLElement:!1}function br(t){return!De()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof B(t).ShadowRoot}var si=new Set(["inline","contents"]);function Nt(t){let{overflow:e,overflowX:o,overflowY:r,display:n}=j(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+o)&&!si.has(n)}var ai=new Set(["table","td","th"]);function wr(t){return ai.has(Tt(t))}var li=[":popover-open",":modal"];function ae(t){return li.some(e=>{try{return t.matches(e)}catch{return!1}})}var ci=["transform","translate","scale","rotate","perspective"],pi=["transform","translate","scale","rotate","perspective","filter"],fi=["paint","layout","strict","content"];function zt(t){let e=Me(),o=H(t)?j(t):t;return ci.some(r=>o[r]?o[r]!=="none":!1)||(o.containerType?o.containerType!=="normal":!1)||!e&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!e&&(o.filter?o.filter!=="none":!1)||pi.some(r=>(o.willChange||"").includes(r))||fi.some(r=>(o.contain||"").includes(r))}function Er(t){let e=pt(t);for(;X(e)&&!Rt(e);){if(zt(e))return e;if(ae(e))return null;e=pt(e)}return null}function Me(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}var di=new Set(["html","body","#document"]);function Rt(t){return di.has(Tt(t))}function j(t){return B(t).getComputedStyle(t)}function le(t){return H(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function pt(t){if(Tt(t)==="html")return t;let e=t.assignedSlot||t.parentNode||br(t)&&t.host||Y(t);return br(e)?e.host:e}function Ar(t){let e=pt(t);return Rt(e)?t.ownerDocument?t.ownerDocument.body:t.body:X(e)&&Nt(e)?e:Ar(e)}function ft(t,e,o){var r;e===void 0&&(e=[]),o===void 0&&(o=!0);let n=Ar(t),i=n===((r=t.ownerDocument)==null?void 0:r.body),s=B(n);if(i){let a=Be(s);return e.concat(s,s.visualViewport||[],Nt(n)?n:[],a&&o?ft(a):[])}return e.concat(n,ft(n,[],o))}function Be(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function $r(t){let e=j(t),o=parseFloat(e.width)||0,r=parseFloat(e.height)||0,n=X(t),i=n?t.offsetWidth:o,s=n?t.offsetHeight:r,a=ie(o)!==i||ie(r)!==s;return a&&(o=i,r=s),{width:o,height:r,$:a}}function yo(t){return H(t)?t:t.contextElement}function Wt(t){let e=yo(t);if(!X(e))return G(1);let o=e.getBoundingClientRect(),{width:r,height:n,$:i}=$r(e),s=(i?ie(o.width):o.width)/r,a=(i?ie(o.height):o.height)/n;return(!s||!Number.isFinite(s))&&(s=1),(!a||!Number.isFinite(a))&&(a=1),{x:s,y:a}}var hi=G(0);function Pr(t){let e=B(t);return!Me()||!e.visualViewport?hi:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function ui(t,e,o){return e===void 0&&(e=!1),!o||e&&o!==B(t)?!1:e}function Lt(t,e,o,r){e===void 0&&(e=!1),o===void 0&&(o=!1);let n=t.getBoundingClientRect(),i=yo(t),s=G(1);e&&(r?H(r)&&(s=Wt(r)):s=Wt(t));let a=ui(i,o,r)?Pr(i):G(0),l=(n.left+a.x)/s.x,p=(n.top+a.y)/s.y,d=n.width/s.x,c=n.height/s.y;if(i){let h=B(i),f=r&&H(r)?B(r):r,u=h,m=Be(u);for(;m&&r&&f!==u;){let b=Wt(m),x=m.getBoundingClientRect(),v=j(m),E=x.left+(m.clientLeft+parseFloat(v.paddingLeft))*b.x,_=x.top+(m.clientTop+parseFloat(v.paddingTop))*b.y;l*=b.x,p*=b.y,d*=b.x,c*=b.y,l+=E,p+=_,u=B(m),m=Be(u)}}return _t({width:d,height:c,x:l,y:p})}function Ne(t,e){let o=le(t).scrollLeft;return e?e.left+o:Lt(Y(t)).left+o}function Or(t,e){let o=t.getBoundingClientRect(),r=o.left+e.scrollLeft-Ne(t,o),n=o.top+e.scrollTop;return{x:r,y:n}}function mi(t){let{elements:e,rect:o,offsetParent:r,strategy:n}=t,i=n==="fixed",s=Y(r),a=e?ae(e.floating):!1;if(r===s||a&&i)return o;let l={scrollLeft:0,scrollTop:0},p=G(1),d=G(0),c=X(r);if((c||!c&&!i)&&((Tt(r)!=="body"||Nt(s))&&(l=le(r)),X(r))){let f=Lt(r);p=Wt(r),d.x=f.x+r.clientLeft,d.y=f.y+r.clientTop}let h=s&&!c&&!i?Or(s,l):G(0);return{width:o.width*p.x,height:o.height*p.y,x:o.x*p.x-l.scrollLeft*p.x+d.x+h.x,y:o.y*p.y-l.scrollTop*p.y+d.y+h.y}}function gi(t){return Array.from(t.getClientRects())}function yi(t){let e=Y(t),o=le(t),r=t.ownerDocument.body,n=D(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),i=D(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight),s=-o.scrollLeft+Ne(t),a=-o.scrollTop;return j(r).direction==="rtl"&&(s+=D(e.clientWidth,r.clientWidth)-n),{width:n,height:i,x:s,y:a}}var Sr=25;function xi(t,e){let o=B(t),r=Y(t),n=o.visualViewport,i=r.clientWidth,s=r.clientHeight,a=0,l=0;if(n){i=n.width,s=n.height;let d=Me();(!d||d&&e==="fixed")&&(a=n.offsetLeft,l=n.offsetTop)}let p=Ne(r);if(p<=0){let d=r.ownerDocument,c=d.body,h=getComputedStyle(c),f=d.compatMode==="CSS1Compat"&&parseFloat(h.marginLeft)+parseFloat(h.marginRight)||0,u=Math.abs(r.clientWidth-c.clientWidth-f);u<=Sr&&(i-=u)}else p<=Sr&&(i+=p);return{width:i,height:s,x:a,y:l}}var bi=new Set(["absolute","fixed"]);function vi(t,e){let o=Lt(t,!0,e==="fixed"),r=o.top+t.clientTop,n=o.left+t.clientLeft,i=X(t)?Wt(t):G(1),s=t.clientWidth*i.x,a=t.clientHeight*i.y,l=n*i.x,p=r*i.y;return{width:s,height:a,x:l,y:p}}function Cr(t,e,o){let r;if(e==="viewport")r=xi(t,o);else if(e==="document")r=yi(Y(t));else if(H(e))r=vi(e,o);else{let n=Pr(t);r={x:e.x-n.x,y:e.y-n.y,width:e.width,height:e.height}}return _t(r)}function _r(t,e){let o=pt(t);return o===e||!H(o)||Rt(o)?!1:j(o).position==="fixed"||_r(o,e)}function wi(t,e){let o=e.get(t);if(o)return o;let r=ft(t,[],!1).filter(a=>H(a)&&Tt(a)!=="body"),n=null,i=j(t).position==="fixed",s=i?pt(t):t;for(;H(s)&&!Rt(s);){let a=j(s),l=zt(s);!l&&a.position==="fixed"&&(n=null),(i?!l&&!n:!l&&a.position==="static"&&!!n&&bi.has(n.position)||Nt(s)&&!l&&_r(t,s))?r=r.filter(d=>d!==s):n=a,s=pt(s)}return e.set(t,r),r}function Ei(t){let{element:e,boundary:o,rootBoundary:r,strategy:n}=t,s=[...o==="clippingAncestors"?ae(e)?[]:wi(e,this._c):[].concat(o),r],a=s[0],l=s.reduce((p,d)=>{let c=Cr(e,d,n);return p.top=D(c.top,p.top),p.right=et(c.right,p.right),p.bottom=et(c.bottom,p.bottom),p.left=D(c.left,p.left),p},Cr(e,a,n));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Ai(t){let{width:e,height:o}=$r(t);return{width:e,height:o}}function Si(t,e,o){let r=X(e),n=Y(e),i=o==="fixed",s=Lt(t,!0,i,e),a={scrollLeft:0,scrollTop:0},l=G(0);function p(){l.x=Ne(n)}if(r||!r&&!i)if((Tt(e)!=="body"||Nt(n))&&(a=le(e)),r){let f=Lt(e,!0,i,e);l.x=f.x+e.clientLeft,l.y=f.y+e.clientTop}else n&&p();i&&!r&&n&&p();let d=n&&!r&&!i?Or(n,a):G(0),c=s.left+a.scrollLeft-l.x-d.x,h=s.top+a.scrollTop-l.y-d.y;return{x:c,y:h,width:s.width,height:s.height}}function go(t){return j(t).position==="static"}function kr(t,e){if(!X(t)||j(t).position==="fixed")return null;if(e)return e(t);let o=t.offsetParent;return Y(t)===o&&(o=o.ownerDocument.body),o}function Tr(t,e){let o=B(t);if(ae(t))return o;if(!X(t)){let n=pt(t);for(;n&&!Rt(n);){if(H(n)&&!go(n))return n;n=pt(n)}return o}let r=kr(t,e);for(;r&&wr(r)&&go(r);)r=kr(r,e);return r&&Rt(r)&&go(r)&&!zt(r)?o:r||Er(t)||o}var Ci=async function(t){let e=this.getOffsetParent||Tr,o=this.getDimensions,r=await o(t.floating);return{reference:Si(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function ki(t){return j(t).direction==="rtl"}var ce={convertOffsetParentRelativeRectToViewportRelativeRect:mi,getDocumentElement:Y,getClippingRect:Ei,getOffsetParent:Tr,getElementRects:Ci,getClientRects:gi,getDimensions:Ai,getScale:Wt,isElement:H,isRTL:ki};function Rr(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function $i(t,e){let o=null,r,n=Y(t);function i(){var a;clearTimeout(r),(a=o)==null||a.disconnect(),o=null}function s(a,l){a===void 0&&(a=!1),l===void 0&&(l=1),i();let p=t.getBoundingClientRect(),{left:d,top:c,width:h,height:f}=p;if(a||e(),!h||!f)return;let u=se(c),m=se(n.clientWidth-(d+h)),b=se(n.clientHeight-(c+f)),x=se(d),E={rootMargin:-u+"px "+-m+"px "+-b+"px "+-x+"px",threshold:D(0,et(1,l))||1},_=!0;function $(q){let R=q[0].intersectionRatio;if(R!==l){if(!_)return s();R?s(!1,R):r=setTimeout(()=>{s(!1,1e-7)},1e3)}R===1&&!Rr(p,t.getBoundingClientRect())&&s(),_=!1}try{o=new IntersectionObserver($,{...E,root:n.ownerDocument})}catch{o=new IntersectionObserver($,E)}o.observe(t)}return s(!0),i}function Lr(t,e,o,r){r===void 0&&(r={});let{ancestorScroll:n=!0,ancestorResize:i=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:l=!1}=r,p=yo(t),d=n||i?[...p?ft(p):[],...ft(e)]:[];d.forEach(x=>{n&&x.addEventListener("scroll",o,{passive:!0}),i&&x.addEventListener("resize",o)});let c=p&&a?$i(p,o):null,h=-1,f=null;s&&(f=new ResizeObserver(x=>{let[v]=x;v&&v.target===p&&f&&(f.unobserve(e),cancelAnimationFrame(h),h=requestAnimationFrame(()=>{var E;(E=f)==null||E.observe(e)})),o()}),p&&!l&&f.observe(p),f.observe(e));let u,m=l?Lt(t):null;l&&b();function b(){let x=Lt(t);m&&!Rr(m,x)&&o(),m=x,u=requestAnimationFrame(b)}return o(),()=>{var x;d.forEach(v=>{n&&v.removeEventListener("scroll",o),i&&v.removeEventListener("resize",o)}),c?.(),(x=f)==null||x.disconnect(),f=null,l&&cancelAnimationFrame(u)}}var Dr=gr;var Mr=yr,Br=mr,xo=xr;var Nr=ur;var zr=(t,e,o)=>{let r=new Map,n={platform:ce,...o},i={...n.platform,_c:r};return hr(t,e,{...n,platform:i})};function Wr(t){return Pi(t)}function bo(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Pi(t){for(let e=t;e;e=bo(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=bo(t);e;e=bo(e)){if(!(e instanceof Element))continue;let o=getComputedStyle(e);if(o.display!=="contents"&&(o.position!=="static"||zt(o)||e.tagName==="BODY"))return e}return null}var M={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},rt=t=>(...e)=>({_$litDirective$:t,values:e}),U=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,r){this._$Ct=e,this._$AM=o,this._$Ci=r}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};var It=rt(class extends U{constructor(t){if(super(t),t.type!==M.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((r=>r!==""))));for(let r in e)e[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(e)}let o=t.element.classList;for(let r of this.st)r in e||(o.remove(r),this.st.delete(r));for(let r in e){let n=!!e[r];n===this.st.has(r)||this.nt?.has(r)||(n?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return P}});var Oi=`:host {
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
`;function Ir(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var ze=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),w=class extends $t{constructor(){super(...arguments),this.localize=new Wo(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom"),r=0,n=0,i=0,s=0,a=0,l=0,p=0,d=0;o?t.top<e.top?(r=t.left,n=t.bottom,i=t.right,s=t.bottom,a=e.left,l=e.top,p=e.right,d=e.top):(r=e.left,n=e.bottom,i=e.right,s=e.bottom,a=t.left,l=t.top,p=t.right,d=t.top):t.left<e.left?(r=t.right,n=t.top,i=e.left,s=e.top,a=t.right,l=t.bottom,p=e.left,d=e.bottom):(r=e.right,n=e.top,i=t.left,s=t.top,a=e.right,l=e.bottom,p=t.left,d=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${n}px`),this.style.setProperty("--hover-bridge-top-right-x",`${i}px`),this.style.setProperty("--hover-bridge-top-right-y",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${p}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${d}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||Ir(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||(this.popup.showPopover?.(),this.cleanup=Lr(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;let t=[Dr({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(xo({apply:({rects:r})=>{let n=this.sync==="width"||this.sync==="both",i=this.sync==="height"||this.sync==="both";this.popup.style.width=n?`${r.reference.width}px`:"",this.popup.style.height=i?`${r.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let e;ze&&!Ir(this.anchor)&&this.boundary==="scroll"&&(e=ft(this.anchorEl).filter(r=>r instanceof Element)),this.flip&&t.push(Br({boundary:this.flipBoundary||e,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(Mr({boundary:this.shiftBoundary||e,padding:this.shiftPadding})),this.autoSize?t.push(xo({boundary:this.autoSizeBoundary||e,padding:this.autoSizePadding,apply:({availableWidth:r,availableHeight:n})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${n}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${r}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(Nr({element:this.arrowEl,padding:this.arrowPadding}));let o=ze?r=>ce.getOffsetParent(r,Wr):ce.getOffsetParent;zr(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:ze?"absolute":"fixed",platform:{...ce,getOffsetParent:o}}).then(({x:r,y:n,middlewareData:i,placement:s})=>{let a=this.localize.dir()==="rtl",l={top:"bottom",right:"left",bottom:"top",left:"right"}[s.split("-")[0]];if(this.setAttribute("data-current-placement",s),Object.assign(this.popup.style,{left:`${r}px`,top:`${n}px`}),this.arrow){let p=i.arrow.x,d=i.arrow.y,c="",h="",f="",u="";if(this.arrowPlacement==="start"){let m=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";c=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",h=a?m:"",u=a?"":m}else if(this.arrowPlacement==="end"){let m=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";h=a?"":m,u=a?m:"",f=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(u=typeof p=="number"?"calc(50% - var(--arrow-size-diagonal))":"",c=typeof d=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(u=typeof p=="number"?`${p}px`:"",c=typeof d=="number"?`${d}px`:"");Object.assign(this.arrowEl.style,{top:c,right:h,bottom:f,left:u,[l]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new Do)}render(){return z`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${It({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${It({popup:!0,"popup-active":this.active,"popup-fixed":!ze,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?z`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};w.css=Oi;g([J(".popup")],w.prototype,"popup",2);g([J(".arrow")],w.prototype,"arrowEl",2);g([y()],w.prototype,"anchor",2);g([y({type:Boolean,reflect:!0})],w.prototype,"active",2);g([y({reflect:!0})],w.prototype,"placement",2);g([y()],w.prototype,"boundary",2);g([y({type:Number})],w.prototype,"distance",2);g([y({type:Number})],w.prototype,"skidding",2);g([y({type:Boolean})],w.prototype,"arrow",2);g([y({attribute:"arrow-placement"})],w.prototype,"arrowPlacement",2);g([y({attribute:"arrow-padding",type:Number})],w.prototype,"arrowPadding",2);g([y({type:Boolean})],w.prototype,"flip",2);g([y({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],w.prototype,"flipFallbackPlacements",2);g([y({attribute:"flip-fallback-strategy"})],w.prototype,"flipFallbackStrategy",2);g([y({type:Object})],w.prototype,"flipBoundary",2);g([y({attribute:"flip-padding",type:Number})],w.prototype,"flipPadding",2);g([y({type:Boolean})],w.prototype,"shift",2);g([y({type:Object})],w.prototype,"shiftBoundary",2);g([y({attribute:"shift-padding",type:Number})],w.prototype,"shiftPadding",2);g([y({attribute:"auto-size"})],w.prototype,"autoSize",2);g([y()],w.prototype,"sync",2);g([y({type:Object})],w.prototype,"autoSizeBoundary",2);g([y({attribute:"auto-size-padding",type:Number})],w.prototype,"autoSizePadding",2);g([y({attribute:"hover-bridge",type:Boolean})],w.prototype,"hoverBridge",2);w=g([lt("wa-popup")],w);var Hr=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}},jr=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}},Ur=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}},Fr=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};var qr="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";var Vr=(t=21)=>{let e="",o=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+=qr[o[t]&63];return e};function Kr(t=""){return`${t}${Vr()}`}function vo(t,e){return new Promise(o=>{function r(n){n.target===t&&(t.removeEventListener(e,r),o())}t.addEventListener(e,r)})}function wo(t,e){return new Promise(o=>{let r=new AbortController,{signal:n}=r;if(t.classList.contains(e))return;t.classList.remove(e),t.classList.add(e);let i=()=>{t.classList.remove(e),o(),r.abort()};t.addEventListener("animationend",i,{once:!0,signal:n}),t.addEventListener("animationcancel",i,{once:!0,signal:n})})}function pe(t,e){let o={waitUntilFirstUpdate:!1,...e};return(r,n)=>{let{update:i}=r,s=Array.isArray(t)?t:[t];r.update=function(a){s.forEach(l=>{let p=l;if(a.has(p)){let d=a.get(p),c=this[p];d!==c&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[n](d,c)}}),i.call(this,a)}}}var _i=`:host {
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
`,C=class extends $t{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{t.key==="Escape"&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),this.hideDelay))}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=Kr("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}addToAriaLabelledBy(t,e){let r=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);r.includes(e)||(r.push(e),t.setAttribute("aria-labelledby",r.join(" ")))}removeFromAriaLabelledBy(t,e){let n=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(i=>i!==e);n.length>0?t.setAttribute("aria-labelledby",n.join(" ")):t.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;let t=new Fr;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),this.body.hidden=!1,this.popup.active=!0,await wo(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new jr)}else{let t=new Ur;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),await wo(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new Hr)}}handleForChange(){let t=this.getRootNode();if(!t)return;let e=this.for?t.getElementById(this.for):null,o=this.anchor;if(e===o)return;let{signal:r}=this.eventController;e&&(this.addToAriaLabelledBy(e,this.id),e.addEventListener("blur",this.handleBlur,{capture:!0,signal:r}),e.addEventListener("focus",this.handleFocus,{capture:!0,signal:r}),e.addEventListener("click",this.handleClick,{signal:r}),e.addEventListener("mouseover",this.handleMouseOver,{signal:r}),e.addEventListener("mouseout",this.handleMouseOut,{signal:r})),o&&(this.removeFromAriaLabelledBy(o,this.id),o.removeEventListener("blur",this.handleBlur,{capture:!0}),o.removeEventListener("focus",this.handleFocus,{capture:!0}),o.removeEventListener("click",this.handleClick),o.removeEventListener("mouseover",this.handleMouseOver),o.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=e}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,vo(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,vo(this,"wa-after-hide")}render(){return z`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${It({tooltip:!0,"tooltip-open":this.open})}
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
    `}};C.css=_i;C.dependencies={"wa-popup":w};g([J("slot:not([name])")],C.prototype,"defaultSlot",2);g([J(".body")],C.prototype,"body",2);g([J("wa-popup")],C.prototype,"popup",2);g([y()],C.prototype,"placement",2);g([y({type:Boolean,reflect:!0})],C.prototype,"disabled",2);g([y({type:Number})],C.prototype,"distance",2);g([y({type:Boolean,reflect:!0})],C.prototype,"open",2);g([y({type:Number})],C.prototype,"skidding",2);g([y({attribute:"show-delay",type:Number})],C.prototype,"showDelay",2);g([y({attribute:"hide-delay",type:Number})],C.prototype,"hideDelay",2);g([y()],C.prototype,"trigger",2);g([y({attribute:"without-arrow",type:Boolean,reflect:!0})],C.prototype,"withoutArrow",2);g([y()],C.prototype,"for",2);g([I()],C.prototype,"anchor",2);g([pe("open",{waitUntilFirstUpdate:!0})],C.prototype,"handleOpenChange",1);g([pe("for")],C.prototype,"handleForChange",1);g([pe(["distance","placement","skidding"])],C.prototype,"handleOptionsChange",1);g([pe("disabled")],C.prototype,"handleDisabledChange",1);C=g([lt("wa-tooltip")],C);var{I:Ti}=sr;var Gr=t=>t.strings===void 0,Jr=()=>document.createComment(""),Ht=(t,e,o)=>{let r=t._$AA.parentNode,n=e===void 0?t._$AB:e._$AA;if(o===void 0){let i=r.insertBefore(Jr(),n),s=r.insertBefore(Jr(),n);o=new Ti(i,s,t,t.options)}else{let i=o._$AB.nextSibling,s=o._$AM,a=s!==t;if(a){let l;o._$AQ?.(t),o._$AM=t,o._$AP!==void 0&&(l=t._$AU)!==s._$AU&&o._$AP(l)}if(i!==n||a){let l=o._$AA;for(;l!==i;){let p=l.nextSibling;r.insertBefore(l,n),l=p}}}return o},yt=(t,e,o=t)=>(t._$AI(e,o),t),Ri={},We=(t,e=Ri)=>t._$AH=e,Yr=t=>t._$AH,Ie=t=>{t._$AR(),t._$AA.remove()};var Li=rt(class extends U{constructor(t){if(super(t),t.type!==M.PROPERTY&&t.type!==M.ATTRIBUTE&&t.type!==M.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Gr(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===P||e===A)return e;let o=t.element,r=t.name;if(t.type===M.PROPERTY){if(e===o[r])return P}else if(t.type===M.BOOLEAN_ATTRIBUTE){if(!!e===o.hasAttribute(r))return P}else if(t.type===M.ATTRIBUTE&&o.getAttribute(r)===e+"")return P;return We(t),e}});var Xr=(t,e,o)=>{let r=new Map;for(let n=e;n<=o;n++)r.set(t[n],n);return r},Di=rt(class extends U{constructor(t){if(super(t),t.type!==M.CHILD)throw Error("repeat() can only be used in text expressions")}dt(t,e,o){let r;o===void 0?o=e:e!==void 0&&(r=e);let n=[],i=[],s=0;for(let a of t)n[s]=r?r(a,s):s,i[s]=o(a,s),s++;return{values:i,keys:n}}render(t,e,o){return this.dt(t,e,o).values}update(t,[e,o,r]){let n=Yr(t),{values:i,keys:s}=this.dt(e,o,r);if(!Array.isArray(n))return this.ut=s,i;let a=this.ut??=[],l=[],p,d,c=0,h=n.length-1,f=0,u=i.length-1;for(;c<=h&&f<=u;)if(n[c]===null)c++;else if(n[h]===null)h--;else if(a[c]===s[f])l[f]=yt(n[c],i[f]),c++,f++;else if(a[h]===s[u])l[u]=yt(n[h],i[u]),h--,u--;else if(a[c]===s[u])l[u]=yt(n[c],i[u]),Ht(t,l[u+1],n[c]),c++,u--;else if(a[h]===s[f])l[f]=yt(n[h],i[f]),Ht(t,n[c],n[h]),h--,f++;else if(p===void 0&&(p=Xr(s,f,u),d=Xr(a,c,h)),p.has(a[c]))if(p.has(a[h])){let m=d.get(s[f]),b=m!==void 0?n[m]:null;if(b===null){let x=Ht(t,n[c]);yt(x,i[f]),l[f]=x}else l[f]=yt(b,i[f]),Ht(t,n[c],b),n[m]=null;f++}else Ie(n[h]),h--;else Ie(n[c]),c++;for(;f<=u;){let m=Ht(t,l[u+1]);yt(m,i[f]),l[f++]=m}for(;c<=h;){let m=n[c++];m!==null&&Ie(m)}return this.ut=s,We(t,l),P}});var Zr="important",Mi=" !"+Zr,Bi=rt(class extends U{constructor(t){if(super(t),t.type!==M.ATTRIBUTE||t.name!=="style"||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,o)=>{let r=t[o];return r==null?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${r};`}),"")}update(t,[e]){let{style:o}=t.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let r of this.ft)e[r]==null&&(this.ft.delete(r),r.includes("-")?o.removeProperty(r):o[r]=null);for(let r in e){let n=e[r];if(n!=null){this.ft.add(r);let i=typeof n=="string"&&n.endsWith(Mi);r.includes("-")||i?o.setProperty(r,i?n.slice(0,-11):n,i?Zr:""):o[r]=n}}return P}});var fe=class extends U{constructor(e){if(super(e),this.it=A,e.type!==M.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===A||e==null)return this._t=void 0,this.it=e;if(e===P)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;let o=[e];return o.raw=o,this._t={_$litType$:this.constructor.resultType,strings:o,values:[]}}};fe.directiveName="unsafeHTML",fe.resultType=1;var Ni=rt(fe);var Eo=typeof navigator<"u"?navigator.userAgent.toLowerCase().indexOf("firefox")>0:!1;function Ao(t,e,o,r){t.addEventListener?t.addEventListener(e,o,r):t.attachEvent&&t.attachEvent(`on${e}`,o)}function de(t,e,o,r){t&&(t.removeEventListener?t.removeEventListener(e,o,r):t.detachEvent&&t.detachEvent(`on${e}`,o))}function en(t,e){let o=e.slice(0,e.length-1),r=[];for(let n=0;n<o.length;n++)r.push(t[o[n].toLowerCase()]);return r}function on(t){typeof t!="string"&&(t=""),t=t.replace(/\s/g,"");let e=t.split(","),o=e.lastIndexOf("");for(;o>=0;)e[o-1]+=",",e.splice(o,1),o=e.lastIndexOf("");return e}function zi(t,e){let o=t.length>=e.length?t:e,r=t.length>=e.length?e:t,n=!0;for(let i=0;i<o.length;i++)r.indexOf(o[i])===-1&&(n=!1);return n}function rn(t){let e=t.keyCode||t.which||t.charCode;return t.code&&/^Key[A-Z]$/.test(t.code)&&(e=t.code.charCodeAt(3)),e}var me={backspace:8,"\u232B":8,tab:9,clear:12,enter:13,"\u21A9":13,return:13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,arrowup:38,arrowdown:40,arrowleft:37,arrowright:39,del:46,delete:46,ins:45,insert:45,home:36,end:35,pageup:33,pagedown:34,capslock:20,num_0:96,num_1:97,num_2:98,num_3:99,num_4:100,num_5:101,num_6:102,num_7:103,num_8:104,num_9:105,num_multiply:106,num_add:107,num_enter:108,num_subtract:109,num_decimal:110,num_divide:111,"\u21EA":20,",":188,".":190,"/":191,"`":192,"-":Eo?173:189,"=":Eo?61:187,";":Eo?59:186,"'":222,"{":219,"}":221,"[":219,"]":221,"\\":220},Z={"\u21E7":16,shift:16,"\u2325":18,alt:18,option:18,"\u2303":17,ctrl:17,control:17,"\u2318":91,cmd:91,meta:91,command:91},he={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey",shiftKey:16,ctrlKey:17,altKey:18,metaKey:91},T={16:!1,18:!1,17:!1,91:!1},k={};for(let t=1;t<20;t++)me[`f${t}`]=111+t;var S=[],ue=null,nn="all",dt=new Map,jt=t=>me[t.toLowerCase()]||Z[t.toLowerCase()]||t.toUpperCase().charCodeAt(0),Wi=t=>Object.keys(me).find(e=>me[e]===t),Ii=t=>Object.keys(Z).find(e=>Z[e]===t),sn=t=>{nn=t||"all"},ge=()=>nn||"all",Hi=()=>S.slice(0),ji=()=>S.map(t=>Wi(t)||Ii(t)||String.fromCharCode(t)),Ui=()=>{let t=[];return Object.keys(k).forEach(e=>{k[e].forEach(({key:o,scope:r,mods:n,shortcut:i})=>{t.push({scope:r,shortcut:i,mods:n,keys:o.split("+").map(s=>jt(s))})})}),t},an=t=>{let e=t.target||t.srcElement,{tagName:o}=e,r=!0,n=o==="INPUT"&&!["checkbox","radio","range","button","file","reset","submit","color"].includes(e.type);return(e.isContentEditable||(n||o==="TEXTAREA"||o==="SELECT")&&!e.readOnly)&&(r=!1),r},Fi=t=>(typeof t=="string"&&(t=jt(t)),S.indexOf(t)!==-1),qi=(t,e)=>{let o,r;t||(t=ge());for(let n in k)if(Object.prototype.hasOwnProperty.call(k,n))for(o=k[n],r=0;r<o.length;)o[r].scope===t?o.splice(r,1).forEach(({element:i})=>Co(i)):r++;ge()===t&&sn(e||"all")};function Vi(t){let e=rn(t);t.key&&t.key.toLowerCase()==="capslock"&&(e=jt(t.key));let o=S.indexOf(e);if(o>=0&&S.splice(o,1),t.key&&t.key.toLowerCase()==="meta"&&S.splice(0,S.length),(e===93||e===224)&&(e=91),e in T){T[e]=!1;for(let r in Z)Z[r]===e&&(ht[r]=!1)}}var ln=(t,...e)=>{if(typeof t>"u")Object.keys(k).forEach(o=>{Array.isArray(k[o])&&k[o].forEach(r=>He(r)),delete k[o]}),Co(null);else if(Array.isArray(t))t.forEach(o=>{o.key&&He(o)});else if(typeof t=="object")t.key&&He(t);else if(typeof t=="string"){let[o,r]=e;typeof o=="function"&&(r=o,o=""),He({key:t,scope:o,method:r,splitKey:"+"})}},He=({key:t,scope:e,method:o,splitKey:r="+"})=>{on(t).forEach(n=>{let i=n.split(r),s=i.length,a=i[s-1],l=a==="*"?"*":jt(a);if(!k[l])return;e||(e=ge());let p=s>1?en(Z,i):[],d=[];k[l]=k[l].filter(c=>{let h=(o?c.method===o:!0)&&c.scope===e&&zi(c.mods,p);return h&&d.push(c.element),!h}),d.forEach(c=>Co(c))})};function Qr(t,e,o,r){if(e.element!==r)return;let n;if(e.scope===o||e.scope==="all"){n=e.mods.length>0;for(let i in T)Object.prototype.hasOwnProperty.call(T,i)&&(!T[i]&&e.mods.indexOf(+i)>-1||T[i]&&e.mods.indexOf(+i)===-1)&&(n=!1);(e.mods.length===0&&!T[16]&&!T[18]&&!T[17]&&!T[91]||n||e.shortcut==="*")&&(e.keys=[],e.keys=e.keys.concat(S),e.method(t,e)===!1&&(t.preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation&&t.stopPropagation(),t.cancelBubble&&(t.cancelBubble=!0)))}}function tn(t,e){let o=k["*"],r=rn(t);if(t.key&&t.key.toLowerCase()==="capslock"||!(ht.filter||an).call(this,t))return;if((r===93||r===224)&&(r=91),S.indexOf(r)===-1&&r!==229&&S.push(r),["metaKey","ctrlKey","altKey","shiftKey"].forEach(a=>{let l=he[a];t[a]&&S.indexOf(l)===-1?S.push(l):!t[a]&&S.indexOf(l)>-1?S.splice(S.indexOf(l),1):a==="metaKey"&&t[a]&&(S=S.filter(p=>p in he||p===r))}),r in T){T[r]=!0;for(let a in Z)if(Object.prototype.hasOwnProperty.call(Z,a)){let l=he[Z[a]];ht[a]=t[l]}if(!o)return}for(let a in T)Object.prototype.hasOwnProperty.call(T,a)&&(T[a]=t[he[a]]);t.getModifierState&&!(t.altKey&&!t.ctrlKey)&&t.getModifierState("AltGraph")&&(S.indexOf(17)===-1&&S.push(17),S.indexOf(18)===-1&&S.push(18),T[17]=!0,T[18]=!0);let n=ge();if(o)for(let a=0;a<o.length;a++)o[a].scope===n&&(t.type==="keydown"&&o[a].keydown||t.type==="keyup"&&o[a].keyup)&&Qr(t,o[a],n,e);if(!(r in k))return;let i=k[r],s=i.length;for(let a=0;a<s;a++)if((t.type==="keydown"&&i[a].keydown||t.type==="keyup"&&i[a].keyup)&&i[a].key){let l=i[a],{splitKey:p}=l,d=l.key.split(p),c=[];for(let h=0;h<d.length;h++)c.push(jt(d[h]));c.sort().join("")===S.sort().join("")&&Qr(t,l,n,e)}}var ht=function(t,e,o){S=[];let r=on(t),n=[],i="all",s=document,a=0,l=!1,p=!0,d="+",c=!1,h=!1;if(o===void 0&&typeof e=="function"&&(o=e),Object.prototype.toString.call(e)==="[object Object]"){let f=e;f.scope&&(i=f.scope),f.element&&(s=f.element),f.keyup&&(l=f.keyup),f.keydown!==void 0&&(p=f.keydown),f.capture!==void 0&&(c=f.capture),typeof f.splitKey=="string"&&(d=f.splitKey),f.single===!0&&(h=!0)}for(typeof e=="string"&&(i=e),h&&ln(t,i);a<r.length;a++){let f=r[a].split(d);n=[],f.length>1&&(n=en(Z,f));let u=f[f.length-1];u=u==="*"?"*":jt(u),u in k||(k[u]=[]),k[u].push({keyup:l,keydown:p,scope:i,mods:n,shortcut:r[a],method:o,key:r[a],splitKey:d,element:s})}if(typeof s<"u"&&typeof window<"u"){if(!dt.has(s)){let f=(m=window.event)=>tn(m,s),u=(m=window.event)=>{tn(m,s),Vi(m)};dt.set(s,{keydownListener:f,keyupListenr:u,capture:c}),Ao(s,"keydown",f,c),Ao(s,"keyup",u,c)}if(!ue){let f=()=>{S=[]};ue={listener:f,capture:c},Ao(window,"focus",f,c)}}};function Ki(t,e="all"){Object.keys(k).forEach(o=>{k[o].filter(r=>r.scope===e&&r.shortcut===t).forEach(r=>{r&&r.method&&r.method({},r)})})}function Co(t){let e=Object.values(k).flat();if(e.findIndex(({element:o})=>o===t)<0&&t){let{keydownListener:o,keyupListenr:r,capture:n}=dt.get(t)||{};o&&r&&(de(t,"keyup",r,n),de(t,"keydown",o,n),dt.delete(t))}if((e.length<=0||dt.size<=0)&&(Array.from(dt.keys()).forEach(o=>{let{keydownListener:r,keyupListenr:n,capture:i}=dt.get(o)||{};r&&n&&(de(o,"keyup",n,i),de(o,"keydown",r,i),dt.delete(o))}),dt.clear(),Object.keys(k).forEach(o=>delete k[o]),ue)){let{listener:o,capture:r}=ue;de(window,"focus",o,r),ue=null}}var So={getPressedKeyString:ji,setScope:sn,getScope:ge,deleteScope:qi,getPressedKeyCodes:Hi,getAllKeyCodes:Ui,isPressed:Fi,filter:an,trigger:Ki,unbind:ln,keyMap:me,modifier:Z,modifierMap:he};for(let t in So){let e=t;Object.prototype.hasOwnProperty.call(So,e)&&(ht[e]=So[e])}if(typeof window<"u"){let t=window.hotkeys;ht.noConflict=e=>(e&&window.hotkeys===ht&&(window.hotkeys=t),ht),window.hotkeys=ht}var cn=t=>{class e extends t{constructor(){super(...arguments);this.#t=!1;this.initialReflectedProperties=new Map}#t;attributeChangedCallback(n,i,s){if(!this.#t){let a=this;this.constructor.elementProperties.forEach((l,p)=>{l.reflect&&a[p]!=null&&this.initialReflectedProperties.set(p,a[p])}),this.initialReflectedProperties.set("slot",this.slot),this.#t=!0}super.attributeChangedCallback?.(n,i,s)}willUpdate(n){super.willUpdate?.(n);let i=this;this.initialReflectedProperties.forEach((s,a)=>{n.has(a)&&i[a]==null&&(i[a]=s)})}}return O([I()],e.prototype,"initialReflectedProperties",2),e};function ko(t){let e=[];for(let o=0;o<t.length;o++){let r=t[o];r&&e.push(r)}return e}function pn(t){return typeof t=="symbol"||t instanceof Symbol}function fn(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function dn(t){return t==null?t===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}function je(t){if(!t||typeof t!="object")return!1;let e=Object.getPrototypeOf(t);return e===null||e===Object.prototype||Object.getPrototypeOf(e)===null?Object.prototype.toString.call(t)==="[object Object]":!1}function Ut(t){return t==="__proto__"}function Ft(t){if(typeof t!="object"||t==null)return!1;if(Object.getPrototypeOf(t)===null)return!0;if(Object.prototype.toString.call(t)!=="[object Object]"){let o=t[Symbol.toStringTag];return o==null||!Object.getOwnPropertyDescriptor(t,Symbol.toStringTag)?.writable?!1:t.toString()===`[object ${o}]`}let e=t;for(;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}function hn(t,e){return t===e||Number.isNaN(t)&&Number.isNaN(e)}function un(t){return Number.isSafeInteger(t)&&t>=0}function $o(t){return t!=null}function qt(t){return typeof t=="string"}function mn(t){return t!=null&&typeof t!="function"&&un(t.length)}function gn(t){switch(typeof t){case"number":case"symbol":return!1;case"string":return t.includes(".")||t.includes("[")||t.includes("]")}}function Vt(t){return typeof t=="string"||typeof t=="symbol"?t:Object.is(t?.valueOf?.(),-0)?"-0":String(t)}function Po(t){if(t==null)return"";if(typeof t=="string")return t;if(Array.isArray(t))return t.map(Po).join(",");let e=String(t);return e==="0"&&Object.is(Number(t),-0)?"-0":e}function Ue(t){if(Array.isArray(t))return t.map(Vt);if(typeof t=="symbol")return[t];t=Po(t);let e=[],o=t.length;if(o===0)return e;let r=0,n="",i="",s=!1;for(t.charCodeAt(0)===46&&(e.push(""),r++);r<o;){let a=t[r];i?a==="\\"&&r+1<o?(r++,n+=t[r]):a===i?i="":n+=a:s?a==='"'||a==="'"?i=a:a==="]"?(s=!1,e.push(n),n=""):n+=a:a==="["?(s=!0,n&&(e.push(n),n="")):a==="."?n&&(e.push(n),n=""):n+=a,r++}return n&&e.push(n),e}function Kt(t,e,o){if(t==null)return o;switch(typeof e){case"string":{if(Ut(e))return o;let r=t[e];return r===void 0?gn(e)?Kt(t,Ue(e),o):o:r}case"number":case"symbol":{typeof e=="number"&&(e=Vt(e));let r=t[e];return r===void 0?o:r}default:{if(Array.isArray(e))return Ji(t,e,o);if(Object.is(e?.valueOf(),-0)?e="-0":e=String(e),Ut(e))return o;let r=t[e];return r===void 0?o:r}}}function Ji(t,e,o){if(e.length===0)return o;let r=t;for(let n=0;n<e.length;n++){if(r==null||Ut(e[n]))return o;r=r[e[n]]}return r===void 0?o:r}function Oo(t){return t!==null&&(typeof t=="object"||typeof t=="function")}var Gi=/^(?:0|[1-9]\d*)$/;function yn(t,e=Number.MAX_SAFE_INTEGER){switch(typeof t){case"number":return Number.isInteger(t)&&t>=0&&t<e;case"symbol":return!1;case"string":return Gi.test(t)}}function xn(t){return t!==null&&typeof t=="object"&&dn(t)==="[object Arguments]"}var Yi=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Xi=/^\w*$/;function bn(t,e){return Array.isArray(t)?!1:typeof t=="number"||typeof t=="boolean"||t==null||pn(t)?!0:typeof t=="string"&&(Xi.test(t)||!Yi.test(t))||e!=null&&Object.hasOwn(e,t)}var vn=(t,e,o)=>{let r=t[e];(!(Object.hasOwn(t,e)&&hn(r,o))||o===void 0&&!(e in t))&&(t[e]=o)};function wn(t,e,o,r){if(t==null&&!Oo(t))return t;let n=bn(e,t)?[e]:Array.isArray(e)?e:typeof e=="string"?Ue(e):[e],i=o(Kt(t,n)),s=t;for(let a=0;a<n.length&&s!=null;a++){let l=Vt(n[a]);if(Ut(l))continue;let p;if(a===n.length-1)p=i;else{let d=s[l],c=r?.(d,l,t);p=c!==void 0?c:Oo(d)?d:yn(n[a+1])?[]:{}}vn(s,l,p),s=s[l]}return t}function _o(t,e,o){return wn(t,e,()=>o,()=>{})}function En(t){let e=t?.constructor,o=typeof e=="function"?e.prototype:Object.prototype;return t===o}function An(t){return fn(t)}function To(t,...e){t=Object(t);for(let o=0;o<e.length;o++){let r=e[o];r!=null&&Fe(t,r,new WeakMap)}return t}function Fe(t,e,o){for(let r in e){let n=e[r],i=t[r];if(i===void 0||!Object.hasOwn(t,r)){t[r]=Zi(n,o);continue}o.get(n)!==i&&Qi(i,n,o)}}function Zi(t,e){if(e.has(t))return e.get(t);if(Ft(t)){let o={};return e.set(t,o),Fe(o,t,e),o}return t}function Qi(t,e,o){if(Ft(t)&&Ft(e)){o.set(e,t),Fe(t,e,o);return}Array.isArray(t)&&Array.isArray(e)&&(o.set(e,t),ts(t,e,o))}function ts(t,e,o){let r=Math.min(e.length,t.length);for(let n=0;n<r;n++)Ft(t[n])&&Ft(e[n])&&Fe(t[n],e[n],o);for(let n=r;n<e.length;n++)t.push(e[n])}function Ro(t){if(t==null)return!0;if(mn(t))return typeof t.splice!="function"&&typeof t!="string"&&(typeof Buffer>"u"||!Buffer.isBuffer(t))&&!An(t)&&!xn(t)?!1:t.length===0;if(typeof t=="object"){if(t instanceof Map||t instanceof Set)return t.size===0;let e=Object.keys(t);return En(t)?e.filter(o=>o!=="constructor").length===0:e.length===0}return!0}var Lo=class{constructor(e,o={}){let r=e.split(".");this.store=ko(["lb",r.shift()]).join("-"),this.namespace=r.join("."),this.setPersistedData(To({},this.getPersistedData(),o))}namespacedPath(e){return`${this.namespace}.${e}`}get(e,o=null){return Kt(this.getPersistedData(),this.namespacedPath(e),o)}set(e,o){let r=this.getPersistedData();return _o(r,this.namespacedPath(e),o),this.setPersistedData(r)}getPersistedData(){return JSON.parse(localStorage.getItem(this.store)||"{}")}setPersistedData(e){return localStorage.setItem(this.store,JSON.stringify(e)),this}},Sn=t=>{class e extends t{static{this.persist=[]}connectedCallback(){if(super.connectedCallback(),Ro(this.persistAs)){console.warn("Cannot persist data - missing `persist-as` attribute",this);return}this.persistanceStore=new Lo(this.persistAs);let r=this.constructor,n=this;r.persist.forEach(i=>{n[i]=this.persistanceStore.get(i,this[i])})}willUpdate(r){super.willUpdate?.(r),this.persistanceStore&&this.constructor.persist.forEach(i=>{r.get(i)!==void 0&&this.persistanceStore.set(i,this[i])})}afterMorph(){if(this.persistanceStore){let r=this.constructor,n=this;r.persist.forEach(i=>{n[i]=this.persistanceStore.get(i,this[i])})}}}return O([y({attribute:"persist-as"})],e.prototype,"persistAs",2),O([I()],e.prototype,"persistanceStore",2),e};var qe=class extends Event{constructor(e,o){super(e,{bubbles:!0,cancelable:!1,composed:!0}),this.detail=o}};var Ve=class extends qe{constructor(e,o={}){super("lb-command",{bubbles:!0,cancelable:!1,composed:!0}),this.command=e,this.detail=o}};var Ke=class extends Event{constructor(e={value:void 0,oldValue:void 0}){super("lb-data",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Je=class extends Event{constructor(e={}){super("lb-display-mode-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Ge=class extends Event{constructor(e){super("lb-drag-end",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Ye=class extends Event{constructor(e){super("lb-drag-start",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Xe=class extends Event{constructor(e={}){super("lb-error",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Ze=class extends Event{constructor(e={}){super("lb-param-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var Qe=class extends Event{constructor(e){super("lb-popover-close",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var to=class extends Event{constructor(e){super("lb-popover-open",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var eo=class extends Event{constructor(e){super("lb-resize",{bubbles:!1,cancelable:!1,composed:!0}),this.detail=e}};var Cn={"lb-command":Ve,"lb-data":Ke,"lb-drag-start":Ye,"lb-drag-end":Ge,"lb-error":Xe,"lb-resize":eo,"lb-popover-open":to,"lb-popover-close":Qe,"lb-param-change":Ze,"lb-display-mode-change":Je};function kn(t){return Cn[t]}var $n=`:host {
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
`;var Dt=class extends cn(W){constructor(){super();this.cleanupJobs=[]}static{this.shadowRootOptions={...W.shadowRootOptions,serializable:!0}}static{this.morphable=!0}static get styles(){let o=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[$n,...o].map(r=>typeof r=="string"?vt(r):r)}afterMorph(){}get morphable(){return!!this.getStaticProperty("morphable")}disconnectedCallback(){this.cleanupJobs.forEach(o=>o()),super.disconnectedCallback()}addCleanupJob(o){this.cleanupJobs.push(o)}renderToTarget(o,r){re(r,o)}on(o,r){this.addEventListener(o,r),this.addCleanupJob(()=>this.removeEventListener(o,r))}delegate(o,r){document.addEventListener(o,r),this.addCleanupJob(()=>document.removeEventListener(o,r))}dispatch(o,...r){let n=kn(o),i=this;if(!n){console.warn(`Unknown event type '${o}'`);return}let s=null;if(je(r[0])?(s=r[0],r=[]):r.length>0&&je(r[r.length-1])&&(s=r.pop()),s?.target){let l=qt(s.target)?document.querySelector(`#${s.target}`):i;l&&(i=l)}let a=[...r,s].filter($o);i.dispatchEvent(new n(...a))}getStaticProperty(o){return this.constructor[o]}warn(o){qt(o)&&(o=new Error(o)),this.dispatch("lb-error",{error:o}),console.error(o)}};O([I()],Dt.prototype,"cleanupJobs",2);var Pn=`#container {
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
`;var Jt=class extends Dt{render(){return z`
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
    `}};Jt.css=Pn,O([y({reflect:!0})],Jt.prototype,"divider",2),Jt=O([lt("lb-toolbar")],Jt);var On=`:host {
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows: min-content 1fr;
}
#tabs {
  user-select: none;
  display: flex;
  align-items: stretch;
  column-gap: var(--lookbook-size-xs);
}
#panels {
  position: relative;
  height: 100%;
  overflow: hidden;
  > lb-panel {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
}
`;var F=class extends Sn(Dt){constructor(){super(...arguments);this.length=0;this.initialized=!1}connectedCallback(){super.connectedCallback(),this.persistanceKey=qt(this.region)?this.region:this.id,this.delegate("lb-morph-complete",this.afterMorph.bind(this))}updated(o){if(o.has("panel")){let r=this.getPanels();this.length=r.length,this.setActivePanel(this.panel||r[0]?.name)}}afterMorph(){this.setActivePanel(this.panel)}getPanels(){let o=this.panelSlot?.assignedElements({flatten:!0});return o?o.filter(r=>r.localName==="lb-panel"):[]}getTabs(){let o=Array.from(this.tabContainer.children);return o?o.filter(r=>r.localName==="lb-button"):[]}handleSlotChange(){let o=this.getPanels();o.forEach(r=>{r.hasAttribute("aria-describedby")||r.setAttribute("aria-describedby",`${r.id}-tab`)}),this.renderTabsForPanels(o),this.setActivePanel(this.panel)}renderTabsForPanels(o){let r=n=>{let i=n.getAttribute("aria-describedby");return z`
        <lb-button
          slot="tab"
          id="${i}"
          role="tab"
          aria-labelledby="${n.id}"
          @click="${s=>this.handleTabClick(s)}"
          commandfor="${n.name}"
          ?active="${n.name===this.panel}"
        >
          ${n.label}
        </lb-button>
      `};this.renderToTarget(this.tabContainer,o.map(r))}async setActivePanel(o){this.panel=o,this.getTabs().forEach(r=>r.active=r.commandFor===o),this.getPanels().forEach(r=>r.visible=r.name===o)}handleTabClick(o){let n=o.target.closest("lb-button");this.setActivePanel(n?.commandFor)}render(){return z`
      <lb-toolbar divider="block-end">
        <div
          id="tabs"
          slot="start"
          role="tablist"
        ></div>
        <div slot="end">
          <slot name="action"></slot>
        </div>
      </lb-toolbar>
      <div id="panels">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};F.css=On,F.persist=["panel"],O([y({reflect:!0})],F.prototype,"panel",2),O([y()],F.prototype,"region",2),O([y({attribute:!1,type:Number})],F.prototype,"length",2),O([I()],F.prototype,"initialized",2),O([J("#panels > slot")],F.prototype,"panelSlot",2),O([J("#tabs")],F.prototype,"tabContainer",2),F=O([lt("lb-panels")],F);export{F as LookbookPanels};
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
