import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-brand-text text-white py-10 md:py-16 mt-auto shadow-inner transition-all duration-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-28">
          {/* Logo e descrição */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4 md:mb-6">
              <span className="text-lg md:text-xl font-heading font-bold">
                <img 
                  src="/img/logo.svg" 
                  alt="Logomarca Orthomovi" 
                  className="h-8 md:h-10 w-auto max-w-[120px] md:max-w-none"
                />
              </span>
            </div>
            <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
              Sistema de medição automática para órteses pediátricas usando tecnologia inovadora. 
              Precisão, conforto e resultados superiores para seus pacientes.
            </p>
            <p className="text-xs md:text-sm text-gray-400">
              © 2025 Orthomovi Órteses Pediátricas. Todos os direitos reservados.
            </p>
          </div>

          {/* Onde nos encontrar */}
          <div className="order-2 md:order-none">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Onde nos encontrar</h3>
            <ul className="space-y-2 md:space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="text-brand-primary mt-0.5 flex-shrink-0" size={14} />
                <span className="text-gray-300 text-sm md:text-base">
                  Rua João Freire de Araújo, 245, Juazeiro do Norte - CE
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="text-brand-primary flex-shrink-0" size={14} />
                <a href="tel:+5588996461881" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  (88) 9.9646-1881
                </a>
              </li>
            </ul>
          </div>

          {/* Links rápidos */}
          <div className="order-3 md:order-none">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Links Rápidos</h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link to="/cadastro" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  Cadastre-se
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  Login
                </Link>
              </li>
              <li>
                <a 
                  href="https://wa.me/5588996461881" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-white transition-colors text-sm md:text-base"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div className="order-4 md:order-none">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Suporte</h3>
            <ul className="space-y-1.5 md:space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors text-sm md:text-base">
                  Políticas de Privacidade
                </Link>
              </li>
              <li>
                <a href="mailto:suporte@orthomovi.com" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 text-sm md:text-base">
                  <Mail size={14} />
                  <span>suporte@orthomovi.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
