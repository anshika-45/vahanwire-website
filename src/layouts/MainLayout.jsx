import React, { Suspense, lazy, useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Announcementbanner = lazy(() => import("../components/Announcementbanner"));
const Header = lazy(() => import("../components/Header"));
const Navvar = lazy(() => import("../components/Navvar"));
const Footer = lazy(() => import("../components/Footer"));
const BreadcrumbBar = lazy(() => import("../components/BreadcrumbBar"));
const AddBanner = lazy(() => import("../components/AddBanner")); // ⬅️ NEW

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
      {/* fixed stack */}
      <div ref={stackRef} className="fixed w-full top-0 left-0 right-0 z-40">
        <Suspense fallback={<ComponentFallback />}><Announcementbanner /></Suspense>
        <Suspense fallback={<ComponentFallback />}><Header /></Suspense>
        <Suspense fallback={<ComponentFallback />}><Navvar /></Suspense>
      </div>

      {/* push content below fixed bars */}
      <div style={{ height: topOffset + 14 }} aria-hidden="true" />

      {/* breadcrumb only when NOT home */}
      {!isHome && (
        <Suspense fallback={<ComponentFallback />}>
          <BreadcrumbBar />
        </Suspense>
      )}

      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      {/* AddBanner + Footer block (with slight overlap) */}
      <div className="relative">
        {/* Banner */}
        <Suspense fallback={<ComponentFallback />}>
          <AddBanner />
        </Suspense>

        {/* Footer pulled slightly up to create overlap with banner */}
        <div> 
          <Suspense fallback={<ComponentFallback />}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
