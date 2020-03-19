import{flipCtrlCmd,mac,presto}from"../util/browser.js";import{map}from"../util/misc.js";import{keyNames}from"./keynames.js";export let keyMap={};function normalizeKeyName(e){let t,r,l,o,i=e.split(/-(?!$)/);e=i[i.length-1];for(let e=0;e<i.length-1;e++){let n=i[e];if(/^(cmd|meta|m)$/i.test(n))o=!0;else if(/^a(lt)?$/i.test(n))t=!0;else if(/^(c|ctrl|control)$/i.test(n))r=!0;else{if(!/^s(hift)?$/i.test(n))throw new Error("Unrecognized modifier name: "+n);l=!0}}return t&&(e="Alt-"+e),r&&(e="Ctrl-"+e),o&&(e="Cmd-"+e),l&&(e="Shift-"+e),e}keyMap.basic={Left:"goCharLeft",Right:"goCharRight",Up:"goLineUp",Down:"goLineDown",End:"goLineEnd",Home:"goLineStartSmart",PageUp:"goPageUp",PageDown:"goPageDown",Delete:"delCharAfter",Backspace:"delCharBefore","Shift-Backspace":"delCharBefore",Tab:"defaultTab","Shift-Tab":"indentAuto",Enter:"newlineAndIndent",Insert:"toggleOverwrite",Esc:"singleSelection"},keyMap.pcDefault={"Ctrl-A":"selectAll","Ctrl-D":"deleteLine","Ctrl-Z":"undo","Shift-Ctrl-Z":"redo","Ctrl-Y":"redo","Ctrl-Home":"goDocStart","Ctrl-End":"goDocEnd","Ctrl-Up":"goLineUp","Ctrl-Down":"goLineDown","Ctrl-Left":"goGroupLeft","Ctrl-Right":"goGroupRight","Alt-Left":"goLineStart","Alt-Right":"goLineEnd","Ctrl-Backspace":"delGroupBefore","Ctrl-Delete":"delGroupAfter","Ctrl-S":"save","Ctrl-F":"find","Ctrl-G":"findNext","Shift-Ctrl-G":"findPrev","Shift-Ctrl-F":"replace","Shift-Ctrl-R":"replaceAll","Ctrl-[":"indentLess","Ctrl-]":"indentMore","Ctrl-U":"undoSelection","Shift-Ctrl-U":"redoSelection","Alt-U":"redoSelection",fallthrough:"basic"},keyMap.emacsy={"Ctrl-F":"goCharRight","Ctrl-B":"goCharLeft","Ctrl-P":"goLineUp","Ctrl-N":"goLineDown","Alt-F":"goWordRight","Alt-B":"goWordLeft","Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd","Ctrl-V":"goPageDown","Shift-Ctrl-V":"goPageUp","Ctrl-D":"delCharAfter","Ctrl-H":"delCharBefore","Alt-D":"delWordAfter","Alt-Backspace":"delWordBefore","Ctrl-K":"killLine","Ctrl-T":"transposeChars","Ctrl-O":"openLine"},keyMap.macDefault={"Cmd-A":"selectAll","Cmd-D":"deleteLine","Cmd-Z":"undo","Shift-Cmd-Z":"redo","Cmd-Y":"redo","Cmd-Home":"goDocStart","Cmd-Up":"goDocStart","Cmd-End":"goDocEnd","Cmd-Down":"goDocEnd","Alt-Left":"goGroupLeft","Alt-Right":"goGroupRight","Cmd-Left":"goLineLeft","Cmd-Right":"goLineRight","Alt-Backspace":"delGroupBefore","Ctrl-Alt-Backspace":"delGroupAfter","Alt-Delete":"delGroupAfter","Cmd-S":"save","Cmd-F":"find","Cmd-G":"findNext","Shift-Cmd-G":"findPrev","Cmd-Alt-F":"replace","Shift-Cmd-Alt-F":"replaceAll","Cmd-[":"indentLess","Cmd-]":"indentMore","Cmd-Backspace":"delWrappedLineLeft","Cmd-Delete":"delWrappedLineRight","Cmd-U":"undoSelection","Shift-Cmd-U":"redoSelection","Ctrl-Up":"goDocStart","Ctrl-Down":"goDocEnd",fallthrough:["basic","emacsy"]},keyMap.default=mac?keyMap.macDefault:keyMap.pcDefault;export function normalizeKeyMap(e){let t={};for(let r in e)if(e.hasOwnProperty(r)){let l=e[r];if(/^(name|fallthrough|(de|at)tach)$/.test(r))continue;if("..."==l){delete e[r];continue}let o=map(r.split(" "),normalizeKeyName);for(let e=0;e<o.length;e++){let r,i;e==o.length-1?(i=o.join(" "),r=l):(i=o.slice(0,e+1).join(" "),r="...");let n=t[i];if(n){if(n!=r)throw new Error("Inconsistent bindings for "+i)}else t[i]=r}delete e[r]}for(let r in t)e[r]=t[r];return e};export function lookupKey(e,t,r,l){let o=(t=getKeyMap(t)).call?t.call(e,l):t[e];if(!1===o)return"nothing";if("..."===o)return"multi";if(null!=o&&r(o))return"handled";if(t.fallthrough){if("[object Array]"!=Object.prototype.toString.call(t.fallthrough))return lookupKey(e,t.fallthrough,r,l);for(let o=0;o<t.fallthrough.length;o++){let i=lookupKey(e,t.fallthrough[o],r,l);if(i)return i}}};export function isModifierKey(e){let t="string"==typeof e?e:keyNames[e.keyCode];return"Ctrl"==t||"Alt"==t||"Shift"==t||"Mod"==t};export function addModifierNames(e,t,r){let l=e;return t.altKey&&"Alt"!=l&&(e="Alt-"+e),(flipCtrlCmd?t.metaKey:t.ctrlKey)&&"Ctrl"!=l&&(e="Ctrl-"+e),(flipCtrlCmd?t.ctrlKey:t.metaKey)&&"Cmd"!=l&&(e="Cmd-"+e),!r&&t.shiftKey&&"Shift"!=l&&(e="Shift-"+e),e};export function keyName(e,t){if(presto&&34==e.keyCode&&e.char)return!1;let r=keyNames[e.keyCode];return null!=r&&!e.altGraphKey&&(3==e.keyCode&&e.code&&(r=e.code),addModifierNames(r,e,t))};export function getKeyMap(e){return"string"==typeof e?keyMap[e]:e};