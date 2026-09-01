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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
          <div className="aspect-square bg-[#efe4d2] rounded-3xl" />
          <div className="space-y-4">
            <div className="h-4 bg-[#efe4d2] rounded w-1/4" />
            <div className="h-8 bg-[#efe4d2] rounded w-2/3" />
            <div className="h-24 bg-[#efe4d2] rounded" />
          </div>
        </div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif-kr text-2xl font-bold text-[#2A211C]">제품을 찾을 수 없습니다</h2>
        <Link to="/products" className="inline-block mt-6 px-6 py-3 rounded-xl bg-[#D84E0B] text-white font-semibold">
          제품 목록으로
        </Link>
      </div>
    );
  }
  const isPro = product.level === 'professional';
  return (
    <div className="w-full bg-[#FBF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-[#6b5d50] hover:text-[#D84E0B] mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> 제품 목록
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <Reveal>
            <div className="rounded-3xl overflow-hidden bg-[#F1E8D8] border border-[#e7dcc9] aspect-square flex items-center justify-center">
              {product.image ? (
                <FallbackImg src={product.image} fallback={product.imageFallback} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-3 text-[#c9a86f]">
                  <Scissors className="w-16 h-16" />
                  <span className="font-medium text-[#a98c5b]">고르미</span>
                </div>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isPro ? 'bg-[#D84E0B]/12 text-[#D84E0B]' : 'bg-[#8B5E3C]/12 text-[#8B5E3C]'}`}>
                {isPro ? '전문가용' : '입문자용'}
              </span>
              {product.category?.title && <span className="text-sm text-[#a98c5b]">{product.category.title}</span>}
            </div>
            <h1 className="font-serif-kr text-3xl md:text-4xl font-bold text-[#2A211C]">{product.name}</h1>
            <p className="mt-5 text-lg text-[#4a3f36] leading-relaxed">{product.contextCopy}</p>
            <p className="mt-6 text-2xl font-bold text-[#D84E0B]">{Number(product.price || 0).toLocaleString('ko-KR')}원</p>
            {Array.isArray(product.tags) && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-5">
                {product.tags.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-[#F7F1E8] border border-[#e7dcc9] text-sm text-[#6b5d50]">#{t}</span>
                ))}
              </div>
            )}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to="/support" className="flex-1 px-6 py-3.5 rounded-xl bg-[#D84E0B] text-white text-center font-semibold hover:bg-[#b8420a] active:scale-95 transition-all">
                제품 문의하기
              </Link>
              <Link to="/tray-builder" className="flex-1 px-6 py-3.5 rounded-xl bg-white text-[#2A211C] text-center font-semibold border border-[#e0d3bd] hover:bg-[#FBF7F0] transition-all">
                커스텀 트레이로 확장
              </Link>
            </div>
          </Reveal>
        </div>
        {/* recommend / except */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          <Reveal>
            <div className="rounded-3xl bg-white border border-[#eadfce] p-7 h-full">
              <div className="flex items-center gap-2 mb-4">
                <ThumbsUp className="w-5 h-5 text-[#D84E0B]" />
                <h3 className="font-serif-kr text-xl font-bold text-[#2A211C]">추천 상황</h3>
              </div>
              <ul className="space-y-3">
                {(product.recommendSituations || []).map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[#4a3f36] leading-relaxed">
                    <Check className="w-5 h-5 text-[#D84E0B] mt-0.5 flex-shrink-0" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-[#F7F1E8]/70 border border-[#e7dcc9] p-7 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Ban className="w-5 h-5 text-[#8B5E3C]" />
                <h3 className="font-serif-kr text-xl font-bold text-[#2A211C]">예외·비추천 상황</h3>
              </div>
              <ul className="space-y-3">
                {(product.exceptSituations || []).map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[#4a3f36] leading-relaxed">
                    <AlertCircle className="w-5 h-5 text-[#8B5E3C] mt-0.5 flex-shrink-0" /> {s}
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
              <h3 className="font-serif-kr text-2xl font-bold text-[#2A211C]">함께 보면 좋은 제품</h3>
              <Link to="/products" className="text-[#D84E0B] font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm">
                더 보기 <ArrowRight className="w-4 h-4" />
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