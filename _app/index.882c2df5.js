import{f as t,m as e,F as u,y as _,t as r,C as p,o as s,p as n,h as m}from"./entry.171743bc.js";import{M as l}from"./mibus.9cfaedd7.js";const h={id:"accordionFlushRutas",class:"accordion accordion-flush bg-body-tertiary border rounded mb-2 shadow"},b={class:"accordion-header"},g=["data-bs-target","aria-controls"],f=["id"],y=["onClick"],C={class:"p-2 m-0"},R={data(){return{tipos:[{nombre:r("rutas_corredores"),rutas:l.getRutas("Corredor")},{nombre:r("rutas_troncales"),rutas:l.getRutas("Troncal")},{nombre:r("rutas_complementarias"),rutas:l.getRutas("Complementaria")}]}},methods:{openRoute(c){p.isOnline()?this.$router.push(`/app/mibus/${c}`):this.$toast.show(r("error_conexion"))}}},B=Object.assign(R,{__name:"index",setup(c){return(i,$)=>(s(),t("section",null,[e("div",h,[(s(!0),t(u,null,_(i.tipos,(d,a)=>(s(),t("div",{key:a,class:"accordion-item"},[e("h2",b,[e("button",{class:"accordion-button collapsed",type:"button","data-bs-toggle":"collapse","data-bs-target":`#flush-collapse${a}`,"aria-expanded":"false","aria-controls":`flush-collapse${a}`},[e("b",null,n(d.nombre),1)],8,g)]),e("div",{id:`flush-collapse${a}`,class:"accordion-collapse collapse","data-bs-parent":"#accordionFlushRutas"},[(s(!0),t(u,null,_(d.rutas,o=>(s(),t("div",{key:o.route_id},[e("div",{class:"d-flex align-items-center p-2 rutas-mibus",role:"button",onClick:k=>i.openRoute(o.route_id)},[e("p",{class:"p-2 m-0 text-white rounded small text-center",style:m({backgroundColor:`#${o.route_color}`,minWidth:"3.7rem"})},n(o.route_short_name),5),e("p",C,n(o.route_long_name),1)],8,y)]))),128))],8,f)]))),128))])]))}});export{B as default};