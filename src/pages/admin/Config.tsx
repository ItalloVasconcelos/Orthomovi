import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  Settings, 
  Save
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { UserDropdown } from "@/components/UserDropdown";
import { graphqlService } from "@/services/graphqlService";

const AdminConfigPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    cnpj: ""
  });

  useEffect(() => {
    const fetchConfigData = async () => {
      try {
        setIsLoadingData(true);
        console.log('Carregando dados de configuração...');
        
        const { company, contact } = await graphqlService.getAdminConfig();
        
        console.log('Dados carregados:', { company, contact });
        
        setFormData({
          companyName: company?.company_name || "OrthoMovi Órteses Pediátricas",
          email: contact?.email || "admin@orthomovi.com.br",
          phone: contact?.phone || "(88) 99999-9999",
          cnpj: company?.cnpj || "12.345.678/0001-90"
        });
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        toast({
          title: "Erro ao carregar configurações",
          description: "Não foi possível carregar os dados de configuração. Tente novamente.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchConfigData();
  }, [toast]);

  const handleSaveSettings = async () => {
    setIsLoading(true);
    
    try {
      const success = await graphqlService.updateCompanyConfig({
        company_name: formData.companyName,
        cnpj: formData.cnpj,
        email: formData.email,
        phone: formData.phone
      });

      if (success) {
        toast({
          title: "Configurações salvas",
          description: "As configurações do sistema foram atualizadas com sucesso.",
        });
      } else {
        throw new Error("Falha ao salvar configurações");
      }
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  if (isLoadingData) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-bg">
        <header className="py-4 px-4 bg-brand-white shadow-sm">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">O</span>
                </div>
                <span className="text-xl font-heading font-bold text-brand-text">
                  Orthomovi
                </span>
              </Link>
              <UserDropdown />
            </div>
          </div>
        </header>
        
        <main className="flex-grow container mx-auto px-4 py-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando configurações...</p>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <header className="py-4 px-4 bg-brand-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <span className="text-xl font-heading font-bold text-brand-text">
                Orthomovi
              </span>
            </Link>
            <UserDropdown />
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
              <BreadcrumbLink href="/admin">Painel Administrativo</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Configurações</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-brand-text mb-2">Configurações do Sistema</h1>
          <p className="text-brand-text-light">Configure os parâmetros gerais da plataforma</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="shadow-md">
              <CardHeader className="bg-brand-bg-beige pb-2">
                <CardTitle className="text-lg">Menu</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <Link to="/admin" className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <Settings className="mr-2 text-gray-500" size={18} />
                    <span>Pedidos</span>
                  </Link>
                  <Link to="/admin/users" className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <Users className="mr-2 text-gray-500" size={18} />
                    <span>Usuários</span>
                  </Link>
                  <Link to="/admin/config" className="flex items-center px-4 py-3 bg-brand-accent/10 border-l-4 border-brand-accent">
                    <Settings className="mr-2 text-brand-accent" size={18} />
                    <span>Configurações</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <Card className="shadow-md">
              <CardHeader className="bg-brand-bg-beige pb-2">
                <CardTitle className="text-lg">Configurações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-3">Informações da Empresa</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Nome da Empresa</Label>
                      <Input 
                        id="company-name" 
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="h-12" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-email">Email de Contato</Label>
                      <Input 
                        id="company-email" 
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-12" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-phone">Telefone de Contato</Label>
                      <Input 
                        id="company-phone" 
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="h-12" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-cnpj">CNPJ</Label>
                      <Input 
                        id="company-cnpj" 
                        value={formData.cnpj}
                        onChange={(e) => handleInputChange('cnpj', e.target.value)}
                        className="h-12" 
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-base font-medium mb-3">Configurações de Plataforma</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enable-registrations" className="block mb-1">Cadastros Abertos</Label>
                        <span className="text-sm text-gray-500">Permite que novos usuários se cadastrem na plataforma</span>
                      </div>
                      <Switch id="enable-registrations" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enable-notifications" className="block mb-1">Notificações por Email</Label>
                        <span className="text-sm text-gray-500">Envia emails de notificação sobre novos pedidos e atualizações</span>
                      </div>
                      <Switch id="enable-notifications" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-base font-medium mb-3">Cálculo e Medição</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="precision-level">Nível de Precisão (mm)</Label>
                      <Input id="precision-level" type="number" defaultValue="1.5" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calibration-interval">Intervalo de Calibração (dias)</Label>
                      <Input id="calibration-interval" type="number" defaultValue="30" className="h-12" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4 pt-4 border-t">
                <Button variant="outline">Cancelar</Button>
                <Button 
                  className="btn-primary h-12 px-6"
                  onClick={handleSaveSettings}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Configurações
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="bg-brand-text text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo e descrição */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">O</span>
                </div>
                <span className="text-xl font-heading font-bold">
                  Orthomovi
                </span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Sistema de medição automática para órteses pediátricas usando tecnologia inovadora. 
                Precisão, conforto e resultados superiores para seus pacientes.
              </p>
              <p className="text-sm text-gray-400">
                © 2025 Orthomovi Órteses Pediátricas. Todos os direitos reservados.
              </p>
            </div>

            {/* Links rápidos */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#como-funciona" className="text-gray-300 hover:text-white transition-colors">
                    Como Funciona
                  </a>
                </li>
                <li>
                  <a href="#beneficios" className="text-gray-300 hover:text-white transition-colors">
                    Benefícios
                  </a>
                </li>
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
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contato
                  </Link>
                </li>
                <li>
                  <a href="mailto:suporte@orthomovi.com" className="text-gray-300 hover:text-white transition-colors">
                    suporte@orthomovi.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Linha divisória */}
          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                Desenvolvido com ❤️ para profissionais da saúde
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  📧
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  💼
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  📷
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminConfigPage;
