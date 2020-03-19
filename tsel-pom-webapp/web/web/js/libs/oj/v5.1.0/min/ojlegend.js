"use strict";define(["ojs/ojcore","jquery","ojs/ojcomponentcore","ojs/ojdvt-base","ojs/internal-deps/dvt/DvtLegend"],function(e,t,n,o,i){e.__registerWidget("oj.ojLegend",t.oj.dvtBaseComponent,{widgetEventPrefix:"oj",options:{drilling:"off",halign:"start",hiddenCategories:[],hideAndShowBehavior:"off",highlightedCategories:[],hoverBehavior:"none",hoverBehaviorDelay:200,orientation:"vertical",scrolling:"asNeeded",sections:null,symbolHeight:0,symbolWidth:0,textStyle:void 0,valign:"top",drill:null},_CreateDvtComponent:function(e,t,n){return i.Legend.newInstance(e,t,n)},_ConvertLocatorToSubId:function(e){var t=e.subId;return"oj-legend-item"==t?(t="section"+this._GetStringFromIndexPath(e.sectionIndexPath),t+=":item["+e.itemIndex+"]"):"oj-legend-tooltip"==t&&(t="tooltip"),t},_ConvertSubIdToLocator:function(e){var t={};if(e.indexOf(":item")>0){var n=e.indexOf(":item"),o=e.substring(0,n),i=e.substring(n);t.subId="oj-legend-item",t.sectionIndexPath=this._GetIndexPath(o),t.itemIndex=this._GetFirstIndex(i)}else"tooltip"==e&&(t.subId="oj-legend-tooltip");return t},_GetComponentStyleClasses:function(){var e=this._super();return e.push("oj-legend"),e},_GetChildStyleClasses:function(){var e=this._super();return e["oj-legend"]={path:"textStyle",property:"TEXT"},e["oj-legend-title"]={path:"titleStyle",property:"TEXT"},e["oj-legend-section-title"]={path:"_sectionTitleStyle",property:"TEXT"},e},_GetTranslationMap:function(){var e=this.options.translations,t=this._super();return t["DvtUtilBundle.LEGEND"]=e.componentName,t},_GetEventTypes:function(){return["drill"]},_HandleEvent:function(e){"drill"===e.type?this._trigger("drill",null,{id:e.id}):this._super(e)},_LoadResources:function(){null==this.options._resources&&(this.options._resources={});var e=this.options._resources;e.closedEnabled="oj-legend-section-close-icon",e.closedOver="oj-legend-section-close-icon oj-hover",e.closedDown="oj-legend-section-close-icon oj-active",e.openEnabled="oj-legend-section-open-icon",e.openOver="oj-legend-section-open-icon oj-hover",e.openDown="oj-legend-section-open-icon oj-active"},_Render:function(){this._super()},getTitle:function(){return this._component.getAutomation().getTitle()},getSection:function(e){var t=this._component.getAutomation().getSection(e);return t&&(t.getSection=function(e){return t.sections?t.sections[e]:null},t.getItem=function(e){return t.items?t.items[e]:null}),t},getItem:function(e){return this._component.getAutomation().getItem(e)},getPreferredSize:function(e,t){for(var n=!1,o=this.options.sections?this.options.sections:[],i=0;i<o.length;i++){var s=o[i].items;s&&s.then&&(n=!0)}var r=n?null:this.options,l=this._component.getPreferredSize(r,e,t);return{width:l.getWidth(),height:l.getHeight()}},getContextByNode:function(e){var t=this.getSubIdByNode(e);return t&&"oj-legend-tooltip"!==t.subId?t:null},_GetComponentDeferredDataPaths:function(){return{sections:["items"]}},_GetComponentNoClonePaths:function(){return{sections:{items:!0}}}}),e.CustomElementBridge.registerMetadata("oj-legend","dvtBaseComponent",{properties:{drilling:{type:"string",enumValues:["on","off"]},halign:{type:"string",enumValues:["center","end","start"]},hiddenCategories:{type:"Array<string>",writeback:!0},hideAndShowBehavior:{type:"string",enumValues:["on","off"]},highlightedCategories:{type:"Array<string>",writeback:!0},hoverBehavior:{type:"string",enumValues:["dim","none"]},hoverBehaviorDelay:{type:"number"},orientation:{type:"string",enumValues:["horizontal","vertical"]},scrolling:{type:"string",enumValues:["asNeeded","off"]},sections:{type:"Array<object>"},symbolHeight:{type:"number"},symbolWidth:{type:"number"},textStyle:{type:"object"},translations:{type:"Object",properties:{componentName:{type:"string",value:"Legend"},labelAndValue:{type:"string",value:"{0}: {1}"},labelClearSelection:{type:"string",value:"Clear Selection"},labelCountWithTotal:{type:"string",value:"{0} of {1}"},labelDataVisualization:{type:"string",value:"Data Visualization"},labelInvalidData:{type:"string",value:"Invalid data"},labelNoData:{type:"string",value:"No data to display"},stateCollapsed:{type:"string",value:"Collapsed"},stateDrillable:{type:"string",value:"Drillable"},stateExpanded:{type:"string",value:"Expanded"},stateHidden:{type:"string",value:"Hidden"},stateIsolated:{type:"string",value:"Isolated"},stateMaximized:{type:"string",value:"Maximized"},stateMinimized:{type:"string",value:"Minimized"},stateSelected:{type:"string",value:"Selected"},stateUnselected:{type:"string",value:"Unselected"},stateVisible:{type:"string",value:"Visible"}}},valign:{type:"string"}},events:{drill:{}},methods:{getContextByNode:{},getItem:{},getPreferredSize:{},getSection:{}},extension:{_WIDGET_NAME:"ojLegend"}}),e.CustomElementBridge.register("oj-legend",{metadata:e.CustomElementBridge.getMetadata("oj-legend")})});