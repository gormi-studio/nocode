import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { getAssistantReply } from '@/lib/assistant';

// Simulated "typing" delay so replies don't feel like they teleported in.
const REPLY_DELAY_MS = 400;

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '안녕하세요! 고르미 제품 추천 도우미입니다.\n사용 환경이나 찾으시는 도구를 알려주시면 추천 상황과 예외 상황까지 함께 안내해 드릴게요.',
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);
  const isComposingRef = useRef(false);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open, sending]);
  const send = () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setSending(true);
    setTimeout(() => {
      const reply = getAssistantReply(text);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      setSending(false);
    }, REPLY_DELAY_MS);
  };
  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#A97C3F] text-white shadow-[0_12px_30px_-8px_rgba(169,124,63,0.6)] flex items-center justify-center hover:bg-[#7D5D2E] active:scale-95 transition-all"
        aria-label="제품 추천 도우미 열기"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-5 z-40 w-[calc(100vw-2.5rem)] max-w-sm h-[520px] max-h-[70vh] rounded-3xl overflow-hidden bg-white shadow-2xl border border-[#DCD8CE] flex flex-col">
          <div className="px-5 py-4 bg-[#1E1B18] text-white flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#A97C3F]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#D9BE93]" />
            </div>
            <div>
              <p className="font-serif-kr font-bold leading-tight">제품 추천 도우미</p>
              <p className="text-xs text-white/60">추천·예외 상황을 함께 안내해요</p>
            </div>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F2F1EE]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-[#A97C3F] text-white rounded-br-md'
                      : 'bg-white text-[#1E1B18] border border-[#DCD8CE] rounded-bl-md'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-bl-md text-sm bg-white text-[#948A76] border border-[#DCD8CE]">
                  …
                </div>
              </div>
            )}
          </div>
          <div className="p-3 border-t border-[#DCD8CE] bg-white" role="form" aria-label="제품 추천 도우미 입력">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onCompositionStart={() => { isComposingRef.current = true; }}
                onCompositionEnd={() => { isComposingRef.current = false; }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && !isComposingRef.current) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder="예: 출장 미용을 시작하는데 뭘 골라야 할까요?"
                className="flex-1 resize-none max-h-24 px-3 py-2 rounded-xl border border-[#D6D1C4] focus:border-[#A97C3F] focus:ring-2 focus:ring-[#A97C3F]/20 outline-none text-sm bg-[#F2F1EE]"
              />
              <button
                onClick={send}
                disabled={sending || !input.trim()}
                className="w-10 h-10 flex-shrink-0 rounded-xl bg-[#A97C3F] text-white flex items-center justify-center hover:bg-[#7D5D2E] disabled:opacity-40 active:scale-95 transition-all"
                aria-label="전송"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
