(window.webpackJsonp=window.webpackJsonp||[]).push([[91],{1114:function(t,e,r){"use strict";r.d(e,"a",function(){return l});var n="https://js.stripe.com/v3",i=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,o="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",s=null,u=function(t){return null!==s?s:s=new Promise(function(e,r){if("undefined"!==typeof window)if(window.Stripe&&t&&console.warn(o),window.Stripe)e(window.Stripe);else try{var s=function(){for(var t=document.querySelectorAll('script[src^="'.concat(n,'"]')),e=0;e<t.length;e++){var r=t[e];if(i.test(r.src))return r}return null}();s&&t?console.warn(o):s||(s=function(t){var e=t&&!t.advancedFraudSignals?"?advancedFraudSignals=false":"",r=document.createElement("script");r.src="".concat(n).concat(e);var i=document.head||document.body;if(!i)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return i.appendChild(r),r}(t)),s.addEventListener("load",function(){window.Stripe?e(window.Stripe):r(new Error("Stripe.js not available"))}),s.addEventListener("error",function(){r(new Error("Failed to load Stripe.js"))})}catch(u){return void r(u)}else e(null)})},a=Promise.resolve().then(function(){return u(null)}),c=!1;a.catch(function(t){c||console.warn(t)});var l=function(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];c=!0;var n=Date.now();return a.then(function(t){return function(t,e,r){if(null===t)return null;var n=t.apply(void 0,e);return function(t,e){t&&t._registerWrapper&&t._registerWrapper({name:"stripe-js",version:"1.18.0",startTime:e})}(n,r),n}(t,e,n)})}},1115:function(t,e,r){!function(t,e){"use strict";e=e&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e;var r="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";function n(){}function i(){}i.resetWarningCache=n;var o,s=(function(t){t.exports=function(){function t(t,e,n,i,o,s){if(s!==r){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function e(){return t}t.isRequired=t;var o={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:i,resetWarningCache:n};return o.PropTypes=o,o}()}(o={exports:{}},o.exports),o.exports);function u(t){return(u="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function l(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach(function(e){a(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function p(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,i=!1,o=void 0;try{for(var s,u=t[Symbol.iterator]();!(n=(s=u.next()).done)&&(r.push(s.value),!e||r.length!==e);n=!0);}catch(a){i=!0,o=a}finally{try{n||null==u.return||u.return()}finally{if(i)throw o}}return r}}(t,e)||function(t,e){if(t){if("string"===typeof t)return f(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?f(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var h=function(t){var r=e.useRef(t);return e.useEffect(function(){r.current=t},[t]),r.current},b=function(t){return null!==t&&"object"===u(t)},y=function(t,e,r){return b(t)?Object.keys(t).reduce(function(n,i){var o=!b(e)||!function t(e,r){if(!b(e)||!b(r))return e===r;var n=Array.isArray(e),i=Array.isArray(r);if(n!==i)return!1;var o="[object Object]"===Object.prototype.toString.call(e),s="[object Object]"===Object.prototype.toString.call(r);if(o!==s)return!1;if(!o&&!n)return!1;var u=Object.keys(e),a=Object.keys(r);if(u.length!==a.length)return!1;for(var c={},l=0;l<u.length;l+=1)c[u[l]]=!0;for(var p=0;p<a.length;p+=1)c[a[p]]=!0;var f=Object.keys(c);if(f.length!==u.length)return!1;var h=e,y=r;return f.every(function(e){return t(h[e],y[e])})}(t[i],e[i]);return r.includes(i)?(o&&console.warn("Unsupported prop change: options.".concat(i," is not a mutable property.")),n):o?l(l({},n||{}),{},a({},i,t[i])):n},null):null},d=function(t){if(null===t||b(e=t)&&"function"===typeof e.elements&&"function"===typeof e.createToken&&"function"===typeof e.createPaymentMethod&&"function"===typeof e.confirmCardPayment)return t;var e;throw new Error("Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.")},v=function(t){if(function(t){return b(t)&&"function"===typeof t.then}(t))return{tag:"async",stripePromise:Promise.resolve(t).then(d)};var e=d(t);return null===e?{tag:"empty"}:{tag:"sync",stripe:e}},O=e.createContext(null);O.displayName="ElementsContext";var m=function(t){var r=t.stripe,n=t.options,i=t.children,o=e.useRef(!1),s=e.useRef(!0),u=e.useMemo(function(){return v(r)},[r]),a=e.useState(function(){return{stripe:null,elements:null}}),c=p(a,2),l=c[0],f=c[1],b=h(r);null!==b&&b!==r&&console.warn("Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it."),o.current||("sync"===u.tag&&(o.current=!0,f({stripe:u.stripe,elements:u.stripe.elements(n)})),"async"===u.tag&&(o.current=!0,u.stripePromise.then(function(t){t&&s.current&&f({stripe:t,elements:t.elements(n)})})));var d=h(n);return e.useEffect(function(){if(l.elements){var t=y(n,d,["clientSecret","fonts"]);t&&l.elements.update(t)}},[n,d,l.elements]),e.useEffect(function(){return function(){s.current=!1}},[]),e.useEffect(function(){var t=l.stripe;t&&t._registerWrapper&&t.registerAppInfo&&(t._registerWrapper({name:"react-stripe-js",version:"1.5.0"}),t.registerAppInfo({name:"react-stripe-js",version:"1.5.0",url:"https://stripe.com/docs/stripe-js/react"}))},[l.stripe]),e.createElement(O.Provider,{value:l},i)};m.propTypes={stripe:s.any,options:s.object};var g=function(t){var r=e.useContext(O);return function(t,e){if(!t)throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(e," in an <Elements> provider."));return t}(r,t)},j=function(t){var e=t.children,r=g("mounts <ElementsConsumer>");return e(r)};j.propTypes={children:s.func.isRequired};var w=function(t){var r=e.useRef(t);return e.useEffect(function(){r.current=t},[t]),function(){r.current&&r.current.apply(r,arguments)}},E=function(){},S=function(t,r){var n,i="".concat((n=t).charAt(0).toUpperCase()+n.slice(1),"Element"),o=r?function(t){g("mounts <".concat(i,">"));var r=t.id,n=t.className;return e.createElement("div",{id:r,className:n})}:function(r){var n=r.id,o=r.className,s=r.options,u=void 0===s?{}:s,a=r.onBlur,c=void 0===a?E:a,l=r.onFocus,p=void 0===l?E:l,f=r.onReady,b=void 0===f?E:f,d=r.onChange,v=void 0===d?E:d,O=r.onEscape,m=void 0===O?E:O,j=r.onClick,S=void 0===j?E:j,R=g("mounts <".concat(i,">")).elements,x=e.useRef(null),P=e.useRef(null),C=w(b),k=w(c),Q=w(p),q=w(S),M=w(v),D=w(m);e.useLayoutEffect(function(){if(null==x.current&&R&&null!=P.current){var e=R.create(t,u);x.current=e,e.mount(P.current),e.on("ready",function(){return C(e)}),e.on("change",M),e.on("blur",k),e.on("focus",Q),e.on("escape",D),e.on("click",q)}});var T=h(u);return e.useEffect(function(){if(x.current){var t=y(u,T,["paymentRequest"]);t&&x.current.update(t)}},[u,T]),e.useLayoutEffect(function(){return function(){x.current&&x.current.destroy()}},[]),e.createElement("div",{id:n,className:o,ref:P})};return o.propTypes={id:s.string,className:s.string,onChange:s.func,onBlur:s.func,onFocus:s.func,onReady:s.func,onClick:s.func,options:s.object},o.displayName=i,o.__elementType=t,o},R="undefined"===typeof window,x=S("auBankAccount",R),P=S("card",R),C=S("cardNumber",R),k=S("cardExpiry",R),Q=S("cardCvc",R),q=S("fpxBank",R),M=S("iban",R),D=S("idealBank",R),T=S("p24Bank",R),L=S("epsBank",R),_=S("payment",R),I=S("paymentRequestButton",R),A=S("afterpayClearpayMessage",R);t.AfterpayClearpayMessageElement=A,t.AuBankAccountElement=x,t.CardCvcElement=Q,t.CardElement=P,t.CardExpiryElement=k,t.CardNumberElement=C,t.Elements=m,t.ElementsConsumer=j,t.EpsBankElement=L,t.FpxBankElement=q,t.IbanElement=M,t.IdealBankElement=D,t.P24BankElement=T,t.PaymentElement=_,t.PaymentRequestButtonElement=I,t.useElements=function(){return g("calls useElements()").elements},t.useStripe=function(){return g("calls useStripe()").stripe},Object.defineProperty(t,"__esModule",{value:!0})}(e,r(0))},550:function(t,e,r){"use strict";r.d(e,"a",function(){return b}),r.d(e,"b",function(){return f});var n=r(549),i=r(1),o=r(0),s=r(74),u=r(47),a=r(4),c=function(){function t(t,e){this.isMounted=!1,this.previousOptions={},this.context={},this.options={},this.options=t||{},this.context=e||{}}return t.prototype.getOptions=function(){return this.options},t.prototype.setOptions=function(t){Object(u.a)(this.options,t)||(this.previousOptions=this.options),this.options=t},t.prototype.unmount=function(){this.isMounted=!1},t.prototype.refreshClient=function(){var t=this.options&&this.options.client||this.context&&this.context.client;Object(a.b)(!!t,2);var e=!1;return t!==this.client&&(e=!0,this.client=t,this.cleanup()),{client:this.client,isNew:e}},t.prototype.verifyDocumentType=function(t,e){var r=Object(n.e)(t);Object(n.d)(e),Object(n.d)(r.type);Object(a.b)(r.type===e,3)},t}(),l=function(t){function e(e){var r=e.options,n=e.context,i=e.forceUpdate,o=t.call(this,r,n)||this;return o.previousData={},o.currentObservable={},o.runLazy=!1,o.runLazyQuery=function(t){o.runLazy=!0,o.lazyOptions=t,o.forceUpdate()},o.getExecuteResult=function(){var t=o.getQueryResult();return o.startQuerySubscription(),t},o.forceUpdate=i,o}return Object(i.c)(e,t),e.prototype.execute=function(){this.refreshClient();var t=this.getOptions(),e=t.skip,r=t.query;return(e||r!==this.previousData.query)&&(this.removeQuerySubscription(),this.previousData.query=r),this.updateObservableQuery(),this.isMounted&&this.startQuerySubscription(),this.getExecuteSsrResult()||this.getExecuteResult()},e.prototype.executeLazy=function(){return this.runLazy?[this.runLazyQuery,this.execute()]:[this.runLazyQuery,{loading:!1,networkStatus:s.b.ready,called:!1,data:void 0}]},e.prototype.fetchData=function(){if(this.getOptions().skip)return!1;var t=this.getOptions(),e=(t.children,t.ssr),r=(t.displayName,t.skip,t.onCompleted,t.onError,t.partialRefetch,Object(i.e)(t,["children","ssr","displayName","skip","onCompleted","onError","partialRefetch"])),n=r.fetchPolicy;if(!1===e)return!1;"network-only"!==n&&"cache-and-network"!==n||(n="cache-first");var o=this.refreshClient().client.watchQuery(Object(i.a)({},r,{fetchPolicy:n}));return this.context&&this.context.renderPromises&&this.context.renderPromises.registerSSRObservable(o,this.getOptions()),!!this.currentObservable.query.getCurrentResult().loading&&o.result()},e.prototype.afterExecute=function(t){var e=(void 0===t?{}:t).lazy,r=void 0!==e&&e;return this.isMounted=!0,r&&!this.runLazy||this.handleErrorOrCompleted(),this.unmount.bind(this)},e.prototype.cleanup=function(){this.removeQuerySubscription(),delete this.currentObservable.query,delete this.previousData.result},e.prototype.getOptions=function(){var e=t.prototype.getOptions.call(this),r=this.lazyOptions||{},n=Object(i.a)({},e,{variables:Object(i.a)({},e.variables,r.variables),context:Object(i.a)({},e.context,r.context)});return this.runLazy&&delete n.skip,n},e.prototype.getExecuteSsrResult=function(){var t,e={loading:!0,networkStatus:s.b.loading,called:!0,data:{}};return this.context&&this.context.renderPromises&&((t=this.context.renderPromises.addQueryPromise(this,this.getExecuteResult))||(t=e)),t},e.prototype.updateCurrentData=function(){this.isMounted&&this.forceUpdate()},e.prototype.prepareObservableQueryOptions=function(){this.verifyDocumentType(this.getOptions().query,n.b.Query);var t=this.getOptions().displayName||"Query";return Object(i.a)({},this.getOptions(),{displayName:t,context:this.getOptions().context||{},metadata:{reactComponent:{displayName:t}}})},e.prototype.observableQueryFields=function(t){return{variables:t.variables,refetch:t.refetch.bind(t),fetchMore:t.fetchMore.bind(t),updateQuery:t.updateQuery.bind(t),startPolling:t.startPolling.bind(t),stopPolling:t.stopPolling.bind(t),subscribeToMore:t.subscribeToMore.bind(t)}},e.prototype.initializeObservableQuery=function(){if(this.context&&this.context.renderPromises&&(this.currentObservable.query=this.context.renderPromises.getSSRObservable(this.getOptions())),!this.currentObservable.query){var t=this.prepareObservableQueryOptions();this.previousData.observableQueryOptions=Object(i.a)({},t,{children:null}),this.currentObservable.query=this.refreshClient().client.watchQuery(t)}},e.prototype.updateObservableQuery=function(){this.currentObservable.query||this.initializeObservableQuery();var t=Object(i.a)({},this.prepareObservableQueryOptions(),{children:null});Object(u.a)(t,this.previousData.observableQueryOptions)||(this.previousData.observableQueryOptions=t,this.currentObservable.query.setOptions(t).catch(function(){}))},e.prototype.startQuerySubscription=function(){var t=this;if(!this.currentObservable.subscription&&!this.getOptions().skip){var e=this.currentObservable.query;this.currentObservable.subscription=e.subscribe({next:function(e){var r=e.loading,n=e.networkStatus,i=e.data;t.previousData.result&&t.previousData.result.loading===r&&t.previousData.result.networkStatus===n&&Object(u.a)(t.previousData.result.data,i||{})||t.updateCurrentData()},error:function(e){if(t.resubscribeToQuery(),!e.hasOwnProperty("graphQLErrors"))throw e;t.updateCurrentData()}})}},e.prototype.resubscribeToQuery=function(){this.removeQuerySubscription();var t=this.currentObservable.query.getLastError(),e=this.currentObservable.query.getLastResult();this.currentObservable.query.resetLastResults(),this.startQuerySubscription(),Object.assign(this.currentObservable.query,{lastError:t,lastResult:e})},e.prototype.getQueryResult=function(){var t=this,e={data:Object.create(null)};if(Object.assign(e,this.observableQueryFields(this.currentObservable.query)),this.getOptions().skip)e=Object(i.a)({},e,{data:void 0,error:void 0,loading:!1,called:!0});else{var r=this.currentObservable.query.getCurrentResult(),n=r.loading,o=r.partial,u=r.networkStatus,a=r.errors,c=r.error,l=r.data;if(l=l||Object.create(null),a&&a.length>0&&(c=new s.a({graphQLErrors:a})),Object.assign(e,{loading:n,networkStatus:u,error:c,called:!0}),n){var p=this.previousData.result?this.previousData.result.data:{};Object.assign(e.data,p,l)}else if(c)Object.assign(e,{data:(this.currentObservable.query.getLastResult()||{}).data});else{var f=this.currentObservable.query.options.fetchPolicy;if(this.getOptions().partialRefetch&&0===Object.keys(l).length&&o&&"cache-only"!==f)return Object.assign(e,{loading:!0,networkStatus:s.b.loading}),e.refetch(),e;Object.assign(e.data,l)}}return setTimeout(function(){t.currentObservable.query.resetQueryStoreErrors()}),e.client=this.client,this.previousData.loading=this.previousData.result&&this.previousData.result.loading||!1,this.previousData.result=e,e},e.prototype.handleErrorOrCompleted=function(){var t=this.currentObservable.query.getCurrentResult(),e=t.data,r=t.loading,n=t.error;if(!r){var i=this.getOptions(),o=i.query,s=i.variables,a=i.onCompleted,c=i.onError;if(this.previousOptions&&!this.previousData.loading&&Object(u.a)(this.previousOptions.query,o)&&Object(u.a)(this.previousOptions.variables,s))return;a&&!n?a(e):c&&n&&c(n)}},e.prototype.removeQuerySubscription=function(){this.currentObservable.subscription&&(this.currentObservable.subscription.unsubscribe(),delete this.currentObservable.subscription)},e}(c);function p(t,e,r){void 0===r&&(r=!1);var s=Object(o.useContext)(Object(n.c)()),a=Object(o.useReducer)(function(t){return t+1},0),c=a[0],p=a[1],f=e?Object(i.a)({},e,{query:t}):{query:t},h=Object(o.useRef)();h.current||(h.current=new l({options:f,context:s,forceUpdate:p}));var b=h.current;b.setOptions(f),b.context=s;var y=function(t,e){var r=Object(o.useRef)();return r.current&&Object(u.a)(e,r.current.key)||(r.current={key:e,value:t()}),r.current.value}(function(){return r?b.executeLazy():b.execute()},{options:f,context:s,tick:c});return Object(o.useEffect)(function(){return b.afterExecute({lazy:r})},[y]),y}function f(t,e){return p(t,e,!1)}var h=function(t){function e(e){var r=e.options,i=e.context,o=e.result,s=e.setResult,u=t.call(this,r,i)||this;return u.verifyDocumentType(r.mutation,n.b.Mutation),u.result=o,u.setResult=s,u.mostRecentMutationId=0,u}return Object(i.c)(e,t),e.prototype.execute=function(t){var e=this;this.isMounted=!0,this.verifyDocumentType(this.getOptions().mutation,n.b.Mutation);return[function(t){return e.runMutation(t)},t]},e.prototype.afterExecute=function(){return this.isMounted=!0,this.unmount.bind(this)},e.prototype.cleanup=function(){},e.prototype.runMutation=function(t){var e=this;void 0===t&&(t={}),this.onMutationStart();var r=this.generateNewMutationId();return this.mutate(t).then(function(t){return e.onMutationCompleted(t,r),t}).catch(function(t){if(e.onMutationError(t,r),!e.getOptions().onError)throw t})},e.prototype.mutate=function(t){var e=this.getOptions(),r=e.mutation,n=e.variables,o=e.optimisticResponse,s=e.update,u=e.context,a=void 0===u?{}:u,c=e.awaitRefetchQueries,l=void 0!==c&&c,p=e.fetchPolicy,f=Object(i.a)({},t),h=Object.assign({},n,f.variables);return delete f.variables,this.refreshClient().client.mutate(Object(i.a)({mutation:r,optimisticResponse:o,refetchQueries:f.refetchQueries||this.getOptions().refetchQueries,awaitRefetchQueries:l,update:s,context:a,fetchPolicy:p,variables:h},f))},e.prototype.onMutationStart=function(){this.result.loading||this.getOptions().ignoreResults||this.updateResult({loading:!0,error:void 0,data:void 0,called:!0})},e.prototype.onMutationCompleted=function(t,e){var r=this.getOptions(),n=r.onCompleted,i=r.ignoreResults,o=t.data,u=t.errors,a=u&&u.length>0?new s.a({graphQLErrors:u}):void 0;this.isMostRecentMutation(e)&&!i&&this.updateResult({called:!0,loading:!1,data:o,error:a}),n&&n(o)},e.prototype.onMutationError=function(t,e){var r=this.getOptions().onError;this.isMostRecentMutation(e)&&this.updateResult({loading:!1,error:t,data:void 0,called:!0}),r&&r(t)},e.prototype.generateNewMutationId=function(){return++this.mostRecentMutationId},e.prototype.isMostRecentMutation=function(t){return this.mostRecentMutationId===t},e.prototype.updateResult=function(t){!this.isMounted||this.previousResult&&Object(u.a)(this.previousResult,t)||(this.setResult(t),this.previousResult=t)},e}(c);function b(t,e){var r=Object(o.useContext)(Object(n.c)()),s=Object(o.useState)({called:!1,loading:!1}),u=s[0],a=s[1],c=e?Object(i.a)({},e,{mutation:t}):{mutation:t},l=Object(o.useRef)();var p=(l.current||(l.current=new h({options:c,context:r,result:u,setResult:a})),l.current);return p.setOptions(c),p.context=r,Object(o.useEffect)(function(){return p.afterExecute()}),p.execute(u)}!function(t){function e(e){var r=e.options,n=e.context,i=e.setResult,o=t.call(this,r,n)||this;return o.currentObservable={},o.setResult=i,o.initialize(r),o}Object(i.c)(e,t),e.prototype.execute=function(t){var e=t;this.refreshClient().isNew&&(e=this.getLoadingResult());var r=this.getOptions().shouldResubscribe;return"function"===typeof r&&(r=!!r(this.getOptions())),!1!==r&&this.previousOptions&&Object.keys(this.previousOptions).length>0&&(this.previousOptions.subscription!==this.getOptions().subscription||!Object(u.a)(this.previousOptions.variables,this.getOptions().variables))&&(this.endSubscription(),delete this.currentObservable.query,e=this.getLoadingResult()),this.initialize(this.getOptions()),this.startSubscription(),this.previousOptions=this.getOptions(),Object(i.a)({},e,{variables:this.getOptions().variables})},e.prototype.afterExecute=function(){this.isMounted=!0},e.prototype.cleanup=function(){this.endSubscription(),delete this.currentObservable.query},e.prototype.initialize=function(t){this.currentObservable.query||(this.currentObservable.query=this.refreshClient().client.subscribe({query:t.subscription,variables:t.variables,fetchPolicy:t.fetchPolicy}))},e.prototype.startSubscription=function(){this.currentObservable.subscription||(this.currentObservable.subscription=this.currentObservable.query.subscribe({next:this.updateCurrentData.bind(this),error:this.updateError.bind(this),complete:this.completeSubscription.bind(this)}))},e.prototype.getLoadingResult=function(){return{loading:!0,error:void 0,data:void 0}},e.prototype.updateResult=function(t){this.isMounted&&this.setResult(t)},e.prototype.updateCurrentData=function(t){var e=this.getOptions().onSubscriptionData;this.updateResult({data:t.data,loading:!1,error:void 0}),e&&e({client:this.refreshClient().client,subscriptionData:t})},e.prototype.updateError=function(t){this.updateResult({error:t,loading:!1})},e.prototype.completeSubscription=function(){var t=this.getOptions().onSubscriptionComplete;t&&t(),this.endSubscription()},e.prototype.endSubscription=function(){this.currentObservable.subscription&&(this.currentObservable.subscription.unsubscribe(),delete this.currentObservable.subscription)}}(c);!function(){function t(){this.queryPromises=new Map,this.queryInfoTrie=new Map}t.prototype.registerSSRObservable=function(t,e){this.lookupQueryInfo(e).observable=t},t.prototype.getSSRObservable=function(t){return this.lookupQueryInfo(t).observable},t.prototype.addQueryPromise=function(t,e){return this.lookupQueryInfo(t.getOptions()).seen?e():(this.queryPromises.set(t.getOptions(),new Promise(function(e){e(t.fetchData())})),null)},t.prototype.hasPromises=function(){return this.queryPromises.size>0},t.prototype.consumeAndAwaitPromises=function(){var t=this,e=[];return this.queryPromises.forEach(function(r,n){t.lookupQueryInfo(n).seen=!0,e.push(r)}),this.queryPromises.clear(),Promise.all(e)},t.prototype.lookupQueryInfo=function(t){var e=this.queryInfoTrie,r=t.query,n=t.variables,i=e.get(r)||new Map;e.has(r)||e.set(r,i);var o=JSON.stringify(n),s=i.get(o)||{seen:!1,observable:null};return i.has(o)||i.set(o,s),s}}()},791:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(0),i=r(40),o=r(846),s=new Error("use-react-router may only be used with react-router@^5."),u=new Error("useReactRouter may only be called within a <Router /> context.");e.default=function(){if(!i.__RouterContext)throw s;var t=n.useContext(i.__RouterContext);if(!t)throw u;var e=o.default();return n.useEffect(function(){return t.history.listen(e)},[t]),t}},846:function(t,e,r){"use strict";var n=this&&this.__read||function(t,e){var r="function"===typeof Symbol&&t[Symbol.iterator];if(!r)return t;var n,i,o=r.call(t),s=[];try{for(;(void 0===e||e-- >0)&&!(n=o.next()).done;)s.push(n.value)}catch(u){i={error:u}}finally{try{n&&!n.done&&(r=o.return)&&r.call(o)}finally{if(i)throw i.error}}return s};Object.defineProperty(e,"__esModule",{value:!0});var i=r(0);e.default=function(){var t=n(i.useState(Object.create(null)),2)[1];return i.useCallback(function(){t(Object.create(null))},[t])}}}]);
//# sourceMappingURL=91.17f57726.chunk.js.map