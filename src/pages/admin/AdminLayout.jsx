import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageCircle, Sparkles, LogOut, Menu, X } from 'lucide-react';
import { vibex } from '@/api/vibexClient';
const LOGO = 'https://cdn.vibe-x.app/apps/2993f287600805ee57940d76/assets/original/logo-0-104477.png';
const NAV = [
  { to: '/admin', label: '대시보드', icon: LayoutDashboard, exact: true },
  { to: '/admin/inquiries', label: '문의 관리', icon: MessageCircle },
  { to: '/admin/ai-settings', label: 'AI 설정', icon: Sparkles },
];
export default function AdminLayout({ currentPageName }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [me, setMe] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }
    (async () => {
      try {
        const res = await vibex.auth.me();
        const user = res?.data;
        const isAdminAccount = user?.type === 'admin' || (user?.type == null && user?.role === 'admin');
        if (!isAdminAccount) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          navigate('/admin/login', { replace: true });
          return;
        }
        setMe(user);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        navigate('/admin/login', { replace: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);
  const logout = () => {
    try { vibex.auth.logout(); } catch (e) { console.error(e); }
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    navigate('/admin/login', { replace: true });
  };
  if (loading || !isAuthenticated) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#FBF7F0]">
        <div className="w-8 h-8 border-4 border-[#e7dcc9] border-t-[#D84E0B] rounded-full animate-spin" />
      </div>
    );
  }
  const isActive = (item) =>
    item.exact ? location.pathname === '/admin' : location.pathname.startsWith(item.to);
  const stored = (() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  })();
  const user = me || stored;
  const SidebarInner = (
    <>
      <div className="p-6 border-b border-[#eadfce]">
        <img src={LOGO} alt="고르미" className="h-8 w-auto object-contain" />
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              isActive(item) ? 'bg-[#D84E0B] text-white' : 'text-[#4a3f36] hover:bg-[#F7F1E8]'
            }`}
          >
            <item.icon className="w-5 h-5" /> {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-[#eadfce]">
        <div className="flex items-center gap-3 mb-3 px-2">
          <img src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'} alt="" className="w-9 h-9 rounded-full bg-[#F7F1E8]" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#2A211C] truncate">{user?.name || '관리자'}</p>
            <p className="text-xs text-[#a98c5b] truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-[#6b5d50] hover:bg-[#F7F1E8] font-medium transition-colors">
          <LogOut className="w-4 h-4" /> 로그아웃
        </button>
      </div>
    </>
  );
  return (
    <div className="flex h-screen bg-[#FBF7F0]">
      <aside className="hidden lg:flex w-64 border-r border-[#eadfce] bg-white flex-col">{SidebarInner}</aside>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-white flex flex-col">{SidebarInner}</aside>
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-[#eadfce] bg-white flex items-center justify-between px-4 lg:px-6">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[#4a3f36]">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-serif-kr font-bold text-[#2A211C]">관리자 콘솔</h1>
          <Link to="/" className="text-sm text-[#a98c5b] hover:text-[#D84E0B]">사이트 보기</Link>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}