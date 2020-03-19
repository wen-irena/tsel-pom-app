define(["./impl/PersistenceXMLHttpRequest","./impl/PersistenceSyncManager","./impl/offlineCacheManager","./impl/logger","./impl/fetch"],function(e,t,n,r){"use strict";function i(){Object.defineProperty(this,"_registrations",{value:[],writable:!0}),Object.defineProperty(this,"_eventListeners",{value:[],writable:!0}),Object.defineProperty(this,"_forceOffline",{value:!1,writable:!0}),Object.defineProperty(this,"_isOffline",{value:!1,writable:!0}),Object.defineProperty(this,"_cache",{value:null,writable:!0}),Object.defineProperty(this,"_persistenceSyncManager",{value:new t(this.isOnline.bind(this),this.browserFetch.bind(this),this.getCache.bind(this))})}function s(){return"undefined"!=typeof window&&null!=window}function o(e,t){Object.defineProperty(this,"scope",{value:e,enumerable:!0}),Object.defineProperty(this,"_persistenceManager",{value:t}),Object.defineProperty(this,"_eventListeners",{value:[],writable:!0})}return i.prototype.init=function(){var t,i;return i=t=this,!s()||i._browserFetchFunc||i._browserXMLHttpRequest||(r.log("Offline Persistence Toolkit PersistenceManager: Replacing browser APIs"),Object.defineProperty(i,"_browserFetchFunc",{value:window.fetch,writable:!1}),Object.defineProperty(i,"_browserXMLHttpRequest",{value:window.XMLHttpRequest,writable:!1}),window.fetch=function(e){function t(e){Object.defineProperty(this,"isReload",{value:!1,enumerable:!0}),Object.defineProperty(this,"clientId",{value:null,enumerable:!0}),Object.defineProperty(this,"client",{value:null,enumerable:!0}),Object.defineProperty(this,"request",{value:e,enumerable:!0}),Object.defineProperty(this,"_resolveCallback",{value:null,writable:!0}),Object.defineProperty(this,"_rejectCallback",{value:null,writable:!0})}return t.prototype.respondWith=function(e){var t=this;if(e instanceof Promise)e.then(function(e){t._resolveCallback(e)},function(e){t._rejectCallback(e)});else if("function"==typeof e){var n=e();t._resolveCallback(n)}},t.prototype._setPromiseCallbacks=function(e,t){this._resolveCallback=e,this._rejectCallback=t},function(n,i){var s;return s=Request.prototype.isPrototypeOf(n)&&!i?n:new Request(n,i),e.getRegistration(s.url).then(function(n){if(null!=n){var i=new t(s),o=function(e,t,n){var i,s,o,l,c=null,a=e._registrations,u=null!=a?a.length:0;for(i=0;i<u;i++)if(o=a[i],null!=n.request.url.match(o.scope)){for(l=o._eventListeners.length,s=0;s<l;s++)if(o._eventListeners[s].type==t)if("fetch"==t)null===c&&n._setPromiseCallbacks instanceof Function&&(c=new Promise(function(e,t){n._setPromiseCallbacks(e,t)})),r.log("Offline Persistence Toolkit PersistenceManager: Calling fetch event listener"),o._eventListeners[s].listener(n);else if(r.log("Offline Persistence Toolkit PersistenceManager: Calling event listener"),!1===o._eventListeners[s].listener(n))return!1;if(null!=c)return c}return!0}(e,"fetch",i);if(null!=o&&o instanceof Promise)return o}return e.browserFetch(s)})}}(t),window.XMLHttpRequest=function(){return null!=i._browserFetchRequest?new i._browserXMLHttpRequest:new e(i._browserXMLHttpRequest)}),function(e){var t=e;s()&&!t._addedBrowserEventListeners&&(r.log("Offline Persistence Toolkit PersistenceManager: Adding browser event listeners"),window.addEventListener("offline",function(e){t._isOffline=!0},!1),window.addEventListener("online",function(e){t._isOffline=!1},!1),t._addedBrowserEventListeners=!0)}(this),function(e){var t=e;return n.open("systemCache").then(function(e){return t._cache=e,Promise.resolve()})}(this)},i.prototype.forceOffline=function(e){r.log("Offline Persistence Toolkit PersistenceManager: forceOffline is called with value: "+e),this._forceOffline=e},i.prototype.getCache=function(){return this._cache},i.prototype.isOnline=function(){var e=navigator.onLine;return navigator.network&&navigator.network.connection&&navigator.network.connection.type==Connection.NONE&&(e=!1,r.log("Offline Persistence Toolkit PersistenceManager: Cordova network info plugin is returning online value: "+e)),e&&!this._isOffline&&!this._forceOffline},i.prototype.register=function(e){var t=new o((e=e||{}).scope,this);return this._registrations.push(t),Promise.resolve(t)},i.prototype.getRegistration=function(e){var t,n,r=this._registrations.length;for(t=0;t<r;t++)if(n=this._registrations[t],e.match(n.scope))return Promise.resolve(n);return Promise.resolve()},i.prototype.getRegistrations=function(){return Promise.resolve(this._registrations.slice())},i.prototype.getSyncManager=function(){return this._persistenceSyncManager},i.prototype.browserFetch=function(e){if(r.log("Offline Persistence Toolkit PersistenceManager: browserFetch() for Request with url: "+e.url),s()){Object.defineProperty(this,"_browserFetchRequest",{value:e,writable:!0});var t=this;return new Promise(function(n,i){r.log("Offline Persistence Toolkit PersistenceManager: Calling browser fetch function for Request with url: "+e.url),t._browserFetchFunc.call(window,e).then(function(e){n(e)},function(e){i(e)}),t._browserFetchRequest=null})}return fetch(e)},o.prototype.addEventListener=function(e,t){this._eventListeners.push({type:e.toLowerCase(),listener:t})},o.prototype.unregister=function(){return Promise.resolve((e=this._persistenceManager,t=this,(r=(n=e)._registrations.indexOf(t))>-1&&(n._registrations.splice(r,1),!0)));var e,t,n,r},new i});