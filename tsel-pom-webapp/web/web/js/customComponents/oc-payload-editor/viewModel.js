define(["knockout","jquery","common/restService","libs/cm/lib/codemirror","libs/cm/mode/htmlmixed/htmlmixed","libs/cm/mode/xml/xml","libs/cm/addon/hint/show-hint","libs/cm/addon/hint/html-hint","libs/cm/addon/mode/loadmode","libs/cm/addon/selection/active-line","libs/cm/addon/edit/matchbrackets","libs/vkbeautify/vkbeautify.0.99.00.beta"],function(e,d,i,t){return function(i){var o=this;o.props=i.properties,o.updatePayload=e.observable(i.properties.updatePayload),o.editedEditor,o.oriEditor,o.editedReadOnly=i.properties.readOnly,o.displayOri=i.properties.displayOriginal,o.bindingsApplied=function(){console.log("aaa")},o.attached=function(){console.log("---binding applied"),o.displayOri&&(o.oriEditor=t.fromTextArea(document.getElementById("oriPayloadEditor"),{mode:"text/xml",theme:"default",lineNumbers:!0,readOnly:"true"}),o.oriEditor.setSize(null,"60vh"),d(".div-ori").show()),document.getElementById("editedPayloadEditor").value=vkbeautify.xml(document.getElementById("editedPayloadEditor").value),o.editedEditor=t.fromTextArea(document.getElementById("editedPayloadEditor"),{mode:"text/xml",theme:"default",lineNumbers:!0,lineWrapping:!0,readOnly:o.editedReadOnly}),o.editedEditor.setSize(null,"60vh"),o.editedReadOnly||(d(".retry-action").show(),o.editedEditor.setSize(null,"100vh"))},o.onClickSavePayload=function(){alert(o.editedEditor.getValue())}}});