(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{1936:function(e,t,a){e.exports=a.p+"static/media/sac.27ec6dac.png"},2049:function(e,t,a){"use strict";a.r(t);var n=a(3),c=a.n(n),r=a(5),o=a(38),l=a(1),s=a.n(l),i=a(193),u=a(124),m=a(68),d=(a(1936),a(104)),p=a(144),_=a.n(p),f=a(20),g=a(120),y=a(612),E="Tell us what you need",b="ON-DEMAND",v="Post a contract";t.default=function(e){var t=Object(d.a)(y.d),a=Object(o.a)(t,2),n=a[0],p=(a[1].loading,Object(l.useContext)(g.b));console.log("ChooseJobCategory -> comman_data",p);var w=_()().history,x=function(){var t=Object(r.a)(c.a.mark(function t(a){var r,o;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log(e),"contract"!==a){t.next=16;break}return r={},localStorage.getItem("user")&&(r.user_id=JSON.parse(localStorage.getItem("user"))._id),r.location_code="",r.lat=0,r.lng=0,r.current_page=-1,r.contract_data=[{budget:0,category_id:e.current_id,category_type:e.comman_data.state.type}],localStorage.getItem("currency")&&"undefined"!=typeof localStorage.getItem("currency")&&"undefined"!=localStorage.getItem("currency")?r.local_location_code=localStorage.getItem("currency"):r.local_location_code="IN",t.next=12,n({variables:r});case 12:"success"===(o=t.sent).data.update_contract.status?w.push({pathname:"/contract_booking/".concat(o.data.update_contract._id)}):Object(f.a)(o.data.update_contract),t.next=17;break;case 16:w.push(e.comman_data);case 17:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}();return s.a.createElement(s.a.Fragment,null,s.a.createElement(i.a,{gutter:[16,40]},s.a.createElement(u.a,{span:24},s.a.createElement("div",{className:"normal_font_size primary_color d-flex justify-content-center"},E))),s.a.createElement(i.a,{gutter:[16,32]},s.a.createElement(u.a,{span:24},s.a.createElement("div",{className:"normal_font_size primary_color d-flex justify-content-center"},s.a.createElement(m.a,{type:"primary",className:"w-50",onClick:function(){x("individual")}},s.a.createElement("div",null,b))))),s.a.createElement(i.a,{gutter:[16,32]},s.a.createElement(u.a,{span:24},s.a.createElement("div",{className:"normal_font_size primary_color d-flex justify-content-center"},"or"))),s.a.createElement(i.a,null,s.a.createElement(u.a,{span:24},s.a.createElement("div",{className:"normal_font_size primary_color d-flex justify-content-center"},s.a.createElement(m.a,{type:"primary",className:"w-50",onClick:function(){x("contract")}},s.a.createElement("div",null,v))))))}}}]);
//# sourceMappingURL=32.61a358a6.chunk.js.map