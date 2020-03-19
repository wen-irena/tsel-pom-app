import defs from"./defs";import wkt from"wkt-parser";import projStr from"./projString";function testObj(t){return"string"==typeof t}function testDef(t){return t in defs}var codeWords=["PROJECTEDCRS","PROJCRS","GEOGCS","GEOCCS","PROJCS","LOCAL_CS","GEODCRS","GEODETICCRS","GEODETICDATUM","ENGCRS","ENGINEERINGCRS"];function testWKT(t){return codeWords.some(function(r){return t.indexOf(r)>-1})}function testProj(t){return"+"===t[0]}function parse(t){return testObj(t)?testDef(t)?defs[t]:testWKT(t)?wkt(t):testProj(t)?projStr(t):void 0:t}export default parse;