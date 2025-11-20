import React from "react";
import { S3_IMAGES } from "../constants/images";
import PageBanner from "../components/PageBanner";

const ServiceCenter = () => {
  return (
    <>
      <div>
        <PageBanner
          title="Coming Soon"
          image={S3_IMAGES.SERVICE_BANNER}
          useGradientTitle={true}
        />
        <div className="mt-6 md:mt-12 lg:mt-12 xl:mt-0" />
      </div>
    </>
  );
};

export default ServiceCenter;
