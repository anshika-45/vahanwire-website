import React, { useEffect, useRef, useState } from "react";
export default function AnimatedTextTicker({
  texts = [],
  interval = 1600,  
  outMs = 360,     
  inMs = 560,        
  className = "",   
}) {
  const [index, setIndex] = useState(0);              
  const [phase, setPhase] = useState("idle");         
  const [incomingIndex, setIncomingIndex] = useState(1); 
  const timerRef = useRef(null);
  if (!texts || texts.length === 0) return null;
  if (texts.length === 1) {
    return (
      <div className={`relative overflow-visible h-20 sm:h-24 md:h-26 pl-4 ${className}`} style={{ lineHeight: 1 }}>
        <span className="absolute inset-0 flex items-center
                         text-5xl sm:text-7xl md:text-8xl font-md tracking-tight
                         bg-gradient-to-r from-[#1E9600] via-[#FFF200] to-[#FF0000]
                         bg-clip-text text-transparent whitespace-nowrap">
          {texts[0]}
        </span>
      </div>
    );
  }
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (phase === "idle") {
      timerRef.current = setTimeout(() => setPhase("out"), interval);
    }
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, [phase, interval]);

  const currentText = texts[index];
  const nextIndex = (index + 1) % texts.length;

  useEffect(() => {
    if (phase === "out") {
      setIncomingIndex(nextIndex);
    }
  }, [phase, index, texts.length]);

  const handleOutEnd = () => {
    setPhase("in");
  };

  const handleInEnd = () => {
    setIndex(incomingIndex);
    setPhase("idle");
  };

  return (
    <div
      className={`relative overflow-hidden h-18 sm:h-20 md:h-24 pl-5 ${className}`}
      style={{ lineHeight: 1 }}
      aria-live="polite"
    >
      {phase === "idle" && (
        <div className="absolute inset-0 flex items-center pl-5">
          <span className="text-5xl sm:text-7xl md:text-8xl font-md tracking-tight
                           bg-gradient-to-r from-[#1E9600] via-[#FFF200] to-[#FF0000]
                           bg-clip-text text-transparent whitespace-nowrap">
            {currentText}
          </span>
        </div>
      )}

      {phase === "out" && (
        <div
          className="absolute inset-0 flex items-center will-change-transform pl-5"
          style={{ animation: `fadeUpOut ${outMs}ms ease-in forwards` }}
          onAnimationEnd={handleOutEnd}
        >
          <span className="text-5xl sm:text-7xl md:text-8xl font-md tracking-tight
                           bg-gradient-to-r from-[#1E9600] via-[#FFF200] to-[#FF0000]
                           bg-clip-text text-transparent whitespace-nowrap">
            {currentText}
          </span>
        </div>
      )}
      {phase === "in" && (
        <div
          className="absolute inset-0 flex items-center will-change-transform pl-5"
          style={{ animation: `slideUpInBounce ${inMs}ms cubic-bezier(0.22,1,0.36,1) forwards` }}
          onAnimationEnd={handleInEnd}
        >
          <span className="text-5xl sm:text-7xl md:text-8xl font-md tracking-tight
                           bg-gradient-to-r from-[#1E9600] via-[#FFF200] to-[#FF0000]
                           bg-clip-text text-transparent whitespace-nowrap">
            {texts[incomingIndex]}
          </span>
        </div>
      )}

      <style>{`
        @keyframes fadeUpOut {
          0%   { transform: translateY(0%);    opacity: 1; }
          100% { transform: translateY(-65%);  opacity: 0; }
        }
        @keyframes slideUpInBounce {
          0%   { transform: translateY(120%); opacity: 0; }
          45%  { transform: translateY(-22%); opacity: 1; }
          70%  { transform: translateY(10%); }
          85%  { transform: translateY(-4%); }
          100% { transform: translateY(0%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .will-change-transform { animation: none !important; }
        }
      `}</style>
    </div>
  );
}


