(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{1501:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),i=n(725),c=n(726),a=n(553),u={title1:"Out",title2:"Door Services",title3:"Choose and book 100+ services and track then on Gigzzy App",title4:"we will send you a link, open it on your phone to download the app"},s=o.a.lazy(function(){return Promise.all([n.e(0),n.e(1),n.e(4),n.e(6),n.e(9)]).then(n.bind(null,970))}),l=o.a.lazy(function(){return Promise.all([n.e(0),n.e(7),n.e(19),n.e(103)]).then(n.bind(null,1516))});e.default=function(){return o.a.createElement("div",{className:"my-4"},o.a.createElement(i.a,null,o.a.createElement(c.a,{md:24},o.a.createElement(r.Suspense,{fallback:o.a.createElement(a.a,{active:!0})},o.a.createElement(s,{header_data:u})))),o.a.createElement(i.a,null,o.a.createElement(c.a,{md:24},o.a.createElement(r.Suspense,{fallback:o.a.createElement(a.a,{active:!0})},o.a.createElement(l,null)))))}},579:function(t,e,n){"use strict";var r=n(72),o=n.n(r)()({});e.a=o},580:function(t,e){t.exports={isFunction:function(t){return"function"===typeof t},isArray:function(t){return"[object Array]"===Object.prototype.toString.apply(t)},each:function(t,e){for(var n=0,r=t.length;n<r&&!1!==e(t[n],n);n++);}}},598:function(t,e,n){var r=n(603);t.exports=new r},603:function(t,e,n){var r=n(604),o=n(580),i=o.each,c=o.isFunction,a=o.isArray;function u(){if(!window.matchMedia)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!window.matchMedia("only all").matches}u.prototype={constructor:u,register:function(t,e,n){var o=this.queries,u=n&&this.browserIsIncapable;return o[t]||(o[t]=new r(t,u)),c(e)&&(e={match:e}),a(e)||(e=[e]),i(e,function(e){c(e)&&(e={match:e}),o[t].addHandler(e)}),this},unregister:function(t,e){var n=this.queries[t];return n&&(e?n.removeHandler(e):(n.clear(),delete this.queries[t])),this}},t.exports=u},604:function(t,e,n){var r=n(605),o=n(580).each;function i(t,e){this.query=t,this.isUnconditional=e,this.handlers=[],this.mql=window.matchMedia(t);var n=this;this.listener=function(t){n.mql=t.currentTarget||t,n.assess()},this.mql.addListener(this.listener)}i.prototype={constuctor:i,addHandler:function(t){var e=new r(t);this.handlers.push(e),this.matches()&&e.on()},removeHandler:function(t){var e=this.handlers;o(e,function(n,r){if(n.equals(t))return n.destroy(),!e.splice(r,1)})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){o(this.handlers,function(t){t.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var t=this.matches()?"on":"off";o(this.handlers,function(e){e[t]()})}},t.exports=i},605:function(t,e){function n(t){this.options=t,!t.deferSetup&&this.setup()}n.prototype={constructor:n,setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(t){return this.options===t||this.options.match===t}},t.exports=n},627:function(t,e,n){"use strict";n.d(e,"a",function(){return g});var r=n(0),o=n(4),i=n(19),c=n.n(i),a=n(579),u=n(286);function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(){return(l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function f(t){return(f="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function p(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function h(t){return function(){var e,n=d(t);if(function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}()){var r=d(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return function(t,e){if(e&&("object"===f(e)||"function"===typeof e))return e;return y(t)}(this,e)}}function y(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function d(t){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function m(t,e){return(m=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var b=function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]])}return n},v=o.oneOfType([o.object,o.number]),g=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&m(t,e)}(d,r["Component"]);var e,n,o,i=h(d);function d(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,d),(t=i.apply(this,arguments)).renderCol=function(e){var n,o=e.getPrefixCls,i=y(t).props,u=i.prefixCls,p=i.span,h=i.order,d=i.offset,m=i.push,v=i.pull,g=i.className,w=i.children,O=b(i,["prefixCls","span","order","offset","push","pull","className","children"]),j=o("col",u),x={};["xs","sm","md","lg","xl","xxl"].forEach(function(t){var e,n={},r=i[t];"number"===typeof r?n.span=r:"object"===f(r)&&(n=r||{}),delete O[t],x=l(l({},x),(s(e={},"".concat(j,"-").concat(t,"-").concat(n.span),void 0!==n.span),s(e,"".concat(j,"-").concat(t,"-order-").concat(n.order),n.order||0===n.order),s(e,"".concat(j,"-").concat(t,"-offset-").concat(n.offset),n.offset||0===n.offset),s(e,"".concat(j,"-").concat(t,"-push-").concat(n.push),n.push||0===n.push),s(e,"".concat(j,"-").concat(t,"-pull-").concat(n.pull),n.pull||0===n.pull),e))});var P=c()(j,(s(n={},"".concat(j,"-").concat(p),void 0!==p),s(n,"".concat(j,"-order-").concat(h),h),s(n,"".concat(j,"-offset-").concat(d),d),s(n,"".concat(j,"-push-").concat(m),m),s(n,"".concat(j,"-pull-").concat(v),v),n),g,x);return r.createElement(a.a.Consumer,null,function(t){var e=t.gutter,n=O.style;return e&&(n=l(l(l({},e[0]>0?{paddingLeft:e[0]/2,paddingRight:e[0]/2}:{}),e[1]>0?{paddingTop:e[1]/2,paddingBottom:e[1]/2}:{}),n)),r.createElement("div",l({},O,{style:n,className:P}),w)})},t}return e=d,(n=[{key:"render",value:function(){return r.createElement(u.a,null,this.renderCol)}}])&&p(e.prototype,n),o&&p(e,o),d}();g.propTypes={span:o.number,order:o.number,offset:o.number,push:o.number,pull:o.number,className:o.string,children:o.node,xs:v,sm:v,md:v,lg:v,xl:v,xxl:v}},629:function(t,e,n){"use strict";var r,o=n(0),i=n(19),c=n.n(i),a=n(4),u=n(286),s=n(579),l=n(556);function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function p(){return(p=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}if("undefined"!==typeof window){window.matchMedia||(window.matchMedia=function(t){return{media:t,matches:!1,addListener:function(){},removeListener:function(){}}}),r=n(598)}var h=["xxl","xl","lg","md","sm","xs"],y={xs:"(max-width: 575px)",sm:"(min-width: 576px)",md:"(min-width: 768px)",lg:"(min-width: 992px)",xl:"(min-width: 1200px)",xxl:"(min-width: 1600px)"},d=[],m=-1,b={},v={dispatch:function(t){return b=t,!(d.length<1)&&(d.forEach(function(t){t.func(b)}),!0)},subscribe:function(t){0===d.length&&this.register();var e=(++m).toString();return d.push({token:e,func:t}),t(b),e},unsubscribe:function(t){0===(d=d.filter(function(e){return e.token!==t})).length&&this.unregister()},unregister:function(){Object.keys(y).map(function(t){return r.unregister(y[t])})},register:function(){var t=this;Object.keys(y).map(function(e){return r.register(y[e],{match:function(){var n=p(p({},b),f({},e,!0));t.dispatch(n)},unmatch:function(){var n=p(p({},b),f({},e,!1));t.dispatch(n)},destroy:function(){}})})}};function g(t){return(g="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function w(){return(w=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}).apply(this,arguments)}function O(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function j(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function x(t){return function(){var e,n=P(t);if(function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}()){var r=P(this).constructor;e=Reflect.construct(n,arguments,r)}else e=n.apply(this,arguments);return function(t,e){if(e&&("object"===g(e)||"function"===typeof e))return e;return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,e)}}function P(t){return(P=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function E(t,e){return(E=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}n.d(e,"a",function(){return R});var S=function(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]])}return n},k=Object(l.a)("top","middle","bottom","stretch"),_=Object(l.a)("start","end","center","space-around","space-between"),R=function(t){!function(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&E(t,e)}(a,o["Component"]);var e,n,r,i=x(a);function a(){var t;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.apply(this,arguments)).state={screens:{}},t.renderRow=function(e){var n,r=e.getPrefixCls,i=t.props,a=i.prefixCls,u=i.type,l=i.justify,f=i.align,p=i.className,h=i.style,y=i.children,d=S(i,["prefixCls","type","justify","align","className","style","children"]),m=r("row",a),b=t.getGutter(),v=c()((O(n={},m,!u),O(n,"".concat(m,"-").concat(u),u),O(n,"".concat(m,"-").concat(u,"-").concat(l),u&&l),O(n,"".concat(m,"-").concat(u,"-").concat(f),u&&f),n),p),g=w(w(w({},b[0]>0?{marginLeft:b[0]/-2,marginRight:b[0]/-2}:{}),b[1]>0?{marginTop:b[1]/-2,marginBottom:b[1]/-2}:{}),h),j=w({},d);return delete j.gutter,o.createElement(s.a.Provider,{value:{gutter:b}},o.createElement("div",w({},j,{className:v,style:g}),y))},t}return e=a,(n=[{key:"componentDidMount",value:function(){var t=this;this.token=v.subscribe(function(e){var n=t.props.gutter;("object"===g(n)||Array.isArray(n)&&("object"===g(n[0])||"object"===g(n[1])))&&t.setState({screens:e})})}},{key:"componentWillUnmount",value:function(){v.unsubscribe(this.token)}},{key:"getGutter",value:function(){var t=[0,0],e=this.props.gutter,n=this.state.screens;return(Array.isArray(e)?e:[e,0]).forEach(function(e,r){if("object"===g(e))for(var o=0;o<h.length;o++){var i=h[o];if(n[i]&&void 0!==e[i]){t[r]=e[i];break}}else t[r]=e||0}),t}},{key:"render",value:function(){return o.createElement(u.a,null,this.renderRow)}}])&&j(e.prototype,n),r&&j(e,r),a}();R.defaultProps={gutter:0},R.propTypes={type:a.oneOf(["flex"]),align:a.oneOf(k),justify:a.oneOf(_),className:a.string,children:a.node,gutter:a.oneOfType([a.object,a.number,a.array]),prefixCls:a.string}},725:function(t,e,n){"use strict";var r=n(629);e.a=r.a},726:function(t,e,n){"use strict";var r=n(627);e.a=r.a}}]);
//# sourceMappingURL=79.8a408a6f.chunk.js.map