(window.webpackJsonp=window.webpackJsonp||[]).push([[149],{1952:function(e,t,n){"use strict";n.r(t);var a=n(711),r=n.n(a),o=n(716),c=n(148),l=n(0),i=n.n(l),s=n(932),u=n(755),m=n(811),p=n(812),f=n(921),b=n(709),y=n(42),d=s.a.TextArea,E=(u.a.Option,"JOIN AS COMPANY"),O="BACK",v="NEXT",g=i.a.lazy(function(){return Promise.all([n.e(25),n.e(136)]).then(n.bind(null,1381))});t.default=f.a.create()(function(e){Object(y.useHistory)();var t=Object(l.useState)(""),n=Object(c.a)(t,2),a=(n[0],n[1],Object(l.useState)("")),u=Object(c.a)(a,2),N=(u[0],u[1],Object(l.useState)(!1)),_=Object(c.a)(N,2),h=(_[0],_[1],e.form);return i.a.createElement(i.a.Fragment,null,i.a.createElement(m.a,{gutter:[16,32]},i.a.createElement(p.a,{span:24},i.a.createElement("div",{className:"normal_font_size primary_color d-flex justify-content-center"},E))),i.a.createElement(m.a,null,i.a.createElement(p.a,{span:24},i.a.createElement("div",{className:"company_reg_detail"},i.a.createElement(m.a,null,i.a.createElement(p.a,{className:"justify-content-start d-flex",lg:24},i.a.createElement(f.a.Item,{label:"Company Logo"},h.getFieldDecorator("file",{rules:[],valuePropName:"fileList"})(i.a.createElement(g,null," "))))),i.a.createElement(m.a,null,i.a.createElement(p.a,{className:"",lg:24},i.a.createElement(f.a.Item,{label:"Company Name"},h.getFieldDecorator("company_name",{rules:[{required:!0}]})(i.a.createElement(s.a,{className:"input_border"}))))),i.a.createElement(m.a,null,i.a.createElement(p.a,{className:"",lg:24},i.a.createElement(f.a.Item,{label:"Company Website"},h.getFieldDecorator("company_website",{rules:[{required:!0}]})(i.a.createElement(s.a,{className:"input_border"}))))),i.a.createElement(m.a,null,i.a.createElement(p.a,{className:"",lg:24},i.a.createElement(f.a.Item,{label:"Company Category"},h.getFieldDecorator("company_category",{rules:[{required:!0}]})(i.a.createElement(s.a,{className:"input_border"}))))),i.a.createElement(m.a,null,i.a.createElement(p.a,{className:"",lg:24},i.a.createElement(f.a.Item,{label:"About Company"},h.getFieldDecorator("about_company",{rules:[{required:!0}]})(i.a.createElement(d,{rows:4,className:"pr-1"}))))),i.a.createElement(m.a,null,i.a.createElement(p.a,{className:"justify-content-start d-flex",lg:24},i.a.createElement(f.a.Item,{label:"Company Profile"},h.getFieldDecorator("file",{rules:[],valuePropName:"fileList"})(i.a.createElement(g,null," ")))))))),i.a.createElement(m.a,null,i.a.createElement(p.a,{className:"",lg:12},i.a.createElement("div",{className:"normal_font_size primary_color d-flex justify-content-center"},i.a.createElement(b.a,{type:"primary",onClick:function(){var t;t="CHO0SE_REGISTRATION",e.change_from_type(t)}},i.a.createElement("div",null,O)))),i.a.createElement(p.a,{className:"",lg:12},i.a.createElement("div",{className:"normal_font_size primary_color d-flex justify-content-center"},i.a.createElement(b.a,{type:"primary",onClick:function(){h.validateFields(function(){var t=Object(o.a)(r.a.mark(function t(n,a){return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.submitFromData(a,"COMPANY_REGISTRATION_DETAIL");case 1:case"end":return t.stop()}},t)}));return function(e,n){return t.apply(this,arguments)}}())}},i.a.createElement("div",null,v))))))})},690:function(e,t){e.exports=function(e,t,n,a){var r=n?n.call(a,e,t):void 0;if(void 0!==r)return!!r;if(e===t)return!0;if("object"!==typeof e||!e||"object"!==typeof t||!t)return!1;var o=Object.keys(e),c=Object.keys(t);if(o.length!==c.length)return!1;for(var l=Object.prototype.hasOwnProperty.bind(t),i=0;i<o.length;i++){var s=o[i];if(!l(s))return!1;var u=e[s],m=t[s];if(!1===(r=n?n.call(a,u,m,s):void 0)||void 0===r&&u!==m)return!1}return!0}},755:function(e,t,n){"use strict";n.d(t,"a",function(){return h});var a=n(0),r=n(4),o=n(807),c=n(19),l=n.n(c),i=n(209),s=n(330),u=n(48),m=n(74),p=n(688);function f(e){return(f="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function E(e){return function(){var t,n=O(e);if(function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()){var a=O(this).constructor;t=Reflect.construct(n,arguments,a)}else t=n.apply(this,arguments);return function(e,t){if(t&&("object"===f(t)||"function"===typeof t))return t;return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,t)}}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var g=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(n[a[r]]=e[a[r]])}return n},N=Object(p.a)("default","large","small"),_=(Object(p.a)("default","multiple","tags","combobox","SECRET_COMBOBOX_MODE_DO_NOT_USE"),{prefixCls:r.string,className:r.string,size:r.oneOf(N),notFoundContent:r.any,showSearch:r.bool,optionLabelProp:r.string,transitionName:r.string,choiceTransitionName:r.string,id:r.string}),h=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(p,a["Component"]);var t,n,r,c=E(p);function p(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,p),(t=c.call(this,e)).saveSelect=function(e){t.rcSelect=e},t.renderSelect=function(e){var n,r=e.getPopupContainer,c=e.getPrefixCls,s=e.renderEmpty,u=t.props,p=u.prefixCls,f=u.className,d=void 0===f?"":f,E=u.size,O=u.mode,v=u.getPopupContainer,N=u.removeIcon,_=u.clearIcon,h=u.menuItemSelectedIcon,C=u.showArrow,S=g(u,["prefixCls","className","size","mode","getPopupContainer","removeIcon","clearIcon","menuItemSelectedIcon","showArrow"]),w=Object(i.default)(S,["inputIcon"]),j=c("select",p),x=l()((y(n={},"".concat(j,"-lg"),"large"===E),y(n,"".concat(j,"-sm"),"small"===E),y(n,"".concat(j,"-show-arrow"),C),n),d),I=t.props.optionLabelProp;t.isCombobox()&&(I=I||"value");var P={multiple:"multiple"===O,tags:"tags"===O,combobox:t.isCombobox()},T=N&&(a.isValidElement(N)?a.cloneElement(N,{className:l()(N.props.className,"".concat(j,"-remove-icon"))}):N)||a.createElement(m.a,{type:"close",className:"".concat(j,"-remove-icon")}),D=_&&(a.isValidElement(_)?a.cloneElement(_,{className:l()(_.props.className,"".concat(j,"-clear-icon"))}):_)||a.createElement(m.a,{type:"close-circle",theme:"filled",className:"".concat(j,"-clear-icon")}),k=h&&(a.isValidElement(h)?a.cloneElement(h,{className:l()(h.props.className,"".concat(j,"-selected-icon"))}):h)||a.createElement(m.a,{type:"check",className:"".concat(j,"-selected-icon")});return a.createElement(o.default,b({inputIcon:t.renderSuffixIcon(j),removeIcon:T,clearIcon:D,menuItemSelectedIcon:k,showArrow:C},w,P,{prefixCls:j,className:x,optionLabelProp:I||"children",notFoundContent:t.getNotFoundContent(s),getPopupContainer:v||r,ref:t.saveSelect}))},Object(u.a)("combobox"!==e.mode,"Select","The combobox mode is deprecated, it will be removed in next major version, please use AutoComplete instead"),t}return t=p,(n=[{key:"getNotFoundContent",value:function(e){var t=this.props.notFoundContent;return void 0!==t?t:this.isCombobox()?null:e("Select")}},{key:"focus",value:function(){this.rcSelect.focus()}},{key:"blur",value:function(){this.rcSelect.blur()}},{key:"isCombobox",value:function(){var e=this.props.mode;return"combobox"===e||e===p.SECRET_COMBOBOX_MODE_DO_NOT_USE}},{key:"renderSuffixIcon",value:function(e){var t=this.props,n=t.loading,r=t.suffixIcon;return r?a.isValidElement(r)?a.cloneElement(r,{className:l()(r.props.className,"".concat(e,"-arrow-icon"))}):r:n?a.createElement(m.a,{type:"loading"}):a.createElement(m.a,{type:"down",className:"".concat(e,"-arrow-icon")})}},{key:"render",value:function(){return a.createElement(s.a,null,this.renderSelect)}}])&&d(t.prototype,n),r&&d(t,r),p}();h.Option=o.Option,h.OptGroup=o.OptGroup,h.SECRET_COMBOBOX_MODE_DO_NOT_USE="SECRET_COMBOBOX_MODE_DO_NOT_USE",h.defaultProps={showSearch:!1,transitionName:"slide-up",choiceTransitionName:"zoom"},h.propTypes=_}}]);
//# sourceMappingURL=149.aef81f3a.chunk.js.map