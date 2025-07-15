import React from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  showAuthButtons?: boolean;
  loginUrl?: string;
  registerUrl?: string;
}

export const Header = ({ showAuthButtons = false, loginUrl, registerUrl }: HeaderProps) => {
  const handleLogin = () => {
    if (loginUrl) {
      window.location.href = loginUrl;
    }
  };

  const handleRegister = () => {
    if (registerUrl) {
      window.location.href = registerUrl;
    }
  };

  return (
    <header className="bg-brand-white shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14 md:h-16">
          <a href="/" className="flex items-center space-x-2 group">
            <span className="text-xl font-heading font-bold">
              <img 
                src="/img/logo.svg" 
                alt="Logomarca Orthomovi" 
                className="h-8 md:h-10 w-auto max-w-[120px] md:max-w-none transition-all duration-200 group-hover:scale-105"
              />
            </span>
          </a>

          {showAuthButtons && (
            <div className="flex items-center space-x-2 md:space-x-4">
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
            </div>
          )}
        </div>
      </div>
    </header>
  );
}; 