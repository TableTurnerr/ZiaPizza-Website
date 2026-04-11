"use client";

import React, { useState } from "react";

interface ThemeButtonProps {
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  className?: string;
  showArrow?: boolean;
  arrowRotation?: number;
  textColor?: string;
  textClassname?: string;
  borderColor?: string;
  borderHoverColor?: string;
  iconBgColor?: string;
  iconBgHoverColor?: string;
  iconColor?: string;
  iconHoverColor?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
}

const ThemeButton: React.FC<ThemeButtonProps> = ({
  text = "Order Now",
  onClick,
  href,
  className = "",
  showArrow = true,
  arrowRotation = -45,
  textColor = "text-white",
  textClassname = "",
  borderColor = "border-primary-dark",
  borderHoverColor = "border-primary",
  iconBgColor = "bg-white/10",
  iconBgHoverColor = "bg-black/25",
  iconColor = "text-white",
  iconHoverColor = "text-white",
  type = "button",
  target,
  rel = "noopener noreferrer",
}) => {
  const [hovered, setHovered] = useState(false);

  const buttonContent = (
    <div
      className={`group ${className} border ${borderColor} hover:scale-105 shadow-lg hover:shadow-xl rounded-[9px] min-w-[157px] min-h-[41px] w-fit overflow-hidden flex transition-all duration-200 items-center ${borderHoverColor}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`text-nowrap text-normal2 font-bold ${textColor} ${textClassname} mx-auto h-full flex items-center justify-center`}
      >
        {text}
      </div>
      {showArrow && (
        <div className="flex justify-end m-[5px]">
          <div
            className={`w-[31px] h-[31px] ${hovered ? iconBgHoverColor : iconBgColor} rounded-[7px] transition-all duration-300 flex items-center justify-center`}
          >
            <svg
              className={`w-6 h-6 ${hovered ? iconHoverColor : iconColor}`}
              style={{ transform: `rotate(${arrowRotation}deg)` }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );

  if (href) {
    const resolvedTarget = target ?? (href.startsWith("/") ? "_self" : "_blank");
    return (
      <a href={href} target={resolvedTarget} rel={rel}>
        {buttonContent}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type={type} onClick={onClick}>
        {buttonContent}
      </button>
    );
  }

  return <div>{buttonContent}</div>;
};

export default ThemeButton;
