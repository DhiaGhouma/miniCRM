import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

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
  tags: string[]; 
}

export interface Activity {
  id: string;
  clientId: string;
  type: 'email' | 'call' | 'meeting' | 'note';
  description: string;
  date: string;
  user: string;
}

interface CRMState {
  clients: Client[];
  tags: Tag[];
  activities: Activity[];
  

  addClient: (client: Omit<Client, 'id' | 'createdAt' | 'lastContact' | 'tags'>) => void;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClient: (id: string) => Client | undefined;
  

  addTag: (tag: Omit<Tag, 'id'>) => void;
  updateTag: (id: string, updates: Partial<Tag>) => void;
  deleteTag: (id: string) => void;
  getTag: (id: string) => Tag | undefined;
  

  addActivity: (activity: Omit<Activity, 'id'>) => void;
  getClientActivities: (clientId: string) => Activity[];
  
 
  addTagToClient: (clientId: string, tagId: string) => void;
  removeTagFromClient: (clientId: string, tagId: string) => void;
}

const defaultTags: Tag[] = [
  { id: '1', name: 'VIP', color: 'bg-purple-100 text-purple-800' },
  { id: '2', name: 'Nouveau', color: 'bg-green-100 text-green-800' },
  { id: '3', name: 'Priorité', color: 'bg-red-100 text-red-800' },
  { id: '4', name: 'Entreprise', color: 'bg-blue-100 text-blue-800' },
  { id: '5', name: 'Particulier', color: 'bg-orange-100 text-orange-800' },
];

const defaultClients: Client[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    createdAt: '2024-01-15',
    lastContact: '2024-01-20',
    status: 'active',
    company: 'Tech Solutions Inc.',
    notes: 'Interested in enterprise package',
    tags: ['1', '4'] 
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 234-5678',
    createdAt: '2024-01-10',
    lastContact: '2024-01-18',
    status: 'prospect',
    company: 'Design Studio',
    notes: 'Potential high-value client',
    tags: ['2', '3'] 
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1 (555) 345-6789',
    createdAt: '2024-01-05',
    lastContact: '2024-01-12',
    status: 'active',
    company: 'Marketing Pro',
    notes: 'Regular monthly meetings scheduled',
    tags: ['4'] 
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+1 (555) 456-7890',
    createdAt: '2024-01-08',
    lastContact: '2024-01-15',
    status: 'inactive',
    company: 'Creative Agency',
    notes: 'Contract ended, potential for renewal',
    tags: ['4'] 
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    phone: '+1 (555) 567-8901',
    createdAt: '2024-01-12',
    lastContact: '2024-01-22',
    status: 'active',
    company: 'Innovation Labs',
    notes: 'Interested in custom solutions',
    tags: ['1', '3', '4'] 
  },
  {
    id: '6',
    firstName: 'Marie',
    lastName: 'Dubois',
    email: 'marie.dubois@example.com',
    phone: '+33 1 23 45 67 89',
    createdAt: '2024-01-25',
    lastContact: '2024-01-28',
    status: 'prospect',
    company: '',
    notes: 'Client particulier intéressé par nos services',
    tags: ['2', '5'] 
  },
  {
    id: '7',
    firstName: 'Pierre',
    lastName: 'Martin',
    email: 'pierre.martin@example.com',
    phone: '+33 1 34 56 78 90',
    createdAt: '2024-01-20',
    lastContact: '2024-01-30',
    status: 'active',
    company: 'Consulting Plus',
    notes: 'Client fidèle depuis 2 ans',
    tags: ['1', '4']
  }
];

const defaultActivities: Activity[] = [
  {
    id: '1',
    clientId: '1',
    type: 'email',
    description: 'Sent proposal for enterprise package',
    date: '2024-01-20',
    user: 'Alex Thompson'
  },
  {
    id: '2',
    clientId: '1',
    type: 'call',
    description: 'Initial consultation call - 45 minutes',
    date: '2024-01-18',
    user: 'Alex Thompson'
  },
  {
    id: '3',
    clientId: '2',
    type: 'email',
    description: 'Follow-up email sent',
    date: '2024-01-18',
    user: 'Mike Rodriguez'
  },
  {
    id: '4',
    clientId: '3',
    type: 'meeting',
    description: 'Monthly check-in meeting',
    date: '2024-01-12',
    user: 'Lisa Chen'
  },
  {
    id: '5',
    clientId: '5',
    type: 'call',
    description: 'Discovery call - custom solution requirements',
    date: '2024-01-22',
    user: 'Emma Wilson'
  }
];

export const useCRMStore = create<CRMState>()(
  persist(
    (set, get) => ({
      clients: defaultClients,
      tags: defaultTags,
      activities: defaultActivities,

     
      addClient: (clientData) => {
        const newClient: Client = {
          ...clientData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString().split('T')[0],
          lastContact: new Date().toISOString().split('T')[0],
          tags: []
        };
        set((state) => ({
          clients: [...state.clients, newClient]
        }));
      },

      updateClient: (id, updates) => {
        set((state) => ({
          clients: state.clients.map((client) =>
            client.id === id ? { ...client, ...updates } : client
          )
        }));
      },

      deleteClient: (id) => {
        set((state) => ({
          clients: state.clients.filter((client) => client.id !== id),
          activities: state.activities.filter((activity) => activity.clientId !== id)
        }));
      },

      getClient: (id) => {
        return get().clients.find((client) => client.id === id);
      },

      addTag: (tagData) => {
        const newTag: Tag = {
          ...tagData,
          id: Date.now().toString()
        };
        set((state) => ({
          tags: [...state.tags, newTag]
        }));
      },

      updateTag: (id, updates) => {
        set((state) => ({
          tags: state.tags.map((tag) =>
            tag.id === id ? { ...tag, ...updates } : tag
          )
        }));
      },

      deleteTag: (id) => {
        set((state) => ({
          tags: state.tags.filter((tag) => tag.id !== id),
          clients: state.clients.map((client) => ({
            ...client,
            tags: client.tags.filter((tagId) => tagId !== id)
          }))
        }));
      },

      getTag: (id) => {
        return get().tags.find((tag) => tag.id === id);
      },

    
      addActivity: (activityData) => {
        const newActivity: Activity = {
          ...activityData,
          id: Date.now().toString()
        };
        set((state) => ({
          activities: [...state.activities, newActivity]
        }));
      },

      getClientActivities: (clientId) => {
        return get().activities.filter((activity) => activity.clientId === clientId);
      },

     
      addTagToClient: (clientId, tagId) => {
        set((state) => ({
          clients: state.clients.map((client) =>
            client.id === clientId && !client.tags.includes(tagId)
              ? { ...client, tags: [...client.tags, tagId] }
              : client
          )
        }));
      },

      removeTagFromClient: (clientId, tagId) => {
        set((state) => ({
          clients: state.clients.map((client) =>
            client.id === clientId
              ? { ...client, tags: client.tags.filter((id) => id !== tagId) }
              : client
          )
        }));
      }
    }),
    {
      name: 'crm-storage'
    }
  )
);