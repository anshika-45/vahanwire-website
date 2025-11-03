import React, { Suspense } from "react";
const Banner = React.lazy(() => import("../components/Banner"));
const Services = React.lazy(() => import("../components/Services"));
const LatestOffer = React.lazy(() => import("../components/LatestOffer"));
const TrustandResult = React.lazy(() => import("../components/TrustandResult"));
const WhyChooseUs = React.lazy(() => import("../components/WhyChooseUs"));
const GetHelp = React.lazy(() => import("../components/GetHelp"));
const AmcBanner = React.lazy(() => import("../components/AmcBanner"));
const Faq = React.lazy(() => import("../components/Faq"));
const AddBanner = React.lazy(() => import("../components/AddBanner"));
const VideoSection = React.lazy(() => import("../components/VideoSection"));
const ComponentFallback = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-pulse bg-gray-200 rounded-lg h-32 w-full max-w-4xl"></div>
  </div>
);
const Homepage = () => {
  return (
    <div>
      <Suspense fallback={<ComponentFallback />}>
        <Banner />
      </Suspense>
      <div className="mt-4 sm:mt-6 md:mt-4">
        <Suspense fallback={<ComponentFallback />}>
          <Services />
        </Suspense>
      </div>
      <div className="mt-4 sm:mt-6 md:mt-4">
        <Suspense fallback={<ComponentFallback />}>
          <LatestOffer />
        </Suspense>
      </div>
      <div className="mt-4 sm:mt-6 md:mt-4">
        <Suspense fallback={<ComponentFallback />}>
          <TrustandResult />
        </Suspense>
      </div>
      <div className="mt-4 sm:mt-6 md:mt-4">
        <Suspense fallback={<ComponentFallback />}>
          <WhyChooseUs />
        </Suspense>
      </div>
      <div className="mt-4 sm:mt-6 md:mt-4">
        <Suspense fallback={<ComponentFallback />}>
          <GetHelp />
        </Suspense>
      </div>
      <div className="mt-4 sm:mt-6 md:mt-4">
        <Suspense fallback={<ComponentFallback />}>
          <AmcBanner />
        </Suspense>
      </div>
      <div className="mt-4 sm:mt-6 md:mt-4">
        <Suspense fallback={<ComponentFallback />}>
          <VideoSection />
        </Suspense>
      </div>
      <div className="mt-4 sm:mt-6 md:mt-4">
        <Suspense fallback={<ComponentFallback />}>
          <Faq />
        </Suspense>
      </div>
      <div className="mt-20">
        <Suspense fallback={<ComponentFallback />}>
          <AddBanner />
        </Suspense>
      </div>
    </div>
  );
};

export default Homepage;
