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

// Define our own namespace
var MetaCPANGrep = {
  // Shared default ignore list
  defaultIgnoreList: "*.PL, /t/*, ppport.h, META.*, /inc/*, /local/*, *.md, *.json, *.ya?ml, *.conf, cpanfile*, LICENSE, MANIFEST*, INSTALL, Changes, Copying, *.SKIP, *.ini, README, *.xml, *.js, .git*",
  defaultFilterList: "*.pm, *.t",

  homepageSetup: function() {
    // On the HomePage always precheck the default values
    // MetaCPANGrep.setupIgnoreList();
    // MetaCPANGrep.updateIgnoreListCheckbox();
    $('#qft').val(MetaCPANGrep.defaultFilterList);
    $('#ignore-files-input').attr('placeholder', this.defaultIgnoreList);
  },

  // Function to toggle the ignore list between default value and empty
  setupIgnoreList: function() {
    var ignoreInput = $('#ignore-files-input');

    if (this.isDefaultIgnoreList(ignoreInput.val())) {
      ignoreInput.val("");
    } else {
      ignoreInput.val(this.defaultIgnoreList);
    }
  },

  updateIgnoreListCheckbox: function() {
    var ignoreInput = $('#ignore-files-input');
    var useDefaultCheckbox = $('#ci-default-excludes');

    // Update checkbox state based on whether input matches default
    useDefaultCheckbox.prop('checked', this.isDefaultIgnoreList(ignoreInput.val()));
  },

  isDefaultIgnoreList: function(currentValue) {
    return currentValue === this.defaultIgnoreList;
  },

  // List of selectors (IDs or classes) for input fields
  inputSelectors: [
      '#ignore-files-input',
      '#only-files-input',
      '#search-input',
      '#qft',
      '#qd',
      '#qifl',
    ],

  globalSetup: function() {
    this.inputSelectors.forEach(function (selector) {
      if ( $(selector) === undefined ) return;
      $(selector).attr({
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        spellcheck: 'false'
      });
    });
    $('#qft').attr('placeholder', this.defaultFilterList);
  },
};

// Add an event listener to the ignore input
$(document).ready(function() {

  MetaCPANGrep.globalSetup();

  // Set up initial state
  MetaCPANGrep.updateIgnoreListCheckbox();

  // Listen for changes on the ignore input
  $('#ignore-files-input').on('input change', function() {
    MetaCPANGrep.updateIgnoreListCheckbox();
  });

  // Also connect the checkbox to update the text field
  $('#ci-default-excludes').on('change', function() {
    if ($(this).prop('checked')) {
      $('#ignore-files-input').val(MetaCPANGrep.defaultIgnoreList);
    } else {
      $('#ignore-files-input').val('');
    }
  });
});