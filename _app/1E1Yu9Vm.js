import{_ as O}from"./DhEdULM1.js";import{_ as T}from"./8Nbbrhod.js";import{c as r,o as l,a as e,t as o,e as d,f as n,b as i,F as f,r as k,H as y,C as x,w as C,A as _,d as p,B as h,D as B,Y as L,S as N}from"./Czg0Q_ZR.js";import{_ as X}from"./CfJq4YVK.js";import{_ as v}from"./DlAUqK2U.js";import{_ as S}from"./C163oUO5.js";import"./B7g_wYYe.js";const I={},P={id:"about",class:"modal fade",tabindex:"-1","aria-labelledby":"aboutLabel","aria-hidden":"true"},D={class:"modal-dialog modal-dialog-centered"},E={class:"modal-content"},R={class:"modal-body"},j={class:"text-center p-2"},M={class:"small",style:{"white-space":"pre-wrap"}};function V(s,t){return l(),r("div",P,[e("div",D,[e("div",E,[e("div",R,[t[1]||(t[1]=e("button",{type:"button",class:"btn-close position-absolute end-0 pe-4","data-bs-dismiss":"modal","aria-label":"Close"},null,-1)),e("div",j,[t[0]||(t[0]=e("img",{class:"img-fluid shadow-sm mb-3 p-2 rounded",width:"90",height:"90",src:X},null,-1)),e("div",M,o(("t"in s?s.t:d(n))("about_message")),1)])])])])])}const F=Object.assign(v(I,[["render",V]]),{__name:"AboutDialog"}),q={name:"MainNavbar",props:{title:{type:String,required:!0}},data(){return{menu:[{name:n("tarjetas"),icon:"card",link:"/app/",external:!1},{name:n("perfil"),icon:"profile",link:"/app/perfil/",external:!1},{name:n("rutas"),icon:"bus",link:"/app/mibus/",external:!1},{name:n("direcciones"),icon:"directions",link:"/app/direcciones/",external:!1},{name:n("donar"),icon:"donate",link:"/app/donar/",external:!1}],more:[{name:n("config"),icon:"settings",link:"/app/prefs/config/",external:!1},{name:n("acerca"),icon:"about",modal:"about",external:!1},{name:n("privacidad"),icon:"privacy",link:h.privacy(n("lang_code")),external:!0},{name:n("rate"),icon:"star",link:h.googlePlay,external:!0},{name:n("creditos"),icon:"credits",link:"/app/prefs/creditos/",external:!1}],touch:{startX:0,endX:0}}},mounted(){this.$refs.offcanvas.addEventListener("touchstart",s=>{this.touch.startX=s.changedTouches[0].screenX},!1),this.$refs.offcanvas.addEventListener("touchend",s=>{this.touch.endX=s.changedTouches[0].screenX,this.touch.endX<this.touch.startX&&L("menu")},!1)},beforeUnmount(){this.$refs.offcanvas.removeEventListener("touchstart",()=>{},!1),this.$refs.offcanvas.removeEventListener("touchend",()=>{},!1)},methods:{async logout(){await B.deleteAll(),await _().logout(),document.body.removeAttribute("style"),this.$router.replace("/")}}},H={class:"navbar navbar-dark navbar-expand-lg bg-primary sticky-top shadow-sm"},U={class:"container-fluid"},Y={class:"text-white pe-4 display-6 d-flex","data-bs-toggle":"offcanvas",href:"#menu",role:"button","aria-controls":"menu"},z={class:"navbar-brand me-auto"},G={class:"nav-item dropstart"},J={class:"text-white display-6 d-flex",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"},K={class:"dropdown-menu m-0 end-0"},Q=["onClick"],W={class:"ms-1"},Z=["data-bs-target"],ee={class:"ms-1"},se={class:"ms-1"},ae={id:"menu",ref:"offcanvas",class:"offcanvas offcanvas-start",tabindex:"-1","aria-labelledby":"menuLabel"},ne={class:"offcanvas-header bg-primary align-items-start","data-bs-theme":"dark"},te={class:"text-white"},oe={id:"menuLabel",class:"offcanvas-title"},le={class:"offcanvas-body px-0 h-100 w-100 d-flex flex-column"},ie={class:"nav flex-column"},re=["onClick"],de={class:"px-3"},ce={class:"mt-auto text-center small"};function me(s,t,m,_e,b,$){const c=O,g=T,w=F;return l(),r(f,null,[e("nav",H,[e("div",U,[e("a",Y,[i(c,{name:"menu"})]),e("span",z,o(m.title),1),e("div",G,[e("a",J,[i(c,{name:"more"})]),e("ul",K,[(l(!0),r(f,null,k(b.more,(a,u)=>(l(),r("li",{key:u},[a.external?(l(),r("a",{key:0,class:"dropdown-item py-3 px-4 hover d-flex align-items-center",role:"button",onClick:A=>("CAPACITOR"in s?s.CAPACITOR:d(x)).openBrowser(a.link)},[i(c,{name:a.icon},null,8,["name"]),e("span",W,o(a.name),1)],8,Q)):a.modal?(l(),r("a",{key:1,class:"dropdown-item py-3 px-4 hover d-flex align-items-center","data-bs-toggle":"modal","data-bs-target":`#${a.modal}`,role:"button"},[i(c,{name:a.icon},null,8,["name"]),e("span",ee,o(a.name),1)],8,Z)):(l(),y(g,{key:2,class:"dropdown-item py-3 px-4 hover d-flex align-items-center",to:a.link},{default:C(()=>[i(c,{name:a.icon},null,8,["name"]),e("span",se,o(a.name),1)]),_:2},1032,["to"]))]))),128))])])])]),e("div",ae,[e("div",ne,[e("div",te,[t[1]||(t[1]=e("img",{class:"img-fluid rounded-circle bg-white",src:S,width:"70",height:"70"},null,-1)),e("h5",oe,o(("Auth"in s?s.Auth:d(_))().user.nombre),1),e("div",null,o(("Auth"in s?s.Auth:d(_))().user.email),1)]),t[2]||(t[2]=e("button",{type:"button",class:"btn-close","data-bs-dismiss":"offcanvas","aria-label":"Close"},null,-1))]),e("div",le,[e("nav",ie,[(l(!0),r(f,null,k(b.menu,(a,u)=>(l(),r("span",{key:u,"data-bs-dismiss":"offcanvas"},[a.external?(l(),r("a",{key:1,class:"nav-link text-dark-emphasis py-3",role:"button",onClick:A=>("CAPACITOR"in s?s.CAPACITOR:d(x)).openBrowser(a.link)},[i(c,{name:a.icon,class:"me-4"},null,8,["name"]),p(" "+o(a.name),1)],8,re)):(l(),y(g,{key:0,class:"nav-link text-dark-emphasis py-3",to:a.link},{default:C(()=>[i(c,{name:a.icon,class:"me-4"},null,8,["name"]),p(" "+o(a.name),1)]),_:2},1032,["to"]))]))),128)),t[3]||(t[3]=e("hr",null,null,-1)),e("div",de,o(("t"in s?s.t:d(n))("sesion")),1),e("a",{class:"nav-link text-dark-emphasis py-3",role:"button",onClick:t[0]||(t[0]=a=>$.logout())},[i(c,{name:"logout",class:"me-4"}),p(" "+o(("t"in s?s.t:d(n))("salir")),1)])]),e("div",ce,[e("i",null,o(("t"in s?s.t:d(n))("version"))+": "+o(("CONST"in s?s.CONST:d(h)).version),1)])])],512),i(w)],64)}const ue=Object.assign(v(q,[["render",me]]),{__name:"MenuBar"}),fe={};function pe(s,t){const m=ue;return l(),r("main",null,[i(m,{title:("t"in s?s.t:d(n))("app_name")},null,8,["title"]),N(s.$slots,"default")])}const Ce=v(fe,[["render",pe]]);export{Ce as default};
