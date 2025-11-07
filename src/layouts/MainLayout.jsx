import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

// Lazy load components for better performance
const Announcementbanner = lazy(() => import("../components/Announcementbanner"));
const Header = lazy(() => import("../components/Header"));
const Navvar = lazy(() => import("../components/Navvar"));
const Footer = lazy(() => import("../components/Footer"));
const BreadcrumbBar = lazy(() => import("../components/BreadcrumbBar"));

// Loading fallback
const ComponentFallback = () => (
  <div className="flex items-center justify-center py-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#266DDF]"></div>
  </div>
);
export default function MainLayout() {
return (
<div className="flex flex-col min-h-screen">
<Suspense fallback={<ComponentFallback />}>
  <Announcementbanner />
</Suspense>
<Suspense fallback={<ComponentFallback />}>
  <Header />
</Suspense>
<Suspense fallback={<ComponentFallback />}>
<Navvar />
</Suspense>
  <Suspense fallback={<ComponentFallback />}>
      <BreadcrumbBar />
      </Suspense>
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Suspense fallback={<ComponentFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}
