import { apiUrl } from '../lib/apiBase';

const getToken = () => localStorage.getItem('dehbi_token');

export const api = {
  get: async (path: string) => {
    const res = await fetch(apiUrl(`/api${path}`));
    if (!res.ok) throw new Error('Erreur de chargement');
    return res.json();
  },
  post: async (path: string, body: any) => {
    const res = await fetch(apiUrl(`/api${path}`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('Erreur de création');
    return res.json();
  },
  put: async (path: string, body: any) => {
    const res = await fetch(apiUrl(`/api${path}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('Erreur de mise à jour');
    return res.json();
  },
  del: async (path: string) => {
    const res = await fetch(apiUrl(`/api${path}`), {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    if (!res.ok) throw new Error('Erreur de suppression');
    return res.json();
  }
};
