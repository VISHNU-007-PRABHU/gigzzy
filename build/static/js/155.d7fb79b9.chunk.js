(window.webpackJsonp=window.webpackJsonp||[]).push([[155],{1945:function(e,n,a){"use strict";a.r(n);var t=a(709),r=a.n(t),o=a(714),i=a(148),l=a(0),s=a.n(l),c=a(753),d=a(810),_=a(813),m=a(949),u=a(911),p=a(758),$=a(707),f=a(48),g=a(682),y=a(938),E=s.a.lazy(function(){return Promise.all([a.e(8),a.e(94),a.e(140)]).then(a.bind(null,1058))}),b=c.a.Option,D="ADD YOUR WORKER",I="BACK",v="REGISTER";n.default=u.a.create()(function(e){Object(f.useHistory)();var n=Object(l.useState)([]),a=Object(i.a)(n,2),t=a[0],O=(a[1],Object(l.useState)(!1)),S=Object(i.a)(O,2),h=S[0],N=S[1],j=Object(l.useState)(""),w=Object(i.a)(j,2),C=(w[0],w[1],Object(g.b)(y.k)),R=e.form,A=function(){var e=Object(o.a)(r.a.mark(function e(n){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n&&(a={email:{$regex:".*"+n+".*",$options:"i"},role:2},C.refetch({variables:{variable_data:a}}));case 1:case"end":return e.stop()}},e)}));return function(n){return e.apply(this,arguments)}}();return console.log("SearchEmail -> result",C),s.a.createElement(s.a.Fragment,null,s.a.createElement(d.a,{gutter:[16,32]},s.a.createElement(_.a,{span:24},s.a.createElement("div",{className:"normal_font_size primary_color d-flex justify-content-center"},D))),s.a.createElement(d.a,null,s.a.createElement(_.a,{span:24},s.a.createElement("div",{className:"company_reg_detail"},s.a.createElement(d.a,null,s.a.createElement(_.a,{className:"",lg:24},s.a.createElement(m.a,{onClick:function(){N(!h)}},"Address"),s.a.createElement("div",{className:h?"d-none":""},s.a.createElement(E,{company:!0,visible:h})))),s.a.createElement(d.a,{gutter:[0,24]},s.a.createElement(_.a,{className:"",lg:24},s.a.createElement(u.a.Item,{label:"Add your worker"},R.getFieldDecorator("provider_email",{rules:[{required:!1}]})(s.a.createElement(c.a,{className:"input_border",mode:"tags",style:{width:"100%"},placeholder:"Enter your worker email",onSearch:A},t.map(function(e){return s.a.createElement(b,{key:e.email},e.email)})))))),s.a.createElement(d.a,null,s.a.createElement(_.a,{className:"",lg:24},s.a.createElement(u.a.Item,{label:""},R.getFieldDecorator("add_label",{rules:[{required:!1}]})(s.a.createElement(p.a,{onChange:function(e){console.log("checked = ".concat(e.target.checked))}},"Add label")))))))),s.a.createElement(d.a,null,s.a.createElement(_.a,{className:"",span:12},s.a.createElement("div",{className:"normal_font_size primary_color d-flex justify-content-center"},s.a.createElement($.a,{type:"primary",className:"w-50",onClick:function(){var n;n="COMPANY_REGISTRATION_DETAIL",e.change_from_type(n)}},s.a.createElement("div",null,I)))),s.a.createElement(_.a,{className:"",span:12},s.a.createElement("div",{className:"normal_font_size primary_color d-flex justify-content-center"},s.a.createElement($.a,{type:"primary",className:"w-50",onClick:function(){R.validateFields(function(){var n=Object(o.a)(r.a.mark(function n(a,t){return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:e.submitFromData(t,"COMPANY_WORKER_DETAIL");case 1:case"end":return n.stop()}},n)}));return function(e,a){return n.apply(this,arguments)}}())}},s.a.createElement("div",null,v))))))})},938:function(e,n,a){"use strict";a.d(n,"a",function(){return g}),a.d(n,"j",function(){return y}),a.d(n,"g",function(){return E}),a.d(n,"d",function(){return b}),a.d(n,"e",function(){return D}),a.d(n,"h",function(){return I}),a.d(n,"k",function(){return v}),a.d(n,"f",function(){return O}),a.d(n,"i",function(){return S}),a.d(n,"b",function(){return h}),a.d(n,"c",function(){return N});var t,r,o,i,l,s,c,d,_,m,u,p=a(760),$=a(761),f=a.n($),g=f()(t||(t=Object(p.a)(["\n    mutation ADDUSER($role:Int,$demo:Boolean,$country_code:String,$phone_no:String,$email:String,$password:String,$last_name:String,$first_name:String,$provider_subCategoryID:[ID],$lat:Float,$lng:Float,$address:String) {\n        admin_add_user(role:$role,demo:$demo,country_code:$country_code,phone_no:$phone_no,email:$email,password:$password,last_name:$last_name,first_name:$first_name,provider_subCategoryID:$provider_subCategoryID,lat:$lat,lng:$lng,address:$address){\n            info\n        }\n    }\n"]))),y=f()(r||(r=Object(p.a)(["\n    mutation UPDATEUSER($_id:ID,$role:Int,$demo:Boolean,$country_code:String,$phone_no:String,$email:String,$password:String,$last_name:String,$first_name:String,$provider_subCategoryID:[ID],$lat:Float,$lng:Float,$address:String) {\n        admin_update_user(_id:$_id,role:$role,demo:$demo,country_code:$country_code,phone_no:$phone_no,email:$email,password:$password,last_name:$last_name,first_name:$first_name,provider_subCategoryID:$provider_subCategoryID,lat:$lat,lng:$lng,address:$address){\n            info\n        }\n    }\n"]))),E=f()(o||(o=Object(p.a)(["\n query GETUSER($limit: Int,$page:Int,$role:String,$proof_status:Int) {\n    get_user(limit:$limit,page:$page,role:$role,proof_status:$proof_status) {\n        pageInfo{\n            totalDocs\n            page\n        }\n        data{\n            _id\n            country_code\n            phone_no\n            email\n            first_name\n            last_name\n            address\n            location\n            password\n            provider_subCategoryID\n            # provider_document_url\n            proof_status\n        }\n    }\n}\n"]))),b=f()(i||(i=Object(p.a)(["\n    mutation DELETEUSER($_id: ID)  {\n        deleteDetails(_id:$_id){\n        msg\n        status         \n    }\n}"]))),D=f()(l||(l=Object(p.a)(["\nquery FINDUSER($_id:ID) {\n    user(_id:$_id) {\n        _id\n        country_code\n        phone_no\n        email\n        first_name\n        last_name\n        demo\n        address\n        location\n        password\n        provider_subCategoryID\n        professional_document_url\n        personal_document_url\n        proof_status\n    }\n}\n"]))),I=f()(s||(s=Object(p.a)(["\nmutation PROVIDERDOCUMENTVERIFIED($_id:ID,$proof_status:String) {\n    provider_document_verified(_id:$_id,proof_status:$proof_status) {\n        info\n        # provider_document_url\n        proof_status\n    }\n}\n"]))),v=f()(c||(c=Object(p.a)(["\nquery USEREMAILQUERY($data:JSON) {\n    user_search(data:$data) {\n        _id\n        email\n        proof_status\n        phone_no\n        first_name\n        last_name\n        role\n    }\n}\n"]))),O=f()(d||(d=Object(p.a)(["\n query GETCOMPANY($limit: Int,$page:Int,$search:JSON,$company_id:ID,$provider_search:JSON) {\n    get_company_detail(limit:$limit,page:$page,search:$search,company_id:$company_id) {\n        pageInfo{\n            totalDocs\n            page\n        }\n        data{\n            _id\n            user_id\n            company_name\n            company_website\n            about_company\n            company_category\n            user_id\n            get_company_user_detail {\n                first_name\n                last_name\n                role\n            }\n            get_company_address_detail(company_id:$company_id) {\n                address\n                _id\n                lat\n                lng\n            }\n            get_parent_company_provider(provider_search:$provider_search,company_id:$company_id) {\n                email\n                created_at\n                provider_id\n                register_status\n                register_link_status\n                _id\n            }\n        }\n    }\n}\n"]))),S=f()(_||(_=Object(p.a)(["\n    mutation UPDATECOMPANYDETAIL($_id: ID,$company_data:JSON,$logo_file:Upload,$profile_file:Upload)  {\n        update_company_detail(_id:$_id,company_data:$company_data,logo_file:$logo_file,profile_file:$profile_file){\n        msg\n        status         \n    }\n}"]))),h=f()(m||(m=Object(p.a)(["\n    mutation DELETECOMPANY($company_id: ID)  {\n        deleteCompany(company_id:$company_id){\n        msg\n        status         \n    }\n}"]))),N=f()(u||(u=Object(p.a)(["\n    mutation DELETECOMPANYPROVIDER($_id:ID,$company_id: ID)  {\n        deleteCompanyProvider(_id:$_id,company_id:$company_id){\n        msg\n        status         \n    }\n}"])))}}]);
//# sourceMappingURL=155.d7fb79b9.chunk.js.map