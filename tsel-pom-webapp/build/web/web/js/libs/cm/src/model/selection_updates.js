import{signalLater}from"../util/operation_group.js";import{ensureCursorVisible}from"../display/scrolling.js";import{clipPos,cmp,Pos}from"../line/pos.js";import{getLine}from"../line/utils_line.js";import{hasHandler,signal,signalCursorActivity}from"../util/event.js";import{lst,sel_dontScroll}from"../util/misc.js";import{addSelectionToHistory}from"./history.js";import{normalizeSelection,Range,Selection,simpleSelection}from"./selection.js";export function extendRange(e,n,i,t){if(t){let t=e.anchor;if(i){let e=cmp(n,t)<0;e!=cmp(i,t)<0?(t=n,n=i):e!=cmp(n,i)<0&&(n=i)}return new Range(t,n)}return new Range(i||n,n)};export function extendSelection(e,n,i,t,l){null==l&&(l=e.cm&&(e.cm.display.shift||e.extend)),setSelection(e,new Selection([extendRange(e.sel.primary(),n,i,l)],0),t)};export function extendSelections(e,n,i){let t=[],l=e.cm&&(e.cm.display.shift||e.extend);for(let i=0;i<e.sel.ranges.length;i++)t[i]=extendRange(e.sel.ranges[i],n[i],null,l);setSelection(e,normalizeSelection(t,e.sel.primIndex),i)};export function replaceOneSelection(e,n,i,t){let l=e.sel.ranges.slice(0);l[n]=i,setSelection(e,normalizeSelection(l,e.sel.primIndex),t)};export function setSimpleSelection(e,n,i,t){setSelection(e,simpleSelection(n,i),t)};function filterSelectionChange(e,n,i){let t={ranges:n.ranges,update:function(n){this.ranges=[];for(let i=0;i<n.length;i++)this.ranges[i]=new Range(clipPos(e,n[i].anchor),clipPos(e,n[i].head))},origin:i&&i.origin};return signal(e,"beforeSelectionChange",e,t),e.cm&&signal(e.cm,"beforeSelectionChange",e.cm,t),t.ranges!=n.ranges?normalizeSelection(t.ranges,t.ranges.length-1):n}export function setSelectionReplaceHistory(e,n,i){let t=e.history.done,l=lst(t);l&&l.ranges?(t[t.length-1]=n,setSelectionNoUndo(e,n,i)):setSelection(e,n,i)};export function setSelection(e,n,i){setSelectionNoUndo(e,n,i),addSelectionToHistory(e,e.sel,e.cm?e.cm.curOp.id:NaN,i)};export function setSelectionNoUndo(e,n,i){(hasHandler(e,"beforeSelectionChange")||e.cm&&hasHandler(e.cm,"beforeSelectionChange"))&&(n=filterSelectionChange(e,n,i)),setSelectionInner(e,skipAtomicInSelection(e,n,i&&i.bias||(cmp(n.primary().head,e.sel.primary().head)<0?-1:1),!0)),i&&!1===i.scroll||!e.cm||ensureCursorVisible(e.cm)};function setSelectionInner(e,n){n.equals(e.sel)||(e.sel=n,e.cm&&(e.cm.curOp.updateInput=e.cm.curOp.selectionChanged=!0,signalCursorActivity(e.cm)),signalLater(e,"cursorActivity",e))}export function reCheckSelection(e){setSelectionInner(e,skipAtomicInSelection(e,e.sel,null,!1))};function skipAtomicInSelection(e,n,i,t){let l;for(let o=0;o<n.ranges.length;o++){let r=n.ranges[o],s=n.ranges.length==e.sel.ranges.length&&e.sel.ranges[o],c=skipAtomic(e,r.anchor,s&&s.anchor,i,t),a=skipAtomic(e,r.head,s&&s.head,i,t);(l||c!=r.anchor||a!=r.head)&&(l||(l=n.ranges.slice(0,o)),l[o]=new Range(c,a))}return l?normalizeSelection(l,n.primIndex):n}function skipAtomicInner(e,n,i,t,l){let o=getLine(e,n.line);if(o.markedSpans)for(let r=0;r<o.markedSpans.length;++r){let s=o.markedSpans[r],c=s.marker;if((null==s.from||(c.inclusiveLeft?s.from<=n.ch:s.from<n.ch))&&(null==s.to||(c.inclusiveRight?s.to>=n.ch:s.to>n.ch))){if(l&&(signal(c,"beforeCursorEnter"),c.explicitlyCleared)){if(o.markedSpans){--r;continue}break}if(!c.atomic)continue;if(i){let r,s=c.find(t<0?1:-1);if((t<0?c.inclusiveRight:c.inclusiveLeft)&&(s=movePos(e,s,-t,s&&s.line==n.line?o:null)),s&&s.line==n.line&&(r=cmp(s,i))&&(t<0?r<0:r>0))return skipAtomicInner(e,s,n,t,l)}let s=c.find(t<0?-1:1);return(t<0?c.inclusiveLeft:c.inclusiveRight)&&(s=movePos(e,s,t,s.line==n.line?o:null)),s?skipAtomicInner(e,s,n,t,l):null}}return n}export function skipAtomic(e,n,i,t,l){let o=t||1,r=skipAtomicInner(e,n,i,o,l)||!l&&skipAtomicInner(e,n,i,o,!0)||skipAtomicInner(e,n,i,-o,l)||!l&&skipAtomicInner(e,n,i,-o,!0);return r||(e.cantEdit=!0,Pos(e.first,0))};function movePos(e,n,i,t){return i<0&&0==n.ch?n.line>e.first?clipPos(e,Pos(n.line-1)):null:i>0&&n.ch==(t||getLine(e,n.line)).text.length?n.line<e.first+e.size-1?Pos(n.line+1,0):null:new Pos(n.line,n.ch+i)}export function selectAll(e){e.setSelection(Pos(e.firstLine(),0),Pos(e.lastLine()),sel_dontScroll)};