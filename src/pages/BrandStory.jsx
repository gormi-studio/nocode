import { Link } from 'react-router-dom';
import { Sparkles, Eye, ScrollText, Heart, ArrowRight, Palette } from 'lucide-react';
import Reveal from '@/components/Reveal';
const TIMELINE = [
  { year: '관찰', title: '현장에서 시작', desc: '미용사 인터뷰와 현장 관찰을 통해 도구 정리와 선택의 불편을 확인했습니다.' },
  { year: '기획', title: '맥락 중심 콘텐츠', desc: '수치·규격 나열 대신 실제 사용 상황으로 제품을 설명하는 원칙을 세웠습니다.' },
  { year: '조합', title: '커스터마이징 시스템', desc: '소재·색상·도구함·모듈을 직접 조합하는 커스텀 트레이를 핵심 경험으로 만들었습니다.' },
  { year: '연결', title: '전문가와 일반의 다리', desc: '전문가용과 일반용을 함께 안내해 처음 방문한 소비자도 비교·선택할 수 있게 했습니다.' },
];
const VALUES = [
  { icon: Eye, title: '현장 기반', desc: '미용사 인터뷰·현장 사진·실측 데이터를 공공 통계보다 우선 배치합니다.' },
  { icon: ScrollText, title: '맥락 중심', desc: '스펙 나열이 아닌 실제 사용 맥락으로 제품을 설명합니다.' },
  { icon: Heart, title: '정확한 표현', desc: '과장·효과 보장·근거 없는 비교 표현을 지양하고 사실에 기반합니다.' },
];
export default function BrandStory() {
  return (
    <div className="w-full">
      <section className="w-full bg-[#1E1B18] text-white overflow-hidden relative">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#A97C3F]/25 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-20 md:pb-28">
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#D9BE93] text-sm font-semibold">
              <Sparkles className="w-4 h-4" /> 브랜드 스토리
            </span>
            <h1 className="font-serif-kr text-4xl md:text-5xl lg:text-6xl font-bold mt-6 leading-tight">
              도구를 고르는 일이<br />어렵지 않도록
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
              고르미는 헤어디자이너와 전문가용 제품을 찾는 일반 소비자 모두를 위한 맞춤 헤어미용도구 브랜드입니다.
              보고 · 비교하고 · 조합하는 커스터마이징 경험을 제안합니다.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="w-full py-16 md:py-24 bg-[#F2F1EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <p className="text-[#A97C3F] font-semibold mb-3">창업 배경</p>
              <h2 className="font-serif-kr text-3xl md:text-4xl font-bold text-[#1E1B18] leading-tight">
                전문가의 도구를<br />누구나 이해하도록
              </h2>
              <p className="mt-6 text-[#4F4A40] leading-relaxed">
                전문가용 미용재료는 종류가 많고 차이를 파악하기 어렵습니다. 고르미는 각 제품에 사용 대상과
                추천·예외 상황을 함께 표기해, 처음 방문한 소비자도 자신의 상황에 맞는 도구를 고를 수 있도록 구성했습니다.
              </p>
              <p className="mt-4 text-[#4F4A40] leading-relaxed">
                또한 트레이 색상·소재부터 도구함, 정리대 모듈까지 조합할 수 있는 커스터마이징 시스템으로,
                고정된 완제품 대신 작업 흐름에 맞춘 구성을 직접 만들 수 있게 했습니다.
              </p>
              <Link
                to="/tray-builder"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-xl bg-[#A97C3F] text-white font-semibold hover:bg-[#7D5D2E] active:scale-95 transition-all"
              >
                커스텀 트레이 둘러보기 <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="space-y-4">
                {TIMELINE.map((t, i) => (
                  <div key={i} className="flex gap-5 rounded-2xl bg-white border border-[#DAD6CC] p-6">
                    <div className="flex-shrink-0 w-16 text-center">
                      <span className="font-serif-kr text-[#A97C3F] font-bold">{t.year}</span>
                    </div>
                    <div>
                      <h3 className="font-serif-kr font-bold text-[#1E1B18] mb-1">{t.title}</h3>
                      <p className="text-sm text-[#5C574C] leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-12">
            <p className="text-[#A97C3F] font-semibold mb-3">핵심 차별점 요약</p>
            <h2 className="font-serif-kr text-3xl md:text-4xl font-bold text-[#1E1B18]">고르미가 지키는 것</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="h-full rounded-3xl bg-[#EBE9E3]/70 border border-[#DCD8CE] p-8">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-5 shadow-sm">
                    <v.icon className="w-7 h-7 text-[#A97C3F]" />
                  </div>
                  <h3 className="font-serif-kr text-xl font-bold text-[#1E1B18] mb-2">{v.title}</h3>
                  <p className="text-[#5C574C] leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-12 rounded-3xl border border-[#DAD6CC] p-8 flex flex-col md:flex-row items-start gap-5">
              <Palette className="w-8 h-8 text-[#A97C3F] flex-shrink-0" />
              <div>
                <h3 className="font-serif-kr font-bold text-[#1E1B18] mb-2">브랜드 컬러</h3>
                <p className="text-[#5C574C] leading-relaxed">
                  따뜻한 노을을 닮은 오렌지와 넉넉한 여백의 아이보리. 공예 감성과 신뢰감을 함께 담았습니다.
                </p>
                <div className="mt-4 flex gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full" style={{ backgroundColor: '#A97C3F' }} />
                    <span className="text-sm text-[#5C574C]">#A97C3F</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full border border-[#D6D1C4]" style={{ backgroundColor: '#EBE9E3' }} />
                    <span className="text-sm text-[#5C574C]">#EBE9E3</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}