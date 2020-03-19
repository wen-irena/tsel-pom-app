"use strict";define(["ojs/ojcore","jquery","hammerjs","ojs/ojjquery-hammer","promise","ojs/ojcomponentcore","ojs/ojpopupcore","ojs/ojanimation","ojs/ojoption"],function(e,t,i){!function(){e.__registerWidget("oj.ojMenu",t.oj.baseComponent,{defaultElement:"<ul>",delay:300,role:"menu",widgetEventPrefix:"oj",options:{menuSelector:"ul",openOptions:{display:"auto",initialFocus:"menu",launcher:null,position:{my:{horizontal:"start",vertical:"top"},offset:{x:0,y:0},at:{horizontal:"start",vertical:"bottom"},of:void 0,collision:"flipfit"}},submenuOpenOptions:{position:{my:"start top",at:"end top",collision:"flipfit"}},animateStart:null,animateEnd:null,beforeOpen:null,close:null,open:null,action:null},_ComponentCreate:function(){if(this._super(),this._focusForTesting=this._focus,this._nextForTesting=this._next,this._selectForTesting=this._select,this._IsCustomElement()){var t=this.element.parent();if(t.is("oj-option"))t.parent().is("oj-menu")&&(this._isSubmenu=!0,this._createAsSubmenu());this._isSubmenu||this._createAsTopLevelMenu();var i=this.options;i.openOptions.position=e.PositionUtils.coerceToJet(i.openOptions.position)}else{if(l&&"ul"!==this.element[0].tagName.toLowerCase())throw new Error("Cancel item supported for <ul> menus only.");this._createAsTopLevelMenu()}},_createAsTopLevelMenu:function(){var e=this;this.activeMenu=this.element,this.mouseHandled=!1,this._setupSwipeBehavior(),this.element.uniqueId().addClass("oj-menu oj-component").hide().attr({role:this.role,tabIndex:"0"}),this._on(!0,{"mousedown .oj-menu-item":function(e){this.options.disabled&&e.preventDefault()},click:function(e){this.options.disabled&&e.preventDefault()},keydown:function(e){this.options.disabled&&(e.keyCode!==t.ui.keyCode.ESCAPE&&e.keyCode!==t.ui.keyCode.TAB||(e.keyCode===t.ui.keyCode.TAB&&e.preventDefault(),this._launcher&&this._focusLauncherAndDismiss(e)))}}),this.options.disabled&&this.element.addClass("oj-disabled").attr("aria-disabled","true");var i=function(e){if(!this.focusHandled){this.focusHandled=!0;var i=t(e.currentTarget);try{this._focusIsFromPointer=!0,this._focus(e,i)}finally{this._focusIsFromPointer=!1}}}.bind(this),n=function(e){e&&e.target&&!t(e.target).is(":visible")||this._collapse(e,"eventSubtree")}.bind(this);this._on({"mousedown .oj-menu-item > a":function(e){e.preventDefault()},"click .oj-disabled > a":function(e){e.preventDefault()},click:function(e){this.mouseHandled=!1},touchstart:function(e){this.focusHandled=!1},mouseover:function(e){this.focusHandled=!1},"click .oj-menu-item:has(a)":function(e){var i=t(e.target).closest(".oj-menu-item");if(!this.mouseHandled&&i.not(".oj-disabled").length){if(this.mouseHandled=!0,e.preventDefault(),this.active&&this.active.closest(i).length&&this.active.get(0)!=i.get(0))return;i.has(".oj-menu").length?this._expand(e):(this._select(e),this.element.is(":focus")||(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".oj-menu").length&&this._clearTimer&&this._clearTimer()))}},"mouseenter .oj-menu-item":i,"touchstart .oj-menu-item":i,mouseleave:n,"mouseleave .oj-menu":n,focus:function(e,t){if(!t){var i=this.active||this.element.children(".oj-menu-item").eq(0);this._focus(e,i)}},keydown:this._keydown,keyup:function(e){e.keyCode!=t.ui.keyCode.ENTER&&e.keyCode!=t.ui.keyCode.SPACE||(this.__spaceEnterDownInMenu=!1)}}),this._focusable({applyHighlight:!r,recentPointer:function(){return e._focusIsFromPointer},setupHandlers:function(t,i){e._focusInHandler=t,e._focusOutHandler=i}}),this._usingCallback=t.proxy(this._usingHandler,this),this._setup()},_createAsSubmenu:function(){this.element.attr(e.Components._OJ_CONTAINER_ATTR,this.widgetName),this.element.uniqueId().addClass("oj-menu oj-component oj-menu-submenu oj-menu-dropdown").hide().attr({role:this.role,tabIndex:"0"}),this._setup()},__contextMenuPressHoldJustEnded:function(e){if(!arguments.length)return s;s=e},_processOjOptions:function(){var e=this;e._maxEndIconCount=0,e._maxStartIconCount=0,e._startIconWidth=0,e._endIconWidth=0;var i=this.element.find("oj-option");t.each(i,function(t,i){i.customOptionRenderer=e._customOptionRenderer.bind(e)})},_customOptionRenderer:function(i){var n=t(i),s=this;this._clearOption(n),this._hasSubmenus=!1;for(var o=n.children("a"),r=0;r<o.length;r++){var a=t(o[r]);if("opt"===a.attr("ojmenu")){a.children().removeClass("oj-menu-item-icon").removeClass("oj-menu-item-end-icon"),a.replaceWith(a.contents());break}}if(/[^\-\u2014\u2013\s]/.test(n.text())){this._initMenuItems(n);var l=document.createElement("a");l.setAttribute("href","#"),l.setAttribute("ojmenu","opt"),(a=t(l)).uniqueId().attr({tabIndex:"-1",role:this._itemRole()}),n.prepend(l);var u=e.BaseCustomElementBridge.getSlotMap(i);t.each(["startIcon","","endIcon"],function(e,i){if(u[i])if(""===i)t.each(u[i],function(e,i){t(i).is("oj-menu")?(s._setupSubmenu(a,t(i)),this._hasSubmenus=!0):a.append(i)});else if("startIcon"===i){var n=u[i].length;s._maxStartIconCount=Math.max(s._maxStartIconCount,n),t.each(u[i],function(e,i){t(i).addClass("oj-menu-item-icon"),a.append(i),n>1&&s._positionStartIcon(i,e,n)})}else if("endIcon"===i){var o=u[i].length;s._maxEndIconCount=Math.max(s._maxEndIconCount,o),t.each(u[i],function(e,i){t(i).addClass("oj-menu-item-end-icon"),a.append(i),o>1&&s._positionEndIcon(i,e,o)})}}),1==i.disabled?(n.addClass("oj-disabled"),a.attr("aria-disabled","true")):0==i.disabled&&(n.removeClass("oj-disabled"),a.removeAttr("aria-disabled"))}else this._initDividers(n);var c=this.element.children(),h=c.filter(".oj-menu-divider");this._initDividerNeighbors(c,h)},_positionStartIcon:function(e,i,n){if(this.isRtl)var s="margin-right";else s="margin-left";var o=parseInt(t(e).css(s),10);this._startIconWidth=-1*o,t(e).css(s,o*(n-i)+"px")},_positionEndIcon:function(e,i,n){if(this.isRtl)var s="margin-left",o="margin-right";else s="margin-right",o="margin-left";var r=parseInt(t(e).css(s),10);this._endIconWidth=-1*parseInt(t(e).css(o),10),t(e).css(s,r+this._endIconWidth*(n-i-1)+"px")},_updateMenuPadding:function(e){var t=e.children().children(),i=t.children(".oj-menu-item-icon:not(.oj-menu-cancel-icon)").length;e.toggleClass("oj-menu-icons",!!i).toggleClass("oj-menu-text-only",!i),this._maxStartIconCount&&this._maxStartIconCount>1&&this._applyAnchorIconPadding(t,this._startIconWidth,this._maxStartIconCount,!0);var n=t.children(".oj-menu-item-end-icon").length;e.toggleClass("oj-menu-end-icons",!!n),this._maxEndIconCount&&this._maxEndIconCount>1&&this._applyAnchorIconPadding(t,this._endIconWidth,this._maxEndIconCount,!1)},_applyAnchorIconPadding:function(e,i,n,s){if(this.isRtl&&s||!this.isRtl&&!s)var o="padding-right";else o="padding-left";e.each(function(){var e=parseInt(t(this).css(o),10);t(this).css(o,e+i*(n-1)+"px")})},_clickAwayHandler:function(e){if("focus"===e.type||"mousedown"===e.type||"touchstart"===e.type||93==e.which||121==e.which&&e.shiftKey||93==e.keyCode){if("mousedown"===e.type&&s)return;var i=this,o=n.slice(0,n.length);t.each(o,function(n,s){if(!t(e.target).closest(s.element).length&&("keydown"===e.type||"mousedown"===e.type&&3===e.which||!t(e.target).closest(s._launcher).length||s._launcherClickShouldDismiss&&("mousedown"===e.type&&3!==e.which||"touchstart"===e.type))&&!s._dismissEvent){s._dismissEvent=e;var o=s._collapse(e,"eventSubtree");i._runOnPromise(o,function(){s._dismissEvent&&(s._launcher&&s.__dismiss(e),s._dismissEvent=null)})}})}},_setOption:function(e,t){switch(this._superApply(arguments),e){case"translations.labelCancel":case"translations":this._cancelAnchor&&this._cancelAnchor.text(this.options.translations.labelCancel)}},_destroy:function(){this.element.is(":visible")&&this.__dismiss(),this._setWhenReady("none"),this._clearTimer&&this._clearTimer(),delete this._clearTimer,this.element.removeAttr("aria-activedescendant").removeClass("oj-component").find(".oj-menu").addBack().removeClass("oj-menu oj-menu-submenu oj-menu-icons oj-menu-end-icons oj-menu-text-only").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".oj-menu-item").removeClass("oj-menu-item").removeAttr("role").children("a").removeAttr("aria-disabled").removeUniqueId().removeClass("oj-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var e=t(this);e.data("oj-ojMenu-submenu-icon")&&e.remove()}),this.element.find("a").removeAttr("aria-expanded"),this.element.find(".oj-menu-divider").removeClass("oj-menu-divider").removeAttr("role"),n.indexOf(this)>=0&&n.splice(n.indexOf(this),1),delete this._popupServiceEvents,delete this._usingCallback;var e=this._clearCloseDelayTimer;delete this._clearCloseDelayTimer,e&&e(),this._cancelDom&&this._cancelDom.remove(),this.element.ojHammer("destroy"),this._super()},_keydown:function(e){var i,n,s,o,r,a=!0;function l(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}switch(e.keyCode){case t.ui.keyCode.HOME:this._move("first","first",e);break;case t.ui.keyCode.END:this._move("last","last",e);break;case t.ui.keyCode.UP:this._previous(e);break;case t.ui.keyCode.DOWN:this._next(e);break;case t.ui.keyCode.LEFT:case t.ui.keyCode.RIGHT:e.keyCode===t.ui.keyCode.RIGHT^this.isRtl?this.active&&!this.active.is(".oj-disabled")&&this._expand(e):this._collapse(e,"active");break;case t.ui.keyCode.ENTER:case t.ui.keyCode.SPACE:this._handleEnterSpace(e),this.__spaceEnterDownInMenu=!0;var u=this;setTimeout(function(){u.__spaceEnterDownInMenu=!1},100);break;case t.ui.keyCode.TAB:e.preventDefault(),this._launcher&&this._focusLauncherAndDismiss(e);break;case t.ui.keyCode.ESCAPE:if(this._launcher){var c=this.element.attr("aria-activedescendant"),h="#"+this.element.attr("id")+">*>a";c&&!t("#"+c).is(h)?this._collapse(e,"active"):this._focusLauncherAndDismiss(e)}else this._collapse(e,"active");break;default:a=!1,n=this.previousFilter||"",s=String.fromCharCode(e.keyCode),o=!1,clearTimeout(this.filterTimer),s===n?o=!0:s=n+s,r=new RegExp("^"+l(s),"i"),i=this.activeMenu.children(".oj-menu-item").filter(function(){return r.test(t(this).children("a").text())}),(i=o&&-1!==i.index(this.active.next())?this.active.nextAll(".oj-menu-item"):i).length||(s=String.fromCharCode(e.keyCode),r=new RegExp("^"+l(s),"i"),i=this.activeMenu.children(".oj-menu-item").filter(function(){return r.test(t(this).children("a").text())})),i.length?(this._focus(e,i),i.length>1?(this.previousFilter=s,this.filterTimer=setTimeout(function(){delete this.previousFilter}.bind(this),1e3)):delete this.previousFilter):delete this.previousFilter}a&&e.preventDefault()},_handleEnterSpace:function(e){this.active&&!this.active.is(".oj-disabled")&&(this.active.children("a[aria-haspopup='true']").length?this._expand(e):this._select(e))},refresh:function(){this._super(),this._setup();var e=this.element;if(e.is(":visible")){var i=e.data(o);if(i&&(i.of instanceof t.Event||i.of instanceof Window||t(i.of).is(":visible")))e.position(i),e.find(".oj-menu").each(function(){var e=t(this);e.is(":visible")&&(i=e.data(o))&&e.position(i)})}},_setup:function(){this.isRtl="rtl"===this._GetReadingDirection(),this._IsCustomElement()?(this._processOjOptions(),this._isSubmenu&&(this.options.openOptions.launcher=this.element.parent()),this._updateMenuPadding(this.element)):this._setupWidgetMenus(),this.active&&!t.contains(this.element[0],this.active[0])&&this._blur()},_setupWidgetMenus:function(){var e=this,i=this.element.find(this.options.menuSelector),n=i.add(this.element),s=n.children();this._hasSubmenus=!!i.length,s.filter(".oj-menu-divider").has("a").removeClass("oj-menu-divider oj-menu-item").removeAttr("role");var o=s.filter(":not(.oj-menu-item):has(a)"),r=o.children("a");this._initMenuItems(o),this._initAnchors(r);var a=s.filter(function(e,i){var n=t(i);return n.is(":not(.oj-menu-item)")&&!/[^\-\u2014\u2013\s]/.test(n.text())});this._initDividers(a),this._initDividerNeighbors(s,a),s.filter(".oj-disabled").children("a").attr("aria-disabled","true"),s.filter(":not(.oj-disabled)").children("a").removeAttr("aria-disabled"),i.filter(":not(.oj-menu)").addClass("oj-menu oj-menu-submenu oj-menu-dropdown").hide().attr({role:this.role,"aria-hidden":"true"}).each(function(){var i=t(this);e._setupSubmenu(e._getSubmenuAnchor(i),i)}),n.each(function(){e._updateMenuPadding(t(this))})},_setupSubmenu:function(e,i){var n=t("<span>");n.addClass("oj-menu-submenu-icon oj-component-icon").data("oj-ojMenu-submenu-icon",!0),e.attr("aria-haspopup","true").attr("aria-expanded","false").append(n),i.attr("aria-labelledby",e.attr("id"))},_initMenuItems:function(e){e.addClass("oj-menu-item").attr("role","presentation")},_initAnchors:function(e){e.uniqueId().attr({tabIndex:"-1",role:this._itemRole()})},_initDividers:function(e){e.addClass("oj-menu-divider").attr("role","separator")},_initDividerNeighbors:function(e,t){e.removeClass("oj-menu-item-before-divider oj-menu-item-after-divider"),t.prev().addClass("oj-menu-item-before-divider"),t.next().addClass("oj-menu-item-after-divider")},_clearOption:function(e){e.removeClass("oj-menu-item-before-divider oj-menu-item-after-divider oj-menu-divider oj-menu-item").removeAttr("role")},_getSubmenuAnchor:function(e){return e.prev("a")},_getSubmenuWidget:function(t){var i=e.Components.__GetWidgetConstructor(t,"ojMenu");return i&&i("instance")},_itemRole:function(){return"menuitem"},_getAdjacentDividers:function(e,t){var i=e.prev(".oj-menu-divider").add(e.next(".oj-menu-divider"));return t&&(i=i.add(e)),i},_focus:function(e,t){e&&"focus"===e.type||this._clearTimer&&this._clearTimer(),t=t.first(),this._makeActive(t,e);var i=t.parent(),n=i.closest(".oj-menu-item");i.find(".oj-focus-ancestor").removeClass("oj-focus-ancestor"),this._getAdjacentDividers(n,!0).addClass("oj-focus-ancestor"),e&&"keydown"===e.type?this._close():this._clearTimer=this._setTimer(function(){delete this._clearTimer,this._close()},this._getSubmenuBusyStateDescription("closing"),this.delay);var s=t.children(".oj-menu");s.length&&e&&/^mouse/.test(e.type)&&!this.active.hasClass("oj-disabled")&&this._startOpening(e,s),this.activeMenu=t.parent()},_makeActive:function(e,i){if(!e.is(this.active)){var n=this.active?this.active:t(),s=e.children("a");this.active=e,this.element.attr("aria-activedescendant",s.attr("id")),this._focusOutHandler(n),this._focusInHandler(e),this._getAdjacentDividers(n).removeClass("oj-focus"),this._getAdjacentDividers(e).addClass("oj-focus"),this._trigger("_activeItem",i,{previousItem:n,item:e,privateNotice:"The _activeItem event is private.  Do not use."})}},_removeActive:function(e){if(this.active){var i=this.active;this.active=null,this.element.removeAttr("aria-activedescendant"),this._focusOutHandler(i),this._getAdjacentDividers(i).removeClass("oj-focus"),this._trigger("_activeItem",e,{previousItem:i,item:t(),privateNotice:"The _activeItem event is private.  Do not use."})}},_blur:function(e){this._clearTimer&&this._clearTimer(),this._removeActive(e)},_focusLauncherAndDismiss:function(e,t){this._launcher.focus(),this.__dismiss(e,t)},__dismiss:function(t,i){if(!this._isOperationPending("close","__dismiss",[t,i])){var n=this.element.is(":visible");this._setWhenReady("close");var s={};s[e.PopupService.OPTION.POPUP]=this.element,s[e.PopupService.OPTION.CONTEXT]={event:t,selectUi:i,isOpen:n},e.PopupService.getInstance().close(s)}},_getDefaultAnimation:function(t,i){var n,s;return(n=(e.ThemeUtils.parseJSONFromFontFamily("oj-menu-option-defaults")||{}).animation)&&n[t]&&(s=n[t][i]),s},_isAnimationDisabled:function(){return!this._IsCustomElement()||this._disableAnimation},_replaceAnimationOptions:function(e,t){if(t&&e&&"string"!=typeof e){var i=JSON.stringify(e);for(var n in t)i=i.replace(new RegExp(n,"g"),t[n]);e=JSON.parse(i)}return e},_runOnPromise:function(e,t){return e?e.then(t):t()},_beforeCloseHandler:function(i){var n=i[e.PopupService.OPTION.POPUP];if(this._IsCustomElement()){var s=i[e.PopupService.OPTION.CONTEXT],o=s.selectUi;if(o&&o.item.length){var r={},a=o.item[0],l=s.event;l&&(r.originalEvent=l instanceof t.Event?l.originalEvent:l);var u={detail:r,cancelable:!0,bubbles:!0},c=new CustomEvent("ojAction",u);a.dispatchEvent(c),s.event=c}}if(!this._isAnimationDisabled()){var h=this._getDefaultAnimation(this._sheetMenuIsOpen?"sheet":"dropdown","close"),m=e.AnimationUtils.startAnimation(n[0],"close",e.PositionUtils.addTransformOriginAnimationEffectsOption(n,h),this);return m.then(function(){n.hide()}),m}n.hide()},_afterCloseHandler:function(t){var i=t[e.PopupService.OPTION.CONTEXT],s=i.event,r=i.selectUi,a=i.isOpen;(this.element.removeData(o),this._launcher=void 0,this._sheetMenuIsOpen=!1,!this._IsCustomElement()&&r)&&(s=this._trigger2("select",s,r).event);a&&this._trigger("close",s,{}),this._currentOpenOptions=null,n.indexOf(this)>=0&&n.splice(n.indexOf(this),1)},getCurrentOpenOptions:function(){return t.extend(!0,{},this._currentOpenOptions||this.options.openOptions)},open:function(i,s){var r=arguments[2];if(!this._isOperationPending("open","open",[i,s,r])){this._dismissEvent&&(this._disableAnimation=!0,this.__dismiss(this._dismissEvent),this._dismissEvent=null),(s=t.extend({},this.options.openOptions,s)).position=t.extend({},s.position),this._IsCustomElement()&&this._setPosition(s.position),r=t.extend({},this.options.submenuOpenOptions,r);var a=this._currentOpenOptions;this._currentOpenOptions=s,e.PositionUtils._normalizeEventForPosition(i),this._launcherClickShouldDismiss=this.element[0].__openingContextMenu;var l=this._trigger2("beforeOpen",i,{openOptions:s});if(!l.proceed)return this._currentOpenOptions=a,void(this._disableAnimation=!1);this.element.is(":visible")&&(this._disableAnimation=!0,this._currentOpenOptions=a,this.__dismiss(l.event),this._dismissEvent=null,this._currentOpenOptions=s);var u=s.launcher;if(!(u=this._IsCustomElement()?"string"===t.type(u)?t(document.getElementById(u)):t(u):"string"===t.type(u)?t(u):u)||!u.length)return e.Logger.warn("When calling Menu.open(), must specify openOptions.launcher via the component option, method param, or beforeOpen listener.  Ignoring the call."),this._currentOpenOptions=null,void(this._disableAnimation=!1);var d,p,_=this._isDropDown(s.display);if(this._toggleCancelDom(_),_){if(this.element.addClass("oj-menu-dropdown").removeClass("oj-menu-sheet"),p=c,this._IsCustomElement()?(s.position=e.PositionUtils.coerceToJet(s.position,this.options.openOptions.position),d=e.PositionUtils.coerceToJqUi(s.position)):d=s.position,(d=e.PositionUtils.normalizeHorizontalAlignment(d,this.isRtl)).of=e.PositionUtils.normalizePositionOf(d.of,u,i),null==d.of)return e.Logger.warn("position.of passed to Menu.open() is 'event', but the event is null.  Ignoring the call."),this._currentOpenOptions=null,void(this._disableAnimation=!1)}else this.element.addClass("oj-menu-sheet").removeClass("oj-menu-dropdown"),p=h,d={my:"bottom",at:m,of:window,collision:"flipfit"};var f=this.element[0],v=n.slice(0,n.length);t.each(v,function(e,t){t.element[0]!==f&&(t._collapse(i,"eventSubtree"),t._launcher&&t.__dismiss(i))}),this._submenuPosition=e.PositionUtils.normalizeHorizontalAlignment(r.position,this.isRtl);var g=this._usingCallback;t.isFunction(d.using)&&d.using!==g&&(d.origUsing=d.using),d.using=g,this.element.data(o,d),this._setWhenReady("open");var O={};O[e.PopupService.OPTION.POPUP]=this.element,O[e.PopupService.OPTION.LAUNCHER]=u,O[e.PopupService.OPTION.POSITION]=d,O[e.PopupService.OPTION.EVENTS]=this._getPopupServiceEvents(),O[e.PopupService.OPTION.LAYER_SELECTORS]="oj-menu-layer",O[e.PopupService.OPTION.MODALITY]=p,O[e.PopupService.OPTION.CONTEXT]={event:i,initialFocus:s.initialFocus,launcher:u,isDropDown:_},O[e.PopupService.OPTION.CUSTOM_ELEMENT]=this._IsCustomElement(),e.PopupService.getInstance().open(O),this._disableAnimation=!1}},_setPosition:function(t){var i=this.options;t&&(i.openOptions.position=e.PositionUtils.coerceToJet(t,i.openOptions.position))},_beforeOpenHandler:function(t){var i,n=t[e.PopupService.OPTION.POPUP],s=t[e.PopupService.OPTION.POSITION],o=t[e.PopupService.OPTION.CONTEXT].isDropDown;if(n.show(),n.position(s),!this._isAnimationDisabled()){var r=this._getDefaultAnimation(o?"dropdown":"sheet","open");i=e.AnimationUtils.startAnimation(n[0],"open",e.PositionUtils.addTransformOriginAnimationEffectsOption(n,r),this)}return i},_afterOpenHandler:function(t){var i=t[e.PopupService.OPTION.CONTEXT],s=i.event,o=i.initialFocus,r=i.launcher,a=i.isDropDown,l="firstItem"===o;(l||"menu"===o)&&this.element.focus(),l?this._focus(s,this.element.children().first()):this._blur(s),this._launcher=r,this._sheetMenuIsOpen=!a,n.push(this),this._trigger("open",s,{})},_startOpening:function(e,t){this._clearTimer&&this._clearTimer(),"true"===t.attr("aria-hidden")&&(this._clearTimer=this._setTimer(function(){delete this._clearTimer,this._close(),this._open(e,t)},this._getSubmenuBusyStateDescription("closing and opening"),this.delay))},_open:function(i,s){if("true"===s.attr("aria-hidden")&&this.active){if(this._IsCustomElement()){var r=this._getSubmenuWidget(s);if(!r._trigger2("beforeOpen",i).proceed)return;var a=e.PositionUtils.coerceToJqUi(r.options.openOptions.position);a=e.PositionUtils.normalizeHorizontalAlignment(a,this.isRtl)}else a=this._submenuPosition;if(a=t.extend({of:this.active},a),this._clearTimer&&this._clearTimer(),this.element.find(".oj-menu").not(s.parents(".oj-menu")).hide().attr("aria-hidden","true").removeData(o),s.show().removeAttr("aria-hidden").position(a).data(o,a),this._getSubmenuAnchor(s).attr("aria-expanded","true"),!this._launcher&&n.indexOf(this)<0&&n.push(this),!this._isAnimationDisabled()){var l=this._getDefaultAnimation("submenu","open");l=this._replaceAnimationOptions(l,{"#myPosition":a.my}),e.AnimationUtils.startAnimation(s[0],"open",l,this)}}},__collapseAll:function(i,n,s){var o;this._clearTimer&&this._clearTimer();var r=this,a=function(){delete r._clearTimer;var e=n?r.element:t(i&&i.target).closest(r.element.find(".oj-menu"));e.length||(e=r.element);var s=r._close(e);return s=r._runOnPromise(s,function(){r._blur(i),r.activeMenu=e})};if(s?this._isAnimationDisabled()?r._clearTimer=r._setTimer(a,r._getSubmenuBusyStateDescription("closing"),s):o=new Promise(function(e,t){r._clearTimer=r._setTimer(a,r._getSubmenuBusyStateDescription("closing"),s,function(){e(!0)})}):o=a(),o){var l=e.Context.getContext(this.element[0]).getBusyContext().addBusyState({description:"closing submenus"});o.then(l)}return o},_close:function(i){var s;i||(i=this.active?this.active.parent():this.element);var r=this,a=r._getDefaultAnimation("submenu","close"),l=i.find(".oj-menu"),u=function(e){e.hide().attr("aria-hidden","true").removeData(o),r._getSubmenuAnchor(e).attr("aria-expanded","false")};if(this._isAnimationDisabled())u(l),i.find(".oj-focus-ancestor").removeClass("oj-focus-ancestor");else{var c=function(i){var n=null;return i.children().children(".oj-menu").each(function(i,s){var l=t(s);if(l.is(":visible")){var h=c(l);n=r._runOnPromise(h,function(){var t=l.data(o),i=r._replaceAnimationOptions(a,{"#myPosition":t?t.my:null});return e.AnimationUtils.startAnimation(s,"close",i,r).then(function(){u(l)})})}else u(l)}),n};s=c(i),s=this._runOnPromise(s,function(){i.find(".oj-focus-ancestor").removeClass("oj-focus-ancestor")})}return this._launcher||n.indexOf(this)>=0&&i===this.element&&n.splice(n.indexOf(this),1),s},_collapse:function(t,i){var n;if(null==i||"active"===i){var s=this.activeMenu&&this.activeMenu.closest(".oj-menu-item",this.element);if(s&&s.length){var o=this;n=this._close(),n=this._runOnPromise(n,function(){o._focus(t,s)})}}else"all"===i||"eventSubtree"===i?n=this.__collapseAll(t,"all"===i,this.delay):e.Logger.warn("Invalid param "+i+" passed to Menu._collapse().  Ignoring the call.");return n},_expand:function(e){var t=this.active&&this.active.children(".oj-menu ").children(".oj-menu-item").first();t&&t.length&&(this._open(e,t.parent()),this._clearTimer&&this._clearTimer(),this._clearTimer=this._setTimer(function(){delete this._clearTimer,this._focus(e,t)},this._getBusyStateDescription("focusing an item")))},_next:function(e){this._move("next","first",e)},_previous:function(e){this._move("prev","last",e)},_isFirstItem:function(){return this.active&&!this.active.prevAll(".oj-menu-item").length},_isLastItem:function(){return this.active&&!this.active.nextAll(".oj-menu-item").length},_move:function(e,t,i){var n;this.active&&(n="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".oj-menu-item").eq(-1):this.active[e+"All"](".oj-menu-item").eq(0)),n&&n.length&&this.active||(n=this.activeMenu.children(".oj-menu-item")[t]()),this._focus(i,n)},_select:function(i){if(!this.active&&i&&i.target){var n=t(i.target).closest(".oj-menu-item");n.closest(this.element).length&&this._makeActive(n,i)}if(this.active)if(this.active.has(".oj-menu").length||this.active.is(".oj-disabled"))e.Logger.warn("Selecting a disabled menu item or parent menu item is not allowed.");else{var s=this.active.is(this._cancelItem)?void 0:{item:this.active},o=this.__collapseAll(i,!0);if(this._launcher){var r=this;this._runOnPromise(o,function(){r._focusLauncherAndDismiss(i,s)})}}else e.Logger.warn("Menu._select() called when no menu item is focused and no menu item can be inferred from event param.")},_surrogateRemoveHandler:function(){this.element.remove()},_getPopupServiceEvents:function(){if(!this._popupServiceEvents){var t=this._popupServiceEvents={};t[e.PopupService.EVENT.POPUP_CLOSE]=this._closeAll.bind(this),t[e.PopupService.EVENT.POPUP_REMOVE]=this._surrogateRemoveHandler.bind(this),t[e.PopupService.EVENT.POPUP_REFRESH]=this.refresh.bind(this),t[e.PopupService.EVENT.POPUP_AUTODISMISS]=this._clickAwayHandler.bind(this),t[e.PopupService.EVENT.POPUP_BEFORE_OPEN]=this._beforeOpenHandler.bind(this),t[e.PopupService.EVENT.POPUP_AFTER_OPEN]=this._afterOpenHandler.bind(this),t[e.PopupService.EVENT.POPUP_BEFORE_CLOSE]=this._beforeCloseHandler.bind(this),t[e.PopupService.EVENT.POPUP_AFTER_CLOSE]=this._afterCloseHandler.bind(this)}return this._popupServiceEvents},_closeAll:function(){this._disableAnimation=!0,this._close(this.element),this.__dismiss(null),this._setWhenReady("none")},_usingHandler:function(t,i){var n=i.element.element;n.css(t),e.PositionUtils.captureTransformOriginAnimationEffectsOption(n,i);var s=n.data(o);if(s){var r=s.origUsing;r&&r(t,i)}e.PositionUtils.isAligningPositionClipped(i)&&(this._clearCloseDelayTimer=this._setTimer(this._closeAll,this._getSubmenuBusyStateDescription("closing"),1))},getNodeBySubId:function(e){switch(e&&e.subId){case _:return this._cancelDomAttached?this._cancelItem[0]:null;default:return this._super(e)}},getSubIdByNode:function(e){return this._cancelItem&&this._cancelItem.is(t(e).parents().addBack(e))?{subId:_}:this._super(e)},_isDropDown:function(e){if(this._hasSubmenus)return!0;switch(e){case"dropDown":return!0;case"sheet":return!1;case"auto":return p.matches;default:throw new Error("Invalid value for Menu openOptions.display: "+e)}},_toggleCancelDom:function(e){l&&(e?this._cancelDomAttached&&(this._getCancelDom().detach().eq(0).prev().removeClass("oj-menu-item-before-divider"),this._cancelDomAttached=!1):(this._getCancelDom().appendTo(this.element).eq(0).prev().addClass("oj-menu-item-before-divider"),this._cancelDomAttached=!0))},_getCancelDom:function(){if(!this._cancelDom){var e=t("<li></li>",this.document[0]),i=t("<a href='#'></a>",this.document[0]).text(this.options.translations.labelCancel);t("<span class='oj-menu-item-icon oj-component-icon oj-menu-cancel-icon'></span>",this.document[0]).prependTo(i);var n=t("<li></li>",this.document[0]).addClass("oj-menu-item-cancel oj-menu-item-after-divider").append(i);this._initDividers(e),this._initAnchors(i),this._initMenuItems(n),this._cancelAnchor=i,this._cancelItem=n,this._cancelDom=t([e[0],n[0]])}return this._cancelDom},_setupSwipeBehavior:function(){u&&(this.element.ojHammer(d),this._on({swipedown:function(e){this._sheetMenuIsOpen&&"touch"===e.gesture.pointerType&&(this.__collapseAll(e,!0),this._focusLauncherAndDismiss(e))}}))},_setWhenReady:function(t){var i=this._whenReadyMediator;i&&(i.destroy(),delete this._whenReadyMediator),["open","close"].indexOf(t)<0||(this._whenReadyMediator=new e.PopupWhenReadyMediator(this.element,t,"ojMenu",this._IsCustomElement()))},_isOperationPending:function(e,t,i){var n=this._whenReadyMediator;return!!n&&n.isOperationPending(this,e,t,i)},_setTimer:function(t,i,n,s){var o=e.Context.getContext(this.element[0]).getBusyContext().addBusyState({description:i}),r=function(){o&&(o(),o=null,s&&s())},a=this,l=setTimeout(function(){var e=t.bind(a)();e&&e instanceof Promise?e.then(r):r()},n||0);return function(){clearTimeout(l),r()}},_getBusyStateDescription:function(e){return"Menu with id '"+this.element.attr("id")+"' is busy "+e+"."},_getSubmenuBusyStateDescription:function(e){return this._getBusyStateDescription(e+" a submenu")},_NotifyDetached:function(){e.ZOrderUtils.getStatus(this.element)===e.ZOrderUtils.STATUS.OPEN&&this._closeAll(),this._super()}}),e.Components.setDefaultOptions({ojMenu:{openOptions:e.Components.createDynamicPropertyGetter(function(t){return{position:null!=e.BaseCustomElementBridge.getRegistered(t.element.tagName)?t.containers.indexOf("ojMenu")>=0?{my:{horizontal:"start",vertical:"top"},at:{horizontal:"end",vertical:"top"},offset:{x:0,y:0},collision:"flipfit"}:{my:{horizontal:"start",vertical:"top"},at:{horizontal:"start",vertical:"bottom"},offset:{x:0,y:0},collision:"flipfit"}:{my:"start top",at:"start bottom",collision:"flipfit"}}})}});var n=new Array,s=!1,o="oj-menu-position",r=navigator.userAgent.indexOf("Macintosh")>-1&&navigator.userAgent.indexOf("Safari")>-1&&-1===navigator.userAgent.indexOf("Chrome"),a=e.ThemeUtils.parseJSONFromFontFamily("oj-menu-config")||{},l="menuItem"===a.sheetCancelAffordance,u="dismiss"===a.sheetSwipeDownBehavior,c=a.dropDownModality||"modeless",h=a.sheetModality||"modal",m="bottom-"+(a.sheetMarginBottom||0),d=u&&{recognizers:[[i.Swipe,{direction:i.DIRECTION_DOWN}]]},p=function(){var e=a.dropDownThresholdWidth;null==e&&(e="768px");var t="(min-width: "+e+")";return window.matchMedia(t)}(),_="oj-menu-cancel-command"}(),e.CustomElementBridge.registerMetadata("oj-menu","baseComponent",{properties:{disabled:{type:"boolean"},openOptions:{type:"object",properties:{display:{type:"string",enumValues:["auto","dropDown","sheet"]},initialFocus:{type:"string",enumValues:["firstItem","menu","none"]},launcher:{type:"string"},position:{type:"object",properties:{my:{type:"string|object",properties:{horizontal:{type:"string",enumValues:["start","end","left","center","right"]},vertical:{type:"string",enumValues:["top","center","bottom"]}}},at:{type:"string|object",properties:{horizontal:{type:"string",enumValues:["start","end","left","center","right"]},vertical:{type:"string",enumValues:["top","center","bottom"]}}},offset:{type:"object",properties:{x:{type:"number"},y:{type:"number"}}},of:{type:"string|object"},collision:{type:"string",enumValues:["flip","fit","flipfit","flipcenter","none"]}}}}},translations:{type:"Object",properties:{labelCancel:{type:"string",value:"Cancel"}}}},methods:{getSubIdByNode:{},open:{},refresh:{}},events:{animateStart:{},animateEnd:{},beforeOpen:{},close:{},open:{}},extension:{_WIDGET_NAME:"ojMenu"}}),e.CustomElementBridge.register("oj-menu",{metadata:e.CustomElementBridge.getMetadata("oj-menu")})});