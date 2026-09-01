import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, FileText } from 'lucide-react';
import { Insight } from '@/api/entities';
import Reveal from '@/components/Reveal';
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
        <div className="h-4 bg-[#efe4d2] rounded w-1/4" />
        <div className="h-10 bg-[#efe4d2] rounded w-3/4" />
        <div className="aspect-[16/9] bg-[#efe4d2] rounded-2xl" />
        <div className="h-40 bg-[#efe4d2] rounded" />
      </div>
    );
  }
  if (!insight) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif-kr text-2xl font-bold text-[#2A211C]">인사이트를 찾을 수 없습니다</h2>
        <Link to="/insights" className="inline-block mt-6 px-6 py-3 rounded-xl bg-[#D84E0B] text-white font-semibold">
          인사이트 목록으로
        </Link>
      </div>
    );
  }
  return (
    <article className="w-full bg-[#FBF7F0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Link to="/insights" className="inline-flex items-center gap-2 text-[#6b5d50] hover:text-[#D84E0B] mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> 인사이트 목록
        </Link>
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-[#D84E0B]">{insight.category}</span>
            <span className="text-sm text-[#a98c5b] flex items-center gap-1"><Clock className="w-4 h-4" /> {insight.readMinutes || 3}분</span>
          </div>
          <h1 className="font-serif-kr text-3xl md:text-4xl font-bold text-[#2A211C] leading-tight">{insight.title}</h1>
          <p className="mt-5 text-lg text-[#5a4d42] leading-relaxed">{insight.excerpt}</p>
        </Reveal>
        {insight.image && (
          <Reveal delay={0.1}>
            <div className="mt-8 rounded-3xl overflow-hidden border border-[#e7dcc9]">
              <img src={insight.image} alt={insight.title} className="w-full aspect-[16/9] object-cover" />
            </div>
          </Reveal>
        )}
        <Reveal delay={0.15}>
          <div className="mt-8 text-[#3a3129] leading-loose text-[17px] whitespace-pre-line">
            {insight.content}
          </div>
        </Reveal>
        {insight.source && (
          <Reveal delay={0.2}>
            <div className="mt-10 rounded-2xl bg-[#F7F1E8]/70 border border-[#e7dcc9] p-5 flex items-start gap-3">
              <FileText className="w-5 h-5 text-[#8B5E3C] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#2A211C] mb-1">출처</p>
                <p className="text-sm text-[#6b5d50]">{insight.source}</p>
              </div>
            </div>
          </Reveal>
        )}
        <div className="mt-12 rounded-3xl bg-[#2A211C] text-white p-8 text-center">
          <h3 className="font-serif-kr text-xl font-bold">내 상황에 맞는 도구가 궁금하다면</h3>
          <p className="mt-3 text-white/60 text-sm">진단 퀴즈로 맞는 구성을 찾아보세요.</p>
          <Link to="/curation" className="inline-block mt-5 px-6 py-3 rounded-xl bg-[#D84E0B] text-white font-semibold hover:bg-[#b8420a] transition-colors">
            추천 구성 진단
          </Link>
        </div>
      </div>
    </article>
  );
}