(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{2015:function(e,a,t){"use strict";t.r(a);var n=t(3),r=t.n(n),c=t(5),l=t(1946),i=t(38),o=t(1),s=t.n(o),u=t(178),m=t(337),d=t(193),f=t(124),p=t(459),b=t(68),g=t(63),v=t(104),w=t(612),E=u.a.Option,_=[{_id:"others",name:"Other"},{_id:"Drawing",name:"Drawing"}];a.default=m.a.create()(function(e){Object(g.useHistory)();var a=Object(o.useState)({}),t=Object(i.a)(a,2),n=t[0],j=t[1],O=Object(v.a)(w.e),y=Object(i.a)(O,2),h=y[0];Object(l.a)(y[1]);var k=e.form.getFieldDecorator;Object(o.useEffect)(function(){j(e.image_comman_data)},[e]);var x=function(){var a=Object(c.a)(r.a.mark(function a(){return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:e.form.validateFields(function(){var a=Object(c.a)(r.a.mark(function a(t,c){return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(console.log("next -> values",c),t){a.next=9;break}if(c._id=n._id,console.log("submitData -> values",c),!n._id){a.next=9;break}return a.next=7,h({variables:c});case 7:"success"===a.sent.data.ContractJobFileUpload.status&&e.modelReturnFuncion();case 9:case"end":return a.stop()}},a)}));return function(e,t){return a.apply(this,arguments)}}());case 1:case"end":return a.stop()}},a)}));return function(){return a.apply(this,arguments)}}();return s.a.createElement(s.a.Fragment,null,s.a.createElement(m.a,{name:"contract_image_update"},s.a.createElement(d.a,null,s.a.createElement(f.a,{span:24},s.a.createElement(m.a.Item,{label:"Project Category"},k("category",{initialValue:null===n||void 0===n?void 0:n.doc_category,rules:[{required:!0}]})(s.a.createElement(u.a,{size:"large",placeholder:"Select a image category",allowClear:!0},_.map(function(e){return s.a.createElement(E,{value:e._id},e.name)})))))),s.a.createElement(d.a,null,s.a.createElement(f.a,{span:24},s.a.createElement(m.a.Item,{label:"Project Tage"},k("image_tag",{initialValue:null===n||void 0===n?void 0:n.image_tag,rules:[{required:!0}]})(s.a.createElement(p.a,{size:"large",className:""}))))),s.a.createElement("div",{className:"steps-action justify-content-between d-flex"},s.a.createElement(b.a,{type:"primary",className:"w-50",block:!0,onClick:function(){return x()}},s.a.createElement("div",{className:"normal_font_size"},"Submit")))))})}}]);
//# sourceMappingURL=54.1d5505d5.chunk.js.map