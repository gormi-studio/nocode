import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, MessageCircle, Star, FileText, ArrowRight } from 'lucide-react';
import { Product, Inquiry, Review, Insight } from '@/api/entities';
export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, inquiries: 0, reviews: 0, insights: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [p, iq, r, ins] = await Promise.all([
          Product.paging({ page: 1, limit: 1 }),
          Inquiry.paging({ page: 1, limit: 5, sort: '-id' }),
          Review.paging({ page: 1, limit: 1 }),
          Insight.paging({ page: 1, limit: 1 }),
        ]);
        setStats({
          products: p.data.total,
          inquiries: iq.data.total,
          reviews: r.data.total,
          insights: ins.data.total,
        });
        setRecent(iq.data.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const cards = [
    { label: '등록 제품', value: stats.products, icon: Package, color: 'text-[#A97C3F]', bg: 'bg-[#A97C3F]/10' },
    { label: '접수 문의', value: stats.inquiries, icon: MessageCircle, color: 'text-[#6E6155]', bg: 'bg-[#6E6155]/10' },
    { label: '고객 후기', value: stats.reviews, icon: Star, color: 'text-[#c9852b]', bg: 'bg-[#c9852b]/10' },
    { label: '인사이트', value: stats.insights, icon: FileText, color: 'text-[#6b8f6b]', bg: 'bg-[#6b8f6b]/10' },
  ];
  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="font-serif-kr text-2xl font-bold text-[#1E1B18]">대시보드</h2>
        <p className="text-[#948A76] mt-1">고르미 콘텐츠 현황을 한눈에 확인하세요.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl bg-white border border-[#DAD6CC] p-5">
            <div className={`w-11 h-11 rounded-xl ${c.bg} flex items-center justify-center mb-4`}>
              <c.icon className={`w-5 h-5 ${c.color}`} />
            </div>
            <p className="text-2xl font-bold text-[#1E1B18]">{loading ? '—' : c.value}</p>
            <p className="text-sm text-[#948A76] mt-1">{c.label}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-white border border-[#DAD6CC] p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-serif-kr font-bold text-[#1E1B18]">최근 문의</h3>
          <Link to="/admin/inquiries" className="text-sm text-[#A97C3F] font-semibold flex items-center gap-1">
            전체 보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {loading ? (
          <div className="space-y-3">{[0, 1, 2].map((i) => <div key={i} className="h-14 bg-[#EBE9E3] rounded-xl animate-pulse" />)}</div>
        ) : recent.length === 0 ? (
          <p className="text-[#948A76] text-sm py-8 text-center">접수된 문의가 없습니다.</p>
        ) : (
          <div className="space-y-2">
            {recent.map((iq) => (
              <div key={iq.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F2F1EE]">
                <div className="min-w-0">
                  <p className="font-medium text-[#1E1B18] text-sm">{iq.name}</p>
                  <p className="text-xs text-[#948A76] truncate">{iq.message}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0 ml-3 ${iq.type === 'b2b' ? 'bg-[#6E6155]/12 text-[#6E6155]' : 'bg-[#A97C3F]/12 text-[#A97C3F]'}`}>
                  {iq.type === 'b2b' ? 'B2B' : '1:1'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}