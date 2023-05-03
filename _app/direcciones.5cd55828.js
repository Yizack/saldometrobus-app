import $ from"./Icon.d53b07dc.js";import{f as l,m as s,p as c,u as p,w as D,r as C,v as S,F as g,y as b,K as u,C as k,I as E,t as f,o as i,h as w,c as I,x as j,J as K,T as U}from"./entry.fda4de5f.js";import"./config.f3c25afd.js";var M=function d(e,t){if(e===t)return!0;if(e&&t&&typeof e=="object"&&typeof t=="object"){if(e.constructor!==t.constructor)return!1;var n,r,h;if(Array.isArray(e)){if(n=e.length,n!=t.length)return!1;for(r=n;r--!==0;)if(!d(e[r],t[r]))return!1;return!0}if(e.constructor===RegExp)return e.source===t.source&&e.flags===t.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===t.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===t.toString();if(h=Object.keys(e),n=h.length,n!==Object.keys(t).length)return!1;for(r=n;r--!==0;)if(!Object.prototype.hasOwnProperty.call(t,h[r]))return!1;for(r=n;r--!==0;){var a=h[r];if(!d(e[a],t[a]))return!1}return!0}return e!==e&&t!==t};const A="__googleMapsScriptId";var v;(function(d){d[d.INITIALIZED=0]="INITIALIZED",d[d.LOADING=1]="LOADING",d[d.SUCCESS=2]="SUCCESS",d[d.FAILURE=3]="FAILURE"})(v||(v={}));class _{constructor({apiKey:e,authReferrerPolicy:t,channel:n,client:r,id:h=A,language:a,libraries:y=[],mapIds:o,nonce:m,region:O,retries:T=3,url:N="https://maps.googleapis.com/maps/api/js",version:R}){if(this.CALLBACK="__googleMapsCallback",this.callbacks=[],this.done=!1,this.loading=!1,this.errors=[],this.apiKey=e,this.authReferrerPolicy=t,this.channel=n,this.client=r,this.id=h||A,this.language=a,this.libraries=y,this.mapIds=o,this.nonce=m,this.region=O,this.retries=T,this.url=N,this.version=R,_.instance){if(!M(this.options,_.instance.options))throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(_.instance.options)}`);return _.instance}_.instance=this}get options(){return{version:this.version,apiKey:this.apiKey,channel:this.channel,client:this.client,id:this.id,libraries:this.libraries,language:this.language,region:this.region,mapIds:this.mapIds,nonce:this.nonce,url:this.url,authReferrerPolicy:this.authReferrerPolicy}}get status(){return this.errors.length?v.FAILURE:this.done?v.SUCCESS:this.loading?v.LOADING:v.INITIALIZED}get failed(){return this.done&&!this.loading&&this.errors.length>=this.retries+1}createUrl(){let e=this.url;return e+=`?callback=${this.CALLBACK}`,this.apiKey&&(e+=`&key=${this.apiKey}`),this.channel&&(e+=`&channel=${this.channel}`),this.client&&(e+=`&client=${this.client}`),this.libraries.length>0&&(e+=`&libraries=${this.libraries.join(",")}`),this.language&&(e+=`&language=${this.language}`),this.region&&(e+=`&region=${this.region}`),this.version&&(e+=`&v=${this.version}`),this.mapIds&&(e+=`&map_ids=${this.mapIds.join(",")}`),this.authReferrerPolicy&&(e+=`&auth_referrer_policy=${this.authReferrerPolicy}`),e}deleteScript(){const e=document.getElementById(this.id);e&&e.remove()}load(){return this.loadPromise()}loadPromise(){return new Promise((e,t)=>{this.loadCallback(n=>{n?t(n.error):e(window.google)})})}loadCallback(e){this.callbacks.push(e),this.execute()}setScript(){if(document.getElementById(this.id)){this.callback();return}const e=this.createUrl(),t=document.createElement("script");t.id=this.id,t.type="text/javascript",t.src=e,t.onerror=this.loadErrorCallback.bind(this),t.defer=!0,t.async=!0,this.nonce&&(t.nonce=this.nonce),document.head.appendChild(t)}reset(){this.deleteScript(),this.done=!1,this.loading=!1,this.errors=[],this.onerrorEvent=null}resetIfRetryingFailed(){this.failed&&this.reset()}loadErrorCallback(e){if(this.errors.push(e),this.errors.length<=this.retries){const t=this.errors.length*Math.pow(2,this.errors.length);console.log(`Failed to load Google Maps script, retrying in ${t} ms.`),setTimeout(()=>{this.deleteScript(),this.setScript()},t)}else this.onerrorEvent=e,this.callback()}setCallback(){window.__googleMapsCallback=this.callback.bind(this)}callback(){this.done=!0,this.loading=!1,this.callbacks.forEach(e=>{e(this.onerrorEvent)}),this.callbacks=[]}execute(){if(this.resetIfRetryingFailed(),this.done)this.callback();else{if(window.google&&window.google.maps&&window.google.maps.version){console.warn("Google Maps already loaded outside @googlemaps/js-api-loader.This may result in undesirable behavior as options and script parameters may not match."),this.callback();return}this.loading||(this.loading=!0,this.setCallback(),this.setScript())}}}const P={class:"text-center p-2"},F={class:"bg-body-tertiary border rounded p-2 mb-2 shadow"},B={class:"form-floating"},L=["placeholder"],x={class:"form-floating"},G=["placeholder"],V={class:"d-grid mt-2"},q={class:"btn btn-primary",type:"submit"},J=["src"],Z=["onClick"],z={class:"d-flex rutas-mibus bg-body-tertiary border rounded rounded p-2"},W={class:"fw-bold m-0"},H={class:"d-flex align-items-center flex-wrap"},Q={key:0,class:"travel_icon",src:"https://maps.gstatic.com/mapfiles/transit/iw2/6/walk.png",width:"20",height:"20"},X={key:1,class:"d-flex align-items-center flex-wrap"},Y=["src"],ee={key:0},te={class:"my-2 small"},se={class:"text-end"},ie={class:"text-primary fw-bold m-0"},re={class:"small m-0 me-2"},oe={key:0},ne={class:"h-100 me-2"},le={class:"w-100"},ae={class:"fw-bold"},ce={class:"small"},de={key:0},he={class:"my-2 d-flex align-items-center"},ue={class:"border-start ps-2"},me={class:"fw-bold"},pe={class:"small"},fe={class:"m-0"},ge={class:"m-0"},ye={key:1},_e={data(){return{form:{origin:"",destination:""},directions:{geocoded_waypoints:[],routes:[]},selected:null}},methods:{getDirections(){if(k.isOnline()){const d=this.form.origin.trim(),e=this.form.destination.trim();new _({apiKey:E.maps_key,version:"weekly"}).load().then(n=>{const r=new n.maps.DirectionsService,h={origin:d,destination:e,travelMode:"TRANSIT",unitSystem:n.maps.UnitSystem.METRIC,region:"pa",provideRouteAlternatives:!0};r.route(h,(a,y)=>{y===n.maps.DirectionsStatus.OK&&(this.directions=a)})}).catch(n=>{k.showToast({message:n.message})})}else k.showToast({message:f("error_conexion")})},selectRoute(d){this.selected=this.selected!==d?d:null}}},ke=Object.assign(_e,{__name:"direcciones",setup(d){return(e,t)=>{const n=$;return i(),l("section",null,[s("h4",P,[s("b",null,c(("t"in e?e.t:p(f))("direcciones")),1)]),s("div",F,[s("form",{onSubmit:t[2]||(t[2]=D(r=>e.getDirections(),["prevent"]))},[s("div",B,[C(s("input",{"onUpdate:modelValue":t[0]||(t[0]=r=>e.form.origin=r),class:"form-control rounded-top",placeholder:("t"in e?e.t:p(f))("location"),required:""},null,8,L),[[S,e.form.origin]]),s("label",null,c(("t"in e?e.t:p(f))("location")),1)]),s("div",x,[C(s("input",{"onUpdate:modelValue":t[1]||(t[1]=r=>e.form.destination=r),class:"form-control rounded-bottom rounded-top-0",placeholder:("t"in e?e.t:p(f))("destino"),required:""},null,8,G),[[S,e.form.destination]]),s("label",null,c(("t"in e?e.t:p(f))("destino")),1)]),s("div",V,[s("button",q,c(("t"in e?e.t:p(f))("buscar")),1)])],32)]),e.directions.routes.length?(i(),l(g,{key:0},[s("iframe",{class:"rounded border",src:`https://www.google.com/maps/embed/v1/directions?origin=place_id:${e.directions.geocoded_waypoints[0].place_id}&destination=place_id:${e.directions.geocoded_waypoints[1].place_id}&mode=transit&units=metric&language=${("t"in e?e.t:p(f))("lang_code")}&region=pa&key=${("CONST"in e?e.CONST:p(E)).maps_key}`,width:"100%",height:"400px",allowfullscreen:"",loading:"lazy",referrerpolicy:"no-referrer-when-downgrade"},null,8,J),(i(!0),l(g,null,b(e.directions.routes,(r,h)=>(i(),l("div",{key:h,class:"mb-2",role:"button",onClick:a=>e.selectRoute(h)},[s("div",z,[(i(!0),l(g,null,b(r.legs,(a,y)=>(i(),l("div",{key:y,class:"flex-grow-1"},[s("h5",W,c(a.departure_time.text)+" - "+c(a.arrival_time.text),1),s("div",H,[(i(!0),l(g,null,b(a.steps,(o,m)=>(i(),l("div",{key:m,class:"d-flex align-items-center flex-wrap"},[m<a.steps.length-1?(i(),l(g,{key:0},[o.travel_mode==="WALKING"?(i(),l("img",Q)):u("",!0),o.travel_mode==="TRANSIT"?(i(),l("div",X,[s("img",{class:"travel_icon",src:o.transit.line.vehicle.icon,width:"20",height:"20"},null,8,Y),o.transit?(i(),l("div",ee,[s("div",te,[s("span",{class:"px-1 rounded shadow-sm",style:w({backgroundColor:o.transit.line.color,color:o.transit.line.text_color})},c(o.transit.line.short_name),5)])])):u("",!0)])):u("",!0),m<a.steps.length-2?(i(),I(n,{key:2,name:"material-symbols:chevron-right"})):u("",!0)],64)):u("",!0)]))),128))])]))),128)),s("div",se,[s("h4",ie,c(r.legs[0].duration.text),1),s("p",re,"("+c(r.legs[0].distance.text)+")",1)])]),j(U,{name:"t",mode:"out-in"},{default:K(()=>[h===e.selected?(i(),l("div",oe,[(i(!0),l(g,null,b(r.legs,(a,y)=>(i(),l("div",{key:y,class:"bg-body-tertiary rounded border shadow p-3 mt-1"},[(i(!0),l(g,null,b(a.steps,(o,m)=>(i(),l("div",{key:m,class:"d-flex position-relative"},[s("div",ne,[m<a.steps.length-1?(i(),l(g,{key:0},[o.travel_mode==="WALKING"?(i(),l("div",{key:0,class:"me-2 rounded position-absolute bg-primary",style:w({width:"10px",left:"3px",bottom:0,top:"1.5rem",height:"calc(100% - 1.5rem)"})},null,4)):u("",!0),o.travel_mode==="TRANSIT"?(i(),l("div",{key:1,class:"me-2 rounded position-absolute",style:w({backgroundColor:o.transit.line.color||"var(--border)",width:"10px",left:"3px",bottom:0,top:"1.5rem",height:"calc(100% - 1.5rem)"})},null,4)):u("",!0)],64)):u("",!0),m<a.steps.length-1?(i(),I(n,{key:1,name:"ic:outline-circle"})):(i(),I(n,{key:2,name:"ic:baseline-radio-button-checked"}))]),s("div",le,[s("div",null,[s("div",ae,c(o.instructions),1),s("div",ce,c(o.duration.text)+" ("+c(o.distance.text)+")",1)]),o.transit?(i(),l("div",de,[s("div",he,[s("div",{class:"p-1 rounded shadow-sm fw-bold me-2",style:w({backgroundColor:o.transit.line.color,color:o.transit.line.text_color})},c(o.transit.line.short_name),5),s("div",ue,[s("div",me,c(o.transit.line.name),1),s("div",pe,[s("p",fe,c(("t"in e?e.t:p(f))("departure"))+": "+c(o.transit.departure_stop.name),1),s("p",ge,c(("t"in e?e.t:p(f))("arrival"))+": "+c(o.transit.arrival_stop.name),1)])])])])):u("",!0),m<a.steps.length-1?(i(),l("hr",ye)):u("",!0)])]))),128))]))),128))])):u("",!0)]),_:2},1024)],8,Z))),128))],64)):u("",!0)])}}});export{ke as default};
