import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Loader2, PackageSearch } from 'lucide-react';
import { Product, Category } from '@/api/entities';
import Reveal from '@/components/Reveal';
import ProductCard from '@/components/ProductCard';
const GROUPS = [
  { id: 'all', label: '전체' },
  { id: 'salon', label: '헤어 살롱 용품' },
  { id: 'storage', label: '정리·수납 아이템' },
];
const LEVELS = [
  { id: 'all', label: '전체' },
  { id: 'professional', label: '전문가용' },
  { id: 'beginner', label: '입문자용' },
];
const SORTS = [
  { id: '-id', label: '최신순' },
  { id: 'price', label: '가격 낮은순' },
  { id: '-price', label: '가격 높은순' },
];
export default function Products() {
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState(searchParams.get('group') || 'all');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [level, setLevel] = useState('all');
  const [sort, setSort] = useState('-id');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const isComposingRef = useRef(false);
  const loadingRef = useRef(false);
  const loaderRef = useRef(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await Category.paging({ page: 1, limit: 50, sort: 'sortOrder' });
        setCategories(res.data.data);
      } catch (e) { console.error(e); }
    })();
  }, []);
  useEffect(() => {
    if (isComposingRef.current) return;
    const timer = setTimeout(() => setSearch(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);
  const fetchData = async (pageNum, reset = false) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const filter = { search };
      if (group !== 'all') filter.group = group;
      if (category !== 'all') filter.categoryId = category;
      if (level !== 'all') filter.level = level;
      const res = await Product.paging({ page: pageNum, limit: 9, filter, sort });
      const rows = res.data.data;
      setProducts((prev) => (reset ? rows : [...prev, ...rows]));
      setHasMore(pageNum < res.data.totalPages);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };
  useEffect(() => {
    setProducts([]);
    setHasMore(true);
    if (page === 1) {
      fetchData(1, true);
    } else {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, group, category, level, sort]);
  useEffect(() => {
    if (page > 1) fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loadingRef.current) {
        setPage((p) => p + 1);
      }
    });
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore]);
  const visibleCategories = categories.filter((c) => group === 'all' || c.group === group);
  return (
    <div className="w-full">
      <section className="w-full bg-[#F2F1EE] overflow-hidden relative">
        <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-[#A97C3F]/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 md:pt-16">
          <Reveal className="max-w-3xl">
            <p className="text-[#A97C3F] font-semibold mb-3">제품</p>
            <h1 className="font-serif-kr text-3xl md:text-5xl font-bold text-[#1E1B18]">
              헤어 살롱 용품 · 정리·수납 아이템
            </h1>
            <p className="mt-4 text-[#4F4A40] leading-relaxed">
              전문가용·입문자용 구분과 용도·가격대 필터로 나에게 맞는 도구를 비교해 보세요.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="w-full pb-20 bg-[#F2F1EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* filters */}
          <div className="rounded-3xl bg-white border border-[#DAD6CC] p-5 md:p-6 mb-8">
            <div className="relative mb-5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#948A76]" />
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onCompositionStart={() => { isComposingRef.current = true; }}
                onCompositionEnd={(e) => { isComposingRef.current = false; setSearchInput(e.currentTarget.value); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.nativeEvent.isComposing && !isComposingRef.current) {
                    setSearch(searchInput);
                  }
                }}
                placeholder="제품명·태그로 검색"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#D6D1C4] focus:border-[#A97C3F] focus:ring-2 focus:ring-[#A97C3F]/20 outline-none bg-[#F2F1EE]"
              />
            </div>
            <FilterRow label="분류">
              {GROUPS.map((g) => (
                <Chip key={g.id} active={group === g.id} onClick={() => { setGroup(g.id); setCategory('all'); }}>{g.label}</Chip>
              ))}
            </FilterRow>
            {visibleCategories.length > 0 && (
              <FilterRow label="카테고리">
                <Chip active={category === 'all'} onClick={() => setCategory('all')}>전체</Chip>
                {visibleCategories.map((c) => (
                  <Chip key={c.id} active={String(category) === String(c.id)} onClick={() => setCategory(c.id)}>{c.name}</Chip>
                ))}
              </FilterRow>
            )}
            <FilterRow label="대상">
              {LEVELS.map((l) => (
                <Chip key={l.id} active={level === l.id} onClick={() => setLevel(l.id)}>{l.label}</Chip>
              ))}
            </FilterRow>
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-[#948A76] flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4" /> 정렬
              </span>
              <div className="flex gap-2">
                {SORTS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSort(s.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      sort === s.id ? 'bg-[#A97C3F] text-white' : 'bg-[#EBE9E3] text-[#5C574C] hover:bg-[#E6E3DC]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* results */}
          {products.length === 0 && !loading ? (
            <div className="text-center py-20">
              <PackageSearch className="w-12 h-12 text-[#B3A489] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[#1E1B18]">조건에 맞는 제품이 없습니다</h3>
              <p className="text-sm text-[#948A76] mt-1">필터를 조정해 다시 검색해 보세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
          {loading && (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 text-[#A97C3F] animate-spin" />
            </div>
          )}
          {hasMore && <div ref={loaderRef} className="h-6" />}
        </div>
      </section>
    </div>
  );
}
function FilterRow({ label, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
      <span className="text-sm font-semibold text-[#433E36] w-20 flex-shrink-0">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
        active ? 'bg-[#A97C3F] text-white' : 'bg-[#EBE9E3] text-[#5C574C] hover:bg-[#E6E3DC]'
      }`}
    >
      {children}
    </button>
  );
}