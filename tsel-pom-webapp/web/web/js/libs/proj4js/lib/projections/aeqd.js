import adjust_lon from"../common/adjust_lon";import{HALF_PI,EPSLN}from"../constants/values";import mlfn from"../common/mlfn";import e0fn from"../common/e0fn";import e1fn from"../common/e1fn";import e2fn from"../common/e2fn";import e3fn from"../common/e3fn";import gN from"../common/gN";import asinz from"../common/asinz";import imlfn from"../common/imlfn";export function init(){this.sin_p12=Math.sin(this.lat0),this.cos_p12=Math.cos(this.lat0)};export function forward(t){var s,i,h,a,n,o,M,e,m,_,r,p,f,c,x,l,y,P,L,u,d,N,g=t.x,A=t.y,I=Math.sin(t.y),b=Math.cos(t.y),E=adjust_lon(g-this.long0);return this.sphere?Math.abs(this.sin_p12-1)<=EPSLN?(t.x=this.x0+this.a*(HALF_PI-A)*Math.sin(E),t.y=this.y0-this.a*(HALF_PI-A)*Math.cos(E),t):Math.abs(this.sin_p12+1)<=EPSLN?(t.x=this.x0+this.a*(HALF_PI+A)*Math.sin(E),t.y=this.y0+this.a*(HALF_PI+A)*Math.cos(E),t):(P=this.sin_p12*I+this.cos_p12*b*Math.cos(E),y=(l=Math.acos(P))/Math.sin(l),t.x=this.x0+this.a*y*b*Math.sin(E),t.y=this.y0+this.a*y*(this.cos_p12*I-this.sin_p12*b*Math.cos(E)),t):(s=e0fn(this.es),i=e1fn(this.es),h=e2fn(this.es),a=e3fn(this.es),Math.abs(this.sin_p12-1)<=EPSLN?(n=this.a*mlfn(s,i,h,a,HALF_PI),o=this.a*mlfn(s,i,h,a,A),t.x=this.x0+(n-o)*Math.sin(E),t.y=this.y0-(n-o)*Math.cos(E),t):Math.abs(this.sin_p12+1)<=EPSLN?(n=this.a*mlfn(s,i,h,a,HALF_PI),o=this.a*mlfn(s,i,h,a,A),t.x=this.x0+(n+o)*Math.sin(E),t.y=this.y0+(n+o)*Math.cos(E),t):(M=I/b,e=gN(this.a,this.e,this.sin_p12),m=gN(this.a,this.e,I),_=Math.atan((1-this.es)*M+this.es*e*this.sin_p12/(m*b)),L=0===(r=Math.atan2(Math.sin(E),this.cos_p12*Math.tan(_)-this.sin_p12*Math.cos(E)))?Math.asin(this.cos_p12*Math.sin(_)-this.sin_p12*Math.cos(_)):Math.abs(Math.abs(r)-Math.PI)<=EPSLN?-Math.asin(this.cos_p12*Math.sin(_)-this.sin_p12*Math.cos(_)):Math.asin(Math.sin(E)*Math.cos(_)/Math.sin(r)),p=this.e*this.sin_p12/Math.sqrt(1-this.es),l=e*L*(1-(u=L*L)*(x=(f=this.e*this.cos_p12*Math.cos(r)/Math.sqrt(1-this.es))*f)*(1-x)/6+(d=u*L)/8*(c=p*f)*(1-2*x)+(N=d*L)/120*(x*(4-7*x)-3*p*p*(1-7*x))-N*L/48*c),t.x=this.x0+l*Math.sin(r),t.y=this.y0+l*Math.cos(r),t))};export function inverse(t){var s,i,h,a,n,o,M,e,m,_,r,p,f,c,x,l,y,P,L,u,d,N;if(t.x-=this.x0,t.y-=this.y0,this.sphere){if((s=Math.sqrt(t.x*t.x+t.y*t.y))>2*HALF_PI*this.a)return;return i=s/this.a,h=Math.sin(i),a=Math.cos(i),n=this.long0,Math.abs(s)<=EPSLN?o=this.lat0:(o=asinz(a*this.sin_p12+t.y*h*this.cos_p12/s),M=Math.abs(this.lat0)-HALF_PI,n=Math.abs(M)<=EPSLN?this.lat0>=0?adjust_lon(this.long0+Math.atan2(t.x,-t.y)):adjust_lon(this.long0-Math.atan2(-t.x,t.y)):adjust_lon(this.long0+Math.atan2(t.x*h,s*this.cos_p12*a-t.y*this.sin_p12*h))),t.x=n,t.y=o,t}return e=e0fn(this.es),m=e1fn(this.es),_=e2fn(this.es),r=e3fn(this.es),Math.abs(this.sin_p12-1)<=EPSLN?(p=this.a*mlfn(e,m,_,r,HALF_PI),s=Math.sqrt(t.x*t.x+t.y*t.y),o=imlfn((p-s)/this.a,e,m,_,r),n=adjust_lon(this.long0+Math.atan2(t.x,-1*t.y)),t.x=n,t.y=o,t):Math.abs(this.sin_p12+1)<=EPSLN?(p=this.a*mlfn(e,m,_,r,HALF_PI),s=Math.sqrt(t.x*t.x+t.y*t.y),o=imlfn((s-p)/this.a,e,m,_,r),n=adjust_lon(this.long0+Math.atan2(t.x,t.y)),t.x=n,t.y=o,t):(s=Math.sqrt(t.x*t.x+t.y*t.y),x=Math.atan2(t.x,t.y),f=gN(this.a,this.e,this.sin_p12),l=Math.cos(x),P=-(y=this.e*this.cos_p12*l)*y/(1-this.es),L=3*this.es*(1-P)*this.sin_p12*this.cos_p12*l/(1-this.es),N=1-P*(d=(u=s/f)-P*(1+P)*Math.pow(u,3)/6-L*(1+3*P)*Math.pow(u,4)/24)*d/2-u*d*d*d/6,c=Math.asin(this.sin_p12*Math.cos(d)+this.cos_p12*Math.sin(d)*l),n=adjust_lon(this.long0+Math.asin(Math.sin(x)*Math.sin(d)/Math.cos(c))),o=Math.atan((1-this.es*N*this.sin_p12/Math.sin(c))*Math.tan(c)/(1-this.es)),t.x=n,t.y=o,t)};export var names=["Azimuthal_Equidistant","aeqd"];export default{init:init,forward:forward,inverse:inverse,names:names};