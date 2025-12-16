import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";
import { useLocation } from "wouter";

export default function Placeholder({ title }: { title: string }) {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="flex items-center justify-center h-full p-6">
        <Card className="max-w-md w-full border-0 shadow-xl text-center">
          <CardContent className="pt-10 pb-10 px-6 flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center">
              <Construction className="w-10 h-10 text-slate-400" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
              <p className="text-slate-500">
                Dieser Bereich ist in der Demo-Version noch nicht vollständig implementiert.
              </p>
            </div>
            <Button onClick={() => setLocation("/")} variant="outline">
              Zurück zum Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
