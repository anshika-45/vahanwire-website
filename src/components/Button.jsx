// components/Button.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Button = React.memo(
  ({
    text = "Log In",
    children,
    onClick,
    className = "text-white",
    disabled,
    to,
    href,
    ...props
  }) => {
    const navigate = useNavigate();
    
    // Handle navigation if 'to' prop is provided
    const handleClick = (e) => {
      if ((to || href) && !disabled) {
        navigate(to || href);
      } else if (onClick && !disabled) {
        onClick(e);
      }
    };

    const buttonClassName = `bg-[#266DDF] px-3 py-1 rounded hover:bg-[#1B4D9E] focus:bg-[#1B4D9E] focus:ring-2 focus:ring-blue-500 focus:outline-none ${className} py-2 md:text-[17px] text-xs sm:text-base lg:text-base transition-all duration-300`;

    // If we have an external href or to link, use semantic Link or anchor element
    if (href && href.startsWith('http')) {
      return (
        <a
          href={href}
          className={buttonClassName}
          {...props}
        >
          {children ?? text}
        </a>
      );
    }

    // If we have internal navigation, use Link component for better semantics
    if (to || (href && href.startsWith('/'))) {
      return (
        <Link
          to={to || href}
          className={buttonClassName}
          {...props}
        >
          {children ?? text}
        </Link>
      );
    }

    // Otherwise use button element for click handlers
    return (
      <button
        onClick={handleClick}
        disabled={disabled}
        className={buttonClassName}
        {...props}
      >
        {children ?? text}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
