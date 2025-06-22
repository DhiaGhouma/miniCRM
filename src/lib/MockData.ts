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
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    createdAt: '2024-01-15',
    lastContact: '2024-01-20',
    status: 'active',
    company: 'Tech Solutions Inc.',
    notes: 'Interested in enterprise package'
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
    notes: 'Potential high-value client'
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
    notes: 'Regular monthly meetings scheduled'
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
    notes: 'Contract ended, potential for renewal'
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
    notes: 'Interested in custom solutions'
  }
];

export const mockActivities: Record<string, Activity[]> = {
  '1': [
    {
      id: '1',
      type: 'email',
      description: 'Sent proposal for enterprise package',
      date: '2024-01-20',
      user: 'Alex Thompson'
    },
    {
      id: '2',
      type: 'call',
      description: 'Initial consultation call - 45 minutes',
      date: '2024-01-18',
      user: 'Alex Thompson'
    },
    {
      id: '3',
      type: 'meeting',
      description: 'Product demo meeting scheduled',
      date: '2024-01-15',
      user: 'Sarah Davis'
    }
  ],
  '2': [
    {
      id: '4',
      type: 'email',
      description: 'Follow-up email sent',
      date: '2024-01-18',
      user: 'Mike Rodriguez'
    },
    {
      id: '5',
      type: 'note',
      description: 'Client expressed interest in premium features',
      date: '2024-01-16',
      user: 'Mike Rodriguez'
    }
  ],
  '3': [
    {
      id: '6',
      type: 'meeting',
      description: 'Monthly check-in meeting',
      date: '2024-01-12',
      user: 'Lisa Chen'
    },
    {
      id: '7',
      type: 'call',
      description: 'Technical support call',
      date: '2024-01-10',
      user: 'Lisa Chen'
    }
  ],
  '4': [
    {
      id: '8',
      type: 'email',
      description: 'Contract renewal reminder sent',
      date: '2024-01-15',
      user: 'John Martinez'
    }
  ],
  '5': [
    {
      id: '9',
      type: 'call',
      description: 'Discovery call - custom solution requirements',
      date: '2024-01-22',
      user: 'Emma Wilson'
    },
    {
      id: '10',
      type: 'email',
      description: 'Welcome email and onboarding materials sent',
      date: '2024-01-12',
      user: 'Emma Wilson'
    }
  ]
};