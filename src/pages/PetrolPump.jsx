import React, { Suspense, useEffect, useState } from "react";
import PetrolPumpBanner from "../assets/PetrolPump.svg";
const PageBanner = React.lazy(() => import("../components/PageBanner"));

const PetrolPump = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true);
    img.src = PetrolPumpBanner;
  }, []);

  return (
    <>
      <div>
          <PageBanner 
            title="Coming Soon" 
            image={PetrolPumpBanner} 
            useGradientTitle={true}
            useDarkOverlay={true}
            imageLoaded={imageLoaded}
          />
        <div className="mt-6 md:mt-12 lg:mt-12 xl:mt-0" />
      </div>
    </>
  );
};

export default PetrolPump;