import React, { useRef, useState, useCallback, useMemo } from "react";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";

const TwoColumnInfoLayout = ({ sections, title = "Contents" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRefs = useRef([]);
  const scrollContainerRef = useRef(null);

  const handleScrollTo = useCallback((index) => {
    setActiveIndex(index);

    setTimeout(() => {
      const target = contentRefs.current[index];
      const container = scrollContainerRef.current;

      if (target && container) {
        const targetOffset = target.offsetTop - container.offsetTop - 8;

        container.scrollTo({
          top: targetOffset,
          behavior: "smooth",
        });
      }
    }, 0);
  }, []);

  const memoizedSections = useMemo(() => sections, [sections]);

  // Desktop only scroll sync
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (window.innerWidth < 768) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.3,
        rootMargin: "0px 0px -20% 0px",
      }
    );

    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, [memoizedSections]);

  return (
    <div className="
      max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-20 
      grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8 md:gap-10">

      {/* SIDEBAR */}
      <aside className="hidden md:block bg-white rounded-lg h-fit sticky top-[180px]
                       shadow-sm border border-[#E9F0FC] max-h-[600px] overflow-y-auto hide-scrollbar">

        <h3 className="text-sm font-semibold text-[#242424] px-4 py-4 border-b border-[#E9F0FC]">
          {title}
        </h3>

        <ul className="flex flex-col">
          {memoizedSections.map((section, index) => {
            const isActive = activeIndex === index;

            return (
              <li key={index}>
                <button
                  onClick={() => handleScrollTo(index)}
                  className={`flex items-center justify-between w-full px-4 py-4 text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-[#E9F0FC] text-[#266DDF] font-medium"
                      : "text-[#242424] hover:bg-[#F0F6FF]"
                  }`}
                >
                  <span className="text-left truncate">
                    {index + 1}. {section.title}
                  </span>

                  <ChevronRight
                    size={16}
                    className={`transition-transform duration-200 ${
                      isActive ? "text-[#266DDF]" : "text-gray-400 rotate-90"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* RIGHT SIDE */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="h-auto md:h-[600px] md:max-h-[600px] overflow-y-auto pr-2 md:pr-4 space-y-3 scroll-smooth hide-scrollbar"
        >
          {memoizedSections.map((section, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                ref={(el) => (contentRefs.current[index] = el)}
                data-index={index}
              >
                {/* MOBILE ACCORDION HEADER */}
                <button
                  className="md:hidden w-full flex items-center justify-between bg-white p-3 border rounded-lg shadow-sm"
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? -1 : index)
                  }
                >
                  <span className="text-left font-medium text-[#242424]">
                    {index + 1}. {section.title}
                  </span>

                  <ChevronRight
                    size={18}
                    className={`transition-transform ${
                      isActive ? "rotate-90 text-[#266DDF]" : "text-gray-400"
                    }`}
                  />
                </button>

                {/* CONTENT BOX */}
                <div
                  className={`rounded-lg p-2 md:p-6 bg-white border border-[#266DDF] transition-all duration-300 overflow-hidden ${
                    isActive
                      ? "md:border-[#266DDF] border-[#E9F0FC]"
                      : "md:border-transparent border-[#F0F0F0] md:hover:border-[#266DDF]"
                  } ${
                    isActive
                      ? "max-h-[1500px] md:max-h-fit opacity-100"
                      : "max-h-0 md:max-h-fit opacity-0 md:opacity-100"
                  } md:opacity-100`}
                >
                  <h4 className="text-lg md:text-xl font-semibold text-[#242424]">
                    {index + 1}. {section.title}
                  </h4>

                  <div className="text-sm text-gray-700 leading-relaxed space-y-3 text-justify">
                    {section.content.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default React.memo(TwoColumnInfoLayout);
