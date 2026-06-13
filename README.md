# 🚗 Dehbi Drive Academy — Site Web Complet

Site web professionnel pour l'auto-école **Dehbi Drive Academy** à Fès, Maroc.
30 ans d'excellence dans l'enseignement de la conduite — Plus de 10 000 candidats accompagnés.

## ✨ Fonctionnalités

### Site public (FR)
- 🎨 **Animation de chargement de 2 secondes** sur chaque transition de page
- 🏠 **Accueil** : hero parallax, statistiques animées, services, témoignages
- 📚 **Formations** : Permis B, A, Code de la route, Mécanique, etc. avec filtres
- 📍 **Établissements** : 7 centres au Maroc avec chronologie interactive
- 📅 **Réservation** : calendrier interactif + formulaire de réservation
- 🖼️ **Galerie** : grille masonry + lightbox
- 📞 **Contact** : formulaire + Google Maps + réseaux sociaux
- 📖 **À propos** : histoire du fondateur (1994 Institut de Casablanca) + chronologie animée

### Panneau d'administration (`/admin`)
- 🔐 Authentification JWT (login : `admin` / `admin123`)
- 📊 Tableau de bord avec statistiques en temps réel
- ✏️ CRUD complet pour : Hero, Formations, Établissements, Témoignages, Galerie, Créneaux
- 🖼️ **Upload d'images par glisser-déposer** dans la galerie (remplace les URL manuelles)
- 📩 Gestion des réservations (confirmer / annuler)
- ✉️ Gestion des messages (marquer lu / non lu)
- ⚙️ Paramètres globaux (coordonnées, statistiques, réseaux sociaux)
- 🔑 **Changement de mot de passe** depuis Paramètres → Sécurité (sans modifier config.js)

## 🛠️ Stack technique

- **Frontend** : React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion
- **Backend** : Node.js + Express + JWT
- **Stockage** : Fichiers JSON (aucune base de données externe)
- **Icônes** : Lucide React

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- npm

### Installation et lancement

```bash
# 1. Installer toutes les dépendances (racine + client + serveur)
npm run install:all

# 2. Lancer le projet (client + serveur en parallèle)
npm run dev
```

Le site sera accessible sur :
- 🌐 **Site public** : http://localhost:5173
- ⚙️ **Admin** : http://localhost:5173/admin
- 🔌 **API** : http://localhost:3001/api

### Identifiants admin par défaut

| Champ | Valeur |
|---|---|
| Utilisateur | `admin` |
| Mot de passe | `admin123` |

> ⚠️ **Important** : Changez le mot de passe depuis **Admin → Paramètres → Sécurité** après la première connexion. Les credentials sont stockés dans `server/data/auth.json` (créé automatiquement au premier lancement).

## 📁 Structure du projet

```
dehbi-drive-academy/
├── client/                    # Frontend React + Vite
│   ├── src/
│   │   ├── components/        # Navbar, Footer, LoadingScreen, etc.
│   │   ├── pages/             # Pages publiques (Home, Formations, etc.)
│   │   ├── admin/             # Panneau d'admin (Layout, Dashboard, CRUD)
│   │   │   └── pages/         # Pages individuelles de gestion
│   │   └── context/           # SettingsContext, AuthContext
│   └── index.html
├── server/                    # Backend Express
│   ├── routes/                # auth, crud, settings
│   ├── data/                  # 📦 Base de données JSON
│   │   ├── settings.json
│   │   ├── formations.json
│   │   ├── etablissements.json
│   │   ├── temoignages.json
│   │   ├── galerie.json
│   │   ├── creneaux.json
│   │   ├── reservations.json
│   │   └── messages.json
│   ├── middleware/auth.js     # JWT middleware
│   ├── config.js              # 🔑 Config admin & JWT
│   └── index.js               # Point d'entrée
└── package.json               # Scripts concurrently
```

## 🎨 Personnalisation

### Modifier les couleurs
`client/tailwind.config.js` — palette `brand` (bleu) + `gold` (doré).

### Modifier le contenu initial
Modifiez directement les fichiers dans `server/data/*.json` **avant le premier lancement**, ou utilisez le panneau d'admin après.

### Modifier les identifiants admin
Connectez-vous à l'admin et allez dans **Paramètres → Sécurité** pour changer le mot de passe.
Le nouveau hash est stocké dans `server/data/auth.json`.

### Modifier la durée du loader
`client/src/components/PageTransition.tsx` — ligne avec `setTimeout(..., 2000)`.

## 📜 Scripts disponibles

| Script | Description |
|---|---|
| `npm run dev` | Lance client (5173) + serveur (3001) en parallèle |
| `npm run build` | Build production du frontend |
| `npm run install:all` | Installe les dépendances racine + client + serveur |

## 🌐 Informations de l'auto-école

- **Adresse** : 1er étage, Espace Rihab Fès, Imm C, Av Allal Ben Abdellah, VN Fès, Maroc
- **Téléphone mobile** : 0663 722 722
- **Téléphone fixe** : 0532 138 710
- **Email** : Dehbi.drive@gmail.com
- **Instagram** : @dehbi_drive_academy
- **Facebook** : Dehbi Drive academy

## 📝 Notes

- Toutes les données sont persistées dans `server/data/*.json` (modifications faites via l'admin sont sauvegardées immédiatement).
- L'animation de chargement apparaît sur **chaque** changement de route et dure exactement **2 secondes**.
- Le site est entièrement **responsive** (375px à 1440px+).
- L'admin panel est entièrement **protégé** (JWT) — seules les opérations de lecture publique (GET) sont accessibles sans authentification.

---

© 2025 Dehbi Drive Academy. Conçu avec excellence pour la réussite de nos candidats.
