import { notFound } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  Clock,
  MessageCircle,
  PhoneCall,
  Video,
  FileText,
  Edit
} from 'lucide-react';
import { mockClients, mockActivities } from '@/lib/MockData';
import { cn } from '@/lib/utilis';

interface ClientDetailsPageProps {
  params: {
    id: string;
  };
}

export default function ClientDetailsPage({ params }: ClientDetailsPageProps) {
  const client = mockClients.find(c => c.id === params.id);
  const activities = mockActivities[params.id] || [];

  if (!client) {
    notFound();
  }

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4 text-blue-600" />;
      case 'call':
        return <PhoneCall className="h-4 w-4 text-green-600" />;
      case 'meeting':
        return <Video className="h-4 w-4 text-purple-600" />;
      case 'note':
        return <FileText className="h-4 w-4 text-orange-600" />;
      default:
        return <MessageCircle className="h-4 w-4 text-slate-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <DashboardLayout>
        
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              {client.firstName} {client.lastName}
            </h1>
            <p className="text-slate-600">{client.company}</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Edit className="h-4 w-4 mr-2" />
            Modifier Client
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="bg-slate-100/50 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-slate-600" />
                  <span className="text-slate-800">Informations Client</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600">Email</p>
                      <p className="font-medium text-slate-800">{client.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600">Téléphone</p>
                      <p className="font-medium text-slate-800">{client.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building2 className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600">Entreprise</p>
                      <p className="font-medium text-slate-800">{client.company || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600">Créé le</p>
                      <p className="font-medium text-slate-800">{formatDate(client.createdAt)}</p>
                    </div>
                  </div>
                </div>
                <Separator className="bg-slate-200" />
                <div>
                  <p className="text-sm text-slate-600 mb-2">Statut</p>
                  <Badge className={cn("capitalize", getStatusColor(client.status))}>
                    {getStatusText(client.status)}
                  </Badge>
                </div>
                {client.notes && (
                  <>
                    <Separator className="bg-slate-200" />
                    <div>
                      <p className="text-sm text-slate-600 mb-2">Notes</p>
                      <p className="text-slate-800">{client.notes}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-100/50 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg text-slate-800">Statistiques Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Activités</span>
                  <span className="font-semibold text-slate-800">{activities.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Dernier Contact</span>
                  <span className="font-semibold text-slate-800">{formatDate(client.lastContact)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Client Depuis</span>
                  <span className="font-semibold text-slate-800">{formatDate(client.createdAt)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="bg-slate-100/50 backdrop-blur-sm border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-slate-600" />
              <span className="text-slate-800">Chronologie des Activités</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-slate-800">{activity.description}</p>
                        <p className="text-sm text-slate-500">{formatDate(activity.date)}</p>
                      </div>
                      <p className="text-sm text-slate-600">par {activity.user}</p>
                    </div>
                    {index < activities.length - 1 && (
                      <div className="absolute left-6 mt-8 w-px h-8 bg-slate-200" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">Aucune activité enregistrée pour le moment</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}