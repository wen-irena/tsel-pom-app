import{Pos}from"../line/pos.js";import{visualLine}from"../line/spans.js";import{getLine}from"../line/utils_line.js";import{charCoords,cursorCoords,displayWidth,paddingH,wrappedLineExtentChar}from"../measurement/position_measurement.js";import{getOrder,iterateBidiSections}from"../util/bidi.js";import{elt}from"../util/dom.js";export function updateSelection(t){t.display.input.showSelection(t.display.input.prepareSelection())};export function prepareSelection(t,e=!0){let o=t.doc,i={},r=i.cursors=document.createDocumentFragment(),l=i.selection=document.createDocumentFragment();for(let i=0;i<o.sel.ranges.length;i++){if(!e&&i==o.sel.primIndex)continue;let n=o.sel.ranges[i];if(n.from().line>=t.display.viewTo||n.to().line<t.display.viewFrom)continue;let s=n.empty();(s||t.options.showCursorWhenSelecting)&&drawSelectionCursor(t,n.head,r),s||drawSelectionRange(t,n,l)}return i};export function drawSelectionCursor(t,e,o){let i=cursorCoords(t,e,"div",null,null,!t.options.singleCursorHeightPerLine),r=o.appendChild(elt("div"," ","CodeMirror-cursor"));if(r.style.left=i.left+"px",r.style.top=i.top+"px",r.style.height=Math.max(0,i.bottom-i.top)*t.options.cursorHeight+"px",i.other){let t=o.appendChild(elt("div"," ","CodeMirror-cursor CodeMirror-secondarycursor"));t.style.display="",t.style.left=i.other.left+"px",t.style.top=i.other.top+"px",t.style.height=.85*(i.other.bottom-i.other.top)+"px"}};function cmpCoords(t,e){return t.top-e.top||t.left-e.left}function drawSelectionRange(t,e,o){let i=t.display,r=t.doc,l=document.createDocumentFragment(),n=paddingH(t.display),s=n.left,p=Math.max(i.sizerWidth,displayWidth(t)-i.sizer.offsetLeft)-n.right,d="ltr"==r.direction;function a(t,e,o,i){e<0&&(e=0),e=Math.round(e),i=Math.round(i),l.appendChild(elt("div",null,"CodeMirror-selected",`position: absolute; left: ${t}px;\n                             top: ${e}px; width: ${null==o?p-t:o}px;\n                             height: ${i-e}px`))}function u(e,o,i){let l,n,u=getLine(r,e),c=u.text.length;function h(o,i){return charCoords(t,Pos(e,o),"div",u,i)}function f(e,o,i){let r=wrappedLineExtentChar(t,u,null,e),l="ltr"==o==("after"==i)?"left":"right";return h("after"==i?r.begin:r.end-(/\s/.test(u.text.charAt(r.end-1))?2:1),l)[l]}let m=getOrder(u,r.direction);return iterateBidiSections(m,o||0,null==i?c:i,(t,e,r,u)=>{let g="ltr"==r,y=h(t,g?"left":"right"),C=h(e-1,g?"right":"left"),b=null==o&&0==t,x=null==i&&e==c,v=0==u,w=!m||u==m.length-1;if(C.top-y.top<=3){let t=(d?x:b)&&w,e=(d?b:x)&&v?s:(g?y:C).left,o=t?p:(g?C:y).right;a(e,y.top,o-e,y.bottom)}else{let o,i,l,n;g?(o=d&&b&&v?s:y.left,i=d?p:f(t,r,"before"),l=d?s:f(e,r,"after"),n=d&&x&&w?p:C.right):(o=d?f(t,r,"before"):s,i=!d&&b&&v?p:y.right,l=!d&&x&&w?s:C.left,n=d?f(e,r,"after"):p),a(o,y.top,i-o,y.bottom),y.bottom<C.top&&a(s,y.bottom,null,C.top),a(l,C.top,n-l,C.bottom)}(!l||cmpCoords(y,l)<0)&&(l=y),cmpCoords(C,l)<0&&(l=C),(!n||cmpCoords(y,n)<0)&&(n=y),cmpCoords(C,n)<0&&(n=C)}),{start:l,end:n}}let c=e.from(),h=e.to();if(c.line==h.line)u(c.line,c.ch,h.ch);else{let t=getLine(r,c.line),e=getLine(r,h.line),o=visualLine(t)==visualLine(e),i=u(c.line,c.ch,o?t.text.length+1:null).end,l=u(h.line,o?0:null,h.ch).start;o&&(i.top<l.top-2?(a(i.right,i.top,null,i.bottom),a(s,l.top,l.left,l.bottom)):a(i.right,i.top,l.left-i.right,i.bottom)),i.bottom<l.top&&a(s,i.bottom,null,l.top)}o.appendChild(l)}export function restartBlink(t){if(!t.state.focused)return;let e=t.display;clearInterval(e.blinker);let o=!0;e.cursorDiv.style.visibility="",t.options.cursorBlinkRate>0?e.blinker=setInterval(()=>e.cursorDiv.style.visibility=(o=!o)?"":"hidden",t.options.cursorBlinkRate):t.options.cursorBlinkRate<0&&(e.cursorDiv.style.visibility="hidden")};