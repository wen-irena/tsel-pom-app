import{operation,runInOp}from"../display/operations.js";import{prepareSelection}from"../display/selection.js";import{regChange}from"../display/view_tracking.js";import{applyTextInput,copyableRanges,disableBrowserMagic,handlePaste,hiddenTextarea,lastCopied,setLastCopied}from"./input.js";import{cmp,maxPos,minPos,Pos}from"../line/pos.js";import{getBetween,getLine,lineNo}from"../line/utils_line.js";import{findViewForLine,findViewIndex,mapFromLineView,nodeAndOffsetInLineMap}from"../measurement/position_measurement.js";import{replaceRange}from"../model/changes.js";import{simpleSelection}from"../model/selection.js";import{setSelection}from"../model/selection_updates.js";import{getBidiPartAt,getOrder}from"../util/bidi.js";import{android,chrome,gecko,ie_version}from"../util/browser.js";import{contains,range,removeChildrenAndAdd,selectInput}from"../util/dom.js";import{on,signalDOMEvent}from"../util/event.js";import{Delayed,lst,sel_dontScroll}from"../util/misc.js";export default class ContentEditableInput{constructor(e){this.cm=e,this.lastAnchorNode=this.lastAnchorOffset=this.lastFocusNode=this.lastFocusOffset=null,this.polling=new Delayed,this.composing=null,this.gracePeriod=!1,this.readDOMTimeout=null}init(e){let t=this,i=t.cm,o=t.div=e.lineDiv;function n(e){if(signalDOMEvent(i,e))return;if(i.somethingSelected())setLastCopied({lineWise:!1,text:i.getSelections()}),"cut"==e.type&&i.replaceSelection("",null,"cut");else{if(!i.options.lineWiseCopyCut)return;{let t=copyableRanges(i);setLastCopied({lineWise:!0,text:t.text}),"cut"==e.type&&i.operation(()=>{i.setSelections(t.ranges,0,sel_dontScroll),i.replaceSelection("",null,"cut")})}}if(e.clipboardData){e.clipboardData.clearData();let t=lastCopied.text.join("\n");if(e.clipboardData.setData("Text",t),e.clipboardData.getData("Text")==t)return void e.preventDefault()}let n=hiddenTextarea(),s=n.firstChild;i.display.lineSpace.insertBefore(n,i.display.lineSpace.firstChild),s.value=lastCopied.text.join("\n");let l=document.activeElement;selectInput(s),setTimeout(()=>{i.display.lineSpace.removeChild(n),l.focus(),l==o&&t.showPrimarySelection()},50)}disableBrowserMagic(o,i.options.spellcheck),on(o,"paste",e=>{signalDOMEvent(i,e)||handlePaste(e,i)||ie_version<=11&&setTimeout(operation(i,()=>this.updateFromDOM()),20)}),on(o,"compositionstart",e=>{this.composing={data:e.data,done:!1}}),on(o,"compositionupdate",e=>{this.composing||(this.composing={data:e.data,done:!1})}),on(o,"compositionend",e=>{this.composing&&(e.data!=this.composing.data&&this.readFromDOMSoon(),this.composing.done=!0)}),on(o,"touchstart",()=>t.forceCompositionEnd()),on(o,"input",()=>{this.composing||this.readFromDOMSoon()}),on(o,"copy",n),on(o,"cut",n)}prepareSelection(){let e=prepareSelection(this.cm,!1);return e.focus=this.cm.state.focused,e}showSelection(e,t){e&&this.cm.display.view.length&&((e.focus||t)&&this.showPrimarySelection(),this.showMultipleSelections(e))}getSelection(){return this.cm.display.wrapper.ownerDocument.getSelection()}showPrimarySelection(){let e=this.getSelection(),t=this.cm,i=t.doc.sel.primary(),o=i.from(),n=i.to();if(t.display.viewTo==t.display.viewFrom||o.line>=t.display.viewTo||n.line<t.display.viewFrom)return void e.removeAllRanges();let s=domToPos(t,e.anchorNode,e.anchorOffset),l=domToPos(t,e.focusNode,e.focusOffset);if(s&&!s.bad&&l&&!l.bad&&0==cmp(minPos(s,l),o)&&0==cmp(maxPos(s,l),n))return;let r=t.display.view,a=o.line>=t.display.viewFrom&&posToDOM(t,o)||{node:r[0].measure.map[2],offset:0},d=n.line<t.display.viewTo&&posToDOM(t,n);if(!d){let e=r[r.length-1].measure,t=e.maps?e.maps[e.maps.length-1]:e.map;d={node:t[t.length-1],offset:t[t.length-2]-t[t.length-3]}}if(!a||!d)return void e.removeAllRanges();let c,h=e.rangeCount&&e.getRangeAt(0);try{c=range(a.node,a.offset,d.offset,d.node)}catch(e){}c&&(!gecko&&t.state.focused?(e.collapse(a.node,a.offset),c.collapsed||(e.removeAllRanges(),e.addRange(c))):(e.removeAllRanges(),e.addRange(c)),h&&null==e.anchorNode?e.addRange(h):gecko&&this.startGracePeriod()),this.rememberSelection()}startGracePeriod(){clearTimeout(this.gracePeriod),this.gracePeriod=setTimeout(()=>{this.gracePeriod=!1,this.selectionChanged()&&this.cm.operation(()=>this.cm.curOp.selectionChanged=!0)},20)}showMultipleSelections(e){removeChildrenAndAdd(this.cm.display.cursorDiv,e.cursors),removeChildrenAndAdd(this.cm.display.selectionDiv,e.selection)}rememberSelection(){let e=this.getSelection();this.lastAnchorNode=e.anchorNode,this.lastAnchorOffset=e.anchorOffset,this.lastFocusNode=e.focusNode,this.lastFocusOffset=e.focusOffset}selectionInEditor(){let e=this.getSelection();if(!e.rangeCount)return!1;let t=e.getRangeAt(0).commonAncestorContainer;return contains(this.div,t)}focus(){"nocursor"!=this.cm.options.readOnly&&(this.selectionInEditor()||this.showSelection(this.prepareSelection(),!0),this.div.focus())}blur(){this.div.blur()}getField(){return this.div}supportsTouch(){return!0}receivedFocus(){let e=this;this.selectionInEditor()?this.pollSelection():runInOp(this.cm,()=>e.cm.curOp.selectionChanged=!0),this.polling.set(this.cm.options.pollInterval,function t(){e.cm.state.focused&&(e.pollSelection(),e.polling.set(e.cm.options.pollInterval,t))})}selectionChanged(){let e=this.getSelection();return e.anchorNode!=this.lastAnchorNode||e.anchorOffset!=this.lastAnchorOffset||e.focusNode!=this.lastFocusNode||e.focusOffset!=this.lastFocusOffset}pollSelection(){if(null!=this.readDOMTimeout||this.gracePeriod||!this.selectionChanged())return;let e=this.getSelection(),t=this.cm;if(android&&chrome&&this.cm.options.gutters.length&&isInGutter(e.anchorNode))return this.cm.triggerOnKeyDown({type:"keydown",keyCode:8,preventDefault:Math.abs}),this.blur(),void this.focus();if(this.composing)return;this.rememberSelection();let i=domToPos(t,e.anchorNode,e.anchorOffset),o=domToPos(t,e.focusNode,e.focusOffset);i&&o&&runInOp(t,()=>{setSelection(t.doc,simpleSelection(i,o),sel_dontScroll),(i.bad||o.bad)&&(t.curOp.selectionChanged=!0)})}pollContent(){null!=this.readDOMTimeout&&(clearTimeout(this.readDOMTimeout),this.readDOMTimeout=null);let e,t,i,o=this.cm,n=o.display,s=o.doc.sel.primary(),l=s.from(),r=s.to();if(0==l.ch&&l.line>o.firstLine()&&(l=Pos(l.line-1,getLine(o.doc,l.line-1).length)),r.ch==getLine(o.doc,r.line).text.length&&r.line<o.lastLine()&&(r=Pos(r.line+1,0)),l.line<n.viewFrom||r.line>n.viewTo-1)return!1;l.line==n.viewFrom||0==(e=findViewIndex(o,l.line))?(t=lineNo(n.view[0].line),i=n.view[0].node):(t=lineNo(n.view[e].line),i=n.view[e-1].node.nextSibling);let a,d,c=findViewIndex(o,r.line);if(c==n.view.length-1?(a=n.viewTo-1,d=n.lineDiv.lastChild):(a=lineNo(n.view[c+1].line)-1,d=n.view[c+1].node.previousSibling),!i)return!1;let h=o.doc.splitLines(domTextBetween(o,i,d,t,a)),p=getBetween(o.doc,Pos(t,0),Pos(a,getLine(o.doc,a).text.length));for(;h.length>1&&p.length>1;)if(lst(h)==lst(p))h.pop(),p.pop(),a--;else{if(h[0]!=p[0])break;h.shift(),p.shift(),t++}let u=0,m=0,f=h[0],g=p[0],v=Math.min(f.length,g.length);for(;u<v&&f.charCodeAt(u)==g.charCodeAt(u);)++u;let C=lst(h),y=lst(p),b=Math.min(C.length-(1==h.length?u:0),y.length-(1==p.length?u:0));for(;m<b&&C.charCodeAt(C.length-m-1)==y.charCodeAt(y.length-m-1);)++m;if(1==h.length&&1==p.length&&t==l.line)for(;u&&u>l.ch&&C.charCodeAt(C.length-m-1)==y.charCodeAt(y.length-m-1);)u--,m++;h[h.length-1]=C.slice(0,C.length-m).replace(/^\u200b+/,""),h[0]=h[0].slice(u).replace(/\u200b+$/,"");let w=Pos(t,u),O=Pos(a,p.length?lst(p).length-m:0);return h.length>1||h[0]||cmp(w,O)?(replaceRange(o.doc,h,w,O,"+input"),!0):void 0}ensurePolled(){this.forceCompositionEnd()}reset(){this.forceCompositionEnd()}forceCompositionEnd(){this.composing&&(clearTimeout(this.readDOMTimeout),this.composing=null,this.updateFromDOM(),this.div.blur(),this.div.focus())}readFromDOMSoon(){null==this.readDOMTimeout&&(this.readDOMTimeout=setTimeout(()=>{if(this.readDOMTimeout=null,this.composing){if(!this.composing.done)return;this.composing=null}this.updateFromDOM()},80))}updateFromDOM(){!this.cm.isReadOnly()&&this.pollContent()||runInOp(this.cm,()=>regChange(this.cm))}setUneditable(e){e.contentEditable="false"}onKeyPress(e){0==e.charCode||this.composing||(e.preventDefault(),this.cm.isReadOnly()||operation(this.cm,applyTextInput)(this.cm,String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),0))}readOnlyChanged(e){this.div.contentEditable=String("nocursor"!=e)}onContextMenu(){}resetPosition(){}};function posToDOM(e,t){let i=findViewForLine(e,t.line);if(!i||i.hidden)return null;let o=getLine(e.doc,t.line),n=mapFromLineView(i,o,t.line),s=getOrder(o,e.doc.direction),l="left";if(s){l=getBidiPartAt(s,t.ch)%2?"right":"left"}let r=nodeAndOffsetInLineMap(n.map,t.ch,l);return r.offset="right"==r.collapse?r.end:r.start,r}function isInGutter(e){for(let t=e;t;t=t.parentNode)if(/CodeMirror-gutter-wrapper/.test(t.className))return!0;return!1}function badPos(e,t){return t&&(e.bad=!0),e}function domTextBetween(e,t,i,o,n){let s="",l=!1,r=e.doc.lineSeparator(),a=!1;function d(){l&&(s+=r,a&&(s+=r),l=a=!1)}function c(e){e&&(d(),s+=e)}function h(t){if(1==t.nodeType){let s=t.getAttribute("cm-text");if(s)return void c(s);let p,u=t.getAttribute("cm-marker");if(u){let t=e.findMarks(Pos(o,0),Pos(n+1,0),(i=+u,e=>e.id==i));return void(t.length&&(p=t[0].find(0))&&c(getBetween(e.doc,p.from,p.to).join(r)))}if("false"==t.getAttribute("contenteditable"))return;let m=/^(pre|div|p|li|table|br)$/i.test(t.nodeName);if(!/^br$/i.test(t.nodeName)&&0==t.textContent.length)return;m&&d();for(let e=0;e<t.childNodes.length;e++)h(t.childNodes[e]);/^(pre|p)$/i.test(t.nodeName)&&(a=!0),m&&(l=!0)}else 3==t.nodeType&&c(t.nodeValue.replace(/\u200b/g,"").replace(/\u00a0/g," "));var i}for(;h(t),t!=i;)t=t.nextSibling,a=!1;return s}function domToPos(e,t,i){let o;if(t==e.display.lineDiv){if(!(o=e.display.lineDiv.childNodes[i]))return badPos(e.clipPos(Pos(e.display.viewTo-1)),!0);t=null,i=0}else for(o=t;;o=o.parentNode){if(!o||o==e.display.lineDiv)return null;if(o.parentNode&&o.parentNode==e.display.lineDiv)break}for(let n=0;n<e.display.view.length;n++){let s=e.display.view[n];if(s.node==o)return locateNodeInLineView(s,t,i)}}function locateNodeInLineView(e,t,i){let o=e.text.firstChild,n=!1;if(!t||!contains(o,t))return badPos(Pos(lineNo(e.line),0),!0);if(t==o&&(n=!0,t=o.childNodes[i],i=0,!t)){let t=e.rest?lst(e.rest):e.line;return badPos(Pos(lineNo(t),t.text.length),n)}let s=3==t.nodeType?t:null,l=t;for(s||1!=t.childNodes.length||3!=t.firstChild.nodeType||(s=t.firstChild,i&&(i=s.nodeValue.length));l.parentNode!=o;)l=l.parentNode;let r=e.measure,a=r.maps;function d(t,i,o){for(let n=-1;n<(a?a.length:0);n++){let s=n<0?r.map:a[n];for(let l=0;l<s.length;l+=3){let r=s[l+2];if(r==t||r==i){let i=lineNo(n<0?e.line:e.rest[n]),a=s[l]+o;return(o<0||r!=t)&&(a=s[l+(o?1:0)]),Pos(i,a)}}}}let c=d(s,l,i);if(c)return badPos(c,n);for(let e=l.nextSibling,t=s?s.nodeValue.length-i:0;e;e=e.nextSibling){if(c=d(e,e.firstChild,0))return badPos(Pos(c.line,c.ch-t),n);t+=e.textContent.length}for(let e=l.previousSibling,t=i;e;e=e.previousSibling){if(c=d(e,e.firstChild,-1))return badPos(Pos(c.line,c.ch+t),n);t+=e.textContent.length}}ContentEditableInput.prototype.needsContentAttribute=!0;