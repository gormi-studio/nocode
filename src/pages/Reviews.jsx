import { useState, useEffect } from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { Review } from '@/api/entities';
import Reveal from '@/components/Reveal';
const TABS = [
  { id: 'all', label: '전체' },
  { id: 'professional', label: '전문가' },
  { id: 'general', label: '일반 소비자' },
];
export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [tab, setTab] = useState('all');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const filter = {};
        if (tab !== 'all') filter.authorType = tab;
        const res = await Review.paging({ page: 1, limit: 30, filter, sort: '-id' });
        setReviews(res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [tab]);
  return (
    <div className="w-full bg-[#FBF7F0]">
      <section className="w-full overflow-hidden relative">
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-[#D84E0B]/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 md:pt-16">
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D84E0B]/10 text-[#D84E0B] text-sm font-semibold">
              <Sparkles className="w-4 h-4" /> 고객 후기
            </span>
            <h1 className="font-serif-kr text-3xl md:text-5xl font-bold text-[#2A211C] mt-5">전문가와 일반 소비자의 이야기</h1>
            <p className="mt-4 text-[#5a4d42] leading-relaxed">사용 대상에 따라 후기를 구분해 보여드립니다.</p>
          </Reveal>
          <div className="flex gap-2 mt-8">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-colors ${
                  tab === t.id ? 'bg-[#D84E0B] text-white' : 'bg-white text-[#6b5d50] border border-[#eadfce] hover:bg-[#F7F1E8]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-3xl bg-white border border-[#eadfce] p-7 animate-pulse space-y-4">
                  <div className="h-6 bg-[#efe4d2] rounded w-1/4" />
                  <div className="h-20 bg-[#efe4d2] rounded" />
                  <div className="h-10 bg-[#efe4d2] rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20 text-[#a98c5b]">해당 유형의 후기가 아직 없습니다.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r, i) => (
                <Reveal key={r.id} delay={(i % 3) * 0.08}>
                  <div className="h-full rounded-3xl bg-white border border-[#eadfce] p-7 shadow-[0_20px_60px_-30px_rgba(216,78,11,0.2)]">
                    <div className="flex items-center justify-between mb-4">
                      <Quote className="w-8 h-8 text-[#D84E0B]/30" />
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.authorType === 'professional' ? 'bg-[#D84E0B]/12 text-[#D84E0B]' : 'bg-[#8B5E3C]/12 text-[#8B5E3C]'}`}>
                        {r.authorType === 'professional' ? '전문가' : '일반 소비자'}
                      </span>
                    </div>
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} className={`w-4 h-4 ${k < (r.rating || 5) ? 'text-[#D84E0B] fill-[#D84E0B]' : 'text-[#e0d3bd]'}`} />
                      ))}
                    </div>
                    <p className="text-[#4a3f36] leading-relaxed mb-5">{r.content}</p>
                    {r.productName && <p className="text-xs text-[#a98c5b] mb-4">· {r.productName}</p>}
                    <div className="flex items-center gap-3 pt-4 border-t border-[#f0e8da]">
                      {r.avatar ? (
                        <img src={r.avatar} alt={r.authorName} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#D84E0B]/10 flex items-center justify-center text-[#D84E0B] font-bold">{r.authorName?.[0]}</div>
                      )}
                      <div>
                        <p className="font-semibold text-[#2A211C] text-sm">{r.authorName}</p>
                        <p className="text-xs text-[#a98c5b]">{r.authorRole}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}