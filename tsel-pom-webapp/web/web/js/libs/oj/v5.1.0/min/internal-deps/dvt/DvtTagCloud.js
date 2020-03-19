"use strict";define(["./DvtToolkit"],function(t){return function(t){t.TagCloud=function(t,e,i){this.Init(t,e,i)},t.Obj.createSubclass(t.TagCloud,t.BaseComponent),t.TagCloud.newInstance=function(e,i,o){return new t.TagCloud(e,i,o)},t.TagCloud.prototype.Init=function(e,i,o){t.TagCloud.superclass.Init.call(this,e,i,o),this.getCtx().getStage().getElem().setAttributeNS(null,"text-rendering","geometricPrecision"),this.EventManager=new l(this,e,this.processEvent,this),this.EventManager.addListeners(this),t.Agent.isTouchDevice()||this.EventManager.setKeyboardHandler(new h(this.EventManager)),this.Defaults=new n,this._items=[],this._peers=[],this.legend=null,this._dragSource=new t.DragSource(this.getCtx()),this.EventManager.setDragSource(this._dragSource)},t.TagCloud.prototype.render=function(e,i,o){isNaN(i)||isNaN(o)||(this.Width=i,this.Height=o),this.__cleanUp(),this.SetOptions(e),this.StopAnimation(),this._oldContainer=this._container,this._oldItems=this._items,this._items=[],this._itemCollection=[],this._container=new t.Container(this.getCtx()),this.addChild(this._container),r.render(this,this._container,new t.Rectangle(0,0,this.Width,this.Height)),this.SelectionHandler&&this.SelectionHandler.processInitialSelections(this.Options.selection,this.getObjects());var n=this.Options.animationDuration,s=new t.Rectangle(0,0,this.Width,this.Height);if(this._oldContainer){if("none"!==this.Options.animationOnDataChange&&e){this._deleteContainer=new t.Container(this.getCtx()),this.addChild(this._deleteContainer);var a=new t.DataAnimationHandler(this.getCtx(),this._deleteContainer);a.constructAnimation(this._oldItems,this._items),this.Animation=a.getAnimation()}}else"none"!==this.Options.animationOnDisplay&&(this.Animation=t.BlackBoxAnimationHandler.getInAnimation(this.getCtx(),t.BlackBoxAnimationHandler.ALPHA_FADE,this._container,s,n));this.Animation?(this.EventManager.hideTooltip(),this.EventManager.removeListeners(this),this.Animation.setOnEnd(this.OnRenderEnd,this),this.Animation.play()):this.OnRenderEnd(),this.UpdateAriaAttributes()},t.TagCloud.prototype.registerItems=function(t){this._items=t},t.TagCloud.prototype.getAutomation=function(){return this.Automation||(this.Automation=new e(this)),this.Automation},t.TagCloud.prototype.registerObject=function(t,e){this._peers.push(t),this._itemCollection[e]=t},t.TagCloud.prototype.getObjects=function(){return this._peers},t.TagCloud.prototype.getItems=function(){return this._itemCollection},t.TagCloud.prototype.highlight=function(e){this.Options.highlightedCategories=t.JsonUtils.clone(e),t.CategoryRolloverHandler.highlight(e,this.getObjects(),"any"===this.Options.highlightMatch),this.legend&&this.legend.highlight(e)},t.TagCloud.prototype.select=function(e){this.Options.selection=t.JsonUtils.clone(e),this.SelectionHandler&&this.SelectionHandler.processInitialSelections(this.Options.selection,this.getObjects())},t.TagCloud.prototype.SetOptions=function(e){e?(e.data&&(e.items=e.data),this.Options=this.Defaults.calcOptions(e)):this.Options||(this.Options=this.GetDefaults());var i=this.Options.selectionMode;this.SelectionHandler="single"===i?new t.SelectionHandler(this.getCtx(),t.SelectionHandler.TYPE_SINGLE):"multiple"===i?new t.SelectionHandler(this.getCtx(),t.SelectionHandler.TYPE_MULTIPLE):null,this.EventManager.setSelectionHandler(this.SelectionHandler),t.Agent.isEnvironmentBrowser()||(this.Options.animationOnDisplay="none",this.Options.animationOnDataChange="none")},t.TagCloud.prototype.GetComponentDescription=function(){return t.Bundle.getTranslation(this.getOptions(),"componentName",t.Bundle.UTIL_PREFIX,"TAG_CLOUD")},t.TagCloud.prototype.OnRenderEnd=function(){this._oldContainer&&(this.removeChild(this._oldContainer),this._oldContainer.destroy(),this._oldContainer=null),this._deleteContainer&&(this.removeChild(this._deleteContainer),this._deleteContainer.destroy(),this._deleteContainer=null),this.Animation&&this.EventManager.addListeners(this),this.Options.highlightedCategories&&this.Options.highlightedCategories.length>0&&this.highlight(this.Options.highlightedCategories),this.AnimationStopped||this.RenderComplete(),this.Animation=null,this.AnimationStopped=!1},t.TagCloud.prototype.__cleanUp=function(){this.EventManager.hideTooltip(),this._peers.length=0},t.TagCloud.prototype.processEvent=function(e,i){var o=e.type;if("categoryHide"==o||"categoryShow"==o){var n=e.category,r=t.ArrayUtils.getIndex(this.Options.hiddenCategories,n);"categoryHide"==o&&r<0&&this.Options.hiddenCategories.push(n),"categoryShow"==o&&r>=0&&this.Options.hiddenCategories.splice(r,1),this.render(this.Options,this.Width,this.Height)}else"categoryHighlight"==o&&(this!=i?this.highlight(e.categories):this.legend&&this.legend!=i&&this.legend.processEvent(e,i));e&&this.dispatchEvent(e)},t.TagCloud.prototype.isDragSupported=function(t){return this.SelectionHandler?t[0]:null},t.TagCloud.prototype.getDragRowKeys=function(t){t.isSelected()||(this.SelectionHandler.processClick(t,!1),this.EventManager.fireSelectionEvent());for(var e=[],i=this.SelectionHandler.getSelection(),n=0;n<i.length;n++){var r=i[n];r instanceof o&&e.push(r.getId())}return e},t.TagCloud.prototype.getDragFeedback=function(){for(var t=[],e=this.SelectionHandler.getSelection(),i=0;i<e.length;i++)t=t.concat(e[i].getDisplayables());return t},t.TagCloud.prototype.isDragAvailable=function(t,e,i){return this._dragSource.isDragAvailable(i)},t.TagCloud.prototype.getDragTransferable=function(t,e){return this._dragSource.getDragTransferable(t,e)},t.TagCloud.prototype.getDragOverFeedback=function(t,e){return this._dragSource.getDragOverFeedback(t,e)},t.TagCloud.prototype.getDragContext=function(t,e){return this._dragSource.getDragContext(t,e)},t.TagCloud.prototype.getDragOffset=function(t,e){return this._dragSource.getDragOffset(t,e)},t.TagCloud.prototype.getPointerOffset=function(t,e){return this._dragSource.getPointerOffset(t,e)},t.TagCloud.prototype.initiateDrag=function(){this._dragSource.initiateDrag()},t.TagCloud.prototype.dragDropEnd=function(){this._dragSource.dragDropEnd()},t.TagCloud.prototype.acceptDrag=function(t,e,i){return this._dropTarget||(this._dropTarget=new g),this._dropTarget.acceptDrag(t,e,i)};var e=function(t){this._tagCloud=t};t.Obj.createSubclass(e,t.Automation),e.prototype.GetSubIdForDomElement=function(t){var e=this._tagCloud.EventManager.GetLogicalObject(t);return e&&e instanceof o?"item["+this._tagCloud.getItems().indexOf(e)+"]":null},e.prototype.getDomElementForSubId=function(e){if(e==t.Automation.TOOLTIP_SUBID)return this.GetTooltipElement(this._tagCloud);var i=e.indexOf("[");if(i>0&&"item"===e.substring(0,i)){var o=parseInt(e.substring(i+1,e.length-1)),n=this._tagCloud.getItems()[o];return n?n.getDisplayables()[0].getElem():null}return null},e.prototype.getItem=function(t){var e=this._tagCloud.getItems()[t];if(e){var i={};return i.color=e.getDatatipColor(),i.tooltip=e.getShortDesc(),i.label=e.getLabel(),i.value=e.getValue(),i.selected=e.isSelected(),i}return null},e.prototype.getItemCount=function(){return this._tagCloud.getObjects().length};var i=function(t,e,i,o,n,r,s,a){this.Init(t,e,i,o,n,r,s,a)};t.Obj.createSubclass(i,t.BackgroundOutputText),i._HOVER_OPACITY=.3,i._HOVER_SELECTED_OPACITY=.6,i.ANIMATION_DELETE_PRIORITY=0,i.ANIMATION_UPDATE_PRIORITY=1,i.ANIMATION_INSERT_PRIORITY=2,i.prototype.Init=function(t,e,o,n,r,s,a,l){i.superclass.Init.call(this,e,o,n,r,s),this._tagCloud=t,this.alignAuto(),this.TextInstance.setStyle(a),this.TextInstance.setClassName(l),s&&this._createFeedbackStyles(s)},i.prototype.setSelected=function(t){this._isSelected!=t&&(this._isSelected=t,t?this._isShowingHoverEffect?this.setCSSStyle(this._hoverSelectedStyle):this.setCSSStyle(this._selectedStyle):this.setCSSStyle(this._normalStyle))},i.prototype.showHoverEffect=function(){this._isShowingHoverEffect||(this._isShowingHoverEffect=!0,this._isSelected?this.setCSSStyle(this._hoverSelectedStyle):this.setCSSStyle(this._hoverStyle))},i.prototype.hideHoverEffect=function(){this._isSelected?this.setCSSStyle(this._selectedStyle):this.setCSSStyle(this._normalStyle),this._isShowingHoverEffect=!1},i.prototype.animateUpdate=function(e,o){var n=new t.CustomAnimation(this.getCtx(),this,a.getAnimationDuration(this._tagCloud)),r=this.getCSSStyle(),s=o.getCSSStyle(),l=!1,h=s.getStyle(t.CSSStyle.COLOR),g=r.getStyle(t.CSSStyle.COLOR);if(h!=g){var c=this;this.setCSSStyle(r.setStyle(t.CSSStyle.COLOR,h)),n.getAnimator().addProp(t.Animator.TYPE_COLOR,this,function(){return c.getCSSStyle().getStyle(t.CSSStyle.COLOR)},function(e){c.setCSSStyle(c.getCSSStyle().setStyle(t.CSSStyle.COLOR,e))},g)}var u=parseFloat(s.getStyle(t.CSSStyle.FONT_SIZE)),p=parseFloat(r.getStyle(t.CSSStyle.FONT_SIZE));u!=p&&(l=!0,c=this,this.setFontSize(u),n.getAnimator().addProp(t.Animator.TYPE_NUMBER,this,function(){return parseFloat(c.getCSSStyle().getStyle(t.CSSStyle.FONT_SIZE))},this.setFontSize,p));var d=o.getX(),S=this.getX(),y=o.getHorizAlignment(),C=this.getHorizAlignment();(S!=d||l&&C!=y)&&(C!=y&&(d=i._adjustX(o,d,y)),this.setX(d),n.getAnimator().addProp(t.Animator.TYPE_NUMBER,this,this.getX,this.setX,S));var _=o.getY(),f=this.getY();f!=_&&(this.setY(_),n.getAnimator().addProp(t.Animator.TYPE_NUMBER,this,this.getY,this.setY,f)),o.setAlpha(0),e.add(n,i.ANIMATION_UPDATE_PRIORITY)},i.prototype.animateDelete=function(e){e.add(new t.AnimFadeOut(this.getCtx(),this,a.getAnimationDuration(this._tagCloud)),i.ANIMATION_DELETE_PRIORITY)},i.prototype.animateInsert=function(e){this.setAlpha(0),e.add(new t.AnimFadeIn(this.getCtx(),this,a.getAnimationDuration(this._tagCloud)),i.ANIMATION_INSERT_PRIORITY)},i.prototype.setFontSize=function(t){i.superclass.setFontSize.call(this,t),this._createFeedbackStyles(this.getCSSStyle())},i.prototype._createFeedbackStyles=function(e){this._normalStyle=e.clone();var o=this._normalStyle.getStyle(t.CSSStyle.COLOR);this._normalStyle.setStyle(t.CSSStyle.BACKGROUND_COLOR,null),this._hoverStyle=this._normalStyle.clone();var n=i._lightenColor(o,i._HOVER_OPACITY);this._hoverStyle.setStyle(t.CSSStyle.BACKGROUND_COLOR,n),this._hoverStyle.setStyle(t.CSSStyle.COLOR,t.ColorUtils.getContrastingTextColor(n)),this._selectedStyle=this._normalStyle.clone(),this._selectedStyle.setStyle(t.CSSStyle.BACKGROUND_COLOR,o),this._selectedStyle.setStyle(t.CSSStyle.COLOR,t.ColorUtils.getContrastingTextColor(o)),this._hoverSelectedStyle=this._normalStyle.clone();var r=i._lightenColor(o,i._HOVER_SELECTED_OPACITY);this._hoverSelectedStyle.setStyle(t.CSSStyle.BACKGROUND_COLOR,r),this._hoverSelectedStyle.setStyle(t.CSSStyle.COLOR,t.ColorUtils.getContrastingTextColor(r))},i.prototype.getItemStyle=function(){return this._normalStyle},i._adjustX=function(e,i,o){var n=e.getTextDimensions();return o==t.OutputText.H_ALIGN_LEFT?i+n.w:o==t.OutputText.H_ALIGN_RIGHT?i-n.w:i},i._lightenColor=function(e,i){var o=255*(1-i)+i*t.ColorUtils.getRed(e),n=255*(1-i)+i*t.ColorUtils.getGreen(e),r=255*(1-i)+i*t.ColorUtils.getBlue(e);return t.ColorUtils.makeRGB(Math.floor(o),Math.floor(n),Math.floor(r))};var o=function(t,e,i){this.Init(t,e,i)};t.Obj.createSubclass(o,t.Obj),o.prototype.Init=function(e,i,o){this._view=e,this._displayable=i,this._data=o,this._isSelected=!1,this._bSelectable=!1,o.url?(i.setAriaRole("link"),this._linkCallback=t.ToolkitUtils.getLinkCallback("_blank",o.url)):i.setAriaRole("img"),this._updateAriaLabel()},o.prototype.getId=function(){return this._data.id},o.prototype.getLabel=function(){return this._data.label},o.prototype.getValue=function(){return this._data.value},o.prototype.getShortDesc=function(){return this._data.shortDesc},o.prototype.getAction=function(){return this._data.action},o.prototype.getDatatip=function(){var t=this._view.getOptions().tooltip,e=t?t.renderer:null;return e?this._view.getCtx().getTooltipManager().getCustomTooltip(e,this.getDataContext()):this.getShortDesc()},o.prototype.getDataContext=function(){return{id:this.getId(),label:this.getLabel(),color:this.getDatatipColor(),value:this.getValue()}},o.prototype.getLinkCallback=function(){return this._linkCallback},o.prototype.getDatatipColor=function(){return this._displayable.getItemStyle().getStyle(t.CSSStyle.COLOR)},o.prototype.setSelectable=function(t){this._bSelectable=t},o.prototype.isSelectable=function(){return this._bSelectable},o.prototype.isSelected=function(){return this._isSelected},o.prototype.setSelected=function(t){this._isSelected=t,this._displayable.setSelected(t),this._updateAriaLabel()},o.prototype.showHoverEffect=function(){this._displayable.showHoverEffect()},o.prototype.hideHoverEffect=function(){this._displayable.hideHoverEffect()},o.prototype.getNextNavigable=function(e){var i=this._view.EventManager.getKeyboardHandler();return e.type==t.MouseEvent.CLICK||i.isMultiSelectEvent(e)?this:i.isNavigationEvent(e)?h.getNextNavigable(this,e,this._view.getObjects()):null},o.prototype.getKeyboardBoundingBox=function(t){return this._displayable.getDimensions(t)},o.prototype.getTargetElem=function(){return this._displayable.getElem()},o.prototype.showKeyboardFocusEffect=function(){this._isShowingKeyboardFocusEffect=!0,this.showHoverEffect()},o.prototype.hideKeyboardFocusEffect=function(){this._isShowingKeyboardFocusEffect&&(this._isShowingKeyboardFocusEffect=!1,this.hideHoverEffect())},o.prototype.isShowingKeyboardFocusEffect=function(){return this._isShowingKeyboardFocusEffect},o.prototype.getDisplayables=function(){return[this._displayable]},o.prototype.getAriaLabel=function(){var e=[];return this.isSelectable()&&e.push(t.Bundle.getTranslatedString(t.Bundle.UTIL_PREFIX,this.isSelected()?"STATE_SELECTED":"STATE_UNSELECTED")),t.Displayable.generateAriaLabel(this.getShortDesc(),e)},o.prototype.getCategories=function(){return this._data.categories},o.prototype._updateAriaLabel=function(){t.Agent.deferAriaCreation()||this._displayable.setAriaProperty("label",this.getAriaLabel())},o.prototype.getShowPopupBehaviors=function(){if(!this._showPopupBehaviors&&(this._showPopupBehaviors=[],this._data.showPopupBehaviors))for(var e=this._data.showPopupBehaviors,i=0;i<e.length;i++)this._showPopupBehaviors.push(new t.ShowPopupBehavior(e[i].popupId,e[i].triggerType,e[i].alignId,e[i].align));return this._showPopupBehaviors},o.prototype.isDragAvailable=function(t){return this._view.isDragSupported(t)},o.prototype.getDragTransferable=function(t,e){return this._view.getDragRowKeys(this)},o.prototype.getDragFeedback=function(t,e){return this._view.getDragFeedback()};var n=function(){this.Init({alta:n.VERSION_1})};t.Obj.createSubclass(n,t.BaseComponentDefaults),n.VERSION_1={animationOnDisplay:"none",animationOnDataChange:"none",emptyText:null,hiddenCategories:[],hideAndShowBehavior:"none",highlightedCategories:[],highlightMatch:"all",hoverBehavior:"none",layout:"rectangular",selectionMode:"none",_statusMessageStyle:new t.CSSStyle(t.BaseComponentDefaults.FONT_FAMILY_ALTA+"color: #333333;"),styleDefaults:{animationDuration:500,hoverBehaviorDelay:200,_style:new t.CSSStyle(t.BaseComponentDefaults.FONT_FAMILY_ALTA+"color: #333333;")},touchResponse:"auto"};var r={};t.Obj.createSubclass(r,t.Obj),r.render=function(t,e,i){r._renderBackground(t,e,i),r._renderLegend(t,e,i),r._adjustAvailSpace(i);var o=t.getOptions();if(o.items&&o.items.length>0){var n=r._renderItems(t,e,i);n.length>0?(t.registerItems(n),t.EventManager.setFocusObj(t.getObjects()[0])):r._renderEmptyText(t,e,i)}else r._renderEmptyText(t,e,i)},r._renderEmptyText=function(e,i,o){var n=e.getOptions(),r=n.emptyText;r||(r=t.Bundle.getTranslation(n,"labelNoData",t.Bundle.UTIL_PREFIX,"NO_DATA",null)),t.TextUtils.renderEmptyText(i,r,new t.Rectangle(o.x,o.y,o.w,o.h),e.EventManager,n._statusMessageStyle)},r._renderBackground=function(e,i,o){var n=new t.Rect(e.getCtx(),o.x,o.y,o.w,o.h);n.setInvisibleFill(),i.addChild(n)},r._renderItems=function(e,n,r){for(var a=e.getOptions(),l=[],h=a.items,g=Number.MAX_VALUE,c=-Number.MAX_VALUE,u=0;u<h.length;u++)g=Math.min(g,h[u].value),c=Math.max(c,h[u].value);var p=s.getFontSizeFunction(g,c,3),d=t.ArrayUtils.createBooleanMap(a.hiddenCategories),S=t.CSSStyle.getTextMeasurementProperties(),y=a.styleDefaults,C=y.svgStyle||y.style;for(!C||C instanceof Object||(C=t.CSSStyle.cssStringToObject(C)),u=0;u<h.length;u++){var _=h[u];if(_.categories||(_.categories=[_.label]),!d||!t.ArrayUtils.hasAnyMapItem(d,_.categories)){var f=y._style.clone(),v=_.svgStyle||_.style;!v||v instanceof Object||(v=t.CSSStyle.cssStringToObject(v));var O=v&&v.color?v.color:_.color?_.color:C&&C.color?C.color:null;if(v=t.JsonUtils.merge(v,C)){for(var m=0;m<S.length;m++){var T=t.CSSStyle.cssStringToObjectProperty(S[m]);v[T]&&(f.setStyle(S[m],v[T]),delete v[T])}delete v.color}O&&f.setStyle(t.CSSStyle.COLOR,O),f.setStyle(t.CSSStyle.FONT_SIZE,p.call(null,_.value).toString());var E=_.svgClassName||_.className,b=new i(e,e.getCtx(),_.label,0,0,f,v,E),A=new o(e,b,_);e.EventManager.associate(b,A),e.registerObject(A,u),"none"!==a.selectionMode&&A.setSelectable(!0),(A.isSelectable()||_.url||A.getAction())&&b.setCursor(t.SelectionEffectUtils.getSelectingCursor()),l.push(b),n.addChild(b)}}return l.length>0&&("cloud"===a.layout?s.cloudLayout(r,l):s.rectangleLayout(r,l,t.Agent.isRightToLeft(e.getCtx()))),l},r._renderLegend=function(e,i,o){var n=e.getOptions(),r=n.legend;if(r&&r.sections){var s=t.JsonUtils.clone(r);s.orientation="horizontal",s.halign="center",s.hoverBehavior=n.hoverBehavior,s.hideAndShowBehavior=n.hideAndShowBehavior,s.hiddenCategories=n.hiddenCategories;var a=t.Legend.newInstance(e.getCtx(),e.processEvent,e);i.addChild(a);var l=a.getPreferredSize(s,o.w,o.h/3);a.render(s,l.w,l.h),t.LayoutUtils.position(o,"bottom",a,l.w,l.h,0),e.legend&&(e.legend.destroy(),i.removeChild(e.legend)),e.legend=a}},r._adjustAvailSpace=function(t){t.x=Math.round(t.x),t.y=Math.round(t.y),t.w=Math.round(t.w),t.h=Math.round(t.h)};var s=function(){};t.Obj.createSubclass(s,t.Obj),s.getFontSizeFunction=function(t,e,i){return function(o){return 12+Math.ceil((i-1)*(o-t)/(e-t)*12)}},s.cloudLayout=function(e,i){var o=[],n=10/180,r=10/180;e.w>e.h?n*=e.w/e.h:r*=e.h/e.w;for(var s=2*Math.PI/180,a=null,l=0,h=[],g=[],c=0;c<i.length;c++){var u=!1,p=0,d=4,S=(b=i[c]).getDimensions();l=Math.max(l,parseFloat(b.getCSSStyle().getStyle(t.CSSStyle.FONT_SIZE)));for(var y=-1;!u;){var C=p%180;void 0===h[C]&&(h[C]=Math.cos(p*s)),void 0===g[C]&&(g[C]=Math.sin(p*s));var _=n*p*h[C],f=r*p*g[C],v=new t.Rectangle(_,f,S.w,S.h);if(u=!0,-1!=y&&o[y].intersects(v)&&(u=!1),u)for(var O=0;O<c;O++)if(o[O].intersects(v)){y=O,u=!1;break}u&&(a=a?a.getUnion(v):v,y=-1,o[c]=v,b.setX(_),b.setY(-S.y+f)),3600===p?d=3:5400===p?d=2:10800===p&&(d=1),p+=d}}var m=Math.max(a.w/e.w,a.h/e.h),T=a.x+a.w/2,E=a.y+a.h/2;for(O=0;O<i.length;O++){var b;(b=i[O]).setX(e.x+b.getX()/m+(e.w/2-T/m)),b.setY(e.y+b.getY()/m+(e.h/2-E/m));var A=parseFloat(b.getCSSStyle().getStyle(t.CSSStyle.FONT_SIZE));b.setFontSize(A/m)}},s.rectangleLayout=function(e,i,o){for(var n=[],r=0,a=0,l=0,h=0;h<i.length;h++){var g=(b=i[h]).getDimensions();r=Math.max(r,g.w),a=Math.max(a,g.h),l=Math.max(l,parseFloat(b.getCSSStyle().getStyle(t.CSSStyle.FONT_SIZE))),n.push(new t.Dimension(g.w,g.h))}for(var c,u,p=0,d=(e.w-10)/r;d-p>.001;)c=(p+d)/2,(u=s._calculateLineBreaks(n,(e.w-10)/c)).length*(c*a+2)-2>e.h-10?d=c:p=c;for(c=p,(u=s._calculateLineBreaks(n,(e.w-10)/c)).push(i.length),h=0;h<u.length-1;h++){var S=u[h],y=u[h+1],C=0,_=0,f=!0;if(y-S>1){for(var v=0,O=S;O<y;O++)v+=n[O].w*c,_=Math.max(_,n[O].h*c);if(C=(e.w-10-v)/(y-S-1),h==u.length-2){var m=.5*_;m<C&&v+(y-S)*m<.9*(e.w-10)&&(C=m,f=!1)}}var T=5+(h+1)*(a*c+2)-2,E=o?e.w-5:5;for(O=S;O<y;O++){var b=i[O],A=parseFloat(b.getCSSStyle().getStyle(t.CSSStyle.FONT_SIZE));b.setFontSize(A*c),b.setY(e.y+T),f&&O==y-1&&O!=S?o?(b.alignLeft(),b.setX(e.x+5)):(b.alignRight(),b.setX(e.x+e.w-5)):(b.setX(e.x+E),o?(b.alignRight(),E-=n[O].w*c+C):(b.alignLeft(),E+=n[O].w*c+C))}}},s._calculateLineBreaks=function(t,e){var i=[0],o=t[0].w+2;if(t.length>1)for(var n=1;n<t.length;n++)o+t[n].w>e&&(i.push(n),o=0),o+=t[n].w+2;return i};var a=new Object;t.Obj.createSubclass(a,t.Obj),a.getAnimationDuration=function(t){return t.getOptions().styleDefaults.animationDuration/1e3};var l=function(t,e,i,o){this.Init(e,i,o),this._view=t};t.Obj.createSubclass(l,t.EventManager),l.prototype.OnClickInternal=function(t){var e=this.GetLogicalObject(t.target);this._handleLinkCallback(e),this._processActionEvent(e)},l.prototype.HandleTouchHoverEndInternal=function(t){var e=this.GetLogicalObject(t.target);this._processActionEvent(e)},l.prototype.HandleTouchClickInternal=function(t){var e=this.GetLogicalObject(t.target);this._handleLinkCallback(e),this._processActionEvent(e)},l.prototype._handleLinkCallback=function(t){if(t instanceof o){var e=t.getLinkCallback();e&&e.call()}},l.prototype.ProcessKeyboardEvent=function(e){var i=!0,o=e.keyCode,n=this.getFocus();return o==t.KeyboardEvent.ENTER?this._handleLinkCallback(n):i=l.superclass.ProcessKeyboardEvent.call(this,e),i},l.prototype.ProcessRolloverEvent=function(e,i,o){var n=this._view.getOptions();if("dim"==n.hoverBehavior){var r=i.getCategories?i.getCategories():[];n.highlightedCategories=o?r.slice():null;var s=t.EventFactory.newCategoryHighlightEvent(n.highlightedCategories,o),a=t.StyleUtils.getTimeMilliseconds(n.styleDefaults.hoverBehaviorDelay);this.RolloverHandler.processEvent(s,this._view.getObjects(),a,"any"==n.highlightMatch)}},l.prototype._processActionEvent=function(e){e&&e.getAction&&e.getAction()&&this.FireEvent(t.EventFactory.newActionEvent("action",e.getAction(),e.getId()))},l.prototype.GetTouchResponse=function(){return this._view.getOptions().touchResponse};var h=function(t){this.Init(t)};t.Obj.createSubclass(h,t.KeyboardHandler),h.prototype.Init=function(t){h.superclass.Init.call(this,t)},h.prototype.isSelectionEvent=function(t){return this.isNavigationEvent(t)&&!t.ctrlKey},h.prototype.isMultiSelectEvent=function(e){return e.keyCode==t.KeyboardEvent.SPACE&&e.ctrlKey},h.getNextNavigable=function(e,i,o){var n=i.keyCode==t.KeyboardEvent.RIGHT_ARROW||i.keyCode==t.KeyboardEvent.DOWN_ARROW,r=t.ArrayUtils.getIndex(o,e)+(n?1:-1);return r<o.length&&r>=0?o[r]:null};var g=function(){};t.Obj.createSubclass(g,t.DropTarget),g.prototype.acceptDrag=function(t,e,i){return i[0]},t.exportProperty(t,"TagCloud",t.TagCloud),t.exportProperty(t.TagCloud,"newInstance",t.TagCloud.newInstance),t.exportProperty(t.TagCloud.prototype,"render",t.TagCloud.prototype.render),t.exportProperty(t.TagCloud.prototype,"getAutomation",t.TagCloud.prototype.getAutomation),t.exportProperty(t.TagCloud.prototype,"highlight",t.TagCloud.prototype.highlight),t.exportProperty(t.TagCloud.prototype,"select",t.TagCloud.prototype.select),t.exportProperty(e.prototype,"getDomElementForSubId",e.prototype.getDomElementForSubId),t.exportProperty(e.prototype,"getItem",e.prototype.getItem),t.exportProperty(e.prototype,"getItemCount",e.prototype.getItemCount)}(t),t});