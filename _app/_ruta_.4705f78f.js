import{M as l}from"./mibus.9cfaedd7.js";import{f as n,m as s,p as o,h as r,u as e,o as i,t as a}from"./entry.a540ff3f.js";const u={class:"bg-body-tertiary border rounded p-2 mb-2 shadow"},d={class:"text-primary-emphasis m-0"},c={class:"p-2"},p={class:"row"},_={class:"col-12"},h={class:"m-0"},m={class:"col-6"},b={class:"m-0"},f={class:"col-6"},y={class:"m-0"},v={class:"col-6"},g={class:"m-0"},w={class:"col-6"},k={class:"m-0"},B=["src"],S={data(){return{ruta:l.getRuta(this.$route.params.ruta)}}},C=Object.assign(S,{__name:"[ruta]",setup($){return(t,z)=>(i(),n("section",null,[s("h4",{class:"text-center p-2 text-white rounded shadow",style:r({backgroundColor:`#${t.ruta.route_color}`})},[s("b",null,o(t.ruta.route_short_name),1)],4),s("div",u,[s("h4",d,[s("b",null,o(("t"in t?t.t:e(a))("info_ruta")),1)]),s("div",c,[s("div",p,[s("div",_,[s("p",h,[s("b",null,o(("t"in t?t.t:e(a))("nombre")),1)]),s("p",null,o(t.ruta.route_long_name),1)]),s("div",m,[s("p",b,[s("b",null,o(("t"in t?t.t:e(a))("id")),1)]),s("p",null,o(t.ruta.route_id),1)]),s("div",f,[s("p",y,[s("b",null,o(("t"in t?t.t:e(a))("direccion")),1)]),s("p",null,o(t.ruta.route_type),1)]),s("div",v,[s("p",g,[s("b",null,o(("t"in t?t.t:e(a))("tipo")),1)]),s("p",null,o(t.ruta.type),1)]),s("div",w,[s("p",k,[s("b",null,o(("t"in t?t.t:e(a))("axis")),1)]),s("p",null,o(t.ruta.axis),1)])])])]),s("iframe",{class:"rounded border shadow",src:`https://saldometrobus-app.yizack.com/_mibus/maps/${t.ruta.route_id}.html`,width:"100%",height:"500px"},null,8,B)]))}});export{C as default};
