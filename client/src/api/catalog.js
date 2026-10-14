const localBase = (import.meta.env.VITE_API_URL || 'http://localhost:5003').replace(/\/+$/, '');

export function catalogUrl(resource, filename) {
  if (import.meta.env.DEV) {
    if (resource === 'image') 
      return `${localBase}/uploads/${String(filename).split('/').map(encodeURIComponent).join('/')}`;
      return `${localBase}/api/${resource === 'new' ? 'newProducts' : 'best_products'}`;
  }
  const query = new URLSearchParams({ resource });

  if (filename) query.set('filename', filename);

  return `/api/catalog?${query}`;
}

export async function loadCatalog(resource, signal) {
  const response = await fetch(catalogUrl(resource), { signal });
  const type = response.headers.get('content-type') || '';
  if (!type.includes('application/json')) {
    throw new Error('상품 API 대신 HTML/정적 파일이 반환됐습니다. client/api/catalog.js를 포함하여 소스 전체를 Vercel에 배포하세요.');
  }
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(`상품 API 오류 (${response.status}, ${detail.code || 'UNKNOWN'}): ${detail.error || '서버 응답 실패'}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) throw new Error('상품 API 응답이 배열이 아닙니다.');

  return data;
}