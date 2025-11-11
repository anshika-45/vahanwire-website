import React, { Suspense, lazy, useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
const Announcementbanner = lazy(() => import("../components/Announcementbanner"));
const Header = lazy(() => import("../components/Header"));
const Navvar = lazy(() => import("../components/Navvar"));
const Footer = lazy(() => import("../components/Footer"));
const BreadcrumbBar = lazy(() => import("../components/BreadcrumbBar"));
const AddBanner = lazy(() => import("../components/AddBanner")); 

const ComponentFallback = () => (
  <div className="flex items-center justify-center py-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#266DDF]"></div>
  </div>
);

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const stackRef = useRef(null);
  const [topOffset, setTopOffset] = useState(0);

  useLayoutEffect(() => {
    if (!stackRef.current) return;
    const update = () => setTopOffset(stackRef.current.offsetHeight || 0);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(stackRef.current);
    window.addEventListener("resize", update);
    window.addEventListener("load", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("load", update);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="">
              <Suspense fallback={<ComponentFallback />}><Announcementbanner /></Suspense>
      </div>


      <div ref={stackRef} className="sticky top-0 w-full left-0 right-0 z-40"
>
        <Suspense fallback={<ComponentFallback />}><Header /></Suspense>
        <Suspense fallback={<ComponentFallback />}><Navvar /></Suspense>
      </div>

      {!isHome && (
        <Suspense fallback={<ComponentFallback />}>
          <BreadcrumbBar />
        </Suspense>
      )}

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
     
      <div className="relative">
        <Suspense fallback={<ComponentFallback />}>
          <AddBanner />
        </Suspense>

        
        <div> 
          <Suspense fallback={<ComponentFallback />}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
