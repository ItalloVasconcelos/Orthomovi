
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PhotoWizard } from "@/components/PhotoWizard";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-ortho-blue/20">
      <header className="py-6 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-ortho-orange">Orthomovi</h1>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/cadastro">
                <Button className="bg-ortho-orange hover:bg-ortho-orange-dark">Cadastre-se</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-start px-4 py-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Órteses Pediátricas Personalizadas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Sistema de medição automática para órteses pediátricas usando tecnologia inovadora.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link to="/produto">
              <Button className="w-full sm:w-auto bg-ortho-orange hover:bg-ortho-orange-dark">
                Conheça o produto
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/cadastro">
              <Button variant="outline" className="w-full sm:w-auto">
                Criar conta
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="w-full max-w-md">
          <PhotoWizard />
        </div>
      </main>
      
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
    </div>
  );
};

export default Index;
