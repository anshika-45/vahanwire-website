import React, { Suspense, lazy } from "react";
const ChooseUs = React.lazy(() => import("./ChooseUs"));
const WhyChooseUs = () => {
  return (
    <div className="justify-items-center md:pt-12 pt-9 pb-8 md:pb-10 h-auto bg-[#FAFCFF]">
      <div className="container">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-center text-[#242424]">
          Why Choose Us?
        </h1>
        <div className="flex items-center justify-center">
          <p className="text-[14px] sm:text-lg text-[#5C5C5C] text-center pt-2 md:pt-4 hidden lg:block">
          Vahanwire began in 2019 to simplify access to mechanics, fuel, and
          vehicle services. Today, we lead India's app-based <br /> automotive
          service market with a 70% share, helping the nation move smarter.
        </p>
          <p className="text-[14px] sm:text-lg text-[#5C5C5C] text-center pt-2 md:pt-4 md:w-[60%] w-[90%] block lg:hidden">
          Vahanwire began in 2019 to simplify access to mechanics, fuel, and
          vehicle services. Today, we lead India's app-based automotive
          service market with a 70% share, helping the nation move smarter.
        </p>
        </div>
        
      </div>
      <div className="mt-5 md:mt-10 lg:mt-6 w-full">
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
  );
};
export default WhyChooseUs;
