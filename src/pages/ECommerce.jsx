import React, { Suspense, useEffect, useState } from "react";
import EcommerceBanner from "../assets/Ecommerce.svg";
const PageBanner = React.lazy(() => import("../components/PageBanner"));

const Ecommerce = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true);
    img.src = EcommerceBanner;
  }, []);

  return (
    <>
      <div className="w-full">
          <PageBanner
            title="Coming Soon"
            image={EcommerceBanner}
            useGradientTitle={true}
            useDarkOverlay={true}
            showTicker={true}
            imageLoaded={imageLoaded}
          />
        <div className="mt-6 md:mt-12 lg:mt-12 xl:mt-0" />
      </div>
    </>
  );
};

export default Ecommerce;