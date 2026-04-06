"use client";

import React, { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border-b py-[20px] cursor-pointer"
      style={{ borderColor: "var(--tt-border-color)" }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center px-[10px]">
        <h4 className="text-normal1 sm:text-h5 font-semibold text-white">
          {question}
        </h4>
        <svg
          className={`w-5 h-5 text-white transition-transform duration-300 flex-shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 px-[10px] ${isOpen ? "max-h-96 mt-3" : "max-h-0"}`}
      >
        <p
          className="text-normal3 leading-relaxed"
          style={{ color: "var(--tt-color-text-gray)" }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ({
  items,
  title,
}: {
  items: FAQItemProps[];
  title?: string;
}) {
  return (
    <div className="w-full max-w-3xl mx-auto px-[10px] sm:px-[40px]">
      {title && (
        <h2 className="text-h3 sm:text-h2 font-semibold text-center mb-[30px]">
          {title}
        </h2>
      )}
      {items.map((item, i) => (
        <FAQItem key={i} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
