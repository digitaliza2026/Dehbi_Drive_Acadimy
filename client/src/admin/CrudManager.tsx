import { useEffect, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { api } from './api';
import ImageUpload from './ImageUpload';

export interface FieldDef {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'url' | 'email' | 'image';
  options?: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  rows?: number;
}

interface Props {
  resource: string;
  title: string;
  description?: string;
  fields: FieldDef[];
  renderRow?: (item: any) => ReactNode;
  defaultItem?: Record<string, any>;
}

export default function CrudManager({ resource, title, description, fields, renderRow, defaultItem = {} }: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.get(`/${resource}`);
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [resource]);

  const openNew = () => {
    setEditing({ ...defaultItem });
    setIsNew(true);
  };

  const openEdit = (item: any) => {
    setEditing({ ...item });
    setIsNew(false);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isNew) {
        await api.post(`/${resource}`, editing);
      } else {
        await api.put(`/${resource}/${editing.id}`, editing);
      }
      setEditing(null);
      await load();
    } catch {
      alert('Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    await api.del(`/${resource}/${id}`);
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-900">{title}</h1>
          {description && <p className="text-brand-600 text-sm mt-1">{description}</p>}
        </div>
        <button onClick={openNew} className="btn-primary !py-2 !px-4 !text-sm">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-brand-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-brand-400">Chargement...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-brand-400">
            Aucun élément. Cliquez sur "Ajouter" pour commencer.
          </div>
        ) : (
          <div className="divide-y divide-brand-100">
            {items.map(item => (
              <div key={item.id} className="p-4 hover:bg-brand-50/50 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  {renderRow ? renderRow(item) : (
                    <div>
                      <div className="font-semibold text-brand-900">{item.title || item.name || item.nom || item.year || item.id}</div>
                      <div className="text-sm text-brand-500 truncate">{item.description || item.city || item.email || ''}</div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(item)}
                    className="w-9 h-9 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 flex items-center justify-center transition-colors"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setEditing(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-brand-100 sticky top-0 bg-white">
                <h2 className="font-display text-xl font-bold text-brand-900">
                  {isNew ? 'Nouvel élément' : 'Modifier'}
                </h2>
                <button onClick={() => setEditing(null)} className="w-9 h-9 rounded-lg hover:bg-brand-50 flex items-center justify-center">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={save} className="p-6 space-y-4">
                {fields.map(f => (
                  <div key={f.name}>
                    <label className="block text-sm font-medium text-brand-700 mb-2">
                      {f.label} {f.required && <span className="text-red-500">*</span>}
                    </label>
                    {f.type === 'image' ? (
                      <ImageUpload
                        value={editing[f.name] || ''}
                        onChange={url => setEditing({ ...editing, [f.name]: url })}
                      />
                    ) : f.type === 'textarea' ? (
                      <textarea
                        required={f.required}
                        value={editing[f.name] || ''}
                        onChange={e => setEditing({ ...editing, [f.name]: e.target.value })}
                        rows={f.rows || 4}
                        placeholder={f.placeholder}
                        className="input-field resize-none"
                      />
                    ) : f.type === 'select' ? (
                      <select
                        required={f.required}
                        value={editing[f.name] || ''}
                        onChange={e => setEditing({ ...editing, [f.name]: e.target.value })}
                        className="input-field"
                      >
                        <option value="">Sélectionner...</option>
                        {f.options?.map(o => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    ) : f.type === 'number' ? (
                      <input
                        type="number"
                        required={f.required}
                        value={editing[f.name] ?? ''}
                        onChange={e => setEditing({ ...editing, [f.name]: e.target.value === '' ? '' : Number(e.target.value) })}
                        placeholder={f.placeholder}
                        className="input-field"
                      />
                    ) : (
                      <input
                        type={f.type}
                        required={f.required}
                        value={editing[f.name] || ''}
                        onChange={e => setEditing({ ...editing, [f.name]: e.target.value })}
                        placeholder={f.placeholder}
                        className="input-field"
                      />
                    )}
                  </div>
                ))}

                <div className="flex justify-end gap-3 pt-4 border-t border-brand-100">
                  <button type="button" onClick={() => setEditing(null)} className="btn-outline !py-2 !px-4 !text-sm">
                    Annuler
                  </button>
                  <button type="submit" disabled={saving} className="btn-primary !py-2 !px-4 !text-sm disabled:opacity-60">
                    <Save size={16} /> {saving ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
