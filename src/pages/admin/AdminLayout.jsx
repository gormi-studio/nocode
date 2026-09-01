import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageCircle, LogOut, Menu, X } from 'lucide-react';
import { localAuth } from '@/lib/localAuth';
import Logo from '@/components/Logo';
const NAV = [
  { to: '/admin', label: '대시보드', icon: LayoutDashboard, exact: true },
  { to: '/admin/inquiries', label: '문의 관리', icon: MessageCircle },
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
        const res = await localAuth.me();
        const user = res?.data;
        if (user?.type !== 'admin') {
          localAuth.logout();
          navigate('/admin/login', { replace: true });
          return;
        }
        setMe(user);
        setIsAuthenticated(true);
      } catch {
        localAuth.logout();
        navigate('/admin/login', { replace: true });
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);
  const logout = () => {
    localAuth.logout();
    navigate('/admin/login', { replace: true });
  };
  if (loading || !isAuthenticated) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#F2F1EE]">
        <div className="w-8 h-8 border-4 border-[#DCD8CE] border-t-[#A97C3F] rounded-full animate-spin" />
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
      <div className="p-6 border-b border-[#DAD6CC]">
        <Logo />
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              isActive(item) ? 'bg-[#A97C3F] text-white' : 'text-[#433E36] hover:bg-[#EBE9E3]'
            }`}
          >
            <item.icon className="w-5 h-5" /> {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-[#DAD6CC]">
        <div className="flex items-center gap-3 mb-3 px-2">
          <img src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'} alt="" className="w-9 h-9 rounded-full bg-[#EBE9E3]" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#1E1B18] truncate">{user?.name || '관리자'}</p>
            <p className="text-xs text-[#948A76] truncate">{user?.email}</p>
          </div>
        </div>
        <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-[#5C574C] hover:bg-[#EBE9E3] font-medium transition-colors">
          <LogOut className="w-4 h-4" /> 로그아웃
        </button>
      </div>
    </>
  );
  return (
    <div className="flex h-screen bg-[#F2F1EE]">
      <aside className="hidden lg:flex w-64 border-r border-[#DAD6CC] bg-white flex-col">{SidebarInner}</aside>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 bg-white flex flex-col">{SidebarInner}</aside>
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-[#DAD6CC] bg-white flex items-center justify-between px-4 lg:px-6">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg text-[#433E36]">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-serif-kr font-bold text-[#1E1B18]">관리자 콘솔</h1>
          <Link to="/" className="text-sm text-[#948A76] hover:text-[#A97C3F]">사이트 보기</Link>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}