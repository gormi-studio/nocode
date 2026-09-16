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
    <div className="w-full bg-white">
      <section className="w-full overflow-hidden relative">
        <div className="relative max-w-[1280px] mx-auto px-5 md:px-12 pt-12 pb-8 md:pt-16">
          <Reveal className="max-w-3xl">
            <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" strokeWidth={1.75} /> 미용 인사이트
            </p>
            <h1 className="font-serif-kr text-3xl md:text-5xl font-bold text-black tracking-tight leading-[1.2]">도구를 고르는 관점</h1>
            <p className="mt-4 text-[#575757] leading-[1.6]">
              현장 관찰과 인터뷰를 바탕으로 도구 사용법과 정리 노하우를 정리했습니다.<br />
              인용 자료는 출처를 함께 표기합니다.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="w-full pb-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-[20px] overflow-hidden bg-[#F7F7F7] animate-pulse">
                  <div className="aspect-[16/10] bg-[#F4F4F4]" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-[#F4F4F4] rounded w-1/3" />
                    <div className="h-5 bg-[#F4F4F4] rounded w-2/3" />
                    <div className="h-4 bg-[#F4F4F4] rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.map((it, i) => (
                <Reveal key={it.id} delay={(i % 3) * 0.08}>
                  <Link to={`/insights/${it.slug}`} className="group block h-full">
                    <div className="h-full rounded-[20px] overflow-hidden bg-[#F7F7F7] hover:-translate-y-0.5 transition-transform">
                      <div className="aspect-[16/10] bg-[#F4F4F4] overflow-hidden">
                        {it.image ? (
                          <FallbackImg src={it.image} fallback={it.imageFallback} alt={it.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#767676]">
                            <Sparkles className="w-10 h-10" strokeWidth={1.75} />
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xs font-semibold text-[#A97C3F]">{it.category}</span>
                          <span className="text-xs text-[#767676] flex items-center gap-1"><Clock className="w-3 h-3" strokeWidth={1.75} /> {it.readMinutes || 3}분</span>
                        </div>
                        <h3 className="font-serif-kr text-lg font-bold text-black mb-2 leading-[1.3] line-clamp-2">{it.title}</h3>
                        <p className="text-sm text-[#575757] leading-[1.5] line-clamp-2 mb-3">{it.excerpt}</p>
                        <span className="text-sm font-semibold text-black flex items-center gap-1 group-hover:gap-2 transition-all">
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