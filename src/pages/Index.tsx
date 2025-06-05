
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { PhotoWizard } from "@/components/PhotoWizard";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  const isHomePage = location.pathname === "/home";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-bg">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            {isHomePage ? (
              <>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-text mb-6 leading-tight">
                  Bem-vindo de volta!
                </h1>
                <p className="text-xl text-brand-text-light max-w-3xl mx-auto mb-8 leading-relaxed">
                  Agora você pode começar a usar nosso sistema de medição automática. 
                  Tire fotos das órteses e receba medições precisas instantaneamente.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-text mb-6 leading-tight">
                  Órteses Pediátricas
                  <span className="block text-brand-primary">Personalizadas</span>
                </h1>
                <p className="text-xl text-brand-text-light max-w-3xl mx-auto mb-8 leading-relaxed">
                  Sistema de medição automática para órteses pediátricas usando tecnologia inovadora. 
                  Precisão, conforto e resultados superiores para seus pacientes.
                </p>
              </>
            )}
            
            {!isAuthenticated && !isHomePage && (
              <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-12">
                <Link to="/cadastro">
                  <Button className="btn-primary text-lg px-8 py-4">
                    Começar Agora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button className="btn-secondary text-lg px-8 py-4">
                  Como Funciona
                </Button>
              </div>
            )}

            {/* Photo Wizard - sempre visível */}
            <div className="w-full max-w-md mx-auto">
              <PhotoWizard />
            </div>
          </div>
        </section>

        {/* Seções informativas - apenas para usuários não logados ou na landing page */}
        {(!isAuthenticated || !isHomePage) && (
          <>
            {/* Como Funciona Section */}
            <section id="como-funciona" className="py-20 bg-brand-white">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-brand-text mb-4">
                  Como Funciona
                </h2>
                <p className="text-xl text-brand-text-light text-center mb-16 max-w-2xl mx-auto">
                  Processo simples e eficiente em apenas 3 passos
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 mx-auto">
                      1
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-4 text-brand-text">
                      Tire Fotos
                    </h3>
                    <p className="text-brand-text-light leading-relaxed">
                      Nosso aplicativo guia você para capturar imagens precisas da órtese de diferentes ângulos.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 mx-auto">
                      2
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-4 text-brand-text">
                      Análise Automática
                    </h3>
                    <p className="text-brand-text-light leading-relaxed">
                      Nossa tecnologia analisa automaticamente as imagens e calcula as medidas precisas.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center text-white text-xl font-bold mb-6 mx-auto">
                      3
                    </div>
                    <h3 className="text-xl font-heading font-semibold mb-4 text-brand-text">
                      Receba Resultados
                    </h3>
                    <p className="text-brand-text-light leading-relaxed">
                      Receba um relatório detalhado com todas as especificações e recomendações.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Benefícios Section */}
            <section id="beneficios" className="py-20 bg-brand-bg">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-brand-text mb-4">
                  Benefícios
                </h2>
                <p className="text-xl text-brand-text-light text-center mb-16 max-w-2xl mx-auto">
                  Vantagens que fazem a diferença no seu trabalho
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="flex items-start p-6 bg-brand-white rounded-xl shadow-sm">
                    <CheckCircle className="text-brand-primary mr-4 mt-1 flex-shrink-0 w-6 h-6" />
                    <div>
                      <h3 className="text-lg font-heading font-semibold mb-2 text-brand-text">
                        Precisão Garantida
                      </h3>
                      <p className="text-brand-text-light leading-relaxed">
                        Nossas medições alcançam um nível de precisão excepcional, garantindo o ajuste perfeito.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-6 bg-brand-white rounded-xl shadow-sm">
                    <CheckCircle className="text-brand-primary mr-4 mt-1 flex-shrink-0 w-6 h-6" />
                    <div>
                      <h3 className="text-lg font-heading font-semibold mb-2 text-brand-text">
                        Economia de Tempo
                      </h3>
                      <p className="text-brand-text-light leading-relaxed">
                        Reduza drasticamente o tempo necessário para medições e ajustes manuais.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-6 bg-brand-white rounded-xl shadow-sm">
                    <CheckCircle className="text-brand-primary mr-4 mt-1 flex-shrink-0 w-6 h-6" />
                    <div>
                      <h3 className="text-lg font-heading font-semibold mb-2 text-brand-text">
                        Conforto Superior
                      </h3>
                      <p className="text-brand-text-light leading-relaxed">
                        Órteses perfeitamente ajustadas proporcionam mais conforto e melhores resultados terapêuticos.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-6 bg-brand-white rounded-xl shadow-sm">
                    <CheckCircle className="text-brand-primary mr-4 mt-1 flex-shrink-0 w-6 h-6" />
                    <div>
                      <h3 className="text-lg font-heading font-semibold mb-2 text-brand-text">
                        Acompanhamento Contínuo
                      </h3>
                      <p className="text-brand-text-light leading-relaxed">
                        Monitore o progresso e faça ajustes quando necessário com facilidade.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
