"use strict";(self.webpackChunkjiffy=self.webpackChunkjiffy||[]).push([[4614],{84614:function(e,t,r){r.r(t);var n=r(35466),a=r(24123),o=r(55702),i=r(49624),l=r(40137),u=r(15300),c=r(2895),s=r(86387),f=r(59854),m=r(98057);function d(e,t,r,n,a,o,i){try{var l=e[o](i),u=l.value}catch(e){return void r(e)}l.done?t(u):Promise.resolve(u).then(n,a)}function p(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var o=e.apply(t,r);function i(e){d(o,n,a,i,l,"next",e)}function l(e){d(o,n,a,i,l,"throw",e)}i(void 0)}))}}function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,o=[],i=!0,l=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);i=!0);}catch(e){l=!0,a=e}finally{try{i||null==r.return||r.return()}finally{if(l)throw a}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?y(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var g=a.Z.Option,h=[{_id:"others",name:"Other"},{_id:"Drawing",name:"Drawing"}];t.default=o.Z.create()((function(e){(0,s.useHistory)();var t=v((0,n.useState)({}),2),r=t[0],d=t[1],y=v((0,f.Db)(m.xt),2),b=y[0];!function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(y[1]);var w=e.form.getFieldDecorator;(0,n.useEffect)((function(){d(e.image_comman_data)}),[e]);var E=function(){var t=p(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.form.validateFields(function(){var t=p(regeneratorRuntime.mark((function t(n,a){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("next -> values",a),n){t.next=9;break}if(a._id=r._id,console.log("submitData -> values",a),!r._id){t.next=9;break}return t.next=7,b({variables:a});case 7:"success"===t.sent.data.ContractJobFileUpload.status&&e.modelReturnFuncion();case 9:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return n.createElement(n.Fragment,null,n.createElement(o.Z,{name:"contract_image_update"},n.createElement(i.Z,null,n.createElement(l.Z,{span:24},n.createElement(o.Z.Item,{label:"Project Category"},w("category",{initialValue:null==r?void 0:r.doc_category,rules:[{required:!0}]})(n.createElement(a.Z,{size:"large",placeholder:"Select a image category",allowClear:!0},h.map((function(e){return n.createElement(g,{value:e._id},e.name)}))))))),n.createElement(i.Z,null,n.createElement(l.Z,{span:24},n.createElement(o.Z.Item,{label:"Project Tage"},w("image_tag",{initialValue:null==r?void 0:r.image_tag,rules:[{required:!0}]})(n.createElement(u.Z,{size:"large",className:""}))))),n.createElement("div",{className:"steps-action justify-content-between d-flex"},n.createElement(c.Z,{type:"primary",className:"w-50",block:!0,onClick:function(){return E()}},n.createElement("div",{className:"normal_font_size"},"Submit")))))}))}}]);