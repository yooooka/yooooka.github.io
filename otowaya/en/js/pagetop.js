/*______________________________________

  Mizuyari JavaScript Lib. (LE) #070227
  
  Copyright (C) 1999-2006 Mizuyari All rights reserved.
  Script written by Mahiro Komura <mahirok@mizuyari.jp>
  http://mizuyari.jp/
______________________________________*/

var trace = (window.console) ? window.console.log : alert;

function MizuyariObject() { // MizuyariObject #061101
 var self = arguments.callee;
 var d  = document;
 var ua = navigator.userAgent;
 this.ua = {};
 this.ua.isMac     = ua.match(/Mac/);
 this.ua.isWin     = ua.match(/Win/);
 this.ua.isSafari  = ua.match(/AppleWebKit/);
 this.ua.isGecko   = ua.match(/Gecko\//);
 this.ua.isOpera   = window.opera;
 this.ua.isNN4     = d.layers;
 this.ua.isWinIE   = (this.ua.isWin && ua.match(/MSIE /) && !this.ua.isOpera);
 this.ua.isWinIE70 = (this.ua.isWinIE && ua.match(/MSIE 7\.0/));
 this.ua.isWinIE60 = (this.ua.isWinIE && ua.match(/MSIE 6\.0/));
 this.ua.isWinIE55 = (this.ua.isWinIE && ua.match(/MSIE 5\.5/));
 this.ua.isWinIE50 = (this.ua.isWinIE && ua.match(/MSIE 5\.0/));
 this.ua.isWinIE40 = (this.ua.isWinIE && ua.match(/MSIE 4\.0/));
 this.ua.isMacIE   = (this.ua.isMac && ua.match(/MSIE /) && !this.ua.isOpera);
 this.ua.isMacIE5  = (this.ua.isMacIE && ua.match(/MSIE 5\./));
 this.ua.isMacIE4  = (this.ua.isMacIE && ua.match(/MSIE 4\./));
 this.mizInitFlag  = false;
 if (self._instance == null) self._instance = this;
 return self._instance;
}

MizuyariObject.prototype = {
getFlashVersion : function () { // getFlashVersion #070219
 var mimeType = "application/x-shockwave-flash";
 var hasPlugin = (navigator.mimeTypes && navigator.mimeTypes[mimeType]) ? navigator.mimeTypes[mimeType].enabledPlugin : 0;
 var pluginVersion = -1;
 if (hasPlugin) {
  var words = navigator.plugins["Shockwave Flash"].description.split(" ");
  for (var i = 0; i < words.length; ++i) {
   if (isNaN(parseInt(words[i]))) continue;
   pluginVersion = words[i]; 
  }
 } else if (this.ua.isWinIE) {
  var pluginVersion = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").FlashVersion();
  pluginVersion = Math.floor(pluginVersion / 0x10000);
 }
 return pluginVersion;
},

addEvent : function (obj, type, event) {
 if(obj.addEventListener) {
  obj.addEventListener(type, event, false);
 } else if(obj.attachEvent) {
  obj.attachEvent('on'+type, event);
 } else {
  obj['on'+type] = event;
 }
},

addOnLoadEvent : function (event) {
 this.addEvent(window, "load", event);
}

};

var UA  = navigator.userAgent;
var Mac = navigator.appVersion.indexOf('Mac',0) != -1;
var Win = navigator.appVersion.indexOf('Win',0) != -1;
var IE  = navigator.appName.indexOf("Microsoft Internet Explorer",0) != -1;
var NN  = navigator.appName.indexOf("Netscape",0) != -1;
var NN4 = document.layers;
var Moz = UA.indexOf("Gecko/") != -1;
var Opera  = window.opera;
var Opera8 = navigator.userAgent.indexOf("Opera 8") != -1;
var Opera7 = navigator.userAgent.indexOf("Opera 7") != -1;
var Opera6 = navigator.userAgent.indexOf("Opera 6") != -1;
var Safari = UA.indexOf("Safari") != -1;
var Vmajor = parseInt(navigator.appVersion); // ex. 3
var Vminor = parseFloat(navigator.appVersion); // ex. 3.01
var WinIE7 = ((Win && navigator.appVersion.indexOf('MSIE 7.',0) != -1));
var WinIE6 = ((Win && navigator.appVersion.indexOf('MSIE 6.',0) != -1));
var WinIE55 = ((Win && navigator.appVersion.indexOf('MSIE 5.5',0) != -1));
var WinIE50 = ((Win && navigator.appVersion.indexOf('MSIE 5.0',0) != -1));
var MacIE  = ((Mac && navigator.appVersion.indexOf('MSIE',0) != -1));
var MacIE5 = ((Mac && navigator.appVersion.indexOf('MSIE 5.',0) != -1));
var MacIE4 = ((Mac && navigator.appVersion.indexOf('MSIE 4.',0) != -1));
var MacIE3 = ((Mac && navigator.appVersion.indexOf('MSIE 3.',0) != -1));
var iCab = (navigator.userAgent.indexOf("iCab",0) != -1);

function preloadImg(src) {
 if (document.images && src) (new Image()).src = src;
}

function preloadImgs(srcs) {
 if (document.images && srcs) {
  for (i=0; i<srcs.length; i++) preloadImg(srcs[i]);
 }
}

function openWindow(url,title,options) {
 var newWin;
 if (!!window && url) {
  if (!title) title = "_blank";
  if (!options) {
   options = "toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,favorites=yes";
  }
  newWin = window.open(url,title,options);
  if (!WinIE55) newWin.focus();
 }
}

function isEnableCloseThisWindow() { // isEnableCloseThisWindow #061015
 if (!(UA.indexOf("Gecko/") != -1) && !(UA.indexOf("Safari") != -1)) return true;
 if (!window.opener) return false;
 return true;
}

function win_closed(winVar) {
// ref. the Original Code: http://game.gr.jp/js-ml/samples/200102/openerTest.html
 var ua = navigator.userAgent
 if( !!winVar )
  if( ( ua.indexOf('Gecko')!=-1 || ua.indexOf('MSIE 4')!=-1 )
     && ua.indexOf('Win')!=-1 ) 
     return winVar.closed
  else return typeof winVar.document  != 'object'
 else return true
}

function setHRefTarget(url) { // setHRefTarget #061107
 var w = window;
 var wo = w.opener;
 if (win_closed(wo)) {
  location.href = url;
 } else {
  if (url != wo.location.href) wo.location.href = url;
  wo.focus();
 }
}

function mizSwapImgs() { // mizSwapImgs #060622
 if(!document.getElementById) return;
 if(!document.images) return;
 var tClassName = "swapImg";
 var preImgs = new Array();
 var imgElmt = document.getElementsByTagName("IMG");
 for (j=0; j<imgElmt.length; j++) {
  var strClassAttr = imgElmt[j].className.split(" ").toString();
  if (strClassAttr.indexOf(tClassName) != -1) {
   var tmpArr = preImgs;
   var tmpElmt = imgElmt[j];
   var defaultSrc = "" + tmpElmt.src;
   var fileExt = defaultSrc.substring(defaultSrc.lastIndexOf('.'));
   var fileName = defaultSrc.substring(0,defaultSrc.length - fileExt.length);
   var idPrefix = "mizImg";
   if (!tmpElmt.id) tmpElmt.id = idPrefix + "_" + j;
   tmpElmt.stayFlag = (strClassAttr.indexOf("stay") != -1) ? true : false;
   tmpElmt.up = defaultSrc;
   tmpElmt.over = fileName + "_o" + fileExt;
   if (preImgs.toString().indexOf(tmpElmt.over) == -1) preImgs[preImgs.length] = tmpElmt.over;
   var parentElmt = tmpElmt.parentNode;
   // if (parentElmt.tagName=="A") {
    tmpElmt.targetId = tmpElmt.id;
    tmpElmt.focusImg = tmpElmt.over;
    tmpElmt.blurImg = (!tmpElmt.stayFlag) ? tmpElmt.up : tmpElmt.over;
    tmpElmt.onfocus = tmpElmt.onmouseover = function() { document.getElementById(this.targetId).src = this.focusImg; }
    tmpElmt.onblur = tmpElmt.onmouseout = function() { document.getElementById(this.targetId).src = this.blurImg; }
   // }
  }
 }
 var inputElmt = document.getElementsByTagName("INPUT");
 for (j=0; j<inputElmt.length; j++) {
  if (inputElmt[j].type.toLowerCase() != "image") continue;
  var strClassAttr = inputElmt[j].className.split(" ").toString();
  if (strClassAttr.indexOf(tClassName) != -1) {
   var tmpArr = preImgs;
   var tmpElmt = inputElmt[j];
   var defaultSrc = "" + tmpElmt.src;
   var fileExt = defaultSrc.substring(defaultSrc.lastIndexOf('.'));
   var fileName = defaultSrc.substring(0,defaultSrc.length - fileExt.length);
   var idPrefix = "mizInput";
   if (!tmpElmt.id) tmpElmt.id = idPrefix + "_" + j;
   tmpElmt.stayFlag = (strClassAttr.indexOf("stay") != -1) ? true : false;
   tmpElmt.up = defaultSrc;
   tmpElmt.over = fileName + "_o" + fileExt;
   if (preImgs.toString().indexOf(tmpElmt.over) == -1) preImgs[preImgs.length] = tmpElmt.over;
    tmpElmt.targetId = tmpElmt.id;
    tmpElmt.focusImg = tmpElmt.over;
    tmpElmt.blurImg = (!tmpElmt.stayFlag) ? tmpElmt.up : tmpElmt.over;
    tmpElmt.onfocus = tmpElmt.onmouseover = function() { this.src = this.focusImg; }
    tmpElmt.onblur = tmpElmt.onmouseout = function() { this.src = this.blurImg; }
  }
 }
 preloadImgs(preImgs);
}

var pageScrollTimer;
function pageScroll(id,toX,toY,frms,cuX,cuY) { // pageScroll #070202
 if (pageScrollTimer) clearTimeout(pageScrollTimer);
 if (!toX || toX < 0) toX = 0;
 if (!toY || toY < 0) toY = 0;
 if (!cuX) cuX = getPageXOffset();
 if (!cuY) cuY = getPageYOffset();
 if (!frms) frms = 6;
 cuX += (toX - getPageXOffset()) / frms; if (cuX < 0) cuX = 0;
 cuY += (toY - getPageYOffset()) / frms; if (cuY < 0) cuY = 0;
 var posX = Math.floor(cuX);
 var posY = Math.floor(cuY);
 window.scrollTo(posX, posY);
 if (posX != toX || posY != toY) {
  pageScrollTimer = setTimeout("pageScroll('"+id+"',"+toX+","+toY+","+frms+","+cuX+","+cuY+")",16);
 } else {
  if (!WinIE7) location.hash = id;
 }
}

function mizScrollApp(id) { // mizScrollApp #070202
 var toX, toY;
 toX = 0;
 if (!MacIE && !NN && window.scrollTo || NN && (Vminor >= 4.75) && window.scrollTo) {
  toY = getElementOffsetTopById(id);
  var HTMLScrollHeight = getHTMLScrollHeight();
  var windowInnerHeight = getWindowInnerHeight();
  if (toY > (HTMLScrollHeight - windowInnerHeight)) {
   toY = HTMLScrollHeight - (windowInnerHeight);
  }
  if (toY == getPageYOffset() || HTMLScrollHeight == windowInnerHeight) return;
  pageScroll(id,toX,toY,6);
 } else {
  location.hash = id;
 }
}

function jumpToPageTop() { // jumpToPageTop #060817
 var id = "page-top"
 if (!MacIE3 && !MacIE4 && !NN && window.scrollTo || NN && (Vminor >= 4.75) && window.scrollTo) {
  pageScroll(id,0,0,5);
 } else {
  location.hash = id;
 }
}

function getPageXOffset() { // getPageXOffset #060524
 if (window.pageXOffset) {
  return window.pageXOffset;
 } else if (document.compatMode == "CSS1Compat") {
  return document.documentElement.scrollLeft;
 } else if (document.body.scrollLeft) { // for IE
  return document.body.scrollLeft;
 } else {
  return 0;
 }
}

function getPageYOffset() { // getPageYOffset #060524
 if (window.pageYOffset) {
  return window.pageYOffset;
 } else if (document.compatMode == "CSS1Compat") {
  return parseInt(document.documentElement.scrollTop);
 } else if (document.body.scrollTop) { // for IE
  return parseInt(document.body.scrollTop);
 } else {
  return 0;
 }
}

function getElementOffsetTopById(id) { // getElementOffsetTopById #060524
 if (!mizInitFlag) return;
 id = String(id);
 var element = document.getElementById(id);
 return getElementOffsetTop(element);
}

function getElementOffsetTop(element) { // getElementOffsetTop #070201
 if (!mizInitFlag) return;
 var _tempElement = element;
 var _tempOffsetTop = null;
 this._totalOffsetTop = 0;
 this._log = '';
 this._debug = false;
 this._bench = undefined;
 if (this._debug) { this._bench = new mizFuncBench; this._bench.begin(); }
 while (_tempElement.offsetParent != undefined) {
  _tempOffsetTop = !isNaN(_tempElement.offsetTop) ? parseInt(_tempElement.offsetTop) : 0;
  if (this._debug) this._log = "/" + _tempElement.tagName + '#' + _tempElement.id + '(' + _tempOffsetTop + ')' + this._log;
  this._totalOffsetTop += _tempOffsetTop;
  // if (Win && IE) break;
  _tempElement = _tempElement.offsetParent;
 }
 if (this._debug) this._log = this._log + '(total:' + this._totalOffsetTop + ',' + this._bench.finish() + 'ms)';
 return this._totalOffsetTop;
 // return this._log;
}

function getWindowInnerWidth() { // getWindowInnerWidth #061107
 if(window.innerWidth) {
  return window.innerWidth;
 } else if(document.compatMode == "CSS1Compat") {
  return document.body.parentNode.clientWidth;
 } else if (document.body.clientWidth) {
  return document.body.clientWidth;
 } else {
  return 0;
 }
}

function getWindowInnerHeight() { // getWindowInnerHeight #060524
 if(window.innerHeight) {
  return window.innerHeight;
 } else if(document.compatMode == "CSS1Compat") {
  return document.body.parentNode.clientHeight;
 } else if (document.body.clientHeight) {
  return document.body.clientHeight;
 } else {
  return 0;
 }
}

function getHTMLScrollWidth() { // getHTMLScrollHeight #070202
 return document.getElementsByTagName('html')[0].scrollWidth;
}
function getHTMLScrollHeight() { // getHTMLScrollHeight #070131
 return document.getElementsByTagName('html')[0].scrollHeight;
}



// ========== debug ==========

function mizFuncBench() { // mizFuncBench #060524
 this._start  = null;
 this._end    = null;
}
mizFuncBench.prototype.begin = function () {
 this._start = (new Date()).getTime();
}
mizFuncBench.prototype.finish = function () {
 if (this._start == null) return false;
 this._end = (new Date()).getTime();
 return eval((this._end - this._start));
}

// ========== extend: Date Object ==========

Date.prototype.isLeapYear = function() {
 var year = this.getFullYear();
 return ((year%4 == 0) && (year%100 != 0) || (year%400 == 0)) ? true : false;
}

Date.prototype.getMonthDays = function() {
 var monthDays = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
 if (this.isLeapYear()) monthDays[1] = 29;
 return monthDays[this.getMonth()];
}

// ref. the Original Code: http://www.tagindex.com/kakolog/q4bbs/201/422.html

// Function#apply
if ('undefined' == typeof Function.prototype.apply)
 Function.prototype.apply = function (thisObj, argArray) {
 var result;
 var tmpObj = (null == thisObj) ? window : thisObj;
 var tmpArg = Array.prototype.slice (arguments, 0).toString ();
        
 tmpObj._$method = this;
 result = eval ('tmpObj._$method (' + tmpArg + ')');
 delete tmpObj._$method;
        
 return result;
}
// Function#call
if ('undefined' == typeof Function.prototype.call)
 Function.prototype.call = function (thisObj) {
 return Function.prototype.apply (thisObj, Array.prototype.slice (arguments, 1));
}

// ========== init ==========

var mizuyari = new MizuyariObject();
var mizInitFlag = mizuyari.mizInitFlag;

function mizInit() { // mizInit #061109
 if (!mizInitFlag) mizSwapImgs();
 mizInitFlag = true;
}
mizuyari.addOnLoadEvent(mizInit);

// We are going to be doing "mizuyari" today again.
