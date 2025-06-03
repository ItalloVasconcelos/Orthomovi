
import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="py-6 bg-white border-t">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500">
        <p>© 2025 Orthomovi Órteses Pediátricas. Todos os direitos reservados.</p>
        <div className="flex justify-center mt-2 space-x-4">
          <Link to="/terms" className="hover:text-ortho-orange">Termos de Uso</Link>
          <Link to="/privacy" className="hover:text-ortho-orange">Política de Privacidade</Link>
          <Link to="/contact" className="hover:text-ortho-orange">Contato</Link>
        </div>
      </div>
    </footer>
  );
};
