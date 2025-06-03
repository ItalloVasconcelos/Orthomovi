
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Settings, Home, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { AccountSettingsModal } from "./AccountSettingsModal";
import { useAuth } from "@/contexts/AuthContext";

export const UserDropdown = () => {
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showAccountModal, setShowAccountModal] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Sessão encerrada",
      description: "Você foi desconectado com sucesso.",
    });
    navigate('/');
  };

  const handleNovoPedido = () => {
    navigate('/home');
  };

  if (!user) return null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-ortho-orange flex items-center justify-center text-white">
              <User className="w-5 h-5" />
            </div>
            <span className="hidden sm:block">{user.name}</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white border shadow-lg z-50" align="end">
          <DropdownMenuItem onClick={handleNovoPedido} className="cursor-pointer">
            <Home className="mr-2 h-4 w-4" />
            <span>Novo Pedido</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowAccountModal(true)} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configurações da Conta</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AccountSettingsModal 
        open={showAccountModal} 
        onOpenChange={setShowAccountModal} 
      />
    </>
  );
};
