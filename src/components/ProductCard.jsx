import { Link } from 'react-router-dom';
import { Scissors, Star } from 'lucide-react';
import FallbackImg from '@/components/FallbackImg';
export default function ProductCard({ product }) {
  const isPro = product.level === 'professional';
  const badge = isPro
    ? { label: '전문가용', cls: 'bg-[#A97C3F]/12 text-[#A97C3F]' }
    : { label: '입문자용', cls: 'bg-[#6E6155]/12 text-[#6E6155]' };
  const hasDiscount = product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  return (
    <Link to={`/products/${product.slug}`} className="group block">
      <div className="rounded-3xl overflow-hidden bg-[#EBE9E3]/70 backdrop-blur-sm border border-[#DCD8CE] shadow-[0_20px_60px_-25px_rgba(169,124,63,0.25)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_-25px_rgba(169,124,63,0.4)]">
        <div className="aspect-square bg-[#E4E1DA] overflow-hidden flex items-center justify-center relative">
          {hasDiscount && (
            <span className="absolute top-3 left-3 z-10 text-xs font-bold px-2.5 py-1 rounded-full bg-[#1E1B18] text-[#D9BE93]">
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
            <div className="flex flex-col items-center gap-3 text-[#B3A489]">
              <Scissors className="w-12 h-12" />
              <span className="text-sm font-medium text-[#948A76]">고르미</span>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge.cls}`}>{badge.label}</span>
            {product.category?.title && (
              <span className="text-xs text-[#948A76]">{product.category.title}</span>
            )}
          </div>
          <h3 className="font-serif-kr text-lg font-bold text-[#1E1B18] mb-1">{product.name}</h3>
          {product.rating != null && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-3.5 h-3.5 text-[#A97C3F] fill-[#A97C3F]" />
              <span className="text-xs font-semibold text-[#433E36]">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-[#948A76]">({product.reviewCount ?? 0})</span>
            </div>
          )}
          <p className="text-sm text-[#5C574C] leading-relaxed line-clamp-2 mb-4">{product.contextCopy}</p>
          <div className="flex items-baseline gap-2">
            {hasDiscount && (
              <span className="text-sm text-[#B3A489] line-through">
                {Number(product.originalPrice).toLocaleString('ko-KR')}원
              </span>
            )}
            <p className="text-lg font-bold text-[#A97C3F]">
              {Number(product.price || 0).toLocaleString('ko-KR')}원
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}