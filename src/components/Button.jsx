// components/Button.jsx
import React from "react";

const Button = React.memo(
  ({
    text = "Log In",
    children,
    onClick,
    className = "text-white",
    disabled,
    ...props
  }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-[#266DDF] px-3 py-1 rounded hover:bg-[#1B4D9E] focus:bg-[#1B4D9E] focus:ring-2 focus:ring-blue-500 focus:outline-none ${className}
py-2 md:text-[17px] text-xs sm:text-base lg:text-base transition-all duration-300`}
        {...props}
      >
        {children ?? text}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
