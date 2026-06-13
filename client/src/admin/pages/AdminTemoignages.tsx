import CrudManager from '../CrudManager';

export default function AdminTemoignages() {
  return (
    <CrudManager
      resource="temoignages"
      title="Témoignages"
      description="Témoignages affichés sur la page d'accueil"
      defaultItem={{ rating: 5 }}
      fields={[
        { name: 'name', label: 'Nom du candidat', type: 'text', required: true },
        { name: 'role', label: 'Formation / Année', type: 'text', required: true, placeholder: 'Permis B - 2024' },
        { name: 'content', label: 'Témoignage', type: 'textarea', required: true, rows: 4 },
        { name: 'rating', label: 'Note (1-5)', type: 'number', required: true }
      ]}
      renderRow={(item) => (
        <div>
          <div className="font-semibold text-brand-900">{item.name}</div>
          <div className="text-xs text-gold-600 mb-1">{'★'.repeat(item.rating || 5)} • {item.role}</div>
          <div className="text-sm text-brand-500 truncate">"{item.content}"</div>
        </div>
      )}
    />
  );
}
