import $ from"./Icon.a5443fa3.js";import{_ as A}from"./nuxt-link.8e24d945.js";import{i as b,o as l,f as d,m as s,p as n,u as t,t as a,I as h,D as O,A as f,x as i,J as _,O as m,C as v,F as y,y as T,c as N,U as x}from"./entry.5f9090aa.js";import{_ as B}from"./logo.597ae3a5.js";import{_ as S}from"./logo2.3f8196cd.js";import"./config.8c002f90.js";const I={},L={id:"about",class:"modal fade",tabindex:"-1","aria-labelledby":"aboutLabel","aria-hidden":"true"},P={class:"modal-dialog modal-dialog-centered"},R={class:"modal-content"},D={class:"modal-body"},V=s("button",{type:"button",class:"btn-close position-absolute end-0 pe-4","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),F={class:"text-center p-2"},M=s("img",{class:"img-fluid shadow-sm mb-3 p-2 rounded",width:"90",height:"90",src:B},null,-1),j={class:"small",style:{"white-space":"pre-wrap"}};function q(e,r){return l(),d("div",L,[s("div",P,[s("div",R,[s("div",D,[V,s("div",F,[M,s("div",j,n(("t"in e?e.t:t(a))("about_message")),1)])])])])])}const E=b(I,[["render",q]]),J={name:"MainNavbar",props:{title:{type:String,required:!0}},data(){return{menu:[{name:a("tarjetas"),icon:"material-symbols:credit-card-outline",link:"/app/",external:!1},{name:a("perfil"),icon:"material-symbols:account-circle",link:"/app/perfil/",external:!1},{name:a("rutas"),icon:"material-symbols:directions-bus-outline",link:"/app/mibus/",external:!1},{name:a("direcciones"),icon:"material-symbols:directions",link:"/app/direcciones/",external:!1},{name:a("estado"),icon:"material-symbols:info",link:h.status_url,external:!0},{name:a("donar"),icon:"material-symbols:shield-with-heart-outline",link:"/app/donar/",external:!1}]}},methods:{async logout(){await O.deleteAll(),await f().logout(),document.body.removeAttribute("style"),this.$router.replace("/")}}},U={class:"navbar navbar-dark navbar-expand-lg bg-primary sticky-top shadow-sm"},z={class:"container-fluid"},G={class:"text-white pe-4 display-6","data-bs-toggle":"offcanvas",href:"#menu",role:"button","aria-controls":"menu"},H={class:"navbar-brand me-auto"},K={class:"nav-item dropstart"},Q={class:"text-white display-6",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"},W={class:"dropdown-menu m-0 end-0"},X={class:"dropdown-item py-3 px-4","data-bs-toggle":"modal","data-bs-target":"#about",role:"button"},Y={id:"menu",class:"offcanvas offcanvas-start",tabindex:"-1","aria-labelledby":"menuLabel"},Z={class:"offcanvas-header bg-primary align-items-start"},ee={class:"text-white"},se=s("img",{class:"img-fluid rounded-circle bg-white",src:S,width:"70",height:"70"},null,-1),te={id:"menuLabel",class:"offcanvas-title"},ae=s("div",{"data-bs-theme":"dark"},[s("button",{type:"button",class:"btn-close","data-bs-dismiss":"offcanvas","aria-label":"Close"})],-1),ne={class:"offcanvas-body px-0 h-100 w-100 d-flex flex-column"},oe={class:"nav flex-column"},ie=["onClick"],le=s("hr",null,null,-1),re={class:"px-3"},de={class:"mt-auto text-center small"};function ce(e,r,u,_e,g,k){const c=$,p=A,w=E;return l(),d(y,null,[s("nav",U,[s("div",z,[s("a",G,[i(c,{class:"d-flex",name:"material-symbols:menu"})]),s("span",H,n(u.title),1),s("div",K,[s("a",Q,[i(c,{name:"ic:baseline-more-vert"})]),s("ul",W,[s("li",null,[i(p,{class:"dropdown-item py-3 px-4",to:"/app/prefs/config/"},{default:_(()=>[m(n(("t"in e?e.t:t(a))("config")),1)]),_:1})]),s("li",null,[s("a",X,n(("t"in e?e.t:t(a))("acerca")),1)]),s("li",null,[s("a",{class:"dropdown-item py-3 px-4",role:"button",onClick:r[0]||(r[0]=o=>("CAPACITOR"in e?e.CAPACITOR:t(v)).openBrowser(("CONST"in e?e.CONST:t(h)).privacy(("t"in e?e.t:t(a))("lang_code"))))},n(("t"in e?e.t:t(a))("privacidad")),1)]),s("li",null,[i(p,{class:"dropdown-item py-3 px-4",to:"/app/prefs/creditos"},{default:_(()=>[m(n(("t"in e?e.t:t(a))("creditos")),1)]),_:1})])])])])]),s("div",Y,[s("div",Z,[s("div",ee,[se,s("h5",te,n(("Auth"in e?e.Auth:t(f))().user.nombre),1),s("div",null,n(("Auth"in e?e.Auth:t(f))().user.email),1)]),ae]),s("div",ne,[s("nav",oe,[(l(!0),d(y,null,T(g.menu,(o,C)=>(l(),d("span",{key:C,"data-bs-dismiss":"offcanvas"},[o.external?(l(),d("a",{key:1,class:"nav-link text-dark-emphasis py-3",role:"button",onClick:he=>("CAPACITOR"in e?e.CAPACITOR:t(v)).openBrowser(o.link)},[i(c,{name:o.icon,width:"24",height:"24",class:"me-4"},null,8,["name"]),m(" "+n(o.name),1)],8,ie)):(l(),N(p,{key:0,class:"nav-link text-dark-emphasis py-3",to:o.link},{default:_(()=>[i(c,{name:o.icon,width:"24",height:"24",class:"me-4"},null,8,["name"]),m(" "+n(o.name),1)]),_:2},1032,["to"]))]))),128)),le,s("div",re,n(("t"in e?e.t:t(a))("sesion")),1),s("a",{class:"nav-link text-dark-emphasis py-3",role:"button",onClick:r[1]||(r[1]=o=>k.logout())},[i(c,{name:"material-symbols:power-rounded",width:"24",height:"24",class:"me-4"}),m(" "+n(("t"in e?e.t:t(a))("salir")),1)])]),s("div",de,[s("i",null,n(("t"in e?e.t:t(a))("version"))+": "+n(("CONST"in e?e.CONST:t(h)).version),1)])])]),i(w)],64)}const me=b(J,[["render",ce]]),ue={};function pe(e,r){const u=me;return l(),d("main",null,[i(u,{title:("t"in e?e.t:t(a))("app_name")},null,8,["title"]),x(e.$slots,"default")])}const we=b(ue,[["render",pe]]);export{we as default};