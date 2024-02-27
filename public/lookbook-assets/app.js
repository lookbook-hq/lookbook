(()=>{let e;function t(e){Object.defineProperty(e,"__esModule",{value:!0,configurable:!0})}function i(e,t,i,r){Object.defineProperty(e,t,{get:i,set:r,enumerable:!0,configurable:!0})}function r(){return(r=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e}).apply(this,arguments)}function o(e,t){switch(e.type){case 1:case 2:case 3:case 4:return c(e,t);case 5:{let i=t.sizeFeatures.get(e.feature);return null==i?{type:1}:i}case 6:return e.value}}function n(e){return{type:5,value:e}}function s(e,t,i){return n(function(e,t,i){switch(i){case 1:return e===t;case 2:return e>t;case 3:return e>=t;case 4:return e<t;case 5:return e<=t}}(e,t,i))}function l(e,t,i){return null==e?t:null==t?e:i(e,t)}function a(e,t){switch(e.type){case 2:return 0===e.value?0:null;case 3:return function(e,{treeContext:t}){switch(e.unit){case"px":return e.value;case"rem":return e.value*t.rootFontSize;case"em":return e.value*t.fontSize;case"cqw":case"cqh":case"cqi":case"cqb":case"cqmin":case"cqmax":return l(e.value,function e(t,i){switch(t){case"cqw":return i.cqw;case"cqh":return i.cqh;case"cqi":return 0===i.writingAxis?i.cqw:i.cqh;case"cqb":return 1===i.writingAxis?i.cqw:i.cqh;case"cqmin":return l(e("cqi",i),e("cqb",i),Math.min);case"cqmax":return l(e("cqi",i),e("cqb",i),Math.max)}}(e.unit,t),(e,t)=>e*t)}return null}(e,t)}return null}function c(e,t){switch(e.type){case 4:return function(e,t){let i=o(e.left,t),r=o(e.right,t),l=e.operator;if(4===i.type&&4===r.type||5===i.type&&5===r.type)return 1===l?n(i.value===r.value):{type:1};if(3===i.type||3===r.type){let e=a(i,t),o=a(r,t);if(null!=e&&null!=o)return s(e,o,l)}else if(2===i.type&&2===r.type)return s(i.value,r.value,l);return{type:1}}(e,t);case 2:return function(e,t){let i=c(e.left,t);return 5!==i.type||!0!==i.value?i:c(e.right,t)}(e,t);case 3:return function(e,t){let i=c(e.left,t);return 5===i.type&&!0===i.value?i:c(e.right,t)}(e,t);case 1:{let i=c(e.value,t);return 5===i.type?{type:5,value:!i.value}:{type:1}}case 5:return u(o(e,t));case 6:return u(e.value)}}function u(e){switch(e.type){case 5:return e;case 2:case 3:return{type:5,value:e.value>0}}return{type:1}}let d=Array.from({length:4},()=>Math.floor(256*Math.random()).toString(16)).join(""),h=w("container"),p=w("container-type"),f=w("container-name"),b=`data-cqs-${d}`,m=`data-cqc-${d}`,g=w("cqw"),v=w("cqh"),y=w("cqi"),_=w("cqb");function w(e){return`--cq-${e}-${d}`}let x=Symbol();function k(e,t){let i={value:t,errorIndices:[],index:-1,at(r){let o=i.index+r;return o>=e.length?t:e[o]},consume:e=>(i.index+=e,i.value=i.at(0),i.value),reconsume(){i.index-=1},error(){i.errorIndices.push(i.index)}};return i}function $(e){return k(e,{type:0})}function*C(e){let t=[],i=!1;for(let r of e){let e=r.codePointAt(0);i&&10!==e&&(i=!1,t.push(10)),0===e||e>=55296&&e<=57343?t.push(65533):13===e?i=!0:t.push(e)}let r=k(t,-1),{at:o,consume:n,error:s,reconsume:l}=r;function a(){return String.fromCodePoint(r.value)}function c(){return{type:13,value:a()}}function u(){for(;T(o(1));)n(1)}function d(){let[e,t]=function(){let e=0,t="",i=o(1);for(43!==i&&45!==i||(n(1),t+=a());A(o(1));)n(1),t+=a();if(46===o(1)&&A(o(2)))for(e=1,n(1),t+=a();A(o(1));)n(1),t+=a();if(69===(i=o(1))||101===i){let i=o(2);if(A(i))for(e=1,n(1),t+=a();A(o(1));)n(1),t+=a();else if((45===i||43===i)&&A(o(3)))for(e=1,n(1),t+=a(),n(1),t+=a();A(o(1));)n(1),t+=a()}return[t,e]}(),i=o(1);return b(i,o(1),o(2))?{type:15,value:e,flag:t,unit:g()}:37===i?(n(1),{type:16,value:e}):{type:17,value:e,flag:t}}function h(){let e=g(),t=o(1);if("url"===e.toLowerCase()&&40===t){for(n(1);T(o(1))&&T(o(2));)n(1);t=o(1);let i=o(2);return 34===t||39===t?{type:23,value:e}:T(t)&&(34===i||39===i)?{type:23,value:e}:function(){var e;let t="";for(u();;){let i=n(1);if(41===i)return{type:20,value:t};if(-1===i)return s(),{type:20,value:t};if(T(i)){u();let e=o(1);return 41===e||-1===e?(n(1),-1===i&&s(),{type:20,value:t}):(v(),{type:21})}if(34===i||39===i||40===i||(e=i)>=0&&e<=8||11===e||e>=14&&e<=31||127===e)return s(),v(),{type:21};if(92===i){if(!O(i,o(1)))return s(),{type:21};t+=f()}else t+=a()}}()}return 40===t?(n(1),{type:23,value:e}):{type:24,value:e}}function p(e){let t="";for(;;){let i=n(1);if(-1===i||i===e)return -1===i&&s(),{type:2,value:t};if(E(i))return s(),l(),{type:3};if(92===i){let e=o(1);if(-1===e)continue;E(e)?n(1):t+=f()}else t+=a()}}function f(){let e=n(1);if(S(e)){let t=[e];for(let e=0;e<5;e++){let e=o(1);if(!S(e))break;t.push(e),n(1)}T(o(1))&&n(1);let i=parseInt(String.fromCodePoint(...t),16);return(0===i||i>=55296&&i<=57343||i>1114111)&&(i=65533),String.fromCodePoint(i)}return -1===e?(s(),String.fromCodePoint(65533)):a()}function b(e,t,i){return 45===e?z(t)||45===t||O(t,i):!!z(e)}function m(e,t,i){return 43===e||45===e?A(t)||46===t&&A(i):!(46!==e||!A(t))||!!A(e)}function g(){let e="";for(;;){let t=n(1);if(P(t))e+=a();else{if(!O(t,o(1)))return l(),e;e+=f()}}}function v(){for(;;){let e=n(1);if(-1===e)return;O(e,o(1))&&f()}}for(;;){let e=n(1);if(47===e&&42===o(1))n(2),function(){for(;-1!==r.value;)if(n(1),42===o(0)&&47===o(1))return void n(1);s()}();else if(T(e))u(),yield{type:1};else if(34===e)yield p(e);else if(35===e){let e=o(1);P(e)||O(e,o(2))?yield{type:14,flag:b(o(1),o(2),o(3))?1:0,value:g()}:yield c()}else if(39===e)yield p(e);else if(40===e)yield{type:4};else if(41===e)yield{type:5};else if(43===e)m(e,o(1),o(2))?(l(),yield d()):yield c();else if(44===e)yield{type:6};else if(45===e){let t=o(1),i=o(2);m(e,t,i)?(l(),yield d()):45===t&&62===i?(n(2),yield{type:19}):b(e,t,i)?(l(),yield h()):yield c()}else if(46===e)m(e,o(1),o(2))?(l(),yield d()):yield c();else if(58===e)yield{type:7};else if(59===e)yield{type:8};else if(60===e)33===o(1)&&45===o(2)&&45===o(3)?yield{type:18}:yield c();else if(64===e){if(b(o(1),o(2),o(3))){let e=g();yield{type:22,value:e}}else yield c()}else if(91===e)yield{type:9};else if(92===e)O(e,o(1))?(l(),yield h()):(s(),yield c());else if(93===e)yield{type:10};else if(123===e)yield{type:11};else if(125===e)yield{type:12};else if(A(e))l(),yield d();else if(z(e))l(),yield h();else{if(-1===e)return yield{type:0},r.errorIndices;yield{type:13,value:a()}}}}function A(e){return e>=48&&e<=57}function S(e){return A(e)||e>=65&&e<=70||e>=97&&e<=102}function E(e){return 10===e||13===e||12===e}function T(e){return E(e)||9===e||32===e}function z(e){return e>=65&&e<=90||e>=97&&e<=122||e>=128||95===e}function O(e,t){return 92===e&&!E(t)}function P(e){return z(e)||A(e)||45===e}let L={11:12,9:10,4:5};function I(e,t){let i=function(e,t){let i=[];for(;;)switch(e.consume(1).type){case 1:break;case 0:return{type:3,value:i};case 18:case 19:if(!1!==t){e.reconsume();let t=B(e);t!==x&&i.push(t)}break;case 22:e.reconsume(),i.push(R(e));break;default:{e.reconsume();let t=B(e);t!==x&&i.push(t)}}}($(e),!0===t);return r({},i,{value:i.value.map(e=>26===e.type&&0===e.value.value.type?r({},e,{value:r({},e.value,{value:function(e){let t=[],i=[];for(;;){let r=e.consume(1);switch(r.type){case 1:case 8:break;case 0:return{type:1,value:[...i,...t]};case 22:e.reconsume(),t.push(R(e));break;case 24:{let t=[r],o=e.at(1);for(;8!==o.type&&0!==o.type;)t.push(F(e)),o=e.at(1);let n=D($(t));n!==x&&i.push(n);break}case 13:if("&"===r.value){e.reconsume();let i=B(e);i!==x&&t.push(i);break}default:{e.error(),e.reconsume();let t=e.at(1);for(;8!==t.type&&0!==t.type;)F(e),t=e.at(1)}}}}($(e.value.value.value))})}):e)})}function N(e){let t=$(e),i=[];for(;;){if(0===t.consume(1).type)return i;t.reconsume(),i.push(F(t))}}function M(e){for(;1===e.at(1).type;)e.consume(1)}function R(e){let t=e.consume(1);if(22!==t.type)throw Error(`Unexpected type ${t.type}`);let i=t.value,r=[];for(;;)switch((t=e.consume(1)).type){case 8:return{type:25,name:i,prelude:r,value:null};case 0:return e.error(),{type:25,name:i,prelude:r,value:null};case 11:return{type:25,name:i,prelude:r,value:j(e)};case 28:if(11===t.source.type)return{type:25,name:i,prelude:r,value:t};default:e.reconsume(),r.push(F(e))}}function B(e){let t=e.value,i=[];for(;;)switch((t=e.consume(1)).type){case 0:return e.error(),x;case 11:return{type:26,prelude:i,value:j(e)};case 28:if(11===t.source.type)return{type:26,prelude:i,value:t};default:e.reconsume(),i.push(F(e))}}function D(e){let t=e.consume(1);if(24!==t.type)throw Error(`Unexpected type ${t.type}`);let i=t.value,r=[],o=!1;if(M(e),7!==e.at(1).type)return e.error(),x;for(e.consume(1),M(e);0!==e.at(1).type;)r.push(F(e));let n=r[r.length-2],s=r[r.length-1];return n&&13===n.type&&"!"===n.value&&24===s.type&&"important"===s.value.toLowerCase()&&(o=!0,r.splice(r.length-2)),{type:29,name:i,value:r,important:o}}function F(e){let t=e.consume(1);switch(t.type){case 11:case 9:case 4:return j(e);case 23:return function(e){let t=e.value;if(23!==t.type)throw Error(`Unexpected type ${t.type}`);let i=t.value,r=[];for(;;)switch((t=e.consume(1)).type){case 5:return{type:27,name:i,value:r};case 0:return e.error(),{type:27,name:i,value:r};default:e.reconsume(),r.push(F(e))}}(e);default:return t}}function j(e){let t=e.value,i=t,r=L[i.type];if(!r)throw Error(`Unexpected type ${t.type}`);let o=[];for(;;)switch((t=e.consume(1)).type){case r:return{type:28,source:i,value:{type:0,value:o}};case 0:return e.error(),{type:28,source:i,value:{type:0,value:o}};default:e.reconsume(),o.push(F(e))}}function U(e){return M(e),0===e.at(1).type}let q={11:["{","}"],9:["[","]"],4:["(",")"]};function V(e,t){switch(e.type){case 25:return`@${CSS.escape(e.name)} ${e.prelude.map(e=>V(e)).join("")}${e.value?V(e.value):";"}`;case 26:return`${e.prelude.map(e=>V(e)).join("")}${V(e.value)}`;case 28:{let[t,i]=q[e.source.type];return`${t}${H(e.value)}${i}`}case 27:return`${CSS.escape(e.name)}(${e.value.map(e=>V(e)).join("")})`;case 29:return`${CSS.escape(e.name)}:${e.value.map(e=>V(e)).join("")}${e.important?" !important":""}`;case 1:return" ";case 8:return";";case 7:return":";case 14:return"#"+CSS.escape(e.value);case 24:return CSS.escape(e.value);case 15:return e.value+CSS.escape(e.unit);case 13:case 17:return e.value;case 2:return`"${CSS.escape(e.value)}"`;case 6:return",";case 20:return"url("+CSS.escape(e.value)+")";case 22:return"@"+CSS.escape(e.value);case 16:return e.value+"%";default:throw Error(`Unsupported token ${e.type}`)}}function H(e,t){return e.value.map(t=>{let i=V(t);return 29===t.type&&0!==e.type&&(i+=";"),i}).join("")}function W(e){return V(e)}function K(e){let t=e.at(1);return 13===t.type&&"="===t.value&&(e.consume(1),!0)}function J(e,t){let i=[];for(;;){let r=e.at(1);if(0===r.type||t&&7===r.type||13===r.type&&(">"===r.value||"<"===r.value||"="===r.value))break;i.push(e.consume(1))}return i}function G(e){M(e);let t=e.consume(1);return 13!==t.type?x:">"===t.value?K(e)?3:2:"<"===t.value?K(e)?5:4:"="===t.value?1:x}function Y(e){return 4===e||5===e}function Z(e){return 2===e||3===e}function Q(e,t,i){let r=function(e){M(e);let t=e.consume(1);return M(e),24!==t.type||0!==e.at(1).type?x:t.value}($(e));if(r===x)return x;let o=r.toLowerCase();return o=i?i(o):o,t.has(o)?o:x}function X(e){return{type:13,value:e}}function ee(e,t){return{type:29,name:e,value:t,important:!1}}function et(e){return{type:24,value:e}}function ei(e,t){return{type:27,name:e,value:t}}function er(e){return ei("var",[et(e)])}function eo(e){return function e(t,i){M(t);let r=!1,o=t.at(1);if(24===o.type){if("not"!==o.value.toLowerCase())return x;t.consume(1),M(t),r=!0}let n=function(t){let i=t.consume(1);switch(i.type){case 28:{if(4!==i.source.type)return x;let t=e($(i.value.value),null);return t!==x?t:{type:4,value:i}}case 27:return{type:4,value:i};default:return x}}(t);if(n===x)return x;n=r?{type:1,value:n}:n,M(t);let s=24===(o=t.at(1)).type?o.value.toLowerCase():null;if(null!==s){if(t.consume(1),M(t),"and"!==s&&"or"!==s||null!==i&&s!==i)return x;let r=e(t,s);return r===x?x:{type:"and"===s?2:3,left:n,right:r}}return U(t)?n:x}(e,null)}let en={width:1,height:2,"inline-size":3,"block-size":4,"aspect-ratio":5,orientation:6},es=new Set(Object.keys(en)),el=new Set(["none","and","not","or","normal","auto"]),ea=new Set(["initial","inherit","revert","revert-layer","unset"]),ec=new Set(["size","inline-size"]);function eu(e,t,i,r){let o=i();if(o===x)return x;let n=[o,null];M(e);let s=e.at(1);if(13===s.type){if(s.value!==t)return x;e.consume(1),M(e);let i=r();M(e),i!==x&&(n=[o,i])}return U(e)?n:x}function ed(e){let t=e.consume(1);return 17===t.type?parseInt(t.value):x}function eh(e){let t=$(e);M(t);let i=t.consume(1),r=x;switch(i.type){case 17:t.reconsume(),r=function(e){let t=eu(e,"/",()=>ed(e),()=>ed(e));return t===x?x:{type:2,value:t[0]/(null!==t[1]?t[1]:1)}}(t);break;case 15:r={type:3,value:parseInt(i.value),unit:i.unit.toLowerCase()};break;case 24:{let e=i.value.toLowerCase();switch(e){case"landscape":case"portrait":r={type:4,value:e}}}}return r===x?x:U(t)?{type:6,value:r}:x}function ep(e,t){let i=[];for(;;){M(e);let r=e.at(1);if(24!==r.type||!t(r.value))return i;e.consume(1),i.push(r.value)}}function ef(e){let t=[];for(;;){var i;M(e);let r=e.at(1);if(24!==r.type)break;let o=r.value;if(!(!eb(i=(i=o).toLowerCase())&&!el.has(i)))break;e.consume(1),t.push(o)}return t}function eb(e){return ea.has(e)}function em(e){return e.map(e=>"cq-"+e)}function eg(e){let t=ep(e,e=>eb(e));return 1===t.length?em(t):x}function ev(e,t){let i=ep(e,e=>"none"===e);if(1===i.length)return em(i);if(0!==i.length)return x;if(t){let t=eg(e);if(t!==x)return t}let r=ef(e);return r.length>0&&(!t||U(e))?r:x}function ey(e,t){if(t){let t=eg(e);if(t!==x)return t}return function(e){let t=ep(e,e=>"normal"===e);if(1===t.length)return em(t);if(0!==t.length)return x;let i=ep(e,e=>ec.has(e));return i.length>0&&U(e)?i:x}(e)}function e_(e){let t=$(e),i=eg(t);if(i!==x)return[i,i];let r=eu(t,"/",()=>ev(t,!1),()=>ey(t,!1));return r!==x&&U(t)?[r[0],r[1]||[]]:x}let ew=0,ex={cqw:g,cqh:v,cqi:y,cqb:_},ek=CSS.supports("selector(:where(div))"),e$=":not(.container-query-polyfill)";N(Array.from(C(e$)));let eC=document.createElement("div"),eA=new Set(["before","after","first-line","first-letter"]);function eS(e,t){return ei("calc",[{type:17,flag:e.flag,value:e.value},X("*"),t])}function eE(e){switch(e.name){case"container":return e_(e.value)?r({},e,{name:h}):e;case"container-name":return ev($(e.value),!0)?r({},e,{name:f}):e;case"container-type":return null!=ey($(e.value),!0)?r({},e,{name:p}):e}return r({},e,{value:function e(t){return t.map(t=>{switch(t.type){case 15:return function(e){let t=e.unit,i=ex[t];return null!=i?eS(e,er(i)):"cqmin"===t||"cqmax"===t?eS(e,ei(e.unit.slice(2),[er(y),{type:6},er(_)])):e}(t);case 27:return r({},t,{value:e(t.value)})}return t})}(e.value)})}function eT(e,t){return r({},e,{value:e.value.map(e=>{switch(e.type){case 25:return eP(e,t);case 26:return t.transformStyleRule(r({},e,{value:eO(e.value,t)}));default:return e}})})}function ez(e){return 0===e.type||6===e.type}function eO(e,t){return function(e,t){let i=[],o=null,n=null;for(let r of e.value.value)switch(r.type){case 25:{let e=t?t(r):r;e&&i.push(e)}break;case 29:{let e=eE(r);switch(e.name){case h:{let e=e_(r.value);e!==x&&(o=e[0],n=e[1]);break}case f:{let e=ev($(r.value),!0);e!==x&&(o=e);break}case p:{let e=ey($(r.value),!0);e!==x&&(n=e);break}default:i.push(e)}}}return o&&o.length>0&&i.push(ee(f,[et(o.join(" "))])),n&&n.length>0&&i.push(ee(p,[et(n.join(" "))])),r({},e,{value:{type:2,value:i}})}(e,e=>eP(e,t))}function eP(e,t){switch(e.name.toLocaleLowerCase()){case"media":case"layer":return r({},e,{value:e.value?r({},e.value,{value:eT(I(e.value.value.value),t)}):null});case"keyframes":let i;return i=null,e.value&&(i=r({},e.value,{value:{type:3,value:I(e.value.value.value).value.map(e=>{switch(e.type){case 26:return r({},e,{value:eO(e.value,t)});case 25:return eP(e,t)}})}})),r({},e,{value:i});case"supports":let o;return o=(o=eo($(e.prelude)))!==x?function e(t){if(1===t.type)return r({},t,{value:e(t.value)});if(2===t.type||3===t.type)return r({},t,{left:e(t.left),right:e(t.right)});if(4===t.type&&28===t.value.type){let e=function(e){let t=$(e);return M(t),24!==t.at(1).type?x:D(t)||x}(t.value.value.value);if(e!==x)return r({},t,{value:r({},t.value,{value:{type:0,value:[eE(e)]}})})}return t}(o):x,r({},e,{prelude:o!==x?function e(t){switch(t.type){case 1:return[et("not"),{type:1},...e(t.value)];case 2:case 3:return[...e(t.left),{type:1},et(2===t.type?"and":"or"),{type:1},...e(t.right)];case 4:return[t.value]}}(o):e.prelude,value:e.value?r({},e.value,{value:eT(I(e.value.value.value),t)}):null});case"container":return function(e,t){if(e.value){let i=function(e){let t=$(e),i=ef(t);if(!i||i.length>1)return x;let r=eo(t);if(r===x)return x;let o={features:new Set},n=function e(t,i){switch(t.type){case 1:return{type:1,value:e(t.value,i)};case 2:case 3:return{type:2===t.type?2:3,left:e(t.left,i),right:e(t.right,i)};case 4:if(28===t.value.type){let e=function(e,t){let i=function(e,t){let i=J(e,!0),r=e.at(1);if(0===r.type){let e=Q(i,t);return e!==x&&t.has(e)?{type:1,feature:e}:x}if(7===r.type){e.consume(1);let r=J(e,!1),o=1,n=Q(i,t,e=>e.startsWith("min-")?(o=3,e.substring(4)):e.startsWith("max-")?(o=5,e.substring(4)):e);return n!==x?{type:2,feature:n,bounds:[null,[o,r]]}:x}let o=G(e);if(o===x)return x;let n=J(e,!1);if(0===e.at(1).type){let e=Q(i,t);if(e!==x)return{type:2,feature:e,bounds:[null,[o,n]]};let r=Q(n,t);return r!==x?{type:2,feature:r,bounds:[[o,i],null]}:x}let s=G(e);if(s===x||!(Z(o)&&Z(s)||Y(o)&&Y(s)))return x;let l=J(e,!1),a=Q(n,t);return a!==x?{type:2,feature:a,bounds:[[o,i],[s,l]]}:x}(e,es);if(i===x)return x;let r=en[i.feature];if(null==r)return x;if(t.features.add(r),1===i.type)return{type:5,feature:r};{let e={type:5,feature:r},t=x;if(null!==i.bounds[0]){let r=eh(i.bounds[0][1]);if(r===x)return x;t={type:4,operator:i.bounds[0][0],left:r,right:e}}if(null!==i.bounds[1]){let r=eh(i.bounds[1][1]);if(r===x)return x;let o={type:4,operator:i.bounds[1][0],left:e,right:r};t=t!==x?{type:2,left:t,right:o}:o}return t}}($(t.value.value.value),i);if(e!==x)return e}return{type:6,value:{type:1}}}}(r,o);return U(t)?{name:i.length>0?i[0]:null,condition:n,features:o.features}:x}(e.prelude);if(i!==x){let o={rule:i,selector:null,parent:t.parent,uid:"c"+ew++},n=new Set,s=[],l=eT(I(e.value.value.value),{descriptors:t.descriptors,parent:o,transformStyleRule:e=>{let[t,i]=function(e,t,i){var r,o;let n=$(e),l=[],a=[];for(;;){if(0===n.at(1).type)return[l,a];let i=Math.max(0,n.index);for(;r=n.at(1),o=n.at(2),!(ez(r)||7===r.type&&(7===o.type||24===o.type&&eA.has(o.value.toLowerCase())));)n.consume(1);let c=n.index+1,u=e.slice(i,c),d=u.length>0?function(e){for(let t=e.length-1;t>=0;t--)if(1!==e[t].type)return e.slice(0,t+1);return e}(u):[X("*")];for(;!ez(n.at(1));)n.consume(1);let h=e.slice(c,Math.max(0,n.index+1)),p=d,f=[{type:28,source:{type:9},value:{type:0,value:[et(h.length>0?b:m),X("~"),X("="),{type:2,value:t}]}}];if(ek)f=[X(":"),ei("where",f)];else{let e=d.map(W).join("");e.endsWith(e$)?p=N(Array.from(C(e.substring(0,e.length-e$.length)))):s.push({actual:e,expected:e+e$})}l.push(...d),a.push(...p),a.push(...f),a.push(...h),n.consume(1)}}(e.prelude,o.uid);if(s.length>0)return e;let l=t.map(W).join("");try{eC.matches(l),n.add(l)}catch(e){}return r({},e,{prelude:i})}}).value;if(s.length>0){let e=new Set,t=[],i=0;for(let{actual:e}of s)i=Math.max(i,e.length);let r=Array.from({length:i},()=>" ").join("");for(let{actual:o,expected:n}of s)e.has(o)||(t.push(`${o}${r.substring(0,i-o.length)} => ${n}`),e.add(o));console.warn(`The :where() pseudo-class is not supported by this browser. To use the Container Query Polyfill, you must modify the selectors under your @container rules:

${t.join("\n")}`)}return n.size>0&&(o.selector=Array.from(n).join(", ")),t.descriptors.push(o),{type:25,name:"media",prelude:[et("all")],value:r({},e.value,{value:{type:3,value:l}})}}}return e}(e,t)}return e}class eL{constructor(e){this.value=void 0,this.value=e}}function eI(e,t){if(e===t)return!0;if(typeof e==typeof t&&null!==e&&null!==t&&"object"==typeof e){if(Array.isArray(e)){if(!Array.isArray(t)||t.length!==e.length)return!1;for(let i=0,r=e.length;i<r;i++)if(!eI(e[i],t[i]))return!1;return!0}if(e instanceof eL)return t instanceof eL&&e.value===t.value;{let i=Object.keys(e);if(i.length!==Object.keys(t).length)return!1;for(let r=0,o=i.length;r<o;r++){let o=i[r];if(!eI(e[o],t[o]))return!1}return!0}}return!1}let eN=Symbol("CQ_INSTANCE"),eM=Symbol("CQ_STYLESHEET"),eR=CSS.supports("width: 1svh"),eB=new Set(["vertical-lr","vertical-rl","sideways-rl","sideways-lr","tb","tb-lr","tb-rl"]),eD=["padding-left","padding-right","border-left-width","border-right-width"],eF=["padding-top","padding-bottom","border-top-width","border-bottom-width"],ej=/(\w*(\s|-))?(table|ruby)(-\w*)?/;class eU{constructor(e){this.node=void 0,this.node=e}connected(){}disconnected(){}updated(){}}class eq extends eU{constructor(e,t){super(e),this.context=void 0,this.controller=null,this.styleSheet=null,this.context=t}connected(){var e=this;let t=this.node;if("stylesheet"===t.rel){let i=new URL(t.href,document.baseURI);i.origin===location.origin&&(this.controller=eK(async function(r){let o=await fetch(i.toString(),{signal:r}),n=await o.text(),s=e.styleSheet=await e.context.registerStyleSheet({source:n,url:i,signal:r}),l=new Blob([s.source],{type:"text/css"}),a=new Image;a.onload=a.onerror=s.refresh,a.src=t.href=URL.createObjectURL(l)}))}}disconnected(){var e,t;null==(e=this.controller)||e.abort(),this.controller=null,null==(t=this.styleSheet)||t.dispose(),this.styleSheet=null}}class eV extends eU{constructor(e,t){super(e),this.context=void 0,this.controller=null,this.styleSheet=null,this.context=t}connected(){var e=this;this.controller=eK(async function(t){let i=e.node,r=e.styleSheet=await e.context.registerStyleSheet({source:i.innerHTML,signal:t});i.innerHTML=r.source,r.refresh()})}disconnected(){var e,t;null==(e=this.controller)||e.abort(),this.controller=null,null==(t=this.styleSheet)||t.dispose(),this.styleSheet=null}}class eH extends eU{connected(){let e=`* { ${p}: cq-normal; ${f}: cq-none; }`;this.node.innerHTML=void 0===window.CSSLayerBlockRule?e:`@layer cq-polyfill-${d} { ${e} }`}}class eW extends eU{constructor(e,t){super(e),this.context=void 0,this.styles=void 0,this.context=t,this.styles=window.getComputedStyle(e)}connected(){this.node.style.cssText="position: fixed; top: 0; left: 0; visibility: hidden; "+(eR?"width: 1svw; height: 1svh;":"width: 1%; height: 1%;")}updated(){let e=eY(e=>this.styles.getPropertyValue(e));this.context.viewportChanged({width:e.width,height:e.height})}}function eK(e){let t=new AbortController;return e(t.signal).catch(e=>{if(!(e instanceof DOMException&&"AbortError"===e.message))throw e}),t}function eJ(e,t){return parseFloat(e(t))}function eG(e,t){return t.reduce((t,i)=>t+eJ(e,i),0)}function eY(e){let t=0,i=0;return"border-box"===e("box-sizing")&&(t=eG(e,eD),i=eG(e,eF)),{fontSize:eJ(e,"font-size"),width:eJ(e,"width")-t,height:eJ(e,"height")-i}}function eZ(e){var t,i,r;let o;return{containerType:function(e){let t=0;if(0===e.length||e.startsWith("cq-")&&("normal"===(e=e.substring(3))||eb(e)))return t;for(let i of e.split(" "))switch(i){case"size":t|=3;break;case"inline-size":t|=1;break;default:return 0}return t}(e(p).trim()),containerNames:new Set((i=e(f).trim()).startsWith("cq-")&&("none"===(i=i.substring(3))||eb(i))?[]:0===i.length?[]:i.split(" ")),writingAxis:(t=e("writing-mode").trim(),eB.has(t)?1:0),displayFlags:(r=e("display").trim(),o=0,"none"!==r&&(o|=1,"contents"===r||"inline"===r||ej.test(r)||(o|=2)),o)}}function eQ(e,t,i){null!=i?i!=e.getPropertyValue(t)&&e.setProperty(t,i):e.removeProperty(t)}new Promise(e=>{}),window.CQPolyfill={version:"1.0.2"},"container"in document.documentElement.style||function(){function e(e){return e[eN]||null}let t=document.documentElement;if(e(t))return;let i=document.createElement(`cq-polyfill-${d}`),o=document.createElement("style");new MutationObserver(t=>{for(let i of t){for(let t of i.removedNodes){let i=e(t);null==i||i.disconnect()}i.target.nodeType!==Node.DOCUMENT_NODE&&i.target.nodeType!==Node.DOCUMENT_FRAGMENT_NODE&&null===i.target.parentNode||"attributes"===i.type&&i.attributeName&&(i.attributeName===b||i.attributeName===m||i.target instanceof Element&&i.target.getAttribute(i.attributeName)===i.oldValue)||($(i.target).mutate(),p())}}).observe(t,{childList:!0,subtree:!0,attributes:!0,attributeOldValue:!0});let n=new ResizeObserver(e=>{for(let t of e)$(t.target).resize();$(t).update(x())}),s=new eU(t);async function l(e,{source:i,url:r,signal:o}){let n=function(e,t){try{let i=Array.from(C(e));if(t)for(let e=0;e<i.length;e++){let r=i[e];if(20===r.type)r.value=new URL(r.value,t).toString();else if(23===r.type&&"url"===r.value.toLowerCase()){let r=e+1<i.length?i[e+1]:null;r&&2===r.type&&(r.value=new URL(r.value,t).toString())}}let r={descriptors:[],parent:null,transformStyleRule:e=>e};return{source:H(eT(I(i,!0),r)),descriptors:r.descriptors}}catch(t){return console.warn("An error occurred while transpiling stylesheet: "+t),{source:e,descriptors:[]}}}(i,r?r.toString():void 0),s=()=>{},l=()=>{},a=$(t),c=!1;return null!=o&&o.aborted||(l=()=>{if(!c){var t;let{sheet:i}=e;null!=i&&(t=n.descriptors,i[eM]=t,c=!0,s=()=>{i[eM]=void 0,a.mutate(),p()},a.mutate(),p())}}),{source:n.source,dispose:s,refresh:l}}let a={cqw:null,cqh:null};function u({width:e,height:t}){a.cqw=e,a.cqh=t}function h(e,t,i){if(e instanceof Element&&t){let r="";for(let[i,o]of t.conditions){let t=i.value;null!=t.selector&&null!=o&&2==(2&o)&&e.matches(t.selector)&&(r.length>0&&(r+=" "),r+=t.uid)}r.length>0?e.setAttribute(i,r):e.removeAttribute(i)}}function p(){n.unobserve(t),n.observe(t)}let f=()=>{let e=[];for(let t of document.styleSheets)for(let i of function(e){let t=e[eM];return null!=t?t:[]}(t))e.push([new eL(i),0]);return e},w=window.getComputedStyle(t),x=()=>{let e=e=>w.getPropertyValue(e),t=eZ(e),i=eY(e);return{parentState:null,conditions:f(),context:r({},a,{fontSize:i.fontSize,rootFontSize:i.fontSize,writingAxis:t.writingAxis}),displayFlags:t.displayFlags,isQueryContainer:!1}},k=e=>e;function $(a){let d=e(a);if(!d){let p,f=null,w=!1;a===t?(p=s,f=k):a===i?(w=!0,p=new eW(i,{viewportChanged:u})):p=a===o?new eH(o):a instanceof HTMLLinkElement?new eq(a,{registerStyleSheet:e=>l(a,r({},e))}):a instanceof HTMLStyleElement?new eV(a,{registerStyleSheet:e=>l(a,r({},e))}):new eU(a);let x=Symbol();if(null==f&&a instanceof Element){let e=function(e){let t;let i=window.getComputedStyle(e);return t=null,(...e)=>{if(null==t||!eI(t[0],e)){let o=((e,t)=>{let{context:o,conditions:n}=e,s=e=>i.getPropertyValue(e),l=eZ(s),a=r({},o,{writingAxis:l.writingAxis}),u=n,d=!1,h=l.displayFlags;0==(1&e.displayFlags)&&(h=0);let{containerType:p,containerNames:f}=l;if(p>0){let e=p>0&&2==(2&h),t=new Map(n.map(e=>[e[0].value,e[1]]));if(u=[],d=!0,e){let e=eY(s);a.fontSize=e.fontSize;let i=function(e,t){let i={value:t.width},r={value:t.height},o=i,n=r;if(1===e.writingAxis){let e=o;o=n,n=e}return 2!=(2&e.containerType)&&(n.value=void 0),{width:i.value,height:r.value,inlineSize:o.value,blockSize:n.value}}(l,e),r={sizeFeatures:i,treeContext:a},d=e=>{var i;let{rule:o}=e,n=o.name,s=null==n||f.has(n)?function(e,t){let i=new Map,r=t.sizeFeatures;for(let t of e.features){let e=function(e,t){let i=t.width,r=t.height,o=t.inlineSize,n=t.blockSize;switch(e){case 1:return null!=i?{type:3,value:i,unit:"px"}:{type:1};case 3:return null!=o?{type:3,value:o,unit:"px"}:{type:1};case 2:return null!=r?{type:3,value:r,unit:"px"}:{type:1};case 4:return null!=n?{type:3,value:n,unit:"px"}:{type:1};case 5:return null!=i&&null!=r&&r>0?{type:2,value:i/r}:{type:1};case 6:return null!=i&&null!=r?{type:4,value:r>=i?"portrait":"landscape"}:{type:1}}}(t,r);if(1===e.type)return null;i.set(t,e)}let o=c(e.condition,{sizeFeatures:i,treeContext:t.treeContext});return 5===o.type?o.value:null}(o,r):null;return null==s?1===((null!=(i=t.get(e))?i:0)&&1):!0===s},h=(e,t)=>{let i=e.get(t);if(null==i){let r=d(t);i=(r?1:0)|(!0!==r||null!=t.parent&&1!=(1&h(e,t.parent))?0:2),e.set(t,i)}return i},p=new Map;for(let e of n)u.push([e[0],h(p,e[0].value)]);a.cqw=null!=i.width?i.width/100:o.cqw,a.cqh=null!=i.height?i.height/100:o.cqh}}return{parentState:new eL(e),conditions:u,context:a,displayFlags:h,isQueryContainer:d}})(...e);null!=t&&eI(t[1],o)||(t=[e,o])}return t[1]}}(a);f=t=>e(t,x)}let C=f||k,A=null,S=e=>{let t=A;return[A=C(e),A!==t]},E=a instanceof HTMLElement||a instanceof SVGElement?a.style:null,T=!1;d={connect(){for(let e=a.firstChild;null!=e;e=e.nextSibling)$(e);p.connected()},disconnect(){a instanceof Element&&(n.unobserve(a),a.removeAttribute(b),a.removeAttribute(m)),E&&(E.removeProperty(y),E.removeProperty(_),E.removeProperty(g),E.removeProperty(v));for(let t=a.firstChild;null!=t;t=t.nextSibling){let i=e(t);null==i||i.disconnect()}p.disconnected(),delete a[eN]},update(e){let[t,i]=S(e);if(i){if(h(a,e,m),h(a,t,b),a instanceof Element){let e=w||t.isQueryContainer;e&&!T?(n.observe(a),T=!0):!e&&T&&(n.unobserve(a),T=!1)}if(E){let i=t.context,r=i.writingAxis,o=null,n=null,s=null,l=null;(r!==e.context.writingAxis||t.isQueryContainer)&&(o=`var(${0===r?g:v})`,n=`var(${1===r?g:v})`),e&&!t.isQueryContainer||(i.cqw&&(s=i.cqw+"px"),i.cqh&&(l=i.cqh+"px")),eQ(E,y,o),eQ(E,_,n),eQ(E,g,s),eQ(E,v,l)}p.updated()}for(let e=a.firstChild;null!=e;e=e.nextSibling)$(e).update(t)},resize(){x=Symbol()},mutate(){x=Symbol();for(let e=a.firstChild;null!=e;e=e.nextSibling)$(e).mutate()}},a[eN]=d,d.connect()}return d}t.prepend(o,i),$(t),p()}();var eX,e0,e1,e2,e5,e3,e6,e4,e8,e7,e9,te,tt,ti,tr,to,tn,ts="",tl=Object.defineProperty,ta=Object.defineProperties,tc=Object.getOwnPropertyDescriptor,tu=Object.getOwnPropertyDescriptors,td=Object.getOwnPropertySymbols,th=Object.prototype.hasOwnProperty,tp=Object.prototype.propertyIsEnumerable,tf=(e,t,i)=>t in e?tl(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,tb=(e,t)=>{for(var i in t||(t={}))th.call(t,i)&&tf(e,i,t[i]);if(td)for(var i of td(t))tp.call(t,i)&&tf(e,i,t[i]);return e},tm=(e,t)=>ta(e,tu(t)),tg=(e,t,i,r)=>{for(var o,n=r>1?void 0:r?tc(t,i):t,s=e.length-1;s>=0;s--)(o=e[s])&&(n=(r?o(t,i,n):o(n))||n);return r&&n&&tl(t,i,n),n},tv={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},ty=[{name:"default",resolver:e=>(function(e=""){if(!ts){let e=[...document.getElementsByTagName("script")],t=e.find(e=>e.hasAttribute("data-shoelace"));if(t)ts=t.getAttribute("data-shoelace");else{let t=e.find(e=>/shoelace(\.min)?\.js($|\?)/.test(e.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(e.src)),i="";t&&(i=t.getAttribute("src")),ts=i.split("/").slice(0,-1).join("/")}}return ts.replace(/\/$/,"")+(e?`/${e.replace(/^\//,"")}`:"")})(`assets/icons/${e}.svg`)},{name:"system",resolver:e=>e in tv?`data:image/svg+xml,${encodeURIComponent(tv[e])}`:""}],t_=[];function tw(e){return ty.find(t=>t.name===e)}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let tx=globalThis,tk=tx.ShadowRoot&&(void 0===tx.ShadyCSS||tx.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,t$=Symbol(),tC=new WeakMap;class tA{constructor(e,t,i){if(this._$cssResult$=!0,i!==t$)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(tk&&void 0===e){let i=void 0!==t&&1===t.length;i&&(e=tC.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&tC.set(t,e))}return e}toString(){return this.cssText}}let tS=e=>new tA("string"==typeof e?e:e+"",void 0,t$),tE=(e,...t)=>new tA(1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]),e,t$),tT=(e,t)=>{if(tk)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let i of t){let t=document.createElement("style"),r=tx.litNonce;void 0!==r&&t.setAttribute("nonce",r),t.textContent=i.cssText,e.appendChild(t)}},tz=tk?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return tS(t)})(e):e,{is:tO,defineProperty:tP,getOwnPropertyDescriptor:tL,getOwnPropertyNames:tI,getOwnPropertySymbols:tN,getPrototypeOf:tM}=Object,tR=globalThis,tB=tR.trustedTypes,tD=tB?tB.emptyScript:"",tF=tR.reactiveElementPolyfillSupport,tj=(e,t)=>e,tU={toAttribute(e,t){switch(t){case Boolean:e=e?tD:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},tq=(e,t)=>!tO(e,t),tV={attribute:!0,type:String,converter:tU,reflect:!1,hasChanged:tq};Symbol.metadata??=Symbol("metadata"),tR.litPropertyMetadata??=new WeakMap;class tH extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=tV){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&tP(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){let{get:r,set:o}=tL(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get(){return r?.call(this)},set(t){let n=r?.call(this);o.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??tV}static _$Ei(){if(this.hasOwnProperty(tj("elementProperties")))return;let e=tM(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(tj("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(tj("properties"))){let e=this.properties;for(let t of[...tI(e),...tN(e)])this.createProperty(t,e[t])}let e=this[Symbol.metadata];if(null!==e){let t=litPropertyMetadata.get(e);if(void 0!==t)for(let[e,i]of t)this.elementProperties.set(e,i)}for(let[e,t]of(this._$Eh=new Map,this.elementProperties)){let i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e))for(let i of new Set(e.flat(1/0).reverse()))t.unshift(tz(i));else void 0!==e&&t.push(tz(e));return t}static _$Eu(e,t){let i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map;for(let t of this.constructor.elementProperties.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return tT(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EC(e,t){let i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){let o=(void 0!==i.converter?.toAttribute?i.converter:tU).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){let i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){let e=i.getPropertyOptions(r),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:tU;this._$Em=r,this[r]=o.fromAttribute(t,e.type),this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){if(!((i??=this.constructor.getPropertyOptions(e)).hasChanged??tq)(this[e],t))return;this.P(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(e,t,i){this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$Em!==e&&(this._$Ej??=new Set).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,i]of e)!0!==i.wrapped||this._$AL.has(t)||void 0===this[t]||this.P(t,this[t],i)}let e=!1,t=this._$AL;try{(e=this.shouldUpdate(t))?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&=this._$Ej.forEach(e=>this._$EC(e,this[e])),this._$EU()}updated(e){}firstUpdated(e){}}tH.elementStyles=[],tH.shadowRootOptions={mode:"open"},tH[tj("elementProperties")]=new Map,tH[tj("finalized")]=new Map,tF?.({ReactiveElement:tH}),(tR.reactiveElementVersions??=[]).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let tW=globalThis,tK=tW.trustedTypes,tJ=tK?tK.createPolicy("lit-html",{createHTML:e=>e}):void 0,tG="$lit$",tY=`lit$${(Math.random()+"").slice(9)}$`,tZ="?"+tY,tQ=`<${tZ}>`,tX=document,t0=()=>tX.createComment(""),t1=e=>null===e||"object"!=typeof e&&"function"!=typeof e,t2=Array.isArray,t5=e=>t2(e)||"function"==typeof e?.[Symbol.iterator],t3="[ 	\n\f\r]",t6=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,t4=/-->/g,t8=/>/g,t7=RegExp(`>|${t3}(?:([^\\s"'>=/]+)(${t3}*=${t3}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),t9=/'/g,ie=/"/g,it=/^(?:script|style|textarea|title)$/i,ii=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),ir=ii(1),io=ii(2),is=Symbol.for("lit-noChange"),il=Symbol.for("lit-nothing"),ia=new WeakMap,ic=tX.createTreeWalker(tX,129);function iu(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==tJ?tJ.createHTML(t):t}let id=(e,t)=>{let i=e.length-1,r=[],o,n=2===t?"<svg>":"",s=t6;for(let t=0;t<i;t++){let i=e[t],l,a,c=-1,u=0;for(;u<i.length&&(s.lastIndex=u,null!==(a=s.exec(i)));)u=s.lastIndex,s===t6?"!--"===a[1]?s=t4:void 0!==a[1]?s=t8:void 0!==a[2]?(it.test(a[2])&&(o=RegExp("</"+a[2],"g")),s=t7):void 0!==a[3]&&(s=t7):s===t7?">"===a[0]?(s=o??t6,c=-1):void 0===a[1]?c=-2:(c=s.lastIndex-a[2].length,l=a[1],s=void 0===a[3]?t7:'"'===a[3]?ie:t9):s===ie||s===t9?s=t7:s===t4||s===t8?s=t6:(s=t7,o=void 0);let d=s===t7&&e[t+1].startsWith("/>")?" ":"";n+=s===t6?i+tQ:c>=0?(r.push(l),i.slice(0,c)+tG+i.slice(c)+tY+d):i+tY+(-2===c?t:d)}return[iu(e,n+(e[i]||"<?>")+(2===t?"</svg>":"")),r]};class ih{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,n=0,s=e.length-1,l=this.parts,[a,c]=id(e,t);if(this.el=ih.createElement(a,i),ic.currentNode=this.el.content,2===t){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=ic.nextNode())&&l.length<s;){if(1===r.nodeType){if(r.hasAttributes())for(let e of r.getAttributeNames())if(e.endsWith(tG)){let t=c[n++],i=r.getAttribute(e).split(tY),s=/([.?@])?(.*)/.exec(t);l.push({type:1,index:o,name:s[2],strings:i,ctor:"."===s[1]?iv:"?"===s[1]?iy:"@"===s[1]?i_:ig}),r.removeAttribute(e)}else e.startsWith(tY)&&(l.push({type:6,index:o}),r.removeAttribute(e));if(it.test(r.tagName)){let e=r.textContent.split(tY),t=e.length-1;if(t>0){r.textContent=tK?tK.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],t0()),ic.nextNode(),l.push({type:2,index:++o});r.append(e[t],t0())}}}else if(8===r.nodeType){if(r.data===tZ)l.push({type:2,index:o});else{let e=-1;for(;-1!==(e=r.data.indexOf(tY,e+1));)l.push({type:7,index:o}),e+=tY.length-1}}o++}}static createElement(e,t){let i=tX.createElement("template");return i.innerHTML=e,i}}function ip(e,t,i=e,r){if(t===is)return t;let o=void 0!==r?i._$Co?.[r]:i._$Cl,n=t1(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e))._$AT(e,i,r),void 0!==r?(i._$Co??=[])[r]=o:i._$Cl=o),void 0!==o&&(t=ip(e,o._$AS(e,t.values),o,r)),t}class ib{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??tX).importNode(t,!0);ic.currentNode=r;let o=ic.nextNode(),n=0,s=0,l=i[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new im(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new iw(o,this,e)),this._$AV.push(t),l=i[++s]}n!==l?.index&&(o=ic.nextNode(),n++)}return ic.currentNode=tX,r}p(e){let t=0;for(let i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class im{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=il,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){t1(e=ip(this,e,t))?e===il||null==e||""===e?(this._$AH!==il&&this._$AR(),this._$AH=il):e!==this._$AH&&e!==is&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):t5(e)?this.k(e):this._(e)}S(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}_(e){this._$AH!==il&&t1(this._$AH)?this._$AA.nextSibling.data=e:this.T(tX.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=ih.createElement(iu(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new ib(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=ia.get(e.strings);return void 0===t&&ia.set(e.strings,t=new ih(e)),t}k(e){t2(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,r=0;for(let o of e)r===t.length?t.push(i=new im(this.S(t0()),this.S(t0()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){let t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ig{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,o){this.type=1,this._$AH=il,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=il}_$AI(e,t=this,i,r){let o=this.strings,n=!1;if(void 0===o)(n=!t1(e=ip(this,e,t,0))||e!==this._$AH&&e!==is)&&(this._$AH=e);else{let r,s;let l=e;for(e=o[0],r=0;r<o.length-1;r++)(s=ip(this,l[i+r],t,r))===is&&(s=this._$AH[r]),n||=!t1(s)||s!==this._$AH[r],s===il?e=il:e!==il&&(e+=(s??"")+o[r+1]),this._$AH[r]=s}n&&!r&&this.j(e)}j(e){e===il?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class iv extends ig{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===il?void 0:e}}class iy extends ig{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==il)}}class i_ extends ig{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){if((e=ip(this,e,t,0)??il)===is)return;let i=this._$AH,r=e===il&&i!==il||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==il&&(i===il||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class iw{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ip(this,e)}}let ix=tW.litHtmlPolyfillSupport;ix?.(ih,im),(tW.litHtmlVersions??=[]).push("3.1.2");let ik=(e,t,i)=>{let r=i?.renderBefore??t,o=r._$litPart$;if(void 0===o){let e=i?.renderBefore??null;r._$litPart$=o=new im(t.insertBefore(t0(),e),e,void 0,i??{})}return o._$AI(e),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class i$ extends tH{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ik(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return is}}i$._$litElement$=!0,i$.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:i$});let iC=globalThis.litElementPolyfillSupport;iC?.({LitElement:i$}),(globalThis.litElementVersions??=[]).push("4.0.4");var iA=tE`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,iS=tE`
  ${iA}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;function iE(e,t){let i=tb({waitUntilFirstUpdate:!1},t);return(t,r)=>{let{update:o}=t,n=Array.isArray(e)?e:[e];t.update=function(e){n.forEach(t=>{if(e.has(t)){let o=e.get(t),n=this[t];o!==n&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[r](o,n)}}),o.call(this,e)}}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let iT={attribute:!0,type:String,converter:tU,reflect:!1,hasChanged:tq},iz=(e=iT,t,i)=>{let{kind:r,metadata:o}=i,n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),n.set(i.name,e),"accessor"===r){let{name:r}=i;return{set(i){let o=t.get.call(this);t.set.call(this,i),this.requestUpdate(r,o,e)},init(t){return void 0!==t&&this.P(r,void 0,e),t}}}if("setter"===r){let{name:r}=i;return function(i){let o=this[r];t.call(this,i),this.requestUpdate(r,o,e)}}throw Error("Unsupported decorator location: "+r)};function iO(e){return(t,i)=>"object"==typeof i?iz(e,t,i):((e,t,i)=>{let r=t.hasOwnProperty(i);return t.constructor.createProperty(i,r?{...e,wrapped:!0}:e),r?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function iP(e){return iO({...e,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let iL=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function iI(e,t){return(i,r,o)=>{let n=t=>t.renderRoot?.querySelector(e)??null;if(t){let{get:e,set:t}="object"==typeof r?i:o??(()=>{let e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return iL(i,r,{get(){let i=e.call(this);return void 0===i&&(null!==(i=n(this))||this.hasUpdated)&&t.call(this,i),i}})}return iL(i,r,{get(){return n(this)}})}}var iN=class extends i${constructor(){super(),Object.entries(this.constructor.dependencies).forEach(([e,t])=>{this.constructor.define(e,t)})}emit(e,t){let i=new CustomEvent(e,tb({bubbles:!0,cancelable:!1,composed:!0,detail:{}},t));return this.dispatchEvent(i),i}static define(e,t=this,i={}){let r=customElements.get(e);if(!r){customElements.define(e,class extends t{},i);return}let o=" (unknown version)",n=o;"version"in t&&t.version&&(o=" v"+t.version),"version"in r&&r.version&&(n=" v"+r.version),o&&n&&o===n||console.warn(`Attempted to register <${e}>${o}, but <${e}>${n} has already been registered.`)}};iN.version="2.13.1",iN.dependencies={},tg([iO()],iN.prototype,"dir",2),tg([iO()],iN.prototype,"lang",2);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let{I:iM}={P:tG,A:tY,C:tZ,M:1,L:id,R:ib,D:t5,V:ip,I:im,H:ig,N:iy,U:i_,B:iv,F:iw},iR=(e,t)=>void 0===t?void 0!==e?._$litType$:e?._$litType$===t,iB=e=>void 0===e.strings,iD={},iF=(e,t=iD)=>e._$AH=t;var ij=Symbol(),iU=Symbol(),iq=new Map,iV=class extends iN{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(e,t){var i;let r;if(null==t?void 0:t.spriteSheet)return ir`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`;try{if(!(r=await fetch(e,{mode:"cors"})).ok)return 410===r.status?ij:iU}catch(e){return iU}try{let e=document.createElement("div");e.innerHTML=await r.text();let t=e.firstElementChild;if((null==(i=null==t?void 0:t.tagName)?void 0:i.toLowerCase())!=="svg")return ij;te||(te=new DOMParser);let o=te.parseFromString(t.outerHTML,"text/html").body.querySelector("svg");if(!o)return ij;return o.part.add("svg"),document.adoptNode(o)}catch(e){return ij}}connectedCallback(){super.connectedCallback(),t_.push(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){var e;super.disconnectedCallback(),e=this,t_=t_.filter(t=>t!==e)}getIconSource(){let e=tw(this.library);return this.name&&e?{url:e.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var e;let{url:t,fromLibrary:i}=this.getIconSource(),r=i?tw(this.library):void 0;if(!t){this.svg=null;return}let o=iq.get(t);if(o||(o=this.resolveIcon(t,r),iq.set(t,o)),!this.initialRender)return;let n=await o;if(n===iU&&iq.delete(t),t===this.getIconSource().url){if(iR(n)){this.svg=n;return}switch(n){case iU:case ij:this.svg=null,this.emit("sl-error");break;default:this.svg=n.cloneNode(!0),null==(e=null==r?void 0:r.mutator)||e.call(r,this.svg),this.emit("sl-load")}}}render(){return this.svg}};iV.styles=iS,tg([iP()],iV.prototype,"svg",2),tg([iO({reflect:!0})],iV.prototype,"name",2),tg([iO()],iV.prototype,"src",2),tg([iO()],iV.prototype,"label",2),tg([iO({reflect:!0})],iV.prototype,"library",2),tg([iE("label")],iV.prototype,"handleLabelChange",1),tg([iE(["name","src","library"])],iV.prototype,"setIcon",1),iV.define("sl-icon");var iH=tE`
  ${iA}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`;let iW=new Set,iK=new MutationObserver(iQ),iJ=new Map,iG=document.documentElement.dir||"ltr",iY=document.documentElement.lang||navigator.language;function iZ(...t){t.map(t=>{let i=t.$code.toLowerCase();iJ.has(i)?iJ.set(i,Object.assign(Object.assign({},iJ.get(i)),t)):iJ.set(i,t),e||(e=t)}),iQ()}function iQ(){iG=document.documentElement.dir||"ltr",iY=document.documentElement.lang||navigator.language,[...iW.keys()].map(e=>{"function"==typeof e.requestUpdate&&e.requestUpdate()})}iK.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]});class iX{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){iW.add(this.host)}hostDisconnected(){iW.delete(this.host)}dir(){return`${this.host.dir||iG}`.toLowerCase()}lang(){return`${this.host.lang||iY}`.toLowerCase()}getTranslationData(e){var t,i;let r=new Intl.Locale(e.replace(/_/g,"-")),o=null==r?void 0:r.language.toLowerCase(),n=null!==(i=null===(t=null==r?void 0:r.region)||void 0===t?void 0:t.toLowerCase())&&void 0!==i?i:"",s=iJ.get(`${o}-${n}`),l=iJ.get(o);return{locale:r,language:o,region:n,primary:s,secondary:l}}exists(t,i){var r;let{primary:o,secondary:n}=this.getTranslationData(null!==(r=i.lang)&&void 0!==r?r:this.lang());return i=Object.assign({includeFallback:!1},i),!!o&&!!o[t]||!!n&&!!n[t]||!!i.includeFallback&&!!e&&!!e[t]}term(t,...i){let r;let{primary:o,secondary:n}=this.getTranslationData(this.lang());if(o&&o[t])r=o[t];else if(n&&n[t])r=n[t];else{if(!e||!e[t])return console.error(`No translation found for: ${String(t)}`),String(t);r=e[t]}return"function"==typeof r?r(...i):r}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return isNaN(e=Number(e))?"":new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,t)}}var i0={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>0===e?"No options selected":1===e?"1 option selected":`${e} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format"};iZ(i0);var i1=class extends iX{};iZ(i0);var i2=class extends iN{constructor(){super(...arguments),this.localize=new i1(this)}render(){return ir`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};i2.styles=iH;var i5=new WeakMap,i3=new WeakMap,i6=new WeakMap,i4=new WeakSet,i8=new WeakMap,i7=class{constructor(e,t){this.handleFormData=e=>{let t=this.options.disabled(this.host),i=this.options.name(this.host),r=this.options.value(this.host),o="sl-button"===this.host.tagName.toLowerCase();this.host.isConnected&&!t&&!o&&"string"==typeof i&&i.length>0&&void 0!==r&&(Array.isArray(r)?r.forEach(t=>{e.formData.append(i,t.toString())}):e.formData.append(i,r.toString()))},this.handleFormSubmit=e=>{var t;let i=this.options.disabled(this.host),r=this.options.reportValidity;this.form&&!this.form.noValidate&&(null==(t=i5.get(this.form))||t.forEach(e=>{this.setUserInteracted(e,!0)})),!this.form||this.form.noValidate||i||r(this.host)||(e.preventDefault(),e.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),i8.set(this.host,[])},this.handleInteraction=e=>{let t=i8.get(this.host);t.includes(e.type)||t.push(e.type),t.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){for(let e of this.form.querySelectorAll("*"))if("function"==typeof e.checkValidity&&!e.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){for(let e of this.form.querySelectorAll("*"))if("function"==typeof e.reportValidity&&!e.reportValidity())return!1}return!0},(this.host=e).addController(this),this.options=tb({form:e=>{let t=e.form;if(t){let i=e.getRootNode().getElementById(t);if(i)return i}return e.closest("form")},name:e=>e.name,value:e=>e.value,defaultValue:e=>e.defaultValue,disabled:e=>{var t;return null!=(t=e.disabled)&&t},reportValidity:e=>"function"!=typeof e.reportValidity||e.reportValidity(),checkValidity:e=>"function"!=typeof e.checkValidity||e.checkValidity(),setValue:(e,t)=>e.value=t,assumeInteractionOn:["sl-input"]},t)}hostConnected(){let e=this.options.form(this.host);e&&this.attachForm(e),i8.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),i8.delete(this.host),this.options.assumeInteractionOn.forEach(e=>{this.host.removeEventListener(e,this.handleInteraction)})}hostUpdated(){let e=this.options.form(this.host);e||this.detachForm(),e&&this.form!==e&&(this.detachForm(),this.attachForm(e)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(e){e?(this.form=e,i5.has(this.form)?i5.get(this.form).add(this.host):i5.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),i3.has(this.form)||(i3.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),i6.has(this.form)||(i6.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;let e=i5.get(this.form);e&&(e.delete(this.host),e.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),i3.has(this.form)&&(this.form.reportValidity=i3.get(this.form),i3.delete(this.form)),i6.has(this.form)&&(this.form.checkValidity=i6.get(this.form),i6.delete(this.form)),this.form=void 0))}setUserInteracted(e,t){t?i4.add(e):i4.delete(e),e.requestUpdate()}doAction(e,t){if(this.form){let i=document.createElement("button");i.type=e,i.style.position="absolute",i.style.width="0",i.style.height="0",i.style.clipPath="inset(50%)",i.style.overflow="hidden",i.style.whiteSpace="nowrap",t&&(i.name=t.name,i.value=t.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(e=>{t.hasAttribute(e)&&i.setAttribute(e,t.getAttribute(e))})),this.form.append(i),i.click(),i.remove()}}getForm(){var e;return null!=(e=this.form)?e:null}reset(e){this.doAction("reset",e)}submit(e){this.doAction("submit",e)}setValidity(e){let t=this.host,i=!!i4.has(t),r=!!t.required;t.toggleAttribute("data-required",r),t.toggleAttribute("data-optional",!r),t.toggleAttribute("data-invalid",!e),t.toggleAttribute("data-valid",e),t.toggleAttribute("data-user-invalid",!e&&i),t.toggleAttribute("data-user-valid",e&&i)}updateValidity(){let e=this.host;this.setValidity(e.validity.valid)}emitInvalidEvent(e){let t=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});e||t.preventDefault(),this.host.dispatchEvent(t)||null==e||e.preventDefault()}},i9=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(tm(tb({},i9),{valid:!1,valueMissing:!0})),Object.freeze(tm(tb({},i9),{valid:!1,customError:!0}));var re=tE`
  ${iA}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      .sl-button-group__button:not(
          .sl-button-group__button--first,
          .sl-button-group__button--radio,
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host(.sl-button-group__button--focus),
  :host(.sl-button-group__button[checked]) {
    z-index: 2;
  }
`,rt=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=e=>{let t=e.target;(this.slotNames.includes("[default]")&&!t.name||t.name&&this.slotNames.includes(t.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return[...this.host.childNodes].some(e=>{if(e.nodeType===e.TEXT_NODE&&""!==e.textContent.trim())return!0;if(e.nodeType===e.ELEMENT_NODE){if("sl-visually-hidden"===e.tagName.toLowerCase())return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(e){return null!==this.host.querySelector(`:scope > [slot="${e}"]`)}test(e){return"[default]"===e?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ri={ATTRIBUTE:1,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},rr=e=>(...t)=>({_$litDirective$:e,values:t});class ro{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let rn=rr(class extends ro{constructor(e){if(super(e),e.type!==ri.ATTRIBUTE||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){for(let i in this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e))),t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}let i=e.element.classList;for(let e of this.st)e in t||(i.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return is}}),rs=Symbol.for(""),rl=e=>{if(e?.r===rs)return e?._$litStatic$},ra=(e,...t)=>({_$litStatic$:t.reduce((t,i,r)=>t+(e=>{if(void 0!==e._$litStatic$)return e._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${e}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+e[r+1],e[0]),r:rs}),rc=new Map,ru=e=>(t,...i)=>{let r,o;let n=i.length,s=[],l=[],a,c=0,u=!1;for(;c<n;){for(a=t[c];c<n&&void 0!==(r=rl(o=i[c]));)a+=r+t[++c],u=!0;c!==n&&l.push(o),s.push(a),c++}if(c===n&&s.push(t[n]),u){let e=s.join("$$lit$$");void 0===(t=rc.get(e))&&(s.raw=s,rc.set(e,t=s)),i=l}return e(t,...i)},rd=ru(ir);ru(io);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let rh=e=>e??il;var rp=class extends iN{constructor(){super(...arguments),this.formControlController=new i7(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new rt(this,"[default]","prefix","suffix"),this.localize=new i1(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:i9}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){"submit"===this.type&&this.formControlController.submit(this),"reset"===this.type&&this.formControlController.reset(this)}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}checkValidity(){return!this.isButton()||this.button.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return!this.isButton()||this.button.reportValidity()}setCustomValidity(e){this.isButton()&&(this.button.setCustomValidity(e),this.formControlController.updateValidity())}render(){let e=this.isLink(),t=e?ra`a`:ra`button`;return rd`
      <${t}
        part="base"
        class=${rn({button:!0,"button--default":"default"===this.variant,"button--primary":"primary"===this.variant,"button--success":"success"===this.variant,"button--neutral":"neutral"===this.variant,"button--warning":"warning"===this.variant,"button--danger":"danger"===this.variant,"button--text":"text"===this.variant,"button--small":"small"===this.size,"button--medium":"medium"===this.size,"button--large":"large"===this.size,"button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":"rtl"===this.localize.dir(),"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${rh(e?void 0:this.disabled)}
        type=${rh(e?void 0:this.type)}
        title=${this.title}
        name=${rh(e?void 0:this.name)}
        value=${rh(e?void 0:this.value)}
        href=${rh(e?this.href:void 0)}
        target=${rh(e?this.target:void 0)}
        download=${rh(e?this.download:void 0)}
        rel=${rh(e?this.rel:void 0)}
        role=${rh(e?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?rd` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?rd`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${t}>
    `}};rp.styles=re,rp.dependencies={"sl-icon":iV,"sl-spinner":i2},tg([iI(".button")],rp.prototype,"button",2),tg([iP()],rp.prototype,"hasFocus",2),tg([iP()],rp.prototype,"invalid",2),tg([iO()],rp.prototype,"title",2),tg([iO({reflect:!0})],rp.prototype,"variant",2),tg([iO({reflect:!0})],rp.prototype,"size",2),tg([iO({type:Boolean,reflect:!0})],rp.prototype,"caret",2),tg([iO({type:Boolean,reflect:!0})],rp.prototype,"disabled",2),tg([iO({type:Boolean,reflect:!0})],rp.prototype,"loading",2),tg([iO({type:Boolean,reflect:!0})],rp.prototype,"outline",2),tg([iO({type:Boolean,reflect:!0})],rp.prototype,"pill",2),tg([iO({type:Boolean,reflect:!0})],rp.prototype,"circle",2),tg([iO()],rp.prototype,"type",2),tg([iO()],rp.prototype,"name",2),tg([iO()],rp.prototype,"value",2),tg([iO()],rp.prototype,"href",2),tg([iO()],rp.prototype,"target",2),tg([iO()],rp.prototype,"rel",2),tg([iO()],rp.prototype,"download",2),tg([iO()],rp.prototype,"form",2),tg([iO({attribute:"formaction"})],rp.prototype,"formAction",2),tg([iO({attribute:"formenctype"})],rp.prototype,"formEnctype",2),tg([iO({attribute:"formmethod"})],rp.prototype,"formMethod",2),tg([iO({attribute:"formnovalidate",type:Boolean})],rp.prototype,"formNoValidate",2),tg([iO({attribute:"formtarget"})],rp.prototype,"formTarget",2),tg([iE("disabled",{waitUntilFirstUpdate:!0})],rp.prototype,"handleDisabledChange",1),rp.define("sl-button");var rf=tE`
  ${iA}

  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`,rb=class extends iN{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}click(){this.button.click()}focus(e){this.button.focus(e)}blur(){this.button.blur()}render(){let e=!!this.href,t=e?ra`a`:ra`button`;return rd`
      <${t}
        part="base"
        class=${rn({"icon-button":!0,"icon-button--disabled":!e&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${rh(e?void 0:this.disabled)}
        type=${rh(e?void 0:"button")}
        href=${rh(e?this.href:void 0)}
        target=${rh(e?this.target:void 0)}
        download=${rh(e?this.download:void 0)}
        rel=${rh(e&&this.target?"noreferrer noopener":void 0)}
        role=${rh(e?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${rh(this.name)}
          library=${rh(this.library)}
          src=${rh(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${t}>
    `}};rb.styles=rf,rb.dependencies={"sl-icon":iV},tg([iI(".icon-button")],rb.prototype,"button",2),tg([iP()],rb.prototype,"hasFocus",2),tg([iO()],rb.prototype,"name",2),tg([iO()],rb.prototype,"library",2),tg([iO()],rb.prototype,"src",2),tg([iO()],rb.prototype,"href",2),tg([iO()],rb.prototype,"target",2),tg([iO()],rb.prototype,"download",2),tg([iO()],rb.prototype,"label",2),tg([iO({type:Boolean,reflect:!0})],rb.prototype,"disabled",2),rb.define("sl-icon-button");var rm=tE`
  ${iA}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
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

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,rg=tE`
  ${iA}

  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
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
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
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
`;let rv=Math.min,ry=Math.max,r_=Math.round,rw=Math.floor,rx=e=>({x:e,y:e}),rk={left:"right",right:"left",bottom:"top",top:"bottom"},r$={start:"end",end:"start"};function rC(e,t){return"function"==typeof e?e(t):e}function rA(e){return e.split("-")[0]}function rS(e){return e.split("-")[1]}function rE(e){return"x"===e?"y":"x"}function rT(e){return"y"===e?"height":"width"}function rz(e){return["top","bottom"].includes(rA(e))?"y":"x"}function rO(e){return e.replace(/start|end/g,e=>r$[e])}function rP(e){return e.replace(/left|right|bottom|top/g,e=>rk[e])}function rL(e){return"number"!=typeof e?{top:0,right:0,bottom:0,left:0,...e}:{top:e,right:e,bottom:e,left:e}}function rI(e){return{...e,top:e.y,left:e.x,right:e.x+e.width,bottom:e.y+e.height}}function rN(e,t,i){let r,{reference:o,floating:n}=e,s=rz(t),l=rE(rz(t)),a=rT(l),c=rA(t),u="y"===s,d=o.x+o.width/2-n.width/2,h=o.y+o.height/2-n.height/2,p=o[a]/2-n[a]/2;switch(c){case"top":r={x:d,y:o.y-n.height};break;case"bottom":r={x:d,y:o.y+o.height};break;case"right":r={x:o.x+o.width,y:h};break;case"left":r={x:o.x-n.width,y:h};break;default:r={x:o.x,y:o.y}}switch(rS(t)){case"start":r[l]-=p*(i&&u?-1:1);break;case"end":r[l]+=p*(i&&u?-1:1)}return r}let rM=async(e,t,i)=>{let{placement:r="bottom",strategy:o="absolute",middleware:n=[],platform:s}=i,l=n.filter(Boolean),a=await (null==s.isRTL?void 0:s.isRTL(t)),c=await s.getElementRects({reference:e,floating:t,strategy:o}),{x:u,y:d}=rN(c,r,a),h=r,p={},f=0;for(let i=0;i<l.length;i++){let{name:n,fn:b}=l[i],{x:m,y:g,data:v,reset:y}=await b({x:u,y:d,initialPlacement:r,placement:h,strategy:o,middlewareData:p,rects:c,platform:s,elements:{reference:e,floating:t}});u=null!=m?m:u,d=null!=g?g:d,p={...p,[n]:{...p[n],...v}},y&&f<=50&&(f++,"object"==typeof y&&(y.placement&&(h=y.placement),y.rects&&(c=!0===y.rects?await s.getElementRects({reference:e,floating:t,strategy:o}):y.rects),{x:u,y:d}=rN(c,h,a)),i=-1)}return{x:u,y:d,placement:h,strategy:o,middlewareData:p}};async function rR(e,t){var i;void 0===t&&(t={});let{x:r,y:o,platform:n,rects:s,elements:l,strategy:a}=e,{boundary:c="clippingAncestors",rootBoundary:u="viewport",elementContext:d="floating",altBoundary:h=!1,padding:p=0}=rC(t,e),f=rL(p),b=l[h?"floating"===d?"reference":"floating":d],m=rI(await n.getClippingRect({element:null==(i=await (null==n.isElement?void 0:n.isElement(b)))||i?b:b.contextElement||await (null==n.getDocumentElement?void 0:n.getDocumentElement(l.floating)),boundary:c,rootBoundary:u,strategy:a})),g="floating"===d?{...s.floating,x:r,y:o}:s.reference,v=await (null==n.getOffsetParent?void 0:n.getOffsetParent(l.floating)),y=await (null==n.isElement?void 0:n.isElement(v))&&await (null==n.getScale?void 0:n.getScale(v))||{x:1,y:1},_=rI(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:g,offsetParent:v,strategy:a}):g);return{top:(m.top-_.top+f.top)/y.y,bottom:(_.bottom-m.bottom+f.bottom)/y.y,left:(m.left-_.left+f.left)/y.x,right:(_.right-m.right+f.right)/y.x}}async function rB(e,t){let{placement:i,platform:r,elements:o}=e,n=await (null==r.isRTL?void 0:r.isRTL(o.floating)),s=rA(i),l=rS(i),a="y"===rz(i),c=["left","top"].includes(s)?-1:1,u=n&&a?-1:1,d=rC(t,e),{mainAxis:h,crossAxis:p,alignmentAxis:f}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...d};return l&&"number"==typeof f&&(p="end"===l?-1*f:f),a?{x:p*u,y:h*c}:{x:h*c,y:p*u}}function rD(e){return rU(e)?(e.nodeName||"").toLowerCase():"#document"}function rF(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function rj(e){var t;return null==(t=(rU(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function rU(e){return e instanceof Node||e instanceof rF(e).Node}function rq(e){return e instanceof Element||e instanceof rF(e).Element}function rV(e){return e instanceof HTMLElement||e instanceof rF(e).HTMLElement}function rH(e){return"undefined"!=typeof ShadowRoot&&(e instanceof ShadowRoot||e instanceof rF(e).ShadowRoot)}function rW(e){let{overflow:t,overflowX:i,overflowY:r,display:o}=rY(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+i)&&!["inline","contents"].includes(o)}function rK(e){let t=rJ(),i=rY(e);return"none"!==i.transform||"none"!==i.perspective||!!i.containerType&&"normal"!==i.containerType||!t&&!!i.backdropFilter&&"none"!==i.backdropFilter||!t&&!!i.filter&&"none"!==i.filter||["transform","perspective","filter"].some(e=>(i.willChange||"").includes(e))||["paint","layout","strict","content"].some(e=>(i.contain||"").includes(e))}function rJ(){return"undefined"!=typeof CSS&&!!CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")}function rG(e){return["html","body","#document"].includes(rD(e))}function rY(e){return rF(e).getComputedStyle(e)}function rZ(e){return rq(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function rQ(e){if("html"===rD(e))return e;let t=e.assignedSlot||e.parentNode||rH(e)&&e.host||rj(e);return rH(t)?t.host:t}function rX(e,t,i){var r;void 0===t&&(t=[]),void 0===i&&(i=!0);let o=function e(t){let i=rQ(t);return rG(i)?t.ownerDocument?t.ownerDocument.body:t.body:rV(i)&&rW(i)?i:e(i)}(e),n=o===(null==(r=e.ownerDocument)?void 0:r.body),s=rF(o);return n?t.concat(s,s.visualViewport||[],rW(o)?o:[],s.frameElement&&i?rX(s.frameElement):[]):t.concat(o,rX(o,[],i))}function r0(e){let t=rY(e),i=parseFloat(t.width)||0,r=parseFloat(t.height)||0,o=rV(e),n=o?e.offsetWidth:i,s=o?e.offsetHeight:r,l=r_(i)!==n||r_(r)!==s;return l&&(i=n,r=s),{width:i,height:r,$:l}}function r1(e){return rq(e)?e:e.contextElement}function r2(e){let t=r1(e);if(!rV(t))return rx(1);let i=t.getBoundingClientRect(),{width:r,height:o,$:n}=r0(t),s=(n?r_(i.width):i.width)/r,l=(n?r_(i.height):i.height)/o;return s&&Number.isFinite(s)||(s=1),l&&Number.isFinite(l)||(l=1),{x:s,y:l}}let r5=rx(0);function r3(e){let t=rF(e);return rJ()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:r5}function r6(e,t,i,r){var o;void 0===t&&(t=!1),void 0===i&&(i=!1);let n=e.getBoundingClientRect(),s=r1(e),l=rx(1);t&&(r?rq(r)&&(l=r2(r)):l=r2(e));let a=(void 0===(o=i)&&(o=!1),r&&(!o||r===rF(s))&&o)?r3(s):rx(0),c=(n.left+a.x)/l.x,u=(n.top+a.y)/l.y,d=n.width/l.x,h=n.height/l.y;if(s){let e=rF(s),t=r&&rq(r)?rF(r):r,i=e,o=i.frameElement;for(;o&&r&&t!==i;){let e=r2(o),t=o.getBoundingClientRect(),r=rY(o),n=t.left+(o.clientLeft+parseFloat(r.paddingLeft))*e.x,s=t.top+(o.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,u*=e.y,d*=e.x,h*=e.y,c+=n,u+=s,o=(i=rF(o)).frameElement}}return rI({width:d,height:h,x:c,y:u})}let r4=[":popover-open",":modal"];function r8(e){return r4.some(t=>{try{return e.matches(t)}catch(e){return!1}})}function r7(e){return r6(rj(e)).left+rZ(e).scrollLeft}function r9(e,t,i){let r;if("viewport"===t)r=function(e,t){let i=rF(e),r=rj(e),o=i.visualViewport,n=r.clientWidth,s=r.clientHeight,l=0,a=0;if(o){n=o.width,s=o.height;let e=rJ();(!e||e&&"fixed"===t)&&(l=o.offsetLeft,a=o.offsetTop)}return{width:n,height:s,x:l,y:a}}(e,i);else if("document"===t)r=function(e){let t=rj(e),i=rZ(e),r=e.ownerDocument.body,o=ry(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),n=ry(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),s=-i.scrollLeft+r7(e),l=-i.scrollTop;return"rtl"===rY(r).direction&&(s+=ry(t.clientWidth,r.clientWidth)-o),{width:o,height:n,x:s,y:l}}(rj(e));else if(rq(t))r=function(e,t){let i=r6(e,!0,"fixed"===t),r=i.top+e.clientTop,o=i.left+e.clientLeft,n=rV(e)?r2(e):rx(1),s=e.clientWidth*n.x;return{width:s,height:e.clientHeight*n.y,x:o*n.x,y:r*n.y}}(t,i);else{let i=r3(e);r={...t,x:t.x-i.x,y:t.y-i.y}}return rI(r)}function oe(e,t){return rV(e)&&"fixed"!==rY(e).position?t?t(e):e.offsetParent:null}function ot(e,t){let i=rF(e);if(!rV(e)||r8(e))return i;let r=oe(e,t);for(;r&&["table","td","th"].includes(rD(r))&&"static"===rY(r).position;)r=oe(r,t);return r&&("html"===rD(r)||"body"===rD(r)&&"static"===rY(r).position&&!rK(r))?i:r||function(e){let t=rQ(e);for(;rV(t)&&!rG(t);){if(rK(t))return t;t=rQ(t)}return null}(e)||i}let oi=async function(e){let t=this.getOffsetParent||ot,i=this.getDimensions;return{reference:function(e,t,i){let r=rV(t),o=rj(t),n="fixed"===i,s=r6(e,!0,n,t),l={scrollLeft:0,scrollTop:0},a=rx(0);if(r||!r&&!n){if(("body"!==rD(t)||rW(o))&&(l=rZ(t)),r){let e=r6(t,!0,n,t);a.x=e.x+t.clientLeft,a.y=e.y+t.clientTop}else o&&(a.x=r7(o))}return{x:s.left+l.scrollLeft-a.x,y:s.top+l.scrollTop-a.y,width:s.width,height:s.height}}(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,...await i(e.floating)}}},or={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:i,offsetParent:r,strategy:o}=e,n="fixed"===o,s=rj(r),l=!!t&&r8(t.floating);if(r===s||l&&n)return i;let a={scrollLeft:0,scrollTop:0},c=rx(1),u=rx(0),d=rV(r);if((d||!d&&!n)&&(("body"!==rD(r)||rW(s))&&(a=rZ(r)),rV(r))){let e=r6(r);c=r2(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}return{width:i.width*c.x,height:i.height*c.y,x:i.x*c.x-a.scrollLeft*c.x+u.x,y:i.y*c.y-a.scrollTop*c.y+u.y}},getDocumentElement:rj,getClippingRect:function(e){let{element:t,boundary:i,rootBoundary:r,strategy:o}=e,n=[..."clippingAncestors"===i?function(e,t){let i=t.get(e);if(i)return i;let r=rX(e,[],!1).filter(e=>rq(e)&&"body"!==rD(e)),o=null,n="fixed"===rY(e).position,s=n?rQ(e):e;for(;rq(s)&&!rG(s);){let t=rY(s),i=rK(s);i||"fixed"!==t.position||(o=null),(n?!i&&!o:!i&&"static"===t.position&&!!o&&["absolute","fixed"].includes(o.position)||rW(s)&&!i&&function e(t,i){let r=rQ(t);return!(r===i||!rq(r)||rG(r))&&("fixed"===rY(r).position||e(r,i))}(e,s))?r=r.filter(e=>e!==s):o=t,s=rQ(s)}return t.set(e,r),r}(t,this._c):[].concat(i),r],s=n[0],l=n.reduce((e,i)=>{let r=r9(t,i,o);return e.top=ry(r.top,e.top),e.right=rv(r.right,e.right),e.bottom=rv(r.bottom,e.bottom),e.left=ry(r.left,e.left),e},r9(t,s,o));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}},getOffsetParent:ot,getElementRects:oi,getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){let{width:t,height:i}=r0(e);return{width:t,height:i}},getScale:r2,isElement:rq,isRTL:function(e){return"rtl"===rY(e).direction}},oo=function(e){return void 0===e&&(e={}),{name:"size",options:e,async fn(t){let i,r;let{placement:o,rects:n,platform:s,elements:l}=t,{apply:a=()=>{},...c}=rC(e,t),u=await rR(t,c),d=rA(o),h=rS(o),p="y"===rz(o),{width:f,height:b}=n.floating;"top"===d||"bottom"===d?(i=d,r=h===(await (null==s.isRTL?void 0:s.isRTL(l.floating))?"start":"end")?"left":"right"):(r=d,i="end"===h?"top":"bottom");let m=b-u[i],g=f-u[r],v=!t.middlewareData.shift,y=m,_=g;if(p){let e=f-u.left-u.right;_=h||v?rv(g,e):e}else{let e=b-u.top-u.bottom;y=h||v?rv(m,e):e}if(v&&!h){let e=ry(u.left,0),t=ry(u.right,0),i=ry(u.top,0),r=ry(u.bottom,0);p?_=f-2*(0!==e||0!==t?e+t:ry(u.left,u.right)):y=b-2*(0!==i||0!==r?i+r:ry(u.top,u.bottom))}await a({...t,availableWidth:_,availableHeight:y});let w=await s.getDimensions(l.floating);return f!==w.width||b!==w.height?{reset:{rects:!0}}:{}}}},on=e=>({name:"arrow",options:e,async fn(t){let{x:i,y:r,placement:o,rects:n,platform:s,elements:l,middlewareData:a}=t,{element:c,padding:u=0}=rC(e,t)||{};if(null==c)return{};let d=rL(u),h={x:i,y:r},p=rE(rz(o)),f=rT(p),b=await s.getDimensions(c),m="y"===p,g=m?"clientHeight":"clientWidth",v=n.reference[f]+n.reference[p]-h[p]-n.floating[f],y=h[p]-n.reference[p],_=await (null==s.getOffsetParent?void 0:s.getOffsetParent(c)),w=_?_[g]:0;w&&await (null==s.isElement?void 0:s.isElement(_))||(w=l.floating[g]||n.floating[f]);let x=w/2-b[f]/2-1,k=rv(d[m?"top":"left"],x),$=rv(d[m?"bottom":"right"],x),C=w-b[f]-$,A=w/2-b[f]/2+(v/2-y/2),S=ry(k,rv(A,C)),E=!a.arrow&&null!=rS(o)&&A!==S&&n.reference[f]/2-(A<k?k:$)-b[f]/2<0,T=E?A<k?A-k:A-C:0;return{[p]:h[p]+T,data:{[p]:S,centerOffset:A-S-T,...E&&{alignmentOffset:T}},reset:E}}}),os=(e,t,i)=>{let r=new Map,o={platform:or,...i},n={...o.platform,_c:r};return rM(e,t,{...o,platform:n})};function ol(e){return function(e){for(let t=e;t;t=oa(t))if(t instanceof Element&&"none"===getComputedStyle(t).display)return null;for(let t=oa(e);t;t=oa(t)){if(!(t instanceof Element))continue;let e=getComputedStyle(t);if("contents"!==e.display&&("static"!==e.position||"none"!==e.filter||"BODY"===t.tagName))return t}return null}(e)}function oa(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}var oc=class extends iN{constructor(){super(...arguments),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom"),r=0,o=0,n=0,s=0,l=0,a=0,c=0,u=0;i?e.top<t.top?(r=e.left,o=e.bottom,n=e.right,s=e.bottom,l=t.left,a=t.top,c=t.right,u=t.top):(r=t.left,o=t.bottom,n=t.right,s=t.bottom,l=e.left,a=e.top,c=e.right,u=e.top):e.left<t.left?(r=e.right,o=e.top,n=t.left,s=t.top,l=e.right,a=e.bottom,c=t.left,u=t.bottom):(r=t.right,o=t.top,n=e.left,s=e.top,l=t.right,a=t.bottom,c=e.left,u=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${o}px`),this.style.setProperty("--hover-bridge-top-right-x",`${n}px`),this.style.setProperty("--hover-bridge-top-right-y",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else{var e;this.anchor instanceof Element||null!==(e=this.anchor)&&"object"==typeof e&&"getBoundingClientRect"in e?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]')}this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&(this.cleanup=function(e,t,i,r){let o;void 0===r&&(r={});let{ancestorScroll:n=!0,ancestorResize:s=!0,elementResize:l="function"==typeof ResizeObserver,layoutShift:a="function"==typeof IntersectionObserver,animationFrame:c=!1}=r,u=r1(e),d=n||s?[...u?rX(u):[],...rX(t)]:[];d.forEach(e=>{n&&e.addEventListener("scroll",i,{passive:!0}),s&&e.addEventListener("resize",i)});let h=u&&a?function(e,t){let i,r=null,o=rj(e);function n(){var e;clearTimeout(i),null==(e=r)||e.disconnect(),r=null}return!function s(l,a){void 0===l&&(l=!1),void 0===a&&(a=1),n();let{left:c,top:u,width:d,height:h}=e.getBoundingClientRect();if(l||t(),!d||!h)return;let p=rw(u),f=rw(o.clientWidth-(c+d)),b={rootMargin:-p+"px "+-f+"px "+-rw(o.clientHeight-(u+h))+"px "+-rw(c)+"px",threshold:ry(0,rv(1,a))||1},m=!0;function g(e){let t=e[0].intersectionRatio;if(t!==a){if(!m)return s();t?s(!1,t):i=setTimeout(()=>{s(!1,1e-7)},100)}m=!1}try{r=new IntersectionObserver(g,{...b,root:o.ownerDocument})}catch(e){r=new IntersectionObserver(g,b)}r.observe(e)}(!0),n}(u,i):null,p=-1,f=null;l&&(f=new ResizeObserver(e=>{let[r]=e;r&&r.target===u&&f&&(f.unobserve(t),cancelAnimationFrame(p),p=requestAnimationFrame(()=>{var e;null==(e=f)||e.observe(t)})),i()}),u&&!c&&f.observe(u),f.observe(t));let b=c?r6(e):null;return c&&function t(){let r=r6(e);b&&(r.x!==b.x||r.y!==b.y||r.width!==b.width||r.height!==b.height)&&i(),b=r,o=requestAnimationFrame(t)}(),i(),()=>{var e;d.forEach(e=>{n&&e.removeEventListener("scroll",i),s&&e.removeEventListener("resize",i)}),null==h||h(),null==(e=f)||e.disconnect(),f=null,c&&cancelAnimationFrame(o)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){var e,t,i;if(!this.active||!this.anchorEl)return;let r=[{name:"offset",options:e={mainAxis:this.distance,crossAxis:this.skidding},async fn(t){var i,r;let{x:o,y:n,placement:s,middlewareData:l}=t,a=await rB(t,e);return s===(null==(i=l.offset)?void 0:i.placement)&&null!=(r=l.arrow)&&r.alignmentOffset?{}:{x:o+a.x,y:n+a.y,data:{...a,placement:s}}}}];this.sync?r.push(oo({apply:({rects:e})=>{let t="width"===this.sync||"both"===this.sync,i="height"===this.sync||"both"===this.sync;this.popup.style.width=t?`${e.reference.width}px`:"",this.popup.style.height=i?`${e.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&r.push({name:"flip",options:t={boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(e){var i,r,o,n,s;let{placement:l,middlewareData:a,rects:c,initialPlacement:u,platform:d,elements:h}=e,{mainAxis:p=!0,crossAxis:f=!0,fallbackPlacements:b,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:v=!0,...y}=rC(t,e);if(null!=(i=a.arrow)&&i.alignmentOffset)return{};let _=rA(l),w=rA(u)===u,x=await (null==d.isRTL?void 0:d.isRTL(h.floating)),k=b||(w||!v?[rP(u)]:function(e){let t=rP(e);return[rO(e),t,rO(t)]}(u));b||"none"===g||k.push(...function(e,t,i,r){let o=rS(e),n=function(e,t,i){let r=["left","right"],o=["right","left"];switch(e){case"top":case"bottom":if(i)return t?o:r;return t?r:o;case"left":case"right":return t?["top","bottom"]:["bottom","top"];default:return[]}}(rA(e),"start"===i,r);return o&&(n=n.map(e=>e+"-"+o),t&&(n=n.concat(n.map(rO)))),n}(u,v,g,x));let $=[u,...k],C=await rR(e,y),A=[],S=(null==(r=a.flip)?void 0:r.overflows)||[];if(p&&A.push(C[_]),f){let e=function(e,t,i){void 0===i&&(i=!1);let r=rS(e),o=rE(rz(e)),n=rT(o),s="x"===o?r===(i?"end":"start")?"right":"left":"start"===r?"bottom":"top";return t.reference[n]>t.floating[n]&&(s=rP(s)),[s,rP(s)]}(l,c,x);A.push(C[e[0]],C[e[1]])}if(S=[...S,{placement:l,overflows:A}],!A.every(e=>e<=0)){let e=((null==(o=a.flip)?void 0:o.index)||0)+1,t=$[e];if(t)return{data:{index:e,overflows:S},reset:{placement:t}};let i=null==(n=S.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0])?void 0:n.placement;if(!i)switch(m){case"bestFit":{let e=null==(s=S.map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0])?void 0:s[0];e&&(i=e);break}case"initialPlacement":i=u}if(l!==i)return{reset:{placement:i}}}return{}}}),this.shift&&r.push({name:"shift",options:i={boundary:this.shiftBoundary,padding:this.shiftPadding},async fn(e){let{x:t,y:r,placement:o}=e,{mainAxis:n=!0,crossAxis:s=!1,limiter:l={fn:e=>{let{x:t,y:i}=e;return{x:t,y:i}}},...a}=rC(i,e),c={x:t,y:r},u=await rR(e,a),d=rz(rA(o)),h=rE(d),p=c[h],f=c[d];if(n){let e="y"===h?"top":"left",t="y"===h?"bottom":"right",i=p+u[e],r=p-u[t];p=ry(i,rv(p,r))}if(s){let e="y"===d?"top":"left",t="y"===d?"bottom":"right",i=f+u[e],r=f-u[t];f=ry(i,rv(f,r))}let b=l.fn({...e,[h]:p,[d]:f});return{...b,data:{x:b.x-t,y:b.y-r}}}}),this.autoSize?r.push(oo({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:e,availableHeight:t})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${t}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${e}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&r.push(on({element:this.arrowEl,padding:this.arrowPadding}));let o="absolute"===this.strategy?e=>or.getOffsetParent(e,ol):or.getOffsetParent;os(this.anchorEl,this.popup,{placement:this.placement,middleware:r,strategy:this.strategy,platform:tm(tb({},or),{getOffsetParent:o})}).then(({x:e,y:t,middlewareData:i,placement:r})=>{let o="rtl"===getComputedStyle(this).direction,n={top:"bottom",right:"left",bottom:"top",left:"right"}[r.split("-")[0]];if(this.setAttribute("data-current-placement",r),Object.assign(this.popup.style,{left:`${e}px`,top:`${t}px`}),this.arrow){let e=i.arrow.x,t=i.arrow.y,r="",s="",l="",a="";if("start"===this.arrowPlacement){let i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";r="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",s=o?i:"",a=o?"":i}else if("end"===this.arrowPlacement){let i="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";s=o?"":i,a=o?i:"",l="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(a="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":"",r="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":""):(a="number"==typeof e?`${e}px`:"",r="number"==typeof t?`${t}px`:"");Object.assign(this.arrowEl.style,{top:r,right:s,bottom:l,left:a,[n]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return ir`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${rn({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${rn({popup:!0,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?ir`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};oc.styles=rg,tg([iI(".popup")],oc.prototype,"popup",2),tg([iI(".popup__arrow")],oc.prototype,"arrowEl",2),tg([iO()],oc.prototype,"anchor",2),tg([iO({type:Boolean,reflect:!0})],oc.prototype,"active",2),tg([iO({reflect:!0})],oc.prototype,"placement",2),tg([iO({reflect:!0})],oc.prototype,"strategy",2),tg([iO({type:Number})],oc.prototype,"distance",2),tg([iO({type:Number})],oc.prototype,"skidding",2),tg([iO({type:Boolean})],oc.prototype,"arrow",2),tg([iO({attribute:"arrow-placement"})],oc.prototype,"arrowPlacement",2),tg([iO({attribute:"arrow-padding",type:Number})],oc.prototype,"arrowPadding",2),tg([iO({type:Boolean})],oc.prototype,"flip",2),tg([iO({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(e=>e.trim()).filter(e=>""!==e),toAttribute:e=>e.join(" ")}})],oc.prototype,"flipFallbackPlacements",2),tg([iO({attribute:"flip-fallback-strategy"})],oc.prototype,"flipFallbackStrategy",2),tg([iO({type:Object})],oc.prototype,"flipBoundary",2),tg([iO({attribute:"flip-padding",type:Number})],oc.prototype,"flipPadding",2),tg([iO({type:Boolean})],oc.prototype,"shift",2),tg([iO({type:Object})],oc.prototype,"shiftBoundary",2),tg([iO({attribute:"shift-padding",type:Number})],oc.prototype,"shiftPadding",2),tg([iO({attribute:"auto-size"})],oc.prototype,"autoSize",2),tg([iO()],oc.prototype,"sync",2),tg([iO({type:Object})],oc.prototype,"autoSizeBoundary",2),tg([iO({attribute:"auto-size-padding",type:Number})],oc.prototype,"autoSizePadding",2),tg([iO({attribute:"hover-bridge",type:Boolean})],oc.prototype,"hoverBridge",2);var ou=new Map,od=new WeakMap;function oh(e,t){return"rtl"===t.toLowerCase()?{keyframes:e.rtlKeyframes||e.keyframes,options:e.options}:e}function op(e,t){ou.set(e,null!=t?t:{keyframes:[],options:{duration:0}})}function of(e,t,i){let r=od.get(e);if(null==r?void 0:r[t])return oh(r[t],i.dir);let o=ou.get(t);return o?oh(o,i.dir):{keyframes:[],options:{duration:0}}}function ob(e,t){return new Promise(i=>{e.addEventListener(t,function r(o){o.target===e&&(e.removeEventListener(t,r),i())})})}function om(e,t,i){return new Promise(r=>{if((null==i?void 0:i.duration)===1/0)throw Error("Promise-based animations must be finite.");let o=e.animate(t,tm(tb({},i),{duration:window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:i.duration}));o.addEventListener("cancel",r,{once:!0}),o.addEventListener("finish",r,{once:!0})})}function og(e){return(e=e.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(e):e.indexOf("s")>-1?1e3*parseFloat(e):parseFloat(e)}function ov(e){return Promise.all(e.getAnimations().map(e=>new Promise(t=>{e.cancel(),requestAnimationFrame(t)})))}function oy(e,t){return e.map(e=>tm(tb({},e),{height:"auto"===e.height?`${t}px`:e.height}))}var o_=class extends iN{constructor(){super(),this.localize=new i1(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=e=>{"Escape"===e.key&&(e.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){let e=og(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),e)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let e=og(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),e)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var e;null==(e=this.closeWatcher)||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(e){return this.trigger.split(" ").includes(e)}async handleOpenChange(){var e,t;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?(null==(e=this.closeWatcher)||e.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await ov(this.body),this.body.hidden=!1,this.popup.active=!0;let{keyframes:t,options:i}=of(this,"tooltip.show",{dir:this.localize.dir()});await om(this.popup.popup,t,i),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await ov(this.body);let{keyframes:e,options:i}=of(this,"tooltip.hide",{dir:this.localize.dir()});await om(this.popup.popup,e,i),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,ob(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,ob(this,"sl-after-hide")}render(){return ir`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${rn({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};o_.styles=rm,o_.dependencies={"sl-popup":oc},tg([iI("slot:not([name])")],o_.prototype,"defaultSlot",2),tg([iI(".tooltip__body")],o_.prototype,"body",2),tg([iI("sl-popup")],o_.prototype,"popup",2),tg([iO()],o_.prototype,"content",2),tg([iO()],o_.prototype,"placement",2),tg([iO({type:Boolean,reflect:!0})],o_.prototype,"disabled",2),tg([iO({type:Number})],o_.prototype,"distance",2),tg([iO({type:Boolean,reflect:!0})],o_.prototype,"open",2),tg([iO({type:Number})],o_.prototype,"skidding",2),tg([iO()],o_.prototype,"trigger",2),tg([iO({type:Boolean})],o_.prototype,"hoist",2),tg([iE("open",{waitUntilFirstUpdate:!0})],o_.prototype,"handleOpenChange",1),tg([iE(["content","distance","hoist","placement","skidding"])],o_.prototype,"handleOptionsChange",1),tg([iE("disabled")],o_.prototype,"handleDisabledChange",1),op("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),op("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});var ow=tE`
  ${iA}

  :host {
    --error-color: var(--sl-color-danger-600);
    --success-color: var(--sl-color-success-600);

    display: inline-block;
  }

  .copy-button__button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
  }

  .copy-button--success .copy-button__button {
    color: var(--success-color);
  }

  .copy-button--error .copy-button__button {
    color: var(--error-color);
  }

  .copy-button__button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .copy-button__button[disabled] {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  slot {
    display: inline-flex;
  }
`,ox=class extends iN{constructor(){super(...arguments),this.localize=new i1(this),this.isCopying=!1,this.status="rest",this.value="",this.from="",this.disabled=!1,this.copyLabel="",this.successLabel="",this.errorLabel="",this.feedbackDuration=1e3,this.tooltipPlacement="top",this.hoist=!1}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=!0;let e=this.value;if(this.from){let t=this.getRootNode(),i=this.from.includes("."),r=this.from.includes("[")&&this.from.includes("]"),o=this.from,n="";i?[o,n]=this.from.trim().split("."):r&&([o,n]=this.from.trim().replace(/\]$/,"").split("["));let s="getElementById"in t?t.getElementById(o):null;s?e=r?s.getAttribute(n)||"":i?s[n]||"":s.textContent||"":(this.showStatus("error"),this.emit("sl-error"))}if(e)try{await navigator.clipboard.writeText(e),this.showStatus("success"),this.emit("sl-copy",{detail:{value:e}})}catch(e){this.showStatus("error"),this.emit("sl-error")}else this.showStatus("error"),this.emit("sl-error")}async showStatus(e){let t=this.copyLabel||this.localize.term("copy"),i=this.successLabel||this.localize.term("copied"),r=this.errorLabel||this.localize.term("error"),o="success"===e?this.successIcon:this.errorIcon,n=of(this,"copy.in",{dir:"ltr"}),s=of(this,"copy.out",{dir:"ltr"});this.tooltip.content="success"===e?i:r,await this.copyIcon.animate(s.keyframes,s.options).finished,this.copyIcon.hidden=!0,this.status=e,o.hidden=!1,await o.animate(n.keyframes,n.options).finished,setTimeout(async()=>{await o.animate(s.keyframes,s.options).finished,o.hidden=!0,this.status="rest",this.copyIcon.hidden=!1,await this.copyIcon.animate(n.keyframes,n.options).finished,this.tooltip.content=t,this.isCopying=!1},this.feedbackDuration)}render(){let e=this.copyLabel||this.localize.term("copy");return ir`
      <sl-tooltip
        class=${rn({"copy-button":!0,"copy-button--success":"success"===this.status,"copy-button--error":"error"===this.status})}
        content=${e}
        placement=${this.tooltipPlacement}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        exportparts="
          base:tooltip__base,
          base__popup:tooltip__base__popup,
          base__arrow:tooltip__base__arrow,
          body:tooltip__body
        "
      >
        <button
          class="copy-button__button"
          part="button"
          type="button"
          ?disabled=${this.disabled}
          @click=${this.handleCopy}
        >
          <slot part="copy-icon" name="copy-icon">
            <sl-icon library="system" name="copy"></sl-icon>
          </slot>
          <slot part="success-icon" name="success-icon" hidden>
            <sl-icon library="system" name="check"></sl-icon>
          </slot>
          <slot part="error-icon" name="error-icon" hidden>
            <sl-icon library="system" name="x-lg"></sl-icon>
          </slot>
        </button>
      </sl-tooltip>
    `}};ox.styles=ow,ox.dependencies={"sl-icon":iV,"sl-tooltip":o_},tg([iI('slot[name="copy-icon"]')],ox.prototype,"copyIcon",2),tg([iI('slot[name="success-icon"]')],ox.prototype,"successIcon",2),tg([iI('slot[name="error-icon"]')],ox.prototype,"errorIcon",2),tg([iI("sl-tooltip")],ox.prototype,"tooltip",2),tg([iP()],ox.prototype,"isCopying",2),tg([iP()],ox.prototype,"status",2),tg([iO()],ox.prototype,"value",2),tg([iO()],ox.prototype,"from",2),tg([iO({type:Boolean,reflect:!0})],ox.prototype,"disabled",2),tg([iO({attribute:"copy-label"})],ox.prototype,"copyLabel",2),tg([iO({attribute:"success-label"})],ox.prototype,"successLabel",2),tg([iO({attribute:"error-label"})],ox.prototype,"errorLabel",2),tg([iO({attribute:"feedback-duration",type:Number})],ox.prototype,"feedbackDuration",2),tg([iO({attribute:"tooltip-placement"})],ox.prototype,"tooltipPlacement",2),tg([iO({type:Boolean})],ox.prototype,"hoist",2),op("copy.in",{keyframes:[{scale:".25",opacity:".25"},{scale:"1",opacity:"1"}],options:{duration:100}}),op("copy.out",{keyframes:[{scale:"1",opacity:"1"},{scale:".25",opacity:"0"}],options:{duration:100}}),ox.define("sl-copy-button");var ok=tE`
  ${iA}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,o$=class extends iN{constructor(){super(...arguments),this.disableRole=!1,this.label=""}handleFocus(e){let t=oC(e.target);null==t||t.classList.add("sl-button-group__button--focus")}handleBlur(e){let t=oC(e.target);null==t||t.classList.remove("sl-button-group__button--focus")}handleMouseOver(e){let t=oC(e.target);null==t||t.classList.add("sl-button-group__button--hover")}handleMouseOut(e){let t=oC(e.target);null==t||t.classList.remove("sl-button-group__button--hover")}handleSlotChange(){let e=[...this.defaultSlot.assignedElements({flatten:!0})];e.forEach(t=>{let i=e.indexOf(t),r=oC(t);r&&(r.classList.add("sl-button-group__button"),r.classList.toggle("sl-button-group__button--first",0===i),r.classList.toggle("sl-button-group__button--inner",i>0&&i<e.length-1),r.classList.toggle("sl-button-group__button--last",i===e.length-1),r.classList.toggle("sl-button-group__button--radio","sl-radio-button"===r.tagName.toLowerCase()))})}render(){return ir`
      <div
        part="base"
        class="button-group"
        role="${this.disableRole?"presentation":"group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};function oC(e){var t;let i="sl-button, sl-radio-button";return null!=(t=e.closest(i))?t:e.querySelector(i)}o$.styles=ok,tg([iI("slot")],o$.prototype,"defaultSlot",2),tg([iP()],o$.prototype,"disableRole",2),tg([iO()],o$.prototype,"label",2),o$.define("sl-button-group");var oA=tE`
  ${iA}

  :host {
    --divider-width: 4px;
    --divider-hit-area: 12px;
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
    background-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-900);
    z-index: 1;
  }

  .divider:focus {
    outline: none;
  }

  :host(:not([disabled])) .divider:focus-visible {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  :host([disabled]) .divider {
    cursor: not-allowed;
  }

  /* Horizontal */
  :host(:not([vertical], [disabled])) .divider {
    cursor: col-resize;
  }

  :host(:not([vertical])) .divider::after {
    display: flex;
    content: '';
    position: absolute;
    height: 100%;
    left: calc(var(--divider-hit-area) / -2 + var(--divider-width) / 2);
    width: var(--divider-hit-area);
  }

  /* Vertical */
  :host([vertical]) {
    flex-direction: column;
  }

  :host([vertical]:not([disabled])) .divider {
    cursor: row-resize;
  }

  :host([vertical]) .divider::after {
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
`;function oS(e,t,i){let r;return Object.is(r=e<t?t:e>i?i:e,-0)?0:r}var oE=class extends iN{constructor(){super(...arguments),this.localize=new i1(this),this.position=50,this.vertical=!1,this.disabled=!1,this.snapThreshold=12}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>this.handleResize(e)),this.updateComplete.then(()=>this.resizeObserver.observe(this)),this.detectSize(),this.cachedPositionInPixels=this.percentageToPixels(this.position)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver.unobserve(this)}detectSize(){let{width:e,height:t}=this.getBoundingClientRect();this.size=this.vertical?t:e}percentageToPixels(e){return this.size*(e/100)}pixelsToPercentage(e){return e/this.size*100}handleDrag(e){let t="rtl"===this.localize.dir();this.disabled||(e.cancelable&&e.preventDefault(),function(e,t){function i(i){let r=e.getBoundingClientRect(),o=e.ownerDocument.defaultView,n=r.left+o.scrollX,s=r.top+o.scrollY,l=i.pageX-n,a=i.pageY-s;(null==t?void 0:t.onMove)&&t.onMove(l,a)}document.addEventListener("pointermove",i,{passive:!0}),document.addEventListener("pointerup",function e(){document.removeEventListener("pointermove",i),document.removeEventListener("pointerup",e),(null==t?void 0:t.onStop)&&t.onStop()}),(null==t?void 0:t.initialEvent)instanceof PointerEvent&&i(t.initialEvent)}(this,{onMove:(e,i)=>{let r=this.vertical?i:e;"end"===this.primary&&(r=this.size-r),this.snap&&this.snap.split(" ").forEach(e=>{let i;i=e.endsWith("%")?this.size*(parseFloat(e)/100):parseFloat(e),t&&!this.vertical&&(i=this.size-i),r>=i-this.snapThreshold&&r<=i+this.snapThreshold&&(r=i)}),this.position=oS(this.pixelsToPercentage(r),0,100)},initialEvent:e}))}handleKeyDown(e){if(!this.disabled&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key)){let t=this.position,i=(e.shiftKey?10:1)*("end"===this.primary?-1:1);e.preventDefault(),("ArrowLeft"===e.key&&!this.vertical||"ArrowUp"===e.key&&this.vertical)&&(t-=i),("ArrowRight"===e.key&&!this.vertical||"ArrowDown"===e.key&&this.vertical)&&(t+=i),"Home"===e.key&&(t="end"===this.primary?100:0),"End"===e.key&&(t="end"===this.primary?0:100),this.position=oS(t,0,100)}}handleResize(e){let{width:t,height:i}=e[0].contentRect;this.size=this.vertical?i:t,this.primary&&(this.position=this.pixelsToPercentage(this.cachedPositionInPixels))}handlePositionChange(){this.cachedPositionInPixels=this.percentageToPixels(this.position),this.positionInPixels=this.percentageToPixels(this.position),this.emit("sl-reposition")}handlePositionInPixelsChange(){this.position=this.pixelsToPercentage(this.positionInPixels)}handleVerticalChange(){this.detectSize()}render(){let e=this.vertical?"gridTemplateRows":"gridTemplateColumns",t=this.vertical?"gridTemplateColumns":"gridTemplateRows",i="rtl"===this.localize.dir(),r=`
      clamp(
        0%,
        clamp(
          var(--min),
          ${this.position}% - var(--divider-width) / 2,
          var(--max)
        ),
        calc(100% - var(--divider-width))
      )
    `,o="auto";return"end"===this.primary?i&&!this.vertical?this.style[e]=`${r} var(--divider-width) ${o}`:this.style[e]=`${o} var(--divider-width) ${r}`:i&&!this.vertical?this.style[e]=`${o} var(--divider-width) ${r}`:this.style[e]=`${r} var(--divider-width) ${o}`,this.style[t]="",ir`
      <slot name="start" part="panel start" class="start"></slot>

      <div
        part="divider"
        class="divider"
        tabindex=${rh(this.disabled?void 0:"0")}
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
    `}};oE.styles=oA,tg([iI(".divider")],oE.prototype,"divider",2),tg([iO({type:Number,reflect:!0})],oE.prototype,"position",2),tg([iO({attribute:"position-in-pixels",type:Number})],oE.prototype,"positionInPixels",2),tg([iO({type:Boolean,reflect:!0})],oE.prototype,"vertical",2),tg([iO({type:Boolean,reflect:!0})],oE.prototype,"disabled",2),tg([iO()],oE.prototype,"primary",2),tg([iO()],oE.prototype,"snap",2),tg([iO({type:Number,attribute:"snap-threshold"})],oE.prototype,"snapThreshold",2),tg([iE("position")],oE.prototype,"handlePositionChange",1),tg([iE("positionInPixels")],oE.prototype,"handlePositionInPixelsChange",1),tg([iE("vertical")],oE.prototype,"handleVerticalChange",1),oE.define("sl-split-panel");var oT=tE`
  ${iA}

  :host {
    /*
     * These are actually used by tree item, but we define them here so they can more easily be set and all tree items
     * stay consistent.
     */
    --indent-guide-color: var(--sl-color-neutral-200);
    --indent-guide-offset: 0;
    --indent-guide-style: solid;
    --indent-guide-width: 0;
    --indent-size: var(--sl-spacing-large);

    display: block;
    isolation: isolate;

    /*
     * Tree item indentation uses the "em" unit to increment its width on each level, so setting the font size to zero
     * here removes the indentation for all the nodes on the first level.
     */
    font-size: 0;
  }
`,oz=tE`
  ${iA}

  :host {
    display: block;
    outline: 0;
    z-index: 0;
  }

  :host(:focus) {
    outline: none;
  }

  slot:not([name])::slotted(sl-icon) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .tree-item {
    position: relative;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    color: var(--sl-color-neutral-700);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
  }

  .tree-item__checkbox {
    pointer-events: none;
  }

  .tree-item__expand-button,
  .tree-item__checkbox,
  .tree-item__label {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-dense);
    letter-spacing: var(--sl-letter-spacing-normal);
  }

  .tree-item__checkbox::part(base) {
    display: flex;
    align-items: center;
  }

  .tree-item__indentation {
    display: block;
    width: 1em;
    flex-shrink: 0;
  }

  .tree-item__expand-button {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-x-small);
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    cursor: pointer;
  }

  .tree-item__expand-button {
    transition: var(--sl-transition-medium) rotate ease;
  }

  .tree-item--expanded .tree-item__expand-button {
    rotate: 90deg;
  }

  .tree-item--expanded.tree-item--rtl .tree-item__expand-button {
    rotate: -90deg;
  }

  .tree-item--expanded slot[name='expand-icon'],
  .tree-item:not(.tree-item--expanded) slot[name='collapse-icon'] {
    display: none;
  }

  .tree-item:not(.tree-item--has-expand-button) .tree-item__expand-icon-slot {
    display: none;
  }

  .tree-item__expand-button--visible {
    cursor: pointer;
  }

  .tree-item__item {
    display: flex;
    align-items: center;
    border-inline-start: solid 3px transparent;
  }

  .tree-item--disabled .tree-item__item {
    opacity: 0.5;
    outline: none;
    cursor: not-allowed;
  }

  :host(:focus-visible) .tree-item__item {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
    z-index: 2;
  }

  :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
    background-color: var(--sl-color-neutral-100);
    border-inline-start-color: var(--sl-color-primary-600);
  }

  :host(:not([aria-disabled='true'])) .tree-item__expand-button {
    color: var(--sl-color-neutral-600);
  }

  .tree-item__label {
    display: flex;
    align-items: center;
    transition: var(--sl-transition-fast) color;
  }

  .tree-item__children {
    display: block;
    font-size: calc(1em + var(--indent-size, var(--sl-spacing-medium)));
  }

  /* Indentation lines */
  .tree-item__children {
    position: relative;
  }

  .tree-item__children::before {
    content: '';
    position: absolute;
    top: var(--indent-guide-offset);
    bottom: var(--indent-guide-offset);
    left: calc(1em - (var(--indent-guide-width) / 2) - 1px);
    border-inline-end: var(--indent-guide-width) var(--indent-guide-style) var(--indent-guide-color);
    z-index: 1;
  }

  .tree-item--rtl .tree-item__children::before {
    left: auto;
    right: 1em;
  }

  @media (forced-colors: active) {
    :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
      outline: dashed 1px SelectedItem;
    }
  }
`,oO=tE`
  ${iA}

  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let oP=rr(class extends ro{constructor(e){if(super(e),e.type!==ri.PROPERTY&&e.type!==ri.ATTRIBUTE&&e.type!==ri.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!iB(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===is||t===il)return t;let i=e.element,r=e.name;if(e.type===ri.PROPERTY){if(t===i[r])return is}else if(e.type===ri.BOOLEAN_ATTRIBUTE){if(!!t===i.hasAttribute(r))return is}else if(e.type===ri.ATTRIBUTE&&i.getAttribute(r)===t+"")return is;return iF(e),t}});var oL=class extends iN{constructor(){super(...arguments),this.formControlController=new i7(this,{value:e=>e.checked?e.value||"on":void 0,defaultValue:e=>e.defaultChecked,setValue:(e,t)=>e.checked=t}),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.indeterminate=!1,this.defaultChecked=!1,this.form="",this.required=!1}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=!1,this.emit("sl-change")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(e){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(e)}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.formControlController.updateValidity()}render(){return ir`
      <label
        part="base"
        class=${rn({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":"small"===this.size,"checkbox--medium":"medium"===this.size,"checkbox--large":"large"===this.size})}
      >
        <input
          class="checkbox__input"
          type="checkbox"
          title=${this.title}
          name=${this.name}
          value=${rh(this.value)}
          .indeterminate=${oP(this.indeterminate)}
          .checked=${oP(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          aria-checked=${this.checked?"true":"false"}
          @click=${this.handleClick}
          @input=${this.handleInput}
          @invalid=${this.handleInvalid}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />

        <span
          part="control${this.checked?" control--checked":""}${this.indeterminate?" control--indeterminate":""}"
          class="checkbox__control"
        >
          ${this.checked?ir`
                <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
              `:""}
          ${!this.checked&&this.indeterminate?ir`
                <sl-icon
                  part="indeterminate-icon"
                  class="checkbox__indeterminate-icon"
                  library="system"
                  name="indeterminate"
                ></sl-icon>
              `:""}
        </span>

        <div part="label" class="checkbox__label">
          <slot></slot>
        </div>
      </label>
    `}};oL.styles=oO,oL.dependencies={"sl-icon":iV},tg([iI('input[type="checkbox"]')],oL.prototype,"input",2),tg([iP()],oL.prototype,"hasFocus",2),tg([iO()],oL.prototype,"title",2),tg([iO()],oL.prototype,"name",2),tg([iO()],oL.prototype,"value",2),tg([iO({reflect:!0})],oL.prototype,"size",2),tg([iO({type:Boolean,reflect:!0})],oL.prototype,"disabled",2),tg([iO({type:Boolean,reflect:!0})],oL.prototype,"checked",2),tg([iO({type:Boolean,reflect:!0})],oL.prototype,"indeterminate",2),tg([((e="value")=>(t,i)=>{let r=t.constructor,o=r.prototype.attributeChangedCallback;r.prototype.attributeChangedCallback=function(t,n,s){var l;let a=r.getPropertyOptions(e);if(t===("string"==typeof a.attribute?a.attribute:e)){let t=a.converter||tU,r=("function"==typeof t?t:null!=(l=null==t?void 0:t.fromAttribute)?l:tU.fromAttribute)(s,a.type);this[e]!==r&&(this[i]=r)}o.call(this,t,n,s)}})("checked")],oL.prototype,"defaultChecked",2),tg([iO({reflect:!0})],oL.prototype,"form",2),tg([iO({type:Boolean,reflect:!0})],oL.prototype,"required",2),tg([iE("disabled",{waitUntilFirstUpdate:!0})],oL.prototype,"handleDisabledChange",1),tg([iE(["checked","indeterminate"],{waitUntilFirstUpdate:!0})],oL.prototype,"handleStateChange",1);var oI=class e extends iN{constructor(){super(...arguments),this.localize=new i1(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(e){return e instanceof Element&&"treeitem"===e.getAttribute("role")}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&0===this.getChildrenItems().length,this.handleExpandedChange()}async animateCollapse(){this.emit("sl-collapse"),await ov(this.childrenContainer);let{keyframes:e,options:t}=of(this,"tree-item.collapse",{dir:this.localize.dir()});await om(this.childrenContainer,oy(e,this.childrenContainer.scrollHeight),t),this.childrenContainer.hidden=!0,this.emit("sl-after-collapse")}isNestedItem(){let t=this.parentElement;return!!t&&e.isTreeItem(t)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&0===this.getChildrenItems().length}willUpdate(e){e.has("selected")&&!e.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.emit("sl-expand"),await ov(this.childrenContainer),this.childrenContainer.hidden=!1;let{keyframes:e,options:t}=of(this,"tree-item.expand",{dir:this.localize.dir()});await om(this.childrenContainer,oy(e,this.childrenContainer.scrollHeight),t),this.childrenContainer.style.height="auto",this.emit("sl-after-expand")}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.emit("sl-lazy-change")}getChildrenItems({includeDisabled:t=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(i=>e.isTreeItem(i)&&(t||!i.disabled)):[]}render(){var e,t,i,r;let o="rtl"===this.localize.dir(),n=!this.loading&&(!this.isLeaf||this.lazy);return ir`
      <div
        part="base"
        class="${rn({"tree-item":!0,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":n,"tree-item--rtl":"rtl"===this.localize.dir()})}"
      >
        <div
          class="tree-item__item"
          part="
            item
            ${this.disabled?"item--disabled":""}
            ${this.expanded?"item--expanded":""}
            ${this.indeterminate?"item--indeterminate":""}
            ${this.selected?"item--selected":""}
          "
        >
          <div class="tree-item__indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${rn({"tree-item__expand-button":!0,"tree-item__expand-button--visible":n})}
            aria-hidden="true"
          >
            ${e=this.loading,t=()=>ir` <sl-spinner></sl-spinner> `,e?t(e):void 0}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${o?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${o?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${i=this.selectable,r=()=>ir`
              <sl-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    control--checked:checkbox__control--checked,
                    control--indeterminate:checkbox__control--indeterminate,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="tree-item__checkbox"
                ?disabled="${this.disabled}"
                ?checked="${oP(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></sl-checkbox>
            `,i?r(i):void 0}

          <slot class="tree-item__label" part="label"></slot>
        </div>

        <div class="tree-item__children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `}};function oN(e,t=!1){function i(e){let t=e.getChildrenItems({includeDisabled:!1});if(t.length){let i=t.every(e=>e.selected),r=t.every(e=>!e.selected&&!e.indeterminate);e.selected=i,e.indeterminate=!i&&!r}}!function e(r){for(let i of r.getChildrenItems())i.selected=t?r.selected||i.selected:!i.disabled&&r.selected,e(i);t&&i(r)}(e),function e(t){let r=t.parentElement;oI.isTreeItem(r)&&(i(r),e(r))}(e)}oI.styles=oz,oI.dependencies={"sl-checkbox":oL,"sl-icon":iV,"sl-spinner":i2},tg([iP()],oI.prototype,"indeterminate",2),tg([iP()],oI.prototype,"isLeaf",2),tg([iP()],oI.prototype,"loading",2),tg([iP()],oI.prototype,"selectable",2),tg([iO({type:Boolean,reflect:!0})],oI.prototype,"expanded",2),tg([iO({type:Boolean,reflect:!0})],oI.prototype,"selected",2),tg([iO({type:Boolean,reflect:!0})],oI.prototype,"disabled",2),tg([iO({type:Boolean,reflect:!0})],oI.prototype,"lazy",2),tg([iI("slot:not([name])")],oI.prototype,"defaultSlot",2),tg([iI("slot[name=children]")],oI.prototype,"childrenSlot",2),tg([iI(".tree-item__item")],oI.prototype,"itemElement",2),tg([iI(".tree-item__children")],oI.prototype,"childrenContainer",2),tg([iI(".tree-item__expand-button slot")],oI.prototype,"expandButtonSlot",2),tg([iE("loading",{waitUntilFirstUpdate:!0})],oI.prototype,"handleLoadingChange",1),tg([iE("disabled")],oI.prototype,"handleDisabledChange",1),tg([iE("selected")],oI.prototype,"handleSelectedChange",1),tg([iE("expanded",{waitUntilFirstUpdate:!0})],oI.prototype,"handleExpandedChange",1),tg([iE("expanded",{waitUntilFirstUpdate:!0})],oI.prototype,"handleExpandAnimation",1),tg([iE("lazy",{waitUntilFirstUpdate:!0})],oI.prototype,"handleLazyChange",1),op("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}}),op("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});var oM=class extends iN{constructor(){super(),this.selection="single",this.localize=new i1(this),this.clickTarget=null,this.initTreeItem=e=>{e.selectable="multiple"===this.selection,["expand","collapse"].filter(e=>!!this.querySelector(`[slot="${e}-icon"]`)).forEach(t=>{let i=e.querySelector(`[slot="${t}-icon"]`);null===i?e.append(this.getExpandButtonIcon(t)):i.hasAttribute("data-default")&&i.replaceWith(this.getExpandButtonIcon(t))})},this.handleTreeChanged=e=>{for(let t of e){let e=[...t.addedNodes].filter(oI.isTreeItem),i=[...t.removedNodes].filter(oI.isTreeItem);e.forEach(this.initTreeItem),this.lastFocusedItem&&i.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=e=>{let t=e.relatedTarget;t&&this.contains(t)||(this.tabIndex=0)},this.handleFocusIn=e=>{let t=e.target;e.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),oI.isTreeItem(t)&&!t.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=t,this.tabIndex=-1,t.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver.disconnect()}getExpandButtonIcon(e){let t=("expand"===e?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(t){let i=t.cloneNode(!0);return[i,...i.querySelectorAll("[id]")].forEach(e=>e.removeAttribute("id")),i.setAttribute("data-default",""),i.slot=`${e}-icon`,i}return null}selectItem(e){let t=[...this.selectedItems];if("multiple"===this.selection)e.selected=!e.selected,e.lazy&&(e.expanded=!0),oN(e);else if("single"===this.selection||e.isLeaf)for(let t of this.getAllTreeItems())t.selected=t===e;else"leaf"===this.selection&&(e.expanded=!e.expanded);let i=this.selectedItems;(t.length!==i.length||i.some(e=>!t.includes(e)))&&Promise.all(i.map(e=>e.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:i}})})}getAllTreeItems(){return[...this.querySelectorAll("sl-tree-item")]}focusItem(e){null==e||e.focus()}handleKeyDown(e){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(e.key)||e.composedPath().some(e=>{var t;return["input","textarea"].includes(null==(t=null==e?void 0:e.tagName)?void 0:t.toLowerCase())}))return;let t=this.getFocusableItems(),i="ltr"===this.localize.dir(),r="rtl"===this.localize.dir();if(t.length>0){e.preventDefault();let o=t.findIndex(e=>e.matches(":focus")),n=t[o],s=e=>{let i=t[oS(e,0,t.length-1)];this.focusItem(i)},l=e=>{n.expanded=e};"ArrowDown"===e.key?s(o+1):"ArrowUp"===e.key?s(o-1):i&&"ArrowRight"===e.key||r&&"ArrowLeft"===e.key?!n||n.disabled||n.expanded||n.isLeaf&&!n.lazy?s(o+1):l(!0):i&&"ArrowLeft"===e.key||r&&"ArrowRight"===e.key?!n||n.disabled||n.isLeaf||!n.expanded?s(o-1):l(!1):"Home"===e.key?s(0):"End"===e.key?s(t.length-1):"Enter"!==e.key&&" "!==e.key||n.disabled||this.selectItem(n)}}handleClick(e){let t=e.target,i=t.closest("sl-tree-item"),r=e.composedPath().some(e=>{var t;return null==(t=null==e?void 0:e.classList)?void 0:t.contains("tree-item__expand-button")});i&&!i.disabled&&t===this.clickTarget&&(r?i.expanded=!i.expanded:this.selectItem(i))}handleMouseDown(e){this.clickTarget=e.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){let e="multiple"===this.selection,t=this.getAllTreeItems();for(let i of(this.setAttribute("aria-multiselectable",e?"true":"false"),t))i.selectable=e;e&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(e=>oN(e,!0)))}get selectedItems(){return this.getAllTreeItems().filter(e=>e.selected)}getFocusableItems(){let e=this.getAllTreeItems(),t=new Set;return e.filter(e=>{var i;if(e.disabled)return!1;let r=null==(i=e.parentElement)?void 0:i.closest("[role=treeitem]");return r&&(!r.expanded||r.loading||t.has(r))&&t.add(e),!t.has(e)})}render(){return ir`
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
    `}};oM.styles=oT,tg([iI("slot:not([name])")],oM.prototype,"defaultSlot",2),tg([iI("slot[name=expand-icon]")],oM.prototype,"expandedIconSlot",2),tg([iI("slot[name=collapse-icon]")],oM.prototype,"collapsedIconSlot",2),tg([iO()],oM.prototype,"selection",2),tg([iE("selection")],oM.prototype,"handleSelectionChange",1),oM.define("sl-tree"),oI.define("sl-tree-item");var oR=tE`
  ${iA}

  :host {
    --indicator-color: var(--sl-color-primary-600);
    --track-color: var(--sl-color-neutral-200);
    --track-width: 2px;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group__indicator {
    position: absolute;
    transition:
      var(--sl-transition-fast) translate ease,
      var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group__body {
    display: block;
    overflow: auto;
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    left: auto;
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: 0;
    right: auto;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    right: auto;
    left: calc(-1 * var(--track-width));
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    left: auto;
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`;function oB(e,t,i="vertical",r="smooth"){let o={top:Math.round(e.getBoundingClientRect().top-t.getBoundingClientRect().top),left:Math.round(e.getBoundingClientRect().left-t.getBoundingClientRect().left)},n=o.top+t.scrollTop,s=o.left+t.scrollLeft,l=t.scrollLeft,a=t.scrollLeft+t.offsetWidth,c=t.scrollTop,u=t.scrollTop+t.offsetHeight;("horizontal"===i||"both"===i)&&(s<l?t.scrollTo({left:s,behavior:r}):s+e.clientWidth>a&&t.scrollTo({left:s-t.offsetWidth+e.clientWidth,behavior:r})),("vertical"===i||"both"===i)&&(n<c?t.scrollTo({top:n,behavior:r}):n+e.clientHeight>u&&t.scrollTo({top:n-t.offsetHeight+e.clientHeight,behavior:r}))}var oD=class extends iN{constructor(){super(...arguments),this.localize=new i1(this),this.tabs=[],this.panels=[],this.hasScrollControls=!1,this.placement="top",this.activation="auto",this.noScrollControls=!1}connectedCallback(){let e=Promise.all([customElements.whenDefined("sl-tab"),customElements.whenDefined("sl-tab-panel")]);super.connectedCallback(),this.resizeObserver=new ResizeObserver(()=>{this.repositionIndicator(),this.updateScrollControls()}),this.mutationObserver=new MutationObserver(e=>{e.some(e=>!["aria-labelledby","aria-controls"].includes(e.attributeName))&&setTimeout(()=>this.setAriaLabels()),e.some(e=>"disabled"===e.attributeName)&&this.syncTabsAndPanels()}),this.updateComplete.then(()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav),e.then(()=>{new IntersectionObserver((e,t)=>{var i;e[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab(null!=(i=this.getActiveTab())?i:this.tabs[0],{emitEvents:!1}),t.unobserve(e[0].target))}).observe(this.tabGroup)})})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver.disconnect(),this.resizeObserver.unobserve(this.nav)}getAllTabs(e={includeDisabled:!0}){return[...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter(t=>e.includeDisabled?"sl-tab"===t.tagName.toLowerCase():"sl-tab"===t.tagName.toLowerCase()&&!t.disabled)}getAllPanels(){return[...this.body.assignedElements()].filter(e=>"sl-tab-panel"===e.tagName.toLowerCase())}getActiveTab(){return this.tabs.find(e=>e.active)}handleClick(e){let t=e.target.closest("sl-tab");(null==t?void 0:t.closest("sl-tab-group"))===this&&null!==t&&this.setActiveTab(t,{scrollBehavior:"smooth"})}handleKeyDown(e){let t=e.target.closest("sl-tab");if((null==t?void 0:t.closest("sl-tab-group"))===this&&(["Enter"," "].includes(e.key)&&null!==t&&(this.setActiveTab(t,{scrollBehavior:"smooth"}),e.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(e.key))){let t=this.tabs.find(e=>e.matches(":focus")),i="rtl"===this.localize.dir();if((null==t?void 0:t.tagName.toLowerCase())==="sl-tab"){let r=this.tabs.indexOf(t);"Home"===e.key?r=0:"End"===e.key?r=this.tabs.length-1:["top","bottom"].includes(this.placement)&&e.key===(i?"ArrowRight":"ArrowLeft")||["start","end"].includes(this.placement)&&"ArrowUp"===e.key?r--:(["top","bottom"].includes(this.placement)&&e.key===(i?"ArrowLeft":"ArrowRight")||["start","end"].includes(this.placement)&&"ArrowDown"===e.key)&&r++,r<0&&(r=this.tabs.length-1),r>this.tabs.length-1&&(r=0),this.tabs[r].focus({preventScroll:!0}),"auto"===this.activation&&this.setActiveTab(this.tabs[r],{scrollBehavior:"smooth"}),["top","bottom"].includes(this.placement)&&oB(this.tabs[r],this.nav,"horizontal"),e.preventDefault()}}}handleScrollToStart(){this.nav.scroll({left:"rtl"===this.localize.dir()?this.nav.scrollLeft+this.nav.clientWidth:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:"rtl"===this.localize.dir()?this.nav.scrollLeft-this.nav.clientWidth:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}setActiveTab(e,t){if(t=tb({emitEvents:!0,scrollBehavior:"auto"},t),e!==this.activeTab&&!e.disabled){let i=this.activeTab;this.activeTab=e,this.tabs.forEach(e=>e.active=e===this.activeTab),this.panels.forEach(e=>{var t;return e.active=e.name===(null==(t=this.activeTab)?void 0:t.panel)}),this.syncIndicator(),["top","bottom"].includes(this.placement)&&oB(this.activeTab,this.nav,"horizontal",t.scrollBehavior),t.emitEvents&&(i&&this.emit("sl-tab-hide",{detail:{name:i.panel}}),this.emit("sl-tab-show",{detail:{name:this.activeTab.panel}}))}}setAriaLabels(){this.tabs.forEach(e=>{let t=this.panels.find(t=>t.name===e.panel);t&&(e.setAttribute("aria-controls",t.getAttribute("id")),t.setAttribute("aria-labelledby",e.getAttribute("id")))})}repositionIndicator(){let e=this.getActiveTab();if(!e)return;let t=e.clientWidth,i=e.clientHeight,r="rtl"===this.localize.dir(),o=this.getAllTabs(),n=o.slice(0,o.indexOf(e)).reduce((e,t)=>({left:e.left+t.clientWidth,top:e.top+t.clientHeight}),{left:0,top:0});switch(this.placement){case"top":case"bottom":this.indicator.style.width=`${t}px`,this.indicator.style.height="auto",this.indicator.style.translate=r?`${-1*n.left}px`:`${n.left}px`;break;case"start":case"end":this.indicator.style.width="auto",this.indicator.style.height=`${i}px`,this.indicator.style.translate=`0 ${n.top}px`}}syncTabsAndPanels(){this.tabs=this.getAllTabs({includeDisabled:!1}),this.panels=this.getAllPanels(),this.syncIndicator(),this.updateComplete.then(()=>this.updateScrollControls())}updateScrollControls(){this.noScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none"}show(e){let t=this.tabs.find(t=>t.panel===e);t&&this.setActiveTab(t,{scrollBehavior:"smooth"})}render(){let e="rtl"===this.localize.dir();return ir`
      <div
        part="base"
        class=${rn({"tab-group":!0,"tab-group--top":"top"===this.placement,"tab-group--bottom":"bottom"===this.placement,"tab-group--start":"start"===this.placement,"tab-group--end":"end"===this.placement,"tab-group--rtl":"rtl"===this.localize.dir(),"tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?ir`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--start"
                  name=${e?"chevron-right":"chevron-left"}
                  library="system"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:""}

          <div class="tab-group__nav">
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls?ir`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--end"
                  name=${e?"chevron-left":"chevron-right"}
                  library="system"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:""}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `}};oD.styles=oR,oD.dependencies={"sl-icon-button":rb},tg([iI(".tab-group")],oD.prototype,"tabGroup",2),tg([iI(".tab-group__body")],oD.prototype,"body",2),tg([iI(".tab-group__nav")],oD.prototype,"nav",2),tg([iI(".tab-group__indicator")],oD.prototype,"indicator",2),tg([iP()],oD.prototype,"hasScrollControls",2),tg([iO()],oD.prototype,"placement",2),tg([iO()],oD.prototype,"activation",2),tg([iO({attribute:"no-scroll-controls",type:Boolean})],oD.prototype,"noScrollControls",2),tg([iE("noScrollControls",{waitUntilFirstUpdate:!0})],oD.prototype,"updateScrollControls",1),tg([iE("placement",{waitUntilFirstUpdate:!0})],oD.prototype,"syncIndicator",1),oD.define("sl-tab-group");var oF=tE`
  ${iA}

  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    transition:
      var(--transition-speed) box-shadow,
      var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus {
    outline: none;
  }

  .tab:focus-visible:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`,oj=0,oU=class extends iN{constructor(){super(...arguments),this.localize=new i1(this),this.attrId=++oj,this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=!1,this.closable=!1,this.disabled=!1}connectedCallback(){super.connectedCallback(),this.setAttribute("role","tab")}handleCloseClick(e){e.stopPropagation(),this.emit("sl-close")}handleActiveChange(){this.setAttribute("aria-selected",this.active?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}focus(e){this.tab.focus(e)}blur(){this.tab.blur()}render(){return this.id=this.id.length>0?this.id:this.componentId,ir`
      <div
        part="base"
        class=${rn({tab:!0,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
        tabindex=${this.disabled?"-1":"0"}
      >
        <slot></slot>
        ${this.closable?ir`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </div>
    `}};oU.styles=oF,oU.dependencies={"sl-icon-button":rb},tg([iI(".tab")],oU.prototype,"tab",2),tg([iO({reflect:!0})],oU.prototype,"panel",2),tg([iO({type:Boolean,reflect:!0})],oU.prototype,"active",2),tg([iO({type:Boolean})],oU.prototype,"closable",2),tg([iO({type:Boolean,reflect:!0})],oU.prototype,"disabled",2),tg([iE("active")],oU.prototype,"handleActiveChange",1),tg([iE("disabled")],oU.prototype,"handleDisabledChange",1),oU.define("sl-tab");var oq=tE`
  ${iA}

  :host {
    --padding: 0;

    display: none;
  }

  :host([active]) {
    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }
`,oV=0,oH=class extends iN{constructor(){super(...arguments),this.attrId=++oV,this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId,this.setAttribute("role","tabpanel")}handleActiveChange(){this.setAttribute("aria-hidden",this.active?"false":"true")}render(){return ir`
      <slot
        part="base"
        class=${rn({"tab-panel":!0,"tab-panel--active":this.active})}
      ></slot>
    `}};oH.styles=oq,tg([iO({reflect:!0})],oH.prototype,"name",2),tg([iO({type:Boolean,reflect:!0})],oH.prototype,"active",2),tg([iE("active")],oH.prototype,"handleActiveChange",1),oH.define("sl-tab-panel"),o_.define("sl-tooltip");var oW=tE`
  ${iA}

  :host {
    display: contents;
  }
`,oK=class extends iN{constructor(){super(...arguments),this.observedElements=[],this.disabled=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver(e=>{this.emit("sl-resize",{detail:{entries:e}})}),this.disabled||this.startObserver()}disconnectedCallback(){super.disconnectedCallback(),this.stopObserver()}handleSlotChange(){this.disabled||this.startObserver()}startObserver(){let e=this.shadowRoot.querySelector("slot");if(null!==e){let t=e.assignedElements({flatten:!0});this.observedElements.forEach(e=>this.resizeObserver.unobserve(e)),this.observedElements=[],t.forEach(e=>{this.resizeObserver.observe(e),this.observedElements.push(e)})}}stopObserver(){this.resizeObserver.disconnect()}handleDisabledChange(){this.disabled?this.stopObserver():this.startObserver()}render(){return ir` <slot @slotchange=${this.handleSlotChange}></slot> `}};oK.styles=oW,tg([iO({type:Boolean,reflect:!0})],oK.prototype,"disabled",2),tg([iE("disabled",{waitUntilFirstUpdate:!0})],oK.prototype,"handleDisabledChange",1),oK.define("sl-resize-observer"),ts="/lookbook-assets/shoelace",eX="default",e0={resolver:e=>`https://cdn.jsdelivr.net/npm/lucide-static@0.16.29/icons/${e}.svg`},(ty=ty.filter(e=>e.name!==eX)).push({name:eX,resolver:e0.resolver,mutator:e0.mutator,spriteSheet:e0.spriteSheet}),t_.forEach(e=>{e.library===eX&&e.setIcon()});var oJ=!1,oG=!1,oY=[],oZ=-1;function oQ(e){let t=oY.indexOf(e);-1!==t&&t>oZ&&oY.splice(t,1)}function oX(){oJ=!1,oG=!0;for(let e=0;e<oY.length;e++)oY[e](),oZ=e;oY.length=0,oZ=-1,oG=!1}var o0=!0;function o1(e,t){let i,r=!0,o=ti(()=>{let o=e();JSON.stringify(o),r?i=o:queueMicrotask(()=>{t(o,i),i=o}),r=!1});return()=>tr(o)}function o2(e,t,i={}){e.dispatchEvent(new CustomEvent(t,{detail:i,bubbles:!0,composed:!0,cancelable:!0}))}function o5(e,t){if("function"==typeof ShadowRoot&&e instanceof ShadowRoot){Array.from(e.children).forEach(e=>o5(e,t));return}let i=!1;if(t(e,()=>i=!0),i)return;let r=e.firstElementChild;for(;r;)o5(r,t,!1),r=r.nextElementSibling}function o3(e,...t){console.warn(`Alpine Warning: ${e}`,...t)}var o6=!1,o4=[],o8=[];function o7(){return o4.map(e=>e())}function o9(){return o4.concat(o8).map(e=>e())}function ne(e){o4.push(e)}function nt(e){o8.push(e)}function ni(e,t=!1){return nr(e,e=>{if((t?o9():o7()).some(t=>e.matches(t)))return!0})}function nr(e,t){return e?t(e)?e:(e._x_teleportBack&&(e=e._x_teleportBack),e.parentElement)?nr(e.parentElement,t):void 0:void 0}var no=[];function nn(e,t=o5,i=()=>{}){var r;let o,n;r=()=>{t(e,(e,t)=>{i(e,t),no.forEach(i=>i(e,t)),nK(e,e.attributes).forEach(e=>e()),e._x_ignore&&t()})},nG=!0,nZ=o=Symbol(),nY.set(o,[]),r(n=()=>{for(;nY.get(o).length;)nY.get(o).shift()();nY.delete(o)}),nG=!1,n()}function ns(e){o5(e,e=>{np(e),function(e){if(e._x_cleanups)for(;e._x_cleanups.length;)e._x_cleanups.pop()()}(e)})}var nl=[],na=[],nc=[];function nu(e,t){"function"==typeof t?(e._x_cleanups||(e._x_cleanups=[]),e._x_cleanups.push(t)):(t=e,na.push(t))}function nd(e){nl.push(e)}function nh(e,t,i){e._x_attributeCleanups||(e._x_attributeCleanups={}),e._x_attributeCleanups[t]||(e._x_attributeCleanups[t]=[]),e._x_attributeCleanups[t].push(i)}function np(e,t){e._x_attributeCleanups&&Object.entries(e._x_attributeCleanups).forEach(([i,r])=>{(void 0===t||t.includes(i))&&(r.forEach(e=>e()),delete e._x_attributeCleanups[i])})}var nf=new MutationObserver(nx),nb=!1;function nm(){nf.observe(document,{subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0}),nb=!0}function ng(){let e,t;e=nf.takeRecords(),nv.push(()=>e.length>0&&nx(e)),t=nv.length,queueMicrotask(()=>{if(nv.length===t)for(;nv.length>0;)nv.shift()()}),nf.disconnect(),nb=!1}var nv=[];function ny(e){if(!nb)return e();ng();let t=e();return nm(),t}var n_=!1,nw=[];function nx(e){if(n_){nw=nw.concat(e);return}let t=new Set,i=new Set,r=new Map,o=new Map;for(let n=0;n<e.length;n++)if(!e[n].target._x_ignoreMutationObserver&&("childList"===e[n].type&&(e[n].addedNodes.forEach(e=>1===e.nodeType&&t.add(e)),e[n].removedNodes.forEach(e=>1===e.nodeType&&i.add(e))),"attributes"===e[n].type)){let t=e[n].target,i=e[n].attributeName,s=e[n].oldValue,l=()=>{r.has(t)||r.set(t,[]),r.get(t).push({name:i,value:t.getAttribute(i)})},a=()=>{o.has(t)||o.set(t,[]),o.get(t).push(i)};t.hasAttribute(i)&&null===s?l():t.hasAttribute(i)?(a(),l()):a()}for(let e of(o.forEach((e,t)=>{np(t,e)}),r.forEach((e,t)=>{nl.forEach(i=>i(t,e))}),i))t.has(e)||(na.forEach(t=>t(e)),ns(e));for(let e of(t.forEach(e=>{e._x_ignoreSelf=!0,e._x_ignore=!0}),t))!i.has(e)&&e.isConnected&&(delete e._x_ignoreSelf,delete e._x_ignore,nc.forEach(t=>t(e)),e._x_ignore=!0,e._x_ignoreSelf=!0);t.forEach(e=>{delete e._x_ignoreSelf,delete e._x_ignore}),t=null,i=null,r=null,o=null}function nk(e){return nA(nC(e))}function n$(e,t,i){return e._x_dataStack=[t,...nC(i||e)],()=>{e._x_dataStack=e._x_dataStack.filter(e=>e!==t)}}function nC(e){return e._x_dataStack?e._x_dataStack:"function"==typeof ShadowRoot&&e instanceof ShadowRoot?nC(e.host):e.parentNode?nC(e.parentNode):[]}function nA(e){return new Proxy({objects:e},nS)}var nS={ownKeys:({objects:e})=>Array.from(new Set(e.flatMap(e=>Object.keys(e)))),has:({objects:e},t)=>t!=Symbol.unscopables&&e.some(e=>Object.prototype.hasOwnProperty.call(e,t)),get:({objects:e},t,i)=>"toJSON"==t?nE:Reflect.get(e.find(e=>Object.prototype.hasOwnProperty.call(e,t))||{},t,i),set({objects:e},t,i,r){let o=e.find(e=>Object.prototype.hasOwnProperty.call(e,t))||e[e.length-1],n=Object.getOwnPropertyDescriptor(o,t);return n?.set&&n?.get?Reflect.set(o,t,i,r):Reflect.set(o,t,i)}};function nE(){return Reflect.ownKeys(this).reduce((e,t)=>(e[t]=Reflect.get(this,t),e),{})}function nT(e){let t=e=>"object"==typeof e&&!Array.isArray(e)&&null!==e,i=(r,o="")=>{Object.entries(Object.getOwnPropertyDescriptors(r)).forEach(([n,{value:s,enumerable:l}])=>{if(!1===l||void 0===s)return;let a=""===o?n:`${o}.${n}`;"object"==typeof s&&null!==s&&s._x_interceptor?r[n]=s.initialize(e,a,n):!t(s)||s===r||s instanceof Element||i(s,a)})};return i(e)}function nz(e,t=()=>{}){let i={initialValue:void 0,_x_interceptor:!0,initialize(t,i,r){return e(this.initialValue,()=>i.split(".").reduce((e,t)=>e[t],t),e=>(function e(t,i,r){if("string"==typeof i&&(i=i.split(".")),1===i.length)t[i[0]]=r;else if(0!==i.length)return t[i[0]]||(t[i[0]]={}),e(t[i[0]],i.slice(1),r);else throw error})(t,i,e),i,r)}};return t(i),e=>{if("object"==typeof e&&null!==e&&e._x_interceptor){let t=i.initialize.bind(i);i.initialize=(r,o,n)=>{let s=e.initialize(r,o,n);return i.initialValue=s,t(r,o,n)}}else i.initialValue=e;return i}}var nO={};function nP(e,t){return Object.entries(nO).forEach(([i,r])=>{let o=null;Object.defineProperty(e,`$${i}`,{get:()=>r(t,function(){if(o)return o;{let[e,i]=nQ(t);return o={interceptor:nz,...e},nu(t,i),o}}()),enumerable:!1})}),e}function nL(e,t,i,...r){try{return i(...r)}catch(i){nI(i,e,t)}}function nI(e,t,i){e=Object.assign(e??{message:"No error message given."},{el:t,expression:i}),console.warn(`Alpine Expression Error: ${e.message}

${i?'Expression: "'+i+'"\n\n':""}`,t),setTimeout(()=>{throw e},0)}var nN=!0;function nM(e){let t=nN;nN=!1;let i=e();return nN=t,i}function nR(e,t,i={}){let r;return nB(e,t)(e=>r=e,i),r}function nB(...e){return nD(...e)}var nD=nF;function nF(e,t){let i,r={};nP(r,e);let o=[r,...nC(e)],n="function"==typeof t?(e=()=>{},{scope:i={},params:r=[]}={})=>{nU(e,t.apply(nA([i,...o]),r))}:(i=function(e,t){if(nj[e])return nj[e];let i=Object.getPrototypeOf(async function(){}).constructor,r=/^[\n\s]*if.*\(.*\)/.test(e.trim())||/^(let|const)\s/.test(e.trim())?`(async()=>{ ${e} })()`:e,o=(()=>{try{let t=new i(["__self","scope"],`with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`);return Object.defineProperty(t,"name",{value:`[Alpine] ${e}`}),t}catch(i){return nI(i,t,e),Promise.resolve()}})();return nj[e]=o,o}(t,e),(r=()=>{},{scope:n={},params:s=[]}={})=>{i.result=void 0,i.finished=!1;let l=nA([n,...o]);if("function"==typeof i){let o=i(i,l).catch(i=>nI(i,e,t));i.finished?(nU(r,i.result,l,s,e),i.result=void 0):o.then(t=>{nU(r,t,l,s,e)}).catch(i=>nI(i,e,t)).finally(()=>i.result=void 0)}});return nL.bind(null,e,t,n)}var nj={};function nU(e,t,i,r,o){if(nN&&"function"==typeof t){let n=t.apply(i,r);n instanceof Promise?n.then(t=>nU(e,t,i,r)).catch(e=>nI(e,o,t)):e(n)}else"object"==typeof t&&t instanceof Promise?t.then(t=>e(t)):e(t)}var nq="x-";function nV(e=""){return nq+e}var nH={};function nW(e,t){return nH[e]=t,{before(t){if(!nH[t]){console.warn(String.raw`Cannot find directive \`${t}\`. \`${e}\` will use the default order of execution`);return}let i=n4.indexOf(t);n4.splice(i>=0?i:n4.indexOf("DEFAULT"),0,e)}}}function nK(e,t,i){if(t=Array.from(t),e._x_virtualDirectives){let i=Object.entries(e._x_virtualDirectives).map(([e,t])=>({name:e,value:t})),r=nJ(i);i=i.map(e=>r.find(t=>t.name===e.name)?{name:`x-bind:${e.name}`,value:`"${e.value}"`}:e),t=t.concat(i)}let r={};return t.map(n0((e,t)=>r[e]=t)).filter(n5).map(({name:e,value:t})=>{let o=e.match(n3()),n=e.match(/:([a-zA-Z0-9\-_:]+)/),s=e.match(/\.[^.\]]+(?=[^\]]*$)/g)||[],l=i||r[e]||e;return{type:o?o[1]:null,value:n?n[1]:null,modifiers:s.map(e=>e.replace(".","")),expression:t,original:l}}).sort(n8).map(t=>(function(e,t){let i=nH[t.type]||(()=>{}),[r,o]=nQ(e);nh(e,t.original,o);let n=()=>{e._x_ignore||e._x_ignoreSelf||(i.inline&&i.inline(e,t,r),i=i.bind(i,e,t,r),nG?nY.get(nZ).push(i):i())};return n.runCleanups=o,n})(e,t))}function nJ(e){return Array.from(e).map(n0()).filter(e=>!n5(e))}var nG=!1,nY=new Map,nZ=Symbol();function nQ(e){let t,i=[],[r,o]=(t=()=>{},[i=>{let r=ti(i);return e._x_effects||(e._x_effects=new Set,e._x_runEffects=()=>{e._x_effects.forEach(e=>e())}),e._x_effects.add(r),t=()=>{void 0!==r&&(e._x_effects.delete(r),tr(r))},r},()=>{t()}]);return i.push(o),[{Alpine:sT,effect:r,cleanup:e=>i.push(e),evaluateLater:nB.bind(nB,e),evaluate:nR.bind(nR,e)},()=>i.forEach(e=>e())]}var nX=(e,t)=>({name:i,value:r})=>(i.startsWith(e)&&(i=i.replace(e,t)),{name:i,value:r});function n0(e=()=>{}){return({name:t,value:i})=>{let{name:r,value:o}=n1.reduce((e,t)=>t(e),{name:t,value:i});return r!==t&&e(r,t),{name:r,value:o}}}var n1=[];function n2(e){n1.push(e)}function n5({name:e}){return n3().test(e)}var n3=()=>RegExp(`^${nq}([^:^.]+)\\b`),n6="DEFAULT",n4=["ignore","ref","data","id","anchor","bind","init","for","model","modelable","transition","show","if",n6,"teleport"];function n8(e,t){let i=-1===n4.indexOf(e.type)?n6:e.type,r=-1===n4.indexOf(t.type)?n6:t.type;return n4.indexOf(i)-n4.indexOf(r)}var n7=[],n9=!1;function se(e=()=>{}){return queueMicrotask(()=>{n9||setTimeout(()=>{st()})}),new Promise(t=>{n7.push(()=>{e(),t()})})}function st(){for(n9=!1;n7.length;)n7.shift()()}function si(e,t){if(Array.isArray(t))return sr(e,t.join(" "));if("object"==typeof t&&null!==t){let i,r,o,n,s;return i=e=>e.split(" ").filter(Boolean),r=Object.entries(t).flatMap(([e,t])=>!!t&&i(e)).filter(Boolean),o=Object.entries(t).flatMap(([e,t])=>!t&&i(e)).filter(Boolean),n=[],s=[],o.forEach(t=>{e.classList.contains(t)&&(e.classList.remove(t),s.push(t))}),r.forEach(t=>{e.classList.contains(t)||(e.classList.add(t),n.push(t))}),()=>{s.forEach(t=>e.classList.add(t)),n.forEach(t=>e.classList.remove(t))}}return"function"==typeof t?si(e,t()):sr(e,t)}function sr(e,t){var i;return i=(t=!0===t?t="":t||"").split(" ").filter(t=>!e.classList.contains(t)).filter(Boolean),e.classList.add(...i),()=>{e.classList.remove(...i)}}function so(e,t){let i,r;return"object"==typeof t&&null!==t?(i={},Object.entries(t).forEach(([t,r])=>{i[t]=e.style[t],t.startsWith("--")||(t=t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()),e.style.setProperty(t,r)}),setTimeout(()=>{0===e.style.length&&e.removeAttribute("style")}),()=>{so(e,i)}):(r=e.getAttribute("style",t),e.setAttribute("style",t),()=>{e.setAttribute("style",r||"")})}function sn(e,t=()=>{}){let i=!1;return function(){i?t.apply(this,arguments):(i=!0,e.apply(this,arguments))}}function ss(e,t,i={}){e._x_transition||(e._x_transition={enter:{during:i,start:i,end:i},leave:{during:i,start:i,end:i},in(i=()=>{},r=()=>{}){sl(e,t,{during:this.enter.during,start:this.enter.start,end:this.enter.end},i,r)},out(i=()=>{},r=()=>{}){sl(e,t,{during:this.leave.during,start:this.leave.start,end:this.leave.end},i,r)}})}function sl(e,t,{during:i,start:r,end:o}={},n=()=>{},s=()=>{}){var l;let a,c,u,d,h,p,f;if(e._x_transitioning&&e._x_transitioning.cancel(),0===Object.keys(i).length&&0===Object.keys(r).length&&0===Object.keys(o).length){n(),s();return}l={start(){a=t(e,r)},during(){c=t(e,i)},before:n,end(){a(),u=t(e,o)},after:s,cleanup(){c(),u()}},f=sn(()=>{ny(()=>{d=!0,h||l.before(),p||(l.end(),st()),l.after(),e.isConnected&&l.cleanup(),delete e._x_transitioning})}),e._x_transitioning={beforeCancels:[],beforeCancel(e){this.beforeCancels.push(e)},cancel:sn(function(){for(;this.beforeCancels.length;)this.beforeCancels.shift()();f()}),finish:f},ny(()=>{l.start(),l.during()}),n9=!0,requestAnimationFrame(()=>{if(d)return;let t=1e3*Number(getComputedStyle(e).transitionDuration.replace(/,.*/,"").replace("s","")),i=1e3*Number(getComputedStyle(e).transitionDelay.replace(/,.*/,"").replace("s",""));0===t&&(t=1e3*Number(getComputedStyle(e).animationDuration.replace("s",""))),ny(()=>{l.before()}),h=!0,requestAnimationFrame(()=>{d||(ny(()=>{l.end()}),st(),setTimeout(e._x_transitioning.finish,t+i),p=!0)})})}function sa(e,t,i){if(-1===e.indexOf(t))return i;let r=e[e.indexOf(t)+1];if(!r||"scale"===t&&isNaN(r))return i;if("duration"===t||"delay"===t){let e=r.match(/([0-9]+)ms/);if(e)return e[1]}return"origin"===t&&["top","right","left","center","bottom"].includes(e[e.indexOf(t)+2])?[r,e[e.indexOf(t)+2]].join(" "):r}nW("transition",(e,{value:t,modifiers:i,expression:r},{evaluate:o})=>{var n,s;let l,a,c,u,d,h,p,f,b,m,g,v,y,_;"function"==typeof r&&(r=o(r)),!1!==r&&(r&&"boolean"!=typeof r?(n=r,ss(e,si,""),({enter:t=>{e._x_transition.enter.during=t},"enter-start":t=>{e._x_transition.enter.start=t},"enter-end":t=>{e._x_transition.enter.end=t},leave:t=>{e._x_transition.leave.during=t},"leave-start":t=>{e._x_transition.leave.start=t},"leave-end":t=>{e._x_transition.leave.end=t}})[t](n)):(s=i,ss(e,so),a=(l=!s.includes("in")&&!s.includes("out")&&!t)||s.includes("in")||["enter"].includes(t),c=l||s.includes("out")||["leave"].includes(t),s.includes("in")&&!l&&(s=s.filter((e,t)=>t<s.indexOf("out"))),s.includes("out")&&!l&&(s=s.filter((e,t)=>t>s.indexOf("out"))),d=(u=!s.includes("opacity")&&!s.includes("scale"))||s.includes("opacity"),h=u||s.includes("scale"),p=d?0:1,f=h?sa(s,"scale",95)/100:1,b=sa(s,"delay",0)/1e3,m=sa(s,"origin","center"),g="opacity, transform",v=sa(s,"duration",150)/1e3,y=sa(s,"duration",75)/1e3,_="cubic-bezier(0.4, 0.0, 0.2, 1)",a&&(e._x_transition.enter.during={transformOrigin:m,transitionDelay:`${b}s`,transitionProperty:g,transitionDuration:`${v}s`,transitionTimingFunction:_},e._x_transition.enter.start={opacity:p,transform:`scale(${f})`},e._x_transition.enter.end={opacity:1,transform:"scale(1)"}),c&&(e._x_transition.leave.during={transformOrigin:m,transitionDelay:`${b}s`,transitionProperty:g,transitionDuration:`${y}s`,transitionTimingFunction:_},e._x_transition.leave.start={opacity:1,transform:"scale(1)"},e._x_transition.leave.end={opacity:p,transform:`scale(${f})`})))}),window.Element.prototype._x_toggleAndCascadeWithTransitions=function(e,t,i,r){let o="visible"===document.visibilityState?requestAnimationFrame:setTimeout,n=()=>o(i);if(t){e._x_transition&&(e._x_transition.enter||e._x_transition.leave)?e._x_transition.enter&&(Object.entries(e._x_transition.enter.during).length||Object.entries(e._x_transition.enter.start).length||Object.entries(e._x_transition.enter.end).length)?e._x_transition.in(i):n():e._x_transition?e._x_transition.in(i):n();return}e._x_hidePromise=e._x_transition?new Promise((t,i)=>{e._x_transition.out(()=>{},()=>t(r)),e._x_transitioning&&e._x_transitioning.beforeCancel(()=>i({isFromCancelledTransition:!0}))}):Promise.resolve(r),queueMicrotask(()=>{let t=function e(t){let i=t.parentNode;if(i)return i._x_hidePromise?i:e(i)}(e);t?(t._x_hideChildren||(t._x_hideChildren=[]),t._x_hideChildren.push(e)):o(()=>{let t=e=>{let i=Promise.all([e._x_hidePromise,...(e._x_hideChildren||[]).map(t)]).then(([e])=>e());return delete e._x_hidePromise,delete e._x_hideChildren,i};t(e).catch(e=>{if(!e.isFromCancelledTransition)throw e})})})};var sc=!1;function su(e,t=()=>{}){return(...i)=>sc?t(...i):e(...i)}var sd=[];function sh(e){sd.push(e)}var sp=!1;function sf(e){let t=ti;ti=(e,i)=>{let r=t(e);return tr(r),()=>{}},e(),ti=t}function sb(e,t,i,r=[]){var o;switch(e._x_bindings||(e._x_bindings=tt({})),e._x_bindings[t]=i,t=r.includes("camel")?t.toLowerCase().replace(/-(\w)/g,(e,t)=>t.toUpperCase()):t){case"value":!function(e,t){if("radio"===e.type){var i;void 0===e.attributes.value&&(e.value=t),window.fromModel&&("boolean"==typeof t?e.checked=sg(e.value)===t:e.checked=(i=e.value,i==t))}else if("checkbox"===e.type)Number.isInteger(t)?e.value=t:Array.isArray(t)||"boolean"==typeof t||[null,void 0].includes(t)?Array.isArray(t)?e.checked=t.some(t=>t==e.value):e.checked=!!t:e.value=String(t);else if("SELECT"===e.tagName)!function(e,t){let i=[].concat(t).map(e=>e+"");Array.from(e.options).forEach(e=>{e.selected=i.includes(e.value)})}(e,t);else{if(e.value===t)return;e.value=void 0===t?"":t}}(e,i);break;case"style":e._x_undoAddedStyles&&e._x_undoAddedStyles(),e._x_undoAddedStyles=so(e,i);break;case"class":e._x_undoAddedClasses&&e._x_undoAddedClasses(),e._x_undoAddedClasses=si(e,i);break;case"selected":case"checked":sm(e,o=t,i),e[o]!==i&&(e[o]=i);break;default:sm(e,t,i)}}function sm(e,t,i){var r;[null,void 0,!1].includes(i)&&!["aria-pressed","aria-checked","aria-expanded","aria-selected"].includes(t)?e.removeAttribute(t):(sv(t)&&(i=t),r=i,e.getAttribute(t)!=r&&e.setAttribute(t,r))}function sg(e){return!![1,"1","true","on","yes",!0].includes(e)||![0,"0","false","off","no",!1].includes(e)&&(e?!!e:null)}function sv(e){return["disabled","checked","required","readonly","hidden","open","selected","autofocus","itemscope","multiple","novalidate","allowfullscreen","allowpaymentrequest","formnovalidate","autoplay","controls","loop","muted","playsinline","default","ismap","reversed","async","defer","nomodule"].includes(e)}function sy(e,t,i){let r=e.getAttribute(t);return null===r?"function"==typeof i?i():i:""===r||(sv(t)?!![t,"true"].includes(r):r)}function s_(e,t){var i;return function(){var r=this,o=arguments;clearTimeout(i),i=setTimeout(function(){i=null,e.apply(r,o)},t)}}function sw(e,t){let i;return function(){let r=arguments;i||(e.apply(this,r),i=!0,setTimeout(()=>i=!1,t))}}function sx({get:e,set:t},{get:i,set:r}){let o,n=!0,s=ti(()=>{let s=e(),l=i();if(n)r(sk(s)),n=!1;else{let e=JSON.stringify(s),i=JSON.stringify(l);e!==o?r(sk(s)):e!==i&&t(sk(l))}o=JSON.stringify(e()),JSON.stringify(i())});return()=>{tr(s)}}function sk(e){return"object"==typeof e?JSON.parse(JSON.stringify(e)):e}var s$={},sC=!1,sA={};function sS(e,t,i){let r=[];for(;r.length;)r.pop()();let o=Object.entries(t).map(([e,t])=>({name:e,value:t})),n=nJ(o);return nK(e,o=o.map(e=>n.find(t=>t.name===e.name)?{name:`x-bind:${e.name}`,value:`"${e.value}"`}:e),i).map(e=>{r.push(e.runCleanups),e()}),()=>{for(;r.length;)r.pop()()}}var sE={},sT={get reactive(){return tt},get release(){return tr},get effect(){return ti},get raw(){return to},version:"3.13.5",flushAndStopDeferringMutations:function(){n_=!1,nx(nw),nw=[]},dontAutoEvaluateFunctions:nM,disableEffectScheduling:function(e){o0=!1,e(),o0=!0},startObservingMutations:nm,stopObservingMutations:ng,setReactivityEngine:function(e){tt=e.reactive,tr=e.release,ti=t=>e.effect(t,{scheduler:e=>{if(o0)oY.includes(e)||oY.push(e),oG||oJ||(oJ=!0,queueMicrotask(oX));else e()}}),to=e.raw},onAttributeRemoved:nh,onAttributesAdded:nd,closestDataStack:nC,skipDuringClone:su,onlyDuringClone:function(e){return(...t)=>sc&&e(...t)},addRootSelector:ne,addInitSelector:nt,interceptClone:sh,addScopeToNode:n$,deferMutations:function(){n_=!0},mapAttributes:n2,evaluateLater:nB,interceptInit:function(e){no.push(e)},setEvaluator:function(e){nD=e},mergeProxies:nA,extractProp:function(e,t,i,r=!0){if(e._x_bindings&&void 0!==e._x_bindings[t])return e._x_bindings[t];if(e._x_inlineBindings&&void 0!==e._x_inlineBindings[t]){let i=e._x_inlineBindings[t];return i.extract=r,nM(()=>nR(e,i.expression))}return sy(e,t,i)},findClosest:nr,onElRemoved:nu,closestRoot:ni,destroyTree:ns,interceptor:nz,transition:sl,setStyles:so,mutateDom:ny,directive:nW,entangle:sx,throttle:sw,debounce:s_,evaluate:nR,initTree:nn,nextTick:se,prefixed:nV,prefix:function(e){nq=e},plugin:function(e){(Array.isArray(e)?e:[e]).forEach(e=>e(sT))},magic:function(e,t){nO[e]=t},store:function(e,t){if(sC||(s$=tt(s$),sC=!0),void 0===t)return s$[e];s$[e]=t,"object"==typeof t&&null!==t&&t.hasOwnProperty("init")&&"function"==typeof t.init&&s$[e].init(),nT(s$[e])},start:function(){var e;o6&&o3("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."),o6=!0,document.body||o3("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"),o2(document,"alpine:init"),o2(document,"alpine:initializing"),nm(),e=e=>nn(e,o5),nc.push(e),nu(e=>ns(e)),nd((e,t)=>{nK(e,t).forEach(e=>e())}),Array.from(document.querySelectorAll(o9().join(","))).filter(e=>!ni(e.parentElement,!0)).forEach(e=>{nn(e)}),o2(document,"alpine:initialized")},clone:function(e,t){t._x_dataStack||(t._x_dataStack=e._x_dataStack),sc=!0,sp=!0,sf(()=>{let e;e=!1,nn(t,(t,i)=>{o5(t,(t,r)=>{if(e&&o7().some(e=>t.matches(e)))return r();e=!0,i(t,r)})})}),sc=!1,sp=!1},cloneNode:function(e,t){sd.forEach(i=>i(e,t)),sc=!0,sf(()=>{nn(t,(e,t)=>{t(e,()=>{})})}),sc=!1},bound:function(e,t,i){return e._x_bindings&&void 0!==e._x_bindings[t]?e._x_bindings[t]:sy(e,t,i)},$data:nk,watch:o1,walk:o5,data:function(e,t){sE[e]=t},bind:function(e,t){let i="function"!=typeof t?()=>t:t;return e instanceof Element?sS(e,i()):(sA[e]=i,()=>{})}},sz=Object.freeze({});Object.freeze([]);var sO=Object.prototype.hasOwnProperty,sP=(e,t)=>sO.call(e,t),sL=Array.isArray,sI=e=>"[object Map]"===sD(e),sN=e=>"string"==typeof e,sM=e=>"symbol"==typeof e,sR=e=>null!==e&&"object"==typeof e,sB=Object.prototype.toString,sD=e=>sB.call(e),sF=e=>sD(e).slice(8,-1),sj=e=>sN(e)&&"NaN"!==e&&"-"!==e[0]&&""+parseInt(e,10)===e,sU=e=>{let t=Object.create(null);return i=>t[i]||(t[i]=e(i))},sq=/-(\w)/g;sU(e=>e.replace(sq,(e,t)=>t?t.toUpperCase():""));var sV=/\B([A-Z])/g;sU(e=>e.replace(sV,"-$1").toLowerCase());var sH=sU(e=>e.charAt(0).toUpperCase()+e.slice(1));sU(e=>e?`on${sH(e)}`:"");var sW=(e,t)=>e!==t&&(e==e||t==t),sK=new WeakMap,sJ=[],sG=Symbol("iterate"),sY=Symbol("Map key iterate"),sZ=0;function sQ(e){let{deps:t}=e;if(t.length){for(let i=0;i<t.length;i++)t[i].delete(e);t.length=0}}var sX=!0,s0=[];function s1(){let e=s0.pop();sX=void 0===e||e}function s2(e,t,i){if(!sX||void 0===tn)return;let r=sK.get(e);r||sK.set(e,r=new Map);let o=r.get(i);o||r.set(i,o=new Set),!o.has(tn)&&(o.add(tn),tn.deps.push(o),tn.options.onTrack&&tn.options.onTrack({effect:tn,target:e,type:t,key:i}))}function s5(e,t,i,r,o,n){let s=sK.get(e);if(!s)return;let l=new Set,a=e=>{e&&e.forEach(e=>{(e!==tn||e.allowRecurse)&&l.add(e)})};if("clear"===t)s.forEach(a);else if("length"===i&&sL(e))s.forEach((e,t)=>{("length"===t||t>=r)&&a(e)});else switch(void 0!==i&&a(s.get(i)),t){case"add":sL(e)?sj(i)&&a(s.get("length")):(a(s.get(sG)),sI(e)&&a(s.get(sY)));break;case"delete":!sL(e)&&(a(s.get(sG)),sI(e)&&a(s.get(sY)));break;case"set":sI(e)&&a(s.get(sG))}l.forEach(s=>{s.options.onTrigger&&s.options.onTrigger({effect:s,target:e,key:i,type:t,newValue:r,oldValue:o,oldTarget:n}),s.options.scheduler?s.options.scheduler(s):s()})}var s3=function(e,t){let i=Object.create(null),r=e.split(",");for(let e=0;e<r.length;e++)i[r[e]]=!0;return e=>!!i[e]}("__proto__,__v_isRef,__isVue"),s6=new Set(Object.getOwnPropertyNames(Symbol).map(e=>Symbol[e]).filter(sM)),s4=s9(),s8=s9(!0),s7=function(){let e={};return["includes","indexOf","lastIndexOf"].forEach(t=>{e[t]=function(...e){let i=lO(this);for(let e=0,t=this.length;e<t;e++)s2(i,"get",e+"");let r=i[t](...e);return -1===r||!1===r?i[t](...e.map(lO)):r}}),["push","pop","shift","unshift","splice"].forEach(t=>{e[t]=function(...e){s0.push(sX),sX=!1;let i=lO(this)[t].apply(this,e);return s1(),i}}),e}();function s9(e=!1,t=!1){return function(i,r,o){if("__v_isReactive"===r)return!e;if("__v_isReadonly"===r)return e;if("__v_raw"===r&&o===(e?t?lS:lA:t?lC:l$).get(i))return i;let n=sL(i);if(!e&&n&&sP(s7,r))return Reflect.get(s7,r,o);let s=Reflect.get(i,r,o);return(sM(r)?s6.has(r):s3(r))?s:(e||s2(i,"get",r),t)?s:lP(s)?n&&sj(r)?s:s.value:sR(s)?e?lT(s):lE(s):s}}var le={get:s4,set:function(e=!1){return function(t,i,r,o){let n=t[i];if(!e&&(r=lO(r),n=lO(n),!sL(t)&&lP(n)&&!lP(r)))return n.value=r,!0;let s=sL(t)&&sj(i)?Number(i)<t.length:sP(t,i),l=Reflect.set(t,i,r,o);return t===lO(o)&&(s?sW(r,n)&&s5(t,"set",i,r,n):s5(t,"add",i,r)),l}}(),deleteProperty:function(e,t){let i=sP(e,t),r=e[t],o=Reflect.deleteProperty(e,t);return o&&i&&s5(e,"delete",t,void 0,r),o},has:function(e,t){let i=Reflect.has(e,t);return sM(t)&&s6.has(t)||s2(e,"has",t),i},ownKeys:function(e){return s2(e,"iterate",sL(e)?"length":sG),Reflect.ownKeys(e)}},lt={get:s8,set:(e,t)=>(console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`,e),!0),deleteProperty:(e,t)=>(console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`,e),!0)},li=e=>sR(e)?lE(e):e,lr=e=>sR(e)?lT(e):e,lo=e=>e,ln=e=>Reflect.getPrototypeOf(e);function ls(e,t,i=!1,r=!1){let o=lO(e=e.__v_raw),n=lO(t);t!==n&&(i||s2(o,"get",t)),i||s2(o,"get",n);let{has:s}=ln(o),l=r?lo:i?lr:li;return s.call(o,t)?l(e.get(t)):s.call(o,n)?l(e.get(n)):void(e!==o&&e.get(t))}function ll(e,t=!1){let i=this.__v_raw,r=lO(i),o=lO(e);return e!==o&&(t||s2(r,"has",e)),t||s2(r,"has",o),e===o?i.has(e):i.has(e)||i.has(o)}function la(e,t=!1){return e=e.__v_raw,t||s2(lO(e),"iterate",sG),Reflect.get(e,"size",e)}function lc(e){e=lO(e);let t=lO(this);return ln(t).has.call(t,e)||(t.add(e),s5(t,"add",e,e)),this}function lu(e,t){t=lO(t);let i=lO(this),{has:r,get:o}=ln(i),n=r.call(i,e);n?lk(i,r,e):(e=lO(e),n=r.call(i,e));let s=o.call(i,e);return i.set(e,t),n?sW(t,s)&&s5(i,"set",e,t,s):s5(i,"add",e,t),this}function ld(e){let t=lO(this),{has:i,get:r}=ln(t),o=i.call(t,e);o?lk(t,i,e):(e=lO(e),o=i.call(t,e));let n=r?r.call(t,e):void 0,s=t.delete(e);return o&&s5(t,"delete",e,void 0,n),s}function lh(){let e=lO(this),t=0!==e.size,i=sI(e)?new Map(e):new Set(e),r=e.clear();return t&&s5(e,"clear",void 0,void 0,i),r}function lp(e,t){return function(i,r){let o=this,n=o.__v_raw,s=lO(n),l=t?lo:e?lr:li;return e||s2(s,"iterate",sG),n.forEach((e,t)=>i.call(r,l(e),l(t),o))}}function lf(e,t,i){return function(...r){let o=this.__v_raw,n=lO(o),s=sI(n),l="entries"===e||e===Symbol.iterator&&s,a=o[e](...r),c=i?lo:t?lr:li;return t||s2(n,"iterate","keys"===e&&s?sY:sG),{next(){let{value:e,done:t}=a.next();return t?{value:e,done:t}:{value:l?[c(e[0]),c(e[1])]:c(e),done:t}},[Symbol.iterator](){return this}}}}function lb(e){return function(...t){{let i=t[0]?`on key "${t[0]}" `:"";console.warn(`${sH(e)} operation ${i}failed: target is readonly.`,lO(this))}return"delete"!==e&&this}}var[lm,lg,lv,ly]=function(){let e={get(e){return ls(this,e)},get size(){return la(this)},has:ll,add:lc,set:lu,delete:ld,clear:lh,forEach:lp(!1,!1)},t={get(e){return ls(this,e,!1,!0)},get size(){return la(this)},has:ll,add:lc,set:lu,delete:ld,clear:lh,forEach:lp(!1,!0)},i={get(e){return ls(this,e,!0)},get size(){return la(this,!0)},has(e){return ll.call(this,e,!0)},add:lb("add"),set:lb("set"),delete:lb("delete"),clear:lb("clear"),forEach:lp(!0,!1)},r={get(e){return ls(this,e,!0,!0)},get size(){return la(this,!0)},has(e){return ll.call(this,e,!0)},add:lb("add"),set:lb("set"),delete:lb("delete"),clear:lb("clear"),forEach:lp(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(o=>{e[o]=lf(o,!1,!1),i[o]=lf(o,!0,!1),t[o]=lf(o,!1,!0),r[o]=lf(o,!0,!0)}),[e,i,t,r]}();function l_(e,t){let i=t?e?ly:lv:e?lg:lm;return(t,r,o)=>"__v_isReactive"===r?!e:"__v_isReadonly"===r?e:"__v_raw"===r?t:Reflect.get(sP(i,r)&&r in t?i:t,r,o)}var lw={get:l_(!1,!1)},lx={get:l_(!0,!1)};function lk(e,t,i){let r=lO(i);if(r!==i&&t.call(e,r)){let t=sF(e);console.warn(`Reactive ${t} contains both the raw and reactive versions of the same object${"Map"===t?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)}}var l$=new WeakMap,lC=new WeakMap,lA=new WeakMap,lS=new WeakMap;function lE(e){return e&&e.__v_isReadonly?e:lz(e,!1,le,lw,l$)}function lT(e){return lz(e,!0,lt,lx,lA)}function lz(e,t,i,r,o){if(!sR(e))return console.warn(`value cannot be made reactive: ${String(e)}`),e;if(e.__v_raw&&!(t&&e.__v_isReactive))return e;let n=o.get(e);if(n)return n;let s=e.__v_skip||!Object.isExtensible(e)?0:function(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}(sF(e));if(0===s)return e;let l=new Proxy(e,2===s?r:i);return o.set(e,l),l}function lO(e){return e&&lO(e.__v_raw)||e}function lP(e){return!!(e&&!0===e.__v_isRef)}e1=()=>se,nO.nextTick=e1,e2=e=>o2.bind(o2,e),nO.dispatch=e2,e5=(e,{evaluateLater:t,cleanup:i})=>(e,r)=>{let o=t(e);i(o1(()=>{let e;return o(t=>e=t),e},r))},nO.watch=e5,e3=function(){return s$},nO.store=e3,e6=e=>nk(e),nO.data=e6,e4=e=>ni(e),nO.root=e4,e8=e=>(e._x_refs_proxy||(e._x_refs_proxy=nA(function(e){let t=[],i=e;for(;i;)i._x_refs&&t.push(i._x_refs),i=i.parentNode;return t}(e))),e._x_refs_proxy),nO.refs=e8;var lL={};function lI(e){return lL[e]||(lL[e]=0),++lL[e]}function lN(e,t,i){var r;r=r=>o3(`You can't use [$${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${i}`,r),nO[t]=r}e7=(e,{cleanup:t})=>(i,r=null)=>(function(e,t,i,r){if(e._x_id||(e._x_id={}),e._x_id[t])return e._x_id[t];let o=r();return e._x_id[t]=o,i(()=>{delete e._x_id[t]}),o})(e,`${i}${r?`-${r}`:""}`,t,()=>{let t=nr(e,e=>{if(e._x_ids&&e._x_ids[i])return!0}),o=t?t._x_ids[i]:lI(i);return r?`${i}-${o}-${r}`:`${i}-${o}`}),nO.id=e7,sh((e,t)=>{e._x_id&&(t._x_id=e._x_id)}),e9=e=>e,nO.el=e9,lN("Focus","focus","focus"),lN("Persist","persist","persist"),nW("modelable",(e,{expression:t},{effect:i,evaluateLater:r,cleanup:o})=>{let n=r(t),s=()=>{let e;return n(t=>e=t),e},l=r(`${t} = __placeholder`),a=e=>l(()=>{},{scope:{__placeholder:e}});a(s()),queueMicrotask(()=>{if(!e._x_model)return;e._x_removeModelListeners.default();let t=e._x_model.get,i=e._x_model.set;o(sx({get:()=>t(),set(e){i(e)}},{get:()=>s(),set(e){a(e)}}))})}),nW("teleport",(e,{modifiers:t,expression:i},{cleanup:r})=>{"template"!==e.tagName.toLowerCase()&&o3("x-teleport can only be used on a <template> tag",e);let o=lR(i),n=e.content.cloneNode(!0).firstElementChild;e._x_teleport=n,n._x_teleportBack=e,e.setAttribute("data-teleport-template",!0),n.setAttribute("data-teleport-target",!0),e._x_forwardEvents&&e._x_forwardEvents.forEach(t=>{n.addEventListener(t,t=>{t.stopPropagation(),e.dispatchEvent(new t.constructor(t.type,t))})}),n$(n,{},e);let s=(e,t,i)=>{i.includes("prepend")?t.parentNode.insertBefore(e,t):i.includes("append")?t.parentNode.insertBefore(e,t.nextSibling):t.appendChild(e)};ny(()=>{s(n,o,t),nn(n),n._x_ignore=!0}),e._x_teleportPutBack=()=>{let r=lR(i);ny(()=>{s(e._x_teleport,r,t)})},r(()=>n.remove())});var lM=document.createElement("div");function lR(e){let t=su(()=>document.querySelector(e),()=>lM)();return t||o3(`Cannot find x-teleport element for selector: "${e}"`),t}var lB=()=>{};function lD(e,t,i,r){let o=e,n=e=>r(e),s={},l=(e,t)=>i=>t(e,i);if(i.includes("dot")&&(t=t.replace(/-/g,".")),i.includes("camel")&&(t=t.toLowerCase().replace(/-(\w)/g,(e,t)=>t.toUpperCase())),i.includes("passive")&&(s.passive=!0),i.includes("capture")&&(s.capture=!0),i.includes("window")&&(o=window),i.includes("document")&&(o=document),i.includes("debounce")){let e=i[i.indexOf("debounce")+1]||"invalid-wait",t=lF(e.split("ms")[0])?Number(e.split("ms")[0]):250;n=s_(n,t)}if(i.includes("throttle")){let e=i[i.indexOf("throttle")+1]||"invalid-wait",t=lF(e.split("ms")[0])?Number(e.split("ms")[0]):250;n=sw(n,t)}return i.includes("prevent")&&(n=l(n,(e,t)=>{t.preventDefault(),e(t)})),i.includes("stop")&&(n=l(n,(e,t)=>{t.stopPropagation(),e(t)})),i.includes("self")&&(n=l(n,(t,i)=>{i.target===e&&t(i)})),(i.includes("away")||i.includes("outside"))&&(o=document,n=l(n,(t,i)=>{e.contains(i.target)||!1===i.target.isConnected||e.offsetWidth<1&&e.offsetHeight<1||!1===e._x_isShown||t(i)})),i.includes("once")&&(n=l(n,(e,i)=>{e(i),o.removeEventListener(t,n,s)})),n=l(n,(e,r)=>{!(["keydown","keyup"].includes(t)&&function(e,t){let i=t.filter(e=>!["window","document","prevent","stop","once","capture"].includes(e));if(i.includes("debounce")){let e=i.indexOf("debounce");i.splice(e,lF((i[e+1]||"invalid-wait").split("ms")[0])?2:1)}if(i.includes("throttle")){let e=i.indexOf("throttle");i.splice(e,lF((i[e+1]||"invalid-wait").split("ms")[0])?2:1)}if(0===i.length||1===i.length&&lj(e.key).includes(i[0]))return!1;let r=["ctrl","shift","alt","meta","cmd","super"].filter(e=>i.includes(e));return i=i.filter(e=>!r.includes(e)),!(r.length>0&&r.filter(t=>(("cmd"===t||"super"===t)&&(t="meta"),e[`${t}Key`])).length===r.length&&lj(e.key).includes(i[0]))}(r,i))&&e(r)}),o.addEventListener(t,n,s),()=>{o.removeEventListener(t,n,s)}}function lF(e){return!Array.isArray(e)&&!isNaN(e)}function lj(e){var t;if(!e)return[];e=[" ","_"].includes(t=e)?t:t.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[_\s]/,"-").toLowerCase();let i={ctrl:"control",slash:"/",space:" ",spacebar:" ",cmd:"meta",esc:"escape",up:"arrow-up",down:"arrow-down",left:"arrow-left",right:"arrow-right",period:".",equal:"=",minus:"-",underscore:"_"};return i[e]=e,Object.keys(i).map(t=>{if(i[t]===e)return t}).filter(e=>e)}function lU(e){let t=e?parseFloat(e):null;return Array.isArray(t)||isNaN(t)?e:t}function lq(e){return null!==e&&"object"==typeof e&&"function"==typeof e.get&&"function"==typeof e.set}lB.inline=(e,{modifiers:t},{cleanup:i})=>{t.includes("self")?e._x_ignoreSelf=!0:e._x_ignore=!0,i(()=>{t.includes("self")?delete e._x_ignoreSelf:delete e._x_ignore})},nW("ignore",lB),nW("effect",su((e,{expression:t},{effect:i})=>{i(nB(e,t))})),nW("model",(e,{modifiers:t,expression:i},{effect:r,cleanup:o})=>{let n,s=e;t.includes("parent")&&(s=e.parentNode);let l=nB(s,i);n="string"==typeof i?nB(s,`${i} = __placeholder`):"function"==typeof i&&"string"==typeof i()?nB(s,`${i()} = __placeholder`):()=>{};let a=()=>{let e;return l(t=>e=t),lq(e)?e.get():e},c=e=>{let t;l(e=>t=e),lq(t)?t.set(e):n(()=>{},{scope:{__placeholder:e}})};"string"==typeof i&&"radio"===e.type&&ny(()=>{e.hasAttribute("name")||e.setAttribute("name",i)});var u="select"===e.tagName.toLowerCase()||["checkbox","radio"].includes(e.type)||t.includes("lazy")?"change":"input";let d=sc?()=>{}:lD(e,u,t,i=>{var r;c((r=a(),ny(()=>{if(i instanceof CustomEvent&&void 0!==i.detail)return null!==i.detail&&void 0!==i.detail?i.detail:i.target.value;if("checkbox"===e.type){if(!Array.isArray(r))return i.target.checked;{let e=null;return e=t.includes("number")?lU(i.target.value):t.includes("boolean")?sg(i.target.value):i.target.value,i.target.checked?r.concat([e]):r.filter(t=>t!=e)}}return"select"===e.tagName.toLowerCase()&&e.multiple?t.includes("number")?Array.from(i.target.selectedOptions).map(e=>lU(e.value||e.text)):t.includes("boolean")?Array.from(i.target.selectedOptions).map(e=>sg(e.value||e.text)):Array.from(i.target.selectedOptions).map(e=>e.value||e.text):t.includes("number")?lU(i.target.value):t.includes("boolean")?sg(i.target.value):t.includes("trim")?i.target.value.trim():i.target.value})))});if(t.includes("fill")&&([void 0,null,""].includes(a())||"checkbox"===e.type&&Array.isArray(a()))&&e.dispatchEvent(new Event(u,{})),e._x_removeModelListeners||(e._x_removeModelListeners={}),e._x_removeModelListeners.default=d,o(()=>e._x_removeModelListeners.default()),e.form){let t=lD(e.form,"reset",[],t=>{se(()=>e._x_model&&e._x_model.set(e.value))});o(()=>t())}e._x_model={get:()=>a(),set(e){c(e)}},e._x_forceModelUpdate=t=>{void 0===t&&"string"==typeof i&&i.match(/\./)&&(t=""),window.fromModel=!0,ny(()=>sb(e,"value",t)),delete window.fromModel},r(()=>{let i=a();t.includes("unintrusive")&&document.activeElement.isSameNode(e)||e._x_forceModelUpdate(i)})}),nW("cloak",e=>queueMicrotask(()=>ny(()=>e.removeAttribute(nV("cloak"))))),nt(()=>`[${nV("init")}]`),nW("init",su((e,{expression:t},{evaluate:i})=>"string"==typeof t?!!t.trim()&&i(t,{},!1):i(t,{},!1))),nW("text",(e,{expression:t},{effect:i,evaluateLater:r})=>{let o=r(t);i(()=>{o(t=>{ny(()=>{e.textContent=t})})})}),nW("html",(e,{expression:t},{effect:i,evaluateLater:r})=>{let o=r(t);i(()=>{o(t=>{ny(()=>{e.innerHTML=t,e._x_ignoreSelf=!0,nn(e),delete e._x_ignoreSelf})})})}),n2(nX(":",nV("bind:")));var lV=(e,{value:t,modifiers:i,expression:r,original:o},{effect:n})=>{if(!t){let t={};Object.entries(sA).forEach(([e,i])=>{Object.defineProperty(t,e,{get:()=>(...e)=>i(...e)})}),nB(e,r)(t=>{sS(e,t,o)},{scope:t});return}if("key"===t)return void(e._x_keyExpression=r);if(e._x_inlineBindings&&e._x_inlineBindings[t]&&e._x_inlineBindings[t].extract)return;let s=nB(e,r);n(()=>s(o=>{void 0===o&&"string"==typeof r&&r.match(/\./)&&(o=""),ny(()=>sb(e,t,o,i))}))};function lH(e,t,i,r){let o={};return/^\[.*\]$/.test(e.item)&&Array.isArray(t)?e.item.replace("[","").replace("]","").split(",").map(e=>e.trim()).forEach((e,i)=>{o[e]=t[i]}):/^\{.*\}$/.test(e.item)&&!Array.isArray(t)&&"object"==typeof t?e.item.replace("{","").replace("}","").split(",").map(e=>e.trim()).forEach(e=>{o[e]=t[e]}):o[e.item]=t,e.index&&(o[e.index]=i),e.collection&&(o[e.collection]=r),o}function lW(){}function lK(e,t,i){nW(t,r=>o3(`You can't use [x-${t}] without first installing the "${e}" plugin here: https://alpinejs.dev/plugins/${i}`,r))}function lJ(e,t,i){let r,o,n,s,l,a,c,u,d;function h(e){return e&&1===e.nodeType&&o(e)}function p(e,t,i){if(!lG(u,t)){let r=t.cloneNode(!0);return e.insertBefore(r,i),d(r),r}return t}return!function(){if(lY)return;lY=!0;let e=Element.prototype.setAttribute,t=document.createElement("div");Element.prototype.setAttribute=function(i,r){if(!i.includes("@"))return e.call(this,i,r);t.innerHTML=`<span ${i}="${r}"></span>`;let o=t.firstElementChild.getAttributeNode(i);t.firstElementChild.removeAttributeNode(o),this.setAttributeNode(o)}}(),!function(e={}){let t=()=>{};s=e.updating||t,l=e.updated||t,a=e.removing||t,c=e.removed||t,u=e.adding||t,d=e.added||t,o=e.key||(e=>e.getAttribute("key")),n=e.lookahead||!1}(i),r="string"==typeof t?function(e){let t=document.createElement("template");return t.innerHTML=e,t.content.firstElementChild}(t):t,window.Alpine&&window.Alpine.closestDataStack&&!e._x_dataStack&&(r._x_dataStack=window.Alpine.closestDataStack(e),r._x_dataStack&&window.Alpine.cloneNode(e,r)),function e(t,i){if(t.nodeType!=i.nodeType||t.nodeName!=i.nodeName||h(t)!=h(i))return function(e,t){if(lG(a,e))return;let i=t.cloneNode(!0);lG(u,i)||(e.replaceWith(i),c(e),d(i))}(t,i);let r=!1;if(!lG(s,t,i,()=>r=!0)){if(1===t.nodeType&&window.Alpine&&window.Alpine.cloneNode(t,i),3===i.nodeType||8===i.nodeType){let e;e=i.nodeValue,t.nodeValue!==e&&(t.nodeValue=e),l(t,i);return}r||function(e,t){if(e._x_transitioning||e._x_isShown&&!t._x_isShown||!e._x_isShown&&t._x_isShown)return;let i=Array.from(e.attributes),r=Array.from(t.attributes);for(let r=i.length-1;r>=0;r--){let o=i[r].name;t.hasAttribute(o)||e.removeAttribute(o)}for(let t=r.length-1;t>=0;t--){let i=r[t].name,o=r[t].value;e.getAttribute(i)!==o&&e.setAttribute(i,o)}}(t,i),l(t,i),function t(i,r){i._x_teleport&&(i=i._x_teleport),r._x_teleport&&(r=r._x_teleport);let o=function(e){let t={};for(let i of e){let e=h(i);e&&(t[e]=i)}return t}(i.children),s={},l=lQ(r),f=lQ(i);for(;l;){(function(e,t){let i=t&&t._x_bindings&&t._x_bindings.id;i&&(e.setAttribute("id",i),e.id=i)})(l,f);let a=h(l),c=h(f);if(!f){if(a&&s[a]){let e=s[a];i.appendChild(e),f=e}else{if(!lG(u,l)){let e=l.cloneNode(!0);i.appendChild(e),d(e)}l=lX(r,l);continue}}let b=e=>e&&8===e.nodeType&&"[if BLOCK]><![endif]"===e.textContent,m=e=>e&&8===e.nodeType&&"[if ENDBLOCK]><![endif]"===e.textContent;if(b(l)&&b(f)){let e=0,o=f;for(;f;){let t=lX(i,f);if(b(t))e++;else if(m(t)&&e>0)e--;else if(m(t)&&0===e){f=t;break}f=t}let n=f;e=0;let s=l;for(;l;){let t=lX(r,l);if(b(t))e++;else if(m(t)&&e>0)e--;else if(m(t)&&0===e){l=t;break}l=t}let a=l;t(new lZ(o,n),new lZ(s,a));continue}if(1===f.nodeType&&n&&!f.isEqualNode(l)){let e=lX(r,l),t=!1;for(;!t&&e;)1===e.nodeType&&f.isEqualNode(e)&&(t=!0,c=h(f=p(i,l,f))),e=lX(r,e)}if(a!==c){if(!a&&c){s[c]=f,f=p(i,l,f),s[c].remove(),f=lX(i,f),l=lX(r,l);continue}if(a&&!c&&o[a]&&(f.replaceWith(o[a]),f=o[a]),a&&c){let e=o[a];if(e)s[c]=f,f.replaceWith(e),f=e;else{s[c]=f,f=p(i,l,f),s[c].remove(),f=lX(i,f),l=lX(r,l);continue}}}let g=f&&lX(i,f);e(f,l),l=l&&lX(r,l),f=g}let b=[];for(;f;)lG(a,f)||b.push(f),f=lX(i,f);for(;b.length;){let e=b.shift();e.remove(),c(e)}}(t,i)}}(e,r),r=void 0,e}function lG(e,...t){let i=!1;return e(...t,()=>i=!0),i}lV.inline=(e,{value:t,modifiers:i,expression:r})=>{t&&(e._x_inlineBindings||(e._x_inlineBindings={}),e._x_inlineBindings[t]={expression:r,extract:!1})},nW("bind",lV),ne(()=>`[${nV("data")}]`),nW("data",(e,{expression:t},{cleanup:i})=>{if(sc&&(sp||e.hasAttribute("data-has-alpine-state")))return;t=""===t?"{}":t;let r={};nP(r,e);let o={};Object.entries(sE).forEach(([e,t])=>{Object.defineProperty(o,e,{get:()=>(...e)=>t.bind(r)(...e),enumerable:!1})});let n=nR(e,t,{scope:o});(void 0===n||!0===n)&&(n={}),nP(n,e);let s=tt(n);nT(s);let l=n$(e,s);s.init&&nR(e,s.init),i(()=>{s.destroy&&nR(e,s.destroy),l()})}),sh((e,t)=>{e._x_dataStack&&(t._x_dataStack=e._x_dataStack,t.setAttribute("data-has-alpine-state",!0))}),nW("show",(e,{modifiers:t,expression:i},{effect:r})=>{let o,n=nB(e,i);e._x_doHide||(e._x_doHide=()=>{ny(()=>{e.style.setProperty("display","none",t.includes("important")?"important":void 0)})}),e._x_doShow||(e._x_doShow=()=>{ny(()=>{1===e.style.length&&"none"===e.style.display?e.removeAttribute("style"):e.style.removeProperty("display")})});let s=()=>{e._x_doHide(),e._x_isShown=!1},l=()=>{e._x_doShow(),e._x_isShown=!0},a=()=>setTimeout(l),c=sn(e=>e?l():s(),t=>{"function"==typeof e._x_toggleAndCascadeWithTransitions?e._x_toggleAndCascadeWithTransitions(e,t,l,s):t?a():s()}),u=!0;r(()=>n(e=>{(u||e!==o)&&(t.includes("immediate")&&(e?a():s()),c(e),o=e,u=!1)}))}),nW("for",(e,{expression:t},{effect:i,cleanup:r})=>{let o=function(e){let t=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,i=e.match(/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/);if(!i)return;let r={};r.items=i[2].trim();let o=i[1].replace(/^\s*\(|\)\s*$/g,"").trim(),n=o.match(t);return n?(r.item=o.replace(t,"").trim(),r.index=n[1].trim(),n[2]&&(r.collection=n[2].trim())):r.item=o,r}(t),n=nB(e,o.items),s=nB(e,e._x_keyExpression||"index");e._x_prevKeys=[],e._x_lookup={},i(()=>{let t;return t=e=>"object"==typeof e&&!Array.isArray(e),void n(i=>{var r;Array.isArray(r=i)||isNaN(r)||!(i>=0)||(i=Array.from(Array(i).keys(),e=>e+1)),void 0===i&&(i=[]);let n=e._x_lookup,l=e._x_prevKeys,a=[],c=[];if(t(i))i=Object.entries(i).map(([e,t])=>{let r=lH(o,t,e,i);s(e=>c.push(e),{scope:{index:e,...r}}),a.push(r)});else for(let e=0;e<i.length;e++){let t=lH(o,i[e],e,i);s(e=>c.push(e),{scope:{index:e,...t}}),a.push(t)}let u=[],d=[],h=[],p=[];for(let e=0;e<l.length;e++){let t=l[e];-1===c.indexOf(t)&&h.push(t)}l=l.filter(e=>!h.includes(e));let f="template";for(let e=0;e<c.length;e++){let t=c[e],i=l.indexOf(t);if(-1===i)l.splice(e,0,t),u.push([f,e]);else if(i!==e){let t=l.splice(e,1)[0],r=l.splice(i-1,1)[0];l.splice(e,0,r),l.splice(i,0,t),d.push([t,r])}else p.push(t);f=t}for(let e=0;e<h.length;e++){let t=h[e];n[t]._x_effects&&n[t]._x_effects.forEach(oQ),n[t].remove(),n[t]=null,delete n[t]}for(let t=0;t<d.length;t++){let[i,r]=d[t],o=n[i],s=n[r],l=document.createElement("div");ny(()=>{s||o3('x-for ":key" is undefined or invalid',e),s.after(l),o.after(s),s._x_currentIfEl&&s.after(s._x_currentIfEl),l.before(o),o._x_currentIfEl&&o.after(o._x_currentIfEl),l.remove()}),s._x_refreshXForScope(a[c.indexOf(r)])}for(let t=0;t<u.length;t++){let[i,r]=u[t],o="template"===i?e:n[i];o._x_currentIfEl&&(o=o._x_currentIfEl);let s=a[r],l=c[r],d=document.importNode(e.content,!0).firstElementChild,h=tt(s);n$(d,h,e),d._x_refreshXForScope=e=>{Object.entries(e).forEach(([e,t])=>{h[e]=t})},ny(()=>{o.after(d),nn(d)}),"object"==typeof l&&o3("x-for key cannot be an object, it must be a string or an integer",e),n[l]=d}for(let e=0;e<p.length;e++)n[p[e]]._x_refreshXForScope(a[c.indexOf(p[e])]);e._x_prevKeys=c})}),r(()=>{Object.values(e._x_lookup).forEach(e=>e.remove()),delete e._x_prevKeys,delete e._x_lookup})}),lW.inline=(e,{expression:t},{cleanup:i})=>{let r=ni(e);r._x_refs||(r._x_refs={}),r._x_refs[t]=e,i(()=>delete r._x_refs[t])},nW("ref",lW),nW("if",(e,{expression:t},{effect:i,cleanup:r})=>{"template"!==e.tagName.toLowerCase()&&o3("x-if can only be used on a <template> tag",e);let o=nB(e,t),n=()=>{if(e._x_currentIfEl)return e._x_currentIfEl;let t=e.content.cloneNode(!0).firstElementChild;return n$(t,{},e),ny(()=>{e.after(t),nn(t)}),e._x_currentIfEl=t,e._x_undoIf=()=>{o5(t,e=>{e._x_effects&&e._x_effects.forEach(oQ)}),t.remove(),delete e._x_currentIfEl},t},s=()=>{e._x_undoIf&&(e._x_undoIf(),delete e._x_undoIf)};i(()=>o(e=>{e?n():s()})),r(()=>e._x_undoIf&&e._x_undoIf())}),nW("id",(e,{expression:t},{evaluate:i})=>{i(t).forEach(t=>{e._x_ids||(e._x_ids={}),e._x_ids[t]||(e._x_ids[t]=lI(t))})}),sh((e,t)=>{e._x_ids&&(t._x_ids=e._x_ids)}),n2(nX("@",nV("on:"))),nW("on",su((e,{value:t,modifiers:i,expression:r},{cleanup:o})=>{let n=r?nB(e,r):()=>{};"template"!==e.tagName.toLowerCase()||(e._x_forwardEvents||(e._x_forwardEvents=[]),e._x_forwardEvents.includes(t)||e._x_forwardEvents.push(t));let s=lD(e,t,i,e=>{n(()=>{},{scope:{$event:e},params:[e]})});o(()=>s())})),lK("Collapse","collapse","collapse"),lK("Intersect","intersect","intersect"),lK("Focus","trap","focus"),lK("Mask","mask","mask"),sT.setEvaluator(nF),sT.setReactivityEngine({reactive:lE,effect:function(e,t=sz){var i;(i=e)&&!0===i._isEffect&&(e=e.raw);let r=function(e,t){let i=function(){if(!i.active)return e();if(!sJ.includes(i)){sQ(i);try{return s0.push(sX),sX=!0,sJ.push(i),tn=i,e()}finally{sJ.pop(),s1(),tn=sJ[sJ.length-1]}}};return i.id=sZ++,i.allowRecurse=!!t.allowRecurse,i._isEffect=!0,i.active=!0,i.raw=e,i.deps=[],i.options=t,i}(e,t);return t.lazy||r(),r},release:function(e){e.active&&(sQ(e),e.options.onStop&&e.options.onStop(),e.active=!1)},raw:lO}),lJ.step=()=>{},lJ.log=()=>{};var lY=!1,lZ=class{constructor(e,t){this.startComment=e,this.endComment=t}get children(){let e=[],t=this.startComment.nextSibling;for(;t&&t!==this.endComment;)e.push(t),t=t.nextSibling;return e}appendChild(e){this.endComment.before(e)}get firstChild(){let e=this.startComment.nextSibling;if(e!==this.endComment)return e}nextNode(e){let t=e.nextSibling;if(t!==this.endComment)return t}insertBefore(e,t){return t.before(e),e}};function lQ(e){return e.firstChild}function lX(e,t){return e instanceof lZ?e.nextNode(t):t.nextSibling}function l0(e,t){return null!==t.getItem(e)}function l1(e,t){return JSON.parse(t.getItem(e,t))}function l2(e,t,i){i.setItem(e,JSON.stringify(t))}class l5{constructor(e=null){this.scope=e}log(...e){return console.log(...this._buildArgs("log",e))}info(...e){return console.info(...this._buildArgs("info",e))}debug(...e){return console.debug(...this._buildArgs("debug",e))}warn(...e){return console.warn(...this._buildArgs("warn",e))}error(...e){return console.error(...this._buildArgs("error",e))}_buildArgs(e,t){let i="Lookbook";return this.scope&&(i+=` [${this.scope}]`),[i,...t]}}class l3{constructor(e){this.rootElement=document.getElementById(e),this.loadPage=this.loadPage.bind(this),this.updatePage=this.updatePage.bind(this),this.$logger=new l5("Router"),addEventListener("popstate",this.loadPage)}get location(){return document.location}get pathname(){return document.location.pathname}visit(e){this.$logger.info(`Navigating to ${e}`),this.$dispatch("lookbook:visit",{url:e}),history.pushState({},"",e),this.loadPage(e)}async updatePage(){let e=await this.fetchPageDOM(this.location);this.updateDOM(e),this.$logger.debug("Page updated"),this.$dispatch("lookbook:page-update")}async loadPage(e=null){let t=await this.fetchPageDOM(e||this.location);this.updateDOM(t),this.$logger.debug("Page loaded"),this.$dispatch("lookbook:page-load")}async fetchPageDOM(e){let{ok:t,fragment:i,status:r}=await l6(e,`#${this.rootElement.id}`);if(t)return i;location.href=e}updateDOM(e){var t;t=this.rootElement,Alpine.morph(t,e,{key:e=>e.getAttribute("key")?e.getAttribute("key"):e.id,lookahead:!0,updating(e,t,i,r){if(e.tagName&&e.tagName.includes("-")){let i=Array.from(e.attributes).reduce((e,t)=>(e[t.name]=t.value,e),{}),r=Array.from(t.attributes).map(e=>e.name);Object.entries(i).forEach(([e,i])=>{r.includes(e)||t.setAttribute(e,i)})}}}),this.$dispatch("lookbook:page-morph")}$dispatch(e,t={}){document.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0}))}}async function l6(e,t){let i=await fetch(e||window.document.location),{status:r,ok:o}=i,n={ok:o,status:r,response:i,fragment:void 0,title:null};if(i.ok){let e=await i.text(),r=new DOMParser().parseFromString(e,"text/html");n.fragment=t?r.querySelector(t).outerHTML:null}return n}var l4={},l8={};t(l8),i(l8,"default",()=>ae);class l7{constructor(e){this.endpoint=e,this.source=null,this.handlers=[],this.$logger=new l5("EventsListener"),addEventListener("visibilitychange",()=>{document.hidden?this.stop():this.start()})}start(){this.source||(this.$logger.debug("Starting"),this.source=this.initSource())}stop(){this.source&&(this.source.close(),this.source=null),this.$logger.debug("Stopped")}on(e,t){this.handlers.push({type:e,callback:t})}initSource(){let e=new EventSource(this.endpoint);return e.addEventListener("open",()=>{this.$logger.debug(`Connected to '${this.endpoint}'`)}),e.addEventListener("event",e=>{let t=JSON.parse(e.data);console.log(t),this.handlers.forEach(e=>{t.type===e.type&&e.callback.call(null,t)})}),e.addEventListener("error",()=>{this.$logger.warn("Event source error"),this.stop()}),e}}function l9(e,t){return t.componentName=e,t}var ae=l9("app",({eventsEndpoint:e})=>({serverEventsListener:null,sidebarPosition:Alpine.$persist(20).as("app:sidebar-position"),init(){e&&(this.serverEventsListener=new l7(e),this.serverEventsListener.on("update",()=>this.$router.updatePage()),this.serverEventsListener.start(),addEventListener("visibilitychange",()=>{document.hidden||this.$router.updatePage()})),this.$logger.debug("App initialized",this.$el)},hijackNavigation(e){let t=e.target.closest("a[href]");t&&(e.preventDefault(),this.$router.visit(t.href))},destroy(){this.serverEventsListener&&this.serverEventsListener.stop()}})),at={};t(at),i(at,"default",()=>ai);var ai=l9("code",()=>({})),ar={};t(ar),i(ar,"default",()=>ao);var ao=l9("inspector",()=>({drawerPosition:Alpine.$persist(20).as("inspector:drawer-position"),init(){this.$logger.debug("Inspector initialized",this.$el)},hideDrawer(){console.log("drawer hidden!")}})),an={};t(an),i(an,"default",()=>as);var as=l9("codePanel",()=>({init(){console.log("code panel init")}})),al={};t(al),i(al,"default",()=>aa);var aa=l9("defaultPanel",()=>({})),ac={};t(ac),i(ac,"default",()=>au);var au=l9("markdownPanel",()=>({})),ad={};t(ad),i(ad,"default",()=>ah);var ah=l9("navTree",e=>({expanded:Alpine.$persist([]).as(`nav-tree#${e}:expanded-items`),async init(){this.$nextTick(async()=>{await this.$el.updateComplete,this.selectCurrentPageItem(!0),this.$logger.debug("Nav tree initialized",this.$el)})},selectCurrentPageItem(e=!1){this.selected&&(this.selected.selected=!1);let t=this.$el.querySelector(`sl-tree-item[href='${this.$router.pathname}']`);if(t&&(t.selected=!0,e))for(;t;){let e=t.parentElement;t.selected||(t.expanded=!0),t="SL-TREE-ITEM"===e.tagName?e:null}},itemExpanded(e){let t=e.target.getAttribute("key");-1===this.expanded.indexOf(t)&&this.expanded.push(t)},itemCollapsed(e){let t=e.target.getAttribute("key"),i=this.expanded.indexOf(t);i>=0&&this.expanded.splice(i,1)},itemSelected(e){let t=e.detail.selection[0].getAttribute("href");t&&this.$router.visit(t)},get selected(){return this.$el.querySelector("sl-tree-item[selected]")}})),ap={};t(ap),i(ap,"default",()=>af);var af=l9("navTreeItem",()=>({async init(){this.$el.expanded=this.expanded.includes(this.$el.getAttribute("key"))}})),ab={};t(ab),i(ab,"default",()=>am);var am=l9("pane",()=>({init(){this.$logger.debug("Pane initialized",this.$el)}})),ag={};t(ag),i(ag,"default",()=>av);var av=l9("tabGroup",e=>({activeTab:Alpine.$persist("").as(`tab-group#${e}:active-tab`),async init(){this.$watch("activeTab",t=>{this.$dispatch("lookbook:tab-selected",{tabGroup:this,activeTab:this.activeTab}),this.$logger.debug(`${e}: '${this.activeTab}' tab selected`)}),await this.selectTab(),this.$logger.debug("Tab group initialized",this.$el)},async selectTab(){if(""===this.activeTab)return this.getInitialActiveTab();await this.tabGroup.updateComplete,this.tabGroup.show(this.activeTab)},async getInitialActiveTab(){await this.tabsReady,setTimeout(()=>{let e=this.tabs.find(e=>e.active);e&&(this.activeTab=e.panel)},100)},get tabGroup(){return this.$root.querySelector("sl-tab-group")},get tabs(){return Array.from(this.tabGroup.querySelectorAll("sl-tab"))},get tabsReady(){return Promise.all(this.tabs.map(e=>e.updateComplete))}})),ay={};t(ay),i(ay,"default",()=>a_);var a_=l9("viewport",()=>({}));l4={app:{app:l8},code:{code:at},inspector:{inspector:ar,code_panel:{code_panel:an},default_panel:{default_panel:al},markdown_panel:{markdown_panel:ac}},nav_tree:{nav_tree:ad,nav_tree_item:{nav_tree_item:ap}},pane:{pane:ab},tab_group:{tab_group:ag},viewport:{viewport:ay}},window.Alpine=sT,sT.plugin(function(e){e.morph=lJ}),sT.plugin(function(e){let t=()=>{let t,i;try{i=localStorage}catch(t){console.error(t),console.warn("Alpine: $persist is using temporary storage since localStorage is unavailable.");let e=new Map;i={getItem:e.get.bind(e),setItem:e.set.bind(e)}}return e.interceptor((r,o,n,s,l)=>{let a=t||`_x_${s}`,c=l0(a,i)?l1(a,i):r;return n(c),e.effect(()=>{let e=o();l2(a,e,i),n(e)}),c},e=>{e.as=i=>(t=i,e),e.using=t=>(i=t,e)})};Object.defineProperty(e,"$persist",{get:()=>t()}),e.magic("persist",t),e.persist=(t,{get:i,set:r},o=localStorage)=>{r(l0(t,o)?l1(t,o):i()),e.effect(()=>{let e=i();l2(t,e,o),r(e)})}}),sT.magic("logger",()=>new l5("View")),sT.magic("router",()=>new l3("app")),function e(t){for(let i in t){let r=t[i];!0===r.__esModule&&"default"in r?sT.data(r.default.componentName||r.default.name,r.default):e(r)}}(l4),sT.start()})();