import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, Phone, MapPin } from 'lucide-react';
import AIChatWidget from '@/components/AIChatWidget';
import Logo from '@/components/Logo';
const NAV = [
  { to: '/', label: '홈' },
  { to: '/brand-story', label: '브랜드 스토리' },
  { to: '/tray-builder', label: '커스텀 트레이' },
  { to: '/products', label: '헤어살롱용품' },
  { to: '/insights', label: '미용인사이트' },
  { to: '/support', label: '고객센터' },
];
// TODO: swap in the real storefront URL once it exists.
function StoreLinks({ className = '' }) {
  return (
    <a
      href="#"
      target="_blank"
      rel="noopener noreferrer"
      className={`text-sm font-semibold text-[#A97C3F] hover:text-[#7D5D2E] transition-colors ${className}`}
    >
      스토어 연결
    </a>
  );
}
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
        scrolled ? 'bg-[#F2F1EE]/95 backdrop-blur-md border-[#DCD8CE] shadow-sm' : 'bg-[#F2F1EE] border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 md:h-18">
          <Link to="/" className="flex items-center flex-shrink-0">
            <Logo />
          </Link>
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-1 pl-10">
            {NAV.map((item) => {
              const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active ? 'text-[#A97C3F]' : 'text-[#433E36] hover:text-[#A97C3F] hover:bg-[#A97C3F]/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden lg:flex items-center flex-shrink-0">
            <StoreLinks />
          </div>
          <div className="flex-1 lg:hidden" />
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-[#433E36] hover:bg-[#A97C3F]/5"
            aria-label="메뉴 열기"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-[#DCD8CE] bg-[#F2F1EE]">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-3 rounded-lg text-[#433E36] font-medium hover:bg-[#A97C3F]/5 hover:text-[#A97C3F]"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 px-3">
              <StoreLinks />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
function Footer() {
  return (
    <footer className="w-full bg-[#1E1B18] text-[#DAD6CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 md:pt-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          <div>
            <Logo variant="inverted" className="mb-5" />
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              헤어디자이너와 전문가용 제품을 찾는 일반 소비자를 위한 맞춤 헤어미용도구 브랜드.
              보고 · 비교하고 · 조합하는 커스터마이징 경험을 제안합니다.
            </p>
          </div>
          <div>
            <h4 className="font-serif-kr font-semibold text-white mb-4">메뉴</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li><Link to="/tray-builder" className="hover:text-[#D9BE93]">커스텀 트레이</Link></li>
              <li><Link to="/products" className="hover:text-[#D9BE93]">헤어 살롱 용품</Link></li>
              <li><Link to="/curation" className="hover:text-[#D9BE93]">추천 구성</Link></li>
              <li><Link to="/insights" className="hover:text-[#D9BE93]">미용 인사이트</Link></li>
              <li><Link to="/reviews" className="hover:text-[#D9BE93]">고객 후기</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif-kr font-semibold text-white mb-4">고객센터</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> 1544-0000</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> help@gormi.co.kr</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 서울특별시</li>
              <li><Link to="/support" className="hover:text-[#D9BE93]">1:1 · B2B 문의</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif-kr font-semibold text-white mb-4">안내</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>이용약관</li>
              <li>개인정보처리방침</li>
              <li><Link to="/admin/login" className="hover:text-[#D9BE93]">관리자</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/10">
          <p className="text-xs text-white/40">© 2026 고르미 (GORMI). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
export default function Layout({ currentPageName }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#F2F1EE]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
}