
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  Settings, 
  User, 
  LogOut,
  Save,
  RefreshCw
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

const AdminConfigPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
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

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Configurações salvas",
        description: "As configurações do sistema foram atualizadas com sucesso.",
      });
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-ortho-blue/10">
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Configurações do Sistema</h1>
          <p className="text-gray-600">Configure os parâmetros gerais da plataforma</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card className="shadow-md">
              <CardHeader className="bg-ortho-blue/20 pb-2">
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
                  <Link to="/admin/config" className="flex items-center px-4 py-3 bg-ortho-orange/10 border-l-4 border-ortho-orange">
                    <Settings className="mr-2 text-ortho-orange" size={18} />
                    <span>Configurações</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <Card className="shadow-md">
              <CardHeader className="bg-ortho-blue/20 pb-2">
                <CardTitle className="text-lg">Configurações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-3">Informações da Empresa</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Nome da Empresa</Label>
                      <Input id="company-name" defaultValue="Orthomovi Órteses Pediátricas" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-email">Email de Contato</Label>
                      <Input id="company-email" defaultValue="contato@orthomovi.com.br" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-phone">Telefone de Contato</Label>
                      <Input id="company-phone" defaultValue="(11) 99999-9999" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-cnpj">CNPJ</Label>
                      <Input id="company-cnpj" defaultValue="12.345.678/0001-90" />
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
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenance-mode" className="block mb-1">Modo de Manutenção</Label>
                        <span className="text-sm text-gray-500">Ativa o modo de manutenção, tornando o site inacessível para usuários comuns</span>
                      </div>
                      <Switch id="maintenance-mode" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-base font-medium mb-3">Cálculo e Medição</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="precision-level">Nível de Precisão (mm)</Label>
                      <Input id="precision-level" type="number" defaultValue="1.5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calibration-interval">Intervalo de Calibração (dias)</Label>
                      <Input id="calibration-interval" type="number" defaultValue="30" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-base font-medium mb-3">Backup do Sistema</h3>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" className="flex items-center">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Realizar Backup Agora
                    </Button>
                    <div className="text-sm text-gray-500">
                      Último backup: 19/05/2025 às 08:30
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4 pt-4 border-t">
                <Button variant="outline">Cancelar</Button>
                <Button 
                  className="bg-ortho-orange hover:bg-ortho-orange-dark"
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

export default AdminConfigPage;
