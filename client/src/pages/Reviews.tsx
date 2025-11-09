import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function Reviews() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reseñas</h1>
          <p className="text-gray-600 mt-1">Gestiona las reseñas de tus clientes</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Próximamente
            </CardTitle>
            <CardDescription>
              Esta funcionalidad estará disponible pronto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Podrás solicitar, gestionar y responder reseñas automáticamente.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
