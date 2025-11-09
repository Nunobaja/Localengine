import DashboardLayout from "@/components/DashboardLayout";
import { BarChart3, Calendar, Star, TrendingUp, Users } from "lucide-react";

export default function Automations() {
  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { label: "Contactos", href: "/contacts", icon: Users },
    { label: "Visitas", href: "/visits", icon: Calendar },
    { label: "Reseñas", href: "/reviews", icon: Star },
    { label: "Referidos", href: "/referrals", icon: TrendingUp },
    { label: "Campañas", href: "/campaigns", icon: BarChart3 },
    { label: "Automatizaciones", href: "/automations", icon: BarChart3 },
    { label: "Configuración", href: "/settings", icon: BarChart3 },
  ];

  return (
    <DashboardLayout navItems={navItems}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Automatizaciones</h1>
        <p className="text-muted-foreground">Configura flujos automáticos</p>
      </div>
    </DashboardLayout>
  );
}
