
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  LogOut, 
  Settings,
  Save,
  Camera,
  Bell,
  Lock,
  UserCircle,
  CreditCard,
  ShieldCheck
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const AccountSettings = () => {
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
        description: "As configurações da sua conta foram atualizadas com sucesso.",
      });
    }, 1000);
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
              <BreadcrumbLink href="/cliente">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Configurações da Conta</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            <Settings className="inline-block mr-2 text-ortho-orange" />
            Configurações da Conta
          </h1>
          <p className="text-gray-600">Gerencie suas preferências e informações pessoais</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Profile Summary */}
          <div className="md:col-span-1">
            <Card className="shadow-md">
              <CardContent className="pt-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="w-24 h-24 rounded-full bg-ortho-blue/20 flex items-center justify-center">
                    <User className="w-12 h-12 text-ortho-orange" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-lg font-semibold">João Silva</h3>
                <p className="text-sm text-gray-600">joao.silva@example.com</p>
                <p className="text-xs text-gray-500 mt-1">Membro desde: Março 2025</p>
                
                <div className="mt-6 text-left">
                  <h4 className="text-sm font-medium mb-2">Menu Rápido</h4>
                  <div className="flex flex-col space-y-1">
                    <Button variant="ghost" size="sm" className="justify-start">
                      <UserCircle className="w-4 h-4 mr-2" />
                      Perfil
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start">
                      <Bell className="w-4 h-4 mr-2" />
                      Notificações
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start">
                      <Lock className="w-4 h-4 mr-2" />
                      Segurança
                    </Button>
                    <Button variant="ghost" size="sm" className="justify-start">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pagamento
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Settings Tabs */}
          <div className="md:col-span-3">
            <Card className="shadow-md">
              <CardHeader className="bg-ortho-blue/20 pb-2">
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="profile">Perfil</TabsTrigger>
                    <TabsTrigger value="notifications">Notificações</TabsTrigger>
                    <TabsTrigger value="security">Segurança</TabsTrigger>
                    <TabsTrigger value="payment">Pagamento</TabsTrigger>
                  </TabsList>
                
                  <TabsContent value="profile" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-medium mb-3">Informações Pessoais</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="display-name">Nome Completo</Label>
                            <Input id="display-name" defaultValue="João Silva" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="joao.silva@example.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input id="phone" defaultValue="(11) 99999-9999" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="birth-date">Data de Nascimento</Label>
                            <Input id="birth-date" type="date" defaultValue="1980-01-01" />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-base font-medium mb-3">Endereço</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="street">Logradouro</Label>
                            <Input id="street" defaultValue="Avenida Paulista, 1000" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="complement">Complemento</Label>
                            <Input id="complement" defaultValue="Apto 123" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="city">Cidade</Label>
                            <Input id="city" defaultValue="São Paulo" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">Estado</Label>
                            <Input id="state" defaultValue="SP" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="postal-code">CEP</Label>
                            <Input id="postal-code" defaultValue="01310-000" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notifications" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-medium mb-3">Preferências de Notificação</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="email-notifications" className="block mb-1">Notificações por Email</Label>
                              <span className="text-sm text-gray-500">Receba atualizações sobre seus pedidos por email</span>
                            </div>
                            <Switch id="email-notifications" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="sms-notifications" className="block mb-1">Notificações por SMS</Label>
                              <span className="text-sm text-gray-500">Receba atualizações sobre seus pedidos por SMS</span>
                            </div>
                            <Switch id="sms-notifications" />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="app-notifications" className="block mb-1">Notificações no Aplicativo</Label>
                              <span className="text-sm text-gray-500">Receba atualizações no aplicativo</span>
                            </div>
                            <Switch id="app-notifications" defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-base font-medium mb-3">Tipos de Notificação</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="order-updates" className="block mb-1">Atualizações de Pedidos</Label>
                              <span className="text-sm text-gray-500">Receba atualizações quando o status do seu pedido mudar</span>
                            </div>
                            <Switch id="order-updates" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="measurement-reminders" className="block mb-1">Lembretes de Medição</Label>
                              <span className="text-sm text-gray-500">Receba lembretes para realizar novas medições</span>
                            </div>
                            <Switch id="measurement-reminders" defaultChecked />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="promotional-emails" className="block mb-1">Emails Promocionais</Label>
                              <span className="text-sm text-gray-500">Receba emails sobre novidades e promoções</span>
                            </div>
                            <Switch id="promotional-emails" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="security" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-medium mb-3">Alterar Senha</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Senha Atual</Label>
                            <Input id="current-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-password">Nova Senha</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                          <Button className="bg-ortho-orange hover:bg-ortho-orange-dark">
                            Atualizar Senha
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-base font-medium mb-3">Segurança da Conta</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="two-factor-auth" className="block mb-1">Autenticação de Dois Fatores</Label>
                              <span className="text-sm text-gray-500">Adicione uma camada extra de segurança à sua conta</span>
                            </div>
                            <Switch id="two-factor-auth" />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="login-alerts" className="block mb-1">Alertas de Login</Label>
                              <span className="text-sm text-gray-500">Receba alertas quando sua conta for acessada de um novo dispositivo</span>
                            </div>
                            <Switch id="login-alerts" defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-base font-medium mb-3">Sessões Ativas</h3>
                        <div className="space-y-4">
                          <div className="border rounded-md p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Chrome em Windows</p>
                                <p className="text-sm text-gray-600">São Paulo, Brasil • Ativo agora</p>
                              </div>
                              <ShieldCheck className="text-green-500" />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Este é o seu dispositivo atual</p>
                          </div>
                          <div className="border rounded-md p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Safari em iPhone</p>
                                <p className="text-sm text-gray-600">São Paulo, Brasil • Último acesso: há 2 dias</p>
                              </div>
                              <Button variant="ghost" size="sm" className="text-red-500">
                                Encerrar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="payment" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-medium mb-3">Métodos de Pagamento</h3>
                        <div className="space-y-4">
                          <div className="border rounded-md p-4">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <CreditCard className="text-ortho-orange mr-3" />
                                <div>
                                  <p className="font-medium">Cartão de Crédito</p>
                                  <p className="text-sm text-gray-600">**** **** **** 1234 • Visa • Expira: 12/2027</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm">
                                  Editar
                                </Button>
                                <Button variant="outline" size="sm" className="text-red-500">
                                  Remover
                                </Button>
                              </div>
                            </div>
                          </div>
                          <Button className="bg-ortho-orange hover:bg-ortho-orange-dark">
                            Adicionar Novo Método de Pagamento
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-base font-medium mb-3">Histórico de Faturamento</h3>
                        <div className="space-y-4">
                          <div className="border rounded-md p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Fatura #INV-2025-001</p>
                                <p className="text-sm text-gray-600">AFO Bilateral • R$ 799,00 • 15/05/2025</p>
                              </div>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                PDF
                              </Button>
                            </div>
                          </div>
                          <div className="border rounded-md p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Fatura #INV-2025-002</p>
                                <p className="text-sm text-gray-600">SMO Unilateral • R$ 549,00 • 10/04/2025</p>
                              </div>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                PDF
                              </Button>
                            </div>
                          </div>
                          <div className="border rounded-md p-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Fatura #INV-2025-003</p>
                                <p className="text-sm text-gray-600">AFO Unilateral • R$ 599,00 • 05/03/2025</p>
                              </div>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                PDF
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardHeader>
              <CardFooter className="flex justify-end space-x-4 pt-6 mt-6 border-t">
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
                      Salvar Alterações
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

export default AccountSettings;
