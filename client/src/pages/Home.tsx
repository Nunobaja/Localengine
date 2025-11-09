import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { ArrowRight, BarChart3, MessageSquare, Star, Users, Zap, TrendingUp, Check, Shield, Clock, Sparkles, Target, Heart } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  // Allow authenticated users to see the landing page
  // They can navigate to dashboard via the button in the nav

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Navigation */}
      <nav className="border-b border-purple-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/logo-prospectalo.png" alt="Prospectalo" className="h-12 w-12" />
              <div>
                <div className="font-bold text-xl text-gray-900 leading-none">Prospectalo</div>
                <div className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold leading-none mt-0.5">Motor de ventas</div>
              </div>
            </div>
            {user ? (
              <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg">
                <a href="/dashboard">Ir al Dashboard</a>
              </Button>
            ) : (
              <Button asChild variant="outline" className="border-2 border-purple-300 hover:bg-purple-50 text-purple-700 font-semibold">
                <a href={getLoginUrl()}>Iniciar Sesión</a>
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold mb-8 shadow-lg">
              <Zap className="h-4 w-4" />
              30% más ventas sin Anuncios
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Automatiza reseñas,
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mt-2">
                referidos y visitas recurrentes
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
              Tu compañero impulsado por IA para hacer crecer tu negocio local sin esfuerzo. Perfecto para barberías, salones, spas y restaurantes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {user ? (
                <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-purple-500/50 transition-all text-lg px-10 py-7 rounded-xl font-bold">
                  <a href="/dashboard">
                    Ir al Dashboard <ArrowRight className="ml-2 h-6 w-6" />
                  </a>
                </Button>
              ) : (
                <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-purple-500/50 transition-all text-lg px-10 py-7 rounded-xl font-bold">
                  <a href={getLoginUrl()}>
                    Comenzar Gratis <ArrowRight className="ml-2 h-6 w-6" />
                  </a>
                </Button>
              )}
              <Button asChild size="lg" variant="outline" className="border-3 border-purple-400 hover:bg-purple-100 text-purple-700 text-lg px-10 py-7 rounded-xl font-bold shadow-lg">
                <a href="#features">Ver Funcionalidades</a>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-base text-gray-700 font-medium">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white font-bold" />
                </div>
                <span>14 días gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white font-bold" />
                </div>
                <span>Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-white font-bold" />
                </div>
                <span>Configuración en 10 minutos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Todo lo que necesitas para crecer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Herramientas profesionales diseñadas específicamente para negocios locales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <Card className="border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-2xl transition-all bg-gradient-to-br from-yellow-50 to-orange-50 group">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Motor de Reputación</CardTitle>
                <CardDescription className="text-base text-gray-700 leading-relaxed">
                  Solicita reseñas automáticamente después de cada visita y responde con plantillas inteligentes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-blue-200 hover:border-blue-400 hover:shadow-2xl transition-all bg-gradient-to-br from-blue-50 to-cyan-50 group">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Sistema de Referidos</CardTitle>
                <CardDescription className="text-base text-gray-700 leading-relaxed">
                  Genera códigos QR y enlaces únicos. Rastrea canjes y recompensa a tus mejores promotores
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-green-200 hover:border-green-400 hover:shadow-2xl transition-all bg-gradient-to-br from-green-50 to-emerald-50 group">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Campañas de Reactivación</CardTitle>
                <CardDescription className="text-base text-gray-700 leading-relaxed">
                  Recupera clientes inactivos con mensajes personalizados por WhatsApp, SMS o email
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-purple-200 hover:border-purple-400 hover:shadow-2xl transition-all bg-gradient-to-br from-purple-50 to-pink-50 group">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Smart Filler</CardTitle>
                <CardDescription className="text-base text-gray-700 leading-relaxed">
                  Detecta horarios lentos y programa promociones automáticas para llenar tu agenda
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-pink-200 hover:border-pink-400 hover:shadow-2xl transition-all bg-gradient-to-br from-pink-50 to-rose-50 group">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Dashboard Completo</CardTitle>
                <CardDescription className="text-base text-gray-700 leading-relaxed">
                  Visualiza métricas clave: visitas, tasa de repetición, reseñas y ticket promedio
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-orange-200 hover:border-orange-400 hover:shadow-2xl transition-all bg-gradient-to-br from-orange-50 to-amber-50 group">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Automatizaciones</CardTitle>
                <CardDescription className="text-base text-gray-700 leading-relaxed">
                  Flujos automáticos para solicitudes de reseñas, verificación de satisfacción y más
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                Resultados Comprobados
              </h2>
              <p className="text-xl text-white/90">
                Métricas promedio de nuestros clientes en los primeros 90 días
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-10 border-2 border-white/20 hover:bg-white/20 transition-all">
                <div className="text-7xl font-black text-white mb-3">+40%</div>
                <div className="text-2xl text-white font-bold mb-2">Clientes Recurrentes</div>
                <div className="text-lg text-white/80">Incremento promedio</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-10 border-2 border-white/20 hover:bg-white/20 transition-all">
                <div className="text-7xl font-black text-white mb-3">5x</div>
                <div className="text-2xl text-white font-bold mb-2">Más Reseñas</div>
                <div className="text-lg text-white/80">Positivas en Google</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-10 border-2 border-white/20 hover:bg-white/20 transition-all">
                <div className="text-7xl font-black text-white mb-3">30%</div>
                <div className="text-2xl text-white font-bold mb-2">Menos Horarios Vacíos</div>
                <div className="text-lg text-white/80">Optimización de agenda</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center group">
                <div className="h-24 w-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                  <Clock className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Ahorra Tiempo</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Automatiza tareas repetitivas y enfócate en lo que importa: tus clientes
                </p>
              </div>
              
              <div className="text-center group">
                <div className="h-24 w-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Crece Orgánicamente</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Sin gastar en publicidad. Aprovecha el poder del boca a boca digital
                </p>
              </div>
              
              <div className="text-center group">
                <div className="h-24 w-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Protege tu Reputación</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Detecta y resuelve problemas antes de que se conviertan en reseñas negativas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="h-20 w-20 text-white mx-auto mb-6 animate-pulse" />
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              ¿Listo para Hacer Crecer Tu Negocio?
            </h2>
            <p className="text-2xl text-white/95 mb-10 leading-relaxed">
              Únete a cientos de negocios locales que ya están creciendo sin publicidad pagada
            </p>
            <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-gray-100 shadow-2xl hover:shadow-white/50 transition-all text-xl px-12 py-8 rounded-2xl font-bold">
              <a href={getLoginUrl()}>
                Comenzar Ahora Gratis <ArrowRight className="ml-3 h-7 w-7" />
              </a>
            </Button>
            <p className="text-lg text-white/90 mt-6 font-medium">
              14 días gratis • Sin tarjeta de crédito • Cancela cuando quieras
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-200 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo-prospectalo.png" alt="Prospectalo" className="h-10 w-10" />
              <div>
                <div className="font-bold text-gray-900">Prospectalo</div>
                <div className="text-sm text-gray-600">Motor de ventas</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              &copy; 2025 Prospectalo. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
