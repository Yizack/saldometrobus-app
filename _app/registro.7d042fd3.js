import{_ as c}from"./nuxt-link.fd15ed4d.js";import{_ as g}from"./ProgressDialog.5dfbb6c8.js";import{c as d,a as o,t as l,j as r,l as w,n,H as b,d as m,b as p,w as v,s as _,A as V,i as y,h as k,C as P,f as e,o as u}from"./entry.9f322c45.js";import{_ as C}from"./logo2.f096c6db.js";const N={class:"container-fluid text-center"},q={class:"py-2"},E=o("img",{class:"img-fluid shadow-sm my-3 rounded bg-body",width:"90",height:"90",src:C},null,-1),I={class:"mb-3 form-floating"},A=["placeholder"],$={class:"mb-3 position-relative form-floating"},B=["placeholder"],M={key:0,class:"invalid-tooltip"},S={class:"mb-3 form-floating"},T=["placeholder"],j={class:"mb-3 form-floating"},D=["placeholder"],O={class:"d-grid mt-4"},z=["value"],H={class:"mb-3"},K={class:"mb-3"},L={name:"SignupPage",data(){return{form:{nombre:"",email:"",password:"",password_check:"",error:!1}}},computed:{isNombreValid(){const t=this.form.nombre.trim();return t.length>0&&t.length<=50},isPasswordValid(){return this.form.password.length>=3},isPasswordCheckValid(){return this.isPasswordValid&&this.form.password===this.form.password_check},isEmailValid(){const t=document.createElement("input");return t.type="email",t.required=!0,t.value=this.form.email,t.checkValidity()}},methods:{async registro(){if(this.isNombreValid&&this.isEmailValid&&this.isPasswordValid&&this.isPasswordCheckValid){_("progress-dialog"),this.form.submitted=!0;const{error:t,error_key:s}=await V().registro({nombre:this.form.nombre.trim(),email:this.form.email,password:this.form.password});await y(.5),k("progress-dialog"),t?(s==="correo_existe"&&(this.form.error=!0,this.$refs.email.focus()),await P.showToast(e(s),"long")):this.$router.replace("/app/")}}}},Q=Object.assign(L,{setup(t){return(s,i)=>{const f=c,h=g;return u(),d("section",null,[o("div",N,[o("div",q,[E,o("p",null,l(("t"in s?s.t:r(e))("enter_account_info")),1)]),o("form",{ref:"registro",novalidate:"",onSubmit:i[5]||(i[5]=w(a=>s.registro(),["prevent"]))},[o("div",I,[o("input",{class:n(["form-control",{"is-valid":s.isNombreValid}]),type:"text",placeholder:("t"in s?s.t:r(e))("nombre"),required:"",onInput:i[0]||(i[0]=a=>s.form.nombre=a.target.value)},null,42,A),o("label",null,l(("t"in s?s.t:r(e))("nombre")),1)]),o("div",$,[o("input",{ref:"email",class:n(["form-control",{"is-valid":s.isEmailValid,"is-invalid":s.form.error}]),type:"email",placeholder:("t"in s?s.t:r(e))("correo"),autocomplete:"email",required:"",onInput:i[1]||(i[1]=a=>s.form.email=a.target.value),onKeyup:i[2]||(i[2]=a=>s.form.error=!1)},null,42,B),o("label",null,l(("t"in s?s.t:r(e))("correo")),1),s.form.error?(u(),d("div",M,l(("t"in s?s.t:r(e))("correo_existe")),1)):b("",!0)]),o("div",S,[o("input",{class:n(["form-control",{"is-valid":s.isPasswordValid}]),type:"password",placeholder:("t"in s?s.t:r(e))("password"),autocomplete:"new-password",required:"",onInput:i[3]||(i[3]=a=>s.form.password=a.target.value)},null,42,T),o("label",null,l(("t"in s?s.t:r(e))("password")),1)]),o("div",j,[o("input",{class:n(["form-control",{"is-valid":s.isPasswordCheckValid}]),type:"password",placeholder:("t"in s?s.t:r(e))("password_check"),autocomplete:"off",required:"",onInput:i[4]||(i[4]=a=>s.form.password_check=a.target.value)},null,42,D),o("label",null,l(("t"in s?s.t:r(e))("password_check")),1)]),o("div",O,[o("input",{class:"btn btn-primary mb-4",type:"submit",role:"button",value:("t"in s?s.t:r(e))("registrate")},null,8,z)])],544),o("p",H,[m(l(("t"in s?s.t:r(e))("tiene_cuenta"))+" ",1),p(f,{class:"text-primary",to:"/"},{default:v(()=>[m(l(("t"in s?s.t:r(e))("ingresa")),1)]),_:1})]),o("p",K,[o("small",null,l(("t"in s?s.t:r(e))("nota2")),1)])]),p(h,{message:("t"in s?s.t:r(e))("iniciando_sesion")},null,8,["message"])])}}});export{Q as default};
