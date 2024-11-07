import{_ as T}from"./CinVGg7T.js";import{_ as L}from"./B-1jhIZU.js";import{_ as v,o as l,c as r,a as e,t as o,i as d,e as n,E as m,U as O,D as B,A as h,b as i,F as p,r as k,C as y,H as x,w as C,d as _,S as N}from"./BvvNb0i0.js";import{_ as X}from"./395IzcNh.js";import{_ as S}from"./C3kpwG5Y.js";import"./9Z8nZY-C.js";const E={},I={id:"about",class:"modal fade",tabindex:"-1","aria-labelledby":"aboutLabel","aria-hidden":"true"},P={class:"modal-dialog modal-dialog-centered"},R={class:"modal-content"},D={class:"modal-body"},V={class:"text-center p-2"},F={class:"small",style:{"white-space":"pre-wrap"}};function M(s,t){return l(),r("div",I,[e("div",P,[e("div",R,[e("div",D,[t[1]||(t[1]=e("button",{type:"button",class:"btn-close position-absolute end-0 pe-4","data-bs-dismiss":"modal","aria-label":"Close"},null,-1)),e("div",V,[t[0]||(t[0]=e("img",{class:"img-fluid shadow-sm mb-3 p-2 rounded",width:"90",height:"90",src:X},null,-1)),e("div",F,o(("t"in s?s.t:d(n))("about_message")),1)])])])])])}const U=v(E,[["render",M]]),j={name:"MainNavbar",props:{title:{type:String,required:!0}},data(){return{menu:[{name:n("tarjetas"),icon:"card",link:"/app/",external:!1},{name:n("perfil"),icon:"profile",link:"/app/perfil/",external:!1},{name:n("rutas"),icon:"bus",link:"/app/mibus/",external:!1},{name:n("direcciones"),icon:"directions",link:"/app/direcciones/",external:!1},{name:n("estado"),icon:"status",link:m.status_url,external:!0},{name:n("donar"),icon:"donate",link:"/app/donar/",external:!1}],more:[{name:n("config"),icon:"settings",link:"/app/prefs/config/",external:!1},{name:n("acerca"),icon:"about",modal:"about",external:!1},{name:n("privacidad"),icon:"privacy",link:m.privacy(n("lang_code")),external:!0},{name:n("rate"),icon:"star",link:m.googlePlay,external:!0},{name:n("creditos"),icon:"credits",link:"/app/prefs/creditos/",external:!1}],touch:{startX:0,endX:0}}},mounted(){this.$refs.offcanvas.addEventListener("touchstart",s=>{this.touch.startX=s.changedTouches[0].screenX},!1),this.$refs.offcanvas.addEventListener("touchend",s=>{this.touch.endX=s.changedTouches[0].screenX,this.touch.endX<this.touch.startX&&O("menu")},!1)},beforeUnmount(){this.$refs.offcanvas.removeEventListener("touchstart",()=>{},!1),this.$refs.offcanvas.removeEventListener("touchend",()=>{},!1)},methods:{async logout(){await B.deleteAll(),await h().logout(),document.body.removeAttribute("style"),this.$router.replace("/")}}},q={class:"navbar navbar-dark navbar-expand-lg bg-primary sticky-top shadow-sm"},H={class:"container-fluid"},z={class:"text-white pe-4 display-6 d-flex","data-bs-toggle":"offcanvas",href:"#menu",role:"button","aria-controls":"menu"},G={class:"navbar-brand me-auto"},J={class:"nav-item dropstart"},K={class:"text-white display-6 d-flex",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"},Q={class:"dropdown-menu m-0 end-0"},W=["onClick"],Y={class:"ms-1"},Z=["data-bs-target"],ee={class:"ms-1"},se={class:"ms-1"},ae={id:"menu",ref:"offcanvas",class:"offcanvas offcanvas-start",tabindex:"-1","aria-labelledby":"menuLabel"},ne={class:"offcanvas-header bg-primary align-items-start","data-bs-theme":"dark"},te={class:"text-white"},oe={id:"menuLabel",class:"offcanvas-title"},le={class:"offcanvas-body px-0 h-100 w-100 d-flex flex-column"},ie={class:"nav flex-column"},re=["onClick"],de={class:"px-3"},ce={class:"mt-auto text-center small"};function me(s,t,u,_e,b,$){const c=T,g=L,w=U;return l(),r(p,null,[e("nav",q,[e("div",H,[e("a",z,[i(c,{name:"menu"})]),e("span",G,o(u.title),1),e("div",J,[e("a",K,[i(c,{name:"more"})]),e("ul",Q,[(l(!0),r(p,null,k(b.more,(a,f)=>(l(),r("li",{key:f},[a.external?(l(),r("a",{key:0,class:"dropdown-item py-3 px-4 hover d-flex align-items-center",role:"button",onClick:A=>("CAPACITOR"in s?s.CAPACITOR:d(y)).openBrowser(a.link)},[i(c,{name:a.icon},null,8,["name"]),e("span",Y,o(a.name),1)],8,W)):a.modal?(l(),r("a",{key:1,class:"dropdown-item py-3 px-4 hover d-flex align-items-center","data-bs-toggle":"modal","data-bs-target":`#${a.modal}`,role:"button"},[i(c,{name:a.icon},null,8,["name"]),e("span",ee,o(a.name),1)],8,Z)):(l(),x(g,{key:2,class:"dropdown-item py-3 px-4 hover d-flex align-items-center",to:a.link},{default:C(()=>[i(c,{name:a.icon},null,8,["name"]),e("span",se,o(a.name),1)]),_:2},1032,["to"]))]))),128))])])])]),e("div",ae,[e("div",ne,[e("div",te,[t[1]||(t[1]=e("img",{class:"img-fluid rounded-circle bg-white",src:S,width:"70",height:"70"},null,-1)),e("h5",oe,o(("Auth"in s?s.Auth:d(h))().user.nombre),1),e("div",null,o(("Auth"in s?s.Auth:d(h))().user.email),1)]),t[2]||(t[2]=e("button",{type:"button",class:"btn-close","data-bs-dismiss":"offcanvas","aria-label":"Close"},null,-1))]),e("div",le,[e("nav",ie,[(l(!0),r(p,null,k(b.menu,(a,f)=>(l(),r("span",{key:f,"data-bs-dismiss":"offcanvas"},[a.external?(l(),r("a",{key:1,class:"nav-link text-dark-emphasis py-3",role:"button",onClick:A=>("CAPACITOR"in s?s.CAPACITOR:d(y)).openBrowser(a.link)},[i(c,{name:a.icon,class:"me-4"},null,8,["name"]),_(" "+o(a.name),1)],8,re)):(l(),x(g,{key:0,class:"nav-link text-dark-emphasis py-3",to:a.link},{default:C(()=>[i(c,{name:a.icon,class:"me-4"},null,8,["name"]),_(" "+o(a.name),1)]),_:2},1032,["to"]))]))),128)),t[3]||(t[3]=e("hr",null,null,-1)),e("div",de,o(("t"in s?s.t:d(n))("sesion")),1),e("a",{class:"nav-link text-dark-emphasis py-3",role:"button",onClick:t[0]||(t[0]=a=>$.logout())},[i(c,{name:"logout",class:"me-4"}),_(" "+o(("t"in s?s.t:d(n))("salir")),1)])]),e("div",ce,[e("i",null,o(("t"in s?s.t:d(n))("version"))+": "+o(("CONST"in s?s.CONST:d(m)).version),1)])])],512),i(w)],64)}const ue=v(j,[["render",me]]),fe={};function pe(s,t){const u=ue;return l(),r("main",null,[i(u,{title:("t"in s?s.t:d(n))("app_name")},null,8,["title"]),N(s.$slots,"default")])}const xe=v(fe,[["render",pe]]);export{xe as default};