import Layout from "@/components/Layout";
import { MapView } from "@/components/Map";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { shipments } from "@/lib/mock-data";
import L from "leaflet";
import { Search, Truck } from "lucide-react";
import { useState } from "react";

export default function Tracking() {
  const [searchQuery, setSearchQuery] = useState("");
  const activeShipments = shipments.filter(s => ["unterwegs", "zugewiesen"].includes(s.status));

  // Prepare markers for Leaflet
  const markers = activeShipments.map(s => ({
    position: [
      s.from.lat + (s.to.lat - s.from.lat) * 0.4, // Simulate position
      s.from.lng + (s.to.lng - s.from.lng) * 0.4 
    ] as [number, number],
    title: `LKW ${s.vehicle}`,
    content: (
      <div>
        <div className="font-bold">{s.carrier}</div>
        <div>{s.from.city} → {s.to.city}</div>
        <div className="text-xs text-slate-500 mt-1">Fahrzeug: {s.vehicle}</div>
      </div>
    ),
    icon: L.divIcon({
      className: "bg-transparent",
      html: `<div class="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><path d="M14 17h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
      </div>`
    })
  }));

  return (
    <Layout>
      <div className="flex h-full relative">
        {/* Map Overlay Panel */}
        <div className="absolute left-4 top-4 bottom-4 w-80 bg-white rounded-xl shadow-2xl z-[400] flex flex-col border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h2 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-500" />
              Live Tracking
            </h2>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Sendung suchen..." 
                className="pl-9 h-9 text-sm bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-2">
              {activeShipments.map(shipment => (
                <div 
                  key={shipment.id}
                  className="p-3 rounded-lg border border-slate-100 hover:border-emerald-300 hover:bg-slate-50 cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-mono text-xs font-medium text-slate-500">{shipment.id}</span>
                    <Badge variant="outline" className="text-[10px] h-4 px-1.5 bg-emerald-50 text-emerald-700 border-emerald-200">
                      {shipment.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {shipment.carrier || "Wird gesucht..."}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 truncate">
                    {shipment.from.city} → {shipment.to.city}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Fullscreen Map */}
        <div className="flex-1 h-full bg-slate-100">
          <MapView 
            className="w-full h-full"
            markers={markers}
            onMapReady={(map) => {
              map.setView([46.8182, 8.2275], 8);
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
