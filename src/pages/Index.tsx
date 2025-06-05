
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, CheckCircle, MapPin, Phone, Mail } from "lucide-react";
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

  // Se é a página home (usuário logado), mostrar o PhotoWizard
  if (isHomePage) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-bg">
        <Header />
        
        <main className="flex-grow">
          <section className="py-20 px-4">
            <div className="container mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-brand-text mb-6 leading-tight">
                Bem-vindo de volta!
              </h1>
              <p className="text-xl text-brand-text-light max-w-3xl mx-auto mb-8 leading-relaxed">
                Agora você pode começar a usar nosso sistema de medição automática. 
                Tire fotos das órteses e receba medições precisas instantaneamente.
              </p>
              
              <div className="w-full max-w-md mx-auto">
                <PhotoWizard />
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    );
  }

  // Landing page para usuários não logados
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #FB7201 0%, #e65100 100%)' }}>
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                  Nós temos o Tênis que seu filho precisa, com o estilo que ele merece.
                </h1>
                <p className="text-xl mb-8 leading-relaxed opacity-90">
                  Design exclusivo, com mais altura e largura, proporcionando um calce mais justo, favorecendo a marcha e o equilíbrio.
                </p>
                <Button className="text-lg px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl" 
                       style={{ background: 'linear-gradient(135deg, #0469D7 0%, #022180 100%)' }}>
                  Solicitar tênis sob medida
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-md aspect-square bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">Imagem: Pai e filho com produto</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inclusão e Acessibilidade */}
        <section className="py-20 px-4" style={{ backgroundColor: '#F5F5DC' }}>
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text mb-12">
              Mamãe e papai, se seu filho tem uma condição especial, nós te ajudamos.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2 text-brand-text">Espectro Autista (TEA)</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2 text-brand-text">Síndrome de Down</h3>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2 text-brand-text">Paralisia Cerebral</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios dos Produtos */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text mb-8">
              Sabemos o quanto é importante encontrar um calçado sob medida para seu filho
            </h2>
            <p className="text-xl text-brand-text-light max-w-4xl mx-auto leading-relaxed">
              Entendemos que cada criança é única e tem necessidades diferentes. Por isso, oferecemos uma variedade de opções de tênis e sandálias em diferentes modelos, alturas e larguras, para garantir o par perfeito que se adapte às necessidades específicas do seu filho.
            </p>
          </div>
        </section>

        {/* Linha 6FW */}
        <section className="py-20 px-4" style={{ backgroundColor: '#F5F5DC' }}>
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text mb-12">
              Nossos tênis da linha 6FW
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-brand-text">Uso de órtese</h3>
                <p className="text-brand-text-light">Projetado e fabricado especialmente para proporcionar um ajuste perfeito.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-brand-text">Uso de Palmilha</h3>
                <p className="text-brand-text-light">Desenvolvido para integrar palmilhas ortopédicas, oferecendo um ajuste adequado.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-brand-text">Quem tem dismetria</h3>
                <p className="text-brand-text-light">Calçado sob medida para ajuste de dismetria de membro inferior.</p>
              </div>
            </div>
            <Button className="text-lg px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl" 
                   style={{ background: 'linear-gradient(135deg, #0469D7 0%, #022180 100%)' }}>
              Solicitar tênis sob medida
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Benefícios para a Criança */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text mb-12">
              Seu filho merece usar nossos tênis e sandálias
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
              {[
                'Criança com mais confiança',
                'Aumento da autoestima',
                'Melhora postura e equilíbrio',
                'Redução da fadiga e dor',
                'Marcha funcional e segura',
                'Desenvolvimento motor aprimorado'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="text-green-500 mr-3 flex-shrink-0 w-6 h-6" />
                  <span className="text-brand-text font-medium">{benefit}</span>
                </div>
              ))}
            </div>
            <Button className="text-lg px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl" 
                   style={{ background: 'linear-gradient(135deg, #0469D7 0%, #022180 100%)' }}>
              Solicitar tênis sob medida
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Diferenciais dos Calçados */}
        <section className="py-20 px-4" style={{ backgroundColor: '#FB7201' }}>
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-12">
              O que você vai encontrar em nossos calçados:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                'Design Exclusivo',
                'Feito em couro',
                'Tecido específico para Tênis',
                'Contraforte resistente',
                'Muito conforto',
                'Solado em borracha vulcanizada',
                'Sola Rocker',
                'Fabricação própria'
              ].map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                  <h3 className="text-white font-semibold">{feature}</h3>
                </div>
              ))}
            </div>
            <Button className="text-lg px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl" 
                   style={{ background: 'linear-gradient(135deg, #0469D7 0%, #022180 100%)' }}>
              Solicitar tênis sob medida
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Sobre a OrthoMovi */}
        <section className="py-20 px-4" style={{ backgroundColor: '#F5F5DC' }}>
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text mb-8">
              Sobre a OrthoMovi
            </h2>
            <p className="text-xl text-brand-text-light max-w-4xl mx-auto mb-8 leading-relaxed">
              A OrthoMovi é uma marca de calçados ortopédicos para crianças com necessidades especiais, dedicada a proporcionar conforto, funcionalidade e estilo. Nossa missão é garantir que cada criança tenha acesso a calçados que promovam seu desenvolvimento e bem-estar.
            </p>
            <Button className="text-lg px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl" 
                   style={{ background: 'linear-gradient(135deg, #0469D7 0%, #022180 100%)' }}>
              Solicitar tênis sob medida
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text mb-12">
              O que dizem nossos Clientes
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-brand-text-light text-lg">Espaço reservado para depoimentos de clientes satisfeitos.</p>
            </div>
          </div>
        </section>

        {/* Localização */}
        <section className="py-20 px-4" style={{ backgroundColor: '#F5F5DC' }}>
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text mb-8">
              Localização da nossa Fábrica
            </h2>
            <p className="text-xl text-brand-text-light mb-8">
              Estamos localizados na Rua João Freire de Araújo 245, na cidade de Juazeiro do Norte, no Ceará.
            </p>
            <Button variant="outline" className="text-lg px-8 py-4 border-2 border-brand-text text-brand-text hover:bg-brand-text hover:text-white">
              <MapPin className="mr-2 w-5 h-5" />
              Ver localização
            </Button>
          </div>
        </section>

        {/* Perguntas Frequentes */}
        <section className="py-20 px-4" style={{ backgroundColor: '#e3f2fd' }}>
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text mb-12">
              Perguntas frequentes
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {[
                'Como vou saber o número do tênis para órtese ou Dismetria?',
                'O que é um tênis para palmilha ortopédica?',
                'O que é sola Rocker?',
                'Como faço para comprar?',
                'Qual o prazo de entrega?'
              ].map((question, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-left">
                  <h3 className="text-lg font-semibold text-brand-text">{question}</h3>
                  <p className="text-brand-text-light mt-2">Resposta em breve...</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer customizado */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-4">OrthoMovi</h3>
              <p className="text-gray-400">Calçados ortopédicos para crianças com necessidades especiais.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Política de Privacidade</Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Mensagem no Whatsapp</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /> (88) 99999-9999</p>
                <p className="flex items-center"><Mail className="w-4 h-4 mr-2" /> contato@orthomovi.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">2024 © OrthoMovi. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
