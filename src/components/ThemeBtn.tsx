import React from "react";

interface ThemeBtnProps {
  text?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  textClassName?: string;
  showArrow?: boolean;
  arrowRotation?: number;
  target?: string;
}

const ThemeBtn: React.FC<ThemeBtnProps> = ({
  text = "Order Now",
  onClick,
  href,
  className = "",
  textClassName = "",
  showArrow = true,
  arrowRotation = -45,
  target,
}) => {
  const content = (
    <div
      className={`group border border-navy-border hover:scale-105 shadow-lg hover:shadow-xl rounded-lg min-w-[157px] min-h-[41px] w-fit overflow-hidden flex transition-all duration-200 items-center ${className}`}
    >
      <div
        className={`text-nowrap text-normal2 font-semibold mx-auto h-full flex items-center justify-center px-4 ${textClassName}`}
      >
        {text}
      </div>
      {showArrow && (
        <div className="flex justify-end m-[5px]">
          <div className="w-8 h-8 bg-white/10 group-hover:bg-white/20 rounded-md transition-all duration-300 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              style={{ transform: `rotate(${arrowRotation}deg)` }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
    const resolvedTarget =
      target ?? (href.startsWith("/") ? "_self" : "_blank");
    return (
      <a
        href={href}
        target={resolvedTarget}
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick}>
        {content}
      </button>
    );
  }

  return <div>{content}</div>;
};

export default ThemeBtn;
