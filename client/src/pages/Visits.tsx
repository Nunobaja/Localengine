import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, DollarSign, Star } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Visits() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    contactId: "",
    visitDate: new Date().toISOString().split('T')[0],
    service: "",
    amount: "",
    satisfactionScore: "5",
    notes: "",
  });

  const utils = trpc.useUtils();
  
  const { data: businesses } = trpc.businesses.list.useQuery();
  const businessId = businesses?.[0]?.id;

  const { data: contacts } = trpc.contacts.list.useQuery(
    { businessId: businessId! },
    { enabled: !!businessId }
  );

  const { data: visits, isLoading } = trpc.visits.list.useQuery(
    { businessId: businessId! },
    { enabled: !!businessId }
  );

  const createVisit = trpc.visits.create.useMutation({
    onSuccess: () => {
      toast.success("Visita registrada exitosamente");
      utils.visits.list.invalidate();
      utils.contacts.list.invalidate();
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast.error("Error al registrar visita: " + error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      contactId: "",
      visitDate: new Date().toISOString().split('T')[0],
      service: "",
      amount: "",
      satisfactionScore: "5",
      notes: "",
    });
  };

  const handleAdd = () => {
    if (!businessId) {
      toast.error("Primero debes crear un negocio");
      return;
    }
    if (!formData.contactId || !formData.visitDate) {
      toast.error("Cliente y fecha son obligatorios");
      return;
    }
    createVisit.mutate({
      businessId,
      contactId: parseInt(formData.contactId),
      visitDate: new Date(formData.visitDate),
      service: formData.service || undefined,
      amount: formData.amount ? Math.round(parseFloat(formData.amount) * 100) : undefined,
      satisfactionScore: parseInt(formData.satisfactionScore),
      notes: formData.notes || undefined,
    });
  };

  const getContactName = (contactId: number) => {
    return contacts?.find(c => c.id === contactId)?.name || "Desconocido";
  };

  const getSatisfactionBadge = (score: number | null) => {
    if (!score) return { label: "Sin calificar", color: "bg-gray-100 text-gray-700" };
    const rating = score;
    if (rating >= 4) return { label: "Excelente", color: "bg-green-100 text-green-700" };
    if (rating >= 3) return { label: "Bueno", color: "bg-blue-100 text-blue-700" };
    if (rating >= 2) return { label: "Regular", color: "bg-yellow-100 text-yellow-700" };
    return { label: "Malo", color: "bg-red-100 text-red-700" };
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Visitas</h1>
            <p className="text-gray-600 mt-1">Registra las visitas de tus clientes</p>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Registrar Visita
          </Button>
        </div>

        {/* Visits Table */}
        <Card>
          <CardHeader>
            <CardTitle>Historial de Visitas</CardTitle>
            <CardDescription>
              {visits?.length || 0} visitas registradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Cargando...</div>
            ) : !visits || visits.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No hay visitas registradas. ¡Registra la primera!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Servicio</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Satisfacción</TableHead>
                      <TableHead>Notas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visits.map((visit) => {
                      const satisfaction = getSatisfactionBadge(visit.satisfactionScore);
                      return (
                        <TableRow key={visit.id}>
                          <TableCell className="font-medium">
                            {getContactName(visit.contactId)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <span>
                                {format(new Date(visit.visitDate), "dd MMM yyyy", { locale: es })}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{visit.service || "-"}</TableCell>
                          <TableCell>
                            {visit.amount ? (
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3 text-gray-400" />
                                <span className="font-semibold">{(visit.amount / 100).toFixed(2)}</span>
                              </div>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={satisfaction.color}>
                              <Star className="h-3 w-3 mr-1" />
                              {satisfaction.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {visit.notes || "-"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Visit Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Registrar Nueva Visita</DialogTitle>
              <DialogDescription>
                Completa la información de la visita
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact">Cliente *</Label>
                <Select value={formData.contactId} onValueChange={(value) => setFormData({ ...formData, contactId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts?.map((contact) => (
                      <SelectItem key={contact.id} value={contact.id.toString()}>
                        {contact.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="visitDate">Fecha *</Label>
                <Input
                  id="visitDate"
                  type="date"
                  value={formData.visitDate}
                  onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Servicio</Label>
                <Input
                  id="service"
                  placeholder="Corte de cabello, manicure, etc."
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Monto Gastado</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Satisfacción (1-5)</Label>
                <Select value={formData.satisfactionScore} onValueChange={(value) => setFormData({ ...formData, satisfactionScore: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ Excelente</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ Muy Bueno</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ Bueno</SelectItem>
                    <SelectItem value="2">⭐⭐ Regular</SelectItem>
                    <SelectItem value="1">⭐ Malo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notas</Label>
                <Input
                  id="notes"
                  placeholder="Observaciones adicionales"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsAddDialogOpen(false); resetForm(); }}>
                Cancelar
              </Button>
              <Button
                onClick={handleAdd}
                disabled={createVisit.isPending}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                {createVisit.isPending ? "Guardando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
