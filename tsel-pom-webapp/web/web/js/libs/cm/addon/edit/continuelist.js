!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";var n=/^(\s*)(>[> ]*|[*+-] \[[x ]\]\s|[*+-]\s|(\d+)([.)]))(\s*)/,t=/^(\s*)(>[> ]*|[*+-] \[[x ]\]|[*+-]|(\d+)[.)])(\s*)$/,i=/[*+-]\s/;function r(e,t){var i=t.line,r=0,l=0,s=n.exec(e.getLine(i)),c=s[1];do{var o=i+(r+=1),a=e.getLine(o),d=n.exec(a);if(d){var f=d[1],p=parseInt(s[3],10)+r-l,u=parseInt(d[3],10),h=u;if(c!==f||isNaN(u)){if(c.length>f.length)return;if(c.length<f.length&&1===r)return;l+=1}else p===u&&(h=u+1),p>u&&(h=p+1),e.replaceRange(a.replace(n,f+h+d[4]+d[5]),{line:o,ch:0},{line:o,ch:a.length})}}while(d)}e.commands.newlineAndIndentContinueMarkdownList=function(l){if(l.getOption("disableInput"))return e.Pass;for(var s=l.listSelections(),c=[],o=0;o<s.length;o++){var a=s[o].head,d=l.getStateAfter(a.line),f=!1!==d.list,p=0!==d.quote,u=l.getLine(a.line),h=n.exec(u),g=/^\s*$/.test(u.slice(0,a.ch));if(!s[o].empty()||!f&&!p||!h||g)return void l.execCommand("newlineAndIndent");if(t.test(u))/>\s*$/.test(u)||l.replaceRange("",{line:a.line,ch:0},{line:a.line,ch:a.ch+1}),c[o]="\n";else{var m=h[1],x=h[5],v=!(i.test(h[2])||h[2].indexOf(">")>=0),I=v?parseInt(h[3],10)+1+h[4]:h[2].replace("x"," ");c[o]="\n"+m+I+x,v&&r(l,a)}}l.replaceSelections(c)}});