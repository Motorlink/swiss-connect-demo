import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { CalendarIcon, CheckCircle2, MapPin, Package, Truck } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function NewShipment() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const [date, setDate] = useState<Date>();

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 lg:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Neuer Auftrag</h1>
          <p className="text-slate-500 mt-2">Erstellen Sie einen neuen Transportauftrag in 3 einfachen Schritten.</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-10" />
          
          {[1, 2, 3].map((s) => (
            <div key={s} className={cn("flex flex-col items-center gap-2 bg-slate-50 px-4")}>
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300",
                step >= s ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "bg-slate-200 text-slate-500"
              )}>
                {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
              </div>
              <span className={cn("text-sm font-medium", step >= s ? "text-slate-900" : "text-slate-400")}>
                {s === 1 ? "Route & Zeit" : s === 2 ? "Frachtdetails" : "Zusammenfassung"}
              </span>
            </div>
          ))}
        </div>

        <Card className="border-0 shadow-xl bg-white overflow-hidden">
          {step === 1 && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-500" />
                  Route & Zeitplan
                </CardTitle>
                <CardDescription>Wo soll die Fracht abgeholt und wohin geliefert werden?</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Abholung */}
                  <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      Abholung
                    </h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label>Firma / Name</Label>
                        <Input placeholder="z.B. Muster AG" />
                      </div>
                      <div className="space-y-1">
                        <Label>Strasse & Nr.</Label>
                        <Input placeholder="Industriestrasse 1" />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label>PLZ</Label>
                          <Input placeholder="8000" />
                        </div>
                        <div className="col-span-2 space-y-1">
                          <Label>Ort</Label>
                          <Input placeholder="Zürich" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label>Datum</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP", { locale: de }) : <span>Datum wählen</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>

                  {/* Lieferung */}
                  <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-900" />
                      Lieferung
                    </h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label>Firma / Name</Label>
                        <Input placeholder="z.B. Empfänger GmbH" />
                      </div>
                      <div className="space-y-1">
                        <Label>Strasse & Nr.</Label>
                        <Input placeholder="Hauptstrasse 50" />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label>PLZ</Label>
                          <Input placeholder="3000" />
                        </div>
                        <div className="col-span-2 space-y-1">
                          <Label>Ort</Label>
                          <Input placeholder="Bern" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label>Gewünschtes Lieferdatum</Label>
                        <Input type="date" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-emerald-500" />
                  Frachtdetails
                </CardTitle>
                <CardDescription>Was transportieren wir für Sie?</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Art der Sendung</Label>
                    <RadioGroup defaultValue="standard" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <RadioGroupItem value="standard" id="standard" className="peer sr-only" />
                        <Label
                          htmlFor="standard"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-emerald-500 [&:has([data-state=checked])]:border-emerald-500 cursor-pointer transition-all"
                        >
                          <Truck className="mb-3 h-6 w-6" />
                          Standard
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="express" id="express" className="peer sr-only" />
                        <Label
                          htmlFor="express"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-emerald-500 [&:has([data-state=checked])]:border-emerald-500 cursor-pointer transition-all"
                        >
                          <div className="mb-3 h-6 w-6 flex items-center justify-center font-bold text-amber-500">⚡</div>
                          Express
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="cooled" id="cooled" className="peer sr-only" />
                        <Label
                          htmlFor="cooled"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-emerald-500 [&:has([data-state=checked])]:border-emerald-500 cursor-pointer transition-all"
                        >
                          <div className="mb-3 h-6 w-6 flex items-center justify-center font-bold text-blue-500">❄️</div>
                          Gekühlt
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Anzahl Paletten</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                    <div className="space-y-2">
                      <Label>Gesamtgewicht (kg)</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Warenbeschreibung</Label>
                    <Textarea placeholder="Was wird transportiert? Besondere Hinweise?" />
                  </div>
                </div>
              </CardContent>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-6">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Zusammenfassung
                </CardTitle>
                <CardDescription>Bitte überprüfen Sie Ihre Angaben.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Distanz (geschätzt)</span>
                    <span className="font-medium">124 km</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Fahrzeit (geschätzt)</span>
                    <span className="font-medium">1h 45min</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-900">Geschätzter Preis</span>
                    <span className="text-2xl font-bold text-emerald-600">CHF 285.00</span>
                  </div>
                </div>
                
                <div className="text-sm text-slate-500 text-center">
                  Mit dem Absenden akzeptieren Sie unsere AGBs und Transportbedingungen.
                </div>
              </CardContent>
            </div>
          )}

          <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep} 
              disabled={step === 1}
              className="w-32"
            >
              Zurück
            </Button>
            
            {step < 3 ? (
              <Button 
                onClick={nextStep} 
                className="w-32 bg-slate-900 hover:bg-slate-800 text-white"
              >
                Weiter
              </Button>
            ) : (
              <Button 
                onClick={() => setLocation("/")} 
                className="w-40 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20"
              >
                Auftrag erteilen
              </Button>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
