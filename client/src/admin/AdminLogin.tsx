import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const ok = await login(username, password);
    setLoading(false);
    if (ok) navigate('/admin');
    else setError('Identifiants incorrects');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,166,48,0.15),transparent_50%)]" />
      {/* Decorative orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-brand-400/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="inline-block mb-4"
          >
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="#1e3163" stroke="#eaa630" strokeWidth="3"/>
              <circle cx="32" cy="32" r="6" fill="#eaa630"/>
              <line x1="32" y1="10" x2="32" y2="26" stroke="#eaa630" strokeWidth="3" strokeLinecap="round"/>
              <line x1="32" y1="38" x2="32" y2="54" stroke="#eaa630" strokeWidth="3" strokeLinecap="round"/>
              <line x1="10" y1="32" x2="26" y2="32" stroke="#eaa630" strokeWidth="3" strokeLinecap="round"/>
              <line x1="38" y1="32" x2="54" y2="32" stroke="#eaa630" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-white">
            Dehbi <span className="text-gradient">Drive</span> Academy
          </h1>
          <p className="text-brand-300 text-sm tracking-wider uppercase mt-2">Panneau d'administration</p>
        </div>

        <form onSubmit={submit} className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="mb-4">
            <label className="block text-sm font-medium text-brand-100 mb-2">
              <User size={14} className="inline mr-1" /> Nom d'utilisateur
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-brand-300 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 focus:outline-none"
              placeholder="admin"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-brand-100 mb-2">
              <Lock size={14} className="inline mr-1" /> Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-brand-300 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/30 focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(s => !s)}
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-300 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-sm flex items-center gap-2"
            >
              <AlertCircle size={16} /> {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center !py-3 disabled:opacity-60"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
