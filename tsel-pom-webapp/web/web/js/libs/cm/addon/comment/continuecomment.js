!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){function n(n){if(n.getOption("disableInput"))return e.Pass;for(var o,i=n.listSelections(),l=[],r=0;r<i.length;r++){var m=i[r].head;if(!/\bcomment\b/.test(n.getTokenTypeAt(m)))return e.Pass;var c=n.getModeAt(m);if(o){if(o!=c)return e.Pass}else o=c;var f=null;if(o.blockCommentStart&&o.blockCommentContinue){var s,a,u=(s=n.getLine(m.line).slice(0,m.ch)).lastIndexOf(o.blockCommentEnd);if(-1!=u&&u==m.ch-o.blockCommentEnd.length);else if((a=s.lastIndexOf(o.blockCommentStart))>-1&&a>u){if(f=s.slice(0,a),/\S/.test(f)){f="";for(var d=0;d<a;++d)f+=" "}}else(a=s.indexOf(o.blockCommentContinue))>-1&&!/\S/.test(s.slice(0,a))&&(f=s.slice(0,a));null!=f&&(f+=o.blockCommentContinue)}if(null==f&&o.lineComment&&t(n))(a=(s=n.getLine(m.line)).indexOf(o.lineComment))>-1&&(f=s.slice(0,a),/\S/.test(f)?f=null:f+=o.lineComment+s.slice(a+o.lineComment.length).match(/^\s*/)[0]);if(null==f)return e.Pass;l[r]="\n"+f}n.operation(function(){for(var e=i.length-1;e>=0;e--)n.replaceRange(l[e],i[e].from(),i[e].to(),"+insert")})}function t(e){var n=e.getOption("continueComments");return!n||"object"!=typeof n||!1!==n.continueLineComment}e.defineOption("continueComments",null,function(t,o,i){if(i&&i!=e.Init&&t.removeKeyMap("continueComment"),o){var l="Enter";"string"==typeof o?l=o:"object"==typeof o&&o.key&&(l=o.key);var r={name:"continueComment"};r[l]=n,t.addKeyMap(r)}})});