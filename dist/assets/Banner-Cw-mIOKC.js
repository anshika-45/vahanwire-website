import{r as a,j as e,R as v}from"./index-FS6cpKeu.js";import{S as b}from"./images-ErPs11Bh.js";function w({texts:t=[],interval:l=1600,outMs:c=360,inMs:x=560,className:o=""}){const[s,f]=a.useState(0),[n,r]=a.useState("idle"),[d,u]=a.useState(1),i=a.useRef(null);if(!t||t.length===0)return null;if(t.length===1)return e.jsx("div",{className:`relative overflow-visible h-20 sm:h-24 md:h-26 ${o}`,style:{lineHeight:1.2,display:"flex",alignItems:"center",paddingBottom:"8px"},children:e.jsx("span",{className:`absolute inset-0 flex items-start text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight
                     bg-gradient-to-r from-[#1E9600] via-[#FFF200] to-[#FF0000]
                     bg-clip-text text-transparent whitespace-nowrap leading-[1.2] align-middle`,children:t[0]})});a.useEffect(()=>(i.current&&clearTimeout(i.current),n==="idle"&&(i.current=setTimeout(()=>r("out"),l)),()=>i.current&&clearTimeout(i.current)),[n,l]);const m=t[s],g=(s+1)%t.length;a.useEffect(()=>{n==="out"&&u(g)},[n,s,t.length]);const h=()=>r("in"),p=()=>{f(d),r("idle")};return e.jsxs("div",{className:`relative overflow-hidden h-20 sm:h-24 md:h-28 pl-5 ${o}`,style:{lineHeight:1.2,display:"flex",alignItems:"center",paddingBottom:"8px"},"aria-live":"polite",children:[n==="idle"&&e.jsx("div",{className:"absolute inset-0 flex items-center",children:e.jsx("span",{className:`text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight
                       bg-gradient-to-r from-[#1E9600] via-[#FFF200] to-[#FF0000]
                       bg-clip-text text-transparent whitespace-nowrap leading-[1.2] align-middle`,children:m})}),n==="out"&&e.jsx("div",{className:"absolute inset-0 flex items-center will-change-transform",style:{animation:`fadeUpOut ${c}ms ease-in forwards`},onAnimationEnd:h,children:e.jsx("span",{className:`text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight
                       bg-gradient-to-r from-[#1E9600] via-[#FFF200] to-[#FF0000]
                       bg-clip-text text-transparent whitespace-nowrap leading-[1.2] align-middle`,children:m})}),n==="in"&&e.jsx("div",{className:"absolute inset-0 flex items-center will-change-transform",style:{animation:`slideUpInBounce ${x}ms cubic-bezier(0.22,1,0.36,1) forwards`},onAnimationEnd:p,children:e.jsx("span",{className:`text-5xl sm:text-7xl md:text-8xl font-medium tracking-tight
                       bg-gradient-to-r from-[#1E9600] via-[#FFF200] to-[#FF0000]
                       bg-clip-text text-transparent whitespace-nowrap leading-[1.2] align-middle`,children:t[d]})}),e.jsx("style",{children:`
        @keyframes fadeUpOut {
          0%   { transform: translateY(0%);    opacity: 1; }
          100% { transform: translateY(-65%);  opacity: 0; }
        }
        @keyframes slideUpInBounce {
          0%   { transform: translateY(120%); opacity: 0; }
          45%  { transform: translateY(-22%); opacity: 1; }
          70%  { transform: translateY(10%); }
          85%  { transform: translateY(-4%); }
          100% { transform: translateY(0%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .will-change-transform { animation: none !important; }
        }
      `})]})}const j=["Car Service","Bike Repairs","Towing Help","Emergency Fuel"],y=v.memo(()=>e.jsx("div",{className:"relative w-full",children:e.jsx("div",{children:e.jsx("div",{className:"relative w-full h-[300px] md:h-[500px]  bg-center bg-cover overflow-hidden bg-gray-100",style:{backgroundImage:`url(${b.HOME_BANNER})`,willChange:"background-image",contentVisibility:"auto"},children:e.jsx("div",{className:"container",children:e.jsx("div",{className:"absolute md:left-0 left-3.5 top-1/2 -translate-y-1/2 text-white w-full",children:e.jsxs("div",{className:"container",children:[e.jsxs("h1",{className:"text-3xl sm:text-5xl md:text-5xl leading-tight drop-shadow-lg py-2 md:my-4 font-semibold",children:["Your One-Stop ",e.jsx("br",{})," Solution for"]}),e.jsx("div",{className:"max-w-[350px] md:max-w-[450px]",children:e.jsx(a.Suspense,{fallback:e.jsx("div",{className:"h-16 md:h-24"}),children:e.jsx(w,{texts:j,interval:500,duration:1e3,outMs:360,inMs:540,animationClass:"scale-90",className:"transform origin-center transition-transform duration-400 overflow-visible text-4xl sm:text-6xl md:text-7xl font-semibold"})})})]})})})})})}));y.displayName="Banner";export{y as default};
