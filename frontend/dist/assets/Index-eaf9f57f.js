import{d as u,u as d,i as _,a as n,c as p,b as a,e as t,h as m,o as g}from"./index-68b6491b.js";import{U as h}from"./UserService-d1854abc.js";const b={class:"w-10/12 mx-auto pt-8"},x=t("header",{class:"mb-10"},[t("h1",{class:"text-3xl text-center py-5 border-b-4"},[t("span",{class:"font-bold"},"Hungriest"),m(" tu lugar favorito")])],-1),w=u({__name:"Index",setup(f){const r=d(),e=_("$cookies"),c=async()=>{if(e){const o=e==null?void 0:e.get("token-hungriest"),s=await h.logout(o);console.log(s),e.remove("token-hungriest"),r.push("/login")}};return(o,s)=>{const i=n("v-btn"),l=n("RouterView");return g(),p("div",b,[a(i,{icon:"mdi-logout",class:"!absolute top-5 right-5 !bg-red-200 hover:!bg-red-500 text-white",onClick:c}),x,a(l)])}}});export{w as default};
