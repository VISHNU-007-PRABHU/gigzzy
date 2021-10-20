(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{1924:function(e,n,t){"use strict";t.d(n,"d",function(){return _}),t.d(n,"e",function(){return s}),t.d(n,"a",function(){return u}),t.d(n,"c",function(){return g}),t.d(n,"b",function(){return b});var a,i,l,c,o,r=t(18),d=t(19),m=t.n(d),_=m()(a||(a=Object(r.a)(["\n    mutation UPDATECONTRACT($_id:ID,$contract_data:JSON){\n        update_contract(_id:$_id,contract_data:$contract_data){\n            msg\n            status\n            _id\n        }\n    }\n"]))),s=m()(i||(i=Object(r.a)(["\n    mutation UPDATECONTRACTFILE($contract_id:ID,$file:[Upload],$category:String,$image_tag:String,$_id:ID){\n        ContractJobFileUpload(contract_id:$contract_id,file:$file,category:$category,image_tag:$image_tag,_id:$_id){\n            msg\n            status\n            _id\n        }\n    }\n"]))),u=m()(l||(l=Object(r.a)(["\n    mutation DELETECONTRACTFILE($_id:ID){\n        DeleteContractJobFile(_id:$_id){\n            msg\n            status\n        }\n    }\n"]))),g=m()(c||(c=Object(r.a)(["\n    query GETCONTRACTFILES($contract_id:ID){\n        get_contract_files(contract_id:$contract_id) {\n            _id\n            images{\n                small_image\n                image_tag\n                doc_category\n                _id\n            }\n        }\n    }\n"]))),b=m()(o||(o=Object(r.a)(["\n    query GETCONTRACT($contract_id:ID,$location_code:String){\n        get_contracts(contract_id:$contract_id,location_code:$location_code){\n            name\n            description\n            current_page\n            address_id\n            booking_status\n            budget(code:$location_code)\n            timeline\n            biding_id\n            timeline_type\n            terms_condition\n            contract_ref\n            biding_count\n            created_at\n            get_contract_category{\n                category_name\n                subCategory_name\n                category_type\n            }\n            get_contract_all_files(contract_id:$contract_id){\n                small_image\n            }\n            get_contract_files(contract_id:$contract_id) {\n                _id\n                images{\n                    small_image\n                    large_image\n                    image_tag\n                }\n            }\n            get_provider_user {\n                img_url\n                first_name\n                email\n                phone_no\n                user_type\n                last_name\n                _id\n                get_company_root_detail(root: true) {\n                    company_name\n                    company_website\n                    company_category\n                    get_company_images {\n                    small_image\n                    }\n                }\n            }\n            get_user {\n                img_url\n                first_name\n                user_type\n                last_name\n                email\n                phone_no\n                _id\n                get_company_root_detail(root: true) {\n                    company_name\n                    company_website\n                    company_category\n                    get_company_images {\n                        small_image\n                    }\n                }\n            }\n        }\n    }\n"])))},1926:function(e,n,t){"use strict";t.d(n,"b",function(){return d}),t.d(n,"a",function(){return m}),t.d(n,"c",function(){return _});var a,i,l,c=t(18),o=t(19),r=t.n(o),d=r()(a||(a=Object(c.a)(["\n    query GETBIDINGPAGINATION($limit: Int,$page:Int,$data:JSON,$contract_id:ID,$location_code:String) {\n        get_biding_pagination(limit:$limit,page:$page,data:$data,contract_id:$contract_id,location_code:$location_code) {\n            pageInfo{\n                totalDocs\n                page\n            }\n            data{\n                _id\n                budget(code:$location_code)\n                service_fee\n                admin_fee(code:$location_code)\n                ref: biding_ref\n                created_at\n                user_id\n                contract_id\n                description\n                experience\n                timeline\n                timeline_type\n                payment_option(code:$location_code)\n                add_to_shortlist\n                provider_rating_by_category(root: true) {\n                    rating\n                }\n                get_biding_all_files {\n                    small_image\n                }\n                get_user(root_parent:true) {\n                    img_url\n                    first_name\n                    user_type\n                    last_name\n                    _id\n                    get_company_root_detail(root: true) {\n                        company_name\n                        company_website\n                        company_category\n                        get_company_images {\n                            small_image\n                        }\n                    }\n                }\n            }\n        }\n    }\n"]))),m=r()(i||(i=Object(c.a)(['\n    query GETBIDINGDETAIL($_id:ID){\n        get_biding_detail(_id:$_id){\n            _id\n                budget(code:"IN")\n                admin_fee(code:"IN")\n                service_fee\n                ref: biding_ref\n                created_at\n                user_id\n                contract_id\n                description\n                experience\n                timeline\n                timeline_type\n                add_to_shortlist\n                get_biding_all_files {\n                    small_image\n                }\n                get_user {\n                    img_url\n                    first_name\n                    user_type\n                    last_name\n                    _id\n                    get_company_root_detail(root: true) {\n                        company_name\n                        company_website\n                        company_category\n                        get_company_images {\n                            small_image\n                        }\n                    }\n                }\n        }\n    }\n']))),_=r()(l||(l=Object(c.a)(["\nmutation UPDATEBIDING($_id:ID,$biding_data:[JSON]){ \n    update_biding(\n    _id: $_id\n    biding_data: $biding_data\n  ) {\n    msg\n    status\n  }\n}"])))},1933:function(e,n,t){"use strict";t.d(n,"a",function(){return d}),t.d(n,"b",function(){return m});var a,i,l,c=t(18),o=t(19),r=t.n(o),d=r()(a||(a=Object(c.a)(["\n    query GETMILESTONEPAGINATION($_id:ID,$contract_id:ID,$biding_id:ID,$location_code:String){\n        get_biding_milestone(_id:$_id,contract_id:$contract_id,biding_id:$biding_id){\n                _id\n                budget(code:$location_code)\n                ref: milestone_ref\n                created_at\n                user_id\n                contract_id\n                timeline\n                timeline_type\n                payment_option(code:$location_code)\n                booking_status\n        }\n    }\n"]))),m=(r()(i||(i=Object(c.a)(["\n    query GETMILESTONEDETAIL($_id:ID,$contract_id:ID,$biding_id:ID){\n        get_biding_milestone_detail(_id:$_id,contract_id:$contract_id,biding_id:$biding_id){\n            _id\n            budget\n            ref: milestone_ref\n            created_at\n            user_id\n            contract_id\n            description\n            timeline\n            timeline_type\n        }\n    }\n"]))),r()(l||(l=Object(c.a)(["\nmutation UPDATEMILESTONE($option:String  \n    $_id:ID\n    $user_id: String\n    $provider_id:ID\n    $biding_id:ID\n    $contract_id:ID\n    $file:[Upload]\n    $milestone_data:JSON){ \n    update_milestone(\n        option:$option  \n        _id:$_id\n        user_id: $user_id\n        provider_id:$provider_id\n        biding_id:$biding_id\n        contract_id:$contract_id\n        file:$file\n        milestone_data:$milestone_data\n  ) {\n    msg\n    status\n  }\n}"]))))},2048:function(e,n,t){"use strict";t.r(n);var a=t(3),i=t.n(a),l=t(5),c=t(38),o=t(1),r=t.n(o),d=t(164),m=t(23),_=t(968),s=t(605),u=t.n(s),g=t(209),b=t.n(g),p=t(140),v=t.n(p),E=t(101),f=t(1924),y=t(1926),$=t(1933),N=(t(960),r.a.lazy(function(){return t.e(3).then(t.bind(null,1940))})),O={0:"welcome Gizzy",50:"waiting for payment confirmation",9:"Provider accept job",10:"Base price paid",11:"Booking canceled",4:"Job started",13:"Ongoing",14:"Completed"},I={0:"welcome Gizzy",50:"waiting for payment confirmation",9:"Pending",4:"Job started",13:"Ongoing",14:"Completed"};n.default=function(){var e,n,t,a,s,g,p,j,D,T,x=u()(),S=v()(),h=(S.history,S.match),k=Object(o.useState)([]),w=Object(c.a)(k,2),A=w[0],C=w[1],B=Object(o.useState)([]),G=Object(c.a)(B,2),z=G[0],P=G[1],L=Object(o.useState)({}),J=Object(c.a)(L,2),F=J[0],U=J[1],M=Object(o.useState)([]),q=Object(c.a)(M,2),R=q[0],V=q[1],H=Object(o.useState)([]),K=Object(c.a)(H,2),Q=K[0],W=K[1],X=Object(o.useState)([]),Y=Object(c.a)(X,2),Z=Y[0],ee=Y[1],ne=Object(o.useState)(!1),te=Object(c.a)(ne,2),ae=te[0],ie=(te[1],Object(E.b)(f.b)),le=Object(E.b)(y.a),ce=Object(E.b)($.a);Object(o.useEffect)(function(){oe()},[]);var oe=function(){var e=Object(l.a)(i.a.mark(function e(){var n,t,a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ie.refetch({contract_id:h.params.id});case 2:if(n=e.sent,W(n.data.get_contracts[0]),V(n.data.get_contracts[0].get_provider_user),P(n.data.get_contracts[0].get_user),C(n.data.get_contracts[0].get_contract_category),!n.data.get_contracts[0].biding_id){e.next=16;break}return e.next=10,le.refetch({_id:n.data.get_contracts[0].biding_id});case 10:return t=e.sent,U(t.data.get_biding_detail),e.next=14,ce.refetch({biding_id:n.data.get_contracts[0].biding_id});case 14:a=e.sent,ee(a.data.get_biding_milestone);case 16:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:" col-xs-12 col-md-12 col-sm-12 invoice_body_color  "},r.a.createElement("div",{className:"col-xs-12 col-md-12 col-sm-12 col-lg-6 main_content mx-lg-auto"},r.a.createElement("div",{className:"invoice_header mt-1"},r.a.createElement("div",{className:x.isMobile()?"d-none":""},r.a.createElement("a",{href:"/bookings"},r.a.createElement(d.a,{placement:"left",title:"Back to Booking"},r.a.createElement(m.a,{className:"ml-2 cursor_point",type:"arrow-left",style:{fontSize:"26px"}})))),r.a.createElement("div",null,r.a.createElement("img",{src:b.a,alt:"gigzzy",className:"w-50x object_fit cursor_point"})),r.a.createElement("div",{className:"invoice_info"},r.a.createElement("div",null,"INVOICE NO ",r.a.createElement("b",null,null===Q||void 0===Q?void 0:Q.contract_ref)),r.a.createElement("div",null," ",r.a.createElement("small",null,null===Q||void 0===Q?void 0:Q.booking_date)),r.a.createElement("div",{className:"py-2"},r.a.createElement(_.a,{color:"green"},O[Q.booking_status])))),r.a.createElement("div",{className:50!=Q.booking_status&&1!=ae||"c2b"!=(null===Q||void 0===Q?void 0:Q.payment_type)?"d-none":"jumbotron p-1 mb-3 mx-3"},r.a.createElement(o.Suspense,{fallback:r.a.createElement("div",{class:"spinner-border text-success",role:"status"},r.a.createElement("span",{class:"sr-only"},"Loading..."))},r.a.createElement(N,{BusinessNumber:null===Q||void 0===Q?void 0:Q.ctob_shotcode,AmountNumber:null===Q||void 0===Q?void 0:Q.ctob_billRef,Amount:ae?null===Q||void 0===Q?void 0:Q.extra_price:null===Q||void 0===Q?void 0:Q.base_price}))),r.a.createElement("div",{className:"user_batch mx-3"},r.a.createElement("p",null,r.a.createElement("b",null,null===z||void 0===z?void 0:null===(e=z[0])||void 0===e?void 0:e.name)),r.a.createElement("p",null,"Thanks for using gigzzy.")),r.a.createElement("div",{className:"total_fare"},r.a.createElement("h5",null,"TOTAL COST"),r.a.createElement("h1",null,r.a.createElement("small",null),null===Q||void 0===Q?void 0:Q.budget)),r.a.createElement("div",{className:"fare_estimation col-xs-12 col-md-12 col-sm-12 nopad d-print-block d-md-flex"},r.a.createElement("div",{className:"fare_breakup mr-sm-3"},r.a.createElement("p",{className:"title"},"Fare Breakup"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("label",null,"Base Price"),r.a.createElement("span",null,null===F||void 0===F?void 0:F.admin_fee)))),r.a.createElement("div",{className:"tax_breakup "},r.a.createElement("p",{className:"title"},"Service Breakup"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("label",{className:"d-flex align-items-center"},"Service Fee",r.a.createElement("span",{className:"ml-auto"},null===F||void 0===F?void 0:F.service_fee,"%")))))),r.a.createElement("div",{className:"booking_details col-xs-12 col-md-12 col-sm-12"},r.a.createElement("p",{className:"title"},"Booking Details"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("label",null,"Service Type"),r.a.createElement("span",null,1===(null===A||void 0===A?void 0:null===(n=A[0])||void 0===n?void 0:n.category_type)?null===A||void 0===A?void 0:null===(t=A[0])||void 0===t?void 0:t.category_name:null===A||void 0===A?void 0:null===(a=A[0])||void 0===a?void 0:a.subCategory_name)),r.a.createElement("li",null,r.a.createElement("label",null,"Booking Date"),r.a.createElement("span",null,null===Q||void 0===Q?void 0:Q.created_at)))),Z.length>1&&r.a.createElement("div",{className:"booking_details col-xs-12 col-md-12 col-sm-12"},r.a.createElement("p",{className:"title"},"Milestone Details"),Z.map(function(e,n){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"jumbotron p-3 "},r.a.createElement("div",null,"Milestone ",n),r.a.createElement("div",{className:"justify-content-between d-flex"},r.a.createElement("div",{className:"d-flex"},"Milestone Status"),r.a.createElement("div",{className:"d-flex flex-grow-0"},r.a.createElement(_.a,{color:"green"},I[null===e||void 0===e?void 0:e.booking_status]))),r.a.createElement("div",{className:"justify-content-between d-flex"},r.a.createElement("div",{className:"d-flex"},"Budget"),r.a.createElement("div",{className:"d-flex flex-grow-0"},null===e||void 0===e?void 0:e.budget))))})),r.a.createElement("div",{className:"member_section col-xs-12 col-md-12 col-sm-12 nopad d-print-block d-md-flex"},r.a.createElement("div",{className:"user_details mr-sm-3"},r.a.createElement("p",{className:"title"},"User Details"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("label",null,"Name"),r.a.createElement("span",null,null===z||void 0===z?void 0:null===(s=z[0])||void 0===s?void 0:s.name)),r.a.createElement("li",null,r.a.createElement("label",null,"Email"),r.a.createElement("span",null,null===z||void 0===z?void 0:null===(g=z[0])||void 0===g?void 0:g.email)),r.a.createElement("li",null,r.a.createElement("label",null,"Phone"),r.a.createElement("span",null,null===z||void 0===z?void 0:null===(p=z[0])||void 0===p?void 0:p.phone_number)))),r.a.createElement("div",{className:"provider_details"},r.a.createElement("p",{className:"title"},"Provider Details"),r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement("label",null,"Name"),r.a.createElement("span",null,null===R||void 0===R?void 0:null===(j=R[0])||void 0===j?void 0:j.name)),r.a.createElement("li",null,r.a.createElement("label",null,"Email"),r.a.createElement("span",null,null===R||void 0===R?void 0:null===(D=R[0])||void 0===D?void 0:D.email)),r.a.createElement("li",null,r.a.createElement("label",null,"Phone"),r.a.createElement("span",null,null===R||void 0===R?void 0:null===(T=R[0])||void 0===T?void 0:T.phone_number))))),r.a.createElement("div",{className:"invoice_footer col-xs-12 m-3"},r.a.createElement("hr",null),r.a.createElement("p",null," Thanks,"),"gigzzy Team"))))}}}]);
//# sourceMappingURL=20.ae1cb4c1.chunk.js.map