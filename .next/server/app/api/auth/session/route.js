"use strict";(()=>{var e={};e.id=603,e.ids=[603],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},27790:e=>{e.exports=require("assert")},78893:e=>{e.exports=require("buffer")},84770:e=>{e.exports=require("crypto")},17702:e=>{e.exports=require("events")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},86624:e=>{e.exports=require("querystring")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},77479:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>m,patchFetch:()=>g,requestAsyncStorage:()=>x,routeModule:()=>d,serverHooks:()=>h,staticGenerationAsyncStorage:()=>q});var s={};t.r(s),t.d(s,{GET:()=>c,runtime:()=>l});var o=t(73278),n=t(45002),i=t(54877),a=t(71309),u=t(4128),p=t(88131);async function c(){try{let e=await (0,u.getServerSession)(p.L);return a.NextResponse.json(e?{session:e}:{session:null})}catch(e){return console.error("Error in session route:",e),a.NextResponse.json({error:"Internal Server Error"},{status:500})}}let l="nodejs",d=new o.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/auth/session/route",pathname:"/api/auth/session",filename:"route",bundlePath:"app/api/auth/session/route"},resolvedPagePath:"/Users/michaelbraian/Documents/VisualStudioCode/Bolt2/app/api/auth/session/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:x,staticGenerationAsyncStorage:q,serverHooks:h}=d,m="/api/auth/session/route";function g(){return(0,i.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:q})}},88131:(e,r,t)=>{t.d(r,{L:()=>s});let s={providers:[(0,t(22571).Z)({clientId:process.env.GOOGLE_CLIENT_ID,clientSecret:process.env.GOOGLE_CLIENT_SECRET})],secret:process.env.NEXTAUTH_SECRET,session:{strategy:"database",maxAge:1800},debug:!1,callbacks:{session:async({session:e,user:r})=>(e.user&&(e.user.id=r.id,e.user.role=r.role),e)}}}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[379,833,513,781],()=>t(77479));module.exports=s})();