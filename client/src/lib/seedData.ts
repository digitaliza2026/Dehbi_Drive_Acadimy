// Bundled fallback data — used when the backend is unreachable or returns no
// records (e.g. static-only host before /api/* is wired up to Render).
// Keep in sync with server/data/*.json seed files.

export interface SeedFormation {
  id: string;
  title: string;
  category: string;
  price: string;
  duration: string;
  description: string;
  icon: string;
  featured?: boolean;
}

export interface SeedEtab {
  id: string;
  name: string;
  city: string;
  province: string;
  year: number;
  description: string;
  featured?: boolean;
}

export interface SeedTemoignage {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface SeedPhoto {
  id: string;
  url: string;
  title: string;
  category: string;
}

export interface SeedCreneau {
  id: string;
  day: string;
  time: string;
  available: boolean;
}

export const seedFormations: SeedFormation[] = [
  { id: 'f1', title: 'Permis B - Voiture', category: 'voiture', price: '3000 DH', duration: '20-30 heures', description: "Formation complète théorique et pratique pour l'obtention du permis B. Cours personnalisés adaptés à votre rythme.", icon: 'car', featured: true },
  { id: 'f2', title: 'Permis A - Moto', category: 'moto', price: '2500 DH', duration: '15-25 heures', description: "Formation pour permis moto avec instructeurs spécialisés. Sécurité et maîtrise au cœur de l'apprentissage.", icon: 'motorcycle', featured: true },
  { id: 'f3', title: 'Code de la Route', category: 'code', price: '800 DH', duration: 'Accès illimité', description: 'Maîtrise du code de la route avec supports numériques modernes : vidéos, applications et simulations interactives.', icon: 'book', featured: true },
  { id: 'f4', title: 'Mécanique Automobile', category: 'mecanique', price: '1500 DH', duration: '10-15 heures', description: 'Formation aux notions essentielles de mécanique automobile dispensée par un Technicien Spécialisé.', icon: 'wrench' },
  { id: 'f5', title: 'Formation Accélérée', category: 'voiture', price: '4500 DH', duration: '2 semaines', description: 'Formation intensive pour obtenir votre permis rapidement. Programme condensé et personnalisé.', icon: 'lightning' },
  { id: 'f6', title: 'Sécurité Routière', category: 'code', price: '600 DH', duration: '5 heures', description: 'Module spécialisé sur les règles de sécurité routière et la réglementation marocaine actualisée.', icon: 'shield' }
];

export const seedEtablissements: SeedEtab[] = [
  { id: 'e1', name: 'Première Auto-école Dehbi', city: 'Casablanca', province: 'Origine', year: 1996, description: 'Création de la première auto-école, avec une pédagogie axée sur la rigueur, la patience et le professionnalisme.', featured: true },
  { id: 'e2', name: 'Auto-école Maroc Conduite', city: 'Karia Ba Mohammed', province: 'Province de Taounate', year: 2014, description: "Extension de l'activité à la région de Taounate avec une nouvelle équipe d'instructeurs qualifiés." },
  { id: 'e3', name: 'Auto-école Mehdi Dehbi', city: 'Bouchabel', province: 'Province de Taounate', year: 2020, description: "Ouverture d'un nouveau centre pour répondre à la demande croissante dans la région." },
  { id: 'e4', name: 'Auto-école Dehbi', city: 'Oulja', province: 'Province de Taounate', year: 2021, description: 'Renforcement de notre présence dans la province de Taounate avec un centre moderne.' },
  { id: 'e5', name: 'Auto-école Code Dehbi', city: 'Hamria', province: 'Province de Moulay Yaacoub', year: 2022, description: "Centre spécialisé dans l'enseignement du code de la route avec supports numériques." },
  { id: 'e6', name: 'Dehbi Drive Academy 1', city: 'Centre-ville de Fès', province: 'Fès', year: 2024, description: 'Centre principal au cœur de Fès, équipé des dernières technologies pédagogiques.', featured: true },
  { id: 'e7', name: 'Dehbi Drive Academy 2', city: 'Ras El Mae', province: 'Fès', year: 2025, description: "Notre tout dernier centre, offrant des installations modernes et un service d'excellence.", featured: true }
];

export const seedTemoignages: SeedTemoignage[] = [
  { id: 't1', name: 'Youssef El Amrani', role: 'Permis B - 2024', content: "Une équipe extraordinaire ! J'ai obtenu mon permis du premier coup grâce à la pédagogie patiente et professionnelle des moniteurs.", rating: 5 },
  { id: 't2', name: 'Fatima Zahra Bennani', role: 'Permis A - 2024', content: 'Formation moto exceptionnelle. Les instructeurs sont à l\'écoute et adaptent le rythme à chaque élève. Je recommande vivement !', rating: 5 },
  { id: 't3', name: 'Karim Tazi', role: 'Code de la route - 2024', content: 'Les supports numériques modernes m\'ont vraiment aidé à maîtriser le code. Une approche pédagogique au top !', rating: 5 },
  { id: 't4', name: 'Salma Idrissi', role: 'Permis B - 2025', content: "30 ans d'expérience, ça se sent ! Apprentissage de qualité dans une ambiance chaleureuse. Merci à toute l'équipe.", rating: 5 },
  { id: 't5', name: 'Mehdi Alaoui', role: 'Formation accélérée - 2025', content: "Programme intensif parfaitement organisé. J'ai pu obtenir mon permis en deux semaines comme prévu. Bravo !", rating: 5 }
];

export const seedGalerie: SeedPhoto[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800', title: 'Cours de conduite', category: 'formation' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800', title: 'Voiture école', category: 'vehicules' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800', title: 'Formation moto', category: 'moto' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800', title: 'Apprentissage pratique', category: 'formation' },
  { id: 'g5', url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', title: 'Notre flotte', category: 'vehicules' },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800', title: 'Salle de code', category: 'centre' },
  { id: 'g7', url: 'https://images.unsplash.com/photo-1471444928139-48c5bf5173f8?w=800', title: 'Conduite urbaine', category: 'formation' },
  { id: 'g8', url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800', title: 'Permis moto', category: 'moto' },
  { id: 'g9', url: 'https://images.unsplash.com/photo-1517994112540-009c47ea476b?w=800', title: 'Centre moderne', category: 'centre' }
];
