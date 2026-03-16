import React from "react";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 lg:gap-16 animate-fade-up">
      {/* Left text section */}
      <section className="w-full md:w-1/2 text-left space-y-5">
        <p className="tracking-[0.3em] text-[10px] text-gray-400 uppercase">
          Fulwanti Flower Store
        </p>

        <div className="leading-none space-y-1">
          <p className="text-4xl sm:text-5xl font-light text-gray-200">
            ONLY
          </p>
          <p className="text-4xl sm:text-5xl font-light text-gray-200">
            FRESH
          </p>
          <p className="text-5xl sm:text-6xl font-extrabold text-orange-400 mt-2">
            BLOOMS
          </p>
        </div>

        <p className="text-xs sm:text-sm text-gray-300 max-w-md">
          We deliver freshness — no wilted petals, just garden-fresh flowers
          every time. Handpicked, beautifully wrapped, and delivered with care.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="/products"
            className="px-6 py-2.5 rounded-full bg-orange-400 text-black text-xs font-semibold tracking-wide hover:bg-orange-300 transition"
          >
            Shop Now
          </a>
          <a
            href="/ai-chat"
            className="px-5 py-2 rounded-full border border-gray-600 text-gray-200 text-xs hover:bg-gray-900 transition"
          >
            Ask AI For Help
          </a>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 text-[10px] text-gray-300">
          <span className="px-3 py-1 rounded-full bg-gray-900 border border-gray-700">
            Indoor plants
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-900 border border-gray-700">
            Outdoor blooms
          </span>
          <span className="px-3 py-1 rounded-full bg-gray-900 border border-gray-700">
            Custom bouquets
          </span>
        </div>
      </section>

      {/* Right visual section */}
      <section className="w-full md:w-1/2 flex justify-center">
        <div className="relative w-64 h-64 sm:w-80 sm:h-80">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-400 via-yellow-300 to-pink-500 blur-2xl opacity-40" />
          <div className="relative w-full h-full rounded-[40%] bg-[#111111] border border-gray-700 flex items-center justify-center overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full border-[10px] border-orange-300 flex items-center justify-center bg-yellow-200/70">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-orange-400 shadow-inner" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
