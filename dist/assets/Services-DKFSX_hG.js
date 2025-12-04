import{R as a,u as p,r as g,j as e}from"./index-CwN6xw2H.js";const o=a.memo(function({icon:t,title:n,desc:l,linkText:i,linkHref:c="/"}){const d=p(),[m,r]=g.useState(!1),x=()=>{d(c),window.scrollTo({top:0,behavior:"smooth"})};return e.jsxs("button",{className:`tile ${m?"hovered":""} 
        flex flex-col justify-between w-full
        max-w-[300px] sm:max-w-[350px] md:max-w-[400px]
        rounded-[12px] p-3 sm:p-5 md:p-5 lg:p-6 xl:p-[30px]
        bg-white cursor-pointer border-none text-left shadow-sm
      `,onMouseEnter:()=>r(!0),onMouseLeave:()=>r(!1),onClick:x,children:[e.jsxs("div",{className:"flex sm:flex-row flex-col justify-center gap-2 sm:gap-4 ",children:[e.jsx("div",{className:"sm:mx-0 mx-auto  w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex-shrink-0",children:t&&e.jsx("img",{loading:"lazy",src:t,alt:"",className:"max-w-full max-h-full object-contain",width:"144",height:"144",decoding:"async"})}),e.jsxs("div",{className:"flex flex-col md:justify-between gap-1 md:min-h-37",children:[e.jsx("h3",{className:"text-[17px] sm:text-start text-center sm:text-base md:text-lg font-medium text-[#242424]",children:n}),e.jsx("p",{className:"text-[15px] xl:text-[16px] sm:text-start text-center text-[#5C5C5C]",children:l}),i&&e.jsxs("span",{className:"text-sm mt-2 sm:mt-3 font-semibold flex sm:justify-start justify-center items-center gap-1 pb-3 text-[#266DDF] hover:text-blue-700",children:[i,e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor",className:"w-3 h-3 sm:w-4 sm:h-4 -rotate-[35deg]",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13 7l5 5m0 0l-5 5m5-5H6"})})]})]})]}),e.jsx("style",{children:`
        .tile {
          position: relative;
          border: 1px solid #C4D9F9;
          transition: box-shadow 250ms ease, border 250ms ease;
        }
        .tile.hovered {
          border: 1px solid transparent;
          background:
            linear-gradient(#FFFFFF, #FFFFFF) padding-box,
            linear-gradient(135deg,
              rgba(248, 2, 0, 0.85) 0%,
              rgba(248, 186, 1, 0.85) 33%,
              rgba(50, 171, 21, 0.85) 66%,
              rgba(65, 132, 237, 0.85) 100%
            ) border-box;
          background-origin: border-box;
          background-clip: padding-box, border-box;
          box-shadow: 0 8px 20px rgba(0,0,0,0.10);
        }
        .tile::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 12px;
          pointer-events: none;
          background: linear-gradient(90deg,
            rgba(248,2,0,0.08) 0%,
            rgba(248,186,1,0.10) 25%,
            rgba(50,171,21,0.10) 50%,
            rgba(65,132,237,0.10) 75%,
            rgba(248,2,0,0.08) 100%
          );
          background-size: 250% 100%;
          background-position: 0% 50%;
          opacity: 0;
          transform: scale(0.98);
          transition: opacity 250ms ease, transform 260ms ease;
        }
        .tile.hovered::before {
          opacity: 1;
          transform: scale(1.0);
          animation: sweepLeftRight 1.25s ease-out forwards;
        }
        @keyframes sweepLeftRight {
          0%   { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .tile, .tile::before { transition: none !important; }
        }
      `})]})});o.displayName="Tile";const u="/assets/Tile1-C_FIJaPX.svg",f="/assets/Tile2-u9yvobW8.svg",h="/assets/Tile3-f4sdOamW.svg",b="/assets/Tile4-oVg91T2I.svg",v="/assets/Tile5-CpaMEIC8.svg",w="/assets/Tile6-BioZW4Lw.svg",k=[{icon:u,title:"AMC",desc:"Your vehicle's yearly care plan - simple, affordable, dependable.",linkText:"Buy AMC",linkHref:"/vehicle-amc"},{icon:f,title:"Mechanic",desc:"Locate verified mechanics near you for instant repairs at home or on-road.",linkText:"View Details",linkHref:"/mechanic"},{icon:b,title:"Tow Truck",desc:"Stuck on the road? Get fast, GPS-tracked towing support anytime.",linkText:"View Details",linkHref:"/tow-truck"},{icon:w,title:"E-Commerce",desc:"One-stop shop for all your vehicle accessories, parts & maintenance products.",linkText:"View Details",linkHref:"/e-commerce"},{icon:h,title:"Petrol Pump",desc:"Find nearby fuel stations and get fuel delivery in selected areas.",linkText:"View Details",linkHref:"/petrol-pump"},{icon:v,title:"Service Center",desc:"Book appointments with trusted car & bike service centers in your city.",linkText:"View Details",linkHref:"/service-center"}],j=a.memo(()=>e.jsx("div",{className:"justify-items-center pt-7 md:pt-10 pb-10 mt-4 sm:mt-6 md:mt-4 h-auto bg-[#FFFFFF] duration-300 transition-all ease-in",children:e.jsxs("div",{className:"container",children:[e.jsx("h1",{className:"text-2xl md:text-3xl lg:text-4xl font-medium text-center text-[#242424]",children:"Our Main Services"}),e.jsx("div",{className:"flex items-center justify-center",children:e.jsx("p",{className:"text-[14px] sm:text-lg md:text-md text-[#5C5C5C] text-center pt-2 md:pt-4 lg:w-[50%] md:w-[60%] w-[90%]",children:"Explore a full range of essential vehicle and home services — from mechanic support to doorstep repairs, towing, payments, and more."})}),e.jsx("div",{className:"mt-7 sm:mt-8 md:mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-[30px] justify-items-center",children:k.map((s,t)=>e.jsx(o,{...s},t))})]})}));j.displayName="Services";export{j as default};
