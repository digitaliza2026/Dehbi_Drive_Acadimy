import CrudManager from '../CrudManager';

export default function AdminCreneaux() {
  return (
    <CrudManager
      resource="creneaux"
      title="Créneaux horaires"
      description="Gérez les disponibilités proposées aux candidats"
      defaultItem={{ available: true }}
      fields={[
        { name: 'day', label: 'Jour', type: 'select', required: true, options: [
          { value: 'Lundi', label: 'Lundi' },
          { value: 'Mardi', label: 'Mardi' },
          { value: 'Mercredi', label: 'Mercredi' },
          { value: 'Jeudi', label: 'Jeudi' },
          { value: 'Vendredi', label: 'Vendredi' },
          { value: 'Samedi', label: 'Samedi' },
          { value: 'Dimanche', label: 'Dimanche' }
        ]},
        { name: 'time', label: 'Horaire', type: 'text', required: true, placeholder: '08:00 - 10:00' }
      ]}
      renderRow={(item) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gold-50 flex items-center justify-center text-gold-700 font-bold text-xs">
            {item.day?.substring(0, 3).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-brand-900">{item.day}</div>
            <div className="text-sm text-brand-500">{item.time}</div>
          </div>
          {item.available !== false && <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Disponible</span>}
        </div>
      )}
    />
  );
}
