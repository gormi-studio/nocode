import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Palette, Layers, Sparkles, Eye, ArrowRight, Star, Quote,
  Search, CheckCircle, Package, Package2, ShoppingBag,
  Scissors, Brush, Paintbrush, Briefcase,
} from 'lucide-react';
import { Product, Review, Insight } from '@/api/entities';
import { HERO_IMAGE, HERO_IMAGE_FALLBACK, products as PRODUCT_FIXTURES, insights as INSIGHT_FIXTURES } from '@/data/fixtures';
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
    eyebrow: '런칭 기념',
    title: '프로 커팅가위 세트\n한정 할인',
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
      {/* HERO — gradient-float */}
      <section className="relative w-full overflow-hidden bg-[#F2F1EE]">
        <div className="absolute -top-40 -right-24 w-[34rem] h-[34rem] rounded-full bg-[#A97C3F]/15 blur-3xl" />
        <div className="absolute top-40 -left-28 w-96 h-96 rounded-full bg-[#1E1B18]/10 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16 pb-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <Reveal>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A97C3F]/10 text-[#A97C3F] text-sm font-semibold">
                  <Sparkles className="w-4 h-4" /> 맞춤 헤어미용도구 브랜드
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-serif-kr text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E1B18] mt-6 leading-tight">
                  보고 · 비교하고<br />조합하는 도구
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-6 text-lg text-[#4F4A40] leading-relaxed max-w-xl mx-auto md:mx-0">
                  전문가용 미용재료를 일반 소비자도 쉽게 이해하도록.
                  소재·색상·도구함·모듈을 직접 조합해 나에게 꼭 맞는 구성을 만들어 보세요.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
                  <Link
                    to="/tray-builder"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#A97C3F] text-white font-semibold hover:bg-[#7D5D2E] active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    커스텀 트레이 만들기 <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/curation"
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-transparent text-[#A97C3F] font-semibold border-2 border-[#A97C3F] hover:bg-[#A97C3F] hover:text-white transition-all text-center"
                  >
                    추천 구성 진단
                  </Link>
                </div>
              </Reveal>
            </div>
            <div className="w-full md:w-1/2">
              <Reveal delay={0.2} y={30}>
                <div className="relative">
                  <div className="rounded-[2rem] overflow-hidden bg-[#EBE9E3]/70 backdrop-blur-sm border border-[#DCD8CE] shadow-[0_30px_80px_-30px_rgba(169,124,63,0.4)]">
                    <FallbackImg src={HERO_IMAGE} fallback={HERO_IMAGE_FALLBACK} alt="고르미 커스텀 트레이" className="w-full aspect-[4/3] object-cover" />
                  </div>
                  <div className="absolute -bottom-5 -left-3 md:-left-6 bg-white rounded-2xl shadow-xl border border-[#DCD8CE] px-5 py-4">
                    <p className="text-xs text-[#948A76] mb-1">실시간 예상 구성</p>
                    <p className="font-serif-kr font-bold text-[#1E1B18]">4단계 커스터마이징</p>
                  </div>
                  <div className="absolute -top-4 -right-2 md:-right-5 bg-[#1E1B18] text-white rounded-2xl shadow-xl px-4 py-3">
                    <p className="text-xs text-white/60">전문가 · 일반</p>
                    <p className="text-sm font-semibold">구분 안내</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      {/* CATEGORY SHORTCUTS */}
      <section className="w-full py-10 bg-white border-b border-[#EDEAE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4 overflow-x-auto sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:overflow-visible pb-2 sm:pb-0 -mx-1 px-1">
            {SHORTCUTS.map((s) => (
              <Link
                key={s.label}
                to={s.href}
                className="group flex-shrink-0 w-24 sm:w-auto flex flex-col items-center gap-2.5 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F2F1EE] group-hover:bg-[#A97C3F]/10 flex items-center justify-center transition-colors">
                  <s.icon className="w-6 h-6 text-[#A97C3F]" />
                </div>
                <span className="text-xs font-medium text-[#5C574C] group-hover:text-[#1E1B18] transition-colors">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* DIFFERENTIATOR */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-[#A97C3F] font-semibold mb-3">핵심 차별점</p>
            <h2 className="font-serif-kr text-3xl md:text-4xl font-bold text-[#1E1B18]">
              직접 조합할 수 있는 커스터마이징 시스템
            </h2>
            <p className="mt-4 text-[#4F4A40] leading-relaxed">
              트레이 색상·소재부터 도구함, 정리대 모듈까지 조합해 작업 흐름에 맞춘 구성을 만듭니다.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {DIFF.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-[#DAD6CC] p-8 hover:border-[#A97C3F]/40 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-[#A97C3F]/10 flex items-center justify-center mb-5">
                    <d.icon className="w-7 h-7 text-[#A97C3F]" />
                  </div>
                  <h3 className="font-serif-kr text-xl font-bold text-[#1E1B18] mb-2">{d.title}</h3>
                  <p className="text-[#5C574C] leading-relaxed">{d.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* PURCHASE PROCESS — numbered steps (DOMINANT dark band) */}
      <section className="w-full py-16 md:py-24 bg-[#1E1B18] text-white overflow-hidden relative">
        <div className="absolute -top-20 right-0 w-80 h-80 rounded-full bg-[#A97C3F]/20 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-[#D9BE93] font-semibold mb-3">구매 프로세스</p>
            <h2 className="font-serif-kr text-3xl md:text-4xl font-bold">보고 → 비교 → 조합 → 구매</h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              스펙 나열이 아니라 실제 사용 맥락을 기준으로 도구를 선택하는 흐름입니다.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div className="h-full rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 p-7">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif-kr text-4xl font-bold text-[#A97C3F]">{s.n}</span>
                    <s.icon className="w-6 h-6 text-white/40" />
                  </div>
                  <h3 className="font-serif-kr text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* FEATURED PRODUCTS */}
      <section className="w-full py-16 md:py-24 bg-[#F2F1EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <Reveal>
              <p className="text-[#A97C3F] font-semibold mb-3">대표 상품</p>
              <h2 className="font-serif-kr text-3xl md:text-4xl font-bold text-[#1E1B18]">현장에서 자주 선택되는 구성</h2>
            </Reveal>
            <Link to="/products" className="text-[#A97C3F] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              전체 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="rounded-3xl overflow-hidden bg-white border border-[#DAD6CC] animate-pulse">
                  <div className="aspect-square bg-[#E6E3DC]" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-[#E6E3DC] rounded w-1/3" />
                    <div className="h-4 bg-[#E6E3DC] rounded w-2/3" />
                    <div className="h-4 bg-[#E6E3DC] rounded w-1/2" />
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
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] bg-gradient-to-br from-[#A97C3F] to-[#6E5228] text-white p-8 md:p-14 overflow-hidden relative">
            <div className="absolute -bottom-16 -right-10 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-white/70 font-semibold mb-3">추천 구성 · 진단 퀴즈</p>
                <h2 className="font-serif-kr text-3xl md:text-4xl font-bold leading-tight">
                  무엇을 골라야 할지<br />고민된다면
                </h2>
                <p className="mt-5 text-white/80 leading-relaxed max-w-md">
                  3~4문항에 답하면 1인 미용실용 · 출장미용용 · 홈케어용 세트를 매칭해 드립니다.
                  이후 세부 커스터마이징도 이어서 조정할 수 있어요.
                </p>
                <Link
                  to="/curation"
                  className="inline-flex items-center gap-2 mt-7 px-6 py-3.5 rounded-xl bg-white text-[#A97C3F] font-semibold hover:bg-[#F2F1EE] active:scale-95 transition-all"
                >
                  진단 시작하기 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['1인 미용실용', '출장미용용', '홈케어용'].map((t) => (
                  <div key={t} className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-center">
                    <CheckCircle className="w-6 h-6 mx-auto mb-2 text-white/90" />
                    <p className="text-sm font-medium">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* PROMO TILES */}
      <section className="w-full pb-16 md:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROMOS.map((p, i) => (
              <Reveal key={p.eyebrow} delay={i * 0.1}>
                <Link to={p.href} className="group block relative rounded-3xl overflow-hidden aspect-[16/9]">
                  <FallbackImg
                    src={p.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B18]/85 via-[#1E1B18]/20 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-7">
                    <p className="text-[#D9BE93] text-sm font-semibold mb-2">{p.eyebrow}</p>
                    <h3 className="font-serif-kr text-xl md:text-2xl font-bold text-white whitespace-pre-line leading-snug">
                      {p.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-1 text-white/90 text-sm font-semibold">
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
      <section className="w-full py-16 md:py-24 bg-[#F2F1EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <Reveal>
              <p className="text-[#A97C3F] font-semibold mb-3">고객 후기</p>
              <h2 className="font-serif-kr text-3xl md:text-4xl font-bold text-[#1E1B18]">전문가와 일반 소비자의 이야기</h2>
            </Reveal>
            <Link to="/reviews" className="text-[#A97C3F] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              전체 후기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.1}>
                <div className="h-full rounded-3xl bg-white border border-[#DAD6CC] p-7 shadow-[0_20px_60px_-30px_rgba(169,124,63,0.25)]">
                  <Quote className="w-8 h-8 text-[#A97C3F]/30 mb-4" />
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className={`w-4 h-4 ${k < (r.rating || 5) ? 'text-[#A97C3F] fill-[#A97C3F]' : 'text-[#D6D1C4]'}`} />
                    ))}
                  </div>
                  <p className="text-[#433E36] leading-relaxed mb-5 line-clamp-5">{r.content}</p>
                  <div className="flex items-center gap-3">
                    {r.avatar ? (
                      <img src={r.avatar} alt={r.authorName} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#A97C3F]/10 flex items-center justify-center text-[#A97C3F] font-bold">
                        {r.authorName?.[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-[#1E1B18] text-sm">{r.authorName}</p>
                      <p className="text-xs text-[#948A76]">
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
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <Reveal>
              <p className="text-[#A97C3F] font-semibold mb-3">미용 인사이트</p>
              <h2 className="font-serif-kr text-3xl md:text-4xl font-bold text-[#1E1B18]">도구를 고르는 관점</h2>
            </Reveal>
            <Link to="/insights" className="text-[#A97C3F] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              전체 보기 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((it, i) => (
              <Reveal key={it.id} delay={i * 0.1}>
                <Link to={`/insights/${it.slug}`} className="group block h-full">
                  <div className="h-full rounded-3xl overflow-hidden border border-[#DAD6CC] hover:-translate-y-1 hover:shadow-lg transition-all">
                    <div className="aspect-[16/10] bg-[#E4E1DA] overflow-hidden">
                      {it.image ? (
                        <FallbackImg src={it.image} fallback={it.imageFallback} alt={it.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#B3A489]">
                          <BookMark />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-semibold text-[#A97C3F]">{it.category}</span>
                      <h3 className="font-serif-kr text-lg font-bold text-[#1E1B18] mt-2 mb-2 line-clamp-2">{it.title}</h3>
                      <p className="text-sm text-[#5C574C] leading-relaxed line-clamp-2">{it.excerpt}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="w-full py-16 md:py-24 bg-[#EBE9E3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <Sparkles className="w-10 h-10 text-[#A97C3F] mx-auto mb-5" />
            <h2 className="font-serif-kr text-3xl md:text-4xl font-bold text-[#1E1B18]">
              나에게 맞는 구성을 지금 만들어 보세요
            </h2>
            <p className="mt-5 text-[#4F4A40] leading-relaxed">
              소재부터 모듈까지 직접 조합하고, 궁금한 점은 AI 어시스턴트와 고객센터가 함께 안내합니다.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/tray-builder" className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#A97C3F] text-white font-semibold hover:bg-[#7D5D2E] active:scale-95 transition-all">
                트레이 만들기
              </Link>
              <Link to="/support" className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-[#1E1B18] font-semibold border border-[#D6D1C4] hover:bg-[#F2F1EE] transition-all">
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