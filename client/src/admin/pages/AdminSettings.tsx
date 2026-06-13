import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Building, Phone, Mail, MapPin, Hash, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const getToken = () => localStorage.getItem('dehbi_token');

export default function AdminSettings() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [settings, setSettings] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [showPw, setShowPw] = useState({ current: false, next: false, confirm: false });

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(setSettings);
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(settings)
      });
      if (!res.ok) throw new Error();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwError('Les mots de passe ne correspondent pas');
      return;
    }
    if (pwForm.newPassword.length < 6) {
      setPwError('Le nouveau mot de passe doit contenir au moins 6 caractères');
      return;
    }
    setPwSaving(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        setPwError(data.error || 'Erreur lors du changement de mot de passe');
        return;
      }
      setPwSuccess(true);
      setTimeout(() => {
        logout();
        navigate('/admin/login');
      }, 1500);
    } catch {
      setPwError('Erreur réseau');
    } finally {
      setPwSaving(false);
    }
  };

  const upd = (key: string, val: any) => setSettings({ ...settings, [key]: val });
  const updStats = (key: string, val: any) =>
    setSettings({ ...settings, stats: { ...(settings.stats || {}), [key]: Number(val) || 0 } });

  return (
    <div className="space-y-6 max-w-3xl">
      <form onSubmit={save} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-brand-900">Paramètres généraux</h1>
            <p className="text-brand-600 text-sm">Modifiez les informations globales du site</p>
          </div>
          <button type="submit" disabled={saving} className="btn-primary !py-2 !px-4 !text-sm disabled:opacity-60">
            <Save size={16} /> {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>

        {saved && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl p-3 text-sm">
            ✓ Paramètres enregistrés avec succès
          </div>
        )}

        {/* Identité */}
        <section className="bg-white rounded-2xl border border-brand-100 p-6">
          <h2 className="font-semibold text-brand-900 mb-4 flex items-center gap-2">
            <Building size={18} className="text-gold-500" /> Identité
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Nom de l'auto-école</label>
              <input type="text" value={settings.schoolName || ''} onChange={e => upd('schoolName', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Slogan</label>
              <input type="text" value={settings.tagline || ''} onChange={e => upd('tagline', e.target.value)} className="input-field" />
            </div>
          </div>
        </section>

        {/* Coordonnées */}
        <section className="bg-white rounded-2xl border border-brand-100 p-6">
          <h2 className="font-semibold text-brand-900 mb-4 flex items-center gap-2">
            <MapPin size={18} className="text-gold-500" /> Coordonnées
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Adresse</label>
              <textarea value={settings.address || ''} onChange={e => upd('address', e.target.value)} rows={2} className="input-field resize-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-2"><Phone size={14} className="inline mr-1" /> Téléphone mobile</label>
                <input type="text" value={settings.phone || ''} onChange={e => upd('phone', e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-2"><Phone size={14} className="inline mr-1" /> Téléphone fixe</label>
                <input type="text" value={settings.phoneFixed || ''} onChange={e => upd('phoneFixed', e.target.value)} className="input-field" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2"><Mail size={14} className="inline mr-1" /> Email</label>
              <input type="email" value={settings.email || ''} onChange={e => upd('email', e.target.value)} className="input-field" />
            </div>
          </div>
        </section>

        {/* Réseaux sociaux */}
        <section className="bg-white rounded-2xl border border-brand-100 p-6">
          <h2 className="font-semibold text-brand-900 mb-4">Réseaux sociaux</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Instagram (URL)</label>
              <input type="url" value={settings.instagram || ''} onChange={e => upd('instagram', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Instagram (handle)</label>
              <input type="text" value={settings.instagramHandle || ''} onChange={e => upd('instagramHandle', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Facebook (URL)</label>
              <input type="url" value={settings.facebook || ''} onChange={e => upd('facebook', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Facebook (nom)</label>
              <input type="text" value={settings.facebookHandle || ''} onChange={e => upd('facebookHandle', e.target.value)} className="input-field" />
            </div>
          </div>
        </section>

        {/* Statistiques */}
        <section className="bg-white rounded-2xl border border-brand-100 p-6">
          <h2 className="font-semibold text-brand-900 mb-4 flex items-center gap-2">
            <Hash size={18} className="text-gold-500" /> Statistiques
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Années</label>
              <input type="number" value={settings.stats?.years ?? ''} onChange={e => updStats('years', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Candidats</label>
              <input type="number" value={settings.stats?.candidates ?? ''} onChange={e => updStats('candidates', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Établissements</label>
              <input type="number" value={settings.stats?.branches ?? ''} onChange={e => updStats('branches', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Depuis (année)</label>
              <input type="number" value={settings.stats?.since ?? ''} onChange={e => updStats('since', e.target.value)} className="input-field" />
            </div>
          </div>
        </section>
      </form>

      {/* Sécurité */}
      <section className="bg-white rounded-2xl border border-brand-100 p-6">
        <h2 className="font-semibold text-brand-900 mb-1 flex items-center gap-2">
          <Lock size={18} className="text-gold-500" /> Sécurité
        </h2>
        <p className="text-brand-500 text-sm mb-6">Changez le mot de passe administrateur. Vous serez déconnecté après le changement.</p>

        {pwSuccess && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl p-3 text-sm">
            ✓ Mot de passe modifié. Redirection vers la page de connexion…
          </div>
        )}

        {pwError && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">
            {pwError}
          </div>
        )}

        <form onSubmit={changePassword} className="space-y-4 max-w-sm">
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-2">Mot de passe actuel</label>
            <div className="relative">
              <input
                type={showPw.current ? 'text' : 'password'}
                required
                value={pwForm.currentPassword}
                onChange={e => setPwForm(f => ({ ...f, currentPassword: e.target.value }))}
                className="input-field pr-10"
                placeholder="Mot de passe actuel"
              />
              <button
                type="button"
                onClick={() => setShowPw(s => ({ ...s, current: !s.current }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-600"
              >
                {showPw.current ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-2">Nouveau mot de passe</label>
            <div className="relative">
              <input
                type={showPw.next ? 'text' : 'password'}
                required
                minLength={6}
                value={pwForm.newPassword}
                onChange={e => setPwForm(f => ({ ...f, newPassword: e.target.value }))}
                className="input-field pr-10"
                placeholder="Minimum 6 caractères"
              />
              <button
                type="button"
                onClick={() => setShowPw(s => ({ ...s, next: !s.next }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-600"
              >
                {showPw.next ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-2">Confirmer le nouveau mot de passe</label>
            <div className="relative">
              <input
                type={showPw.confirm ? 'text' : 'password'}
                required
                value={pwForm.confirmPassword}
                onChange={e => setPwForm(f => ({ ...f, confirmPassword: e.target.value }))}
                className="input-field pr-10"
                placeholder="Répéter le nouveau mot de passe"
              />
              <button
                type="button"
                onClick={() => setShowPw(s => ({ ...s, confirm: !s.confirm }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-600"
              >
                {showPw.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={pwSaving || pwSuccess}
            className="btn-primary !py-2 !px-4 !text-sm disabled:opacity-60"
          >
            <Lock size={16} /> {pwSaving ? 'Enregistrement...' : 'Changer le mot de passe'}
          </button>
        </form>
      </section>
    </div>
  );
}
