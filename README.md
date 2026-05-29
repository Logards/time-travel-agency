# TimeTravel Agency — Webapp Interactive

Webapp pour une agence de voyage temporel fictive de luxe, créée dans le cadre d'un projet pédagogique M1/M2 Digital & IA.

**Available at** : <br>
⇨ https://timetravelagence.netlify.app

## Stack Technique

| Technologie | Usage |
|---|---|
| **React 18** | Framework UI (hooks, composants) |
| **Vite 5** | Build tool & dev server |
| **Tailwind CSS 3** | Styling utilitaire, responsive design |
| **Framer Motion 11** | Animations (fade-in, hover, transitions) |
| **Lucide React** | Icônes SVG légères |
| **Mistral AI API** | Moteur du chatbot conversationnel |

## Features

- **Hero immersive** — Section plein écran avec starfield animé, effets de portail temporel, titre Framer Motion
- **Présentation agence** — Section About avec cards animées au scroll (Intersection Observer via Framer Motion)
- **Galerie des destinations** — 3 cards interactives avec images lazy-loaded, badges d'ère, rating, hover effects
  - Paris 1889 — Belle Époque
  - Crétacé −65M — Ère Mésozoïque
  - Florence 1504 — Haute Renaissance
- **Modale destination** — Vue détaillée avec activités, highlights, prix et CTA de réservation
- **Chatbot IA** — Widget flottant bottom-right propulsé par Mistral AI (`mistral-small-latest`) avec personnalité définie (conseiller temporel de luxe), indicateur de frappe, gestion d'erreurs
- **Design responsive** — Mobile-first, menu hamburger sur mobile, adaptatif sur toutes les tailles d'écran
- **Navigation fluide** — Scroll smooth entre sections, header fixe avec effet glass au scroll

## IA Utilisée

- **Code** : Claude Sonnet 4.6 (Anthropic) via Claude Code CLI
- **Chatbot** : Mistral AI — modèle `mistral-small-latest`

## Installation

```bash
# Cloner le projet
git clone <url-du-repo>
cd time-travel-agency

# Installer les dépendances
npm install

# Configurer la clé API
cp .env.example .env
# Éditer .env et renseigner votre clé Mistral AI
# Obtenez une clé gratuite sur https://console.mistral.ai/

# Lancer en développement
npm run dev

# Build de production
npm run build
```

## Configuration API

Créez un fichier `.env` à la racine du projet :

```env
VITE_MISTRAL_API_KEY=your_mistral_api_key_here
```

> ⚠️ Ne committez jamais votre `.env`. Le `.gitignore` l'exclut déjà.

## Assets à fournir

Placez vos images dans `public/assets/images/` :

| Fichier | Description |
|---|---|
| `paris-1889.jpg` | Image hero Paris Belle Époque |
| `cretace.jpg` | Image hero Crétacé / dinosaures |
| `florence-1504.jpg` | Image hero Florence Renaissance |

Sans ces images, les cards affichent leur dégradé de couleur par défaut.

## Structure du projet

```
time-travel-agency/
├── public/
│   └── assets/images/        ← Ajouter vos images ici
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Destinations.jsx
│   │   ├── DestinationCard.jsx
│   │   ├── DestinationModal.jsx
│   │   ├── Chatbot.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── destinations.js   ← Données des 3 destinations
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .env                      ← À créer (non versionné)
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Licence

Projet pédagogique - M1/M2 Digital & IA
