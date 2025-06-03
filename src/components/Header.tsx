
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/UserDropdown";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null;
  }

  return (
    <header className="bg-brand-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-xl font-heading font-bold text-brand-text">
              Orthomovi
            </span>
          </Link>

          {/* Navigation - apenas para usuários não autenticados na home */}
          {!isAuthenticated && location.pathname === "/" && (
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#como-funciona" className="text-brand-text-light hover:text-brand-primary transition-colors">
                Como Funciona
              </a>
              <a href="#beneficios" className="text-brand-text-light hover:text-brand-primary transition-colors">
                Benefícios
              </a>
              <a href="#contato" className="text-brand-text-light hover:text-brand-primary transition-colors">
                Contato
              </a>
            </nav>
          )}

          {/* Auth buttons or user dropdown */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" className="text-brand-text hover:text-brand-primary">
                    Login
                  </Button>
                </Link>
                <Link to="/cadastro">
                  <Button className="btn-primary">
                    Cadastre-se
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
