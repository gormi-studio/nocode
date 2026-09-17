import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import {
  HERO_IMAGE, HERO_IMAGE_2, BRAND_STORY_IMAGE, PROMO_SALON_COUNTER_IMAGE,
} from '@/data/fixtures';

// Curated testimonial pool — large enough that the infinite carousel below
// doesn't visibly repeat within a couple of loops.
const REVIEWS = [
  { name: '조아라', role: '1인 미용실 운영', content: '정리함 하나 바꿨을 뿐인데 매장 인상이 달라졌어요.' },
  { name: '배수민', role: '헤어디자이너', content: '수납이 넉넉해서 자주 쓰는 제품을 한 번에 관리할 수 있어요. 동선도 좋아졌어요.' },
  { name: '오세린', role: '일반 소비자', content: '집에서도 전문가용 도구를 깔끔하게 보관할 수 있어서 만족합니다.' },
  { name: '강도윤', role: '프리랜서 헤어디자이너', content: '보기 좋게 정리되니 사용하는 시간도 더 즐거워졌어요. 실용성과 분위기를 둘 다 잡았어요.' },
  { name: '임채원', role: '헤어디자이너', content: '색상과 구성을 골라 맞출 수 있어서 제 작업 방식에 잘 맞아요.' },
  { name: '한소미', role: '일반 소비자', content: '브러시, 핀클립, 소도구까지 구분해서 넣기 좋아요.' },
  { name: '이현서', role: '일반 소비자', content: '매일 쓰는 제품이라 더 만족스러워요.' },
  { name: '이수진', role: '헤어디자이너', content: '작업대가 한결 깔끔해졌어요. 툴 정리가 쉬워져서 시술에만 집중할 수 있었어요.' },
  { name: '박지훈', role: '1인 미용실 운영', content: '튼튼하고 마감이 정말 깔끔해요. 매일 쓰는 제품인데 디테일이 달라요. 역시 전문가용은 다르네요.' },
  { name: '김은지', role: '프리랜서 헤어디자이너', content: '정리된 공간이 더 좋은 스타일을 만듭니다. 이제는 필수템이에요.' },
  { name: '최민서', role: '헤어디자이너', content: '트레이 하나로 시술 동선이 정말 편해졌어요. 컬러약, 브러시, 클립까지 한눈에 정리되니까 시간도 절약돼요.' },
  { name: '정하은', role: '1인 미용실 운영', content: '손이 자주 가는 도구들이 항상 제자리에 있어서 너무 좋아요. 수납력이 좋으면서도 디자인이 예뻐서 매장 분위기까지 살아요.' },
  { name: '한소민', role: '일반 소비자', content: '집에서도 전문가처럼 관리할 수 있어요. 퀄리티가 정말 좋아서 오래 사용할 것 같아요.' },
];

// Small rotating pool of real salon photos to fill whichever review lands in
// the enlarged center slot — the brand didn't supply a unique photo per
// reviewer, so a handful of existing lifestyle shots are cycled instead.
const CENTER_PHOTOS = [BRAND_STORY_IMAGE, HERO_IMAGE_2, HERO_IMAGE, PROMO_SALON_COUNTER_IMAGE];

const CARD_WIDTH = 260;
const GAP = 24;
const PITCH = CARD_WIDTH + GAP;
const LOOPS = 5;
const N = REVIEWS.length;
const LOOP_ITEMS = Array.from({ length: N * LOOPS }, (_, i) => REVIEWS[i % N]);
const START_INDEX = N * Math.floor(LOOPS / 2);

function Stars({ active }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, k) => (
        <Star
          key={k}
          className={`w-4 h-4 ${active ? 'text-[#E5C48C] fill-[#E5C48C]' : 'text-[#A97C3F] fill-[#A97C3F]'}`}
        />
      ))}
    </div>
  );
}

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(START_INDEX);
  const [skipTransition, setSkipTransition] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const viewportRef = useRef(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setViewportWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => i + 1), 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (index >= N * (LOOPS - 1)) {
      setSkipTransition(true);
      setIndex((i) => i - N * (LOOPS - 2));
    } else if (index < N) {
      setSkipTransition(true);
      setIndex((i) => i + N * (LOOPS - 2));
    }
  }, [index]);

  useEffect(() => {
    if (skipTransition) {
      const raf = requestAnimationFrame(() => setSkipTransition(false));
      return () => cancelAnimationFrame(raf);
    }
  }, [skipTransition]);

  const offsetPx = viewportWidth / 2 - CARD_WIDTH / 2 - index * PITCH;

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="이전 후기"
        onClick={() => setIndex((i) => i - 1)}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full bg-white shadow-md items-center justify-center text-black hover:bg-[#F4F4F4] transition-colors"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        aria-label="다음 후기"
        onClick={() => setIndex((i) => i + 1)}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full bg-white shadow-md items-center justify-center text-black hover:bg-[#F4F4F4] transition-colors"
      >
        <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
      </button>
      <div
        ref={viewportRef}
        className="overflow-hidden py-6"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: `${GAP}px`,
            transform: `translateX(${offsetPx}px)`,
            transition: skipTransition ? 'none' : 'transform 1100ms cubic-bezier(0.65, 0, 0.35, 1)',
          }}
        >
          {LOOP_ITEMS.map((r, i) => {
            const isActive = i === index;
            return (
              <div
                key={i}
                style={{
                  width: `${CARD_WIDTH}px`,
                  transition: skipTransition ? 'none' : 'transform 1100ms cubic-bezier(0.65, 0, 0.35, 1), box-shadow 1100ms ease',
                }}
                className={`relative flex-shrink-0 h-[280px] rounded-[20px] overflow-hidden ${
                  isActive ? 'scale-[1.18] z-10 shadow-xl' : 'scale-100 bg-white'
                }`}
              >
                {isActive && (
                  <>
                    <img src={CENTER_PHOTOS[i % CENTER_PHOTOS.length]} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                  </>
                )}
                <div className={`relative h-full p-6 flex flex-col ${isActive ? 'text-white' : 'text-[#1D1D1F]'}`}>
                  <Stars active={isActive} />
                  <p className={`text-sm leading-[1.6] line-clamp-5 flex-1 ${isActive ? 'font-medium' : ''}`}>{r.content}</p>
                  <div className="flex items-center gap-2 mt-4">
                    <div
                      className={`w-9 h-9 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-sm ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#F4F4F4] text-black'
                      }`}
                    >
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{r.name}</p>
                      <p className={`text-xs ${isActive ? 'text-white/70' : 'text-[#767676]'}`}>{r.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
