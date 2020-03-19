import e0fn from"../common/e0fn";import e1fn from"../common/e1fn";import e2fn from"../common/e2fn";import e3fn from"../common/e3fn";import msfnz from"../common/msfnz";import mlfn from"../common/mlfn";import adjust_lon from"../common/adjust_lon";import adjust_lat from"../common/adjust_lat";import imlfn from"../common/imlfn";import{EPSLN}from"../constants/values";export function init(){Math.abs(this.lat1+this.lat2)<EPSLN||(this.lat2=this.lat2||this.lat1,this.temp=this.b/this.a,this.es=1-Math.pow(this.temp,2),this.e=Math.sqrt(this.es),this.e0=e0fn(this.es),this.e1=e1fn(this.es),this.e2=e2fn(this.es),this.e3=e3fn(this.es),this.sinphi=Math.sin(this.lat1),this.cosphi=Math.cos(this.lat1),this.ms1=msfnz(this.e,this.sinphi,this.cosphi),this.ml1=mlfn(this.e0,this.e1,this.e2,this.e3,this.lat1),Math.abs(this.lat1-this.lat2)<EPSLN?this.ns=this.sinphi:(this.sinphi=Math.sin(this.lat2),this.cosphi=Math.cos(this.lat2),this.ms2=msfnz(this.e,this.sinphi,this.cosphi),this.ml2=mlfn(this.e0,this.e1,this.e2,this.e3,this.lat2),this.ns=(this.ms1-this.ms2)/(this.ml2-this.ml1)),this.g=this.ml1+this.ms1/this.ns,this.ml0=mlfn(this.e0,this.e1,this.e2,this.e3,this.lat0),this.rh=this.a*(this.g-this.ml0))};export function forward(t){var s,i=t.x,h=t.y;if(this.sphere)s=this.a*(this.g-h);else{var n=mlfn(this.e0,this.e1,this.e2,this.e3,h);s=this.a*(this.g-n)}var e=this.ns*adjust_lon(i-this.long0),m=this.x0+s*Math.sin(e),o=this.y0+this.rh-s*Math.cos(e);return t.x=m,t.y=o,t};export function inverse(t){var s,i,h,n;t.x-=this.x0,t.y=this.rh-t.y+this.y0,this.ns>=0?(i=Math.sqrt(t.x*t.x+t.y*t.y),s=1):(i=-Math.sqrt(t.x*t.x+t.y*t.y),s=-1);var e=0;if(0!==i&&(e=Math.atan2(s*t.x,s*t.y)),this.sphere)return n=adjust_lon(this.long0+e/this.ns),h=adjust_lat(this.g-i/this.a),t.x=n,t.y=h,t;var m=this.g-i/this.a;return h=imlfn(m,this.e0,this.e1,this.e2,this.e3),n=adjust_lon(this.long0+e/this.ns),t.x=n,t.y=h,t};export var names=["Equidistant_Conic","eqdc"];export default{init:init,forward:forward,inverse:inverse,names:names};