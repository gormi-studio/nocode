import { useState, useEffect } from 'react';
import { MessageCircle, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Inquiry } from '@/api/entities';
const STATUS = {
  new: { label: '신규', cls: 'bg-[#A97C3F]/12 text-[#A97C3F]' },
  in_progress: { label: '처리중', cls: 'bg-[#c9852b]/12 text-[#c9852b]' },
  done: { label: '완료', cls: 'bg-green-100 text-green-700' },
};
const STATUS_OPTIONS = ['new', 'in_progress', 'done'];
export default function Inquiries() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [notice, setNotice] = useState(null);
  const fetchData = async (pageNum) => {
    setLoading(true);
    try {
      const f = {};
      if (filter !== 'all') f.type = filter;
      const res = await Inquiry.paging({ page: pageNum, limit: 10, filter: f, sort: '-id' });
      setItems(res.data.data);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
      setPage(pageNum);
    } catch (e) {
      console.error(e);
      setNotice({ type: 'error', message: '문의를 불러오지 못했습니다.' });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchData(1); /* eslint-disable-next-line */ }, [filter]);
  const changeStatus = async (id, status) => {
    try {
      await Inquiry.update(id, { status });
      setItems((prev) => prev.map((it) => (String(it.id) === String(id) ? { ...it, status } : it)));
      setNotice({ type: 'success', message: '상태가 변경되었습니다.' });
    } catch (err) {
      setNotice({ type: 'error', message: err?.message || '변경에 실패했습니다.' });
    }
  };
  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-serif-kr text-2xl font-bold text-[#1E1B18]">문의 관리</h2>
          <p className="text-[#948A76] mt-1">총 {total}건의 문의</p>
        </div>
        <div className="flex gap-2">
          {[{ id: 'all', label: '전체' }, { id: 'general', label: '1:1' }, { id: 'b2b', label: 'B2B' }].map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === t.id ? 'bg-[#A97C3F] text-white' : 'bg-white border border-[#DAD6CC] text-[#5C574C]'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {notice && (
        <div className={`mb-4 p-3 rounded-xl flex items-center gap-2 text-sm ${notice.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {notice.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {notice.message}
        </div>
      )}
      <div className="rounded-2xl bg-white border border-[#DAD6CC] overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 text-[#A97C3F] animate-spin" /></div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 text-[#948A76]">
            <MessageCircle className="w-10 h-10 mx-auto mb-3 text-[#B3A489]" />
            문의가 없습니다.
          </div>
        ) : (
          <div className="divide-y divide-[#E2DFD6]">
            {items.map((iq) => (
              <div key={iq.id} className="p-5 flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="font-semibold text-[#1E1B18]">{iq.name}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${iq.type === 'b2b' ? 'bg-[#6E6155]/12 text-[#6E6155]' : 'bg-[#A97C3F]/12 text-[#A97C3F]'}`}>
                      {iq.type === 'b2b' ? 'B2B / 창업' : '1:1'}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${(STATUS[iq.status] || STATUS.new).cls}`}>
                      {(STATUS[iq.status] || STATUS.new).label}
                    </span>
                  </div>
                  <p className="text-sm text-[#433E36] leading-relaxed mb-2">{iq.message}</p>
                  <p className="text-xs text-[#948A76]">
                    {iq.email && <span className="mr-3">{iq.email}</span>}
                    {iq.phone && <span>{iq.phone}</span>}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <select
                    value={iq.status || 'new'}
                    onChange={(e) => changeStatus(iq.id, e.target.value)}
                    className="px-3 py-2 rounded-lg border border-[#D6D1C4] text-sm bg-[#F2F1EE] outline-none focus:border-[#A97C3F]"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{STATUS[s].label}</option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button onClick={() => fetchData(page - 1)} disabled={page <= 1 || loading} className="px-3 py-2 rounded-lg border border-[#DAD6CC] text-sm disabled:opacity-40">이전</button>
          <span className="text-sm text-[#5C574C] px-2">{page} / {totalPages}</span>
          <button onClick={() => fetchData(page + 1)} disabled={page >= totalPages || loading} className="px-3 py-2 rounded-lg border border-[#DAD6CC] text-sm disabled:opacity-40">다음</button>
        </div>
      )}
    </div>
  );
}