
import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { PhotoWizard } from "@/components/PhotoWizard";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "@/components/UserDropdown";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && isAuthenticated && location.pathname === "/") {
      navigate("/home");
    }
  }, [isAuthenticated, loading, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ortho-orange"></div>
      </div>
    );
  }

  const isHomePage = location.pathname === "/home";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-ortho-blue/20">
      <header className="py-6 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-ortho-orange">Orthomovi</h1>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <UserDropdown />
              ) : (
                <div className="flex space-x-4">
                  <Link to="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link to="/cadastro">
                    <Button className="bg-ortho-orange hover:bg-ortho-orange-dark">Cadastre-se</Button>
                  </Link>
                </div>
              )}
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
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
              <Link to="/cadastro">
                <Button className="w-full sm:w-auto bg-ortho-orange hover:bg-ortho-orange-dark">
                  Criar conta
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}

          {!isAuthenticated && (
            <>
              {/* Features Section */}
              <section className="py-8 mb-8">
                <h3 className="text-2xl font-bold text-center mb-8">Como Funciona</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-ortho-blue/10 p-6 rounded-lg">
                    <div className="w-12 h-12 bg-ortho-orange rounded-full flex items-center justify-center text-white mb-4 mx-auto">1</div>
                    <h4 className="text-lg font-semibold mb-3">Tire Fotos</h4>
                    <p className="text-gray-600">
                      Nosso aplicativo guia você para capturar imagens precisas da órtese de diferentes ângulos.
                    </p>
                  </div>
                  
                  <div className="bg-ortho-blue/10 p-6 rounded-lg">
                    <div className="w-12 h-12 bg-ortho-orange rounded-full flex items-center justify-center text-white mb-4 mx-auto">2</div>
                    <h4 className="text-lg font-semibold mb-3">Análise Automática</h4>
                    <p className="text-gray-600">
                      Nossa tecnologia analisa automaticamente as imagens e calcula as medidas precisas.
                    </p>
                  </div>
                  
                  <div className="bg-ortho-blue/10 p-6 rounded-lg">
                    <div className="w-12 h-12 bg-ortho-orange rounded-full flex items-center justify-center text-white mb-4 mx-auto">3</div>
                    <h4 className="text-lg font-semibold mb-3">Receba Resultados</h4>
                    <p className="text-gray-600">
                      Receba um relatório detalhado com todas as especificações e recomendações.
                    </p>
                  </div>
                </div>
              </section>

              {/* Benefits Section */}
              <section className="py-8 bg-ortho-blue/10 rounded-lg mb-8">
                <h3 className="text-2xl font-bold text-center mb-8">Benefícios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <div className="flex items-start p-4">
                    <CheckCircle className="text-ortho-orange mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Precisão Garantida</h4>
                      <p className="text-gray-600">
                        Nossas medições alcançam um nível de precisão excepcional, garantindo o ajuste perfeito.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4">
                    <CheckCircle className="text-ortho-orange mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Economia de Tempo</h4>
                      <p className="text-gray-600">
                        Reduza drasticamente o tempo necessário para medições e ajustes manuais.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4">
                    <CheckCircle className="text-ortho-orange mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Conforto Superior</h4>
                      <p className="text-gray-600">
                        Órteses perfeitamente ajustadas proporcionam mais conforto e melhores resultados terapêuticos.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4">
                    <CheckCircle className="text-ortho-orange mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="text-lg font-semibold mb-2">Acompanhamento Contínuo</h4>
                      <p className="text-gray-600">
                        Monitore o progresso e faça ajustes quando necessário com facilidade.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
        
        <div className="w-full max-w-md">
          <PhotoWizard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
