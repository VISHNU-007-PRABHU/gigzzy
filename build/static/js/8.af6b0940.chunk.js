(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{1921:function(e,t,a){"use strict";a.d(t,"d",function(){return m}),a.d(t,"e",function(){return u}),a.d(t,"a",function(){return _}),a.d(t,"c",function(){return g}),a.d(t,"b",function(){return f});var n,c,l,r,i,o=a(18),d=a(19),s=a.n(d),m=s()(n||(n=Object(o.a)(["\n    mutation UPDATECONTRACT($_id:ID,$contract_data:JSON){\n        update_contract(_id:$_id,contract_data:$contract_data){\n            msg\n            status\n            _id\n        }\n    }\n"]))),u=s()(c||(c=Object(o.a)(["\n    mutation UPDATECONTRACTFILE($contract_id:ID,$file:[Upload],$category:String,$image_tag:String,$_id:ID){\n        ContractJobFileUpload(contract_id:$contract_id,file:$file,category:$category,image_tag:$image_tag,_id:$_id){\n            msg\n            status\n            _id\n        }\n    }\n"]))),_=s()(l||(l=Object(o.a)(["\n    mutation DELETECONTRACTFILE($_id:ID){\n        DeleteContractJobFile(_id:$_id){\n            msg\n            status\n        }\n    }\n"]))),g=s()(r||(r=Object(o.a)(["\n    query GETCONTRACTFILES($contract_id:ID){\n        get_contract_files(contract_id:$contract_id) {\n            _id\n            images{\n                small_image\n                image_tag\n                doc_category\n                _id\n            }\n        }\n    }\n"]))),f=s()(i||(i=Object(o.a)(["\n    query GETCONTRACT($contract_id:ID){\n        get_contracts(contract_id:$contract_id){\n            name\n            description\n            current_page\n            address_id\n            budget\n            timeline\n            timeline_type\n            terms_condition\n            contract_ref\n            biding_count\n            get_contract_category{\n                category_name\n                subCategory_name\n                category_type\n            }\n            get_contract_all_files(contract_id:$contract_id){\n                small_image\n            }\n            get_contract_files(contract_id:$contract_id) {\n                _id\n                images{\n                    small_image\n                    large_image\n                    image_tag\n                }\n            }\n        }\n    }\n"])))},1974:function(e,t,a){"use strict";a.r(t);var n=a(3),c=a.n(n),l=a(5),r=a(12),i=a(13),o=a(15),d=a(14),s=a(1),m=a.n(s),u=a(67),_=a(6),g=a(413),f=a(284),v=a(167),E=a(195),p=a(1911),b=a(1921),y=m.a.lazy(function(){return a.e(33).then(a.bind(null,1944))}),h=m.a.lazy(function(){return a.e(32).then(a.bind(null,1945))}),$=g.a.Title,w=g.a.Paragraph,O=function(e){Object(o.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(e=t.call.apply(t,[this].concat(i))).state={loading:!1,data:{},catgeory:{}},e.getData=Object(l.a)(c.a.mark(function t(){return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.setState({loading:!0}),_.a.query({query:b.b,variables:{contract_id:e.props.match.params.id},fetchPolicy:"no-cache"}).then(function(t){var a;console.log("Biding -> getData -> result",t.data.get_contracts),e.setState({loading:!1,data:t.data.get_contracts[0],catgeory:(null===(a=t.data.get_contracts[0])||void 0===a?void 0:a.get_contract_category[0])||{}})});case 2:case"end":return t.stop()}},t)})),e}return Object(i.a)(a,[{key:"componentDidMount",value:function(){this.props.match.params.id&&this.getData()}},{key:"render",value:function(){var e=this.state,t=e.data,a=e.catgeory;return m.a.createElement(m.a.Fragment,null,m.a.createElement(f.a,{gutter:[12,24]},m.a.createElement(v.a,{span:24},m.a.createElement("div",{className:"d-flex flex-column flex-md-row justify-content-between normal_font_size"},m.a.createElement("div",null,"Contract Detail"),m.a.createElement("div",null,"Contract Ref : ",null===t||void 0===t?void 0:t.contract_ref)))),m.a.createElement(f.a,{gutter:[12,24]},m.a.createElement(v.a,{span:24},m.a.createElement(s.Suspense,{fallback:m.a.createElement(E.a,{active:!0})},m.a.createElement(h,{parent_images:null===t||void 0===t?void 0:t.get_contract_all_files})))),m.a.createElement(f.a,{gutter:[12,24]},m.a.createElement(v.a,null,m.a.createElement($,{level:4},null===t||void 0===t?void 0:t.name),m.a.createElement($,{level:4,className:"font-weight-light m-0 mb-1"},null===t||void 0===t?void 0:t.company_name),m.a.createElement(s.Suspense,{fallback:m.a.createElement(E.a,{active:!0})},m.a.createElement(y,{parent_catgeory:a,custom_font:4,custom_class:"font-weight-light m-0 text-success"})))),m.a.createElement(f.a,{gutter:[12,24]},m.a.createElement(v.a,null,m.a.createElement("div",{className:"normal_font_size d-flex justify-content-between py-2"},m.a.createElement("div",{className:"d-flex align-items-center"},m.a.createElement(s.Suspense,{fallback:m.a.createElement(E.a,{active:!0})},m.a.createElement(y,{parent_catgeory:a,custom_class:"font-weight-light m-0",custom_font:4})),m.a.createElement("div",{className:"px-3"},(null===t||void 0===t?void 0:t.biding_count)||0,"Bids"),m.a.createElement(p.a,{color:"green"},"green")),m.a.createElement("div",null,m.a.createElement("div",null,null===t||void 0===t?void 0:t.budget))))),m.a.createElement(f.a,{gutter:[12,24]},m.a.createElement(v.a,null,m.a.createElement($,{level:4},"Project description"),m.a.createElement("div",null,m.a.createElement(w,{ellipsis:{rows:3,expandable:!0}},null===t||void 0===t?void 0:t.description)))),m.a.createElement(f.a,{gutter:[12,24]},m.a.createElement(v.a,null,m.a.createElement("div",{className:"d-flex justify-content-around normal_font_size bold"},"Duration : ",null===t||void 0===t?void 0:t.timeline),m.a.createElement($,{level:2,className:"font-weight-normal text-success d-flex justify-content-around"},m.a.createElement("div",{className:"align-items-center d-flex flex-column"},m.a.createElement("div",null,(null===t||void 0===t?void 0:t.budget)||0),m.a.createElement("div",{className:"f_25"},"Budget"))))))}}]),a}(m.a.Component);t.default=Object(u.withRouter)(O)}}]);
//# sourceMappingURL=8.af6b0940.chunk.js.map