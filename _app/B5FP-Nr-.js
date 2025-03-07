import{_ as L}from"./DhEdULM1.js";import{_ as O}from"./B9B-OaP-.js";import{_ as R}from"./Dgu_aBXO.js";import{J as z,A as E,K as y,L as G,M as H,D as U,c as _,b as v,H as h,p as k,w as f,e as t,a,t as p,o as d,j as T,v as C,h as A,T as J,f as s,F as Q,r as W,i as X,k as j,C as c,s as S,l as B,m as M,O as Y}from"./Czg0Q_ZR.js";import{u as Z}from"./C8RZ1v4a.js";import"./B7g_wYYe.js";import"./DlAUqK2U.js";const x={class:"input-group"},ee=["value"],te={class:"ms-2 my-0"},se={key:1,class:"m-0"},oe=["value"],ae={class:"mb-3 position-relative form-floating"},ne=["placeholder"],re={class:"invalid-tooltip"},le={class:"mb-3 form-floating"},ie=["placeholder"],ue={class:"mb-3 form-floating"},de=["placeholder"],pe={class:"d-grid"},me={class:"btn btn-primary",type:"submit",role:"button"},ce=["value"],_e={key:2,class:"d-grid"},we={key:3,class:"text-center mt-3"},ve={class:"small m-0"},Ae=z({__name:"perfil",setup(fe){const r=E(),V=y(""),b=y({nombre:!1}),i=y({nombre:r.user.nombre,email:r.user.email,token:r.user.token,tarjetas:[]}),l=Z({current_password:"",new_password:"",password_check:"",error:!1}),P=G(()=>l.value.new_password.length>=3&&l.value.current_password!==l.value.new_password&&l.value.current_password.length>0),N=G(()=>P.value&&l.value.new_password===l.value.password_check),w=y(),q=async()=>{var e,o,u,m,g;if(b.value.nombre=!b.value.nombre,i.value.nombre=i.value.nombre.trim(),b.value.nombre){const n=i.value.nombre.length;(e=w.value)==null||e.setSelectionRange(n,n),(o=w.value)==null||o.focus(),(u=w.value)==null||u.removeAttribute("readonly")}else{if(i.value.nombre!==r.user.nombre){const{error:n,error_key:K}=await j.updateName({nombre:i.value.nombre,email:r.user.email,token:r.user.token||""});n?(i.value.nombre=r.user.nombre,await c.showToast(s(K))):(r.updateName(i.value.nombre),await c.showToast(s("name_updated")))}(m=w.value)==null||m.setAttribute("readonly","true"),(g=w.value)==null||g.blur()}},D=y(),F=async()=>{var e;if(P.value&&N.value){V.value=s("updating_pass"),S("progress-dialog");const{error:o,error_key:u}=await j.userPassUpdate({current_password:l.value.current_password,new_password:l.value.new_password,email:r.user.email,token:r.user.token});o?(u==="pass_error"&&(l.value.error=!0,(e=D.value)==null||e.focus()),await c.showToast(s(u),"long")):(await c.showToast(s("pass_updated"),"long"),l.reset())}await B(.5),M("progress-dialog")},I=e=>{e.currentTarget.select(),c.writeToClipboard(i.value.token)},$=async()=>{if(await c.confirm(s("delete_account"),s("delete_account_sure"))){V.value=s("deleting_account"),S("progress-dialog");const{error:o,error_key:u}=await j.deleteAccount({email:r.user.email,token:r.user.token});o?(await c.showToast(s(u)),await B(.5),M("progress-dialog")):(await U.deleteAll(),await r.logout(),await c.showToast(s("account_deleted")),await B(.5),M("progress-dialog"),Y("/",{replace:!0}))}};return H(async()=>{i.value.tarjetas=await U.getTarjetas()}),(e,o)=>{const u=L,m=O,g=R;return d(),_("section",null,[v(m,{title:("t"in e?e.t:t(s))("perfil")},{default:f(()=>[a("div",x,[T(a("input",{ref_key:"nombre",ref:w,"onUpdate:modelValue":o[0]||(o[0]=n=>t(i).nombre=n),class:"form-control py-2",type:"text",readonly:""},null,512),[[C,t(i).nombre]]),t(r).isGuest?k("",!0):(d(),_("button",{key:0,class:A(["btn btn-sm",t(b).nombre?"btn-success":"btn-secondary"]),style:{width:"3rem"},onClick:o[1]||(o[1]=n=>q())},[v(J,{name:"tab",mode:"out-in"},{default:f(()=>[t(b).nombre?(d(),h(u,{key:0,name:"check"})):(d(),h(u,{key:1,name:"edit"}))]),_:1})],2))])]),_:1},8,["title"]),v(m,{title:("t"in e?e.t:t(s))("correo")},{default:f(()=>[a("input",{value:t(i).email,class:"form-control py-2",type:"text",readonly:""},null,8,ee)]),_:1},8,["title"]),v(m,{title:("t"in e?e.t:t(s))("tarjetas_vinculadas")},{default:f(()=>[t(i).tarjetas.length?(d(!0),_(Q,{key:0},W(t(i).tarjetas,n=>(d(),_("div",{key:n.numero,class:"d-flex align-items-center"},[v(u,{name:"card"}),a("p",te,p(n.numero)+" ("+p(n.nombre)+")",1)]))),128)):(d(),_("p",se,p(("t"in e?e.t:t(s))("no_tarjetas")),1))]),_:1},8,["title"]),t(r).isGuest?k("",!0):(d(),h(m,{key:0,title:("t"in e?e.t:t(s))("password")},{default:f(()=>[a("form",{novalidate:"",onSubmit:X(F,["prevent"])},[a("input",{type:"text",class:"d-none",name:"email",value:t(r).user.email,autocomplete:"email"},null,8,oe),a("div",ae,[T(a("input",{ref_key:"current",ref:D,"onUpdate:modelValue":o[2]||(o[2]=n=>t(l).current_password=n),class:A(["form-control",{"is-invalid":t(l).error}]),type:"password",autocomplete:"password",placeholder:("t"in e?e.t:t(s))("current_pass"),required:"",onKeyup:o[3]||(o[3]=n=>t(l).error=!1)},null,42,ne),[[C,t(l).current_password]]),a("label",null,p(("t"in e?e.t:t(s))("current_pass")),1),a("div",re,p(("t"in e?e.t:t(s))("pass_error")),1)]),a("div",le,[T(a("input",{"onUpdate:modelValue":o[4]||(o[4]=n=>t(l).new_password=n),class:A(["form-control",{"is-valid":t(P)}]),type:"password",autocomplete:"new-password",placeholder:("t"in e?e.t:t(s))("new_pass"),required:""},null,10,ie),[[C,t(l).new_password]]),a("label",null,p(("t"in e?e.t:t(s))("new_pass")),1)]),a("div",ue,[T(a("input",{"onUpdate:modelValue":o[5]||(o[5]=n=>t(l).password_check=n),class:A(["form-control",{"is-valid":t(N)}]),type:"password",autocomplete:"off",placeholder:("t"in e?e.t:t(s))("password_check"),required:""},null,10,de),[[C,t(l).password_check]]),a("label",null,p(("t"in e?e.t:t(s))("password_check")),1)]),a("div",pe,[a("button",me,p(("t"in e?e.t:t(s))("change_pass")),1)])],32)]),_:1},8,["title"])),t(r).isGuest?k("",!0):(d(),h(m,{key:1,title:("t"in e?e.t:t(s))("account_id")},{default:f(()=>[a("input",{value:t(i).token,class:"form-control py-2",type:"text",readonly:"",onClick:o[6]||(o[6]=n=>I(n))},null,8,ce)]),_:1},8,["title"])),t(r).isGuest?k("",!0):(d(),_("div",_e,[a("button",{class:"btn btn-danger mt-2",onClick:$},p(("t"in e?e.t:t(s))("delete_account")),1)])),t(r).isGuest?(d(),_("div",we,[a("p",ve,[a("small",null,p(("t"in e?e.t:t(s))("nota")),1)])])):k("",!0),v(g,{message:t(V)},null,8,["message"])])}}});export{Ae as default};
