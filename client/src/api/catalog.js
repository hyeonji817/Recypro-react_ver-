const localBase = (import.meta.env.VITE_API_URL || 'http://localhost:5003').replace(/\/+$/, '');

export function catalogUrl(resource, filename) {
  if (import.meta.env.DEV) {
    if (resource === 'image') return `${localBase}/uploads/${String(filename).split('/').map(encodeURIComponent).join('/')}`;
    return `${localBase}/api/${resource === 'new' ? 'newProducts' : 'best_products'}`;
  }
  const query = new URLSearchParams({ resource });
  if (filename) query.set('filename', filename);
  return `/api/catalog?${query}`;
}

export async function loadCatalog(resource, signal) {
  const response = await fetch(catalogUrl(resource), { signal });
  if (!response.ok) throw new Error(`상품 API 오류 (${response.status})`);
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error('상품 API 응답이 배열이 아닙니다.');
  return data;
}