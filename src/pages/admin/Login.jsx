import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, AlertCircle, Lock } from 'lucide-react';
import { localAuth } from '@/lib/localAuth';
import Logo from '@/components/Logo';
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) { setChecking(false); return; }
    (async () => {
      try {
        const res = await localAuth.me();
        const user = res?.data;
        if (user?.type === 'admin') { navigate('/admin', { replace: true }); return; }
        localAuth.logout();
      } catch {
        localAuth.logout();
      } finally {
        setChecking(false);
      }
    })();
  }, [navigate]);
  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError('이메일과 비밀번호를 입력해 주세요.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await localAuth.login({ email: email.trim(), password });
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err?.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };
  if (checking) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#F2F1EE]">
        <div className="w-8 h-8 border-4 border-[#DCD8CE] border-t-[#A97C3F] rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F1EE] px-4 relative overflow-hidden">
      <div className="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-[#A97C3F]/12 blur-3xl" />
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-[0_30px_80px_-30px_rgba(169,124,63,0.3)] border border-[#DAD6CC] p-8">
          <div className="flex flex-col items-center mb-8">
            <Logo className="mb-4" />
            <div className="flex items-center gap-2 text-[#948A76] text-sm">
              <Lock className="w-4 h-4" /> 관리자 로그인
            </div>
          </div>
          <div role="form" aria-label="관리자 로그인">
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#433E36] mb-1.5">이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleLogin(); }}
                placeholder="이메일 주소를 입력해 주세요"
                className="w-full px-4 py-3 rounded-xl border border-[#D6D1C4] focus:border-[#A97C3F] focus:ring-2 focus:ring-[#A97C3F]/20 outline-none bg-[#F2F1EE]"
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-[#433E36] mb-1.5">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleLogin(); }}
                placeholder="비밀번호를 입력해 주세요"
                className="w-full px-4 py-3 rounded-xl border border-[#D6D1C4] focus:border-[#A97C3F] focus:ring-2 focus:ring-[#A97C3F]/20 outline-none bg-[#F2F1EE]"
              />
            </div>
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-800 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
              </div>
            )}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#A97C3F] text-white font-semibold hover:bg-[#7D5D2E] disabled:opacity-60 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> 로그인 중…</> : '로그인'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}