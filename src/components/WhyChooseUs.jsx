import React, { Suspense, lazy } from "react";
const ChooseUs = React.lazy(() => import("./ChooseUs"));
const WhyChooseUs = () => {
  return (
    <div className="justify-items-center pt-10 pb-12 mt-4 sm:mt-6 md:mt-4 h-auto bg-[#FFFFFF]">
      <div className="container">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-center text-[#242424]">
          Why Choose Us?
        </h1>
        <p className="text-xs sm:text-lg text-[#5C5C5C] text-center pt-2 md:pt-4">
          VahanWire began in 2019 to simplify access to mechanics, fuel, and
          vehicle services. Today, we lead India's app-based <br/> automotive service
          market with a 70% share, helping the nation move smarter.
        </p>
        <div className="mt-8 md:mt-10 lg:mt-6">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#266DDF]"></div>
              </div>
            }
          >
            <ChooseUs />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default WhyChooseUs;
