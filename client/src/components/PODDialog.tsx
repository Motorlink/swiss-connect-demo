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
import { Calendar, FileText, MapPin, User } from "lucide-react";
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
    signatureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" // Placeholder signature
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
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Unterschrift</h3>
              <div className="bg-white border-2 border-dashed border-slate-300 rounded-lg p-4 flex items-center justify-center h-40">
                <img 
                  src={podData.signatureUrl} 
                  alt="Unterschrift" 
                  className="max-h-full max-w-full object-contain opacity-80"
                />
              </div>
              <p className="text-xs text-center text-slate-400 mt-2">Digital signiert am Gerät</p>
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
