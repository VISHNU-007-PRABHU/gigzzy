(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1501:function(e,a,t){"use strict";t.r(a);var n=t(1),l=t.n(n),o=t(1470),c=t(449),r=t(17),s=t(191),i=t(120),m=t(337),g=t(1473),u=t(73),p=t.n(u),d=t(316),f=t.n(d),E=t(85),h=t(140),x=o.a.Header;a.default=function(){var e=Object(h.b)(E.g,{}),a=e.loading,t=(e.error,e.data,f()().history);if(a)return l.a.createElement("p",{className:"container mt-2",style:{backgroundColor:"#eae5e5",width:"100%",height:"30px"}});var n=function(e){var a="".concat(e);console.log(a),window.open(a)},o=l.a.createElement(c.a,null,l.a.createElement(c.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){t.push("/")}},l.a.createElement(r.a,{type:"home"}),"Home"),l.a.createElement(c.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){t.push("/profile")}},l.a.createElement(r.a,{type:"user"}),"Profile"),l.a.createElement(c.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){t.push("/bookings")}},l.a.createElement(r.a,{type:"book"}),"Bookings"),l.a.createElement(c.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){n("/about")}},l.a.createElement(r.a,{type:"setting"}),"Help & Support"),l.a.createElement(c.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){n("/terms")}},l.a.createElement(r.a,{type:"info-circle"}),"Terms & Conditions"),l.a.createElement(c.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){"success"===localStorage.getItem("userLogin")&&(localStorage.removeItem("userLogin"),localStorage.removeItem("user"),t.push("/login"))}},l.a.createElement(r.a,{type:"logout"}),"Logout"),l.a.createElement(c.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-none":"d-flex align-items-center px-3",onClick:function(){t.push("/login")}},l.a.createElement(r.a,{type:"login"}),"Login"),l.a.createElement(c.a.Divider,null),l.a.createElement(c.a.Item,{className:"d-flex align-items-center px-3",onClick:function(){n("/provider_login")}},l.a.createElement(r.a,{type:"shop",theme:"twoTone",twoToneColor:"#52c41a"}),l.a.createElement("span",{className:"primary_color"},"Became a Provider")));return l.a.createElement("div",null,l.a.createElement(x,{className:"white user_header px-0"},l.a.createElement(s.a,null,l.a.createElement(i.a,{lg:{span:20,offset:2},className:"px-1"},l.a.createElement("img",{src:p.a,alt:"Jiffy",className:"w-75x object_fit cursor_point",onClick:function(){t.push("/")}}),l.a.createElement("div",{className:"float-right cursor_point"},l.a.createElement(m.a,{overlay:o,placement:"bottomRight"},l.a.createElement(g.a,{shape:"circle",className:"ant-dropdown-link avatar_shadow",icon:l.a.createElement(r.a,{type:"user",style:{verticalAlign:"baseline"}}),src:JSON.parse(localStorage.getItem("user"))?JSON.parse(localStorage.getItem("user")).img_url:""})))))))}}}]);
//# sourceMappingURL=0.7a7aa83a.chunk.js.map