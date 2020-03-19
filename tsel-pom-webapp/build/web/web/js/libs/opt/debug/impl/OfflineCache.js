define(["./defaultCacheHandler","./logger"],function(e,r){"use strict";function t(e,r){if(!e)throw TypeError("A name must be provided to create an OfflineCache!");if(!r)throw TypeError("A persistence store must be provided to create an OfflineCache!");this._name=e,this._store=r}function n(e,r,t){if(t&&t.length)for(var n=0;n<t.length;n++){var o=t[n];if(i(e,r,o))return o.responseData}return null}function o(e,r,t){return function(n){var o;return o=t?n[t]:n,i(e,r,o)}}function i(e,t,n){if(e)return!0;if(!n||!t)return!1;var o=n.requestData.headers,i=n.responseData.headers,s=t.headers,a=i.vary;if(r.log("Offline Persistence Toolkit OfflineCache: Processing HTTP Vary header"),!a)return!0;if("*"===a.trim())return!1;for(var l=a.split(","),f=0;f<l.length;f++){var u=l[f].toLowerCase(),c=s.get(u),h=o[u];if(r.log("Offline Persistence Toolkit OfflineCache: HTTP Vary header name: "+u),r.log("Offline Persistence Toolkit OfflineCache: Request HTTP Vary header value: "+c),r.log("Offline Persistence Toolkit OfflineCache: Cached HTTP Vary header value: "+h),!(!h&&!c||h&&c&&h===c))return!1}return!0}function s(t){if(t){r.log("Offline Persistence Toolkit OfflineCache: Converting cached entry to Response object");var n=[],o=t.bodyAbstract;return o?(n.push(Promise.resolve(JSON.parse(o))),delete t.bodyAbstract):n.push(Promise.resolve()),n.push(e.constructResponse(t)),Promise.all(n)}return Promise.resolve()}return t.prototype.getName=function(){return this._name},t.prototype.add=function(e){r.log("Offline Persistence Toolkit OfflineCache: add()");var t=this;return fetch(e).then(function(r){var n=r.clone();return t.put(e,r).then(function(){Promise.resolve(n)})})},t.prototype.addAll=function(e){r.log("Offline Persistence Toolkit OfflineCache: addAll()");var t=e.map(this.add,this);return Promise.all(t)},t.prototype.match=function(t,o){r.log("Offline Persistence Toolkit OfflineCache: match() for Request with url: "+t.url);var i=e.constructSearchCriteria(t,o),a=o&&o.ignoreVary;return this._store.find(i).then(function(e){return s(n(a,t,e))}).then(function(r){if(r){var n=r[0],o=r[1];return e.fillResponseBodyWithShreddedData(t,n,o)}return Promise.resolve()})},t.prototype.matchAll=function(t,n){r.log("Offline Persistence Toolkit OfflineCache: matchAll() for Request with url: "+t.url);var i=e.constructSearchCriteria(t,n),a=n&&n.ignoreVary;return this._store.find(i).then(function(e){return function(e){if(e&&e.length){var r=e.map(function(e){return s(e)});return Promise.all(r)}return Promise.resolve()}(function(e,r,t){var n=[];if(t&&t.length){var i=t.filter(o(e,r));n=i.map(function(e){return e.responseData})}return n}(a,t,e))}).then(function(r){if(r&&r.length){var n=r.map(function(r){var n=r[0],o=r[1];return e.fillResponseBodyWithShreddedData(t,n,o)});return Promise.all(n)}return Promise.resolve([])})},t.prototype.put=function(t,n){r.log("Offline Persistence Toolkit OfflineCache: put() for Request with url: "+t.url);var o=this,i=[];return i.push(e.constructRequestResponseCacheData(t,n)),i.push(e.shredResponse(t,n)),Promise.all(i).then(function(r){var t=r[0],n=r[1];if(n){var i=[];return t.value.responseData.bodyAbstract=function(e){var r=e.map(function(e){return{name:e.name,keys:e.keys,resourceType:e.resourceType}});return JSON.stringify(r)}(n),i.push(o._store.upsert(t.key,t.metadata,t.value)),i.push(e.cacheShreddedData(n)),Promise.all(i)}return o._store.upsert(t.key,t.metadata,t.value)})},t.prototype.delete=function(e,t){e?r.log("Offline Persistence Toolkit OfflineCache: delete() for Request with url: "+e.url):r.log("Offline Persistence Toolkit OfflineCache: delete()");var n=this;return n.keys(e,t).then(function(e){if(e&&e.length){var r=e.map(n._store.removeByKey,n._store);return Promise.all(r)}return!1}).then(function(e){return!(!e||!e.length)})},t.prototype.keys=function(t,n){t?r.log("Offline Persistence Toolkit OfflineCache: keys() for Request with url: "+t.url):r.log("Offline Persistence Toolkit OfflineCache: keys()");if(t){var i=e.constructSearchCriteria(t,n);i.fields=["key","value"];var s=n&&n.ignoreVary;return this._store.find(i).then(function(e){return e&&e.length?e.filter(o(s,t,"value")).map(function(e){return e.key}):[]})}return this._store.keys()},t.prototype.hasMatch=function(t,o){r.log("Offline Persistence Toolkit OfflineCache: hasMatch() for Request with url: "+t.url);var i=e.constructSearchCriteria(t,o),s=o&&o.ignoreVary;return this._store.find(i).then(function(e){return null!==n(s,t,e)})},t});