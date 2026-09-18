import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, Phone, MapPin, Instagram, Youtube } from 'lucide-react';
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
      className={`inline-flex items-center h-10 px-5 rounded-full bg-black text-white text-sm font-semibold hover:bg-[#333333] transition-colors ${className}`}
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
      className={`sticky top-0 z-30 w-full transition-all duration-200 border-b ${
        scrolled ? 'bg-white/95 backdrop-blur-md border-[#D9D9D9]' : 'bg-white border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-12 lg:px-16">
        <div className="flex items-center h-16 md:h-[72px]">
          <Link to="/" className="flex items-center flex-shrink-0">
            <Logo />
          </Link>
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-8 pl-10">
            {NAV.map((item) => {
              const active = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`pb-1 text-sm font-semibold border-b-2 transition-colors ${
                    active
                      ? 'text-black border-[#A97C3F]'
                      : 'text-[#575757] border-transparent hover:text-black'
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
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-black hover:bg-[#F4F4F4]"
            aria-label="메뉴 열기"
          >
            {open ? <X className="w-6 h-6" strokeWidth={1.75} /> : <Menu className="w-6 h-6" strokeWidth={1.75} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-[#D9D9D9] bg-white">
          <div className="max-w-[1440px] mx-auto px-5 py-3 flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-1 py-3 text-[#1D1D1F] font-semibold hover:text-black"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 px-1">
              <StoreLinks />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
function Footer() {
  const socialIconClass =
    'w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#CCCCCC] hover:border-[#A97C3F] hover:text-[#A97C3F] transition-colors';
  return (
    <footer className="w-full bg-black text-[#CCCCCC]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-12 pt-16 pb-8 md:pt-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          <div className="col-span-2 md:col-span-1">
            <Logo variant="inverted" className="mb-4" />
            <p className="text-sm text-[#CCCCCC] leading-[1.5] max-w-xs">
              헤어디자이너와 전문가용 제품을 찾는<br />
              일반 소비자를 위한<br />
              맞춤 헤어미용도구 전문몰
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">둘러보기</h4>
            <ul className="space-y-2.5 text-sm text-[#CCCCCC]">
              <li><Link to="/brand-story" className="hover:text-[#A97C3F]">브랜드 스토리</Link></li>
              <li><Link to="/products" className="hover:text-[#A97C3F]">헤어살롱용품</Link></li>
              <li><Link to="/tray-builder" className="hover:text-[#A97C3F]">커스텀 트레이</Link></li>
              <li><Link to="/insights" className="hover:text-[#A97C3F]">미용 인사이트</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">고객센터</h4>
            <ul className="space-y-2.5 text-sm text-[#CCCCCC] mb-5">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" strokeWidth={1.75} /> 1544-0000</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" strokeWidth={1.75} /> help@gormi.co.kr</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" strokeWidth={1.75} /> 서울특별시</li>
            </ul>
            <Link
              to="/support"
              className="inline-flex items-center h-10 px-5 rounded-full bg-white text-black text-sm font-semibold hover:bg-[#E5E5E5] transition-colors"
            >
              1:1 · B2B 문의
            </Link>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">스토어 바로가기</h4>
            <a href="#" className="block text-sm text-[#CCCCCC] hover:text-[#A97C3F] mb-5">스토어 연결</a>
            {/* TODO: swap in the real social URLs once they exist. */}
            <div className="flex items-center gap-3">
              <a href="#" aria-label="인스타그램" className={socialIconClass}><Instagram className="w-4 h-4" strokeWidth={1.75} /></a>
              <a href="#" aria-label="유튜브" className={socialIconClass}><Youtube className="w-4 h-4" strokeWidth={1.75} /></a>
              <a href="#" aria-label="X" className={socialIconClass}><X className="w-4 h-4" strokeWidth={1.75} /></a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#767676]">© 2026 고르미 (GORMI). All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-[#767676]">
            <span>이용약관</span>
            <span>개인정보처리방침</span>
            <Link to="/admin/login" className="hover:text-white/70">관리자</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default function Layout({ currentPageName }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
}