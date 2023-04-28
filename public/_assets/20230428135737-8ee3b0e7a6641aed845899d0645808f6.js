/*! jQuery v3.4.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function(e,t){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e.document?t(e,!0):function(e){if(!e.document)throw new Error("jQuery requires a window with a document");return t(e)}:t(e)}("undefined"!=typeof window?window:this,function(C,e){"use strict";var t=[],E=C.document,r=Object.getPrototypeOf,s=t.slice,g=t.concat,u=t.push,i=t.indexOf,n={},o=n.toString,v=n.hasOwnProperty,a=v.toString,l=a.call(Object),y={},m=function(e){return"function"==typeof e&&"number"!=typeof e.nodeType},x=function(e){return null!=e&&e===e.window},c={type:!0,src:!0,nonce:!0,noModule:!0};function b(e,t,n){var r,i,o=(n=n||E).createElement("script");if(o.text=e,t)for(r in c)(i=t[r]||t.getAttribute&&t.getAttribute(r))&&o.setAttribute(r,i);n.head.appendChild(o).parentNode.removeChild(o)}function w(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?n[o.call(e)]||"object":typeof e}var f="3.4.1",k=function(e,t){return new k.fn.init(e,t)},p=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;function d(e){var t=!!e&&"length"in e&&e.length,n=w(e);return!m(e)&&!x(e)&&("array"===n||0===t||"number"==typeof t&&0<t&&t-1 in e)}k.fn=k.prototype={jquery:f,constructor:k,length:0,toArray:function(){return s.call(this)},get:function(e){return null==e?s.call(this):e<0?this[e+this.length]:this[e]},pushStack:function(e){var t=k.merge(this.constructor(),e);return t.prevObject=this,t},each:function(e){return k.each(this,e)},map:function(n){return this.pushStack(k.map(this,function(e,t){return n.call(e,t,e)}))},slice:function(){return this.pushStack(s.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(e<0?t:0);return this.pushStack(0<=n&&n<t?[this[n]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:t.sort,splice:t.splice},k.extend=k.fn.extend=function(){var e,t,n,r,i,o,a=arguments[0]||{},s=1,u=arguments.length,l=!1;for("boolean"==typeof a&&(l=a,a=arguments[s]||{},s++),"object"==typeof a||m(a)||(a={}),s===u&&(a=this,s--);s<u;s++)if(null!=(e=arguments[s]))for(t in e)r=e[t],"__proto__"!==t&&a!==r&&(l&&r&&(k.isPlainObject(r)||(i=Array.isArray(r)))?(n=a[t],o=i&&!Array.isArray(n)?[]:i||k.isPlainObject(n)?n:{},i=!1,a[t]=k.extend(l,o,r)):void 0!==r&&(a[t]=r));return a},k.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),isReady:!0,error:function(e){throw new Error(e)},noop:function(){},isPlainObject:function(e){var t,n;return!(!e||"[object Object]"!==o.call(e))&&(!(t=r(e))||"function"==typeof(n=v.call(t,"constructor")&&t.constructor)&&a.call(n)===l)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},globalEval:function(e,t){b(e,{nonce:t&&t.nonce})},each:function(e,t){var n,r=0;if(d(e)){for(n=e.length;r<n;r++)if(!1===t.call(e[r],r,e[r]))break}else for(r in e)if(!1===t.call(e[r],r,e[r]))break;return e},trim:function(e){return null==e?"":(e+"").replace(p,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(d(Object(e))?k.merge(n,"string"==typeof e?[e]:e):u.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:i.call(t,e,n)},merge:function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;r++)e[i++]=t[r];return e.length=i,e},grep:function(e,t,n){for(var r=[],i=0,o=e.length,a=!n;i<o;i++)!t(e[i],i)!==a&&r.push(e[i]);return r},map:function(e,t,n){var r,i,o=0,a=[];if(d(e))for(r=e.length;o<r;o++)null!=(i=t(e[o],o,n))&&a.push(i);else for(o in e)null!=(i=t(e[o],o,n))&&a.push(i);return g.apply([],a)},guid:1,support:y}),"function"==typeof Symbol&&(k.fn[Symbol.iterator]=t[Symbol.iterator]),k.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(e,t){n["[object "+t+"]"]=t.toLowerCase()});var h=function(n){var e,d,b,o,i,h,f,g,w,u,l,T,C,a,E,v,s,c,y,k="sizzle"+1*new Date,m=n.document,S=0,r=0,p=ue(),x=ue(),N=ue(),A=ue(),D=function(e,t){return e===t&&(l=!0),0},j={}.hasOwnProperty,t=[],q=t.pop,L=t.push,H=t.push,O=t.slice,P=function(e,t){for(var n=0,r=e.length;n<r;n++)if(e[n]===t)return n;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",I="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",W="\\["+M+"*("+I+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+I+"))|)"+M+"*\\]",$=":("+I+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+W+")*)|.*)\\)|)",F=new RegExp(M+"+","g"),B=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=new RegExp("^"+M+"*,"+M+"*"),z=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=new RegExp(M+"|>"),X=new RegExp($),V=new RegExp("^"+I+"$"),G={ID:new RegExp("^#("+I+")"),CLASS:new RegExp("^\\.("+I+")"),TAG:new RegExp("^("+I+"|[*])"),ATTR:new RegExp("^"+W),PSEUDO:new RegExp("^"+$),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+R+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Y=/HTML$/i,Q=/^(?:input|select|textarea|button)$/i,J=/^h\d$/i,K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ee=/[+~]/,te=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),ne=function(e,t,n){var r="0x"+t-65536;return r!=r||n?t:r<0?String.fromCharCode(r+65536):String.fromCharCode(r>>10|55296,1023&r|56320)},re=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ie=function(e,t){return t?"\0"===e?"\ufffd":e.slice(0,-1)+"\\"+e.charCodeAt(e.length-1).toString(16)+" ":"\\"+e},oe=function(){T()},ae=be(function(e){return!0===e.disabled&&"fieldset"===e.nodeName.toLowerCase()},{dir:"parentNode",next:"legend"});try{H.apply(t=O.call(m.childNodes),m.childNodes),t[m.childNodes.length].nodeType}catch(e){H={apply:t.length?function(e,t){L.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function se(t,e,n,r){var i,o,a,s,u,l,c,f=e&&e.ownerDocument,p=e?e.nodeType:9;if(n=n||[],"string"!=typeof t||!t||1!==p&&9!==p&&11!==p)return n;if(!r&&((e?e.ownerDocument||e:m)!==C&&T(e),e=e||C,E)){if(11!==p&&(u=Z.exec(t)))if(i=u[1]){if(9===p){if(!(a=e.getElementById(i)))return n;if(a.id===i)return n.push(a),n}else if(f&&(a=f.getElementById(i))&&y(e,a)&&a.id===i)return n.push(a),n}else{if(u[2])return H.apply(n,e.getElementsByTagName(t)),n;if((i=u[3])&&d.getElementsByClassName&&e.getElementsByClassName)return H.apply(n,e.getElementsByClassName(i)),n}if(d.qsa&&!A[t+" "]&&(!v||!v.test(t))&&(1!==p||"object"!==e.nodeName.toLowerCase())){if(c=t,f=e,1===p&&U.test(t)){(s=e.getAttribute("id"))?s=s.replace(re,ie):e.setAttribute("id",s=k),o=(l=h(t)).length;while(o--)l[o]="#"+s+" "+xe(l[o]);c=l.join(","),f=ee.test(t)&&ye(e.parentNode)||e}try{return H.apply(n,f.querySelectorAll(c)),n}catch(e){A(t,!0)}finally{s===k&&e.removeAttribute("id")}}}return g(t.replace(B,"$1"),e,n,r)}function ue(){var r=[];return function e(t,n){return r.push(t+" ")>b.cacheLength&&delete e[r.shift()],e[t+" "]=n}}function le(e){return e[k]=!0,e}function ce(e){var t=C.createElement("fieldset");try{return!!e(t)}catch(e){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function fe(e,t){var n=e.split("|"),r=n.length;while(r--)b.attrHandle[n[r]]=t}function pe(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&e.sourceIndex-t.sourceIndex;if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function de(t){return function(e){return"input"===e.nodeName.toLowerCase()&&e.type===t}}function he(n){return function(e){var t=e.nodeName.toLowerCase();return("input"===t||"button"===t)&&e.type===n}}function ge(t){return function(e){return"form"in e?e.parentNode&&!1===e.disabled?"label"in e?"label"in e.parentNode?e.parentNode.disabled===t:e.disabled===t:e.isDisabled===t||e.isDisabled!==!t&&ae(e)===t:e.disabled===t:"label"in e&&e.disabled===t}}function ve(a){return le(function(o){return o=+o,le(function(e,t){var n,r=a([],e.length,o),i=r.length;while(i--)e[n=r[i]]&&(e[n]=!(t[n]=e[n]))})})}function ye(e){return e&&"undefined"!=typeof e.getElementsByTagName&&e}for(e in d=se.support={},i=se.isXML=function(e){var t=e.namespaceURI,n=(e.ownerDocument||e).documentElement;return!Y.test(t||n&&n.nodeName||"HTML")},T=se.setDocument=function(e){var t,n,r=e?e.ownerDocument||e:m;return r!==C&&9===r.nodeType&&r.documentElement&&(a=(C=r).documentElement,E=!i(C),m!==C&&(n=C.defaultView)&&n.top!==n&&(n.addEventListener?n.addEventListener("unload",oe,!1):n.attachEvent&&n.attachEvent("onunload",oe)),d.attributes=ce(function(e){return e.className="i",!e.getAttribute("className")}),d.getElementsByTagName=ce(function(e){return e.appendChild(C.createComment("")),!e.getElementsByTagName("*").length}),d.getElementsByClassName=K.test(C.getElementsByClassName),d.getById=ce(function(e){return a.appendChild(e).id=k,!C.getElementsByName||!C.getElementsByName(k).length}),d.getById?(b.filter.ID=function(e){var t=e.replace(te,ne);return function(e){return e.getAttribute("id")===t}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n=t.getElementById(e);return n?[n]:[]}}):(b.filter.ID=function(e){var n=e.replace(te,ne);return function(e){var t="undefined"!=typeof e.getAttributeNode&&e.getAttributeNode("id");return t&&t.value===n}},b.find.ID=function(e,t){if("undefined"!=typeof t.getElementById&&E){var n,r,i,o=t.getElementById(e);if(o){if((n=o.getAttributeNode("id"))&&n.value===e)return[o];i=t.getElementsByName(e),r=0;while(o=i[r++])if((n=o.getAttributeNode("id"))&&n.value===e)return[o]}return[]}}),b.find.TAG=d.getElementsByTagName?function(e,t){return"undefined"!=typeof t.getElementsByTagName?t.getElementsByTagName(e):d.qsa?t.querySelectorAll(e):void 0}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},b.find.CLASS=d.getElementsByClassName&&function(e,t){if("undefined"!=typeof t.getElementsByClassName&&E)return t.getElementsByClassName(e)},s=[],v=[],(d.qsa=K.test(C.querySelectorAll))&&(ce(function(e){a.appendChild(e).innerHTML="<a id='"+k+"'></a><select id='"+k+"-\r\\' msallowcapture=''><option selected=''></option></select>",e.querySelectorAll("[msallowcapture^='']").length&&v.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll("[selected]").length||v.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll("[id~="+k+"-]").length||v.push("~="),e.querySelectorAll(":checked").length||v.push(":checked"),e.querySelectorAll("a#"+k+"+*").length||v.push(".#.+[+~]")}),ce(function(e){e.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var t=C.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("name","D"),e.querySelectorAll("[name=d]").length&&v.push("name"+M+"*[*^$|!~]?="),2!==e.querySelectorAll(":enabled").length&&v.push(":enabled",":disabled"),a.appendChild(e).disabled=!0,2!==e.querySelectorAll(":disabled").length&&v.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),v.push(",.*:")})),(d.matchesSelector=K.test(c=a.matches||a.webkitMatchesSelector||a.mozMatchesSelector||a.oMatchesSelector||a.msMatchesSelector))&&ce(function(e){d.disconnectedMatch=c.call(e,"*"),c.call(e,"[s!='']:x"),s.push("!=",$)}),v=v.length&&new RegExp(v.join("|")),s=s.length&&new RegExp(s.join("|")),t=K.test(a.compareDocumentPosition),y=t||K.test(a.contains)?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},D=t?function(e,t){if(e===t)return l=!0,0;var n=!e.compareDocumentPosition-!t.compareDocumentPosition;return n||(1&(n=(e.ownerDocument||e)===(t.ownerDocument||t)?e.compareDocumentPosition(t):1)||!d.sortDetached&&t.compareDocumentPosition(e)===n?e===C||e.ownerDocument===m&&y(m,e)?-1:t===C||t.ownerDocument===m&&y(m,t)?1:u?P(u,e)-P(u,t):0:4&n?-1:1)}:function(e,t){if(e===t)return l=!0,0;var n,r=0,i=e.parentNode,o=t.parentNode,a=[e],s=[t];if(!i||!o)return e===C?-1:t===C?1:i?-1:o?1:u?P(u,e)-P(u,t):0;if(i===o)return pe(e,t);n=e;while(n=n.parentNode)a.unshift(n);n=t;while(n=n.parentNode)s.unshift(n);while(a[r]===s[r])r++;return r?pe(a[r],s[r]):a[r]===m?-1:s[r]===m?1:0}),C},se.matches=function(e,t){return se(e,null,null,t)},se.matchesSelector=function(e,t){if((e.ownerDocument||e)!==C&&T(e),d.matchesSelector&&E&&!A[t+" "]&&(!s||!s.test(t))&&(!v||!v.test(t)))try{var n=c.call(e,t);if(n||d.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(e){A(t,!0)}return 0<se(t,C,null,[e]).length},se.contains=function(e,t){return(e.ownerDocument||e)!==C&&T(e),y(e,t)},se.attr=function(e,t){(e.ownerDocument||e)!==C&&T(e);var n=b.attrHandle[t.toLowerCase()],r=n&&j.call(b.attrHandle,t.toLowerCase())?n(e,t,!E):void 0;return void 0!==r?r:d.attributes||!E?e.getAttribute(t):(r=e.getAttributeNode(t))&&r.specified?r.value:null},se.escape=function(e){return(e+"").replace(re,ie)},se.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},se.uniqueSort=function(e){var t,n=[],r=0,i=0;if(l=!d.detectDuplicates,u=!d.sortStable&&e.slice(0),e.sort(D),l){while(t=e[i++])t===e[i]&&(r=n.push(i));while(r--)e.splice(n[r],1)}return u=null,e},o=se.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else while(t=e[r++])n+=o(t);return n},(b=se.selectors={cacheLength:50,createPseudo:le,match:G,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(te,ne),e[3]=(e[3]||e[4]||e[5]||"").replace(te,ne),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||se.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&se.error(e[0]),e},PSEUDO:function(e){var t,n=!e[6]&&e[2];return G.CHILD.test(e[0])?null:(e[3]?e[2]=e[4]||e[5]||"":n&&X.test(n)&&(t=h(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(te,ne).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=p[e+" "];return t||(t=new RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&p(e,function(e){return t.test("string"==typeof e.className&&e.className||"undefined"!=typeof e.getAttribute&&e.getAttribute("class")||"")})},ATTR:function(n,r,i){return function(e){var t=se.attr(e,n);return null==t?"!="===r:!r||(t+="","="===r?t===i:"!="===r?t!==i:"^="===r?i&&0===t.indexOf(i):"*="===r?i&&-1<t.indexOf(i):"$="===r?i&&t.slice(-i.length)===i:"~="===r?-1<(" "+t.replace(F," ")+" ").indexOf(i):"|="===r&&(t===i||t.slice(0,i.length+1)===i+"-"))}},CHILD:function(h,e,t,g,v){var y="nth"!==h.slice(0,3),m="last"!==h.slice(-4),x="of-type"===e;return 1===g&&0===v?function(e){return!!e.parentNode}:function(e,t,n){var r,i,o,a,s,u,l=y!==m?"nextSibling":"previousSibling",c=e.parentNode,f=x&&e.nodeName.toLowerCase(),p=!n&&!x,d=!1;if(c){if(y){while(l){a=e;while(a=a[l])if(x?a.nodeName.toLowerCase()===f:1===a.nodeType)return!1;u=l="only"===h&&!u&&"nextSibling"}return!0}if(u=[m?c.firstChild:c.lastChild],m&&p){d=(s=(r=(i=(o=(a=c)[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===S&&r[1])&&r[2],a=s&&c.childNodes[s];while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if(1===a.nodeType&&++d&&a===e){i[h]=[S,s,d];break}}else if(p&&(d=s=(r=(i=(o=(a=e)[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]||[])[0]===S&&r[1]),!1===d)while(a=++s&&a&&a[l]||(d=s=0)||u.pop())if((x?a.nodeName.toLowerCase()===f:1===a.nodeType)&&++d&&(p&&((i=(o=a[k]||(a[k]={}))[a.uniqueID]||(o[a.uniqueID]={}))[h]=[S,d]),a===e))break;return(d-=v)===g||d%g==0&&0<=d/g}}},PSEUDO:function(e,o){var t,a=b.pseudos[e]||b.setFilters[e.toLowerCase()]||se.error("unsupported pseudo: "+e);return a[k]?a(o):1<a.length?(t=[e,e,"",o],b.setFilters.hasOwnProperty(e.toLowerCase())?le(function(e,t){var n,r=a(e,o),i=r.length;while(i--)e[n=P(e,r[i])]=!(t[n]=r[i])}):function(e){return a(e,0,t)}):a}},pseudos:{not:le(function(e){var r=[],i=[],s=f(e.replace(B,"$1"));return s[k]?le(function(e,t,n,r){var i,o=s(e,null,r,[]),a=e.length;while(a--)(i=o[a])&&(e[a]=!(t[a]=i))}):function(e,t,n){return r[0]=e,s(r,null,n,i),r[0]=null,!i.pop()}}),has:le(function(t){return function(e){return 0<se(t,e).length}}),contains:le(function(t){return t=t.replace(te,ne),function(e){return-1<(e.textContent||o(e)).indexOf(t)}}),lang:le(function(n){return V.test(n||"")||se.error("unsupported lang: "+n),n=n.replace(te,ne).toLowerCase(),function(e){var t;do{if(t=E?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return(t=t.toLowerCase())===n||0===t.indexOf(n+"-")}while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var t=n.location&&n.location.hash;return t&&t.slice(1)===e.id},root:function(e){return e===a},focus:function(e){return e===C.activeElement&&(!C.hasFocus||C.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:ge(!1),disabled:ge(!0),checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,!0===e.selected},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeType<6)return!1;return!0},parent:function(e){return!b.pseudos.empty(e)},header:function(e){return J.test(e.nodeName)},input:function(e){return Q.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||"text"===t.toLowerCase())},first:ve(function(){return[0]}),last:ve(function(e,t){return[t-1]}),eq:ve(function(e,t,n){return[n<0?n+t:n]}),even:ve(function(e,t){for(var n=0;n<t;n+=2)e.push(n);return e}),odd:ve(function(e,t){for(var n=1;n<t;n+=2)e.push(n);return e}),lt:ve(function(e,t,n){for(var r=n<0?n+t:t<n?t:n;0<=--r;)e.push(r);return e}),gt:ve(function(e,t,n){for(var r=n<0?n+t:n;++r<t;)e.push(r);return e})}}).pseudos.nth=b.pseudos.eq,{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})b.pseudos[e]=de(e);for(e in{submit:!0,reset:!0})b.pseudos[e]=he(e);function me(){}function xe(e){for(var t=0,n=e.length,r="";t<n;t++)r+=e[t].value;return r}function be(s,e,t){var u=e.dir,l=e.next,c=l||u,f=t&&"parentNode"===c,p=r++;return e.first?function(e,t,n){while(e=e[u])if(1===e.nodeType||f)return s(e,t,n);return!1}:function(e,t,n){var r,i,o,a=[S,p];if(n){while(e=e[u])if((1===e.nodeType||f)&&s(e,t,n))return!0}else while(e=e[u])if(1===e.nodeType||f)if(i=(o=e[k]||(e[k]={}))[e.uniqueID]||(o[e.uniqueID]={}),l&&l===e.nodeName.toLowerCase())e=e[u]||e;else{if((r=i[c])&&r[0]===S&&r[1]===p)return a[2]=r[2];if((i[c]=a)[2]=s(e,t,n))return!0}return!1}}function we(i){return 1<i.length?function(e,t,n){var r=i.length;while(r--)if(!i[r](e,t,n))return!1;return!0}:i[0]}function Te(e,t,n,r,i){for(var o,a=[],s=0,u=e.length,l=null!=t;s<u;s++)(o=e[s])&&(n&&!n(o,r,i)||(a.push(o),l&&t.push(s)));return a}function Ce(d,h,g,v,y,e){return v&&!v[k]&&(v=Ce(v)),y&&!y[k]&&(y=Ce(y,e)),le(function(e,t,n,r){var i,o,a,s=[],u=[],l=t.length,c=e||function(e,t,n){for(var r=0,i=t.length;r<i;r++)se(e,t[r],n);return n}(h||"*",n.nodeType?[n]:n,[]),f=!d||!e&&h?c:Te(c,s,d,n,r),p=g?y||(e?d:l||v)?[]:t:f;if(g&&g(f,p,n,r),v){i=Te(p,u),v(i,[],n,r),o=i.length;while(o--)(a=i[o])&&(p[u[o]]=!(f[u[o]]=a))}if(e){if(y||d){if(y){i=[],o=p.length;while(o--)(a=p[o])&&i.push(f[o]=a);y(null,p=[],i,r)}o=p.length;while(o--)(a=p[o])&&-1<(i=y?P(e,a):s[o])&&(e[i]=!(t[i]=a))}}else p=Te(p===t?p.splice(l,p.length):p),y?y(null,t,p,r):H.apply(t,p)})}function Ee(e){for(var i,t,n,r=e.length,o=b.relative[e[0].type],a=o||b.relative[" "],s=o?1:0,u=be(function(e){return e===i},a,!0),l=be(function(e){return-1<P(i,e)},a,!0),c=[function(e,t,n){var r=!o&&(n||t!==w)||((i=t).nodeType?u(e,t,n):l(e,t,n));return i=null,r}];s<r;s++)if(t=b.relative[e[s].type])c=[be(we(c),t)];else{if((t=b.filter[e[s].type].apply(null,e[s].matches))[k]){for(n=++s;n<r;n++)if(b.relative[e[n].type])break;return Ce(1<s&&we(c),1<s&&xe(e.slice(0,s-1).concat({value:" "===e[s-2].type?"*":""})).replace(B,"$1"),t,s<n&&Ee(e.slice(s,n)),n<r&&Ee(e=e.slice(n)),n<r&&xe(e))}c.push(t)}return we(c)}return me.prototype=b.filters=b.pseudos,b.setFilters=new me,h=se.tokenize=function(e,t){var n,r,i,o,a,s,u,l=x[e+" "];if(l)return t?0:l.slice(0);a=e,s=[],u=b.preFilter;while(a){for(o in n&&!(r=_.exec(a))||(r&&(a=a.slice(r[0].length)||a),s.push(i=[])),n=!1,(r=z.exec(a))&&(n=r.shift(),i.push({value:n,type:r[0].replace(B," ")}),a=a.slice(n.length)),b.filter)!(r=G[o].exec(a))||u[o]&&!(r=u[o](r))||(n=r.shift(),i.push({value:n,type:o,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?se.error(e):x(e,s).slice(0)},f=se.compile=function(e,t){var n,v,y,m,x,r,i=[],o=[],a=N[e+" "];if(!a){t||(t=h(e)),n=t.length;while(n--)(a=Ee(t[n]))[k]?i.push(a):o.push(a);(a=N(e,(v=o,m=0<(y=i).length,x=0<v.length,r=function(e,t,n,r,i){var o,a,s,u=0,l="0",c=e&&[],f=[],p=w,d=e||x&&b.find.TAG("*",i),h=S+=null==p?1:Math.random()||.1,g=d.length;for(i&&(w=t===C||t||i);l!==g&&null!=(o=d[l]);l++){if(x&&o){a=0,t||o.ownerDocument===C||(T(o),n=!E);while(s=v[a++])if(s(o,t||C,n)){r.push(o);break}i&&(S=h)}m&&((o=!s&&o)&&u--,e&&c.push(o))}if(u+=l,m&&l!==u){a=0;while(s=y[a++])s(c,f,t,n);if(e){if(0<u)while(l--)c[l]||f[l]||(f[l]=q.call(r));f=Te(f)}H.apply(r,f),i&&!e&&0<f.length&&1<u+y.length&&se.uniqueSort(r)}return i&&(S=h,w=p),c},m?le(r):r))).selector=e}return a},g=se.select=function(e,t,n,r){var i,o,a,s,u,l="function"==typeof e&&e,c=!r&&h(e=l.selector||e);if(n=n||[],1===c.length){if(2<(o=c[0]=c[0].slice(0)).length&&"ID"===(a=o[0]).type&&9===t.nodeType&&E&&b.relative[o[1].type]){if(!(t=(b.find.ID(a.matches[0].replace(te,ne),t)||[])[0]))return n;l&&(t=t.parentNode),e=e.slice(o.shift().value.length)}i=G.needsContext.test(e)?0:o.length;while(i--){if(a=o[i],b.relative[s=a.type])break;if((u=b.find[s])&&(r=u(a.matches[0].replace(te,ne),ee.test(o[0].type)&&ye(t.parentNode)||t))){if(o.splice(i,1),!(e=r.length&&xe(o)))return H.apply(n,r),n;break}}}return(l||f(e,c))(r,t,!E,n,!t||ee.test(e)&&ye(t.parentNode)||t),n},d.sortStable=k.split("").sort(D).join("")===k,d.detectDuplicates=!!l,T(),d.sortDetached=ce(function(e){return 1&e.compareDocumentPosition(C.createElement("fieldset"))}),ce(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||fe("type|href|height|width",function(e,t,n){if(!n)return e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),d.attributes&&ce(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||fe("value",function(e,t,n){if(!n&&"input"===e.nodeName.toLowerCase())return e.defaultValue}),ce(function(e){return null==e.getAttribute("disabled")})||fe(R,function(e,t,n){var r;if(!n)return!0===e[t]?t.toLowerCase():(r=e.getAttributeNode(t))&&r.specified?r.value:null}),se}(C);k.find=h,k.expr=h.selectors,k.expr[":"]=k.expr.pseudos,k.uniqueSort=k.unique=h.uniqueSort,k.text=h.getText,k.isXMLDoc=h.isXML,k.contains=h.contains,k.escapeSelector=h.escape;var T=function(e,t,n){var r=[],i=void 0!==n;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&k(e).is(n))break;r.push(e)}return r},S=function(e,t){for(var n=[];e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n},N=k.expr.match.needsContext;function A(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()}var D=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function j(e,n,r){return m(n)?k.grep(e,function(e,t){return!!n.call(e,t,e)!==r}):n.nodeType?k.grep(e,function(e){return e===n!==r}):"string"!=typeof n?k.grep(e,function(e){return-1<i.call(n,e)!==r}):k.filter(n,e,r)}k.filter=function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?k.find.matchesSelector(r,e)?[r]:[]:k.find.matches(e,k.grep(t,function(e){return 1===e.nodeType}))},k.fn.extend({find:function(e){var t,n,r=this.length,i=this;if("string"!=typeof e)return this.pushStack(k(e).filter(function(){for(t=0;t<r;t++)if(k.contains(i[t],this))return!0}));for(n=this.pushStack([]),t=0;t<r;t++)k.find(e,i[t],n);return 1<r?k.uniqueSort(n):n},filter:function(e){return this.pushStack(j(this,e||[],!1))},not:function(e){return this.pushStack(j(this,e||[],!0))},is:function(e){return!!j(this,"string"==typeof e&&N.test(e)?k(e):e||[],!1).length}});var q,L=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;(k.fn.init=function(e,t,n){var r,i;if(!e)return this;if(n=n||q,"string"==typeof e){if(!(r="<"===e[0]&&">"===e[e.length-1]&&3<=e.length?[null,e,null]:L.exec(e))||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof k?t[0]:t,k.merge(this,k.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:E,!0)),D.test(r[1])&&k.isPlainObject(t))for(r in t)m(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return(i=E.getElementById(r[2]))&&(this[0]=i,this.length=1),this}return e.nodeType?(this[0]=e,this.length=1,this):m(e)?void 0!==n.ready?n.ready(e):e(k):k.makeArray(e,this)}).prototype=k.fn,q=k(E);var H=/^(?:parents|prev(?:Until|All))/,O={children:!0,contents:!0,next:!0,prev:!0};function P(e,t){while((e=e[t])&&1!==e.nodeType);return e}k.fn.extend({has:function(e){var t=k(e,this),n=t.length;return this.filter(function(){for(var e=0;e<n;e++)if(k.contains(this,t[e]))return!0})},closest:function(e,t){var n,r=0,i=this.length,o=[],a="string"!=typeof e&&k(e);if(!N.test(e))for(;r<i;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(n.nodeType<11&&(a?-1<a.index(n):1===n.nodeType&&k.find.matchesSelector(n,e))){o.push(n);break}return this.pushStack(1<o.length?k.uniqueSort(o):o)},index:function(e){return e?"string"==typeof e?i.call(k(e),this[0]):i.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){return this.pushStack(k.uniqueSort(k.merge(this.get(),k(e,t))))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),k.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return T(e,"parentNode")},parentsUntil:function(e,t,n){return T(e,"parentNode",n)},next:function(e){return P(e,"nextSibling")},prev:function(e){return P(e,"previousSibling")},nextAll:function(e){return T(e,"nextSibling")},prevAll:function(e){return T(e,"previousSibling")},nextUntil:function(e,t,n){return T(e,"nextSibling",n)},prevUntil:function(e,t,n){return T(e,"previousSibling",n)},siblings:function(e){return S((e.parentNode||{}).firstChild,e)},children:function(e){return S(e.firstChild)},contents:function(e){return"undefined"!=typeof e.contentDocument?e.contentDocument:(A(e,"template")&&(e=e.content||e),k.merge([],e.childNodes))}},function(r,i){k.fn[r]=function(e,t){var n=k.map(this,i,e);return"Until"!==r.slice(-5)&&(t=e),t&&"string"==typeof t&&(n=k.filter(t,n)),1<this.length&&(O[r]||k.uniqueSort(n),H.test(r)&&n.reverse()),this.pushStack(n)}});var R=/[^\x20\t\r\n\f]+/g;function M(e){return e}function I(e){throw e}function W(e,t,n,r){var i;try{e&&m(i=e.promise)?i.call(e).done(t).fail(n):e&&m(i=e.then)?i.call(e,t,n):t.apply(void 0,[e].slice(r))}catch(e){n.apply(void 0,[e])}}k.Callbacks=function(r){var e,n;r="string"==typeof r?(e=r,n={},k.each(e.match(R)||[],function(e,t){n[t]=!0}),n):k.extend({},r);var i,t,o,a,s=[],u=[],l=-1,c=function(){for(a=a||r.once,o=i=!0;u.length;l=-1){t=u.shift();while(++l<s.length)!1===s[l].apply(t[0],t[1])&&r.stopOnFalse&&(l=s.length,t=!1)}r.memory||(t=!1),i=!1,a&&(s=t?[]:"")},f={add:function(){return s&&(t&&!i&&(l=s.length-1,u.push(t)),function n(e){k.each(e,function(e,t){m(t)?r.unique&&f.has(t)||s.push(t):t&&t.length&&"string"!==w(t)&&n(t)})}(arguments),t&&!i&&c()),this},remove:function(){return k.each(arguments,function(e,t){var n;while(-1<(n=k.inArray(t,s,n)))s.splice(n,1),n<=l&&l--}),this},has:function(e){return e?-1<k.inArray(e,s):0<s.length},empty:function(){return s&&(s=[]),this},disable:function(){return a=u=[],s=t="",this},disabled:function(){return!s},lock:function(){return a=u=[],t||i||(s=t=""),this},locked:function(){return!!a},fireWith:function(e,t){return a||(t=[e,(t=t||[]).slice?t.slice():t],u.push(t),i||c()),this},fire:function(){return f.fireWith(this,arguments),this},fired:function(){return!!o}};return f},k.extend({Deferred:function(e){var o=[["notify","progress",k.Callbacks("memory"),k.Callbacks("memory"),2],["resolve","done",k.Callbacks("once memory"),k.Callbacks("once memory"),0,"resolved"],["reject","fail",k.Callbacks("once memory"),k.Callbacks("once memory"),1,"rejected"]],i="pending",a={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},"catch":function(e){return a.then(null,e)},pipe:function(){var i=arguments;return k.Deferred(function(r){k.each(o,function(e,t){var n=m(i[t[4]])&&i[t[4]];s[t[1]](function(){var e=n&&n.apply(this,arguments);e&&m(e.promise)?e.promise().progress(r.notify).done(r.resolve).fail(r.reject):r[t[0]+"With"](this,n?[e]:arguments)})}),i=null}).promise()},then:function(t,n,r){var u=0;function l(i,o,a,s){return function(){var n=this,r=arguments,e=function(){var e,t;if(!(i<u)){if((e=a.apply(n,r))===o.promise())throw new TypeError("Thenable self-resolution");t=e&&("object"==typeof e||"function"==typeof e)&&e.then,m(t)?s?t.call(e,l(u,o,M,s),l(u,o,I,s)):(u++,t.call(e,l(u,o,M,s),l(u,o,I,s),l(u,o,M,o.notifyWith))):(a!==M&&(n=void 0,r=[e]),(s||o.resolveWith)(n,r))}},t=s?e:function(){try{e()}catch(e){k.Deferred.exceptionHook&&k.Deferred.exceptionHook(e,t.stackTrace),u<=i+1&&(a!==I&&(n=void 0,r=[e]),o.rejectWith(n,r))}};i?t():(k.Deferred.getStackHook&&(t.stackTrace=k.Deferred.getStackHook()),C.setTimeout(t))}}return k.Deferred(function(e){o[0][3].add(l(0,e,m(r)?r:M,e.notifyWith)),o[1][3].add(l(0,e,m(t)?t:M)),o[2][3].add(l(0,e,m(n)?n:I))}).promise()},promise:function(e){return null!=e?k.extend(e,a):a}},s={};return k.each(o,function(e,t){var n=t[2],r=t[5];a[t[1]]=n.add,r&&n.add(function(){i=r},o[3-e][2].disable,o[3-e][3].disable,o[0][2].lock,o[0][3].lock),n.add(t[3].fire),s[t[0]]=function(){return s[t[0]+"With"](this===s?void 0:this,arguments),this},s[t[0]+"With"]=n.fireWith}),a.promise(s),e&&e.call(s,s),s},when:function(e){var n=arguments.length,t=n,r=Array(t),i=s.call(arguments),o=k.Deferred(),a=function(t){return function(e){r[t]=this,i[t]=1<arguments.length?s.call(arguments):e,--n||o.resolveWith(r,i)}};if(n<=1&&(W(e,o.done(a(t)).resolve,o.reject,!n),"pending"===o.state()||m(i[t]&&i[t].then)))return o.then();while(t--)W(i[t],a(t),o.reject);return o.promise()}});var $=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;k.Deferred.exceptionHook=function(e,t){C.console&&C.console.warn&&e&&$.test(e.name)&&C.console.warn("jQuery.Deferred exception: "+e.message,e.stack,t)},k.readyException=function(e){C.setTimeout(function(){throw e})};var F=k.Deferred();function B(){E.removeEventListener("DOMContentLoaded",B),C.removeEventListener("load",B),k.ready()}k.fn.ready=function(e){return F.then(e)["catch"](function(e){k.readyException(e)}),this},k.extend({isReady:!1,readyWait:1,ready:function(e){(!0===e?--k.readyWait:k.isReady)||(k.isReady=!0)!==e&&0<--k.readyWait||F.resolveWith(E,[k])}}),k.ready.then=F.then,"complete"===E.readyState||"loading"!==E.readyState&&!E.documentElement.doScroll?C.setTimeout(k.ready):(E.addEventListener("DOMContentLoaded",B),C.addEventListener("load",B));var _=function(e,t,n,r,i,o,a){var s=0,u=e.length,l=null==n;if("object"===w(n))for(s in i=!0,n)_(e,t,s,n[s],!0,o,a);else if(void 0!==r&&(i=!0,m(r)||(a=!0),l&&(a?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(k(e),n)})),t))for(;s<u;s++)t(e[s],n,a?r:r.call(e[s],s,t(e[s],n)));return i?e:l?t.call(e):u?t(e[0],n):o},z=/^-ms-/,U=/-([a-z])/g;function X(e,t){return t.toUpperCase()}function V(e){return e.replace(z,"ms-").replace(U,X)}var G=function(e){return 1===e.nodeType||9===e.nodeType||!+e.nodeType};function Y(){this.expando=k.expando+Y.uid++}Y.uid=1,Y.prototype={cache:function(e){var t=e[this.expando];return t||(t={},G(e)&&(e.nodeType?e[this.expando]=t:Object.defineProperty(e,this.expando,{value:t,configurable:!0}))),t},set:function(e,t,n){var r,i=this.cache(e);if("string"==typeof t)i[V(t)]=n;else for(r in t)i[V(r)]=t[r];return i},get:function(e,t){return void 0===t?this.cache(e):e[this.expando]&&e[this.expando][V(t)]},access:function(e,t,n){return void 0===t||t&&"string"==typeof t&&void 0===n?this.get(e,t):(this.set(e,t,n),void 0!==n?n:t)},remove:function(e,t){var n,r=e[this.expando];if(void 0!==r){if(void 0!==t){n=(t=Array.isArray(t)?t.map(V):(t=V(t))in r?[t]:t.match(R)||[]).length;while(n--)delete r[t[n]]}(void 0===t||k.isEmptyObject(r))&&(e.nodeType?e[this.expando]=void 0:delete e[this.expando])}},hasData:function(e){var t=e[this.expando];return void 0!==t&&!k.isEmptyObject(t)}};var Q=new Y,J=new Y,K=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Z=/[A-Z]/g;function ee(e,t,n){var r,i;if(void 0===n&&1===e.nodeType)if(r="data-"+t.replace(Z,"-$&").toLowerCase(),"string"==typeof(n=e.getAttribute(r))){try{n="true"===(i=n)||"false"!==i&&("null"===i?null:i===+i+""?+i:K.test(i)?JSON.parse(i):i)}catch(e){}J.set(e,t,n)}else n=void 0;return n}k.extend({hasData:function(e){return J.hasData(e)||Q.hasData(e)},data:function(e,t,n){return J.access(e,t,n)},removeData:function(e,t){J.remove(e,t)},_data:function(e,t,n){return Q.access(e,t,n)},_removeData:function(e,t){Q.remove(e,t)}}),k.fn.extend({data:function(n,e){var t,r,i,o=this[0],a=o&&o.attributes;if(void 0===n){if(this.length&&(i=J.get(o),1===o.nodeType&&!Q.get(o,"hasDataAttrs"))){t=a.length;while(t--)a[t]&&0===(r=a[t].name).indexOf("data-")&&(r=V(r.slice(5)),ee(o,r,i[r]));Q.set(o,"hasDataAttrs",!0)}return i}return"object"==typeof n?this.each(function(){J.set(this,n)}):_(this,function(e){var t;if(o&&void 0===e)return void 0!==(t=J.get(o,n))?t:void 0!==(t=ee(o,n))?t:void 0;this.each(function(){J.set(this,n,e)})},null,e,1<arguments.length,null,!0)},removeData:function(e){return this.each(function(){J.remove(this,e)})}}),k.extend({queue:function(e,t,n){var r;if(e)return t=(t||"fx")+"queue",r=Q.get(e,t),n&&(!r||Array.isArray(n)?r=Q.access(e,t,k.makeArray(n)):r.push(n)),r||[]},dequeue:function(e,t){t=t||"fx";var n=k.queue(e,t),r=n.length,i=n.shift(),o=k._queueHooks(e,t);"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,function(){k.dequeue(e,t)},o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return Q.get(e,n)||Q.access(e,n,{empty:k.Callbacks("once memory").add(function(){Q.remove(e,[t+"queue",n])})})}}),k.fn.extend({queue:function(t,n){var e=2;return"string"!=typeof t&&(n=t,t="fx",e--),arguments.length<e?k.queue(this[0],t):void 0===n?this:this.each(function(){var e=k.queue(this,t,n);k._queueHooks(this,t),"fx"===t&&"inprogress"!==e[0]&&k.dequeue(this,t)})},dequeue:function(e){return this.each(function(){k.dequeue(this,e)})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=k.Deferred(),o=this,a=this.length,s=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=void 0),e=e||"fx";while(a--)(n=Q.get(o[a],e+"queueHooks"))&&n.empty&&(r++,n.empty.add(s));return s(),i.promise(t)}});var te=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ne=new RegExp("^(?:([+-])=|)("+te+")([a-z%]*)$","i"),re=["Top","Right","Bottom","Left"],ie=E.documentElement,oe=function(e){return k.contains(e.ownerDocument,e)},ae={composed:!0};ie.getRootNode&&(oe=function(e){return k.contains(e.ownerDocument,e)||e.getRootNode(ae)===e.ownerDocument});var se=function(e,t){return"none"===(e=t||e).style.display||""===e.style.display&&oe(e)&&"none"===k.css(e,"display")},ue=function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];for(o in i=n.apply(e,r||[]),t)e.style[o]=a[o];return i};function le(e,t,n,r){var i,o,a=20,s=r?function(){return r.cur()}:function(){return k.css(e,t,"")},u=s(),l=n&&n[3]||(k.cssNumber[t]?"":"px"),c=e.nodeType&&(k.cssNumber[t]||"px"!==l&&+u)&&ne.exec(k.css(e,t));if(c&&c[3]!==l){u/=2,l=l||c[3],c=+u||1;while(a--)k.style(e,t,c+l),(1-o)*(1-(o=s()/u||.5))<=0&&(a=0),c/=o;c*=2,k.style(e,t,c+l),n=n||[]}return n&&(c=+c||+u||0,i=n[1]?c+(n[1]+1)*n[2]:+n[2],r&&(r.unit=l,r.start=c,r.end=i)),i}var ce={};function fe(e,t){for(var n,r,i,o,a,s,u,l=[],c=0,f=e.length;c<f;c++)(r=e[c]).style&&(n=r.style.display,t?("none"===n&&(l[c]=Q.get(r,"display")||null,l[c]||(r.style.display="")),""===r.style.display&&se(r)&&(l[c]=(u=a=o=void 0,a=(i=r).ownerDocument,s=i.nodeName,(u=ce[s])||(o=a.body.appendChild(a.createElement(s)),u=k.css(o,"display"),o.parentNode.removeChild(o),"none"===u&&(u="block"),ce[s]=u)))):"none"!==n&&(l[c]="none",Q.set(r,"display",n)));for(c=0;c<f;c++)null!=l[c]&&(e[c].style.display=l[c]);return e}k.fn.extend({show:function(){return fe(this,!0)},hide:function(){return fe(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){se(this)?k(this).show():k(this).hide()})}});var pe=/^(?:checkbox|radio)$/i,de=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,he=/^$|^module$|\/(?:java|ecma)script/i,ge={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};function ve(e,t){var n;return n="undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t||"*"):"undefined"!=typeof e.querySelectorAll?e.querySelectorAll(t||"*"):[],void 0===t||t&&A(e,t)?k.merge([e],n):n}function ye(e,t){for(var n=0,r=e.length;n<r;n++)Q.set(e[n],"globalEval",!t||Q.get(t[n],"globalEval"))}ge.optgroup=ge.option,ge.tbody=ge.tfoot=ge.colgroup=ge.caption=ge.thead,ge.th=ge.td;var me,xe,be=/<|&#?\w+;/;function we(e,t,n,r,i){for(var o,a,s,u,l,c,f=t.createDocumentFragment(),p=[],d=0,h=e.length;d<h;d++)if((o=e[d])||0===o)if("object"===w(o))k.merge(p,o.nodeType?[o]:o);else if(be.test(o)){a=a||f.appendChild(t.createElement("div")),s=(de.exec(o)||["",""])[1].toLowerCase(),u=ge[s]||ge._default,a.innerHTML=u[1]+k.htmlPrefilter(o)+u[2],c=u[0];while(c--)a=a.lastChild;k.merge(p,a.childNodes),(a=f.firstChild).textContent=""}else p.push(t.createTextNode(o));f.textContent="",d=0;while(o=p[d++])if(r&&-1<k.inArray(o,r))i&&i.push(o);else if(l=oe(o),a=ve(f.appendChild(o),"script"),l&&ye(a),n){c=0;while(o=a[c++])he.test(o.type||"")&&n.push(o)}return f}me=E.createDocumentFragment().appendChild(E.createElement("div")),(xe=E.createElement("input")).setAttribute("type","radio"),xe.setAttribute("checked","checked"),xe.setAttribute("name","t"),me.appendChild(xe),y.checkClone=me.cloneNode(!0).cloneNode(!0).lastChild.checked,me.innerHTML="<textarea>x</textarea>",y.noCloneChecked=!!me.cloneNode(!0).lastChild.defaultValue;var Te=/^key/,Ce=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,Ee=/^([^.]*)(?:\.(.+)|)/;function ke(){return!0}function Se(){return!1}function Ne(e,t){return e===function(){try{return E.activeElement}catch(e){}}()==("focus"===t)}function Ae(e,t,n,r,i,o){var a,s;if("object"==typeof t){for(s in"string"!=typeof n&&(r=r||n,n=void 0),t)Ae(e,s,n,r,t[s],o);return e}if(null==r&&null==i?(i=n,r=n=void 0):null==i&&("string"==typeof n?(i=r,r=void 0):(i=r,r=n,n=void 0)),!1===i)i=Se;else if(!i)return e;return 1===o&&(a=i,(i=function(e){return k().off(e),a.apply(this,arguments)}).guid=a.guid||(a.guid=k.guid++)),e.each(function(){k.event.add(this,t,i,r,n)})}function De(e,i,o){o?(Q.set(e,i,!1),k.event.add(e,i,{namespace:!1,handler:function(e){var t,n,r=Q.get(this,i);if(1&e.isTrigger&&this[i]){if(r.length)(k.event.special[i]||{}).delegateType&&e.stopPropagation();else if(r=s.call(arguments),Q.set(this,i,r),t=o(this,i),this[i](),r!==(n=Q.get(this,i))||t?Q.set(this,i,!1):n={},r!==n)return e.stopImmediatePropagation(),e.preventDefault(),n.value}else r.length&&(Q.set(this,i,{value:k.event.trigger(k.extend(r[0],k.Event.prototype),r.slice(1),this)}),e.stopImmediatePropagation())}})):void 0===Q.get(e,i)&&k.event.add(e,i,ke)}k.event={global:{},add:function(t,e,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Q.get(t);if(v){n.handler&&(n=(o=n).handler,i=o.selector),i&&k.find.matchesSelector(ie,i),n.guid||(n.guid=k.guid++),(u=v.events)||(u=v.events={}),(a=v.handle)||(a=v.handle=function(e){return"undefined"!=typeof k&&k.event.triggered!==e.type?k.event.dispatch.apply(t,arguments):void 0}),l=(e=(e||"").match(R)||[""]).length;while(l--)d=g=(s=Ee.exec(e[l])||[])[1],h=(s[2]||"").split(".").sort(),d&&(f=k.event.special[d]||{},d=(i?f.delegateType:f.bindType)||d,f=k.event.special[d]||{},c=k.extend({type:d,origType:g,data:r,handler:n,guid:n.guid,selector:i,needsContext:i&&k.expr.match.needsContext.test(i),namespace:h.join(".")},o),(p=u[d])||((p=u[d]=[]).delegateCount=0,f.setup&&!1!==f.setup.call(t,r,h,a)||t.addEventListener&&t.addEventListener(d,a)),f.add&&(f.add.call(t,c),c.handler.guid||(c.handler.guid=n.guid)),i?p.splice(p.delegateCount++,0,c):p.push(c),k.event.global[d]=!0)}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,f,p,d,h,g,v=Q.hasData(e)&&Q.get(e);if(v&&(u=v.events)){l=(t=(t||"").match(R)||[""]).length;while(l--)if(d=g=(s=Ee.exec(t[l])||[])[1],h=(s[2]||"").split(".").sort(),d){f=k.event.special[d]||{},p=u[d=(r?f.delegateType:f.bindType)||d]||[],s=s[2]&&new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),a=o=p.length;while(o--)c=p[o],!i&&g!==c.origType||n&&n.guid!==c.guid||s&&!s.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(p.splice(o,1),c.selector&&p.delegateCount--,f.remove&&f.remove.call(e,c));a&&!p.length&&(f.teardown&&!1!==f.teardown.call(e,h,v.handle)||k.removeEvent(e,d,v.handle),delete u[d])}else for(d in u)k.event.remove(e,d+t[l],n,r,!0);k.isEmptyObject(u)&&Q.remove(e,"handle events")}},dispatch:function(e){var t,n,r,i,o,a,s=k.event.fix(e),u=new Array(arguments.length),l=(Q.get(this,"events")||{})[s.type]||[],c=k.event.special[s.type]||{};for(u[0]=s,t=1;t<arguments.length;t++)u[t]=arguments[t];if(s.delegateTarget=this,!c.preDispatch||!1!==c.preDispatch.call(this,s)){a=k.event.handlers.call(this,s,l),t=0;while((i=a[t++])&&!s.isPropagationStopped()){s.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!s.isImmediatePropagationStopped())s.rnamespace&&!1!==o.namespace&&!s.rnamespace.test(o.namespace)||(s.handleObj=o,s.data=o.data,void 0!==(r=((k.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,u))&&!1===(s.result=r)&&(s.preventDefault(),s.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,s),s.result}},handlers:function(e,t){var n,r,i,o,a,s=[],u=t.delegateCount,l=e.target;if(u&&l.nodeType&&!("click"===e.type&&1<=e.button))for(;l!==this;l=l.parentNode||this)if(1===l.nodeType&&("click"!==e.type||!0!==l.disabled)){for(o=[],a={},n=0;n<u;n++)void 0===a[i=(r=t[n]).selector+" "]&&(a[i]=r.needsContext?-1<k(i,this).index(l):k.find(i,this,null,[l]).length),a[i]&&o.push(r);o.length&&s.push({elem:l,handlers:o})}return l=this,u<t.length&&s.push({elem:l,handlers:t.slice(u)}),s},addProp:function(t,e){Object.defineProperty(k.Event.prototype,t,{enumerable:!0,configurable:!0,get:m(e)?function(){if(this.originalEvent)return e(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[t]},set:function(e){Object.defineProperty(this,t,{enumerable:!0,configurable:!0,writable:!0,value:e})}})},fix:function(e){return e[k.expando]?e:new k.Event(e)},special:{load:{noBubble:!0},click:{setup:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&De(t,"click",ke),!1},trigger:function(e){var t=this||e;return pe.test(t.type)&&t.click&&A(t,"input")&&De(t,"click"),!0},_default:function(e){var t=e.target;return pe.test(t.type)&&t.click&&A(t,"input")&&Q.get(t,"click")||A(t,"a")}},beforeunload:{postDispatch:function(e){void 0!==e.result&&e.originalEvent&&(e.originalEvent.returnValue=e.result)}}}},k.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n)},k.Event=function(e,t){if(!(this instanceof k.Event))return new k.Event(e,t);e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||void 0===e.defaultPrevented&&!1===e.returnValue?ke:Se,this.target=e.target&&3===e.target.nodeType?e.target.parentNode:e.target,this.currentTarget=e.currentTarget,this.relatedTarget=e.relatedTarget):this.type=e,t&&k.extend(this,t),this.timeStamp=e&&e.timeStamp||Date.now(),this[k.expando]=!0},k.Event.prototype={constructor:k.Event,isDefaultPrevented:Se,isPropagationStopped:Se,isImmediatePropagationStopped:Se,isSimulated:!1,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=ke,e&&!this.isSimulated&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=ke,e&&!this.isSimulated&&e.stopPropagation()},stopImmediatePropagation:function(){var e=this.originalEvent;this.isImmediatePropagationStopped=ke,e&&!this.isSimulated&&e.stopImmediatePropagation(),this.stopPropagation()}},k.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(e){var t=e.button;return null==e.which&&Te.test(e.type)?null!=e.charCode?e.charCode:e.keyCode:!e.which&&void 0!==t&&Ce.test(e.type)?1&t?1:2&t?3:4&t?2:0:e.which}},k.event.addProp),k.each({focus:"focusin",blur:"focusout"},function(e,t){k.event.special[e]={setup:function(){return De(this,e,Ne),!1},trigger:function(){return De(this,e),!0},delegateType:t}}),k.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,i){k.event.special[e]={delegateType:i,bindType:i,handle:function(e){var t,n=e.relatedTarget,r=e.handleObj;return n&&(n===this||k.contains(this,n))||(e.type=r.origType,t=r.handler.apply(this,arguments),e.type=i),t}}}),k.fn.extend({on:function(e,t,n,r){return Ae(this,e,t,n,r)},one:function(e,t,n,r){return Ae(this,e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,k(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return!1!==t&&"function"!=typeof t||(n=t,t=void 0),!1===n&&(n=Se),this.each(function(){k.event.remove(this,e,n,t)})}});var je=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,qe=/<script|<style|<link/i,Le=/checked\s*(?:[^=]|=\s*.checked.)/i,He=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Oe(e,t){return A(e,"table")&&A(11!==t.nodeType?t:t.firstChild,"tr")&&k(e).children("tbody")[0]||e}function Pe(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function Re(e){return"true/"===(e.type||"").slice(0,5)?e.type=e.type.slice(5):e.removeAttribute("type"),e}function Me(e,t){var n,r,i,o,a,s,u,l;if(1===t.nodeType){if(Q.hasData(e)&&(o=Q.access(e),a=Q.set(t,o),l=o.events))for(i in delete a.handle,a.events={},l)for(n=0,r=l[i].length;n<r;n++)k.event.add(t,i,l[i][n]);J.hasData(e)&&(s=J.access(e),u=k.extend({},s),J.set(t,u))}}function Ie(n,r,i,o){r=g.apply([],r);var e,t,a,s,u,l,c=0,f=n.length,p=f-1,d=r[0],h=m(d);if(h||1<f&&"string"==typeof d&&!y.checkClone&&Le.test(d))return n.each(function(e){var t=n.eq(e);h&&(r[0]=d.call(this,e,t.html())),Ie(t,r,i,o)});if(f&&(t=(e=we(r,n[0].ownerDocument,!1,n,o)).firstChild,1===e.childNodes.length&&(e=t),t||o)){for(s=(a=k.map(ve(e,"script"),Pe)).length;c<f;c++)u=e,c!==p&&(u=k.clone(u,!0,!0),s&&k.merge(a,ve(u,"script"))),i.call(n[c],u,c);if(s)for(l=a[a.length-1].ownerDocument,k.map(a,Re),c=0;c<s;c++)u=a[c],he.test(u.type||"")&&!Q.access(u,"globalEval")&&k.contains(l,u)&&(u.src&&"module"!==(u.type||"").toLowerCase()?k._evalUrl&&!u.noModule&&k._evalUrl(u.src,{nonce:u.nonce||u.getAttribute("nonce")}):b(u.textContent.replace(He,""),u,l))}return n}function We(e,t,n){for(var r,i=t?k.filter(t,e):e,o=0;null!=(r=i[o]);o++)n||1!==r.nodeType||k.cleanData(ve(r)),r.parentNode&&(n&&oe(r)&&ye(ve(r,"script")),r.parentNode.removeChild(r));return e}k.extend({htmlPrefilter:function(e){return e.replace(je,"<$1></$2>")},clone:function(e,t,n){var r,i,o,a,s,u,l,c=e.cloneNode(!0),f=oe(e);if(!(y.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||k.isXMLDoc(e)))for(a=ve(c),r=0,i=(o=ve(e)).length;r<i;r++)s=o[r],u=a[r],void 0,"input"===(l=u.nodeName.toLowerCase())&&pe.test(s.type)?u.checked=s.checked:"input"!==l&&"textarea"!==l||(u.defaultValue=s.defaultValue);if(t)if(n)for(o=o||ve(e),a=a||ve(c),r=0,i=o.length;r<i;r++)Me(o[r],a[r]);else Me(e,c);return 0<(a=ve(c,"script")).length&&ye(a,!f&&ve(e,"script")),c},cleanData:function(e){for(var t,n,r,i=k.event.special,o=0;void 0!==(n=e[o]);o++)if(G(n)){if(t=n[Q.expando]){if(t.events)for(r in t.events)i[r]?k.event.remove(n,r):k.removeEvent(n,r,t.handle);n[Q.expando]=void 0}n[J.expando]&&(n[J.expando]=void 0)}}}),k.fn.extend({detach:function(e){return We(this,e,!0)},remove:function(e){return We(this,e)},text:function(e){return _(this,function(e){return void 0===e?k.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=e)})},null,e,arguments.length)},append:function(){return Ie(this,arguments,function(e){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||Oe(this,e).appendChild(e)})},prepend:function(){return Ie(this,arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Oe(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return Ie(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return Ie(this,arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},empty:function(){for(var e,t=0;null!=(e=this[t]);t++)1===e.nodeType&&(k.cleanData(ve(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null!=e&&e,t=null==t?e:t,this.map(function(){return k.clone(this,e,t)})},html:function(e){return _(this,function(e){var t=this[0]||{},n=0,r=this.length;if(void 0===e&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!qe.test(e)&&!ge[(de.exec(e)||["",""])[1].toLowerCase()]){e=k.htmlPrefilter(e);try{for(;n<r;n++)1===(t=this[n]||{}).nodeType&&(k.cleanData(ve(t,!1)),t.innerHTML=e);t=0}catch(e){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var n=[];return Ie(this,arguments,function(e){var t=this.parentNode;k.inArray(this,n)<0&&(k.cleanData(ve(this)),t&&t.replaceChild(e,this))},n)}}),k.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,a){k.fn[e]=function(e){for(var t,n=[],r=k(e),i=r.length-1,o=0;o<=i;o++)t=o===i?this:this.clone(!0),k(r[o])[a](t),u.apply(n,t.get());return this.pushStack(n)}});var $e=new RegExp("^("+te+")(?!px)[a-z%]+$","i"),Fe=function(e){var t=e.ownerDocument.defaultView;return t&&t.opener||(t=C),t.getComputedStyle(e)},Be=new RegExp(re.join("|"),"i");function _e(e,t,n){var r,i,o,a,s=e.style;return(n=n||Fe(e))&&(""!==(a=n.getPropertyValue(t)||n[t])||oe(e)||(a=k.style(e,t)),!y.pixelBoxStyles()&&$e.test(a)&&Be.test(t)&&(r=s.width,i=s.minWidth,o=s.maxWidth,s.minWidth=s.maxWidth=s.width=a,a=n.width,s.width=r,s.minWidth=i,s.maxWidth=o)),void 0!==a?a+"":a}function ze(e,t){return{get:function(){if(!e())return(this.get=t).apply(this,arguments);delete this.get}}}!function(){function e(){if(u){s.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",u.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",ie.appendChild(s).appendChild(u);var e=C.getComputedStyle(u);n="1%"!==e.top,a=12===t(e.marginLeft),u.style.right="60%",o=36===t(e.right),r=36===t(e.width),u.style.position="absolute",i=12===t(u.offsetWidth/3),ie.removeChild(s),u=null}}function t(e){return Math.round(parseFloat(e))}var n,r,i,o,a,s=E.createElement("div"),u=E.createElement("div");u.style&&(u.style.backgroundClip="content-box",u.cloneNode(!0).style.backgroundClip="",y.clearCloneStyle="content-box"===u.style.backgroundClip,k.extend(y,{boxSizingReliable:function(){return e(),r},pixelBoxStyles:function(){return e(),o},pixelPosition:function(){return e(),n},reliableMarginLeft:function(){return e(),a},scrollboxSize:function(){return e(),i}}))}();var Ue=["Webkit","Moz","ms"],Xe=E.createElement("div").style,Ve={};function Ge(e){var t=k.cssProps[e]||Ve[e];return t||(e in Xe?e:Ve[e]=function(e){var t=e[0].toUpperCase()+e.slice(1),n=Ue.length;while(n--)if((e=Ue[n]+t)in Xe)return e}(e)||e)}var Ye=/^(none|table(?!-c[ea]).+)/,Qe=/^--/,Je={position:"absolute",visibility:"hidden",display:"block"},Ke={letterSpacing:"0",fontWeight:"400"};function Ze(e,t,n){var r=ne.exec(t);return r?Math.max(0,r[2]-(n||0))+(r[3]||"px"):t}function et(e,t,n,r,i,o){var a="width"===t?1:0,s=0,u=0;if(n===(r?"border":"content"))return 0;for(;a<4;a+=2)"margin"===n&&(u+=k.css(e,n+re[a],!0,i)),r?("content"===n&&(u-=k.css(e,"padding"+re[a],!0,i)),"margin"!==n&&(u-=k.css(e,"border"+re[a]+"Width",!0,i))):(u+=k.css(e,"padding"+re[a],!0,i),"padding"!==n?u+=k.css(e,"border"+re[a]+"Width",!0,i):s+=k.css(e,"border"+re[a]+"Width",!0,i));return!r&&0<=o&&(u+=Math.max(0,Math.ceil(e["offset"+t[0].toUpperCase()+t.slice(1)]-o-u-s-.5))||0),u}function tt(e,t,n){var r=Fe(e),i=(!y.boxSizingReliable()||n)&&"border-box"===k.css(e,"boxSizing",!1,r),o=i,a=_e(e,t,r),s="offset"+t[0].toUpperCase()+t.slice(1);if($e.test(a)){if(!n)return a;a="auto"}return(!y.boxSizingReliable()&&i||"auto"===a||!parseFloat(a)&&"inline"===k.css(e,"display",!1,r))&&e.getClientRects().length&&(i="border-box"===k.css(e,"boxSizing",!1,r),(o=s in e)&&(a=e[s])),(a=parseFloat(a)||0)+et(e,t,n||(i?"border":"content"),o,r,a)+"px"}function nt(e,t,n,r,i){return new nt.prototype.init(e,t,n,r,i)}k.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=_e(e,"opacity");return""===n?"1":n}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,a,s=V(t),u=Qe.test(t),l=e.style;if(u||(t=Ge(s)),a=k.cssHooks[t]||k.cssHooks[s],void 0===n)return a&&"get"in a&&void 0!==(i=a.get(e,!1,r))?i:l[t];"string"===(o=typeof n)&&(i=ne.exec(n))&&i[1]&&(n=le(e,t,i),o="number"),null!=n&&n==n&&("number"!==o||u||(n+=i&&i[3]||(k.cssNumber[s]?"":"px")),y.clearCloneStyle||""!==n||0!==t.indexOf("background")||(l[t]="inherit"),a&&"set"in a&&void 0===(n=a.set(e,n,r))||(u?l.setProperty(t,n):l[t]=n))}},css:function(e,t,n,r){var i,o,a,s=V(t);return Qe.test(t)||(t=Ge(s)),(a=k.cssHooks[t]||k.cssHooks[s])&&"get"in a&&(i=a.get(e,!0,n)),void 0===i&&(i=_e(e,t,r)),"normal"===i&&t in Ke&&(i=Ke[t]),""===n||n?(o=parseFloat(i),!0===n||isFinite(o)?o||0:i):i}}),k.each(["height","width"],function(e,u){k.cssHooks[u]={get:function(e,t,n){if(t)return!Ye.test(k.css(e,"display"))||e.getClientRects().length&&e.getBoundingClientRect().width?tt(e,u,n):ue(e,Je,function(){return tt(e,u,n)})},set:function(e,t,n){var r,i=Fe(e),o=!y.scrollboxSize()&&"absolute"===i.position,a=(o||n)&&"border-box"===k.css(e,"boxSizing",!1,i),s=n?et(e,u,n,a,i):0;return a&&o&&(s-=Math.ceil(e["offset"+u[0].toUpperCase()+u.slice(1)]-parseFloat(i[u])-et(e,u,"border",!1,i)-.5)),s&&(r=ne.exec(t))&&"px"!==(r[3]||"px")&&(e.style[u]=t,t=k.css(e,u)),Ze(0,t,s)}}}),k.cssHooks.marginLeft=ze(y.reliableMarginLeft,function(e,t){if(t)return(parseFloat(_e(e,"marginLeft"))||e.getBoundingClientRect().left-ue(e,{marginLeft:0},function(){return e.getBoundingClientRect().left}))+"px"}),k.each({margin:"",padding:"",border:"Width"},function(i,o){k.cssHooks[i+o]={expand:function(e){for(var t=0,n={},r="string"==typeof e?e.split(" "):[e];t<4;t++)n[i+re[t]+o]=r[t]||r[t-2]||r[0];return n}},"margin"!==i&&(k.cssHooks[i+o].set=Ze)}),k.fn.extend({css:function(e,t){return _(this,function(e,t,n){var r,i,o={},a=0;if(Array.isArray(t)){for(r=Fe(e),i=t.length;a<i;a++)o[t[a]]=k.css(e,t[a],!1,r);return o}return void 0!==n?k.style(e,t,n):k.css(e,t)},e,t,1<arguments.length)}}),((k.Tween=nt).prototype={constructor:nt,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||k.easing._default,this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(k.cssNumber[n]?"":"px")},cur:function(){var e=nt.propHooks[this.prop];return e&&e.get?e.get(this):nt.propHooks._default.get(this)},run:function(e){var t,n=nt.propHooks[this.prop];return this.options.duration?this.pos=t=k.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):this.pos=t=e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):nt.propHooks._default.set(this),this}}).init.prototype=nt.prototype,(nt.propHooks={_default:{get:function(e){var t;return 1!==e.elem.nodeType||null!=e.elem[e.prop]&&null==e.elem.style[e.prop]?e.elem[e.prop]:(t=k.css(e.elem,e.prop,""))&&"auto"!==t?t:0},set:function(e){k.fx.step[e.prop]?k.fx.step[e.prop](e):1!==e.elem.nodeType||!k.cssHooks[e.prop]&&null==e.elem.style[Ge(e.prop)]?e.elem[e.prop]=e.now:k.style(e.elem,e.prop,e.now+e.unit)}}}).scrollTop=nt.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},k.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},_default:"swing"},k.fx=nt.prototype.init,k.fx.step={};var rt,it,ot,at,st=/^(?:toggle|show|hide)$/,ut=/queueHooks$/;function lt(){it&&(!1===E.hidden&&C.requestAnimationFrame?C.requestAnimationFrame(lt):C.setTimeout(lt,k.fx.interval),k.fx.tick())}function ct(){return C.setTimeout(function(){rt=void 0}),rt=Date.now()}function ft(e,t){var n,r=0,i={height:e};for(t=t?1:0;r<4;r+=2-t)i["margin"+(n=re[r])]=i["padding"+n]=e;return t&&(i.opacity=i.width=e),i}function pt(e,t,n){for(var r,i=(dt.tweeners[t]||[]).concat(dt.tweeners["*"]),o=0,a=i.length;o<a;o++)if(r=i[o].call(n,t,e))return r}function dt(o,e,t){var n,a,r=0,i=dt.prefilters.length,s=k.Deferred().always(function(){delete u.elem}),u=function(){if(a)return!1;for(var e=rt||ct(),t=Math.max(0,l.startTime+l.duration-e),n=1-(t/l.duration||0),r=0,i=l.tweens.length;r<i;r++)l.tweens[r].run(n);return s.notifyWith(o,[l,n,t]),n<1&&i?t:(i||s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l]),!1)},l=s.promise({elem:o,props:k.extend({},e),opts:k.extend(!0,{specialEasing:{},easing:k.easing._default},t),originalProperties:e,originalOptions:t,startTime:rt||ct(),duration:t.duration,tweens:[],createTween:function(e,t){var n=k.Tween(o,l.opts,e,t,l.opts.specialEasing[e]||l.opts.easing);return l.tweens.push(n),n},stop:function(e){var t=0,n=e?l.tweens.length:0;if(a)return this;for(a=!0;t<n;t++)l.tweens[t].run(1);return e?(s.notifyWith(o,[l,1,0]),s.resolveWith(o,[l,e])):s.rejectWith(o,[l,e]),this}}),c=l.props;for(!function(e,t){var n,r,i,o,a;for(n in e)if(i=t[r=V(n)],o=e[n],Array.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),(a=k.cssHooks[r])&&"expand"in a)for(n in o=a.expand(o),delete e[r],o)n in e||(e[n]=o[n],t[n]=i);else t[r]=i}(c,l.opts.specialEasing);r<i;r++)if(n=dt.prefilters[r].call(l,o,c,l.opts))return m(n.stop)&&(k._queueHooks(l.elem,l.opts.queue).stop=n.stop.bind(n)),n;return k.map(c,pt,l),m(l.opts.start)&&l.opts.start.call(o,l),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always),k.fx.timer(k.extend(u,{elem:o,anim:l,queue:l.opts.queue})),l}k.Animation=k.extend(dt,{tweeners:{"*":[function(e,t){var n=this.createTween(e,t);return le(n.elem,e,ne.exec(t),n),n}]},tweener:function(e,t){m(e)?(t=e,e=["*"]):e=e.match(R);for(var n,r=0,i=e.length;r<i;r++)n=e[r],dt.tweeners[n]=dt.tweeners[n]||[],dt.tweeners[n].unshift(t)},prefilters:[function(e,t,n){var r,i,o,a,s,u,l,c,f="width"in t||"height"in t,p=this,d={},h=e.style,g=e.nodeType&&se(e),v=Q.get(e,"fxshow");for(r in n.queue||(null==(a=k._queueHooks(e,"fx")).unqueued&&(a.unqueued=0,s=a.empty.fire,a.empty.fire=function(){a.unqueued||s()}),a.unqueued++,p.always(function(){p.always(function(){a.unqueued--,k.queue(e,"fx").length||a.empty.fire()})})),t)if(i=t[r],st.test(i)){if(delete t[r],o=o||"toggle"===i,i===(g?"hide":"show")){if("show"!==i||!v||void 0===v[r])continue;g=!0}d[r]=v&&v[r]||k.style(e,r)}if((u=!k.isEmptyObject(t))||!k.isEmptyObject(d))for(r in f&&1===e.nodeType&&(n.overflow=[h.overflow,h.overflowX,h.overflowY],null==(l=v&&v.display)&&(l=Q.get(e,"display")),"none"===(c=k.css(e,"display"))&&(l?c=l:(fe([e],!0),l=e.style.display||l,c=k.css(e,"display"),fe([e]))),("inline"===c||"inline-block"===c&&null!=l)&&"none"===k.css(e,"float")&&(u||(p.done(function(){h.display=l}),null==l&&(c=h.display,l="none"===c?"":c)),h.display="inline-block")),n.overflow&&(h.overflow="hidden",p.always(function(){h.overflow=n.overflow[0],h.overflowX=n.overflow[1],h.overflowY=n.overflow[2]})),u=!1,d)u||(v?"hidden"in v&&(g=v.hidden):v=Q.access(e,"fxshow",{display:l}),o&&(v.hidden=!g),g&&fe([e],!0),p.done(function(){for(r in g||fe([e]),Q.remove(e,"fxshow"),d)k.style(e,r,d[r])})),u=pt(g?v[r]:0,r,p),r in v||(v[r]=u.start,g&&(u.end=u.start,u.start=0))}],prefilter:function(e,t){t?dt.prefilters.unshift(e):dt.prefilters.push(e)}}),k.speed=function(e,t,n){var r=e&&"object"==typeof e?k.extend({},e):{complete:n||!n&&t||m(e)&&e,duration:e,easing:n&&t||t&&!m(t)&&t};return k.fx.off?r.duration=0:"number"!=typeof r.duration&&(r.duration in k.fx.speeds?r.duration=k.fx.speeds[r.duration]:r.duration=k.fx.speeds._default),null!=r.queue&&!0!==r.queue||(r.queue="fx"),r.old=r.complete,r.complete=function(){m(r.old)&&r.old.call(this),r.queue&&k.dequeue(this,r.queue)},r},k.fn.extend({fadeTo:function(e,t,n,r){return this.filter(se).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(t,e,n,r){var i=k.isEmptyObject(t),o=k.speed(e,n,r),a=function(){var e=dt(this,k.extend({},t),o);(i||Q.get(this,"finish"))&&e.stop(!0)};return a.finish=a,i||!1===o.queue?this.each(a):this.queue(o.queue,a)},stop:function(i,e,o){var a=function(e){var t=e.stop;delete e.stop,t(o)};return"string"!=typeof i&&(o=e,e=i,i=void 0),e&&!1!==i&&this.queue(i||"fx",[]),this.each(function(){var e=!0,t=null!=i&&i+"queueHooks",n=k.timers,r=Q.get(this);if(t)r[t]&&r[t].stop&&a(r[t]);else for(t in r)r[t]&&r[t].stop&&ut.test(t)&&a(r[t]);for(t=n.length;t--;)n[t].elem!==this||null!=i&&n[t].queue!==i||(n[t].anim.stop(o),e=!1,n.splice(t,1));!e&&o||k.dequeue(this,i)})},finish:function(a){return!1!==a&&(a=a||"fx"),this.each(function(){var e,t=Q.get(this),n=t[a+"queue"],r=t[a+"queueHooks"],i=k.timers,o=n?n.length:0;for(t.finish=!0,k.queue(this,a,[]),r&&r.stop&&r.stop.call(this,!0),e=i.length;e--;)i[e].elem===this&&i[e].queue===a&&(i[e].anim.stop(!0),i.splice(e,1));for(e=0;e<o;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete t.finish})}}),k.each(["toggle","show","hide"],function(e,r){var i=k.fn[r];k.fn[r]=function(e,t,n){return null==e||"boolean"==typeof e?i.apply(this,arguments):this.animate(ft(r,!0),e,t,n)}}),k.each({slideDown:ft("show"),slideUp:ft("hide"),slideToggle:ft("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,r){k.fn[e]=function(e,t,n){return this.animate(r,e,t,n)}}),k.timers=[],k.fx.tick=function(){var e,t=0,n=k.timers;for(rt=Date.now();t<n.length;t++)(e=n[t])()||n[t]!==e||n.splice(t--,1);n.length||k.fx.stop(),rt=void 0},k.fx.timer=function(e){k.timers.push(e),k.fx.start()},k.fx.interval=13,k.fx.start=function(){it||(it=!0,lt())},k.fx.stop=function(){it=null},k.fx.speeds={slow:600,fast:200,_default:400},k.fn.delay=function(r,e){return r=k.fx&&k.fx.speeds[r]||r,e=e||"fx",this.queue(e,function(e,t){var n=C.setTimeout(e,r);t.stop=function(){C.clearTimeout(n)}})},ot=E.createElement("input"),at=E.createElement("select").appendChild(E.createElement("option")),ot.type="checkbox",y.checkOn=""!==ot.value,y.optSelected=at.selected,(ot=E.createElement("input")).value="t",ot.type="radio",y.radioValue="t"===ot.value;var ht,gt=k.expr.attrHandle;k.fn.extend({attr:function(e,t){return _(this,k.attr,e,t,1<arguments.length)},removeAttr:function(e){return this.each(function(){k.removeAttr(this,e)})}}),k.extend({attr:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return"undefined"==typeof e.getAttribute?k.prop(e,t,n):(1===o&&k.isXMLDoc(e)||(i=k.attrHooks[t.toLowerCase()]||(k.expr.match.bool.test(t)?ht:void 0)),void 0!==n?null===n?void k.removeAttr(e,t):i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:(e.setAttribute(t,n+""),n):i&&"get"in i&&null!==(r=i.get(e,t))?r:null==(r=k.find.attr(e,t))?void 0:r)},attrHooks:{type:{set:function(e,t){if(!y.radioValue&&"radio"===t&&A(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},removeAttr:function(e,t){var n,r=0,i=t&&t.match(R);if(i&&1===e.nodeType)while(n=i[r++])e.removeAttribute(n)}}),ht={set:function(e,t,n){return!1===t?k.removeAttr(e,n):e.setAttribute(n,n),n}},k.each(k.expr.match.bool.source.match(/\w+/g),function(e,t){var a=gt[t]||k.find.attr;gt[t]=function(e,t,n){var r,i,o=t.toLowerCase();return n||(i=gt[o],gt[o]=r,r=null!=a(e,t,n)?o:null,gt[o]=i),r}});var vt=/^(?:input|select|textarea|button)$/i,yt=/^(?:a|area)$/i;function mt(e){return(e.match(R)||[]).join(" ")}function xt(e){return e.getAttribute&&e.getAttribute("class")||""}function bt(e){return Array.isArray(e)?e:"string"==typeof e&&e.match(R)||[]}k.fn.extend({prop:function(e,t){return _(this,k.prop,e,t,1<arguments.length)},removeProp:function(e){return this.each(function(){delete this[k.propFix[e]||e]})}}),k.extend({prop:function(e,t,n){var r,i,o=e.nodeType;if(3!==o&&8!==o&&2!==o)return 1===o&&k.isXMLDoc(e)||(t=k.propFix[t]||t,i=k.propHooks[t]),void 0!==n?i&&"set"in i&&void 0!==(r=i.set(e,n,t))?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){var t=k.find.attr(e,"tabindex");return t?parseInt(t,10):vt.test(e.nodeName)||yt.test(e.nodeName)&&e.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),y.optSelected||(k.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null},set:function(e){var t=e.parentNode;t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex)}}),k.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){k.propFix[this.toLowerCase()]=this}),k.fn.extend({addClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){k(this).addClass(t.call(this,e,xt(this)))});if((e=bt(t)).length)while(n=this[u++])if(i=xt(n),r=1===n.nodeType&&" "+mt(i)+" "){a=0;while(o=e[a++])r.indexOf(" "+o+" ")<0&&(r+=o+" ");i!==(s=mt(r))&&n.setAttribute("class",s)}return this},removeClass:function(t){var e,n,r,i,o,a,s,u=0;if(m(t))return this.each(function(e){k(this).removeClass(t.call(this,e,xt(this)))});if(!arguments.length)return this.attr("class","");if((e=bt(t)).length)while(n=this[u++])if(i=xt(n),r=1===n.nodeType&&" "+mt(i)+" "){a=0;while(o=e[a++])while(-1<r.indexOf(" "+o+" "))r=r.replace(" "+o+" "," ");i!==(s=mt(r))&&n.setAttribute("class",s)}return this},toggleClass:function(i,t){var o=typeof i,a="string"===o||Array.isArray(i);return"boolean"==typeof t&&a?t?this.addClass(i):this.removeClass(i):m(i)?this.each(function(e){k(this).toggleClass(i.call(this,e,xt(this),t),t)}):this.each(function(){var e,t,n,r;if(a){t=0,n=k(this),r=bt(i);while(e=r[t++])n.hasClass(e)?n.removeClass(e):n.addClass(e)}else void 0!==i&&"boolean"!==o||((e=xt(this))&&Q.set(this,"__className__",e),this.setAttribute&&this.setAttribute("class",e||!1===i?"":Q.get(this,"__className__")||""))})},hasClass:function(e){var t,n,r=0;t=" "+e+" ";while(n=this[r++])if(1===n.nodeType&&-1<(" "+mt(xt(n))+" ").indexOf(t))return!0;return!1}});var wt=/\r/g;k.fn.extend({val:function(n){var r,e,i,t=this[0];return arguments.length?(i=m(n),this.each(function(e){var t;1===this.nodeType&&(null==(t=i?n.call(this,e,k(this).val()):n)?t="":"number"==typeof t?t+="":Array.isArray(t)&&(t=k.map(t,function(e){return null==e?"":e+""})),(r=k.valHooks[this.type]||k.valHooks[this.nodeName.toLowerCase()])&&"set"in r&&void 0!==r.set(this,t,"value")||(this.value=t))})):t?(r=k.valHooks[t.type]||k.valHooks[t.nodeName.toLowerCase()])&&"get"in r&&void 0!==(e=r.get(t,"value"))?e:"string"==typeof(e=t.value)?e.replace(wt,""):null==e?"":e:void 0}}),k.extend({valHooks:{option:{get:function(e){var t=k.find.attr(e,"value");return null!=t?t:mt(k.text(e))}},select:{get:function(e){var t,n,r,i=e.options,o=e.selectedIndex,a="select-one"===e.type,s=a?null:[],u=a?o+1:i.length;for(r=o<0?u:a?o:0;r<u;r++)if(((n=i[r]).selected||r===o)&&!n.disabled&&(!n.parentNode.disabled||!A(n.parentNode,"optgroup"))){if(t=k(n).val(),a)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=k.makeArray(t),a=i.length;while(a--)((r=i[a]).selected=-1<k.inArray(k.valHooks.option.get(r),o))&&(n=!0);return n||(e.selectedIndex=-1),o}}}}),k.each(["radio","checkbox"],function(){k.valHooks[this]={set:function(e,t){if(Array.isArray(t))return e.checked=-1<k.inArray(k(e).val(),t)}},y.checkOn||(k.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})}),y.focusin="onfocusin"in C;var Tt=/^(?:focusinfocus|focusoutblur)$/,Ct=function(e){e.stopPropagation()};k.extend(k.event,{trigger:function(e,t,n,r){var i,o,a,s,u,l,c,f,p=[n||E],d=v.call(e,"type")?e.type:e,h=v.call(e,"namespace")?e.namespace.split("."):[];if(o=f=a=n=n||E,3!==n.nodeType&&8!==n.nodeType&&!Tt.test(d+k.event.triggered)&&(-1<d.indexOf(".")&&(d=(h=d.split(".")).shift(),h.sort()),u=d.indexOf(":")<0&&"on"+d,(e=e[k.expando]?e:new k.Event(d,"object"==typeof e&&e)).isTrigger=r?2:3,e.namespace=h.join("."),e.rnamespace=e.namespace?new RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=n),t=null==t?[e]:k.makeArray(t,[e]),c=k.event.special[d]||{},r||!c.trigger||!1!==c.trigger.apply(n,t))){if(!r&&!c.noBubble&&!x(n)){for(s=c.delegateType||d,Tt.test(s+d)||(o=o.parentNode);o;o=o.parentNode)p.push(o),a=o;a===(n.ownerDocument||E)&&p.push(a.defaultView||a.parentWindow||C)}i=0;while((o=p[i++])&&!e.isPropagationStopped())f=o,e.type=1<i?s:c.bindType||d,(l=(Q.get(o,"events")||{})[e.type]&&Q.get(o,"handle"))&&l.apply(o,t),(l=u&&o[u])&&l.apply&&G(o)&&(e.result=l.apply(o,t),!1===e.result&&e.preventDefault());return e.type=d,r||e.isDefaultPrevented()||c._default&&!1!==c._default.apply(p.pop(),t)||!G(n)||u&&m(n[d])&&!x(n)&&((a=n[u])&&(n[u]=null),k.event.triggered=d,e.isPropagationStopped()&&f.addEventListener(d,Ct),n[d](),e.isPropagationStopped()&&f.removeEventListener(d,Ct),k.event.triggered=void 0,a&&(n[u]=a)),e.result}},simulate:function(e,t,n){var r=k.extend(new k.Event,n,{type:e,isSimulated:!0});k.event.trigger(r,null,t)}}),k.fn.extend({trigger:function(e,t){return this.each(function(){k.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];if(n)return k.event.trigger(e,t,n,!0)}}),y.focusin||k.each({focus:"focusin",blur:"focusout"},function(n,r){var i=function(e){k.event.simulate(r,e.target,k.event.fix(e))};k.event.special[r]={setup:function(){var e=this.ownerDocument||this,t=Q.access(e,r);t||e.addEventListener(n,i,!0),Q.access(e,r,(t||0)+1)},teardown:function(){var e=this.ownerDocument||this,t=Q.access(e,r)-1;t?Q.access(e,r,t):(e.removeEventListener(n,i,!0),Q.remove(e,r))}}});var Et=C.location,kt=Date.now(),St=/\?/;k.parseXML=function(e){var t;if(!e||"string"!=typeof e)return null;try{t=(new C.DOMParser).parseFromString(e,"text/xml")}catch(e){t=void 0}return t&&!t.getElementsByTagName("parsererror").length||k.error("Invalid XML: "+e),t};var Nt=/\[\]$/,At=/\r?\n/g,Dt=/^(?:submit|button|image|reset|file)$/i,jt=/^(?:input|select|textarea|keygen)/i;function qt(n,e,r,i){var t;if(Array.isArray(e))k.each(e,function(e,t){r||Nt.test(n)?i(n,t):qt(n+"["+("object"==typeof t&&null!=t?e:"")+"]",t,r,i)});else if(r||"object"!==w(e))i(n,e);else for(t in e)qt(n+"["+t+"]",e[t],r,i)}k.param=function(e,t){var n,r=[],i=function(e,t){var n=m(t)?t():t;r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(null==n?"":n)};if(null==e)return"";if(Array.isArray(e)||e.jquery&&!k.isPlainObject(e))k.each(e,function(){i(this.name,this.value)});else for(n in e)qt(n,e[n],t,i);return r.join("&")},k.fn.extend({serialize:function(){return k.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=k.prop(this,"elements");return e?k.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!k(this).is(":disabled")&&jt.test(this.nodeName)&&!Dt.test(e)&&(this.checked||!pe.test(e))}).map(function(e,t){var n=k(this).val();return null==n?null:Array.isArray(n)?k.map(n,function(e){return{name:t.name,value:e.replace(At,"\r\n")}}):{name:t.name,value:n.replace(At,"\r\n")}}).get()}});var Lt=/%20/g,Ht=/#.*$/,Ot=/([?&])_=[^&]*/,Pt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Rt=/^(?:GET|HEAD)$/,Mt=/^\/\//,It={},Wt={},$t="*/".concat("*"),Ft=E.createElement("a");function Bt(o){return function(e,t){"string"!=typeof e&&(t=e,e="*");var n,r=0,i=e.toLowerCase().match(R)||[];if(m(t))while(n=i[r++])"+"===n[0]?(n=n.slice(1)||"*",(o[n]=o[n]||[]).unshift(t)):(o[n]=o[n]||[]).push(t)}}function _t(t,i,o,a){var s={},u=t===Wt;function l(e){var r;return s[e]=!0,k.each(t[e]||[],function(e,t){var n=t(i,o,a);return"string"!=typeof n||u||s[n]?u?!(r=n):void 0:(i.dataTypes.unshift(n),l(n),!1)}),r}return l(i.dataTypes[0])||!s["*"]&&l("*")}function zt(e,t){var n,r,i=k.ajaxSettings.flatOptions||{};for(n in t)void 0!==t[n]&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&k.extend(!0,e,r),e}Ft.href=Et.href,k.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Et.href,type:"GET",isLocal:/^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Et.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":$t,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":k.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?zt(zt(e,k.ajaxSettings),t):zt(k.ajaxSettings,e)},ajaxPrefilter:Bt(It),ajaxTransport:Bt(Wt),ajax:function(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var c,f,p,n,d,r,h,g,i,o,v=k.ajaxSetup({},t),y=v.context||v,m=v.context&&(y.nodeType||y.jquery)?k(y):k.event,x=k.Deferred(),b=k.Callbacks("once memory"),w=v.statusCode||{},a={},s={},u="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(h){if(!n){n={};while(t=Pt.exec(p))n[t[1].toLowerCase()+" "]=(n[t[1].toLowerCase()+" "]||[]).concat(t[2])}t=n[e.toLowerCase()+" "]}return null==t?null:t.join(", ")},getAllResponseHeaders:function(){return h?p:null},setRequestHeader:function(e,t){return null==h&&(e=s[e.toLowerCase()]=s[e.toLowerCase()]||e,a[e]=t),this},overrideMimeType:function(e){return null==h&&(v.mimeType=e),this},statusCode:function(e){var t;if(e)if(h)T.always(e[T.status]);else for(t in e)w[t]=[w[t],e[t]];return this},abort:function(e){var t=e||u;return c&&c.abort(t),l(0,t),this}};if(x.promise(T),v.url=((e||v.url||Et.href)+"").replace(Mt,Et.protocol+"//"),v.type=t.method||t.type||v.method||v.type,v.dataTypes=(v.dataType||"*").toLowerCase().match(R)||[""],null==v.crossDomain){r=E.createElement("a");try{r.href=v.url,r.href=r.href,v.crossDomain=Ft.protocol+"//"+Ft.host!=r.protocol+"//"+r.host}catch(e){v.crossDomain=!0}}if(v.data&&v.processData&&"string"!=typeof v.data&&(v.data=k.param(v.data,v.traditional)),_t(It,v,t,T),h)return T;for(i in(g=k.event&&v.global)&&0==k.active++&&k.event.trigger("ajaxStart"),v.type=v.type.toUpperCase(),v.hasContent=!Rt.test(v.type),f=v.url.replace(Ht,""),v.hasContent?v.data&&v.processData&&0===(v.contentType||"").indexOf("application/x-www-form-urlencoded")&&(v.data=v.data.replace(Lt,"+")):(o=v.url.slice(f.length),v.data&&(v.processData||"string"==typeof v.data)&&(f+=(St.test(f)?"&":"?")+v.data,delete v.data),!1===v.cache&&(f=f.replace(Ot,"$1"),o=(St.test(f)?"&":"?")+"_="+kt+++o),v.url=f+o),v.ifModified&&(k.lastModified[f]&&T.setRequestHeader("If-Modified-Since",k.lastModified[f]),k.etag[f]&&T.setRequestHeader("If-None-Match",k.etag[f])),(v.data&&v.hasContent&&!1!==v.contentType||t.contentType)&&T.setRequestHeader("Content-Type",v.contentType),T.setRequestHeader("Accept",v.dataTypes[0]&&v.accepts[v.dataTypes[0]]?v.accepts[v.dataTypes[0]]+("*"!==v.dataTypes[0]?", "+$t+"; q=0.01":""):v.accepts["*"]),v.headers)T.setRequestHeader(i,v.headers[i]);if(v.beforeSend&&(!1===v.beforeSend.call(y,T,v)||h))return T.abort();if(u="abort",b.add(v.complete),T.done(v.success),T.fail(v.error),c=_t(Wt,v,t,T)){if(T.readyState=1,g&&m.trigger("ajaxSend",[T,v]),h)return T;v.async&&0<v.timeout&&(d=C.setTimeout(function(){T.abort("timeout")},v.timeout));try{h=!1,c.send(a,l)}catch(e){if(h)throw e;l(-1,e)}}else l(-1,"No Transport");function l(e,t,n,r){var i,o,a,s,u,l=t;h||(h=!0,d&&C.clearTimeout(d),c=void 0,p=r||"",T.readyState=0<e?4:0,i=200<=e&&e<300||304===e,n&&(s=function(e,t,n){var r,i,o,a,s=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),void 0===r&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in s)if(s[i]&&s[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}a||(a=i)}o=o||a}if(o)return o!==u[0]&&u.unshift(o),n[o]}(v,T,n)),s=function(e,t,n,r){var i,o,a,s,u,l={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)l[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(!(a=l[u+" "+o]||l["* "+o]))for(i in l)if((s=i.split(" "))[1]===o&&(a=l[u+" "+s[0]]||l["* "+s[0]])){!0===a?a=l[i]:!0!==l[i]&&(o=s[0],c.unshift(s[1]));break}if(!0!==a)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(e){return{state:"parsererror",error:a?e:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}(v,s,T,i),i?(v.ifModified&&((u=T.getResponseHeader("Last-Modified"))&&(k.lastModified[f]=u),(u=T.getResponseHeader("etag"))&&(k.etag[f]=u)),204===e||"HEAD"===v.type?l="nocontent":304===e?l="notmodified":(l=s.state,o=s.data,i=!(a=s.error))):(a=l,!e&&l||(l="error",e<0&&(e=0))),T.status=e,T.statusText=(t||l)+"",i?x.resolveWith(y,[o,l,T]):x.rejectWith(y,[T,l,a]),T.statusCode(w),w=void 0,g&&m.trigger(i?"ajaxSuccess":"ajaxError",[T,v,i?o:a]),b.fireWith(y,[T,l]),g&&(m.trigger("ajaxComplete",[T,v]),--k.active||k.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return k.get(e,t,n,"json")},getScript:function(e,t){return k.get(e,void 0,t,"script")}}),k.each(["get","post"],function(e,i){k[i]=function(e,t,n,r){return m(t)&&(r=r||n,n=t,t=void 0),k.ajax(k.extend({url:e,type:i,dataType:r,data:t,success:n},k.isPlainObject(e)&&e))}}),k._evalUrl=function(e,t){return k.ajax({url:e,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(e){k.globalEval(e,t)}})},k.fn.extend({wrapAll:function(e){var t;return this[0]&&(m(e)&&(e=e.call(this[0])),t=k(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this},wrapInner:function(n){return m(n)?this.each(function(e){k(this).wrapInner(n.call(this,e))}):this.each(function(){var e=k(this),t=e.contents();t.length?t.wrapAll(n):e.append(n)})},wrap:function(t){var n=m(t);return this.each(function(e){k(this).wrapAll(n?t.call(this,e):t)})},unwrap:function(e){return this.parent(e).not("body").each(function(){k(this).replaceWith(this.childNodes)}),this}}),k.expr.pseudos.hidden=function(e){return!k.expr.pseudos.visible(e)},k.expr.pseudos.visible=function(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},k.ajaxSettings.xhr=function(){try{return new C.XMLHttpRequest}catch(e){}};var Ut={0:200,1223:204},Xt=k.ajaxSettings.xhr();y.cors=!!Xt&&"withCredentials"in Xt,y.ajax=Xt=!!Xt,k.ajaxTransport(function(i){var o,a;if(y.cors||Xt&&!i.crossDomain)return{send:function(e,t){var n,r=i.xhr();if(r.open(i.type,i.url,i.async,i.username,i.password),i.xhrFields)for(n in i.xhrFields)r[n]=i.xhrFields[n];for(n in i.mimeType&&r.overrideMimeType&&r.overrideMimeType(i.mimeType),i.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest"),e)r.setRequestHeader(n,e[n]);o=function(e){return function(){o&&(o=a=r.onload=r.onerror=r.onabort=r.ontimeout=r.onreadystatechange=null,"abort"===e?r.abort():"error"===e?"number"!=typeof r.status?t(0,"error"):t(r.status,r.statusText):t(Ut[r.status]||r.status,r.statusText,"text"!==(r.responseType||"text")||"string"!=typeof r.responseText?{binary:r.response}:{text:r.responseText},r.getAllResponseHeaders()))}},r.onload=o(),a=r.onerror=r.ontimeout=o("error"),void 0!==r.onabort?r.onabort=a:r.onreadystatechange=function(){4===r.readyState&&C.setTimeout(function(){o&&a()})},o=o("abort");try{r.send(i.hasContent&&i.data||null)}catch(e){if(o)throw e}},abort:function(){o&&o()}}}),k.ajaxPrefilter(function(e){e.crossDomain&&(e.contents.script=!1)}),k.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(e){return k.globalEval(e),e}}}),k.ajaxPrefilter("script",function(e){void 0===e.cache&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),k.ajaxTransport("script",function(n){var r,i;if(n.crossDomain||n.scriptAttrs)return{send:function(e,t){r=k("<script>").attr(n.scriptAttrs||{}).prop({charset:n.scriptCharset,src:n.url}).on("load error",i=function(e){r.remove(),i=null,e&&t("error"===e.type?404:200,e.type)}),E.head.appendChild(r[0])},abort:function(){i&&i()}}});var Vt,Gt=[],Yt=/(=)\?(?=&|$)|\?\?/;k.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Gt.pop()||k.expando+"_"+kt++;return this[e]=!0,e}}),k.ajaxPrefilter("json jsonp",function(e,t,n){var r,i,o,a=!1!==e.jsonp&&(Yt.test(e.url)?"url":"string"==typeof e.data&&0===(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&Yt.test(e.data)&&"data");if(a||"jsonp"===e.dataTypes[0])return r=e.jsonpCallback=m(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(Yt,"$1"+r):!1!==e.jsonp&&(e.url+=(St.test(e.url)?"&":"?")+e.jsonp+"="+r),e.converters["script json"]=function(){return o||k.error(r+" was not called"),o[0]},e.dataTypes[0]="json",i=C[r],C[r]=function(){o=arguments},n.always(function(){void 0===i?k(C).removeProp(r):C[r]=i,e[r]&&(e.jsonpCallback=t.jsonpCallback,Gt.push(r)),o&&m(i)&&i(o[0]),o=i=void 0}),"script"}),y.createHTMLDocument=((Vt=E.implementation.createHTMLDocument("").body).innerHTML="<form></form><form></form>",2===Vt.childNodes.length),k.parseHTML=function(e,t,n){return"string"!=typeof e?[]:("boolean"==typeof t&&(n=t,t=!1),t||(y.createHTMLDocument?((r=(t=E.implementation.createHTMLDocument("")).createElement("base")).href=E.location.href,t.head.appendChild(r)):t=E),o=!n&&[],(i=D.exec(e))?[t.createElement(i[1])]:(i=we([e],t,o),o&&o.length&&k(o).remove(),k.merge([],i.childNodes)));var r,i,o},k.fn.load=function(e,t,n){var r,i,o,a=this,s=e.indexOf(" ");return-1<s&&(r=mt(e.slice(s)),e=e.slice(0,s)),m(t)?(n=t,t=void 0):t&&"object"==typeof t&&(i="POST"),0<a.length&&k.ajax({url:e,type:i||"GET",dataType:"html",data:t}).done(function(e){o=arguments,a.html(r?k("<div>").append(k.parseHTML(e)).find(r):e)}).always(n&&function(e,t){a.each(function(){n.apply(this,o||[e.responseText,t,e])})}),this},k.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){k.fn[t]=function(e){return this.on(t,e)}}),k.expr.pseudos.animated=function(t){return k.grep(k.timers,function(e){return t===e.elem}).length},k.offset={setOffset:function(e,t,n){var r,i,o,a,s,u,l=k.css(e,"position"),c=k(e),f={};"static"===l&&(e.style.position="relative"),s=c.offset(),o=k.css(e,"top"),u=k.css(e,"left"),("absolute"===l||"fixed"===l)&&-1<(o+u).indexOf("auto")?(a=(r=c.position()).top,i=r.left):(a=parseFloat(o)||0,i=parseFloat(u)||0),m(t)&&(t=t.call(e,n,k.extend({},s))),null!=t.top&&(f.top=t.top-s.top+a),null!=t.left&&(f.left=t.left-s.left+i),"using"in t?t.using.call(e,f):c.css(f)}},k.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){k.offset.setOffset(this,t,e)});var e,n,r=this[0];return r?r.getClientRects().length?(e=r.getBoundingClientRect(),n=r.ownerDocument.defaultView,{top:e.top+n.pageYOffset,left:e.left+n.pageXOffset}):{top:0,left:0}:void 0},position:function(){if(this[0]){var e,t,n,r=this[0],i={top:0,left:0};if("fixed"===k.css(r,"position"))t=r.getBoundingClientRect();else{t=this.offset(),n=r.ownerDocument,e=r.offsetParent||n.documentElement;while(e&&(e===n.body||e===n.documentElement)&&"static"===k.css(e,"position"))e=e.parentNode;e&&e!==r&&1===e.nodeType&&((i=k(e).offset()).top+=k.css(e,"borderTopWidth",!0),i.left+=k.css(e,"borderLeftWidth",!0))}return{top:t.top-i.top-k.css(r,"marginTop",!0),left:t.left-i.left-k.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent;while(e&&"static"===k.css(e,"position"))e=e.offsetParent;return e||ie})}}),k.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var o="pageYOffset"===i;k.fn[t]=function(e){return _(this,function(e,t,n){var r;if(x(e)?r=e:9===e.nodeType&&(r=e.defaultView),void 0===n)return r?r[i]:e[t];r?r.scrollTo(o?r.pageXOffset:n,o?n:r.pageYOffset):e[t]=n},t,e,arguments.length)}}),k.each(["top","left"],function(e,n){k.cssHooks[n]=ze(y.pixelPosition,function(e,t){if(t)return t=_e(e,n),$e.test(t)?k(e).position()[n]+"px":t})}),k.each({Height:"height",Width:"width"},function(a,s){k.each({padding:"inner"+a,content:s,"":"outer"+a},function(r,o){k.fn[o]=function(e,t){var n=arguments.length&&(r||"boolean"!=typeof e),i=r||(!0===e||!0===t?"margin":"border");return _(this,function(e,t,n){var r;return x(e)?0===o.indexOf("outer")?e["inner"+a]:e.document.documentElement["client"+a]:9===e.nodeType?(r=e.documentElement,Math.max(e.body["scroll"+a],r["scroll"+a],e.body["offset"+a],r["offset"+a],r["client"+a])):void 0===n?k.css(e,t,i):k.style(e,t,n,i)},s,n?e:void 0,n)}})}),k.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(e,n){k.fn[n]=function(e,t){return 0<arguments.length?this.on(n,null,e,t):this.trigger(n)}}),k.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)}}),k.fn.extend({bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}}),k.proxy=function(e,t){var n,r,i;if("string"==typeof t&&(n=e[t],t=e,e=n),m(e))return r=s.call(arguments,2),(i=function(){return e.apply(t||this,r.concat(s.call(arguments)))}).guid=e.guid=e.guid||k.guid++,i},k.holdReady=function(e){e?k.readyWait++:k.ready(!0)},k.isArray=Array.isArray,k.parseJSON=JSON.parse,k.nodeName=A,k.isFunction=m,k.isWindow=x,k.camelCase=V,k.type=w,k.now=Date.now,k.isNumeric=function(e){var t=k.type(e);return("number"===t||"string"===t)&&!isNaN(e-parseFloat(e))},"function"==typeof define&&define.amd&&define("jquery",[],function(){return k});var Qt=C.jQuery,Jt=C.$;return k.noConflict=function(e){return C.$===k&&(C.$=Jt),e&&C.jQuery===k&&(C.jQuery=Qt),k},e||(C.jQuery=C.$=k),k});

