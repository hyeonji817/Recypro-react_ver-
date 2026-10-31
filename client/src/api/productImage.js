const assets = import.meta.glob('../assets/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function productImageUrl(filename, apiUrl = '') {
  if (!filename) return '';
  const value = String(filename).trim().replace(/\\/g, '/');
  if (/^https?:\/\//i.test(value)) return value;
  const relative = value.replace(/^(?:(?:\.\.?|src|assets|uploads)\/)+/, '');
  const match = Object.entries(assets).find(([path]) =>
    path.slice('../assets/'.length).toLowerCase() === relative.toLowerCase());
  if (match) return match[1];
  return `${apiUrl.replace(/\/+$/, '')}/uploads/${relative.split('/').map(encodeURIComponent).join('/')}`;
}