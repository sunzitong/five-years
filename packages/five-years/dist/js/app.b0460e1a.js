(function(e){function t(t){for(var a,r,o=t[0],u=t[1],s=t[2],d=0,l=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(c,r)&&c[r]&&l.push(c[r][0]),c[r]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);f&&f(t);while(l.length)l.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,r=1;r<n.length;r++){var o=n[r];0!==c[o]&&(a=!1)}a&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var a={},r={app:0},c={app:0},i=[];function o(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-28757ccf":"2ae267a4","chunk-2d0d43d7":"156002df","chunk-7c2fc187":"3b0536f0"}[e]+".js"}function u(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-28757ccf":1,"chunk-7c2fc187":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-28757ccf":"b0e0b622","chunk-2d0d43d7":"31d6cfe0","chunk-7c2fc187":"96722b02"}[e]+".css",c=u.p+a,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var s=i[o],d=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(d===a||d===c))return t()}var l=document.getElementsByTagName("style");for(o=0;o<l.length;o++){s=l[o],d=s.getAttribute("data-href");if(d===a||d===c)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var a=t&&t.target&&t.target.src||c,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete r[e],f.parentNode.removeChild(f),n(i)},f.href=c;var p=document.getElementsByTagName("head")[0];p.appendChild(f)})).then((function(){r[e]=0})));var a=c[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise((function(t,n){a=c[e]=[t,n]}));t.push(a[2]=i);var s,d=document.createElement("script");d.charset="utf-8",d.timeout=120,u.nc&&d.setAttribute("nonce",u.nc),d.src=o(e);var l=new Error;s=function(t){d.onerror=d.onload=null,clearTimeout(f);var n=c[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",l.name="ChunkLoadError",l.type=a,l.request=r,n[1](l)}c[e]=void 0}};var f=setTimeout((function(){s({type:"timeout",target:d})}),12e4);d.onerror=d.onload=s,document.head.appendChild(d)}return Promise.all(t)},u.m=e,u.c=a,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)u.d(n,a,function(t){return e[t]}.bind(null,a));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/fe/five-years/",u.oe=function(e){throw e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],d=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var f=d;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"0613":function(e,t,n){"use strict";n.d(t,"b",(function(){return r}));var a=n("b850"),r=a["a"].env;t["a"]=a["a"]},1:function(e,t){},1722:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"d",(function(){return d})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return f}));var a=n("5530"),r=(n("99af"),n("09ee")),c=n("84dd"),i=n("a78e"),o=n.n(i),u=n("bae2");function s(){var e,t,n=Object(c["judgeDevice"])();switch(n){case"小程序":t=Object(u["a"])().sessionId;break;case"APP":t=null===(e=Object(r["getAppAuthInfo"])())||void 0===e?void 0:e.access_token;break;case"browser":t=o.a.get("GyAuthorization");break}return t||""}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=Object(c["judgeDevice"])();return"小程序"===t?(e=e||window.location.href,window.wx.miniProgram.navigateTo({url:"/packageA/pages/login/login?webviewUrl=".concat(encodeURIComponent(e))})):"APP"===t&&(window.location.href="guanyu://page.gy/login")}function l(e){window.wx.miniProgram.postMessage({data:Object(a["a"])({title:"",imageUrl:"",path:""},e)})}function f(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,c="";if(t){t=encodeURIComponent(t);var i=encodeURIComponent("/packageA/pages/bearWeb/bearWeb?item=".concat(t));c="guanyu://miniProgram?userName=gh_1b7cffb1d9a2&path=".concat(i,"&appId=wx1c1c8c073e2be1fc&type=").concat(n)}return Object(r["ShowSharePanel"])(Object(a["a"])({types:["wx_session"],title:"",url:"",text:"",image:"",shareMiniProgramUrl:c},e))}},4634:function(e,t,n){},"5c0b":function(e,t,n){"use strict";n("9c0c")},6418:function(e,t,n){},"6c4c":function(e,t,n){"use strict";var a=n("d4ec"),r=n("262e"),c=n("2caf"),i=n("9ab4"),o=n("2b0e"),u=n("b850"),s=n("2fe1"),d=function(e){Object(r["a"])(n,e);var t=Object(c["a"])(n);function n(){var e;return Object(a["a"])(this,n),e=t.apply(this,arguments),e.env=u["a"].env,e.store=u["a"],e}return n}(o["a"]);d=Object(i["a"])([s["b"]],d),t["a"]=d},"7b4b":function(e,t,n){"use strict";n("4634")},"9c0c":function(e,t,n){},b850:function(e,t,n){"use strict";var a=n("5530"),r={env:Object(a["a"])(Object(a["a"])({},Object({NODE_ENV:"production",VUE_APP_BASE_API:"",VUE_APP_BASE_IMG:"@/assets/img/",BASE_URL:"/fe/five-years/"})),{},{err:""})};t["a"]=r},c332:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("caad"),n("2532"),n("d3b7"),n("3ca3"),n("ddb0");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view"),e._e()],1)},c=[],i=n("d4ec"),o=n("bee2"),u=n("262e"),s=n("2caf"),d=(n("ac1f"),n("1276"),n("9ab4")),l=n("1b40"),f=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},p=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-loading"},[n("div",{staticClass:"spinner"},[n("div",{staticClass:"spinner-container container1"},[n("div",{staticClass:"circle1"}),n("div",{staticClass:"circle2"}),n("div",{staticClass:"circle3"}),n("div",{staticClass:"circle4"})]),n("div",{staticClass:"spinner-container container2"},[n("div",{staticClass:"circle1"}),n("div",{staticClass:"circle2"}),n("div",{staticClass:"circle3"}),n("div",{staticClass:"circle4"})]),n("div",{staticClass:"spinner-container container3"},[n("div",{staticClass:"circle1"}),n("div",{staticClass:"circle2"}),n("div",{staticClass:"circle3"}),n("div",{staticClass:"circle4"})])])])}],b=(n("7b4b"),n("2877")),h={},v=Object(b["a"])(h,f,p,!1,null,null,null),g=v.exports,m=n("6c4c"),w=n("1722"),j=n("84dd"),y=function(e){Object(u["a"])(n,e);var t=Object(s["a"])(n);function n(){var e;return Object(i["a"])(this,n),e=t.apply(this,arguments),e.visitSource=Object(j["judgeDevice"])(),e}return Object(o["a"])(n,[{key:"share",value:function(){var e="房东替我省钱？还不来冠寓五周年！",t="https://goyoo-assets.longfor.com/prod/app/11n975l2xafm2My4auT0HA.png";return"小程序"===this.visitSource?Object(w["b"])({title:e,imageUrl:t,path:window.location.href.split("?")[0]}):"APP"===this.visitSource?Object(w["c"])({title:e,image:t,url:window.location.href.split("?")[0]},window.location.href.split("?")[0],0):void 0}}]),n}(Object(l["c"])(m["a"]));Object(d["a"])([Object(l["d"])()],y.prototype,"visitSource",void 0),Object(d["a"])([Object(l["d"])()],y.prototype,"share",null),y=Object(d["a"])([Object(l["a"])({name:"app",components:{AppLoading:g}})],y);var O=y,k=O,C=(n("5c0b"),Object(b["a"])(k,r,c,!1,null,null,null)),E=C.exports,_=n("8c4f"),P=n("1da1"),S=(n("96cf"),n("5319"),n("0613"));n("bcdf");var x=function(e){e.beforeEach((function(e,t,n){n()})),e.afterEach(Object(P["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)}))))};a["a"].use(_["a"]);var A=[{path:"",redirect:{path:"index"}},{path:"index",component:function(){return n.e("chunk-28757ccf").then(n.bind(null,"d504"))},meta:"index"},{path:"*",component:function(){return n.e("chunk-7c2fc187").then(n.bind(null,"8cdb"))}}],I=new _["a"]({mode:"hash",routes:[{path:"/",component:function(){return n.e("chunk-2d0d43d7").then(n.bind(null,"5fd4"))},children:A,beforeEnter:function(e,t,n){n()}},{path:"*",component:function(){return n.e("chunk-7c2fc187").then(n.bind(null,"8cdb"))}}]});x(I);var L=I,M=(n("dbbd"),n("e17f"),n("2241")),T=(n("c194"),n("7744")),U=(n("2994"),n("2bdd")),z=(n("66b9"),n("b650")),N=(n("ac1e"),n("543e")),D=(n("4056"),n("44bf")),B=(n("66cf"),n("343b")),F=(n("f1dc"),n("6e47")),R=(n("8a58"),n("e41f")),$=(n("c3a6"),n("ad06")),V=(n("5f5f"),n("f253")),W=(n("e7e5"),n("d399"));W["a"].allowMultiple(!0),a["a"].use(W["a"]),a["a"].use(V["a"]),a["a"].use($["a"]),a["a"].use(R["a"]),a["a"].use(F["a"]),a["a"].use(B["a"]),a["a"].use(D["a"]),a["a"].use(N["a"]),a["a"].use(z["a"]),a["a"].use(U["a"]),a["a"].use(T["a"]),a["a"].use(M["a"]);n("c332");var q=n("5530");n("4de4");function G(e){if(e&&"none"!==e)return e="url(".concat(e,")"),{backgroundImage:e}}function H(e){if(e){var t={};return e.fontSize&&(t.fontSize=e.fontSize/a["a"].rem+"rem"),Object(q["a"])(Object(q["a"])(Object(q["a"])({},e),t),G(e.backgroundImage))}}a["a"].filter("bgImgFilter",G),a["a"].filter("styleFilter",H);n("6418");var J=n("6fbb"),K=n.n(J),Q=window.location.href,X="3ec10a66f82f4951ba811df964fcc199",Y="https://dataintest.longfor.com/zhuge.js?v=",Z=Object(j["judgeDevice"])();Q.includes("m.iguanyu.com")&&(X="c6911bc459bb41a5acbb720e91057739",Y="https://datain.longfor.com/zhuge.js?v="),K()({appKey:X,jsSrc:Y,options:{superProperty:{"访问来源":"browser"===Z?"其他":Z}}}),a["a"].use(K.a),a["a"].config.productionTip=!1,a["a"].config.ignoredElements=["wx-open-launch-weapp"];new a["a"]({data:S["a"],router:L,render:function(e){return e(E)},methods:{},provide:{}}).$mount("#app")},dbbd:function(e,t){(function(e,t){var n=e.documentElement,a="orientationchange"in window?"orientationchange":"resize",r=function(){var e=n.clientWidth;if(e){n.style.fontSize=e>=750?"100px":e/375*100+"px";var t=document.getElementsByTagName("html")[0],a=settingFs=parseInt(e/375*100),r=0;while(1){var c=parseInt(window.getComputedStyle(t).fontSize),i=c-a;if(!(Math.abs(i)>=1))break;if(i>0?settingFs--:settingFs++,t.setAttribute("style","font-size:"+settingFs+"px!important"),r++>100)break}}};e.addEventListener&&(t.addEventListener(a,r,!1),e.addEventListener("DOMContentLoaded",r,!1))})(document,window)}});