"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Pagination from '@/components/ui/pagination';
import { Eye, Mail, Phone, ArrowUpDown, Tag as TagIcon, Filter } from 'lucide-react';
import { Client, useCRMStore } from '@/lib/store';
import { cn } from '@/lib/utilis';

interface ClientTableProps {
  clients: Client[];
  searchTerm: string;
}

type SortField = 'firstName' | 'lastName' | 'email' | 'createdAt';
type SortDirection = 'asc' | 'desc';

export default function ClientTable({ clients, searchTerm }: ClientTableProps) {
  const { tags } = useCRMStore();
  const [sortField, setSortField] = useState<SortField>('firstName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const filteredClients = clients.filter(client => {
    // Safety check - ensure client exists
    if (!client) return false;
    
    let matchesSearch = false;
    
    if (!searchTerm || searchTerm === '') {
      matchesSearch = true;
    } else {
      const firstName = client.firstName && typeof client.firstName === 'string' ? client.firstName : '';
      const lastName = client.lastName && typeof client.lastName === 'string' ? client.lastName : '';
      const email = client.email && typeof client.email === 'string' ? client.email : '';
      const company = client.company && typeof client.company === 'string' ? client.company : '';
      
      const fullName = `${firstName} ${lastName}`.toLowerCase();
      const emailLower = email.toLowerCase();
      const companyLower = company.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      
      matchesSearch = fullName.includes(searchLower) || 
                     emailLower.includes(searchLower) || 
                     companyLower.includes(searchLower);
    }
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    
    const matchesTag = tagFilter === 'all' || (Array.isArray(client.tags) && client.tags.includes(tagFilter));
    
    return matchesSearch && matchesStatus && matchesTag;
  });

  const sortedClients = [...filteredClients].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortField === 'createdAt') {
      const aTime = new Date(aValue as string).getTime();
      const bTime = new Date(bValue as string).getTime();
      return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
    }

    const aStr = (aValue || '').toString();
    const bStr = (bValue || '').toString();

    if (aStr < bStr) return sortDirection === 'asc' ? -1 : 1;
    if (aStr > bStr) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = sortedClients.slice(startIndex, startIndex + itemsPerPage);

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

  const getTagById = (tagId: string) => {
    return tags.find(tag => tag.id === tagId);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <Card className="bg-slate-100/50 backdrop-blur-sm border-slate-200">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-lg font-semibold text-black">
            Répertoire des Clients ({filteredClients.length})
          </CardTitle>
          <div className="flex flex-wrap gap-2">
  <Select value={statusFilter} onValueChange={setStatusFilter}>
    <SelectTrigger className="w-[140px] bg-slate-50 border-slate-300 text-black">
      <Filter className="h-4 w-4 mr-2 text-black" />
      <SelectValue placeholder="Statut" />
    </SelectTrigger>
    <SelectContent className="text-black bg-white">
      <SelectItem value="all" className="text-black">Tous les statuts</SelectItem>
      <SelectItem value="active" className="text-black">Actif</SelectItem>
      <SelectItem value="prospect" className="text-black">Prospect</SelectItem>
      <SelectItem value="inactive" className="text-black">Inactif</SelectItem>
    </SelectContent>
  </Select>


            <Select value={tagFilter} onValueChange={setTagFilter}>
  <SelectTrigger className="w-[140px] bg-slate-50 border-slate-300 text-black">
    <TagIcon className="h-4 w-4 mr-2 text-black" />
    <SelectValue placeholder="Tag" />
  </SelectTrigger>
  <SelectContent className="text-black bg-white">
    <SelectItem value="all" className="text-black">Tous les tags</SelectItem>
    {tags.map((tag) => (
      <SelectItem key={tag.id} value={tag.id} className="text-black">
        <div className="flex items-center gap-2">
          <div className={cn("w-3 h-3 rounded-full", tag.color.split(' ')[0])} />
          {tag.name}
        </div>
      </SelectItem>
    ))}
  </SelectContent>
</Select>

          </div>
        </div>
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
                    className="h-auto p-0 font-medium text-black hover:bg-transparent"
                  >
                    Nom
                    <ArrowUpDown className="ml-2 h-4 w-4 text-black" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('email')}
                    className="h-auto p-0 font-medium text-black hover:bg-transparent"
                  >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left font-medium text-black">Téléphone</th>
                <th className="px-6 py-3 text-left font-medium text-black">Tags</th>
                <th className="px-6 py-3 text-left font-medium text-black">Statut</th>
                <th className="px-6 py-3 text-left">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort('createdAt')}
                    className="h-auto p-0 font-medium text-black hover:bg-transparent"
                  >
                    Créé le
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </th>
                <th className="px-6 py-3 text-left font-medium text-black">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginatedClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-black">
                        {client.firstName} {client.lastName}
                      </div>
                      {client.company && (
                        <div className="text-sm text-black">{client.company}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-black">
                      <Mail className="h-4 w-4 mr-2 text-black" />
                      {client.email || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-black">
                      <Phone className="h-4 w-4 mr-2 text-black" />
                      {client.phone || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {client.tags?.slice(0, 2).map((tagId) => {
                        const tag = getTagById(tagId);
                        if (!tag) return null;
                        return (
                          <Badge
                            key={tagId}
                            className={cn("text-xs", tag.color)}
                          >
                            {tag.name}
                          </Badge>
                        );
                      })}
                      {client.tags && client.tags.length > 2 && (
                        <Badge className="text-xs bg-slate-200 text-slate-600">
                          +{client.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={cn("capitalize", getStatusColor(client.status))}>
                      {getStatusText(client.status)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-black">
                    {client.createdAt ? formatDate(client.createdAt) : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/clients/${client.id}`}>
                      <Button variant="outline" size="sm" className="bg-slate-50 border-slate-300 hover:bg-slate-100 text-black">
                        <Eye className="h-4 w-4 mr-2 text-black" />
                        Voir
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredClients.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </CardContent>
    </Card>
  );
}