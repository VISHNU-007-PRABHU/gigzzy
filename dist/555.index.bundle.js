"use strict";(self.webpackChunkjiffy=self.webpackChunkjiffy||[]).push([[555],{50555:function(e,t,r){r.r(t);var a=r(35466),n=r(15300),l=r(49624),i=r(40137),o=r(55702);function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var a,n,l=[],i=!0,o=!1;try{for(r=r.call(e);!(i=(a=r.next()).done)&&(l.push(a.value),!t||l.length!==t);i=!0);}catch(e){o=!0,n=e}finally{try{i||null==r.return||r.return()}finally{if(o)throw n}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}var s=n.Z.TextArea;t.default=o.Z.create()((function(e){var t=e.customform,r=c((0,a.useState)({}),2),u=r[0],m=r[1],f=c((0,a.useState)(""),2),d=f[0],p=f[1];return(0,a.useEffect)((function(){m(e.contract_detail_data),e.contract_detail_data.name&&p(e.contract_detail_data.name)}),[]),a.createElement(a.Fragment,null,a.createElement(l.Z,null,a.createElement(i.Z,{span:24},a.createElement("label",{className:"d-flex w-100"},a.createElement("span",{className:"ant-form-item-required font-weight-bold"},"Project Name"),a.createElement("span",{className:"ml-auto text-black-50"},null==d?void 0:d.length,"/50")),a.createElement(o.Z.Item,null,t.getFieldDecorator("name",{initialValue:null==u?void 0:u.name,rules:[{required:!0,message:"Project Name is required"}]})(a.createElement(n.Z,{maxLength:50,className:"extra_radius_input h-50x",onChange:function(e){p(e.target.value)},placeholder:"e.g. i need a cleaner for my office"}))))),a.createElement(l.Z,null,a.createElement(i.Z,{span:24},a.createElement("label",{className:"d-flex w-100"},a.createElement("span",{className:"ant-form-item-required font-weight-bold"},"Project Description")),a.createElement(o.Z.Item,null,t.getFieldDecorator("description",{initialValue:null==u?void 0:u.description,rules:[{required:!0,message:"Project Descripiton is required"}]})(a.createElement(s,{size:"large",className:"extra_radius_input",rows:6}))))))}))}}]);