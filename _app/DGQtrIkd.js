import{_ as N}from"./BiS9Ry5k.js";import{_ as T}from"./tzKW_5jg.js";import{J as q,A,L as d,X as M,c as b,a as s,b as g,t as l,e as o,i as P,j as m,v as u,h as p,p as U,d as _,w as B,o as y,f as a,s as D,l as E,m as S,O as L,C as O}from"./BxHSU3yY.js";import{_ as R}from"./VtunLRVk.js";import{u as j}from"./C-CxHx5g.js";import"./DlAUqK2U.js";const z={class:"container-fluid text-center"},F={class:"py-2"},I={class:"mb-3 form-floating"},J=["placeholder"],K={class:"mb-3 position-relative form-floating"},X=["placeholder"],$={key:0,class:"invalid-tooltip"},G={class:"mb-3 form-floating"},H=["placeholder"],Q={class:"mb-3 form-floating"},W=["placeholder"],Y={class:"d-grid mt-4"},Z=["value"],x={class:"mb-3"},ee={class:"mb-3"},ne=q({__name:"registro",setup(oe){const k=A(),t=j({nombre:"",email:"",password:"",password_check:"",error:!1}),v=d(()=>{const e=t.value.nombre;return e.length>0&&e.length<=50}),c=d(()=>t.value.password.length>=3),f=d(()=>c.value&&t.value.password===t.value.password_check),h=d(()=>{const e=document.createElement("input");return e.type="email",e.required=!0,e.value=t.value.email,e.checkValidity()}),w=M("email"),V=async()=>{var e;if(v.value&&h.value&&c.value&&f.value){D("progress-dialog");const{error:r,error_key:n}=await k.registro({nombre:t.value.nombre,email:t.value.email,password:t.value.password});await E(.5),S("progress-dialog"),r?(n==="correo_existe"&&(t.value.error=!0,(e=w.value)==null||e.focus()),await O.showToast(a(n),"long")):L("/app/",{replace:!0})}};return(e,r)=>{const n=N,C=T;return y(),b("section",null,[s("div",z,[s("div",F,[r[5]||(r[5]=s("img",{class:"img-fluid shadow-sm my-3 rounded bg-body",width:"90",height:"90",src:R},null,-1)),s("p",null,l(("t"in e?e.t:o(a))("enter_account_info")),1)]),s("form",{novalidate:"",onSubmit:P(V,["prevent"])},[s("div",I,[m(s("input",{"onUpdate:modelValue":r[0]||(r[0]=i=>o(t).nombre=i),class:p(["form-control",{"is-valid":o(v)}]),type:"text",placeholder:("t"in e?e.t:o(a))("nombre"),required:""},null,10,J),[[u,o(t).nombre,void 0,{trim:!0}]]),s("label",null,l(("t"in e?e.t:o(a))("nombre")),1)]),s("div",K,[m(s("input",{ref_key:"email",ref:w,"onUpdate:modelValue":r[1]||(r[1]=i=>o(t).email=i),class:p(["form-control",{"is-valid":o(h),"is-invalid":o(t).error}]),type:"email",placeholder:("t"in e?e.t:o(a))("correo"),autocomplete:"email",required:"",onKeyup:r[2]||(r[2]=i=>o(t).error=!1)},null,42,X),[[u,o(t).email,void 0,{trim:!0}]]),s("label",null,l(("t"in e?e.t:o(a))("correo")),1),o(t).error?(y(),b("div",$,l(("t"in e?e.t:o(a))("correo_existe")),1)):U("",!0)]),s("div",G,[m(s("input",{"onUpdate:modelValue":r[3]||(r[3]=i=>o(t).password=i),class:p(["form-control",{"is-valid":o(c)}]),type:"password",placeholder:("t"in e?e.t:o(a))("password"),autocomplete:"new-password",required:""},null,10,H),[[u,o(t).password]]),s("label",null,l(("t"in e?e.t:o(a))("password")),1)]),s("div",Q,[m(s("input",{"onUpdate:modelValue":r[4]||(r[4]=i=>o(t).password_check=i),class:p(["form-control",{"is-valid":o(f)}]),type:"password",placeholder:("t"in e?e.t:o(a))("password_check"),autocomplete:"off",required:""},null,10,W),[[u,o(t).password_check]]),s("label",null,l(("t"in e?e.t:o(a))("password_check")),1)]),s("div",Y,[s("input",{class:"btn btn-primary mb-4",type:"submit",role:"button",value:("t"in e?e.t:o(a))("registrate")},null,8,Z)])],32),s("p",x,[_(l(("t"in e?e.t:o(a))("tiene_cuenta"))+" ",1),g(n,{class:"text-primary",to:"/"},{default:B(()=>[_(l(("t"in e?e.t:o(a))("ingresa")),1)]),_:1})]),s("p",ee,[s("small",null,l(("t"in e?e.t:o(a))("nota2")),1)])]),g(C,{message:("t"in e?e.t:o(a))("iniciando_sesion")},null,8,["message"])])}}});export{ne as default};
