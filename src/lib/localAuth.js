// Local, backend-free admin auth for the /admin console.
//
// IMPORTANT — this is a client-only credential check for a small internal
// admin screen on a static site with no server. It keeps the console away
// from casual visitors; it is NOT real access control. Anyone who opens
// devtools or reads the built JS can see the configured credentials (when
// left at their defaults) and forge the "session" flag below. Put a real
// server-side auth check in front of this before storing anything genuinely
// sensitive in the admin console.
//
// Configure real credentials via VITE_ADMIN_EMAIL / VITE_ADMIN_PASSWORD at
// build time (e.g. in a .env file, not committed to git).

const TOKEN_KEY = 'access_token';
const USER_KEY = 'user';
const EXPIRES_KEY = 'gormi_session_expires';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@gormi.co.kr';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'gormi-admin!';

function makeToken() {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const localAuth = {
  async login({ email, password }) {
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      const err = new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      err.status = 401;
      throw err;
    }
    const user = { id: 1, name: '관리자', email, type: 'admin' };
    localStorage.setItem(TOKEN_KEY, makeToken());
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(EXPIRES_KEY, String(Date.now() + SESSION_TTL_MS));
    return { data: { data: { user } } };
  },

  async me() {
    const token = localStorage.getItem(TOKEN_KEY);
    const expires = Number(localStorage.getItem(EXPIRES_KEY) || 0);
    if (!token || !expires || Date.now() > expires) {
      const err = new Error('로그인이 필요합니다.');
      err.status = 401;
      throw err;
    }
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem(USER_KEY) || 'null');
    } catch {
      user = null;
    }
    return { data: user };
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(EXPIRES_KEY);
  },
};
