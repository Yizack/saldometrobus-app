import A from"./Icon.ed696919.js";import{_ as C}from"./ProgressDialog.cf983966.js";import{f as p,F as z,y as M,m as s,p as o,u as r,K as D,x as f,w as P,r as v,v as y,A as m,D as d,t as e,l as g,s as j,k as b,C as u,j as _,o as c}from"./entry.9b809ccd.js";import"./config.e1bca0b1.js";const I=""+globalThis.__publicAssetsURL("images/rapipass.webp"),L=""+globalThis.__publicAssetsURL("images/metro_metrobus.webp"),U=""+globalThis.__publicAssetsURL("images/metrobus.webp"),V=["onClick"],B={class:"flex-grow-1"},S={class:"text-primary-emphasis m-0"},E={class:"info mx-2 small"},R={class:"m-0"},N={class:"m-0"},O={class:"m-0"},q={class:"m-0"},F={class:"actions"},G={class:"image"},K=["width","height"],Z=["width","height"],H=["width","height"],J={class:"d-grid gap-2"},Q=["onClick"],W={key:0,class:"text-center mt-3"},X={class:"small m-0"},Y={class:"position-absolute bottom-0 end-0 m-3"},x={class:"btn btn-primary rounded-circle p-1 shadow",role:"button","data-bs-toggle":"modal","data-bs-target":"#add-dialog"},tt={id:"add-dialog",class:"modal fade",tabindex:"-1","aria-labelledby":"add-dialog-label","aria-hidden":"true","data-bs-backdrop":"static"},st={class:"modal-dialog modal-dialog-centered"},et={class:"modal-content"},at={class:"modal-header"},ot={id:"add-dialog-label",class:"modal-title fs-5 text-primary-emphasis"},it={class:"modal-body text-center"},rt={class:"mb-3 position-relative form-floating"},nt=["placeholder"],dt={class:"invalid-tooltip"},lt={class:"mb-3 position-relative form-floating"},mt=["placeholder"],ht={class:"invalid-tooltip"},pt={class:"d-flex justify-content-end"},ut={class:"btn btn-danger me-2",type:"button","data-bs-dismiss":"modal"},ct={class:"btn btn-primary",type:"submit",role:"button"},gt={name:"AppPage",data(){return{tarjetas:[],size:100,form:{numero:"",nombre:""},progress:""}},async mounted(){if(m().exists&&(this.tarjetas=await d.getTarjetas(),!m().user.updated&&!this.tarjetas.length&&!m().isGuest)){this.progress=e("adding_tarjetas"),await g(.5),j("progress-dialog");const{email:l,token:t}=m().user,n=await b.getDetallesTarjetas({email:l,token:t})||[];for(const a of n){const{changes:h}=await d.insertTarjeta(a);await d.insertMovimientos(a),h>0&&await u.showToast(`${e("tarjeta_added")}: ${a.numero}`)}this.tarjetas=await d.getTarjetas(),await m().setUpdated(),await g(.5),_("progress-dialog")}},methods:{async addTarjeta(){this.progress=e("adding_tarjeta");const l=this.$refs.add;if(l.checkValidity()){_("add-dialog"),j("progress-dialog");const{nombre:t,numero:n}=this.form,{tarjeta:a,error:h,error_key:i}=await b.getTarjetaAPI(n);if(a&&!h){if(a.nombre=String(t).trim(),a.fecha_added=new Date().toISOString().replace("T"," ").replace("Z",""),await d.tarjetaExists(a.numero))await u.showToast(`${e("existe_tarjeta")}: ${a.numero}`);else{const{error:T,error_key:k}=m().isGuest?{error:!1}:await b.addTarjeta({nombre:a.nombre,numero:a.numero,email:m().user.email,token:m().user.token}),{changes:$}=await d.insertTarjeta(a);$>0&&!T?(await d.insertMovimientos(a),await u.showToast(`${e("tarjeta_added")}: ${a.numero}`)):await u.showToast(e(k)),this.tarjetas=await d.getTarjetas()}this.form={numero:"",nombre:""}}else await u.showToast(e(i),"long");await g(.5),_("progress-dialog"),l.classList.remove("was-validated")}else l.classList.add("was-validated")},openCard(l){this.$router.push(`${l}`)},async updateTarjeta(l){this.progress=e("actualizando_tarjeta"),j("progress-dialog");const{tarjeta:t,error:n,error_key:a}=await b.getTarjetaAPI(l);if(t&&!n){const{changes:h}=await d.updateTarjeta(t);h>0&&(await d.deleteMovimientos(l),await d.insertMovimientos(t),await u.showToast(`${e("tarjeta_actualizada")}: ${t.numero}`),this.tarjetas=await d.getTarjetas())}else await u.showToast(e(a),"long");await g(.5),_("progress-dialog")}}},jt=Object.assign(gt,{setup(l){return(t,n)=>{const a=A,h=C;return c(),p("section",null,[(c(!0),p(z,null,M(t.tarjetas,i=>(c(),p("div",{key:i.numero,class:"bg-body-tertiary border rounded d-flex p-2 mb-2 shadow",role:"button",onClick:w=>t.openCard(i.numero)},[s("div",B,[s("h4",S,[s("b",null,o(i.nombre),1)]),s("div",E,[s("p",R,o(("t"in t?t.t:r(e))("numero"))+": "+o(i.numero),1),s("p",N,o(("t"in t?t.t:r(e))("estado"))+": "+o(i.estado),1),s("p",O,o(("t"in t?t.t:r(e))("tipo"))+": "+o(i.tipo),1),s("p",q,o(("t"in t?t.t:r(e))("fecha"))+": "+o(i.fecha),1),s("h3",null,[s("b",null,o(("t"in t?t.t:r(e))("saldo"))+": B/. "+o(i.saldo),1)])])]),s("div",F,[s("div",G,[i.tipo===("t"in t?t.t:r(e))("tarjeta_rapipass")?(c(),p("img",{key:0,class:"img-fluid",src:I,width:t.size,height:t.size},null,8,K)):i.tipo===("t"in t?t.t:r(e))("tarjeta_normal")?(c(),p("img",{key:1,class:"img-fluid",src:L,width:t.size,height:t.size},null,8,Z)):(c(),p("img",{key:2,src:U,class:"img-fluid",width:t.size,height:t.size},null,8,H))]),s("div",J,[s("button",{class:"btn btn-primary btn-sm",role:"button",onClick:w=>{w.stopPropagation(),t.updateTarjeta(i.numero)}},[f(a,{name:"material-symbols:refresh",width:"1.5em",height:"1.5em"})],8,Q)])])],8,V))),128)),t.tarjetas.length?(c(),p("div",W,[s("p",X,[s("small",null,"*"+o(("t"in t?t.t:r(e))("tarjetas_note")),1)])])):D("",!0),s("div",Y,[s("button",x,[f(a,{name:"material-symbols:add",width:"3em",height:"3em"})])]),s("div",tt,[s("div",st,[s("div",et,[s("div",at,[s("h1",ot,o(("t"in t?t.t:r(e))("add_tarjeta")),1)]),s("div",it,[s("form",{ref:"add",novalidate:"",onSubmit:n[2]||(n[2]=P(i=>t.addTarjeta(),["prevent"]))},[s("div",rt,[v(s("input",{"onUpdate:modelValue":n[0]||(n[0]=i=>t.form.nombre=i),class:"form-control",type:"text",placeholder:("t"in t?t.t:r(e))("nombre"),required:""},null,8,nt),[[y,t.form.nombre]]),s("label",null,o(("t"in t?t.t:r(e))("nombre")),1),s("div",dt,o(("t"in t?t.t:r(e))("obligatorio")),1)]),s("div",lt,[v(s("input",{"onUpdate:modelValue":n[1]||(n[1]=i=>t.form.numero=i),class:"form-control",type:"number",pattern:"[0-9]",placeholder:("t"in t?t.t:r(e))("numero_tarjeta"),required:""},null,8,mt),[[y,t.form.numero]]),s("label",null,o(("t"in t?t.t:r(e))("numero_tarjeta")),1),s("div",ht,o(("t"in t?t.t:r(e))("error_tarjeta")),1)]),s("div",pt,[s("button",ut,o(("t"in t?t.t:r(e))("cancel")),1),s("button",ct,o(("t"in t?t.t:r(e))("add")),1)])],544)])])])]),f(h,{message:t.progress},null,8,["message"])])}}});export{jt as default};
