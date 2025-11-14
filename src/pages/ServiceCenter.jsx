import React, { Suspense } from "react";
import ServiceCenterBanner from "../assets/ServiceCenter.svg";
const PageBanner = React.lazy(() => import("../components/PageBanner"));

const ComponentFallback = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-pulse bg-gray-200 rounded-lg h-32 w-full max-w-4xl"></div>
  </div>
);

const ServiceCenter = () => {
  return (
    <>
      <div>
        <Suspense fallback={<ComponentFallback />}>
          <PageBanner title="Coming Soon" image={ServiceCenterBanner} useGradientTitle={true}
  useDarkOverlay={true}
 />
        </Suspense>
                <div className="mt-6 md:mt-18 lg:mt-12 xl:mt-0" />
      </div>
    </>
  );
};

export default ServiceCenter;