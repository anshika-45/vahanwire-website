import React, { Suspense, useEffect, useState } from "react";
import TowTruckBanner from "../assets/TowTruck.svg";
const PageBanner = React.lazy(() => import("../components/PageBanner"));

const TowTruck = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true);
    img.src = TowTruckBanner;
  }, []);

  return (
    <>
      <div>
          <PageBanner 
            title="Coming Soon" 
            image={TowTruckBanner}
            imageLoaded={imageLoaded}
          />

        <div className="mt-6 md:mt-12 lg:mt-12 xl:mt-0" />
      </div>
    </>
  );
};

export default TowTruck;