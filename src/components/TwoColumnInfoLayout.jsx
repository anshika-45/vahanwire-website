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

  // React.useEffect(() => {
  //   const container = scrollContainerRef.current;
  //   if (!container) return;

  //   const observers = [];
  //   const options = {
  //     root: container,
  //     rootMargin: "-20% 0px -60% 0px",
  //     threshold: 0.5,
  //   };

  //   const handleIntersect = (entries) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         const index = parseInt(entry.target.dataset.index);
  //         setActiveIndex(index);
  //       }
  //     });
  //   };

  //   const observer = new IntersectionObserver(handleIntersect, options);

  //   contentRefs.current.forEach((ref, index) => {
  //     if (ref) {
  //       ref.dataset.index = index;
  //       observer.observe(ref);
  //       observers.push(observer);
  //     }
  //   });

  //   return () => {
  //     observers.forEach((obs) => obs.disconnect());
  //   };
  // }, [memoizedSections]);

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

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
    <div className="max-w-[1300px] mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-8 md:gap-10">
      <aside className="bg-white rounded-lg md:h-fit h-[400px] lg:sticky top-[180px] self-start shadow-sm border border-[#E9F0FC] max-h-[600px] overflow-y-auto hide-scrollbar">
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
                      isActive ? " text-[#266DDF]" : "text-gray-400 rotate-90"
                    }`}
                    aria-label={isActive ? "Expanded" : "Collapsed"}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="max-h-[600px] md:h-auto h-[300px] overflow-y-auto pr-2 md:pr-4 space-y-8 scroll-smooth hide-scrollbar"
          onScroll={() => {}}
        >
          {memoizedSections.map((section, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                ref={(el) => (contentRefs.current[index] = el)}
                data-index={index}
                className=""
              >
                <div
                  className={`rounded-lg p-6 bg-white border transition-colors ${
                    isActive
                      ? "border-[#266DDF]"
                      : "border-transparent hover:border-[#266DDF]"
                  }`}
                >
                  <h4 className="text-lg md:text-xl font-semibold text-[#242424] mb-3">
                    {index + 1}. {section.title}
                  </h4>
                  <div className="text-sm text-gray-700 leading-relaxed space-y-3">
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
