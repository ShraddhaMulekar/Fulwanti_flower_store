import React, { useState } from "react";
import useFetch from "../hook/useFetch";

const AIChat = () => {
  const { request, loading } = useFetch();
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;
    try {
      const data = await request("/ai/chat", "POST", { message });
      if (data?.status) {
        setReply(data.reply);
      } else {
        setReply(data?.message || "AI could not answer right now.");
      }
    } catch (err) {
      setReply("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/80 rounded-3xl shadow-md p-4 sm:p-6 animate-fade-up">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
        AI Flower Chat
      </h1>
      <p className="text-xs text-gray-500 mb-4">
        Ask any doubt or question about flowers, bouquets, or gifting ideas.
      </p>

      {reply && (
        <div className="mb-4 bg-pink-50 border border-pink-100 rounded-2xl p-3 text-sm text-gray-800 animate-fade-in">
          <p className="font-semibold text-pink-600 mb-1">AI Reply</p>
          <p>{reply}</p>
        </div>
      )}

      <form
        onSubmit={handleSend}
        className="mt-2 border border-pink-100 rounded-2xl p-3 bg-white flex flex-col gap-2"
      >
        <textarea
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your doubt or question here..."
          className="w-full text-sm border border-pink-100 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="self-end px-5 py-2 rounded-full bg-pink-500 text-white text-sm font-semibold shadow hover:bg-pink-600 hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default AIChat;

