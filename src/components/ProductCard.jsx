import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';
export default function ProductCard({ product }) {
  const isPro = product.level === 'professional';
  const badge = isPro
    ? { label: '전문가용', cls: 'bg-[#D84E0B]/12 text-[#D84E0B]' }
    : { label: '입문자용', cls: 'bg-[#8B5E3C]/12 text-[#8B5E3C]' };
  return (
    <Link to={`/products/${product.slug}`} className="group block">
      <div className="rounded-3xl overflow-hidden bg-[#F7F1E8]/70 backdrop-blur-sm border border-[#e7dcc9] shadow-[0_20px_60px_-25px_rgba(216,78,11,0.25)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_-25px_rgba(216,78,11,0.4)]">
        <div className="aspect-square bg-[#F1E8D8] overflow-hidden flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-[#c9a86f]">
              <Scissors className="w-12 h-12" />
              <span className="text-sm font-medium text-[#a98c5b]">고르미</span>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge.cls}`}>{badge.label}</span>
            {product.category?.title && (
              <span className="text-xs text-[#a98c5b]">{product.category.title}</span>
            )}
          </div>
          <h3 className="font-serif-kr text-lg font-bold text-[#2A211C] mb-2">{product.name}</h3>
          <p className="text-sm text-[#6b5d50] leading-relaxed line-clamp-2 mb-4">{product.contextCopy}</p>
          <p className="text-lg font-bold text-[#D84E0B]">
            {Number(product.price || 0).toLocaleString('ko-KR')}원
          </p>
        </div>
      </div>
    </Link>
  );
}