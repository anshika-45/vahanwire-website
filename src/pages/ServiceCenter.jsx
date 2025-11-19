import React, { Suspense } from "react";
import ServiceCenterBanner from "../assets/ServiceCenter.svg";
const PageBanner = React.lazy(() => import("../components/PageBanner"));

const ServiceCenter = () => {
  return (
    <>
      <div>
       
          <PageBanner title="Coming Soon" image={ServiceCenterBanner} useGradientTitle={true}
 />
        
        <div className="mt-6 md:mt-12 lg:mt-12 xl:mt-0" />
      </div>
    </>
  );
};

export default ServiceCenter;