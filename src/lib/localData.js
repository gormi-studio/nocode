// Tiny in-memory paging/filter/sort engine that mimics the subset of the old
// VibeX entity client's `.paging({page, limit, filter, sort})` contract the
// pages in this app rely on, so the UI code did not need to change when the
// data source moved from a hosted backend to local fixtures.

export function sortItems(items, sort) {
  if (!sort) return items;
  const desc = sort.startsWith('-');
  const field = desc ? sort.slice(1) : sort;
  const sorted = [...items].sort((a, b) => {
    const av = a[field];
    const bv = b[field];
    if (typeof av === 'number' && typeof bv === 'number') return av - bv;
    return String(av ?? '').localeCompare(String(bv ?? ''));
  });
  return desc ? sorted.reverse() : sorted;
}

function matchFilter(item, filter, searchFields) {
  return Object.entries(filter || {}).every(([key, value]) => {
    if (value === undefined || value === null || value === '') return true;
    if (key === 'search') {
      const q = String(value).toLowerCase();
      return searchFields.some((field) => {
        const v = item[field];
        if (Array.isArray(v)) return v.some((x) => String(x).toLowerCase().includes(q));
        return String(v ?? '').toLowerCase().includes(q);
      });
    }
    return String(item[key]) === String(value);
  });
}

/**
 * @param {() => any[]} getAll - returns the current fixture array
 * @param {{searchFields?: string[]}} [options]
 */
export function createReadOnlyEntity(getAll, { searchFields = [] } = {}) {
  return {
    async paging({ page = 1, limit = 20, filter = {}, sort } = {}) {
      const filtered = getAll().filter((item) => matchFilter(item, filter, searchFields));
      const sorted = sortItems(filtered, sort);
      const total = sorted.length;
      const totalPages = Math.max(1, Math.ceil(total / limit));
      const start = (page - 1) * limit;
      const data = sorted.slice(start, start + limit);
      return { data: { data, total, totalPages, page } };
    },
  };
}
