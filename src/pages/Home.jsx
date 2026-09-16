import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Palette, Layers, Sparkles, Eye, ArrowRight, Star, Quote,
  Search, CheckCircle, Package, Package2, ShoppingBag,
  Scissors, Brush, Paintbrush, Briefcase,
} from 'lucide-react';
import { Product, Review, Insight } from '@/api/entities';
import { HERO_IMAGE, HERO_IMAGE_2, HERO_IMAGE_FALLBACK, products as PRODUCT_FIXTURES, insights as INSIGHT_FIXTURES } from '@/data/fixtures';
import Reveal from '@/components/Reveal';
import FallbackImg from '@/components/FallbackImg';
import ProductCard from '@/components/ProductCard';
const DIFF = [
  { icon: Palette, title: '소재·색상 선택', desc: '천연가죽·합성가죽과 색상을 취향과 작업 환경에 맞춰 고를 수 있습니다.' },
  { icon: Package, title: '도구함 추가', desc: '필요한 만큼 도구함을 더해 사용하는 도구 수에 맞게 확장합니다.' },
  { icon: Layers, title: '모듈 조합', desc: '롤빗·가위 정리대 등 모듈을 조합해 나만의 정리 구성을 만듭니다.' },
];
const SHORTCUTS = [
  { icon: Scissors, label: '가위', href: '/products?group=salon&category=1' },
  { icon: Brush, label: '빗', href: '/products?group=salon&category=2' },
  { icon: Paintbrush, label: '브러쉬', href: '/products?group=salon&category=3' },
  { icon: Package, label: '정리 트레이', href: '/products?group=storage&category=4' },
  { icon: Briefcase, label: '이동식 정리함', href: '/products?group=storage&category=5' },
  { icon: Package2, label: '핀·클립 정리', href: '/products?group=storage&category=6' },
];
const PROMOS = [
  {
    eyebrow: '신제품 출시',
    title: '하이브리드 이동 트레이\n지금 만나보세요',
    image: PRODUCT_FIXTURES.find((p) => p.slug === 'pro-cutting-scissors')?.image,
    href: '/products/pro-cutting-scissors',
  },
  {
    eyebrow: '미용 인사이트',
    title: '도구를 고르는\n관점 살펴보기',
    image: INSIGHT_FIXTURES.find((i) => i.slug === 'salon-tray-organizing-tips')?.image,
    href: '/insights',
  },
];
const HERO_IMAGES = [
  { src: HERO_IMAGE, alt: '작업대에 정리된 헤어 스타일링 도구' },
  { src: HERO_IMAGE_2, alt: '살롱 카운터에 정리된 헤어 스타일링 도구' },
];
const STEPS = [
  { n: '01', icon: Eye, title: '보고', desc: '제품마다 추천 상황과 예외 상황을 실제 사용 맥락으로 살펴봅니다.' },
  { n: '02', icon: Search, title: '비교하고', desc: '전문가용·입문자용 구분과 용도별 필터로 나에게 맞는 도구를 비교합니다.' },
  { n: '03', icon: Layers, title: '조합하고', desc: '커스텀 트레이 빌더에서 소재·색상·모듈을 직접 조합합니다.' },
  { n: '04', icon: ShoppingBag, title: '구매', desc: '실시간 미리보기로 완성 구성을 확인하고 문의로 이어집니다.' },
];
export default function Home() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroIdx, setHeroIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setHeroIdx((i) => (i + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [p, r, i] = await Promise.all([
          Product.paging({ page: 1, limit: 4, filter: { isFeatured: true }, sort: '-id' }),
          Review.paging({ page: 1, limit: 3, sort: '-id' }),
          Insight.paging({ page: 1, limit: 3, sort: '-id' }),
        ]);
        setProducts(p.data.data);
        setReviews(r.data.data);
        setInsights(i.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="w-full">
      {/* HERO — content left, full-bleed photo right */}
      <section className="relative w-full bg-white overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none select-none absolute -bottom-10 left-0 w-full overflow-hidden hidden lg:block">
          <div className="flex w-max animate-marquee">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="font-serif-kr font-extrabold text-[20vw] leading-none text-transparent pr-8 whitespace-nowrap"
                style={{ WebkitTextStroke: '1px #D9D9D9' }}
              >
                GORMI
              </span>
            ))}
          </div>
        </div>
        <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] lg:min-h-[820px]">
          <div className="order-2 lg:order-1 flex flex-col justify-center px-5 sm:px-6 lg:pr-10 py-16 lg:py-10 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
            <Reveal>
              <h1 className="font-serif-kr font-bold text-black text-5xl sm:text-6xl lg:text-[4rem] leading-[1.2] tracking-tight max-w-[800px]">
                쓰는 방식에 맞춰<br />고르는 헤어미용도구
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[#575757] leading-[1.55] max-w-md text-lg">
                가위와 브러쉬를 어디에 놓고 쓰는지에서 시작합니다.<br />
                소재·색상·도구함·모듈을 직접 골라<br />
                작업대에 맞는 트레이를 구성하고,<br />
                현장에서 쓰는 헤어용품을 함께 준비하세요.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="relative mt-9 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/tray-builder"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-black text-white font-semibold hover:bg-[#333333] transition-colors"
                >
                  커스텀 트레이 만들기 <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/curation"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-black text-black font-semibold hover:bg-black hover:text-white transition-colors"
                >
                  추천 구성 진단
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="order-1 lg:order-2">
            <div className="relative h-[45vh] lg:h-full overflow-hidden">
              {HERO_IMAGES.map((img, i) => (
                <FallbackImg
                  key={img.src}
                  src={img.src}
                  fallback={HERO_IMAGE_FALLBACK}
                  alt={img.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    i === heroIdx ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute bottom-6 left-6 w-24 h-24 rounded-full bg-black text-white flex items-center justify-center text-center shadow-xl px-2">
                <span className="font-serif-kr font-bold text-sm leading-tight">고르미<br />커스텀</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      {/* CATEGORY SHORTCUTS */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12">
          <div className="flex gap-10 md:gap-14 overflow-x-auto sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:overflow-visible pb-2 sm:pb-0 -mx-1 px-1">
            {SHORTCUTS.map((s) => (
              <Link
                key={s.label}
                to={s.href}
                className="group flex-shrink-0 w-24 sm:w-auto flex flex-col items-center gap-3 text-center"
              >
                <div className="w-16 h-16 rounded-full border border-[#D9D9D9] group-hover:border-black flex items-center justify-center transition-colors">
                  <s.icon className="w-6 h-6 text-black" strokeWidth={1.75} />
                </div>
                <span className="text-xs font-semibold text-[#575757] group-hover:text-black transition-colors">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* DIFFERENTIATOR */}
      <section className="w-full py-20 md:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12">
          <Reveal className="max-w-[800px]">
            <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4">핵심 차별점</p>
            <h2 className="font-serif-kr text-4xl md:text-5xl font-bold text-black tracking-tight leading-[1.2]">
              직접 조합할 수 있는<br />커스터마이징 시스템
            </h2>
            <p className="mt-5 text-[#575757] leading-[1.6] max-w-[680px]">
              트레이 색상·소재부터 도구함, 정리대 모듈까지 조합해 작업 흐름에 맞춘 구성을 만듭니다.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {DIFF.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.1}>
                <div className="h-full rounded-[20px] bg-[#F7F7F7] p-8 hover:-translate-y-0.5 transition-transform">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-5">
                    <d.icon className="w-7 h-7 text-black" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-serif-kr text-xl font-bold text-black mb-2 leading-[1.3]">{d.title}</h3>
                  <p className="text-[#575757] leading-[1.6]">{d.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* PURCHASE PROCESS — numbered steps (dark section) */}
      <section className="w-full py-20 md:py-28 bg-black text-white overflow-hidden relative">
        <div className="relative max-w-[1280px] mx-auto px-5 md:px-12">
          <Reveal className="max-w-[800px]">
            <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4">구매 프로세스</p>
            <h2 className="font-serif-kr text-4xl md:text-5xl font-bold tracking-tight leading-[1.2]">보고 → 비교 → 조합 → 구매</h2>
            <p className="mt-5 text-[#CCCCCC] leading-[1.6]">
              스펙 나열이 아니라 실제 사용 맥락을 기준으로<br />
              도구를 선택하는 흐름입니다.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="h-full rounded-[20px] bg-white/5 p-7 hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif-kr text-4xl font-bold text-[#A97C3F]">{s.n}</span>
                    <s.icon className="w-6 h-6 text-white/50" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-serif-kr text-xl font-bold mb-2 leading-[1.3]">{s.title}</h3>
                  <p className="text-sm text-[#CCCCCC] leading-[1.5]">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* FEATURED PRODUCTS */}
      <section className="w-full py-20 md:py-28 bg-[#F7F7F7]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <Reveal>
              <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4">대표 상품</p>
              <h2 className="font-serif-kr text-4xl md:text-5xl font-bold text-black tracking-tight leading-[1.2]">현장에서 자주 선택되는 구성</h2>
            </Reveal>
            <Link to="/products" className="group text-black font-semibold flex items-center gap-1">
              전체 보기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="rounded-[20px] overflow-hidden bg-white animate-pulse">
                  <div className="aspect-square bg-[#F4F4F4]" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-[#F4F4F4] rounded w-1/3" />
                    <div className="h-4 bg-[#F4F4F4] rounded w-2/3" />
                    <div className="h-4 bg-[#F4F4F4] rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* CURATION PREVIEW */}
      <section className="w-full py-20 md:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12">
          <div className="rounded-[24px] bg-black text-white p-8 md:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4">추천 구성 · 진단 퀴즈</p>
                <h2 className="font-serif-kr text-4xl md:text-5xl font-bold tracking-tight leading-[1.2]">
                  무엇을 골라야 할지<br />고민된다면
                </h2>
                <p className="mt-5 text-[#CCCCCC] leading-[1.6] max-w-md">
                  3~4문항에 답하면 1인 미용실용 · 출장미용용 · 홈케어용<br />
                  세트를 매칭해 드립니다.<br />
                  이후 세부 커스터마이징도 이어서 조정할 수 있어요.
                </p>
                <Link
                  to="/curation"
                  className="inline-flex items-center gap-2 mt-8 h-12 px-6 rounded-full bg-white text-black font-semibold hover:bg-[#E5E5E5] transition-colors"
                >
                  진단 시작하기 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['1인 미용실용', '출장미용용', '홈케어용'].map((t) => (
                  <div key={t} className="rounded-2xl bg-white/5 p-4 text-center">
                    <CheckCircle className="w-6 h-6 mx-auto mb-2 text-[#A97C3F]" strokeWidth={1.75} />
                    <p className="text-sm font-medium">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* PROMO TILES */}
      <section className="w-full pb-20 md:pb-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROMOS.map((p, i) => (
              <Reveal key={p.eyebrow} delay={i * 0.1}>
                <Link to={p.href} className="group block relative rounded-[20px] overflow-hidden aspect-[16/9]">
                  <FallbackImg
                    src={p.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-7">
                    <p className="text-[#A97C3F] text-sm font-bold uppercase tracking-wider mb-2">{p.eyebrow}</p>
                    <h3 className="font-serif-kr text-2xl md:text-3xl font-bold text-white whitespace-pre-line leading-[1.25] tracking-tight">
                      {p.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-1 text-white text-sm font-semibold">
                      자세히 보기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* REVIEWS */}
      <section className="w-full py-20 md:py-28 bg-[#F7F7F7]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <Reveal>
              <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4">고객 후기</p>
              <h2 className="font-serif-kr text-4xl md:text-5xl font-bold text-black tracking-tight leading-[1.2]">전문가와 일반 소비자의 이야기</h2>
            </Reveal>
            <Link to="/reviews" className="group text-black font-semibold flex items-center gap-1">
              전체 후기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.1}>
                <div className="h-full rounded-[20px] bg-white p-7">
                  <Quote className="w-8 h-8 text-[#D9D9D9] mb-4" strokeWidth={1.75} />
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className={`w-4 h-4 ${k < (r.rating || 5) ? 'text-[#A97C3F] fill-[#A97C3F]' : 'text-[#D9D9D9]'}`} />
                    ))}
                  </div>
                  <p className="text-[#1D1D1F] leading-[1.6] mb-5 line-clamp-5">{r.content}</p>
                  <div className="flex items-center gap-3">
                    {r.avatar ? (
                      <img src={r.avatar} alt={r.authorName} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#F4F4F4] flex items-center justify-center text-black font-bold">
                        {r.authorName?.[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-black text-sm">{r.authorName}</p>
                      <p className="text-xs text-[#767676]">
                        {r.authorType === 'professional' ? '전문가' : '일반 소비자'} · {r.authorRole}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* INSIGHTS */}
      <section className="w-full py-20 md:py-28 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-12">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <Reveal>
              <p className="text-[#A97C3F] font-bold text-sm uppercase tracking-wider mb-4">미용 인사이트</p>
              <h2 className="font-serif-kr text-4xl md:text-5xl font-bold text-black tracking-tight leading-[1.2]">도구를 고르는 관점</h2>
            </Reveal>
            <Link to="/insights" className="group text-black font-semibold flex items-center gap-1">
              전체 보기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((it, i) => (
              <Reveal key={it.id} delay={i * 0.1}>
                <Link to={`/insights/${it.slug}`} className="group block h-full">
                  <div className="h-full rounded-[20px] overflow-hidden bg-[#F7F7F7]">
                    <div className="aspect-[16/10] bg-[#F4F4F4] overflow-hidden">
                      {it.image ? (
                        <FallbackImg src={it.image} fallback={it.imageFallback} alt={it.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#767676]">
                          <BookMark />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold text-[#A97C3F]">{it.category}</span>
                      <h3 className="font-serif-kr text-lg font-bold text-black mt-2 mb-2 leading-[1.3] line-clamp-2">{it.title}</h3>
                      <p className="text-sm text-[#575757] leading-[1.5] line-clamp-2">{it.excerpt}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="w-full py-20 md:py-28 bg-[#F7F7F7]">
        <div className="max-w-[1040px] mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-serif-kr text-4xl md:text-5xl font-bold text-black tracking-tight leading-[1.2] lg:whitespace-nowrap">
              나에게 맞는 구성을 지금 만들어 보세요
            </h2>
            <p className="mt-5 text-[#575757] leading-[1.6] lg:whitespace-nowrap">
              소재부터 모듈까지 직접 조합하고, 궁금한 점은 AI 어시스턴트와 고객센터가 함께 안내합니다.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/tray-builder" className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-7 rounded-full bg-black text-white font-semibold hover:bg-[#333333] transition-colors">
                트레이 만들기
              </Link>
              <Link to="/support" className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-7 rounded-full border border-black text-black font-semibold hover:bg-black hover:text-white transition-colors">
                고객센터 · 문의
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
function BookMark() {
  return <Sparkles className="w-10 h-10" />;
}