import React, { Suspense } from "react";
import EcommerceBanner from "../assets/Ecommerce.svg";
const PageBanner = React.lazy(() => import("../components/PageBanner"));

const ComponentFallback = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-pulse bg-gray-200 rounded-lg h-32 w-full max-w-4xl"></div>
  </div>
);

const Ecommerce = () => {
  return (
    <>
      <div className="w-full">
        <Suspense fallback={<ComponentFallback />}>

          <PageBanner
            title="Coming Soon"
            image={EcommerceBanner}
            useGradientTitle={true}
            useDarkOverlay={true}
            showTicker={true} 
          
          />
        </Suspense>
        <div className="mt-6 md:mt-12 lg:mt-12 xl:mt-0" />

      </div>
    </>
  );
};

export default Ecommerce;
