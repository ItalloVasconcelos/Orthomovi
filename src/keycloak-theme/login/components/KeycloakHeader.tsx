import React from "react";

export const KeycloakHeader: React.FC = () => {
  return (
    <header className="bg-brand-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="/" className="text-2xl font-bold text-brand-primary hover:text-brand-primary/80 transition-colors">
              Orthomovi
            </a>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-brand-text-light hover:text-brand-primary transition-colors">
              Início
            </a>
            <a href="/sobre" className="text-brand-text-light hover:text-brand-primary transition-colors">
              Sobre
            </a>
            <a href="/servicos" className="text-brand-text-light hover:text-brand-primary transition-colors">
              Serviços
            </a>
            <a href="/contato" className="text-brand-text-light hover:text-brand-primary transition-colors">
              Contato
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <a 
              href="/login" 
              className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary/90 transition-colors font-medium"
            >
              Entrar
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}; 