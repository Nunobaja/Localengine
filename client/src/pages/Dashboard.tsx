import { useMemo, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Star, TrendingUp, DollarSign, Clock, Plus } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { format, subDays, startOfDay } from "date-fns";
import { es } from "date-fns/locale";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  
  const { data: businesses, isLoading: loadingBusinesses } = trpc.businesses.list.useQuery();
  const businessId = businesses?.[0]?.id;

  // Redirect to onboarding if user has no business
  useEffect(() => {
    if (!loadingBusinesses && businesses && businesses.length === 0) {
      setLocation('/onboarding');
    }
  }, [loadingBusinesses, businesses, setLocation]);

  const { data: contacts } = trpc.contacts.list.useQuery(
    { businessId: businessId! },
    { enabled: !!businessId }
  );

  const { data: visits } = trpc.visits.list.useQuery(
    { businessId: businessId! },
    { enabled: !!businessId }
  );

  const metrics = useMemo(() => {
    if (!contacts || !visits) {
      return {
        totalContacts: 0,
        totalVisits: 0,
        visitsThisWeek: 0,
        avgTicket: 0,
        repeatRate: 0,
        avgSatisfaction: 0,
        recentVisits: [],
        topClients: [],
      };
    }

    const now = new Date();
    const weekAgo = startOfDay(subDays(now, 7));

    const visitsThisWeek = visits.filter(v => new Date(v.visitDate) >= weekAgo).length;

    const totalRevenue = visits.reduce((sum, v) => sum + (v.amount || 0), 0);
    const avgTicket = visits.length > 0 ? totalRevenue / visits.length / 100 : 0;

    const contactsWithMultipleVisits = contacts.filter(c => {
      const contactVisits = visits.filter(v => v.contactId === c.id);
      return contactVisits.length > 1;
    }).length;
    const repeatRate = contacts.length > 0 ? (contactsWithMultipleVisits / contacts.length) * 100 : 0;

    const satisfactionScores = visits.filter(v => v.satisfactionScore).map(v => v.satisfactionScore!);
    const avgSatisfaction = satisfactionScores.length > 0
      ? satisfactionScores.reduce((sum, score) => sum + score, 0) / satisfactionScores.length
      : 0;

    const recentVisits = visits
      .sort((a, b) => new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime())
      .slice(0, 5)
      .map(v => ({
        ...v,
        contactName: contacts.find(c => c.id === v.contactId)?.name || "Desconocido",
      }));

    const clientVisitCounts = contacts.map(c => ({
      ...c,
      visitCount: visits.filter(v => v.contactId === c.id).length,
      totalSpent: visits.filter(v => v.contactId === c.id).reduce((sum, v) => sum + (v.amount || 0), 0),
    })).sort((a, b) => b.visitCount - a.visitCount).slice(0, 5);

    return {
      totalContacts: contacts.length,
      totalVisits: visits.length,
      visitsThisWeek,
      avgTicket,
      repeatRate,
      avgSatisfaction,
      recentVisits,
      topClients: clientVisitCounts,
    };
  }, [contacts, visits]);

  if (loadingBusinesses) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Cargando...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!businesses || businesses.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Bienvenido a LBGC!</h2>
            <p className="text-gray-600 mb-6">Comienza creando tu primer negocio</p>
            <Button
              onClick={() => setLocation("/onboarding")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Mi Negocio
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            {businesses[0].name} - Vista general de tu negocio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contactos</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalContacts}</div>
              <p className="text-xs text-gray-600 mt-1">Base de clientes registrados</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitas Esta Semana</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.visitsThisWeek}</div>
              <p className="text-xs text-gray-600 mt-1">De {metrics.totalVisits} visitas totales</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">\${metrics.avgTicket.toFixed(2)}</div>
              <p className="text-xs text-gray-600 mt-1">Por visita</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasa de Repetición</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.repeatRate.toFixed(1)}%</div>
              <p className="text-xs text-gray-600 mt-1">Clientes recurrentes</p>
            </CardContent>
          </Card>
        </div>

        {metrics.avgSatisfaction > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Satisfacción Promedio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-yellow-600">
                  {metrics.avgSatisfaction.toFixed(1)}
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 ${
                        star <= Math.round(metrics.avgSatisfaction)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">de 5 estrellas</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Visitas Recientes</CardTitle>
              <CardDescription>Últimas 5 visitas registradas</CardDescription>
            </CardHeader>
            <CardContent>
              {metrics.recentVisits.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No hay visitas registradas</p>
                  <Button variant="link" onClick={() => setLocation("/visits")} className="mt-2">
                    Registrar primera visita
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {metrics.recentVisits.map((visit) => (
                    <div key={visit.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div>
                        <p className="font-medium">{visit.contactName}</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(visit.visitDate), "dd MMM yyyy", { locale: es })}
                        </p>
                        {visit.service && <p className="text-xs text-gray-500">{visit.service}</p>}
                      </div>
                      <div className="text-right">
                        {visit.amount && (
                          <p className="font-semibold text-green-600">\${(visit.amount / 100).toFixed(2)}</p>
                        )}
                        {visit.satisfactionScore && (
                          <div className="flex items-center gap-1 justify-end mt-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">{visit.satisfactionScore}/5</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mejores Clientes</CardTitle>
              <CardDescription>Por número de visitas</CardDescription>
            </CardHeader>
            <CardContent>
              {metrics.topClients.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No hay clientes registrados</p>
                  <Button variant="link" onClick={() => setLocation("/contacts")} className="mt-2">
                    Agregar primer cliente
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {metrics.topClients.map((client, index) => (
                    <div key={client.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-gray-600">
                            {client.visitCount} {client.visitCount === 1 ? "visita" : "visitas"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {client.totalSpent > 0 && (
                          <p className="font-semibold text-green-600">\${(client.totalSpent / 100).toFixed(2)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Gestiona tu negocio fácilmente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setLocation("/contacts")}>
                <Users className="h-6 w-6 text-purple-600" />
                <span className="font-semibold">Agregar Cliente</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setLocation("/visits")}>
                <Calendar className="h-6 w-6 text-blue-600" />
                <span className="font-semibold">Registrar Visita</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => setLocation("/settings")}>
                <Clock className="h-6 w-6 text-green-600" />
                <span className="font-semibold">Configuración</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
