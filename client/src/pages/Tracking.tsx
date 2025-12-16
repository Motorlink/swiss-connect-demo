import Layout from "@/components/Layout";
import { MapView } from "@/components/Map";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { shipments } from "@/lib/mock-data";
import { Search, Truck } from "lucide-react";
import { useState } from "react";

export default function Tracking() {
  const [searchQuery, setSearchQuery] = useState("");
  const activeShipments = shipments.filter(s => ["unterwegs", "zugewiesen"].includes(s.status));

  return (
    <Layout>
      <div className="flex h-full relative">
        {/* Map Overlay Panel */}
        <div className="absolute left-4 top-4 bottom-4 w-80 bg-white rounded-xl shadow-2xl z-10 flex flex-col border border-slate-200 overflow-hidden">
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
            onMapReady={(map: google.maps.Map) => {
              map.setCenter({ lat: 46.8182, lng: 8.2275 });
              map.setZoom(8);

              activeShipments.forEach(s => {
                // Truck Marker
                new google.maps.Marker({
                  position: { 
                    lat: s.from.lat + (s.to.lat - s.from.lat) * 0.4, // Simulate position
                    lng: s.from.lng + (s.to.lng - s.from.lng) * 0.4 
                  },
                  map: map,
                  title: `LKW ${s.vehicle}`,
                  icon: {
                    path: "M17 8h3l3 4v6h-2v2h-2v-2H5v2H3v-2H1V8h2V6h14v2z", // Simple truck path
                    scale: 1.5,
                    fillColor: "#0f172a",
                    fillOpacity: 1,
                    strokeWeight: 1,
                    strokeColor: "#ffffff",
                    anchor: new google.maps.Point(10, 10)
                  }
                });

                // Route Line
                const line = new google.maps.Polyline({
                  path: [
                    { lat: s.from.lat, lng: s.from.lng },
                    { lat: s.to.lat, lng: s.to.lng }
                  ],
                  geodesic: true,
                  strokeColor: "#10b981",
                  strokeOpacity: 0.6,
                  strokeWeight: 4,
                  map: map
                });
              });
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
