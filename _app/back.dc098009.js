import l from"./Icon.10e85218.js";import{i as o,o as s,f as r,m as n,x as c,p as _,u as p,R as d,t as m}from"./entry.7031e3e9.js";import"./config.e2ba8976.js";const u={name:"NavBar",props:{title:{type:String,required:!0}}},f={class:"navbar navbar-dark navbar-expand-lg bg-primary sticky-top shadow-sm"},b={class:"container-fluid"},v={class:"navbar-brand me-auto"};function $(t,e,a,x,B,g){const i=l;return s(),r("nav",f,[n("div",b,[n("a",{class:"text-white pe-4 display-6",role:"button",onClick:e[0]||(e[0]=N=>t.$router.back())},[c(i,{class:"d-flex",name:"material-symbols:arrow-back-sharp"})]),n("span",v,_(a.title),1)])])}const k=o(u,[["render",$]]),h={};function y(t,e){const a=k;return s(),r("main",null,[c(a,{title:("t"in t?t.t:p(m))(t.$route.meta.nav_title)},null,8,["title"]),d(t.$slots,"default")])}const q=o(h,[["render",y]]);export{q as default};