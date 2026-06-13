import CrudManager from '../CrudManager';

export default function AdminFormations() {
  return (
    <CrudManager
      resource="formations"
      title="Formations"
      description="Gérez les formations proposées (Permis B, A, Code, etc.)"
      defaultItem={{ featured: false, category: 'voiture', icon: 'car' }}
      fields={[
        { name: 'title', label: 'Nom de la formation', type: 'text', required: true },
        { name: 'category', label: 'Catégorie', type: 'select', required: true, options: [
          { value: 'voiture', label: 'Voiture' },
          { value: 'moto', label: 'Moto' },
          { value: 'code', label: 'Code de la route' },
          { value: 'mecanique', label: 'Mécanique' }
        ]},
        { name: 'price', label: 'Prix', type: 'text', required: true, placeholder: '3000 DH' },
        { name: 'duration', label: 'Durée', type: 'text', required: true, placeholder: '20-30 heures' },
        { name: 'description', label: 'Description', type: 'textarea', required: true },
        { name: 'icon', label: 'Icône', type: 'select', options: [
          { value: 'car', label: '🚗 Voiture' },
          { value: 'motorcycle', label: '🏍️ Moto' },
          { value: 'book', label: '📖 Livre' },
          { value: 'wrench', label: '🔧 Clé' },
          { value: 'shield', label: '🛡️ Bouclier' },
          { value: 'lightning', label: '⚡ Éclair' }
        ]}
      ]}
      renderRow={(item) => (
        <div>
          <div className="font-semibold text-brand-900">{item.title}</div>
          <div className="text-sm text-brand-500 flex gap-3 mt-1">
            <span className="text-gold-600 font-semibold">{item.price}</span>
            <span>•</span>
            <span>{item.duration}</span>
            <span>•</span>
            <span className="uppercase text-xs tracking-wider">{item.category}</span>
          </div>
        </div>
      )}
    />
  );
}
