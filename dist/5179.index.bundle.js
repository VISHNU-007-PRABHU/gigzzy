"use strict";(self.webpackChunkjiffy=self.webpackChunkjiffy||[]).push([[5179],{25179:function(e,t,n){n.r(t);var l,a=n(35466),o=n(28355),r=n(96990),c=n(41253),i=(n(25227),n(99548),n(72299)),s=n(86387),u=n(82992),m=n(3956),p=n(61854),b=n(25904),d=n.n(b);function _(e){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_(e)}function f(e,t,n,l,a,o,r){try{var c=e[o](r),i=c.value}catch(e){return void n(e)}c.done?t(i):Promise.resolve(i).then(l,a)}function g(e){return function(){var t=this,n=arguments;return new Promise((function(l,a){var o=e.apply(t,n);function r(e){f(o,l,a,r,c,"next",e)}function c(e){f(o,l,a,r,c,"throw",e)}r(void 0)}))}}function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function E(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}function y(e,t){return y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},y(e,t)}function k(e,t){if(t&&("object"===_(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return h(e)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function N(e){return N=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},N(e)}function x(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var w,O,S=a.lazy((function(){return n.e(2115).then(n.bind(n,12115))})),P={0:"welcome Gizzy",50:"waiting for payment confirmation",10:"Base price paid",11:"Booking canceled",4:"Job started",13:"Ongoing",14:"Completed"},j=d()(),R=(0,u.ZP)(l||(w=['\nsubscription SENDACCEPTMSG($_id:ID,$booking_id:ID){\n    send_accept_msg (_id:$_id,booking_id:$booking_id){\n      _id\n      status\n      booking_status\n      payment_type\n      mpeas_payment_callback\n      base_price(code:"symbol")\n      extra_price(code:"symbol")\n      ctob_shotcode\n      ctob_billRef\n    }\n}'],O||(O=w.slice(0)),l=Object.freeze(Object.defineProperties(w,{raw:{value:Object.freeze(O)}})))),z=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}(b,e);var t,n,l,s,u=(l=b,s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=N(l);if(s){var n=N(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return k(this,e)});function b(){var e;v(this,b);for(var t=arguments.length,n=new Array(t),l=0;l<t;l++)n[l]=arguments[l];return x(h(e=u.call.apply(u,[this].concat(n))),"state",{currency_symbol:"Ksh",collapsed:!1,booking:[],booking_user:[],booking_provider:[],booking_category:[],booking_status:0,payment_type:"",mpeas_payment_callback:!1,base_price:"0.00",extra_price:"0.00",ctob_shotcode:"",ctob_billRef:""}),x(h(e),"fetch_booking",(function(t){i.L.query({query:m.ER,variables:{_id:t},fetchPolicy:"no-cache"}).then((function(t){var n,l,a,o,r,c,i,s,u,m,p,b,d;console.log(t),e.current_booking_status(null===(n=e.props.match)||void 0===n||null===(l=n.params)||void 0===l?void 0:l.id),e.setState({booking:t.data.booking,booking_category:null===(a=t.data.booking[0])||void 0===a?void 0:a.booking_category,booking_user:null===(o=t.data.booking[0])||void 0===o?void 0:o.booking_user,booking_provider:null===(r=t.data.booking[0])||void 0===r?void 0:r.booking_provider,message:null===(c=t.data.booking[0])||void 0===c?void 0:c.get_booking_message,booking_status:null===(i=t.data.booking[0])||void 0===i?void 0:i.booking_status,payment_type:(null===(s=t.data.booking[0])||void 0===s?void 0:s.payment_type)||"",base_price:(null===(u=t.data.booking[0])||void 0===u?void 0:u.base_price)||"",extra_price:(null===(m=t.data.booking[0])||void 0===m?void 0:m.extra_price)||"",ctob_shotcode:(null===(p=t.data.booking[0])||void 0===p?void 0:p.ctob_shotcode)||"",ctob_billRef:(null===(b=t.data.booking[0])||void 0===b?void 0:b.ctob_billRef)||"",mpeas_payment_callback:null===(d=t.data.booking[0])||void 0===d?void 0:d.mpeas_payment_callback})}))})),x(h(e),"current_booking_status",function(){var t=g(regeneratorRuntime.mark((function t(n){var l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return l=h(e),t.next=3,i.L.subscribe({query:R,variables:{_id:JSON.parse(localStorage.getItem("user"))._id,booking_id:n}}).subscribe({next:function(e,t,n){var a;t&&console.log("load"),e&&(console.log(e.data.send_accept_msg),l.setState({booking_status:e.data.send_accept_msg.booking_status,payment_type:(null===(a=e.data.send_accept_msg)||void 0===a?void 0:a.payment_type)||""}))}});case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),e}return t=b,(n=[{key:"componentDidMount",value:function(){this.props.match.params.id&&this.fetch_booking(this.props.match.params.id)}},{key:"render",value:function(){var e,t,n=this.state,l=n.ctob_billRef,i=n.ctob_shotcode,s=n.mpeas_payment_callback,u=n.base_price,m=n.extra_price,b=n.booking,d=n.booking_category,_=n.booking_provider,f=n.booking_user,g=n.payment_type,v=n.booking_status;return console.log("Invoice -> render -> booking_status",v),console.log("Invoice -> render -> mpeas_payment_callback",s),console.log("Invoice -> render -> payment_option",g),a.createElement("div",{className:" col-xs-12 col-md-12 col-sm-12 invoice_body_color  "},a.createElement("div",{className:"col-xs-12 col-md-12 col-sm-12 col-lg-6 main_content mx-lg-auto"},a.createElement("div",{className:"invoice_header mt-1"},a.createElement("div",{className:j.isMobile()?"d-none":""},a.createElement("a",{href:"/bookings"},a.createElement(o.Z,{placement:"left",title:"Back to Booking"},a.createElement(r.Z,{className:"ml-2 cursor_point",type:"arrow-left",style:{fontSize:"26px"}})))),a.createElement("div",null,a.createElement("img",{src:p.Z,alt:"gigzzy",className:"w-50x object_fit cursor_point"})),a.createElement("div",{className:"invoice_info"},a.createElement("div",null,"INVOICE NO ",a.createElement("b",null,b[0]?b[0].booking_ref:"")),a.createElement("div",null," ",a.createElement("small",null,b[0]?b[0].booking_date:"")),a.createElement("div",{className:"py-2"},a.createElement(c.Z,{color:"green"},P[this.state.booking_status])))),a.createElement("div",{className:50!=v&&1!=s||"c2b"!=g?"d-none":"jumbotron p-1 mb-3 mx-3"},a.createElement(a.Suspense,{fallback:a.createElement("div",{class:"spinner-border text-success",role:"status"},a.createElement("span",{class:"sr-only"},"Loading..."))},a.createElement(S,{BusinessNumber:i,AmountNumber:l,Amount:s?m:u}))),a.createElement("div",{className:"user_batch mx-3"},a.createElement("p",null,a.createElement("b",null,f[0]?null===(e=f[0])||void 0===e?void 0:e.name:"")),a.createElement("p",null,"Thanks for using gigzzy.")),a.createElement("div",{className:"total_fare"},a.createElement("h5",null,"TOTAL COST"),a.createElement("h1",null,a.createElement("small",null),b[0]?b[0].total:"")),a.createElement("div",{className:"fare_estimation col-xs-12 col-md-12 col-sm-12 nopad d-print-block d-md-flex"},a.createElement("div",{className:"fare_breakup mr-sm-3"},a.createElement("p",{className:"title"},"Fare Breakup"),a.createElement("ul",null,a.createElement("li",null,a.createElement("label",null,"Base Price"),a.createElement("span",null,b[0]?b[0].base_price:"")),a.createElement("li",null,a.createElement("label",null,"Extra Price "),a.createElement("span",null,b[0]?b[0].extra_price:"")))),a.createElement("div",{className:"tax_breakup "},a.createElement("p",{className:"title"},"Service Breakup"),a.createElement("ul",null,a.createElement("li",null,a.createElement("label",{className:"d-flex align-items-center"},"Service Fee",a.createElement(o.Z,{placement:"right",title:"".concat(null===(t=b[0])||void 0===t?void 0:t.service_fee," %")},a.createElement(r.Z,{className:"ml-2 cursor_point",type:"info-circle"})),a.createElement("span",{className:"ml-auto"},b[0]?b[0].admin_fee:"")))))),a.createElement("div",{className:"booking_details col-xs-12 col-md-12 col-sm-12"},a.createElement("p",{className:"title"},"Booking Details"),a.createElement("ul",null,a.createElement("li",null,a.createElement("label",null,"Service Type"),a.createElement("span",null,d[0]?1===d[0].category_type?d[0].category_name:d[0].subCategory_name:"")),a.createElement("li",null,a.createElement("label",null,"Booking Date"),a.createElement("span",null,b[0]?b[0].booking_date:"")),a.createElement("li",null,a.createElement("label",null,"Scheduled Date"),a.createElement("span",null,b[0]?b[0].booking_date:"")))),a.createElement("div",{className:"member_section col-xs-12 col-md-12 col-sm-12 nopad d-print-block d-md-flex"},a.createElement("div",{className:"user_details mr-sm-3"},a.createElement("p",{className:"title"},"User Details"),a.createElement("ul",null,a.createElement("li",null,a.createElement("label",null,"Name"),a.createElement("span",null,f[0]?f[0].name:"")),a.createElement("li",null,a.createElement("label",null,"Email"),a.createElement("span",null,f[0]?f[0].email:"")),a.createElement("li",null,a.createElement("label",null,"Phone"),a.createElement("span",null,f[0]?f[0].phone_number:"")))),a.createElement("div",{className:"provider_details"},a.createElement("p",{className:"title"},"Provider Details"),a.createElement("ul",null,a.createElement("li",null,a.createElement("label",null,"Name"),a.createElement("span",null,_[0]?_[0].name:"")),a.createElement("li",null,a.createElement("label",null,"Email"),a.createElement("span",null,_[0]?_[0].email:"")),a.createElement("li",null,a.createElement("label",null,"Phone"),a.createElement("span",null,_[0]?_[0].phone_number:""))))),a.createElement("div",{className:"invoice_footer col-xs-12 m-3"},a.createElement("hr",null),a.createElement("p",null," Thanks,"),"gigzzy Team")))}}])&&E(t.prototype,n),b}(a.Component);t.default=(0,s.withRouter)(z)}}]);