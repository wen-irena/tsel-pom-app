"use strict";define(["require","ojL10n!ojtranslations/nls/ojtranslations","promise"],function(require,e,t){t.polyfill();var n={};"undefined"!=typeof window?n=window:"undefined"!=typeof self&&(n=self);var o=n.oj,r=n.oj={version:"5.1.0",revision:"2018-06-06_15-03-03",noConflict:function(){n.oj=o}};r.Logger={},r.Logger.LEVEL_NONE=0,r.Logger.LEVEL_ERROR=1,r.Logger.LEVEL_WARN=2,r.Logger.LEVEL_INFO=3,r.Logger.LEVEL_LOG=4,r.Logger._METHOD_ERROR="error",r.Logger._METHOD_WARN="warn",r.Logger._METHOD_INFO="info",r.Logger._METHOD_LOG="log",r.Logger._defaultOptions={level:r.Logger.LEVEL_ERROR,writer:null},r.Logger._options=r.Logger._defaultOptions,r.Logger.error=function(e){r.Logger._write(r.Logger.LEVEL_ERROR,r.Logger._METHOD_ERROR,arguments)},r.Logger.info=function(e){r.Logger._write(r.Logger.LEVEL_INFO,r.Logger._METHOD_INFO,arguments)},r.Logger.warn=function(e){r.Logger._write(r.Logger.LEVEL_WARN,r.Logger._METHOD_WARN,arguments)},r.Logger.log=function(e){r.Logger._write(r.Logger.LEVEL_LOG,r.Logger._METHOD_LOG,arguments)},r.Logger.option=function(e,t){var n,o={};if(0==arguments.length){for(n in r.Logger._options)r.Logger._options.hasOwnProperty(n)&&(o[n]=r.Logger._options[n]);return o}if("string"==typeof e&&void 0===t)return void 0===r.Logger._options[e]?null:r.Logger._options[e];if("string"==typeof e)r.Logger._options[e]=t;else{var s=e;for(n in s)s.hasOwnProperty(n)&&r.Logger.option(n,s[n])}},r.Logger._write=function(e,t,n){if(!(r.Logger.option("level")<e)){var o=r.Logger._getWriter();if(null!=o){if(1==n.length&&n[0]instanceof Function)n=[n[0]()];o[t]&&o[t].apply?o[t].apply(o,n):o[t]&&(o[t]=Function.prototype.bind.call(o[t],o),r.Logger._write(e,t,n))}}},r.Logger._getWriter=function(){var e=null;return r.Logger.option("writer")?e=r.Logger.option("writer"):"undefined"!=typeof window&&void 0!==window.console&&(e=window.console),e},r.Logger._validateOption=function(e){return void 0!==r.Logger._defaultOptions[e]};var s=n.__ojCheckpointManager;r.CHECKPOINT_MANAGER={},r.CHECKPOINT_MANAGER.startCheckpoint=function(e,t){s&&s.startCheckpoint(e,t)},r.CHECKPOINT_MANAGER.endCheckpoint=function(e){s&&s.endCheckpoint(e)},r.CHECKPOINT_MANAGER.getRecord=function(e){return s?s.getRecord(e):void 0},r.CHECKPOINT_MANAGER.matchRecords=function(e){return s?s.matchRecords(e):[]},r.CHECKPOINT_MANAGER.dump=function(e){r.Logger.info(function(){for(var t="Checkpoint Records:",n=r.CHECKPOINT_MANAGER.matchRecords(e),o=0;o<n.length;o++){var s=n[o];t=t+"\n"+s.name;var i=s.description;null!=i&&(t=t+" ("+i+")"),t=(t+=":\n")+"start: "+s.start+"\tduration: "+s.duration}return t})},r.Object=function(){this.Init()},r.Object.superclass=null,r.Object._typeName="oj.Object",r.Object._GET_FUNCTION_NAME_REGEXP=/function\s+([\w\$][\w\$\d]*)\s*\(/,r.Object.prototype={},r.Object.prototype.constructor=r.Object,r.Object.createSubclass=function(e,t,n){r.Assert.assertFunction(e),r.Assert.assertFunctionOrNull(t),r.Assert.assertStringOrNull(n),void 0===t&&(t=r.Object),r.Assert.assert(e!==t,"Class can't extend itself");var o=r.Object._tempSubclassConstructor;o.prototype=t.prototype,e.prototype=new o,e.prototype.constructor=e,e.superclass=e.superclass=t.prototype,n&&(e._typeName=n)},r.Object.copyPropertiesForClass=function(e,t){var n;for(n in r.Assert.assertFunction(e),r.Assert.assert(null!=t,"source object cannot be null"),t)t.hasOwnProperty(n)&&(e.prototype[n]=t[n])},r.Object._tempSubclassConstructor=function(){},r.Object.prototype.getClass=function(e){if(void 0===e)e=this;else if(null===e)return null;return e.constructor},r.Object.prototype.clone=function(){var e=new this.constructor;return r.CollectionUtils.copyInto(e,this),e},r.Object.prototype.toString=function(){return this.toDebugString()},r.Object.prototype.toDebugString=function(){return this.getTypeName()+" Object"},r.Object.getTypeName=function(e){r.Assert.assertFunction(e);var t,n,o=e._typeName;return null==o&&(t=e.toString(),o=(n=r.Object._GET_FUNCTION_NAME_REGEXP.exec(t))?n[1]:"anonymous",e._typeName=o),o},r.Object.prototype.getTypeName=function(){return r.Object.getTypeName(this.constructor)},r.Object.prototype.Init=function(){r.Assert.isDebug()&&r.Assert.assert(this.getTypeName,"Not an oj.Object");var e=this.constructor;e._initialized||r.Object._initClasses(e)},r.Object.ensureClassInitialization=function(e){r.Assert.assertFunction(e),e._initialized||r.Object._initClasses(e)},r.Object.prototype.equals=function(e){return this===e},r.Object.createCallback=function(e,t){return r.Assert.assertFunction(t),t.bind(e)},r.Object._initClasses=function(e){r.Assert.isDebug()&&(r.Assert.assertFunction(e),r.Assert.assert(!e._initialized)),e._initialized=!0;var t,n,o=e.superclass;o&&(t=o.constructor)&&!t._initialized&&r.Object._initClasses(t),(n=e.InitClass)&&n.call(e)},r.Object.compareValues=function(e,t){if(e===t)return!0;if(typeof e!==typeof t)return!1;if(null===e||null===t)return!1;if(e.constructor===t.constructor){if(Array.isArray(e))return r.Object._compareArrayValues(e,t);if(e.constructor===Object)return r.Object.__innerEquals(e,t);if(e.valueOf&&"function"==typeof e.valueOf)return e.valueOf()===t.valueOf()}return!1},r.Object._compareArrayValues=function(e,t){if(e.length!==t.length)return!1;for(var n=0,o=e.length;n<o;n++)if(!r.Object.compareValues(e[n],t[n]))return!1;return!0},r.Object._compareIdIndexObject=function(e,t){if("number"==typeof e&&"number"==typeof t||"string"==typeof e&&"string"==typeof t)return e==t;if("object"==typeof e&&"object"==typeof t){if(e.id&&t.id)return e.id==t.id&&(!e.index||!t.index||e.index==t.index);if(e.index&&t.index)return e.index==t.index}return!1},r.Object._compareArrayIdIndexObject=function(e,t){if(!e)return!t||0==t.length;if(!t)return!e||0==e.length;if(e.length!=t.length)return!1;for(var n=0;n<e.length;n++){for(var o=!1,s=0;s<t.length;s++)if(r.Object._compareIdIndexObject(e[n],t[s])){o=!0;break}if(!o)return!1}return!0},r.Object.__innerEquals=function(e,t){var n,o=!1;if(e===t)return!0;if(!(e instanceof Object&&t instanceof Object))return!1;if(e.constructor!==t.constructor)return!1;for(n in e)if(o||(o=!0),e.hasOwnProperty(n)){if(!t.hasOwnProperty(n))return!1;if(e[n]!==t[n]){if("object"!=typeof e[n])return!1;if(!r.Object.__innerEquals(e[n],t[n]))return!1}}for(n in t)if(o||(o=!0),t.hasOwnProperty(n)&&!e.hasOwnProperty(n))return!1;return!!o||JSON.stringify(e)===JSON.stringify(t)},r.Object.isEmpty=function(e){var t;if(void 0===e||null===e)return!0;for(t in e)if(e.hasOwnProperty(t))return!1;return!0},r.__isAmdLoaderPresent=function(){return"function"==typeof define&&define.amd},r.Assert={};r.Assert.forceDebug=function(){r.Assert.DEBUG=!0},r.Assert.clearDebug=function(){r.Assert.DEBUG=!1},r.Assert.isDebug=function(){return 1==r.Assert.DEBUG},r.Assert.assert=function(e,t){if(r.Assert.DEBUG&&!e){var n,o=t||"";if(arguments.length>2){for(o+="(",n=2;n<arguments.length;n+=1)o+=arguments[n];o+=")"}r.Assert.assertionFailed(o,1)}},r.Assert.failedInAbstractFunction=function(){r.Assert.DEBUG&&r.Assert.assertionFailed("Abstract function called",1)},r.Assert.assertPrototype=function(e,t,n){var o;r.Assert.DEBUG&&(null!=e?(r.Assert.assertType(t,"function",null,1,!1),(o=t.prototype).isPrototypeOf(e)||r.Assert.assertionFailed("object '"+e+"' doesn't match prototype "+o,1,n)):r.Assert.assertionFailed("null object doesn't match prototype "+o,1,n))},r.Assert.assertPrototypeOrNull=function(e,t,n){var o;r.Assert.DEBUG&&null!=e&&(null!=e?(r.Assert.assertType(t,"function",null,1,!1),(o=t.prototype).isPrototypeOf(e)||r.Assert.assertionFailed("object '"+e+"' doesn't match prototype "+o,1,n)):r.Assert.assertionFailed("null object doesn't match prototype "+o,1,n))},r.Assert.assertPrototypes=function(e,t,n,o){if(r.Assert.DEBUG){var s=t.prototype,i=n.prototype;s.isPrototypeOf(e)||i.isPrototypeOf(e)||r.Assert.assertionFailed("object '"+e+"' doesn't match prototype "+s+" or "+i,1,o)}},r.Assert.assertDomNodeOrNull=function(e,t){r.Assert.DEBUG&&e&&void 0===e.nodeType&&r.Assert.assertionFailed(e+" is not a DOM Node",t+1)},r.Assert.assertDomNode=function(e,t){r.Assert.DEBUG&&(e&&void 0!==e.nodeType||r.Assert.assertionFailed(e+" is not a DOM Node",t+1))},r.Assert.assertDomElement=function(e,t){r.Assert.DEBUG&&(r.Assert.assertDomNode(e,1),1!==e.nodeType?r.Assert.assertionFailed(e+" is not a DOM Element",1):t&&e.nodeName!==t&&r.Assert.assertionFailed(e+" is not a "+t+" Element",1))},r.Assert.assertDomElementOrNull=function(e,t){r.Assert.DEBUG&&null!=e&&(r.Assert.assertDomNode(e,1),1!==e.nodeType?r.Assert.assertionFailed(e+" is not a DOM Element",1):t&&e.nodeName!==t&&r.Assert.assertionFailed(e+" is not a "+t+" Element",1))},r.Assert.assertType=function(e,t,n,o,s){var i;r.Assert.DEBUG&&(null==e&&s||typeof e===t||(i=e+" is not of type "+t,n&&(i=n+i),o||(o=0),r.Assert.assertionFailed(i,o+1)))},r.Assert.assertObject=function(e,t){r.Assert.DEBUG&&r.Assert.assertType(e,"object",t,1,!1)},r.Assert.assertObjectOrNull=function(e,t){r.Assert.DEBUG&&r.Assert.assertType(e,"object",t,1,!0)},r.Assert.assertNonEmptyString=function(e,t){r.Assert.DEBUG&&(r.Assert.assertType(e,"string",t,1,!1),r.Assert.assert(e.length>0,"empty string"))},r.Assert.assertString=function(e,t){r.Assert.DEBUG&&r.Assert.assertType(e,"string",t,1,!1)},r.Assert.assertStringOrNull=function(e,t){r.Assert.DEBUG&&r.Assert.assertType(e,"string",t,1,!0)},r.Assert.assertFunction=function(e,t){r.Assert.DEBUG&&r.Assert.assertType(e,"function",t,1,!1)},r.Assert.assertFunctionOrNull=function(e,t){r.Assert.DEBUG&&r.Assert.assertType(e,"function",t,1,!0)},r.Assert.assertBoolean=function(e,t){r.Assert.DEBUG&&r.Assert.assertType(e,"boolean",t,1,!1)},r.Assert.assertNumber=function(e,t){r.Assert.DEBUG&&r.Assert.assertType(e,"number",t,1,!1)},r.Assert.assertNumberOrNull=function(e,t){r.Assert.DEBUG&&r.Assert.assertType(e,"number",t,1,!0)},r.Assert.assertArray=function(e,t){r.Assert.DEBUG&&(Array.isArray(e)||(void 0===t&&(t=e+" is not an array"),r.Assert.assertionFailed(t,1)))},r.Assert.assertArrayOrNull=function(e,t){r.Assert.DEBUG&&null!=e&&(Array.isArray(e)||(void 0===t&&(t=e+" is not an array"),r.Assert.assertionFailed(t,1)))},r.Assert.assertNonNumeric=function(e,t){r.Assert.DEBUG&&(isNaN(e)||(void 0===t&&(t=e+" is convertible to a number"),r.Assert.assertionFailed(t,1)))},r.Assert.assertNumeric=function(e,t){r.Assert.DEBUG&&isNaN(e)&&(void 0===t&&(t=e+" is not convertible to a number"),r.Assert.assertionFailed(t,1))},r.Assert.assertInSet=function(e,t,n){var o,s;if(null==e||void 0===t[e.toString()]){if(void 0===n){for(s in o=" is not in set: {",t)t.hasOwnProperty(s)&&(o+=s,o+=",");n=e+(o+="}")}r.Assert.assertionFailed(n,1)}},r.Assert.assertionFailed=function(e,t,n){t||(t=0);var o="Assertion";throw n&&(o+=" ("+n+")"),o+=" failed: ",void 0!==e&&(o+=e),new Error(o)};var i,a=n.__oj_Assert_DEBUG;function l(){}return void 0!==a&&(r.Assert.DEBUG=a),r.EventSource=function(){this.Init()},r.Object.createSubclass(r.EventSource,r.Object,"oj.EventSource"),r.EventSource.prototype.Init=function(){this._eventHandlers=[],r.EventSource.superclass.Init.call(this)},r.EventSource.prototype.on=function(e,t){var n,o=!1;for(n=0;n<this._eventHandlers.length;n++)if(this._eventHandlers[n].eventType==e&&this._eventHandlers[n].eventHandlerFunc==t){o=!0;break}o||this._eventHandlers.push({eventType:e,eventHandlerFunc:t})},r.EventSource.prototype.off=function(e,t){var n;for(n=this._eventHandlers.length-1;n>=0;n--)if(this._eventHandlers[n].eventType==e&&this._eventHandlers[n].eventHandlerFunc==t){this._eventHandlers.splice(n,1);break}},r.EventSource.prototype.handleEvent=function(e,t){var n;for(n=0;n<this._eventHandlers.length;n++){var o=this._eventHandlers[n];if(o.eventType==e&&!1===o.eventHandlerFunc.apply(this,Array.prototype.slice.call(arguments).slice(1)))return!1}return!0},r.Config={},r.Config.getDeviceType=function(){return r.AgentUtils.getAgentInfo().deviceType},r.Config.getLocale=function(){var t,n;return r.__isAmdLoaderPresent()?(r.Assert.assert(void 0!==e,"ojtranslations module must be defined"),"root"==(t=e._ojLocale_)?"en":t):(null==(n=r.Config._locale)&&((n=document.documentElement.lang)||(n=void 0===navigator?"en":(navigator.language||navigator.userLanguage||"en").toLowerCase()),r.Config._locale=n=n.toLowerCase()),n)},r.Config.setLocale=function(t,n){if(r.__isAmdLoaderPresent()){var o="ojL10n!ojtranslations/nls/",s=[o+t+"/ojtranslations"],i=0;if(r.LocaleData&&(s.push(o+t+"/localeElements"),r.TimezoneData)){var a=r.TimezoneData.__getBundleNames();i=a.length,a.forEach(function(e){s.push(o+t+e)})}require(s,function(t,o){e=t,o&&r.LocaleData.__updateBundle(o);for(var s=0;s<i;s++){var a=arguments[s+2];r.TimezoneData.__mergeIntoLocaleElements(a)}n&&n()})}else r.Config._locale=t,n&&n()},r.Config.getResourceUrl=function(e){var t;return null==e||/^\/|:/.test(e)?e:(t=r.Config._resourceBaseUrl)?t+("/"==t.charAt(t.length-1)?"":"/")+e:r.__isAmdLoaderPresent()?require.toUrl("ojs/_foo_").replace(/[^\/]*$/,"../"+e):e},r.Config.setResourceBaseUrl=function(e){r.Config._resourceBaseUrl=e},r.Config.setAutomationMode=function(e){r.Config._automationMode=e},r.Config.getAutomationMode=function(){return r.Config._automationMode},r.Config.getVersionInfo=function(){var e="Oracle JET Version: "+r.version+"\n";e+="Oracle JET Revision: "+r.revision+"\n";var t="undefined"!=typeof window;return t&&window.navigator&&(e+="Browser: "+window.navigator.userAgent+"\n",e+="Browser Platform: "+window.navigator.platform+"\n"),$&&($.fn&&(e+="jQuery Version: "+$.fn.jquery+"\n"),$.ui&&$.ui.version&&(e+="jQuery UI Version: "+$.ui.version+"\n")),r.ComponentBinding&&(e+="Knockout Version: "+r.ComponentBinding.__getKnockoutVersion()+"\n"),t&&window.require&&(e+="Require Version: "+window.require.version+"\n"),e},r.Config.logVersionInfo=function(){console.log(r.Config.getVersionInfo())},r.Config.__getTemplateEngine=function(){if(!r.Config._templateEnginePromise){if(!r.__isAmdLoaderPresent())throw"JET Temlate engine cannot be loaded with an AMD loader";r.Config._templateEnginePromise=new Promise(function(e,t){require(["./ojtemplateengine"],e,t)})}return r.Config._templateEnginePromise},function(){if("undefined"!=typeof window){var e;if(!((e=document.createEvent("Event")).initEvent("foo",!0,!0),e.preventDefault(),e.defaultPrevented)){var t=Event.prototype.preventDefault;Event.prototype.preventDefault=function(){this.cancelable&&(t.call(this),Object.defineProperty(this,"defaultPrevented",{get:function(){return!0},configurable:!0}))}}"function"!=typeof window.CustomEvent&&(n.prototype=window.Event.prototype,window.CustomEvent=n)}function n(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}}(),function(){var e,t;"undefined"!=typeof window&&!window.setImmediate&&window.postMessage&&(window.setImmediate=function(){var o=arguments[0],r=Array.prototype.slice.call(arguments,1);"function"!=typeof o&&(o=new Function(o.toString()));var s=(isNaN(t)&&(t=0),++t);return e||(e=new Map),e.set(s,{callback:o,args:r}),1===e.size&&window.addEventListener("message",n),window.postMessage({id:s,message:"oj-setImmeidate"},"*"),s},window.clearImmediate=o);function n(t){var n=t.data;if(n&&"oj-setImmeidate"===n.message){var r=n.id,s=e.get(r);if(o(r),s){var i=s.callback,a=s.args;i.apply(window,a)}}}function o(t){e&&(e.delete(t),e.size<1&&(window.removeEventListener("message",n),e=null))}}(),function(){if("undefined"!=typeof window&&!window.__extends){var e,t=this&&this.__extends||(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])},function(t,n){function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)});window.__extends=t}}(),"undefined"!=typeof window&&(window.Symbol?(window.Symbol.asyncIterator||(window.Symbol.asyncIterator="asyncIterator"),window.Symbol.iterator||(window.Symbol.iterator="iterator")):(window.Symbol={},window.Symbol.asyncIterator="asyncIterator",window.Symbol.iterator="iterator")),r.AgentUtils=function(){},r.AgentUtils.BROWSER={IE:"ie",FIREFOX:"firefox",SAFARI:"safari",CHROME:"chrome",EDGE:"edge",UNKNOWN:"unknown"},r.AgentUtils.ENGINE={TRIDENT:"trident",WEBKIT:"webkit",GECKO:"gecko",BLINK:"blink",EDGE_HTML:"edgehtml",UNKNOWN:"unknown"},r.AgentUtils.OS={WINDOWS:"Windows",SOLARIS:"Solaris",MAC:"Mac",UNKNOWN:"Unknown",ANDROID:"Android",IOS:"IOS",WINDOWSPHONE:"WindowsPhone",LINUX:"Linux"},r.AgentUtils.DEVICETYPE={PHONE:"phone",TABLET:"tablet",OTHERS:"others"},r.AgentUtils.getAgentInfo=function(e){r.StringUtils.isEmptyOrUndefined(e)&&(e=navigator.userAgent),e=e.toLowerCase();var t=r.StringUtils.hashCode(e),n=r.AgentUtils._currAgentInfo;if(n&&n.hashCode===t)return{os:n.os,browser:n.browser,browserVersion:n.browserVersion,deviceType:n.deviceType,engine:n.engine,engineVersion:n.engineVersion,hashCode:n.hashCode};var o=r.AgentUtils.OS.UNKNOWN,s=r.AgentUtils.BROWSER.UNKNOWN,i=0,a=r.AgentUtils.DEVICETYPE.OTHERS,l=r.AgentUtils.ENGINE.UNKNOWN,u=0;return e.indexOf("iphone")>-1||e.indexOf("ipad")>-1?o=r.AgentUtils.OS.IOS:e.indexOf("mac")>-1?o=r.AgentUtils.OS.MAC:e.indexOf("sunos")>-1?o=r.AgentUtils.OS.SOLARIS:e.indexOf("android")>-1?o=r.AgentUtils.OS.ANDROID:e.indexOf("linux")>-1?o=r.AgentUtils.OS.LINUX:e.indexOf("windows phone")>-1?o=r.AgentUtils.OS.WINDOWSPHONE:e.indexOf("win")>-1&&(o=r.AgentUtils.OS.WINDOWS),o==r.AgentUtils.OS.ANDROID?a=e.indexOf("mobile")>-1?r.AgentUtils.DEVICETYPE.PHONE:r.AgentUtils.DEVICETYPE.TABLET:o==r.AgentUtils.OS.IOS&&(a=e.indexOf("iphone")>-1?r.AgentUtils.DEVICETYPE.PHONE:r.AgentUtils.DEVICETYPE.TABLET),e.indexOf("msie")>-1?(s=r.AgentUtils.BROWSER.IE,i=r.AgentUtils._parseFloatVersion(e,/msie (\d+[.]\d+)/),e.indexOf("trident")&&(l=r.AgentUtils.ENGINE.TRIDENT,u=r.AgentUtils._parseFloatVersion(e,/trident\/(\d+[.]\d+)/))):e.indexOf("trident")>-1?(s=r.AgentUtils.BROWSER.IE,i=r.AgentUtils._parseFloatVersion(e,/rv:(\d+[.]\d+)/),e.indexOf("trident")&&(l=r.AgentUtils.ENGINE.TRIDENT,u=r.AgentUtils._parseFloatVersion(e,/trident\/(\d+[.]\d+)/))):e.indexOf("edge")>-1?(s=r.AgentUtils.BROWSER.EDGE,i=u=r.AgentUtils._parseFloatVersion(e,/edge\/(\d+[.]\d+)/),l=r.AgentUtils.ENGINE.EDGE_HTML):e.indexOf("chrome")>-1?(s=r.AgentUtils.BROWSER.CHROME,(i=r.AgentUtils._parseFloatVersion(e,/chrome\/(\d+[.]\d+)/))>=28?(l=r.AgentUtils.ENGINE.BLINK,u=i):(l=r.AgentUtils.ENGINE.WEBKIT,u=r.AgentUtils._parseFloatVersion(e,/applewebkit\/(\d+[.]\d+)/))):e.indexOf("safari")>-1?(s=r.AgentUtils.BROWSER.SAFARI,i=r.AgentUtils._parseFloatVersion(e,/version\/(\d+[.]\d+)/),l=r.AgentUtils.ENGINE.WEBKIT,u=r.AgentUtils._parseFloatVersion(e,/applewebkit\/(\d+[.]\d+)/)):e.indexOf("firefox")>-1&&(s=r.AgentUtils.BROWSER.FIREFOX,i=r.AgentUtils._parseFloatVersion(e,/rv:(\d+[.]\d+)/),l=r.AgentUtils.ENGINE.GECKO,u=r.AgentUtils._parseFloatVersion(e,/gecko\/(\d+)/)),{os:(n=r.AgentUtils._currAgentInfo={hashCode:t,os:o,browser:s,browserVersion:i,deviceType:a,engine:l,engineVersion:u}).os,browser:n.browser,browserVersion:n.browserVersion,deviceType:n.deviceType,engine:n.engine,engineVersion:n.engineVersion,hashCode:n.hashCode}},r.AgentUtils._parseFloatVersion=function(e,t){var n=e.match(t);if(n){var o=n[1];if(o)return parseFloat(o)}return 0},r.ThemeUtils=function(){},r.ThemeUtils.getThemeName=function(){return(r.ThemeUtils.parseJSONFromFontFamily("oj-theme-json")||{}).name},r.ThemeUtils.getThemeTargetPlatform=function(){return(r.ThemeUtils.parseJSONFromFontFamily("oj-theme-json")||{}).targetPlatform},r.ThemeUtils.clearCache=function(){this._cache=null},r.ThemeUtils.parseJSONFromFontFamily=function(e){null==this._cache&&(this._cache={},this._null_cache_value={},this._headfontstring=window.getComputedStyle(document.head).getPropertyValue("font-family"));var t=this._cache[e];if(t===this._null_cache_value)return null;if(null!=t)return t;var n=document.createElement("meta");n.className=e,document.head.appendChild(n);var o=window.getComputedStyle(n).getPropertyValue("font-family");if(null!=o)if(o==this._headfontstring)r.Logger.warn("parseJSONFromFontFamily: When the selector ",e," is applied the font-family read off the dom element is ",o,". The parent dom elment has the same font-family value."," This is interpreted to mean that no value was sent down for selector ",e,". Null will be returned.");else{var s=o.replace(/^['"]+|\s+|\\|(;\s?})+|['"]$/g,"");if(s)try{t=JSON.parse(s)}catch(o){var i=s.indexOf(","),a=!1;if(i>-1){s=s.substring(i+2);try{t=JSON.parse(s),a=!0}catch(e){}}if(0==a)throw r.Logger.error("Error parsing json for selector "+e+".\nString being parsed is "+s+". Error is:\n",o),document.head.removeChild(n),o}}return document.head.removeChild(n),this._cache[e]=null==t?this._null_cache_value:t,t},r.ResponsiveUtils=function(){},r.ResponsiveUtils.SCREEN_RANGE={SM:"sm",MD:"md",LG:"lg",XL:"xl",XXL:"xxl"},r.ResponsiveUtils.FRAMEWORK_QUERY_KEY={SM_UP:"sm-up",MD_UP:"md-up",LG_UP:"lg-up",XL_UP:"xl-up",XXL_UP:"xxl-up",SM_ONLY:"sm-only",MD_ONLY:"md-only",LG_ONLY:"lg-only",XL_ONLY:"xl-only",MD_DOWN:"md-down",LG_DOWN:"lg-down",XL_DOWN:"xl-down",HIGH_RESOLUTION:"high-resolution"},r.ResponsiveUtils._RANGE={},r.ResponsiveUtils._RANGE[r.ResponsiveUtils.SCREEN_RANGE.SM]=0,r.ResponsiveUtils._RANGE[r.ResponsiveUtils.SCREEN_RANGE.MD]=1,r.ResponsiveUtils._RANGE[r.ResponsiveUtils.SCREEN_RANGE.LG]=2,r.ResponsiveUtils._RANGE[r.ResponsiveUtils.SCREEN_RANGE.XL]=3,r.ResponsiveUtils._RANGE[r.ResponsiveUtils.SCREEN_RANGE.XXL]=4,r.ResponsiveUtils._getMediaQueryFromClass=function(e){var t=document.getElementsByClassName(e).item(0);return null===t&&((t=document.createElement("meta")).className=e,document.head.appendChild(t)),window.getComputedStyle(t).getPropertyValue("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g,"")},r.ResponsiveUtils.getFrameworkQuery=function(e){var t="oj-mq-"+e,n=r.ResponsiveUtils._getMediaQueryFromClass(t);return"null"==n?null:n},r.ResponsiveUtils.compare=function(e,t){var n=r.ResponsiveUtils._RANGE[e],o=r.ResponsiveUtils._RANGE[t];if(void 0==n)throw"size1 param "+e+" illegal, please use one of the screen size constants like oj.ResponsiveUtils.SCREEN_RANGE.MD";if(void 0==o)throw"size2 param "+t+" illegal, please use one of the screen size constants like oj.ResponsiveUtils.SCREEN_RANGE.MD";return n-o},r.StringUtils={},r.StringUtils._TRIM_ALL_RE=/^\s*|\s*$/g,r.StringUtils.isEmpty=function(e){return null===e||0===r.StringUtils.trim(e).length},r.StringUtils.isEmptyOrUndefined=function(e){return!(void 0!==e&&!r.StringUtils.isEmpty(e))},r.StringUtils.isString=function(e){return null!==e&&("string"==typeof e||e instanceof String)},r.StringUtils.trim=function(e){return r.StringUtils.isString(e)?e.replace(r.StringUtils._TRIM_ALL_RE,""):e},r.StringUtils.hashCode=function(e){var t=0;if(0===e.length)return t;for(var n=0;n<e.length;n++){t=(t<<5)-t+e.charCodeAt(n),t&=t}return t},String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return t=t||0,this.substr(t,e.length)===e}),String.prototype.endsWith||(String.prototype.endsWith=function(e,t){var n=this.toString();("number"!=typeof t||!isFinite(t)||Math.floor(t)!==t||t>n.length)&&(t=n.length),t-=e.length;var o=n.lastIndexOf(e,t);return-1!==o&&o===t}),r.CollectionUtils={},r.CollectionUtils.copyInto=function(e,t,n,o,s){return r.CollectionUtils._copyIntoImpl(e,t,n,o,s,0)},r.CollectionUtils.isPlainObject=function(e){if(null!==e&&"object"==typeof e)try{if(e.constructor&&e.constructor.prototype.hasOwnProperty("isPrototypeOf"))return!0}catch(e){}return!1},r.CollectionUtils._copyIntoImpl=function(e,t,n,o,s,i){var a,l,u;if(void 0!==s&&null!==s||(s=Number.MAX_VALUE),e&&t&&e!==t){u=Object.keys(t);for(var c=0;c<u.length;c++){a=u[c],l=n?n(a):a;var g=t[a],d=!1;if(o&&i<s){var p=e[l];r.CollectionUtils.isPlainObject(g)&&(null==p||r.CollectionUtils.isPlainObject(p))&&(d=!0,e[l]=p||{},r.CollectionUtils._copyIntoImpl(e[l],g,n,!0,s,i+1))}d||(e[l]=g)}}return e},r.Translations={},r.Translations.setBundle=function(e){r.Translations._bundle=e},r.Translations.getResource=function(e){return r.Translations._getResourceString(e)},r.Translations.applyParameters=function(e,t){return null==e?null:r.Translations._format(e,t)},r.Translations.getTranslatedString=function(e,t){var n=r.Translations._getResourceString(e);if(null==n)return e;var o={};return arguments.length>2?o=Array.prototype.slice.call(arguments,1):2==arguments.length&&("object"==typeof(o=arguments[1])||o instanceof Array||(o=[o])),r.Translations.applyParameters(n,o)},r.Translations.getComponentTranslations=function(e){var t,n,o=r.Translations._getBundle()[e];if(null==o)return{};for(n in t={},o)o.hasOwnProperty(n)&&(t[n]=o[n]);return t},r.Translations._getResourceString=function(e){var t=e?e.split("."):[],n=r.Translations._getBundle(),o=t.length,s=0,i=t[s];for(r.Assert.assertObject(n);--o>0&&n;)n=n[i],i=t[++s];return n&&n[i]||null},r.Translations._format=function(e,t){var n,o,r=e.length,s=[],i=null,a=!1,l=!1,u=!1,c=!1;for(o=0;o<r;o++){var g=e.charAt(o),d=!1;if(a)d=!0,a=!1;else switch(g){case"$":a=!0;break;case"{":c||(l||(n=!1,i=[]),l=!0);break;case"}":if(l&&i.length>0){var p=t[i.join("")];s.push(void 0===p?"null":p)}l=!1;break;case"[":l||(u?c=!0:u=!0);break;case"]":c?c=!1:u=!1;break;default:d=!0}d&&(l?","==g||" "==g?n=!0:n||i.push(g):c||s.push(g))}return s.join("")},r.Translations._getBundle=function(){var t=r.Translations._bundle;return t||(r.__isAmdLoaderPresent()?(r.Assert.assert(void 0!==e,"ojtranslations module must be defined"),e):{})},r.BusyState=function(e){this._description=e,this._addedWaitTs=r.BusyState._getTs(),this._id=this._addedWaitTs.toString(36)+"_"+Math.random().toString(36)},Object.defineProperties(r.BusyState.prototype,{id:{get:function(){return this._id},enumerable:!0},description:{get:function(){if(this._description)return this._description instanceof Function?this._description():this._description.toString()},enumerable:!0}}),r.BusyState.prototype.toString=function(){var e="Busy state: [description=",t=this.description;return null!==t&&(e+=t),e+=", elapsed="+(r.BusyState._getTs()-this._addedWaitTs)+"]"},r.BusyState._getTs=function(){return window.performance?window.performance.now():(new Date).getTime()},r.BusyContext=function(e){this.Init(e)},r.Object.createSubclass(r.BusyContext,r.Object,"oj.BusyContext"),r.BusyContext._defaultTimeout=Number.NaN,r.BusyContext.setDefaultTimeout=function(e){isNaN(e)||(r.BusyContext._defaultTimeout=e)},r.BusyContext.prototype.Init=function(e){r.BusyContext.superclass.Init.call(this),this._hostNode=e,this._statesMap=new Map,this._mediator={getMasterWhenReadyPromise:function(){return this._masterWhenReadyPromise||(this._masterWhenReadyPromise=new Promise(this._captureWhenReadyPromiseResolver.bind(this))),this._masterWhenReadyPromise},resolveMasterWhenReadyPromise:function(){this._masterWhenReadyPromiseResolver&&this._masterWhenReadyPromiseResolver(!0),this._masterWhenReadyPromise=null,this._masterWhenReadyPromiseResolver=null},getSlaveTimeoutPromise:function(e,t,n){var o,r=new Promise(function(e,r){o=window.setTimeout(function(){r(t())},n)});return this._slaveTimeoutPromiseTimers.push(o),Promise.race([e,r]).then(this._clearAllSlaveTimeouts.bind(this))},getNextTickPromise:function(){return this._nextTickPromise||(this._nextTickPromise=new Promise(function(e){window.setImmediate(function(){this._nextTickPromise=null,e(!0)}.bind(this))}.bind(this))),this._nextTickPromise},_clearAllSlaveTimeouts:function(){var e=this._slaveTimeoutPromiseTimers;this._slaveTimeoutPromiseTimers=[];for(var t=0;t<e.length;t++)window.clearTimeout(e[t]);return!0},_captureWhenReadyPromiseResolver:function(e,t){this._masterWhenReadyPromiseResolver=e},_slaveTimeoutPromiseTimers:[]}},r.BusyContext._log=function(e){if(r.Logger.option("level")===r.Logger.LEVEL_LOG){r.Logger.log(">> Busy states: %d",e.size);var t=r.BusyContext._values(e);t.length>0&&r.Logger.log(t.join("\n"))}},r.BusyContext._values=function(e){var t=[];return e.forEach(function(e){t.push(e)}),t},r.BusyContext.prototype.addBusyState=function(e){r.Logger.log("BusyContext.addBusyState: start scope='%s'",this._getDebugScope());var t=this._statesMap,n=new r.BusyState(e[r.BusyContext._DESCRIPTION]);return r.Logger.log(">> "+n),t.set(n.id,n),this._addBusyStateToParent(),r.Logger.log("BusyContext.addBusyState: end scope='%s'",this._getDebugScope()),this._removeBusyState.bind(this,n)},r.BusyContext.prototype.dump=function(e){r.Logger.info("BusyContext.dump: start scope='%s' %s",this._getDebugScope(),e||"");var t=this._statesMap;r.Logger.info(">> Busy states: %d",t.size);var n=r.BusyContext._values(t);n.length>0&&r.Logger.info(n.join("\n")),r.Logger.info("BusyContext.dump: start scope='%s' %s",this._getDebugScope(),e||"")},r.BusyContext.prototype.getBusyStates=function(){var e=this._statesMap;return r.BusyContext._values(e)},r.BusyContext.prototype.clear=function(){r.Logger.log("BusyContext.clear: start scope='%s'",this._getDebugScope());for(var e=this._statesMap,t=r.BusyContext._values(e),n=0;n<t.length;n++){var o=t[n];try{this._removeBusyState(o)}catch(e){r.Logger.log("BusyContext.clear: %o",e)}Object.defineProperty(o,r.BusyContext._OJ_RIP,{value:!0,enumerable:!1})}r.Logger.log("BusyContext.clear: end scope='%s'",this._getDebugScope())},r.BusyContext.prototype.whenReady=function(e){var t=this._getDebugScope();r.Logger.log("BusyContext.whenReady: start, scope='%s', timeout=%d",t,e);var n=this._statesMap,o=this._mediator,s=o.getNextTickPromise(),i=r.BusyContext._BOOTSTRAP_MEDIATOR.whenReady(),a=Promise.all([s,i]).then(function(){return r.Logger.log("BusyContext.whenReady: bootstrap mediator ready scope=%s",t),r.BusyContext._deliverThrottledUpdates(),0!==n.size||this._waitingOnNextTickBusynessEval?(r.Logger.log("BusyContext.whenReady: busy states returning master scope=%s",t),o.getMasterWhenReadyPromise()):(r.Logger.log("BusyContext.whenReady: resolved no busy states scope=%s",t),Promise.resolve(!0))}.bind(this));if(isNaN(e)&&!isNaN(r.BusyContext._defaultTimeout)&&(e=r.BusyContext._defaultTimeout),!isNaN(e)){a=o.getSlaveTimeoutPromise(a,function(){var o,s="whenReady timeout of "+e+"ms expired ";r.BusyContext._log(n);var i=r.BusyContext._values(n);return(o=r.BusyContext._BOOTSTRAP_MEDIATOR.isReady()?new Error(s+"with the following busy states: "+i.join(", ")):new Error(s+'while the application is loading. Busy state enabled by setting the "window.oj_whenReady = true;" global variable. Application bootstrap busy state is released by calling "oj.Context.getPageContext().getBusyContext().applicationBootstrapComplete();".')).busyStates=i,r.Logger.log("BusyContext.whenReady: rejected scope='%s'\n%s",t,o.message),o},e)}return r.Logger.log("BusyContext.whenReady: end scope='%s'",this._getDebugScope()),a},r.BusyContext.prototype.isReady=function(){r.Logger.log("BusyContext.isReady: start scope='%s'",this._getDebugScope());var e=!1;if(r.BusyContext._BOOTSTRAP_MEDIATOR.isReady()&&!this._waitingOnNextTickBusynessEval){var t=this._statesMap;e=0===t.size,r.BusyContext._log(t)}return r.Logger.log("BusyContext.isReady: end scope='%s'",this._getDebugScope()),e},r.BusyContext.prototype._removeBusyState=function(e){var t=this._getDebugScope();r.Logger.log("BusyContext._removeBusyState: start scope='%s'",t);var n=this._statesMap;if(e[r.BusyContext._OJ_RIP])r.Logger.log("Busy state has been forcefully resolved via clear:\n"+e);else{if(!n.delete(e.id))throw new Error("Busy state has already been resolved:\n"+e);0!==n.size||this._waitingOnNextTickBusynessEval?r.Logger.log("BusyContext._removeBusyState: resolving busy state:\n"+e):(this._waitingOnNextTickBusynessEval=!0,window.setImmediate(this._evalBusyness.bind(this))),r.Logger.log("BusyContext._removeBusyState: end scope='%s'",t)}},r.BusyContext.prototype._evalBusyness=function(){var e=this._getDebugScope();r.Logger.log("BusyContext._evalBusyness: begin scope='%s'",e),r.BusyContext._deliverThrottledUpdates();var t=this._statesMap,n=this._mediator;0===t.size?(r.Logger.log("BusyContext._evalBusyness: resolving whenReady promises"),n.resolveMasterWhenReadyPromise(),this._resolveBusyStateForParent()):r.BusyContext._log(t),
this._waitingOnNextTickBusynessEval=!1,r.Logger.log("BusyContext._evalBusyness: end scope='%s'",e)},r.BusyContext.prototype.applicationBootstrapComplete=function(){var e=this._getDebugScope();r.Logger.log("BusyContext.applicationBootstrapComplete: begin scope='%s'",e),r.BusyContext._BOOTSTRAP_MEDIATOR.notifyComplete(),r.Logger.log("BusyContext.applicationBootstrapComplete: end scope='%s'",e)},r.BusyContext.prototype._getParentBusyContext=function(){if(this._hostNode){var e=r.Context.getContext(r.Context.getParentElement(this._hostNode));if(e)return e.getBusyContext()}return null},r.BusyContext.prototype._addBusyStateToParent=function(){if(!this._parentNotified){this._parentNotified=!0;var e=this._getParentBusyContext();if(e){var t={};t[r.BusyContext._DESCRIPTION]=this._getCompoundDescription.bind(this),this._parentResolveCallback=e.addBusyState(t)}}},r.BusyContext.prototype._resolveBusyStateForParent=function(){this._parentNotified=!1,this._parentResolveCallback&&(this._parentResolveCallback(),this._parentResolveCallback=null)},r.BusyContext.prototype._getCompoundDescription=function(){return"["+r.BusyContext._values(this._statesMap).join(", ")+"]"},r.BusyContext.prototype._getDebugScope=function(){function e(e){var t="undefined";if(e)if(e.id&&e.id.length>0)t="#"+e.id;else{t=e.nodeName,e.hasAttribute("data-oj-context")&&(t+="[data-oj-context]");var n=e.getAttribute("class");n&&(t+="."+n.split(" ").join("."))}return t}return this._debugScope||(this._hostNode?this._debugScope=e(this._hostNode.parentElement)+" > "+e(this._hostNode):this._debugScope="page"),this._debugScope},r.BusyContext.prototype.toString=function(){var e="Busy Context: [scope=";return e+=this._getDebugScope(),e+=" states="+this._getCompoundDescription()+"]"},r.BusyContext._deliverThrottledUpdates=function(){r.ComponentBinding&&r.ComponentBinding.deliverChanges()},r.BusyContext._DESCRIPTION="description",r.BusyContext._OJ_RIP="__ojRip",r.BusyContext._BOOTSTRAP_MEDIATOR=new function(){var e,t,n;"undefined"!=typeof window&&(e=window.oj_whenReady),this.whenReady=function(){return t||(t=e?new Promise(function(e,t){n=e}):Promise.resolve(!0))},this.isReady=function(){return!e},this.notifyComplete=function(){n?window.setImmediate(function(){e=!1,n(!0),n=null}):e=!1}},r.Context=function(e){this.Init(e)},r.Object.createSubclass(r.Context,r.Object,"oj.Context"),r.Context.prototype.Init=function(e){r.Context.superclass.Init.call(this),this._node=e},r.Context.getContext=function(e){for(;e;){var t=e[r.Context._OJ_CONTEXT_INSTANCE];if(t)return t;if(e.hasAttribute(r.Context._OJ_CONTEXT_ATTRIBUTE))return t=new r.Context(e),Object.defineProperty(e,r.Context._OJ_CONTEXT_INSTANCE,{value:t}),t;e=r.Context.getParentElement(e)}return r.Context.getPageContext()},r.Context.getPageContext=function(){return r.Context._pageContext||(r.Context._pageContext=new r.Context),r.Context._pageContext},r.Context.prototype.getBusyContext=function(){return this._busyContext||(this._busyContext=new r.BusyContext(this._node)),this._busyContext},r.Context._OJ_CONTEXT_ATTRIBUTE="data-oj-context",r.Context._OJ_CONTEXT_INSTANCE="__ojContextInstance",r.Context._OJ_SURROGATE_ATTR="data-oj-surrogate-id",r.Context.getParentElement=function(e){if(e&&e.hasAttribute(r.Context._OJ_SURROGATE_ATTR)){var t=document.getElementById(e.getAttribute(r.Context._OJ_SURROGATE_ATTR));if(t)return t.parentElement}return e.parentElement},function(){r.__AttributeUtils={},r.__AttributeUtils.getExpressionInfo=function(e){var t={};if(e){var n=e.trim(),o=s.exec(n);(o=o?o[1]:null)||(t.downstreamOnly=!0,o=(o=i.exec(n))?o[1]:null),t.expr=o}return t},r.__AttributeUtils.attributeToPropertyName=function(e){return e.toLowerCase().replace(/-(.)/g,function(e,t){return t.toUpperCase()})},r.__AttributeUtils.propertyNameToAttribute=function(e){return e.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()})},r.__AttributeUtils.eventTypeToEventListenerProperty=function(e){return"on"+e.substr(0,1).toUpperCase()+e.substr(1)},r.__AttributeUtils.eventListenerPropertyToEventType=function(e){return/^on[A-Z]/.test(e)?e.substr(2,1).toLowerCase()+e.substr(3):null},r.__AttributeUtils.propertyNameToChangeEventType=function(e){return e+"Changed"},r.__AttributeUtils.changeEventTypeToPropertyName=function(e){return/Changed$/.test(e)?e.substr(0,e.length-7):null},r.__AttributeUtils.eventTriggerToEventType=function(e){return"oj"+e.substr(0,1).toUpperCase()+e.substr(1)},r.__AttributeUtils.eventTypeToEventTrigger=function(e){return/^oj[A-Z]/.test(e)?e.substr(2,1).toLowerCase()+e.substr(3):null},r.__AttributeUtils.coerceValue=function(r,s,i,a){if(!a)throw"Unable to parse "+s+"='"+i+"' for "+r.tagName+" with id "+r.id+" . This attribute only supports data bound values. Check the API doc for supported types";var l=a.toLowerCase(),u=n.test(i),c=o.test(i);if(e.test(l)&&u||t.test(l)&&c||"any"===l&&(u||c))try{return JSON.parse(i)}catch(e){throw"Unable to parse "+s+"='"+i+"' for "+r.tagName+" with id "+r.id+" to a JSON Object. Check the value for correct JSON syntax, e.g. double quoted strings. "+e}else if("boolean"===l){if(null==i||"true"===i||""===i||i.toLowerCase()===s)return!0;if("false"===i)return!1}else if("number"===l){if(!isNaN(i))return Number(i)}else{if(-1!==a.split("|").indexOf("string")||"any"===l)return i}throw"Unable to parse "+s+"='"+i+"' for "+r.tagName+" with id "+r.id+" to a "+a+"."};var e=/(^array)|(\|array)/,t=/(^object)|(\|object)/,n=/\s*\[[^]*\]\s*/,o=/\s*\{[^]*\}\s*/,s=/^(?:\{\{)([^]+)(?:\}\})$/,i=/^(?:\[\[)([^]+)(?:\]\])$/}(),"undefined"!=typeof window&&window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),o=this;do{for(t=n.length;--t>=0&&n.item(t)!==o;);}while(t<0&&(o=o.parentElement));return o}),r.__HtmlUtils=(i=function(e){for(var t=e.childNodes,n=t.length,o=0;o<n;o++){var r=t[o];i(r);var s=r.nodeName.toLowerCase();if("oj-bind-replace-"===s.substr(0,16)){for(var a=s.substr(16),l=document.createElement(a),u=0;u<r.attributes.length;u++){var c=r.attributes[u];l.setAttribute(c.name,c.value)}var g=l.content?l.content:l;for(u=0;r.childNodes.length>0;)g.appendChild(r.childNodes[0]);e.replaceChild(l,r)}else if("script"===s||"style"===s){for(l=document.createElement(s),u=0;u<r.attributes.length;u++){c=r.attributes[u];l.setAttribute(c.name,c.value)}var d=r.innerHTML;l.innerHTML=d.replace(new RegExp("oj-bind-replace-","g"),""),e.replaceChild(l,r)}else if(8===r.nodeType){var p=r.nodeValue;r.nodeValue=p.replace(new RegExp("oj-bind-replace-","g"),"")}}},{stringToNodeArray:function(e){for(var t,n,o,r,s=["table","caption","colgroup","col","thead","tfoot","th","tbody","tr","td","template"],a=0;a<s.length;a++)t=s[a],n=e,o=new RegExp("<"+t+"(?=\\s|>)","gi"),r=new RegExp("</"+t+"(?=\\s|>)","gi"),e=n.replace(o,"<oj-bind-replace-"+t).replace(r,"</oj-bind-replace-"+t);var l=document.createElement("div");l.innerHTML=e,-1!==e.indexOf("<oj-bind-replace-")&&i(l);var u=l.childNodes,c=[];for(a=u.length;a--;c.unshift(u[a]));return c}}),r.TimerUtils={},l.prototype.getPromise=function(){},l.prototype.clear=function(){},r.TimerUtils.getTimer=function(e){return new r.TimerUtils._TimerImpl(e)},r.TimerUtils._TimerImpl=function(e){var t,n,o;function r(e){o=null,n(e)}this.getPromise=function(){return t},this.clear=function(){window.clearTimeout(o),o=null,r(!1)},t="undefined"==typeof window?Promise.reject():new Promise(function(t){n=t,o=window.setTimeout(r.bind(null,!0),e)})},r});