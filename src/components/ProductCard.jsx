import { Link } from 'react-router-dom';
import { Scissors, Star } from 'lucide-react';
import FallbackImg from '@/components/FallbackImg';
export default function ProductCard({ product }) {
  const isPro = product.level === 'professional';
  const badge = isPro
    ? { label: '전문가용', cls: 'bg-black text-white' }
    : { label: '입문자용', cls: 'bg-[#F4F4F4] text-[#575757]' };
  const hasDiscount = product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  return (
    <Link to={`/products/${product.slug}`} className="group block">
      <div className="rounded-[20px] overflow-hidden bg-[#F7F7F7] transition-transform duration-300 hover:-translate-y-0.5">
        <div className="aspect-square bg-[#F4F4F4] overflow-hidden flex items-center justify-center relative">
          {hasDiscount && (
            <span className="absolute top-3 left-3 z-10 text-xs font-bold px-2.5 py-1 rounded-full bg-black text-white">
              {discountPercent}% 할인
            </span>
          )}
          {product.image ? (
            <FallbackImg
              src={product.image}
              fallback={product.imageFallback}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-[#767676]">
              <Scissors className="w-12 h-12" />
              <span className="text-sm font-medium text-[#767676]">고르미</span>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge.cls}`}>{badge.label}</span>
            {product.category?.title && (
              <span className="text-xs text-[#767676]">{product.category.title}</span>
            )}
          </div>
          <h3 className="font-serif-kr text-lg font-bold text-black mb-1">{product.name}</h3>
          {product.rating != null && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-3.5 h-3.5 text-[#A97C3F] fill-[#A97C3F]" />
              <span className="text-xs font-semibold text-[#1D1D1F]">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-[#767676]">({product.reviewCount ?? 0})</span>
            </div>
          )}
          <p className="text-sm text-[#575757] leading-relaxed line-clamp-2 mb-4">{product.contextCopy}</p>
          <div className="flex items-baseline gap-2">
            {hasDiscount && (
              <span className="text-sm text-[#767676] line-through">
                {Number(product.originalPrice).toLocaleString('ko-KR')}원
              </span>
            )}
            <p className="text-lg font-bold text-black">
              {Number(product.price || 0).toLocaleString('ko-KR')}원
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}