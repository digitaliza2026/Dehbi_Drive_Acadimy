import CrudManager from '../CrudManager';

export default function AdminEtablissements() {
  return (
    <CrudManager
      resource="etablissements"
      title="Établissements"
      description="Gérez vos centres et leurs informations"
      fields={[
        { name: 'name', label: 'Nom du centre', type: 'text', required: true },
        { name: 'city', label: 'Ville', type: 'text', required: true },
        { name: 'province', label: 'Province', type: 'text', required: true },
        { name: 'year', label: "Année d'ouverture", type: 'number', required: true },
        { name: 'description', label: 'Description', type: 'textarea' }
      ]}
      renderRow={(item) => (
        <div>
          <div className="font-semibold text-brand-900">{item.name} <span className="text-gold-600 ml-2 text-sm">({item.year})</span></div>
          <div className="text-sm text-brand-500">{item.city}, {item.province}</div>
        </div>
      )}
    />
  );
}
