"use client";
import React from "react";
import { useChat } from "@/app/contexts/ChatProvider";
export default function ChatDock(){
  const { isOpen, toggle } = useChat();
  return (
    <div className="fixed right-4 bottom-4 z-[60]">
      <button aria-label="Open chat" onClick={toggle} className="smh-btn smh-gold-border shadow-sm sm:px-5 px-4 py-3 rounded-full">
        {isOpen ? "Close Concierge" : "Chat Concierge"}
      </button>
    </div>
  );
}
