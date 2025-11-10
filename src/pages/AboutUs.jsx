import React, { Suspense } from "react";
import aboutBanner from "../assets/about-us-banner.webp";
import aboutAppImage from "../assets/about-us-side.webp";
const AddBanner = React.lazy(() => import("../components/AddBanner"));
const PageBanner = React.lazy(() => import("../components/PageBanner"));

const ComponentFallback = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-pulse bg-gray-200 rounded-lg h-32 w-full max-w-4xl"></div>
  </div>
);

const AboutUs = () => {
  return (
    <>
      <div>
        <Suspense fallback={<ComponentFallback />}>
          <PageBanner title="About Us" image={aboutBanner} />
        </Suspense>
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
          <div>
            <h2 className="text-2xl md:text-5xl font-semibold text-[#242424] mb-6">
              About Us
            </h2>
            <p className="text-sm sm:text-base text-[#5C5C5C] leading-relaxed mb-4">
              This website www.vahanwire.com (“Website”) and
              its mobile application (“Application”) are owned and operated by
              Vahanwire Technologies Pvt. Ltd., a company
              incorporated under the laws of India, having its corporate office
              at TOWER-B-819 Noida One, Industrial Area, Sector 62, Noida, Uttar
              Pradesh 201309, India.
            </p>

            <p className="text-sm sm:text-base text-[#5C5C5C] leading-relaxed mb-4">
              VahanWire enables users to connect with mechanics, multi-branded
              service centers, tow providers, and petrol pump establishments
              offering varied automotive services. Through our platform, users
              can easily book, track, and manage services with trusted
              providers.
            </p>

            <p className="text-sm sm:text-base text-[#5C5C5C] leading-relaxed">
              These terms and conditions govern your access to and use of the
              Website and Application. By using the Website/Application, you
              acknowledge that VahanWire acts as a digital platform facilitating
              the connection between users and service providers, and holds no
              liability for the quality, fitness, or conduct of the services
              provided.
            </p>
          </div>
          <div className="flex justify-center md:justify-center">
            <div className="relative">
              <img
                src={aboutAppImage}
                alt="VahanWire App Interface"
                className="w-[260px] md:w-[260px] lg:w-[300px] drop-shadow-2xl h-full rounded-[2rem] lg:scale-200"
                loading="lazy"
                width={300}  
                height={600}
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mt-20">
        <Suspense fallback={<ComponentFallback />}>
          <AddBanner />
        </Suspense>
      </div> */}
    </>
  );
};

export default AboutUs;