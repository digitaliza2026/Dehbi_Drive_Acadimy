const RAW = (import.meta.env.VITE_API_URL as string | undefined) ?? '';
export const API_BASE = RAW.replace(/\/$/, '');

export const apiUrl = (path: string) => `${API_BASE}${path}`;

export const assetUrl = (url: string | undefined | null) => {
  if (!url) return '';
  if (/^https?:\/\//i.test(url) || url.startsWith('data:')) return url;
  if (url.startsWith('/uploads')) return `${API_BASE}${url}`;
  return url;
};
