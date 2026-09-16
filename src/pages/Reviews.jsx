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
    <div className="w-full bg-white">
      <section className="w-full overflow-hidden relative">
        <div className="relative max-w-[1280px] mx-auto px-5 md:px-12 pt-12 pb-8 md:pt-16">
          <Reveal className="max-w-3xl">
            <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" strokeWidth={1.75} /> 고객 후기
            </p>
            <h1 className="font-serif-kr text-3xl md:text-5xl font-bold text-black tracking-tight leading-[1.2]">전문가와 일반 소비자의 이야기</h1>
            <p className="mt-4 text-[#575757] leading-[1.6]">사용 대상에 따라 후기를 구분해 보여드립니다.</p>
          </Reveal>
          <div className="flex gap-2 mt-8">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-colors ${
                  tab === t.id ? 'bg-black text-white' : 'bg-[#F4F4F4] text-[#575757] hover:bg-[#E5E5E5]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full pb-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-[20px] bg-[#F7F7F7] p-7 animate-pulse space-y-4">
                  <div className="h-6 bg-[#F4F4F4] rounded w-1/4" />
                  <div className="h-20 bg-[#F4F4F4] rounded" />
                  <div className="h-10 bg-[#F4F4F4] rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20 text-[#767676]">해당 유형의 후기가 아직 없습니다.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r, i) => (
                <Reveal key={r.id} delay={(i % 3) * 0.08}>
                  <div className="h-full rounded-[20px] bg-[#F7F7F7] p-7">
                    <div className="flex items-center justify-between mb-4">
                      <Quote className="w-8 h-8 text-[#D9D9D9]" strokeWidth={1.75} />
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.authorType === 'professional' ? 'bg-black text-white' : 'bg-[#F4F4F4] text-[#575757]'}`}>
                        {r.authorType === 'professional' ? '전문가' : '일반 소비자'}
                      </span>
                    </div>
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} className={`w-4 h-4 ${k < (r.rating || 5) ? 'text-[#A97C3F] fill-[#A97C3F]' : 'text-[#D9D9D9]'}`} />
                      ))}
                    </div>
                    <p className="text-[#1D1D1F] leading-[1.6] mb-5">{r.content}</p>
                    {r.productName && <p className="text-xs text-[#767676] mb-4">· {r.productName}</p>}
                    <div className="flex items-center gap-3 pt-4 border-t border-[#D9D9D9]">
                      {r.avatar ? (
                        <img src={r.avatar} alt={r.authorName} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold">{r.authorName?.[0]}</div>
                      )}
                      <div>
                        <p className="font-semibold text-black text-sm">{r.authorName}</p>
                        <p className="text-xs text-[#767676]">{r.authorRole}</p>
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