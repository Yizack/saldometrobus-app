import{_ as A}from"./DyZmCzLt.js";import{_ as T}from"./BH14JWCM.js";import{c as u,a as e,t as i,j as r,q as C,v as P,n as h,b as w,w as V,T as j,r as p,F as N,x as $,m as I,A as a,D as _,g as b,C as m,f as t,s as g,i as f,h as y,o as d,J as v}from"./DUjqmHCw.js";import"./yd8G01Sz.js";const B={class:"bg-body-tertiary border rounded p-2 mb-2 shadow"},D={class:"text-primary-emphasis m-0"},G={class:"input-group p-2"},q={class:"bg-body-tertiary border rounded p-2 mb-2 shadow"},M={class:"text-primary-emphasis m-0"},S={class:"m-2"},F=["value"],O={class:"bg-body-tertiary border rounded p-2 mb-2 shadow"},R={class:"text-primary-emphasis m-0"},U={class:"m-2"},z={class:"ms-2 my-0"},E={key:1,class:"m-0"},J={key:0,class:"bg-body-tertiary border rounded p-2 mb-2 shadow"},K={class:"text-primary-emphasis m-0"},L={class:"m-2"},H={class:"mb-3 position-relative form-floating"},Q=["placeholder","value"],W={class:"invalid-tooltip"},X={class:"mb-3 form-floating"},Y=["placeholder","value"],Z={class:"mb-3 form-floating"},x=["placeholder","value"],ss={class:"d-grid"},es={class:"btn btn-primary",type:"submit",role:"button"},ts={key:1,class:"bg-body-tertiary border rounded p-2 shadow"},os={class:"text-primary-emphasis m-0"},rs={class:"m-2"},as=["value"],ns={key:2,class:"d-grid"},is={key:3,class:"text-center mt-3"},ls={class:"small m-0"},ds={data(){return{dialog:"",edit:{nombre:!1},user:{nombre:a().user.nombre,email:a().user.email,token:a().user.token,tarjetas:[]},form:{current_password:"",new_password:"",password_check:"",error:!1}}},computed:{isPasswordValid(){return this.form.new_password.length>=3&&this.form.current_password!==this.form.new_password&&this.form.current_password.length>0},isPasswordCheckValid(){return this.isPasswordValid&&this.form.new_password===this.form.password_check}},async mounted(){this.user.tarjetas=await _.getTarjetas()},methods:{async editName(){this.edit.nombre=!this.edit.nombre,this.user.nombre=this.user.nombre.trim();const l=this.$refs.nombre;if(this.edit.nombre){const s=this.user.nombre.length;l.setSelectionRange(s,s),l.focus(),l.removeAttribute("readonly")}else{if(this.user.nombre!==a().user.nombre){const{error:s,error_key:o}=await b.updateName({nombre:this.user.nombre,email:a().user.email,token:a().user.token});s?(this.user.nombre=a().user.nombre,await m.showToast(t(o))):(a().updateName(this.user.nombre),await m.showToast(t("name_updated")))}l.setAttribute("readonly",!0),l.blur()}},async updatePass(){if(this.isPasswordValid&&this.isPasswordCheckValid){this.dialog=t("updating_pass"),g("progress-dialog");const{error:l,error_key:s}=await b.userPassUpdate({current_password:this.form.current_password,new_password:this.form.new_password,email:a().user.email,token:a().user.token});l?(s==="pass_error"&&(this.form.error=!0,this.$refs.current.focus()),await m.showToast(t(s),"long")):(await m.showToast(t("pass_updated"),"long"),this.form={current_password:"",new_password:"",password_check:""})}await f(.5),y("progress-dialog")},copyToken(l){l.target.select(),m.writeToClipboard(this.user.token)},async deleteAccount(){if(await m.confirm(t("delete_account"),t("delete_account_sure"))){this.dialog=t("deleting_account"),g("progress-dialog");const{error:s,error_key:o}=await b.deleteAccount({email:a().user.email,token:a().user.token});s?(await m.showToast(t(o)),await f(.5),y("progress-dialog")):(await _.deleteAll(),await a().logout(),await m.showToast(t("account_deleted")),await f(.5),y("progress-dialog"),this.$router.replace("/"))}}}},cs=Object.assign(ds,{__name:"perfil",setup(l){return(s,o)=>{const c=A,k=T;return d(),u("section",null,[e("div",B,[e("h4",D,[e("b",null,i(("t"in s?s.t:r(t))("nombre")),1)]),e("div",G,[C(e("input",{ref:"nombre","onUpdate:modelValue":o[0]||(o[0]=n=>s.user.nombre=n),class:"form-control py-2",type:"text",readonly:""},null,512),[[P,s.user.nombre]]),("Auth"in s?s.Auth:r(a))().isGuest?p("",!0):(d(),u("button",{key:0,class:h(["btn btn-sm",s.edit.nombre?"btn-success":"btn-primary"]),style:{width:"3rem"},onClick:o[1]||(o[1]=n=>s.editName())},[w(j,{name:"tab",mode:"out-in"},{default:V(()=>[s.edit.nombre?(d(),v(c,{key:0,name:"check"})):(d(),v(c,{key:1,name:"edit"}))]),_:1})],2))])]),e("div",q,[e("h4",M,[e("b",null,i(("t"in s?s.t:r(t))("correo")),1)]),e("div",S,[e("input",{value:s.user.email,class:"form-control py-2",type:"text",readonly:""},null,8,F)])]),e("div",O,[e("h4",R,[e("b",null,i(("t"in s?s.t:r(t))("tarjetas_vinculadas")),1)]),e("div",U,[s.user.tarjetas.length?(d(!0),u(N,{key:0},$(s.user.tarjetas,n=>(d(),u("div",{key:n.numero,class:"d-flex align-items-center"},[w(c,{name:"card"}),e("p",z,i(n.numero)+" ("+i(n.nombre)+")",1)]))),128)):(d(),u("p",E,i(("t"in s?s.t:r(t))("no_tarjetas")),1))])]),("Auth"in s?s.Auth:r(a))().isGuest?p("",!0):(d(),u("div",J,[e("h4",K,[e("b",null,i(("t"in s?s.t:r(t))("password")),1)]),e("div",L,[e("form",{novalidate:"",onSubmit:o[6]||(o[6]=I(n=>s.updatePass(),["prevent"]))},[e("div",H,[e("input",{ref:"current",class:h(["form-control",{"is-invalid":s.form.error}]),type:"password",autocomplete:"password",placeholder:("t"in s?s.t:r(t))("current_pass"),value:s.form.current_password,required:"",onInput:o[2]||(o[2]=n=>s.form.current_password=n.target.value),onKeyup:o[3]||(o[3]=n=>s.form.error=!1)},null,42,Q),e("label",null,i(("t"in s?s.t:r(t))("current_pass")),1),e("div",W,i(("t"in s?s.t:r(t))("pass_error")),1)]),e("div",X,[e("input",{class:h(["form-control",{"is-valid":s.isPasswordValid}]),type:"password",autocomplete:"new-password",placeholder:("t"in s?s.t:r(t))("new_pass"),value:s.form.new_password,required:"",onInput:o[4]||(o[4]=n=>s.form.new_password=n.target.value)},null,42,Y),e("label",null,i(("t"in s?s.t:r(t))("new_pass")),1)]),e("div",Z,[e("input",{class:h(["form-control",{"is-valid":s.isPasswordCheckValid}]),type:"password",autocomplete:"off",placeholder:("t"in s?s.t:r(t))("password_check"),value:s.form.password_check,required:"",onInput:o[5]||(o[5]=n=>s.form.password_check=n.target.value)},null,42,x),e("label",null,i(("t"in s?s.t:r(t))("password_check")),1)]),e("div",ss,[e("button",es,i(("t"in s?s.t:r(t))("change_pass")),1)])],32)])])),("Auth"in s?s.Auth:r(a))().isGuest?p("",!0):(d(),u("div",ts,[e("h4",os,[e("b",null,i(("t"in s?s.t:r(t))("account_id")),1)]),e("div",rs,[e("input",{value:s.user.token,class:"form-control py-2",type:"text",readonly:"",onClick:o[7]||(o[7]=n=>s.copyToken(n))},null,8,as)])])),("Auth"in s?s.Auth:r(a))().isGuest?p("",!0):(d(),u("div",ns,[e("button",{class:"btn btn-danger mt-2",onClick:o[8]||(o[8]=n=>s.deleteAccount())},i(("t"in s?s.t:r(t))("delete_account")),1)])),("Auth"in s?s.Auth:r(a))().isGuest?(d(),u("div",is,[e("p",ls,[e("small",null,i(("t"in s?s.t:r(t))("nota")),1)])])):p("",!0),w(k,{message:s.dialog},null,8,["message"])])}}});export{cs as default};
