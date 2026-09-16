import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, FileText } from 'lucide-react';
import { Insight } from '@/api/entities';
import Reveal from '@/components/Reveal';
import FallbackImg from '@/components/FallbackImg';
export default function InsightDetail() {
  const { slug } = useParams();
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await Insight.paging({ page: 1, limit: 1, filter: { slug } });
        setInsight(res.data.data[0] || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-16 animate-pulse space-y-4">
        <div className="h-4 bg-[#F4F4F4] rounded w-1/4" />
        <div className="h-10 bg-[#F4F4F4] rounded w-3/4" />
        <div className="aspect-[16/9] bg-[#F4F4F4] rounded-[20px]" />
        <div className="h-40 bg-[#F4F4F4] rounded" />
      </div>
    );
  }
  if (!insight) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-24 text-center">
        <h2 className="font-serif-kr text-2xl font-bold text-black">인사이트를 찾을 수 없습니다</h2>
        <Link to="/insights" className="inline-flex items-center justify-center mt-6 h-11 px-6 rounded-full bg-black text-white font-semibold hover:bg-[#333333] transition-colors">
          인사이트 목록으로
        </Link>
      </div>
    );
  }
  return (
    <article className="w-full bg-white">
      <div className="max-w-3xl mx-auto px-5 md:px-6 py-10 md:py-16">
        <Link to="/insights" className="inline-flex items-center gap-2 text-[#575757] hover:text-black mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" strokeWidth={1.75} /> 인사이트 목록
        </Link>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-[#A97C3F]">{insight.category}</span>
            <span className="text-sm text-[#767676] flex items-center gap-1"><Clock className="w-4 h-4" strokeWidth={1.75} /> {insight.readMinutes || 3}분</span>
          </div>
          <h1 className="font-serif-kr text-3xl md:text-4xl font-bold text-black tracking-tight leading-[1.2]">{insight.title}</h1>
          <p className="mt-5 text-lg text-[#575757] leading-[1.55]">{insight.excerpt}</p>
        </Reveal>
        {insight.image && (
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-[20px] overflow-hidden">
              <FallbackImg src={insight.image} fallback={insight.imageFallback} alt={insight.title} className="w-full aspect-[16/9] object-cover" />
            </div>
          </Reveal>
        )}
        <Reveal delay={0.15}>
          <div className="mt-8 text-[#1D1D1F] leading-[1.8] text-[17px] whitespace-pre-line">
            {insight.content}
          </div>
        </Reveal>
        {insight.source && (
          <Reveal delay={0.2}>
            <div className="mt-10 rounded-[16px] bg-[#F7F7F7] p-5 flex items-start gap-3">
              <FileText className="w-5 h-5 text-black flex-shrink-0 mt-0.5" strokeWidth={1.75} />
              <div>
                <p className="text-sm font-semibold text-black mb-1">출처</p>
                <p className="text-sm text-[#575757]">{insight.source}</p>
              </div>
            </div>
          </Reveal>
        )}
        <div className="mt-12 rounded-[24px] bg-black text-white p-8 text-center">
          <h3 className="font-serif-kr text-xl font-bold leading-[1.3]">내 상황에 맞는 도구가 궁금하다면</h3>
          <p className="mt-3 text-[#CCCCCC] text-sm">진단 퀴즈로 맞는 구성을 찾아보세요.</p>
          <Link to="/curation" className="inline-flex items-center justify-center mt-5 h-11 px-6 rounded-full bg-white text-black font-semibold hover:bg-[#E5E5E5] transition-colors">
            추천 구성 진단
          </Link>
        </div>
      </div>
    </article>
  );
}