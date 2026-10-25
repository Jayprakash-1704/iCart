import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  Bot,
  Send,
  Sparkles,
  ShoppingCart,
  Headphones,
  Laptop,
  Smartphone,
  X,
  Plus,
  MessageCircle,
  History,
  Settings,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
} from "lucide-react";

import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api/chat";

const suggestions = [
  {
    icon: Laptop,
    text: "Find laptops under ₹50,000",
  },
  {
    icon: Headphones,
    text: "Best headphones for gaming",
  },
  {
    icon: Smartphone,
    text: "Compare two smartphones",
  },
  {
    icon: Sparkles,
    text: "Recommend products for me",
  },
];

const followUpSuggestions = [
  "Find cheaper options",
  "Compare these products",
  "Best rated products",
];

const AIShoppingAssistant = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Automatically scroll to the latest message.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isTyping]);

  // Start a fresh conversation.
  const handleNewConversation = () => {
    if (isTyping) return;

    setMessages([]);
    setMessage("");

    inputRef.current?.focus();
  };

  // Send a message to the Gemini backend.
  const handleSend = async (text = message) => {
    const question = text.trim();

    if (!question || isTyping) return;

    // Keep a snapshot of previous messages for conversation context.
    const previousMessages = messages;

    // Display the customer's message immediately.
    setMessages((previous) => [
      ...previous,
      {
        id: `${Date.now()}-user`,
        role: "user",
        text: question,
      },
    ]);

    setMessage("");
    setIsTyping(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        // Supports cookie-based authentication if enabled by your backend.
        credentials: "include",

        body: JSON.stringify({
          message: question,

          history: previousMessages.map((item) => ({
            role: item.role,
            text: item.text,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to get a response from Gemini."
        );
      }

      if (!data.reply || typeof data.reply !== "string") {
        throw new Error("The AI returned an empty response.");
      }

      // Display Gemini's actual response.
      setMessages((previous) => [
        ...previous,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error("Shopping assistant error:", error);

      setMessages((previous) => [
        ...previous,
        {
          id: `${Date.now()}-error`,
          role: "assistant",
          text:
            error.message ||
            "Sorry, something went wrong. Please try again.",
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Main Header */}

      <header className="sticky top-18 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded-xl p-2 transition hover:bg-slate-100"
              aria-label="Back to home"
            >
              <ArrowLeft size={21} />
            </Link>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <Sparkles size={24} />
            </div>

            <div>
              <h1 className="text-lg font-extrabold tracking-tight">
                Mihy AI
              </h1>

              <p className="text-xs text-slate-500">
                Your personal shopping assistant
              </p>
            </div>
          </div>

          <Link
            to="/shop"
            className="hidden items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:border-indigo-300 hover:text-indigo-600 sm:flex"
          >
            <ShoppingCart size={17} />
            Continue Shopping
          </Link>
        </div>
      </header>

      {/* Main Layout */}

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* Sidebar */}

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-5">
            <button
              onClick={handleNewConversation}
              disabled={isTyping}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={18} />
              New Conversation
            </button>

            <div className="rounded-2xl border border-slate-200 bg-white p-3">
              <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                Workspace
              </p>

              <button
                className="flex w-full items-center gap-3 rounded-xl bg-indigo-50 px-3 py-3 text-sm font-semibold text-indigo-700"
                type="button"
              >
                <MessageCircle size={19} />
                AI Assistant
              </button>

              <Link
                to="/shop"
                className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                <ShoppingCart size={19} />
                Browse Products
              </Link>

              <button
                onClick={handleNewConversation}
                disabled={isTyping}
                className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                type="button"
              >
                <History size={19} />
                Clear Conversation
              </button>
            </div>

            <div className="rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 p-5 text-white">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                <Sparkles size={23} />
              </div>

              <h3 className="font-bold">
                Shopping made smarter
              </h3>

              <p className="mt-2 text-sm leading-6 text-indigo-100">
                Tell me your budget, preferences, and what you are looking for.
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs text-indigo-100">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                AI shopping assistant
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 text-xs text-slate-400">
              <Settings size={16} />
              Powered by iCart
            </div>
          </div>
        </aside>

        {/* Chat Area */}

        <section className="flex min-h-[calc(100vh-125px)] min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Chat Header */}

          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                <Bot size={25} />

                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
              </div>

              <div>
                <h2 className="font-bold">
                  Mihy-Shopping Assistant
                </h2>

                <p className="text-xs text-slate-500">
                  Ask about products, prices and more
                </p>
              </div>
            </div>

            <button
              onClick={handleNewConversation}
              disabled={isTyping}
              className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              title="Clear conversation"
              aria-label="Clear conversation"
              type="button"
            >
              <X size={19} />
            </button>
          </div>

          {/* Messages */}

          <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-7">
            {/* Welcome Screen */}

            {messages.length === 0 && (
              <div className="flex min-h-105 flex-col justify-center">
                <div className="mx-auto w-full max-w-2xl text-center">
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-xl shadow-indigo-200">
                    <Sparkles size={38} />
                  </div>

                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                    Welcome to Mihy AI
                  </p>

                  <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    What are we shopping for{" "}
                    <span className="text-indigo-600">
                      today?
                    </span>
                  </h2>

                  <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
                    Tell me what you need, your budget, or what matters most.
                    I will help you explore your options.
                  </p>

                  <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
                    {suggestions.map((item) => {
                      const Icon = item.icon;

                      return (
                        <button
                          key={item.text}
                          onClick={() => handleSend(item.text)}
                          disabled={isTyping}
                          className="group flex items-center gap-3 rounded-2xl border border-slate-200 p-4 transition duration-200 hover:border-indigo-300 hover:bg-indigo-50/50 disabled:cursor-not-allowed disabled:opacity-50"
                          type="button"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-100">
                            <Icon size={20} />
                          </div>

                          <span className="text-sm font-semibold text-slate-700">
                            {item.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Conversation Messages */}

            {messages.map((item) => (
              <div
                key={item.id}
                className={`flex gap-3 ${item.role === "user"
                    ? "justify-end"
                    : "justify-start"
                  }`}
              >
                {item.role === "assistant" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                    <Bot size={20} />
                  </div>
                )}

                <div
                  className={`max-w-[90%] rounded-2xl p-4 sm:max-w-[85%] ${item.role === "user"
                      ? "rounded-br-md bg-indigo-600 text-white"
                      : item.isError
                        ? "rounded-bl-md border border-red-200 bg-red-50 text-red-800"
                        : "rounded-bl-md border border-slate-100 bg-slate-50 text-slate-800"
                    }`}
                >
                  {item.isError && (
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold">
                      <AlertCircle size={15} />
                      Something went wrong
                    </div>
                  )}


                  <div
                    className={`wrap-break-word text-sm leading-7 ${item.role === "user" ? "whitespace-pre-wrap" : ""
                      }`}
                  >
                    {item.role === "user" ? (
                      item.text
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ children }) => (
                            <h1 className="mb-3 mt-5 text-xl font-bold">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="mb-3 mt-5 text-lg font-bold">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="mb-2 mt-4 text-base font-bold">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="mb-3 last:mb-0">
                              {children}
                            </p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-bold text-slate-950">
                              {children}
                            </strong>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-3 list-disc space-y-1 pl-6">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="mb-3 list-decimal space-y-1 pl-6">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="pl-1">
                              {children}
                            </li>
                          ),
                          hr: () => (
                            <hr className="my-4 border-slate-200" />
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="my-3 border-l-4 border-indigo-300 pl-4 text-slate-600">
                              {children}
                            </blockquote>
                          ),
                          table: ({ children }) => (
                            <div className="my-4 overflow-x-auto">
                              <table className="w-full border-collapse text-left text-sm">
                                {children}
                              </table>
                            </div>
                          ),
                          th: ({ children }) => (
                            <th className="border border-slate-200 bg-slate-100 px-3 py-2 font-bold">
                              {children}
                            </th>
                          ),
                          td: ({ children }) => (
                            <td className="border border-slate-200 px-3 py-2">
                              {children}
                            </td>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-indigo-600 underline hover:text-indigo-800"
                            >
                              {children}
                            </a>
                          ),
                          code: ({ children }) => (
                            <code className="rounded bg-slate-200 px-1.5 py-0.5 font-mono text-xs">
                              {children}
                            </code>
                          ),
                        }}
                      >
                        {item.text}
                      </ReactMarkdown>
                    )}
                  </div>



                  {item.role === "assistant" && !item.isError && (
                    <div className="mt-3 flex gap-2 border-t border-slate-200 pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          console.log("Helpful response:", item.id);
                        }}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-indigo-600"
                        aria-label="Helpful response"
                        title="Helpful response"
                      >
                        <ThumbsUp size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          console.log("Unhelpful response:", item.id);
                        }}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-red-600"
                        aria-label="Unhelpful response"
                        title="Unhelpful response"
                      >
                        <ThumbsDown size={15} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <Bot size={20} />
                </div>

                <div className="flex items-center gap-1 rounded-2xl bg-slate-100 px-5 py-4">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500" />

                  <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:150ms]" />

                  <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {/* Automatic Scroll Target */}

            <div ref={messagesEndRef} />
          </div>

          {/* Follow-up Suggestions */}

          {messages.length > 0 && (
            <div className="flex gap-2 overflow-x-auto px-4 pb-3 sm:px-7">
              {followUpSuggestions.map((text) => (
                <button
                  key={text}
                  onClick={() => handleSend(text)}
                  disabled={isTyping}
                  className="shrink-0 rounded-full border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                  type="button"
                >
                  {text}
                </button>
              ))}
            </div>
          )}

          {/* Message Input */}

          <div className="border-t border-slate-100 bg-white p-4 sm:p-6">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSend();
              }}
              className="mx-auto flex max-w-4xl items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 transition focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50"
            >
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask about products, prices, or recommendations..."
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400"
                disabled={isTyping}
                autoComplete="off"
                aria-label="Your shopping question"
              />

              <button
                type="submit"
                disabled={!message.trim() || isTyping}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={19} />
              </button>
            </form>

            <p className="mt-3 text-center text-[11px] text-slate-400">
              AI responses are for assistance. Verify product details before
              purchasing.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AIShoppingAssistant;

