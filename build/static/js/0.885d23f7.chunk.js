(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1923:function(e,a,t){"use strict";t(1).useEffect;var n=function(e){var a=function(){return Boolean(e.match(/Android/i))},t=function(){return Boolean(e.match(/iPhone|iPad|iPod/i))},n=function(){return Boolean(e.match(/SSR/i))},o=function(){return Boolean(a()||t()||Boolean(e.match(/Opera Mini/i))||Boolean(e.match(/IEMobile/i)))};return{isMobile:o,isDesktop:function(){return Boolean(!o()&&!n())},isAndroid:a,isIos:t,isSSR:n}};e.exports=function(){var e="undefined"===typeof navigator?"SSR":navigator.userAgent;return n(e)}},1963:function(e,a,t){"use strict";t.r(a);var n=t(1),o=t.n(n),l=t(67),c=t(136),r=t.n(c),i=t(85),s=t.n(i),m=t(50),u=t.n(m),g=t(84),p=t.n(g),d=t(213),f=t.n(d),E=t(33),h=t.n(E),v=t(456),k=t.n(v),x=t(457),w=t.n(x),y=t(96),I=t.n(y),S=t(345),N=t.n(S),b=t(102),C=t(140),L=t(1923),_=t.n(L),B=r.a.Header;a.default=function(){Object(l.useLocation)();var e=_()(),a=Object(C.b)(b.g,{}),t=a.loading,n=(a.error,a.data,N()().history);if(t)return o.a.createElement("p",{className:"container mt-2",style:{backgroundColor:"#eae5e5",width:"100%",height:"30px"}});var c=function(e){var a="".concat(e);console.log(a),window.open(a)},r=o.a.createElement(k.a,null,o.a.createElement(k.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){n.push("/")}},o.a.createElement(h.a,{type:"home"}),"Home"),o.a.createElement(k.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){n.push("/profile")}},o.a.createElement(h.a,{type:"user"}),"Profile"),o.a.createElement(k.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){n.push("/bookings")}},o.a.createElement(h.a,{type:"book"}),"Bookings"),o.a.createElement(k.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){c("/static_page/about_us")}},o.a.createElement(h.a,{type:"setting"}),"Help & Support"),o.a.createElement(k.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){c("/static_page/terms")}},o.a.createElement(h.a,{type:"info-circle"}),"Terms & Conditions"),o.a.createElement(k.a.Item,{className:"success"===localStorage.getItem("userLogin")?"d-flex align-items-center px-3":"d-none",onClick:function(){"success"===localStorage.getItem("userLogin")&&(localStorage.removeItem("userLogin"),localStorage.removeItem("user"),n.push("/login"))}},o.a.createElement(h.a,{type:"logout"}),"Logout")),i=o.a.createElement(k.a,null,o.a.createElement(k.a.Item,{className:"d-flex align-items-center px-3",onClick:function(){n.push("/howlearnmore")}},o.a.createElement(h.a,{type:"question-circle"}),"How it works"),o.a.createElement(k.a.Item,{className:"d-flex align-items-center px-3",onClick:function(){n.push("/login")}},o.a.createElement(h.a,{type:"login"}),"Customer Login"),o.a.createElement(k.a.Divider,null),o.a.createElement(k.a.Item,{className:"d-flex align-items-center px-3",onClick:function(){c("/provider_login")}},o.a.createElement(h.a,{type:"shop",theme:"twoTone",twoToneColor:"#52c41a"}),o.a.createElement("span",{className:"primary_color"},"Service Provider Login")));return o.a.createElement("div",null,o.a.createElement(B,{className:"white user_header px-0"},o.a.createElement(s.a,null,o.a.createElement(u.a,{lg:{span:20,offset:2},className:"px-1"},o.a.createElement("img",{src:I.a,height:"75",width:"120",alt:"Jiffy",className:"object_fit cursor_point lazyload",loading:"lazy",onClick:function(){n.push("/")}}),o.a.createElement("div",{className:"float-right cursor_point"},"success"===localStorage.getItem("userLogin")?o.a.createElement(w.a,{overlay:r,placement:"bottomRight"},o.a.createElement(f.a,{shape:"circle",className:"ant-dropdown-link avatar_shadow",icon:o.a.createElement(h.a,{type:"user",style:{verticalAlign:"baseline"}}),src:JSON.parse(localStorage.getItem("user"))?JSON.parse(localStorage.getItem("user")).img_url:""})):e.isMobile()?o.a.createElement(w.a,{overlay:i,placement:"bottomRight"},o.a.createElement(f.a,{shape:"circle",className:"ant-dropdown-link avatar_shadow",icon:o.a.createElement(h.a,{type:"menu-unfold",style:{verticalAlign:"baseline"}})})):o.a.createElement(o.a.Fragment,null,o.a.createElement("div",null,o.a.createElement(p.a,{onClick:function(){n.push("/howlearnmore")},className:"mx-1"},"How it works"),o.a.createElement(p.a,{onClick:function(){n.push("/login")},className:"mx-1",style:{backgroundColor:"black",color:"white"}},"Customer Login"),o.a.createElement(p.a,{onClick:function(){c("/provider_login")},className:"mx-1"},"Service Provider Login"))))))))}}}]);
//# sourceMappingURL=0.885d23f7.chunk.js.map