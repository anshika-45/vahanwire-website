import React, { Suspense, lazy, useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Announcementbanner from "../components/Announcementbanner";
import Header from "../components/Header";
import Navvar from "../components/Navvar";
import Footer from "../components/Footer";
import Snowfall from "../components/Snowfall";
import ChristmasAnimation from "../components/ChristmasAnimation";
import SantaSleigh from "../components/SantaSleigh";

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
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Snowfall />
      <SantaSleigh />

      {/* These render instantly (no loader) */}
      <Announcementbanner />

      <div ref={stackRef} className="sticky top-0 w-full left-0 right-0 z-40">
        <Header />
        <Navvar />
        <ChristmasAnimation />
      </div>

      {!isHome && (
        <Suspense fallback={<ComponentFallback />}>
          <BreadcrumbBar />
        </Suspense>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <div className="relative">
        <Suspense fallback={<ComponentFallback />}>
          <AddBanner />
        </Suspense>

        <Footer />
      </div>
    </div>
  );
}
