
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  LogOut, 
  Settings,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download
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
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AccountSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
    birthDate: "1985-05-15",
  });
  
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    smsUpdates: false,
    orderNotifications: true,
    marketingEmails: false,
  });

  // Mock data for order history
  const orderHistory = [
    { 
      id: "ORD-001", 
      patientName: "Maria Silva (3 anos)", 
      date: "2025-05-15", 
      status: "completed", 
      calculatedNumber: "24"
    },
    { 
      id: "ORD-002", 
      patientName: "Pedro Silva (5 anos)", 
      date: "2025-04-20", 
      status: "completed", 
      calculatedNumber: "26"
    },
    { 
      id: "ORD-003", 
      patientName: "Ana Silva (7 anos)", 
      date: "2025-03-10", 
      status: "completed", 
      calculatedNumber: "28"
    },
  ];
  
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

  const handleSaveProfile = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram salvas com sucesso.",
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Concluído
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Em Processamento
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pendente
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
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
          <p className="text-gray-600">Gerencie suas informações pessoais e preferências</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card className="shadow-md">
              <CardHeader className="bg-ortho-blue/20">
                <CardTitle className="text-lg">Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full bg-ortho-orange flex items-center justify-center text-white text-2xl font-bold">
                    {formData.fullName.charAt(0)}
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="mr-2">
                      <Camera className="w-4 h-4 mr-2" />
                      Alterar Foto
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">JPG, GIF ou PNG. Máximo 1MB.</p>
                  </div>
                </div>
                
                <Separator />
                
                {/* Personal Information Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input 
                        id="fullName" 
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="pl-10" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input 
                        id="email" 
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input 
                        id="phone" 
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Data de Nascimento</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input 
                        id="birthDate" 
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className="pl-10" 
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Address Information */}
                <div>
                  <h3 className="text-base font-medium mb-3">Endereço</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address">Endereço</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <Input 
                          id="address" 
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="pl-10" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input 
                        id="city" 
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input 
                        id="state" 
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">CEP</Label>
                      <Input 
                        id="zipCode" 
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4 pt-4 border-t">
                <Button variant="outline">Cancelar</Button>
                <Button 
                  className="bg-ortho-orange hover:bg-ortho-orange-dark"
                  onClick={handleSaveProfile}
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
          
          {/* Notifications Settings */}
          <div className="space-y-6">
            <Card className="shadow-md">
              <CardHeader className="bg-ortho-blue/20">
                <CardTitle className="text-lg">Notificações</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-updates">Atualizações por Email</Label>
                    <p className="text-sm text-gray-500">Receba atualizações sobre seus pedidos</p>
                  </div>
                  <Switch 
                    id="email-updates"
                    checked={notifications.emailUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('emailUpdates', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-updates">SMS</Label>
                    <p className="text-sm text-gray-500">Receba SMS sobre status dos pedidos</p>
                  </div>
                  <Switch 
                    id="sms-updates"
                    checked={notifications.smsUpdates}
                    onCheckedChange={(checked) => handleNotificationChange('smsUpdates', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="order-notifications">Notificações de Pedidos</Label>
                    <p className="text-sm text-gray-500">Seja notificado sobre novos pedidos</p>
                  </div>
                  <Switch 
                    id="order-notifications"
                    checked={notifications.orderNotifications}
                    onCheckedChange={(checked) => handleNotificationChange('orderNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing-emails">Emails de Marketing</Label>
                    <p className="text-sm text-gray-500">Receba novidades e promoções</p>
                  </div>
                  <Switch 
                    id="marketing-emails"
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Stats */}
            <Card className="shadow-md">
              <CardHeader className="bg-ortho-blue/20">
                <CardTitle className="text-lg">Estatísticas Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total de Pedidos</span>
                    <span className="font-semibold">{orderHistory.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pedidos Concluídos</span>
                    <span className="font-semibold text-green-600">
                      {orderHistory.filter(order => order.status === 'completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Membro desde</span>
                    <span className="font-semibold">Jan 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Recent Orders */}
        <Card className="shadow-md mt-6">
          <CardHeader className="bg-ortho-blue/20">
            <CardTitle className="text-lg">Pedidos Recentes</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderHistory.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.patientName}</TableCell>
                      <TableCell className="font-bold text-ortho-orange">{order.calculatedNumber}</TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="text-green-600">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
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
