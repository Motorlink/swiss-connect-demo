import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Box,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Map as MapIcon,
  Menu,
  Plus,
  Settings,
  Truck,
  User
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: Plus, label: "Neuer Auftrag", href: "/new-shipment", variant: "accent" },
    { icon: Truck, label: "Aufträge", href: "/shipments" },
    { icon: MapIcon, label: "Live-Tracking", href: "/tracking" },
    { icon: Box, label: "Archiv", href: "/archive" },
    { icon: CreditCard, label: "Abrechnung", href: "/billing" },
    { icon: FileText, label: "Dokumente", href: "/documents" },
    { icon: HelpCircle, label: "Support", href: "/support" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 bg-slate-900 text-slate-300 transition-all duration-300 ease-in-out flex flex-col shadow-xl",
          collapsed ? "w-20" : "w-64",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center px-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded bg-emerald-500 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            {!collapsed && (
              <span className="font-bold text-white text-lg tracking-tight whitespace-nowrap">
                SWISS<span className="text-emerald-500">CONNECT</span>
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 group relative",
                      isActive 
                        ? "bg-emerald-500/10 text-emerald-400" 
                        : "hover:bg-slate-800 hover:text-white",
                      item.variant === "accent" && !isActive && "bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white mt-4 mb-4 shadow-lg shadow-emerald-900/20"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-emerald-400", item.variant === "accent" && "text-white")} />
                    {!collapsed && (
                      <span className={cn("font-medium", isActive && "font-semibold")}>
                        {item.label}
                      </span>
                    )}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </a>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* User Profile / Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center shrink-0 border border-slate-600">
              <User className="w-5 h-5 text-slate-300" />
            </div>
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">Max Muster</p>
                <p className="text-xs text-slate-500 truncate">Verlader Admin</p>
              </div>
            )}
            {!collapsed && (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800">
                <Settings className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 bg-slate-800 text-slate-400 hover:text-white p-1 rounded-full border border-slate-700 shadow-md hidden lg:flex"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:hidden shrink-0">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
              <Menu className="w-6 h-6 text-slate-700" />
            </Button>
            <span className="font-bold text-slate-900 text-lg">
              SWISS<span className="text-emerald-600">CONNECT</span>
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <User className="w-5 h-5 text-slate-600" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50/50 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
