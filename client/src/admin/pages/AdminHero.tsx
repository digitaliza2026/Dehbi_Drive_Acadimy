import CrudManager from '../CrudManager';

export default function AdminHero() {
  return (
    <CrudManager
      resource="hero"
      title="Section Hero"
      description="Gérez le contenu de la bannière d'accueil"
      fields={[
        { name: 'title', label: 'Titre principal', type: 'textarea', required: true, rows: 2 },
        { name: 'subtitle', label: 'Sous-titre', type: 'textarea', required: true },
        { name: 'ctaPrimary', label: 'Bouton principal (texte)', type: 'text' },
        { name: 'ctaPrimaryLink', label: 'Bouton principal (lien)', type: 'text', placeholder: '/reservation' },
        { name: 'ctaSecondary', label: 'Bouton secondaire (texte)', type: 'text' },
        { name: 'ctaSecondaryLink', label: 'Bouton secondaire (lien)', type: 'text' }
      ]}
      renderRow={(item) => (
        <div>
          <div className="font-semibold text-brand-900">{item.title}</div>
          <div className="text-sm text-brand-500 truncate">{item.subtitle}</div>
        </div>
      )}
    />
  );
}
