import React, { useRef, useState } from "react";
import { googleReviews } from "@/data/googleReviews";

const MAX_WORDS = 18;

function ReviewText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const words = text.split(" ");
  const isLong = words.length > MAX_WORDS;
  const displayText = expanded
    ? text
    : words.slice(0, MAX_WORDS).join(" ") + (isLong ? "..." : "");

  return (
    <span className="text-brand-text text-base text-left">
      {displayText}
      {isLong && (
        <>
          {" "}
          <button
            className="text-blue-600 text-sm font-medium hover:underline inline"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Esconder" : "Ler mais"}
          </button>
        </>
      )}
    </span>
  );
}

export function GoogleReviewsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative w-full max-w-[1200px] mx-auto py-8">
      {/* Botão esquerdo */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border border-gray-300 hover:bg-blue-50 transition rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg backdrop-blur-md"
        onClick={() => scroll("left")}
        aria-label="Anterior"
        style={{ boxShadow: "0 2px 12px #0002" }}
      >
        <svg width="22" height="22" className="md:w-7 md:h-7" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 md:gap-10 overflow-x-auto scrollbar-hide px-1 md:px-8"
        style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth", msOverflowStyle: "none", scrollbarWidth: "none" }}
      >
        {googleReviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-white via-blue-50 to-white rounded-2xl border border-gray-100 shadow-xl min-w-[220px] max-w-[260px] md:min-w-[340px] md:max-w-[420px] flex-shrink-0 flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl group p-4 md:p-7 md:p-8"
            style={{ scrollSnapAlign: "start" }}
          >
            {/* Google logo à esquerda, estrelas à direita */}
            <div className="flex items-center justify-between w-full pb-2 md:pb-3">
              <img
                src="https://th.bing.com/th/id/R.25f9465bc7b57d3e3fb6d4ae15341727?rik=PUq1KdBmy9wiDw&pid=ImgRaw&r=0"
                alt="Google"
                className="w-5 h-5 md:w-7 md:h-7"
                style={{ display: "inline-block" }}
              />
              <span className="text-yellow-400 text-lg md:text-2xl tracking-tight">{"★".repeat(review.rating)}</span>
            </div>
            {/* Texto */}
            <div className="flex-1 w-full px-1 pb-2 text-center">
              <ReviewText text={review.text} />
            </div>
            {/* Avatar, nome, data */}
            <div className="flex flex-col items-center mt-4 md:mt-6 w-full">
              <div className="flex items-center gap-2 md:gap-3">
                <img
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  className="w-9 h-9 md:w-14 md:h-14 rounded-full border-2 border-white shadow-lg object-cover"
                />
                <div className="font-bold text-base md:text-lg text-gray-800">{review.author_name}</div>
              </div>
              <div className="text-xs text-gray-400 mt-1 md:mt-2">{review.date}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Botão direito */}
      <button
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 border border-gray-300 hover:bg-blue-50 transition rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-lg backdrop-blur-md"
        onClick={() => scroll("right")}
        aria-label="Próximo"
        style={{ boxShadow: "0 2px 12px #0002" }}
      >
        <svg width="22" height="22" className="md:w-7 md:h-7" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
} 