import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function Campaigns() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campañas</h1>
          <p className="text-gray-600 mt-1">Campañas de marketing y reactivación</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-500" />
              Próximamente
            </CardTitle>
            <CardDescription>
              Esta funcionalidad estará disponible pronto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Podrás crear y enviar campañas de WhatsApp, SMS y email automáticamente.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
