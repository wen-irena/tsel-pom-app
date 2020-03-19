import{countColumn}from"../util/misc.js";import{copyState,innerMode,startState}from"../modes.js";import StringStream from"../util/StringStream.js";import{getLine,lineNo}from"./utils_line.js";import{clipPos}from"./pos.js";class SavedContext{constructor(e,t){this.state=e,this.lookAhead=t}}class Context{constructor(e,t,o,n){this.state=t,this.doc=e,this.line=o,this.maxLookAhead=n||0,this.baseTokens=null,this.baseTokenPos=1}lookAhead(e){let t=this.doc.getLine(this.line+e);return null!=t&&e>this.maxLookAhead&&(this.maxLookAhead=e),t}baseToken(e){if(!this.baseTokens)return null;for(;this.baseTokens[this.baseTokenPos]<=e;)this.baseTokenPos+=2;let t=this.baseTokens[this.baseTokenPos+1];return{type:t&&t.replace(/( |^)overlay .*/,""),size:this.baseTokens[this.baseTokenPos]-e}}nextLine(){this.line++,this.maxLookAhead>0&&this.maxLookAhead--}static fromSaved(e,t,o){return t instanceof SavedContext?new Context(e,copyState(e.mode,t.state),o,t.lookAhead):new Context(e,copyState(e.mode,t),o)}save(e){let t=!1!==e?copyState(this.doc.mode,this.state):this.state;return this.maxLookAhead>0?new SavedContext(t,this.maxLookAhead):t}}export function highlightLine(e,t,o,n){let s=[e.state.modeGen],i={};runMode(e,t.text,e.doc.mode,o,(e,t)=>s.push(e,t),i,n);let a=o.state;for(let n=0;n<e.state.overlays.length;++n){o.baseTokens=s;let r=e.state.overlays[n],l=1,h=0;o.state=!0,runMode(e,t.text,r.mode,o,(e,t)=>{let o=l;for(;h<e;){let t=s[l];t>e&&s.splice(l,1,e,s[l+1],t),l+=2,h=Math.min(e,t)}if(t)if(r.opaque)s.splice(o,l-o,e,"overlay "+t),l=o+2;else for(;o<l;o+=2){let e=s[o+1];s[o+1]=(e?e+" ":"")+"overlay "+t}},i),o.state=a,o.baseTokens=null,o.baseTokenPos=1}return{styles:s,classes:i.bgClass||i.textClass?i:null}};export function getLineStyles(e,t,o){if(!t.styles||t.styles[0]!=e.state.modeGen){let n=getContextBefore(e,lineNo(t)),s=t.text.length>e.options.maxHighlightLength&&copyState(e.doc.mode,n.state),i=highlightLine(e,t,n);s&&(n.state=s),t.stateAfter=n.save(!s),t.styles=i.styles,i.classes?t.styleClasses=i.classes:t.styleClasses&&(t.styleClasses=null),o===e.doc.highlightFrontier&&(e.doc.modeFrontier=Math.max(e.doc.modeFrontier,++e.doc.highlightFrontier))}return t.styles};export function getContextBefore(e,t,o){let n=e.doc,s=e.display;if(!n.mode.startState)return new Context(n,!0,t);let i=findStartLine(e,t,o),a=i>n.first&&getLine(n,i-1).stateAfter,r=a?Context.fromSaved(n,a,i):new Context(n,startState(n.mode),i);return n.iter(i,t,o=>{processLine(e,o.text,r);let n=r.line;o.stateAfter=n==t-1||n%5==0||n>=s.viewFrom&&n<s.viewTo?r.save():null,r.nextLine()}),o&&(n.modeFrontier=r.line),r};export function processLine(e,t,o,n){let s=e.doc.mode,i=new StringStream(t,e.options.tabSize,o);for(i.start=i.pos=n||0,""==t&&callBlankLine(s,o.state);!i.eol();)readToken(s,i,o.state),i.start=i.pos};function callBlankLine(e,t){if(e.blankLine)return e.blankLine(t);if(!e.innerMode)return;let o=innerMode(e,t);return o.mode.blankLine?o.mode.blankLine(o.state):void 0}function readToken(e,t,o,n){for(let s=0;s<10;s++){n&&(n[0]=innerMode(e,o).mode);let s=e.token(t,o);if(t.pos>t.start)return s}throw new Error("Mode "+e.name+" failed to advance stream.")}class Token{constructor(e,t,o){this.start=e.start,this.end=e.pos,this.string=e.current(),this.type=t||null,this.state=o}}export function takeToken(e,t,o,n){let s,i=e.doc,a=i.mode;t=clipPos(i,t);let r,l=getLine(i,t.line),h=getContextBefore(e,t.line,o),d=new StringStream(l.text,e.options.tabSize,h);for(n&&(r=[]);(n||d.pos<t.ch)&&!d.eol();)d.start=d.pos,s=readToken(a,d,h.state),n&&r.push(new Token(d,s,copyState(i.mode,h.state)));return n?r:new Token(d,s,h.state)};function extractLineClasses(e,t){if(e)for(;;){let o=e.match(/(?:^|\s+)line-(background-)?(\S+)/);if(!o)break;e=e.slice(0,o.index)+e.slice(o.index+o[0].length);let n=o[1]?"bgClass":"textClass";null==t[n]?t[n]=o[2]:new RegExp("(?:^|s)"+o[2]+"(?:$|s)").test(t[n])||(t[n]+=" "+o[2])}return e}function runMode(e,t,o,n,s,i,a){let r=o.flattenSpans;null==r&&(r=e.options.flattenSpans);let l,h=0,d=null,c=new StringStream(t,e.options.tabSize,n),f=e.options.addModeClass&&[null];for(""==t&&extractLineClasses(callBlankLine(o,n.state),i);!c.eol();){if(c.pos>e.options.maxHighlightLength?(r=!1,a&&processLine(e,t,n,c.pos),c.pos=t.length,l=null):l=extractLineClasses(readToken(o,c,n.state,f),i),f){let e=f[0].name;e&&(l="m-"+(l?e+" "+l:e))}if(!r||d!=l){for(;h<c.start;)s(h=Math.min(c.start,h+5e3),d);d=l}c.start=c.pos}for(;h<c.pos;){let e=Math.min(c.pos,h+5e3);s(e,d),h=e}}function findStartLine(e,t,o){let n,s,i=e.doc,a=o?-1:t-(e.doc.mode.innerMode?1e3:100);for(let r=t;r>a;--r){if(r<=i.first)return i.first;let t=getLine(i,r-1),a=t.stateAfter;if(a&&(!o||r+(a instanceof SavedContext?a.lookAhead:0)<=i.modeFrontier))return r;let l=countColumn(t.text,null,e.options.tabSize);(null==s||n>l)&&(s=r-1,n=l)}return s}export function retreatFrontier(e,t){if(e.modeFrontier=Math.min(e.modeFrontier,t),e.highlightFrontier<t-10)return;let o=e.first;for(let n=t-1;n>o;n--){let s=getLine(e,n).stateAfter;if(s&&(!(s instanceof SavedContext)||n+s.lookAhead<t)){o=n+1;break}}e.highlightFrontier=Math.min(e.highlightFrontier,o)};