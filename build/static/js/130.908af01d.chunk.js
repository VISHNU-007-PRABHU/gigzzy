(window.webpackJsonp=window.webpackJsonp||[]).push([[130],{1060:function(e,a,t){e.exports=t.p+"static/media/main.c57228a8.png"},1061:function(e,a,t){"use strict";t.d(a,"d",function(){return d}),t.d(a,"e",function(){return _}),t.d(a,"a",function(){return u}),t.d(a,"c",function(){return p}),t.d(a,"b",function(){return g});var n,l,o,c,i,r=t(758),s=t(759),m=t.n(s),d=m()(n||(n=Object(r.a)(["\n    mutation UPDATECONTRACT($_id:ID,$contract_data:JSON){\n        update_contract(_id:$_id,contract_data:$contract_data){\n            msg\n            status\n            _id\n        }\n    }\n"]))),_=m()(l||(l=Object(r.a)(["\n    mutation UPDATECONTRACTFILE($contract_id:ID,$file:[Upload],$category:String,$image_tag:String,$_id:ID){\n        ContractJobFileUpload(contract_id:$contract_id,file:$file,category:$category,image_tag:$image_tag,_id:$_id){\n            msg\n            status\n            _id\n        }\n    }\n"]))),u=m()(o||(o=Object(r.a)(["\n    mutation DELETECONTRACTFILE($_id:ID){\n        DeleteContractJobFile(_id:$_id){\n            msg\n            status\n        }\n    }\n"]))),p=m()(c||(c=Object(r.a)(["\n    query GETCONTRACTFILES($contract_id:ID){\n        get_contract_files(contract_id:$contract_id) {\n            _id\n            images{\n                small_image\n                image_tag\n                doc_category\n                _id\n            }\n        }\n    }\n"]))),g=m()(i||(i=Object(r.a)(["\n    query GETCONTRACT($contract_id:ID){\n        get_contracts(contract_id:$contract_id){\n            name\n            description\n            current_page\n            address_id\n            budget\n            timeline\n            timeline_type\n            terms_condition\n            contract_ref\n            biding_count\n            created_at\n            get_contract_category{\n                category_name\n                subCategory_name\n                category_type\n            }\n            get_contract_all_files(contract_id:$contract_id){\n                small_image\n            }\n            get_contract_files(contract_id:$contract_id) {\n                _id\n                images{\n                    small_image\n                    large_image\n                    image_tag\n                }\n            }\n            get_provider_user {\n                img_url\n                first_name\n                email\n                phone_no\n                user_type\n                last_name\n                _id\n                get_company_root_detail(root: true) {\n                    company_name\n                    company_website\n                    company_category\n                    get_company_images {\n                    small_image\n                    }\n                }\n            }\n            get_user {\n                img_url\n                first_name\n                user_type\n                last_name\n                email\n                phone_no\n                _id\n                get_company_root_detail(root: true) {\n                    company_name\n                    company_website\n                    company_category\n                    get_company_images {\n                        small_image\n                    }\n                }\n            }\n        }\n    }\n"])))},2021:function(e,a,t){"use strict";t.r(a);var n,l=t(709),o=t.n(l),c=t(714),i=t(693),r=t(694),s=t(746),m=t(696),d=t(695),_=t(758),u=t(0),p=t.n(u),g=t(720),b=t(74),v=t(953),y=(t(332),t(329),t(146)),E=t(759),k=t.n(E),f=t(1061),h=t(1060),w=t.n(h),N=p.a.lazy(function(){return t.e(13).then(t.bind(null,1514))}),x={0:"welcome Gizzy",50:"waiting for payment confirmation",10:"Base price paid",11:"Booking canceled",4:"Job started",13:"Ongoing",14:"Completed"},$=k()(n||(n=Object(_.a)(['\nsubscription SENDACCEPTMSG($_id:ID,$booking_id:ID){\n    send_accept_msg (_id:$_id,booking_id:$booking_id){\n      _id\n      status\n      booking_status\n      payment_type\n      mpeas_payment_callback\n      base_price(code:"symbol")\n      extra_price(code:"symbol")\n      ctob_shotcode\n      ctob_billRef\n    }\n}']))),O=function(e){Object(m.a)(t,e);var a=Object(d.a)(t);function t(){var e;Object(i.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=a.call.apply(a,[this].concat(l))).state={currency_symbol:"Ksh",collapsed:!1,booking:{},booking_user:[],booking_provider:[],booking_category:[],booking_status:0,payment_type:"",mpeas_payment_callback:!1,base_price:"0.00",extra_price:"0.00",ctob_shotcode:"",ctob_billRef:""},e.onToggle=function(a){console.log(a),e.setState({collapsed:a})},e.isMobile=function(){return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent||navigator.vendor||window.opera).substr(0,4))},e.fetch_booking=function(a){y.a.query({query:f.b,variables:{contract_id:a},fetchPolicy:"no-cache"}).then(function(a){var t,n,l,o,c,i,r,s,m,d;console.log(a),e.current_booking_status(e.props.match.params.id),console.log("ContractInvoice -> fetch_booking ->result.data.get_contracts?.get_user",null===(t=a.data.get_contracts)||void 0===t?void 0:t.get_user),e.setState({booking:a.data.get_contracts[0],booking_category:null===(n=a.data.get_contracts[0])||void 0===n?void 0:n.get_contract_category,booking_user:null===(l=a.data.get_contracts[0])||void 0===l?void 0:l.get_user,booking_provider:null===(o=a.data.get_contracts[0])||void 0===o?void 0:o.get_provider_user,booking_status:null===(c=a.data.get_contracts[0])||void 0===c?void 0:c.booking_status,payment_type:(null===(i=a.data.get_contracts[0])||void 0===i?void 0:i.payment_type)||"",base_price:(null===(r=a.data.get_contracts[0])||void 0===r?void 0:r.base_price)||"",ctob_shotcode:(null===(s=a.data.get_contracts[0])||void 0===s?void 0:s.ctob_shotcode)||"",ctob_billRef:(null===(m=a.data.get_contracts[0])||void 0===m?void 0:m.ctob_billRef)||"",mpeas_payment_callback:null===(d=a.data.get_contracts[0])||void 0===d?void 0:d.mpeas_payment_callback})})},e.current_booking_status=function(){var a=Object(c.a)(o.a.mark(function a(t){var n;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return n=Object(s.a)(e),a.next=3,y.a.subscribe({query:$,variables:{_id:JSON.parse(localStorage.getItem("user"))._id,booking_id:t}}).subscribe({next:function(e,a,t){var l;(a&&console.log("load"),e)&&(console.log(e.data.send_accept_msg),n.setState({booking_status:e.data.send_accept_msg.booking_status,payment_type:(null===(l=e.data.send_accept_msg)||void 0===l?void 0:l.payment_type)||""}))}});case 3:case"end":return a.stop()}},a)}));return function(e){return a.apply(this,arguments)}}(),e}return Object(r.a)(t,[{key:"componentDidMount",value:function(){console.log(this.isMobile()),this.fetch_booking(this.props.match.params.id)}},{key:"render",value:function(){var e,a=this.state,t=a.ctob_billRef,n=a.ctob_shotcode,l=a.mpeas_payment_callback,o=a.base_price,c=a.extra_price,i=a.booking,r=a.booking_category,s=a.booking_provider,m=a.booking_user,d=a.payment_type,_=a.booking_status;return console.log("Invoice -> render -> booking_status",_),console.log("Invoice -> render -> mpeas_payment_callback",l),console.log("Invoice -> render -> payment_option",d),p.a.createElement("div",{className:" col-xs-12 col-md-12 col-sm-12 invoice_body_color  "},p.a.createElement("div",{className:"col-xs-12 col-md-12 col-sm-12 col-lg-6 main_content mx-lg-auto"},p.a.createElement("div",{className:"invoice_header mt-1"},p.a.createElement("div",{className:this.isMobile()?"d-none":""},p.a.createElement("a",{href:"/bookings"},p.a.createElement(g.a,{placement:"left",title:"Back to Booking"},p.a.createElement(b.a,{className:"ml-2 cursor_point",type:"arrow-left",style:{fontSize:"26px"}})))),p.a.createElement("div",null,p.a.createElement("img",{src:w.a,alt:"gigzzy",className:"w-50x object_fit cursor_point"})),p.a.createElement("div",{className:"invoice_info"},p.a.createElement("div",null,"INVOICE NO ",p.a.createElement("b",null,null===i||void 0===i?void 0:i.contract_ref)),p.a.createElement("div",null," ",p.a.createElement("small",null,null===i||void 0===i?void 0:i.created_at)),p.a.createElement("div",{className:"py-2"},p.a.createElement(v.a,{color:"green"},x[this.state.booking_status])))),p.a.createElement("div",{className:50!=_&&1!=l||"c2b"!=d?"d-none":"jumbotron p-1 mb-3 mx-3"},p.a.createElement(u.Suspense,{fallback:p.a.createElement("div",{class:"spinner-border text-success",role:"status"},p.a.createElement("span",{class:"sr-only"},"Loading..."))},p.a.createElement(N,{BusinessNumber:n,AmountNumber:t,Amount:l?c:o}))),p.a.createElement("div",{className:"user_batch mx-3"},p.a.createElement("p",null,p.a.createElement("b",null,m[0]?null===(e=m[0])||void 0===e?void 0:e.name:"")),p.a.createElement("p",null,"Thanks for using gigzzy.")),p.a.createElement("div",{className:"total_fare"},p.a.createElement("h5",null,"TOTAL COST"),p.a.createElement("h1",null,p.a.createElement("small",null),null===i||void 0===i?void 0:i.total)),p.a.createElement("div",{className:"fare_estimation col-xs-12 col-md-12 col-sm-12 nopad d-print-block d-md-flex"},p.a.createElement("div",{className:"fare_breakup mr-sm-3"},p.a.createElement("p",{className:"title"},"Fare Breakup"),p.a.createElement("ul",null,p.a.createElement("li",null,p.a.createElement("label",null,"Base Price"),p.a.createElement("span",null,null===i||void 0===i?void 0:i.budget)))),p.a.createElement("div",{className:"tax_breakup "},p.a.createElement("p",{className:"title"},"Service Breakup"),p.a.createElement("ul",null,p.a.createElement("li",null,p.a.createElement("label",{className:"d-flex align-items-center"},"Service Fee",p.a.createElement(g.a,{placement:"right",title:"".concat(null===i||void 0===i?void 0:i.service_fee," %")},p.a.createElement(b.a,{className:"ml-2 cursor_point",type:"info-circle"})),p.a.createElement("span",{className:"ml-auto"},null===i||void 0===i?void 0:i.service_fee)))))),p.a.createElement("div",{className:"booking_details col-xs-12 col-md-12 col-sm-12"},p.a.createElement("p",{className:"title"},"Booking Details"),p.a.createElement("ul",null,p.a.createElement("li",null,p.a.createElement("label",null,"Service Type"),p.a.createElement("span",null,r[0]?1===r[0].category_type?r[0].category_name:r[0].subCategory_name:"")),p.a.createElement("li",null,p.a.createElement("label",null,"Booking Date"),p.a.createElement("span",null,null===i||void 0===i?void 0:i.created_at)))),p.a.createElement("div",{className:"member_section col-xs-12 col-md-12 col-sm-12 nopad d-print-block d-md-flex"},p.a.createElement("div",{className:"user_details mr-sm-3"},p.a.createElement("p",{className:"title"},"User Details"),p.a.createElement("ul",null,p.a.createElement("li",null,p.a.createElement("label",null,"Name"),p.a.createElement("span",null,m[0]?"".concat(m[0].first_name," ").concat(m[0].last_name):"")),p.a.createElement("li",null,p.a.createElement("label",null,"Email"),p.a.createElement("span",null,m[0]?m[0].email:"")),p.a.createElement("li",null,p.a.createElement("label",null,"Phone"),p.a.createElement("span",null,m[0]?m[0].phone_number:"")))),p.a.createElement("div",{className:"provider_details"},p.a.createElement("p",{className:"title"},"Provider Details"),p.a.createElement("ul",null,p.a.createElement("li",null,p.a.createElement("label",null,"Name"),p.a.createElement("span",null,s[0]?"".concat(s[0].first_name," ").concat(s[0].last_name):"")),p.a.createElement("li",null,p.a.createElement("label",null,"Email"),p.a.createElement("span",null,s[0]?s[0].email:"")),p.a.createElement("li",null,p.a.createElement("label",null,"Phone"),p.a.createElement("span",null,s[0]?s[0].phone_number:""))))),p.a.createElement("div",{className:"invoice_footer col-xs-12 m-3"},p.a.createElement("hr",null),p.a.createElement("p",null," Thanks,"),"gigzzy Team")))}}]),t}(p.a.Component);a.default=O}}]);
//# sourceMappingURL=130.908af01d.chunk.js.map