import nad_intr from"./nad_intr";import adjust_lon from"./adjust_lon";export default function(a,t,x,r){if(isNaN(a.x))return t;a.x=x.x+a.x,a.y=x.y-a.y;var n,y,i=9;do{if(y=nad_intr(a,r),isNaN(y.x))break;n={x:a.x-y.x-x.x,y:a.y+y.y-x.y},a.x-=n.x,a.y-=n.y}while(i--&&Math.abs(n.x)>1e-12&&Math.abs(n.y)>1e-12);return i<0?t:(t.x=adjust_lon(a.x+r.ll[0]),t.y=a.y+r.ll[1],t)};