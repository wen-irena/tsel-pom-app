"use strict";define(["ojs/ojcore","jquery","ojs/ojeditablevalue"],function(e,t){e.__registerWidget("oj._ojRadioCheckbox",t.oj.baseComponent,{version:"1.0.0",defaultElement:"<input>",widgetEventPrefix:"oj",options:{disabled:null,checked:null,type:null},label:function(){return void 0===this.$label&&(this.$label=this._getLabelsForElement()),this.$label},refresh:function(){this._super(),this._setup()},refreshDisabled:function(){this._renderDisabled()},setSelectedClass:function(e){this.element.toggleClass("oj-selected",e),this.$label.toggleClass("oj-selected",e),this.$choiceItem.toggleClass("oj-selected",e)},widget:function(){return this.uiRadioCheckbox},_InitOptions:function(e,t){var s,i;if(this._super(e,t),"checked"in t||(this.initCheckedFromDom=!0,s=!!this.element.prop("checked"),this.option("checked",s,{_context:{internalSet:!0}})),"boolean"!=typeof this.options.checked)throw new Error("checked option must be a boolean");if("disabled"in t||(i=!!this.element.prop("disabled"),this.option("disabled",i,{_context:{internalSet:!0}})),"boolean"!=typeof this.options.disabled)throw new Error("disabled option must be a boolean");"type"in t||this.option("type",this.element.prop("type"),{_context:{internalSet:!0}})},_ComponentCreate:function(){this._super();var e=this.options.type;"checkbox"==e?(this.uiRadioCheckbox=this.element.addClass("oj-checkbox oj-component"),this.$label=this._getLabelsForElement(),this.$label.addClass("oj-checkbox-label")):"radio"==e&&(this.uiRadioCheckbox=this.element.addClass("oj-radio oj-component"),this.$label=this._getLabelsForElement(),this.$label.addClass("oj-radio-label")),this.$choiceItem=this._getChoiceItem();var s=document.createElement("span");s.setAttribute("class","oj-radiocheckbox-icon"),this.element.wrapAll(s);this._focusable(this.element),this._AddHoverable(this.$choiceItem),this._AddActiveable(this.$choiceItem),this._focusable({element:this.$choiceItem,applyHighlight:!0}),this._AddHoverable(this.$label),this._AddActiveable(this.$label),t.each(this.$label,function(){t(this.childNodes).wrapAll("<span class='oj-radiocheckbox-label-text'></span>")}),this._setup()},_SaveAttributes:function(e){this._savedClasses=e.attr("class")},_RestoreAttributes:function(){this._savedClasses?this.element.attr("class",this._savedClasses):this.element.removeAttr("class")},_setup:function(){this._renderDisabled(),this.initCheckedFromDom||this._setCheckedOnDom(this.options.checked),this.options.checked&&this.setSelectedClass(this.options.checked)},_setCheckedOnDom:function(e){e=!!e,this.element.prop("checked",e)},_renderDisabled:function(){this._IsEffectivelyDisabled()?(this.element.prop("disabled",!0).removeAttr("aria-disabled").removeClass("oj-enabled").addClass("oj-disabled"),this.$label.removeClass("oj-enabled").addClass("oj-disabled"),this.$choiceItem.removeClass("oj-enabled").addClass("oj-disabled")):(this.element.prop("disabled",!1).removeAttr("aria-disabled").removeClass("oj-disabled").addClass("oj-enabled"),this.$label.addClass("oj-enabled").removeClass("oj-disabled"),this.$choiceItem.addClass("oj-enabled").removeClass("oj-disabled"))},_setOption:function(e,t){this._superApply(arguments),"disabled"===e&&(t=!!t,this._renderDisabled(t)),"checked"===e&&(this._setCheckedOnDom(t),this.setSelectedClass(t))},_getLabelsForElement:function(){var s,i=this.element.closest("label"),o="label[for='"+this.element.prop("id")+"']",l=t(o);return 0!==i.length&&e.Logger.error("Found a label that is an input's ancestor. This is not supported in the ojCheckboxset or ojRadioset component and the component will\n      not work correctly. Use a label as a sibling to the input and use the label 'for' attribute to tie the two together."),0===(l=l.not(i)).length&&(s=this.element.siblings(o),l=l.add(s)),l},_getChoiceItem:function(){var t,s,i,o,l=null;return(t=this.element.parent())&&(t.hasClass("oj-choice-item")||t.hasClass("oj-choice-row")||t.hasClass("oj-choice-row-inline"))?l=t:(e.Logger.warn("The radioset/checkboxset's input and label dom should be wrapped in a dom node with class 'oj-choice-item'. JET is adding this missing dom to make the component work correctly."),i="<span class='oj-choice-item oj-choice-item-added'></span>",s="label[for='"+this.element.attr("id")+"']",0!==(o=this.element.siblings().filter(s)).length?(this.element.add(o).wrapAll(i),l=this.element.parent()):(this.element.wrapAll(i),l=this.element.parent())),l},getNodeBySubId:function(e){var t=this._super(e);if(!t){var s=e.subId;"oj-radiocheckbox-input"===s&&(t=this.element[0]),"oj-radiocheckbox-label"===s&&(t=this.label()[0])}return t||null},_destroy:function(){var e=this._super();this._RemoveHoverable(this.$choiceItem),this._RemoveActiveable(this.$choiceItem),this._RemoveHoverable(this.$label),this._RemoveActiveable(this.$label);var s=this.options.type;"checkbox"==s?this.$label.removeClass("oj-enabled oj-disabled oj-selected oj-checkbox-label"):"radio"==s&&this.$label.removeClass("oj-enabled oj-disabled oj-selected oj-radio-label"),this.$choiceItem.removeClass("oj-enabled oj-disabled oj-selected");return t.each(this.$label,function(){var e=this.getElementsByClassName("oj-radiocheckbox-label-text");void 0!==e&&t(e[0].childNodes[0]).unwrap()}),this.element.unwrap(),this.$choiceItem.hasClass("oj-choice-item-added")&&this.element.unwrap(),this.$choiceItem=null,this.$label=null,e}})});