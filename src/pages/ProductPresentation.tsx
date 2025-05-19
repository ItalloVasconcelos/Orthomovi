
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

const ProductPresentation = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="py-6 px-4 bg-gradient-to-r from-ortho-blue/50 to-ortho-blue/10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold text-ortho-orange">Orthomovi</Link>
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
      
      <div className="container mx-auto py-4 px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Início</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Nosso Produto</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-white to-ortho-blue/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Revolucionando Órteses Pediátricas</h1>
                <p className="text-xl text-gray-600 mb-6">
                  Utilizamos tecnologia avançada para oferecer órteses pediátricas personalizadas com precisão e conforto incomparáveis.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Link to="/cadastro">
                    <Button className="w-full sm:w-auto bg-ortho-orange hover:bg-ortho-orange-dark">
                      Começar agora
                      <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Já tenho conta
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-ortho-blue rounded-3xl transform rotate-3 -z-10"></div>
                  <img 
                    src="/placeholder.svg" 
                    alt="Órtese Pediátrica" 
                    className="rounded-2xl shadow-lg transform -rotate-1 w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-ortho-blue/10 p-6 rounded-lg">
                <div className="w-12 h-12 bg-ortho-orange rounded-full flex items-center justify-center text-white mb-4">1</div>
                <h3 className="text-xl font-semibold mb-3">Tire Fotos</h3>
                <p className="text-gray-600">
                  Nosso aplicativo guia você para capturar imagens precisas da órtese de diferentes ângulos.
                </p>
              </div>
              
              <div className="bg-ortho-blue/10 p-6 rounded-lg">
                <div className="w-12 h-12 bg-ortho-orange rounded-full flex items-center justify-center text-white mb-4">2</div>
                <h3 className="text-xl font-semibold mb-3">Análise Automática</h3>
                <p className="text-gray-600">
                  Nossa tecnologia analisa automaticamente as imagens e calcula as medidas precisas.
                </p>
              </div>
              
              <div className="bg-ortho-blue/10 p-6 rounded-lg">
                <div className="w-12 h-12 bg-ortho-orange rounded-full flex items-center justify-center text-white mb-4">3</div>
                <h3 className="text-xl font-semibold mb-3">Receba Resultados</h3>
                <p className="text-gray-600">
                  Receba um relatório detalhado com todas as especificações e recomendações.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-ortho-blue/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Benefícios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start p-4">
                <CheckCircle className="text-ortho-orange mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Precisão Garantida</h3>
                  <p className="text-gray-600">
                    Nossas medições alcançam um nível de precisão excepcional, garantindo o ajuste perfeito.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-4">
                <CheckCircle className="text-ortho-orange mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Economia de Tempo</h3>
                  <p className="text-gray-600">
                    Reduza drasticamente o tempo necessário para medições e ajustes manuais.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-4">
                <CheckCircle className="text-ortho-orange mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Conforto Superior</h3>
                  <p className="text-gray-600">
                    Órteses perfeitamente ajustadas proporcionam mais conforto e melhores resultados terapêuticos.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-4">
                <CheckCircle className="text-ortho-orange mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Acompanhamento Contínuo</h3>
                  <p className="text-gray-600">
                    Monitore o progresso e faça ajustes quando necessário com facilidade.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link to="/cadastro">
                <Button className="bg-ortho-orange hover:bg-ortho-orange-dark">
                  Começar agora
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-ortho-orange mb-4">Orthomovi</h3>
              <p className="text-gray-600 max-w-md">
                Soluções tecnológicas para órteses pediátricas personalizadas com precisão e conforto.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Empresa</h4>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-gray-600 hover:text-ortho-orange">Sobre nós</Link></li>
                  <li><Link to="/contact" className="text-gray-600 hover:text-ortho-orange">Contato</Link></li>
                  <li><Link to="/careers" className="text-gray-600 hover:text-ortho-orange">Carreiras</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Suporte</h4>
                <ul className="space-y-2">
                  <li><Link to="/faq" className="text-gray-600 hover:text-ortho-orange">FAQ</Link></li>
                  <li><Link to="/terms" className="text-gray-600 hover:text-ortho-orange">Termos de Uso</Link></li>
                  <li><Link to="/privacy" className="text-gray-600 hover:text-ortho-orange">Privacidade</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-gray-500 text-sm">© 2025 Orthomovi Órteses Pediátricas. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductPresentation;
