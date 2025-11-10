import React, { Suspense } from "react";
import privacyPolicyBanner from "../assets/privacy-policy-banner.webp";
const AddBanner = React.lazy(() => import("../components/AddBanner"));
const PageBanner = React.lazy(() => import("../components/PageBanner"));
const TwoColumnInfoLayout = React.lazy(() =>
  import("../components/TwoColumnInfoLayout")
);

const ComponentFallback = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-pulse bg-gray-200 rounded-lg h-32 w-full max-w-4xl"></div>
  </div>
);

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Booking a Mechanic Online",
      content: [
        "Third-party Links: VahanWire is not responsible for any malicious or unsecured links published by service providers.",
        "Service Provider Profiles: Providers must create a profile containing accurate personal and professional information as required by VahanWire.",
        "Communication Channel: All communication between users and service providers must occur via VahanWire’s platform. If a provider attempts direct personal contact, VahanWire disclaims all responsibility.",
        "Use of Information: Providers may be offered the option to permit VahanWire to use their information for promotional or advertising purposes, based on their profile type (e.g., aggregator, banking accounts).",
        "Professional Advice: Providers may offer professional advice to users, subject to VahanWire’s discretion.",
        "Secure Payment: All payment modes supported on VahanWire use 100% secured connections.",
        "Cookies: VahanWire may use cookies to analyze user behavior and preferences to enhance your platform experience.",
        "Legal Disclosure: VahanWire may disclose personal details of a service provider if required under legal obligations.",
        "Data Retention: No data is retained about service providers after account termination.",
        "Misconduct: Any user-reported misbehavior by a provider will be reviewed, and VahanWire may blacklist the provider following an investigation.",
        "Payment Liability: If a user refuses to pay after a service is completed, VahanWire will ensure full payment is made to the mechanic.",
        "Service Negligence: If a service provider fails to respond to user calls, VahanWire may impose a fine of ₹75 (subject to change).",
      ],
    },
    {
      title: "Refund Eligibility",
      content: [
        "If you wish to cancel your AMC and request a refund, the following conditions will apply:",
        "Refund Request Timeline: Refund requests must be submitted in writing within 15 days from the date of AMC purchase.",
        "Scrutiny and Evaluation: Each refund request will undergo a thorough review which may take up to 30 days. VahanWire reserves the right to evaluate the usage and services availed under the AMC before processing any refund.",
        "Deduction and Charges: If a refund is approved, VahanWire will deduct applicable charges, which may include:",
        "Pro-rata charges for the duration services were provided",
        "Any material costs incurred",
        "Administrative and processing fees ₹100",
        "Non-Refundable Cases: Refunds will not be applicable under the following circumstances:",
        "If the AMC has been fully utilized.",
        "If the first services were availed.",
        "If the request is made after the expiry of the AMC period.",
      ],
    },
    {
      title: "Mode Of Refund",
      content: [
        "Approved refunds will be processed through the original method of payment or any other mode agreed upon with the customer.",
      ],
    },
    {
      title: "Timeline For Refund",
      content: ["Refunds, once approved, will be processed within 30 working days."],
    },
    {
      title: "Contact For Refund Requests",
      content: [
        "To initiate a refund request, please contact our support team at: Email: amc@vahanwire.com",
        "In the case of a refund request after buying AMC, after careful scrutiny, VahanWire will be liable to pay to the customer after deducting all applicable charges.",
        "Additional Services: VahanWire may provide information about extra services available at listed petrol pumps, at its discretion.",
        "Defective Services: VahanWire is not responsible for any issues or faulty services provided by petrol pump staff.",
      ],
    },
    {
      title: "AMC (Annual Maintenance Contract) Plan Privacy",
      content: [
        "Data Collection: When subscribing to an AMC plan, you must submit vehicle, contact, and payment information. This data is stored securely and used solely to fulfill contract obligations.",
        "Use of Data: Your data will be used to track service history, schedule maintenance, provide reminders, and generate relevant offers. No data will be sold or misused.",
        "Third-party Disclosure: Information may be shared with authorized service centers strictly for the execution of AMC services. All partners are contractually obligated to comply with data protection standards.",
      ],
    },
    {
      title: "Security",
      content: [
        "We employ encryption, secure payment gateways, and access control protocols to ensure your data remains protected.",
      ],
    },
  ];

  return (
    <div className="bg-[rgba(244,244,244,1)]">
      <div className="mt-[60px] sm:mt-[60px] md:mt-[80px]">
        <Suspense fallback={<ComponentFallback />}>
          <PageBanner title="Privacy Policy" image={privacyPolicyBanner} />
        </Suspense>
      </div>

      <div>
        <Suspense fallback={<ComponentFallback />}>
          <TwoColumnInfoLayout title="Privacy Policy" sections={sections} />
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

export default PrivacyPolicy;
