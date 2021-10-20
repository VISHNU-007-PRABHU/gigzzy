(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{1933:function(e,t,a){"use strict";a.d(t,"a",function(){return s}),a.d(t,"b",function(){return d});var n,i,l,r=a(18),c=a(19),o=a.n(c),s=o()(n||(n=Object(r.a)(["\n    query GETMILESTONEPAGINATION($_id:ID,$contract_id:ID,$biding_id:ID,$location_code:String){\n        get_biding_milestone(_id:$_id,contract_id:$contract_id,biding_id:$biding_id){\n                _id\n                budget(code:$location_code)\n                ref: milestone_ref\n                created_at\n                user_id\n                contract_id\n                timeline\n                timeline_type\n                payment_option(code:$location_code)\n                booking_status\n        }\n    }\n"]))),d=(o()(i||(i=Object(r.a)(["\n    query GETMILESTONEDETAIL($_id:ID,$contract_id:ID,$biding_id:ID){\n        get_biding_milestone_detail(_id:$_id,contract_id:$contract_id,biding_id:$biding_id){\n            _id\n            budget\n            ref: milestone_ref\n            created_at\n            user_id\n            contract_id\n            description\n            timeline\n            timeline_type\n        }\n    }\n"]))),o()(l||(l=Object(r.a)(["\nmutation UPDATEMILESTONE($option:String  \n    $_id:ID\n    $user_id: String\n    $provider_id:ID\n    $biding_id:ID\n    $contract_id:ID\n    $file:[Upload]\n    $milestone_data:JSON){ \n    update_milestone(\n        option:$option  \n        _id:$_id\n        user_id: $user_id\n        provider_id:$provider_id\n        biding_id:$biding_id\n        contract_id:$contract_id\n        file:$file\n        milestone_data:$milestone_data\n  ) {\n    msg\n    status\n  }\n}"]))))},1996:function(e,t,a){"use strict";a.r(t);var n=a(3),i=a.n(n),l=a(5),r=a(38),c=a(1),o=a.n(c),s=a(175),d=a(453),m=a(245),u=a(1911),_=a(153),p=a(607),g=a(23),E=a(2032),f=a(965),b=a(74),y=a(20),$=a(101),v=a(1933),D=a(960),I=a.n(D),k=s.a.Option,N=d.a.TextArea;t.default=u.a.create()(function(e){var t=e.form,a=Object(c.useState)([]),n=Object(r.a)(a,2),D=n[0],O=n[1],w=Object($.a)(v.b),j=Object(r.a)(w,2);j[0],j[1].loading;Object(c.useEffect)(function(){for(var t=[],a=1;a<=e.count;a++)t.push({count:a,file:[],image:[],title:"",description:"",error_title:!1});O(t)},[e]);var x=function(e){var t=D.splice(e,1);O(t)},z=function(e){return Array.isArray(e)?e:e&&e.fileList};return o.a.createElement(o.a.Fragment,null,o.a.createElement(m.a,null,o.a.createElement(u.a,{name:"nested-milestone",className:""},(D||[]).map(function(e,a){return console.log("CreateMilestone -> field",e),o.a.createElement(o.a.Fragment,null,o.a.createElement(m.a,{gutter:[16,0]},o.a.createElement(_.a,{span:24},o.a.createElement("div",{className:"d-flex w-100 justify-content-between normal_font_size pb-3"},o.a.createElement("div",null," Milestone ",a+1),D.length>=2&&o.a.createElement(p.a,{title:"Sure to delete milestone ?",onConfirm:function(){return x(a)}},o.a.createElement("div",{className:"cursor_point d-flex justify-content-between align-items-center text-danger"},o.a.createElement(g.a,{className:"px-3",type:"delete"})," ",o.a.createElement("div",null,"Remove")))))),o.a.createElement(m.a,{gutter:[16,0]},o.a.createElement(_.a,{span:24},o.a.createElement(u.a.Item,{label:"Title",key:a},t.getFieldDecorator("title_".concat(a),{keys:"",initialValue:"",rules:[{required:!!e.error_title}]})(o.a.createElement(d.a,{size:"large",className:"w-100"}))))),o.a.createElement(m.a,{gutter:[16,0]},o.a.createElement(_.a,{span:24},o.a.createElement(u.a.Item,{label:"Description",key:a},t.getFieldDecorator("description_".concat(a),{keys:"",initialValue:""})(o.a.createElement(N,{size:"large",rows:6}))))),o.a.createElement(m.a,{gutter:[16,0]},o.a.createElement(_.a,{span:12},o.a.createElement(u.a.Item,{label:"Amount to be released",key:a},t.getFieldDecorator("budget_".concat(a),{keys:"",initialValue:""})(o.a.createElement(d.a,{type:"number",size:"large",className:"w-100",min:1,addonAfter:"KSH"})))),o.a.createElement(_.a,{span:6},o.a.createElement(u.a.Item,{label:"Duration",key:a},t.getFieldDecorator("timeline_".concat(a),{keys:"",initialValue:""})(o.a.createElement(E.a,{type:"number",size:"large",className:"w-100",min:1})))),o.a.createElement(_.a,{span:6},o.a.createElement(u.a.Item,{label:"time type",key:a},t.getFieldDecorator("timeline_type_".concat(a),{keys:"",initialValue:""})(o.a.createElement(s.a,{defaultValue:"days",size:"large",className:"w-100"},o.a.createElement(k,{value:"days"},"Days"),o.a.createElement(k,{value:"months"},"Months"),o.a.createElement(k,{value:"years"},"Years")))))),o.a.createElement(m.a,{gutter:[16,0]},o.a.createElement(_.a,{span:24},o.a.createElement("div",null,o.a.createElement(u.a.Item,{label:""},t.getFieldDecorator("file_".concat(a),{rules:[],valuePropName:"fileList",getValueFromEvent:z})(o.a.createElement(f.a,{name:"logo",multiple:!0,listType:"picture-card",action:"/upload.do"},o.a.createElement("div",null,o.a.createElement(g.a,{type:"plus"}),o.a.createElement("div",{className:"ant-upload-text"},"Upload")))))))),o.a.createElement(m.a,{gutter:[16,0]},o.a.createElement(_.a,{span:12},D.length>=2&&o.a.createElement(p.a,{title:"Sure to delete milestone ?",onConfirm:function(){return x(a)}},o.a.createElement(b.a,{size:"large",block:!0,className:"normal_font_size"},o.a.createElement("div",{className:"px-2"}," Cancel")))),o.a.createElement(_.a,{span:12},o.a.createElement(b.a,{size:"large",block:!0,onClick:function(){!function(e,a){console.log("save_milestone -> form"),t.validateFields(function(){var e=Object(l.a)(i.a.mark(function e(t,n){var l,r,c,o;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=23;break}if(l=[],r={},I.a.size(n["file_".concat(a)])&&(l=n["file_".concat(a)].map(function(e){return e.originFileObj})),r.title=n["title_".concat(a)],r.description=n["description_".concat(a)],r.timeline=n["timeline_".concat(a)],r.timeline_type=n["timeline_type_".concat(a)],r.budget=n["budget_".concat(a)],!(r.budget&&r.title&&r.timeline_type&&r.description&&r.timeline)){e.next=20;break}return c={milestone_data:r},I.a.size(l)&&(c.file=l),console.log("save_milestone -> input_data",c),e.abrupt("return",!1);case 16:"success"===(o=e.sent).data.update_milestone.status&&Object(y.a)(o.data.update_milestone),e.next=21;break;case 20:Object(y.a)({msg:"Please fill all the field",status:"failed"});case 21:e.next=24;break;case 23:Object(y.a)({msg:"Milestone update failed",status:"failed"});case 24:case"end":return e.stop()}},e)}));return function(t,a){return e.apply(this,arguments)}}())}(0,a)},className:"bg-gradient-primary text-white normal_font_size"},o.a.createElement("div",{className:"px-2"}," Done")))))}))))})}}]);
//# sourceMappingURL=32.9d3411c8.chunk.js.map