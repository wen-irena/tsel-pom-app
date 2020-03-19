import{buildViewArray}from"../line/line_data.js";import{sawCollapsedSpans}from"../line/saw_special_spans.js";import{visualLineEndNo,visualLineNo}from"../line/spans.js";import{findViewIndex}from"../measurement/position_measurement.js";import{indexOf}from"../util/misc.js";export function regChange(e,i,n,l){null==i&&(i=e.doc.first),null==n&&(n=e.doc.first+e.doc.size),l||(l=0);let t=e.display;if(l&&n<t.viewTo&&(null==t.updateLineNumbers||t.updateLineNumbers>i)&&(t.updateLineNumbers=i),e.curOp.viewChanged=!0,i>=t.viewTo)sawCollapsedSpans&&visualLineNo(e.doc,i)<t.viewTo&&resetView(e);else if(n<=t.viewFrom)sawCollapsedSpans&&visualLineEndNo(e.doc,n+l)>t.viewFrom?resetView(e):(t.viewFrom+=l,t.viewTo+=l);else if(i<=t.viewFrom&&n>=t.viewTo)resetView(e);else if(i<=t.viewFrom){let i=viewCuttingPoint(e,n,n+l,1);i?(t.view=t.view.slice(i.index),t.viewFrom=i.lineN,t.viewTo+=l):resetView(e)}else if(n>=t.viewTo){let n=viewCuttingPoint(e,i,i,-1);n?(t.view=t.view.slice(0,n.index),t.viewTo=n.lineN):resetView(e)}else{let o=viewCuttingPoint(e,i,i,-1),r=viewCuttingPoint(e,n,n+l,1);o&&r?(t.view=t.view.slice(0,o.index).concat(buildViewArray(e,o.lineN,r.lineN)).concat(t.view.slice(r.index)),t.viewTo+=l):resetView(e)}let o=t.externalMeasured;o&&(n<o.lineN?o.lineN+=l:i<o.lineN+o.size&&(t.externalMeasured=null))};export function regLineChange(e,i,n){e.curOp.viewChanged=!0;let l=e.display,t=e.display.externalMeasured;if(t&&i>=t.lineN&&i<t.lineN+t.size&&(l.externalMeasured=null),i<l.viewFrom||i>=l.viewTo)return;let o=l.view[findViewIndex(e,i)];if(null==o.node)return;let r=o.changes||(o.changes=[]);-1==indexOf(r,n)&&r.push(n)};export function resetView(e){e.display.viewFrom=e.display.viewTo=e.doc.first,e.display.view=[],e.display.viewOffset=0};function viewCuttingPoint(e,i,n,l){let t,o=findViewIndex(e,i),r=e.display.view;if(!sawCollapsedSpans||n==e.doc.first+e.doc.size)return{index:o,lineN:n};let s=e.display.viewFrom;for(let e=0;e<o;e++)s+=r[e].size;if(s!=i){if(l>0){if(o==r.length-1)return null;t=s+r[o].size-i,o++}else t=s-i;i+=t,n+=t}for(;visualLineNo(e.doc,n)!=n;){if(o==(l<0?0:r.length-1))return null;n+=l*r[o-(l<0?1:0)].size,o+=l}return{index:o,lineN:n}}export function adjustView(e,i,n){let l=e.display;0==l.view.length||i>=l.viewTo||n<=l.viewFrom?(l.view=buildViewArray(e,i,n),l.viewFrom=i):(l.viewFrom>i?l.view=buildViewArray(e,i,l.viewFrom).concat(l.view):l.viewFrom<i&&(l.view=l.view.slice(findViewIndex(e,i))),l.viewFrom=i,l.viewTo<n?l.view=l.view.concat(buildViewArray(e,l.viewTo,n)):l.viewTo>n&&(l.view=l.view.slice(0,findViewIndex(e,n)))),l.viewTo=n};export function countDirtyView(e){let i=e.display.view,n=0;for(let e=0;e<i.length;e++){let l=i[e];l.hidden||l.node&&!l.changes||++n}return n};