import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import L from "leaflet";
import { Calendar, FileText, MapPin, User, ShieldCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import { Shipment } from "../lib/mock-data";

interface PODDialogProps {
  shipment: Shipment;
}

export function PODDialog({ shipment }: PODDialogProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Mock POD data - in a real app this would come from the backend
  const podData = {
    signedBy: "Hans Müller (Lagerleiter)",
    signedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
    location: {
      lat: shipment.to.lat,
      lng: shipment.to.lng,
      address: shipment.to.address
    },
    device: "Zebra TC57 (Device ID: 883920)",
    signatureName: "Hans Müller" // Name for signature font
  };

  useEffect(() => {
    // Initialize map when dialog opens
    // We need a small timeout to ensure the dialog content is rendered
    const timer = setTimeout(() => {
      if (mapRef.current && !mapInstanceRef.current) {
        const map = L.map(mapRef.current).setView([podData.location.lat, podData.location.lng], 15);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([podData.location.lat, podData.location.lng])
          .addTo(map)
          .bindPopup("Unterschrift Standort")
          .openPopup();

        mapInstanceRef.current = map;
      } else if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1 border-slate-300">
          <FileText className="w-4 h-4 mr-2" />
          POD ansehen
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-600" />
            Proof of Delivery (POD)
          </DialogTitle>
          <DialogDescription>
            Digitaler Abliefernachweis für Sendung {shipment.id}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Left Column: Signature & Details */}
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                <ShieldCheck className="w-3 h-3" />
                VERIFIED
              </div>
              <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Digitale Unterschrift</h3>
              <div className="bg-white border border-slate-200 rounded-lg p-6 flex items-center justify-center h-40 shadow-inner relative">
                <div className="absolute bottom-4 left-4 right-4 border-b-2 border-slate-100"></div>
                <span className="text-5xl text-slate-800 -rotate-2" style={{ fontFamily: "'Caveat', cursive" }}>
                  {podData.signatureName}
                </span>
              </div>
              <p className="text-xs text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Biometrisch erfasst & verifiziert
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Empfänger</p>
                  <p className="text-sm text-slate-600">{podData.signedBy}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Zeitstempel</p>
                  <p className="text-sm text-slate-600">
                    {format(podData.signedAt, "dd. MMMM yyyy, HH:mm:ss", { locale: de })} Uhr
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Ort der Übergabe</p>
                  <p className="text-sm text-slate-600">{podData.location.address}</p>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    GPS: {podData.location.lat.toFixed(6)}, {podData.location.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Map & Device Info */}
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 h-full flex flex-col">
              <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">GPS-Standort</h3>
              <div 
                ref={mapRef} 
                className="flex-1 min-h-[250px] bg-slate-200 rounded-lg border border-slate-300 z-0"
              />
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500">
                  <span className="font-semibold">Gerät:</span> {podData.device}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  <span className="font-semibold">Verifizierung:</span> ✅ GPS-Match (Genauigkeit: 3m)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
          <Button variant="outline" onClick={() => window.print()}>
            PDF herunterladen
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            POD bestätigen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
