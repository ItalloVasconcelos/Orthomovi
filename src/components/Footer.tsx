
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-brand-text text-white py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-28">
          {/* Logo e descrição */}
          <div className="col-span-1 md:col-span-1 ">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-xl font-heading font-bold">
              <img src="src/assets/img/logo.svg" alt="Logomarca Orthomovi" width="100%"/>
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Sistema de medição automática para órteses pediátricas usando tecnologia inovadora. 
              Precisão, conforto e resultados superiores para seus pacientes.
            </p>
            <p className="text-sm text-gray-400">
              © 2025 Orthomovi Órteses Pediátricas. Todos os direitos reservados.
            </p>
          </div>

          {/* Onde nos encontrar */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Onde nos encontrar</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="text-brand-primary mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-300">
                  Rua João Freire de Araújo, 245, Juazeiro do Norte - CE
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="text-brand-primary flex-shrink-0" size={16} />
                <a href="tel:+5588996461881" className="text-gray-300 hover:text-white transition-colors">
                  (88) 9.9646-1881
                </a>
              </li>
            </ul>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cadastro" className="text-gray-300 hover:text-white transition-colors">
                  Cadastre-se
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <a 
                  href="https://wa.me/5588996461881" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Mensagem no WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Políticas de Privacidade
                </Link>
              </li>
              <li>
                <a href="mailto:suporte@orthomovi.com" className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2">
                  <Mail size={16} />
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
