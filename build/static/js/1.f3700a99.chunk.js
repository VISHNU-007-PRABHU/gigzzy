(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{1499:function(e,a,r){"use strict";r.r(a);var t=r(3),n=r.n(t),c=r(5),o=r(54),u=r(1),l=r.n(u),s=r(1493),i=r(56),p=r(6);a.default=function(e){var a=l.a.useState(""),r=Object(o.a)(a,2),t=r[0],u=r[1],d=l.a.useState([]),f=Object(o.a)(d,2),v=f[0],h=f[1],w=function(){var a=Object(c.a)(n.a.mark(function a(r){var t,c,o;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(r?u(r):b(r),console.log(r),(t={})[e.value]={$regex:r,$options:"i"},t.role=Number(e.role),t.delete=0,!(r.length>=1)){a.next=12;break}return a.next=9,p.a.query({query:i.g,variables:{data:t},fetchPolicy:"no-cache"});case 9:c=a.sent,o=c.data,h(o?o.user_search:[]);case 12:case"end":return a.stop()}},a)}));return function(e){return a.apply(this,arguments)}}(),b=function(){var a=Object(c.a)(n.a.mark(function a(r){var t;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:u(r),t={},1===e.role?t.user_id=r:t.provider_id=r,e.passedFunction(t);case 4:case"end":return a.stop()}},a)}));return function(e){return a.apply(this,arguments)}}();return l.a.createElement("div",null,l.a.createElement(s.a,{onSelect:b,onSearch:w,placeholder:e.placeholder,value:t,allowClear:!0,autoClearSearchValue:!0,className:"border"},v.map(function(a,r){return l.a.createElement(s.a.Option,{key:a._id},a[e.value])})))}}}]);
//# sourceMappingURL=1.f3700a99.chunk.js.map