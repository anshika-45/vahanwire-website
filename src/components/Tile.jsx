import React, { useState } from "react";
const Tile = React.memo(({ icon, title, desc, linkText, linkHref = "#" }) => {
const [isHovered, setIsHovered] = useState(false);
return (
<div
className="flex flex-col justify-between w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] h-52 sm:h-56 md:h-60 lg:h-[220px] border border-[#C4D9F9] rounded-[12px] p-4 sm:p-5 md:p-6 lg:p-7 xl:p-[30px] bg-[#FFFFFF] shadow-md transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]
cursor-pointer"
  onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderImage: isHovered ? 'linear-gradient-br (135deg, rgba(248,2,0,0.8) 0%, rgba(248,186,1,0.8) 33%, rgba(50,171,21,0.8) 65%, rgba(65,132,237,0.8) 100%) 1' : '',
        borderStyle: isHovered ? 'solid' : '',
        background: isHovered ? 'linear-gradient(135deg, rgba(248,2,0,0.5) 0%, rgba(248,186,1,0.5) 33%, rgba(50,171,21,0.5) 65%, rgba(65,132,237,0.5) 100%)' : '',
      }}
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
          <h3 className={`text-xs sm:text-sm md:text-base lg:text-lg font-semibold mt-1 sm:mt-2 md:mt-3 ${isHovered ? 'text-white' : 'text-[#242424]'}`}>{title}</h3>
          <p className={`text-xs mt-1 ${isHovered ? 'text-white' : 'text-[#5C5C5C]'}`}>{desc}</p>
          {linkText && (
          <a
          href={linkHref}
          className={`text-xs mt-2 sm:mt-3 font-medium flex items-end gap-1 ${isHovered ? 'text-white' : 'text-[#266DDF] hover:text-blue-700'}`}
          >
              {linkText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-3 h-3 sm:w-4 sm:h-4 transform rotate-[-35deg]"
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
</div>
);
});
Tile.displayName = 'Tile';
export default Tile;
