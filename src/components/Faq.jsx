import React, { useState } from "react";
import plusIcon from "../assets/plusIcon.webp";
import minusIcon from "../assets/minusIcon.webp";
import AddBanner from "./AddBanner";
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="bg-white max-w-6xl mx-auto mt-3 sm:mt-4 md:mt-6 rounded-lg mb-2 overflow-hidden border-white ">
      <button
        onClick={onClick}
        className="w-full text-left px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 flex justify-between items-center text-black font-medium text-sm sm:text-base md:text-lg focus:outline-none"
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
        <p className="px-3 sm:px-4 md:px-5 pb-3 text-gray-500 text-xs sm:text-sm md:text-base">
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
      question: "What is VahanWire and how does it work?",
      answer: "...",
    },
    {
      question: "Can I book emergency services like towing or on-road repairs?",
      answer:
        "Yes, VahanWire offers 24/7 on-road assistance including towing, jumpstart, flat tire, and emergency fuel delivery — just select the service and share your location.",
    },
    {
      question: "What is an AMC and why should I buy it?",
      answer: "...",
    },
    {
      question: "How do I pay for services on VahanWire?",
      answer: "...",
    },
    {
      question: "Are the service providers verified?",
      answer: "...",
    },
    {
      question: "Can I track the provider once I book a service?",
      answer: "...",
    },
    {
      question: "Do I need to install a separate app for different services?",
      answer: "...",
    },
  ];
  return (
    <div className=" bg-[#F4F4F4] mt-10 pt-8 pb-10">
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
