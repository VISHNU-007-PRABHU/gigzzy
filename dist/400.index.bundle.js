"use strict";(self.webpackChunkjiffy=self.webpackChunkjiffy||[]).push([[400],{70400:function(e,t,n){n.r(t),n.d(t,{default:function(){return A}});var r=n(35466),o=(n(25227),n(99548),n(29971),n(50629),n(86387)),a=n(41253),i=n(96990),c=n(1554),u=n(59380),l=n(55702),f=n(45670),s=n(72299),p=n(79520),y=n(91997),m=n(49511);function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){P(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function g(e,t,n,r,o,a,i){try{var c=e[a](i),u=c.value}catch(e){return void n(e)}c.done?t(u):Promise.resolve(u).then(r,o)}function v(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function i(e){g(a,r,o,i,c,"next",e)}function c(e){g(a,r,o,i,c,"throw",e)}i(void 0)}))}}function _(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function O(e,t){return O=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},O(e,t)}function E(e,t){if(t&&("object"===d(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return S(e)}function S(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function j(e){return j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},j(e)}function P(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&O(e,t)}(b,e);var t,n,o,l,d=(o=b,l=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=j(o);if(l){var n=j(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return E(this,e)});function b(){var e;_(this,b);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return P(S(e=d.call.apply(d,[this].concat(n))),"state",{modalVisible:!1,dataSource:[],update_data:{},update:0,loading:!1,loading_img:!1,imageUrl:"",file:{},previewVisible:!1,previewImage:"",view_img:"",pagination:{pageSize:10,total:0,current:1,simple:!0}}),P(S(e),"handleTableChange",function(){var t=v(regeneratorRuntime.mark((function t(n){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(r=h({},n)).current=n.current,e.setState({loading:!0}),t.next=5,s.L.query({query:f.$F,variables:{limit:r.pageSize,page:r.current},fetchPolicy:"no-cache"}).then((function(t){var n=h({},e.state.pagination);n.total=t.data.get_company_detail.pageInfo.totalDocs,n.current=t.data.get_company_detail.pageInfo.page,e.setState({pagination:n,loading:!1,dataSource:t.data.get_company_detail.data})}));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),P(S(e),"fetch_find_company",function(){var t=v(regeneratorRuntime.mark((function t(n){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={register_status:"success",register_link_status:"accepted"},"inactive"===e.props.type&&(r={$or:[{register_link_status:{$ne:"success"}},{register_status:{$ne:"accepted"}}]}),n&&(r=h(h({},r),n)),t.next=5,s.L.query({query:f.$F,variables:{company_id:e.props.match.params.id,provider_search:r},fetchPolicy:"no-cache"}).then((function(t){e.setState({update:1,dataSource:t.data.get_company_detail.data[0].get_parent_company_provider})}));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),P(S(e),"handleDelete",function(){var t=v(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s.L.mutate({mutation:f.N2,variables:{_id:n}}).then((function(t,n,r){(0,p.F)(t.data.deleteCompanyProvider),"success"===t.data.deleteCompanyProvider.status&&e.fetch_find_company()}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),P(S(e),"onFilter_Ref",function(){var t=v(regeneratorRuntime.mark((function t(n){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.target.value?(r={email:{$regex:".*"+n.target.value+".*",$options:"i"}},e.fetch_find_company(r)):e.fetch_find_company();case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),e}return t=b,(n=[{key:"componentDidMount",value:function(){this.props.match.params.id&&this.fetch_find_company()}},{key:"render",value:function(){var e=this,t=[{title:"Email",render:function(e,t){return r.createElement("span",{title:"Email"},t.email)}},{title:"Link Sent Date",render:function(e,t){return r.createElement("span",{title:"Link Sent Date"},r.createElement(a.Z,{color:"geekblue"},t.created_at))}},{title:"Register Link Status",render:function(e,t){return r.createElement("span",{title:"Register Link Status"},r.createElement(a.Z,{color:"geekblue"},t.register_link_status))}},{title:"Provider Register Status",render:function(e,t){return r.createElement("span",{title:"Provider Register Status"},r.createElement(a.Z,{color:"geekblue"},t.register_status))}},{title:"View",render:function(t,n){return e.state.dataSource.length>=1?r.createElement("span",{title:"....",className:"d-flex justify-content-around"},r.createElement(m.Z,{permission:""},r.createElement("span",{className:"cursor_point"},r.createElement(i.Z,{type:"eye",theme:"twoTone",twoToneColor:"#52c41a",className:"inactive"===e.props.type?"d-none":"mx-3 f_25"}))),r.createElement(m.Z,{permission:""},r.createElement(c.Z,{title:"Sure to delete this worker ?",onConfirm:function(){return e.handleDelete(n._id)}},r.createElement(i.Z,{type:"delete",theme:"twoTone",twoToneColor:"#52c41a",className:"f_25"})))):null}}];return r.createElement(r.Fragment,null,r.createElement("div",{className:"mb-3"},r.createElement(y.default,{className:"",size:"large",placeholder:"Search Worker Email",onKeyUp:function(t){e.onFilter_Ref(t)},loading:!1})),r.createElement("div",{id:"no-more-tables"},r.createElement(u.Z,{className:"table_shadow",rowKey:function(e){return e.id},loading:this.state.loading,dataSource:this.state.dataSource,columns:t,pagination:!1})))}}])&&w(t.prototype,n),b}(r.Component),R=l.Z.create()((0,o.withRouter)(k)),x=n(95937),C=n(38520);function T(e){return T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},T(e)}function Z(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function D(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function N(e,t){return N=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},N(e,t)}function L(e,t){if(t&&("object"===T(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return $(e)}function $(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function F(e){return F=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},F(e)}function q(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}x.Z.Content;var B=C.Z.TabPane,z=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&N(e,t)}(c,e);var t,n,o,a,i=(o=c,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=F(o);if(a){var n=F(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return L(this,e)});function c(){var e;Z(this,c);for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return q($(e=i.call.apply(i,[this].concat(n))),"state",{collapsed:!1}),q($(e),"onToggle",(function(t){console.log(t),e.setState({collapsed:t})})),e}return t=c,(n=[{key:"render",value:function(){return r.createElement(C.Z,null,r.createElement(B,{tab:"Active workers",key:"1"},r.createElement(R,{type:"active"})),r.createElement(B,{tab:"Pending workers",key:"2"},r.createElement(R,{type:"inactive"})))}}])&&D(t.prototype,n),c}(r.Component),A=z}}]);