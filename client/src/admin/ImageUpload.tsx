import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

const getToken = () => localStorage.getItem('dehbi_token');

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: Props) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = (file: File) => {
    setError(null);
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      setError('Type de fichier non autorisé (JPEG, PNG, WebP, GIF uniquement)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Fichier trop volumineux (max 5 Mo)');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload');
    xhr.setRequestHeader('Authorization', `Bearer ${getToken()}`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
    };

    xhr.onload = () => {
      setUploading(false);
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        onChange(data.url);
        setProgress(0);
      } else {
        try {
          const err = JSON.parse(xhr.responseText);
          setError(err.error || 'Erreur lors du téléchargement');
        } catch {
          setError('Erreur lors du téléchargement');
        }
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      setError('Erreur réseau');
    };

    setUploading(true);
    setProgress(0);
    xhr.send(formData);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    e.target.value = '';
  };

  if (value) {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative inline-block">
          <img
            src={value}
            alt="Aperçu"
            loading="lazy"
            decoding="async"
            className="h-40 w-auto rounded-xl object-cover border border-brand-200"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X size={12} />
          </button>
        </div>
        <p className="text-xs text-brand-500 truncate max-w-xs">{value}</p>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          uploading ? 'cursor-default' : 'cursor-pointer'
        } ${
          dragging
            ? 'border-gold-500 bg-gold-50'
            : 'border-brand-300 hover:border-gold-400 hover:bg-brand-50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={onFileChange}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <p className="text-brand-600 text-sm font-medium">Téléchargement en cours... {progress}%</p>
            <div className="w-full max-w-xs bg-brand-100 rounded-full h-2">
              <div
                className="bg-gold-500 h-2 rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-brand-500">
            <Upload size={32} className="text-brand-400" />
            <span className="text-sm font-medium">Glissez une image ici ou cliquez pour parcourir</span>
            <span className="text-xs text-brand-400">JPEG, PNG, WebP, GIF — max 5 Mo</span>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
