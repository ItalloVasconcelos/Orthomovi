
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
      <header className="bg-brand-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-heading font-bold">
              <img src="/img/logo.svg" alt="Logomarca Orthomovi" width="100%"/>
            </span>
            </Link>



            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                  <UserDropdown />
              ) : (
                  <div className="flex items-center space-x-3">
                    <Button
                        variant="ghost"
                        className="text-brand-text hover:text-brand-primary"
                        onClick={handleLogin}
                    >
                      Login
                    </Button>
                    <Button
                        className="btn-primary"
                        onClick={handleRegister}
                    >
                      Cadastre-se
                    </Button>
                  </div>
              )}
            </div>
          </div>
        </div>
      </header>
  );
};
