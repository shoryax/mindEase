"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Sparkles } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function HealthChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage: Message = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Request failed`);

      setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 p-3.5 rounded-2xl shadow-lg transition-all duration-300 ${
          open
            ? 'bg-background border border-border text-foreground hover:bg-muted'
            : 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white hover:shadow-xl hover:shadow-teal-500/20 hover:scale-105'
        }`}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-[390px] h-[540px] flex flex-col overflow-hidden rounded-2xl border border-border bg-background/95 dark:bg-card/95 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="px-5 py-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-md shadow-teal-500/20">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-foreground">Health Assistant</h2>
                <p className="text-[11px] text-muted-foreground">Symptoms, nutrition, wellness</p>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">Online</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-6 -mt-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500/10 to-emerald-500/10 border border-teal-500/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-teal-500" />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">How can I help?</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ask about symptoms, wellness tips, or mental health resources.
                </p>
                <div className="flex flex-wrap gap-2 mt-5 justify-center">
                  {["How to reduce stress?", "Sleep tips", "Breathing exercise"].map((q) => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); }}
                      className="text-[11px] px-3 py-1.5 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-border/50 text-muted-foreground hover:text-foreground transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                  m.sender === "user"
                    ? "ml-auto rounded-2xl rounded-br-md bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md shadow-teal-500/10"
                    : "rounded-2xl rounded-bl-md bg-muted/80 dark:bg-muted/90 text-foreground border border-border/50 dark:border-white/10 shadow-sm"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-md bg-muted/80 dark:bg-muted/90 border border-border/50 dark:border-white/10 shadow-sm">
                <div className="flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.15s]" />
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border bg-muted/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-muted/40 hover:bg-muted/60 focus:bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-emerald-500/30 transition-all"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-br from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white rounded-xl px-3.5 py-2.5 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shadow-teal-500/15 disabled:shadow-none"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground/60 mt-2 text-center">
              Not a medical professional. Consult a doctor for serious issues.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
