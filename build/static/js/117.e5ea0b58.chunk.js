(window.webpackJsonp=window.webpackJsonp||[]).push([[117],{1160:function(e,t,a){"use strict";a.r(t);var n=a(592),r=a.n(n),c=a(599),s=a(738),o=a(0),i=a.n(o),u=a(1114),l=a(781),m=a(792),d=a(588),p=a(868),b=a(628),g=a(791),f=a.n(g),_=a(550),k=a(1115),j=function(e){var t=Object(k.useStripe)(),a=Object(k.useElements)(),n=f()().history,u=Object(o.useState)(""),g=Object(s.a)(u,2),j=g[0],y=(g[1],Object(o.useState)(!1)),E=Object(s.a)(y,2),O=E[0],v=E[1],w=Object(_.a)(p.a),x=Object(s.a)(w,2),h=x[0],z=(x[1].loading,function(){var s=Object(c.a)(r.a.mark(function c(s){var o,i,u,l;return r.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return s.preventDefault(),r.next=3,t.createToken(a.getElement(k.CardElement));case 3:if(o=r.sent,i=o.token,o.error,!i||!i.id){r.next=15;break}return v(!0),u={booking_status:e.current_booking_status,booking_id:e.data._id,role:1,stripe_token:i.id,payment_option:"stripe"},localStorage.getItem("currency")&&(u.location_code=JSON.parse(localStorage.getItem("currency")).location),r.next=12,h({variables:u});case 12:l=r.sent,v(!1),l.data.manage_booking&&"success"===l.data.manage_booking[0].status?(Object(b.a)({msg:"Waiting for your payment confirmation",status:"success"}),n.push("/admin-booking-invoice/".concat(e.data._id))):Object(b.a)({msg:"payment failed",status:"success"});case 15:case"end":return r.stop()}},c)}));return function(e){return s.apply(this,arguments)}}());return i.a.createElement(l.a,{spinning:O,className:"d-flex justify-content-center mt-4",size:"large"},i.a.createElement(m.a,{onSubmit:z},i.a.createElement("div",{className:"px-4"},i.a.createElement(k.CardElement,{options:{hidePostalCode:!0}}),i.a.createElement("div",{className:"error",role:"alert"},j),i.a.createElement(d.a,{htmlType:"submit",block:!0,className:"d-flex p-3 justify-content-center align-items-center normal_font_size bold",type:"primary",disabled:!t||!a},"Accept and Pay"))))},y=Object(u.a)("pk_test_51JVsceD7QuZwAAzVHzQUYqN4GE8kc9xMc2KZHPNVwC748tz0mfeZ11Fm2s0IR9P1G1Wn0WVclLXiMGA0MrjzZosC00WFjDfUz4");t.default=function(e){return i.a.createElement(k.Elements,{stripe:y},i.a.createElement(j,{data:e.data,current_booking_status:e.current_booking_status}))}}}]);
//# sourceMappingURL=117.e5ea0b58.chunk.js.map