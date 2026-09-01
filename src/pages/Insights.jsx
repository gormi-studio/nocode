import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Insight } from '@/api/entities';
import Reveal from '@/components/Reveal';
import FallbackImg from '@/components/FallbackImg';
export default function Insights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await Insight.paging({ page: 1, limit: 20, sort: '-id' });
        setInsights(res.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="w-full bg-[#FBF7F0]">
      <section className="w-full overflow-hidden relative">
        <div className="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#D84E0B]/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 md:pt-16">
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D84E0B]/10 text-[#D84E0B] text-sm font-semibold">
              <Sparkles className="w-4 h-4" /> 미용 인사이트
            </span>
            <h1 className="font-serif-kr text-3xl md:text-5xl font-bold text-[#2A211C] mt-5">도구를 고르는 관점</h1>
            <p className="mt-4 text-[#5a4d42] leading-relaxed">
              현장 관찰과 인터뷰를 바탕으로 도구 사용법과 정리 노하우를 정리했습니다. 인용 자료는 출처를 함께 표기합니다.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="w-full pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-3xl overflow-hidden bg-white border border-[#eadfce] animate-pulse">
                  <div className="aspect-[16/10] bg-[#efe4d2]" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-[#efe4d2] rounded w-1/3" />
                    <div className="h-5 bg-[#efe4d2] rounded w-2/3" />
                    <div className="h-4 bg-[#efe4d2] rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.map((it, i) => (
                <Reveal key={it.id} delay={(i % 3) * 0.08}>
                  <Link to={`/insights/${it.slug}`} className="group block h-full">
                    <div className="h-full rounded-3xl overflow-hidden bg-white border border-[#eadfce] hover:-translate-y-1 hover:shadow-lg transition-all">
                      <div className="aspect-[16/10] bg-[#F1E8D8] overflow-hidden">
                        {it.image ? (
                          <FallbackImg src={it.image} fallback={it.imageFallback} alt={it.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#c9a86f]">
                            <Sparkles className="w-10 h-10" />
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-semibold text-[#D84E0B]">{it.category}</span>
                          <span className="text-xs text-[#a98c5b] flex items-center gap-1"><Clock className="w-3 h-3" /> {it.readMinutes || 3}분</span>
                        </div>
                        <h3 className="font-serif-kr text-lg font-bold text-[#2A211C] mb-2 line-clamp-2">{it.title}</h3>
                        <p className="text-sm text-[#6b5d50] leading-relaxed line-clamp-2 mb-3">{it.excerpt}</p>
                        <span className="text-sm font-semibold text-[#D84E0B] flex items-center gap-1 group-hover:gap-2 transition-all">
                          읽어보기 <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}