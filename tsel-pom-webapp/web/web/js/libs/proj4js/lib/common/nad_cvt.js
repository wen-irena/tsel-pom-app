import adjust_lon from"./adjust_lon";import nad_intr from"./nad_intr";import inverseNadCvt from"./inverseNadCvt";export default function(r,a,t){var n={x:Number.NaN,y:Number.NaN};if(isNaN(r.x))return n;var i={x:r.x,y:r.y};i.x-=t.ll[0],i.y-=t.ll[1],i.x=adjust_lon(i.x-Math.PI)+Math.PI;var N=nad_intr(i,t);return a?inverseNadCvt(N,n,i,t):(isNaN(N.x)||(n.x=r.x-N.x,n.y=r.y+N.y),n)};