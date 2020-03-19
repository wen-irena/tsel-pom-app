"use strict";define(["ojs/ojcore","knockout","promise"],function(e,n){e.ModuleBinding={},e.ModuleBinding.defaults={viewPath:"text!views/",viewSuffix:".html",modelPath:"viewModels/",initializeMethod:"initialize",disposeMethod:"dispose",activatedHandler:"handleActivated",attachedHandler:"handleAttached",detachedHandler:"handleDetached",bindingsAppliedHandler:"handleBindingsApplied",deactivatedHandler:"handleDeactivated",transitionCompletedHandler:"handleTransitionCompleted"},e.ModuleBinding._EMPTY_MODULE="oj:blank",function(){function i(e,i,o){i=i||e;var t=[];o&&e===i&&(o.parentNode.removeChild(o),t.push(o)),n.virtualElements.setDomNodeChildren(i,t)}function o(e,n){e.forEach(function(e){n.appendChild(e)})}function t(e,n,i){var o={};i[0]&&(o.viewModel=i[0]),i[1]&&(o.view=i[1]);var t=new CustomEvent(n,{detail:o});e.dispatchEvent(t)}function l(e,i,o){if(e&&e[i]){var t={element:o[0],valueAccessor:o[1]};return o.length>2&&(t.viewModel=o[2],o.length>3&&(t["boolean"==typeof o[3]?"fromCache":"cachedNodes"]=o[3])),n.ignoreDependencies(e[i],e,[t])}}function r(i,o,t){if(null!=i){var l=e.ModuleBinding.defaults[o];if(null!=l&&i){var r=i[l];if("function"==typeof r){var d=void 0;return t&&(d={element:t[0],valueAccessor:t[1]},t.length>2&&(d["boolean"==typeof t[2]?"fromCache":"cachedNodes"]=t[2])),n.ignoreDependencies(r,i,[d])}}}}function d(e,i){if(e&&i){var o=e[i];"function"==typeof o&&n.ignoreDependencies(o,e)}}function a(e,i,o){for(var t=e;null!=t;){var l=n.virtualElements.nextSibling(t),r=t.nodeType;t===i||1!==r&&8!==r||o(t),t=l}}function u(e,i){for(var o=i.length-1;o>=0;o--)n.virtualElements.prepend(e,i[o])}function s(e,n){if(n)for(var i=0;i<e.length;i++){var o=e[i];1===o.nodeType&&n(o)}}function c(n,i){return n=n||require,new Promise(function(o,t){n([i],function(e){o(e)},function(n){e.Logger.error("ojModule failed to load "+i),t(n)})})}n.bindingHandlers.ojModule={init:function(f,v,p,h,m){var w,g,M,C,b,y,N,E,P={},V=-1,D=f.parentNode&&"OJ-MODULE"===f.parentNode.nodeName,j=D?function(){}:r,A=D?function(){}:l,B=D?d:function(){},H=D?t:function(){};function $(){y&&(y(),y=null)}var x=function(e){j(e,"disposeMethod",[f,v])},T=function(){x(w)};n.utils.domNodeDisposal.addDisposeCallback(f,function(){T();for(var e=Object.keys(P),n=0;n<e.length;n++){var i=P[e[n]].model;x(i)}$()});var F=new Error("Promise cancelled because ojModule is fetching new View and ViewModel"),O=function(e){if(e!=V)throw F},S=f;return 8===f.nodeType&&(S=f.parentNode,n.virtualElements.setDomNodeChildren(f,[]),b=f.nextSibling),n.computed(function(){if(V++,!y){var t=e.Context.getContext(S).getBusyContext();y=t.addBusyState({description:"ojModule binding on a node with the Id "+f.id+"is loading the module. Binding evaluator: "+v.toString()})}var l,r,d,p,h,x,L,k,q,I,U,_,z,J,Y=0===V,K=n.utils.unwrapObservable,R=K(v());"string"==typeof R?l=R:(l=K(R.name),r=K(R.viewName),d=K(R.params),p=K(R.viewModelFactory),h=K(R.createViewFunction),x=K(R.cacheKey),L=K(R.lifecycleListener),k=K(R.animation),_=K(R.view),z=K(R.viewModel),q=K(R.require),J=K(R.cleanupMode)),null==q||q instanceof Function||(U=q.viewPath,I=q.modelPath,q=q.instance),r=null==r?l:r;var W,G,Q,X=e.ModuleBinding._EMPTY_MODULE===r,Z=A(L,"activated",[f,v]);if(H(S,"ojTransitionStart",[z]),X)W=Promise.resolve([]),G=Promise.resolve(null);else{var ee=null==x?null:P[x];null!=ee&&(delete P[x],W=Promise.resolve(ee.view),G=Promise.resolve(ee.model))}if(null==W&&null!=_&&(W=Promise.resolve(_)),null==G&&(null!=z?G=Promise.resolve(z):null!=p&&(G=n.ignoreDependencies(p.createViewModel,p,[d,v])),null==G&&null!=l&&(null==I&&(I=e.ModuleBinding.defaults.modelPath),G=c(q,I+l)),null!=G&&(G=G.then(function(e,n){return O(e),"function"==typeof n?new n(d):j(n,"initializeMethod",[f,v])||n}.bind(null,V)),null==W&&null!=h&&(W=G.then(function(e,n){if(O(e),null==n)throw $(),"createViewFunction option cannot be used when the ViewModel is null";var i=n[h];if(null==i)throw $(),"function specified by the createViewFunction option was not found on the ViewModel";return i.call(n)}.bind(null,V)))),null==W)){if(null==r)throw $(),new Error("View name or view instance must be specified");null==U&&(U=e.ModuleBinding.defaults.viewPath),W=c(q,U+r+e.ModuleBinding.defaults.viewSuffix)}if(null==W)throw $(),new Error("ojModule is missing a View");null!=G&&(Q=G.then(function(e,n){return O(e),j(n,"activatedHandler",[f,v])}.bind(null,V))),Promise.all([W,G,Z,Q,g]).then(function(t,l){if(t==V){var r=l[0];if(null==r)throw $(),"The module's View was resolved to null";var c,p=function(e,i){if("string"==typeof e)e=n.utils.parseHtmlFragment(e);else if(function(e){return window.DocumentFragment?e instanceof DocumentFragment:e&&11===e.nodeType}(e))e=n.utils.arrayPushAll([],e.childNodes);else{if(!Array.isArray(e))throw i(),"The View ("+e+") has an unsupported type";e=n.utils.arrayPushAll([],e)}return e}(r,$),h=l[1],y=!1,F=function(e,i,o){for(var t=[],l=n.virtualElements.firstChild(e);null!=l&&l!=o;l=l.nextSibling)l!=i&&t.push(l);return t}(f,C,b),O=function(e,i){var o=[];return a(n.virtualElements.firstChild(e),i,function(e){o.push(e)}),o}(f,C);null==M||N?D&&(c=F):(y=!0,c=F,C||((C=document.createElement("div")).className="oj-helper-module-cache",n.virtualElements.prepend(f,C)));var q=!1,I=function(t){if(!q){if(q=!0,y)o(F,C),i(f,t||f,C);else if(D&&"none"===E)for(var l=0;l<c.length;l++){var r=c[l];r.parentNode.removeChild(r)}else O.forEach(function(e){n.cleanNode(e)}),i(f,t||f,C);Y||(A(L,"detached",[f,v,w,c]),j(w,"detachedHandler",[f,v,c]),B(w,"disconnected"),H(S,"ojViewDisconnected",[w,c]),A(L,"deactivated",[f,v,w]),j(w,"deactivatedHandler",[f,v])),y?(s(c,e.Components?e.Components.subtreeHidden:null),P[M]={model:w,view:c}):D&&"none"===E||T(),w=h,M=x,N=X,E=J}},U=function(i){u(i=i||f,p);var o=null!=ee;o&&s(p,e.Components?e.Components.subtreeShown:null),A(L,"attached",[i,v,h,o]),j(h,"attachedHandler",[i,v,o]),B(h,"connected"),H(S,"ojViewConnected",[h]);var t=D&&function(e,i){for(var o,t=0;t<e.length&&!(o=n.contextFor(e[t]));t++);return o&&o.$module&&o.$module==i}(p,h);if(!o&&!t){var l=m.createChildContext(h,void 0,function(e){e.$module=h,e.$params=d});D&&(l.$parent=void 0,l.$parents=void 0,l.$parentContext=void 0,l.$props=void 0,l.$properties=void 0,l.$slotNodeCounts=void 0,l.$slotCounts=void 0,l.$unique=void 0,l.$uniqueId=void 0),function(e,i,o,t){var l=n.bindingProvider.instance,r=l.preprocessNode;r&&(a(i,t,function(e){r.call(l,e)}),i=n.virtualElements.firstChild(e)),a(i,t,function(e){n.applyBindings(o,e)})}(i,p[0],l,C),A(L,"bindingsApplied",[i,v,h]),j(h,"bindingsAppliedHandler",[i,v])}},_=function(){A(L,"transitionCompleted",[f,v,h]),j(h,"transitionCompletedHandler",[f,v]),B(h,"transitionCompleted"),H(S,"ojTransitionEnd",[h]),$()};if(null!=k){var z=function(i,t,l,r,d,a,c){var f,v,p=t.canAnimate;if(null==p||p.call(t,i)){var h=t.prepareAnimation.call(t,i);h&&(f=h.newViewParent,v=h.oldViewParent);var m=f||l;v&&v!==l?o(r,v):m===l&&a(null),m!==l&&n.virtualElements.setDomNodeChildren(m,[]),d(m);var w=Array.prototype.slice.call(m.childNodes),g=!1,M=function(){if(!g&&(g=!0,l!==m)){u(l,w);var n=l.parentNode&&"OJ-MODULE"===l.parentNode.nodeName;e.Components&&!n&&(s(w,e.Components.subtreeDetached),s(w,e.Components.subtreeAttached))}},C=a.bind(null,v);i.newViewParent=f,i.oldViewParent=v,i.oldViewNodes=r,i.removeOldView=C,i.insertNewView=M;var b=function(){C(),M(),c()};return t.animate.call(t,i).then(b,function(n){b(),e.Logger.error("ojModule animation promise was rejected")})}}(function(e,n,i,o,t,l){return{node:l?e.parentNode:e,valueAccessor:l?null:n,isInitial:i,oldViewModel:o,newViewModel:t}}(f,v,Y,w,h,D),k,f,F,U,I,_);g=function(e){return e?new Promise(function(n,i){e.then(n,n)}):e}(z)}else g=void 0;g||(I(null),U(null),_())}}.bind(null,V),function(n,i){i!==F&&null!=i&&($(),e.Logger.error(i))}.bind(null,V))},null,{disposeWhenNodeIsRemoved:f}),{controlsDescendantBindings:!0}}},n.virtualElements.allowedBindings.ojModule=!0}()});