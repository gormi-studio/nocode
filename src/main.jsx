import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import 'leaflet/dist/leaflet.css';
import '@/index.css'

// A route is lazy-loaded via a hashed chunk filename that changes on every
// build. A tab left open (or a cached page) across a new deploy still holds
// the OLD filename, so clicking into any lazy page 404s fetching it — this
// is what Vite's own `vite:preloadError` event means. There's nothing to
// recover in-place; the fix is a fresh copy of the page, once (a page stuck
// in a genuine crash loop must not reload forever).
window.addEventListener('vite:preloadError', () => {
  const KEY = 'gormi_chunk_reload_at';
  const last = Number(sessionStorage.getItem(KEY) || 0);
  if (Date.now() - last > 10000) {
    sessionStorage.setItem(KEY, String(Date.now()));
    window.location.reload();
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
