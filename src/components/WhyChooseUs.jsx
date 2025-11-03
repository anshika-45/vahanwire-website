import React, { Suspense, lazy } from "react";
const ChooseUs = React.lazy(() => import("./ChooseUs"));
const WhyChooseUs = () => {
  return (
    <div className="bg-[#FAFCFF] min-h-screen md:min-h-[800px] lg:h-[800px] py-12 md:py-16 lg:py-[65px] px-6 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-[1400px] mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#242424]">
          Why Choose Us?
        </h1>
        <p className="text-xs sm:text-sm text-[#5C5C5C] pt-4 max-w-3xl mx-auto">
          VahanWire began in 2019 to simplify access to mechanics, fuel, and
          vehicle services. Today, we lead India's app-based automotive service
          market with a 70% share, helping the nation move smarter.
        </p>
        <div className="mt-8 md:mt-10 lg:mt-4">
          <Suspense fallback={<div className="flex items-center justify-center py-4"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#266DDF]"></div></div>}>
            <ChooseUs />
   </Suspense>
 </div>
      </div>
    </div>
  );
};
export default WhyChooseUs;
