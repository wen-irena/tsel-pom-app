define(["ojs/ojcore","knockout","jquery","../appController","common/rendererService","common/restService"],function(t,e,a,l,o,r){var f=this;return function(){f.passedParam=t.Router.rootInstance.retrieve(),f.falloutFlag=e.observable(f.passedParam?f.passedParam.flag:"N"),f.falloutAt_paramorderId=e.observable(f.passedParam?f.passedParam.orderId:""),f.falloutAt_paramFoId=e.observable(f.passedParam?f.passedParam.foId:""),f.falloutAt_searchfoAtId=e.observable(),f.falloutAt_backtask=function(t,e){l.redirect("tasks",f.passedParam)},f.falloutAt_backorder=function(t,e){l.redirect("orders",f.passedParam)},f.falloutAt_backFallout=function(t,e){l.redirect("fallout",f.passedParam)},f.connected=function(){},f.disconnected=function(){},f.transitionCompleted=function(){},f.falloutAt_dateTimeRenderer=function(t){return o.dateTimeRenderer(t)},f.falloutAt_columns=[{headerText:"Fallout Detail Id",field:"foatId"},{headerText:"Action",field:"action"},{headerText:"Fallout At Comment",field:"foatComment"},{headerText:"Payload Id",field:"payloadId"},{headerText:"Created Date",field:"createdDate",renderer:f.falloutAt_dateTimeRenderer},{headerText:"Updated Date",field:"updatedDate",renderer:f.falloutAt_dateTimeRenderer},{headerText:"Created By",field:"createdBy"},{headerText:"Updated By",field:"updatedBy"}],f.falloutAt_fetchSize=e.observable(-1),f.falloutAt_allData=e.observableArray(),f.falloutAt_tableWidth=e.observable("100%"),f.falloutAt_display="grid",f.falloutAt_columnsDefault={sortable:"auto"},f.falloutAt_scrollPolicy="loadMoreOnScroll",f.falloutAt_scrollPolicyOptions={fetchSize:10},f.falloutAt_rootAttributes={style:"width:100%;overflow-x: auto; overflow-y: hidden;"},f.falloutAt_selectionMode={row:"single"},f.falloutAt_datasource=new t.PagingTableDataSource(new t.ArrayTableDataSource(f.falloutAt_allData,{idAttribute:"foatId"})),f.falloutAt_selectedRow=e.observable(),f.falloutAt_onSelectRow=function(t,e){var a=e.currentRow.rowIndex;f.falloutAt_datasource.at(a).then(function(t){f.falloutAt_selectedRow(t.data)})},f.falloutAt_fetchSize.subscribe(function(t){}),f.falloutAt_search=function(t){var e=f.falloutAt_collection().filter(function(e){return 0===t.length||t.length>0&&e.attributes.ItemId.toLowerCase().indexOf(t.toString().toLowerCase())>-1});f.falloutAt_collection().reset(e),f.falloutAt_allData(f.falloutAt_collection().toJSON())},f.falloutAt_onSearch=function(){f.falloutAt_refreshData()},f.falloutAt_onReset=function(){f.falloutAt_searchfoAtId(void 0),f.falloutAt_fetchSize(-1),f.falloutAt_refreshData()},f.falloutAt_refreshData=function(){var t=[],e=[];f.falloutAt_fetchSize&&f.falloutAt_fetchSize()&&(t.push("size"),e.push(f.falloutAt_fetchSize())),f.passedParam&&(t.push("foId"),e.push(f.passedParam.foId)),f.falloutAt_searchfoAtId()&&(t.push("foatId"),e.push(f.falloutAt_searchfoAtId())),getRestData(r.falloutServiceAt,t,e,function(t,e){"ERROR"!==t&&f.falloutAt_allData(t.content)})},f.falloutAt_refreshData()}});