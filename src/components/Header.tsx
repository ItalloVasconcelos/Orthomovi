import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/UserDropdown";
import { useAuth } from "@/contexts/AuthContext";
import keycloak from "@/services/keycloak";

export const Header = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const handleLogin = () => {
    keycloak.login();
  };

  const handleRegister = () => {
    keycloak.register();
  };

  return (
    <header className="bg-brand-white shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14 md:h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-xl font-heading font-bold">
              <img 
                src="/img/logo.svg" 
                alt="Logomarca Orthomovi" 
                className="h-8 md:h-10 w-auto max-w-[120px] md:max-w-none transition-all duration-200 group-hover:scale-105"
              />
            </span>
          </Link>

          <div className="flex items-center space-x-2 md:space-x-4">
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <div className="flex items-center space-x-2 md:space-x-3">
                <Button
                  variant="ghost"
                  className="text-brand-text hover:text-brand-primary text-sm md:text-base px-2 md:px-4"
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Button
                  className="btn-primary text-sm md:text-base px-3 md:px-4 py-1 md:py-2"
                  onClick={handleRegister}
                >
                  <span className="hidden sm:inline">Cadastre-se</span>
                  <span className="sm:hidden">Cadastro</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
