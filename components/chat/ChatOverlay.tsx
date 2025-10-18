"use client";
import React, { useEffect } from "react";
import { useChat } from "@/contexts/ChatProvider";
export default function ChatOverlay(){
  const { isOpen, close, pagePath, reducedMotion, theme } = useChat();
  useEffect(()=>{ if(isOpen) document.documentElement.style.overflow="hidden"; return ()=>{ document.documentElement.style.overflow=""; }; },[isOpen]);
  if(!isOpen) return null;
  return (
    <div role="dialog" aria-label="SMH AI Concierge" aria-modal="true" className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={close} />
      <div className="relative w-full sm:max-w-lg sm:rounded-2xl sm:overflow-hidden smh-glass border shadow-lg">
        <div className="px-4 py-3 flex items-center justify-between">
          <div><div className="text-sm smh-text-dim">AI Concierge</div><div className="font-semibold">Context: {pagePath}</div></div>
          <button onClick={close} className="smh-btn px-3 py-1 text-sm">Close</button>
        </div>
        <div className="relative h-[60vh] sm:h-[50vh]">
          <div className="absolute inset-0 smh-film-grain pointer-events-none" aria-hidden />
          <div className="absolute inset-0 smh-particles-teal pointer-events-none" aria-hidden />
          <div className="p-4 overflow-auto space-y-3">
            <div className="text-sm smh-text-dim">This is the UI shell. Reduced motion: {reducedMotion ? "ON":"OFF"} · Theme: {theme}</div>
            <div className="p-3 rounded-lg bg-white/70 text-black dark:bg-[#141516]/80 dark:text-white">Hello! Ask me about treatments, pricing, or to book an appointment.</div>
          </div>
        </div>
        <div className="p-3 border-t border-white/10 flex gap-2">
          <input type="text" placeholder="Type a message…" className="flex-1 rounded-lg px-3 py-2 bg-white/80 dark:bg-[#141516]/80 outline-none focus:ring-2 ring-teal-300"/>
          <button className="smh-btn">Send</button>
        </div>
      </div>
    </div>
  );
}
