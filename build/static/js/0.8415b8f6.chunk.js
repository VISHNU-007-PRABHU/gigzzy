(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1474:function(e,a,t){"use strict";t(1).useEffect;var n=function(e){var a=function(){return Boolean(e.match(/Android/i))},t=function(){return Boolean(e.match(/iPhone|iPad|iPod/i))},n=function(){return Boolean(e.match(/SSR/i))},o=function(){return Boolean(a()||t()||Boolean(e.match(/Opera Mini/i))||Boolean(e.match(/IEMobile/i)))};return{isMobile:o,isDesktop:function(){return Boolean(!o()&&!n())},isAndroid:a,isIos:t,isSSR:n}};e.exports=function(){var e="undefined"===typeof navigator?"SSR":navigator.userAgent;return n(e)}},1481:function(e,a,t){"use strict";t.r(a);var n=t(1),o=t.n(n),l=t(60),c=t(1452),r=t(451),i=t(20),s=t(218),m=t(132),u=t(340),g=t(1453),p=t(93),d=t(75),f=t.n(d),E=t(316),h=t.n(E),v=t(79),k=t(115),x=t(1474),w=t.n(x),I=c.a.Header;a.default=function(){Object(l.useLocation)();var e=w()(),a=Object(k.b)(v.g,{}),t=a.loading,n=(a.error,a.data,h()().history);if(t)return o.a.createElement("p",{className:"container mt-2",style:{backgroundColor:"#eae5e5",width:"100%",height:"30px"}});var c=function(e){var a="".concat(e);console.log(a),window.open(a)},d=o.a.createElement(r.a,null,o.a.createElement(r.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){n.push("/")}},o.a.createElement(i.a,{type:"home"}),"Home"),o.a.createElement(r.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){n.push("/profile")}},o.a.createElement(i.a,{type:"user"}),"Profile"),o.a.createElement(r.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){n.push("/bookings")}},o.a.createElement(i.a,{type:"book"}),"Bookings"),o.a.createElement(r.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){c("/static_page/about_us")}},o.a.createElement(i.a,{type:"setting"}),"Help & Support"),o.a.createElement(r.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){c("/static_page/terms")}},o.a.createElement(i.a,{type:"info-circle"}),"Terms & Conditions"),o.a.createElement(r.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){"success"===localStorage.getItem("userLogin")&&(localStorage.removeItem("userLogin"),localStorage.removeItem("user"),n.push("/login"))}},o.a.createElement(i.a,{type:"logout"}),"Logout")),E=o.a.createElement(r.a,null,o.a.createElement(r.a.Item,{className:"d-flex align-items-center px-3",onClick:function(){n.push("/howlearnmore")}},o.a.createElement(i.a,{type:"question-circle"}),"How it works"),o.a.createElement(r.a.Item,{className:"d-flex align-items-center px-3",onClick:function(){n.push("/login")}},o.a.createElement(i.a,{type:"login"}),"Customer Login"),o.a.createElement(r.a.Divider,null),o.a.createElement(r.a.Item,{className:"d-flex align-items-center px-3",onClick:function(){c("/provider_login")}},o.a.createElement(i.a,{type:"shop",theme:"twoTone",twoToneColor:"#52c41a"}),o.a.createElement("span",{className:"primary_color"},"Service Provider Login")));return o.a.createElement("div",null,o.a.createElement(I,{className:"white user_header px-0"},o.a.createElement(s.a,null,o.a.createElement(m.a,{lg:{span:20,offset:2},className:"px-1"},o.a.createElement("img",{src:f.a,height:"75",width:"120",alt:"Jiffy",className:"object_fit cursor_point",onClick:function(){n.push("/")}}),o.a.createElement("div",{className:"float-right cursor_point"},"success"===localStorage.getItem("userLogin")?o.a.createElement(u.a,{overlay:d,placement:"bottomRight"},o.a.createElement(g.a,{shape:"circle",className:"ant-dropdown-link avatar_shadow",icon:o.a.createElement(i.a,{type:"user",style:{verticalAlign:"baseline"}}),src:JSON.parse(localStorage.getItem("user"))?JSON.parse(localStorage.getItem("user")).img_url:""})):e.isMobile()?o.a.createElement(u.a,{overlay:E,placement:"bottomRight"},o.a.createElement(g.a,{shape:"circle",className:"ant-dropdown-link avatar_shadow",icon:o.a.createElement(i.a,{type:"menu-unfold",style:{verticalAlign:"baseline"}})})):o.a.createElement(o.a.Fragment,null,o.a.createElement("div",null,o.a.createElement(p.a,{onClick:function(){n.push("/howlearnmore")},className:"mx-1"},"How it works"),o.a.createElement(p.a,{onClick:function(){n.push("/login")},className:"mx-1",style:{backgroundColor:"black",color:"white"}},"Customer Login"),o.a.createElement(p.a,{onClick:function(){c("/provider_login")},className:"mx-1"},"Service Provider Login"))))))))}}}]);
//# sourceMappingURL=0.8415b8f6.chunk.js.map