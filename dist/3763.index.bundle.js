(self.webpackChunkjiffy=self.webpackChunkjiffy||[]).push([[3763],{63716:function(e,i,n){"use strict";(r=n(35466))&&"object"==typeof r&&"default"in r&&r.default;var r,t=new(n(3087)),o=t.getBrowser(),a=(t.getCPU(),t.getDevice()),s=t.getEngine(),l=t.getOS(),c=t.getUA(),d=function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"none";return e||i},b=function(){return!("undefined"==typeof window||!window.navigator&&!navigator)&&(window.navigator||navigator)},u=function(e){var i=b();return i&&i.platform&&(-1!==i.platform.indexOf(e)||"MacIntel"===i.platform&&i.maxTouchPoints>1&&!window.MSStream)};var w,m="mobile",p="tablet",f="smarttv",g="console",h="wearable",v=void 0,x="Chrome",A="Firefox",k="Opera",y="Yandex",z="Safari",O="Internet Explorer",C="Edge",M="Chromium",j="IE",P="Mobile Safari",H="MIUI Browser",T="Samsung Browser",S="iOS",Y="Android",E="Windows Phone",I="Windows",B="Mac OS",F={isMobile:!1,isTablet:!1,isBrowser:!1,isSmartTV:!1,isConsole:!1,isWearable:!1},K=(function(e){switch(e){case m:return{isMobile:!0};case p:return{isTablet:!0};case f:return{isSmartTV:!0};case g:return{isConsole:!0};case h:return{isWearable:!0};case v:return{isBrowser:!0};default:;}}(a.type),function(){return"string"==typeof c&&-1!==c.indexOf("Edg/")}),D=function(){return a.type===v},X=function(){return o.name===C},Z=function(){return u("iPad")},U=(a.type,a.type,a.type,o.name===P||Z(),o.name,function(){switch(a.type){case m:case p:return!0;default:return!1}}()||Z());a.type,a.type===p||Z(),D(),D(),l.name,l.name,l.name===S||Z(),o.name,o.name,o.name===z||o.name,o.name,o.name===O||o.name,d(l.version),d(l.name),d(o.version),d(o.major),d(o.name),d(a.vendor),d(a.model),d(s.name),d(s.version),d(c),X()||K(),o.name,d(a.type,"browser"),(w=b())&&(/iPad|iPhone|iPod/.test(w.platform)||"MacIntel"===w.platform&&w.maxTouchPoints>1)&&window.MSStream,Z(),u("iPhone"),u("iPod"),function(){var e=b(),i=e&&e.userAgent&&e.userAgent.toLowerCase();"string"==typeof i&&/electron/.test(i)}(),K(),X()&&K(),l.name,l.name,o.name,o.name;i.tq=U},3087:function(e,i,n){var r;!function(t,o){"use strict";var a="function",s="undefined",l="object",c="string",d="model",b="name",u="type",w="vendor",m="version",p="architecture",f="console",g="mobile",h="tablet",v="smarttv",x="wearable",A="embedded",k="Amazon",y="Apple",z="ASUS",O="BlackBerry",C="Google",M="Huawei",j="LG",P="Microsoft",H="Motorola",T="Samsung",S="Sony",Y="Xiaomi",E="Zebra",I="Facebook",B=function(e){for(var i={},n=0;n<e.length;n++)i[e[n].toUpperCase()]=e[n];return i},F=function(e,i){return typeof e===c&&-1!==K(i).indexOf(K(e))},K=function(e){return e.toLowerCase()},D=function(e,i){if(typeof e===c)return e=e.replace(/^\s\s*/,"").replace(/\s\s*$/,""),typeof i===s?e:e.substring(0,255)},X=function(e,i){for(var n,r,t,s,c,d,b=0;b<i.length&&!c;){var u=i[b],w=i[b+1];for(n=r=0;n<u.length&&!c;)if(c=u[n++].exec(e))for(t=0;t<w.length;t++)d=c[++r],typeof(s=w[t])===l&&s.length>0?2===s.length?typeof s[1]==a?this[s[0]]=s[1].call(this,d):this[s[0]]=s[1]:3===s.length?typeof s[1]!==a||s[1].exec&&s[1].test?this[s[0]]=d?d.replace(s[1],s[2]):o:this[s[0]]=d?s[1].call(this,d,s[2]):o:4===s.length&&(this[s[0]]=d?s[3].call(this,d.replace(s[1],s[2])):o):this[s]=d||o;b+=2}},Z=function(e,i){for(var n in i)if(typeof i[n]===l&&i[n].length>0){for(var r=0;r<i[n].length;r++)if(F(i[n][r],e))return"?"===n?o:n}else if(F(i[n],e))return"?"===n?o:n;return e},U={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},N={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[m,[b,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[m,[b,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[b,m],[/opios[\/ ]+([\w\.]+)/i],[m,[b,"Opera Mini"]],[/\bopr\/([\w\.]+)/i],[m,[b,"Opera"]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,/(ba?idubrowser)[\/ ]?([\w\.]+)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([-\w\.]+)/i,/(weibo)__([\d\.]+)/i],[b,m],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[m,[b,"UCBrowser"]],[/\bqbcore\/([\w\.]+)/i],[m,[b,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[m,[b,"WeChat"]],[/konqueror\/([\w\.]+)/i],[m,[b,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[m,[b,"IE"]],[/yabrowser\/([\w\.]+)/i],[m,[b,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[b,/(.+)/,"$1 Secure Browser"],m],[/\bfocus\/([\w\.]+)/i],[m,[b,"Firefox Focus"]],[/\bopt\/([\w\.]+)/i],[m,[b,"Opera Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[m,[b,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[m,[b,"Dolphin"]],[/coast\/([\w\.]+)/i],[m,[b,"Opera Coast"]],[/miuibrowser\/([\w\.]+)/i],[m,[b,"MIUI Browser"]],[/fxios\/([-\w\.]+)/i],[m,[b,"Firefox"]],[/\bqihu|(qi?ho?o?|360)browser/i],[[b,"360 Browser"]],[/(oculus|samsung|sailfish)browser\/([\w\.]+)/i],[[b,/(.+)/,"$1 Browser"],m],[/(comodo_dragon)\/([\w\.]+)/i],[[b,/_/g," "],m],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],[b,m],[/(metasr)[\/ ]?([\w\.]+)/i,/(lbbrowser)/i],[b],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[b,I],m],[/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram)[\/ ]([-\w\.]+)/i],[b,m],[/\bgsa\/([\w\.]+) .*safari\//i],[m,[b,"GSA"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[m,[b,"Chrome Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[b,"Chrome WebView"],m],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[m,[b,"Android Browser"]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[b,m],[/version\/([\w\.]+) .*mobile\/\w+ (safari)/i],[m,[b,"Mobile Safari"]],[/version\/([\w\.]+) .*(mobile ?safari|safari)/i],[m,b],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[b,[m,Z,{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}]],[/(webkit|khtml)\/([\w\.]+)/i],[b,m],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[b,"Netscape"],m],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[m,[b,"Firefox Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i],[b,m]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[p,"amd64"]],[/(ia32(?=;))/i],[[p,K]],[/((?:i[346]|x)86)[;\)]/i],[[p,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[p,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[p,"armhf"]],[/windows (ce|mobile); ppc;/i],[[p,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[p,/ower/,"",K]],[/(sun4\w)[;\)]/i],[[p,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[p,K]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[d,[w,T],[u,h]],[/\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[d,[w,T],[u,g]],[/\((ip(?:hone|od)[\w ]*);/i],[d,[w,y],[u,g]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[d,[w,y],[u,h]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[d,[w,M],[u,h]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}-[atu]?[ln][01259x][012359][an]?)\b(?!.+d\/s)/i],[d,[w,M],[u,g]],[/\b(poco[\w ]+)(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[d,/_/g," "],[w,Y],[u,g]],[/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[d,/_/g," "],[w,Y],[u,h]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[d,[w,"OPPO"],[u,g]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[d,[w,"Vivo"],[u,g]],[/\b(rmx[12]\d{3})(?: bui|;|\))/i],[d,[w,"Realme"],[u,g]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[d,[w,H],[u,g]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[d,[w,H],[u,h]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[d,[w,j],[u,h]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[d,[w,j],[u,g]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[d,[w,"Lenovo"],[u,h]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[d,/_/g," "],[w,"Nokia"],[u,g]],[/(pixel c)\b/i],[d,[w,C],[u,h]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[d,[w,C],[u,g]],[/droid.+ ([c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[d,[w,S],[u,g]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[d,"Xperia Tablet"],[w,S],[u,h]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[d,[w,"OnePlus"],[u,g]],[/(alexa)webm/i,/(kf[a-z]{2}wi)( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[d,[w,k],[u,h]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[d,/(.+)/g,"Fire Phone $1"],[w,k],[u,g]],[/(playbook);[-\w\),; ]+(rim)/i],[d,w,[u,h]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[d,[w,O],[u,g]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[d,[w,z],[u,h]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[d,[w,z],[u,g]],[/(nexus 9)/i],[d,[w,"HTC"],[u,h]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic|sony)[-_ ]?([-\w]*)/i],[w,[d,/_/g," "],[u,g]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[d,[w,"Acer"],[u,h]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[d,[w,"Meizu"],[u,g]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[d,[w,"Sharp"],[u,g]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[w,d,[u,g]],[/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[w,d,[u,h]],[/(surface duo)/i],[d,[w,P],[u,h]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[d,[w,"Fairphone"],[u,g]],[/(u304aa)/i],[d,[w,"AT&T"],[u,g]],[/\bsie-(\w*)/i],[d,[w,"Siemens"],[u,g]],[/\b(rct\w+) b/i],[d,[w,"RCA"],[u,h]],[/\b(venue[\d ]{2,7}) b/i],[d,[w,"Dell"],[u,h]],[/\b(q(?:mv|ta)\w+) b/i],[d,[w,"Verizon"],[u,h]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[d,[w,"Barnes & Noble"],[u,h]],[/\b(tm\d{3}\w+) b/i],[d,[w,"NuVision"],[u,h]],[/\b(k88) b/i],[d,[w,"ZTE"],[u,h]],[/\b(nx\d{3}j) b/i],[d,[w,"ZTE"],[u,g]],[/\b(gen\d{3}) b.+49h/i],[d,[w,"Swiss"],[u,g]],[/\b(zur\d{3}) b/i],[d,[w,"Swiss"],[u,h]],[/\b((zeki)?tb.*\b) b/i],[d,[w,"Zeki"],[u,h]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[w,"Dragon Touch"],d,[u,h]],[/\b(ns-?\w{0,9}) b/i],[d,[w,"Insignia"],[u,h]],[/\b((nxa|next)-?\w{0,9}) b/i],[d,[w,"NextBook"],[u,h]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[w,"Voice"],d,[u,g]],[/\b(lvtel\-)?(v1[12]) b/i],[[w,"LvTel"],d,[u,g]],[/\b(ph-1) /i],[d,[w,"Essential"],[u,g]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[d,[w,"Envizen"],[u,h]],[/\b(trio[-\w\. ]+) b/i],[d,[w,"MachSpeed"],[u,h]],[/\btu_(1491) b/i],[d,[w,"Rotor"],[u,h]],[/(shield[\w ]+) b/i],[d,[w,"Nvidia"],[u,h]],[/(sprint) (\w+)/i],[w,d,[u,g]],[/(kin\.[onetw]{3})/i],[[d,/\./g," "],[w,P],[u,g]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[d,[w,E],[u,h]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[d,[w,E],[u,g]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[w,d,[u,f]],[/droid.+; (shield) bui/i],[d,[w,"Nvidia"],[u,f]],[/(playstation [345portablevi]+)/i],[d,[w,S],[u,f]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[d,[w,P],[u,f]],[/smart-tv.+(samsung)/i],[w,[u,v]],[/hbbtv.+maple;(\d+)/i],[[d,/^/,"SmartTV"],[w,T],[u,v]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[w,j],[u,v]],[/(apple) ?tv/i],[w,[d,"Apple TV"],[u,v]],[/crkey/i],[[d,"Chromecast"],[w,C],[u,v]],[/droid.+aft(\w)( bui|\))/i],[d,[w,k],[u,v]],[/\(dtv[\);].+(aquos)/i],[d,[w,"Sharp"],[u,v]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i],[[w,D],[d,D],[u,v]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[u,v]],[/((pebble))app/i],[w,d,[u,x]],[/droid.+; (glass) \d/i],[d,[w,C],[u,x]],[/droid.+; (wt63?0{2,3})\)/i],[d,[w,E],[u,x]],[/(quest( 2)?)/i],[d,[w,I],[u,x]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[w,[u,A]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],[d,[u,g]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[d,[u,h]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[u,h]],[/(phone|mobile(?:[;\/]| safari)|pda(?=.+windows ce))/i],[[u,g]],[/(android[-\w\. ]{0,9});.+buil/i],[d,[w,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[m,[b,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[m,[b,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i],[b,m],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[m,b]],os:[[/microsoft (windows) (vista|xp)/i],[b,m],[/(windows) nt 6\.2; (arm)/i,/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,/(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],[b,[m,Z,U]],[/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[b,"Windows"],[m,Z,U]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/cfnetwork\/.+darwin/i],[[m,/_/g,"."],[b,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[b,"Mac OS"],[m,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86)/i],[m,b],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[b,m],[/\(bb(10);/i],[m,[b,O]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[m,[b,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[m,[b,"Firefox OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[m,[b,"webOS"]],[/crkey\/([\d\.]+)/i],[m,[b,"Chromecast"]],[/(cros) [\w]+ ([\w\.]+\w)/i],[[b,"Chromium OS"],m],[/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[b,m],[/(sunos) ?([\w\.\d]*)/i],[[b,"Solaris"],m],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i,/(unix) ?([\w\.]*)/i],[b,m]]},R=function(e,i){if(typeof e===l&&(i=e,e=o),!(this instanceof R))return new R(e,i).getResult();var n=e||(typeof t!==s&&t.navigator&&t.navigator.userAgent?t.navigator.userAgent:""),r=i?function(e,i){var n={};for(var r in e)i[r]&&i[r].length%2==0?n[r]=i[r].concat(e[r]):n[r]=e[r];return n}(N,i):N;return this.getBrowser=function(){var e,i={};return i.name=o,i.version=o,X.call(i,n,r.browser),i.major=typeof(e=i.version)===c?e.replace(/[^\d\.]/g,"").split(".")[0]:o,i},this.getCPU=function(){var e={};return e.architecture=o,X.call(e,n,r.cpu),e},this.getDevice=function(){var e={};return e.vendor=o,e.model=o,e.type=o,X.call(e,n,r.device),e},this.getEngine=function(){var e={};return e.name=o,e.version=o,X.call(e,n,r.engine),e},this.getOS=function(){var e={};return e.name=o,e.version=o,X.call(e,n,r.os),e},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return n},this.setUA=function(e){return n=typeof e===c&&e.length>255?D(e,255):e,this},this.setUA(n),this};R.VERSION="0.7.31",R.BROWSER=B([b,m,"major"]),R.CPU=B([p]),R.DEVICE=B([d,w,u,f,g,v,h,x,A]),R.ENGINE=R.OS=B([b,m]),typeof i!==s?(e.exports&&(i=e.exports=R),i.UAParser=R):n.amdO?(r=function(){return R}.call(i,n,i,e))===o||(e.exports=r):typeof t!==s&&(t.UAParser=R);var L=typeof t!==s&&(t.jQuery||t.Zepto);if(L&&!L.ua){var q=new R;L.ua=q.getResult(),L.ua.get=function(){return q.getUA()},L.ua.set=function(e){q.setUA(e);var i=q.getResult();for(var n in i)L.ua[n]=i[n]}}}("object"==typeof window?window:this)},73763:function(e,i,n){"use strict";n.r(i),n.d(i,{default:function(){return v}});var r=n(35466),t=n(49624),o=n(40137),a=n(14962),s=n(15300),l=n(2895),c=n(37101),d=n.p+"images/46ce3856bc1d459a5ab3e75bca09beaa-play_store.png",b=n(50291),u=n.n(b),w=n(69753),m=n(63716),p=n(79520);function f(e,i){(null==i||i>e.length)&&(i=e.length);for(var n=0,r=new Array(i);n<i;n++)r[n]=e[n];return r}var g=r.lazy((function(){return n.e(2825).then(n.bind(n,32825))})),h={title1:"Your",title2:"home of convenience",title3:"Choose and book 100+ services and track then on Gigzzy App",title4:"we will send you a link, open it on your phone to download the app"},v=function(){(0,w.Z)().history;var e,i,n=(e=(0,r.useState)(""),i=2,function(e){if(Array.isArray(e))return e}(e)||function(e,i){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,t,o=[],a=!0,s=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(o.push(r.value),!i||o.length!==i);a=!0);}catch(e){s=!0,t=e}finally{try{a||null==n.return||n.return()}finally{if(s)throw t}}return o}}(e,i)||function(e,i){if(e){if("string"==typeof e)return f(e,i);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,i):void 0}}(e,i)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),b=n[0],v=n[1];return r.createElement("div",{className:"my-4 "},r.createElement(t.Z,{className:"align-items-center d-flex flex-column flex-md-row bg_light_pink"},r.createElement(o.Z,{sm:24,md:12},r.createElement(r.Suspense,{fallback:r.createElement(a.Z,{active:!0})},r.createElement(g,{header_class:m.tq?"text-center justify-content-center d-flex flex-column align-items-baseline":"justify-content-center d-flex flex-column align-items-baseline",header_data:h})),r.createElement("div",{className:"download_section position-relative p-0 p-md-4"},r.createElement("div",{className:"d-flex mb-5 justify-content-center justify-content-md-start"},r.createElement(s.Z,{className:"w-50",placeholder:"Enter your email",size:"large",onChange:function(e){v(e.target.value)}}),r.createElement(l.Z,{size:"large",className:"ml-4 primary_bg_blue_color border d-flex text-white align-items-center",onClick:function(){b?((0,p.F)({msg:"We will send to that email",status:"success"}),v("")):(0,p.F)({msg:"Please enter email",status:"success"})}},"Send Link")),r.createElement("div",{className:"d-flex justify-content-around justify-content-md-start"},r.createElement("a",{rel:"noopener noreferrer",href:"https://play.google.com/store/apps/details?id=com.gigzzy.user",target:"_blank"},r.createElement("img",{alt:"",loading:"lazy",className:"lazyload mr-3",src:d})),r.createElement("a",{rel:"noopener noreferrer",href:"https://apps.apple.com/us/app/gigzzy-user/id1574904567",target:"_blank"},r.createElement("img",{alt:"",loading:"lazy",className:"lazyload ml-3",src:u()}))))),r.createElement(o.Z,{sm:24,md:12,className:"px-1 my-5"},r.createElement("img",{src:c.Z,alt:"gigzzy",className:"w-100 py-3 object_fit cursor_point"}))))}},50291:function(e){e.exports="data:image/png;base64,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"},37101:function(e,i,n){"use strict";i.Z=n.p+"images/c7b0938a1e897668cfd2337ddc5c00e2-sac.png"}}]);