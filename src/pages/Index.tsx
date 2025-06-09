import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, MapPin, Phone, Mail, Heart, Users, Brain } from "lucide-react";
import { PhotoWizard } from "@/components/PhotoWizard";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const isHomePage = location.pathname === "/home";

  const handleSolicitarTenis = () => {
    if (isAuthenticated) {
      navigate('/home');
    } else {
      navigate('/https://orthomovi-keycloak.t2wird.easypanel.host/realms/master/protocol/openid-connect/auth\n'+
          '?client_id=orthomovi\n'+
          '&redirect_uri=https://orthomovi-frontend.t2wird.easypanel.host/\n'+
          '&response_type=code\n'+
          '&scope=openid\n'+
          '&state=random123');
    }
  };

  const handleVerLocalizacao = () => {
    window.open('https://www.google.com/maps/place/Orthomovi/@-7.2555324,-39.3180029,8720m/data=!3m1!1e3!4m6!3m5!1s0x7a179ea330ccd65:0x1dc24fc4265fcd00!8m2!3d-7.2555324!4d-39.3180029!16s%2Fg%2F11lp1v9qld?entry=ttu&g_ep=EgoyMDI1MDYwNC4wIKXMDSoASAFQAw%3D%3D', '_blank');
  };

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
                <Button 
                  onClick={handleSolicitarTenis}
                  className="h-2/4  text-lg px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #0469D7 0%, #022180 100%)' }}
                >
                  Solicitar tênis sob medida
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-md aspect-square  rounded-lg flex items-center justify-center">
                  <img src="/img/hero-image.svg" width="100%" alt="Homem segurando os tênis e exemplos das próteses."/>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inclusão e Acessibilidade + Sabemos o quanto é importante */}
        <section className="py-20 px-4" style={{ backgroundColor: '#F5F5DC' }}>
          <div className="container mx-auto">
            {/* Espaço para imagem */}
            <div className="flex justify-center mb-8">
              <div className="w-6/12 aspect-video  rounded-lg flex items-center justify-center">
               <img src="/img/imagens_proteses.svg" alt="Exemplos de próteses" width="100%"/>
              </div>
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text mb-8">
                <span style={{ color: '#FB7201' }}>Papai e mamãe</span>, se seu filho tem uma condição especial, nós te ajudamos.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center space-x-2">
                  <Brain className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-brand-text">Espectro Autista (TEA)</h3>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center space-x-2">
                  <Heart className="w-6 h-6 text-red-600" />
                  <h3 className="text-lg font-semibold text-brand-text">Síndrome de Down</h3>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center space-x-2">
                  <Users className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-brand-text">Paralisia Cerebral</h3>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-brand-text mb-6">
                Sabemos o quanto é importante encontrar um <span style={{ color: '#E64551' }}>calçado sob medida</span> para seu filho
              </h3>
              <p className="text-lg text-brand-text-light max-w-4xl mx-auto leading-relaxed">
                Entendemos que <span style={{ fontWeight: 'bold' }}>cada criança é única e tem necessidades diferentes.</span> Por isso, oferecemos uma variedade de opções de tênis e sandálias em diferentes modelos, alturas e larguras, para garantir o par perfeito que se adapte às necessidades específicas do seu filho.
              </p>
            </div>
          </div>
        </section>

        {/* Linha 6FW */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text mb-12 text-center">
              Nossos tênis da linha <span style={{
              fontWeight: "bold",
              background: "linear-gradient(to right, orange, red)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent" }}>6FW</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Espaço para imagem à esquerda */}
              <div className="flex justify-center">
                <div className="w-full aspect-video  rounded-lg flex items-center justify-center">
                  <img src="/img/exemplo_tenis.svg" alt="Imagem de um tênis demonstrando a qualidade e conforto que a prótese oferece." width="80%"/>
                </div>
              </div>

              {/* Cards à direita */}
              <div className="space-y-6">
                <h2>Foram feitos especialmente para crianças que necessitam:</h2>
                <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: '#FFDDBA' }}>
                  <div className="flex items-center mb-3">
                    <div className="w-1 h-8 bg-orange-500 rounded mr-3"></div>
                    <h3 className="text-xl font-semibold text-brand-text">Uso de órtese</h3>
                  </div>
                  <p className="text-brand-text-light">
                    Projetado e fabricado especialmente para proporcionar um ajuste perfeito. Desenvolvido com atenção personalizada, levando em consideração as especificidades de cada órtese e as necessidades únicas de cada caso.
                  </p>
                </div>

                <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: '#FFDDBA' }}>
                  <div className="flex items-center mb-3">
                    <div className="w-1 h-8 bg-orange-500 rounded mr-3"></div>
                    <h3 className="text-xl font-semibold text-brand-text">Uso de Palmilha</h3>
                  </div>
                  <p className="text-brand-text-light">
                    Desenvolvido para integrar palmilhas ortopédicas, oferecendo um ajuste adequado, conforto no calce, melhorando a postura, a marcha e aliviando dores ou desconfortos, dando total suporte ao tratamento.
                  </p>
                </div>

                <div className="p-6 rounded-lg shadow-sm" style={{ backgroundColor: '#FFDDBA' }}>
                  <div className="flex items-center mb-3">
                    <div className="w-1 h-8 bg-orange-500 rounded mr-3"></div>
                    <h3 className="text-xl font-semibold text-brand-text">Quem tem dismetria</h3>
                  </div>
                  <p className="text-brand-text-light">
                    Calçado sob medida para ajuste de dismetria de membro inferior.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button 
                onClick={handleSolicitarTenis}
                className="h-2/4  text-lg px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #0469D7 0%, #022180 100%)' }}
              >
                Solicitar tênis sob medida
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Benefícios para a Criança */}
        <section className="py-20 px-4" style={{ backgroundColor: '#F5F5DC' }}>
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text mb-12 text-center">
              Seu filho merece usar nossos{' '}
              <span style={{ background: 'linear-gradient(135deg, #FB7201 0%, #e65100 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                tênis e sandálias
              </span>
            </h2>
              <h2>O que possibilita:</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Lista à esquerda */}
              <div className="space-y-4">
                {[
                  'Criança com mais confiança',
                  'Aumento da autoestima',
                  'Melhora postura e equilíbrio',
                  'Redução da fadiga e dor',
                  'Marcha funcional e segura',
                  'Desenvolvimento motor aprimorado'
                ].map((benefit, index) => (
                    <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">

                      <CheckCircle className="text-green-500 mr-3 flex-shrink-0 w-6 h-6"/>
                      <span className="text-brand-text font-medium">{benefit}</span>
                    </div>
                ))}
              </div>

              {/* Espaço para imagem à direita */}
              <div className="flex justify-center">
                <div className="w-full max-w-md aspect-square rounded-lg flex items-center justify-center">
                  <img src="/img/varios_tenis.svg" alt="Exemplos de tênis" width="100%"/>
                </div>
              </div>
            </div>

            <div className="text-left mt-8">
              <Button 
                onClick={handleSolicitarTenis}
                className="h-2/4 text-lg px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #0469D7 0%, #022180 100%)' }}
              >
                Solicitar tênis sob medida
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Diferenciais dos Calçados */}
        <section className="py-20 px-4" style={{
          background: 'radial-gradient(circle at top left, #ff9000 0%, transparent 50%), linear-gradient(to bottom right, #ff7200, #ff3000)',
                    }}>
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-12 text-center">
              O que você vai encontrar em nossos calçados:
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Espaço para imagem à esquerda */}
              <div className="flex justify-center">
                <div className="w-full max-w-md aspect-square  rounded-lg flex items-center justify-center">
                  <img src="/img/tenis_exclusivo.svg" alt="Imagem de tênis, mostrando exclusividade e elegância." width="100%"/>
                </div>
              </div>

              {/* Lista à direita */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">

                      <CheckCircle className="text-green-500 mr-3 flex-shrink-0 w-6 h-6"/>
                      <span className="text-brand-text font-medium">{feature}</span>
                    </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                  onClick={handleSolicitarTenis}
                  className="h-2/4 text-lg px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                style={{ background: 'linear-gradient(135deg, #0469D7 0%, #022180 100%)' }}
              >
                Solicitar tênis sob medida
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Sobre a OrthoMovi */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            {/* Espaço para imagem acima do título */}
            <div className="flex justify-center mb-1">
              <div className="w-full  aspect-video  rounded-lg flex items-center justify-center">
                <img src="/img/entrega.svg" alt="Banner de entrega para todo o Brasil" width="100%"/>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text mb-12 ">
              <span style={{
              fontWeight: "bold",
              background: "linear-gradient(to right, orange, red)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent"
            }}>Sobre a OrthoMovi</span>
            </h2>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text mb-12 text-center">

            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Texto à esquerda */}
              <div className="space-y-6">
                <p className="text-lg text-brand-text-light leading-relaxed">
                  A <span style={{fontWeight: "bold"}}>OrthoMovi</span> é uma marca de calçados ortopédicos para crianças com necessidades especiais, que
                  necessitem de uso de órtese, uso de palmilha e/ou compensação de altura.
                </p>
                <p className="text-lg text-brand-text-light leading-relaxed">
                  <span style={{fontWeight: "bold"}}>Somos uma das únicas empresas brasileiras que produzem calçados feitos individualmente, de acordo com
                  a necessidade da criança,</span> conforme orientação de profissionais capacitados da área da saúde
                  osteomuscular e neurológica.
                </p>
                <p className="text-lg text-brand-text-light leading-relaxed">
                  <span style={{fontWeight: "bold"}}>O calçado correto, feito especialmente para aquela criança,</span> favorece à melhoria da postura,
                  facilitando o <span style={{fontWeight: "bold"}}>Movimento,</span> levando ao alcance de excelentes resultados na evolução da marcha dessas
                  crianças.
                </p>
                <p className="text-lg text-brand-text-light leading-relaxed">
                  <span style={{fontWeight: "bold"}}>Estamos no mercado há quase 20 anos,</span> produzindo calçados infantis e agregamos toda nossa experiência
                  em um novo projeto de fabricação de calçados ortopédicos, com a <span style={{fontWeight: "bold"}}>OrthoMovi.</span>
                </p>
              </div>

              {/* Espaço para imagem à direita */}
              <div className="flex justify-center">
                <div className="w-full max-w-md aspect-square rounded-lg flex items-center justify-center">
                  <img src="/img/avaliações.svg" alt="Imagem de avaliações positivas!" width="100%"/>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <Button
                  onClick={handleSolicitarTenis}
                  className="h-2/4 text-lg px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  style={{background: 'linear-gradient(135deg, #0469D7 0%, #022180 100%)'}}
              >
                Solicitar tênis sob medida
                <ArrowRight className="ml-2 w-5 h-5"/>
              </Button>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-20 px-4" style={{backgroundColor: '#F5F5DC'}}>
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
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text mb-6">
                Localização da nossa Fábrica
              </h2>
              <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-r from-orange-100 to-orange-50 p-8 rounded-xl shadow-sm">
                  <MapPin className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <p className="text-xl text-brand-text mb-6 font-medium">
                    Estamos localizados na Rua João Freire de Araújo 245, na cidade de Juazeiro do Norte, no Ceará.
                  </p>
                  <div className="flex items-center justify-center space-x-6 text-brand-text-light mb-6">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      <span>(88) 9.9646-18819</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      <span>contato@orthomovi.com</span>
                    </div>
                  </div>
                  <Button 
                    onClick={handleVerLocalizacao}
                    className="h-2/4 text-lg px-8 py-4 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                    style={{background: 'linear-gradient(135deg, #0469D7 0%, #022180 100%)'}}
                  >
                    <MapPin className="mr-2 w-5 h-5" />
                    Ver localização no mapa
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Perguntas Frequentes */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto text-center">
            <p className="text-lg text-brand-text-light mb-2">Dúvidas Comuns</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-text mb-12">
              Perguntas frequentes
            </h2>
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="rounded-lg mb-4 px-6" style={{ backgroundColor: '#FCCD9F' }}>
                  <AccordionTrigger className="text-left">
                    Como vou saber o número do tênis para órtese ou Dismetria?
                  </AccordionTrigger>
                  <AccordionContent className="text-left text-brand-text-light">
                    Vamos lhe enviar um formulário ilustrativo, onde constam as medidas necessárias para serem tiradas.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2" className="rounded-lg mb-4 px-6" style={{ backgroundColor: '#FCCD9F' }}>
                  <AccordionTrigger className="text-left">
                    O que é um tênis para palmilha ortopédica?
                  </AccordionTrigger>
                  <AccordionContent className="text-left text-brand-text-light">
                    É um tênis diferenciado, feito com estrutura interna para acomodar a palmilha, deixando o calce adaptado, sem diferença de altura.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3" className="rounded-lg mb-4 px-6" style={{ backgroundColor: '#FCCD9F' }}>
                  <AccordionTrigger className="text-left">
                    O que é sola Rocker?
                  </AccordionTrigger>
                  <AccordionContent className="text-left text-brand-text-light">
                    É um solado com uma curvatura que ajuda a distribuir melhor o peso do corpo, aliviando a pressão sobre o arco do pé, permitindo a marcha mais suave e natural.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4" className="rounded-lg mb-4 px-6" style={{ backgroundColor: '#FCCD9F' }}>
                  <AccordionTrigger className="text-left">
                    Como faço para comprar?
                  </AccordionTrigger>
                  <AccordionContent className="text-left text-brand-text-light">
                    Entre em contato pelo nosso WhatsApp.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5" className="rounded-lg mb-4 px-6" style={{ backgroundColor: '#FCCD9F' }}>
                  <AccordionTrigger className="text-left">
                    Qual o prazo de entrega?
                  </AccordionTrigger>
                  <AccordionContent className="text-left text-brand-text-light">
                    Como são feitos sob encomenda (individualizados), serão enviados no prazo de duas semanas e, nossa equipe estará sempre lhe informando o andamento do seu pedido.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer  */}
      <Footer />
    </div>
  );
};

export default Index;
