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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Phone, Mail, Calendar, TrendingUp } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Contacts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const utils = trpc.useUtils();
  
  // Get user's first business
  const { data: businesses } = trpc.businesses.list.useQuery();
  const businessId = businesses?.[0]?.id;

  const { data: contacts, isLoading } = trpc.contacts.list.useQuery(
    { businessId: businessId! },
    { enabled: !!businessId }
  );

  const createContact = trpc.contacts.create.useMutation({
    onSuccess: () => {
      toast.success("Contacto creado exitosamente");
      utils.contacts.list.invalidate();
      setIsAddDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast.error("Error al crear contacto: " + error.message);
    },
  });

  const updateContact = trpc.contacts.update.useMutation({
    onSuccess: () => {
      toast.success("Contacto actualizado exitosamente");
      utils.contacts.list.invalidate();
      setIsEditDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast.error("Error al actualizar contacto: " + error.message);
    },
  });

  // Delete functionality not implemented in backend yet

  const resetForm = () => {
    setFormData({ name: "", phone: "", email: "", notes: "" });
    setSelectedContact(null);
  };

  const handleAdd = () => {
    if (!businessId) {
      toast.error("Primero debes crear un negocio");
      return;
    }
    if (!formData.name || !formData.phone) {
      toast.error("Nombre y teléfono son obligatorios");
      return;
    }
    createContact.mutate({
      businessId,
      name: formData.name,
      phone: formData.phone,
      email: formData.email || undefined,
      notes: formData.notes || undefined,
    });
  };

  const handleEdit = (contact: any) => {
    setSelectedContact(contact);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      email: contact.email || "",
      notes: contact.notes || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedContact) return;
    if (!formData.name || !formData.phone) {
      toast.error("Nombre y teléfono son obligatorios");
      return;
    }
    updateContact.mutate({
      id: selectedContact.id,
      name: formData.name,
      phone: formData.phone,
      email: formData.email || undefined,
      notes: formData.notes || undefined,
    });
  };

  const handleDelete = (id: number) => {
    toast.info("Funcionalidad de eliminar próximamente");
  };

  const filteredContacts = contacts?.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.phone && contact.phone.includes(searchQuery)) ||
    (contact.email && contact.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getVisitFrequency = (lastVisit: Date | null) => {
    if (!lastVisit) return { label: "Nuevo", color: "bg-blue-100 text-blue-700" };
    
    const daysSinceLastVisit = Math.floor((Date.now() - new Date(lastVisit).getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceLastVisit > 90) return { label: "Inactivo", color: "bg-red-100 text-red-700" };
    if (daysSinceLastVisit > 30) return { label: "Riesgo", color: "bg-orange-100 text-orange-700" };
    return { label: "Activo", color: "bg-green-100 text-green-700" };
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contactos</h1>
            <p className="text-gray-600 mt-1">Gestiona tu base de clientes</p>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Contacto
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, teléfono o email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contacts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Contactos</CardTitle>
            <CardDescription>
              {filteredContacts?.length || 0} contactos encontrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">Cargando...</div>
            ) : !filteredContacts || filteredContacts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No hay contactos. ¡Agrega tu primer cliente!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Contacto</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Visitas</TableHead>
                      <TableHead>Última Visita</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => {
                      const frequency = getVisitFrequency(contact.lastVisitAt);
                      return (
                        <TableRow key={contact.id}>
                          <TableCell className="font-medium">{contact.name}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="h-3 w-3 text-gray-400" />
                                <span>{contact.phone}</span>
                              </div>
                              {contact.email && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Mail className="h-3 w-3 text-gray-400" />
                                  <span>{contact.email}</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={frequency.color}>
                              {frequency.label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-gray-400" />
                              <span className="font-semibold">-</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {contact.lastVisitAt ? (
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-3 w-3 text-gray-400" />
                                <span>
                                  {format(new Date(contact.lastVisitAt), "dd MMM yyyy", { locale: es })}
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">Sin visitas</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(contact)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(contact.id)}
                                className="text-gray-400 hover:text-gray-500 hover:bg-gray-50"
                                disabled
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
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

        {/* Add Contact Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Nuevo Contacto</DialogTitle>
              <DialogDescription>
                Completa la información del cliente
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  placeholder="Juan Pérez"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input
                  id="phone"
                  placeholder="+52 55 1234 5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="juan@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notas</Label>
                <Input
                  id="notes"
                  placeholder="Preferencias, alergias, etc."
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
                disabled={createContact.isPending}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                {createContact.isPending ? "Guardando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Contact Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Contacto</DialogTitle>
              <DialogDescription>
                Actualiza la información del cliente
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nombre *</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Teléfono *</Label>
                <Input
                  id="edit-phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notas</Label>
                <Input
                  id="edit-notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => { setIsEditDialogOpen(false); resetForm(); }}>
                Cancelar
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={updateContact.isPending}
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                {updateContact.isPending ? "Actualizando..." : "Actualizar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
