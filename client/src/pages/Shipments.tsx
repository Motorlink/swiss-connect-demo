import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { shipments } from "@/lib/mock-data";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Download, Filter, MoreHorizontal, Plus, Search } from "lucide-react";
import { Link } from "wouter";

export default function Shipments() {
  return (
    <Layout>
      <div className="p-6 lg:p-10 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Alle Aufträge</h1>
            <p className="text-slate-500">Verwalten Sie Ihre Transportaufträge und Sendungen.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Link href="/new-shipment">
              <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/20">
                <Plus className="w-4 h-4" />
                Neuer Auftrag
              </Button>
            </Link>
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <div className="flex gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Suchen..." className="pl-9 bg-white" />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[120px]">ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Von</TableHead>
                  <TableHead>Nach</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead>Preis</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.map((shipment) => (
                  <TableRow key={shipment.id} className="hover:bg-slate-50 cursor-pointer group">
                    <TableCell className="font-mono font-medium text-slate-600">
                      {shipment.id}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          shipment.status === "zugestellt" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                          shipment.status === "unterwegs" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          "bg-slate-100 text-slate-700 border-slate-200"
                        }
                      >
                        {shipment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-900">{shipment.from.city}</div>
                      <div className="text-xs text-slate-500">{shipment.from.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-slate-900">{shipment.to.city}</div>
                      <div className="text-xs text-slate-500">{shipment.to.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-slate-900">
                        {format(shipment.pickupDate, "dd.MM.yyyy", { locale: de })}
                      </div>
                      <div className="text-xs text-slate-500">
                        {format(shipment.pickupDate, "HH:mm", { locale: de })} Uhr
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      CHF {shipment.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
