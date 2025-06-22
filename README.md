# Mini CRM – Frontend Challenge

Ce projet est un mini CRM développé avec Next.js dans le cadre d’un challenge technique.  
Il permet de gérer une liste de clients à travers une interface moderne et responsive.

## Objectif

Construire l’interface front-end d’un CRM interne en utilisant des données mockées, avec une structure claire, des composants réutilisables, et un design professionnel.

## Fonctionnalités

1. Page de connexion (mock)
   - Interface simple avec champs email/mot de passe
   - Pas de backend ni de validation
2. Dashboard
   - Barre de navigation (Dashboard, Clients, Ajouter un client)
   - Layout global réutilisable
3. Liste des clients
   - Tableau affichant des données mockées (JSON ou Faker.js)
   - Colonnes : nom, email, téléphone, date de création
   - Tri par nom et barre de recherche
4. Fiche client
   - Détail des informations d’un client sélectionné
   - Historique d’activités mocké
5. Formulaire d’ajout de client
   - Champs : prénom, nom, email, téléphone
   - Validation basique (email, téléphone)
   - Affichage d’un message de succès

## Stack technique

- Next.js (App Router)
- React 18+
- Tailwind CSS
- React Hook Form
- Faker.js (données mockées)
- TypeScript (optionnel)

## Structure recommandée

my-crm/
├── app/
│ ├── login/page.tsx
│ ├── dashboard/page.tsx
│ ├── clients/page.tsx
│ ├── clients/[id]/page.tsx
│ └── add-client/page.tsx
├── components/
│ ├── Navbar.tsx
│ ├── ClientTable.tsx
│ ├── ClientRow.tsx
│ ├── SearchBar.tsx
│ ├── ClientCard.tsx
│ ├── ActivityLog.tsx
│ ├── AddClientForm.tsx
│ └── SuccessMessage.tsx
├── data/
│ └── clients.json
├── styles/
│ └── globals.css
├── public/
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md


## Lancer le projet

1. Cloner le dépôt :
git clone https://github.com/DhiaGhouma/miniCRM.git
cd mini-crm'

2- Installer les dépendances :
npm install

3- Lancer le serveur de développement :
npm run dev

Le projet sera disponible sur http://localhost:3000.

Remarques importantes
Toutes les données sont simulées, aucun backend n’est requis.

Aucun outil d’IA n’a été utilisé pour générer le code.

Tous les composants sont organisés de façon réutilisable et découplée.

Le design est responsive, clair et professionnel.

Auteur:
Projet réalisé par : [Dhia Ghouma]



 

