(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{1955:function(e,t,a){"use strict";a.r(t);var n=a(3),r=a.n(n),i=a(15),o=a(5),l=a(11),c=a(12),s=a(14),u=a(13),d=a(1),m=a.n(d),p=a(59),f=a(191),h=a(6),v=a(23),g=a(604),_=a(960),b=a(1909),w=a(603),E=a(20),y=a(25),j=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).handleTableChange=function(){var e=Object(o.a)(r.a.mark(function e(t){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(a=Object(i.a)({},t)).current=t.current,n.setState({loading:!0}),e.next=5,h.a.query({query:f.i,variables:{limit:a.pageSize,page:a.current},fetchPolicy:"no-cache"}).then(function(e){var t=Object(i.a)({},n.state.pagination);t.total=e.data.get_admin_users.pageInfo.totalDocs,t.current=e.data.get_admin_users.pageInfo.page,n.setState({pagination:t,loading:!1,dataSource:e.data.get_admin_users.data})});case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),n.fetch_user=function(){var e=Object(o.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n.setState({loading:!0}),e.next=3,h.a.query({query:f.i,variables:{limit:n.state.pagination.pageSize,page:n.state.pagination.current,role:"1"},fetchPolicy:"no-cache"}).then(function(e){var t=Object(i.a)({},n.state.pagination);t.total=e.data.get_admin_users.pageInfo.totalDocs,n.setState({loading:!1,pagination:t,dataSource:e.data.get_admin_users.data})});case 3:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),n.handleDelete=function(){var e=Object(o.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.a.mutate({mutation:f.e,variables:{_id:t}}).then(function(e,t,a){Object(E.a)(e.data.delete_admin_user),"success"===e.data.delete_admin_user.status&&n.fetch_user()});case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),n.onFilter=function(){var e=Object(o.a)(r.a.mark(function e(t){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t.target.value),a={$or:[{name:{$regex:".*"+t.target.value+".*",$options:"i"}},{email:{$regex:".*"+t.target.value+".*",$options:"i"}}]},e.next=4,h.a.query({query:f.j,variables:{data:a},fetchPolicy:"no-cache"}).then(function(e){var t;n.setState({dataSource:null===e||void 0===e?void 0:null===(t=e.data)||void 0===t?void 0:t.admin_search})});case 4:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),n.state={dataSource:[],search_user:[],loading:!1,pagination:{pageSize:10,current:1,total:0,simple:!0}},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.fetch_user()}},{key:"render",value:function(){var e=this,t=this.state.dataSource,a=[{title:"Name",width:"20%",render:function(e,t){return m.a.createElement("span",{title:"Name"},t.name)}},{title:function(){return m.a.createElement("div",null,m.a.createElement("div",{className:"d-block"},m.a.createElement("div",null,"Email")))},width:"20%",render:function(e,t){return m.a.createElement("span",{title:"Email",style:{wordBreak:"keep-all"}},t.email)}},{title:function(){return m.a.createElement("div",null,m.a.createElement("div",{className:"d-block"},m.a.createElement("div",null,"Roles")))},width:"20%",render:function(e,t){var a,n;return m.a.createElement("span",{title:"Email",style:{wordBreak:"keep-all"}},t.roles?m.a.createElement(b.a,{color:"purple"},null===t||void 0===t?void 0:null===(a=t.admin_role_detail)||void 0===a?void 0:a.name):null===t||void 0===t?void 0:null===(n=t.admin_role_detail)||void 0===n?void 0:n.msg)}},{title:"Action",dataIndex:"operation",className:Object(y.a)("edit_admin")||Object(y.a)("delete_admin")?"":"d-none",render:function(t,a){return e.state.dataSource.length>=1?m.a.createElement("span",{title:"....",className:"d-flex d-sm-inline justify-content-around"},m.a.createElement(y.b,{permission:"edit_admin"},m.a.createElement("span",{className:"cursor_point",onClick:function(){e.props.history.push("/admin-admin/add/".concat(a._id))}},m.a.createElement(v.a,{type:"edit",theme:"twoTone",twoToneColor:"#52c41a",className:"mx-3 f_25"}))),m.a.createElement(y.b,{permission:"delete_admin"},m.a.createElement(g.a,{title:"Sure to delete the admin ?",onConfirm:function(){return e.handleDelete(a._id)}},m.a.createElement(v.a,{type:"delete",theme:"twoTone",twoToneColor:"#52c41a",className:"f_25"})))):null}}];return m.a.createElement("div",null,m.a.createElement("div",{className:"mx-2 mx-sm-0 mb-3"},m.a.createElement(w.a,{size:"large",placeholder:"search",onKeyUp:function(t){e.onFilter(t)},loading:!1})),m.a.createElement("div",{id:"no-more-tables"},m.a.createElement(_.a,{rowClassName:function(){return"editable-row"},className:"table_shadow",dataSource:t,columns:a,size:"middle",pagination:this.state.pagination,onChange:this.handleTableChange,loading:this.state.loading})))}}]),a}(m.a.Component);t.default=Object(p.withRouter)(j)}}]);
//# sourceMappingURL=23.2b350472.chunk.js.map