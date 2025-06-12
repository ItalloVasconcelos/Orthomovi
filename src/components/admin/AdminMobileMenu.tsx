
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, FileText, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const AdminMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      to: "/admin",
      icon: FileText,
      label: "Pedidos",
      isActive: location.pathname === "/admin"
    },
    {
      to: "/admin/users",
      icon: Users,
      label: "Usuários",
      isActive: location.pathname === "/admin/users"
    },
    {
      to: "/admin/config",
      icon: Settings,
      label: "Configurações",
      isActive: location.pathname === "/admin/config"
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-lg font-semibold">Menu Administrativo</h2>
        </div>
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  item.isActive
                    ? "bg-brand-accent/10 text-brand-accent border-l-4 border-brand-accent"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
