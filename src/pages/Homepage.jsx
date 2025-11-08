import React, { Suspense } from "react";
const Faq = React.lazy(() => import("../components/Faq"));
const Banner = React.lazy(() => import("../components/Banner"));
const GetHelp = React.lazy(() => import("../components/GetHelp"));
const Services = React.lazy(() => import("../components/Services"));
const AddBanner = React.lazy(() => import("../components/AddBanner"));
const LatestOffer = React.lazy(() => import("../components/LatestOffer"));
const WhyChooseUs = React.lazy(() => import("../components/WhyChooseUs"));
const VideoSection = React.lazy(() => import("../components/VideoSection"));
const TrustandResult = React.lazy(() => import("../components/TrustandResult"));

const AmcBanner = React.lazy(() => import("../components/AmcBanner"));
const ComponentFallback = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-pulse bg-gray-200 rounded-lg h-32 w-full max-w-4xl"></div>
  </div>
);
const Homepage = () => {
  const classStyle = "mt-4 sm:mt-6 md:mt-4 duration-300 transition-all ease-in";
  return (
    <div className="">
      <Suspense fallback={<ComponentFallback />}>
        <Banner />
      </Suspense>

      <Suspense fallback={<ComponentFallback />}>
        <Services />
      </Suspense>

      <Suspense fallback={<ComponentFallback />}>
        <LatestOffer />
      </Suspense>

      <Suspense fallback={<ComponentFallback />}>
        <TrustandResult />
      </Suspense>

      <Suspense fallback={<ComponentFallback />}>
        <WhyChooseUs />
      </Suspense>

      <Suspense fallback={<ComponentFallback />}>
        <GetHelp />
      </Suspense>

      <Suspense fallback={<ComponentFallback />}>
        <AmcBanner />
      </Suspense>

      <Suspense fallback={<ComponentFallback />}>
        <VideoSection />
      </Suspense>

      <Suspense fallback={<ComponentFallback />}>
        <Faq />
      </Suspense>

      <Suspense fallback={<ComponentFallback />}>
        <AddBanner />
      </Suspense>
    </div>
  );
};

export default Homepage;
