(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b,c){"use strict"
function generateAccessor(b0,b1,b2){var g=b0.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var a0
if(g.length>1)a0=true
else a0=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a1=d&3
var a2=d>>2
var a3=f=f.substring(0,e-1)
var a4=f.indexOf(":")
if(a4>0){a3=f.substring(0,a4)
f=f.substring(a4+1)}if(a1){var a5=a1&2?"r":""
var a6=a1&1?"this":"r"
var a7="return "+a6+"."+f
var a8=b2+".prototype.g"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}if(a2){var a5=a2&2?"r,v":"v"
var a6=a2&1?"this":"r"
var a7=a6+"."+f+"=v"
var a8=b2+".prototype.s"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}}return f}function defineClass(a4,a5){var g=[]
var f="function "+a4+"("
var e="",d=""
for(var a0=0;a0<a5.length;a0++){var a1=a5[a0]
if(a1.charCodeAt(0)==48){a1=a1.substring(1)
var a2=generateAccessor(a1,g,a4)
d+="this."+a2+" = null;\n"}else{var a2=generateAccessor(a1,g,a4)
var a3="p_"+a2
f+=e
e=", "
f+=a3
d+="this."+a2+" = "+a3+";\n"}}if(supportsDirectProtoAccess)d+="this."+"$deferredAction"+"();"
f+=") {\n"+d+"}\n"
f+=a4+".builtin$cls=\""+a4+"\";\n"
f+="$desc=$collectedClasses."+a4+"[1];\n"
f+=a4+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a4+".name=\""+a4+"\";\n"
f+=g.join("")
return f}var z=supportsDirectProtoAccess?function(d,e){var g=d.prototype
g.__proto__=e.prototype
g.constructor=d
g["$is"+d.name]=d
return convertToFastObject(g)}:function(){function tmp(){}return function(a1,a2){tmp.prototype=a2.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a1.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var a0=e[d]
g[a0]=f[a0]}g["$is"+a1.name]=a1
g.constructor=a1
a1.prototype=g
return g}}()
function finishClasses(a5){var g=init.allClasses
a5.combinedConstructorFunction+="return [\n"+a5.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a5.combinedConstructorFunction)(a5.collected)
a5.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.name
var a1=a5.collected[a0]
var a2=a1[0]
a1=a1[1]
g[a0]=d
a2[a0]=d}f=null
var a3=init.finishedClasses
function finishClass(c2){if(a3[c2])return
a3[c2]=true
var a6=a5.pending[c2]
if(a6&&a6.indexOf("+")>0){var a7=a6.split("+")
a6=a7[0]
var a8=a7[1]
finishClass(a8)
var a9=g[a8]
var b0=a9.prototype
var b1=g[c2].prototype
var b2=Object.keys(b0)
for(var b3=0;b3<b2.length;b3++){var b4=b2[b3]
if(!u.call(b1,b4))b1[b4]=b0[b4]}}if(!a6||typeof a6!="string"){var b5=g[c2]
var b6=b5.prototype
b6.constructor=b5
b6.$isa=b5
b6.$deferredAction=function(){}
return}finishClass(a6)
var b7=g[a6]
if(!b7)b7=existingIsolateProperties[a6]
var b5=g[c2]
var b6=z(b5,b7)
if(b0)b6.$deferredAction=mixinDeferredActionHelper(b0,b6)
if(Object.prototype.hasOwnProperty.call(b6,"%")){var b8=b6["%"].split(";")
if(b8[0]){var b9=b8[0].split("|")
for(var b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=true}}if(b8[1]){b9=b8[1].split("|")
if(b8[2]){var c0=b8[2].split("|")
for(var b3=0;b3<c0.length;b3++){var c1=g[c0[b3]]
c1.$nativeSuperclassTag=b9[0]}}for(b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=false}}b6.$deferredAction()}if(b6.$isq)b6.$deferredAction()}var a4=Object.keys(a5.pending)
for(var e=0;e<a4.length;e++)finishClass(a4[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.charCodeAt(0)
var a1
if(d!=="^"&&d!=="$reflectable"&&a0!==43&&a0!==42&&(a1=g[d])!=null&&a1.constructor===Array&&d!=="<>")addStubs(g,a1,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(d,e){var g
if(e.hasOwnProperty("$deferredAction"))g=e.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}d.$deferredAction()
f.$deferredAction()}}function processClassData(b2,b3,b4){b3=convertToSlowObject(b3)
var g
var f=Object.keys(b3)
var e=false
var d=supportsDirectProtoAccess&&b2!="a"
for(var a0=0;a0<f.length;a0++){var a1=f[a0]
var a2=a1.charCodeAt(0)
if(a1==="j"){processStatics(init.statics[b2]=b3.j,b4)
delete b3.j}else if(a2===43){w[g]=a1.substring(1)
var a3=b3[a1]
if(a3>0)b3[g].$reflectable=a3}else if(a2===42){b3[g].$D=b3[a1]
var a4=b3.$methodsWithOptionalArguments
if(!a4)b3.$methodsWithOptionalArguments=a4={}
a4[a1]=g}else{var a5=b3[a1]
if(a1!=="^"&&a5!=null&&a5.constructor===Array&&a1!=="<>")if(d)e=true
else addStubs(b3,a5,a1,false,[])
else g=a1}}if(e)b3.$deferredAction=finishAddStubsHelper
var a6=b3["^"],a7,a8,a9=a6
var b0=a9.split(";")
a9=b0[1]?b0[1].split(","):[]
a8=b0[0]
a7=a8.split(":")
if(a7.length==2){a8=a7[0]
var b1=a7[1]
if(b1)b3.$S=function(b5){return function(){return init.types[b5]}}(b1)}if(a8)b4.pending[b2]=a8
b4.combinedConstructorFunction+=defineClass(b2,a9)
b4.constructorsList.push(b2)
b4.collected[b2]=[m,b3]
i.push(b2)}function processStatics(a4,a5){var g=Object.keys(a4)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a4[e]
var a0=e.charCodeAt(0)
var a1
if(a0===43){v[a1]=e.substring(1)
var a2=a4[e]
if(a2>0)a4[a1].$reflectable=a2
if(d&&d.length)init.typeInformation[a1]=d}else if(a0===42){m[a1].$D=d
var a3=a4.$methodsWithOptionalArguments
if(!a3)a4.$methodsWithOptionalArguments=a3={}
a3[e]=a1}else if(typeof d==="function"){m[a1=e]=d
h.push(e)}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a1=e
processClassData(e,d,a5)}}}function addStubs(b6,b7,b8,b9,c0){var g=0,f=g,e=b7[g],d
if(typeof e=="string")d=b7[++g]
else{d=e
e=b8}if(typeof d=="number"){f=d
d=b7[++g]}b6[b8]=b6[e]=d
var a0=[d]
d.$stubName=b8
c0.push(b8)
for(g++;g<b7.length;g++){d=b7[g]
if(typeof d!="function")break
if(!b9)d.$stubName=b7[++g]
a0.push(d)
if(d.$stubName){b6[d.$stubName]=d
c0.push(d.$stubName)}}for(var a1=0;a1<a0.length;g++,a1++)a0[a1].$callName=b7[g]
var a2=b7[g]
b7=b7.slice(++g)
var a3=b7[0]
var a4=(a3&1)===1
a3=a3>>1
var a5=a3>>1
var a6=(a3&1)===1
var a7=a3===3
var a8=a3===1
var a9=b7[1]
var b0=a9>>1
var b1=(a9&1)===1
var b2=a5+b0
var b3=b7[2]
if(typeof b3=="number")b7[2]=b3+c
if(b>0){var b4=3
for(var a1=0;a1<b0;a1++){if(typeof b7[b4]=="number")b7[b4]=b7[b4]+b
b4++}for(var a1=0;a1<b2;a1++){b7[b4]=b7[b4]+b
b4++}}var b5=2*b0+a5+3
if(a2){d=tearOff(a0,f,b7,b9,b8,a4)
b6[b8].$getter=d
d.$getterStub=true
if(b9)c0.push(a2)
b6[a2]=d
a0.push(d)
d.$stubName=a2
d.$callName=null}}function tearOffGetter(d,e,f,g,a0){return a0?new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"(receiver) {"+"if (c === null) c = "+"H.cV"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, true, name);"+"return new c(this, funcs[0], receiver, name);"+"}")(d,e,f,g,H,null):new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"() {"+"if (c === null) c = "+"H.cV"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, false, name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,g,H,null)}function tearOff(d,e,f,a0,a1,a2){var g=null
return a0?function(){if(g===null)g=H.cV(this,d,e,f,true,false,a1).prototype
return g}:tearOffGetter(d,e,f,a1,a2)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.cY=function(){}
var dart=[["","",,H,{"^":"",ky:{"^":"a;a"}}],["","",,J,{"^":"",
d2:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
c4:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.d_==null){H.jP()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.d(P.ee("Return interceptor for "+H.f(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$cl()]
if(v!=null)return v
v=H.jT(a)
if(v!=null)return v
if(typeof a=="function")return C.a6
y=Object.getPrototypeOf(a)
if(y==null)return C.H
if(y===Object.prototype)return C.H
if(typeof w=="function"){Object.defineProperty(w,$.$get$cl(),{value:C.y,enumerable:false,writable:true,configurable:true})
return C.y}return C.y},
q:{"^":"a;",
J:function(a,b){return a===b},
gv:function(a){return H.ax(a)},
h:["dT",function(a){return"Instance of '"+H.aU(a)+"'"}],
"%":"CanvasGradient|CanvasPattern|DOMError|MediaError|Navigator|NavigatorConcurrentHardware|NavigatorUserMediaError|OverconstrainedError|PositionError|SQLError|TextMetrics|WebGL2RenderingContext|WebGLActiveInfo|WebGLRenderbuffer"},
fZ:{"^":"q;",
h:function(a){return String(a)},
gv:function(a){return a?519018:218159},
$isad:1},
dz:{"^":"q;",
J:function(a,b){return null==b},
h:function(a){return"null"},
gv:function(a){return 0},
$isp:1},
cm:{"^":"q;",
gv:function(a){return 0},
h:["dU",function(a){return String(a)}]},
ht:{"^":"cm;"},
bR:{"^":"cm;"},
b6:{"^":"cm;",
h:function(a){var z=a[$.$get$dh()]
if(z==null)return this.dU(a)
return"JavaScript function for "+H.f(J.bo(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}},
$iscg:1},
av:{"^":"q;$ti",
k:function(a,b){H.h(b,H.c(a,0))
if(!!a.fixed$length)H.M(P.Q("add"))
a.push(b)},
bW:function(a,b){if(!!a.fixed$length)H.M(P.Q("removeAt"))
if(b<0||b>=a.length)throw H.d(P.bb(b,null,null))
return a.splice(b,1)[0]},
bd:function(a,b){var z
if(!!a.fixed$length)H.M(P.Q("remove"))
for(z=0;z<a.length;++z)if(J.bn(a[z],b)){a.splice(z,1)
return!0}return!1},
ac:function(a,b){var z,y
H.e(b,{func:1,ret:-1,args:[H.c(a,0)]})
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.d(P.at(a))}},
fJ:function(a,b,c,d){var z,y,x
H.h(b,d)
H.e(c,{func:1,ret:d,args:[d,H.c(a,0)]})
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.d(P.at(a))}return y},
a_:function(a,b){if(b<0||b>=a.length)return H.b(a,b)
return a[b]},
dR:function(a,b,c){var z=a.length
if(b>z)throw H.d(P.W(b,0,a.length,"start",null))
if(c==null)c=a.length
else if(c<b||c>a.length)throw H.d(P.W(c,b,a.length,"end",null))
if(b===c)return H.k([],[H.c(a,0)])
return H.k(a.slice(b,c),[H.c(a,0)])},
fP:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.bn(a[z],b))return z
return-1},
fO:function(a,b){return this.fP(a,b,0)},
bE:function(a,b){var z
for(z=0;z<a.length;++z)if(J.bn(a[z],b))return!0
return!1},
h:function(a){return P.dw(a,"[","]")},
gD:function(a){return new J.fh(a,a.length,0,[H.c(a,0)])},
gv:function(a){return H.ax(a)},
gm:function(a){return a.length},
sm:function(a,b){if(!!a.fixed$length)H.M(P.Q("set length"))
if(b<0)throw H.d(P.W(b,0,null,"newLength",null))
a.length=b},
w:function(a,b,c){H.h(c,H.c(a,0))
if(!!a.immutable$list)H.M(P.Q("indexed set"))
if(b>=a.length||b<0)throw H.d(H.b0(a,b))
a[b]=c},
$isn:1,
$isu:1,
j:{
fY:function(a,b){return J.cj(H.k(a,[b]))},
cj:function(a){H.bk(a)
a.fixed$length=Array
return a}}},
kx:{"^":"av;$ti"},
fh:{"^":"a;a,b,c,0d,$ti",
scf:function(a){this.d=H.h(a,H.c(this,0))},
gt:function(){return this.d},
p:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.d(H.an(z))
x=this.c
if(x>=y){this.scf(null)
return!1}this.scf(z[x]);++this.c
return!0},
$isa_:1},
bB:{"^":"q;",
au:function(a){var z,y
if(a>=0){if(a<=2147483647){z=a|0
return a===z?z:z+1}}else if(a>=-2147483648)return a|0
y=Math.ceil(a)
if(isFinite(y))return y
throw H.d(P.Q(""+a+".ceil()"))},
fI:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.d(P.Q(""+a+".floor()"))},
B:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.d(P.Q(""+a+".round()"))},
ad:function(a,b){var z,y
if(b<0||b>20)throw H.d(P.W(b,0,20,"fractionDigits",null))
z=a.toFixed(b)
if(a===0)y=1/a<0
else y=!1
if(y)return"-"+z
return z},
h:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gv:function(a){return a&0x1FFFFFFF},
c7:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
dW:function(a,b){if(typeof b!=="number")throw H.d(H.ac(b))
if((a|0)===a)if(b>=1||!1)return a/b|0
return this.cG(a,b)},
cF:function(a,b){return(a|0)===a?a/b|0:this.cG(a,b)},
cG:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.d(P.Q("Result of truncating division is "+H.f(z)+": "+H.f(a)+" ~/ "+b))},
cE:function(a,b){var z
if(a>0)z=this.eY(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
eY:function(a,b){return b>31?0:a>>>b},
c6:function(a,b){if(typeof b!=="number")throw H.d(H.ac(b))
return a<b},
$isaF:1,
$ism:1},
dy:{"^":"bB;",$isw:1},
dx:{"^":"bB;"},
bC:{"^":"q;",
d_:function(a,b){if(b<0)throw H.d(H.b0(a,b))
if(b>=a.length)H.M(H.b0(a,b))
return a.charCodeAt(b)},
aI:function(a,b){if(b>=a.length)throw H.d(H.b0(a,b))
return a.charCodeAt(b)},
bD:function(a,b,c){if(c>b.length)throw H.d(P.W(c,0,b.length,null,null))
return new H.j9(b,a,c)},
cO:function(a,b){return this.bD(a,b,0)},
W:function(a,b){H.t(b)
if(typeof b!=="string")throw H.d(P.d8(b,null,null))
return a+b},
dN:function(a,b){if(typeof b==="string")return H.k(a.split(b),[P.x])
else if(b instanceof H.dB&&b.gey().exec("").length-2===0)return H.k(a.split(b.b),[P.x])
else return this.eg(a,b)},
eg:function(a,b){var z,y,x,w,v,u,t
z=H.k([],[P.x])
for(y=J.f8(b,a),y=y.gD(y),x=0,w=1;y.p();){v=y.gt()
u=v.gcb(v)
t=v.gb0()
w=t-u
if(w===0&&x===u)continue
C.b.k(z,this.Y(a,x,u))
x=t}if(x<a.length||w>0)C.b.k(z,this.aq(a,x))
return z},
Y:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.d(P.bb(b,null,null))
if(b>c)throw H.d(P.bb(b,null,null))
if(c>a.length)throw H.d(P.bb(c,null,null))
return a.substring(b,c)},
aq:function(a,b){return this.Y(a,b,null)},
ha:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.aI(z,0)===133){x=J.h_(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.d_(z,w)===133?J.h0(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
bj:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.d(C.W)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
fY:function(a,b,c){var z=b-a.length
if(z<=0)return a
return this.bj(c,z)+a},
bb:function(a,b){return this.fY(a,b," ")},
aX:function(a,b,c){if(c>a.length)throw H.d(P.W(c,0,a.length,null,null))
return H.k_(a,b,c)},
h:function(a){return a},
gv:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gm:function(a){return a.length},
$isdN:1,
$isx:1,
j:{
dA:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
h_:function(a,b){var z,y
for(z=a.length;b<z;){y=C.f.aI(a,b)
if(y!==32&&y!==13&&!J.dA(y))break;++b}return b},
h0:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.f.d_(a,z)
if(y!==32&&y!==13&&!J.dA(y))break}return b}}}}],["","",,H,{"^":"",
fX:function(){return new P.bP("Too few elements")},
dn:{"^":"n;"},
ba:{"^":"dn;$ti",
gD:function(a){return new H.co(this,this.gm(this),0,[H.cZ(this,"ba",0)])}},
i8:{"^":"ba;a,b,c,$ti",
gei:function(){var z=J.aq(this.a)
return z},
geZ:function(){var z,y
z=J.aq(this.a)
y=this.b
if(y>z)return z
return y},
gm:function(a){var z,y
z=J.aq(this.a)
y=this.b
if(y>=z)return 0
return z-y},
a_:function(a,b){var z,y
z=this.geZ()+b
if(b>=0){y=this.gei()
if(typeof y!=="number")return H.J(y)
y=z>=y}else y=!0
if(y)throw H.d(P.bA(b,this,"index",null,null))
return J.d6(this.a,z)},
h7:function(a,b){var z,y,x,w,v,u,t,s
z=this.b
y=this.a
x=J.c3(y)
w=x.gm(y)
v=w-z
if(v<0)v=0
u=new Array(v)
u.fixed$length=Array
t=H.k(u,this.$ti)
for(s=0;s<v;++s){C.b.w(t,s,x.a_(y,z+s))
if(x.gm(y)<w)throw H.d(P.at(this))}return t},
j:{
i9:function(a,b,c,d){return new H.i8(a,b,c,[d])}}},
co:{"^":"a;a,b,c,0d,$ti",
sar:function(a){this.d=H.h(a,H.c(this,0))},
gt:function(){return this.d},
p:function(){var z,y,x,w
z=this.a
y=J.c3(z)
x=y.gm(z)
if(this.b!==x)throw H.d(P.at(z))
w=this.c
if(w>=x){this.sar(null)
return!1}this.sar(y.a_(z,w));++this.c
return!0},
$isa_:1},
hc:{"^":"n;a,b,$ti",
gD:function(a){var z=this.a
return new H.he(z.gD(z),this.b,this.$ti)},
gm:function(a){return this.a.a.a},
$asn:function(a,b){return[b]},
j:{
hd:function(a,b,c,d){H.l(a,"$isn",[c],"$asn")
H.e(b,{func:1,ret:d,args:[c]})
return new H.fF(a,b,[c,d])}}},
fF:{"^":"hc;a,b,$ti"},
he:{"^":"a_;0a,b,c,$ti",
sar:function(a){this.a=H.h(a,H.c(this,1))},
p:function(){var z=this.b
if(z.p()){this.sar(this.c.$1(z.d))
return!0}this.sar(null)
return!1},
gt:function(){return this.a},
$asa_:function(a,b){return[b]}},
hf:{"^":"ba;a,b,$ti",
gm:function(a){return J.aq(this.a)},
a_:function(a,b){return this.b.$1(J.d6(this.a,b))},
$asba:function(a,b){return[b]},
$asn:function(a,b){return[b]}},
ef:{"^":"n;a,b,$ti",
gD:function(a){return new H.ij(J.d7(this.a),this.b,this.$ti)}},
ij:{"^":"a_;a,b,$ti",
p:function(){var z,y
for(z=this.a,y=this.b;z.p();)if(y.$1(z.gt()))return!0
return!1},
gt:function(){return this.a.gt()}},
by:{"^":"a;$ti"}}],["","",,H,{"^":"",
ao:function(a){var z,y
z=H.t(init.mangledGlobalNames[a])
if(typeof z==="string")return z
y="minified:"+a
return y},
jK:function(a){return init.types[H.G(a)]},
l0:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.r(a).$isb7},
f:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.bo(a)
if(typeof z!=="string")throw H.d(H.ac(a))
return z},
ax:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
hx:function(a){var z,y
if(typeof a!=="string")H.M(H.ac(a))
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return
z=parseFloat(a)
if(isNaN(z)){y=J.fc(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return}return z},
aU:function(a){return H.hu(a)+H.c_(H.al(a),0,null)},
hu:function(a){var z,y,x,w,v,u,t,s,r
z=J.r(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
v=w==null
if(v||z===C.Z||!!z.$isbR){u=C.D(a)
if(v)w=u
if(u==="Object"){t=a.constructor
if(typeof t=="function"){s=String(t).match(/^\s*function\s*([\w$]*)\s*\(/)
r=s==null?null:s[1]
if(typeof r==="string"&&/^\w+$/.test(r))w=r}}return w}w=w
return H.ao(w.length>1&&C.f.aI(w,0)===36?C.f.aq(w,1):w)},
kB:[function(){return Date.now()},"$0","jr",0,0,41],
hv:function(){var z,y
if($.bG!=null)return
$.bG=1000
$.bH=H.jr()
if(typeof window=="undefined")return
z=window
if(z==null)return
y=z.performance
if(y==null)return
if(typeof y.now!="function")return
$.bG=1e6
$.bH=new H.hw(y)},
dO:function(a){var z,y,x,w,v
z=a.length
if(z<=500)return String.fromCharCode.apply(null,a)
for(y="",x=0;x<z;x=w){w=x+500
v=w<z?w:z
y+=String.fromCharCode.apply(null,a.slice(x,v))}return y},
hz:function(a){var z,y,x,w
z=H.k([],[P.w])
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.an)(a),++x){w=a[x]
if(typeof w!=="number"||Math.floor(w)!==w)throw H.d(H.ac(w))
if(w<=65535)C.b.k(z,w)
else if(w<=1114111){C.b.k(z,55296+(C.i.cE(w-65536,10)&1023))
C.b.k(z,56320+(w&1023))}else throw H.d(H.ac(w))}return H.dO(z)},
hy:function(a){var z,y,x
for(z=a.length,y=0;y<z;++y){x=a[y]
if(typeof x!=="number"||Math.floor(x)!==x)throw H.d(H.ac(x))
if(x<0)throw H.d(H.ac(x))
if(x>65535)return H.hz(a)}return H.dO(a)},
J:function(a){throw H.d(H.ac(a))},
b:function(a,b){if(a==null)J.aq(a)
throw H.d(H.b0(a,b))},
b0:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ar(!0,b,"index",null)
z=H.G(J.aq(a))
if(!(b<0)){if(typeof z!=="number")return H.J(z)
y=b>=z}else y=!0
if(y)return P.bA(b,a,"index",null,z)
return P.bb(b,"index",null)},
ac:function(a){return new P.ar(!0,a,null,null)},
d:function(a){var z
if(a==null)a=new P.bF()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.f2})
z.name=""}else z.toString=H.f2
return z},
f2:function(){return J.bo(this.dartException)},
M:function(a){throw H.d(a)},
an:function(a){throw H.d(P.at(a))},
Z:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.k2(a)
if(a==null)return
if(a instanceof H.cf)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.i.cE(x,16)&8191)===10)switch(w){case 438:return z.$1(H.cn(H.f(y)+" (Error "+w+")",null))
case 445:case 5007:return z.$1(H.dM(H.f(y)+" (Error "+w+")",null))}}if(a instanceof TypeError){v=$.$get$e2()
u=$.$get$e3()
t=$.$get$e4()
s=$.$get$e5()
r=$.$get$e9()
q=$.$get$ea()
p=$.$get$e7()
$.$get$e6()
o=$.$get$ec()
n=$.$get$eb()
m=v.P(y)
if(m!=null)return z.$1(H.cn(H.t(y),m))
else{m=u.P(y)
if(m!=null){m.method="call"
return z.$1(H.cn(H.t(y),m))}else{m=t.P(y)
if(m==null){m=s.P(y)
if(m==null){m=r.P(y)
if(m==null){m=q.P(y)
if(m==null){m=p.P(y)
if(m==null){m=s.P(y)
if(m==null){m=o.P(y)
if(m==null){m=n.P(y)
l=m!=null}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0
if(l)return z.$1(H.dM(H.t(y),m))}}return z.$1(new H.ih(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.dY()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ar(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.dY()
return a},
am:function(a){var z
if(a instanceof H.cf)return a.b
if(a==null)return new H.eu(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.eu(a)},
jJ:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.w(0,a[y],a[x])}return b},
jR:function(a,b,c,d,e,f){H.i(a,"$iscg")
switch(H.G(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.d(new P.iH("Unsupported number of arguments for wrapped closure"))},
aE:function(a,b){var z
H.G(b)
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.jR)
a.$identity=z
return z},
fw:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=b[0]
y=z.$callName
if(!!J.r(d).$isu){z.$reflectionInfo=d
x=H.hC(z).r}else x=d
w=e?Object.create(new H.i2().constructor.prototype):Object.create(new H.ca(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function static_tear_off(){this.$initialize()}
else{u=$.a3
if(typeof u!=="number")return u.W()
$.a3=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=H.df(a,z,f)
t.$reflectionInfo=d}else{w.$static_name=g
t=z}if(typeof x=="number")s=function(h,i){return function(){return h(i)}}(H.jK,x)
else if(typeof x=="function")if(e)s=x
else{r=f?H.db:H.cb
s=function(h,i){return function(){return h.apply({$receiver:i(this)},arguments)}}(x,r)}else throw H.d("Error in reflectionInfo.")
w.$S=s
w[y]=t
for(q=t,p=1;p<b.length;++p){o=b[p]
n=o.$callName
if(n!=null){o=e?o:H.df(a,o,f)
w[n]=o}if(p===c){o.$reflectionInfo=d
q=o}}w["call*"]=q
w.$R=z.$R
w.$D=z.$D
return v},
ft:function(a,b,c,d){var z=H.cb
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
df:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.fv(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ft(y,!w,z,b)
if(y===0){w=$.a3
if(typeof w!=="number")return w.W()
$.a3=w+1
u="self"+w
w="return function(){var "+u+" = this."
v=$.aM
if(v==null){v=H.bq("self")
$.aM=v}return new Function(w+H.f(v)+";return "+u+"."+H.f(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.a3
if(typeof w!=="number")return w.W()
$.a3=w+1
t+=w
w="return function("+t+"){return this."
v=$.aM
if(v==null){v=H.bq("self")
$.aM=v}return new Function(w+H.f(v)+"."+H.f(z)+"("+t+");}")()},
fu:function(a,b,c,d){var z,y
z=H.cb
y=H.db
switch(b?-1:a){case 0:throw H.d(H.hT("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fv:function(a,b){var z,y,x,w,v,u,t,s
z=$.aM
if(z==null){z=H.bq("self")
$.aM=z}y=$.da
if(y==null){y=H.bq("receiver")
$.da=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fu(w,!u,x,b)
if(w===1){z="return function(){return this."+H.f(z)+"."+H.f(x)+"(this."+H.f(y)+");"
y=$.a3
if(typeof y!=="number")return y.W()
$.a3=y+1
return new Function(z+y+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.f(z)+"."+H.f(x)+"(this."+H.f(y)+", "+s+");"
y=$.a3
if(typeof y!=="number")return y.W()
$.a3=y+1
return new Function(z+y+"}")()},
cV:function(a,b,c,d,e,f,g){return H.fw(a,b,H.G(c),d,!!e,!!f,g)},
t:function(a){if(a==null)return a
if(typeof a==="string")return a
throw H.d(H.a1(a,"String"))},
jG:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.d(H.a1(a,"double"))},
c7:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.d(H.a1(a,"num"))},
kX:function(a){if(a==null)return a
if(typeof a==="boolean")return a
throw H.d(H.a1(a,"bool"))},
G:function(a){if(a==null)return a
if(typeof a==="number"&&Math.floor(a)===a)return a
throw H.d(H.a1(a,"int"))},
d3:function(a,b){throw H.d(H.a1(a,H.ao(H.t(b).substring(3))))},
jZ:function(a,b){throw H.d(H.de(a,H.ao(H.t(b).substring(3))))},
i:function(a,b){if(a==null)return a
if((typeof a==="object"||typeof a==="function")&&J.r(a)[b])return a
H.d3(a,b)},
d0:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.r(a)[b]
else z=!0
if(z)return a
H.jZ(a,b)},
l1:function(a,b){if(a==null)return a
if(typeof a==="string")return a
if(J.r(a)[b])return a
H.d3(a,b)},
bk:function(a){if(a==null)return a
if(!!J.r(a).$isu)return a
throw H.d(H.a1(a,"List<dynamic>"))},
jS:function(a,b){var z
if(a==null)return a
z=J.r(a)
if(!!z.$isu)return a
if(z[b])return a
H.d3(a,b)},
eS:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[H.G(z)]
else return a.$S()}return},
aG:function(a,b){var z
if(a==null)return!1
if(typeof a=="function")return!0
z=H.eS(J.r(a))
if(z==null)return!1
return H.eE(z,null,b,null)},
e:function(a,b){var z,y
if(a==null)return a
if($.cQ)return a
$.cQ=!0
try{if(H.aG(a,b))return a
z=H.aJ(b)
y=H.a1(a,z)
throw H.d(y)}finally{$.cQ=!1}},
aH:function(a,b){if(a!=null&&!H.cU(a,b))H.M(H.a1(a,H.aJ(b)))
return a},
eJ:function(a){var z,y
z=J.r(a)
if(!!z.$isj){y=H.eS(z)
if(y!=null)return H.aJ(y)
return"Closure"}return H.aU(a)},
k0:function(a){throw H.d(new P.fA(H.t(a)))},
eW:function(a){return init.getIsolateTag(a)},
k:function(a,b){a.$ti=b
return a},
al:function(a){if(a==null)return
return a.$ti},
l_:function(a,b,c){return H.aK(a["$as"+H.f(c)],H.al(b))},
aI:function(a,b,c,d){var z
H.t(c)
H.G(d)
z=H.aK(a["$as"+H.f(c)],H.al(b))
return z==null?null:z[d]},
cZ:function(a,b,c){var z
H.t(b)
H.G(c)
z=H.aK(a["$as"+H.f(b)],H.al(a))
return z==null?null:z[c]},
c:function(a,b){var z
H.G(b)
z=H.al(a)
return z==null?null:z[b]},
aJ:function(a){return H.ak(a,null)},
ak:function(a,b){var z,y
H.l(b,"$isu",[P.x],"$asu")
if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return H.ao(a[0].builtin$cls)+H.c_(a,1,b)
if(typeof a=="function")return H.ao(a.builtin$cls)
if(a===-2)return"dynamic"
if(typeof a==="number"){H.G(a)
if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+a
z=b.length
y=z-a-1
if(y<0||y>=z)return H.b(b,y)
return H.f(b[y])}if('func' in a)return H.jm(a,b)
if('futureOr' in a)return"FutureOr<"+H.ak("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
jm:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=[P.x]
H.l(b,"$isu",z,"$asu")
if("bounds" in a){y=a.bounds
if(b==null){b=H.k([],z)
x=null}else x=b.length
w=b.length
for(v=y.length,u=v;u>0;--u)C.b.k(b,"T"+(w+u))
for(t="<",s="",u=0;u<v;++u,s=", "){t+=s
z=b.length
r=z-u-1
if(r<0)return H.b(b,r)
t=C.f.W(t,b[r])
q=y[u]
if(q!=null&&q!==P.a)t+=" extends "+H.ak(q,b)}t+=">"}else{t=""
x=null}p=!!a.v?"void":H.ak(a.ret,b)
if("args" in a){o=a.args
for(z=o.length,n="",m="",l=0;l<z;++l,m=", "){k=o[l]
n=n+m+H.ak(k,b)}}else{n=""
m=""}if("opt" in a){j=a.opt
n+=m+"["
for(z=j.length,m="",l=0;l<z;++l,m=", "){k=j[l]
n=n+m+H.ak(k,b)}n+="]"}if("named" in a){i=a.named
n+=m+"{"
for(z=H.jI(i),r=z.length,m="",l=0;l<r;++l,m=", "){h=H.t(z[l])
n=n+m+H.ak(i[h],b)+(" "+H.f(h))}n+="}"}if(x!=null)b.length=x
return t+"("+n+") => "+p},
c_:function(a,b,c){var z,y,x,w,v,u
H.l(c,"$isu",[P.x],"$asu")
if(a==null)return""
z=new P.cA("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.ak(u,c)}return"<"+z.h(0)+">"},
aK:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
z:function(a,b,c,d){var z,y
H.t(b)
H.bk(c)
H.t(d)
if(a==null)return!1
z=H.al(a)
y=J.r(a)
if(y[b]==null)return!1
return H.eN(H.aK(y[d],z),null,c,null)},
d4:function(a,b,c,d){H.t(b)
H.bk(c)
H.t(d)
if(a==null)return a
if(H.z(a,b,c,d))return a
throw H.d(H.de(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(H.ao(b.substring(3))+H.c_(c,0,null),init.mangledGlobalNames)))},
l:function(a,b,c,d){H.t(b)
H.bk(c)
H.t(d)
if(a==null)return a
if(H.z(a,b,c,d))return a
throw H.d(H.a1(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(H.ao(b.substring(3))+H.c_(c,0,null),init.mangledGlobalNames)))},
eO:function(a,b,c,d,e){H.t(c)
H.t(d)
H.t(e)
if(!H.S(a,null,b,null))H.k1("TypeError: "+H.f(c)+H.aJ(a)+H.f(d)+H.aJ(b)+H.f(e))},
k1:function(a){throw H.d(new H.ed(H.t(a)))},
eN:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.S(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.S(a[y],b,c[y],d))return!1
return!0},
kY:function(a,b,c){return a.apply(b,H.aK(J.r(b)["$as"+H.f(c)],H.al(b)))},
eY:function(a){var z
if(typeof a==="number")return!1
if('futureOr' in a){z="type" in a?a.type:null
return a==null||a.builtin$cls==="a"||a.builtin$cls==="p"||a===-1||a===-2||H.eY(z)}return!1},
cU:function(a,b){var z,y
if(a==null)return b==null||b.builtin$cls==="a"||b.builtin$cls==="p"||b===-1||b===-2||H.eY(b)
if(b==null||b===-1||b.builtin$cls==="a"||b===-2)return!0
if(typeof b=="object"){if('futureOr' in b)if(H.cU(a,"type" in b?b.type:null))return!0
if('func' in b)return H.aG(a,b)}z=J.r(a).constructor
y=H.al(a)
if(y!=null){y=y.slice()
y.splice(0,0,z)
z=y}return H.S(z,null,b,null)},
h:function(a,b){if(a!=null&&!H.cU(a,b))throw H.d(H.a1(a,H.aJ(b)))
return a},
S:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="a"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="a"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.S(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="p")return!0
if('func' in c)return H.eE(a,b,c,d)
if('func' in a)return c.builtin$cls==="cg"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.S("type" in a?a.type:null,b,x,d)
else if(H.S(a,b,x,d))return!0
else{if(!('$is'+"F" in y.prototype))return!1
w=y.prototype["$as"+"F"]
v=H.aK(w,z?a.slice(1):null)
return H.S(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=t.builtin$cls
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.eN(H.aK(r,z),b,u,d)},
eE:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.S(a.ret,b,c.ret,d))return!1
x=a.args
w=c.args
v=a.opt
u=c.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
for(p=0;p<t;++p)if(!H.S(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.S(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.S(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.jY(m,b,l,d)},
jY:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.S(c[w],d,a[w],b))return!1}return!0},
kZ:function(a,b,c){Object.defineProperty(a,H.t(b),{value:c,enumerable:false,writable:true,configurable:true})},
jT:function(a){var z,y,x,w,v,u
z=H.t($.eX.$1(a))
y=$.c2[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.c5[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=H.t($.eM.$2(a,z))
if(z!=null){y=$.c2[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.c5[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.c6(x)
$.c2[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.c5[z]=x
return x}if(v==="-"){u=H.c6(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.f_(a,x)
if(v==="*")throw H.d(P.ee(z))
if(init.leafTags[z]===true){u=H.c6(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.f_(a,x)},
f_:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.d2(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
c6:function(a){return J.d2(a,!1,null,!!a.$isb7)},
jW:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.c6(z)
else return J.d2(z,c,null,null)},
jP:function(){if(!0===$.d_)return
$.d_=!0
H.jQ()},
jQ:function(){var z,y,x,w,v,u,t,s
$.c2=Object.create(null)
$.c5=Object.create(null)
H.jL()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.f0.$1(v)
if(u!=null){t=H.jW(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
jL:function(){var z,y,x,w,v,u,t
z=C.a3()
z=H.aD(C.a0,H.aD(C.a5,H.aD(C.C,H.aD(C.C,H.aD(C.a4,H.aD(C.a1,H.aD(C.a2(C.D),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.eX=new H.jM(v)
$.eM=new H.jN(u)
$.f0=new H.jO(t)},
aD:function(a,b){return a(b)||b},
k_:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
hB:{"^":"a;a,b,c,d,e,f,r,0x",j:{
hC:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.cj(z)
y=z[0]
x=z[1]
return new H.hB(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
hw:{"^":"j:14;a",
$0:function(){return C.d.fI(1000*this.a.now())}},
ie:{"^":"a;a,b,c,d,e,f",
P:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
j:{
a7:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.k([],[P.x])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.ie(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bQ:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
e8:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
hq:{"^":"C;a,b",
h:function(a){var z=this.b
if(z==null)return"NoSuchMethodError: "+H.f(this.a)
return"NoSuchMethodError: method not found: '"+z+"' on null"},
j:{
dM:function(a,b){return new H.hq(a,b==null?null:b.method)}}},
h2:{"^":"C;a,b,c",
h:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.f(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.f(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.f(this.a)+")"},
j:{
cn:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.h2(a,y,z?null:b.receiver)}}},
ih:{"^":"C;a",
h:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
cf:{"^":"a;a,b"},
k2:{"^":"j:6;a",
$1:function(a){if(!!J.r(a).$isC)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
eu:{"^":"a;a,0b",
h:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isA:1},
j:{"^":"a;",
h:function(a){return"Closure '"+H.aU(this).trim()+"'"},
gdA:function(){return this},
$iscg:1,
gdA:function(){return this}},
e_:{"^":"j;"},
i2:{"^":"e_;",
h:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+H.ao(z)+"'"}},
ca:{"^":"e_;a,b,c,d",
J:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.ca))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gv:function(a){var z,y
z=this.c
if(z==null)y=H.ax(this.a)
else y=typeof z!=="object"?J.ap(z):H.ax(z)
return(y^H.ax(this.b))>>>0},
h:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.f(this.d)+"' of "+("Instance of '"+H.aU(z)+"'")},
j:{
cb:function(a){return a.a},
db:function(a){return a.c},
bq:function(a){var z,y,x,w,v
z=new H.ca("self","target","receiver","name")
y=J.cj(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
ed:{"^":"C;a",
h:function(a){return this.a},
j:{
a1:function(a,b){return new H.ed("TypeError: "+H.f(P.bv(a))+": type '"+H.eJ(a)+"' is not a subtype of type '"+b+"'")}}},
fs:{"^":"C;a",
h:function(a){return this.a},
j:{
de:function(a,b){return new H.fs("CastError: "+H.f(P.bv(a))+": type '"+H.eJ(a)+"' is not a subtype of type '"+b+"'")}}},
hS:{"^":"C;a",
h:function(a){return"RuntimeError: "+H.f(this.a)},
j:{
hT:function(a){return new H.hS(a)}}},
cC:{"^":"a;a,0b,0c,0d",
gaO:function(){var z=this.b
if(z==null){z=H.aJ(this.a)
this.b=z}return z},
h:function(a){return this.gaO()},
gv:function(a){var z=this.d
if(z==null){z=C.f.gv(this.gaO())
this.d=z}return z},
J:function(a,b){if(b==null)return!1
return b instanceof H.cC&&this.gaO()===b.gaO()}},
V:{"^":"h9;a,0b,0c,0d,0e,0f,r,$ti",
gm:function(a){return this.a},
gdz:function(a){var z=H.c(this,0)
return H.hd(new H.h5(this,[z]),new H.h1(this),z,H.c(this,1))},
d2:function(a){var z,y
if(typeof a==="string"){z=this.b
if(z==null)return!1
return this.cq(z,a)}else if(typeof a==="number"&&(a&0x3ffffff)===a){y=this.c
if(y==null)return!1
return this.cq(y,a)}else return this.fQ(a)},
fQ:function(a){var z=this.d
if(z==null)return!1
return this.b7(this.aL(z,J.ap(a)&0x3ffffff),a)>=0},
C:function(a,b){var z,y,x,w
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.as(z,b)
x=y==null?null:y.b
return x}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)return
y=this.as(w,b)
x=y==null?null:y.b
return x}else return this.fR(b)},
fR:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.aL(z,J.ap(a)&0x3ffffff)
x=this.b7(y,a)
if(x<0)return
return y[x].b},
w:function(a,b,c){var z,y,x,w,v,u
H.h(b,H.c(this,0))
H.h(c,H.c(this,1))
if(typeof b==="string"){z=this.b
if(z==null){z=this.bt()
this.b=z}this.ci(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.bt()
this.c=y}this.ci(y,b,c)}else{x=this.d
if(x==null){x=this.bt()
this.d=x}w=J.ap(b)&0x3ffffff
v=this.aL(x,w)
if(v==null)this.bz(x,w,[this.bu(b,c)])
else{u=this.b7(v,b)
if(u>=0)v[u].b=c
else v.push(this.bu(b,c))}}},
dr:function(a,b){var z
H.h(a,H.c(this,0))
H.e(b,{func:1,ret:H.c(this,1)})
if(this.d2(a))return this.C(0,a)
z=b.$0()
this.w(0,a,z)
return z},
bd:function(a,b){if(typeof b==="number"&&(b&0x3ffffff)===b)return this.eS(this.c,b)
else return this.fS(b)},
fS:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.aL(z,J.ap(a)&0x3ffffff)
x=this.b7(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.cH(w)
return w.b},
cX:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.bs()}},
ac:function(a,b){var z,y
H.e(b,{func:1,ret:-1,args:[H.c(this,0),H.c(this,1)]})
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.d(P.at(this))
z=z.c}},
ci:function(a,b,c){var z
H.h(b,H.c(this,0))
H.h(c,H.c(this,1))
z=this.as(a,b)
if(z==null)this.bz(a,b,this.bu(b,c))
else z.b=c},
eS:function(a,b){var z
if(a==null)return
z=this.as(a,b)
if(z==null)return
this.cH(z)
this.ct(a,b)
return z.b},
bs:function(){this.r=this.r+1&67108863},
bu:function(a,b){var z,y
z=new H.h4(H.h(a,H.c(this,0)),H.h(b,H.c(this,1)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.bs()
return z},
cH:function(a){var z,y
z=a.d
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.bs()},
b7:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.bn(a[y].a,b))return y
return-1},
h:function(a){return P.dI(this)},
as:function(a,b){return a[b]},
aL:function(a,b){return a[b]},
bz:function(a,b,c){a[b]=c},
ct:function(a,b){delete a[b]},
cq:function(a,b){return this.as(a,b)!=null},
bt:function(){var z=Object.create(null)
this.bz(z,"<non-identifier-key>",z)
this.ct(z,"<non-identifier-key>")
return z},
$isdF:1,
j:{
dD:function(a,b){return new H.V(0,0,[a,b])}}},
h1:{"^":"j;a",
$1:function(a){var z=this.a
return z.C(0,H.h(a,H.c(z,0)))},
$S:function(){var z=this.a
return{func:1,ret:H.c(z,1),args:[H.c(z,0)]}}},
h4:{"^":"a;a,b,0c,0d"},
h5:{"^":"dn;a,$ti",
gm:function(a){return this.a.a},
gD:function(a){var z,y
z=this.a
y=new H.h6(z,z.r,this.$ti)
y.c=z.e
return y}},
h6:{"^":"a;a,b,0c,0d,$ti",
scg:function(a){this.d=H.h(a,H.c(this,0))},
gt:function(){return this.d},
p:function(){var z=this.a
if(this.b!==z.r)throw H.d(P.at(z))
else{z=this.c
if(z==null){this.scg(null)
return!1}else{this.scg(z.a)
this.c=this.c.c
return!0}}},
$isa_:1},
jM:{"^":"j:6;a",
$1:function(a){return this.a(a)}},
jN:{"^":"j:26;a",
$2:function(a,b){return this.a(a,b)}},
jO:{"^":"j:12;a",
$1:function(a){return this.a(H.t(a))}},
dB:{"^":"a;a,b,0c,0d",
h:function(a){return"RegExp/"+this.a+"/"},
gez:function(){var z=this.c
if(z!=null)return z
z=this.b
z=H.ck(this.a,z.multiline,!z.ignoreCase,!0)
this.c=z
return z},
gey:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.ck(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
fH:function(a){var z=this.b.exec(a)
if(z==null)return
return new H.ep(this,z)},
bD:function(a,b,c){if(c>b.length)throw H.d(P.W(c,0,b.length,null,null))
return new H.il(this,b,c)},
cO:function(a,b){return this.bD(a,b,0)},
el:function(a,b){var z,y
z=this.gez()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
return new H.ep(this,y)},
$isdN:1,
j:{
ck:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.d(P.dq("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
ep:{"^":"a;a,b",
gcb:function(a){return this.b.index},
gb0:function(){var z=this.b
return z.index+z[0].length},
$isaS:1},
il:{"^":"fV;a,b,c",
gD:function(a){return new H.im(this.a,this.b,this.c)},
$asn:function(){return[P.aS]}},
im:{"^":"a;a,b,c,0d",
gt:function(){return this.d},
p:function(){var z,y,x,w
z=this.b
if(z==null)return!1
y=this.c
if(y<=z.length){x=this.a.el(z,y)
if(x!=null){this.d=x
w=x.gb0()
this.c=x.b.index===w?w+1:w
return!0}}this.d=null
this.b=null
return!1},
$isa_:1,
$asa_:function(){return[P.aS]}},
i6:{"^":"a;cb:a>,b,c",
gb0:function(){return this.a+this.c.length},
$isaS:1},
j9:{"^":"n;a,b,c",
gD:function(a){return new H.ja(this.a,this.b,this.c)},
$asn:function(){return[P.aS]}},
ja:{"^":"a;a,b,c,0d",
p:function(){var z,y,x,w,v,u,t
z=this.c
y=this.b
x=y.length
w=this.a
v=w.length
if(z+x>v){this.d=null
return!1}u=w.indexOf(y,z)
if(u<0){this.c=v+1
this.d=null
return!1}t=u+x
this.d=new H.i6(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gt:function(){return this.d},
$isa_:1,
$asa_:function(){return[P.aS]}}}],["","",,H,{"^":"",
jI:function(a){return J.fY(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
bm:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
bZ:function(a,b,c){},
hm:function(a,b,c){var z
H.bZ(a,b,c)
z=new Float32Array(a,b,c)
return z},
ho:function(a,b,c){var z
H.bZ(a,b,c)
z=new Int16Array(a,b,c)
return z},
bY:function(a,b,c){if(a>>>0!==a||a>=c)throw H.d(H.b0(b,a))},
hk:{"^":"q;",$ishk:1,$isk6:1,"%":"ArrayBuffer"},
hp:{"^":"q;",
eu:function(a,b,c,d){var z=P.W(b,0,c,d,null)
throw H.d(z)},
co:function(a,b,c,d){if(b>>>0!==b||b>c)this.eu(a,b,c,d)},
$iskL:1,
"%":";ArrayBufferView;cq|eq|er|cr|es|et|cs"},
cq:{"^":"hp;",
gm:function(a){return a.length},
cD:function(a,b,c,d,e){var z,y,x
z=a.length
this.co(a,b,z,"start")
this.co(a,c,z,"end")
if(b>c)throw H.d(P.W(b,0,c,null,null))
y=c-b
x=d.length
if(x-e<y)throw H.d(P.a6("Not enough elements"))
if(e!==0||x!==y)d=d.subarray(e,e+y)
a.set(d,b)},
$isb7:1,
$asb7:I.cY},
cr:{"^":"er;",
C:function(a,b){H.bY(b,a,a.length)
return a[b]},
w:function(a,b,c){H.jG(c)
H.bY(b,a,a.length)
a[b]=c},
a7:function(a,b,c,d,e){H.l(d,"$isn",[P.aF],"$asn")
if(!!J.r(d).$iscr){this.cD(a,b,c,d,e)
return}this.cd(a,b,c,d,e)},
ae:function(a,b,c,d){return this.a7(a,b,c,d,0)},
$asby:function(){return[P.aF]},
$asa4:function(){return[P.aF]},
$isn:1,
$asn:function(){return[P.aF]},
$isu:1,
$asu:function(){return[P.aF]}},
cs:{"^":"et;",
w:function(a,b,c){H.G(c)
H.bY(b,a,a.length)
a[b]=c},
a7:function(a,b,c,d,e){H.l(d,"$isn",[P.w],"$asn")
if(!!J.r(d).$iscs){this.cD(a,b,c,d,e)
return}this.cd(a,b,c,d,e)},
ae:function(a,b,c,d){return this.a7(a,b,c,d,0)},
$asby:function(){return[P.w]},
$asa4:function(){return[P.w]},
$isn:1,
$asn:function(){return[P.w]},
$isu:1,
$asu:function(){return[P.w]}},
hl:{"^":"cr;",$isks:1,"%":"Float32Array"},
hn:{"^":"cs;",
C:function(a,b){H.bY(b,a,a.length)
return a[b]},
$iskw:1,
"%":"Int16Array"},
eq:{"^":"cq+a4;"},
er:{"^":"eq+by;"},
es:{"^":"cq+a4;"},
et:{"^":"es+by;"}}],["","",,P,{"^":"",
ir:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.jA()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aE(new P.it(z),1)).observe(y,{childList:true})
return new P.is(z,y,x)}else if(self.setImmediate!=null)return P.jB()
return P.jC()},
kP:[function(a){self.scheduleImmediate(H.aE(new P.iu(H.e(a,{func:1,ret:-1})),0))},"$1","jA",4,0,4],
kQ:[function(a){self.setImmediate(H.aE(new P.iv(H.e(a,{func:1,ret:-1})),0))},"$1","jB",4,0,4],
kR:[function(a){H.e(a,{func:1,ret:-1})
P.jd(0,a)},"$1","jC",4,0,4],
eF:function(a){return new P.eh(new P.jb(new P.I(0,$.o,[a]),[a]),!1,[a])},
ez:function(a,b){H.e(a,{func:1,ret:-1,args:[P.w,,]})
H.i(b,"$iseh")
a.$2(0,null)
b.b=!0
return b.a.a},
ew:function(a,b){P.ji(a,H.e(b,{func:1,ret:-1,args:[P.w,,]}))},
ey:function(a,b){H.i(b,"$iscc").a8(0,a)},
ex:function(a,b){H.i(b,"$iscc").aw(H.Z(a),H.am(a))},
ji:function(a,b){var z,y,x,w,v
H.e(b,{func:1,ret:-1,args:[P.w,,]})
z=new P.jj(b)
y=new P.jk(b)
x=J.r(a)
if(!!x.$isI)a.bA(H.e(z,{func:1,ret:{futureOr:1},args:[,]}),y,null)
else{w={func:1,ret:{futureOr:1},args:[,]}
if(!!x.$isF)a.aH(H.e(z,w),y,null)
else{v=new P.I(0,$.o,[null])
H.h(a,null)
v.a=4
v.c=a
v.bA(H.e(z,w),null,null)}}},
eK:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
return $.o.bV(new P.jz(z),P.p,P.w,null)},
fL:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
H.l(a,"$isn",[[P.F,d]],"$asn")
s=[[P.u,d]]
y=new P.I(0,$.o,s)
z.a=null
z.b=0
z.c=null
z.d=null
x=new P.fN(z,b,!1,y)
try{for(r=a,q=J.r(r),r=new H.co(r,q.gm(r),0,[H.aI(q,r,"ba",0)]);r.p();){w=r.d
v=z.b
w.aH(new P.fM(z,v,y,b,!1,d),x,null);++z.b}r=z.b
if(r===0){r=new P.I(0,$.o,s)
r.ck(C.ab)
return r}r=new Array(r)
r.fixed$length=Array
z.a=H.k(r,[d])}catch(p){u=H.Z(p)
t=H.am(p)
if(z.b===0||!1){o=u
if(o==null)o=new P.bF()
r=$.o
if(r!==C.h)r.toString
s=new P.I(0,r,s)
s.cl(o,t)
return s}else{z.c=u
z.d=t}}return y},
ju:function(a,b){if(H.aG(a,{func:1,args:[P.a,P.A]}))return b.bV(a,null,P.a,P.A)
if(H.aG(a,{func:1,args:[P.a]}))return H.e(a,{func:1,ret:null,args:[P.a]})
throw H.d(P.d8(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
js:function(){var z,y
for(;z=$.aC,z!=null;){$.aZ=null
y=z.b
$.aC=y
if(y==null)$.aY=null
z.a.$0()}},
kW:[function(){$.cR=!0
try{P.js()}finally{$.aZ=null
$.cR=!1
if($.aC!=null)$.$get$cF().$1(P.eQ())}},"$0","eQ",0,0,1],
eI:function(a){var z=new P.ei(H.e(a,{func:1,ret:-1}))
if($.aC==null){$.aY=z
$.aC=z
if(!$.cR)$.$get$cF().$1(P.eQ())}else{$.aY.b=z
$.aY=z}},
jy:function(a){var z,y,x
H.e(a,{func:1,ret:-1})
z=$.aC
if(z==null){P.eI(a)
$.aZ=$.aY
return}y=new P.ei(a)
x=$.aZ
if(x==null){y.b=z
$.aZ=y
$.aC=y}else{y.b=x.b
x.b=y
$.aZ=y
if(y.b==null)$.aY=y}},
c8:function(a){var z,y
z={func:1,ret:-1}
H.e(a,z)
y=$.o
if(C.h===y){P.aj(null,null,C.h,a)
return}y.toString
P.aj(null,null,y,H.e(y.cR(a),z))},
kH:function(a,b){return new P.j8(H.l(a,"$isbd",[b],"$asbd"),!1,[b])},
i3:function(a,b,c,d){return new P.ab(b,a,0,[d])},
jx:function(a){return},
jt:[function(a,b){var z=$.o
z.toString
P.bj(null,null,z,a,b)},function(a){return P.jt(a,null)},"$2","$1","jD",4,2,3],
kV:[function(){},"$0","eP",0,0,1],
bj:function(a,b,c,d,e){var z={}
z.a=d
P.jy(new P.jv(z,e))},
eG:function(a,b,c,d,e){var z,y
H.e(d,{func:1,ret:e})
y=$.o
if(y===c)return d.$0()
$.o=c
z=y
try{y=d.$0()
return y}finally{$.o=z}},
eH:function(a,b,c,d,e,f,g){var z,y
H.e(d,{func:1,ret:f,args:[g]})
H.h(e,g)
y=$.o
if(y===c)return d.$1(e)
$.o=c
z=y
try{y=d.$1(e)
return y}finally{$.o=z}},
jw:function(a,b,c,d,e,f,g,h,i){var z,y
H.e(d,{func:1,ret:g,args:[h,i]})
H.h(e,h)
H.h(f,i)
y=$.o
if(y===c)return d.$2(e,f)
$.o=c
z=y
try{y=d.$2(e,f)
return y}finally{$.o=z}},
aj:function(a,b,c,d){var z
H.e(d,{func:1,ret:-1})
z=C.h!==c
if(z)d=!(!z||!1)?c.cR(d):c.fb(d,-1)
P.eI(d)},
it:{"^":"j:7;a",
$1:function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()}},
is:{"^":"j:34;a,b,c",
$1:function(a){var z,y
this.a.a=H.e(a,{func:1,ret:-1})
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
iu:{"^":"j:0;a",
$0:function(){this.a.$0()}},
iv:{"^":"j:0;a",
$0:function(){this.a.$0()}},
jc:{"^":"a;a,0b,c",
e2:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.aE(new P.je(this,b),0),a)
else throw H.d(P.Q("`setTimeout()` not found."))},
j:{
jd:function(a,b){var z=new P.jc(!0,0)
z.e2(a,b)
return z}}},
je:{"^":"j:1;a,b",
$0:function(){var z=this.a
z.b=null
z.c=1
this.b.$0()}},
eh:{"^":"a;a,b,$ti",
a8:function(a,b){var z
H.aH(b,{futureOr:1,type:H.c(this,0)})
if(this.b)this.a.a8(0,b)
else if(H.z(b,"$isF",this.$ti,"$asF")){z=this.a
b.aH(z.gd0(z),z.gfj(),-1)}else P.c8(new P.ip(this,b))},
aw:function(a,b){if(this.b)this.a.aw(a,b)
else P.c8(new P.io(this,a,b))},
$iscc:1},
ip:{"^":"j:0;a,b",
$0:function(){this.a.a.a8(0,this.b)}},
io:{"^":"j:0;a,b,c",
$0:function(){this.a.a.aw(this.b,this.c)}},
jj:{"^":"j:28;a",
$1:function(a){return this.a.$2(0,a)}},
jk:{"^":"j:29;a",
$2:function(a,b){this.a.$2(1,new H.cf(a,H.i(b,"$isA")))}},
jz:{"^":"j:32;a",
$2:function(a,b){this.a(H.G(a),b)}},
iw:{"^":"ek;a,$ti"},
a2:{"^":"iz;dx,0dy,0fr,x,0a,0b,0c,d,e,0f,0r,$ti",
sbv:function(a){this.dy=H.l(a,"$isa2",this.$ti,"$asa2")},
scC:function(a){this.fr=H.l(a,"$isa2",this.$ti,"$asa2")},
bw:function(){},
bx:function(){}},
ix:{"^":"a;ah:c<,0d,0e,$ti",
sem:function(a){this.d=H.l(a,"$isa2",this.$ti,"$asa2")},
sev:function(a){this.e=H.l(a,"$isa2",this.$ti,"$asa2")},
gew:function(){return this.c<4},
e7:function(a,b,c,d){var z,y,x,w,v,u
z=H.c(this,0)
H.e(a,{func:1,ret:-1,args:[z]})
H.e(c,{func:1,ret:-1})
if((this.c&4)!==0){if(c==null)c=P.eP()
z=new P.iD($.o,0,c,this.$ti)
z.eW()
return z}y=$.o
x=d?1:0
w=this.$ti
v=new P.a2(0,this,y,x,w)
v.dZ(a,b,c,d,z)
v.scC(v)
v.sbv(v)
H.l(v,"$isa2",w,"$asa2")
v.dx=this.c&1
u=this.e
this.sev(v)
v.sbv(null)
v.scC(u)
if(u==null)this.sem(v)
else u.sbv(v)
z=this.d
y=this.e
if(z==null?y==null:z===y)P.jx(this.a)
return v},
e3:function(){if((this.c&4)!==0)return new P.bP("Cannot add new events after calling close")
return new P.bP("Cannot add new events while doing an addStream")},
k:function(a,b){H.h(b,H.c(this,0))
if(!this.gew())throw H.d(this.e3())
this.by(b)},
$iskG:1,
$iskU:1,
$isaz:1},
ab:{"^":"ix;a,b,c,0d,0e,0f,0r,$ti",
by:function(a){var z,y
H.h(a,H.c(this,0))
for(z=this.d,y=this.$ti;z!=null;z=z.dy)z.e6(new P.iB(a,y))}},
F:{"^":"a;$ti"},
fN:{"^":"j:2;a,b,c,d",
$2:function(a,b){var z,y
z=this.a
y=--z.b
if(z.a!=null){z.a=null
if(z.b===0||this.c)this.d.L(a,H.i(b,"$isA"))
else{z.c=a
z.d=H.i(b,"$isA")}}else if(y===0&&!this.c)this.d.L(z.c,z.d)}},
fM:{"^":"j;a,b,c,d,e,f",
$1:function(a){var z,y
H.h(a,this.f)
z=this.a;--z.b
y=z.a
if(y!=null){C.b.w(y,this.b,a)
if(z.b===0)this.c.cp(z.a)}else if(z.b===0&&!this.e)this.c.L(z.c,z.d)},
$S:function(){return{func:1,ret:P.p,args:[this.f]}}},
ej:{"^":"a;$ti",
aw:[function(a,b){H.i(b,"$isA")
if(a==null)a=new P.bF()
if(this.a.a!==0)throw H.d(P.a6("Future already completed"))
$.o.toString
this.L(a,b)},function(a){return this.aw(a,null)},"fk","$2","$1","gfj",4,2,3],
$iscc:1},
iq:{"^":"ej;a,$ti",
a8:function(a,b){var z
H.aH(b,{futureOr:1,type:H.c(this,0)})
z=this.a
if(z.a!==0)throw H.d(P.a6("Future already completed"))
z.ck(b)},
L:function(a,b){this.a.cl(a,b)}},
jb:{"^":"ej;a,$ti",
a8:[function(a,b){var z
H.aH(b,{futureOr:1,type:H.c(this,0)})
z=this.a
if(z.a!==0)throw H.d(P.a6("Future already completed"))
z.bp(b)},function(a){return this.a8(a,null)},"hD","$1","$0","gd0",1,2,13],
L:function(a,b){this.a.L(a,b)}},
aA:{"^":"a;0a,b,c,d,e,$ti",
fW:function(a){if(this.c!==6)return!0
return this.b.b.bZ(H.e(this.d,{func:1,ret:P.ad,args:[P.a]}),a.a,P.ad,P.a)},
fK:function(a){var z,y,x,w
z=this.e
y=P.a
x={futureOr:1,type:H.c(this,1)}
w=this.b.b
if(H.aG(z,{func:1,args:[P.a,P.A]}))return H.aH(w.h6(z,a.a,a.b,null,y,P.A),x)
else return H.aH(w.bZ(H.e(z,{func:1,args:[P.a]}),a.a,null,y),x)}},
I:{"^":"a;ah:a<,b,0eV:c<,$ti",
aH:function(a,b,c){var z,y
z=H.c(this,0)
H.e(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
y=$.o
if(y!==C.h){y.toString
H.e(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
if(b!=null)b=P.ju(b,y)}return this.bA(a,b,c)},
c0:function(a,b){return this.aH(a,null,b)},
bA:function(a,b,c){var z,y,x
z=H.c(this,0)
H.e(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
y=new P.I(0,$.o,[c])
x=b==null?1:3
this.cj(new P.aA(y,x,a,b,[z,c]))
return y},
cj:function(a){var z,y
z=this.a
if(z<=1){a.a=H.i(this.c,"$isaA")
this.c=a}else{if(z===2){y=H.i(this.c,"$isI")
z=y.a
if(z<4){y.cj(a)
return}this.a=z
this.c=y.c}z=this.b
z.toString
P.aj(null,null,z,H.e(new P.iJ(this,a),{func:1,ret:-1}))}},
cB:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=H.i(this.c,"$isaA")
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){u=H.i(this.c,"$isI")
y=u.a
if(y<4){u.cB(a)
return}this.a=y
this.c=u.c}z.a=this.aN(a)
y=this.b
y.toString
P.aj(null,null,y,H.e(new P.iQ(z,this),{func:1,ret:-1}))}},
aM:function(){var z=H.i(this.c,"$isaA")
this.c=null
return this.aN(z)},
aN:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
bp:function(a){var z,y,x
z=H.c(this,0)
H.aH(a,{futureOr:1,type:z})
y=this.$ti
if(H.z(a,"$isF",y,"$asF"))if(H.z(a,"$isI",y,null))P.bT(a,this)
else P.el(a,this)
else{x=this.aM()
H.h(a,z)
this.a=4
this.c=a
P.aB(this,x)}},
cp:function(a){var z
H.h(a,H.c(this,0))
z=this.aM()
this.a=4
this.c=a
P.aB(this,z)},
L:[function(a,b){var z
H.i(b,"$isA")
z=this.aM()
this.a=8
this.c=new P.U(a,b)
P.aB(this,z)},function(a){return this.L(a,null)},"hp","$2","$1","gec",4,2,3],
ck:function(a){var z
H.aH(a,{futureOr:1,type:H.c(this,0)})
if(H.z(a,"$isF",this.$ti,"$asF")){this.ea(a)
return}this.a=1
z=this.b
z.toString
P.aj(null,null,z,H.e(new P.iL(this,a),{func:1,ret:-1}))},
ea:function(a){var z=this.$ti
H.l(a,"$isF",z,"$asF")
if(H.z(a,"$isI",z,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.aj(null,null,z,H.e(new P.iP(this,a),{func:1,ret:-1}))}else P.bT(a,this)
return}P.el(a,this)},
cl:function(a,b){var z
H.i(b,"$isA")
this.a=1
z=this.b
z.toString
P.aj(null,null,z,H.e(new P.iK(this,a,b),{func:1,ret:-1}))},
$isF:1,
j:{
el:function(a,b){var z,y,x
b.a=1
try{a.aH(new P.iM(b),new P.iN(b),null)}catch(x){z=H.Z(x)
y=H.am(x)
P.c8(new P.iO(b,z,y))}},
bT:function(a,b){var z,y
for(;z=a.a,z===2;)a=H.i(a.c,"$isI")
if(z>=4){y=b.aM()
b.a=a.a
b.c=a.c
P.aB(b,y)}else{y=H.i(b.c,"$isaA")
b.a=2
b.c=a
a.cB(y)}},
aB:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=H.i(y.c,"$isU")
y=y.b
u=v.a
t=v.b
y.toString
P.bj(null,null,y,u,t)}return}for(;s=b.a,s!=null;b=s){b.a=null
P.aB(z.a,b)}y=z.a
r=y.c
x.a=w
x.b=r
u=!w
if(u){t=b.c
t=(t&1)!==0||t===8}else t=!0
if(t){t=b.b
q=t.b
if(w){p=y.b
p.toString
p=p==null?q==null:p===q
if(!p)q.toString
else p=!0
p=!p}else p=!1
if(p){H.i(r,"$isU")
y=y.b
u=r.a
t=r.b
y.toString
P.bj(null,null,y,u,t)
return}o=$.o
if(o==null?q!=null:o!==q)$.o=q
else o=null
y=b.c
if(y===8)new P.iT(z,x,b,w).$0()
else if(u){if((y&1)!==0)new P.iS(x,b,r).$0()}else if((y&2)!==0)new P.iR(z,x,b).$0()
if(o!=null)$.o=o
y=x.b
if(!!J.r(y).$isF){if(y.a>=4){n=H.i(t.c,"$isaA")
t.c=null
b=t.aN(n)
t.a=y.a
t.c=y.c
z.a=y
continue}else P.bT(y,t)
return}}m=b.b
n=H.i(m.c,"$isaA")
m.c=null
b=m.aN(n)
y=x.a
u=x.b
if(!y){H.h(u,H.c(m,0))
m.a=4
m.c=u}else{H.i(u,"$isU")
m.a=8
m.c=u}z.a=m
y=m}}}},
iJ:{"^":"j:0;a,b",
$0:function(){P.aB(this.a,this.b)}},
iQ:{"^":"j:0;a,b",
$0:function(){P.aB(this.b,this.a.a)}},
iM:{"^":"j:7;a",
$1:function(a){var z=this.a
z.a=0
z.bp(a)}},
iN:{"^":"j:11;a",
$2:function(a,b){this.a.L(a,H.i(b,"$isA"))},
$1:function(a){return this.$2(a,null)}},
iO:{"^":"j:0;a,b,c",
$0:function(){this.a.L(this.b,this.c)}},
iL:{"^":"j:0;a,b",
$0:function(){var z=this.a
z.cp(H.h(this.b,H.c(z,0)))}},
iP:{"^":"j:0;a,b",
$0:function(){P.bT(this.b,this.a)}},
iK:{"^":"j:0;a,b,c",
$0:function(){this.a.L(this.b,this.c)}},
iT:{"^":"j:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.du(H.e(w.d,{func:1}),null)}catch(v){y=H.Z(v)
x=H.am(v)
if(this.d){w=H.i(this.a.a.c,"$isU").a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=H.i(this.a.a.c,"$isU")
else u.b=new P.U(y,x)
u.a=!0
return}if(!!J.r(z).$isF){if(z instanceof P.I&&z.gah()>=4){if(z.gah()===8){w=this.b
w.b=H.i(z.geV(),"$isU")
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.c0(new P.iU(t),null)
w.a=!1}}},
iU:{"^":"j:15;a",
$1:function(a){return this.a}},
iS:{"^":"j:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t
try{x=this.b
w=H.c(x,0)
v=H.h(this.c,w)
u=H.c(x,1)
this.a.b=x.b.b.bZ(H.e(x.d,{func:1,ret:{futureOr:1,type:u},args:[w]}),v,{futureOr:1,type:u},w)}catch(t){z=H.Z(t)
y=H.am(t)
x=this.a
x.b=new P.U(z,y)
x.a=!0}}},
iR:{"^":"j:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=H.i(this.a.a.c,"$isU")
w=this.c
if(w.fW(z)&&w.e!=null){v=this.b
v.b=w.fK(z)
v.a=!1}}catch(u){y=H.Z(u)
x=H.am(u)
w=H.i(this.a.a.c,"$isU")
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.U(y,x)
s.a=!0}}},
ei:{"^":"a;a,0b"},
bd:{"^":"a;$ti",
gm:function(a){var z,y
z={}
y=new P.I(0,$.o,[P.w])
z.a=0
this.b8(new P.i4(z,this),!0,new P.i5(z,y),y.gec())
return y}},
i4:{"^":"j;a,b",
$1:function(a){H.h(a,H.c(this.b,0));++this.a.a},
$S:function(){return{func:1,ret:P.p,args:[H.c(this.b,0)]}}},
i5:{"^":"j:0;a,b",
$0:function(){this.b.bp(this.a.a)}},
ah:{"^":"a;$ti"},
ek:{"^":"j7;$ti",
gv:function(a){return(H.ax(this.a)^892482866)>>>0},
J:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.ek))return!1
return b.a===this.a}},
iz:{"^":"iy;$ti",
bw:function(){H.l(this,"$isah",[H.c(this.x,0)],"$asah")},
bx:function(){H.l(this,"$isah",[H.c(this.x,0)],"$asah")}},
iy:{"^":"a;0a,0c,ah:e<,0r,$ti",
seC:function(a){this.a=H.e(a,{func:1,ret:-1,args:[H.c(this,0)]})},
seD:function(a){this.c=H.e(a,{func:1,ret:-1})},
scA:function(a){this.r=H.l(a,"$iscI",this.$ti,"$ascI")},
dZ:function(a,b,c,d,e){var z,y,x,w
z=H.c(this,0)
H.e(a,{func:1,ret:-1,args:[z]})
y=this.d
y.toString
this.seC(H.e(a,{func:1,ret:null,args:[z]}))
x=b==null?P.jD():b
if(H.aG(x,{func:1,ret:-1,args:[P.a,P.A]}))this.b=y.bV(x,null,P.a,P.A)
else if(H.aG(x,{func:1,ret:-1,args:[P.a]}))this.b=H.e(x,{func:1,ret:null,args:[P.a]})
else H.M(P.ae("handleError callback must take either an Object (the error), or both an Object (the error) and a StackTrace."))
H.e(c,{func:1,ret:-1})
w=c==null?P.eP():c
this.seD(H.e(w,{func:1,ret:-1}))},
bw:function(){},
bx:function(){},
e6:function(a){var z,y
z=this.$ti
y=H.l(this.r,"$iscJ",z,"$ascJ")
if(y==null){y=new P.cJ(0,z)
this.scA(y)}z=y.c
if(z==null){y.c=a
y.b=a}else{z.a=a
y.c=a}z=this.e
if((z&64)===0){z=(z|64)>>>0
this.e=z
if(z<128)this.r.c8(this)}},
by:function(a){var z,y
z=H.c(this,0)
H.h(a,z)
y=this.e
this.e=(y|32)>>>0
this.d.dw(this.a,a,z)
this.e=(this.e&4294967263)>>>0
this.eb((y&4)!==0)},
eb:function(a){var z,y,x
z=this.e
if((z&64)!==0&&this.r.c==null){z=(z&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){y=this.r
y=y==null||y.c==null}else y=!1
else y=!1
if(y){z=(z&4294967291)>>>0
this.e=z}}for(;!0;a=x){if((z&8)!==0){this.scA(null)
return}x=(z&4)!==0
if(a===x)break
this.e=(z^32)>>>0
if(x)this.bw()
else this.bx()
z=(this.e&4294967263)>>>0
this.e=z}if((z&64)!==0&&z<128)this.r.c8(this)},
$isah:1,
$isaz:1},
j7:{"^":"bd;$ti",
b8:function(a,b,c,d){H.e(a,{func:1,ret:-1,args:[H.c(this,0)]})
H.e(c,{func:1,ret:-1})
return this.a.e7(H.e(a,{func:1,ret:-1,args:[H.c(this,0)]}),d,c,!0===b)},
fU:function(a){return this.b8(a,null,null,null)}},
iC:{"^":"a;$ti"},
iB:{"^":"iC;b,0a,$ti"},
cI:{"^":"a;ah:a<,$ti",
c8:function(a){var z
H.l(a,"$isaz",this.$ti,"$asaz")
z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.c8(new P.j2(this,a))
this.a=1}},
j2:{"^":"j:0;a,b",
$0:function(){var z,y,x,w,v
z=this.a
y=z.a
z.a=0
if(y===3)return
x=H.l(this.b,"$isaz",[H.c(z,0)],"$asaz")
w=z.b
v=w.a
z.b=v
if(v==null)z.c=null
H.l(x,"$isaz",[H.c(w,0)],"$asaz").by(w.b)}},
cJ:{"^":"cI;0b,0c,a,$ti"},
iD:{"^":"a;a,ah:b<,c,$ti",
eW:function(){if((this.b&2)!==0)return
var z=this.a
z.toString
P.aj(null,null,z,H.e(this.geX(),{func:1,ret:-1}))
this.b=(this.b|2)>>>0},
hC:[function(){var z=(this.b&4294967293)>>>0
this.b=z
if(z>=4)return
this.b=(z|1)>>>0
this.a.dv(this.c)},"$0","geX",0,0,1],
$isah:1},
j8:{"^":"a;0a,b,c,$ti"},
U:{"^":"a;a,b",
h:function(a){return H.f(this.a)},
$isC:1},
jh:{"^":"a;",$iskO:1},
jv:{"^":"j:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.bF()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.d(z)
x=H.d(z)
x.stack=y.h(0)
throw x}},
j3:{"^":"jh;",
dv:function(a){var z,y,x
H.e(a,{func:1,ret:-1})
try{if(C.h===$.o){a.$0()
return}P.eG(null,null,this,a,-1)}catch(x){z=H.Z(x)
y=H.am(x)
P.bj(null,null,this,z,H.i(y,"$isA"))}},
dw:function(a,b,c){var z,y,x
H.e(a,{func:1,ret:-1,args:[c]})
H.h(b,c)
try{if(C.h===$.o){a.$1(b)
return}P.eH(null,null,this,a,b,-1,c)}catch(x){z=H.Z(x)
y=H.am(x)
P.bj(null,null,this,z,H.i(y,"$isA"))}},
fb:function(a,b){return new P.j5(this,H.e(a,{func:1,ret:b}),b)},
cR:function(a){return new P.j4(this,H.e(a,{func:1,ret:-1}))},
fd:function(a,b){return new P.j6(this,H.e(a,{func:1,ret:-1,args:[b]}),b)},
du:function(a,b){H.e(a,{func:1,ret:b})
if($.o===C.h)return a.$0()
return P.eG(null,null,this,a,b)},
bZ:function(a,b,c,d){H.e(a,{func:1,ret:c,args:[d]})
H.h(b,d)
if($.o===C.h)return a.$1(b)
return P.eH(null,null,this,a,b,c,d)},
h6:function(a,b,c,d,e,f){H.e(a,{func:1,ret:d,args:[e,f]})
H.h(b,e)
H.h(c,f)
if($.o===C.h)return a.$2(b,c)
return P.jw(null,null,this,a,b,c,d,e,f)},
bV:function(a,b,c,d){return H.e(a,{func:1,ret:b,args:[c,d]})}},
j5:{"^":"j;a,b,c",
$0:function(){return this.a.du(this.b,this.c)},
$S:function(){return{func:1,ret:this.c}}},
j4:{"^":"j:1;a,b",
$0:function(){return this.a.dv(this.b)}},
j6:{"^":"j;a,b,c",
$1:function(a){var z=this.c
return this.a.dw(this.b,H.h(a,z),z)},
$S:function(){return{func:1,ret:-1,args:[this.c]}}}}],["","",,P,{"^":"",
h7:function(a,b,c){H.bk(a)
return H.l(H.jJ(a,new H.V(0,0,[b,c])),"$isdF",[b,c],"$asdF")},
fW:function(a,b,c){var z,y
if(P.cS(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$b_()
C.b.k(y,a)
try{P.jq(a,z)}finally{if(0>=y.length)return H.b(y,-1)
y.pop()}y=P.dZ(b,H.jS(z,"$isn"),", ")+c
return y.charCodeAt(0)==0?y:y},
dw:function(a,b,c){var z,y,x
if(P.cS(a))return b+"..."+c
z=new P.cA(b)
y=$.$get$b_()
C.b.k(y,a)
try{x=z
x.a=P.dZ(x.gag(),a,", ")}finally{if(0>=y.length)return H.b(y,-1)
y.pop()}y=z
y.a=y.gag()+c
y=z.gag()
return y.charCodeAt(0)==0?y:y},
cS:function(a){var z,y
for(z=0;y=$.$get$b_(),z<y.length;++z)if(a===y[z])return!0
return!1},
jq:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gD(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.p())return
w=H.f(z.gt())
C.b.k(b,w)
y+=w.length+2;++x}if(!z.p()){if(x<=5)return
if(0>=b.length)return H.b(b,-1)
v=b.pop()
if(0>=b.length)return H.b(b,-1)
u=b.pop()}else{t=z.gt();++x
if(!z.p()){if(x<=4){C.b.k(b,H.f(t))
return}v=H.f(t)
if(0>=b.length)return H.b(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gt();++x
for(;z.p();t=s,s=r){r=z.gt();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.b(b,-1)
y-=b.pop().length+2;--x}C.b.k(b,"...")
return}}u=H.f(t)
v=H.f(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.b(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)C.b.k(b,q)
C.b.k(b,u)
C.b.k(b,v)},
dI:function(a){var z,y,x
z={}
if(P.cS(a))return"{...}"
y=new P.cA("")
try{C.b.k($.$get$b_(),a)
x=y
x.a=x.gag()+"{"
z.a=!0
a.ac(0,new P.ha(z,y))
z=y
z.a=z.gag()+"}"}finally{z=$.$get$b_()
if(0>=z.length)return H.b(z,-1)
z.pop()}z=y.gag()
return z.charCodeAt(0)==0?z:z},
fV:{"^":"n;"},
a4:{"^":"a;$ti",
gD:function(a){return new H.co(a,this.gm(a),0,[H.aI(this,a,"a4",0)])},
a_:function(a,b){return this.C(a,b)},
a7:["cd",function(a,b,c,d,e){var z,y,x,w,v
z=H.aI(this,a,"a4",0)
H.l(d,"$isn",[z],"$asn")
P.ct(b,c,this.gm(a),null,null,null)
y=c-b
if(y===0)return
if(H.z(d,"$isu",[z],"$asu")){x=e
w=d}else{w=H.i9(d,e,null,H.aI(J.r(d),d,"a4",0)).h7(0,!1)
x=0}if(x+y>w.length)throw H.d(H.fX())
if(x<b)for(v=y-1;v>=0;--v){z=x+v
if(z>=w.length)return H.b(w,z)
this.w(a,b+v,w[z])}else for(v=0;v<y;++v){z=x+v
if(z>=w.length)return H.b(w,z)
this.w(a,b+v,w[z])}},function(a,b,c,d){return this.a7(a,b,c,d,0)},"ae",null,null,"ghl",13,2,null],
c9:function(a,b,c){H.l(c,"$isn",[H.aI(this,a,"a4",0)],"$asn")
this.ae(a,b,b+c.length,c)},
h:function(a){return P.dw(a,"[","]")}},
h9:{"^":"hb;"},
ha:{"^":"j:2;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.f(a)
z.a=y+": "
z.a+=H.f(b)}},
hb:{"^":"a;$ti",
gm:function(a){return this.a},
h:function(a){return P.dI(this)},
$isdH:1}}],["","",,P,{"^":"",
jH:function(a,b){var z=H.hx(a)
if(z!=null)return z
throw H.d(P.dq("Invalid double",a,null))},
dG:function(a,b,c){var z,y
z=H.k([],[c])
for(y=a.gD(a);y.p();)C.b.k(z,H.h(y.gt(),c))
return z},
i7:function(a,b,c){var z,y
z=P.w
a=H.l(H.l(a,"$isn",[z],"$asn"),"$isav",[z],"$asav")
y=a.length
c=P.ct(b,c,y,null,null,null)
return H.hy(b>0||c<y?C.b.dR(a,b,c):a)},
dQ:function(a,b,c){return new H.dB(a,H.ck(a,!1,!0,!1))},
Y:function(a){H.bm(a)},
ad:{"^":"a;"},
"+bool":0,
aF:{"^":"m;"},
"+double":0,
C:{"^":"a;",j:{
fH:function(a){if(a instanceof H.j)return a.h(0)
return"Instance of '"+H.aU(a)+"'"},
cd:function(){return new P.C()},
bv:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.bo(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fH(a)}}},
bF:{"^":"C;",
h:function(a){return"Throw of null."}},
ar:{"^":"C;a,b,c,d",
gbr:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbq:function(){return""},
h:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.f(z)
w=this.gbr()+y+x
if(!this.a)return w
v=this.gbq()
u=P.bv(this.b)
return w+v+": "+H.f(u)},
j:{
ae:function(a){return new P.ar(!1,null,null,a)},
d8:function(a,b,c){return new P.ar(!0,a,b,c)}}},
dP:{"^":"ar;e,f,a,b,c,d",
gbr:function(){return"RangeError"},
gbq:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.f(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.f(z)
else if(x>z)y=": Not in range "+H.f(z)+".."+H.f(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.f(z)}return y},
j:{
bb:function(a,b,c){return new P.dP(null,null,!0,a,b,"Value not in range")},
W:function(a,b,c,d,e){return new P.dP(b,c,!0,a,d,"Invalid value")},
ct:function(a,b,c,d,e,f){if(0>a||a>c)throw H.d(P.W(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.d(P.W(b,a,c,"end",f))
return b}return c}}},
fU:{"^":"ar;e,m:f>,a,b,c,d",
gbr:function(){return"RangeError"},
gbq:function(){if(J.f3(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.f(z)},
j:{
bA:function(a,b,c,d,e){var z=H.G(e!=null?e:J.aq(b))
return new P.fU(b,z,!0,a,c,"Index out of range")}}},
ii:{"^":"C;a",
h:function(a){return"Unsupported operation: "+this.a},
j:{
Q:function(a){return new P.ii(a)}}},
ig:{"^":"C;a",
h:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
j:{
ee:function(a){return new P.ig(a)}}},
bP:{"^":"C;a",
h:function(a){return"Bad state: "+H.f(this.a)},
j:{
a6:function(a){return new P.bP(a)}}},
fx:{"^":"C;a",
h:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.f(P.bv(z))+"."},
j:{
at:function(a){return new P.fx(a)}}},
hr:{"^":"a;",
h:function(a){return"Out of Memory"},
$isC:1},
dY:{"^":"a;",
h:function(a){return"Stack Overflow"},
$isC:1},
fA:{"^":"C;a",
h:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
iH:{"^":"a;a",
h:function(a){return"Exception: "+this.a}},
fJ:{"^":"a;a,b,c",
h:function(a){var z,y,x
z=this.a
y=""!==z?"FormatException: "+z:"FormatException"
x=this.b
if(typeof x!=="string")return y
if(x.length>78)x=C.f.Y(x,0,75)+"..."
return y+"\n"+x},
j:{
dq:function(a,b,c){return new P.fJ(a,b,c)}}},
w:{"^":"m;"},
"+int":0,
n:{"^":"a;$ti",
gm:function(a){var z,y
z=this.gD(this)
for(y=0;z.p();)++y
return y},
a_:function(a,b){var z,y,x
if(b<0)H.M(P.W(b,0,null,"index",null))
for(z=this.gD(this),y=0;z.p();){x=z.gt()
if(b===y)return x;++y}throw H.d(P.bA(b,this,"index",null,y))},
h:function(a){return P.fW(this,"(",")")}},
a_:{"^":"a;$ti"},
u:{"^":"a;$ti",$isn:1},
"+List":0,
p:{"^":"a;",
gv:function(a){return P.a.prototype.gv.call(this,this)},
h:function(a){return"null"}},
"+Null":0,
m:{"^":"a;"},
"+num":0,
a:{"^":";",
J:function(a,b){return this===b},
gv:function(a){return H.ax(this)},
h:function(a){return"Instance of '"+H.aU(this)+"'"},
toString:function(){return this.h(this)}},
aS:{"^":"a;"},
A:{"^":"a;"},
kF:{"^":"a;a,b"},
x:{"^":"a;",$isdN:1},
"+String":0,
cA:{"^":"a;ag:a<",
gm:function(a){return this.a.length},
h:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
j:{
dZ:function(a,b,c){var z=J.d7(b)
if(!z.p())return a
if(c.length===0){do a+=H.f(z.gt())
while(z.p())}else{a+=H.f(z.gt())
for(;z.p();)a=a+c+H.f(z.gt())}return a}}}}],["","",,W,{"^":"",
k3:function(){return window},
b3:function(a,b){var z=document.createElement("canvas")
z.width=b
z.height=a
return z},
fG:function(a){H.i(a,"$isbw")
return"wheel"},
cH:function(a,b){return document.createElement(a)},
fS:function(a,b,c){var z=document.createElement("img")
return z},
bV:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
eo:function(a,b,c,d){var z,y
z=W.bV(W.bV(W.bV(W.bV(0,a),b),c),d)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
eL:function(a,b){var z
H.e(a,{func:1,ret:-1,args:[b]})
z=$.o
if(z===C.h)return a
return z.fd(a,b)},
af:{"^":"aO;","%":"HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLInputElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTimeElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
k4:{"^":"af;",
h:function(a){return String(a)},
"%":"HTMLAnchorElement"},
k5:{"^":"af;",
h:function(a){return String(a)},
"%":"HTMLAreaElement"},
fq:{"^":"af;","%":"HTMLBodyElement"},
b2:{"^":"af;",
c5:function(a,b,c){var z=this.eo(a,b,P.jE(c,null))
return z},
eo:function(a,b,c){return a.getContext(b,c)},
gfl:function(a){return a.getContext("2d")},
$isb2:1,
$isdc:1,
"%":"HTMLCanvasElement"},
dd:{"^":"q;",
cY:function(a,b,c,d,e){return a.clearRect(b,c,d,e)},
dl:function(a,b,c,d,e){return a.fillRect(b,c,d,e)},
bT:function(a,b){return a.measureText(b)},
R:function(a,b,c,d,e,f,g){return a.setTransform(b,c,d,e,f,g)},
hn:function(a,b,c,d,e){return a.strokeText(b,c,d,e)},
dP:function(a,b,c,d){return a.strokeText(b,c,d)},
a3:function(a,b,c){return a.lineTo(b,c)},
a4:function(a,b,c){return a.moveTo(b,c)},
h3:function(a,b,c,d,e){return a.rect(b,c,d,e)},
d4:function(a,b,c,d){return a.drawImage(b,c,d)},
fs:function(a,b,c,d,e,f){return a.drawImage(b,c,d,e,f)},
aZ:function(a,b,c,d,e,f,g,h,i,j){return a.drawImage(b,c,d,e,f,g,h,i,j)},
$isdd:1,
"%":"CanvasRenderingContext2D"},
k7:{"^":"bE;0m:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
fy:{"^":"iA;0m:length=",
dG:function(a,b){var z=this.eq(a,this.e8(a,b))
return z==null?"":z},
e8:function(a,b){var z,y
z=$.$get$dg()
y=z[b]
if(typeof y==="string")return y
y=this.f0(a,b)
z[b]=y
return y},
f0:function(a,b){var z
if(b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()}) in a)return b
z=P.fB()+b
if(z in a)return z
return b},
eq:function(a,b){return a.getPropertyValue(b)},
ga1:function(a){return a.height},
gV:function(a){return a.left},
ga5:function(a){return a.top},
ga6:function(a){return a.width},
$isfy:1,
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
fz:{"^":"a;",
gV:function(a){return this.dG(a,"left")}},
fD:{"^":"bE;",
ed:function(a,b){return a.createEvent(b)},
h2:function(a,b){return a.querySelector(b)},
"%":"XMLDocument;Document"},
k8:{"^":"q;",
h:function(a){return String(a)},
"%":"DOMException"},
fE:{"^":"q;",
h:function(a){return"Rectangle ("+H.f(a.left)+", "+H.f(a.top)+") "+H.f(a.width)+" x "+H.f(a.height)},
J:function(a,b){var z
if(b==null)return!1
if(!H.z(b,"$isP",[P.m],"$asP"))return!1
z=J.T(b)
return a.left===z.gV(b)&&a.top===z.ga5(b)&&a.width===z.ga6(b)&&a.height===z.ga1(b)},
gv:function(a){return W.eo(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gV:function(a){return a.left},
ga5:function(a){return a.top},
gi:function(a){return a.x},
gl:function(a){return a.y},
$isP:1,
$asP:function(){return[P.m]},
"%":";DOMRectReadOnly"},
aO:{"^":"bE;0dQ:style=",
h:function(a){return a.localName},
$isaO:1,
"%":";Element"},
L:{"^":"q;",
es:function(a,b,c,d){return a.initEvent(b,!0,!0)},
$isL:1,
"%":"AbortPaymentEvent|AnimationEvent|AnimationPlaybackEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|BackgroundFetchClickEvent|BackgroundFetchEvent|BackgroundFetchFailEvent|BackgroundFetchedEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|CanMakePaymentEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|ForeignFetchEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MojoInterfaceRequestEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PaymentRequestEvent|PaymentRequestUpdateEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCPeerConnectionIceEvent|RTCTrackEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SensorErrorEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|VRDeviceEvent|VRDisplayEvent|VRSessionEvent|WebKitTransitionEvent;Event|InputEvent"},
bw:{"^":"q;",
e4:function(a,b,c,d){return a.addEventListener(b,H.aE(H.e(c,{func:1,args:[W.L]}),1),!1)},
eR:function(a,b,c,d){return a.removeEventListener(b,H.aE(H.e(c,{func:1,args:[W.L]}),1),!1)},
$isbw:1,
"%":";EventTarget"},
ku:{"^":"af;0m:length=","%":"HTMLFormElement"},
fR:{"^":"fD;","%":"HTMLDocument"},
au:{"^":"af;",$isau:1,$isdc:1,"%":"HTMLImageElement"},
b9:{"^":"cD;",$isb9:1,"%":"KeyboardEvent"},
hg:{"^":"af;","%":"HTMLAudioElement;HTMLMediaElement"},
aT:{"^":"cD;",$isaT:1,"%":"PointerEvent;DragEvent|MouseEvent"},
bE:{"^":"bw;0fZ:parentNode=,0textContent",
sbg:function(a,b){a.textContent=H.t(b)},
h:function(a){var z=a.nodeValue
return z==null?this.dT(a):z},
cP:function(a,b){return a.appendChild(b)},
eQ:function(a,b){return a.removeChild(b)},
$isbE:1,
"%":"Attr|DocumentFragment|DocumentType|ShadowRoot;Node"},
kE:{"^":"af;0m:length=","%":"HTMLSelectElement"},
ay:{"^":"q;",$isay:1,"%":"Touch"},
bf:{"^":"cD;",$isbf:1,"%":"TouchEvent"},
kK:{"^":"jg;",
gm:function(a){return a.length},
C:function(a,b){if(b>>>0!==b||b>=a.length)throw H.d(P.bA(b,a,null,null,null))
return a[b]},
w:function(a,b,c){H.i(c,"$isay")
throw H.d(P.Q("Cannot assign element of immutable List."))},
a_:function(a,b){if(b<0||b>=a.length)return H.b(a,b)
return a[b]},
$isb7:1,
$asb7:function(){return[W.ay]},
$asa4:function(){return[W.ay]},
$isn:1,
$asn:function(){return[W.ay]},
$isu:1,
$asu:function(){return[W.ay]},
$asbz:function(){return[W.ay]},
"%":"TouchList"},
cD:{"^":"L;","%":"CompositionEvent|FocusEvent|TextEvent;UIEvent"},
kN:{"^":"hg;",$isdc:1,"%":"HTMLVideoElement"},
aX:{"^":"aT;",
gfp:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.d(P.Q("deltaY is not supported"))},
gfo:function(a){if(a.deltaX!==undefined)return a.deltaX
throw H.d(P.Q("deltaX is not supported"))},
$isaX:1,
"%":"WheelEvent"},
ik:{"^":"bw;",
eU:function(a,b){return a.requestAnimationFrame(H.aE(H.e(b,{func:1,ret:-1,args:[P.m]}),1))},
ej:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
"%":"DOMWindow|Window"},
kS:{"^":"fE;",
h:function(a){return"Rectangle ("+H.f(a.left)+", "+H.f(a.top)+") "+H.f(a.width)+" x "+H.f(a.height)},
J:function(a,b){var z
if(b==null)return!1
if(!H.z(b,"$isP",[P.m],"$asP"))return!1
z=J.T(b)
return a.left===z.gV(b)&&a.top===z.ga5(b)&&a.width===z.ga6(b)&&a.height===z.ga1(b)},
gv:function(a){return W.eo(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
ga1:function(a){return a.height},
ga6:function(a){return a.width},
gi:function(a){return a.x},
gl:function(a){return a.y},
"%":"ClientRect|DOMRect"},
iE:{"^":"bd;$ti",
b8:function(a,b,c,d){var z=H.c(this,0)
H.e(a,{func:1,ret:-1,args:[z]})
H.e(c,{func:1,ret:-1})
return W.B(this.a,this.b,a,!1,z)}},
kT:{"^":"iE;a,b,c,$ti"},
iF:{"^":"ah;a,b,c,d,e,$ti",
ser:function(a){this.d=H.e(a,{func:1,args:[W.L]})},
aW:function(){if(this.b==null)return
this.f6()
this.b=null
this.ser(null)
return},
f5:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
H.e(z,{func:1,args:[W.L]})
if(y)J.f4(x,this.c,z,!1)}},
f6:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
H.e(z,{func:1,args:[W.L]})
if(y)J.f7(x,this.c,z,!1)}},
j:{
B:function(a,b,c,d,e){var z=W.eL(new W.iG(c),W.L)
z=new W.iF(0,a,b,z,!1,[e])
z.f5()
return z}}},
iG:{"^":"j:16;a",
$1:function(a){return this.a.$1(H.i(a,"$isL"))}},
bz:{"^":"a;$ti",
gD:function(a){return new W.fI(a,a.length,-1,[H.aI(this,a,"bz",0)])},
a7:function(a,b,c,d,e){H.l(d,"$isn",[H.aI(this,a,"bz",0)],"$asn")
throw H.d(P.Q("Cannot setRange on immutable List."))},
ae:function(a,b,c,d){return this.a7(a,b,c,d,0)}},
fI:{"^":"a;a,b,c,0d,$ti",
scs:function(a){this.d=H.h(a,H.c(this,0))},
p:function(){var z,y
z=this.c+1
y=this.b
if(z<y){y=this.a
if(z<0||z>=y.length)return H.b(y,z)
this.scs(y[z])
this.c=z
return!0}this.scs(null)
this.c=y
return!1},
gt:function(){return this.d},
$isa_:1},
iA:{"^":"q+fz;"},
jf:{"^":"q+a4;"},
jg:{"^":"jf+bz;"}}],["","",,P,{"^":"",
jE:function(a,b){var z={}
a.ac(0,new P.jF(z))
return z},
dm:function(){var z=$.dl
if(z==null){z=J.c9(window.navigator.userAgent,"Opera",0)
$.dl=z}return z},
fB:function(){var z,y
z=$.di
if(z!=null)return z
y=$.dj
if(y==null){y=J.c9(window.navigator.userAgent,"Firefox",0)
$.dj=y}if(y)z="-moz-"
else{y=$.dk
if(y==null){y=!P.dm()&&J.c9(window.navigator.userAgent,"Trident/",0)
$.dk=y}if(y)z="-ms-"
else z=P.dm()?"-o-":"-webkit-"}$.di=z
return z},
fC:function(a){var z,y,x
try{y=C.A.ed(document,a)
J.f5(y,"",!0,!0)
z=y
return!!J.r(z).$isL}catch(x){H.Z(x)}return!1},
jF:{"^":"j:2;a",
$2:function(a,b){this.a[a]=b}}}],["","",,P,{"^":""}],["","",,P,{"^":"",
en:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
a5:{"^":"a;i:a>,l:b>,$ti",
h:function(a){return"Point("+H.f(this.a)+", "+H.f(this.b)+")"},
J:function(a,b){var z,y,x
if(b==null)return!1
if(!H.z(b,"$isa5",[P.m],"$asa5"))return!1
z=this.a
y=J.T(b)
x=y.gi(b)
if(z==null?x==null:z===x){z=this.b
y=y.gl(b)
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gv:function(a){var z,y,x
z=J.ap(this.a)
y=J.ap(this.b)
y=P.en(P.en(0,z),y)
x=536870911&y+((67108863&y)<<3)
x^=x>>>11
return 536870911&x+((16383&x)<<15)}}}],["","",,P,{"^":"",fe:{"^":"q;",$isfe:1,"%":"SVGAnimatedLength"},ff:{"^":"q;",$isff:1,"%":"SVGAnimatedLengthList"},fg:{"^":"q;",$isfg:1,"%":"SVGAnimatedNumber"},k9:{"^":"y;0i:x=,0l:y=","%":"SVGFEBlendElement"},ka:{"^":"y;0i:x=,0l:y=","%":"SVGFEColorMatrixElement"},kb:{"^":"y;0i:x=,0l:y=","%":"SVGFEComponentTransferElement"},kc:{"^":"y;0i:x=,0l:y=","%":"SVGFECompositeElement"},kd:{"^":"y;0i:x=,0l:y=","%":"SVGFEConvolveMatrixElement"},ke:{"^":"y;0i:x=,0l:y=","%":"SVGFEDiffuseLightingElement"},kf:{"^":"y;0i:x=,0l:y=","%":"SVGFEDisplacementMapElement"},kg:{"^":"y;0i:x=,0l:y=","%":"SVGFEFloodElement"},kh:{"^":"y;0i:x=,0l:y=","%":"SVGFEGaussianBlurElement"},ki:{"^":"y;0i:x=,0l:y=","%":"SVGFEImageElement"},kj:{"^":"y;0i:x=,0l:y=","%":"SVGFEMergeElement"},kk:{"^":"y;0i:x=,0l:y=","%":"SVGFEMorphologyElement"},kl:{"^":"y;0i:x=,0l:y=","%":"SVGFEOffsetElement"},km:{"^":"y;0i:x=,0l:y=","%":"SVGFEPointLightElement"},kn:{"^":"y;0i:x=,0l:y=","%":"SVGFESpecularLightingElement"},ko:{"^":"y;0i:x=,0l:y=","%":"SVGFESpotLightElement"},kp:{"^":"y;0i:x=,0l:y=","%":"SVGFETileElement"},kq:{"^":"y;0i:x=,0l:y=","%":"SVGFETurbulenceElement"},kr:{"^":"y;0i:x=,0l:y=","%":"SVGFilterElement"},kt:{"^":"aP;0i:x=,0l:y=","%":"SVGForeignObjectElement"},fO:{"^":"aP;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},aP:{"^":"y;","%":"SVGAElement|SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},kv:{"^":"aP;0i:x=,0l:y=","%":"SVGImageElement"},kz:{"^":"y;0i:x=,0l:y=","%":"SVGMaskElement"},kA:{"^":"y;0i:x=,0l:y=","%":"SVGPatternElement"},kC:{"^":"fO;0i:x=,0l:y=","%":"SVGRectElement"},y:{"^":"aO;","%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGGradientElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMetadataElement|SVGRadialGradientElement|SVGScriptElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSymbolElement|SVGTitleElement|SVGViewElement;SVGElement"},kI:{"^":"aP;0i:x=,0l:y=","%":"SVGSVGElement"},ia:{"^":"aP;","%":"SVGTextPathElement;SVGTextContentElement"},kJ:{"^":"ia;0i:x=,0l:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},kM:{"^":"aP;0i:x=,0l:y=","%":"SVGUseElement"}}],["","",,P,{"^":""}],["","",,P,{"^":"",fr:{"^":"q;",$isfr:1,"%":"WebGLBuffer"},aN:{"^":"L;",$isaN:1,"%":"WebGLContextEvent"},fK:{"^":"q;",$isfK:1,"%":"WebGLFramebuffer"},hA:{"^":"q;",$ishA:1,"%":"WebGLProgram"},bN:{"^":"q;",
cM:function(a,b){return a.activeTexture(b)},
cQ:function(a,b,c){return a.attachShader(b,c)},
aU:function(a,b,c){return a.bindBuffer(b,c)},
fc:function(a,b,c){return a.bindFramebuffer(b,c)},
cS:function(a,b,c){return a.bindTexture(b,c)},
cT:function(a,b,c){return a.blendFunc(b,c)},
cU:function(a,b,c,d){return a.bufferData(b,c,d)},
cV:function(a,b,c,d){return a.bufferSubData(b,c,d)},
av:function(a,b){return a.clear(b)},
ff:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
fh:function(a,b,c,d,e){return a.colorMask(b,c,d,e)},
fi:function(a,b){return a.compileShader(b)},
fn:function(a,b){return a.createShader(b)},
a9:function(a,b){return a.disable(b)},
fq:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
b_:function(a,b){return a.enable(b)},
fu:function(a,b){return a.enableVertexAttribArray(b)},
dB:function(a,b,c){return a.getActiveAttrib(b,c)},
dC:function(a,b,c){return a.getActiveUniform(b,c)},
dD:function(a,b,c){return a.getAttribLocation(b,c)},
dF:function(a,b){return a.getProgramInfoLog(b)},
bi:function(a,b,c){return a.getProgramParameter(b,c)},
dH:function(a,b){return a.getShaderInfoLog(b)},
dI:function(a,b,c){return a.getShaderParameter(b,c)},
dK:function(a,b,c){return a.getUniformLocation(b,c)},
dn:function(a,b){return a.isEnabled(b)},
fT:function(a,b){return a.linkProgram(b)},
h0:function(a,b,c){return a.pixelStorei(b,c)},
dM:function(a,b,c){return a.shaderSource(b,c)},
dO:function(a,b,c,d){return a.stencilFunc(b,c,d)},
c_:function(a,b,c,d,e,f,g,h,i,j){var z,y
z=i==null
if(!z&&h!=null&&typeof g==="number"&&Math.floor(g)===g){this.f1(a,b,c,d,e,f,g,h,i,j)
return}y=J.r(g)
if(!!y.$isau&&h==null&&z&&!0){this.f2(a,b,c,d,e,f,g)
return}if(!!y.$isb2&&h==null&&z&&!0){this.f3(a,b,c,d,e,f,g)
return}throw H.d(P.ae("Incorrect number or type of arguments"))},
bf:function(a,b,c,d,e,f,g){return this.c_(a,b,c,d,e,f,g,null,null,null)},
f1:function(a,b,c,d,e,f,g,h,i,j){return a.texImage2D(b,c,d,e,f,g,h,i,j)},
f2:function(a,b,c,d,e,f,g){return a.texImage2D(b,c,d,e,f,g)},
f3:function(a,b,c,d,e,f,g){return a.texImage2D(b,c,d,e,f,g)},
ao:function(a,b,c,d){return a.texParameteri(b,c,d)},
hb:function(a,b,c){return a.uniform1i(H.i(b,"$iscE"),c)},
hc:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
hf:function(a,b){return a.useProgram(b)},
hg:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
hh:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
$isbN:1,
"%":"WebGLRenderingContext"},hV:{"^":"q;",$ishV:1,"%":"WebGLShader"},id:{"^":"q;",$isid:1,"%":"WebGLTexture"},cE:{"^":"q;",$iscE:1,"%":"WebGLUniformLocation"}}],["","",,P,{"^":""}],["","",,K,{"^":"",eg:{"^":"a;0a,0b"},h3:{"^":"a;0a,0b,c,d",
bE:function(a,b){var z,y
z=this.a
for(y=this.b;z!==y;){if(z.a===b)return!0
z=z.b}return!1},
aT:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.c+=a
this.d.k(0,z)
y=this.a
x=this.b
for(;y!==x;){w=y.a
if(w==null){v=y.b
y.a=v.a
y.b=v.b
if(v===x)x=y
if(v===this.b)this.b=y}else{z=w.F
u=z.c
t=z.gA()
if(u>800-z.gO().ap(t,t).c&&w.T===C.m)w.T=C.k
else{u=z.c
if(u<0&&w.T===C.k){u=w.ax
H.bm("score should be updated")
s=++u.F
u=u.M
s="Score: ["+s+"]"
u.u=s
u.a0=s.length
u.E|=3
w.T=C.m}else{s=z.d
if(s<0&&w.q===C.l){H.bm("Collision with Top Wall: ball.x: "+C.d.ad(u,0)+", ball.y: "+C.d.ad(z.d,0))
w.q=C.n}else{t=z.gA()
if(s>600-z.gO().ap(t,t).c&&w.q===C.n){H.bm("Collision with Bottom Wall: ball.x: "+C.d.ad(z.c,0)+", ball.y: "+C.d.ad(z.d,0))
w.q=C.l}}}}u=w.T
s=z.c
r=w.ak
q=r*a
if(u===C.k){z.c=s-q
z.id=!0}else{z.c=s+q
z.id=!0}u=w.q
s=z.d
r*=a
if(u===C.l)z.d=s-r
else z.d=s+r
z=w.F
if(w.M.fM(z)){H.bm("Ball collided with paddle!")
if(w.T===C.k)w.T=C.m
else w.T=C.k
if(w.q===C.l)w.q=C.n
else w.q=C.l}y=y.b}}return!0},
$isfd:1,
j:{
dE:function(){var z,y
z=new K.h3(0,new P.ab(null,null,0,[P.m]))
y=new K.eg()
z.a=y
z.b=y
return z}}}}],["","",,A,{"^":"",as:{"^":"a;a,b,c",j:{
fn:function(a,b){var z,y,x,w,v,u,t,s
b=$.$get$d9()
z=A.fk(a,b.d)
y=z.b
x=z.c
b.e
w=W.fS(null,null,null)
v=W.au
u=new P.I(0,$.o,[v])
t=new N.fT(w,new P.iq(u,[v]),y)
v=W.L
s={func:1,ret:-1,args:[v]}
t.d=W.B(w,"load",H.e(t.geG(),s),!1,v)
t.e=W.B(w,"error",H.e(t.geF(),s),!1,v)
w.src=y
return u.c0(new A.fo(x),A.as)}}},fo:{"^":"j:17;a",
$1:function(a){var z,y,x,w
H.i(a,"$isau")
z=new L.cv(0,0,C.J,C.p,C.p,-1,!1,-1)
z.a=V.b1(a.width)
z.b=V.b1(a.height)
z.c=a
y=z.gbU().c3(this.a)
x=y.c
w=y.e
return new A.as(x.c/w,x.d/w,y)}},fj:{"^":"a;0a,0b,0c",
dX:function(a,b){var z,y,x,w,v,u,t,s,r
this.a=a
this.b=a
this.c=1
z=P.dQ("@(\\d+(.\\d+)?)x",!0,!1).fH(this.a)
if(z!=null){y=z.b
if(2>=y.length)return H.b(y,2)
x=y[2]
if(x==null)x="."
w=P.jH(y[1],null)
v=C.b.fJ(b,0,new A.fl($.$get$cX()),P.m)
u=J.fb(v,x.length-1)
y=y.index+1
x=z.gb0()
t=P.ct(y,x-1,a.length,null,null,null)
s=a.substring(0,y)
r=a.substring(t)
this.b=s+u+r
if(typeof w!=="number")return H.J(w)
this.c=v/w}},
j:{
fk:function(a,b){var z=new A.fj()
z.dX(a,b)
return z}}},fl:{"^":"j:18;a",
$2:function(a,b){var z
H.c7(a)
H.c7(b)
z=this.a
if(typeof a!=="number")return a.bm()
if(typeof z!=="number")return H.J(z)
if(typeof b!=="number")return b.bm()
if(Math.abs(a-z)<Math.abs(b-z)&&a>0)z=a
else z=b
return z}},fm:{"^":"a;a,b,c,d,e"},bp:{"^":"hE;"},O:{"^":"dp;0fy",
scz:function(a){this.fy=H.l(a,"$isa8",[A.O],"$asa8")},
gi:function(a){return this.c},
si:["cc",function(a,b){this.c=b
this.id=!0}],
gl:function(a){return this.d},
gbY:function(){var z,y
for(z=this;y=z.fy,y!=null;z=y);return z},
gO:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
if(this.id){this.id=!1
z=this.go
y=this.Q
x=this.r
w=this.x
v=this.y
u=this.z
if(x>-0.0001&&x<0.0001)x=x>=0?0.0001:-0.0001
if(w>-0.0001&&w<0.0001)w=w>=0?0.0001:-0.0001
if(v!==0||u!==0){t=u+y
s=x*Math.cos(t)
r=x*Math.sin(t)
t=v+y
q=-w*Math.sin(t)
p=w*Math.cos(t)
t=this.e
o=this.f
z.af(s,r,q,p,this.c-t*s-o*q,this.d-t*r-o*p)}else{t=this.e
o=this.f
if(y!==0){n=Math.cos(y)
m=Math.sin(y)
s=x*n
r=x*m
q=-w*m
p=w*n
z.af(s,r,q,p,this.c-t*s-o*q,this.d-t*r-o*p)}else z.af(x,0,0,w,this.c-t*x,this.d-o*w)}}return this.go},
dJ:function(b0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9
if(b0===this){z=new T.aw(new Float32Array(16))
z.X()
return z}y=this.en(b0)
if(y==null)return
x=new T.aw(new Float32Array(16))
x.X()
for(w=this;w!==y;w=w.fy)x.d1(w.gO())
if(b0===y)return x
v=new T.aw(new Float32Array(16))
v.X()
for(w=b0;w!==y;w=w.fy)v.d1(w.gO())
z=v.a
u=z[0]
t=z[1]
s=z[2]
r=z[3]
q=z[4]
p=z[5]
o=z[6]
n=z[7]
m=z[8]
l=z[9]
k=z[10]
j=z[11]
i=z[12]
h=z[13]
g=z[14]
f=z[15]
e=u*p-q*t
d=u*l-m*t
c=u*h-i*t
b=q*l-m*p
a=q*h-i*p
a0=m*h-i*l
a1=s*n-o*r
a2=s*j-k*r
a3=s*f-g*r
a4=o*j-k*n
a5=o*f-g*n
a6=k*f-g*j
a7=e*a6-d*a5+c*a4+b*a3-a*a2+a0*a1
if(a7!==0){a8=1/a7
z[0]=(p*a6-l*a5+h*a4)*a8
a9=-t
z[1]=(a9*a6+l*a3-h*a2)*a8
z[2]=(t*a5-p*a3+h*a1)*a8
z[3]=(a9*a4+p*a2-l*a1)*a8
z[4]=(-q*a6+m*a5-i*a4)*a8
z[5]=(u*a6-m*a3+i*a2)*a8
z[6]=(-u*a5+q*a3-i*a1)*a8
z[7]=(u*a4-q*a2+m*a1)*a8
z[8]=(n*a0-j*a+f*b)*a8
a9=-r
z[9]=(a9*a0+j*c-f*d)*a8
z[10]=(r*a-n*c+f*e)*a8
z[11]=(a9*b+n*d-j*e)*a8
z[12]=(-o*a0+k*a-g*b)*a8
z[13]=(s*a0-k*c+g*d)*a8
z[14]=(-s*a+o*c-g*e)*a8
z[15]=(s*b-o*d+k*e)*a8}x.aY(x,v)
return x},
gA:function(){return new U.v(0,0,0,0,[P.m])},
gaV:function(){var z=this.gA()
return this.gO().ap(z,z)},
dE:function(a){var z,y
z=this.gA()
y=this.dJ(a)
if(y==null)return
return y.ap(z,z)},
fM:function(a){var z,y,x,w,v,u
z=a.dE(this)
if(z==null)return!1
y=this.gA()
H.l(z,"$isP",[P.m],"$asP")
x=y.a
w=z.a
v=H.c(z,0)
if(x<H.h(w+z.c,v)){u=H.c(y,0)
if(H.h(x+y.c,u)>w){x=y.b
w=z.b
y=x<H.h(w+z.d,v)&&H.h(x+y.d,u)>w}else y=!1}else y=!1
return y},
a2:function(a,b){return this.gA().aX(0,a,b)?this:null},
K:function(a,b){var z,y
z=[P.m]
H.l(a,"$isE",z,"$asE")
H.l(b,"$isE",z,"$asE")
y=H.z(b,"$isE",z,null)?b:new U.E(0,0,z)
y.si(0,a.a)
y.sl(0,a.b)
this.cw(y)
return y},
cw:function(a){var z,y,x,w,v,u
z=[P.m]
H.l(a,"$isE",z,"$asE")
y=this.fy
if(y!=null)y.cw(a)
x=H.z(a,"$isE",z,null)?a:new U.E(0,0,z)
w=a.a
v=a.b
u=this.gO()
z=u.a
x.si(0,(z[3]*(w-z[4])-z[2]*(v-z[5]))/u.gbF())
x.sl(0,(z[0]*(v-z[5])-z[1]*(w-z[4]))/u.gbF())},
n:function(a,b){var z,y,x,w,v
z=H.k([],[R.dp])
for(y=this.fy;y!=null;y=y.fy)C.b.k(z,y)
x=z.length-1
while(!0){if(!(x>=0&&b.gcW()))break
if(x<0||x>=z.length)return H.b(z,x)
z[x].bG(b,this,C.z);--x}this.bG(b,this,C.e)
w=b.b
x=0
while(!0){v=z.length
if(!(x<v&&w))break
if(x>=v)return H.b(z,x)
z[x].bG(b,this,C.X);++x}},
an:function(a){},
en:function(a){var z,y,x,w,v
for(z=0,y=this;y=y.fy,y!=null;)++z
for(y=a,x=0;y=y.fy,y!=null;)++x
for(w=this;z>x;){w=w.fy;--z}for(v=a;x>z;){v=v.fy;--x}for(;w==null?v!=null:w!==v;){w=w.fy
v=v.fy}return w},
$iskD:1},bt:{"^":"aQ;",
aj:function(a){var z,y,x,w
if(a===this)throw H.d(P.ae("An object cannot be added as a child of itself."))
else{z=a.fy
if(z===this)this.e5(a)
else{if(z!=null){y=z.u
x=C.b.fO(y,a)
a.n(0,new R.R("removed",!0,C.e,!1,!1))
w=z.gbY()
if((w instanceof A.a0?w:null)!=null)z.cu(a,"removedFromStage")
a.scz(null)
C.b.bW(y,x)}this.f4(a)
C.b.k(this.u,a)
a.scz(this)
a.n(0,new R.R("added",!0,C.e,!1,!1))
w=this.gbY()
if((w instanceof A.a0?w:null)!=null)this.cu(a,"addedToStage")}}},
gA:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.u
if(z.length===0)return A.O.prototype.gA.call(this)
for(y=1/0,x=1/0,w=-1/0,v=-1/0,u=0;u<z.length;++u){t=z[u]
s=t.gA()
s=t.gO().ap(s,s)
r=s.a
if(r<y)y=r
q=s.b
if(q<x)x=q
t=H.c(s,0)
p=H.h(r+s.c,t)
if(p>w)w=p
o=H.h(q+s.d,t)
if(o>v)v=o}return new U.v(y,x,w-y,v-x,[P.m])},
a2:["bn",function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
for(z=this.u,y=z.length-1,x=null;y>=0;--y){if(y>=z.length)return H.b(z,y)
w=z[y]
v=w.gO()
if(w.cx&&!0){u=v.a
t=a-u[4]
s=b-u[5]
r=u[3]
q=u[2]
p=u[0]
u=u[1]
o=p*r-u*q
n=w.a2((r*t-q*s)/o,(p*s-u*t)/o)
if(n==null)continue
if(!!n.$isaQ&&!0)return n
x=this}}return x}],
an:["dS",function(a){var z,y,x
for(z=this.u,y=0;y<z.length;++y){x=z[y]
if(x.cx&&!0)a.bX(x)}}],
f4:function(a){var z
for(z=this;z!=null;z=z.fy)if(z===a)throw H.d(P.ae("An object cannot be added as a child to one of it's children (or children's children, etc.)."))},
e5:function(a){var z,y,x,w
z=this.u
for(y=z.length-1,x=a;y>=0;--y,x=w){if(y>=z.length)return H.b(z,y)
w=z[y]
C.b.w(z,y,x)
if(a===w)break}},
cu:function(a,b){var z,y
z=!1
y=this
while(!0){if(!(y!=null&&!z))break
if(y.bS(b,!0))z=!0
y=y.fy}this.cv(a,new R.R(b,!1,C.e,!1,!1),z)},
cv:function(a,b,c){var z,y,x
z=!c
if(!z||a.fL(b.a))a.n(0,b)
if(!!a.$isbt){c=!z||a.bS(b.a,!0)
y=a.u
for(x=0;x<y.length;++x)this.cv(y[x],b,c)}},
$isa8:1,
$asa8:function(){return[A.O]}},aQ:{"^":"O;"},hF:{"^":"hG;b,c,d,e,f,a",
aT:function(a){var z
this.f+=a
z=this.d
z.db=a
R.cK(z,$.$get$cM(),R.bu)
this.b.aT(a)
z=this.c
C.b.ac(z,new A.hH(a))
C.b.ac(z,new A.hI(this,a))
R.cK(this.e,$.$get$cN(),R.bx)}},hH:{"^":"j:19;a",
$1:function(a){H.i(a,"$isa0").fA.aT(this.a)
return!0}},hI:{"^":"j:20;a,b",
$1:function(a){var z,y,x,w,v,u
H.i(a,"$isa0")
z=this.a.f
y=a.b1
if(y!==C.w)y=y===C.R
else y=!0
if(y){if($.cz==null){H.hv()
$.cz=$.bG}y=H.G($.bH.$0())
if(typeof y!=="number")return y.bm()
y-=0
a.cJ()
R.cK(a.fw,$.$get$cT(),R.bL)
a.U.aG(0)
x=a.U
w=x.a
w.a=0
w.b=0
w.c=0
x.av(0,a.bK)
a.S.dt(0,a.dj)
a.S.a=V.X(z)
a.S.b=V.X(this.b)
a.S.bX(a)
a.S.c.I(0)
a.fE=!1
v=a.U.a
z=H.G($.bH.$0())
if(typeof z!=="number")return z.bm()
x=$.cz
if(typeof x!=="number")return H.J(x)
u=C.i.dW((z-y)*1000,x)
a.bO=a.bO*0.75+v.a*0.25
a.bP=a.bP*0.75+v.b*0.25
a.bQ=a.bQ*0.75+v.c*0.25
a.bN=a.bN*0.95+u*0.05
z=a.ab
if(z.cx){z.cy
y=!0}else y=!1
if(y){C.b.sm(z.r2,0)
z.rx=0
z.ry=0
a.ab.bc(0,"FRAMETIME"+C.f.bb(C.i.h(C.d.B(a.bN)),6))
a.ab.bc(0,"DRAWCALLS"+C.f.bb(C.i.h(C.d.B(a.bO)),6))
a.ab.bc(0,"VERTICES"+C.f.bb(C.i.h(C.d.B(a.bP)),7))
a.ab.bc(0,"INDICES"+C.f.bb(C.i.h(C.d.B(a.bQ)),8))
a.S.dt(0,a.d5)
a.S.bX(a.ab)
a.S.c.I(0)}}if(a.b1===C.R)a.b1=C.ad
return}},dX:{"^":"O;k3,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,0db,0dx,dy,0fr,fx,0fy,go,id,0k1,0a",
gA:function(){var z=this.k3.gA()
return z},
a2:function(a,b){if(this.k3.b6(a,b))return this
return},
an:function(a){var z,y,x,w,v
z=this.k3
y=a.c
if(y instanceof L.cu){x=z.aK(!1)
w=y.e
y.bl(0,a.e.c)
v=a.e.a
y.x=v
w.globalAlpha=v
w.beginPath()
z.aP(new U.iX(a,y,w),x)}else{x=z.aK(!0)
z.aP(new U.j_(a,new U.bi(H.k([],[U.ai]))),x)}}},cx:{"^":"bt;",
gA:function(){var z=A.bt.prototype.gA.call(this)
return z},
a2:function(a,b){var z=this.bn(a,b)
return z},
an:function(a){this.dS(a)}},cy:{"^":"a;a,b",
h:function(a){return this.b}},bO:{"^":"a;a,b",
h:function(a){return this.b}},aa:{"^":"a;a,b",
h:function(a){return this.b}},a0:{"^":"bt;0N,0U,0am,0ab,df,dg,dh,di,b4,fE,bN,bO,bP,bQ,fF,b5,dj,d5,fw,0S,bH,b1,d6,d7,d8,d9,0bI,da,dc,fz,fA,0bJ,bK,fB,F,M,ax,u,aa,ay,k3,k4,r1,r2,rx,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,0db,0dx,dy,0fr,fx,0fy,go,id,0k1,0a",
sex:function(a){this.d9=H.l(a,"$isE",[P.m],"$asE")},
dY:function(a,b,c,d){var z,y,x,w
z=a.tabIndex
if(typeof z!=="number")return z.hk()
if(z<=0)a.tabIndex=1
z=a.style
if(z.outline==="")z.outline="none"
this.bK=c.f
this.fB=!0
this.F=!0
this.M=!1
this.ax=!1
this.N=a
this.d7=c.e
this.d6=c.d
this.b1=c.c
this.bH=c.b
this.df=V.b1(d)
this.dg=V.b1(b)
this.b4=V.jX(c.y,$.$get$cX())
z=this.ef(a,c)
this.U=z
this.S=L.hN(z,null,null,null)
z=H.k([],[L.dV])
y=T.D()
x=H.k([],[P.x])
w=$.K
$.K=w+1
w=new A.hX("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcAAAAAOAQAAAACQy/GuAAABsElEQVR4Aa3OMWsTUQDA8f97eV6fEpvT6YZgX4qDYwoOAdE+IQ5OfoXzG7S46KA8HZSC1PQLaNCln8ElFxyaQWg3XZQLBAyi5BqjJDHeE7whoE7i7xP8+He1Wq38WGkLIFmyphryV2JQAQnIhwE6tQCR6Sc3dq80tsBmQVTrHlSeVZvT8flwr3p7u3/Q27va3MnMWKEA2e0oRAjI8uWN1f3rZ9YjhNNU392Ud7bPckGuf9LB62sblQ874E3OqbEEefRyrsNRywFs5sL5FOIuizSqQ0IO2JMApMAA4DQS/77+dZEBgMIhVor/Wi6nkAIgHAvAw0zTCz3fkCDOubJD3IorDgifH+8yydrNvleQsLIaNPDuB1zkMIH+8MjACAknnr564vCf28dOg4n5QrnFAoFu1JmNF70i3MPGQIT1DiTp91h0gAQAbGkfBeRrcjrYwgAImAOMYf7rDUhAKchC7rsgRDyYxYCLO33FoAUWBaTkFD5WgQQkhnzzkqMweTtq+7tMhnin9YTDF4/chDftUsKcoW97B2RQEIC24GDJWsNvDAWRVrjHUgmWhOMPEf/DT5NSmGlKVHTvAAAAAElFTkSuQmCC",z,y,x,0,0,w,0,0,0,0,1,1,0,0,0,1,!0,!1,H.k([],[A.bp]),"",T.D(),!0)
A.fn("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcAAAAAOAQAAAACQy/GuAAABsElEQVR4Aa3OMWsTUQDA8f97eV6fEpvT6YZgX4qDYwoOAdE+IQ5OfoXzG7S46KA8HZSC1PQLaNCln8ElFxyaQWg3XZQLBAyi5BqjJDHeE7whoE7i7xP8+He1Wq38WGkLIFmyphryV2JQAQnIhwE6tQCR6Sc3dq80tsBmQVTrHlSeVZvT8flwr3p7u3/Q27va3MnMWKEA2e0oRAjI8uWN1f3rZ9YjhNNU392Ud7bPckGuf9LB62sblQ874E3OqbEEefRyrsNRywFs5sL5FOIuizSqQ0IO2JMApMAA4DQS/77+dZEBgMIhVor/Wi6nkAIgHAvAw0zTCz3fkCDOubJD3IorDgifH+8yydrNvleQsLIaNPDuB1zkMIH+8MjACAknnr564vCf28dOg4n5QrnFAoFu1JmNF70i3MPGQIT1DiTp91h0gAQAbGkfBeRrcjrYwgAImAOMYf7rDUhAKchC7rsgRDyYxYCLO33FoAUWBaTkFD5WgQQkhnzzkqMweTtq+7tMhnin9YTDF4/chDftUsKcoW97B2RQEIC24GDJWsNvDAWRVrjHUgmWhOMPEf/DT5NSmGlKVHTvAAAAAElFTkSuQmCC",null).c0(w.ge9(),-1)
w.cx=!1
this.ab=w
P.Y("StageXL render engine : "+this.U.gds().h(0))
z=W.b9
y=H.e(this.geI(),{func:1,ret:-1,args:[z]})
W.B(a,"keydown",y,!1,z)
W.B(a,"keyup",y,!1,z)
W.B(a,"keypress",y,!1,z)
z=this.bH
if(z===C.t||z===C.B){z=W.aT
y=H.e(this.geK(),{func:1,ret:-1,args:[z]})
W.B(a,"mousedown",y,!1,z)
W.B(a,"mouseup",y,!1,z)
W.B(a,"mousemove",y,!1,z)
W.B(a,"mouseout",y,!1,z)
W.B(a,"contextmenu",y,!1,z)
z=W.aX
W.B(a,H.t(W.fG(a)),H.e(this.geL(),{func:1,ret:-1,args:[z]}),!1,z)}z=this.bH
if((z===C.Y||z===C.B)&&$.$get$eZ()){z=W.bf
y=H.e(this.geN(),{func:1,ret:-1,args:[z]})
W.B(a,"touchstart",y,!1,z)
W.B(a,"touchend",y,!1,z)
W.B(a,"touchmove",y,!1,z)
W.B(a,"touchenter",y,!1,z)
W.B(a,"touchleave",y,!1,z)
W.B(a,"touchcancel",y,!1,z)}$.$get$dL().fU(new A.i1(this))
this.bB()
this.cJ()
this.U.av(0,this.bK)},
a2:function(a,b){var z=this.bn(a,b)
return z!=null?z:this},
ef:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=b.a
if(z===C.u)try{z=new T.aw(new Float32Array(16))
z.X()
y=H.k([],[L.j1])
x=P.x
w=[x,P.w]
v=[x,P.cE]
u=new Int16Array(0)
u=new L.hJ(-1,new H.V(0,0,w),new H.V(0,0,v),new L.bI(u,35048,0,0,-1),new L.bJ(new Float32Array(0),35048,0,0,-1),new L.aV(0,0,0))
t=new Int16Array(0)
s=new Float32Array(0)
r=new Int16Array(0)
q=new Float32Array(0)
p=new Int16Array(16384)
o=new Float32Array(32768)
n=new Array(8)
n.fixed$length=Array
n=H.k(n,[L.cv])
m=H.k([],[L.dT])
l=[L.bc]
z=new L.hD(a,z,y,!0,0,u,new L.hK(-1,new H.V(0,0,w),new H.V(0,0,v),new L.bI(t,35048,0,0,-1),new L.bJ(s,35048,0,0,-1),new L.aV(0,0,0)),new L.hL(-1,new H.V(0,0,w),new H.V(0,0,v),new L.bI(r,35048,0,0,-1),new L.bJ(q,35048,0,0,-1),new L.aV(0,0,0)),new L.bI(p,35048,0,0,-1),new L.bJ(o,35048,0,0,-1),n,m,new H.V(0,0,[x,L.bM]),new L.aV(0,0,0),new P.ab(null,null,0,l),new P.ab(null,null,0,l))
y=P.aN
w={func:1,ret:-1,args:[y]}
W.B(a,"webglcontextlost",H.e(z.geA(),w),!1,y)
W.B(a,"webglcontextrestored",H.e(z.geB(),w),!1,y)
b=P.h7(["alpha",!1,"depth",!1,"stencil",!0,"antialias",!1,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1],x,null)
k=C.r.c5(a,"webgl",b)
k=H.i(k==null?C.r.c5(a,"experimental-webgl",b):k,"$isbN")
if(!J.r(k).$isbN)H.M(P.a6("Failed to get WebGL context."))
z.e=k;(k&&C.a).b_(k,3042)
y=z.e;(y&&C.a).a9(y,2960)
y=z.e;(y&&C.a).a9(y,2929)
y=z.e;(y&&C.a).a9(y,2884)
y=z.e;(y&&C.a).h0(y,37441,1)
y=z.e;(y&&C.a).cT(y,1,771)
z.x=u
u.aQ(z)
z.ch=!0
u=$.bK+1
$.bK=u
z.cx=u
z.aG(0)
return z}catch(j){H.Z(j)
z=T.D()
y=a.getContext("2d")
x=[L.bc]
z=new L.cu(a,y,z,C.j,1,new L.aV(0,0,0),new P.ab(null,null,0,x),new P.ab(null,null,0,x))
z.aG(0)
return z}else if(z===C.I){z=T.D()
y=a.getContext("2d")
x=[L.bc]
z=new L.cu(a,y,z,C.j,1,new L.aV(0,0,0),new P.ab(null,null,0,x),new P.ab(null,null,0,x))
z.aG(0)
return z}else throw H.d(P.a6("Unknown RenderEngine"))},
cJ:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.df
y=this.dg
x=this.N.getBoundingClientRect()
w=this.N
v=w.clientLeft
u=C.d.B(x.left)
if(typeof v!=="number")return v.W()
t=w.clientTop
s=C.d.B(x.top)
if(typeof t!=="number")return t.W()
r=w.clientWidth
q=w.clientHeight
if(r===0||q===0)return
if(typeof r!=="number")return r.c4()
p=r/z
if(typeof q!=="number")return q.c4()
o=q/y
switch(this.d6){case C.S:n=o
m=p
break
case C.ae:n=p>o?p:o
m=n
break
case C.af:m=1
n=1
break
case C.x:n=p<o?p:o
m=n
break
default:m=1
n=1}w=this.d7
switch(w){case C.M:case C.O:case C.v:l=0
break
case C.K:case C.q:case C.P:l=(r-z*m)/2
break
case C.L:case C.N:case C.Q:l=r-z*m
break
default:l=0}switch(w){case C.v:case C.K:case C.L:k=0
break
case C.M:case C.q:case C.N:k=(q-y*n)/2
break
case C.O:case C.P:case C.Q:k=q-y*n
break
default:k=0}w=this.fF
w.sV(0,-l/m)
w.sa5(0,-k/n)
w.sa6(0,r/m)
w.sa1(0,q/n)
w=this.dj
w.af(m,0,0,n,l,k)
j=this.b4
w.bk(0,j,j)
j=this.b5
j.af(1,0,0,1,-(v+u)-l,-(t+s)-k)
j.bk(0,1/m,1/n)
j=this.d5
j.dm()
s=this.b4
j.bk(0,s,s)
if(this.dh!==r||this.di!==q){this.dh=r
this.di=q
w=this.N
v=this.b4
if(typeof v!=="number")return H.J(v)
w.width=C.d.B(r*v)
w.height=C.d.B(q*v)
if(w.clientWidth!==r||w.clientHeight!==q){w=w.style
v=""+r+"px"
w.width=v
w=this.N.style
v=""+q+"px"
w.height=v}this.n(0,new R.R("resize",!1,C.e,!1,!1))}},
bB:function(){var z,y,x,w,v,u,t,s,r,q
z=this.bI
y=$.hj
if(z!=null&&y==="auto"){x=z.r1
if(x!=="auto")y=x}if(y==="auto")y="default"
if(this.d8!=y){this.d8=y
w=this.N.style
if($.$get$cp().d2(y)){v=$.$get$cp().C(0,y)
u=C.o.ghP(v)
t=v.gfN()
s=t.gi(t)
t=v.gfN()
r=t.gl(t)
q="url('"+H.f(u)+"') "+H.f(s)+" "+H.f(r)+", "+H.f(y)}else q=y
t=$.hi?"none":q
w.toString
w.cursor=t==null?"":t}},
hy:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
H.i(a,"$isaT")
a.preventDefault()
z=Date.now()
y=a.button
x=P.m
w=this.b5.c1(new P.a5(a.clientX,a.clientY,[x]))
v=new U.E(0,0,[x])
if(typeof y!=="number")return y.c6()
if(y<0||y>2)return
if(a.type==="mousemove"&&this.d9.J(0,w))return
x=this.fz
if(y<0||y>=3)return H.b(x,y)
u=x[y]
this.sex(w)
C.b.ac(this.da,new A.hZ(w))
if(a.type!=="mouseout")t=H.d0(this.a2(w.a,w.b),"$isaQ")
else{this.n(0,new R.R("mouseLeave",!1,C.e,!1,!1))
t=null}s=this.bI
if(s==null?t!=null:s!==t){x=[A.O]
r=H.k([],x)
q=H.k([],x)
for(p=s;p!=null;p=p.fy)C.b.k(r,p)
for(p=t;p!=null;p=p.fy)C.b.k(q,p)
for(x=r.length,o=q.length,n=0;!0;++n){if(n===x)break
if(n===o)break
m=x-n-1
if(m<0)return H.b(r,m)
l=r[m]
m=o-n-1
if(m<0)return H.b(q,m)
if(l!==q[m])break}if(s!=null){s.K(w,v)
x=v.a
o=v.b
m=w.a
k=w.b
j=a.altKey
i=a.ctrlKey
h=a.shiftKey
s.n(0,new R.N(0,0,u.f,0,x,o,m,k,j,i,h,!1,"mouseOut",!0,C.e,!1,!1))}for(g=0;g<r.length-n;++g){f=r[g]
f.K(w,v)
x=v.a
o=v.b
m=w.a
k=w.b
j=a.altKey
i=a.ctrlKey
h=a.shiftKey
f.n(0,new R.N(0,0,u.f,0,x,o,m,k,j,i,h,!1,"rollOut",!1,C.e,!1,!1))}for(g=q.length-n-1;g>=0;--g){if(g>=q.length)return H.b(q,g)
f=q[g]
f.K(w,v)
x=v.a
o=v.b
m=w.a
k=w.b
j=a.altKey
i=a.ctrlKey
h=a.shiftKey
f.n(0,new R.N(0,0,u.f,0,x,o,m,k,j,i,h,!1,"rollOver",!1,C.e,!1,!1))}if(t!=null){t.K(w,v)
x=v.a
o=v.b
m=w.a
k=w.b
j=a.altKey
i=a.ctrlKey
h=a.shiftKey
t.n(0,new R.N(0,0,u.f,0,x,o,m,k,j,i,h,!1,"mouseOver",!0,C.e,!1,!1))}this.bI=t}this.bB()
if(a.type==="mousedown"){this.N.focus()
e=u.a
x=u.e
if((t==null?x!=null:t!==x)||z>u.r+500)u.x=0
u.f=!0
u.e=t
u.r=z;++u.x}else e=null
if(a.type==="mouseup"){e=u.b
u.f=!1
z=u.e
d=z==null?t==null:z===t
d}else d=!1
z=a.type
if(z==="mousemove")e="mouseMove"
if(z==="contextmenu")e="contextMenu"
if(e!=null&&t!=null){t.K(w,v)
z=v.a
x=v.b
o=w.a
m=w.b
k=a.altKey
j=a.ctrlKey
i=a.shiftKey
t.n(0,new R.N(0,0,u.f,u.x,z,x,o,m,k,j,i,!1,e,!0,C.e,!1,!1))
if(d){z=v.a
x=v.b
o=w.a
m=w.b
k=a.altKey
j=a.ctrlKey
i=a.shiftKey
t.n(0,new R.N(0,0,u.f,0,z,x,o,m,k,j,i,!1,u.c,!0,C.e,!1,!1))}}},"$1","geK",4,0,21],
hz:[function(a){var z,y,x,w,v,u,t,s,r,q
H.i(a,"$isaX")
z=P.m
y=this.b5.c1(new P.a5(a.clientX,a.clientY,[z]))
x=new U.E(0,0,[z])
w=H.d0(this.a2(y.a,y.b),"$isaQ")
w.K(y,x)
z=x.a
v=x.b
u=y.a
t=y.b
s=a.altKey
r=a.ctrlKey
q=a.shiftKey
w.n(0,new R.N((a&&C.T).gfo(a),C.T.gfp(a),!1,0,z,v,u,t,s,r,q,!1,"mouseWheel",!0,C.e,!1,!1))},"$1","geL",4,0,22],
hB:[function(b2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1
H.i(b2,"$isbf")
b2.preventDefault()
z=b2.type
y=b2.altKey
x=b2.ctrlKey
w=b2.shiftKey
for(v=b2.changedTouches,u=v.length,t=z==="touchmove",s=z==="touchcancel",r=z==="touchend",q=z==="touchstart",p=this.dc,o=this.da,n=P.m,m=[n],l=this.b5,n=[n],k=[A.O],j=0;j<v.length;v.length===u||(0,H.an)(v),++j){i=v[j]
h=i.identifier
g=l.c1(new P.a5(C.d.B(i.clientX),C.d.B(i.clientY),m))
f=new U.E(0,0,n)
e=this.bn(g.a,g.b)
e=H.d0(e!=null?e:this,"$isaQ")
d=p.dr(h,new A.i_(this,e))
c=d.a
b=d.b
C.b.ac(o,new A.i0(c,g))
a=d.d
if(a!==e){a0=H.k([],k)
a1=H.k([],k)
for(a2=a;a2!=null;a2=a2.fy)C.b.k(a0,a2)
for(a2=e;a2!=null;a2=a2.fy)C.b.k(a1,a2)
for(a3=a0.length,a4=a1.length,a5=0;!0;++a5){if(a5===a3)break
if(a5===a4)break
a6=a3-a5-1
if(a6<0)return H.b(a0,a6)
a7=a0[a6]
a6=a4-a5-1
if(a6<0)return H.b(a1,a6)
if(a7!==a1[a6])break}if(a!=null){a.K(g,f)
a.n(0,new R.aW(c,b,f.a,f.b,g.a,g.b,y,x,w,!1,"touchOut",!0,C.e,!1,!1))}for(a8=0;a8<a0.length-a5;++a8){a9=a0[a8]
a9.K(g,f)
a9.n(0,new R.aW(c,b,f.a,f.b,g.a,g.b,y,x,w,!1,"touchRollOut",!1,C.e,!1,!1))}for(a8=a1.length-a5-1;a8>=0;--a8){if(a8>=a1.length)return H.b(a1,a8)
a9=a1[a8]
a9.K(g,f)
a9.n(0,new R.aW(c,b,f.a,f.b,g.a,g.b,y,x,w,!1,"touchRollOver",!1,C.e,!1,!1))}e.K(g,f)
e.n(0,new R.aW(c,b,f.a,f.b,g.a,g.b,y,x,w,!1,"touchOver",!0,C.e,!1,!1))
d.d=e}if(q){this.N.focus()
p.w(0,h,d)
b0="touchBegin"}else b0=null
if(r){p.bd(0,h)
b1=d.c===e
b0="touchEnd"}else b1=!1
if(s){p.bd(0,h)
b0="touchCancel"}if(t)b0="touchMove"
if(b0!=null&&!0){e.K(g,f)
e.n(0,new R.aW(c,b,f.a,f.b,g.a,g.b,y,x,w,!1,b0,!0,C.e,!1,!1))
if(b1)e.n(0,new R.aW(c,b,f.a,f.b,g.a,g.b,y,x,w,!1,"touchTap",!0,C.e,!1,!1))}}},"$1","geN",4,0,23],
hw:[function(a){var z,y,x,w,v,u,t
H.i(a,"$isb9")
z=this.bJ
if(z==null)return
y=a.type
if(y==="keypress"){x=a.charCode
if(a.keyCode===13)x=13
if(x===0)return
w=new R.be(P.i7(H.k([x],[P.w]),0,null),!1,"textInput",!0,C.e,!1,!1)
this.bJ.n(0,w)
if(w.y)a.preventDefault()}else{v=y==="keyup"?"keyUp":""
if(y==="keydown")v="keyDown"
y=a.location
u=y===1?C.a8:C.a7
if(y===2)u=C.a9
if(y===3)u=C.aa
if(y===5)u=C.E
if(y===4)u=C.E
t=new R.a9(a.keyCode,u,a.altKey,a.ctrlKey,a.shiftKey,!1,v,!0,C.e,!1,!1)
z.n(0,t)
if(t.cx)a.preventDefault()}},"$1","geI",4,0,24],
j:{
hW:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
z=P.m
y=T.D()
x=T.D()
w=T.D()
v=H.k([],[A.bg])
u=H.k([new A.bW("mouseDown","mouseUp","click","doubleClick",!1,0,0),new A.bW("middleMouseDown","middleMouseUp","middleClick","middleClick",!1,0,0),new A.bW("rightMouseDown","rightMouseUp","rightClick","rightClick",!1,0,0)],[A.bW])
t=K.dE()
s=H.k([],[A.O])
r=$.K
$.K=r+1
r=new A.a0(0,0,0,0,1,!1,0,0,0,0,new U.v(0,0,0,0,[z]),y,x,w,new R.bL("render",!1,C.e,!1,!1),C.t,C.w,C.x,C.q,"default",new U.E(0,0,[z]),v,new H.V(0,0,[P.w,A.bX]),u,t,4294967295,!0,!0,!1,!1,s,!0,!0,!1,!0,"auto",!0,0,r,0,0,0,0,1,1,0,0,0,1,!0,!1,H.k([],[A.bp]),"",T.D(),!0)
r.dY(a,b,c,d)
return r}}},i1:{"^":"j:25;a",
$1:function(a){H.t(a)
return this.a.bB()}},hZ:{"^":"j:8;a",
$1:function(a){return H.i(a,"$isbg").he(0,this.a)}},i_:{"^":"j:27;a,b",
$0:function(){var z,y,x
z=this.b
y=this.a.dc.a
x=$.ev
$.ev=x+1
return new A.bX(x,y===0,z,z)}},i0:{"^":"j:8;a,b",
$1:function(a){return H.i(a,"$isbg").he(this.a,this.b)}},hX:{"^":"O;k3,k4,r1,r2,rx,ry,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,0db,0dx,dy,0fr,fx,0fy,go,id,0k1,0a",
bc:function(a,b){var z,y
C.b.k(this.r2,b)
z=b.length
y=this.rx
this.rx=z>y?z:y;++this.ry},
an:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
this.n(0,new R.R("Update",!1,C.e,!1,!1))
for(z=this.k4,y=a.c,x=this.r1,w=this.r2,v=0;v<this.ry;++v)for(u=v*14,t=0;t<this.rx;++t){if(v>=w.length)return H.b(w,v)
s=w[v]
r=t<s.length?C.f.aI(s,t)-32:0
if(r<0||r>=64)r=0
x.af(1,0,0,1,t*7,u)
q=a.e
p=q.f
if(p==null){s=T.D()
o=new T.aw(new Float32Array(16))
o.X()
p=new L.cG(1,C.j,s,o,q)
q.f=p}p.c.aY(x,q.c)
p.b=C.j
p.a=q.a
a.e=p
if(r<0||r>=z.length)return H.b(z,r)
y.aF(a,z[r])
a.e=a.e.e}},
ho:[function(a8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
z=H.i(a8,"$isas").c
y=z.a
y.sfG(C.ac)
for(x=[P.w],w=this.k4,v=[P.m],u=z.e,t=0*u,s=z.d,r=z.b,q=H.c(r,0),z=z.c,p=0;p<64;++p){o=p*7
n=H.l(new U.v(o,0,7,14,x),"$isv",v,"$asv")
m=C.d.B(o*u)
l=C.d.B(t)
n=H.c(n,0)
o=C.d.B(H.h(o+7,n)*u)-m
n=C.d.B(H.h(14,n)*u)-l
k=r.a
j=r.b
i=H.h(k+r.c,q)
h=H.h(j+r.d,q)
g=z.a
f=z.b
e=C.i.c7(s,4)
d=m+o
c=l+n
if(s===0){b=k+g
a=b+m
a0=j+f
a1=a0+l
a2=b+d
a3=a0+c}else if(s===1){b=i-f
a=b-c
a0=j+g
a1=a0+m
a2=b-l
a3=a0+d}else if(s===2){b=i-g
a=b-d
a0=h-f
a1=a0-c
a2=b-m
a3=a0-l}else if(s===3){b=k+f
a=b+l
a0=h-g
a1=a0-d
a2=b+c
a3=a0-m}else{a=0
a1=0
a2=0
a3=0}a4=V.c0(a,k,i)
a5=V.c0(a1,j,h)
d=V.c0(a2,k,i)
c=V.c0(a3,j,h)
if(e===0){a6=a-a4
a7=a1-a5}else if(e===1){a6=a1-a5
a7=d-a2}else if(e===2){a6=d-a2
a7=a3-c}else if(e===3){a6=c-a3
a7=a4-a}else{a6=0
a7=0}C.b.k(w,L.cw(y,new U.v(a4,a5,d-a4,c-a5,x),new U.v(a6,a7,o,n,x),e,u))}},"$1","ge9",4,0,42]},hY:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx"},bW:{"^":"a;a,b,c,d,0e,f,r,x"},bX:{"^":"a;a,b,c,d"},bg:{"^":"a;"}}],["","",,U,{"^":"",fP:{"^":"b5;"},ds:{"^":"fP;c,0a",
bh:function(a){a.aD(this.c)}},fQ:{"^":"b5;b,c,d,e,0a",
gi:function(a){return this.b},
gl:function(a){return this.c},
bh:function(a){var z,y,x
z=this.b
y=this.c
a.a4(0,z,y)
x=z+this.d
a.a3(0,x,y)
y+=this.e
a.a3(0,x,y)
a.a3(0,z,y)
a.cZ(0)},
j:{
dt:function(a,b,c,d){return new U.fQ(a,b,c,d)}}},dr:{"^":"a;a,b,0c",
scm:function(a){this.c=H.l(a,"$isv",[P.m],"$asv")},
aS:function(a){if(a.a!=null&&!0)H.M(P.ae("Command is already assigned to graphics."))
else a.a=this
C.b.k(this.a,a)
C.b.sm(this.b,0)
this.scm(null)},
gA:function(){var z,y,x
if(this.c==null){z=this.aK(!0)
y=new U.iW(17976931348623157e292,17976931348623157e292,-17976931348623157e292,-17976931348623157e292,new U.bi(H.k([],[U.ai])))
this.aP(y,z)
this.scm(y.gA())}x=this.c
return new U.v(x.a,x.b,x.c,x.d,[H.c(x,0)])},
b6:function(a,b){var z,y
if(this.gA().aX(0,a,b)){z=this.aK(!0)
y=new U.iZ(!1,a,b,new U.bi(H.k([],[U.ai])))
this.aP(y,z)
return y.b}else return!1},
aK:function(a){var z,y,x,w
if(a&&this.b.length===0){z=new U.iY(this.b,new U.bi(H.k([],[U.ai])))
for(y=this.a,x=y.length,w=0;w<y.length;y.length===x||(0,H.an)(y),++w)y[w].bh(z)}return a?this.b:this.a},
aP:function(a,b){var z
H.l(b,"$isu",[U.b5],"$asu")
for(z=0;z<b.length;++z)b[z].bh(a)}},b5:{"^":"a;"},du:{"^":"a;"},iV:{"^":"b5;b,c,0a",
bh:function(a){if(!!a.$isbh)a.ba(this)}},bh:{"^":"du;",
cZ:function(a){var z,y
z=this.a
y=z.b
if(y!=null){y.Q=!0
z.b=null}},
a4:function(a,b,c){this.a.a4(0,b,c)},
a3:function(a,b,c){var z,y
z=this.a
y=z.b
if(y==null)z.a4(0,b,c)
else y.bC(b,c)}},iW:{"^":"bh;b,c,d,e,a",
gA:function(){var z,y,x,w
z=this.b
y=this.d
x=z<y&&this.c<this.e
w=[P.m]
if(x){x=this.c
return new U.v(z,x,y-z,this.e-x,w)}else return new U.v(0,0,0,0,w)},
aD:function(a){this.cI(this.a)},
ba:function(a){this.cI(a.b)},
cI:function(a){var z,y,x,w,v,u
for(z=H.l(a,"$isbU",[U.em],"$asbU").a,y=z.length,x=0;x<y;++x){w=z[x]
v=this.b
u=w.e
this.b=v>u?u:v
v=this.c
u=w.f
this.c=v>u?u:v
v=this.d
u=w.r
this.d=v<u?u:v
v=this.e
u=w.x
this.e=v<u?u:v}}},iX:{"^":"du;a,b,c",
cZ:function(a){this.c.closePath()},
a4:function(a,b,c){var z=this.c;(z&&C.c).a4(z,b,c)},
a3:function(a,b,c){var z=this.c;(z&&C.c).a3(z,b,c)},
aD:function(a){var z=this.c
z.fillStyle=V.c1(a)
z.fill()}},iY:{"^":"bh;b,a",
aD:function(a){C.b.k(this.b,new U.iV(U.j0(this.a),a))},
ba:function(a){C.b.k(this.b,a)}},iZ:{"^":"bh;b,c,d,a",
aD:function(a){this.b=this.b||this.a.b6(this.c,this.d)},
ba:function(a){this.b=this.b||a.b.b6(this.c,this.d)}},j_:{"^":"bh;b,a",
aD:function(a){this.a.dk(this.b,a)},
ba:function(a){a.b.dk(this.b,a.c)}},bU:{"^":"a;$ti"},em:{"^":"a;",
e0:function(a){var z=a.c
this.c=z
this.d=a.d
this.e=a.e
this.f=a.f
this.r=a.r
this.x=a.x
C.F.ae(this.a,0,z*2,a.a)
C.G.ae(this.b,0,this.d,a.b)},
bC:["dV",function(a,b){var z,y,x,w,v,u
z=this.c*2
y=this.a
x=y.length
if(z+2>x){w=x<16?16:x
if(w>256)w=256
v=new Float32Array(x+w)
this.a=v
C.F.c9(v,0,y)}y=this.e
this.e=y>a?a:y
y=this.f
this.f=y>b?b:y
y=this.r
this.r=y<a?a:y
y=this.x
this.x=y<b?b:y
y=this.a
v=y.length
if(z>=v)return H.b(y,z)
y[z]=a
u=z+1
if(u>=v)return H.b(y,u)
y[u]=b
return this.c++}],
cN:function(a,b,c){var z,y,x,w,v,u
z=this.d
y=this.b
x=y.length
if(z+3>x){w=x<32?32:x
if(w>256)w=256
v=new Int16Array(x+w)
this.b=v
C.G.c9(v,0,y)}y=this.b
v=y.length
if(z>=v)return H.b(y,z)
y[z]=a
u=z+1
if(u>=v)return H.b(y,u)
y[u]=b
u=z+2
if(u>=v)return H.b(y,u)
y[u]=c
this.d+=3}},bi:{"^":"bU;0b,a",
e1:function(a){var z,y,x,w,v,u,t,s
for(z=a.a,y=z.length,x=this.a,w=0;w<z.length;z.length===y||(0,H.an)(z),++w){v=z[w]
if(v.d===0)v.bo()
u=T.D()
t=v.c
t=new Float32Array(t*2)
s=v.d
u=new U.ai(!1,t,new Int16Array(s),0,0,17976931348623157e292,17976931348623157e292,-17976931348623157e292,-17976931348623157e292,u)
u.e0(v)
t=v.z
if(typeof t!=="boolean"){t=v.cn()>=0
v.z=t}u.z=t
u.Q=v.Q
C.b.k(x,u)}},
a4:function(a,b,c){var z,y
z=T.D()
y=new Float32Array(16)
z=new U.ai(!1,y,new Int16Array(32),0,0,17976931348623157e292,17976931348623157e292,-17976931348623157e292,-17976931348623157e292,z)
this.b=z
z.bC(b,c)
C.b.k(this.a,this.b)},
dk:function(a,b){var z,y,x,w,v,u,t,s,r
for(z=this.a,y=z.length,x=a.c,w=0;w<z.length;z.length===y||(0,H.an)(z),++w){v=z[w]
if(v.d===0)v.bo()
u=v.b.buffer
t=v.d
u.toString
H.bZ(u,0,t)
s=new Int16Array(u,0,t)
u=v.a.buffer
t=v.c*2
u.toString
H.bZ(u,0,t)
r=new Float32Array(u,0,t)
x.be(a,s,r,b)}},
b6:function(a,b){var z,y,x,w,v
for(z=this.a,y=z.length,x=0,w=0;w<z.length;z.length===y||(0,H.an)(z),++w){v=z[w]
if(!(a>=v.e&&a<=v.r&&b>=v.f&&b<=v.x))continue
if(v.d===0)v.bo()
x+=v.hi(a,b)}return x!==0},
$asbU:function(){return[U.ai]},
j:{
j0:function(a){var z=new U.bi(H.k([],[U.ai]))
z.e1(a)
return z}}},ai:{"^":"em;0z,Q,a,b,c,d,e,f,r,x,y",
gfg:function(){var z=this.z
if(typeof z!=="boolean"){z=this.cn()>=0
this.z=z}return z},
bC:function(a,b){var z,y,x,w
z=this.a
y=this.c*2
if(y!==0){x=y-2
w=z.length
if(x<0||x>=w)return H.b(z,x)
if(V.f1(z[x],a,0.0001)){x=y-1
if(x<0||x>=w)return H.b(z,x)
x=!V.f1(z[x],b,0.0001)}else x=!0}else x=!0
if(x){this.d=0
this.z=null
return this.dV(a,b)}else return this.c-1},
hi:function(a,b){var z,y,x,w,v,u,t,s,r,q
if(this.e>a||this.r<a)return 0
if(this.f>b||this.x<b)return 0
z=this.c
if(z<3)return 0
y=this.a
x=(z-1)*2
w=y.length
if(x<0||x>=w)return H.b(y,x)
v=y[x];++x
if(x>=w)return H.b(y,x)
u=y[x]
for(t=0,s=0;s<z;++s,u=q,v=r){x=s*2
if(x>=w)return H.b(y,x)
r=y[x];++x
if(x>=w)return H.b(y,x)
q=y[x]
if(u<=b){if(q>b&&(r-v)*(b-u)-(a-v)*(q-u)>0)++t}else if(q<=b&&(r-v)*(b-u)-(a-v)*(q-u)<0)--t}return t},
bo:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
this.d=0
z=this.a
y=this.c
if(y<3)return
x=H.k([],[P.w])
w=this.gfg()
for(v=0;v<y;++v)C.b.k(x,v)
for(u=z.length,t=0;s=x.length,s>3;){r=x[C.i.c7(t,s)]
q=t+1
p=x[q%s]
o=x[(t+2)%s]
n=r*2
if(n>=u)return H.b(z,n)
m=z[n];++n
if(n>=u)return H.b(z,n)
l=z[n]
n=p*2
if(n>=u)return H.b(z,n)
k=z[n];++n
if(n>=u)return H.b(z,n)
j=z[n]
n=o*2
if(n>=u)return H.b(z,n)
i=z[n];++n
if(n>=u)return H.b(z,n)
h=i-m
g=z[n]-l
f=k-m
e=j-l
d=g*f-h*e
c=w?d>=0:d<=0
n=d*f
b=d*e
a=d*g
a0=d*h
a1=d*d
a2=0
a3=0
a4=0
while(!0){if(!(a4<s&&c))break
if(a4>=s)return H.b(x,a4)
a5=x[a4]
if(a5!==r&&a5!==p&&a5!==o){a6=a5*2
if(a6>=u)return H.b(z,a6)
a7=z[a6]-m;++a6
if(a6>=u)return H.b(z,a6)
a8=z[a6]-l
a2=n*a8-b*a7
if(a2>=0){a3=a*a7-a0*a8
if(a3>=0)c=a2+a3<a1?!1:c}}++a4}if(c){this.cN(r,p,o)
C.b.bW(x,q%x.length)
t=0}else{if(t>3*s)break
t=q}}if(0>=s)return H.b(x,0)
u=x[0]
if(1>=s)return H.b(x,1)
n=x[1]
if(2>=s)return H.b(x,2)
this.cN(u,n,x[2])},
cn:function(){var z,y,x,w,v,u,t,s,r,q
z=this.a
y=this.c
if(y<3)return 0
x=(y-1)*2
w=z.length
if(x<0||x>=w)return H.b(z,x)
v=z[x];++x
if(x>=w)return H.b(z,x)
u=z[x]
for(t=0,s=0;s<y;++s,u=q,v=r){x=s*2
if(x>=w)return H.b(z,x)
r=z[x];++x
if(x>=w)return H.b(z,x)
q=z[x]
t+=(v-r)*(u+q)}return t/2}}}],["","",,L,{"^":"",
eC:function(){var z,y
if($.cO===-1){z=window
y=H.e(new L.jp(),{func:1,ret:-1,args:[P.m]})
C.U.ej(z)
$.cO=C.U.eU(z,W.eL(y,P.m))}},
fp:{"^":"a;a,b,c"},
bI:{"^":"a;a,b,c,d,e,0f,0r,0x"},
bJ:{"^":"a;a,b,c,d,e,0f,0r,0x",
at:function(a,b,c,d){var z
H.G(a)
if(a==null)return
z=this.r;(z&&C.a).hg(z,a,b,5126,!1,c,d)}},
dS:{"^":"a;a,b",
h:function(a){return this.b}},
bc:{"^":"a;"},
dR:{"^":"a;"},
cu:{"^":"dR;d,e,f,r,x,a,b,c",
gds:function(){return C.I},
aG:function(a){var z
this.bl(0,this.f)
this.r=C.j
z=this.e
z.globalCompositeOperation="source-over"
this.x=1
z.globalAlpha=1},
av:function(a,b){var z,y,x
this.bl(0,this.f)
this.r=C.j
z=this.e
z.globalCompositeOperation="source-over"
this.x=1
z.globalAlpha=1
y=b>>>24&255
if(y<255){x=this.d;(z&&C.c).cY(z,0,0,x.width,x.height)}if(y>0){z.fillStyle=V.c1(b)
x=this.d;(z&&C.c).dl(z,0,0,x.width,x.height)}},
I:function(a){},
aF:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.e
y=b.a.c
x=b.d
w=b.b
v=b.r
u=a.e
t=u.c
s=u.a
r=u.b
if(this.x!==s){this.x=s
z.globalAlpha=s}if(this.r!==r){this.r=r
z.globalCompositeOperation=r.c}if(x===0){u=t.a;(z&&C.c).R(z,u[0],u[1],u[2],u[3],u[4],u[5])
u=w.a
q=w.b
p=w.c
o=w.d
n=v[0]
m=v[1]
C.c.aZ(z,y,u,q,p,o,n,m,v[8]-n,v[9]-m)}else if(x===1){u=t.a;(z&&C.c).R(z,-u[2],-u[3],u[0],u[1],u[4],u[5])
C.c.aZ(z,y,w.a,w.b,w.c,w.d,0-v[13],v[12],v[9]-v[1],v[8]-v[0])}else if(x===2){u=t.a;(z&&C.c).R(z,-u[0],-u[1],-u[2],-u[3],u[4],u[5])
u=w.a
q=w.b
p=w.c
o=w.d
n=v[8]
m=v[9]
C.c.aZ(z,y,u,q,p,o,0-n,0-m,n-v[0],m-v[1])}else if(x===3){u=t.a;(z&&C.c).R(z,u[2],u[3],-u[0],-u[1],u[4],u[5])
C.c.aZ(z,y,w.a,w.b,w.c,w.d,v[5],0-v[4],v[9]-v[1],v[8]-v[0])}},
be:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.e
y=a.e
x=y.c
w=y.a
v=y.b
if(this.x!==w){this.x=w
z.globalAlpha=w}if(this.r!==v){this.r=v
z.globalCompositeOperation=v.c}y=x.a;(z&&C.c).R(z,y[0],y[1],y[2],y[3],y[4],y[5])
z.beginPath()
for(y=b.length-2,u=c.length,t=0;t<y;t+=3){s=b[t]<<1>>>0
r=b[t+1]<<1>>>0
q=b[t+2]<<1>>>0
if(s>=u)return H.b(c,s)
p=c[s]
o=s+1
if(o>=u)return H.b(c,o)
n=c[o]
if(r>=u)return H.b(c,r)
m=c[r]
o=r+1
if(o>=u)return H.b(c,o)
l=c[o]
if(q>=u)return H.b(c,q)
k=c[q]
o=q+1
if(o>=u)return H.b(c,o)
j=c[o]
C.c.a4(z,p,n)
C.c.a3(z,m,l)
C.c.a3(z,k,j)}z.fillStyle=V.c1(d)
z.fill()},
bl:function(a,b){var z,y
z=this.e
y=b.a;(z&&C.c).R(z,y[0],y[1],y[2],y[3],y[4],y[5])}},
hD:{"^":"dR;d,0e,f,r,0x,0y,0z,0Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,a,b,c",
gds:function(){return C.u},
aG:function(a){var z,y,x
z=this.d
y=z.width
x=z.height
this.y=null
z=this.e;(z&&C.a).fc(z,36160,null)
z=this.e;(z&&C.a).hh(z,0,0,y,x)
z=this.f
z.X()
if(typeof y!=="number")return H.J(y)
if(typeof x!=="number")return H.J(x)
z.dL(0,2/y,-2/x,1)
z.h9(0,-1,1,0)
this.x.sdq(z)},
av:function(a,b){var z,y
C.b.sm(this.ep(),0)
this.f8(null)
this.f9(0)
z=(b>>>24&255)/255
y=this.e;(y&&C.a).fh(y,!0,!0,!0,!0)
y=this.e;(y&&C.a).ff(y,(b>>>16&255)/255*z,(b>>>8&255)/255*z,(b&255)/255*z,z)
y=this.e;(y&&C.a).av(y,17408)},
I:function(a){this.x.I(0)},
aF:function(a,b){var z=this.cy
this.cL(z)
this.cK(a.e.b)
this.aR(b.a)
z.aF(a,b)},
be:function(a,b,c,d){var z=this.dx
this.cL(z)
this.cK(a.e.b)
z.be(a,b,c,d)},
cL:function(a){var z=this.x
if(a!==z){z.I(0)
this.x=a
a.aQ(this)
this.x.sdq(this.f)}},
cK:function(a){var z
if(a!==this.Q){this.x.I(0)
this.Q=a
z=this.e;(z&&C.a).cT(z,a.a,a.b)}},
aR:function(a){var z,y,x,w
z=this.fx
if(a!==z[0]){this.x.I(0)
C.b.w(z,0,a)
z=a.y
y=this.cx
if(z!==y){a.x=this
a.y=y
z=this.e
a.Q=z
a.ch=z.createTexture()
z=a.Q;(z&&C.a).cM(z,33984)
z=a.Q;(z&&C.a).cS(z,3553,a.ch)
z=a.Q
x=(z&&C.a).dn(z,3089)
if(x){z=a.Q;(z&&C.a).a9(z,3089)}z=a.c
y=a.Q
w=y&&C.a
if(z!=null){w.bf(y,3553,0,6408,6408,5121,z)
a.z=a.Q.getError()===1281}else w.c_(y,3553,0,6408,a.a,a.b,0,6408,5121,null)
if(a.z){z=a.a
z=W.b3(a.b,z)
a.d=z
z=z.getContext("2d");(z&&C.c).d4(z,a.c,0,0)
z=a.Q;(z&&C.a).bf(z,3553,0,6408,6408,5121,a.d)}if(x){z=a.Q;(z&&C.a).b_(z,3089)}z=a.Q;(z&&C.a).ao(z,3553,10242,a.f.a)
z=a.Q;(z&&C.a).ao(z,3553,10243,a.r.a)
z=a.Q;(z&&C.a).ao(z,3553,10241,a.e.a)
z=a.Q;(z&&C.a).ao(z,3553,10240,a.e.a)}else{z=a.Q;(z&&C.a).cM(z,33984)
z=a.Q;(z&&C.a).cS(z,3553,a.ch)}}},
ep:function(){var z=this.y
return z instanceof L.dT?z.r:this.r},
f9:function(a){var z,y
z=this.e
y=z&&C.a
if(a===0)y.a9(z,2960)
else{y.b_(z,2960)
z=this.e;(z&&C.a).dO(z,514,a,255)}},
f8:function(a){var z=this.e;(z&&C.a).a9(z,3089)},
hq:[function(a){H.i(a,"$isaN").preventDefault()
this.ch=!1
this.b.k(0,new L.bc())},"$1","geA",4,0,9],
hr:[function(a){var z
H.i(a,"$isaN")
this.ch=!0
z=$.bK+1
$.bK=z
this.cx=z
this.c.k(0,new L.bc())},"$1","geB",4,0,9]},
hE:{"^":"a;"},
dT:{"^":"a;"},
jp:{"^":"j:30;",
$1:function(a){var z,y,x,w,v
H.c7(a)
if(typeof a!=="number")return a.c4()
z=a/1000
y=$.eD
if(typeof y!=="number")return H.J(y)
x=z-y
$.eD=z
$.cO=-1
L.eC()
y=$.$get$cP()
y.toString
y=H.k(y.slice(0),[H.c(y,0)])
w=y.length
v=0
for(;v<y.length;y.length===w||(0,H.an)(y),++v)y[v].$1(x)}},
hG:{"^":"a;",
hs:[function(a){var z
H.c7(a)
if(this.a){if(typeof a!=="number")return a.hj()
z=a>=0}else z=!1
if(z)if(typeof a==="number")this.aT(a)},"$1","geE",4,0,31]},
j1:{"^":"a;"},
bM:{"^":"a;",
sdq:function(a){var z,y
z=this.e.C(0,"uProjectionMatrix")
y=this.b;(y&&C.a).hc(y,z,!1,a.a)},
aQ:["ce",function(a){var z,y,x,w
z=this.a
y=a.cx
if(z!==y){this.a=y
z=a.e
this.b=z
x=a.a
this.x=x
w=a.dy
this.f=w
this.r=a.fr
if(w.e!==y){w.e=y
w.x=x
w.r=z
z=z.createBuffer()
w.f=z
y=w.r;(y&&C.a).aU(y,34963,z)
z=w.r;(z&&C.a).cU(z,34963,w.a,w.b)}z=w.r;(z&&C.a).aU(z,34963,w.f)
w=this.r
z=w.e
y=a.cx
if(z!==y){w.e=y
w.x=x
z=a.e
w.r=z
z=z.createBuffer()
w.f=z
y=w.r;(y&&C.a).aU(y,34962,z)
z=w.r;(z&&C.a).cU(z,34962,w.a,w.b)}z=w.r;(z&&C.a).aU(z,34962,w.f)
w=this.ee(this.b)
this.c=w
this.f7(this.b,w)
this.fa(this.b,this.c)}z=this.b;(z&&C.a).hf(z,this.c)}],
I:function(a){var z,y,x,w,v
z=this.f
y=z.c
if(y>0&&this.r.c>0){x=z.a.buffer
x.toString
w=H.ho(x,0,y)
x=z.r;(x&&C.a).cV(x,34963,0,w)
x=z.x
x.c=x.c+z.d
z=this.f
z.c=0
z.d=0
z=this.r
x=z.a.buffer
v=z.c
x.toString
w=H.hm(x,0,v)
v=z.r;(v&&C.a).cV(v,34962,0,w)
v=z.x
v.b=v.b+z.d
z=this.r
z.c=0
z.d=0
z=this.b;(z&&C.a).fq(z,4,y,5123,0);++this.x.a}},
ee:function(a){var z,y,x
z=a.createProgram()
y=this.cr(a,this.gc2(),35633)
x=this.cr(a,this.gbR(),35632)
C.a.cQ(a,z,y)
C.a.cQ(a,z,x)
C.a.fT(a,z)
if(C.a.bi(a,z,35714)===!0)return z
throw H.d(P.a6(a.isContextLost()?"ContextLost":C.a.dF(a,z)))},
cr:function(a,b,c){var z=C.a.fn(a,c)
C.a.dM(a,z,b)
C.a.fi(a,z)
if(C.a.dI(a,z,35713)===!0)return z
throw H.d(P.a6(a.isContextLost()?"ContextLost":C.a.dH(a,z)))},
f7:function(a,b){var z,y,x,w,v
z=this.d
z.cX(0)
y=H.G((a&&C.a).bi(a,b,35721))
if(typeof y!=="number")return H.J(y)
x=0
for(;x<y;++x){w=C.a.dB(a,b,x)
v=C.a.dD(a,b,w.name)
C.a.fu(a,v)
z.w(0,w.name,v)}},
fa:function(a,b){var z,y,x,w,v
z=this.e
z.cX(0)
y=H.G((a&&C.a).bi(a,b,35718))
if(typeof y!=="number")return H.J(y)
x=0
for(;x<y;++x){w=C.a.dC(a,b,x)
v=C.a.dK(a,b,w.name)
z.w(0,w.name,v)}}},
hJ:{"^":"bM;a,0b,0c,d,e,f,r,x",
gc2:function(){return"\n    uniform mat4 uProjectionMatrix;\n    attribute vec2 aVertexPosition;\n    attribute vec2 aVertexTextCoord;\n    attribute float aVertexAlpha;\n    varying vec2 vTextCoord;\n    varying float vAlpha;\n\n    void main() {\n      vTextCoord = aVertexTextCoord;\n      vAlpha = aVertexAlpha;\n      gl_Position = vec4(aVertexPosition, 0.0, 1.0) * uProjectionMatrix;\n    }\n    "},
gbR:function(){return"\n    precision mediump float;\n    uniform sampler2D uSampler;\n    varying vec2 vTextCoord;\n    varying float vAlpha;\n\n    void main() {\n      gl_FragColor = texture2D(uSampler, vTextCoord) * vAlpha;\n    }\n    "},
aQ:function(a){var z
this.ce(a)
z=this.b;(z&&C.a).hb(z,this.e.C(0,"uSampler"),0)
z=this.d
this.r.at(z.C(0,"aVertexPosition"),2,20,0)
this.r.at(z.C(0,"aVertexTextCoord"),2,20,8)
this.r.at(z.C(0,"aVertexAlpha"),1,20,16)},
aF:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=a.e
y=z.a
x=z.c
w=b.r
z=this.f
v=z.a
u=v.length
if(z.c+6>=u)this.I(0)
z=this.r
t=z.a
s=t.length
if(z.c+20>=s)this.I(0)
z=this.f
r=z.c
q=this.r
p=q.c
o=q.d
if(r>=u)return H.b(v,r)
v[r]=o
n=r+1
if(n>=u)return H.b(v,n)
v[n]=o+1
n=r+2
m=o+2
if(n>=u)return H.b(v,n)
v[n]=m
n=r+3
if(n>=u)return H.b(v,n)
v[n]=o
n=r+4
if(n>=u)return H.b(v,n)
v[n]=m
m=r+5
if(m>=u)return H.b(v,m)
v[m]=o+3
z.c=r+6
z.d+=6
z=w[0]
m=x.a
u=m[0]
n=m[4]
l=z*u+n
k=w[8]
j=k*u+n
n=m[1]
u=m[5]
i=z*n+u
h=k*n+u
u=w[1]
n=m[2]
g=u*n
k=w[9]
f=k*n
m=m[3]
e=u*m
d=k*m
if(p>=s)return H.b(t,p)
t[p]=l+g
m=p+1
if(m>=s)return H.b(t,m)
t[m]=i+e
m=p+2
k=w[2]
if(m>=s)return H.b(t,m)
t[m]=k
k=p+3
m=w[3]
if(k>=s)return H.b(t,k)
t[k]=m
m=p+4
if(m>=s)return H.b(t,m)
t[m]=y
m=p+5
if(m>=s)return H.b(t,m)
t[m]=j+g
m=p+6
if(m>=s)return H.b(t,m)
t[m]=h+e
m=p+7
k=w[6]
if(m>=s)return H.b(t,m)
t[m]=k
k=p+8
m=w[7]
if(k>=s)return H.b(t,k)
t[k]=m
m=p+9
if(m>=s)return H.b(t,m)
t[m]=y
m=p+10
if(m>=s)return H.b(t,m)
t[m]=j+f
m=p+11
if(m>=s)return H.b(t,m)
t[m]=h+d
m=p+12
k=w[10]
if(m>=s)return H.b(t,m)
t[m]=k
k=p+13
m=w[11]
if(k>=s)return H.b(t,k)
t[k]=m
m=p+14
if(m>=s)return H.b(t,m)
t[m]=y
m=p+15
if(m>=s)return H.b(t,m)
t[m]=l+f
m=p+16
if(m>=s)return H.b(t,m)
t[m]=i+d
m=p+17
k=w[14]
if(m>=s)return H.b(t,m)
t[m]=k
k=p+18
m=w[15]
if(k>=s)return H.b(t,k)
t[k]=m
m=p+19
if(m>=s)return H.b(t,m)
t[m]=y
q.c=p+20
q.d=o+4}},
hK:{"^":"bM;a,0b,0c,d,e,f,r,x",
gc2:function(){return"\n    uniform mat4 uProjectionMatrix;\n    attribute vec2 aVertexPosition;\n    attribute vec2 aVertexTextCoord;\n    attribute vec4 aVertexColor;\n    varying vec2 vTextCoord;\n    varying vec4 vColor; \n\n    void main() {\n      vTextCoord = aVertexTextCoord;\n      vColor = aVertexColor;\n      gl_Position = vec4(aVertexPosition, 0.0, 1.0) * uProjectionMatrix;\n    }\n    "},
gbR:function(){return"\n    precision mediump float;\n    uniform sampler2D uSampler;\n    varying vec2 vTextCoord;\n    varying vec4 vColor; \n\n    void main() {\n      gl_FragColor = texture2D(uSampler, vTextCoord) * vColor;\n    }\n    "}},
hL:{"^":"bM;a,0b,0c,d,e,f,r,x",
gc2:function(){return"\n    uniform mat4 uProjectionMatrix;\n    attribute vec2 aVertexPosition;\n    attribute vec4 aVertexColor;\n    varying vec4 vColor;\n\n    void main() {\n      vColor = aVertexColor;\n      gl_Position = vec4(aVertexPosition, 0.0, 1.0) * uProjectionMatrix;\n    }\n    "},
gbR:function(){return"\n    precision mediump float;\n    varying vec4 vColor;\n\n    void main() {\n      gl_FragColor = vColor;\n    }\n    "},
aQ:function(a){var z
this.ce(a)
z=this.d
this.r.at(z.C(0,"aVertexPosition"),2,24,0)
this.r.at(z.C(0,"aVertexColor"),4,24,8)},
be:function(a4,a5,a6,a7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=a4.e
y=z.c
x=z.a
w=a5.length
z=a6.length
v=z>>>1
u=this.f
t=u.a
s=t.length
if(u.c+w>=s)this.I(0)
u=this.r
r=u.a
q=v*6
p=r.length
if(u.c+q>=p)this.I(0)
u=this.f
o=u.c
n=this.r
m=n.c
l=n.d
for(k=0;k<w;++k){n=o+k
j=a5[k]
if(n>=s)return H.b(t,n)
t[n]=l+j}u.c=o+w
this.f.d+=w
u=y.a
i=u[0]
h=u[1]
g=u[2]
f=u[3]
e=u[4]
d=u[5]
c=0.00392156862745098*(a7>>>24&255)*x
b=0.00392156862745098*(a7>>>16&255)*c
a=0.00392156862745098*(a7>>>8&255)*c
a0=0.00392156862745098*(a7&255)*c
for(k=0,a1=0;k<v;++k,a1+=2){if(a1>=z)return H.b(a6,a1)
a2=a6[a1]
u=a1+1
if(u>=z)return H.b(a6,u)
a3=a6[u]
if(m>=p)return H.b(r,m)
r[m]=e+i*a2+g*a3
u=m+1
if(u>=p)return H.b(r,u)
r[u]=d+h*a2+f*a3
u=m+2
if(u>=p)return H.b(r,u)
r[u]=b
u=m+3
if(u>=p)return H.b(r,u)
r[u]=a
u=m+4
if(u>=p)return H.b(r,u)
r[u]=a0
u=m+5
if(u>=p)return H.b(r,u)
r[u]=c
m+=6}z=this.r
z.c+=q
z.d+=v}},
cG:{"^":"a;a,b,c,d,e,0f",
gfX:function(){var z,y
z=this.f
if(z==null){z=T.D()
y=new T.aw(new Float32Array(16))
y.X()
y=new L.cG(1,C.j,z,y,this)
this.f=y
z=y}return z}},
hM:{"^":"a;a,b,c,d,0e",
h4:function(a,b,c,d){var z,y
z=this.d
this.e=z
z=z.c
z.dm()
y=this.e
y.a=1
y.b=C.j
z.fm(b)},
dt:function(a,b){return this.h4(a,b,null,null)},
bX:function(a){var z,y,x,w,v
z=a.gO()
y=a.ch
x=this.e
w=x.gfX()
w.c.aY(z,x.c)
v=x.b
w.b=v
w.a=y*x.a
this.e=w
a.an(this)
this.e=x},
j:{
hN:function(a,b,c,d){var z,y
z=T.D()
y=new T.aw(new Float32Array(16))
y.X()
y=new L.cG(1,C.j,z,y,null)
z=new L.hM(0,0,a,y)
z.e=y
return z}}},
aV:{"^":"a;a,b,c",
h:function(a){return"RenderStatistics: "+this.a+" draws, "+this.b+" verices, "+this.c+" indices"}},
cv:{"^":"a;a,b,0c,0d,e,f,r,0x,y,z,0Q,0ch,cx",
gbU:function(){var z,y,x
z=this.a
y=this.b
x=[P.w]
return L.cw(this,new U.v(0,0,z,y,x),new U.v(0,0,z,y,x),0,1)},
gfe:function(a){var z,y
z=this.c
y=J.r(z)
if(!!y.$isb2)return z
else if(!!y.$isau){y=this.a
y=W.b3(this.b,y)
this.c=y
this.d=y
y=y.getContext("2d");(y&&C.c).fs(y,z,0,0,this.a,this.b)
return this.d}else throw H.d(P.a6("RenderTexture is read only."))},
sfG:function(a){var z
if(this.e===a)return
this.e=a
z=this.x
if(z==null||this.ch==null)return
if(z.cx!==this.y)return
z.aR(this)
z=this.Q;(z&&C.a).ao(z,3553,10241,this.e.a)
z=this.Q;(z&&C.a).ao(z,3553,10240,this.e.a)},
h5:function(a,b,c){var z
if(!(this.a===b&&this.b===c))if(this.c==null){this.a=b
this.b=c
z=this.x
if(z==null||this.ch==null)return
if(z.cx!==this.y)return
z.aR(this)
z=this.Q;(z&&C.a).c_(z,3553,0,6408,this.a,this.b,0,6408,5121,null)}else{this.a=b
this.b=c
z=W.b3(c,b)
this.c=z
this.d=z}},
hd:function(){var z,y
z=this.x
if(z==null||this.ch==null)return
if(z.cx!==this.y)return
z.x.I(0)
this.x.aR(this)
z=this.Q
y=(z&&C.a).dn(z,3089)
if(y){z=this.Q;(z&&C.a).a9(z,3089)}if(this.z){z=this.d
z.toString
z=z.getContext("2d");(z&&C.c).d4(z,this.c,0,0)
z=this.Q;(z&&C.a).bf(z,3553,0,6408,6408,5121,this.d)}else{z=this.Q;(z&&C.a).bf(z,3553,0,6408,6408,5121,this.c)}if(y){z=this.Q;(z&&C.a).b_(z,3089)}}},
dU:{"^":"a;a"},
dV:{"^":"a;a,b,c,d,e,f,r,0x,0y,z",
c3:function(a){return L.cw(this.a,this.b,this.c,this.d,a)},
gft:function(){var z,y,x,w,v
z=this.e
y=this.d
if(y===0){y=this.b
x=this.c
return T.bD(z,0,0,z,y.a+x.a,y.b+x.b)}else if(y===1){y=this.b
x=this.c
return T.bD(0,z,0-z,0,H.h(y.a+y.c,H.c(y,0))-x.b,y.b+x.a)}else if(y===2){y=this.b
x=H.c(y,0)
w=this.c
v=0-z
return T.bD(v,0,0,v,H.h(y.a+y.c,x)-w.a,H.h(y.b+y.d,x)-w.b)}else if(y===3){y=this.b
x=this.c
return T.bD(0,0-z,z,0,y.a+x.b,H.h(y.b+y.d,H.c(y,0))-x.a)}else throw H.d(P.cd())},
j:{
cw:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r
z=new Int16Array(6)
y=new Float32Array(16)
x=new L.dV(a,b,c,d,e,z,y,!1)
w=d===0
if(w||d===2){v=0-c.a
u=v/e
y[12]=u
y[0]=u
u=0-c.b
t=u/e
y[5]=t
y[1]=t
v=(v+b.c)/e
y[4]=v
y[8]=v
u=(u+b.d)/e
y[13]=u
y[9]=u}else if(d===1||d===3){v=0-c.a
u=v/e
y[12]=u
y[0]=u
u=0-c.b
t=u/e
y[5]=t
y[1]=t
v=(v+b.d)/e
y[4]=v
y[8]=v
u=(u+b.c)/e
y[13]=u
y[9]=u}else H.M(P.cd())
if(w){w=b.a
v=a.a
u=w/v
y[14]=u
y[2]=u
u=b.b
t=a.b
s=u/t
y[7]=s
y[3]=s
s=H.c(b,0)
v=H.h(w+b.c,s)/v
y[6]=v
y[10]=v
t=H.h(u+b.d,s)/t
y[15]=t
y[11]=t}else if(d===1){w=b.a
v=H.c(b,0)
u=H.h(w+b.c,v)
t=a.a
u/=t
y[6]=u
y[2]=u
u=b.b
s=a.b
r=u/s
y[15]=r
y[3]=r
t=w/t
y[14]=t
y[10]=t
s=H.h(u+b.d,v)/s
y[7]=s
y[11]=s}else if(d===2){w=b.a
v=H.c(b,0)
u=H.h(w+b.c,v)
t=a.a
u/=t
y[14]=u
y[2]=u
u=b.b
v=H.h(u+b.d,v)
s=a.b
v/=s
y[7]=v
y[3]=v
t=w/t
y[6]=t
y[10]=t
s=u/s
y[15]=s
y[11]=s}else if(d===3){w=b.a
v=a.a
u=w/v
y[6]=u
y[2]=u
u=b.b
t=H.c(b,0)
s=H.h(u+b.d,t)
r=a.b
s/=r
y[15]=s
y[3]=s
v=H.h(w+b.c,t)/v
y[14]=v
y[10]=v
r=u/r
y[7]=r
y[11]=r}else H.M(P.cd())
z[0]=0
z[1]=1
z[2]=2
z[3]=0
z[4]=2
z[5]=3
x.y=y
x.x=z
return x}}},
hO:{"^":"a;a"}}],["","",,T,{"^":"",h8:{"^":"C;a,b",
h:function(a){var z="LoadError: "+this.a
return z}}}],["","",,R,{"^":"",
cK:function(a,b,c){var z,y,x,w,v
H.eO(c,R.br,"The type argument '","' is not a subtype of the type variable bound '","' of type variable 'T' in '_dispatchBroadcastEvent'.")
H.l(b,"$isu",[[R.H,c]],"$asu")
z=b.length
for(y={func:1,ret:-1,args:[c]},x=0;x<z;++x){if(x<0||x>=b.length)return H.b(b,x)
w=b[x]
if(!w.c){a.f=!1
a.r=!1
v=w.e.a
a.d=v
a.e=v
a.c=C.e
H.e(w.f,y).$1(H.h(a,c))}else{C.b.bW(b,x);--z;--x}}},
br:{"^":"R;",
gcW:function(){return!1}},
bu:{"^":"br;db,a,b,c,0d,0e,f,r"},
bx:{"^":"br;a,b,c,0d,0e,f,r"},
bL:{"^":"br;a,b,c,0d,0e,f,r"},
R:{"^":"a;a,b,c,0d,0e,f,r",
gcW:function(){return!0}},
dp:{"^":"a;0a",
sek:function(a){this.a=H.l(a,"$isdH",[P.x,[R.b4,R.R]],"$asdH")},
aE:function(a,b,c){var z,y,x,w
H.eO(c,R.R,"The type argument '","' is not a subtype of the type variable bound '","' of type variable 'T' in 'on'.")
z=this.a
if(z==null){z=new H.V(0,0,[P.x,[R.b4,R.R]])
this.sek(z)}y=[c]
x=H.l(z.C(0,b),"$isb4",y,"$asb4")
if(x==null){w=new Array(0)
w.fixed$length=Array
x=new R.b4(this,b,H.k(w,[[R.H,c]]),0,y)
z.w(0,b,x)}return x},
bS:function(a,b){var z,y,x
z=this.a
if(z==null)return!1
y=z.C(0,a)
if(y==null)return!1
x=y.d
return b?x>0:y.c.length>x},
fL:function(a){return this.bS(a,!1)},
bG:function(a,b,c){var z,y
a.f=!1
a.r=!1
z=this.a
if(z==null)return
y=z.C(0,a.a)
if(y==null)return
y.eh(a,b,c)}},
ce:{"^":"a;a,b",
h:function(a){return this.b}},
b4:{"^":"bd;a,b,c,d,$ti",
sf_:function(a){this.c=H.l(a,"$isu",[[R.H,H.c(this,0)]],"$asu")},
fV:function(a,b,c,d,e){H.e(a,{func:1,ret:-1,args:[H.c(this,0)]})
H.e(c,{func:1,ret:-1})
return this.ai(a,!1,e)},
b8:function(a,b,c,d){return this.fV(a,b,c,d,0)},
ai:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=H.c(this,0)
y=new R.H(c,0,!1,!1,this,H.e(a,{func:1,ret:-1,args:[z]}),this.$ti)
x=this.c
w=x.length
v=new Array(w+1)
v.fixed$length=Array
u=H.k(v,[[R.H,z]])
t=u.length-1
for(s=0,r=0;s<w;++s,r=p){q=x[s]
if(s===r&&q.a<c){p=r+1
t=r
r=p}p=r+1
C.b.w(u,r,q)}C.b.w(u,t,y)
this.sf_(u)
z=[R.bu]
if(H.z(y,"$isH",z,null)){w=$.$get$cM();(w&&C.b).k(w,H.d4(y,"$isH",z,"$asH"))}else{z=[R.bx]
if(H.z(y,"$isH",z,null)){w=$.$get$cN();(w&&C.b).k(w,H.d4(y,"$isH",z,"$asH"))}else{z=[R.bL]
if(H.z(y,"$isH",z,null)){w=$.$get$cT();(w&&C.b).k(w,H.d4(y,"$isH",z,"$asH"))}}}return y},
eh:function(a,b,c){var z,y,x,w,v,u,t,s,r
z=H.c(this,0)
H.h(a,z)
y=this.c
x=c===C.z
w=!!a.$isch?a:null
for(v=y.length,u=this.a,z={func:1,ret:-1,args:[z]},t=0;t<v;++t){s=y[t]
if(!s.c)if(s.b<=0){s.d
r=x}else r=!0
else r=!0
if(r)continue
a.d=b
a.e=u
a.c=c
$.dv=w
H.e(s.f,z).$1(a)
$.dv=null}}},
H:{"^":"ah;a,b,c,d,e,f,$ti"},
ci:{"^":"a;a,b",
h:function(a){return this.b}},
ch:{"^":"R;"},
b8:{"^":"a;a"},
a9:{"^":"R;x,y,z,Q,ch,cx,a,b,c,0d,0e,f,r"},
N:{"^":"ch;k1,k2,k3,k4,x,y,z,Q,ch,cx,cy,db,a,b,c,0d,0e,f,r"},
be:{"^":"R;x,y,a,b,c,0d,0e,f,r"},
aW:{"^":"ch;k1,k2,x,y,z,Q,ch,cx,cy,db,a,b,c,0d,0e,f,r"}}],["","",,T,{"^":"",dJ:{"^":"a;a",
h:function(a){var z=this.a
return"Matrix [a="+H.f(z[0])+", b="+H.f(z[1])+", c="+H.f(z[2])+", d="+H.f(z[3])+", tx="+H.f(z[4])+", ty="+H.f(z[5])+"]"},
gbF:function(){var z=this.a
return z[0]*z[3]-z[1]*z[2]},
h8:function(a,b){var z,y,x,w,v,u,t,s
z=P.m
H.l(a,"$isa5",[z],"$asa5")
y=a.a
y.toString
x=a.b
x.toString
w=this.a
v=w[0]
if(typeof y!=="number")return y.bj()
u=w[2]
if(typeof x!=="number")return x.bj()
t=y*v+x*u+w[4]
s=y*w[1]+x*w[3]+w[5]
z=[z]
if(H.z(b,"$isE",z,null)){b.hm(t,s)
return b}else return new U.E(t,s,z)},
c1:function(a){return this.h8(a,null)},
ap:function(a2,a3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1
z=P.m
H.l(a2,"$isP",[z],"$asP")
z=[z]
H.l(a3,"$isv",z,"$asv")
y=a2.a
x=H.c(a2,0)
w=H.h(y+a2.c,x)
v=a2.b
u=H.h(v+a2.d,x)
x=this.a
t=x[0]
s=y*t
r=x[2]
q=v*r
p=s+q
o=x[1]
n=y*o
m=x[3]
l=v*m
k=n+l
t=w*t
j=t+q
o=w*o
i=o+l
r=u*r
h=t+r
m=u*m
g=o+m
f=s+r
e=n+m
d=p>j?j:p
if(d>h)d=h
if(d>f)d=f
c=k>i?i:k
if(c>g)c=g
if(c>e)c=e
b=p<j?j:p
if(b<h)b=h
if(b<f)b=f
a=k<i?i:k
if(a<g)a=g
if(a<e)a=e
a0=b-d
a1=a-c
if(H.z(a3,"$isv",z,null)){a3.ca(x[4]+d,x[5]+c,a0,a1)
return a3}else return new U.v(x[4]+d,x[5]+c,a0,a1,z)},
dm:function(){var z=this.a
z[0]=1
z[1]=0
z[2]=0
z[3]=1
z[4]=0
z[5]=0},
bk:function(a,b,c){var z,y
z=this.a
y=z[0]
if(typeof b!=="number")return H.J(b)
z[0]=y*b
y=z[1]
if(typeof c!=="number")return H.J(c)
z[1]=y*c
z[2]=z[2]*b
z[3]=z[3]*c
z[4]=z[4]*b
z[5]=z[5]*c},
af:function(a,b,c,d,e,f){var z=this.a
z[0]=a
z[1]=b
z[2]=c
z[3]=d
z[4]=e
z[5]=f},
fm:function(a){var z,y
z=this.a
y=a.a
z[0]=y[0]
z[1]=y[1]
z[2]=y[2]
z[3]=y[3]
z[4]=y[4]
z[5]=y[5]},
aY:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=a.a
y=z[0]
x=z[1]
w=z[2]
v=z[3]
u=z[4]
t=z[5]
z=b.a
s=z[0]
r=z[1]
q=z[2]
p=z[3]
o=z[4]
n=z[5]
z=this.a
z[0]=y*s+x*q
z[1]=y*r+x*p
z[2]=w*s+v*q
z[3]=w*r+v*p
z[4]=u*s+t*q+o
z[5]=u*r+t*p+n},
j:{
bD:function(a,b,c,d,e,f){var z=new Float32Array(6)
z[0]=a
z[1]=b
z[2]=c
z[3]=d
z[4]=e
z[5]=f
return new T.dJ(z)},
D:function(){var z=new Float32Array(6)
z[0]=1
z[1]=0
z[2]=0
z[3]=1
z[4]=0
z[5]=0
return new T.dJ(z)}}}}],["","",,T,{"^":"",aw:{"^":"a;a",
ap:function(b2,b3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1
z=P.m
H.l(b2,"$isP",[z],"$asP")
z=[z]
H.l(b3,"$isv",z,"$asv")
y=b2.a
x=H.c(b2,0)
w=H.h(y+b2.c,x)
v=b2.b
u=H.h(v+b2.d,x)
x=this.a
t=x[12]
s=t*y
r=x[13]
q=r*v
p=x[15]
o=s+q+p
n=x[0]
m=n*y
l=x[1]
k=l*v
j=x[3]
i=(m+k+j)/o
h=x[4]
g=h*y
f=x[5]
e=f*v
x=x[7]
d=(g+e+x)/o
t*=w
c=t+q+p
n*=w
b=(n+k+j)/c
h*=w
a=(h+e+x)/c
r*=u
a0=t+r+p
l*=u
a1=(n+l+j)/a0
f*=u
a2=(h+f+x)/a0
a3=s+r+p
a4=(m+l+j)/a3
a5=(g+f+x)/a3
a6=i>b?b:i
if(a6>a1)a6=a1
if(a6>a4)a6=a4
a7=d>a?a:d
if(a7>a2)a7=a2
if(a7>a5)a7=a5
a8=i<b?b:i
if(a8<a1)a8=a1
if(a8<a4)a8=a4
a9=d<a?a:d
if(a9<a2)a9=a2
if(a9<a5)a9=a5
b0=a8-a6
b1=a9-a7
if(H.z(b3,"$isv",z,null)){b3.ca(a6,a7,b0,b1)
return b3}else return new U.v(a6,a7,b0,b1,z)},
X:function(){var z=this.a
z[0]=1
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=1
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=1
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=1},
dL:function(a,b,c,d){var z=this.a
z[0]=z[0]*b
z[1]=z[1]*b
z[2]=z[2]*b
z[3]=z[3]*b
z[4]=z[4]*c
z[5]=z[5]*c
z[6]=z[6]*c
z[7]=z[7]*c
z[8]=z[8]*d
z[9]=z[9]*d
z[10]=z[10]*d
z[11]=z[11]*d},
h9:function(a,b,c,d){var z=this.a
z[3]=z[3]+b
z[7]=z[7]+c
z[11]=z[11]+d},
d1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=z[3]
u=z[4]
t=z[5]
s=z[6]
r=z[7]
q=z[12]
p=z[13]
o=z[14]
n=z[15]
m=a.a
l=m[0]
k=m[2]
j=m[4]
i=m[1]
h=m[3]
g=m[5]
z[0]=y*l+u*k+q*j
z[1]=x*l+t*k+p*j
z[2]=w*l+s*k+o*j
z[3]=v*l+r*k+n*j
z[4]=y*i+u*h+q*g
z[5]=x*i+t*h+p*g
z[6]=w*i+s*h+o*g
z[7]=v*i+r*h+n*g},
aY:function(a7,a8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6
z=a7.a
y=z[0]
x=z[1]
w=z[2]
v=z[3]
u=z[4]
t=z[5]
s=z[6]
r=z[7]
q=z[8]
p=z[9]
o=z[10]
n=z[11]
m=z[12]
l=z[13]
k=z[14]
j=z[15]
z=a8.a
i=z[0]
h=z[1]
g=z[2]
f=z[3]
e=z[4]
d=z[5]
c=z[6]
b=z[7]
a=z[8]
a0=z[9]
a1=z[10]
a2=z[11]
a3=z[12]
a4=z[13]
a5=z[14]
a6=z[15]
z=this.a
z[0]=y*i+u*h+q*g+m*f
z[1]=x*i+t*h+p*g+l*f
z[2]=w*i+s*h+o*g+k*f
z[3]=v*i+r*h+n*g+j*f
z[4]=y*e+u*d+q*c+m*b
z[5]=x*e+t*d+p*c+l*b
z[6]=w*e+s*d+o*c+k*b
z[7]=v*e+r*d+n*c+j*b
z[8]=y*a+u*a0+q*a1+m*a2
z[9]=x*a+t*a0+p*a1+l*a2
z[10]=w*a+s*a0+o*a1+k*a2
z[11]=v*a+r*a0+n*a1+j*a2
z[12]=y*a3+u*a4+q*a5+m*a6
z[13]=x*a3+t*a4+p*a5+l*a6
z[14]=w*a3+s*a4+o*a5+k*a6
z[15]=v*a3+r*a4+n*a5+j*a6}}}],["","",,U,{"^":"",E:{"^":"a;i:a>,l:b>,$ti",
si:function(a,b){this.a=H.h(b,H.c(this,0))},
sl:function(a,b){this.b=H.h(b,H.c(this,0))},
h:function(a){return"Point<"+new H.cC(H.c(this,0)).h(0)+"> [x="+H.f(this.a)+", y="+H.f(this.b)+"]"},
J:function(a,b){var z
if(b==null)return!1
if(H.z(b,"$isa5",[P.m],"$asa5")){z=J.T(b)
z=this.a===z.gi(b)&&this.b===z.gl(b)}else z=!1
return z},
gv:function(a){var z,y
z=this.a
y=this.b
return O.dC(O.aR(O.aR(0,z&0x1FFFFFFF),y&0x1FFFFFFF))},
$isa5:1}}],["","",,U,{"^":"",v:{"^":"a;V:a>,a5:b>,a6:c>,a1:d>,$ti",
sV:function(a,b){this.a=H.h(b,H.c(this,0))},
sa5:function(a,b){this.b=H.h(b,H.c(this,0))},
sa6:function(a,b){this.c=H.h(b,H.c(this,0))},
sa1:function(a,b){this.d=H.h(b,H.c(this,0))},
h:function(a){return"Rectangle<"+new H.cC(H.c(this,0)).h(0)+"> [left="+H.f(this.a)+", top="+H.f(this.b)+", width="+H.f(this.c)+", height="+H.f(this.d)+"]"},
J:function(a,b){var z
if(b==null)return!1
if(H.z(b,"$isP",[P.m],"$asP")){z=J.T(b)
z=this.a===z.gV(b)&&this.b===z.ga5(b)&&this.c===z.ga6(b)&&this.d===z.ga1(b)}else z=!1
return z},
gv:function(a){var z,y,x,w
z=this.a
y=this.b
x=this.c
w=this.d
return O.dC(O.aR(O.aR(O.aR(O.aR(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
aX:function(a,b,c){var z,y,x
z=this.a
if(z<=b){y=this.b
if(y<=c){x=H.c(this,0)
z=H.h(z+this.c,x)>b&&H.h(y+this.d,x)>c}else z=!1}else z=!1
return z},
ca:function(a,b,c,d){var z=H.c(this,0)
H.h(a,z)
H.h(b,z)
H.h(c,z)
H.h(d,z)
this.sV(0,a)
this.sa5(0,b)
this.sa6(0,c)
this.sa1(0,d)},
$isP:1}}],["","",,Q,{"^":"",
jl:function(){var z,y
try{z=P.fC("TouchEvent")
return z}catch(y){H.Z(y)
return!1}}}],["","",,N,{"^":"",fT:{"^":"a;a,b,c,0d,0e",
hu:[function(a){this.d.aW()
this.e.aW()
this.b.a8(0,this.a)},"$1","geG",4,0,10],
ht:[function(a){this.d.aW()
this.e.aW()
this.b.fk(new T.h8("Failed to load "+H.f(this.a.src)+".",null))},"$1","geF",4,0,10]}}],["","",,O,{"^":"",
aR:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
dC:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)}}],["","",,V,{"^":"",
cW:function(a){return"rgb("+(a>>>16&255)+","+(a>>>8&255)+","+(a&255)+")"},
c1:function(a){return"rgba("+(a>>>16&255)+","+(a>>>8&255)+","+(a&255)+","+H.f((a>>>24&255)/255)+")"},
jX:function(a,b){if(typeof b!=="number")return H.J(b)
if(a<=b)return a
else return b},
c0:function(a,b,c){if(a<=b)return b
else if(a>=c)return c
else return a},
b1:function(a){if(typeof a==="number"&&Math.floor(a)===a)return a
else throw H.d(P.ae("The supplied value ("+H.f(a)+") is not an int."))},
X:function(a){return a},
eR:function(a){return a},
f1:function(a,b,c){return a-c<b&&a+c>b}}],["","",,O,{"^":"",dW:{"^":"a;a,b",
b9:function(a){var z=0,y=P.eF(O.dW),x,w=this,v,u,t,s
var $async$b9=P.eK(function(b,c){if(b===1)return P.ex(c,y)
while(true)switch(z){case 0:v=w.gh_()
u=[P.F,,]
t=H.c(v,0)
z=3
return P.ew(P.fL(new H.hf(v,H.e(new O.hQ(),{func:1,ret:u,args:[t]}),[t,u]),null,!1,null),$async$b9)
case 3:s=w.gfv().length
if(s>0)throw H.d(P.a6("Failed to load "+s+" resource(s)."))
else{x=w
z=1
break}case 1:return P.ey(x,y)}})
return P.ez($async$b9,y)},
gh_:function(){var z,y
z=this.a
z=z.gdz(z)
y=H.cZ(z,"n",0)
return P.dG(new H.ef(z,H.e(new O.hR(),{func:1,ret:P.ad,args:[y]}),[y]),!0,y)},
gfv:function(){var z,y
z=this.a
z=z.gdz(z)
y=H.cZ(z,"n",0)
return P.dG(new H.ef(z,H.e(new O.hP(),{func:1,ret:P.ad,args:[y]}),[y]),!0,y)}},hQ:{"^":"j:33;",
$1:function(a){return C.o.gd0(H.i(a,"$isag"))}},hR:{"^":"j:5;",
$1:function(a){C.o.ghQ(H.i(a,"$isag"))
return!1}},hP:{"^":"j:5;",
$1:function(a){C.o.ghE(H.i(a,"$isag"))
return!0}},ag:{"^":"a;"}}],["","",,Y,{"^":"",
jn:function(a){var z=a.gaJ()
return $.$get$eB().dr(z,new Y.jo(a))},
jo:{"^":"j:35;a",
$0:function(){return Y.iI(this.a)}},
bS:{"^":"a;a,b,c",
e_:function(a){var z,y,x,w,v,u
w=a.gaJ()
z=H.i(W.cH("span",null),"$isaO")
y=H.i(W.cH("div",null),"$isaO")
x=H.i(W.cH("div",null),"$isaO")
v=J.aL(z)
v.font=w
J.fa(z,"Hg")
v=J.aL(y)
v.display="inline-block"
v=J.aL(y)
v.width="1px"
v=J.aL(y)
v.height="0px"
J.d5(x,y)
J.d5(x,z)
v=document.body;(v&&C.V).cP(v,x)
try{v=J.aL(y)
v.verticalAlign="baseline"
this.a=C.d.B(y.offsetTop)-C.d.B(z.offsetTop)
v=J.aL(y)
v.verticalAlign="bottom"
v=C.d.B(y.offsetTop)-C.d.B(z.offsetTop)
this.c=v
this.b=v-this.a}catch(u){H.Z(u)
v=a.b
this.c=v
this.a=C.i.cF(v*7,8)
this.b=C.i.cF(v*2,8)}finally{v=x
if(J.f9(v)!=null)J.f6(v.parentNode,v)}},
j:{
iI:function(a){var z=new Y.bS(0,0,0)
z.e_(a)
return z}}},
ib:{"^":"aQ;u,0aa,ay,b2,a0,dd,az,bL,bM,fC,de,hG,hH,hI,hJ,hK,hL,hM,hN,fD,G,H,aA,al,aB,E,hO,0aC,0b3,k3,k4,r1,r2,rx,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,0db,0dx,dy,0fr,fx,0fy,go,id,0k1,0a",
sbg:function(a,b){this.u=b
this.a0=b.length
this.E|=3},
sd3:function(a){this.aa=Y.cB(a.a,a.b,a.c,a.Q,!1,a.cy,a.f,a.dy,!1,a.fr,a.db,a.dx,a.e,a.d,a.cx,!1,a.ch,a.r)
this.E|=3},
gi:function(a){this.Z()
return A.O.prototype.gi.call(this,this)},
gO:function(){this.Z()
return A.O.prototype.gO.call(this)},
gA:function(){this.Z()
var z=this.G
this.Z()
return new U.v(0,0,z,this.H,[P.m])},
a2:function(a,b){var z
if(!(a<0)){this.Z()
z=a>=this.G}else z=!0
if(z)return
if(!(b<0)){this.Z()
z=b>=this.H}else z=!0
if(z)return
return this},
an:function(a){var z
this.Z()
this.eP(a.e.c)
a.c.aF(a,this.b3)
this.az=this.az+a.b
if(this.b2==="input"){z=this.gbY();(z instanceof A.a0?z:null)!=null}},
Z:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3
z=this.E
if((z&1)===0)return
else this.E=z&254
z=this.aB
C.b.sm(z,0)
y=this.aa
x=V.X(y.b)
w=V.X(y.d)
v=V.X(y.db)
u=V.X(y.dx)
t=V.X(y.cx)
s=V.X(y.cy)
r=V.X(y.dy)
q=V.X(y.fr)
p=V.eR(y.Q)
o=V.eR(y.ch)
n=y.gaJ()
m=Y.jn(y)
l=V.X(m.a)
k=V.X(m.b)
j=$.$get$cL()
i=H.k([],[P.w])
h=P.dQ("\\r\\n|\\r|\\n",!0,!1)
g=C.f.dN(this.u,h)
j.font=n+" "
j.textAlign="start"
j.textBaseline="alphabetic";(j&&C.c).R(j,1,0,0,1,0,0)
for(f=0,e=0;e<g.length;++e){d=g[e]
if(typeof d!=="string")continue
C.b.k(i,z.length)
d=this.eO(d)
C.b.k(z,new Y.e1(d,f,0,0,0,0,0,0,0,0))
f+=d.length+1}this.aA=0
this.al=0
for(c=t+x,b=q+x+k,a=0;a<z.length;++a){a0=z[a]
a1=C.b.bE(i,a)?r:0
a2=v+a1
a3=c+a*b
a4=C.c.bT(j,a0.a).width
a4.toString
a0.c=a2
a0.d=a3
a0.e=a4
a0.f=x
a0.r=l
a0.x=k
a0.y=q
a0.z=a1
a5=this.aA
if(typeof a4!=="number")return H.J(a4)
this.aA=Math.max(a5,a2+a4+u)
this.al=a3+k+s}c=w*2
b=this.aA+c
this.aA=b
this.al+=c
a6=C.d.au(b)
a7=C.d.au(this.al)
c=this.G
if(c!==a6||this.H!==a7)switch(this.ay){case"left":this.G=a6
this.H=a7
c=a6
break
case"right":this.cc(0,A.O.prototype.gi.call(this,this)-(a6-this.G))
this.G=a6
this.H=a7
c=a6
break
case"center":this.cc(0,A.O.prototype.gi.call(this,this)-(a6-this.G)/2)
this.G=a6
this.H=a7
c=a6
break}a8=c-v-u
switch(o){case"center":a9=(this.H-this.al)/2
break
case"bottom":a9=this.H-this.al-w
break
default:a9=w}for(a=0;c=z.length,a<c;++a){a0=z[a]
switch(p){case"center":case"justify":a0.c=a0.c+(a8-a0.e)/2
break
case"right":case"end":a0.c=a0.c+(a8-a0.e)
break
default:a0.c+=w}a0.d+=a9}if(this.b2==="input"){for(a=c-1,c=this.a0;a>=0;--a){a0=z[a]
b=a0.b
if(c>=b){b0=C.f.Y(a0.a,0,c-b)
this.dd=a
b=a0.c
a5=C.c.bT(j,b0).width
a5.toString
if(typeof a5!=="number")return H.J(a5)
this.bL=b+a5
this.bM=a0.d-l*0.9
this.fC=2
this.de=x
break}}for(c=this.bL,b=this.G,a5=b*0.2,b1=0;b1+c>b;)b1-=a5
for(;b1+c<0;)b1+=a5
for(b=this.bM,a5=this.de,b2=this.H,b3=0;b3+b+a5>b2;)b3-=x
for(;b3+b<0;)b3+=x
this.bL=c+b1
this.bM+=b3
for(a=0;a<z.length;++a){a0=z[a]
a0.c+=b1
a0.d+=b3}}},
eP:function(a){var z,y,x,w,v,u,t,s,r,q
z=Math.sqrt(Math.abs(a.gbF()))
y=this.b3
x=y==null?null:y.e
if(x==null)x=0
if(x<z*0.8)this.E|=2
if(x>z*1.25)this.E|=2
y=this.E
if((y&2)===0)return
this.E=y&253
w=C.d.au(Math.max(1,this.G*z))
v=C.d.au(Math.max(1,this.H*z))
y=this.aC
if(y==null){y=new L.cv(0,0,C.J,C.p,C.p,-1,!1,-1)
if(w<=0)H.M(P.ae("width"))
if(v<=0)H.M(P.ae("height"))
u=V.b1(w)
y.a=u
t=V.b1(v)
y.b=t
s=W.b3(t,u)
y.d=s
y.c=s
r=s.getContext("2d")
r.fillStyle=V.c1(16777215);(r&&C.c).dl(r,0,0,u,t)
this.aC=y
y=y.gbU().c3(z)
this.b3=y}else{y.h5(0,w,v)
y=this.aC.gbU().c3(z)
this.b3=y}q=y.gft()
y=this.aC
y=y.gfe(y)
y.toString
r=y.getContext("2d")
y=q.a;(r&&C.c).R(r,y[0],y[1],y[2],y[3],y[4],y[5])
C.c.cY(r,0,0,this.G,this.H)
this.eT(r)
this.aC.hd()},
eT:function(a){var z,y,x,w,v
z=this.aa
y=z.b
x=C.a_.au(y/20)
a.save()
a.beginPath()
C.c.h3(a,0,0,this.G,this.H)
a.clip()
a.font=z.gaJ()+" "
a.textAlign="start"
a.textBaseline="alphabetic"
a.lineCap="round"
a.lineJoin="round"
y=z.d
if(y>0){a.lineWidth=y*2
a.strokeStyle=V.cW(z.e)
for(y=this.aB,w=0;w<y.length;++w){v=y[w]
C.c.dP(a,v.a,v.c,v.d)}}a.lineWidth=x
y=z.c
a.strokeStyle=V.cW(y)
y=V.cW(y)
a.fillStyle=y
for(y=this.aB,w=0;w<y.length;++w){v=y[w]
a.fillText(v.a,v.c,v.d)}a.restore()},
eO:function(a){return a},
hv:[function(a){var z,y,x,w,v,u,t,s,r,q,p
H.i(a,"$isa9")
if(this.b2==="input"){this.Z()
z=this.u
y=z.length
x=this.aB
w=this.a0
v=this.dd
switch(a.x){case 8:a.cx=!0
if(w>0){u=w-1
this.u=C.f.Y(z,0,u)+C.f.aq(z,w)}else u=-1
break
case 35:a.cx=!0
if(v<0||v>=x.length)return H.b(x,v)
t=x[v]
u=t.b+t.a.length
break
case 36:a.cx=!0
if(v<0||v>=x.length)return H.b(x,v)
u=x[v].b
break
case 37:a.cx=!0
u=w>0?w-1:-1
break
case 38:a.cx=!0
if(v>0&&v<x.length){s=x.length
if(v<0||v>=s)return H.b(x,v)
r=x[v]
q=v-1
if(q<0||q>=s)return H.b(x,q)
p=x[q]
u=p.b+Math.min(w-r.b,p.a.length)}else u=0
break
case 39:a.cx=!0
u=w<y?w+1:-1
break
case 40:a.cx=!0
if(v>=0&&v<x.length-1){s=x.length
if(v<0||v>=s)return H.b(x,v)
r=x[v]
q=v+1
if(q>=s)return H.b(x,q)
p=x[q]
u=p.b+Math.min(w-r.b,p.a.length)}else u=y
break
case 46:a.cx=!0
if(w<y){this.u=C.f.Y(z,0,w)+C.f.aq(z,w+1)
u=w}else u=-1
break
default:u=-1}if(u!==-1){this.a0=u
this.az=0
this.E|=3}}},"$1","geH",4,0,36],
hA:[function(a){var z,y,x,w
H.i(a,"$isbe")
if(this.b2==="input"){a.y=!0
z=this.u
y=this.a0
x=a.x
if(x==="\r")x="\n"
if(x==="\n"&&!0)x=""
if(x==="")return
w=this.fD
if(w!==0&&z.length>=w)return
this.u=C.f.Y(z,0,y)+x+C.f.aq(z,y)
this.a0=y+x.length
this.az=0
this.E|=3}},"$1","geM",4,0,37],
hx:[function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
H.i(a,"$isN")
z=a.x
y=a.y
x=$.$get$cL();(x&&C.c).R(x,1,0,0,1,0,0)
for(w=this.aB,v=0;v<w.length;++v){u=w[v]
t=u.a
s=u.c
r=u.d
q=u.r
p=u.x
if(r-q<=y&&r+p>=y){for(r=t.length,o=1/0,n=0,m=0;m<=r;++m){l=C.c.bT(x,C.f.Y(t,0,m)).width
l.toString
if(typeof l!=="number")return H.J(l)
k=Math.abs(s+l-z)
if(k<o){n=m
o=k}}this.a0=u.b+n
this.az=0
this.E|=3}}},"$1","geJ",4,0,38],
j:{
e0:function(a,b){var z,y
z=H.k([],[Y.e1])
y=$.K
$.K=y+1
y=new Y.ib("","none","dynamic",0,0,0,0,0,0,0,!1,!1,!1,!1,!1,"\u2022",4294967295,4278190080,0,100,100,0,0,z,3,!0,!1,!0,"auto",!0,0,y,0,0,0,0,1,1,0,0,0,1,!0,!1,H.k([],[A.bp]),"",T.D(),!0)
y.sbg(0,"")
z=Y.cB("Arial",12,0,"left",!1,0,null,0,!1,0,0,0,4278190080,0,0,!1,"top",400)
y.sd3(z)
z=y.aE(0,"keyDown",R.a9)
z.ai(H.e(y.geH(),{func:1,ret:-1,args:[H.c(z,0)]}),!1,0)
z=y.aE(0,"textInput",R.be)
z.ai(H.e(y.geM(),{func:1,ret:-1,args:[H.c(z,0)]}),!1,0)
z=y.aE(0,"mouseDown",R.N)
z.ai(H.e(y.geJ(),{func:1,ret:-1,args:[H.c(z,0)]}),!1,0)
return y}}},
ic:{"^":"a;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr",
gaJ:function(){var z=""+this.r+" "+this.b+"px "+this.a
return z},
j:{
cB:function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){return new Y.ic(a,b,c,n,m,g,r,!1,!1,!1,d,q,o,f,k,l,h,j)}}},
e1:{"^":"a;a,b,c,d,e,f,r,x,y,z",
gi:function(a){return this.c},
gl:function(a){return this.d}}}],["","",,Q,{"^":"",hh:{"^":"a;"}}],["","",,Z,{"^":"",fi:{"^":"cx;0F,M,ax,T,q,ak,hF,0N,0U,0am,u,aa,ay,k3,k4,r1,r2,rx,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,0db,0dx,dy,0fr,fx,0fy,go,id,0k1,0a",$isfd:1},bs:{"^":"a;a,b",
h:function(a){return this.b}}}],["","",,F,{"^":"",
bl:function(){var z=0,y=P.eF(P.p),x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
var $async$bl=P.eK(function(a,b){if(a===1)return P.ex(b,y)
while(true)switch(z){case 0:x=new A.hY(C.u,C.t,C.w,C.x,C.q,4294967295,!1,!1,5,!0,!0,!1,!1)
x.d=C.S
x.e=C.v
x.f=4289774814
w=A.hW(H.i(C.A.h2(document,"#stage"),"$isb2"),600,x,800)
v=K.dE()
u=H.k([],[A.a0])
t=new A.hF(v,u,new R.bu(0,"enterFrame",!1,C.e,!1,!1),new R.bx("exitFrame",!1,C.e,!1,!1),0,!1)
t.a=!0
L.eC()
s=$.$get$cP();(s&&C.b).k(s,t.geE())
s=w.am
if(!(s==null))if(C.b.bd(s.c,w))w.am=null
w.am=t
C.b.k(u,w)
u=P.m
z=2
return P.ew(new O.dW(new H.V(0,0,[P.x,O.ag]),new P.ab(null,null,0,[u])).b9(0),$async$bl)
case 2:u=new U.E(0,0,[u])
s=A.O
r=[s]
q=H.k([],r)
p=$.K
$.K=p+1
o=[A.bp]
n=new U.hs(u,13,q,!0,!0,!1,!0,"auto",!0,0,p,0,0,0,0,1,1,0,0,0,1,!0,!1,H.k([],o),"",T.D(),!0)
n.F=100
n.M=18
u.si(0,0)
u.sl(0,0)
p=[U.b5]
q=H.k([],p)
m=H.k([],p)
l=$.K
$.K=l+1
l=new A.dX(new U.dr(q,m),l,0,0,0,0,1,1,0,0,0,1,!0,!1,H.k([],o),"",T.D(),!0)
n.q=l
s=[s]
H.l(n,"$isa8",s,"$asa8").aj(l)
l=n.q.k3
l.aS(U.dt(u.a,u.b,n.M,n.F))
l.aS(new U.ds(4294967295))
w.aj(n)
l=H.k([],r)
u=$.K
$.K=u+1
k=new S.hU(0,l,!0,!0,!1,!0,"auto",!0,0,u,0,0,0,0,1,1,0,0,0,1,!0,!1,H.k([],o),"",T.D(),!0)
k.M=Y.e0(null,null)
u=Y.e0(null,null)
k.M=u
u.sd3(Y.cB("Spicy Rice",30,4289864226,"left",!1,0,null,0,!1,0,0,0,4278190080,0,0,!1,"top",400))
u.sbg(0,"Score: [0]")
u.c=600
u.id=!0
u.d=20
u.G=200
q=u.E|=3
u.H=50
u.E=q|3
H.l(k,"$isa8",s,"$asa8").aj(u)
w.aj(k)
r=H.k([],r)
u=$.K
$.K=u+1
j=new Z.fi(n,k,C.m,C.n,200,!1,r,!0,!0,!1,!0,"auto",!0,0,u,0,0,0,0,1,1,0,0,0,1,!0,!1,H.k([],o),"",T.D(),!0)
u=H.k([],p)
p=H.k([],p)
r=$.K
$.K=r+1
o=new A.dX(new U.dr(u,p),r,0,0,0,0,1,1,0,0,0,1,!0,!1,H.k([],o),"",T.D(),!0)
j.F=o
H.l(j,"$isa8",s,"$asa8").aj(o)
j.F.k3.aS(U.dt(0,0,20,20))
j.F.k3.aS(new U.ds(4294967295))
w.aj(j)
if(!v.bE(0,j)){i=new K.eg()
u=v.b
u.a=j
u.b=i
v.b=i}w.bJ=w
v=w.aE(0,"keyDown",R.a9)
v.ai(H.e(new F.jU(n),{func:1,ret:-1,args:[H.c(v,0)]}),!1,0)
v=w.aE(0,"click",R.N)
v.ai(H.e(new F.jV(),{func:1,ret:-1,args:[H.c(v,0)]}),!1,0)
return P.ey(null,y)}})
return P.ez($async$bl,y)},
jU:{"^":"j:39;a",
$1:function(a){this.a.h1(H.i(a,"$isa9"))}},
jV:{"^":"j:40;",
$1:function(a){H.i(a,"$isN")
P.Y("["+C.d.ad(a.x,0)+", "+C.d.ad(a.y,0)+"]")}}},1],["","",,U,{"^":"",hs:{"^":"cx;0F,0M,ax,0T,0q,ak,0N,0U,0am,u,aa,ay,k3,k4,r1,r2,rx,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,0db,0dx,dy,0fr,fx,0fy,go,id,0k1,0a",
h1:function(a){var z,y
z=a.x
if(z===32){y=this.ax
P.Y("height: "+this.F+", width: "+this.M+", point x: "+H.f(y.a)+", point y: "+H.f(y.b)+", paddleLoc: "+y.h(0))}if(z===38){P.Y("move down")
z=this.q
y=z.d
if(y>0){z.d=y-this.ak
z.id=!0}else{P.Y("paddle would go beyond bounds")
return}}else if(z===40){P.Y("move up")
z=this.q
if(z.d+z.gaV().d<600){z=this.q
z.d=z.d+this.ak
z.id=!0}else{P.Y("paddle would go beyond bounds")
return}}else if(z===37){P.Y("move left")
z=this.q
if(z.c+z.gaV().c>0){z=this.q
z.c=z.c-this.ak
z.id=!0}else{P.Y("paddle would go beyond bounds")
return}}else if(z===39){P.Y("move right")
z=this.q
if(z.c+z.gaV().c<790){z=this.q
z.c=z.c+this.ak
z.id=!0}else{P.Y("paddle would go beyond bounds")
P.Y("paddle.x: "+H.f(this.q.c)+" paddle.width: "+H.f(this.q.gaV().c))
return}}}}}],["","",,S,{"^":"",hU:{"^":"cx;F,0M,0N,0U,0am,u,aa,ay,k3,k4,r1,r2,rx,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,0db,0dx,dy,0fr,fx,0fy,go,id,0k1,0a"}}]]
setupProgram(dart,0,0)
J.r=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dy.prototype
return J.dx.prototype}if(typeof a=="string")return J.bC.prototype
if(a==null)return J.dz.prototype
if(typeof a=="boolean")return J.fZ.prototype
if(a.constructor==Array)return J.av.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b6.prototype
return a}if(a instanceof P.a)return a
return J.c4(a)}
J.c3=function(a){if(typeof a=="string")return J.bC.prototype
if(a==null)return a
if(a.constructor==Array)return J.av.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b6.prototype
return a}if(a instanceof P.a)return a
return J.c4(a)}
J.eT=function(a){if(a==null)return a
if(a.constructor==Array)return J.av.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b6.prototype
return a}if(a instanceof P.a)return a
return J.c4(a)}
J.eU=function(a){if(typeof a=="number")return J.bB.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bR.prototype
return a}
J.eV=function(a){if(typeof a=="string")return J.bC.prototype
if(a==null)return a
if(!(a instanceof P.a))return J.bR.prototype
return a}
J.T=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.b6.prototype
return a}if(a instanceof P.a)return a
return J.c4(a)}
J.bn=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.r(a).J(a,b)}
J.f3=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.eU(a).c6(a,b)}
J.f4=function(a,b,c,d){return J.T(a).e4(a,b,c,d)}
J.f5=function(a,b,c,d){return J.T(a).es(a,b,c,d)}
J.f6=function(a,b){return J.T(a).eQ(a,b)}
J.f7=function(a,b,c,d){return J.T(a).eR(a,b,c,d)}
J.f8=function(a,b){return J.eV(a).cO(a,b)}
J.d5=function(a,b){return J.T(a).cP(a,b)}
J.c9=function(a,b,c){return J.c3(a).aX(a,b,c)}
J.d6=function(a,b){return J.eT(a).a_(a,b)}
J.ap=function(a){return J.r(a).gv(a)}
J.d7=function(a){return J.eT(a).gD(a)}
J.aq=function(a){return J.c3(a).gm(a)}
J.f9=function(a){return J.T(a).gfZ(a)}
J.aL=function(a){return J.T(a).gdQ(a)}
J.fa=function(a,b){return J.T(a).sbg(a,b)}
J.bo=function(a){return J.r(a).h(a)}
J.fb=function(a,b){return J.eU(a).ad(a,b)}
J.fc=function(a){return J.eV(a).ha(a)}
I.d1=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.V=W.fq.prototype
C.r=W.b2.prototype
C.c=W.dd.prototype
C.A=W.fR.prototype
C.Z=J.q.prototype
C.b=J.av.prototype
C.a_=J.dx.prototype
C.i=J.dy.prototype
C.o=J.dz.prototype
C.d=J.bB.prototype
C.f=J.bC.prototype
C.a6=J.b6.prototype
C.F=H.hl.prototype
C.G=H.hn.prototype
C.H=J.ht.prototype
C.a=P.bN.prototype
C.y=J.bR.prototype
C.T=W.aX.prototype
C.U=W.ik.prototype
C.j=new L.fp(1,771,"source-over")
C.W=new P.hr()
C.h=new P.j3()
C.k=new Z.bs(0,"Direction.Left")
C.m=new Z.bs(1,"Direction.Right")
C.l=new Z.bs(2,"Direction.Up")
C.n=new Z.bs(3,"Direction.Down")
C.z=new R.ce(0,"EventPhase.CAPTURING_PHASE")
C.e=new R.ce(1,"EventPhase.AT_TARGET")
C.X=new R.ce(2,"EventPhase.BUBBLING_PHASE")
C.t=new R.ci(0,"InputEventMode.MouseOnly")
C.Y=new R.ci(1,"InputEventMode.TouchOnly")
C.B=new R.ci(2,"InputEventMode.MouseAndTouch")
C.a0=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.a1=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.C=function(hooks) { return hooks; }

C.a2=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.a3=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.a4=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.a5=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.D=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.a7=new R.b8(0)
C.a8=new R.b8(1)
C.a9=new R.b8(2)
C.aa=new R.b8(3)
C.E=new R.b8(4)
C.ab=H.k(I.d1([]),[P.p])
C.u=new L.dS(0,"RenderEngine.WebGL")
C.I=new L.dS(1,"RenderEngine.Canvas2D")
C.ac=new L.dU(9728)
C.J=new L.dU(9729)
C.p=new L.hO(33071)
C.v=new A.aa(0,"StageAlign.TOP_LEFT")
C.K=new A.aa(1,"StageAlign.TOP")
C.L=new A.aa(2,"StageAlign.TOP_RIGHT")
C.M=new A.aa(3,"StageAlign.LEFT")
C.q=new A.aa(4,"StageAlign.NONE")
C.N=new A.aa(5,"StageAlign.RIGHT")
C.O=new A.aa(6,"StageAlign.BOTTOM_LEFT")
C.P=new A.aa(7,"StageAlign.BOTTOM")
C.Q=new A.aa(8,"StageAlign.BOTTOM_RIGHT")
C.w=new A.cy(0,"StageRenderMode.AUTO")
C.R=new A.cy(2,"StageRenderMode.ONCE")
C.ad=new A.cy(3,"StageRenderMode.STOP")
C.S=new A.bO(0,"StageScaleMode.EXACT_FIT")
C.ae=new A.bO(1,"StageScaleMode.NO_BORDER")
C.af=new A.bO(2,"StageScaleMode.NO_SCALE")
C.x=new A.bO(3,"StageScaleMode.SHOW_ALL")
$.bG=null
$.bH=null
$.a3=0
$.aM=null
$.da=null
$.cQ=!1
$.eX=null
$.eM=null
$.f0=null
$.c2=null
$.c5=null
$.d_=null
$.aC=null
$.aY=null
$.aZ=null
$.cR=!1
$.o=C.h
$.cz=null
$.dl=null
$.dk=null
$.dj=null
$.di=null
$.K=0
$.ev=1
$.bK=0
$.eD=17976931348623157e292
$.cO=-1
$.dv=null
$.hi=!1
$.hj="auto"
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){var z=$dart_deferred_initializers$[a]
if(z==null)throw"DeferredLoading state error: code with hash '"+a+"' was not loaded"
z($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryParts={}
init.deferredPartUris=[]
init.deferredPartHashes=[];(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["dh","$get$dh",function(){return H.eW("_$dart_dartClosure")},"cl","$get$cl",function(){return H.eW("_$dart_js")},"e2","$get$e2",function(){return H.a7(H.bQ({
toString:function(){return"$receiver$"}}))},"e3","$get$e3",function(){return H.a7(H.bQ({$method$:null,
toString:function(){return"$receiver$"}}))},"e4","$get$e4",function(){return H.a7(H.bQ(null))},"e5","$get$e5",function(){return H.a7(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"e9","$get$e9",function(){return H.a7(H.bQ(void 0))},"ea","$get$ea",function(){return H.a7(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"e7","$get$e7",function(){return H.a7(H.e8(null))},"e6","$get$e6",function(){return H.a7(function(){try{null.$method$}catch(z){return z.message}}())},"ec","$get$ec",function(){return H.a7(H.e8(void 0))},"eb","$get$eb",function(){return H.a7(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cF","$get$cF",function(){return P.ir()},"b_","$get$b_",function(){return[]},"dg","$get$dg",function(){return{}},"d9","$get$d9",function(){return new A.fm(!0,!0,!1,H.k([1,2],[P.aF]),!1)},"cP","$get$cP",function(){return[]},"cM","$get$cM",function(){return H.k([],[[R.H,R.bu]])},"cN","$get$cN",function(){return H.k([],[[R.H,R.bx]])},"cT","$get$cT",function(){return H.k([],[[R.H,R.bL]])},"cX","$get$cX",function(){var z=W.k3().devicePixelRatio
return typeof z!=="number"?1:z},"eZ","$get$eZ",function(){return Q.jl()},"eA","$get$eA",function(){return W.b3(16,16)},"cL","$get$cL",function(){var z=$.$get$eA()
return(z&&C.r).gfl(z)},"eB","$get$eB",function(){return H.dD(P.x,Y.bS)},"cp","$get$cp",function(){return H.dD(P.x,Q.hh)},"dK","$get$dK",function(){return P.i3(null,null,!1,P.x)},"dL","$get$dL",function(){var z=$.$get$dK()
z.toString
return new P.iw(z,[H.c(z,0)])}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1,ret:P.p},{func:1,ret:-1},{func:1,ret:P.p,args:[,,]},{func:1,ret:-1,args:[P.a],opt:[P.A]},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,ret:P.ad,args:[O.ag]},{func:1,args:[,]},{func:1,ret:P.p,args:[,]},{func:1,ret:-1,args:[A.bg]},{func:1,ret:-1,args:[P.aN]},{func:1,ret:-1,args:[W.L]},{func:1,ret:P.p,args:[,],opt:[,]},{func:1,args:[P.x]},{func:1,ret:-1,opt:[P.a]},{func:1,ret:P.w},{func:1,ret:[P.I,,],args:[,]},{func:1,args:[W.L]},{func:1,ret:A.as,args:[W.au]},{func:1,ret:P.m,args:[P.m,P.m]},{func:1,ret:P.ad,args:[A.a0]},{func:1,ret:-1,args:[A.a0]},{func:1,ret:-1,args:[W.aT]},{func:1,ret:-1,args:[W.aX]},{func:1,ret:-1,args:[W.bf]},{func:1,ret:-1,args:[W.b9]},{func:1,ret:-1,args:[P.x]},{func:1,args:[,P.x]},{func:1,ret:A.bX},{func:1,ret:-1,args:[,]},{func:1,ret:P.p,args:[,P.A]},{func:1,ret:P.p,args:[P.m]},{func:1,ret:-1,args:[P.m]},{func:1,ret:P.p,args:[P.w,,]},{func:1,ret:[P.F,,],args:[O.ag]},{func:1,ret:P.p,args:[{func:1,ret:-1}]},{func:1,ret:Y.bS},{func:1,ret:-1,args:[R.a9]},{func:1,ret:-1,args:[R.be]},{func:1,ret:-1,args:[R.N]},{func:1,ret:P.p,args:[R.a9]},{func:1,ret:P.p,args:[R.N]},{func:1,ret:P.m},{func:1,ret:-1,args:[A.as]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.k0(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.d1=a.d1
Isolate.cY=a.cY
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(F.bl,[])
else F.bl([])})})()
//# sourceMappingURL=main.dart.js.map
