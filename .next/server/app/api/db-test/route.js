"use strict";(()=>{var e={};e.id=816,e.ids=[816],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},82375:(e,t,r)=>{r.r(t),r.d(t,{originalPathname:()=>x,patchFetch:()=>b,requestAsyncStorage:()=>l,routeModule:()=>c,serverHooks:()=>h,staticGenerationAsyncStorage:()=>m});var o={};r.r(o),r.d(o,{GET:()=>u,dynamic:()=>d,runtime:()=>p});var s=r(73278),a=r(45002),n=r(54877),i=r(71309);async function u(){try{return i.NextResponse.json({message:"Database connection removed. Please implement a new database solution."})}catch(e){return console.error("Error:",e),i.NextResponse.json({error:"An error occurred while processing your request"},{status:500})}}let p="nodejs",d="force-dynamic",c=new s.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/db-test/route",pathname:"/api/db-test",filename:"route",bundlePath:"app/api/db-test/route"},resolvedPagePath:"/Users/michaelbraian/Documents/VisualStudioCode/Bolt2/app/api/db-test/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:l,staticGenerationAsyncStorage:m,serverHooks:h}=c,x="/api/db-test/route";function b(){return(0,n.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:m})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[379,833],()=>r(82375));module.exports=o})();