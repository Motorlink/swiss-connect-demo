import Layout from "@/components/Layout";
import { MapView } from "@/components/Map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shipment, shipments } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import L from "leaflet";
import { ArrowRight, Box, Search } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredShipments = shipments.filter(s => 
    s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.from.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.to.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeShipments = filteredShipments.filter(s => ["offen", "zugewiesen", "unterwegs"].includes(s.status));
  const completedShipments = filteredShipments.filter(s => ["zugestellt", "abgeholt"].includes(s.status));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "offen": return "bg-blue-100 text-blue-700 border-blue-200";
      case "zugewiesen": return "bg-purple-100 text-purple-700 border-purple-200";
      case "unterwegs": return "bg-amber-100 text-amber-700 border-amber-200";
      case "zugestellt": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "abgeholt": return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "storniert": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  // Prepare markers for Leaflet
  const markers = shipments.map(s => ({
    position: [s.from.lat, s.from.lng] as [number, number],
    title: s.from.name,
    content: (
      <div>
        <div className="font-bold">{s.id}</div>
        <div>{s.from.city} → {s.to.city}</div>
        <div className="text-xs text-slate-500 mt-1">{s.status}</div>
      </div>
    ),
    icon: L.divIcon({
      className: "bg-transparent",
      html: `<div class="w-4 h-4 rounded-full border-2 border-white shadow-md cursor-pointer transition-transform hover:scale-125 ${
        s.status === 'unterwegs' ? 'bg-amber-500' : 
        s.status === 'zugestellt' ? 'bg-emerald-500' : 
        s.status === 'offen' ? 'bg-blue-500' : 'bg-slate-500'
      }"></div>`
    }),
    onClick: () => setSelectedShipment(s)
  }));

  return (
    <Layout>
      <div className="flex flex-col h-full lg:flex-row overflow-hidden">
        {/* Left Panel: List & Details (40% width on desktop) */}
        <div className="w-full lg:w-[450px] xl:w-[500px] bg-white border-r border-slate-200 flex flex-col shadow-xl z-10 h-full">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 bg-white">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h1>
            <p className="text-slate-500 text-sm mb-4">Willkommen zurück, Max.</p>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Sendung suchen (ID, Ort)..." 
                className="pl-9 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Tabs & List */}
          <Tabs defaultValue="active" className="flex-1 flex flex-col min-h-0">
            <div className="px-6 pt-2">
              <TabsList className="w-full grid grid-cols-2 bg-slate-100 p-1">
                <TabsTrigger value="active" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Aktiv ({activeShipments.length})</TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Erledigt ({completedShipments.length})</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="active" className="flex-1 min-h-0 mt-2">
              <ScrollArea className="h-full">
                <div className="px-6 pb-6 space-y-3">
                  {activeShipments.map((shipment) => (
                    <ShipmentCard 
                      key={shipment.id} 
                      shipment={shipment} 
                      isSelected={selectedShipment?.id === shipment.id}
                      onClick={() => setSelectedShipment(shipment)}
                      statusColor={getStatusColor(shipment.status)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="completed" className="flex-1 min-h-0 mt-2">
              <ScrollArea className="h-full">
                <div className="px-6 pb-6 space-y-3">
                  {completedShipments.map((shipment) => (
                    <ShipmentCard 
                      key={shipment.id} 
                      shipment={shipment} 
                      isSelected={selectedShipment?.id === shipment.id}
                      onClick={() => setSelectedShipment(shipment)}
                      statusColor={getStatusColor(shipment.status)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          {/* Selected Shipment Details (Bottom Panel) */}
          {selectedShipment && (
            <div className="border-t border-slate-200 bg-slate-50 p-6 animate-in slide-in-from-bottom-10 duration-300">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-900">{selectedShipment.id}</h3>
                  <p className="text-sm text-slate-500">{selectedShipment.details.type}</p>
                </div>
                <Badge variant="outline" className={getStatusColor(selectedShipment.status)}>
                  {selectedShipment.status.toUpperCase()}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Abholung</p>
                  <p className="text-sm font-semibold text-slate-900">{format(selectedShipment.pickupDate, "dd. MMM HH:mm", { locale: de })}</p>
                  <p className="text-xs text-slate-600 truncate">{selectedShipment.from.city}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Lieferung</p>
                  <p className="text-sm font-semibold text-slate-900">{format(selectedShipment.deliveryDate, "dd. MMM HH:mm", { locale: de })}</p>
                  <p className="text-xs text-slate-600 truncate">{selectedShipment.to.city}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {selectedShipment.status === "offen" ? (
                  <Button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold h-12 text-lg shadow-md hover:shadow-lg transition-all"
                    onClick={() => {
                      // Simulate accepting order
                      const updatedShipments = shipments.map(s => 
                        s.id === selectedShipment.id ? { ...s, status: "zugewiesen" } : s
                      );
                      // In a real app, this would be an API call
                      // For demo, we just show a success message (toast would be better)
                      alert(`Auftrag ${selectedShipment.id} erfolgreich angenommen!`);
                      window.location.reload(); // Simple reload to reset state for demo
                    }}
                  >
                    Auftrag annehmen für CHF {selectedShipment.price.toFixed(2)}
                  </Button>
                ) : (
                  <div className="p-3 bg-slate-100 rounded-lg text-center text-slate-600 font-medium border border-slate-200">
                    Status: {selectedShipment.status.toUpperCase()}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 border-slate-300">Details ansehen</Button>
                  <Button variant="outline" className="flex-1 border-slate-300">Dokumente</Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel: Map (60% width on desktop) */}
        <div className="flex-1 relative bg-slate-100 h-[50vh] lg:h-full">
          <MapView 
            className="w-full h-full"
            markers={markers}
            onMapReady={(map) => {
              if (selectedShipment) {
                map.flyTo([selectedShipment.from.lat, selectedShipment.from.lng], 10);
              }
            }}
          />
          
          {/* Map Overlay Stats */}
          <div className="absolute top-6 right-6 flex gap-3 z-[400]">
            <Card className="bg-white/90 backdrop-blur shadow-lg border-0 w-32">
              <CardContent className="p-3 text-center">
                <p className="text-xs text-slate-500 font-medium uppercase">Unterwegs</p>
                <p className="text-2xl font-bold text-emerald-600">{activeShipments.length}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur shadow-lg border-0 w-32">
              <CardContent className="p-3 text-center">
                <p className="text-xs text-slate-500 font-medium uppercase">Pünktlich</p>
                <p className="text-2xl font-bold text-slate-900">98%</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function ShipmentCard({ shipment, isSelected, onClick, statusColor }: { shipment: Shipment, isSelected: boolean, onClick: () => void, statusColor: string }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md group relative overflow-hidden",
        isSelected 
          ? "bg-slate-50 border-emerald-500 ring-1 ring-emerald-500 shadow-sm" 
          : "bg-white border-slate-200 hover:border-emerald-300"
      )}
    >
      {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />}
      
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
            {shipment.id}
          </span>
          {shipment.details.type.includes("Express") && (
            <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-0 text-[10px] h-5 px-1.5">
              Express
            </Badge>
          )}
        </div>
        <Badge variant="outline" className={cn("text-[10px] h-5 px-2 font-medium border", statusColor)}>
          {shipment.status}
        </Badge>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">{shipment.from.city}</p>
          <p className="text-xs text-slate-500 truncate">{format(shipment.pickupDate, "HH:mm", { locale: de })} Uhr</p>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
        <div className="flex-1 min-w-0 text-right">
          <p className="text-sm font-semibold text-slate-900 truncate">{shipment.to.city}</p>
          <p className="text-xs text-slate-500 truncate">{format(shipment.deliveryDate, "HH:mm", { locale: de })} Uhr</p>
        </div>
      </div>

      <Separator className="my-3 bg-slate-100" />

      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Box className="w-3.5 h-3.5" />
          <span>{shipment.details.goods}</span>
        </div>
        <div className="font-medium text-slate-900">
          CHF {shipment.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
