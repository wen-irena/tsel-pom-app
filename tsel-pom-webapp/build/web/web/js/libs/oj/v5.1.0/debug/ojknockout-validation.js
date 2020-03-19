"use strict";define(["ojs/ojcore","jquery","knockout","ojs/ojknockout","ojs/ojmessaging"],function(n,e,i){n.InvalidComponentTracker=function(){this.Init()},n.Object.createSubclass(n.InvalidComponentTracker,n.Object,"oj.InvalidComponentTracker"),n.InvalidComponentTracker._OPTION_MESSAGES_SHOWN="messagesShown",n.InvalidComponentTracker._OPTION_MESSAGES_HIDDEN="messagesHidden",n.InvalidComponentTracker._OPTION_DISABLED="disabled",n.InvalidComponentTracker._OPTION_READONLY="readOnly",n.InvalidComponentTracker.prototype.Init=function(){n.InvalidComponentTracker.superclass.Init.call(this),this._tracked=[],this._invalid=[],this._invalidHidden=[],this.invalidShown=!1,this.invalidHidden=!1},n.InvalidComponentTracker.prototype.focusOnFirstInvalid=function(){var e,i,a=null,t=this,o=this._updateCounter;return e=n.Context.getPageContext().getBusyContext(),i=e.addBusyState({description:"Setting Focus to first invalid component."}),this.invalidShown&&(a=this._getFirstInvalidComponent()),setTimeout(function(){(a=o===t._updateCounter&&a||t._getFirstInvalidComponent())&&a("instance").GetFocusElement().focus(),i()},1),!!a},n.InvalidComponentTracker.prototype.showMessages=function(){var n,e,i;if(this.invalidHidden)for(e=this._invalidHidden.length,n=0;n<e;n++)this._invalidHidden[n]&&(i=this._tracked[n].component.call(i,"showMessages"))},n.InvalidComponentTracker.prototype._getFirstInvalidComponent=function(){var n=0,e=[],i=this._invalid.length;for(n=0;n<i;n++)this._invalid[n]&&e.push(this._tracked[n]);return 0===e.length?null:(e.sort(function(n,e){var i=n.element,a=e.element;return i.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1}),e[0].component)},n.InvalidComponentTracker.prototype._remove=function(n){var i=-1,a=!1;return e.each(this._tracked,function(e,a){i<0&&a.component===n&&(i=e)}),i>=0&&(this._tracked.splice(i,1),this._invalid.splice(i,1),this._invalidHidden.splice(i,1),this._updateInvalidProperties(),a=!0),a},n.InvalidComponentTracker.prototype._update=function(i,a,t,o){var r,d,l,_=i.call(i,"isValid"),s=!0,u=-1;switch(e.each(this._tracked,function(n,e){u<0&&e.component===i&&(u=n)}),t){case n.InvalidComponentTracker._OPTION_MESSAGES_SHOWN:case n.InvalidComponentTracker._OPTION_MESSAGES_HIDDEN:l=!1,o&&(u<0&&(u=this._tracked.push({component:i,element:a})-1,this._initializeInvalidTrackers(u,l)),_||n.InvalidComponentTracker._hasInvalidMessages(o)&&(l=!0,t===n.InvalidComponentTracker._OPTION_MESSAGES_SHOWN&&(r=i.call(i,"option",n.InvalidComponentTracker._OPTION_DISABLED),d=i.call(i,"option",n.InvalidComponentTracker._OPTION_READONLY),l=!r&&!d)),s=this._updateInvalidTracker(t,u||0,l),this._updateInvalidProperties(),s&&(void 0===this._updateCounter&&(this._updateCounter=0),this._updateCounter++));break;case n.InvalidComponentTracker._OPTION_DISABLED:case n.InvalidComponentTracker._OPTION_READONLY:s=!1,o&&(s=this._updateInvalidTracker(n.InvalidComponentTracker._OPTION_MESSAGES_SHOWN,u||0,!1),s=this._updateInvalidTracker(n.InvalidComponentTracker._OPTION_MESSAGES_HIDDEN,u||0,!1)||s,this._updateInvalidProperties())}return s},n.InvalidComponentTracker.prototype._initializeInvalidTrackers=function(e,i){void 0===this._invalid[e]&&this._updateInvalidTracker(n.InvalidComponentTracker._OPTION_MESSAGES_SHOWN,e,i),void 0===this._invalidHidden[e]&&this._updateInvalidTracker(n.InvalidComponentTracker._OPTION_MESSAGES_HIDDEN,e,i)},n.InvalidComponentTracker.prototype._updateInvalidProperties=function(){this.invalidShown=this._invalid.indexOf(!0)>=0,this.invalidHidden=this._invalidHidden.indexOf(!0)>=0},n.InvalidComponentTracker.prototype._updateInvalidTracker=function(e,i,a){var t,o=!1;return t=e===n.InvalidComponentTracker._OPTION_MESSAGES_SHOWN?this._invalid:e===n.InvalidComponentTracker._OPTION_MESSAGES_HIDDEN?this._invalidHidden:[],i>=0&&void 0!==t[i]?(o=t[i]!==a)&&(t[i]=a):(t.push(a),o=!0),o},n.InvalidComponentTracker._hasInvalidMessages=function(e){return!n.Message.isValid(e)},n.ValueBinding=function(){},n.ValueBinding._ATTRIBUTE_INVALID_COMPONENT_TRACKER="invalidComponentTracker",n.ValueBinding._EVENT_OPTIONCHANGE="ojoptionchange",n.ValueBinding._OPTION_MESSAGES_SHOWN="messagesShown",n.ValueBinding._OPTION_MESSAGES_HIDDEN="messagesHidden",n.ValueBinding._OPTION_DISABLED="disabled",n.ValueBinding._OPTION_READONLY="readOnly",n.ValueBinding._update=function(e,a,t,o,r){var d,l={},_=r.call()[n.ValueBinding._ATTRIBUTE_INVALID_COMPONENT_TRACKER];if(e===n.ValueBinding._OPTION_DISABLED||e===n.ValueBinding._OPTION_READONLY)return null!==(d=_&&_.peek()||null)&&i.isWriteableObservable(_)&&d._update.call(d,o,t,e,a)&&_.valueHasMutated(),l[e]=a,l},n.ValueBinding._init=function(n,e){var i={};return i[n]=e,i},n.ValueBinding._afterCreate=function(e,i,a,t){var o=t.call();return e===n.ValueBinding._ATTRIBUTE_INVALID_COMPONENT_TRACKER&&!!o[e]&&n.ValueBinding._registerInvalidComponentTrackerWriteback(e,o,i,a),{}},n.ValueBinding._beforeDestroy=function(a,t,o,r){var d,l=e(t),_=r.call()[a];a===n.ValueBinding._ATTRIBUTE_INVALID_COMPONENT_TRACKER&&l&&(l.off(n.ValueBinding._EVENT_OPTIONCHANGE,n.ValueBinding._updateInvalidComponentTracker),_&&i.isWriteableObservable(_)&&(d=_.peek())._remove.call(d,o)&&_.valueHasMutated())},n.ValueBinding._updateInvalidComponentTracker=function(e){var a,t=e.data.tracker,o=e.data.component,r=e.data.element,d=arguments[1],l=d.option,_=d.value;l!==n.ValueBinding._OPTION_MESSAGES_SHOWN&&l!==n.ValueBinding._OPTION_MESSAGES_HIDDEN||t&&i.isWriteableObservable(t)&&(a=t.peek())&&a._update.call(a,o,r,l,_)&&t.valueHasMutated()},n.ValueBinding._registerInvalidComponentTrackerWriteback=function(a,t,o,r){var d,l,_,s,u=t[a],c=e(o);if(!i.isObservable(u))throw new Error("Binding attribute "+n.ValueBinding._ATTRIBUTE_INVALID_COMPONENT_TRACKER+" should be bound to a ko observable.");null==(s=u.peek())&&u(s=new n.InvalidComponentTracker),null!==s&&(i.isWriteableObservable(u)&&(d=r.call(r,"option",n.ValueBinding._OPTION_MESSAGES_SHOWN),l=r.call(r,"option",n.ValueBinding._OPTION_MESSAGES_HIDDEN),s._update.call(s,r,o,n.ValueBinding._OPTION_MESSAGES_SHOWN,d),s._update.call(s,r,o,n.ValueBinding._OPTION_MESSAGES_HIDDEN,l),u.valueHasMutated()),_={tracker:u,component:r,element:o},c.on(n.ValueBinding._EVENT_OPTIONCHANGE,_,n.ValueBinding._updateInvalidComponentTracker))},n.ComponentBinding.getDefaultInstance().setupManagedAttributes({for:"editableValue",attributes:[n.ValueBinding._ATTRIBUTE_INVALID_COMPONENT_TRACKER,n.ValueBinding._OPTION_DISABLED,n.ValueBinding._OPTION_READONLY],init:n.ValueBinding._init,update:n.ValueBinding._update,afterCreate:n.ValueBinding._afterCreate,beforeDestroy:n.ValueBinding._beforeDestroy})});