"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Mail, Phone, ArrowUpDown } from 'lucide-react';
import { Client } from '@/lib/MockData';
import { cn } from '@/lib/utilis'

interface ClientTableProps {
  clients: Client[];
}

type SortField = 'firstName' | 'lastName' | 'email' | 'createdAt';
type SortDirection = 'asc' | 'desc';

export default function ClientTable({ clients }: ClientTableProps) {
  const [sortField, setSortField] = useState<SortField>('firstName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

const sortedClients = [...clients].sort((a, b) => {
  const aValue = a[sortField];
  const bValue = b[sortField];

  if (sortField === 'createdAt') {
    const aTime = new Date(aValue as string).getTime();
    const bTime = new Date(bValue as string).getTime();
    return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
  }

  if (aValue! < bValue!) return sortDirection === 'asc' ? -1 : 1;
  if (aValue! > bValue!) return sortDirection === 'asc' ? 1 : -1;
  return 0;
});


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'prospect':
        return 'bg-orange-100 text-orange-800';
      case 'inactive':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'actif';
      case 'prospect':
        return 'prospect';
      case 'inactive':
        return 'inactif';
      default:
        return status;
    }
  };

  return (
    <Card className="bg-slate-100/50 backdrop-blur-sm border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">Répertoire des Clients</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-200/50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('firstName')}
                    className="h-auto p-0 font-medium text-slate-800 hover:bg-transparent"
                  >
                    Nom
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('email')}
                    className="h-auto p-0 font-medium text-slate-800 hover:bg-transparent"
                  >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left font-medium text-slate-800">Téléphone</th>
                <th className="px-6 py-3 text-left font-medium text-slate-800">Statut</th>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('createdAt')}
                    className="h-auto p-0 font-medium text-slate-800 hover:bg-transparent"
                  >
                    Créé le
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left font-medium text-slate-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {sortedClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-slate-800">
                        {client.firstName} {client.lastName}
                      </div>
                      {client.company && (
                        <div className="text-sm text-slate-600">{client.company}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-slate-800">
                      <Mail className="h-4 w-4 mr-2 text-slate-400" />
                      {client.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-slate-800">
                      <Phone className="h-4 w-4 mr-2 text-slate-400" />
                      {client.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={cn("capitalize", getStatusColor(client.status))}>
                      {getStatusText(client.status)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-800">
                    {formatDate(client.createdAt)}
                  </td>
                <td className="px-6 py-4">
  <Link href={`/clients/${client.id}`}>
    <Button
      variant="outline"
      size="sm"
      className="bg-white border border-black text-black hover:bg-black hover:text-white"
    >
      <Eye className="h-4 w-4 mr-2" />
      Voir
    </Button>
  </Link>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}