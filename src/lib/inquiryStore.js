// Client-side "database" for inquiries: persisted to localStorage so the
// contact form and the admin inbox work end-to-end without a backend.
// This is per-browser storage, not a shared database — swap this module
// for a real API client once a backend is wired up.
import { sortItems } from '@/lib/localData';

const STORAGE_KEY = 'gormi_inquiries';

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage unavailable (private mode / quota) — silently no-op
  }
}

function nextId(items) {
  return items.reduce((max, it) => Math.max(max, Number(it.id) || 0), 0) + 1;
}

export const Inquiry = {
  async create(payload) {
    const items = readAll();
    const record = {
      id: nextId(items),
      status: 'new',
      createdAt: new Date().toISOString(),
      ...payload,
    };
    items.unshift(record);
    writeAll(items);
    return { data: record };
  },

  async paging({ page = 1, limit = 10, filter = {}, sort = '-id' } = {}) {
    let items = readAll();
    if (filter.type) items = items.filter((it) => it.type === filter.type);
    items = sortItems(items, sort);
    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const data = items.slice(start, start + limit);
    return { data: { data, total, totalPages, page } };
  },

  async update(id, patch) {
    const items = readAll();
    const idx = items.findIndex((it) => String(it.id) === String(id));
    if (idx === -1) {
      throw new Error('문의를 찾을 수 없습니다.');
    }
    items[idx] = { ...items[idx], ...patch };
    writeAll(items);
    return { data: items[idx] };
  },
};
