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
      <div className="max-w-3xl mx-auto px-4 py-16 animate-pulse space-y-4">
        <div className="h-4 bg-[#E6E3DC] rounded w-1/4" />
        <div className="h-10 bg-[#E6E3DC] rounded w-3/4" />
        <div className="aspect-[16/9] bg-[#E6E3DC] rounded-2xl" />
        <div className="h-40 bg-[#E6E3DC] rounded" />
      </div>
    );
  }
  if (!insight) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif-kr text-2xl font-bold text-[#1E1B18]">인사이트를 찾을 수 없습니다</h2>
        <Link to="/insights" className="inline-block mt-6 px-6 py-3 text-[#A97C3F] font-semibold hover:text-[#7D5D2E] hover:scale-105 transition-all">
          인사이트 목록으로
        </Link>
      </div>
    );
  }
  return (
    <article className="w-full bg-[#F2F1EE]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Link to="/insights" className="inline-flex items-center gap-2 text-[#5C574C] hover:text-[#A97C3F] mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> 인사이트 목록
        </Link>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-[#A97C3F]">{insight.category}</span>
            <span className="text-sm text-[#948A76] flex items-center gap-1"><Clock className="w-4 h-4" /> {insight.readMinutes || 3}분</span>
          </div>
          <h1 className="font-serif-kr text-3xl md:text-4xl font-bold text-[#1E1B18] leading-tight">{insight.title}</h1>
          <p className="mt-5 text-lg text-[#4F4A40] leading-relaxed">{insight.excerpt}</p>
        </Reveal>
        {insight.image && (
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-3xl overflow-hidden border border-[#DCD8CE]">
              <FallbackImg src={insight.image} fallback={insight.imageFallback} alt={insight.title} className="w-full aspect-[16/9] object-cover" />
            </div>
          </Reveal>
        )}
        <Reveal delay={0.15}>
          <div className="mt-8 text-[#332F29] leading-loose text-[17px] whitespace-pre-line">
            {insight.content}
          </div>
        </Reveal>
        {insight.source && (
          <Reveal delay={0.2}>
            <div className="mt-10 rounded-2xl bg-[#EBE9E3]/70 border border-[#DCD8CE] p-5 flex items-start gap-3">
              <FileText className="w-5 h-5 text-[#6E6155] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#1E1B18] mb-1">출처</p>
                <p className="text-sm text-[#5C574C]">{insight.source}</p>
              </div>
            </div>
          </Reveal>
        )}
        <div className="mt-12 rounded-3xl bg-[#1E1B18] text-white p-8 text-center">
          <h3 className="font-serif-kr text-xl font-bold">내 상황에 맞는 도구가 궁금하다면</h3>
          <p className="mt-3 text-white/60 text-sm">진단 퀴즈로 맞는 구성을 찾아보세요.</p>
          <Link to="/curation" className="inline-block mt-5 px-6 py-3 text-white font-semibold hover:text-[#D9BE93] hover:scale-105 transition-all">
            추천 구성 진단
          </Link>
        </div>
      </div>
    </article>
  );
}