import React, { Suspense, lazy } from "react";
const HoverCards = lazy(() => import("./HoverCards"));
const GetHelp = () => {
  return (
    <div className="md:py-10 flex flex-col items-center pt-9 md:mt-4 ">
      <div className="w-full">
        <div className="text-center mb-6 sm:mb-8 md:mb-7">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-center text-[#242424] px-15">
            Get Help on the Go in 3 Simple Steps
          </h1>
          <div className="">
            <p className="text-[14px] sm:text-lg text-[#5C5C5C] text-center px-4 pt-2 md:pt-4">
            Find nearby services, make a quick payment, and let our provider
            reach you — right where you are.
          </p>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#266DDF]"></div>
            </div>
          }
        >
          <HoverCards />
        </Suspense>
      </div>
    </div>
  );
};
export default GetHelp;
