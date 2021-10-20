(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{1924:function(t,e,a){"use strict";a.d(e,"d",function(){return u}),a.d(e,"e",function(){return d}),a.d(e,"a",function(){return m}),a.d(e,"c",function(){return g}),a.d(e,"b",function(){return _});var n,c,r,i,o,s=a(18),A=a(19),l=a.n(A),u=l()(n||(n=Object(s.a)(["\n    mutation UPDATECONTRACT($_id:ID,$contract_data:JSON){\n        update_contract(_id:$_id,contract_data:$contract_data){\n            msg\n            status\n            _id\n        }\n    }\n"]))),d=l()(c||(c=Object(s.a)(["\n    mutation UPDATECONTRACTFILE($contract_id:ID,$file:[Upload],$category:String,$image_tag:String,$_id:ID){\n        ContractJobFileUpload(contract_id:$contract_id,file:$file,category:$category,image_tag:$image_tag,_id:$_id){\n            msg\n            status\n            _id\n        }\n    }\n"]))),m=l()(r||(r=Object(s.a)(["\n    mutation DELETECONTRACTFILE($_id:ID){\n        DeleteContractJobFile(_id:$_id){\n            msg\n            status\n        }\n    }\n"]))),g=l()(i||(i=Object(s.a)(["\n    query GETCONTRACTFILES($contract_id:ID){\n        get_contract_files(contract_id:$contract_id) {\n            _id\n            images{\n                small_image\n                image_tag\n                doc_category\n                _id\n            }\n        }\n    }\n"]))),_=l()(o||(o=Object(s.a)(["\n    query GETCONTRACT($contract_id:ID,$location_code:String){\n        get_contracts(contract_id:$contract_id,location_code:$location_code){\n            name\n            description\n            current_page\n            address_id\n            booking_status\n            budget(code:$location_code)\n            timeline\n            biding_id\n            timeline_type\n            terms_condition\n            contract_ref\n            biding_count\n            created_at\n            get_contract_category{\n                category_name\n                subCategory_name\n                category_type\n            }\n            get_contract_all_files(contract_id:$contract_id){\n                small_image\n            }\n            get_contract_files(contract_id:$contract_id) {\n                _id\n                images{\n                    small_image\n                    large_image\n                    image_tag\n                }\n            }\n            get_provider_user {\n                img_url\n                first_name\n                email\n                phone_no\n                user_type\n                last_name\n                _id\n                get_company_root_detail(root: true) {\n                    company_name\n                    company_website\n                    company_category\n                    get_company_images {\n                    small_image\n                    }\n                }\n            }\n            get_user {\n                img_url\n                first_name\n                user_type\n                last_name\n                email\n                phone_no\n                _id\n                get_company_root_detail(root: true) {\n                    company_name\n                    company_website\n                    company_category\n                    get_company_images {\n                        small_image\n                    }\n                }\n            }\n        }\n    }\n"])))},1930:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAPCAYAAAAGRPQsAAAABHNCSVQICAgIfAhkiAAAANRJREFUOE/tkuENgjAQhXsT6Ag6gTiBjuAIOoFxAsomjqAbwATiBrqBG9T3kkKg3jX4nyYXQo/39fF6EkJonXMb1HCdROSa7PWvhqYSNIIiIkiF4ZDG0DQWzDLlALM0JuwN2ksjgrX/11kFkc9kpkVzp+UjRKsoXOJ5RrWAbTOwA3pF0r9JKgC8xt4Olb1RNQIFxhMfqA9qDYd8Tlo/zqiCO44Ff9kDxjmctCwYQcyxjNAOxiwvFlmFRXc+wkZaztkM0xPAjXIweauLwRdPRJYOa9/+AvtAZJ66X6pWAAAAAElFTkSuQmCC"},1973:function(t,e,a){var n={"./step0.png":1930,"./step1.png":1974,"./step2.png":1975,"./step3.png":1976,"./step4.png":1977,"./step5.png":1978};function c(t){var e=r(t);return a(e)}function r(t){if(!a.o(n,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return n[t]}c.keys=function(){return Object.keys(n)},c.resolve=r,t.exports=c,c.id=1973},1974:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAPCAYAAAAGRPQsAAAABHNCSVQICAgIfAhkiAAAANRJREFUOE/tkuENgjAQhXsT6Ag6gTiBjuAIOoFxAsomjqAbwATiBrqBG9T3kkKg3jX4nyYXQo/39fF6EkJonXMb1HCdROSa7PWvhqYSNIIiIkiF4ZDG0DQWzDLlALM0JuwN2ksjgrX/11kFkc9kpkVzp+UjRKsoXOJ5RrWAbTOwA3pF0r9JKgC8xt4Olb1RNQIFxhMfqA9qDYd8Tlo/zqiCO44Ff9kDxjmctCwYQcyxjNAOxiwvFlmFRXc+wkZaztkM0xPAjXIweauLwRdPRJYOa9/+AvtAZJ66X6pWAAAAAElFTkSuQmCC"},1975:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAABHNCSVQICAgIfAhkiAAAATdJREFUKFN9k41RAkEMhd0OtIOzArECtQKlAo8K5CoQKvCsQOgAKgAqkA6UCsQK1u/dJDdhhzMzmUvevpdkfy5dmOWcLwmf8RofGbzn26aUls5LCiCL8BGIvu7fLcEY4TFZ5U0gq5oI6niPP5pqhWAswRTgzUBVWYGJmIl3xfqDBJrzBl9CqEOuGguwyQmHJFv1Cd9vXONFuybRFC/4Th1c0ACoWym4AptFgTZ4h3ebQr8g1vHK5niLf+IVvlaHSJgiegfT4tFEOpDa4kYCJboDN42lrrInq+xrt34PP0EwFB7oXvlNx7GGBA2CNj4NbWzIfjVa9zScUWy+FM4hzwRGQUX+dabFAWyk6icCJXRRlddC1L0vx/oOYTR/W4LWkHW0vZ0T6N/QAfQb/Vdgo+mx7am+Lff0By1fi6/SK19OAAAAAElFTkSuQmCC"},1976:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAYAAADwikbvAAAABHNCSVQICAgIfAhkiAAAAH1JREFUKFNj/A8EDCQARiCAKWeku2aghQeAtheQZTPUtY4jUjMszqAhaA/kXwRifyBWwBH9IPEFQOwIj3CoZgGoxg1A2oBA2kHRPAGouAGIQQag25oAFIuHGuYIpS/AbSaUQoEuAzk1HiV5EtKELA8yAKgZ5AowINpmbJYAALy7UvQ5VSNWAAAAAElFTkSuQmCC"},1977:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAUCAYAAABmvqYOAAAABHNCSVQICAgIfAhkiAAAAVhJREFUOE+tlYtRwkAQhu8q0A6kBKjAUIGhAqEDrEA6QCsQKhAqMCXQgdqBVhC/P7OXiTcil0tuZieTe3y7++89fF3XB+fcHTZGO3jvFwHkgdf8PGCngfQp67fAfQyfG/ye73WmkwnrltgG+8L2IXLB5VkDQzNQbA2rCy/oKMhK30ENpSsA1SA4EMmwNRkWBNZkPRZc2l5ZmkfgZW84kUxDVF296P/g/8b69sxRJumRA1ANXrF57EBOVTiTZc24MukFV3FuMUU5C4D/Kp6kuRXspQOqgGvb/tmYv5M0F+FM0GF6x+JD9QxgHWmvOQqi1AlNgUvLxzNBrmDsTF+B3zDp7y7C8TyxqM8poMItbVBO2uxS4BULVMTeLQWumzKrxXClGAr3qbvFruFR4AWUYCqI4CpmVmP9pt0tgWBAvUi/tlmWB+eeWHdsXw075nrywkWUyW2WfWPlD6vW/x+0qGIPAAAAAElFTkSuQmCC"},1978:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAPCAYAAADgbT9oAAAABHNCSVQICAgIfAhkiAAAALFJREFUOE9j/P///wcGBgZ+IKYmMGQEGvyfmiZCzXIEGexAA4MvgAw+ADSY2q4upGlQUNu1oJAFhzElBjeixU8BNIWhGLwQKPiAiIhUAKqJB6ljBAJk9dD4skd38QISDE6AGtiAxcUC1AgKXB5ECYqLQFWgXIgOQF6Xx2HCQTRxA2xhDAr4C1gMAHkb5nV0aQc0AVBwghxCcaogKihwKSJHHOziDUCd/uToxqHnIVDcAQAZqlEzN/1i9gAAAABJRU5ErkJggg=="},2029:function(t,e,a){"use strict";a.r(e);var n=a(148),c=a(3),r=a.n(c),i=a(5),o=a(38),s=a(1),A=a.n(s),l=a(2030),u=a(450),d=a(281),m=a(192),g=a(1911),_=a(153),p=a(74),f=a(23),b=a(245),E=a(20),C=a(101),k=a(1924),v=a(414),O=a(140),y=a.n(O),w=a(118),h=a(266),N=a(348),F=a.n(N),j=a(106),x=a.n(j),I=(a(1949),l.a.Step),Q=[{id:1,title:"First",content:"Project Details",status:"wait"},{id:2,title:"Second",content:"Project Location",status:"wait"},{id:3,title:"Last",content:"Budget",status:"wait"},{id:4,title:"final",content:"Document",status:"wait"},{id:5,title:"preview",content:"Post Preview",status:"process"}],R={offset:8,span:16},B=A.a.lazy(function(){return a.e(52).then(a.bind(null,1991))}),T=A.a.lazy(function(){return a.e(51).then(a.bind(null,1992))}),S=A.a.lazy(function(){return a.e(31).then(a.bind(null,1993))}),U=A.a.lazy(function(){return a.e(30).then(a.bind(null,1994))});e.default=g.a.create()(function(t){var e,c,O,N,j,D,G=t.form,J=y()(),P=J.history,q=J.match,W=Object(s.useState)(!1),K=Object(o.a)(W,2),X=K[0],z=K[1],V=Object(s.useState)(""),L=Object(o.a)(V,2),Y=L[0],M=L[1],H=Object(s.useState)(0),$=Object(o.a)(H,2),Z=$[0],tt=$[1],et=Object(s.useState)(""),at=Object(o.a)(et,2),nt=(at[0],at[1],Object(s.useState)("")),ct=Object(o.a)(nt,2),rt=ct[0],it=ct[1],ot=Object(s.useState)({}),st=Object(o.a)(ot,2),At=st[0],lt=st[1],ut=Object(s.useState)(Q),dt=Object(o.a)(ut,2),mt=dt[0],gt=dt[1],_t=Object(C.a)(k.d),pt=Object(o.a)(_t,2),ft=pt[0],bt=(pt[1].loading,Object(C.b)(k.b));Object(s.useEffect)(Object(i.a)(r.a.mark(function t(){var e,a,n;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(localStorage.getItem("user")&&it(JSON.parse(localStorage.getItem("user"))._id),!q.params.id){t.next=7;break}return t.next=4,bt.refetch({contract_id:q.params.id});case 4:(e=t.sent).data.get_contracts[0].current_page=e.data.get_contracts[0].current_page||-1,5==e.data.get_contracts[0].current_page?P.push({pathname:"/contract/view/".concat(q.params.id)}):(n=parseInt(e.data.get_contracts[0].current_page)+1,Q.map(function(t){if(n>=t.id)return t.status="finish"}),lt(e.data.get_contracts[0]),M(null===(a=e.data.get_contracts[0])||void 0===a?void 0:a.address_id),tt(Number(e.data.get_contracts[0].current_page)+1));case 7:case"end":return t.stop()}},t)})),[q.params.id]);var Et=function(t){return A.a.createElement("img",{src:a(1973)("./step"+t.id+".png")})};return A.a.createElement(A.a.Fragment,null,A.a.createElement("h4",{className:"text-center mb-5"},2==(null===At||void 0===At?void 0:null===(e=At.get_contract_category)||void 0===e?void 0:null===(c=e[0])||void 0===c?void 0:c.category_type)?null===At||void 0===At?void 0:null===(O=At.get_contract_category)||void 0===O?void 0:null===(N=O[0])||void 0===N?void 0:N.subCategory_name:null===At||void 0===At?void 0:null===(j=At.get_contract_category)||void 0===j?void 0:null===(D=j[0])||void 0===D?void 0:D.category_name),A.a.createElement(l.a,{size:"large",className:"contract_steper",labelPlacement:"vertical",current:Z},mt&&mt.map(function(t){return A.a.createElement(I,{key:t.title,status:t.status,icon:Et(t),title:t.content})})),A.a.createElement("div",{className:"d-flex justify-content-center my-5"},A.a.createElement(g.a,Object.assign({},R,{name:"nest-messages",className:"w-100"}),A.a.createElement(s.Suspense,{fallback:A.a.createElement(m.a,{active:!0})},A.a.createElement("div",{className:5===Z?"":"d-none"},A.a.createElement("h4",{className:"text-center"},"Review and publish your project"),A.a.createElement(B,{contract_detail_data:At,current:Z,customform:G}),A.a.createElement(T,{contract_detail_data:At,current:Z,customform:G}),A.a.createElement(S,{hide_common_upload:!0,contract_detail_data:At,current:Z,customform:G})),A.a.createElement("div",{className:3===Z?"contract_images_section":"d-none"},A.a.createElement(S,{contract_detail_data:At,current:Z,customform:G})),A.a.createElement("div",{className:2===Z?"":"d-none"},A.a.createElement(T,{contract_detail_data:At,current:Z,customform:G})),A.a.createElement("div",{className:0===Z?"":"d-none"},A.a.createElement(_.a,{md:{span:18,offset:3}},A.a.createElement(B,{contract_detail_data:At,current:Z,customform:G}))),A.a.createElement("div",{className:1===Z?"":"d-none"},A.a.createElement(w.c.Provider,{value:{location_change:function(t){M(t.user_address[0]._id)}}},A.a.createElement(p.a,{type:"primary",className:"mb-3 h-50x",onClick:function(){z(!0)}},A.a.createElement("div",{className:"normal_font_size d-flex justify-content-around align-items-center"},A.a.createElement("div",{className:"mr-3"},"Add new address"),A.a.createElement(f.a,{type:"plus"}))),A.a.createElement("h4",{className:"text-center mb-5"},"My Saved Address"),A.a.createElement(_.a,{md:{span:18,offset:3},className:"extra_radius_input shadow-lg"},A.a.createElement(v.a,{user_id:rt,address_id:Y}))),A.a.createElement(h.default,{visible:X}))))),A.a.createElement("div",{className:"steps-action justify-content-between d-flex mb-5"},A.a.createElement(_.a,{md:{span:18,offset:3}},A.a.createElement(b.a,{gutter:[12,24]},A.a.createElement(_.a,{md:12},A.a.createElement(p.a,{type:"primary",ghost:!0,className:"contract_actions w-100",onClick:function(){0===Z?P.push({pathname:"/bookings"}):tt(Z-1)}},function(t){switch(t){case 0:return"Cancel";default:return"Back"}}(Z))),A.a.createElement(_.a,{md:12},A.a.createElement(p.a,{type:"primary",className:"contract_actions w-100",onClick:function(){t.form.validateFields(function(){var t=Object(i.a)(r.a.mark(function t(e,a){var c,i,o,l,g;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e){t.next=22;break}c={},q.params.id&&(c._id=q.params.id),a.current_page=Z,t.t0=Z,t.next=2===t.t0?7:1===t.t0?11:5===t.t0?13:15;break;case 7:if(a.budget&&a.timeline&&a.timeline_type){t.next=10;break}return Object(E.a)({status:"failed",msg:"Please fill all the data"}),t.abrupt("return",!1);case 10:return t.abrupt("break",16);case 11:return Y&&(a.address_id=Y),t.abrupt("break",16);case 13:return a.contract_status="12",t.abrupt("break",16);case 15:return t.abrupt("break",16);case 16:return a&&x()(a)&&(c.contract_data=[a]),t.next=19,ft({variables:c});case 19:i=t.sent,Object(E.a)(i.data.update_contract),"success"===i.data.update_contract.status&&(6===Z?(o=Q.map(function(t){return t.status="finish"}),gt(o),tt(4),u.a.success("Processing complete!")):6===Z?d.a.success({footer:null,content:A.a.createElement(s.Suspense,{fallback:A.a.createElement(m.a,{active:!0})},A.a.createElement(U,{id:c._id}))}):(l=Object(n.a)(mt),g=F()(l,["id",Z+1]),l[g].status="finish",gt(l),tt(Z+1)));case 22:case"end":return t.stop()}},t)}));return function(e,a){return t.apply(this,arguments)}}())}},function(t){switch(t){case 5:return"Post Preview";default:return"Next"}}(Z)))))))})}}]);
//# sourceMappingURL=18.536a13b4.chunk.js.map