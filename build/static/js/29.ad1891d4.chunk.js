(this.webpackJsonpjiffy=this.webpackJsonpjiffy||[]).push([[29],{2006:function(e,t,a){"use strict";function n(e){if(null==e)throw new TypeError("Cannot destructure undefined")}a.d(t,"a",(function(){return n}))},2057:function(e,t,a){"use strict";a.r(t);var n=a(3),c=a.n(n),r=a(5),s=a(2006),o=a(42),l=a(1),i=a.n(l),u=a(484),m=a(201),d=a(128),f=a(351),p=a(149),_=a(22),b=a(658),g=a(294),v=a(140),j=a(48),E=a(107),h=a(655),O=(u.a.TextArea,i.a.lazy((function(){return a.e(11).then(a.bind(null,2007))}))),y=i.a.lazy((function(){return a.e(54).then(a.bind(null,2074))}));t.default=f.a.create()((function(e){Object(j.useHistory)();var t=Object(l.useState)(!1),a=Object(o.a)(t,2),n=a[0],u=a[1],w=Object(l.useState)(""),x=Object(o.a)(w,2),N=(x[0],x[1],Object(l.useState)(!1)),S=Object(o.a)(N,2),k=S[0],F=S[1],C=Object(l.useState)([]),U=Object(o.a)(C,2),J=U[0],z=U[1],I=Object(l.useState)({}),P=Object(o.a)(I,2),G=P[0],H=P[1],T=Object(l.useState)(!1),A=Object(o.a)(T,2),D=(A[0],A[1],Object(E.a)(h.e)),L=Object(o.a)(D,2),R=L[0];Object(s.a)(L[1]);var q=Object(E.a)(h.a),B=Object(o.a)(q,2),K=B[0];Object(s.a)(B[1]);var M=Object(E.b)(h.c),Q=e.customform;Object(l.useEffect)((function(){e.hide_common_upload&&u(e.hide_common_upload),V()}),[e]);var V=function(){var e=Object(r.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M.refetch({contract_id:localStorage.getItem("current_contract_id")});case 2:(t=e.sent)&&t.data&&t.data.get_contract_files&&t.data.get_contract_files.length&&z(t&&t.data.get_contract_files);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),W=function(){var e=Object(r.a)(c.a.mark((function e(t){var a,n,r=arguments;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.length>1&&void 0!==r[1]?r[1]:"others",n={contract_id:localStorage.getItem("current_contract_id"),file:[t]},a&&(n.category=a),e.next=5,R({variables:n});case 5:"success"===e.sent.data.ContractJobFileUpload.status&&V();case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),X=function(){var e=Object(r.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:H(t),F(!0);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Y=function(){var e=Object(r.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:F(!1),V();case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Z=function(){var e=Object(r.a)(c.a.mark((function e(t){var a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={_id:t},e.next=3,K({variables:a});case 3:e.sent,console.log("delete_contract_images -> input_data",a),V();case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return i.a.createElement(i.a.Fragment,null,i.a.createElement(m.a,{className:n?"d-none":""},i.a.createElement(d.a,{span:24},i.a.createElement(f.a.Item,{label:""},Q.getFieldDecorator("file",{rules:[],valuePropName:"fileList"})(i.a.createElement(O,{custom_content:"Upload document",onFileUpload:W,custom_sub_content:"Upload your documents and site images etc..,",custom_class:"avatar-uploader d-flex justify-content-center px_view"}," "))),i.a.createElement("small",null,"Supported File Formats : JPG, PNG"))),i.a.createElement(m.a,{gutter:[16,40]},i.a.createElement(d.a,{span:24},J.length?J.map((function(e){return i.a.createElement(p.a,{className:"mb-2 extra_radius_input document_section_contract",title:i.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},i.a.createElement("div",null,e._id),i.a.createElement("div",{className:"d-flex"},i.a.createElement(O,{onFileUpload:W,custom_category:e._id,custom_class:"contract_header_images"})))},i.a.createElement(m.a,{gutter:8},e.images.map((function(e){return i.a.createElement(d.a,{md:{span:8},className:"gutter-row imgHolder position-relative cursor_point"},i.a.createElement("div",{className:"h-100"},i.a.createElement("img",{loading:"lazy",className:"rounded w-100 img_cover img-fluid loading h-100",src:e.small_image}),i.a.createElement("span",{className:"tags bold"},e.image_tag),i.a.createElement("span",{className:"edit",onClick:function(){X(e)}},i.a.createElement(_.a,{type:"edit",className:"f_25"})),i.a.createElement(b.a,{title:"Sure to delete this image ?",onConfirm:function(){return Z(e._id)}},i.a.createElement("span",{className:"delete"},i.a.createElement(_.a,{type:"delete",className:"f_25"})))))}))))})):i.a.createElement(i.a.Fragment,null))),i.a.createElement(g.a,{footer:null,centered:!0,visible:k,onCancel:function(){F(!1)}},i.a.createElement(l.Suspense,{fallback:i.a.createElement(v.a,{active:!0})},i.a.createElement(y,{modelReturnFuncion:Y,image_comman_data:G}))))}))}}]);
//# sourceMappingURL=29.ad1891d4.chunk.js.map