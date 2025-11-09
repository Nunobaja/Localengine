import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Store, Clock, Globe, Check } from "lucide-react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const BUSINESS_TYPES = [
  { value: "barbershop", label: "Barbería" },
  { value: "salon", label: "Salón de Belleza" },
  { value: "spa", label: "Spa" },
  { value: "restaurant", label: "Restaurante" },
  { value: "gym", label: "Gimnasio" },
  { value: "other", label: "Otro" },
];

const TIMEZONES = [
  { value: "America/Mexico_City", label: "Ciudad de México (GMT-6)" },
  { value: "America/Monterrey", label: "Monterrey (GMT-6)" },
  { value: "America/Cancun", label: "Cancún (GMT-5)" },
  { value: "America/Tijuana", label: "Tijuana (GMT-8)" },
  { value: "America/Bogota", label: "Bogotá (GMT-5)" },
  { value: "America/Lima", label: "Lima (GMT-5)" },
  { value: "America/Argentina/Buenos_Aires", label: "Buenos Aires (GMT-3)" },
  { value: "America/Santiago", label: "Santiago (GMT-3)" },
];

const DAYS_OF_WEEK = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
  { value: 0, label: "Domingo" },
];

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    businessType: "" as "barbershop" | "salon" | "spa" | "restaurant" | "gym" | "other" | "",
    timezone: "America/Mexico_City",
    workingDays: [1, 2, 3, 4, 5, 6] as number[], // 0 = Sunday, 6 = Saturday
    openTime: "09:00",
    closeTime: "18:00",
  });

  const createBusiness = trpc.businesses.create.useMutation({
    onSuccess: (data) => {
      // Create default business hours
      const hoursMutations = formData.workingDays.map((dayNum) =>
        createBusinessHours.mutate({
          businessId: data.id,
          dayOfWeek: dayNum,
          openTime: formData.openTime,
          closeTime: formData.closeTime,
          isClosed: false,
        })
      );

      Promise.all(hoursMutations).then(() => {
        toast.success("¡Negocio creado exitosamente!");
        setLocation("/dashboard");
      });
    },
    onError: (error) => {
      toast.error("Error al crear negocio: " + error.message);
    },
  });

  const createBusinessHours = trpc.businessHours.create.useMutation();

  const handleNext = () => {
    if (step === 1 && !formData.name) {
      toast.error("Por favor ingresa el nombre de tu negocio");
      return;
    }
    if (step === 2 && !formData.businessType) {
      toast.error("Por favor selecciona el tipo de negocio");
      return;
    }
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    createBusiness.mutate({
      name: formData.name,
      businessType: formData.businessType as "barbershop" | "salon" | "spa" | "restaurant" | "gym" | "other",
      timezone: formData.timezone,
    });
  };

  const toggleDay = (dayNum: number) => {
    setFormData({
      ...formData,
      workingDays: formData.workingDays.includes(dayNum)
        ? formData.workingDays.filter((d) => d !== dayNum)
        : [...formData.workingDays, dayNum],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-2 border-purple-200">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-9 w-9 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ¡Bienvenido a Prospectalo!
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Configuremos tu negocio en solo 4 pasos
          </CardDescription>
          
          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 w-16 rounded-full transition-all ${
                  s === step
                    ? "bg-gradient-to-r from-purple-600 to-pink-600"
                    : s < step
                    ? "bg-green-500"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Business Name */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Store className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Información Básica</h3>
                  <p className="text-sm text-gray-600">¿Cómo se llama tu negocio?</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold">Nombre del Negocio *</Label>
                <Input
                  id="name"
                  placeholder="Ej: Barbería El Elegante"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-lg h-12"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Step 2: Business Type */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Store className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Tipo de Negocio</h3>
                  <p className="text-sm text-gray-600">Selecciona tu industria</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type" className="text-base font-semibold">Tipo *</Label>
                <Select value={formData.businessType} onValueChange={(value) => setFormData({ ...formData, businessType: value as any })}>
                  <SelectTrigger className="text-lg h-12">
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUSINESS_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="text-base">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 3: Timezone & Language */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Zona Horaria</h3>
                  <p className="text-sm text-gray-600">Configura tu ubicación</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-base font-semibold">Zona Horaria *</Label>
                  <Select value={formData.timezone} onValueChange={(value) => setFormData({ ...formData, timezone: value })}>
                    <SelectTrigger className="text-base h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIMEZONES.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value} className="text-base">
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-600 mt-1">
                    Esto ayudará a programar mensajes y campañas en el horario correcto
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Working Hours */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Horario de Atención</h3>
                  <p className="text-sm text-gray-600">¿Cuándo estás abierto?</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Días de Trabajo *</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {DAYS_OF_WEEK.map((day) => (
                      <Button
                        key={day.value}
                        type="button"
                        variant={formData.workingDays.includes(day.value) ? "default" : "outline"}
                        className={`justify-start ${
                          formData.workingDays.includes(day.value)
                            ? "bg-gradient-to-r from-purple-600 to-pink-600"
                            : ""
                        }`}
                        onClick={() => toggleDay(day.value)}
                      >
                        {formData.workingDays.includes(day.value) && (
                          <Check className="h-4 w-4 mr-2" />
                        )}
                        {day.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="openTime" className="text-base font-semibold">Hora de Apertura *</Label>
                    <Input
                      id="openTime"
                      type="time"
                      value={formData.openTime}
                      onChange={(e) => setFormData({ ...formData, openTime: e.target.value })}
                      className="text-base h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closeTime" className="text-base font-semibold">Hora de Cierre *</Label>
                    <Input
                      id="closeTime"
                      type="time"
                      value={formData.closeTime}
                      onChange={(e) => setFormData({ ...formData, closeTime: e.target.value })}
                      className="text-base h-12"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="px-8"
            >
              Atrás
            </Button>
            <Button
              onClick={handleNext}
              disabled={createBusiness.isPending}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8"
            >
              {step === 4 ? (
                createBusiness.isPending ? "Creando..." : "Finalizar"
              ) : (
                "Siguiente"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
