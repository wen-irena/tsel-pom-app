define(["ojs/ojcore","knockout","jquery","../appController","common/constants","common/restService","common/rendererService","common/userInfo","libs/cm/lib/codemirror","libs/cm/mode/htmlmixed/htmlmixed","libs/cm/mode/xml/xml","libs/cm/addon/hint/show-hint","libs/cm/addon/hint/html-hint","libs/cm/addon/mode/loadmode","libs/cm/addon/selection/active-line","libs/cm/addon/edit/matchbrackets","libs/cm/addon/display/autorefresh","libs/vkbeautify/vkbeautify.0.99.00.beta","ojs/ojdatetimepicker","ojs/ojaccordion","ojs/ojcheckboxset","ojs/ojswitcher"],function(e,r,o,a,t,d,s,l,n){var i=e.Router.rootInstance.retrieve();const c=this;return function(){c.orders_isReadOnly=r.observable(l.isRoleReadOnly()),c.orders_payloadOri=r.observableArray(),c.orders_payloadUpdatedData=r.observableArray(),c.orders_searchOrderId=r.observable(i&&i.OrderId?i.OrderId:void 0),c.orders_searchCustomerId=r.observable(),c.orders_searchExtOrderID=r.observable();var u=new Date;u.setHours(u.getHours()-1);var _=new Date;if(c.orders_startDate=r.observable(e.IntlConverterUtils.dateToLocalIso(u)),c.orders_endDate=r.observable(e.IntlConverterUtils.dateToLocalIso(_)),c.orders_searchOrderType=r.observableArray(),c.orders_searchStatus=r.observableArray(),c.orders_orderStatusLOV=r.observableArray(),c.orders_orderTypeLOV=r.observableArray(),c.orders_orderType=function(){getRestData(d.getLOV,["lovName"],["LOV_ORDER_TYPE"],function(e){if(e){let r=e.filter(e=>e.enable).map(e=>({label:e.lookupValue2,value:e.lookupValue2}));c.orders_orderTypeLOV(r)}})},c.orders_orderType(),c.orders_orderStatus=function(){getRestData(d.getLOV,["lovName"],["LOV_ORDER_STATUS"],function(e){if(e){let r=e.filter(e=>e.enable).map(e=>({label:e.lookupValue4,value:e.lookupValue4}));c.orders_orderStatusLOV(r)}})},c.orders_orderStatus(),this.selectedItemOrders=r.observable("ori"),this.valueChangedHandler=function(e){var r=e.detail.value,a=e.detail.previousValue;o("#demo-container").addClass("demo-edge-"+r).removeClass("demo-edge-"+a)},c.orders_fetchSize=r.observable("-1"),c.order_viewMSISDN=function(e,r){const a=["serviceId"],t=[e.msisdn];getRestData(d.getCollectionsMsisdn,a,t,function(e,r){"ERROR"!==e&&(c.currentCol_allData(e.content),o("#msisdnDialog").ojDialog("open"))}),getRestData(d.getOrdersMsisdn,a,t,function(e,r){"ERROR"!==e&&(c.currentOffer_allData(e.content),o("#msisdnDialog").ojDialog("open"))})},c.orders_viewPayloadori=function(e){o(".CodeMirror-wrap").remove(),o("#orders_payloadOri").val(vkbeautify.xml(e.payloadOri?e.payloadOri:"-")),n.fromTextArea(document.getElementById("orders_payloadOri"),{mode:"text/xml",theme:"default",lineNumbers:!0,lineWrapping:!0,readOnly:!0,autoRefresh:!0}).setSize("60vw","400px"),o("#orders_payloadUpdated").val(vkbeautify.xml(e.payloadUpdated?e.payloadUpdated:"-")),n.fromTextArea(document.getElementById("orders_payloadUpdated"),{mode:"text/xml",theme:"default",lineNumbers:!0,lineWrapping:!0,readOnly:!0,autoRefresh:!0}).setSize("60vw","400px"),c.orders_payloadOri(e.payloadOri),c.orders_payloadUpdatedData(e.payloadUpdated),o("#payloadoriDialog").ojDialog("open")},localStorage.getItem("formValue")){var h=JSON.parse(localStorage.getItem("formValue"));c.orders_startDate(h.orders_startDate),c.orders_searchOrderId(h.orders_searchOrderId),c.orders_searchCustomerId(h.orders_searchCustomerId),c.orders_endDate(h.orders_endDate),c.orders_searchOrderType(h.orders_searchOrderType),c.orders_searchStatus(h.orders_searchStatus),c.orders_searchExtOrderID(h.orders_searchExtOrderID)}c.orders_viewTask=function(e,r){var o={orders_startDate:c.orders_startDate(),orders_searchOrderId:c.orders_searchOrderId(),orders_searchCustomerId:c.orders_searchCustomerId(),orders_endDate:c.orders_endDate(),orders_searchOrderType:c.orders_searchOrderType(),orders_searchStatus:c.orders_searchStatus(),orders_searchExtOrderID:c.orders_searchExtOrderID()};localStorage.setItem("formValue",JSON.stringify(o));const t={orderId:e.orderId};a.redirect("tasks",t)},c.orders_viewFoId=function(e,r){var o={foId:e.foId};a.redirect("fallout",o)},c.orders_dateTimeConverter=s.dateTimeConverter2,c.orders_dateTimeRenderer=function(e){return s.dateTimeRenderer(e)},c.orders_dateTimeRenderer2=function(e){return e?s.dateTimeRendererX(e):"-"},c.orders_columns=[{headerText:"",headerTemplate:"selection-template-header",template:"selection-template",sortable:"disabled"},{headerText:"Order",template:"orders-template",sortable:"disabled",style:"min-width:290px"},{headerText:"Conv. ID",field:"integrationId"},{headerText:"Submitted Date",field:"submittedDate",renderer:c.orders_dateTimeRenderer},{headerText:"Completion Date",field:"completionDate",renderer:c.orders_dateTimeRenderer},{headerText:"Mass Request",template:"orders-massrequest"},{headerText:"Service Type",field:"serviceType"},{headerText:"Reason",field:"reason"},{headerText:"Audit",template:"orders-audit-template"}],c.orders_retryColumns=[{headerText:"Order ID",field:"orderId"}],c.orders_allData=r.observableArray(),c.orders_tableWidth=r.observable("100%"),c.orders_display="grid",c.orders_columnsDefault={sortable:"auto"},c.orders_scrollPolicy="loadMoreOnScroll",c.orders_scrollPolicyOptions={fetchSize:10},c.orders_rootAttributes={style:"width:100%;overflow-x: auto; overflow-y: hidden;"},c.orders_selectionMode={row:"single"},c.orders_datasource=new e.PagingTableDataSource(new e.ArrayTableDataSource(c.orders_allData,{idAttribute:"sbOrderId"})),c.comment=r.observable(),c.orders_retryAllData=r.observableArray(),c.orders_scrollPolicyOptionsDialog={fetchSize:5},c.orders_retryDatasource=new e.PagingTableDataSource(new e.ArrayTableDataSource(c.orders_retryAllData,{idAttribute:"orderId"})),c.selectedItems=r.observable([]),c.getIndexInSelectedItems=function(e){for(var r=0;r<c.selectedItems().length;r++){var o=c.selectedItems()[r],a=o.startIndex.row,t=o.endIndex.row;if(e>=a&&e<=t)return r}return-1},c.orders_checkedData=r.observableArray(),c.orders_disabledValue=r.observable(),c.orders_onSelectAll=function(e,r){if(o("#cbAll").prop("checked")){let e=c.orders_allData(),r=[];e.forEach(e=>{"Failed"===e.orderStatus&&(e.isChecked=e.orderId,r.push(e.orderId))}),c.orders_allData([]),c.orders_allData(e),c.orders_checkedData(r)}else{let e=c.orders_allData();e.forEach(e=>{e.isChecked=[]}),c.orders_allData([]),c.orders_allData(e),c.orders_checkedData([])}0===c.orders_checkedData().length?c.orders_disabledValue(!0):c.orders_disabledValue(!1)},c.orders_onSelect=function(e,r){var a=c.orders_allData().findIndex(function(r){return r.sbOrderId===e.sbOrderId});if(c.orders_allData()[a].isChecked=!c.orders_allData()[a].isChecked,o(r.currentTarget).is(":checked"))c.orders_checkedData().push(e.orderId);else{var t=c.orders_checkedData();c.orders_checkedData(t.filter(function(r){return r!==e.orderId}))}0===c.orders_checkedData().length?c.orders_disabledValue(!0):c.orders_disabledValue(!1)},c.currentOffer_columns=[{headerText:"CID",field:"cid"},{headerText:"Name Text",field:"nameText"},{headerText:"Ap Version",field:"apVersionId"},{headerText:"Status",field:"status"}],c.currentOffer_allData=r.observableArray(),c.currentOffer_tableWidth=r.observable("100%"),c.currentOffer_display="grid",c.currentOffer_columnsDefault={sortable:"auto"},c.currentOffer_scrollPolicy="loadMoreOnScroll",c.currentOffer_scrollPolicyOptions={fetchSize:10},c.currentOffer_rootAttributes={style:"width:100%;overflow-x: auto; overflow-y: hidden;"},c.currentOffer_selectionMode={row:"single"},c.currentOffer_datasource=new e.PagingTableDataSource(new e.ArrayTableDataSource(c.currentOffer_allData,{idAttribute:"seq"})),c.currentOffer_fetchSize=r.observable("-1"),c.currentCol_columns=[{headerText:"Request ID",field:"requestId"},{headerText:"Request Status",field:"requestStatus"},{headerText:"Service ID",field:"serviceId"},{headerText:"Order Action ID",field:"orderActionId"},{headerText:"Subscribed ID",field:"subscriberId"},{headerText:"Operation Code",field:"operationCode"},{headerText:"Operation Input",field:"operationInput"},{headerText:"Retry Attempt",field:"retryAttemptsLeft"},{headerText:"Status",field:"status"}],c.currentCol_allData=r.observableArray(),c.currentCol_tableWidth=r.observable("100%"),c.currentCol_display="grid",c.currentCol_columnsDefault={sortable:"auto"},c.currentCol_scrollPolicy="loadMoreOnScroll",c.currentCol_scrollPolicyOptions={fetchSize:10},c.currentCol_rootAttributes={style:"width:100%;overflow-x: auto; overflow-y: hidden;"},c.currentCol_selectionMode={row:"single"},c.currentCol_datasource=new e.PagingTableDataSource(new e.ArrayTableDataSource(c.currentCol_allData,{idAttribute:"seq"})),c.currentCol_fetchSize=r.observable("-1"),c.orders_refreshData=function(){var e=[],r=[];c.orders_fetchSize&&c.orders_fetchSize()&&(e.push("size"),r.push(c.orders_fetchSize())),c.orders_searchOrderId&&c.orders_searchOrderId()&&(e.push("orderId"),r.push(c.orders_searchOrderId())),c.orders_searchCustomerId&&c.orders_searchCustomerId()&&(e.push("msisdn"),r.push(c.orders_searchCustomerId())),c.orders_startDate&&c.orders_startDate()&&(e.push("fromSubmittedDate"),r.push(c.orders_startDate())),c.orders_endDate&&c.orders_endDate()&&(e.push("toSubmittedDate"),r.push(c.orders_endDate())),c.orders_searchOrderType&&c.orders_searchOrderType().length>0&&(e.push("orderType"),r.push(c.orders_searchOrderType())),c.orders_searchStatus&&c.orders_searchStatus().length>0&&(e.push("orderStatus"),r.push(c.orders_searchStatus())),c.orders_searchExtOrderID&&c.orders_searchExtOrderID()&&(e.push("extOrderId"),r.push(c.orders_searchExtOrderID())),getRestData(d.orderService,e,r,function(e,r){if("ERROR"!==e){c.orders_allData(e.content),c.orders_disabledValue(!0);for(var a=0;a<c.orders_allData().length;a++)o("#cborder_"+c.orders_allData()[a].sbOrderId).prop("checked",!1),c.orders_allData()[a].isChecked=!1}})},c.orders_onSearch=function(){localStorage.removeItem("formValue"),c.orders_checkedData([]),o("#cbAll").prop("checked",!1),c.orders_refreshData()},c.orders_onReset=function(){c.orders_searchOrderId(void 0),c.orders_searchCustomerId(void 0),c.orders_searchExtOrderID(void 0),c.orders_searchOrderType(""),c.orders_searchStatus("");var r=new Date;r.setHours(r.getHours()-1);var o=new Date;c.orders_startDate(e.IntlConverterUtils.dateToLocalIso(r)),c.orders_endDate(e.IntlConverterUtils.dateToLocalIso(o)),c.orders_fetchSize(-1),c.orders_checkedData([]),c.orders_refreshData()},c.orders_fetchSize.subscribe(function(e){e&&c.orders_refreshData()}),c.order_retry=function(){let e=c.orders_checkedData().map(e=>{let r={};return r.orderId=e,r});c.orders_retryAllData(e),c.comment(void 0),o("#retryDialog").ojDialog("open")},c.order_cancel=function(){let e=c.orders_checkedData().map(e=>{let r={};return r.orderId=e,r});c.orders_retryAllData(e),c.comment(void 0),o("#cancelDialog").ojDialog("open")},c.order_onRetry=function(){var r={OrderRecoveryRetryMassRequest:{MessageHeader:{ConversationID:e.IntlConverterUtils.dateToLocalIso(new Date),Channel:t.channel},DataArea:{OrderIDList:{OrderID:orders_checkedData()},UpdatedBy:l.userLogin(),Comment:c.comment()}}};postRestData(d.orderRecoveryMassRetryService,r,"",function(e,r){if("ERROR"!==e){let r=e.OrderRecoveryRetryMassResponse.MessageHeader;showConfirmationMessage(r.ResponseMessage,"ConversationId="+r.ConversationId+", Channel= "+r.Channel+", ResponseCode="+r.ResponseCode+", ResponseDetail="+r.ResponseDetail),o("#retryDialog").ojDialog("close")}})},c.order_onCancel=function(){var r={OrderRecoveryCancelMassRequest:{MessageHeader:{ConversationID:e.IntlConverterUtils.dateToLocalIso(new Date),Channel:t.channel},DataArea:{OrderIDList:{OrderID:orders_checkedData()},UpdatedBy:l.userLogin(),Comment:c.comment()}}};postRestData(d.orderRecoveryMassCancelService,r,"",function(e,r){if("ERROR"!==e){let r=e.OrderRecoveryCancelMassResponse.MessageHeader;showConfirmationMessage(r.ResponseMessage,"ConversationId="+r.ConversationId+", Channel= "+r.Channel+", ResponseCode="+r.ResponseCode+", ResponseDetail="+r.ResponseDetail),o("#cancelDialog").ojDialog("close")}})},c.orders_refreshData()}});