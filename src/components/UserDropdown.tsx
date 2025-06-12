// src/components/UserDropdown.tsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import keycloak from '@/services/keycloak'; // Importe a instância do keycloak

export const UserDropdown = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    if (isAdmin) {
      // Se for admin, leva para o painel de admin do app
      navigate('/admin');
    } else {
      // Se for usuário comum, abre a página de conta do Keycloak em uma nova aba
      // A função createAccountUrl() gera a URL correta para a página de perfil do usuário.
      window.open(keycloak.createAccountUrl(), '_blank');
    }
  };

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2">
            <User size={20} />
            <span className="hidden md:block">{user.fullname || 'Usuário'}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center justify-start gap-2 p-2">
            {/* ... info do usuário ... */}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSettingsClick}>
            <Settings className="mr-2 h-4 w-4" />
            {/* O texto muda dependendo da role */}
            <span>{isAdmin ? 'Painel Administrativo' : 'Minha Conta'}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  );
};