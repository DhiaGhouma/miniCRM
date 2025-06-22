export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  lastContact: string;
  status: 'active' | 'inactive' | 'prospect';
  company?: string;
  notes?: string;
}

export interface Activity {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'note';
  description: string;
  date: string;
  user: string;
}

export const mockClients: Client[] = [
  {
    id: '1',
    firstName: 'Khalil',
    lastName: 'Ayari',
    email: 'khalil.ayari@tuncrm.com',
    phone: '+216 20 123 456',
    createdAt: '2024-02-05',
    lastContact: '2024-03-01',
    status: 'active',
    company: 'TuniTech',
    notes: 'Intéressé par une démo de la version Pro.'
  },
  {
    id: '2',
    firstName: 'Ebtihel',
    lastName: 'Ben Romdhane',
    email: 'ebtihel.benromdhane@tuncrm.com',
    phone: '+216 21 456 789',
    createdAt: '2024-02-10',
    lastContact: '2024-03-05',
    status: 'prospect',
    company: 'Digital Wave',
    notes: 'Demande des infos sur l’intégration ERP.'
  },
  {
    id: '3',
    firstName: 'Dhia',
    lastName: 'Ghouma',
    email: 'dhia.ghouma@tuncrm.com',
    phone: '+216 23 111 222',
    createdAt: '2024-01-20',
    lastContact: '2024-03-02',
    status: 'active',
    company: 'SmartDev Tunisia',
    notes: 'Contact régulier, intéressé par l’IA intégrée.'
  },
  {
    id: '4',
    firstName: 'Yasmine',
    lastName: 'Trabelsi',
    email: 'yasmine.trabelsi@tuncrm.com',
    phone: '+216 24 789 456',
    createdAt: '2024-01-15',
    lastContact: '2024-02-28',
    status: 'inactive',
    company: 'Design360',
    notes: 'Contrat terminé, en pause pour le moment.'
  },
  {
    id: '5',
    firstName: 'Oussama',
    lastName: 'Mseddi',
    email: 'oussama.mseddi@tuncrm.com',
    phone: '+216 25 321 654',
    createdAt: '2024-03-01',
    lastContact: '2024-03-15',
    status: 'active',
    company: 'InnoSoft',
    notes: 'Souhaite une personnalisation du dashboard.'
  }
];

export const mockActivities: Record<string, Activity[]> = {
  '1': [
    {
      id: '1',
      type: 'email',
      description: 'Envoi de la présentation produit Pro',
      date: '2024-03-01',
      user: 'Support CRM'
    },
    {
      id: '2',
      type: 'call',
      description: 'Appel de suivi client - 30 minutes',
      date: '2024-02-28',
      user: 'Support CRM'
    }
  ],
  '2': [
    {
      id: '3',
      type: 'note',
      description: 'Intéressée par une version API-friendly',
      date: '2024-03-04',
      user: 'Support Technique'
    }
  ],
  '3': [
    {
      id: '4',
      type: 'meeting',
      description: 'Réunion sur les modules IA',
      date: '2024-02-28',
      user: 'Ingénieur Commercial'
    }
  ],
  '4': [
    {
      id: '5',
      type: 'email',
      description: 'Rappel : fin de contrat',
      date: '2024-02-28',
      user: 'Relation Client'
    }
  ],
  '5': [
    {
      id: '6',
      type: 'call',
      description: 'Discussion sur le design du tableau de bord',
      date: '2024-03-14',
      user: 'Consultant UX'
    },
    {
      id: '7',
      type: 'email',
      description: 'Confirmation de session de test utilisateur',
      date: '2024-03-15',
      user: 'Consultant UX'
    }
  ]
};
