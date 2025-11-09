import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function Referrals() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Referidos</h1>
          <p className="text-gray-600 mt-1">Sistema de referidos y recompensas</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-500" />
              Próximamente
            </CardTitle>
            <CardDescription>
              Esta funcionalidad estará disponible pronto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Podrás generar códigos QR y rastrear referidos automáticamente.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
