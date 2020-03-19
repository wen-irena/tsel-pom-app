import proj from"./Proj";import transform from"./transform";var wgs84=proj("WGS84");function transformer(r,o,n){var t;return Array.isArray(n)?(t=transform(r,o,n),3===n.length?[t.x,t.y,t.z]:[t.x,t.y]):transform(r,o,n)}function checkProj(r){return r instanceof proj?r:r.oProj?r.oProj:proj(r)}function proj4(r,o,n){r=checkProj(r);var t,a=!1;return void 0===o?(o=r,r=wgs84,a=!0):(void 0!==o.x||Array.isArray(o))&&(n=o,o=r,r=wgs84,a=!0),o=checkProj(o),n?transformer(r,o,n):(t={forward:function(n){return transformer(r,o,n)},inverse:function(n){return transformer(o,r,n)}},a&&(t.oProj=o),t)}export default proj4;