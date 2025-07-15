import React from "react";

export const KeycloakFooter: React.FC = () => {
  return (
    <footer className="bg-brand-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-brand-primary mb-4">Orthomovi</h3>
            <p className="text-brand-text-light mb-4">
              Especialistas em órteses pediátricas, oferecendo soluções personalizadas 
              para o desenvolvimento saudável das crianças.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-text-light hover:text-brand-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-brand-text-light hover:text-brand-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-brand-text mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-brand-text-light hover:text-brand-primary transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="/sobre" className="text-brand-text-light hover:text-brand-primary transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="/servicos" className="text-brand-text-light hover:text-brand-primary transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="/contato" className="text-brand-text-light hover:text-brand-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h4 className="text-lg font-semibold text-brand-text mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li>
                <a href="/orteses-pediatricas" className="text-brand-text-light hover:text-brand-primary transition-colors">
                  Órteses Pediátricas
                </a>
              </li>
              <li>
                <a href="/avaliacao" className="text-brand-text-light hover:text-brand-primary transition-colors">
                  Avaliação
                </a>
              </li>
              <li>
                <a href="/acompanhamento" className="text-brand-text-light hover:text-brand-primary transition-colors">
                  Acompanhamento
                </a>
              </li>
              <li>
                <a href="/consultoria" className="text-brand-text-light hover:text-brand-primary transition-colors">
                  Consultoria
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-brand-text-light">
              © 2025 Orthomovi Órteses Pediátricas. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/termos" className="text-sm text-brand-text-light hover:text-brand-primary transition-colors">
                Termos de Uso
              </a>
              <a href="/privacidade" className="text-sm text-brand-text-light hover:text-brand-primary transition-colors">
                Política de Privacidade
              </a>
              <a href="/contato" className="text-sm text-brand-text-light hover:text-brand-primary transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 