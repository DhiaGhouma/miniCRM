"use client";

import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, UserPlus, TrendingUp, Tag as TagIcon } from 'lucide-react';
import { useCRMStore } from '@/lib/store';
import { cn } from '@/lib/utilis';

export default function DashboardPage() {
  const { clients, tags } = useCRMStore();
  
  const totalClients = clients.length;
  const activeClients = clients.filter(client => client.status === 'active').length;
  const prospects = clients.filter(client => client.status === 'prospect').length;
  const recentClients = clients.slice(-3).reverse();

  const stats = [
    {
      title: 'Total Clients',
      value: totalClients,
      description: 'Tous les clients',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Clients Actifs',
      value: activeClients,
      description: 'Actuellement actifs',
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Prospects',
      value: prospects,
      description: 'Clients potentiels',
      icon: UserPlus,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Taux de Croissance',
      value: '12%',
      description: 'Ce mois-ci',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const getTagById = (tagId: string) => {
    return tags.find(tag => tag.id === tagId);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header avec effet de profondeur */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-slate-600/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-xl">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
              Tableau de Bord
            </h1>
            <p className="text-slate-600 text-lg mt-2">Bon retour ! Voici ce qui se passe avec vos clients.</p>
          </div>
        </div>

        {/* Stats Grid avec effets visuels améliorés */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="group hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-white/50 hover:scale-105 hover:bg-white/95">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">
                  {stat.title}
                </CardTitle>
                <div className={cn("p-2 rounded-full transition-all duration-300", stat.bgColor)}>
                  <stat.icon className={cn("h-5 w-5 transition-all duration-300", stat.color)} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                  {stat.value}
                </div>
                <p className="text-xs text-slate-500 group-hover:text-slate-600 transition-colors">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Clients avec design amélioré */}
          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-slate-50 rounded-t-lg">
              <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                Clients Récents
              </CardTitle>
              <CardDescription className="text-slate-600">Vos clients ajoutés récemment</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {recentClients.map((client) => (
                  <div key={client.id} className="group flex items-center justify-between p-4 bg-gradient-to-r from-slate-50/80 to-blue-50/80 rounded-xl border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                          {client.firstName} {client.lastName}
                        </p>
                        <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors">
                          {client.email}
                        </p>
                        {client.tags.length > 0 && (
                          <div className="flex gap-1 mt-2">
                            {client.tags.slice(0, 2).map((tagId) => {
                              const tag = getTagById(tagId);
                              if (!tag) return null;
                              return (
                                <Badge
                                  key={tagId}
                                  className={cn("text-xs shadow-sm", tag.color)}
                                >
                                  {tag.name}
                                </Badge>
                              );
                            })}
                            {client.tags.length > 2 && (
                              <Badge className="text-xs bg-slate-200 text-slate-600 shadow-sm">
                                +{client.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm transition-all duration-300",
                        client.status === 'active' 
                          ? 'bg-green-100 text-green-800 group-hover:bg-green-200'
                          : client.status === 'prospect'
                          ? 'bg-orange-100 text-orange-800 group-hover:bg-orange-200'
                          : 'bg-slate-100 text-slate-800 group-hover:bg-slate-200'
                      )}>
                        {client.status === 'active' ? 'actif' : client.status === 'prospect' ? 'prospect' : 'inactif'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-t-lg">
              <CardTitle className="flex items-center space-x-2">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-2 rounded-full shadow-md">
                  <TagIcon className="h-5 w-5 text-slate-600" />
                </div>
                <span className="text-xl font-semibold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                  Tags Populaires
                </span>
              </CardTitle>
              <CardDescription className="text-slate-600">Tags les plus utilisés</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {tags.slice(0, 5).map((tag) => {
                  const clientsWithTag = clients.filter(client => client.tags.includes(tag.id)).length;
                  return (
                    <div key={tag.id} className="group flex items-center justify-between p-4 bg-gradient-to-r from-slate-50/80 to-blue-50/80 rounded-xl border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <div className="flex items-center space-x-3">
                        <Badge className={cn("flex items-center gap-2 shadow-sm transition-all duration-300 group-hover:shadow-md", tag.color)}>
                          <TagIcon className="h-3 w-3" />
                          {tag.name}
                        </Badge>
                      </div>
                      <div className="bg-white/80 px-3 py-1 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300">
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-800 transition-colors">
                          {clientsWithTag} client{clientsWithTag !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}