import React, { useState } from "react";
const Tile = React.memo(function Tile({
  icon,
  title,
  desc,
  linkText,
  linkHref = "/",
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      id="tile"
      className={`tile ${isHovered ? "hovered" : ""}
        flex flex-col justify-between w-full
        max-w-[300px] sm:max-w-[350px] md:max-w-[400px]
         h-auto
        rounded-[12px] p-4 xl:p-[30px]
        bg-white cursor-pointer
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        {icon && (
          <img
            loading="lazy"
            src={icon}
            alt={`${title} service icon`}
            className="w-20 sm:w-24 md:w-28 lg:w-36 h-20 sm:h-24 md:h-28 lg:h-36 object-contain flex-shrink-0"
            width="144"
            height="144"
            decoding="async"
          />
        )}
        <div>
          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold mt-1 sm:mt-2 md:mt-3 text-[#242424]">
            {title}
          </h3>
          <p className="text-xs mt-1 text-[#5C5C5C]">{desc}</p>
          {linkText && (
            <a
              href={linkHref}
              className="text-sm mt-2 sm:mt-3 font-semibold flex items-end gap-1 text-[#266DDF] hover:text-blue-700"
            >
              {linkText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-3 h-3 sm:w-4 sm:h-4 -rotate-[35deg]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .tile {
          position: relative;
          border: 1px solid #C4D9F9;
          transition: box-shadow 250ms ease; 
        }
        .tile.hovered {
          border: 1px solid transparent;
          background:
            linear-gradient(#FFFFFF, #FFFFFF) padding-box,
            linear-gradient(135deg,
              rgba(248, 2, 0, 0.85) 0%,
              rgba(248, 186, 1, 0.85) 33%,
              rgba(50, 171, 21, 0.85) 66%,
              rgba(65, 132, 237, 0.85) 100%
            ) border-box;
          background-origin: border-box;
          background-clip: padding-box, border-box;
        }
.tile::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 12px;
  pointer-events: none;

  background: linear-gradient(90deg,
    rgba(248,2,0,0.08) 0%,
    rgba(248,186,1,0.10) 25%,
    rgba(50,171,21,0.10) 50%,
    rgba(65,132,237,0.10) 75%,
    rgba(248,2,0,0.08) 100%
  );

  background-size: 250% 100%;   /* gives sweep range */
  background-position: 0% 50%;

  opacity: 0;
  transform: scale(0.98);
  transition: opacity 250ms ease, transform 260ms ease;
}

.tile.hovered::before {
  opacity: 1;
  transform: scale(1.0);
  animation: sweepLeftRight 1.25s ease-out forwards;
}

@keyframes sweepLeftRight {
  0%   { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
        .tile.hovered::before {
          opacity: 1;
          transform: scale(1.0);
        }

        .tile.hovered {
          box-shadow: 0 8px 20px rgba(0,0,0,0.10);
        }

        @media (prefers-reduced-motion: reduce) {
          .tile, .tile::before { transition: none !important; }
        }
      `}</style>
    </div>
  );
});

Tile.displayName = "Tile";
export default Tile;
