import React, { useState } from "react";
import plusIcon from "../assets/PlusIcon.svg";
import minusIcon from "../assets/MinusIcon.svg";
import AddBanner from "./AddBanner";
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="bg-white max-w-6xl mx-auto mt-3 sm:mt-4 md:mt-6 rounded-lg mb-2 overflow-hidden border-white md:ml-30 md:mr-30">
      <button
        onClick={onClick}
        className="w-full text-left px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 flex justify-between items-center text-black font-semibold text-sm sm:text-base md:text-lg focus:outline-none"
      >
        {question}
        <img
          loading="lazy"
          src={isOpen ? minusIcon : plusIcon}
          alt={isOpen ? "minus" : "plus"}
          className="w-5 sm:w-6 md:w-7 h-5 sm:h-6 md:h-7 ml-2 flex-shrink-0"
        />
      </button>
      {isOpen && (
        <p className="px-3 sm:px-4 md:px-5 pb-3 text-gray-700 text-xs sm:text-sm md:text-base">
          {answer}
        </p>
      )}
    </div>
  );
};
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      question: "What is Vahanwire and how does it work?",
      answer: "Vahanwire is an on-demand roadside assistance and mechanic service platform where users can instantly raise a service request for any vehicle-related issue. Whether it’s a jump start, towing, puncture repair, battery problem, or a general breakdown — Vahanwire connects you with verified mechanics anytime, anywhere. Vahanwire services are available 24/7, including weekends and holidays (based on mechanic availability in your area.",
    },
    {
      question: "Can I book emergency services like towing or on-road repairs?",
      answer:
        "Yes, Vahanwire provides 24/7 emergency roadside assistance, including towing, jump start, flat-tyre repair, battery issues, and on-spot mechanical help. Just select your service and share your location — a verified mechanic will reach you quickly.",
    },
    {
      question: "What is an AMC and why should I buy it?",
      answer: "An AMC (Annual Maintenance Contract) is a prepaid roadside assistance plan that covers essential vehicle services like jump start, towing, puncture repair, battery help, and minor mechanical issues throughout the year. Buying an AMC ensures zero service charges, priority support, and complete peace of mind during any breakdown — anytime, anywhere.",
    },
    {
      question: "How do I pay for services on Vahanwire?",
      answer: "You can pay securely through Vahanwire using UPI, debit/credit cards, net banking, or other digital payment options powered by our trusted payment gateway. Once the service is completed, you can make the payment directly in the app — fast, safe, and hassle-free.",
    },
    {
      question: "Are the service providers verified?",
      answer: "Yes. Every service provider on Vahanwire is fully verified through a strict onboarding process that includes identity checks, KYC verification, skill assessment, and service-quality validation. Only trusted and experienced mechanics are allowed to serve users on the platform.",
    },
    {
      question: "Can I track the provider once I book a service?",
      answer: "Yes. After your booking is confirmed, you can track the provider’s live location on the map in real time. You’ll see their distance, estimated arrival time (ETA), and movement as they travel toward your location.",
    },
    {
      question: "Do I need to install a separate app for different services?",
      answer: "No. You don’t need multiple apps. All vehicle services on Vahanwire — including towing, jump start, puncture repair, battery help, and on-spot mechanical repairs — are available inside one single app for your convenience.",
    },
  ];
  return (
    <div className=" bg-[#F4F4F4] md:pt-9 md:pb-11 py-10  ">
      <div className="container">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-4 text-black text-center pb-2 sm:pb-3">
          Frequently Asked Questions
        </h2>
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};
export default FAQ;
