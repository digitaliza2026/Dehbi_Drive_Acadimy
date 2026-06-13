import CrudManager from '../CrudManager';

export default function AdminGalerie() {
  return (
    <CrudManager
      resource="galerie"
      title="Galerie"
      description="Gérez les photos affichées dans la galerie"
      fields={[
        { name: 'url', label: 'Photo', type: 'image', required: true },
        { name: 'title', label: 'Titre', type: 'text', required: true },
        { name: 'category', label: 'Catégorie', type: 'select', required: true, options: [
          { value: 'formation', label: 'Formation' },
          { value: 'vehicules', label: 'Véhicules' },
          { value: 'moto', label: 'Moto' },
          { value: 'centre', label: 'Centre' }
        ]}
      ]}
      renderRow={(item) => (
        <div className="flex items-center gap-3">
          <img
            src={item.url}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <div className="font-semibold text-brand-900">{item.title}</div>
            <div className="text-xs text-brand-500 uppercase tracking-wider">{item.category}</div>
          </div>
        </div>
      )}
    />
  );
}
