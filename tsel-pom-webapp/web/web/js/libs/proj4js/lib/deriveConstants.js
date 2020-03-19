import{SIXTH,RA4,RA6,EPSLN}from"./constants/values";import{default as Ellipsoid,WGS84}from"./constants/Ellipsoid";import match from"./match";export function eccentricity(t,r,a,e){var o=t*t,i=r*r,s=(o-i)/o,n=0;return e?(o=(t*=1-s*(SIXTH+s*(RA4+s*RA6)))*t,s=0):n=Math.sqrt(s),{es:s,e:n,ep2:(o-i)/i}};export function sphere(t,r,a,e,o){if(!t){var i=match(Ellipsoid,e);i||(i=WGS84),t=i.a,r=i.b,a=i.rf}return a&&!r&&(r=(1-1/a)*t),(0===a||Math.abs(t-r)<EPSLN)&&(o=!0,r=t),{a:t,b:r,rf:a,sphere:o}};