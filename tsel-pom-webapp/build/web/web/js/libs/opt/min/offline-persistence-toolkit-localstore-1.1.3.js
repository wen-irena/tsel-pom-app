define("PersistenceStore",[],function(){"use strict";var e=function(e){this._name=e};return(e.prototype={}).getName=function(){return this._name},e.prototype.getVersion=function(){return this._version},e.prototype.Init=function(e){return e&&e.version?this._version=e.version:this._version="0",Promise.resolve()},e.prototype.upsert=function(e,t,r,n){throw TypeError("failed in abstract function")},e.prototype.upsertAll=function(e){throw TypeError("failed in abstract function")},e.prototype.find=function(e){throw TypeError("failed in abstract function")},e.prototype.findByKey=function(e){throw TypeError("failed in abstract function")},e.prototype.removeByKey=function(e){throw TypeError("failed in abstract function")},e.prototype.delete=function(e){throw TypeError("failed in abstract function")},e.prototype.keys=function(){throw TypeError("failed in abstract function")},e}),define("impl/storageUtils",["./logger"],function(e){"use strict";function t(e){var n,l=[];for(var a in e)if(e.hasOwnProperty(a)){var u=e[a];if(0===a.indexOf("$")){if(o(a)){if(!(u instanceof Array))throw new Error("not a valid expression: "+e);n={operator:a,array:[]};for(var f=0;f<u.length;f++){var c=t(u[f]);n.array.push(c)}}else if(i(a))throw new Error("not a valid expression: "+e)}else if(s(u))l.push({left:a,right:u,operator:"$eq"});else{var y={left:a};r(y,u),l.push(y)}}return l.length>1?n={operator:"$and",array:l}:1===l.length&&(n=l[0]),n}function r(e,t){var r=!1;for(var n in t)if(t.hasOwnProperty(n)){var o=t[n];if(r||!i(n))throw new Error("parsing error "+t);e.operator=n,e.right=o,r=!0}}function n(e,t){var r=e.operator;if(o(r)){if(!e.left&&e.array instanceof Array){for(var s,l=e.array,f=0;f<l.length;f++){var c=n(l[f],t);if("$or"===r&&!0===c)return!0;if("$and"===r&&!1===c)return!1;s=c}return s}throw new Error("invalid expression tree!"+e)}if(i(r)){var y,p=u(e.left,t),h=e.right;if("$lt"===r)return(p=(y=a(p,h))[0])<(h=y[1]);if("$gt"===r)return(p=(y=a(p,h))[0])>(h=y[1]);if("$lte"===r)return(p=(y=a(p,h))[0])<=(h=y[1]);if("$gte"===r)return(p=(y=a(p,h))[0])>=(h=y[1]);if("$eq"===r)return p===h;if("$ne"===r)return p!==h;if("$regex"===r)return null!==p.match(h);if("$exists"===r)return h?null!==p&&void 0!==p:null===p||void 0===p;throw new Error("not a valid expression! "+e)}throw new Error("not a valid expression!"+e)}function o(e){return"$and"===e||"$or"===e}function i(e){return"$lt"===e||"$gt"===e||"$lte"===e||"$gte"===e||"$eq"===e||"$ne"===e||"$regex"===e||"$exists"===e}function s(e){return"object"!=typeof e}function l(e){return null!=e&&(e instanceof String||"string"==typeof e)}function a(e,t){return l(e)&&null==t?t="":l(t)&&null==e&&(e=""),[e,t]}function u(e,t){for(var r=e.split("."),n=t,o=0;o<r.length;o++)n=n[r[o]];return n}return{satisfy:function(r,o){return e.log("Offline Persistence Toolkit storageUtils: Processing selector: "+JSON.stringify(r)),!r||n(t(r),o)},getValue:u}}),define("impl/keyValuePersistenceStore",["../PersistenceStore","./storageUtils","./logger"],function(e,t,r){"use strict";var n=function(t){e.call(this,t)};return(n.prototype=new e).Init=function(e){return this._version=e&&e.version||"0",Promise.resolve()},n.prototype.getItem=function(e){throw TypeError("failed in abstract function")},n.prototype.removeByKey=function(e){throw TypeError("failed in abstract function")},n.prototype.keys=function(){throw TypeError("failed in abstract function")},n.prototype.findByKey=function(e){return r.log("Offline Persistence Toolkit keyValuePersistenceStore called by subclass: findByKey() with key: "+e),this.getItem(e).then(function(e){return e?Promise.resolve(e.value):Promise.resolve()})},n.prototype.find=function(e){r.log("Offline Persistence Toolkit keyValuePersistenceStore called by subclass: find() with expression: "+JSON.stringify(e));var n=this,o=[],i=[];e=e||{};return this.keys().then(function(r){for(var s=[],l=0;l<r.length;l++){var a=r[l];a&&s.push(function(r){return n.getItem(r).then(function(n){n&&t.satisfy(e.selector,n)&&(n.key=r,i.push(n))})}(a))}return Promise.all(s).then(function(){for(var t=n._sort(i,e.sort),r=0;r<t.length;r++)o.push(n._constructReturnObject(e.fields,t[r]));return Promise.resolve(o)})})},n.prototype._sort=function(e,t){return e&&e.length&&t&&t.length?e.sort(this._sortFunction(t,this)):e},n.prototype._sortFunction=function(e,r){return function(r,n){for(var o=0;o<e.length;o++){var i,s=e[o],l=!0;if("string"==typeof s)i=s;else{if("object"!=typeof s)throw new Error("invalid sort criteria.");var a=Object.keys(s);if(!a||1!==a.length)throw new Error("invalid sort criteria");l="asc"===s[i=a[0]].toLowerCase()}var u=t.getValue(i,r),f=t.getValue(i,n);if(u!=f)return l?u<f?-1:1:u<f?1:-1}return 0}},n.prototype._constructReturnObject=function(e,t){var r;if(e){r={};for(var n=0;n<e.length;n++)for(var o=r,i=t,s=e[n].split("."),l=0;l<s.length;l++)i=i[s[l]],!o[s[l]]&&l<s.length-1&&(o[s[l]]={}),l===s.length-1?o[s[l]]=i:o=o[s[l]]}else r=t.value;return r},n.prototype._removeByKeyMapCallback=function(e){var t=this;return function(r){var n;return n=e?r[e]:r,t.removeByKey(n)}},n.prototype.delete=function(e){r.log("Offline Persistence Toolkit keyValuePersistenceStore called by subclass: delete() with expression: "+JSON.stringify(e));var t=this;if(!e)return this.deleteAll();var n=e;return n.fields=["key"],t.find(n).then(function(e){if(e&&e.length){var r=e.map(t._removeByKeyMapCallback("key"),t);return Promise.all(r)}return Promise.resolve()})},n.prototype.deleteAll=function(){r.log("Offline Persistence Toolkit keyValuePersistenceStore called by subclass: deleteAll()");var e,t=this,n=[];return this.keys().then(function(r){for(e=0;e<r.length;e++)n.push(t.removeByKey(r[e]));return Promise.all(n)})},n.prototype.upsert=function(e,t,n,o){r.log("Offline Persistence Toolkit keyValuePersistenceStore called by subclass: upsert() for key: "+e);var i=this;return this.getItem(e).then(function(r){if(r&&o){var s=r.metadata.versionIdentifier;return s!==o?Promise.reject({status:409}):t.versionIdentifier!==s?i._insert(e,t,n):Promise.resolve()}return i._insert(e,t,n)})},n.prototype.upsertAll=function(e){r.log("Offline Persistence Toolkit keyValuePersistenceStore called by subclass: upsertAll()");for(var t=[],n=0;n<e.length;n++){var o=e[n];t.push(this.upsert(o.key,o.metadata,o.value,o.expectedVersionIndentifier))}return Promise.all(t)},n}),define("impl/localPersistenceStore",["./keyValuePersistenceStore","./logger"],function(e,t){"use strict";var r=function(t){e.call(this,t)};return(r.prototype=new e).Init=function(e){return this._version=e&&e.version||"0",Promise.resolve()},r.prototype._insert=function(e,t,r){var n=this._createRawKey(e),o={metadata:t,value:r},i=JSON.stringify(o);return localStorage.setItem(n,i),Promise.resolve()},r.prototype.removeByKey=function(e){t.log("Offline Persistence Toolkit localPersistenceStore: removeByKey() with key: "+e);var r=this;return this.findByKey(e).then(function(t){if(t){var n=r._createRawKey(e);return localStorage.removeItem(n),Promise.resolve(!0)}return Promise.resolve(!1)})},r.prototype._createRawKey=function(e){return this._name+this._version+e.toString()},r.prototype._extractKey=function(e){var t=this._name+this._version,r=t.length;return 0===e.indexOf(t)?e.slice(r):null},r.prototype.keys=function(){t.log("Offline Persistence Toolkit localPersistenceStore: keys()");for(var e=Object.keys(localStorage),r=[],n=0;n<e.length;n++){var o=this._extractKey(e[n]);o&&r.push(o)}return Promise.resolve(r)},r.prototype.getItem=function(e){t.log("Offline Persistence Toolkit localPersistenceStore: getItem() with key: "+e);var r=this._createRawKey(e),n=localStorage.getItem(r);return n?Promise.resolve(JSON.parse(n)):Promise.resolve()},r}),define("localPersistenceStoreFactory",["./impl/localPersistenceStore"],function(e){"use strict";return function(){function t(t,r){var n=new e(t);return n.Init(r).then(function(){return n})}return{createPersistenceStore:function(e,r){return t(e,r)}}}()}),define("persistenceStoreFactory",[],function(){"use strict";return{createPersistenceStore:function(e,t){}}});