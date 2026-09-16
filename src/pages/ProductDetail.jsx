import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, AlertCircle, Scissors, ThumbsUp, Ban, ArrowRight } from 'lucide-react';
import { Product } from '@/api/entities';
import Reveal from '@/components/Reveal';
import ProductCard from '@/components/ProductCard';
import FallbackImg from '@/components/FallbackImg';
export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await Product.paging({ page: 1, limit: 1, filter: { slug } });
        const p = res.data.data[0];
        setProduct(p || null);
        if (p) {
          const rel = await Product.paging({ page: 1, limit: 4, filter: { group: p.group }, sort: '-id' });
          setRelated(rel.data.data.filter((x) => x.slug !== slug).slice(0, 3));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);
  if (loading) {
    return (
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
          <div className="aspect-square bg-[#F4F4F4] rounded-[20px]" />
          <div className="space-y-4">
            <div className="h-4 bg-[#F4F4F4] rounded w-1/4" />
            <div className="h-8 bg-[#F4F4F4] rounded w-2/3" />
            <div className="h-24 bg-[#F4F4F4] rounded" />
          </div>
        </div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-24 text-center">
        <h2 className="font-serif-kr text-2xl font-bold text-black">제품을 찾을 수 없습니다</h2>
        <Link to="/products" className="inline-flex items-center justify-center mt-6 h-11 px-6 rounded-full bg-black text-white font-semibold hover:bg-[#333333] transition-colors">
          제품 목록으로
        </Link>
      </div>
    );
  }
  const isPro = product.level === 'professional';
  return (
    <div className="w-full bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 py-8 md:py-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-[#575757] hover:text-black mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" strokeWidth={1.75} /> 제품 목록
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <Reveal>
            <div className="rounded-[20px] overflow-hidden bg-[#F4F4F4] aspect-square flex items-center justify-center">
              {product.image ? (
                <FallbackImg src={product.image} fallback={product.imageFallback} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-3 text-[#767676]">
                  <Scissors className="w-16 h-16" strokeWidth={1.75} />
                  <span className="font-medium text-[#767676]">고르미</span>
                </div>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isPro ? 'bg-black text-white' : 'bg-[#F4F4F4] text-[#575757]'}`}>
                {isPro ? '전문가용' : '입문자용'}
              </span>
              {product.category?.title && <span className="text-sm text-[#767676]">{product.category.title}</span>}
            </div>
            <h1 className="font-serif-kr text-3xl md:text-4xl font-bold text-black tracking-tight leading-[1.2]">{product.name}</h1>
            <p className="mt-5 text-lg text-[#575757] leading-[1.55]">{product.contextCopy}</p>
            <p className="mt-6 text-2xl font-bold text-black">{Number(product.price || 0).toLocaleString('ko-KR')}원</p>
            {Array.isArray(product.tags) && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {product.tags.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-[#F4F4F4] text-sm text-[#575757]">#{t}</span>
                ))}
              </div>
            )}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/support" className="flex-1 inline-flex items-center justify-center h-12 px-6 rounded-full bg-black text-white font-semibold hover:bg-[#333333] transition-colors">
                제품 문의하기
              </Link>
              <Link to="/tray-builder" className="flex-1 inline-flex items-center justify-center h-12 px-6 rounded-full border border-black text-black font-semibold hover:bg-black hover:text-white transition-colors">
                커스텀 트레이로 확장
              </Link>
            </div>
          </Reveal>
        </div>
        {/* recommend / except */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          <Reveal>
            <div className="rounded-[20px] bg-[#F7F7F7] p-7 h-full">
              <div className="flex items-center gap-2 mb-4">
                <ThumbsUp className="w-5 h-5 text-black" strokeWidth={1.75} />
                <h3 className="font-serif-kr text-xl font-bold text-black leading-[1.3]">추천 상황</h3>
              </div>
              <ul className="space-y-3">
                {(product.recommendSituations || []).map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[#575757] leading-[1.6]">
                    <Check className="w-5 h-5 text-black mt-0.5 flex-shrink-0" strokeWidth={1.75} /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[20px] bg-[#F7F7F7] p-7 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Ban className="w-5 h-5 text-black" strokeWidth={1.75} />
                <h3 className="font-serif-kr text-xl font-bold text-black leading-[1.3]">예외·비추천 상황</h3>
              </div>
              <ul className="space-y-3">
                {(product.exceptSituations || []).map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[#575757] leading-[1.6]">
                    <AlertCircle className="w-5 h-5 text-black mt-0.5 flex-shrink-0" strokeWidth={1.75} /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        {/* related */}
        {related.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif-kr text-2xl font-bold text-black leading-[1.2]">함께 보면 좋은 제품</h3>
              <Link to="/products" className="group text-black font-semibold flex items-center gap-1 text-sm">
                더 보기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}