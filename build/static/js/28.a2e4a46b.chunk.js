(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{1937:function(e,t,a){"use strict";a.r(t);var n=a(3),c=a.n(n),r=a(5);var l=a(53),s=a(1),u=a.n(s),o=a(453),i=a(282),m=a(166),d=a(1911),f=a(266),p=a(59),b=a(146),g=a(1921),_=(o.a.TextArea,u.a.lazy(function(){return a.e(7).then(a.bind(null,1932))}));t.default=d.a.create()(function(e){Object(p.useHistory)();var t=Object(s.useState)(""),a=Object(l.a)(t,2),n=(a[0],a[1],Object(s.useState)("")),o=Object(l.a)(n,2),v=(o[0],o[1],Object(s.useState)([])),E=Object(l.a)(v,2),j=E[0],w=E[1],O=Object(s.useState)(!1),h=Object(l.a)(O,2),x=(h[0],h[1],Object(b.a)(g.d)),y=Object(l.a)(x,2),S=y[0];!function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(y[1]);var N=Object(b.b)(g.b),k=e.customform;Object(s.useEffect)(function(){F()},[e]);var F=function(){var e=Object(r.a)(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N.refetch({contract_id:localStorage.getItem("current_contract_id")});case 2:(t=e.sent)&&t.data&&t.data.get_contract_files&&t.data.get_contract_files.length&&w(t&&t.data.get_contract_files);case 4:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),I=function(){var e=Object(r.a)(c.a.mark(function e(t){var a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a={contract_id:localStorage.getItem("current_contract_id"),file:[t]},e.next=3,S({variables:a});case 3:e.sent;case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}();return u.a.createElement(u.a.Fragment,null,u.a.createElement(i.a,null,u.a.createElement(m.a,{span:24},u.a.createElement(d.a.Item,{label:""},k.getFieldDecorator("file",{rules:[],valuePropName:"fileList"})(u.a.createElement(_,{custom_content:"Upload document",onFileUpload:I,custom_sub_content:"eg Documents, Pictures",custom_class:"avatar-uploader d-flex justify-content-center px_view"}," "))))),u.a.createElement(i.a,{gutter:[16,40]},u.a.createElement(m.a,{span:24},j.length?j.map(function(e){return u.a.createElement(f.a,{headStyle:{padding:"0px 10px"},title:u.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},u.a.createElement("div",null,e._id),u.a.createElement("div",null,u.a.createElement(_,{custom_content:"",custom_class:"contract_header_images"})))},e.images.map(function(e){return u.a.createElement(f.a.Grid,{className:"imgHolder position-relative p-0 w-25"},u.a.createElement("img",{loading:"lazy",className:"img-fluid loading h-100",src:e.small_image}),u.a.createElement("span",{className:"bold"},"text"))}))}):u.a.createElement(u.a.Fragment,null))))})}}]);
//# sourceMappingURL=28.a2e4a46b.chunk.js.map