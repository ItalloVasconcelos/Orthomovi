
import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  History, 
  Image, 
  FileText, 
  Settings, 
  User, 
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";

const ClientDashboard = () => {
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Encerrando sessão",
      description: "Você será redirecionado para a página inicial.",
    });
    // In a real app, would clear session data here
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-ortho-blue/20">
      <header className="py-4 px-4 bg-white shadow-sm">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-ortho-orange">Orthomovi</Link>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
              <div className="w-8 h-8 rounded-full bg-ortho-orange flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
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
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Olá, Bem-vindo!</h1>
          <p className="text-gray-600">Gerencie seus pedidos de órteses pediátricas</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-ortho-blue/20 pb-2">
              <CardTitle className="flex items-center text-lg">
                <Image className="mr-2 text-ortho-orange" size={20} />
                Novo Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">Tire fotos da órtese e receba as medidas calculadas automaticamente.</p>
            </CardContent>
            <CardFooter>
              <Link to="/photo-wizard" className="w-full">
                <Button className="w-full bg-ortho-orange hover:bg-ortho-orange-dark">
                  Iniciar agora
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-ortho-blue/20 pb-2">
              <CardTitle className="flex items-center text-lg">
                <History className="mr-2 text-ortho-orange" size={20} />
                Histórico de Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">Consulte e acompanhe todos os seus pedidos anteriores.</p>
            </CardContent>
            <CardFooter>
              <Link to="/orders-history" className="w-full">
                <Button variant="outline" className="w-full">
                  Ver histórico
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-ortho-blue/20 pb-2">
              <CardTitle className="flex items-center text-lg">
                <FileText className="mr-2 text-ortho-orange" size={20} />
                Relatórios
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">Acesse relatórios detalhados sobre o desenvolvimento das órteses.</p>
            </CardContent>
            <CardFooter>
              <Link to="/reports" className="w-full">
                <Button variant="outline" className="w-full">
                  Ver relatórios
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-ortho-blue/20 pb-2">
              <CardTitle className="flex items-center text-lg">
                <Settings className="mr-2 text-ortho-orange" size={20} />
                Configurações da Conta
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">Atualize suas informações pessoais e preferências.</p>
            </CardContent>
            <CardFooter>
              <Link to="/account-settings" className="w-full">
                <Button variant="outline" className="w-full">
                  Configurar
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
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

export default ClientDashboard;
