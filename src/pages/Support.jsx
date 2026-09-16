import { useState, useEffect } from 'react';
import { ChevronDown, Truck, RefreshCw, Package, Send, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { Faq, Inquiry } from '@/api/entities';
import Reveal from '@/components/Reveal';
const SHIPPING = [
  { icon: Package, title: '기본 배송', desc: '기본 구성 상품은 통상적인 배송 일정으로 발송됩니다.' },
  { icon: Truck, title: '커스텀 제작', desc: '소재·모듈 구성에 따라 추가 제작 기간이 발생할 수 있으며 주문 단계에서 개별 안내됩니다.' },
  { icon: RefreshCw, title: '교환·반품', desc: '제품 하자·오배송은 정상 교환·반품이 가능하며, 커스텀 제작품은 단순 변심 시 제한될 수 있습니다.' },
];
export default function Support() {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'general', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await Faq.paging({ page: 1, limit: 20, sort: 'sortOrder' });
        setFaqs(res.data.data);
      } catch (e) { console.error(e); }
    })();
  }, []);
  const handleSubmit = async () => {
    if (!form.name.trim() || !form.message.trim()) {
      setNotice({ type: 'error', message: '이름과 문의 내용을 입력해 주세요.' });
      return;
    }
    setSubmitting(true);
    setNotice(null);
    try {
      await Inquiry.create({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        type: form.type,
        message: form.message.trim(),
      });
      setNotice({ type: 'success', message: '문의가 접수되었습니다. 담당자가 확인 후 순차적으로 안내드립니다.' });
      setForm({ name: '', email: '', phone: '', type: 'general', message: '' });
    } catch (err) {
      setNotice({ type: 'error', message: err?.message || '문의 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.' });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="w-full bg-white">
      <section className="w-full bg-black text-white overflow-hidden relative">
        <div className="relative max-w-[1280px] mx-auto px-5 md:px-12 pt-14 pb-16 md:pt-20">
          <Reveal className="max-w-3xl">
            <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" strokeWidth={1.75} /> 고객센터
            </p>
            <h1 className="font-serif-kr text-3xl md:text-5xl font-bold tracking-tight leading-[1.2]">무엇이든 물어보세요</h1>
            <p className="mt-5 text-[#CCCCCC] leading-[1.6] max-w-2xl">
              자주 묻는 질문과 배송·교환·반품 안내, 그리고 1:1 · B2B 문의를 한 곳에 모았습니다.
            </p>
          </Reveal>
        </div>
      </section>
      {/* shipping */}
      <section className="w-full py-14 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12">
          <Reveal className="max-w-2xl mb-10">
            <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4">배송 · 교환 · 반품</p>
            <h2 className="font-serif-kr text-2xl md:text-3xl font-bold text-black tracking-tight leading-[1.2]">주문 전에 확인하세요</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SHIPPING.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="h-full rounded-[20px] bg-[#F7F7F7] p-7">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-4">
                    <s.icon className="w-7 h-7 text-black" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-serif-kr text-lg font-bold text-black mb-2 leading-[1.3]">{s.title}</h3>
                  <p className="text-sm text-[#575757] leading-[1.5]">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="w-full py-14 md:py-20 bg-[#F7F7F7]">
        <div className="max-w-3xl mx-auto px-5 md:px-6">
          <Reveal className="mb-8 text-center">
            <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4">자주 묻는 질문</p>
            <h2 className="font-serif-kr text-2xl md:text-3xl font-bold text-black tracking-tight leading-[1.2]">FAQ</h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((f) => {
              const open = openId === f.id;
              return (
                <div key={f.id} className="rounded-[16px] bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenId(open ? null : f.id)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="font-semibold text-black flex items-center gap-2">
                      <span className="text-[#A97C3F]">Q.</span> {f.question}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-[#767676] flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={1.75} />
                  </button>
                  {open && (
                    <div className="px-5 pb-5 text-[#575757] leading-[1.6] border-t border-[#D9D9D9] pt-4">
                      {f.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* inquiry form */}
      <section className="w-full py-14 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 md:px-6">
          <Reveal className="mb-8">
            <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4">1:1 · B2B 문의</p>
            <h2 className="font-serif-kr text-2xl md:text-3xl font-bold text-black tracking-tight leading-[1.2]">문의 남기기</h2>
            <p className="mt-3 text-[#575757] leading-[1.6]">대량 구매·창업 문의는 유형에서 B2B를 선택해 주세요.</p>
          </Reveal>
          <div className="rounded-[24px] bg-[#F7F7F7] p-6 md:p-8" role="form" aria-label="문의 폼">
            <div className="flex gap-2 mb-5">
              {[{ id: 'general', label: '1:1 문의' }, { id: 'b2b', label: 'B2B / 창업' }].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setForm({ ...form, type: t.id })}
                  className={`flex-1 py-2.5 rounded-full font-medium transition-colors ${
                    form.type === t.id ? 'bg-black text-white' : 'bg-white text-[#575757] hover:bg-[#E5E5E5]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">이름 *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="이름을 입력해 주세요"
                  className="w-full px-4 py-3 rounded-xl border border-[#D9D9D9] focus:border-black focus:ring-0 outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">연락처</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-[#D9D9D9] focus:border-black focus:ring-0 outline-none bg-white"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">이메일</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="example@email.com"
                className="w-full px-4 py-3 rounded-xl border border-[#D9D9D9] focus:border-black focus:ring-0 outline-none bg-white"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-[#1D1D1F] mb-1.5">문의 내용 *</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                placeholder="궁금하신 내용을 자유롭게 남겨주세요"
                className="w-full px-4 py-3 rounded-xl border border-[#D9D9D9] focus:border-black focus:ring-0 outline-none bg-white resize-none"
              />
            </div>
            {notice && (
              <div className={`mt-4 p-4 rounded-xl flex items-start gap-2 text-sm ${notice.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {notice.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" strokeWidth={1.75} /> : <AlertCircle className="w-5 h-5 flex-shrink-0" strokeWidth={1.75} />}
                {notice.message}
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full mt-5 inline-flex items-center justify-center gap-2 h-12 rounded-full bg-black text-white font-semibold hover:bg-[#333333] disabled:opacity-60 transition-colors"
            >
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> 접수 중…</> : <><Send className="w-4 h-4" strokeWidth={1.75} /> 문의 접수</>}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}