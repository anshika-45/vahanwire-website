import React, { Suspense, useEffect, useState } from "react";
import { S3_IMAGES } from "../constants/images";
const PageBanner = React.lazy(() => import("../components/PageBanner"));

const Ecommerce = () => {

  return (
    <>
      <div>
          <PageBanner
            title="Coming Soon"
            image={S3_IMAGES.ECOMMERCE_BANNER}
            useGradientTitle={true}
            useDarkOverlay={true}
          />
        <div className="mt-6 md:mt-12 lg:mt-12 xl:mt-0" />
      </div>
    </>
  );
};

export default Ecommerce;