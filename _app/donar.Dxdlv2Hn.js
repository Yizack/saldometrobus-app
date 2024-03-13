import{_ as g}from"./Icon.DyGaSZBL.js";import{c as n,a as e,b as h,t,j as o,F as m,x as _,H as r,C as u,o as l,f as i,n as b}from"./entry.LpyIGZDR.js";import"./nuxt-icon.vue.DJfnr--d.js";const v=""+globalThis.__publicAssetsURL("images/nequi_qr.webp"),f={class:"bg-body-tertiary border rounded p-2 mb-2 shadow"},y={class:"text-primary-emphasis m-0"},C={class:"m-2"},T={class:"donate-buttons"},k=["onClick"],q=["src"],A=["data-bs-target"],O=["src"],w={id:"bgeneral",class:"modal fade",tabindex:"-1","aria-labelledby":"bgeneralLabel","aria-hidden":"true"},B={class:"modal-dialog modal-dialog-centered"},N={class:"modal-content"},$=e("div",{class:"modal-header"},[e("h5",{class:"modal-title text-primary-emphasis"},[e("strong",null,"Banco General")]),e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),I={class:"modal-body"},R={class:"m-0"},S={class:"my-3"},P=["value"],L={class:"d-grid"},j={id:"nequi",class:"modal fade",tabindex:"-1","aria-labelledby":"nequiLabel","aria-hidden":"true"},F={class:"modal-dialog modal-dialog-centered"},V={class:"modal-content"},z=e("div",{class:"modal-header"},[e("h5",{class:"modal-title text-primary-emphasis"},[e("strong",null,"Nequi")]),e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),D={class:"modal-body"},E={class:"nequi rounded p-4 text-center mb-2"},G={class:"text-white text-uppercase mb-3"},H=e("img",{class:"img-fluid rounded",src:v},null,-1),U={class:"d-grid"},J={data(){return{donate_options:{bgeneral:{external:!1,info:{nombre:r.dev.name,n_cuenta:r.dev.bgeneral.numero,tipo:r.dev.bgeneral.tipo}},nequi:{external:!1},paypal:{external:!0,link:r.dev.paypal}}}},methods:{copyBgeneral(){this.$refs.bgeneral[1].focus(),u.writeToClipboard(this.donate_options.bgeneral.info.n_cuenta)}}},Y=Object.assign(J,{__name:"donar",setup(K){return(s,c)=>{const p=g;return l(),n("section",null,[e("div",f,[e("h4",y,[h(p,{class:"me-1 text-danger",name:"donate"}),e("b",null,t(("t"in s?s.t:o(i))("donacion")),1)]),e("div",C,t(("t"in s?s.t:o(i))("donar_desc")),1)]),e("div",T,[(l(!0),n(m,null,_(s.donate_options,(d,a)=>(l(),n(m,{key:a},[d.external?(l(),n("div",{key:0,class:b(["donate-option rounded-pill shadow mb-2",a]),onClick:M=>("CAPACITOR"in s?s.CAPACITOR:o(u)).openBrowser(d.link)},[e("img",{class:"img-fluid",src:`/images/${a}.svg`},null,8,q)],10,k)):(l(),n("div",{key:1,class:b(["donate-option rounded-pill shadow mb-2",a]),"data-bs-toggle":"modal","data-bs-target":`#${a}`},[e("img",{class:"img-fluid",src:`/images/${a}.svg`},null,8,O)],10,A))],64))),128))]),e("div",w,[e("div",B,[e("div",N,[$,e("div",I,[e("p",R,t(("t"in s?s.t:o(i))("donar_bgeneral")),1),e("div",S,[(l(!0),n(m,null,_(s.donate_options.bgeneral.info,(d,a)=>(l(),n("div",{key:a,class:"form-floating mb-2"},[e("input",{ref_for:!0,ref:"bgeneral",type:"text",class:"form-control",value:d,readonly:""},null,8,P),e("label",null,t(("t"in s?s.t:o(i))(a)),1)]))),128))]),e("div",L,[e("button",{class:"btn btn-primary",onClick:c[0]||(c[0]=d=>s.copyBgeneral())},t(("t"in s?s.t:o(i))("copiar_n")),1)])])])])]),e("div",j,[e("div",F,[e("div",V,[z,e("div",D,[e("p",null,t(("t"in s?s.t:o(i))("donar_nequi")),1),e("div",E,[e("h5",G,t(("CONST"in s?s.CONST:o(r)).dev.legal_name),1),H]),e("div",U,[e("a",{class:"btn btn-primary",role:"button",onClick:c[1]||(c[1]=d=>("CAPACITOR"in s?s.CAPACITOR:o(u)).openBrowser(`${("CONST"in s?s.CONST:o(r)).url}/images/nequi_qr.png`))},t(("t"in s?s.t:o(i))("download_qr")),1)])])])])])])}}});export{Y as default};
