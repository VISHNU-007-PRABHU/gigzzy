(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{2053:function(t,e,r){"use strict";r.r(e);var n=r(12),o=r(13),i=r(15),a=r(14),c=r(1),l=r.n(c),u=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),s=function(t){function e(e){var r=t.call(this,e)||this;return r.name="AssertionError",r}return u(e,t),e}(Error);function h(t,e){if(!t)throw new s(e)}function p(t){var e=Object.entries(t).filter(function(t){var e=t[1];return void 0!==e&&null!==e}).map(function(t){var e=t[0],r=t[1];return encodeURIComponent(e)+"="+encodeURIComponent(String(r))});return e.length>0?"?"+e.join("&"):""}var f=r(4),w=r.n(f),d=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),y=function(){return(y=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},b=function(t,e,r,n){return new(r||(r=Promise))(function(o,i){function a(t){try{l(n.next(t))}catch(e){i(e)}}function c(t){try{l(n.throw(t))}catch(e){i(e)}}function l(t){var e;t.done?o(t.value):(e=t.value,e instanceof r?e:new r(function(t){t(e)})).then(a,c)}l((n=n.apply(t,e||[])).next())})},v=function(t,e){var r,n,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;a;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,n=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=e.call(t,a)}catch(c){i=[6,c],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}},g=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(t);o<n.length;o++)e.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(t,n[o])&&(r[n[o]]=t[n[o]])}return r},m=function(t){return!!t&&("object"===typeof t||"function"===typeof t)&&"function"===typeof t.then},O=function(t,e){return{left:window.outerWidth/2+(window.screenX||window.screenLeft||0)-t/2,top:window.outerHeight/2+(window.screenY||window.screenTop||0)-e/2}},k=function(t,e){return{top:(window.screen.height-e)/2,left:(window.screen.width-t)/2}};var j=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.openShareDialog=function(t){var r=e.props,n=r.onShareWindowClose,o=r.windowHeight,i=void 0===o?400:o,a=r.windowPosition,c=void 0===a?"windowCenter":a,l=r.windowWidth,u=void 0===l?550:l;!function(t,e,r){var n=e.height,o=e.width,i=g(e,["height","width"]),a=y({height:n,width:o,location:"no",toolbar:"no",status:"no",directories:"no",menubar:"no",scrollbars:"yes",resizable:"no",centerscreen:"yes",chrome:"yes"},i),c=window.open(t,"",Object.keys(a).map(function(t){return t+"="+a[t]}).join(", "));if(r)var l=window.setInterval(function(){try{(null===c||c.closed)&&(window.clearInterval(l),r(c))}catch(t){console.error(t)}},1e3)}(t,y({height:i,width:u},"windowCenter"===c?O(u,i):k(u,i)),n)},e.handleClick=function(t){return b(e,void 0,void 0,function(){var e,r,n,o,i,a,c,l,u,s;return v(this,function(h){switch(h.label){case 0:return e=this.props,r=e.beforeOnClick,n=e.disabled,o=e.networkLink,i=e.onClick,a=e.url,c=e.openShareDialogOnClick,l=e.opts,u=o(a,l),n?[2]:(t.preventDefault(),r?(s=r(),m(s)?[4,s]:[3,2]):[3,2]);case 1:h.sent(),h.label=2;case 2:return c&&this.openShareDialog(u),i&&i(t,u),[2]}})})},e}return d(e,t),e.prototype.render=function(){var t=this.props,e=(t.beforeOnClick,t.children),r=t.className,n=t.disabled,o=t.disabledStyle,i=t.forwardedRef,a=(t.networkLink,t.networkName),c=(t.onShareWindowClose,t.openShareDialogOnClick,t.opts,t.resetButtonStyle),u=t.style,s=(t.url,t.windowHeight,t.windowPosition,t.windowWidth,g(t,["beforeOnClick","children","className","disabled","disabledStyle","forwardedRef","networkLink","networkName","onShareWindowClose","openShareDialogOnClick","opts","resetButtonStyle","style","url","windowHeight","windowPosition","windowWidth"])),h=w()("react-share__ShareButton",{"react-share__ShareButton--disabled":!!n,disabled:!!n},r),p=y(y(c?{backgroundColor:"transparent",border:"none",padding:0,font:"inherit",color:"inherit",cursor:"pointer"}:{},u),n&&o);return l.a.createElement("button",y({},s,{"aria-label":s["aria-label"]||a,className:h,onClick:this.handleClick,ref:i,style:p}),e)},e.defaultProps={disabledStyle:{opacity:.6},openShareDialogOnClick:!0,resetButtonStyle:!0},e}(c.Component),C=function(){return(C=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};var S=function(t,e,r,n){function o(o,i){var a=r(o),c=C({},o);return Object.keys(a).forEach(function(t){delete c[t]}),l.a.createElement(j,C({},n,c,{forwardedRef:i,networkName:t,networkLink:e,opts:r(o)}))}return o.displayName="ShareButton-"+t,Object(c.forwardRef)(o)};var E=S("facebook",function(t,e){var r=e.quote,n=e.hashtag;return h(t,"facebook.url"),"https://www.facebook.com/sharer/sharer.php"+p({u:t,quote:r,hashtag:n})},function(t){return{quote:t.quote,hashtag:t.hashtag}},{windowWidth:550,windowHeight:400}),_=function(){return(_=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)},z=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(t);o<n.length;o++)e.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(t,n[o])&&(r[n[o]]=t[n[o]])}return r};function P(t){var e=function(e){var r=e.bgStyle,n=e.borderRadius,o=e.iconFillColor,i=e.round,a=e.size,c=z(e,["bgStyle","borderRadius","iconFillColor","round","size"]);return l.a.createElement("svg",_({viewBox:"0 0 64 64",width:a,height:a},c),i?l.a.createElement("circle",{cx:"32",cy:"32",r:"31",fill:t.color,style:r}):l.a.createElement("rect",{width:"64",height:"64",rx:n,ry:n,fill:t.color,style:r}),l.a.createElement("path",{d:t.path,fill:o}))};return e.defaultProps={bgStyle:{},borderRadius:0,iconFillColor:"white",size:64},e}var x=P({color:"#3b5998",networkName:"facebook",path:"M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"});var N=S("twitter",function(t,e){var r=e.title,n=e.via,o=e.hashtags,i=void 0===o?[]:o,a=e.related,c=void 0===a?[]:a;return h(t,"twitter.url"),h(Array.isArray(i),"twitter.hashtags is not an array"),h(Array.isArray(c),"twitter.related is not an array"),"https://twitter.com/share"+p({url:t,text:r,via:n,hashtags:i.length>0?i.join(","):void 0,related:c.length>0?c.join(","):void 0})},function(t){return{hashtags:t.hashtags,title:t.title,via:t.via,related:t.related}},{windowWidth:550,windowHeight:400}),H=P({color:"#00aced",networkName:"twitter",path:"M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z"});var W=S("linkedin",function(t,e){var r=e.title,n=e.summary,o=e.source;return h(t,"linkedin.url"),"https://linkedin.com/shareArticle"+p({url:t,mini:"true",title:r,summary:n,source:o})},function(t){return{title:t.title,summary:t.summary,source:t.source}},{windowWidth:750,windowHeight:600}),A=P({color:"#007fb1",networkName:"linkedin",path:"M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z"});var R=S("whatsapp",function(t,e){var r=e.title,n=e.separator;return h(t,"whatsapp.url"),"https://"+(/(android|iphone|ipad|mobile)/i.test(navigator.userAgent)?"api":"web")+".whatsapp.com/send"+p({text:r?r+n+t:t})},function(t){return{title:t.title,separator:t.separator||" "}},{windowWidth:550,windowHeight:400}),D=P({color:"#25D366",networkName:"whatsapp",path:"m42.32286,33.93287c-0.5178,-0.2589 -3.04726,-1.49644 -3.52105,-1.66732c-0.4712,-0.17346 -0.81554,-0.2589 -1.15987,0.2589c-0.34175,0.51004 -1.33075,1.66474 -1.63108,2.00648c-0.30032,0.33658 -0.60064,0.36247 -1.11327,0.12945c-0.5178,-0.2589 -2.17994,-0.80259 -4.14759,-2.56312c-1.53269,-1.37217 -2.56312,-3.05503 -2.86603,-3.57283c-0.30033,-0.5178 -0.03366,-0.80259 0.22524,-1.06149c0.23301,-0.23301 0.5178,-0.59547 0.7767,-0.90616c0.25372,-0.31068 0.33657,-0.5178 0.51262,-0.85437c0.17088,-0.36246 0.08544,-0.64725 -0.04402,-0.90615c-0.12945,-0.2589 -1.15987,-2.79613 -1.58964,-3.80584c-0.41424,-1.00971 -0.84142,-0.88027 -1.15987,-0.88027c-0.29773,-0.02588 -0.64208,-0.02588 -0.98382,-0.02588c-0.34693,0 -0.90616,0.12945 -1.37736,0.62136c-0.4712,0.5178 -1.80194,1.76053 -1.80194,4.27186c0,2.51134 1.84596,4.945 2.10227,5.30747c0.2589,0.33657 3.63497,5.51458 8.80262,7.74113c1.23237,0.5178 2.1903,0.82848 2.94111,1.08738c1.23237,0.38836 2.35599,0.33657 3.24402,0.20712c0.99159,-0.15534 3.04985,-1.24272 3.47963,-2.45956c0.44013,-1.21683 0.44013,-2.22654 0.31068,-2.45955c-0.12945,-0.23301 -0.46601,-0.36247 -0.98382,-0.59548m-9.40068,12.84407l-0.02589,0c-3.05503,0 -6.08417,-0.82849 -8.72495,-2.38189l-0.62136,-0.37023l-6.47252,1.68286l1.73463,-6.29129l-0.41424,-0.64725c-1.70875,-2.71846 -2.6149,-5.85116 -2.6149,-9.07706c0,-9.39809 7.68934,-17.06155 17.15993,-17.06155c4.58253,0 8.88029,1.78642 12.11655,5.02268c3.23625,3.21036 5.02267,7.50812 5.02267,12.06476c-0.0078,9.3981 -7.69712,17.06155 -17.14699,17.06155m14.58906,-31.58846c-3.93529,-3.80584 -9.1133,-5.95471 -14.62789,-5.95471c-11.36055,0 -20.60848,9.2065 -20.61625,20.52564c0,3.61684 0.94757,7.14565 2.75211,10.26282l-2.92557,10.63564l10.93337,-2.85309c3.0136,1.63108 6.4052,2.4958 9.85634,2.49839l0.01037,0c11.36574,0 20.61884,-9.2091 20.62403,-20.53082c0,-5.48093 -2.14111,-10.64081 -6.03239,-14.51915"}),B=function(t){Object(i.a)(r,t);var e=Object(a.a)(r);function r(){return Object(n.a)(this,r),e.apply(this,arguments)}return Object(o.a)(r,[{key:"render",value:function(){return l.a.createElement("div",{className:"d-flex justify-content-around my-2"},l.a.createElement(E,{url:"https://web.facebook.com/gigzzy",hashtag:"#programing joke"},l.a.createElement(x,{logoFillColor:"white",size:32,round:!0})),l.a.createElement(N,{url:"https://twitter.com/Gigzzyafrica",hashtag:"#programing joke"},l.a.createElement(H,{logoFillColor:"white",size:32,round:!0})),l.a.createElement(W,{url:"https://www.linkedin.com/company/gigzzy-africa/about/?viewAsMember=true",hashtag:"#programing joke"},l.a.createElement(A,{logoFillColor:"white",size:32,round:!0})),l.a.createElement(R,{url:"https://www.whatsapp.com/",hashtag:"#programing joke"},l.a.createElement(D,{logoFillColor:"white",size:32,round:!0})))}}]),r}(l.a.Component);e.default=B}}]);
//# sourceMappingURL=49.00ac2fae.chunk.js.map