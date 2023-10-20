import{_ as C}from"./Icon.c7b10aa1.js";import{_ as L}from"./ProgressDialog.c11f42a8.js";import{_ as A,o as v,c as j,a as e,t as a,j as i,f as s,b as f,w as I,L as D,r as M,m as z,q as $,v as k,A as h,D as l,i as b,s as y,g as w,C as u,h as T,F as P,x as F,k as V}from"./entry.0184605a.js";import"./nuxt-icon.vue.f8efa150.js";const B={},S={id:"limit-dialog",class:"modal fade",tabindex:"-1","aria-labelledby":"progress-dialog-label","aria-hidden":"true","data-bs-backdrop":"static"},E={class:"modal-dialog modal-dialog-centered"},q={class:"modal-content"},G={class:"modal-header"},N={id:"progress-dialog-label",class:"modal-title text-primary-emphasis"},O={class:"modal-body"},U={class:"m-0"},R={class:"modal-footer"},Z={class:"btn btn-primary w-100",type:"button","data-bs-dismiss":"modal"};function H(n,t){return v(),j("div",S,[e("div",E,[e("div",q,[e("div",G,[e("h5",N,[e("strong",null,a(("t"in n?n.t:i(s))("limit_tittle")),1)])]),e("div",O,[e("p",U,a(("t"in n?n.t:i(s))("limit_message")),1)]),e("div",R,[e("button",Z,a(("t"in n?n.t:i(s))("entendido")),1)])])])])}const J=A(B,[["render",H]]),K=["onClick"],Q={class:"flex-grow-1"},W={class:"text-primary-emphasis m-0"},X={class:"info mx-2 small"},Y={class:"m-0"},x={class:"m-0"},tt={class:"m-0"},et={class:"m-0"},st={class:"text-nowrap"},at={class:"actions d-flex flex-column"},ot={class:"image mb-2 mt-2"},it=["src","width","height"],nt={class:"d-grid"},rt=["onClick"],dt={key:0,class:"text-center mt-3"},lt={class:"small m-0"},mt={class:"position-fixed bottom-0 end-0 m-3"},ct={class:"btn btn-primary rounded-circle p-1 shadow",role:"button","data-bs-toggle":"modal","data-bs-target":"#add-dialog"},ht={id:"add-dialog",class:"modal fade",tabindex:"-1","aria-labelledby":"add-dialog-label","aria-hidden":"true","data-bs-backdrop":"static"},ut={class:"modal-dialog modal-dialog-centered"},gt={class:"modal-content"},pt={class:"modal-header"},_t={id:"add-dialog-label",class:"modal-title fs-5 text-primary-emphasis"},bt={class:"modal-body text-center"},ft={class:"mb-3 position-relative form-floating"},wt=["placeholder"],vt={class:"invalid-tooltip"},jt={class:"mb-3 position-relative form-floating"},yt=["placeholder"],Tt={class:"invalid-tooltip"},$t={class:"d-flex justify-content-end"},kt={class:"btn btn-danger me-2",type:"button","data-bs-dismiss":"modal"},Ct={class:"btn btn-primary",type:"submit",role:"button"},Lt={name:"AppPage",data(){return{tarjetas:[],size:{width:100,height:63},fetched:0,fetchLimit:4,form:{numero:"",nombre:""},progress:""}},computed:{isFetchLimited(){return this.fetched>this.fetchLimit}},async mounted(){if(h().exists&&(this.tarjetas=await l.getTarjetas(),!h().user.updated&&!this.tarjetas.length&&!h().isGuest)){this.progress=s("adding_tarjetas"),await b(.5),y("progress-dialog");const{email:n,token:t}=h().user,{error:d,error_key:r,tarjetas:m}=await w.getTarjetas({email:n,token:t})||[];let c=[];d&&await u.showToast(s(r),"long"),m&&(this.fetched=m.length,this.isFetchLimited?c=m||[]:c=await w.getDetallesTarjetas(m)||[]);for(const p of c){const{changes:_}=await l.insertTarjeta(p);_>0&&!this.isFetchLimited&&await l.insertMovimientos(p)}const o=await l.getTarjetas(),g=o.entries();for(const[p,_]of g){if(this.tarjetas.push(_),await u.showToast(`${s("tarjeta_added")}: ${_.numero}`),o.length-1===p)break;await b(.5)}await h().setUpdated(),await b(.5),T("progress-dialog"),this.isFetchLimited&&(await b(.5),y("limit-dialog"))}},methods:{async addTarjeta(){this.progress=s("adding_tarjeta");const n=this.$refs.add;if(n.checkValidity()){T("add-dialog"),y("progress-dialog");const{nombre:t,numero:d}=this.form,{tarjeta:r,error:m,error_key:c}=await w.getTarjetaAPI(d);if(r&&!m){if(r.nombre=String(t).trim(),r.fecha_added=new Date().toISOString().replace("T"," ").replace("Z",""),await l.tarjetaExists(r.numero))await u.showToast(`${s("existe_tarjeta")}: ${r.numero}`);else{const{error:g,error_key:p}=h().isGuest?{error:!1}:await w.addTarjeta({nombre:r.nombre,numero:r.numero,email:h().user.email,token:h().user.token}),{changes:_}=await l.insertTarjeta(r);_>0&&!g?(await l.insertMovimientos(r),await u.showToast(`${s("tarjeta_added")}: ${r.numero}`)):await u.showToast(s(p)),this.tarjetas=await l.getTarjetas()}this.form={numero:"",nombre:""}}else await u.showToast(s(c),"long");await b(.5),T("progress-dialog"),n.classList.remove("was-validated")}else n.classList.add("was-validated")},openCard(n){this.$router.push(`${n}`)},async updateTarjeta(n,t){n.stopPropagation(),this.progress=s("actualizando_tarjeta"),y("progress-dialog");const{tarjeta:d,error:r,error_key:m}=await w.getTarjetaAPI(t);if(d&&!r){const{changes:c}=await l.updateTarjeta(d);c>0&&(await l.deleteMovimientos(t),await l.insertMovimientos(d),await u.showToast(`${s("tarjeta_actualizada")}: ${d.numero}`),this.tarjetas=await l.getTarjetas())}else await u.showToast(s(m),"long");await b(.5),T("progress-dialog")}}},zt=Object.assign(Lt,{setup(n){return(t,d)=>{const r=C,m=L,c=J;return v(),j("section",null,[f(D,{name:"tab"},{default:I(()=>[(v(!0),j(P,null,F(t.tarjetas,o=>(v(),j("div",{key:o.numero,class:"bg-body-tertiary border rounded d-flex p-2 mb-2 shadow",role:"button",onClick:g=>t.openCard(o.numero)},[e("div",Q,[e("h4",W,[e("b",null,a(o.nombre),1)]),e("div",X,[e("p",Y,a(("t"in t?t.t:i(s))("numero"))+": "+a(o.numero),1),e("p",x,a(("t"in t?t.t:i(s))("estado"))+": "+a(o.estado),1),e("p",tt,a(("t"in t?t.t:i(s))("tipo"))+": "+a(o.tipo),1),e("p",et,a(("t"in t?t.t:i(s))("fecha"))+": "+a(o.fecha),1),e("h3",st,[e("b",null,a(("t"in t?t.t:i(s))("saldo"))+": B/. "+a(o.saldo),1)])])]),e("div",at,[e("div",ot,[e("img",{class:"img-fluid rounded shadow-sm",src:`/images/${("getCardImage"in t?t.getCardImage:i(V))(o.tipo)}`,width:t.size.width,height:t.size.height},null,8,it)]),e("div",nt,[e("button",{class:"btn btn-primary btn-sm",role:"button",onClick:g=>t.updateTarjeta(g,o.numero)},[f(r,{name:"refresh",size:"md"})],8,rt)])])],8,K))),128))]),_:1}),t.tarjetas.length?(v(),j("div",dt,[e("p",lt,[e("small",null,a(("t"in t?t.t:i(s))("tarjetas_note")),1)])])):M("",!0),e("div",mt,[e("button",ct,[f(r,{name:"plus",size:"lg"})])]),e("div",ht,[e("div",ut,[e("div",gt,[e("div",pt,[e("h1",_t,[e("strong",null,a(("t"in t?t.t:i(s))("add_tarjeta")),1)])]),e("div",bt,[e("form",{ref:"add",novalidate:"",onSubmit:d[2]||(d[2]=z(o=>t.addTarjeta(),["prevent"]))},[e("div",ft,[$(e("input",{"onUpdate:modelValue":d[0]||(d[0]=o=>t.form.nombre=o),class:"form-control",type:"text",placeholder:("t"in t?t.t:i(s))("nombre"),required:""},null,8,wt),[[k,t.form.nombre]]),e("label",null,a(("t"in t?t.t:i(s))("nombre")),1),e("div",vt,a(("t"in t?t.t:i(s))("obligatorio")),1)]),e("div",jt,[$(e("input",{"onUpdate:modelValue":d[1]||(d[1]=o=>t.form.numero=o),class:"form-control",type:"number",pattern:"[0-9]",placeholder:("t"in t?t.t:i(s))("numero_tarjeta"),required:""},null,8,yt),[[k,t.form.numero]]),e("label",null,a(("t"in t?t.t:i(s))("numero_tarjeta")),1),e("div",Tt,a(("t"in t?t.t:i(s))("error_tarjeta")),1)]),e("div",$t,[e("button",kt,a(("t"in t?t.t:i(s))("cancel")),1),e("button",Ct,a(("t"in t?t.t:i(s))("add")),1)])],544)])])])]),f(m,{message:t.progress},null,8,["message"]),f(c)])}}});export{zt as default};