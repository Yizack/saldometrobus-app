import{_ as h}from"./CnUzxyLA.js";import{_ as y}from"./QiGDHC6T.js";import{K as C,A as _,M as T,c as N,a as o,b as m,t as i,e,i as A,j as u,v as c,w as O,R as g,o as S,f as t,C as v,B as w,d as k,s as L,l as V,m as B}from"./BxewTVV3.js";import{_ as M}from"./CSEwA1bg.js";const P={class:"container-fluid text-center"},R={class:"py-4"},D={class:"mb-3 position-relative form-floating"},I=["placeholder"],q={class:"invalid-tooltip"},F={class:"mb-3 position-relative form-floating"},U=["placeholder"],$={class:"invalid-tooltip"},j={class:"d-grid gap-2 mt-5 mt-auto"},E={class:"btn btn-primary",type:"submit",role:"button"},K={class:"mt-4 small"},W=C({__name:"index",setup(z){const p=_(),n=T({email:"",password:""}),b=async s=>{const a=s.currentTarget;if(!a.checkValidity())return a.classList.add("was-validated");L("progress-dialog");const{error:r,error_key:d}=await p.login({email:n.value.email,password:n.value.password});await V(.5),B("progress-dialog"),r?(await v.showToast(t(d),"long"),a.classList.remove("was-validated")):(a.classList.add("was-validated"),g("/app/",{replace:!0}))},f=async()=>{await p.guestLogin(),g("/app/",{replace:!0})};return(s,a)=>{const r=h,d=y;return S(),N("section",null,[o("div",P,[o("div",R,[a[3]||(a[3]=o("img",{class:"img-fluid shadow-sm my-3 p-2 rounded bg-body",width:"90",height:"90",src:M},null,-1)),o("h1",null,[o("b",null,i(("t"in s?s.t:e(t))("app_name")),1)]),o("p",null,i(("t"in s?s.t:e(t))("enter_email_password")),1)]),o("form",{novalidate:"",onSubmit:A(b,["prevent"])},[o("div",D,[u(o("input",{"onUpdate:modelValue":a[0]||(a[0]=l=>e(n).email=l),class:"form-control",type:"email",placeholder:("t"in s?s.t:e(t))("correo"),name:"email",autocomplete:"email",required:""},null,8,I),[[c,e(n).email]]),o("label",null,i(("t"in s?s.t:e(t))("correo")),1),o("div",q,i(("t"in s?s.t:e(t))("correo_incorrecto")),1)]),o("div",F,[u(o("input",{"onUpdate:modelValue":a[1]||(a[1]=l=>e(n).password=l),class:"form-control",type:"password",placeholder:("t"in s?s.t:e(t))("password"),name:"password",autocomplete:"current-password",minlength:"3",required:""},null,8,U),[[c,e(n).password]]),o("label",null,i(("t"in s?s.t:e(t))("password")),1),o("div",$,i(("t"in s?s.t:e(t))("password_limit")),1)]),o("div",j,[o("button",E,i(("t"in s?s.t:e(t))("login")),1),o("a",{class:"text-primary my-2",role:"button",onClick:a[2]||(a[2]=l=>("CAPACITOR"in s?s.CAPACITOR:e(v)).openBrowser(`${("CONST"in s?s.CONST:e(w)).url}/cuenta?s=restaurar`))},i(("t"in s?s.t:e(t))("olvido_pass")),1),m(r,{class:"btn btn-success",role:"button",to:"/registro/"},{default:O(()=>[k(i(("t"in s?s.t:e(t))("registrate")),1)]),_:1}),o("button",{class:"btn btn-secondary",type:"button",role:"button",onClick:f},i(("t"in s?s.t:e(t))("no_registro")),1)])],32),o("div",K,[o("i",null,i(("t"in s?s.t:e(t))("version"))+": "+i(("CONST"in s?s.CONST:e(w)).version),1)])]),m(d,{message:("t"in s?s.t:e(t))("iniciando_sesion")},null,8,["message"])])}}});export{W as default};
