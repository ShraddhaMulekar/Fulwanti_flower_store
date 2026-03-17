import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import useFetch from "../hook/useFetch";

const AIChat = () => {
  const { request, loading } = useFetch();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const listRef = useRef(null);
  const bottomRef = useRef(null);

  const canSend = useMemo(() => message.trim().length > 0 && !loading, [message, loading]);

  useLayoutEffect(() => {
    // Ensure newest message is visible immediately (no manual scrolling).
    // Using layout effect + rAF avoids "jump to top" on re-render.
    const el = listRef.current;
    if (!el) return;

    const raf1 = requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ block: "end" });
      const raf2 = requestAnimationFrame(() => {
        bottomRef.current?.scrollIntoView({ block: "end" });
      });
      // cleanup second frame
      return () => cancelAnimationFrame(raf2);
    });

    return () => cancelAnimationFrame(raf1);
  }, [chat.length, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text || loading) return;

    setChat((prev) => [...prev, { role: "user", text }]);
    setMessage("");
    try {
      const data = await request("/ai/chat", "POST", { message: text });
      if (data?.status) {
        setChat((prev) => [...prev, { role: "ai", text: data.reply }]);
      } else {
        setChat((prev) => [
          ...prev,
          { role: "ai", text: data?.message || "AI could not answer right now." },
        ]);
      }
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong. Please try again." },
      ]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-up">
      <div className="mb-5">
        <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400">
          only fresh blooms
        </p>
        <h1 className="text-2xl font-extrabold text-gray-100">AI Chat</h1>
        <p className="text-xs text-gray-400">
          Ask any doubt or question about flowers, bouquets, gifting ideas, and
          flower care.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-6">
        {/* Chat area */}
        <section className="rounded-2xl border border-white/10 bg-[#0b0d10] p-4 sm:p-6 flex flex-col">
          <div
            ref={listRef}
            className="flex-1 min-h-[280px] max-h-[480px] overflow-y-auto pr-1 space-y-3"
          >
            {chat.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
                <p className="text-sm text-gray-300 font-semibold mb-1">
                  Try asking:
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                  <li>- Which flowers are best for birthday?</li>
                  <li>- Suggest a bouquet under ₹1000</li>
                  <li>- How to keep roses fresh longer?</li>
                </ul>
              </div>
            ) : (
              chat.map((m, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl border p-3 text-sm whitespace-pre-line animate-fade-in ${
                    m.role === "user"
                      ? "ml-auto max-w-[85%] border-orange-400/30 bg-orange-400/10 text-gray-100"
                      : "mr-auto max-w-[85%] border-white/10 bg-[#111111] text-gray-200"
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-1">
                    {m.role === "user" ? "you" : "ai"}
                  </p>
                  <p>{m.text}</p>
                </div>
              ))
            )}

            {loading && (
              <div className="mr-auto max-w-[85%] rounded-2xl border border-white/10 bg-[#111111] p-3 text-sm text-gray-300 animate-pulse">
                AI is thinking...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSend} className="mt-4">
            <div className="rounded-2xl border border-white/10 bg-[#111111] p-3">
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your question..."
                className="w-full text-sm bg-transparent text-gray-100 placeholder:text-gray-500 outline-none resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-[11px] text-gray-500">
                  Tip: include occasion + budget + color.
                </p>
                <button
                  type="submit"
                  disabled={!canSend}
                  className="px-5 py-2 rounded-xl bg-orange-400 text-black text-sm font-semibold hover:bg-orange-300 transition-transform transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* Side card */}
        <aside className="rounded-2xl border border-white/10 bg-[#0b0d10] p-4 sm:p-6 h-fit sticky top-24">
          <p className="text-sm font-extrabold text-gray-100 mb-2">
            What I can help with
          </p>
          <ul className="text-xs text-gray-400 space-y-2">
            <li>- Bouquet recommendations (occasion + budget)</li>
            <li>- Flower meanings (rose/lily/tulip)</li>
            <li>- Flower care tips</li>
            <li>- Same-day delivery suggestions</li>
          </ul>

          <div className="mt-4 rounded-xl border border-white/10 bg-[#111111] p-3">
            <p className="text-[11px] text-gray-300 font-semibold mb-1">
              Quick prompt
            </p>
            <p className="text-[11px] text-gray-400">
              “Suggest a bouquet for birthday under ₹800, color pink.”
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AIChat;

