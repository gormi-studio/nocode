import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, Phone, MapPin } from 'lucide-react';
import AIChatWidget from '@/components/AIChatWidget';
import Logo from '@/components/Logo';
const NAV = [
  { to: '/brand-story', label: '브랜드 스토리' },
  { to: '/tray-builder', label: '커스텀 트레이' },
  { to: '/products', label: '제품' },
  { to: '/curation', label: '추천 구성' },
  { to: '/insights', label: '인사이트' },
  { to: '/support', label: '고객센터' },
];
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [location.pathname]);
  return (
    <header
      className={`sticky top-0 z-30 w-full transition-all duration-300 border-b ${
        scrolled ? 'bg-[#FBF7F0]/95 backdrop-blur-md border-[#e7dcc9] shadow-sm' : 'bg-[#FBF7F0] border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => {
              const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active ? 'text-[#D84E0B]' : 'text-[#4a3f36] hover:text-[#D84E0B] hover:bg-[#D84E0B]/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden lg:flex items-center">
            <Link
              to="/tray-builder"
              className="px-5 py-2.5 rounded-xl bg-[#D84E0B] text-white text-sm font-semibold hover:bg-[#b8420a] active:scale-95 transition-all"
            >
              트레이 만들기
            </Link>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-[#4a3f36] hover:bg-[#D84E0B]/5"
            aria-label="메뉴 열기"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-[#e7dcc9] bg-[#FBF7F0]">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-3 rounded-lg text-[#4a3f36] font-medium hover:bg-[#D84E0B]/5 hover:text-[#D84E0B]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/tray-builder"
              className="mt-2 px-4 py-3 rounded-xl bg-[#D84E0B] text-white text-center font-semibold"
            >
              트레이 만들기
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
function Footer() {
  return (
    <footer className="w-full bg-[#2A211C] text-[#e6ddd2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Logo variant="inverted" className="mb-4" />
            <p className="text-sm text-white/60 leading-relaxed max-w-md">
              헤어디자이너와 전문가용 제품을 찾는 일반 소비자를 위한 맞춤 헤어미용도구 브랜드.
              보고 · 비교하고 · 조합하는 커스터마이징 경험을 제안합니다.
            </p>
            <p className="mt-4 text-xs text-white/40">
              과장·효과 보장·근거 없는 비교 표현을 지양하고, 사실에 기반한 정보를 제공합니다.
            </p>
          </div>
          <div className="hidden md:block">
            <h4 className="font-serif-kr font-semibold text-white mb-4">둘러보기</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><Link to="/tray-builder" className="hover:text-[#f0a97e]">커스텀 트레이</Link></li>
              <li><Link to="/products" className="hover:text-[#f0a97e]">헤어 살롱 용품</Link></li>
              <li><Link to="/curation" className="hover:text-[#f0a97e]">추천 구성</Link></li>
              <li><Link to="/insights" className="hover:text-[#f0a97e]">미용 인사이트</Link></li>
              <li><Link to="/reviews" className="hover:text-[#f0a97e]">고객 후기</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif-kr font-semibold text-white mb-4">고객센터</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> 1544-0000</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> help@gormi.co.kr</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 서울특별시</li>
            </ul>
            <Link
              to="/support"
              className="inline-block mt-4 px-4 py-2 rounded-lg border border-white/20 text-sm text-white/80 hover:bg-white/5"
            >
              1:1 · B2B 문의
            </Link>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">© 2026 고르미 (GORMI). All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <span>이용약관</span>
            <span>개인정보처리방침</span>
            <Link to="/admin/login" className="text-white/40 hover:text-white/70">관리자</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default function Layout({ currentPageName }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#FBF7F0]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
}