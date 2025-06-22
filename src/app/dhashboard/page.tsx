import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, UserPlus, TrendingUp } from 'lucide-react';
import { mockClients } from '@/lib/mockData';

export default function DashboardPage() {
  const totalClients = mockClients.length;
  const activeClients = mockClients.filter(client => client.status === 'active').length;
  const prospects = mockClients.filter(client => client.status === 'prospect').length;
  const recentClients = mockClients.slice(0, 3);

  const stats = [
    {
      title: 'Total Clients',
      value: totalClients,
      description: 'Tous les clients',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Clients Actifs',
      value: activeClients,
      description: 'Actuellement actifs',
      icon: UserCheck,
      color: 'text-green-600'
    },
    {
      title: 'Prospects',
      value: prospects,
      description: 'Clients potentiels',
      icon: UserPlus,
      color: 'text-orange-600'
    },
    {
      title: 'Taux de Croissance',
      value: '12%',
      description: 'Ce mois-ci',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Tableau de Bord</h1>
          <p className="text-slate-600">Bon retour ! Voici ce qui se passe avec vos clients.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow bg-slate-100/50 backdrop-blur-sm border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
                <p className="text-xs text-slate-500">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Clients */}
        <Card className="bg-slate-100/50 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Clients Récents</CardTitle>
            <CardDescription className="text-slate-600">Vos clients ajoutés récemment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 bg-slate-50/80 rounded-lg border border-slate-200">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">
                        {client.firstName} {client.lastName}
                      </p>
                      <p className="text-sm text-slate-600">{client.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      client.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : client.status === 'prospect'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      {client.status === 'active' ? 'actif' : client.status === 'prospect' ? 'prospect' : 'inactif'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}