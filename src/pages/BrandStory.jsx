import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ScrollText, Heart, ArrowRight } from 'lucide-react';
import { BRAND_STORY_IMAGE, BRAND_STORY_VIDEO } from '@/data/fixtures';
import Reveal from '@/components/Reveal';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from '@/components/ui/dialog';
const TIMELINE = [
  { year: '관찰', title: '현장에서 시작', desc: '미용사 인터뷰와 현장 관찰을 통해 도구 정리와 선택의 불편을 확인했습니다.' },
  { year: '기획', title: '맥락 중심 콘텐츠', desc: '사용자의 업무 스타일에 맞도록 도구 구성을 디자인했습니다.' },
  { year: '조합', title: '커스터마이징 시스템', desc: '소재·색상·도구함·모듈을 직접 조합하는 커스텀 트레이를 핵심 경험으로 만들었습니다.' },
  { year: '연결', title: '일반인도 전문가의 도구를', desc: '전문가가 쓰는 품질 좋은 도구를 일반 소비자도 쉽게 발견하고 사용할 수 있도록 안내합니다.' },
];
const VALUES = [
  { icon: Eye, title: '현장을 봅니다', desc: '실제 미용인의 작업환경과 사용방식을 기준으로 제품을 살펴봅니다.' },
  { icon: ScrollText, title: '쓰임을 봅니다', desc: '기능과 디자인이 실제 작업에 도움이 되는지 먼저 확인합니다.' },
  { icon: Heart, title: '있는 그대로 설명합니다', desc: '필요한 정보는 쉽게, 장점은 과장하지 않고 전달합니다.' },
];
export default function BrandStory() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  return (
    <div className="w-full">
      <section className="relative w-full h-[480px] sm:h-[560px] lg:h-[680px] overflow-hidden">
        <img
          src={BRAND_STORY_IMAGE}
          alt="고급스러운 헤어 살롱 카운터에 정리된 헤어 스타일링 도구"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/10" />
        <div className="relative h-full max-w-[1280px] mx-auto px-5 md:px-12 flex flex-col justify-center">
          <Reveal className="max-w-3xl">
            <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4">브랜드 스토리</p>
            <h1 className="font-serif-kr text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] tracking-tight text-black">
              도구를 고르는 일이<br />어렵지 않도록
            </h1>
            <p className="mt-6 text-lg text-[#575757] leading-[1.55] break-keep">
              고르미는 헤어디자이너와 전문가용 제품을 찾는 일반 소비자 모두를 위한 맞춤 헤어미용도구 브랜드입니다.
              보고 · 비교하고 · 조합하는 커스터마이징 경험을 제안합니다.
            </p>
          </Reveal>
        </div>
      </section>
      {/* BRAND FILM BANNER */}
      <button
        type="button"
        onClick={() => setShowVideoModal(true)}
        className="group block relative w-full aspect-[21/9] overflow-hidden text-left appearance-none bg-transparent p-0 border-0 cursor-pointer"
      >
        <video
          src={BRAND_STORY_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-white font-serif-kr text-lg md:text-2xl font-bold">고르미의 이야기 더 보기</p>
        </div>
      </button>
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-md bg-white border-0 rounded-[24px]">
          <DialogHeader>
            <DialogTitle className="font-serif-kr text-black">유튜브로 이동합니다</DialogTitle>
            <DialogDescription className="text-[#575757]">
              '고르미의 이야기 더 보기'를 누르면 고르미 유튜브 채널로 이동합니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button type="button" className="px-4 py-2 text-sm text-[#575757] hover:text-black transition-colors">
                닫기
              </button>
            </DialogClose>
            {/* TODO: swap in the real YouTube channel URL once it exists. */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-black text-white text-sm font-semibold hover:bg-[#333333] transition-colors"
            >
              유튜브로 이동
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <section id="story" className="w-full py-20 md:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4">창업 배경</p>
              <h2 className="font-serif-kr text-3xl md:text-4xl font-bold text-black tracking-tight leading-[1.2]">
                전문가의 도구를<br />누구나 이해하도록
              </h2>
              <p className="mt-6 text-[#575757] leading-[1.6]">
                전문가용 미용재료는 종류가 많고 차이를 파악하기 어렵습니다. 고르미는 각 제품에 사용 대상과
                추천·예외 상황을 함께 표기해, 처음 방문한 소비자도 자신의 상황에 맞는 도구를 고를 수 있도록 구성했습니다.
              </p>
              <p className="mt-4 text-[#575757] leading-[1.6]">
                또한 트레이 색상·소재부터 도구함, 정리대 모듈까지 조합할 수 있는 커스터마이징 시스템으로,
                고정된 완제품 대신 작업 흐름에 맞춘 구성을 직접 만들 수 있게 했습니다.
              </p>
              <Link
                to="/tray-builder"
                className="group inline-flex items-center gap-2 mt-8 text-black font-semibold hover:text-[#A97C3F] transition-colors"
              >
                커스텀 트레이 둘러보기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="space-y-4">
                {TIMELINE.map((t, i) => (
                  <div key={i} className="flex gap-5 rounded-[20px] bg-[#F7F7F7] p-6">
                    <div className="flex-shrink-0 w-16 text-center">
                      <span className="font-serif-kr text-[#A97C3F] font-bold">{t.year}</span>
                    </div>
                    <div>
                      <h3 className="font-serif-kr font-bold text-black mb-1 leading-[1.3]">{t.title}</h3>
                      <p className="text-sm text-[#575757] leading-[1.5]">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="w-full py-20 md:py-28 bg-[#F7F7F7]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12">
          <Reveal className="max-w-2xl mb-12">
            <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4">핵심차별점</p>
            <h2 className="font-serif-kr text-3xl md:text-4xl font-bold text-black tracking-tight leading-[1.2]">고르미가 지키는 것</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="h-full rounded-[20px] bg-white p-8 hover:-translate-y-0.5 transition-transform">
                  <div className="w-14 h-14 rounded-2xl bg-[#F7F7F7] flex items-center justify-center mb-5">
                    <v.icon className="w-7 h-7 text-black" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-serif-kr text-xl font-bold text-black mb-2 leading-[1.3]">{v.title}</h3>
                  <p className="text-[#575757] leading-[1.6]">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}