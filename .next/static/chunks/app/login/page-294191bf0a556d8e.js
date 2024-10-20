(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[626],{4097:function(e,r,t){Promise.resolve().then(t.bind(t,6374))},6374:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return c}});var n=t(7437),s=t(2265),a=t(9376),o=t(6070),i=t(2869),u=t(5186),d=t(7992);function c(){let e=(0,a.useRouter)(),{toast:r}=(0,d.p)(),[t,c]=(0,s.useState)(""),[l,f]=(0,s.useState)(!1),m=async n=>{n.preventDefault(),f(!0);try{if((await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:t})})).ok)e.push("/dashboard");else throw Error("Invalid password")}catch(e){console.error("Login error:",e),r({title:"Error",description:"Invalid password. Please try again.",variant:"destructive"})}finally{f(!1)}};return(0,n.jsx)("div",{className:"flex items-center justify-center min-h-screen bg-background",children:(0,n.jsxs)(o.Zb,{className:"w-[400px] shadow-lg",children:[(0,n.jsxs)(o.Ol,{className:"space-y-1",children:[(0,n.jsx)(o.ll,{className:"text-3xl font-bold",children:"Login"}),(0,n.jsx)(o.SZ,{children:"Enter your password to access the dashboard"})]}),(0,n.jsx)(o.aY,{className:"space-y-4",children:(0,n.jsxs)("form",{onSubmit:m,children:[(0,n.jsx)("div",{className:"space-y-2",children:(0,n.jsx)(u.I,{type:"password",placeholder:"Password",value:t,onChange:e=>c(e.target.value),required:!0})}),(0,n.jsx)(i.z,{type:"submit",className:"w-full mt-4",disabled:l,children:l?"Loading...":"Login"})]})})]})})}},2869:function(e,r,t){"use strict";t.d(r,{z:function(){return d}});var n=t(7437),s=t(2265),a=t(7053),o=t(7712),i=t(4508);let u=(0,o.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),d=s.forwardRef((e,r)=>{let{className:t,variant:s,size:o,asChild:d=!1,...c}=e,l=d?a.g7:"button";return(0,n.jsx)(l,{className:(0,i.cn)(u({variant:s,size:o,className:t})),ref:r,...c})});d.displayName="Button"},6070:function(e,r,t){"use strict";t.d(r,{Ol:function(){return i},SZ:function(){return d},Zb:function(){return o},aY:function(){return c},eW:function(){return l},ll:function(){return u}});var n=t(7437),s=t(2265),a=t(4508);let o=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,n.jsx)("div",{ref:r,className:(0,a.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",t),...s})});o.displayName="Card";let i=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,n.jsx)("div",{ref:r,className:(0,a.cn)("flex flex-col space-y-1.5 p-6",t),...s})});i.displayName="CardHeader";let u=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,n.jsx)("h3",{ref:r,className:(0,a.cn)("text-2xl font-semibold leading-none tracking-tight",t),...s})});u.displayName="CardTitle";let d=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,n.jsx)("p",{ref:r,className:(0,a.cn)("text-sm text-muted-foreground",t),...s})});d.displayName="CardDescription";let c=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,n.jsx)("div",{ref:r,className:(0,a.cn)("p-6 pt-0",t),...s})});c.displayName="CardContent";let l=s.forwardRef((e,r)=>{let{className:t,...s}=e;return(0,n.jsx)("div",{ref:r,className:(0,a.cn)("flex items-center p-6 pt-0",t),...s})});l.displayName="CardFooter"},5186:function(e,r,t){"use strict";t.d(r,{I:function(){return o}});var n=t(7437),s=t(2265),a=t(4508);let o=s.forwardRef((e,r)=>{let{className:t,type:s,...o}=e;return(0,n.jsx)("input",{type:s,className:(0,a.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",t),ref:r,...o})});o.displayName="Input"},7992:function(e,r,t){"use strict";t.d(r,{p:function(){return s}});var n=t(2265);function s(){let[e,r]=(0,n.useState)([]);return{toast:e=>{r(r=>[...r,e]),setTimeout(()=>{r(e=>e.slice(1))},3e3)},toasts:e}}},4508:function(e,r,t){"use strict";t.d(r,{cn:function(){return a}});var n=t(1994),s=t(3335);function a(){for(var e=arguments.length,r=Array(e),t=0;t<e;t++)r[t]=arguments[t];return(0,s.m6)((0,n.W)(r))}},9376:function(e,r,t){"use strict";var n=t(5475);t.o(n,"useParams")&&t.d(r,{useParams:function(){return n.useParams}}),t.o(n,"useRouter")&&t.d(r,{useRouter:function(){return n.useRouter}}),t.o(n,"useSearchParams")&&t.d(r,{useSearchParams:function(){return n.useSearchParams}})}},function(e){e.O(0,[37,971,117,744],function(){return e(e.s=4097)}),_N_E=e.O()}]);