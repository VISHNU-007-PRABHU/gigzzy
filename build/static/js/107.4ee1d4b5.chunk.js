(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{1511:function(n,e,t){"use strict";t.r(e);var r=t(592),a=t.n(r),i=t(599),c=t(738),u=t(0),o=t.n(u),_=t(725),l=t(726),s=t(588),d=t(550),m=t(871),g=t(925),y=t(1512);e.default=function(n){var e=Object(u.useContext)(g.b),t=Object(u.useState)([]),r=Object(c.a)(t,2),f=r[0],p=r[1],b=Object(d.b)(m.d);Object(u.useEffect)(function(){O()},[]);var O=function(){var n=Object(i.a)(a.a.mark(function n(){var e;return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,b.refetch({limit:8});case 2:e=n.sent,p(Object(y.chunk)(e.data.get_is_future,4));case 4:case"end":return n.stop()}},n)}));return function(){return n.apply(this,arguments)}}(),v=function(){var n=Object(i.a)(a.a.mark(function n(t){return a.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:e.on_book(t);case 1:case"end":return n.stop()}},n)}));return function(e){return n.apply(this,arguments)}}();return o.a.createElement(o.a.Fragment,null,f&&f.map(function(n){return o.a.createElement(o.a.Fragment,null,o.a.createElement(_.a,{className:"owl-stage-outer"},n&&n.map(function(n){return o.a.createElement(l.a,{sm:12,md:6},o.a.createElement("div",{className:"p-2"},o.a.createElement("img",{alt:"gigzzy home banner",src:null===n||void 0===n?void 0:n.small_img_url,loading:"lazy",class:"h-75 br_10 lazyload img-fluid w-100"}),o.a.createElement("div",{className:"px-3 mt-n4"},o.a.createElement(s.a,{onClick:function(){v(n)},className:"py-4 align-items-center d-flex justify-content-center bold br_10 border-0 primary_blue_color table_shadow",size:"large",block:!0},2===n.category_type?null===n||void 0===n?void 0:n.subCategory_name:null===n||void 0===n?void 0:n.category_name))))})))}))}},871:function(n,e,t){"use strict";t.d(e,"c",function(){return y}),t.d(e,"f",function(){return f}),t.d(e,"g",function(){return p}),t.d(e,"h",function(){return b}),t.d(e,"a",function(){return O}),t.d(e,"b",function(){return v}),t.d(e,"e",function(){return E}),t.d(e,"d",function(){return C});var r=t(677),a=t(678),i=t.n(a);function c(){var n=Object(r.a)(["\nquery GETFUTURE($limit:Int){\n    get_is_future (limit:$limit){\n      _id\n      category_name\n      category_type\n      subCategory_name\n      small_img_url\n      is_parent\n    }\n}"]);return c=function(){return n},n}function u(){var n=Object(r.a)(["\nquery GETTRENDING{\n    get_trending {\n      _id\n      category_name\n      category_type\n      subCategory_name\n      small_img_url\n      is_parent\n    }\n}"]);return u=function(){return n},n}function o(){var n=Object(r.a)(["\nquery FINDSUBCATEGORY($_id:ID) {\n    sub_category(_id:$_id) {\n        _id\n        subCategory_name\n        img_url\n        small_img_url\n        description\n    }\n}\n"]);return o=function(){return n},n}function _(){var n=Object(r.a)(["\nquery FINDCATEGORY($_id:ID,$category_type:Int) {\n    category(_id:$_id,category_type:$category_type) {\n        _id\n        category_name\n        small_img_url\n        is_parent\n        description\n        child_category{\n            _id\n            subCategory_name\n            description\n            img_url\n        }\n    }\n}\n"]);return _=function(){return n},n}function l(){var n=Object(r.a)(["\nquery SEARCHSUBCATEGORYONLY($data:JSON) {\n    search_sub_category_only(data:$data) {\n        _id\n        subCategory_name\n    }\n}\n"]);return l=function(){return n},n}function s(){var n=Object(r.a)(["\nquery SEARCHCATEGORYONLY($data:JSON) {\n    search_category_only(data:$data) {\n        _id\n        category_name\n    }\n}\n"]);return s=function(){return n},n}function d(){var n=Object(r.a)(["\nquery SEARCH_CATEGORY($_id:ID,$data:JSON) {\n    search_category(_id:$_id,data:$data) {\n        _id\n        category_name\n        description\n        small_img_url\n        certificates\n        is_parent\n        base_price\n        hour_price\n        hour_limit\n        service_fee\n        img_url\n        category_type\n        subCategory_name\n        Certificate{\n            certificate_name\n            _id\n        }\n    }\n}\n"]);return d=function(){return n},n}function m(){var n=Object(r.a)(["\n query GETCATEGORY{\n    category{\n        _id\n        category_type\n        category_name\n        is_parent\n        small_img_url\n        base_price\n        child_category{\n            _id\n            subCategory_name\n        }\t\n    }\n}\n"]);return m=function(){return n},n}function g(){var n=Object(r.a)(["\n query GETCATEGORYPAGINATION($limit: Int,$page:Int,$data:JSON){\n    get_category(limit:$limit,page:$page,data:$data) {\n        pageInfo{\n            totalDocs\n            page\n        }\n        data{\n            _id\n            category_type\n            category_name\n            is_parent\n            small_img_url\n            base_price\n            child_category{\n                _id\n                subCategory_name\n            }\t\n        }\n    }\n}\n"]);return g=function(){return n},n}var y=i()(g()),f=(i()(m()),i()(d())),p=i()(s()),b=i()(l()),O=i()(_()),v=i()(o()),E=i()(u()),C=i()(c())}}]);
//# sourceMappingURL=107.4ee1d4b5.chunk.js.map