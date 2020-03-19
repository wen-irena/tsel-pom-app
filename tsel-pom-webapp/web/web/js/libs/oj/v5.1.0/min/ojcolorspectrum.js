"use strict";define(["ojs/ojcore","jquery","ojs/ojcomponentcore","ojs/ojcolor","ojs/ojslider","jqueryui-amd/widgets/draggable","ojs/ojtouchproxy","ojs/ojeditablevalue"],function(t,e){!function(){function s(t){var e=function(t,e,s){t/=255,e/=255,s/=255;var i,a,h=Math.max(t,e,s),r=Math.min(t,e,s),u=(h+r)/2;if(h==r)i=a=0;else{var l=h-r;switch(a=u>.5?l/(2-h-r):l/(h+r),h){case t:i=(e-s)/l+(e<s?6:0);break;case e:i=(s-t)/l+2;break;case s:i=(t-e)/l+4}i/=6}return[i,a,u]}(t.getRed(),t.getGreen(),t.getBlue());return e[0]*=360,e[1]*=100,e[2]*=100,e.push(t.getAlpha()),e}t.__registerWidget("oj.ojColorSpectrum",e.oj.editableValue,{widgetEventPrefix:"oj",defaultElement:"<input>",options:{labelledBy:null,value:null,rawValue:null},getNodeBySubId:function(t){if(null==t)return this.element?this.element[0]:null;var e=t.subId,s=this._super(t);if(!s)switch(e){case"oj-spectrum":s=this._$spectrum[0];break;case"oj-spectrum-thumb":s=this._$spectrumThumb[0];break;case"oj-hue-slider-bar":s=this._$hueSlider.ojSlider("getNodeBySubId",{subId:"oj-slider-bar"});break;case"oj-hue-slider-bar-value":s=this._$hueSlider.ojSlider("getNodeBySubId",{subId:"oj-slider-bar-value"});break;case"oj-hue-slider-thumb":s=this._$hueSlider.ojSlider("getNodeBySubId",{subId:"oj-slider-thumb-0"});break;case"oj-opacity-slider-bar":s=this._$alphaSlider.ojSlider("getNodeBySubId",{subId:"oj-slider-bar"});break;case"oj-opacity-slider-bar-value":s=this._$alphaSlider.ojSlider("getNodeBySubId",{subId:"oj-slider-bar-value"});break;case"oj-opacity-slider-thumb":s=this._$alphaSlider.ojSlider("getNodeBySubId",{subId:"oj-slider-thumb-0"})}return s},getSubIdByNode:function(t){if(!t)return null;var s,i=e(t),a=null;return i.hasClass("oj-colorspectrum-spectrum")?a="oj-spectrum":i.hasClass("oj-colorspectrum-thumb")?a="oj-spectrum-thumb":(s=i.closest(".oj-slider").hasClass("oj-slider-vertical")?"hue":"opacity",i.hasClass("oj-slider-bar")?a="oj-"+s+"-slider-bar":i.hasClass("oj-slider-bar-value")?a="oj-"+s+"-slider-bar-value":i.hasClass("oj-slider-thumb")&&(a="oj-"+s+"-slider-thumb")),null!=a?{subId:a}:this._super(t)},_destroy:function(){this._$boundElem&&(this._clearListeners(),this._destroySliders(),this._removeMarkup(),this._$boundElem.removeClass("oj-colorspectrum"),this._clear()),this._super()},_ComponentCreate:function(){this._super(),this._initEditor()},_AfterCreate:function(){var e;if(this._super(),this._updateLabelledBy(null,this.options.labelledBy,this._$spectrumThumb),this._IsCustomElement()||(e=this._GetLabelElement()),e){var s=e.attr("id");s?this._$spectrumThumb.attr("aria-labelledby",s):t.Logger.warn("JET Color Spectrum: The label for this component needs an id in order to be accessible")}else{var i=this.element.attr("aria-label");i&&this._$spectrumThumb.attr("aria-label",i)}},_setOption:function(t,e,s){var i=this.options.labelledBy;switch(t){case"value":this._setOptValue(e);break;case"disabled":this._setOptDisabled(e,!0);break;case"labelledBy":this._updateLabelledBy(i,e,this._$spectrumThumb)}this._super(t,e,s)},_SetRawValue:function(e,s){if("string"==typeof e)try{e=new t.Color(e)}catch(s){t.Logger("ojColorSpectrum (id='"+this.element.attr("id")+"'): invalid "+this._transientValueName+" ("+e+"), defaulting to black"),e=t.Color.BLACK}var i={};i._context={originalEvent:s,writeback:!0,internalSet:!0,readOnly:!0},this._comparedRoundedColor(this.options[this._transientValueName],e)||this.option(this._transientValueName,e,i)},_updateLabelledBy:t.EditableValueUtils._updateLabelledBy,_comparedRoundedColor:function(t,e){return t.getRed()===e.getRed()&&t.getGreen()===e.getGreen()&&t.getBlue()===e.getBlue()&&t.getAlpha()===e.getAlpha()},_compareColorValues:function(e,s){var i=e instanceof t.Color,a=s instanceof t.Color;return i&&a&&e.isEqual(s)},_setOptDisabled:function(t,e){var s=!e||e&&t!==this._disabled;return s&&(this._enableSliders(!t),t?(this.element.addClass("oj-disabled"),this._makeThumbDraggable(!1)):(this.element.removeClass("oj-disabled"),this._makeThumbDraggable(!0)),this._disabled=t),s},_setOptValue:function(e){e instanceof t.Color&&(this._compareColorValues(this._value,e)||(this._setColorVals(e),this._setSliderValue(this._hueVal,!0),this._setSliderValue(this._alphaVal,!1),this._setSpectrumHue(this._hueVal,this._satVal,this._lumVal,this._alphaVal,!0)))},_onSliderOptionChange:function(s,i){var a,h,r,u,l,o,n,_;this._sliderSetup&&("rawValue"!=i.option&&"value"!=i.option||void 0===i.value||("value"==i.option&&(this._isOrigEvent=!!s.originalEvent),o=(_=e(s.target)).hasClass("oj-colorspectrum-hue"),n=_.hasClass("oj-colorspectrum-alpha"),(o||n)&&(h=this._hueVal,r=this._satVal,u=this._lumVal,l=this._alphaVal,o?(h=i.value,this._updateAlphaBG(h,r,u),this._setSpectrumHue(h,r,u,l,!1)):(l=i.value,this._setAriaText(h,r,u,l)),a=new t.Color({h:h,s:r,l:u,a:l}),(s.originalEvent||this._isOrigEvent)&&(this._isOrigEvent=!1,"rawValue"===i.option?this._SetRawValue(a,s):"value"===i.option&&this._SetValue(a,s)),this._setColorVals(a))))},_setSliderValue:function(t,e){(e?this._$hueSlider:this._$alphaSlider).ojSlider("option","value",t)},_setSpectrumHue:function(t,e,s,i,a){var h="hsl("+t+", 100%, 50%)";if(this._$spectrum.css("background-color",h),a){var r=this._getSatLumSpectrumPosition(e,s);this._setThumbPosition(r.x,r.y)}this._setAriaText(t,e,s,i)},_setSpectrumMask:function(){var e,s=" -___-linear-gradient(top, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 100%, 0) 50%, hsla(0, 0%, 0%, 0) 50%, hsl(0, 0%, 0%) 100%), -___-linear-gradient(left, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%)";switch(t.AgentUtils.getAgentInfo().browser){case t.AgentUtils.BROWSER.FIREFOX:e="moz";break;case t.AgentUtils.BROWSER.CHROME:case t.AgentUtils.BROWSER.SAFARI:default:e="webkit";break;case t.AgentUtils.BROWSER.IE:e="ms"}s=(s=" -___-linear-gradient(top, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 100%, 0) 50%, hsla(0, 0%, 0%, 0) 50%, hsl(0, 0%, 0%) 100%), -___-linear-gradient(left, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%)").replace(/___/g,e),this._$spectrum.css("backgroundImage",s)},_setThumbPosition:function(t,e){isNaN(t)||(this._xThumb=t),isNaN(e)||(this._yThumb=e),this._moveThumb(0,0)},_getSatLumSpectrumPosition:function(t,e){var s=Math.min(t/100*this._spectrumWidth,this._spectrumWidth),i=this._spectrumHeight-Math.min(e/100*this._spectrumHeight,this._spectrumHeight);return{x:Math.round(s),y:Math.round(i)}},_moveThumb:function(t,e){var s,i;(s=this._xThumb+t)<0&&(s=0),(i=this._yThumb+e)<0&&(i=0),s>=this._spectrumWidth&&(s=this._spectrumWidth-1),i>=this._spectrumHeight&&(i=this._spectrumHeight-1),this._xThumb=s,this._yThumb=i,s=s-this._spectrumThumbRadius+"px",i=i-this._spectrumThumbRadius+"px",this._$spectrumThumb[0].style.left=s,this._$spectrumThumb[0].style.top=i},_spectrumClick:function(e){if(!this._disabled){var s,i,a,h,r=this._$spectrum.offset(),u=e.pageX-r.left,l=e.pageY-r.top;u=Math.round(u),l=Math.round(l),i=(h=this._getSatLumFromPosition(u,l)).s,a=h.l,s=this._hueVal,this._updateAlphaBG(s,i,a);var o=new t.Color({h:s,s:i,l:a,a:this._alphaVal});this._SetRawValue(o,e),this._SetValue(o,e),this._setAriaText(s,i,a,this._alphaVal),this._value=o,this._setSatLum(i,a),this._setThumbPosition(u,l),this._$spectrumThumb.focus()}},_keyDown:function(t){var e,s,i,a,h=1;if(this._keyNow=(new Date).getTime(),this._keyStart<0&&(this._keyStart=this._keyNow,this._keyCount=0),a=this._keyNow-this._keyStart,this._keyCount++,(a>1400||this._keyCount>25)&&(h=3),s=i=0,40==(e=t.keyCode))i=h;else if(38==e)i=-h;else if(39==e)s=h;else if(37==e)s=-h;else if(36==e)this._setThumbPosition(0,0),this._keyStart=-1;else if(35==e)this._setThumbPosition(this._spectrumWidth-1,this._spectrumHeight-1),this._keyStart=-1;else if(33==e)this._setThumbPosition(NaN,0),this._keyStart=-1;else{if(34!=e)return;this._setThumbPosition(NaN,this._spectrumHeight-1),this._keyStart=-1}return this._moveThumb(s,i),this._handleThumbMoved(t,this._xThumb,this._yThumb),t.preventDefault(),!1},_keyUp:function(t){this._keyStart=-1;var e=this._getSatLumFromPosition(this._xThumb,this._yThumb);this._setAriaText(this._hueVal,e.s,e.l,this._alphaVal);var s=this.options[this._transientValueName];this._SetValue(s,t)},_initThumbDraggable:function(){this._$spectrum[0].getBoundingClientRect(),this._thumbDragHandler||(this._thumbDragHandler=this._thumbDrag.bind(this)),this._$spectrumThumb.draggable({drag:this._thumbDragHandler,stop:this._thumbDragHandler})},_makeThumbDraggable:function(t){this._$spectrumThumb.draggable(t?"enable":"disable")},_thumbDrag:function(t,e){var s,i,a,h;e.position.left<-this._spectrumThumbRadius?(e.position.left=-this._spectrumThumbRadius,s=0):e.position.left+this._spectrumThumbRadius>=this._spectrumWidth&&(e.position.left=this._spectrumWidth-1-this._spectrumThumbRadius,i=this._spectrumWidth-1),e.position.top<-this._spectrumThumbRadius?(e.position.top=-this._spectrumThumbRadius,i=0):e.position.top+this._spectrumThumbRadius>=this._spectrumHeight&&(e.position.top=this._spectrumHeight-1-this._spectrumThumbRadius,i=this._spectrumHeight-1),a=this._$spectrumThumb.offset(),h=this._$spectrum.offset(),0!=s&&(s=a.left+this._spectrumThumbRadius-h.left),0!=i&&(i=a.top+this._spectrumThumbRadius-h.top),this._xThumb===s&&this._yThumb===i||("drag"===t.type?(this._xThumb=s,this._yThumb=i):(s=this._xThumb,i=this._yThumb),this._handleThumbMoved(t,s,i))},_handleThumbMoved:function(e,s,i){var a,h,r,u,l,o=!1;a=this._hueVal,h=(u=this._getSatLumFromPosition(s,i)).s,r=u.l,this._updateAlphaBG(a,h,r),l=new t.Color({h:a,s:h,l:r,a:this._alphaVal}),this._SetRawValue(l,e),"dragstop"===e.type&&(this._SetValue(l,e.originalEvent),o=!0),this._value=l,this._setSatLum(h,r),o&&this._setAriaText(a,h,r,this._alphaVal)},_getSatLumFromPosition:function(t,e){return this._hueVal,{s:t/(this._spectrumWidth-1)*100,l:100-e/(this._spectrumHeight-1)*100}},_updateAlphaBG:function(t,e,s){var i,a="hsla("+t+","+e+"%,"+s+"%, 0)",h="hsla("+t+","+e+"%,"+s+"%, 1.0)";this._isRtl&&(i=h,h=a,a=i),i=(i="linear-gradient(90deg, "+a+", "+h+")")+","+this._alphaBgUrl,this._disabledAlphaBG=i,this._$alphaBarBack.css("background",i)},_getRoundedHsl:function(t,e,s,i){var a="hsl",h="number"==typeof i&&i<1;return(a+=h?"a(":"(")+((t=Math.round(t))+", ")+(e=Math.round(100*e)/100)+"%, "+(s=Math.round(100*s)/100)+"%"+(h?","+i:"")+")"},_setSatLum:function(t,e){this._satVal=t,this._lumVal=e},_setColorVals:function(t){if(t){this._value=t;var e=s(t);this._hueVal=e[0],this._satVal=e[1],this._lumVal=e[2],this._alphaVal=e[3]}},_setAriaText:function(t,e,s,i){var a=this._getRoundedHsl(t,e,s,i);this._$spectrumThumb.attr("aria-valuetext",a)},_initEditor:function(){this._initData(),this._setup()},_setup:function(){this._$boundElem.append(this._markup),this._$boundElem.addClass("oj-colorspectrum"),e(".oj-colorspectrum-hue").uniqueId(),e(".oj-colorspectrum-alpha").uniqueId(),this._$editorContainer=this._$boundElem.find(".oj-colorspectrum-container"),this._$hueSlider=this._$boundElem.find(".oj-colorspectrum-hue"),this._$alphaSlider=this._$boundElem.find(".oj-colorspectrum-alpha"),this._$spectrum=this._$boundElem.find(".oj-colorspectrum-spectrum"),this._$spectrumThumb=this._$boundElem.find(".oj-colorspectrum-thumb"),this._spectrumThumbRadius=this._$spectrumThumb[0].offsetWidth/2,this._spectrumThumbRadius<=0&&(this._spectrumThumbRadius=this._$spectrumThumb.width()/2),this._isTouch=t.DomUtils.isTouchSupported(),this._spectrumWidth=this._$spectrum.width(),this._spectrumHeight=this._$spectrum.height(),this._$spectrumThumb.attr("aria-describedby",this._$boundElem.find(".oj-colorspectrum-thumb-description").uniqueId().attr("id"));var i=document.createElement("div");i.className="oj-colorspectrum-alpha-bg",this._$boundElem[0].appendChild(i),this._alphaBgUrl=window.getComputedStyle(i,null).getPropertyValue("background-image"),this._$boundElem[0].removeChild(i);var a=!!this._disabled,h=s(this._value);this._hueVal=h[0],this._satVal=h[1],this._lumVal=h[2],this._alphaVal=h[3],this._sliderSetup=!1,this._$hueSlider.ojSlider({max:360,min:0,step:1,value:this._hueVal,orientation:"vertical",optionChange:this._onSliderOptionChange.bind(this),rootAttributes:{class:"oj-slider-color-picker"}}).attr("data-oj-internal",""),this._$alphaSlider.ojSlider({max:1,min:0,step:.01,value:this._alphaVal,orientation:"horizontal",optionChange:this._onSliderOptionChange.bind(this),rootAttributes:{class:"oj-slider-color-picker"}}).attr("data-oj-internal",""),this._initSliders(),this._setSpectrumMask(),this._setSpectrumHue(this._hueVal,this._satVal,this._lumVal,this._alphaVal,!0),this._$spectrum.click(this._spectrumClick.bind(this)),this._initThumbDraggable(),this._setOptDisabled(a),this._$spectrumThumb.keydown(this._keyDown.bind(this)),this._$spectrumThumb.keyup(this._keyUp.bind(this)),this._$spectrum.focus(this._nofocus.bind(this)),this._focusable({element:this._$spectrumThumb,applyHighlight:!0}),t.DomUtils.isTouchSupported()&&this._setupTouch(this._$spectrumThumb)},_nofocus:function(t){return this._$spectrumThumb.focus(),!1},_initSliders:function(){var t={subId:"oj-slider-bar"};this._$hueBarBack=e(this._$hueSlider.ojSlider("getNodeBySubId",t)),this._$alphaBarBack=e(this._$alphaSlider.ojSlider("getNodeBySubId",t)),t.subId="oj-slider-bar-value",this._$hueBarValue=e(this._$hueSlider.ojSlider("getNodeBySubId",t)),this._$alphaBarValue=e(this._$alphaSlider.ojSlider("getNodeBySubId",t));var s="linear-gradient(0deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)";this._$hueBarBack.css("background",s),this._disabledHueBG=s,this._updateAlphaBG(this._hueVal,this._satVal,this._lumVal),this._sliderSetup=!0},_initData:function(){this._applyOptions(),this._xThumb=0,this._yThumb=0;var t=this._EscapeXSS(this.getTranslatedString("labelHue")),e=this._EscapeXSS(this.getTranslatedString("labelOpacity")),s=this._EscapeXSS(this.getTranslatedString("labelThumbDesc"));this._markup=["<div class='oj-colorspectrum-container'>","<div class='oj-colorspectrum-spectrum' tabindex='-1' style='position:relative'>","<div class='oj-colorspectrum-thumb' role='slider' aria-describedby='' style='position:absolute;top:-9999px;left:-9999px;' tabIndex='0'></div>","</div>","<div class='oj-colorspectrum-thumb-description oj-helper-hidden-accessible'>"+s+"</div>","<input class='oj-colorspectrum-hue' aria-label='"+t+"'></input>","<input class='oj-colorspectrum-alpha' aria-label='"+e+"'></input>","</div>"].join(""),this._keyStart=-1,this._isRtl="rtl"===this._GetReadingDirection()},_applyOptions:function(){var s,i=this.options;this._doc=this.element[0].ownerDocument,this._body=this._doc.body,this._$boundElem=e(this.element),this._disabled=!1,this._transientValueName=this._IsCustomElement()?"transientValue":"rawValue",(s=i.value)instanceof t.Color||(s=null),this._value=s||t.Color.BLACK,i[this._transientValueName]=this._value,s=i.disabled,this._disabled="boolean"==typeof s&&s},_enableSliders:function(t){var s=!t;if(t){this._$hueSlider.ojSlider("option","disabled",s),this._$alphaSlider.ojSlider("option","disabled",s);var i={subId:"oj-slider-bar"};this._$hueSlider=this._$boundElem.find(".oj-colorspectrum-hue"),this._$alphaSlider=this._$boundElem.find(".oj-colorspectrum-alpha"),this._$hueBarBack=e(this._$hueSlider.ojSlider("getNodeBySubId",i)),this._$alphaBarBack=e(this._$alphaSlider.ojSlider("getNodeBySubId",i)),this._disabledAlphaBG&&this._$alphaBarBack.css("background",this._disabledAlphaBG),this._disabledHueBG&&this._$hueBarBack.css("background",this._disabledHueBG)}else{var a=this._$hueBarBack.css("background");a&&a.length>0&&(this._disabledHueBG=a),(a=this._$alphaBarBack.css("background"))&&a.length>0&&(this._disabledAlphaBG=a),this._$hueBarBack.css("background",""),this._$alphaBarBack.css("background",""),this._$hueSlider.ojSlider("option","disabled",s),this._$alphaSlider.ojSlider("option","disabled",s)}},_destroySliders:function(){this._$hueSlider.ojSlider("destroy"),this._$alphaSlider.ojSlider("destroy")},_removeMarkup:function(){this._$boundElem.empty()},_clearListeners:function(){this._$spectrum.off("click"),this._$spectrumThumb.off("mousedown"),this._$spectrumThumb.off("keydown"),this._$spectrumThumb.off("keyup"),this._touchProxy&&this._tearDownTouch(this._$spectrumThumb)},_clear:function(){this._markup=this._$boundElem=this._$editorContainer=this._$hue=this._$alpha=this._$editorContainer=this._$hueSlider=this._$alphaSlider=this._$spectrum=this._$spectrumThumb=this._spectrumThumbSize=this._strings=this._mouseMoveHandler=this._mouseUpHandler=null},_setupTouch:function(e){this._touchProxy=t._TouchProxy.addTouchListeners(e)},_tearDownTouch:function(e){t._TouchProxy.removeTouchListeners(e)},_GetMessagingLauncherElement:function(){return this.element},_GetContentElement:function(){return this._$spectrumThumb},_GetElementValue:function(){return this._value},_SetDisplayValue:function(e){this._value="string"==typeof e?new t.Color(e):e},_GetDisplayValue:function(){return this._value.toString()},_GetDefaultStyleClass:function(){return"oj-colorspectrum"},_EscapeXSS:function(t){return e("<span>"+t+"</span>").text()}})}(),t.CustomElementBridge.registerMetadata("oj-color-spectrum","editableValue",{properties:{labelledBy:{type:"string"},transientValue:{readOnly:!0,writeback:!0},value:{writeback:!0},translations:{type:"Object",properties:{labelHue:{type:"string",value:"Hue"},labelOpacity:{type:"string",value:"Opacity"},labelSatLum:{type:"string",value:"Saturation/Luminance"},labelThumbDesc:{type:"string",value:"color spectrum four way slider"}}}},methods:{},extension:{_WIDGET_NAME:"ojColorSpectrum"}}),t.CustomElementBridge.register("oj-color-spectrum",{metadata:t.CustomElementBridge.getMetadata("oj-color-spectrum")})});