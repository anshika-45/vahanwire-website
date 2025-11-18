import React from "react";
import PageBanner from "../components/PageBanner";
import EcommerceBanner from "../assets/Ecommerce.svg";

const Ecommerce = () => {
  return (
    <div className="w-full">
      <PageBanner
        title="Coming Soon"
        image={EcommerceBanner}
        useGradientTitle={true}
        useDarkOverlay={true}
        showTicker={true} 
        loading="eager"
      />
      <div className="mt-6 md:mt-12 lg:mt-12 xl:mt-0" />
    </div>
  );
};

export default Ecommerce;