/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.9 (Thu, 11 Sep 2014 13:31:59 GMT)
 *
 * @copyright
 * Copyright (C) 2004-2013 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
var XRegExp;XRegExp=XRegExp||(function(undef){"use strict";var self,addToken,add,features={natives:false,extensibility:false},nativ={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},fixed={},cache={},tokens=[],defaultScope="default",classScope="class",nativeTokens={"default":/^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/,"class":/^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/},replacementToken=/\$(?:{([\w$]+)}|(\d\d?|[\s\S]))/g,duplicateFlags=/([\s\S])(?=[\s\S]*\1)/g,quantifier=/^(?:[?*+]|{\d+(?:,\d*)?})\??/,compliantExecNpcg=nativ.exec.call(/()??/,"")[1]===undef,hasNativeY=RegExp.prototype.sticky!==undef,isInsideConstructor=false,registeredFlags="gim"+(hasNativeY?"y":"");function augment(regex,captureNames,isNative){var p;for(p in self.prototype){if(self.prototype.hasOwnProperty(p)){regex[p]=self.prototype[p];}}
regex.xregexp={captureNames:captureNames,isNative:!!isNative};return regex;}
function getNativeFlags(regex){return(regex.global?"g":"")+
(regex.ignoreCase?"i":"")+
(regex.multiline?"m":"")+
(regex.extended?"x":"")+
(regex.sticky?"y":"");}
function copy(regex,addFlags,removeFlags){if(!self.isRegExp(regex)){throw new TypeError("type RegExp expected");}
var flags=nativ.replace.call(getNativeFlags(regex)+(addFlags||""),duplicateFlags,"");if(removeFlags){flags=nativ.replace.call(flags,new RegExp("["+removeFlags+"]+","g"),"");}
if(regex.xregexp&&!regex.xregexp.isNative){regex=augment(self(regex.source,flags),regex.xregexp.captureNames?regex.xregexp.captureNames.slice(0):null);}else{regex=augment(new RegExp(regex.source,flags),null,true);}
return regex;}
function lastIndexOf(array,value){var i=array.length;if(Array.prototype.lastIndexOf){return array.lastIndexOf(value);}
while(i--){if(array[i]===value){return i;}}
return-1;}
function isType(value,type){return Object.prototype.toString.call(value).toLowerCase()==="[object "+type+"]";}
function prepareOptions(value){value=value||{};if(value==="all"||value.all){value={natives:true,extensibility:true};}else if(isType(value,"string")){value=self.forEach(value,/[^\s,]+/,function(m){this[m]=true;},{});}
return value;}
function runTokens(pattern,pos,scope,context){var i=tokens.length,result=null,match,t;isInsideConstructor=true;try{while(i--){t=tokens[i];if((t.scope==="all"||t.scope===scope)&&(!t.trigger||t.trigger.call(context))){t.pattern.lastIndex=pos;match=fixed.exec.call(t.pattern,pattern);if(match&&match.index===pos){result={output:t.handler.call(context,match,scope),match:match};break;}}}}catch(err){throw err;}finally{isInsideConstructor=false;}
return result;}
function setExtensibility(on){self.addToken=addToken[on?"on":"off"];features.extensibility=on;}
function setNatives(on){RegExp.prototype.exec=(on?fixed:nativ).exec;RegExp.prototype.test=(on?fixed:nativ).test;String.prototype.match=(on?fixed:nativ).match;String.prototype.replace=(on?fixed:nativ).replace;String.prototype.split=(on?fixed:nativ).split;features.natives=on;}
self=function(pattern,flags){if(self.isRegExp(pattern)){if(flags!==undef){throw new TypeError("can't supply flags when constructing one RegExp from another");}
return copy(pattern);}
if(isInsideConstructor){throw new Error("can't call the XRegExp constructor within token definition functions");}
var output=[],scope=defaultScope,tokenContext={hasNamedCapture:false,captureNames:[],hasFlag:function(flag){return flags.indexOf(flag)>-1;}},pos=0,tokenResult,match,chr;pattern=pattern===undef?"":String(pattern);flags=flags===undef?"":String(flags);if(nativ.match.call(flags,duplicateFlags)){throw new SyntaxError("invalid duplicate regular expression flag");}
pattern=nativ.replace.call(pattern,/^\(\?([\w$]+)\)/,function($0,$1){if(nativ.test.call(/[gy]/,$1)){throw new SyntaxError("can't use flag g or y in mode modifier");}
flags=nativ.replace.call(flags+$1,duplicateFlags,"");return"";});self.forEach(flags,/[\s\S]/,function(m){if(registeredFlags.indexOf(m[0])<0){throw new SyntaxError("invalid regular expression flag "+m[0]);}});while(pos<pattern.length){tokenResult=runTokens(pattern,pos,scope,tokenContext);if(tokenResult){output.push(tokenResult.output);pos+=(tokenResult.match[0].length||1);}else{match=nativ.exec.call(nativeTokens[scope],pattern.slice(pos));if(match){output.push(match[0]);pos+=match[0].length;}else{chr=pattern.charAt(pos);if(chr==="["){scope=classScope;}else if(chr==="]"){scope=defaultScope;}
output.push(chr);++pos;}}}
return augment(new RegExp(output.join(""),nativ.replace.call(flags,/[^gimy]+/g,"")),tokenContext.hasNamedCapture?tokenContext.captureNames:null);};addToken={on:function(regex,handler,options){options=options||{};if(regex){tokens.push({pattern:copy(regex,"g"+(hasNativeY?"y":"")),handler:handler,scope:options.scope||defaultScope,trigger:options.trigger||null});}
if(options.customFlags){registeredFlags=nativ.replace.call(registeredFlags+options.customFlags,duplicateFlags,"");}},off:function(){throw new Error("extensibility must be installed before using addToken");}};self.addToken=addToken.off;self.cache=function(pattern,flags){var key=pattern+"/"+(flags||"");return cache[key]||(cache[key]=self(pattern,flags));};self.escape=function(str){return nativ.replace.call(str,/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");};self.exec=function(str,regex,pos,sticky){var r2=copy(regex,"g"+(sticky&&hasNativeY?"y":""),(sticky===false?"y":"")),match;r2.lastIndex=pos=pos||0;match=fixed.exec.call(r2,str);if(sticky&&match&&match.index!==pos){match=null;}
if(regex.global){regex.lastIndex=match?r2.lastIndex:0;}
return match;};self.forEach=function(str,regex,callback,context){var pos=0,i=-1,match;while((match=self.exec(str,regex,pos))){callback.call(context,match,++i,str,regex);pos=match.index+(match[0].length||1);}
return context;};self.globalize=function(regex){return copy(regex,"g");};self.install=function(options){options=prepareOptions(options);if(!features.natives&&options.natives){setNatives(true);}
if(!features.extensibility&&options.extensibility){setExtensibility(true);}};self.isInstalled=function(feature){return!!(features[feature]);};self.isRegExp=function(value){return isType(value,"regexp");};self.matchChain=function(str,chain){return(function recurseChain(values,level){var item=chain[level].regex?chain[level]:{regex:chain[level]},matches=[],addMatch=function(match){matches.push(item.backref?(match[item.backref]||""):match[0]);},i;for(i=0;i<values.length;++i){self.forEach(values[i],item.regex,addMatch);}
return((level===chain.length-1)||!matches.length)?matches:recurseChain(matches,level+1);}([str],0));};self.replace=function(str,search,replacement,scope){var isRegex=self.isRegExp(search),search2=search,result;if(isRegex){if(scope===undef&&search.global){scope="all";}
search2=copy(search,scope==="all"?"g":"",scope==="all"?"":"g");}else if(scope==="all"){search2=new RegExp(self.escape(String(search)),"g");}
result=fixed.replace.call(String(str),search2,replacement);if(isRegex&&search.global){search.lastIndex=0;}
return result;};self.split=function(str,separator,limit){return fixed.split.call(str,separator,limit);};self.test=function(str,regex,pos,sticky){return!!self.exec(str,regex,pos,sticky);};self.uninstall=function(options){options=prepareOptions(options);if(features.natives&&options.natives){setNatives(false);}
if(features.extensibility&&options.extensibility){setExtensibility(false);}};self.union=function(patterns,flags){var parts=/(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g,numCaptures=0,numPriorCaptures,captureNames,rewrite=function(match,paren,backref){var name=captureNames[numCaptures-numPriorCaptures];if(paren){++numCaptures;if(name){return"(?<"+name+">";}}else if(backref){return"\\"+(+backref+numPriorCaptures);}
return match;},output=[],pattern,i;if(!(isType(patterns,"array")&&patterns.length)){throw new TypeError("patterns must be a nonempty array");}
for(i=0;i<patterns.length;++i){pattern=patterns[i];if(self.isRegExp(pattern)){numPriorCaptures=numCaptures;captureNames=(pattern.xregexp&&pattern.xregexp.captureNames)||[];output.push(self(pattern.source).source.replace(parts,rewrite));}else{output.push(self.escape(pattern));}}
return self(output.join("|"),flags);};self.version="2.0.0";fixed.exec=function(str){var match,name,r2,origLastIndex,i;if(!this.global){origLastIndex=this.lastIndex;}
match=nativ.exec.apply(this,arguments);if(match){if(!compliantExecNpcg&&match.length>1&&lastIndexOf(match,"")>-1){r2=new RegExp(this.source,nativ.replace.call(getNativeFlags(this),"g",""));nativ.replace.call(String(str).slice(match.index),r2,function(){var i;for(i=1;i<arguments.length-2;++i){if(arguments[i]===undef){match[i]=undef;}}});}
if(this.xregexp&&this.xregexp.captureNames){for(i=1;i<match.length;++i){name=this.xregexp.captureNames[i-1];if(name){match[name]=match[i];}}}
if(this.global&&!match[0].length&&(this.lastIndex>match.index)){this.lastIndex=match.index;}}
if(!this.global){this.lastIndex=origLastIndex;}
return match;};fixed.test=function(str){return!!fixed.exec.call(this,str);};fixed.match=function(regex){if(!self.isRegExp(regex)){regex=new RegExp(regex);}else if(regex.global){var result=nativ.match.apply(this,arguments);regex.lastIndex=0;return result;}
return fixed.exec.call(regex,this);};fixed.replace=function(search,replacement){var isRegex=self.isRegExp(search),captureNames,result,str,origLastIndex;if(isRegex){if(search.xregexp){captureNames=search.xregexp.captureNames;}
if(!search.global){origLastIndex=search.lastIndex;}}else{search+="";}
if(isType(replacement,"function")){result=nativ.replace.call(String(this),search,function(){var args=arguments,i;if(captureNames){args[0]=new String(args[0]);for(i=0;i<captureNames.length;++i){if(captureNames[i]){args[0][captureNames[i]]=args[i+1];}}}
if(isRegex&&search.global){search.lastIndex=args[args.length-2]+args[0].length;}
return replacement.apply(null,args);});}else{str=String(this);result=nativ.replace.call(str,search,function(){var args=arguments;return nativ.replace.call(String(replacement),replacementToken,function($0,$1,$2){var n;if($1){n=+$1;if(n<=args.length-3){return args[n]||"";}
n=captureNames?lastIndexOf(captureNames,$1):-1;if(n<0){throw new SyntaxError("backreference to undefined group "+$0);}
return args[n+1]||"";}
if($2==="$")return"$";if($2==="&"||+$2===0)return args[0];if($2==="`")return args[args.length-1].slice(0,args[args.length-2]);if($2==="'")return args[args.length-1].slice(args[args.length-2]+args[0].length);$2=+$2;if(!isNaN($2)){if($2>args.length-3){throw new SyntaxError("backreference to undefined group "+$0);}
return args[$2]||"";}
throw new SyntaxError("invalid token "+$0);});});}
if(isRegex){if(search.global){search.lastIndex=0;}else{search.lastIndex=origLastIndex;}}
return result;};fixed.split=function(separator,limit){if(!self.isRegExp(separator)){return nativ.split.apply(this,arguments);}
var str=String(this),origLastIndex=separator.lastIndex,output=[],lastLastIndex=0,lastLength;limit=(limit===undef?-1:limit)>>>0;self.forEach(str,separator,function(match){if((match.index+match[0].length)>lastLastIndex){output.push(str.slice(lastLastIndex,match.index));if(match.length>1&&match.index<str.length){Array.prototype.push.apply(output,match.slice(1));}
lastLength=match[0].length;lastLastIndex=match.index+lastLength;}});if(lastLastIndex===str.length){if(!nativ.test.call(separator,"")||lastLength){output.push("");}}else{output.push(str.slice(lastLastIndex));}
separator.lastIndex=origLastIndex;return output.length>limit?output.slice(0,limit):output;};add=addToken.on;add(/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4})|x(?![\dA-Fa-f]{2}))/,function(match,scope){if(match[1]==="B"&&scope===defaultScope){return match[0];}
throw new SyntaxError("invalid escape "+match[0]);},{scope:"all"});add(/\[(\^?)]/,function(match){return match[1]?"[\\s\\S]":"\\b\\B";});add(/(?:\(\?#[^)]*\))+/,function(match){return nativ.test.call(quantifier,match.input.slice(match.index+match[0].length))?"":"(?:)";});add(/\\k<([\w$]+)>/,function(match){var index=isNaN(match[1])?(lastIndexOf(this.captureNames,match[1])+1):+match[1],endIndex=match.index+match[0].length;if(!index||index>this.captureNames.length){throw new SyntaxError("backreference to undefined group "+match[0]);}
return"\\"+index+(endIndex===match.input.length||isNaN(match.input.charAt(endIndex))?"":"(?:)");});add(/(?:\s+|#.*)+/,function(match){return nativ.test.call(quantifier,match.input.slice(match.index+match[0].length))?"":"(?:)";},{trigger:function(){return this.hasFlag("x");},customFlags:"x"});add(/\./,function(){return"[\\s\\S]";},{trigger:function(){return this.hasFlag("s");},customFlags:"s"});add(/\(\?P?<([\w$]+)>/,function(match){if(!isNaN(match[1])){throw new SyntaxError("can't use integer as capture name "+match[0]);}
this.captureNames.push(match[1]);this.hasNamedCapture=true;return"(";});add(/\\(\d+)/,function(match,scope){if(!(scope===defaultScope&&/^[1-9]/.test(match[1])&&+match[1]<=this.captureNames.length)&&match[1]!=="0"){throw new SyntaxError("can't use octal escape or backreference to undefined group "+match[0]);}
return match[0];},{scope:"all"});add(/\((?!\?)/,function(){if(this.hasFlag("n")){return"(?:";}
this.captureNames.push(null);return"(";},{customFlags:"n"});if(typeof exports!=="undefined"){exports.XRegExp=self;}
return self;}());if(typeof(SyntaxHighlighter)=='undefined')var SyntaxHighlighter=function(){if(typeof(require)!='undefined'&&typeof(XRegExp)=='undefined')
{XRegExp=require('xregexp').XRegExp;}
var sh={defaults:{'class-name':'','first-line':1,'pad-line-numbers':false,'highlight':null,'title':null,'smart-tabs':true,'tab-size':4,'gutter':true,'toolbar':true,'quick-code':true,'collapse':false,'auto-links':true,'light':false,'unindent':true,'html-script':false},config:{space:'&nbsp;',useScriptTags:true,bloggerMode:false,stripBrs:false,tagName:'pre',strings:{expandSource:'expand source',help:'?',alert:'SyntaxHighlighter\n\n',noBrush:'Can\'t find brush for: ',brushNotHtmlScript:'Brush wasn\'t configured for html-script option: ',aboutDialog:'<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"><html xmlns=\"http://www.w3.org/1999/xhtml\"><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /><title>About SyntaxHighlighter</title></head><body style=\"font-family:Geneva,Arial,Helvetica,sans-serif;background-color:#fff;color:#000;font-size:1em;text-align:center;\"><div style=\"text-align:center;margin-top:1.5em;\"><div style=\"font-size:xx-large;\">SyntaxHighlighter</div><div style=\"font-size:.75em;margin-bottom:3em;\"><div>version 3.0.9 (Thu, 11 Sep 2014 13:31:59 GMT)</div><div><a href=\"http://alexgorbatchev.com/SyntaxHighlighter\" target=\"_blank\" style=\"color:#005896\">http://alexgorbatchev.com/SyntaxHighlighter</a></div><div>JavaScript code syntax highlighter.</div><div>Copyright 2004-2013 Alex Gorbatchev.</div></div><div>If you like this script, please <a href=\"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=2930402\" style=\"color:#005896\">donate</a> to <br/>keep development active!</div></div></body></html>'}},vars:{discoveredBrushes:null,highlighters:{}},brushes:{},regexLib:{multiLineCComments:XRegExp('/\\*.*?\\*/','gs'),singleLineCComments:/\/\/.*$/gm,singleLinePerlComments:/#.*$/gm,doubleQuotedString:/"([^\\"\n]|\\.)*"/g,singleQuotedString:/'([^\\'\n]|\\.)*'/g,multiLineDoubleQuotedString:XRegExp('"([^\\\\"]|\\\\.)*"','gs'),multiLineSingleQuotedString:XRegExp("'([^\\\\']|\\\\.)*'",'gs'),xmlComments:XRegExp('(&lt;|<)!--.*?--(&gt;|>)','gs'),url:/\w+:\/\/[\w-.\/?%&=:@;#]*/g,phpScriptTags:{left:/(&lt;|<)\?(?:=|php)?/g,right:/\?(&gt;|>)/g,'eof':true},aspScriptTags:{left:/(&lt;|<)%=?/g,right:/%(&gt;|>)/g},scriptScriptTags:{left:/(&lt;|<)\s*script.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*script\s*(&gt;|>)/gi}},toolbar:{getHtml:function(highlighter)
{var html='<div class="toolbar">',items=sh.toolbar.items,list=items.list;function defaultGetHtml(highlighter,name)
{return sh.toolbar.getButtonHtml(highlighter,name,sh.config.strings[name]);}
for(var i=0,l=list.length;i<l;i++)
{html+=(items[list[i]].getHtml||defaultGetHtml)(highlighter,list[i]);}
html+='</div>';return html;},getButtonHtml:function(highlighter,commandName,label)
{commandName=escapeHtml(commandName);return'<span><a href="#" class="toolbar_item'
+' command_'+commandName
+' '+commandName
+'">'+escapeHtml(label)+'</a></span>';},handler:function(e)
{var target=e.target,className=target.className||'';function getValue(name)
{var r=new RegExp(name+'_(\\w+)'),match=r.exec(className);return match?match[1]:null;}
var highlighter=getHighlighterById(findParentElement(target,'.syntaxhighlighter').id),commandName=getValue('command');if(highlighter&&commandName)
sh.toolbar.items[commandName].execute(highlighter);e.preventDefault();},items:{list:['expandSource','help'],expandSource:{getHtml:function(highlighter)
{if(highlighter.getParam('collapse')!=true)
return'';var title=highlighter.getParam('title');return sh.toolbar.getButtonHtml(highlighter,'expandSource',title?title:sh.config.strings.expandSource);},execute:function(highlighter)
{var div=getHighlighterDivById(highlighter.id);removeClass(div,'collapsed');}},help:{execute:function(highlighter)
{var wnd=popup('','_blank',500,250,'scrollbars=0'),doc=wnd.document;doc.write(sh.config.strings.aboutDialog);doc.close();wnd.focus();}}}},findElements:function(globalParams,element)
{var elements=element?[element]:toArray(document.getElementsByTagName(sh.config.tagName)),conf=sh.config,result=[];if(conf.useScriptTags)
elements=elements.concat(getSyntaxHighlighterScriptTags());if(elements.length===0)
return result;for(var i=0,l=elements.length;i<l;i++)
{var item={target:elements[i],params:merge(globalParams,parseParams(elements[i].className))};if(item.params['brush']==null)
continue;result.push(item);}
return result;},highlight:function(globalParams,element)
{var elements=this.findElements(globalParams,element),propertyName='innerHTML',highlighter=null,conf=sh.config;if(elements.length===0)
return;for(var i=0,l=elements.length;i<l;i++)
{var element=elements[i],target=element.target,params=element.params,brushName=params.brush,code;if(brushName==null)
continue;if(params['html-script']=='true'||sh.defaults['html-script']==true)
{highlighter=new sh.HtmlScript(brushName);brushName='htmlscript';}
else
{var brush=findBrush(brushName);if(brush)
highlighter=new brush();else
continue;}
code=target[propertyName];if(conf.useScriptTags)
code=stripCData(code);if((target.title||'')!='')
params.title=target.title;params['brush']=brushName;highlighter.init(params);element=highlighter.getDiv(code);if((target.id||'')!='')
element.id=target.id;target.parentNode.replaceChild(element,target);}},all:function(params)
{attachEvent(window,'load',function(){sh.highlight(params);});}};function escapeHtml(html)
{return document.createElement('div').appendChild(document.createTextNode(html)).parentNode.innerHTML.replace(/"/g,'&quot;');};function hasClass(target,className)
{return target.className.indexOf(className)!=-1;};function addClass(target,className)
{if(!hasClass(target,className))
target.className+=' '+className;};function removeClass(target,className)
{target.className=target.className.replace(className,'');};function toArray(source)
{var result=[];for(var i=0,l=source.length;i<l;i++)
result.push(source[i]);return result;};function splitLines(block)
{return block.split(/\r?\n/);}
function getHighlighterId(id)
{var prefix='highlighter_';return id.indexOf(prefix)==0?id:prefix+id;};function getHighlighterById(id)
{return sh.vars.highlighters[getHighlighterId(id)];};function getHighlighterDivById(id)
{return document.getElementById(getHighlighterId(id));};function storeHighlighter(highlighter)
{sh.vars.highlighters[getHighlighterId(highlighter.id)]=highlighter;};function findElement(target,search,reverse)
{if(target==null)
return null;var nodes=reverse!=true?target.childNodes:[target.parentNode],propertyToFind={'#':'id','.':'className'}[search.substr(0,1)]||'nodeName',expectedValue,found;expectedValue=propertyToFind!='nodeName'?search.substr(1):search.toUpperCase();if((target[propertyToFind]||'').indexOf(expectedValue)!=-1)
return target;for(var i=0,l=nodes.length;nodes&&i<l&&found==null;i++)
found=findElement(nodes[i],search,reverse);return found;};function findParentElement(target,className)
{return findElement(target,className,true);};function indexOf(array,searchElement,fromIndex)
{fromIndex=Math.max(fromIndex||0,0);for(var i=fromIndex,l=array.length;i<l;i++)
if(array[i]==searchElement)
return i;return-1;};function guid(prefix)
{return(prefix||'')+Math.round(Math.random()*1000000).toString();};function merge(obj1,obj2)
{var result={},name;for(name in obj1)
result[name]=obj1[name];for(name in obj2)
result[name]=obj2[name];return result;};function toBoolean(value)
{var result={"true":true,"false":false}[value];return result==null?value:result;};function popup(url,name,width,height,options)
{var x=(screen.width-width)/2,y=(screen.height-height)/2;options+=', left='+x+
', top='+y+
', width='+width+
', height='+height;options=options.replace(/^,/,'');var win=window.open(url,name,options);win.focus();return win;};function attachEvent(obj,type,func,scope)
{function handler(e)
{e=e||window.event;if(!e.target)
{e.target=e.srcElement;e.preventDefault=function()
{this.returnValue=false;};}
func.call(scope||window,e);};if(obj.attachEvent)
{obj.attachEvent('on'+type,handler);}
else
{obj.addEventListener(type,handler,false);}};function alert(str)
{window.alert(sh.config.strings.alert+str);};function findBrush(alias,showAlert)
{var brushes=sh.vars.discoveredBrushes,result=null;if(brushes==null)
{brushes={};for(var brush in sh.brushes)
{var info=sh.brushes[brush],aliases=info.aliases;if(aliases==null)
continue;info.brushName=brush.toLowerCase();for(var i=0,l=aliases.length;i<l;i++)
brushes[aliases[i]]=brush;}
sh.vars.discoveredBrushes=brushes;}
result=sh.brushes[brushes[alias]];if(result==null&&showAlert)
alert(sh.config.strings.noBrush+alias);return result;};function eachLine(str,callback)
{var lines=splitLines(str);for(var i=0,l=lines.length;i<l;i++)
lines[i]=callback(lines[i],i);return lines.join('\r\n');};function trimFirstAndLastLines(str)
{return str.replace(/^[ ]*[\n]+|[\n]*[ ]*$/g,'');};function parseParams(str)
{var match,result={},arrayRegex=XRegExp("^\\[(?<values>(.*?))\\]$"),pos=0,regex=XRegExp("(?<name>[\\w-]+)"+
"\\s*:\\s*"+
"(?<value>"+
"[\\w%#-]+|"+
"\\[.*?\\]|"+
'".*?"|'+
"'.*?'"+
")\\s*;?","g");while((match=XRegExp.exec(str,regex,pos))!=null)
{var value=match.value
.replace(/^['"]|['"]$/g,'');if(value!=null&&arrayRegex.test(value))
{var m=XRegExp.exec(value,arrayRegex);value=m.values.length>0?m.values.split(/\s*,\s*/):[];}
result[match.name]=value;pos=match.index+match[0].length;}
return result;};function wrapLinesWithCode(str,css)
{if(str==null||str.length==0||str=='\n')
return str;str=str.replace(/</g,'&lt;');str=str.replace(/ {2,}/g,function(m)
{var spaces='';for(var i=0,l=m.length;i<l-1;i++)
spaces+=sh.config.space;return spaces+' ';});if(css!=null)
str=eachLine(str,function(line)
{if(line.length==0)
return'';var spaces='';line=line.replace(/^(&nbsp;| )+/,function(s)
{spaces=s;return'';});if(line.length==0)
return spaces;return spaces+'<code class="'+css+'">'+line+'</code>';});return str;};function padNumber(number,length)
{var result=number.toString();while(result.length<length)
result='0'+result;return result;};function processTabs(code,tabSize)
{var tab='';for(var i=0;i<tabSize;i++)
tab+=' ';return code.replace(/\t/g,tab);};function processSmartTabs(code,tabSize)
{var lines=splitLines(code),tab='\t',spaces='';for(var i=0;i<50;i++)
spaces+='                    ';function insertSpaces(line,pos,count)
{return line.substr(0,pos)
+spaces.substr(0,count)
+line.substr(pos+1,line.length);};code=eachLine(code,function(line)
{if(line.indexOf(tab)==-1)
return line;var pos=0;while((pos=line.indexOf(tab))!=-1)
{var spaces=tabSize-pos%tabSize;line=insertSpaces(line,pos,spaces);}
return line;});return code;};function fixInputString(str)
{var br=/<br\s*\/?>|&lt;br\s*\/?&gt;/gi;if(sh.config.bloggerMode==true)
str=str.replace(br,'\n');if(sh.config.stripBrs==true)
str=str.replace(br,'');return str;};function trim(str)
{return str.replace(/^\s+|\s+$/g,'');};function unindent(str)
{var lines=splitLines(fixInputString(str)),indents=new Array(),regex=/^\s*/,min=1000;for(var i=0,l=lines.length;i<l&&min>0;i++)
{var line=lines[i];if(trim(line).length==0)
continue;var matches=regex.exec(line);if(matches==null)
return str;min=Math.min(matches[0].length,min);}
if(min>0)
for(var i=0,l=lines.length;i<l;i++)
lines[i]=lines[i].substr(min);return lines.join('\n');};function matchesSortCallback(m1,m2)
{if(m1.index<m2.index)
return-1;else if(m1.index>m2.index)
return 1;else
{if(m1.length<m2.length)
return-1;else if(m1.length>m2.length)
return 1;}
return 0;};function getMatches(code,regexInfo)
{function defaultAdd(match,regexInfo)
{return match[0];};var index=0,match=null,matches=[],func=regexInfo.func?regexInfo.func:defaultAdd
pos=0;while((match=XRegExp.exec(code,regexInfo.regex,pos))!=null)
{var resultMatch=func(match,regexInfo);if(typeof(resultMatch)=='string')
resultMatch=[new sh.Match(resultMatch,match.index,regexInfo.css)];matches=matches.concat(resultMatch);pos=match.index+match[0].length;}
return matches;};function processUrls(code)
{var gt=/(.*)((&gt;|&lt;).*)/;return code.replace(sh.regexLib.url,function(m)
{var suffix='',match=null;if(match=gt.exec(m))
{m=match[1];suffix=match[2];}
return'<a href="'+m+'">'+m+'</a>'+suffix;});};function getSyntaxHighlighterScriptTags()
{var tags=document.getElementsByTagName('script'),result=[];for(var i=0,l=tags.length;i<l;i++)
if(tags[i].type=='syntaxhighlighter')
result.push(tags[i]);return result;};function stripCData(original)
{var left='<![CDATA[',right=']]>',copy=trim(original),changed=false,leftLength=left.length,rightLength=right.length;if(copy.indexOf(left)==0)
{copy=copy.substring(leftLength);changed=true;}
var copyLength=copy.length;if(copy.indexOf(right)==copyLength-rightLength)
{copy=copy.substring(0,copyLength-rightLength);changed=true;}
return changed?copy:original;};function quickCodeHandler(e)
{var target=e.target,highlighterDiv=findParentElement(target,'.syntaxhighlighter'),container=findParentElement(target,'.container'),textarea=document.createElement('textarea'),highlighter;if(!container||!highlighterDiv||findElement(container,'textarea'))
return;highlighter=getHighlighterById(highlighterDiv.id);addClass(highlighterDiv,'source');var lines=container.childNodes,code=[];for(var i=0,l=lines.length;i<l;i++)
code.push(lines[i].innerText||lines[i].textContent);code=code.join('\r');code=code.replace(/\u00a0/g," ");textarea.appendChild(document.createTextNode(code));container.appendChild(textarea);textarea.focus();textarea.select();attachEvent(textarea,'blur',function(e)
{textarea.parentNode.removeChild(textarea);removeClass(highlighterDiv,'source');});};sh.Match=function(value,index,css)
{this.value=value;this.index=index;this.length=value.length;this.css=css;this.brushName=null;};sh.Match.prototype.toString=function()
{return this.value;};sh.HtmlScript=function(scriptBrushName)
{var brushClass=findBrush(scriptBrushName),scriptBrush,xmlBrush=new sh.brushes.Xml(),bracketsRegex=null,ref=this,methodsToExpose='getDiv getHtml init'.split(' ');if(brushClass==null)
return;scriptBrush=new brushClass();for(var i=0,l=methodsToExpose.length;i<l;i++)
(function(){var name=methodsToExpose[i];ref[name]=function()
{return xmlBrush[name].apply(xmlBrush,arguments);};})();if(scriptBrush.htmlScript==null)
{alert(sh.config.strings.brushNotHtmlScript+scriptBrushName);return;}
xmlBrush.regexList.push({regex:scriptBrush.htmlScript.code,func:process});function offsetMatches(matches,offset)
{for(var j=0,l=matches.length;j<l;j++)
matches[j].index+=offset;}
function process(match,info)
{var code=match.code,matches=[],regexList=scriptBrush.regexList,offset=match.index+match.left.length,htmlScript=scriptBrush.htmlScript,result;for(var i=0,l=regexList.length;i<l;i++)
{result=getMatches(code,regexList[i]);offsetMatches(result,offset);matches=matches.concat(result);}
if(htmlScript.left!=null&&match.left!=null)
{result=getMatches(match.left,htmlScript.left);offsetMatches(result,match.index);matches=matches.concat(result);}
if(htmlScript.right!=null&&match.right!=null)
{result=getMatches(match.right,htmlScript.right);offsetMatches(result,match.index+match[0].lastIndexOf(match.right));matches=matches.concat(result);}
for(var j=0,l=matches.length;j<l;j++)
matches[j].brushName=brushClass.brushName;return matches;}};sh.Highlighter=function()
{};sh.Highlighter.prototype={getParam:function(name,defaultValue)
{var result=this.params[name];return toBoolean(result==null?defaultValue:result);},create:function(name)
{return document.createElement(name);},findMatches:function(regexList,code)
{var result=[];if(regexList!=null)
for(var i=0,l=regexList.length;i<l;i++)
if(typeof(regexList[i])=="object")
result=result.concat(getMatches(code,regexList[i]));return this.removeNestedMatches(result.sort(matchesSortCallback));},removeNestedMatches:function(matches)
{for(var i=0,l=matches.length;i<l;i++)
{if(matches[i]===null)
continue;var itemI=matches[i],itemIEndPos=itemI.index+itemI.length;for(var j=i+1,l=matches.length;j<l&&matches[i]!==null;j++)
{var itemJ=matches[j];if(itemJ===null)
continue;else if(itemJ.index>itemIEndPos)
break;else if(itemJ.index==itemI.index&&itemJ.length>itemI.length)
matches[i]=null;else if(itemJ.index>=itemI.index&&itemJ.index<itemIEndPos)
matches[j]=null;}}
return matches;},figureOutLineNumbers:function(code)
{var lines=[],firstLine=parseInt(this.getParam('first-line'));eachLine(code,function(line,index)
{lines.push(index+firstLine);});return lines;},isLineHighlighted:function(lineNumber)
{var list=this.getParam('highlight',[]);if(typeof(list)!='object'&&list.push==null)
list=[list];return indexOf(list,lineNumber.toString())!=-1;},getLineHtml:function(lineIndex,lineNumber,code)
{var classes=['line','number'+lineNumber,'index'+lineIndex,'alt'+(lineNumber%2==0?1:2).toString()];if(this.isLineHighlighted(lineNumber))
classes.push('highlighted');if(lineNumber==0)
classes.push('break');return'<div class="'+classes.join(' ')+'">'+code+'</div>';},getLineNumbersHtml:function(code,lineNumbers)
{var html='',count=splitLines(code).length,firstLine=parseInt(this.getParam('first-line')),pad=this.getParam('pad-line-numbers');if(pad==true)
pad=(firstLine+count-1).toString().length;else if(isNaN(pad)==true)
pad=0;for(var i=0;i<count;i++)
{var lineNumber=lineNumbers?lineNumbers[i]:firstLine+i,code=lineNumber==0?sh.config.space:padNumber(lineNumber,pad);html+=this.getLineHtml(i,lineNumber,code);}
return html;},getCodeLinesHtml:function(html,lineNumbers)
{html=trim(html);var lines=splitLines(html),padLength=this.getParam('pad-line-numbers'),firstLine=parseInt(this.getParam('first-line')),html='',brushName=this.getParam('brush');for(var i=0,l=lines.length;i<l;i++)
{var line=lines[i],indent=/^(&nbsp;|\s)+/.exec(line),spaces=null,lineNumber=lineNumbers?lineNumbers[i]:firstLine+i;;if(indent!=null)
{spaces=indent[0].toString();line=line.substr(spaces.length);spaces=spaces.replace(' ',sh.config.space);}
line=trim(line);if(line.length==0)
line=sh.config.space;html+=this.getLineHtml(i,lineNumber,(spaces!=null?'<code class="'+brushName+' spaces">'+spaces+'</code>':'')+line);}
return html;},getTitleHtml:function(title)
{return title?'<caption>'+escapeHtml(title)+'</caption>':'';},getMatchesHtml:function(code,matches)
{var pos=0,result='',brushName=this.getParam('brush','');function getBrushNameCss(match)
{var result=match?(match.brushName||brushName):brushName;return result?result+' ':'';};for(var i=0,l=matches.length;i<l;i++)
{var match=matches[i],matchBrushName;if(match===null||match.length===0)
continue;matchBrushName=getBrushNameCss(match);result+=wrapLinesWithCode(code.substr(pos,match.index-pos),matchBrushName+'plain')
+wrapLinesWithCode(match.value,matchBrushName+match.css);pos=match.index+match.length+(match.offset||0);}
result+=wrapLinesWithCode(code.substr(pos),getBrushNameCss()+'plain');return result;},getHtml:function(code)
{var html='',classes=['syntaxhighlighter'],tabSize,matches,lineNumbers;if(this.getParam('light')==true)
this.params.toolbar=this.params.gutter=false;className='syntaxhighlighter';if(this.getParam('collapse')==true)
classes.push('collapsed');if((gutter=this.getParam('gutter'))==false)
classes.push('nogutter');classes.push(this.getParam('class-name'));classes.push(this.getParam('brush'));code=trimFirstAndLastLines(code)
.replace(/\r/g,' ');tabSize=this.getParam('tab-size');code=this.getParam('smart-tabs')==true?processSmartTabs(code,tabSize):processTabs(code,tabSize);if(this.getParam('unindent'))
code=unindent(code);if(gutter)
lineNumbers=this.figureOutLineNumbers(code);matches=this.findMatches(this.regexList,code);html=this.getMatchesHtml(code,matches);html=this.getCodeLinesHtml(html,lineNumbers);if(this.getParam('auto-links'))
html=processUrls(html);if(typeof(navigator)!='undefined'&&navigator.userAgent&&navigator.userAgent.match(/MSIE/))
classes.push('ie');html='<div id="'+getHighlighterId(this.id)+'" class="'+escapeHtml(classes.join(' '))+'">'
+(this.getParam('toolbar')?sh.toolbar.getHtml(this):'')
+'<table border="0" cellpadding="0" cellspacing="0">'
+this.getTitleHtml(this.getParam('title'))
+'<tbody>'
+'<tr>'
+(gutter?'<td class="gutter">'+this.getLineNumbersHtml(code)+'</td>':'')
+'<td class="code">'
+'<div class="container">'
+html
+'</div>'
+'</td>'
+'</tr>'
+'</tbody>'
+'</table>'
+'</div>';return html;},getDiv:function(code)
{if(code===null)
code='';this.code=code;var div=this.create('div');div.innerHTML=this.getHtml(code);if(this.getParam('toolbar'))
attachEvent(findElement(div,'.toolbar'),'click',sh.toolbar.handler);if(this.getParam('quick-code'))
attachEvent(findElement(div,'.code'),'dblclick',quickCodeHandler);return div;},init:function(params)
{this.id=guid();storeHighlighter(this);this.params=merge(sh.defaults,params||{})
if(this.getParam('light')==true)
this.params.toolbar=this.params.gutter=false;},getKeywords:function(str)
{str=str
.replace(/^\s+|\s+$/g,'')
.replace(/\s+/g,'|');return'\\b(?:'+str+')\\b';},forHtmlScript:function(regexGroup)
{var regex={'end':regexGroup.right.source};if(regexGroup.eof)
regex.end="(?:(?:"+regex.end+")|$)";this.htmlScript={left:{regex:regexGroup.left,css:'script'},right:{regex:regexGroup.right,css:'script'},code:XRegExp("(?<left>"+regexGroup.left.source+")"+
"(?<code>.*?)"+
"(?<right>"+regex.end+")","sgi")};}};return sh;}();typeof(exports)!='undefined'?exports.SyntaxHighlighter=SyntaxHighlighter:null;/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 *
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */;(function()
{SyntaxHighlighter=SyntaxHighlighter||(typeof require!=='undefined'?require('shCore').SyntaxHighlighter:null);function Brush()
{var funcs='abs accept alarm atan2 bind binmode chdir chmod chomp chop chown chr '+
'chroot close closedir connect cos crypt defined delete each endgrent '+
'endhostent endnetent endprotoent endpwent endservent eof exec exists '+
'exp fcntl fileno flock fork format formline getc getgrent getgrgid '+
'getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr '+
'getnetbyname getnetent getpeername getpgrp getppid getpriority '+
'getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid '+
'getservbyname getservbyport getservent getsockname getsockopt glob '+
'gmtime grep hex index int ioctl join keys kill lc lcfirst length link '+
'listen localtime lock log lstat map mkdir msgctl msgget msgrcv msgsnd '+
'oct open opendir ord pack pipe pop pos print printf prototype push '+
'quotemeta rand read readdir readline readlink readpipe recv rename '+
'reset reverse rewinddir rindex rmdir scalar seek seekdir select semctl '+
'semget semop send setgrent sethostent setnetent setpgrp setpriority '+
'setprotoent setpwent setservent setsockopt shift shmctl shmget shmread '+
'shmwrite shutdown sin sleep socket socketpair sort splice split sprintf '+
'sqrt srand stat study substr symlink syscall sysopen sysread sysseek '+
'system syswrite tell telldir time times tr truncate uc ucfirst umask '+
'undef unlink unpack unshift utime values vec wait waitpid warn write '+
'say';var keywords='bless caller continue dbmclose dbmopen die do dump else elsif eval exit '+
'for foreach goto if import last local my next no our package redo ref '+
'require return sub tie tied unless untie until use wantarray while '+
'given when default '+
'try catch finally '+
'has extends with before after around override augment';this.regexList=[{regex:/(<<|&lt;&lt;)((\w+)|(['"])(.+?)\4)[\s\S]+?\n\3\5\n/g,css:'string'},{regex:/#.*$/gm,css:'comments'},{regex:/^#!.*\n/g,css:'preprocessor'},{regex:/-?\w+(?=\s*=(>|&gt;))/g,css:'string'},{regex:/\bq[qwxr]?\([\s\S]*?\)/g,css:'string'},{regex:/\bq[qwxr]?\{[\s\S]*?\}/g,css:'string'},{regex:/\bq[qwxr]?\[[\s\S]*?\]/g,css:'string'},{regex:/\bq[qwxr]?(<|&lt;)[\s\S]*?(>|&gt;)/g,css:'string'},{regex:/\bq[qwxr]?([^\w({<[])[\s\S]*?\1/g,css:'string'},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:'string'},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:'string'},{regex:/(?:&amp;|[$@%*]|\$#)\$?[a-zA-Z_](\w+|::)*/g,css:'variable'},{regex:/(^|\n)\s*__(?:END|DATA)__\b[\s\S]*$/g,css:'comments'},{regex:/(^|\n)=\w[\s\S]*?(\n=cut\s*(?=\n)|$)/g,css:'comments'},{regex:new RegExp(this.getKeywords(funcs),'gm'),css:'functions'},{regex:new RegExp(this.getKeywords(keywords),'gm'),css:'keyword'}];this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags);}
Brush.prototype=new SyntaxHighlighter.Highlighter();Brush.aliases=['perl','Perl','pl'];SyntaxHighlighter.brushes.Perl=Brush;typeof(exports)!='undefined'?exports.Brush=Brush:null;})();/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.9 (Thu, 11 Sep 2014 13:31:59 GMT)
 *
 * @copyright
 * Copyright (C) 2004-2013 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */;(function()
{SyntaxHighlighter=SyntaxHighlighter||(typeof require!=='undefined'?require('shCore').SyntaxHighlighter:null);function Brush()
{};Brush.prototype=new SyntaxHighlighter.Highlighter();Brush.aliases=['text','plain'];SyntaxHighlighter.brushes.Plain=Brush;typeof(exports)!='undefined'?exports.Brush=Brush:null;})();/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/wiki/SyntaxHighlighter:Donate
 *
 * @version
 * 2.0.320 (July 26 2009)
 *
 * @copyright
 * Copyright (C) 2004-2009 Alex Gorbatchev.
 * Copyright (C) 2009 Nicolas Perriault
 *
 * @license
 * This file is part of SyntaxHighlighter.
 *
 * SyntaxHighlighter is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SyntaxHighlighter is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SyntaxHighlighter.  If not, see <http://www.gnu.org/copyleft/lesser.html>.
 */;(function()
{SyntaxHighlighter=SyntaxHighlighter||(typeof require!=='undefined'?require('shCore').SyntaxHighlighter:null);function Brush()
{var constants='~ true false on off';this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:'comments'},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:'string'},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:'string'},{regex:/^\s*([a-z0-9\._:-])+\s*:\s/gmi,css:'variable'},{regex:/\s?(\.)([a-z0-9\._-])+\s?:/gmi,css:'comments'},{regex:/\s(@|:)([a-z0-9\._-])+\s*$/gmi,css:'variable bold'},{regex:/\s+\d+\s?$/gm,css:'color2 bold'},{regex:/(\{|\}|\[|\]|,|~|:)/gm,css:'constants'},{regex:/^\s+(-)+/gm,css:'string bold'},{regex:/^---/gm,css:'string bold'},{regex:new RegExp(this.getKeywords(constants),'gmi'),css:'constants'}];};Brush.prototype=new SyntaxHighlighter.Highlighter();Brush.aliases=['yaml','yml'];SyntaxHighlighter.brushes.Yaml=Brush;typeof(exports)!='undefined'?exports.Brush=Brush:null;})();/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.9 (Thu, 11 Sep 2014 13:31:59 GMT)
 *
 * @copyright
 * Copyright (C) 2004-2013 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */;(function()
{SyntaxHighlighter=SyntaxHighlighter||(typeof require!=='undefined'?require('shCore').SyntaxHighlighter:null);function Brush()
{var keywords='break case catch class continue '+
'default delete do else enum export extends false  '+
'for function if implements import in instanceof '+
'interface let new null package private protected '+
'static return super switch '+
'this throw true try typeof var while with yield';var r=SyntaxHighlighter.regexLib;this.regexList=[{regex:r.multiLineDoubleQuotedString,css:'string'},{regex:r.multiLineSingleQuotedString,css:'string'},{regex:r.singleLineCComments,css:'comments'},{regex:r.multiLineCComments,css:'comments'},{regex:/\s*#.*/gm,css:'preprocessor'},{regex:new RegExp(this.getKeywords(keywords),'gm'),css:'keyword'}];this.forHtmlScript(r.scriptScriptTags);};Brush.prototype=new SyntaxHighlighter.Highlighter();Brush.aliases=['js','jscript','javascript','json'];SyntaxHighlighter.brushes.JScript=Brush;typeof(exports)!='undefined'?exports.Brush=Brush:null;})();/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.9 (Thu, 11 Sep 2014 13:31:59 GMT)
 *
 * @copyright
 * Copyright (C) 2004-2013 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */;(function()
{SyntaxHighlighter=SyntaxHighlighter||(typeof require!=='undefined'?require('shCore').SyntaxHighlighter:null);function Brush()
{this.regexList=[{regex:/^\+\+\+ .*$/gm,css:'color2'},{regex:/^\-\-\- .*$/gm,css:'color2'},{regex:/^\s.*$/gm,css:'color1'},{regex:/^@@.*@@.*$/gm,css:'variable'},{regex:/^\+.*$/gm,css:'string'},{regex:/^\-.*$/gm,css:'color3'}];};Brush.prototype=new SyntaxHighlighter.Highlighter();Brush.aliases=['diff','patch'];SyntaxHighlighter.brushes.Diff=Brush;typeof(exports)!='undefined'?exports.Brush=Brush:null;})();/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.9 (Thu, 11 Sep 2014 13:31:59 GMT)
 *
 * @copyright
 * Copyright (C) 2004-2013 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */;(function()
{SyntaxHighlighter=SyntaxHighlighter||(typeof require!=='undefined'?require('shCore').SyntaxHighlighter:null);function Brush()
{// Copyright 2006 Shin, YoungJin
var datatypes='ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR '+
'DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH '+
'HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP '+
'HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY '+
'HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT '+
'HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE '+
'LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF '+
'LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR '+
'LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR '+
'PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT '+
'PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 '+
'POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR '+
'PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 '+
'PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT '+
'SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG '+
'ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM '+
'char char16_t char32_t bool short int __int32 __int64 __int8 __int16 long float double __wchar_t '+
'clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS '+
'FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t '+
'__wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t '+
'jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler '+
'sig_atomic_t size_t _stat __stat64 _stati64 terminate_function '+
'time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf '+
'va_list wchar_t wctrans_t wctype_t wint_t signed';var keywords='alignas alignof auto break case catch class const constexpr decltype __finally __exception __try '+
'const_cast continue private public protected __declspec '+
'default delete deprecated dllexport dllimport do dynamic_cast '+
'else enum explicit extern if for friend goto inline '+
'mutable naked namespace new noinline noreturn nothrow noexcept nullptr '+
'ref register reinterpret_cast return selectany '+
'sizeof static static_cast static_assert struct switch template this '+
'thread thread_local throw true false try typedef typeid typename union '+
'using uuid virtual void volatile whcar_t while';var functions='assert isalnum isalpha iscntrl isdigit isgraph islower isprint'+
'ispunct isspace isupper isxdigit tolower toupper errno localeconv '+
'setlocale acos asin atan atan2 ceil cos cosh exp fabs floor fmod '+
'frexp ldexp log log10 modf pow sin sinh sqrt tan tanh jmp_buf '+
'longjmp setjmp raise signal sig_atomic_t va_arg va_end va_start '+
'clearerr fclose feof ferror fflush fgetc fgetpos fgets fopen '+
'fprintf fputc fputs fread freopen fscanf fseek fsetpos ftell '+
'fwrite getc getchar gets perror printf putc putchar puts remove '+
'rename rewind scanf setbuf setvbuf sprintf sscanf tmpfile tmpnam '+
'ungetc vfprintf vprintf vsprintf abort abs atexit atof atoi atol '+
'bsearch calloc div exit free getenv labs ldiv malloc mblen mbstowcs '+
'mbtowc qsort rand realloc srand strtod strtol strtoul system '+
'wcstombs wctomb memchr memcmp memcpy memmove memset strcat strchr '+
'strcmp strcoll strcpy strcspn strerror strlen strncat strncmp '+
'strncpy strpbrk strrchr strspn strstr strtok strxfrm asctime '+
'clock ctime difftime gmtime localtime mktime strftime time';this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:'comments'},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:'comments'},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:'string'},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:'string'},{regex:/^ *#.*/gm,css:'preprocessor'},{regex:new RegExp(this.getKeywords(datatypes),'gm'),css:'color1 bold'},{regex:new RegExp(this.getKeywords(functions),'gm'),css:'functions bold'},{regex:new RegExp(this.getKeywords(keywords),'gm'),css:'keyword bold'}];};Brush.prototype=new SyntaxHighlighter.Highlighter();Brush.aliases=['cpp','cc','c++','c','h','hpp','h++'];SyntaxHighlighter.brushes.Cpp=Brush;typeof(exports)!='undefined'?exports.Brush=Brush:null;})();/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 *
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 *
 * Brush for CPAN::Changes by Randy Stauner (RWSTAUNER) 2011.
 */;(function()
{SyntaxHighlighter=SyntaxHighlighter||(typeof require!=='undefined'?require('shCore').SyntaxHighlighter:null);function Brush()
{this.regexList=[{regex:/^\{\{\$NEXT\}\}$/gm,css:'color3'},{regex:/^v?([0-9._]+)(-TRIAL)?([ \t]+.+)?/gm,css:'constants'},{regex:/^\s+\[.+?\]/gm,css:'value'},{regex:/^\s+[-*]/gm,css:'functions'},{regex:/^[^v0-9].+\n(?=\nv?[0-9_.])/g,css:'preprocessor'}];};Brush.prototype=new SyntaxHighlighter.Highlighter();Brush.aliases=['cpanchanges'];SyntaxHighlighter.brushes.CPANChanges=Brush;typeof(exports)!='undefined'?exports.Brush=Brush:null;})();var MetaCPAN={};MetaCPAN.favs_to_check={};try{MetaCPAN.storage=window.localStorage;}catch(e){MetaCPAN.storage={getItem:function(k){return this["_"+k];},setItem:function(k,v){return this["_"+k]=v;},};}
document.cookie="hideTOC=; expires="+(new Date(0)).toGMTString()+"; path=/";$.fn.textWidth=function(){var html_org=$(this).html();var html_calc='<span>'+html_org+'</span>';$(this).html(html_calc);var width=$(this).find('span:first').width();$(this).html(html_org);return width;};$.extend({getUrlVars:function(){var vars={},hash;var indexOfQ=window.location.href.indexOf('?');if(indexOfQ==-1)return vars;var hashes=window.location.href.slice(indexOfQ+1).split('&');$.each(hashes,function(idx,hash){var kv=hash.split('=');vars[kv[0]]=decodeURIComponent(kv[1]);});return vars;},getUrlVar:function(name){return $.getUrlVars()[name];}});function togglePanel(side,visible){var elements=$('#'+side+'-panel-toggle').add($('#'+side+'-panel'));var className='panel-hide';if(typeof visible=="undefined"){visible=elements.first().hasClass(className);}
if(visible){elements.removeClass(className);}else{elements.addClass(className);}
MetaCPAN.storage.setItem("hide_"+side+"_panel",visible?0:1);return false;}
function toggleTOC(){var container=$('#index-container');if(container.length==0)return false;var visible=!container.hasClass('hide-index');var index=$('#index');var newHeight=0;if(!visible){newHeight=index.get(0).scrollHeight;}
index.animate({height:newHeight},{duration:200,complete:function(){if(newHeight>0){index.css({height:'auto'});}}});MetaCPAN.storage.setItem('hideTOC',(visible?1:0));container.toggleClass('hide-index');return false;}
function setFavTitle(button){button.attr('title',button.hasClass('active')?'Remove from favorite':'Add to favorite');return;}
$(document).ready(function(){$(".ttip").tooltip();Mousetrap.bind('?',function(){$('#keyboard-shortcuts').modal();});Mousetrap.bind('s',function(e){$('#search-input').focus();e.preventDefault();});Mousetrap.bind('g s',function(e){});$('a[data-keyboard-shortcut]').each(function(index,element){Mousetrap.bind($(element).data('keyboard-shortcut'),function(){window.location=$(element).attr('href');});});$('table.tablesorter').each(function(){var table=$(this);var sortid=(MetaCPAN.storage.getItem("tablesorter:"+table.attr('id'))||table.attr('data-default-sort')||'0,0');sortid=JSON.parse("["+sortid+"]");var cfg={sortList:[sortid],textExtraction:function(node){var $node=$(node);var sort=$node.attr("sort");if(!sort)return $node.text();if($node.hasClass("date")){return(new Date(sort)).getTime();}else{return sort;}},headers:{}};table.find('thead th').each(function(i,el){if($(el).hasClass('no-sort')){cfg.headers[i]={sorter:false};}});table.tablesorter(cfg);});$('.tablesorter.remote th.header').each(function(){$(this).unbind('click');$(this).click(function(event){var $cell=$(this);var params=$.getUrlVars();params.sort='[['+this.column+','+this.count++%2+']]';var query=$.param(params);var url=window.location.href.replace(window.location.search,'');window.location.href=url+'?'+query;});});$('.relatize').relatizeDate();



$('.autocomplete-suggestions').off('mouseover.autocomplete');$('.autocomplete-suggestions').off('mouseout.autocomplete');$('#search-input.autofocus').focus();var items=$('.ellipsis');for(var i=0;i<items.length;i++){var element=$(items[i]);var boxWidth=element.width();var textWidth=element.textWidth();if(textWidth<=boxWidth)continue;var text=element.text();var textLength=text.length;var parts=[text.substr(0,Math.floor(textLength/2)),text.substr(Math.floor(textLength/2),textLength)];while(element.textWidth()>boxWidth){if(textLength%2){parts[0]=parts[0].substr(0,parts[0].length-1);}else{parts[1]=parts[1].substr(1,parts[1].length);}
textLength--;element.html(parts.join('…'));}}
$('.anchors').find('h1,h2,h3,h4,h5,h6,dt').each(function(){if(this.id){$(document.createElement('a')).attr('href','#'+this.id).addClass('anchor').append($(document.createElement('span')).addClass('fa fa-bookmark black')).prependTo(this);}});var module_source_href=$('#source-link').attr('href');if(module_source_href){$('.pod-errors-detail dt').each(function(){var $dt=$(this);var link_text=$dt.text();var capture=link_text.match(/Around line (\d+)/);$dt.html($('<a />').attr('href',module_source_href+'#L'+capture[1])
.text(link_text));});}
$('.pod-errors').addClass('collapsed');$('.pod-errors > p:first-child').click(function(){$(this).parent().toggleClass('collapsed');});$('table.tablesorter th.header').on('click',function(){tableid=$(this).parents().eq(2).attr('id');setTimeout(function(){var sortParam=$.getUrlVar('sort');if(sortParam!=null){sortParam=sortParam.slice(2,sortParam.length-2);MetaCPAN.storage.setItem("tablesorter:"+tableid,sortParam);}},1000);});setFavTitle($('.inline').find('button'));$('.dropdown-toggle').dropdown();var index=$("#index");if(index){index.wrap('<div id="index-container"><div class="index-border"></div></div>');var container=index.parent().parent();var index_hidden=MetaCPAN.storage.getItem('hideTOC')==1;index.before('<div class="index-header"><b>Contents</b>'+' [ <button class="btn-link toggle-index"><span class="toggle-show">show</span><span class="toggle-hide">hide</span></button> ]'+' <button class="btn-link toggle-index-right"><i class="fa fa-toggle-right"></i><i class="fa fa-toggle-left"></i></button>'+'</div>');$('.toggle-index').on('click',function(e){e.preventDefault();toggleTOC();});if(index_hidden){container.addClass("hide-index");}
$('.toggle-index-right').on('click',function(e){e.preventDefault();MetaCPAN.storage.setItem('rightTOC',container.hasClass('pull-right')?0:1);container.toggleClass('pull-right');});if(MetaCPAN.storage.getItem('rightTOC')==1){container.addClass("pull-right");}}
['right'].forEach(function(side){var panel=$('#'+side+"-panel");if(panel.length){var panel_visible=MetaCPAN.storage.getItem("hide_"+side+"_panel")!=1;togglePanel(side,panel_visible);}});$('a[href*="/search?"]').on('click',function(){var url=$(this).attr('href');var result=/size=(\d+)/.exec(url);if(result&&result[1]){MetaCPAN.storage.setItem('search_size',result[1]);}});var size=MetaCPAN.storage.getItem('search_size');if(size){$('#search-size').val(size);}
set_page_size('a[href*="/releases"]','releases_page_size');set_page_size('a[href*="/recent"]','recent_page_size');set_page_size('a[href*="/requires"]','requires_page_size');var changes=$('#last-changes-container');if(changes.prop('scrollHeight')>changes.height()){$("#last-changes-toggle").show();}});function set_page_size(selector,storage_name){$(selector).on('click',function(){var url=$(this).attr('href');var result=/size=(\d+)/.exec(url);if(result&&result[1]){var page_size=result[1];MetaCPAN.storage.setItem(storage_name,page_size);return true;}else{page_size=MetaCPAN.storage.getItem(storage_name);if(page_size){if(/\?/.exec(url)){document.location.href=url+'&size='+page_size;}else{document.location.href=url+'?size='+page_size;}
return false;};}});}
function searchForNearest(){$("#busy").css({visibility:'visible'});navigator.geolocation.getCurrentPosition(function(pos){var query=$.getUrlVar('q');if(!query){query='';}
query=query.replace(/(^|\s+)loc:\S+|$/,'');query=query+' loc:'+pos.coords.latitude+','+pos.coords.longitude;query=query.replace(/(^|\s)\s+/g,'$1');document.location.href='/mirrors?q='+encodeURIComponent(query);},function(){$("#busy").css({visibility:'hidden'});},{maximumAge:600000});}
function logInPAUSE(a){if(!a.href.match(/pause/))
return true;var id=prompt('Please enter your PAUSE ID:');if(id)document.location.href=a.href+'&id='+id;return false;}
function showUserData(fav_data){$('.logged_in').css('display','inline');$.each(fav_data.faves,function(index,value){var distribution=value.distribution;if(MetaCPAN.favs_to_check[distribution]){$('#'+distribution+'-fav input[name="remove"]').val(1);var button=$('#'+distribution+'-fav button');button.addClass('active');setFavTitle(button);}});}
function favDistribution(form){form=$(form);var data=form.serialize();$.ajax({type:'POST',url:form.attr('action'),data:data,success:function(){var button=form.find('button');button.toggleClass('active');setFavTitle(button);var counter=button.find('span');var count=counter.text();if(button.hasClass('active')){counter.text(count?parseInt(count,10)+1:1);form.find('input[name="remove"]').val(1);if(!count)
button.toggleClass('highlight');}else{form.find('input[name="remove"]').val(0);counter.text(parseInt(count,10)-1);if(counter.text()==0){counter.text("");button.toggleClass('highlight');}}},error:function(){if(confirm("You have to complete a Captcha in order to ++.")){document.location.href="/account/turing";}}});return false;}
if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)){$(function(){var el=$('.nav-list').first();var topRow=$('.main-content').first();if(!el.length)return;var height=el.height();var content=$("div.content").height()>$("#right-panel").height()?$("div.content"):$('#right-panel');if(height>content.height())return;function alignSidebar(e){var scrollTop=$(window).scrollTop();var screenHeight=$(window).height();var contentTop=content.offset().top;var contentHeight=content.height();if(height>contentHeight||scrollTop<contentTop+(height>screenHeight?height-screenHeight:0)){el.addClass("sticky-panel-top").removeClass("sticky-panel-bottom sticky-panel-sticky");}
else if(scrollTop+height>contentTop+contentHeight){el.addClass("sticky-panel-bottom").removeClass("sticky-panel-top sticky-panel-sticky");}
else if(height>screenHeight){el.addClass("sticky-panel-bottom sticky-panel-sticky").removeClass("sticky-panel-top");}
else{el.addClass("sticky-panel-sticky sticky-panel-top").removeClass("sticky-panel-bottom");}};$(window).scroll(alignSidebar);alignSidebar();});}
(function(){function GitHubUrl(item){this.item=$(item);this.href=this.item.attr('href');}
function getGithubApiJSONP_cb(success_cb){return function(res){if(res.meta.status>=300&&res.meta.status<400){var location=res.meta.Location;var redirect_url=location.replace(/(callback=).*?(&)/,'$1?$2');$.getJSON(redirect_url,success_cb);}
else{success_cb.apply(this,arguments);}};}
GitHubUrl.match=function(a){if($(a).length==0)return;return $(a).attr('href').indexOf('github')>=0;};$.extend(GitHubUrl.prototype,{config:{issues:{pattern:/^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)\/issues\/?$/,prepareData:function(data,cb){var url=this.url.replace('/issues','');$.getJSON(url,getGithubApiJSONP_cb(function(repo){cb({issues:data,repo:repo.data});}));},render:function(data){if(data.issues.length===0){return'There are currently no open issues.';}
var result='<table>'
+'  <tr><th>Open <a href="'+data.repo.html_url+'/issues">Issues</a>:</th><td>'+data.repo.open_issues+'</td></tr>'
+'  <tr><th>Last 15 Issues:</th><td><table>';$.each(data.issues,function(idx,row){result+='<tr><td><span class="relatize">'+row.created_at+'</span></td><td><a href="'+row.html_url+'">'+row.title+'</a></td></tr>';});return result+'</table></td></tr></table>';},url:function(result){return this.githubApiUrl+'/repos/'+result[1]+'/'+result[2]+'/issues?per_page=15&callback=?';}},repo:{pattern:/^(?:(?:git|https?):\/\/)?(?:www\.)?github\.com(?:\/|:)([^\/]+)\/([^\/\.]+)(?:\/(tree(?:\/master)?)?|\.git)*$/,normalizeUrl:function(match){if(match[3]==='tree'){this.item.attr('href',this.href.replace(/\/tree$/,''));}},render:function(data){return'<table>'
+(data.description?'  <tr><th>Description:</th><td>'+data.description+'</td></tr>':'')
+(data.homepage?'  <tr><th>Homepage:</th><td><a href="'+data.homepage+'">'+data.homepage+'</a></td></tr>':'')
+'  <tr><th>Stars:</th><td><a href="'+data.html_url+'/stargazers">'+data.watchers+'</a></td></tr>'
+'  <tr><th>Forks:</th><td><a href="'+data.html_url+'/network">'+data.forks+'</a></td></tr>'
+(data.has_issues?'  <tr><th>Open Issues: </th><td><a href="'+data.html_url+'/issues">'+data.open_issues+'</a></td></tr>':'')
+'  <tr><th>Pull Requests:</th><td><a href="'+data.html_url+'/pulls">'+data.html_url+'/pulls'+'</a></td></tr>'
+'  <tr><th>Clone URL:</th><td><a href="'+data.clone_url+'">'+data.clone_url+'</a></td></tr>'
+'  <tr><th>Git URL:</th><td><a href="'+data.git_url+'">'+data.git_url+'</a></td></tr>'
+'  <tr><th>Github URL:</th><td><a href="'+data.html_url+'">'+data.html_url+'</a></td></tr>'
+'  <tr><th>SSH URL:</th><td><a href="'+data.ssh_url.replace(/^(\w+\@)?([^:\/]+):/,'ssh://$1$2/')+'">'+data.ssh_url+'</a></td></tr>'
+'  <tr><th>Last Commit:</th><td><span class="relatize">'+data.pushed_at+'</span></td></tr>'
+'</table>';},url:function(result){return this.githubApiUrl+'/repos/'+result[1]+'/'+result[2]+'?callback=?';}},user:{pattern:/^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/]+)\/?$/,render:function(data){return'<table>'
+(data.name?'  <tr><th>Name:</th><td>'+data.name+'</td></tr>':'')
+(data.email?'  <tr><th>Email:</th><td><a href="mailto:'+data.email+'">'+data.email+'</a></td></tr>':'')
+(data.blog?'  <tr><th>Website/Blog:</th><td><a href="'+data.blog+'">'+data.blog+'</a></td></tr>':'')
+(data.company?'  <tr><th>Company:</th><td>'+data.company+'</td></tr>':'')
+(data.location?'  <tr><th>Location:</th><td>'+data.location+'</td></tr>':'')
+'  <tr><th>Member Since:</th><td><span class="relatize">'+data.created_at+'</span></td></tr>'
+'  <tr><th><a href="'+data.html_url+'/followers">Followers</a>:</th><td>'+data.followers+'</td></tr>'
+'  <tr><th><a href="'+data.html_url+'/following">Following</a>:</th><td>'+data.following+'</td></tr>'
+'  <tr><th><a href="'+data.html_url+'/repositories">Public Repos</a>:</th><td>'+data.public_repos+'</td></tr>'
+'</table>';},url:function(result){return this.githubApiUrl+'/users/'+result[1]+'?callback=?';}}},githubApiUrl:'https://api.github.com',githubUrl:'https://github.com',createPopup:function(){if(!this.parseUrl()){return;}
var self=this;var qtip;var tooltip=this.item.qtip({content:{ajax:{dataType:'json',type:'GET',url:this.url,success:getGithubApiJSONP_cb(function(res){var error;try{if(res.meta&&res.meta.status>=400){error=(res.data&&res.data.message)||'An error occurred';}}catch(ignore){}
if(error){qtip.set('content.text','<i>'+error+'</i>');return;}
self.prepareData(res.data,function(data){var html=self.render(data);qtip.set('content.text',html);$('.qtip-github .relatize').each(function(){if(!$(this).hasClass('relatized')){$(this).relatizeDate();$(this).addClass('relatized');}});});})},text:'<i class="fa fa-spinner fa-spin"></i>',title:'Github Info'},hide:{event:'mouseleave',fixed:true},position:{at:'right center',my:'left center'},style:{classes:'qtip-shadow qtip-rounded qtip-light qtip-github',}});qtip=tooltip.qtip('api');},parseUrl:function(){var self=this;$.each(this.config,function(type,config){var result=config.pattern.exec(self.href);if(result){if(config.normalizeUrl){config.normalizeUrl.call(self,result);}
self.url=config.url.call(self,result);self.type=type;return false;}});if(this.type){return true;}
return false;},prepareData:function(data,cb){if(typeof this.config[this.type].prepareData==='function'){this.config[this.type].prepareData.call(this,data,cb);}
else{cb(data);}},render:function(data){try{return this.config[this.type].render.call(this,data);}
catch(x){return'<i>Error</i>';}}});$(document).ready(function(){$('.nav-list a:not(.nopopup)').each(function(){if(GitHubUrl.match(this)){(new GitHubUrl(this)).createPopup();}});var repository=$('a[data-keyboard-shortcut="g r"]');if(GitHubUrl.match(repository)){Mousetrap.bind('g p',function(){var pull_request_url=repository.attr('href')+'/pulls';window.location=pull_request_url;});}});}());$(function(){function gravatar_fixup(av,size){av=av.replace(/^https?:\/\/([a-z0-9.-]+\.)?gravatar\.com\//i,"https://secure.gravatar.com/");av=av.replace(/([;&?])s=\d+/,'$1s=20');av=av.replace(/([;&?]d=)([^;&?]+)/,function(match,param,fallback){var url=decodeURIComponent(fallback);url=gravatar_fixup(url);return(param+encodeURIComponent(url));});return av;}
function updateContrib(li,data){if(!data.name){return;}
var anchor=li.find('a.cpan-author');if(anchor.length==0){li.contents().wrap('<a class="cpan-author"></a>');anchor=li.find('a.cpan-author');}
li.attr('data-cpan-author',data.pauseid);anchor.attr('href','/author/'+data.pauseid);anchor.text(data.name);var gravatar=data.gravatar_url;if(gravatar){gravatar=gravatar_fixup(gravatar);var img=$('<img />')
.attr('width',20)
.attr('height',20);anchor.prepend(img);img.addClass('gravatar');img.attr('src',gravatar)}}
var filter=[];var by_author={};var by_email={};$('#contributors .contributor').each(function(){var li=$(this);var author;var email;if(author=li.attr('data-cpan-author')){filter.push({"term":{"pauseid":author}});by_author[author]=li;}
else if(email=li.attr('data-contrib-email')){$.each(email.split(/\s+/),function(i,em){filter.push({"term":{"email":em}});by_email[em]=li;});}});if(filter.length==0){return;}
var query={"query":{"match_all":{}},"filter":{"or":filter},"_source":["name","email","pauseid","gravatar_url"],size:filter.length};$.ajax({type:"POST",url:"https://fastapi.metacpan.org/author/",data:JSON.stringify(query),dataType:"json",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:false,success:function(data){$.each(data.hits.hits,function(i,contrib){var fields=contrib._source;if(fields.email){$.each(fields.email,function(i,email){if(by_email[email]){updateContrib(by_email[email],fields);}});}
if(fields.pauseid&&by_author[fields.pauseid]){updateContrib(by_author[fields.pauseid],fields);}});}});});$(function(){$(".dropdown select").on("change",function(){document.location.href=$(this).val();});});/* ========================================================================
 * Bootstrap: dropdown.js v3.1.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){'use strict';var backdrop='.dropdown-backdrop'
var toggle='[data-toggle=dropdown]'
var Dropdown=function(element){$(element).on('click.bs.dropdown',this.toggle)}
Dropdown.prototype.toggle=function(e){var $this=$(this)
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
clearMenus()
if(!isActive){if('ontouchstart' in document.documentElement&&!$parent.closest('.navbar-nav').length){$('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click',clearMenus)}
var relatedTarget={relatedTarget:this}
$parent.trigger(e=$.Event('show.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$parent
.toggleClass('open')
.trigger('shown.bs.dropdown',relatedTarget)
$this.focus()}
return false}
Dropdown.prototype.keydown=function(e){if(!/(38|40|27)/.test(e.keyCode))return
var $this=$(this)
e.preventDefault()
e.stopPropagation()
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
if(!isActive||(isActive&&e.keyCode==27)){if(e.which==27)$parent.find(toggle).focus()
return $this.click()}
var desc=' li:not(.divider):visible a'
var $items=$parent.find('[role=menu]'+desc+', [role=listbox]'+desc)
if(!$items.length)return
var index=$items.index($items.filter(':focus'))
if(e.keyCode==38&&index>0)index--
if(e.keyCode==40&&index<$items.length-1)index++
if(!~index)index=0
$items.eq(index).focus()}
function clearMenus(e){$(backdrop).remove()
$(toggle).each(function(){var $parent=getParent($(this))
var relatedTarget={relatedTarget:this}
if(!$parent.hasClass('open'))return
$parent.trigger(e=$.Event('hide.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$parent.removeClass('open').trigger('hidden.bs.dropdown',relatedTarget)})}
function getParent($this){var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=selector&&$(selector)
return $parent&&$parent.length?$parent:$this.parent()}
var old=$.fn.dropdown
$.fn.dropdown=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.dropdown')
if(!data)$this.data('bs.dropdown',(data=new Dropdown(this)))
if(typeof option=='string')data[option].call($this)})}
$.fn.dropdown.Constructor=Dropdown
$.fn.dropdown.noConflict=function(){$.fn.dropdown=old
return this}
$(document)
.on('click.bs.dropdown.data-api',clearMenus)
.on('click.bs.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()})
.on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle)
.on('keydown.bs.dropdown.data-api',toggle+', [role=menu], [role=listbox]',Dropdown.prototype.keydown)}(jQuery);/* ========================================================================
 * Bootstrap: collapse.js v3.1.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){'use strict';var Collapse=function(element,options){this.$element=$(element)
this.options=$.extend({},Collapse.DEFAULTS,options)
this.transitioning=null
if(this.options.parent)this.$parent=$(this.options.parent)
if(this.options.toggle)this.toggle()}
Collapse.DEFAULTS={toggle:true}
Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass('width')
return hasWidth?'width':'height'}
Collapse.prototype.show=function(){if(this.transitioning||this.$element.hasClass('in'))return
var startEvent=$.Event('show.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var actives=this.$parent&&this.$parent.find('> .panel > .in')
if(actives&&actives.length){var hasData=actives.data('bs.collapse')
if(hasData&&hasData.transitioning)return
actives.collapse('hide')
hasData||actives.data('bs.collapse',null)}
var dimension=this.dimension()
this.$element
.removeClass('collapse')
.addClass('collapsing')
[dimension](0)
this.transitioning=1
var complete=function(){this.$element
.removeClass('collapsing')
.addClass('collapse in')
[dimension]('auto')
this.transitioning=0
this.$element.trigger('shown.bs.collapse')}
if(!$.support.transition)return complete.call(this)
var scrollSize=$.camelCase(['scroll',dimension].join('-'))
this.$element
.one($.support.transition.end,$.proxy(complete,this))
.emulateTransitionEnd(350)
[dimension](this.$element[0][scrollSize])}
Collapse.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass('in'))return
var startEvent=$.Event('hide.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var dimension=this.dimension()
this.$element
[dimension](this.$element[dimension]())
[0].offsetHeight
this.$element
.addClass('collapsing')
.removeClass('collapse')
.removeClass('in')
this.transitioning=1
var complete=function(){this.transitioning=0
this.$element
.trigger('hidden.bs.collapse')
.removeClass('collapsing')
.addClass('collapse')}
if(!$.support.transition)return complete.call(this)
this.$element
[dimension](0)
.one($.support.transition.end,$.proxy(complete,this))
.emulateTransitionEnd(350)}
Collapse.prototype.toggle=function(){this[this.$element.hasClass('in')?'hide':'show']()}
var old=$.fn.collapse
$.fn.collapse=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.collapse')
var options=$.extend({},Collapse.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data&&options.toggle&&option=='show')option=!option
if(!data)$this.data('bs.collapse',(data=new Collapse(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.collapse.Constructor=Collapse
$.fn.collapse.noConflict=function(){$.fn.collapse=old
return this}
$(document).on('click.bs.collapse.data-api','[data-toggle=collapse]',function(e){var $this=$(this),href
var target=$this.attr('data-target')||e.preventDefault()||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,'')
var $target=$(target)
var data=$target.data('bs.collapse')
var option=data?'toggle':$this.data()
var parent=$this.attr('data-parent')
var $parent=parent&&$(parent)
if(!data||!data.transitioning){if($parent)$parent.find('[data-toggle=collapse][data-parent="'+parent+'"]').not($this).addClass('collapsed')
$this[$target.hasClass('in')?'addClass':'removeClass']('collapsed')}
$target.collapse(option)})}(jQuery);/* ========================================================================
 * Bootstrap: modal.js v3.1.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){'use strict';var Modal=function(element,options){this.options=options
this.$element=$(element)
this.$backdrop=this.isShown=null
if(this.options.remote){this.$element
.find('.modal-content')
.load(this.options.remote,$.proxy(function(){this.$element.trigger('loaded.bs.modal')},this))}}
Modal.DEFAULTS={backdrop:true,keyboard:true,show:true}
Modal.prototype.toggle=function(_relatedTarget){return this[!this.isShown?'show':'hide'](_relatedTarget)}
Modal.prototype.show=function(_relatedTarget){var that=this
var e=$.Event('show.bs.modal',{relatedTarget:_relatedTarget})
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented())return
this.isShown=true
this.escape()
this.$element.on('click.dismiss.bs.modal','[data-dismiss="modal"]',$.proxy(this.hide,this))
this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){that.$element.appendTo(document.body)}
that.$element
.show()
.scrollTop(0)
if(transition){that.$element[0].offsetWidth}
that.$element
.addClass('in')
.attr('aria-hidden',false)
that.enforceFocus()
var e=$.Event('shown.bs.modal',{relatedTarget:_relatedTarget})
transition?that.$element.find('.modal-dialog')
.one($.support.transition.end,function(){that.$element.focus().trigger(e)})
.emulateTransitionEnd(300):that.$element.focus().trigger(e)})}
Modal.prototype.hide=function(e){if(e)e.preventDefault()
e=$.Event('hide.bs.modal')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented())return
this.isShown=false
this.escape()
$(document).off('focusin.bs.modal')
this.$element
.removeClass('in')
.attr('aria-hidden',true)
.off('click.dismiss.bs.modal')
$.support.transition&&this.$element.hasClass('fade')?this.$element
.one($.support.transition.end,$.proxy(this.hideModal,this))
.emulateTransitionEnd(300):this.hideModal()}
Modal.prototype.enforceFocus=function(){$(document)
.off('focusin.bs.modal')
.on('focusin.bs.modal',$.proxy(function(e){if(this.$element[0]!==e.target&&!this.$element.has(e.target).length){this.$element.focus()}},this))}
Modal.prototype.escape=function(){if(this.isShown&&this.options.keyboard){this.$element.on('keyup.dismiss.bs.modal',$.proxy(function(e){e.which==27&&this.hide()},this))}else if(!this.isShown){this.$element.off('keyup.dismiss.bs.modal')}}
Modal.prototype.hideModal=function(){var that=this
this.$element.hide()
this.backdrop(function(){that.removeBackdrop()
that.$element.trigger('hidden.bs.modal')})}
Modal.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove()
this.$backdrop=null}
Modal.prototype.backdrop=function(callback){var animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$('<div class="modal-backdrop '+animate+'" />')
.appendTo(document.body)
this.$element.on('click.dismiss.bs.modal',$.proxy(function(e){if(e.target!==e.currentTarget)return
this.options.backdrop=='static'?this.$element[0].focus.call(this.$element[0]):this.hide.call(this)},this))
if(doAnimate)this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
if(!callback)return
doAnimate?this.$backdrop
.one($.support.transition.end,callback)
.emulateTransitionEnd(150):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop
.one($.support.transition.end,callback)
.emulateTransitionEnd(150):callback()}else if(callback){callback()}}
var old=$.fn.modal
$.fn.modal=function(option,_relatedTarget){return this.each(function(){var $this=$(this)
var data=$this.data('bs.modal')
var options=$.extend({},Modal.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('bs.modal',(data=new Modal(this,options)))
if(typeof option=='string')data[option](_relatedTarget)
else if(options.show)data.show(_relatedTarget)})}
$.fn.modal.Constructor=Modal
$.fn.modal.noConflict=function(){$.fn.modal=old
return this}
$(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this)
var href=$this.attr('href')
var $target=$($this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/,'')))
var option=$target.data('bs.modal')?'toggle':$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data())
if($this.is('a'))e.preventDefault()
$target
.modal(option,this)
.one('hide',function(){$this.is(':visible')&&$this.focus()})})
$(document)
.on('show.bs.modal','.modal',function(){$(document.body).addClass('modal-open')})
.on('hidden.bs.modal','.modal',function(){$(document.body).removeClass('modal-open')})}(jQuery);/* ========================================================================
 * Bootstrap: tooltip.js v3.1.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){'use strict';var Tooltip=function(element,options){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null
this.init('tooltip',element,options)}
Tooltip.DEFAULTS={animation:true,placement:'top',selector:false,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:false,container:false}
Tooltip.prototype.init=function(type,element,options){this.enabled=true
this.type=type
this.$element=$(element)
this.options=this.getOptions(options)
var triggers=this.options.trigger.split(' ')
for(var i=triggers.length;i--;){var trigger=triggers[i]
if(trigger=='click'){this.$element.on('click.'+this.type,this.options.selector,$.proxy(this.toggle,this))}else if(trigger!='manual'){var eventIn=trigger=='hover'?'mouseenter':'focusin'
var eventOut=trigger=='hover'?'mouseleave':'focusout'
this.$element.on(eventIn+'.'+this.type,this.options.selector,$.proxy(this.enter,this))
this.$element.on(eventOut+'.'+this.type,this.options.selector,$.proxy(this.leave,this))}}
this.options.selector?(this._options=$.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()}
Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS}
Tooltip.prototype.getOptions=function(options){options=$.extend({},this.getDefaults(),this.$element.data(),options)
if(options.delay&&typeof options.delay=='number'){options.delay={show:options.delay,hide:options.delay}}
return options}
Tooltip.prototype.getDelegateOptions=function(){var options={}
var defaults=this.getDefaults()
this._options&&$.each(this._options,function(key,value){if(defaults[key]!=value)options[key]=value})
return options}
Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.'+this.type)
clearTimeout(self.timeout)
self.hoverState='in'
if(!self.options.delay||!self.options.delay.show)return self.show()
self.timeout=setTimeout(function(){if(self.hoverState=='in')self.show()},self.options.delay.show)}
Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.'+this.type)
clearTimeout(self.timeout)
self.hoverState='out'
if(!self.options.delay||!self.options.delay.hide)return self.hide()
self.timeout=setTimeout(function(){if(self.hoverState=='out')self.hide()},self.options.delay.hide)}
Tooltip.prototype.show=function(){var e=$.Event('show.bs.'+this.type)
if(this.hasContent()&&this.enabled){this.$element.trigger(e)
if(e.isDefaultPrevented())return
var that=this;var $tip=this.tip()
this.setContent()
if(this.options.animation)$tip.addClass('fade')
var placement=typeof this.options.placement=='function'?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement
var autoToken=/\s?auto?\s?/i
var autoPlace=autoToken.test(placement)
if(autoPlace)placement=placement.replace(autoToken,'')||'top'
$tip
.detach()
.css({top:0,left:0,display:'block'})
.addClass(placement)
this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element)
var pos=this.getPosition()
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(autoPlace){var $parent=this.$element.parent()
var orgPlacement=placement
var docScroll=document.documentElement.scrollTop||document.body.scrollTop
var parentWidth=this.options.container=='body'?window.innerWidth:$parent.outerWidth()
var parentHeight=this.options.container=='body'?window.innerHeight:$parent.outerHeight()
var parentLeft=this.options.container=='body'?0:$parent.offset().left
placement=placement=='bottom'&&pos.top+pos.height+actualHeight-docScroll>parentHeight?'top':placement=='top'&&pos.top-docScroll-actualHeight<0?'bottom':placement=='right'&&pos.right+actualWidth>parentWidth?'left':placement=='left'&&pos.left-actualWidth<parentLeft?'right':placement
$tip
.removeClass(orgPlacement)
.addClass(placement)}
var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight)
this.applyPlacement(calculatedOffset,placement)
this.hoverState=null
var complete=function(){that.$element.trigger('shown.bs.'+that.type)}
$.support.transition&&this.$tip.hasClass('fade')?$tip
.one($.support.transition.end,complete)
.emulateTransitionEnd(150):complete()}}
Tooltip.prototype.applyPlacement=function(offset,placement){var replace
var $tip=this.tip()
var width=$tip[0].offsetWidth
var height=$tip[0].offsetHeight
var marginTop=parseInt($tip.css('margin-top'),10)
var marginLeft=parseInt($tip.css('margin-left'),10)
if(isNaN(marginTop))marginTop=0
if(isNaN(marginLeft))marginLeft=0
offset.top=offset.top+marginTop
offset.left=offset.left+marginLeft
$.offset.setOffset($tip[0],$.extend({using:function(props){$tip.css({top:Math.round(props.top),left:Math.round(props.left)})}},offset),0)
$tip.addClass('in')
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(placement=='top'&&actualHeight!=height){replace=true
offset.top=offset.top+height-actualHeight}
if(/bottom|top/.test(placement)){var delta=0
if(offset.left<0){delta=offset.left*-2
offset.left=0
$tip.offset(offset)
actualWidth=$tip[0].offsetWidth
actualHeight=$tip[0].offsetHeight}
this.replaceArrow(delta-width+actualWidth,actualWidth,'left')}else{this.replaceArrow(actualHeight-height,actualHeight,'top')}
if(replace)$tip.offset(offset)}
Tooltip.prototype.replaceArrow=function(delta,dimension,position){this.arrow().css(position,delta?(50*(1-delta/dimension)+'%'):'')}
Tooltip.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
$tip.find('.tooltip-inner')[this.options.html?'html':'text'](title)
$tip.removeClass('fade in top bottom left right')}
Tooltip.prototype.hide=function(){var that=this
var $tip=this.tip()
var e=$.Event('hide.bs.'+this.type)
function complete(){if(that.hoverState!='in')$tip.detach()
that.$element.trigger('hidden.bs.'+that.type)}
this.$element.trigger(e)
if(e.isDefaultPrevented())return
$tip.removeClass('in')
$.support.transition&&this.$tip.hasClass('fade')?$tip
.one($.support.transition.end,complete)
.emulateTransitionEnd(150):complete()
this.hoverState=null
return this}
Tooltip.prototype.fixTitle=function(){var $e=this.$element
if($e.attr('title')||typeof($e.attr('data-original-title'))!='string'){$e.attr('data-original-title',$e.attr('title')||'').attr('title','')}}
Tooltip.prototype.hasContent=function(){return this.getTitle()}
Tooltip.prototype.getPosition=function(){var el=this.$element[0]
return $.extend({},(typeof el.getBoundingClientRect=='function')?el.getBoundingClientRect():{width:el.offsetWidth,height:el.offsetHeight},this.$element.offset())}
Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return placement=='bottom'?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:placement=='top'?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:placement=='left'?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}}
Tooltip.prototype.getTitle=function(){var title
var $e=this.$element
var o=this.options
title=$e.attr('data-original-title')||(typeof o.title=='function'?o.title.call($e[0]):o.title)
return title}
Tooltip.prototype.tip=function(){return this.$tip=this.$tip||$(this.options.template)}
Tooltip.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find('.tooltip-arrow')}
Tooltip.prototype.validate=function(){if(!this.$element[0].parentNode){this.hide()
this.$element=null
this.options=null}}
Tooltip.prototype.enable=function(){this.enabled=true}
Tooltip.prototype.disable=function(){this.enabled=false}
Tooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled}
Tooltip.prototype.toggle=function(e){var self=e?$(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.'+this.type):this
self.tip().hasClass('in')?self.leave(self):self.enter(self)}
Tooltip.prototype.destroy=function(){clearTimeout(this.timeout)
this.hide().$element.off('.'+this.type).removeData('bs.'+this.type)}
var old=$.fn.tooltip
$.fn.tooltip=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tooltip')
var options=typeof option=='object'&&option
if(!data&&option=='destroy')return
if(!data)$this.data('bs.tooltip',(data=new Tooltip(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.tooltip.Constructor=Tooltip
$.fn.tooltip.noConflict=function(){$.fn.tooltip=old
return this}}(jQuery);/* ========================================================================
 * Bootstrap: affix.js v3.1.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($){'use strict';var Affix=function(element,options){this.options=$.extend({},Affix.DEFAULTS,options)
this.$window=$(window)
.on('scroll.bs.affix.data-api',$.proxy(this.checkPosition,this))
.on('click.bs.affix.data-api',$.proxy(this.checkPositionWithEventLoop,this))
this.$element=$(element)
this.affixed=this.unpin=this.pinnedOffset=null
this.checkPosition()}
Affix.RESET='affix affix-top affix-bottom'
Affix.DEFAULTS={offset:0}
Affix.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset
this.$element.removeClass(Affix.RESET).addClass('affix')
var scrollTop=this.$window.scrollTop()
var position=this.$element.offset()
return(this.pinnedOffset=position.top-scrollTop)}
Affix.prototype.checkPositionWithEventLoop=function(){setTimeout($.proxy(this.checkPosition,this),1)}
Affix.prototype.checkPosition=function(){if(!this.$element.is(':visible'))return
var scrollHeight=$(document).height()
var scrollTop=this.$window.scrollTop()
var position=this.$element.offset()
var offset=this.options.offset
var offsetTop=offset.top
var offsetBottom=offset.bottom
if(this.affixed=='top')position.top+=scrollTop
if(typeof offset!='object')offsetBottom=offsetTop=offset
if(typeof offsetTop=='function')offsetTop=offset.top(this.$element)
if(typeof offsetBottom=='function')offsetBottom=offset.bottom(this.$element)
var affix=this.unpin!=null&&(scrollTop+this.unpin<=position.top)?false:offsetBottom!=null&&(position.top+this.$element.height()>=scrollHeight-offsetBottom)?'bottom':offsetTop!=null&&(scrollTop<=offsetTop)?'top':false
if(this.affixed===affix)return
if(this.unpin)this.$element.css('top','')
var affixType='affix'+(affix?'-'+affix:'')
var e=$.Event(affixType+'.bs.affix')
this.$element.trigger(e)
if(e.isDefaultPrevented())return
this.affixed=affix
this.unpin=affix=='bottom'?this.getPinnedOffset():null
this.$element
.removeClass(Affix.RESET)
.addClass(affixType)
.trigger($.Event(affixType.replace('affix','affixed')))
if(affix=='bottom'){this.$element.offset({top:scrollHeight-offsetBottom-this.$element.height()})}}
var old=$.fn.affix
$.fn.affix=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.affix')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.affix',(data=new Affix(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.affix.Constructor=Affix
$.fn.affix.noConflict=function(){$.fn.affix=old
return this}
$(window).on('load',function(){$('[data-spy="affix"]').each(function(){var $spy=$(this)
var data=$spy.data()
data.offset=data.offset||{}
if(data.offsetBottom)data.offset.bottom=data.offsetBottom
if(data.offsetTop)data.offset.top=data.offsetTop
$spy.affix(data)})})}(jQuery);!function($){"use strict";var SlidePanel=function(element){this.element=$(element)}
SlidePanel.prototype={constructor:SlidePanel,toggle:function(){var $this=this.element,selector=$this.attr('data-target'),width=$this.attr('data-slidepanel-width'),$target,e
e=$.Event('toggle')
$this.trigger(e)
if(e.isDefaultPrevented())return
$target=$(selector)
if(!width){width=$target.outerWidth()
$this.attr('data-slidepanel-width',width)
$target.css('left',-width).css('visibility','visible');}
if($target.hasClass('slidepanel-visible'))
this.hide()
else
this.show()},show:function($target){var $this=this.element,selector=$this.attr('data-target'),width=$this.attr('data-slidepanel-width'),e
if(!$target)$target=$(selector)
$this.css('transform','translateX('+width+'px)')
$target.css('transform','translateX('+width+'px)').addClass('slidepanel-visible');},hide:function($target){var $this=this.element,selector=$this.attr('data-target'),width=$this.attr('data-slidepanel-width'),e
if(!$target)$target=$(selector)
$target.css('transform','translateX(0px)').removeClass('slidepanel-visible');$this.css('transform','translateX(0px)')}}
var old=$.fn.slidepanel
$.fn.slidepanel=function(option){return this.each(function(){var $this=$(this),data=$this.data('slidepanel')
if(!data)$this.data('slidepanel',(data=new SlidePanel(this)))
if(typeof option=='string')data[option]()})}
$.fn.slidepanel.Constructor=SlidePanel
$.fn.slidepanel.noConflict=function(){$.fn.slidepanel=old
return this}
$(document).on('click.slidepanel.data-api','[data-toggle="slidepanel"]',function(e){e.preventDefault()
$(this).slidepanel('toggle')})}(window.jQuery);$(function(){function parseLines(lines){lines=lines.split(/\s*,\s*/);var all_lines=[];for(var i=0;i<lines.length;i++){var line=lines[i];var res=line.match(/^\s*(\d+)\s*(?:-\s*(\d+)\s*)?$/);if(res){var start=res[1]*1;var end=(res[2]||res[1])*1;if(start>end){var swap=end;end=start;start=swap;}
for(var l=start;l<=end;l++){all_lines.push(l);}}}
return all_lines;}
function findLines(el,lines){var selector=$.map(parseLines(lines),function(line){return'.number'+line}).join(', ');return el.find('.syntaxhighlighter .line').filter(selector);}
var hashLines=/^#L(\d+(?:-\d+)?(?:,\d+(?:-\d+)?)*)$/;SyntaxHighlighter.regexLib['url']=/[a-z][a-z0-9.+-]*:\/\/[\w-.\/?%&=:@;#~]*[\w-\/?&=:@;#~]/gi;function processPackages(code)
{var destination=document.location.href.match(/\/source\//)?'source':'pod',strip_delimiters=/((?:["']|q[qw]?(?:[^&a-z]|&#?[a-zA-Z0-9]+;))\s*)([A-Za-z0-9_\:]+)(.*)/;code=code.replace(/(<code class="p(?:er)?l keyword">(?:with|extends|use<\/code> <code class="p(?:er)?l plain">(?:parent|base|aliased|Mojo::Base))\s*<\/code>\s*<code class="p(?:er)?l string">(?:qw(?:[^&a-z]|&#?[a-zA-Z0-9]+;)<\/code>.+?<code class="p(?:er)?l string">)?)(.+?)(<\/code>)/g,function(m,prefix,pkg,suffix)
{var match=null,mcpan_url;if(match=strip_delimiters.exec(pkg))
{prefix=prefix+match[1];pkg=match[2];suffix=match[3]+suffix;}
mcpan_url='<a href="https://metacpan.org/'+destination+'/'+pkg+'">'+pkg+'</a>';return prefix+mcpan_url+suffix;});return code.replace(/(<code class="p(?:er)?l keyword">(use|package|require)<\/code> <code class="p(?:er)?l plain">)([A-Z_a-z][0-9A-Z_a-z]*(?:::[0-9A-Z_a-z]+)*)(.*?<\/code>)/g,'$1<a href="https:\\/\\/metacpan.org/'+destination+'/$3">$3</a>$4');};var getCodeLinesHtml=SyntaxHighlighter.Highlighter.prototype.getCodeLinesHtml;SyntaxHighlighter.Highlighter.prototype.getCodeLinesHtml=function(html,lineNumbers){html=html.replace(/^ /,"&#32;");html=html.replace(/^\t/,"&#9;");html=getCodeLinesHtml.call(this,html,lineNumbers);return processPackages(html);};var source=$("#source");if(source.length){var lineMatch;var packageMatch;if(source.html().length>500000){source.children('code').removeClass();}
else if(lineMatch=document.location.hash.match(hashLines)){source.attr('data-line',lineMatch[1]);}
else if(packageMatch=document.location.hash.match(/^#P(\S+)$/)){var decodedPackageMatch=decodeURIComponent(packageMatch[1]);var leadingSource=source.text().split("package "+decodedPackageMatch+";");var lineCount=leadingSource[0].split("\n").length;if(leadingSource.length>1&&lineCount>1){source.attr('data-line',lineCount);document.location.hash="#L"+lineCount;}
else{document.location.hash='';}}}
$(".pod pre > code").each(function(index,code){var have_lang;if(code.className&&code.className.match(/(?:\s|^)language-\S+/)){return;}
$(code).addClass('language-perl');});$(".content pre > code").each(function(index,code){var pre=$(code).parent();var config={'gutter':false,'toolbar':false,'quick-code':false,'tab-size':8};if(code.className){var res=code.className.match(/(?:\s|^)language-(\S+)/);if(res){config.brush=res[1];}}
if(!config.brush){return;}
if(pre.hasClass('line-numbers')){config.gutter=true;}
var first_line=pre.attr('data-start');if(first_line){config['first-line']=first_line;}
var lines=pre.attr('data-line');if(lines){config.highlight=parseLines(lines);}
var html=$(code).html();if(html.match(/^ *\n/)){$(code).html("\n "+html);}
SyntaxHighlighter.highlight(config,code);var pod_lines=pre.attr('data-pod-lines');if(pod_lines){var pods=findLines(pre,pod_lines);pods.addClass('pod-line');if(pods.filter('.highlighted').length){$('.pod-toggle').removeClass('pod-hidden');}
pods.each(function(i,line){var $line=$(line);var prev=$line.prev();if(!prev.length||!prev.hasClass('pod-line')){if($line.parent('.gutter').length){$line.before('<div class="pod-placeholder">&mdash;</div>');}
else{var lines=$line.nextUntil(':not(.pod-line)').length+1;$line.before('<div class="pod-placeholder"><button onclick="togglePod()" class="btn-link"><span class="hide-pod">Hide</span><span class="show-pod">Show</span> '+lines+' line'+(lines>1?'s':'')+' of Pod</button></div>');}}});}});if(source.length){source.find('.syntaxhighlighter .gutter .line').each(function(i,el){var line=$(el);var res;if(res=line.attr('class').match(/(^|\s)number(\d+)(\s|$)/)){var linenr=res[2];var id='L'+linenr;line.contents().wrap('<a href="#'+id+'" id="'+id+'"></a>');var link=line.children('a');link.click(function(e){if(e.metaKey){return false;}
e.preventDefault();var line=linenr;if(e.shiftKey&&source.attr('data-line')){var startLine=parseLines(source.attr('data-line'))[0];line=startLine<line?startLine+'-'+line:line+'-'+startLine;}
link.removeAttr('id');document.location.hash='#L'+line;link.attr('id',id);source.attr('data-line',line);});}});var res;if(res=document.location.hash.match(/^(#L\d+)(-|,|$)/)){var el=$(res[1]);$('html, body').scrollTop(el.offset().top);}
$(window).on('hashchange',function(){var lineMatch;if(lineMatch=document.location.hash.match(hashLines)){source.attr('data-line',lineMatch[1]);source.find('.highlighted').removeClass('highlighted');var lines=findLines(source,lineMatch[1]);lines.addClass('highlighted');if(lines.filter('.pod-line').length){$('.pod-toggle').removeClass('pod-hidden');$(window).scrollTop($(lines[0]).offset().top);}}});}});function togglePod(){var scrollTop=$(window).scrollTop();var topLine;var topOffset;$('.syntaxhighlighter .line').each(function(i,el){var line=$(el);if(line.hasClass('pod-line')){return;}
else if($(el).offset().top<scrollTop){topLine=line;}});if(topLine){topOffset=topLine.offset().top-scrollTop;}
$('.pod-toggle').toggleClass('pod-hidden');if(topLine){$(window).scrollTop(topLine.offset().top-topOffset);}}
/* need to automatize assets: auto minimize & merge js + update/bump the release version (/name) */
function doGrepping() { $('#firstcontainer').fadeOut(); $('#overlay').fadeIn(1200); return true; }
function setupDefaultIgnoreList() {
    var default_list = "inc/*, local/*, t/*, *.md, *.json, *.ya?ml, *.conf, cpanfile*, LICENSE, MANIFEST, INSTALL, Changes, Makefile.PL, Build.PL, Copying, *.SKIP, *.ini, README";
    var ignore = document.getElementById('ignore-files-input');

    if ( ignore.value == default_list ) {
       ignore.value = "";
     } else {
        ignore.value = default_list;
    }
  }