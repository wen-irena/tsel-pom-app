"use strict";define(["ojs/ojcore","jquery","knockout","ojs/ojknockout","ojs/ojcomposite","promise","ojs/ojpopupcore","ojs/ojanimation","ojs/ojmessage"],function(e,t,i){function s(e){this._composite=e.element,this.containerId=[e.unique,"mc"].join("_"),this._messagesContainerId=this.containerId,this.handleOpen=this._handleOpen.bind(this),this.handleClose=this._handleClose.bind(this),this.handleAnimateStart=this._handleAnimateStart.bind(this),this.bindingsApplied=this._bindingsApplied.bind(this),this.disconnected=this._disconnected.bind(this),this.connected=this._connected.bind(this),this.close=this._close.bind(this),this.closeAll=this._closeAll.bind(this),this.propertyChanged=this._propertyChanged.bind(this),this._properties=e.properties,this._createObservables(),this._updateLandmark()}function n(e){this.Init(e)}s.prototype._bindingsApplied=function(){var e=document.getElementById(this._messagesContainerId);e.addEventListener("ojFocus",this._navigationEventListener.bind(this),!1),e.addEventListener("ojBeforeOpen",this._handleBeforeOpen.bind(this),!1)},s.prototype._disconnected=function(){s.NAVIGATION_TRACKER.remove(this._messagesContainerId),e.ZOrderUtils.getStatus(this._composite)===e.ZOrderUtils.STATUS.OPEN&&this._closeOverlay()},s.prototype._connected=function(){s.NAVIGATION_TRACKER.add(this._messagesContainerId)},s.prototype._closeAll=function(e){if(this._isMessagesShown())for(var t=this._getDefaultSlotMessageElements(),i=0;i<t.length;i++){var s=t[i].message,n=!0;e&&(n=e(s)),n&&t[i].close()}},s.prototype._propertyChanged=function(e){"external"===e.updatedFrom&&"position"===e.property?e.previousValue&&e.value?this._refresh():!e.previousValue&&e.value?this._getDefaultSlotMessageElements().length>0&&(this._isMessagesShown()&&this._hideMessages(),this._openOverlay()):e.previousValue&&!e.value&&this._getDefaultSlotMessageElements().length>0&&(this._isOverlayOpen()&&this._closeOverlay(),this._showMessages()):"external"===e.updatedFrom&&"display"===e.property?this._getDefaultSlotMessageElements().length>0&&(this._isOverlayOpen()?(this._closeOverlay(),this._openOverlay(),this._refresh()):this._isMessagesShown()&&(this._hideMessages(),this._showMessages())):"external"===e.updatedFrom&&"translations"===e.property&&this._updateLandmark()},s.prototype._close=function(e){if(e&&this._isMessagesShown())for(var i=this._getDefaultSlotMessageElements(),s=0;s<i.length;s++){t(i[s]).prop("message")===e&&i[s].close()}},s.prototype._isEventPertaining=function(t){var i=t.target,s=document.getElementById(this._messagesContainerId);return!("OJ-MESSAGE"!==i.nodeName||!e.DomUtils.isAncestor(s,i))},s.prototype._handleBeforeOpen=function(e){e.defaultPrevented||!this._isEventPertaining(e)||this._isMessagesShown()||(this._isPresentationInline()?this._showMessages():this._openOverlay())},s.prototype._handleOpen=function(t){if(!t.defaultPrevented&&this._isEventPertaining(t)){var i=t.detail.message,s=e.Translations.getComponentTranslations("oj-ojMessage").categories,n={category:i.category?i.category:s[i.severity],summary:i.summary},o=this._getLiveRegion(),a=e.Translations.getTranslatedString("oj-ojMessages.ariaLiveRegion.newMessage",n);o.announce(a),this._refresh()}},s.prototype._handleClose=function(e){if(!e.defaultPrevented&&this._isEventPertaining(e)){var i,n=e.target;e._originalEvent&&(i=this._getNextFocus(n)),i&&i.focus(),t(n).remove(),0===this._getDefaultSlotMessageElements().length&&(s.NAVIGATION_TRACKER.togglePreviousFocus(this._messagesContainerId),this._isOverlayOpen()?this._closeOverlay():this._hideMessages())}},s.prototype._getNextFocus=function(e){var t,i,s=this._getDefaultSlotMessageElements(),n=s.indexOf(e);return n-1>-1?t=s[n-1]:n+1<=s.length-1&&(t=s[n+1]),t&&(i=t.querySelector('.oj-message-category[tabindex="-1"]')),i},s.prototype._handleAnimateStart=function(t){if(!t.defaultPrevented&&this._isEventPertaining(t)){t.preventDefault();var i=t.detail.element,s=t.detail.action,n=this._isPresentationInline()?"general":this._computeDisplay(),o=this._getThemedAnimateOptions(n,s),a=t.detail.endCallback;e.AnimationUtils[o.effect](i,o).then(a)}},s._DEFAULTS={general:{animation:{open:{effect:"expand",duration:"300ms"},close:{effect:"collapse",duration:"300ms"}},position:{my:{horizontal:"center",vertical:"top"},at:{horizontal:"center",vertical:"top"},of:"window",collision:"none"}},notification:{animation:{open:{effect:"slideIn",duration:"300ms"},close:{effect:"slideOut",duration:"300ms",direction:"end"}},position:{my:{horizontal:"end",vertical:"top"},at:{horizontal:"end",vertical:"top"},of:"window",collision:"none"}}},s.prototype._getThemedAnimateOptions=function(t,i){var n=e.ThemeUtils.parseJSONFromFontFamily("oj-messages-option-defaults");return n&&n[t]&&n[t].animation&&n[t].animation[i]?n[t].animation[i]:s._DEFAULTS[t].animation[i]},s.prototype._computeDisplay=function(){return this._properties.display},s.prototype._isPresentationInline=function(){return!this._properties.position},s.prototype._computeContainerSelectors=function(){var e=this._computeDisplay(),i=t(this._composite);return i.removeClass("oj-messages-general oj-messages-notification oj-messages-inline"),this._isPresentationInline()?i.addClass("oj-messages-inline"):i.addClass(["oj-messages",e].join("-")),"oj-messages-container"},s.prototype._getThemedPosition=function(){var t=this._computeDisplay(),i=e.ThemeUtils.parseJSONFromFontFamily("oj-messages-option-defaults");return i[t]&&i[t].position?i[t].position:s._DEFAULTS[t].position},s.prototype._getPositionAsJqUi=function(){var t=e.PositionUtils.coerceToJqUi(this._computePosition()),i="rtl"===e.DomUtils.getReadingDirection();return t=e.PositionUtils.normalizeHorizontalAlignment(t,i)},s.prototype._computePosition=function(){var t=this._properties.position;return e.PositionUtils.coerceToJet(t,this._getThemedPosition())},s.prototype._getDefaultSlotMessageElements=function(){function t(e){var i="";if(e)if(e.id&&e.id.length>0)i="#"+e.id;else{i=e.nodeName;var s=e.getAttribute("class");if(s&&(i+="."+s.split(" ").join(".")),e.parentNode)return t(e.parentNode)+" > "+i}return i}for(var i=document.getElementById(this._messagesContainerId),s=[],n=e.BaseCustomElementBridge.getSlotMap(i)[""],o=0;n&&o<n.length;o++)"OJ-MESSAGE"!==n[o].nodeName?e.Logger.error(["JET oj-messages id='",t(this._composite),"': can contain only oj-message children in its default slot. ","Found a child element id='",t(n[o]),"'."].join("")):s.push(n[o]);return s},s.prototype._isMessagesShown=function(){return t(this._composite).is(":visible")},s.prototype._showMessages=function(){this._isMessagesShown()||(t(this._composite).show(),e.Components.subtreeShown(t(this._composite))),s.NAVIGATION_TRACKER.add(this._messagesContainerId),this._announceNavigation()},s.prototype._hideMessages=function(){this._isMessagesShown()&&(t(this._composite).hide(),e.Components.subtreeHidden(this._composite),s.NAVIGATION_TRACKER.remove(this._messagesContainerId),this._liveRegion&&(this._liveRegion.destroy(),delete this._liveRegion))},s.prototype._openOverlay=function(){var i=t(this._composite),n={};n[e.PopupService.OPTION.POPUP]=i,n[e.PopupService.OPTION.LAUNCHER]=i,n[e.PopupService.OPTION.POSITION]=this._getPositionAsJqUi(),n[e.PopupService.OPTION.EVENTS]=this._getPopupServiceEvents(),n[e.PopupService.OPTION.LAYER_SELECTORS]=["oj","messages","layer"].join("-"),n[e.PopupService.OPTION.MODALITY]=e.PopupService.MODALITY.MODELESS,n[e.PopupService.OPTION.CUSTOM_ELEMENT]=!0,e.PopupService.getInstance().open(n),this._showMessages(),this._overlayEventsCallback=s._overlayEventsListener.bind(this,i),i[0].addEventListener("keydown",this._overlayEventsCallback,!1)},s.prototype._closeOverlay=function(){this._hideMessages();var i=t(this._composite),s={};s[e.PopupService.OPTION.POPUP]=i,e.PopupService.getInstance().close(s);var n=this._overlayEventsCallback;delete this._overlayEventsCallback,i[0].removeEventListener("keydown",n,!1)},s.prototype._isOverlayOpen=function(){var t=this._composite,i=e.ZOrderUtils.getStatus(t);return i===e.ZOrderUtils.STATUS.OPENING||i===e.ZOrderUtils.STATUS.OPEN||i===e.ZOrderUtils.STATUS.CLOSING},s._overlayEventsListener=function(e,i){if(!i.defaultPrevented&&i.keyCode===t.ui.keyCode.TAB){var s=i.target,n=e.find(":tabbable");if(n.length>0){var o=n[0],a=n[n.length-1];o===a&&s===o?i.preventDefault():o===s&&i.shiftKey?(i.preventDefault(),a.focus()):a!==s||i.shiftKey||(i.preventDefault(),o.focus())}else i.preventDefault()}},s.prototype._navigationEventListener=function(e){e.target.id===this._messagesContainerId&&(e.preventDefault(),this._announceNavigation(!0))},s.prototype._announceNavigation=function(t){var i,s=e.AgentUtils.getAgentInfo().os===e.AgentUtils.OS.IOS||e.AgentUtils.getAgentInfo().os===e.AgentUtils.OS.ANDROID;i=t?s?void 0:"ariaLiveRegion.navigationFromKeyboard":s?"ariaLiveRegion.navigationToTouch":"ariaLiveRegion.navigationToKeyboard";var n=this._getLiveRegion(),o=e.Translations.getTranslatedString(["oj-ojMessages",i].join("."));n.announce(o)},s.prototype._getLiveRegion=function(){var e=this._messagesContainerId;return this._liveRegion||(this._liveRegion=new n(e)),this._liveRegion},s.prototype._getPopupServiceEvents=function(){var t={};return t[e.PopupService.EVENT.POPUP_CLOSE]=this._closeOverlay.bind(this),t[e.PopupService.EVENT.POPUP_REMOVE]=this._surrogateRemoveHandler.bind(this),t[e.PopupService.EVENT.POPUP_REFRESH]=this._refresh.bind(this),t},s.prototype._refresh=function(){if(this._isOverlayOpen()){var e=this._getPositionAsJqUi();t(this._composite).position(e)}},s.prototype._surrogateRemoveHandler=function(){this._closeOverlay(),this._composite.parentElement.removeChild(this._composite)},s.prototype._createObservables=function(){this.containerSelectors=i.pureComputed(this._computeContainerSelectors.bind(this),this)},s.prototype._computeLabelLandmark=function(){var t=this._properties;return e.StringUtils.isEmptyOrUndefined(t.translations.labelLandmark)?e.Translations.getTranslatedString("oj-ojMessages.labelLandmark"):t.translations.labelLandmark},s.prototype._updateLandmark=function(){var e=this._computeLabelLandmark();this._composite.setAttribute("aria-label",e),this._composite.setAttribute("role","complementary")},s.NAVIGATION_TRACKER={_messagesContainerIds:[],_priorFocusCache:{},add:function(e){this.remove(e),this._messagesContainerIds.push(e),this._start(e)},remove:function(e){var t=this._messagesContainerIds,i=t.indexOf(e);i>-1&&t.splice(i,1),this._stop(e)},togglePreviousFocus:function(i){var s=this._priorFocusCache,n=s[i];return!!(n&&t(n).is(":visible")&&e.ZOrderUtils.isAboveTopModalLayer(n))&&(n.focus(),delete s[i],!0)},_addPriorFocusCache:function(e,t){this._priorFocusCache[e]=t},_start:function(e){var i=document.getElementById(e);if(i){var s=this._messageContainerListener.bind(this,e);if(i.addEventListener("focus",s,!0),i.addEventListener("keydown",s,!1),i.addEventListener("click",s,!1),t(i).data("oj_messages_nmtl",s),!this._documentCallback){this._documentCallback=this._documentListener.bind(this);var n=document.documentElement;n.addEventListener("keydown",this._documentCallback,!1),n.addEventListener("blur",this._documentCallback,!0)}}},_stop:function(e){var i=document.getElementById(e);if(i){var s=t(i).data("oj_messages_nmtl");s&&(i.removeEventListener("focus",s,!0),i.removeEventListener("keydown",s,!1),i.removeEventListener("click",s,!1))}if(this._documentCallback&&!(this._messagesContainerIds.length>0)){var n=document.documentElement;n.removeEventListener("keydown",this._documentCallback,!1),n.removeEventListener("blur",this._documentCallback,!0),delete this._documentCallback}},_indexOfFocusWithin:function(t){for(var i=this._messagesContainerIds,s=0;s<i.length;s++){var n=document.getElementById(i[s]);if(n&&e.DomUtils.isAncestorOrSelf(n,t))return s}return-1},_documentListener:function(i){if(!i.defaultPrevented){var s=this._messagesContainerIds;if("keydown"===i.type&&117===i.keyCode&&s.length>0){var n=this._indexOfFocusWithin(i.target);if(n>-1)return;for(var o=n=s.length-1;o>-1;o++){var a=document.getElementById(s[o]);if(a&&t(a).is(":visible")&&e.ZOrderUtils.isAboveTopModalLayer(a)){var r=a.querySelector('.oj-message-category[tabindex="-1"]');i.preventDefault(),this._addPriorFocusCache(s[o],i.target),r.focus();var l=new CustomEvent("ojFocus",{bubbles:!1,cancelable:!0});a.dispatchEvent(l);break}}}else"blur"===i.type&&(this._prevActiveElement=i.target)}},_messageContainerListener:function(i,s){if(!s.defaultPrevented)if("focus"===s.type||"click"===s.type){var n=document.getElementById(i),o=this._prevActiveElement;o&&n&&!e.DomUtils.isAncestorOrSelf(n,o)&&this._addPriorFocusCache(i,o)}else"keydown"!==s.type||117!==s.keyCode&&s.keyCode!==t.ui.keyCode.ESCAPE||this.togglePreviousFocus(i)&&s.preventDefault()}},n.prototype.Init=function(e){this._id=e},n.prototype.destroy=function(){var e=t(document.getElementById(n._LIVE_REGION_ID)),i=this._id;delete this._id,e.find('div[data-container-id="'+i+'"]').remove(),e.children("div").length<1&&e.remove()},n.prototype.announce=function(e){var i=n._getLiveRegion(),s=this._id;t("<div>").attr("data-container-id",s).text(e).appendTo(i)},n._getLiveRegion=function(){var e=t(document.getElementById(n._LIVE_REGION_ID));return 0===e.length&&((e=t("<div>")).attr({id:n._LIVE_REGION_ID,role:"log","aria-live":"polite","aria-relevant":"additions"}),e.addClass("oj-helper-hidden-accessible"),e.appendTo(document.body)),e},n._LIVE_REGION_ID="__oj_messages_arialiveregion",e.Composite.register("oj-messages",{view:'<div role="presentation" :id="[[containerId]]" :class="[[containerSelectors]]"      on-oj-open="[[handleOpen]]" on-oj-close="[[handleClose]]"      on-oj-animate-start="[[handleAnimateStart]]">  <oj-bind-slot>  </oj-bind-slot>    \x3c!-- ko foreach: $props.messages --\x3e    <oj-message message="[[$data]]">    </oj-message>    \x3c!-- /ko --\x3e</div>',viewModel:s,metadata:{name:"oj-messages",displayName:"oj-messages",version:"1.0.0",jetVersion:"^5.0.0",properties:{messages:{type:"Array<object>",writeback:!1,value:null},display:{type:"string",enumValues:["general","notification"],translatable:!1,value:"general"},position:{type:"object",translatable:!1,properties:{my:{type:"object|string",properties:{horizontal:{type:"string",enumValues:["start","end","left","center","right"]},vertical:{type:"string",enumValues:["top","center","bottom"]}}},at:{type:"object|string",properties:{horizontal:{type:"string",enumValues:["start","end","left","center","right"]},vertical:{type:"string",enumValues:["top","center","bottom"]}}},offset:{type:"object",properties:{x:{type:"number"},y:{type:"number"}}},of:{type:"string|object"},collision:{type:"string",enumValues:["flip","fit","flipfit","flipcenter","none"]}}},translations:{type:"object",writeback:!1,value:{labelLandmark:""},properties:{labelLandmark:{type:"string",translatable:!0}}}},methods:{close:{params:[{name:"message",type:"object"}]},closeAll:{params:[{name:"filter",type:"function"}]}}}})});