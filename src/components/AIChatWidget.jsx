import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { aiflow1973, aiflow1973ConfigPromise } from '@/lib/aiflow';
export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '안녕하세요! 고르미 제품 추천 어시스턴트입니다.\n사용 환경이나 찾으시는 도구를 알려주시면 추천 상황과 예외 상황까지 함께 안내해 드릴게요.',
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);
  const isComposingRef = useRef(false);
  const abortRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open, sending]);
  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput('');
    const next = [...messages, { role: 'user', content: text }];
    setMessages([...next, { role: 'assistant', content: '' }]);
    setSending(true);
    try {
      const config = await aiflow1973ConfigPromise;
      const systemPrompt = config?.systemPrompt || '';
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      const stream = aiflow1973.chatStream({
        system: systemPrompt,
        messages: next.map((m) => ({ role: m.role, content: m.content })),
        signal: ctrl.signal,
      });
      let acc = '';
      for await (const chunk of stream) {
        if (chunk.delta) {
          acc += chunk.delta;
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: 'assistant', content: acc };
            return copy;
          });
        }
        if (chunk.done) break;
      }
    } catch (err) {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: 'assistant',
          content:
            err?.status === 402
              ? 'AI 크레딧이 소진되어 지금은 상담이 어렵습니다. 잠시 후 다시 시도해 주세요.'
              : `⚠️ ${err?.message || '일시적인 오류가 발생했습니다.'}`,
        };
        return copy;
      });
    } finally {
      setSending(false);
    }
  };
  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#D84E0B] text-white shadow-[0_12px_30px_-8px_rgba(216,78,11,0.6)] flex items-center justify-center hover:bg-[#b8420a] active:scale-95 transition-all"
        aria-label="AI 제품 추천 어시스턴트 열기"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-5 z-40 w-[calc(100vw-2.5rem)] max-w-sm h-[520px] max-h-[70vh] rounded-3xl overflow-hidden bg-white shadow-2xl border border-[#e7dcc9] flex flex-col">
          <div className="px-5 py-4 bg-[#2A211C] text-white flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D84E0B]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#f0a97e]" />
            </div>
            <div>
              <p className="font-serif-kr font-bold leading-tight">AI 제품 추천</p>
              <p className="text-xs text-white/60">추천·예외 상황을 함께 안내해요</p>
            </div>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#FBF7F0]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-[#D84E0B] text-white rounded-br-md'
                      : 'bg-white text-[#2A211C] border border-[#e7dcc9] rounded-bl-md'
                  }`}
                >
                  {m.content || (sending && i === messages.length - 1 ? '…' : '')}
                </div>
              </div>
            ))}
            {sending && messages[messages.length - 1]?.content === '' && (
              <div className="flex items-center gap-2 text-[#a98c5b] text-sm px-1">
                <Loader2 className="w-4 h-4 animate-spin" /> 답변을 준비하고 있어요
              </div>
            )}
          </div>
          <div className="p-3 border-t border-[#e7dcc9] bg-white" role="form" aria-label="AI 상담 입력">
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
                className="flex-1 resize-none max-h-24 px-3 py-2 rounded-xl border border-[#e0d3bd] focus:border-[#D84E0B] focus:ring-2 focus:ring-[#D84E0B]/20 outline-none text-sm bg-[#FBF7F0]"
              />
              <button
                onClick={send}
                disabled={sending || !input.trim()}
                className="w-10 h-10 flex-shrink-0 rounded-xl bg-[#D84E0B] text-white flex items-center justify-center hover:bg-[#b8420a] disabled:opacity-40 active:scale-95 transition-all"
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