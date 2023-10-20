import{_ as g}from"./Icon.d40ba41b.js";import{c as d,a as t,b as w,j as p,t as n,F as h,r as b,d as y,f as r,C as v,o as c,n as f,I as C,l as k}from"./entry.8d22d856.js";import{M as m}from"./mibus.16fd30a5.js";import"./nuxt-icon.vue.5170bd16.js";const R={class:"input-group mb-2 rounded shadow-sm"},$={class:"text-primary-emphasis input-group-text border border-end-0"},B={class:"form-floating mb"},S=["placeholder"],F={id:"accordionFlushRutas",class:"accordion accordion-flush bg-body-tertiary border rounded shadow"},x={class:"accordion-header"},I=["data-bs-target","aria-expanded","aria-controls"],L=["id"],M={key:0,class:"text-center p-2 border-top"},N={class:"m-0"},V=["onClick"],z={class:"p-2"},O={class:"text-muted mb-0"},T={class:"mb-0 fw-bold"},j={class:"text-center mt-3"},A={class:"small m-0"},q=t("a",{class:"text-primary fw-bold",href:"https://www.mibus.com.pa/red-de-rutas/",target:"_blank"},"mibus.com.pa/red-de-rutas/",-1),D={data(){return{buscar:{input:"",results:[]},tipos:[{nombre:r("rutas_corredores"),rutas:m.getRutas("Corredor")},{nombre:r("rutas_troncales"),rutas:m.getRutas("Troncal")},{nombre:r("rutas_complementarias"),rutas:m.getRutas("Complementaria")}]}},computed:{tiposFiltered(){if(!this.buscar.input)return this.tipos;const u=a=>{const l=String(this.buscar.input).trim().toLowerCase();return a.filter(e=>{const i=l.split(" ").map(_=>String(e.route_long_name.toLowerCase()).includes(_)).every(Boolean),o=String(e.route_short_name.toLowerCase()).includes(l);return i||o})};return this.tipos.map(a=>{const l=u(a.rutas);return{...a,rutas:l}})}},methods:{openRoute(u){v.isOnline()?this.$router.push(`/app/mibus/${u}`):this.$toast.show(r("error_conexion"))}}},W=Object.assign(D,{__name:"index",setup(u){return(s,a)=>{const l=g;return c(),d("section",null,[t("div",R,[t("span",$,[w(l,{name:"search",size:"sm"})]),t("div",B,[t("input",{class:"form-control bg-body-tertiary rounded-end border border-start-0 shadow-none",type:"text",placeholder:("t"in s?s.t:p(r))("buscar"),onKeyup:a[0]||(a[0]=e=>s.buscar.input=e.target.value)},null,40,S),t("label",null,n(("t"in s?s.t:p(r))("buscar")),1)])]),t("div",F,[(c(!0),d(h,null,b(s.tiposFiltered,(e,i)=>(c(),d("div",{key:i,class:"accordion-item"},[t("h2",x,[t("button",{class:f(["accordion-button",{collapsed:!s.buscar.input}]),type:"button","data-bs-toggle":"collapse","data-bs-target":`#flush-collapse${i}`,"aria-expanded":!!s.buscar.input,"aria-controls":`flush-collapse${i}`},[t("b",null,n(e.nombre),1)],10,I)]),t("div",{id:`flush-collapse${i}`,class:f(["accordion-collapse collapse",{show:s.buscar.input}])},[e.rutas.length===0?(c(),d("div",M,[t("p",N,n(("t"in s?s.t:p(r))("results_notfound")),1)])):C("",!0),(c(!0),d(h,null,b(e.rutas,o=>(c(),d("div",{key:o.route_id,class:"border-top"},[t("div",{class:"d-flex align-items-center p-2 hover",role:"button",onClick:_=>s.openRoute(o.route_id)},[t("p",{class:"p-2 m-0 text-white rounded small text-center fw-bold shadow-sm",style:k({backgroundColor:`#${o.route_color}`,minWidth:"3.7rem"})},n(o.route_short_name),5),t("div",z,[t("p",O,[t("small",null,n(o.route_type),1)]),t("p",T,n(o.route_long_name),1)])],8,V)]))),128))],10,L)]))),128))]),t("div",j,[t("p",A,[t("small",null,[y(n(("t"in s?s.t:p(r))("mibus_info"))+": ",1),q])])])])}}});export{W as default};
