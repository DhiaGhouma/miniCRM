"use client";

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ClientTable from '@/components/clients/clientsTable';
import SearchBar from '@/components/ui/SearchBar';
import { useCRMStore } from '@/lib/store';

export default function ClientsPage() {
  const { clients } = useCRMStore();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Clients</h1>
            <p className="text-slate-600">Gérez vos relations clients</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Rechercher par nom, email ou entreprise..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>
        </div>

        <ClientTable clients={clients} searchTerm={searchTerm} />
      </div>
    </DashboardLayout>
  );
}