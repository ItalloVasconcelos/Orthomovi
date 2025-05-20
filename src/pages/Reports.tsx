
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  LogOut, 
  FileText,
  BarChart,
  LineChart,
  PieChart,
  Download,
  Calendar,
  Filter
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart as RechartsBarChart,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for charts
const monthlyData = [
  { name: 'Jan', pedidos: 4 },
  { name: 'Fev', pedidos: 3 },
  { name: 'Mar', pedidos: 5 },
  { name: 'Abr', pedidos: 7 },
  { name: 'Mai', pedidos: 4 },
  { name: 'Jun', pedidos: 6 },
];

const weeklyProgressData = [
  { name: 'Semana 1', progresso: 75 },
  { name: 'Semana 2', progresso: 80 },
  { name: 'Semana 3', progresso: 85 },
  { name: 'Semana 4', progresso: 90 },
  { name: 'Semana 5', progresso: 88 },
  { name: 'Semana 6', progresso: 92 },
  { name: 'Semana 7', progresso: 95 },
  { name: 'Semana 8', progresso: 98 },
];

const typeDistributionData = [
  { name: 'AFO Bilateral', value: 45 },
  { name: 'AFO Unilateral', value: 30 },
  { name: 'SMO Bilateral', value: 15 },
  { name: 'SMO Unilateral', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Reports = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
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

  const handleDownloadReport = () => {
    toast({
      title: "Relatório sendo gerado",
      description: "O download do relatório começará em instantes.",
    });
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
              <BreadcrumbPage>Relatórios</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            <FileText className="inline-block mr-2 text-ortho-orange" />
            Relatórios
          </h1>
          <p className="text-gray-600">Visualize estatísticas e análises detalhadas sobre o tratamento</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Período: Último Ano
            </Button>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
          <Button 
            onClick={handleDownloadReport}
            className="bg-ortho-orange hover:bg-ortho-orange-dark"
          >
            <Download className="mr-2 h-4 w-4" />
            Baixar Relatório Completo
          </Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 sm:grid-cols-4 md:w-[600px]">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="progress">Progresso</TabsTrigger>
            <TabsTrigger value="distribution">Distribuição</TabsTrigger>
            <TabsTrigger value="details">Detalhes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card className="shadow-md">
              <CardHeader className="bg-ortho-blue/20 pb-2">
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 text-ortho-orange" size={20} />
                  Pedidos por Mês
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={monthlyData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pedidos" fill="#F97316" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  O gráfico mostra o número de pedidos realizados por mês nos últimos 6 meses.
                </p>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="shadow-md">
                <CardHeader className="bg-ortho-blue/20 pb-2">
                  <CardTitle>Resumo</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total de Pedidos:</span>
                      <span className="font-semibold">29</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Média Mensal:</span>
                      <span className="font-semibold">4.8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Período de Tratamento:</span>
                      <span className="font-semibold">18 meses</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Progresso Estimado:</span>
                      <span className="font-semibold text-green-600">92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader className="bg-ortho-blue/20 pb-2">
                  <CardTitle>Status Atual</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pedidos Concluídos:</span>
                      <span className="font-semibold">25</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pedidos em Processamento:</span>
                      <span className="font-semibold text-blue-600">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pedidos Pendentes:</span>
                      <span className="font-semibold text-yellow-600">1</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Último Pedido:</span>
                      <span className="font-semibold">15/05/2025</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-4">
            <Card className="shadow-md">
              <CardHeader className="bg-ortho-blue/20 pb-2">
                <CardTitle className="flex items-center">
                  <LineChart className="mr-2 text-ortho-orange" size={20} />
                  Evolução do Tratamento
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={weeklyProgressData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="progresso" stroke="#0ea5e9" strokeWidth={2} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  O gráfico mostra a evolução percentual do progresso do tratamento nas últimas 8 semanas.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="distribution" className="space-y-4">
            <Card className="shadow-md">
              <CardHeader className="bg-ortho-blue/20 pb-2">
                <CardTitle className="flex items-center">
                  <PieChart className="mr-2 text-ortho-orange" size={20} />
                  Distribuição por Tipo de Órtese
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={typeDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {typeDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  O gráfico mostra a distribuição percentual dos diferentes tipos de órteses solicitados.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <Card className="shadow-md">
              <CardHeader className="bg-ortho-blue/20 pb-2">
                <CardTitle>Relatórios Detalhados Disponíveis</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50">
                    <div>
                      <h3 className="font-medium">Relatório de Progresso Mensal</h3>
                      <p className="text-sm text-gray-600">Detalhes completos sobre o progresso mensal do tratamento</p>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Baixar
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50">
                    <div>
                      <h3 className="font-medium">Análise Comparativa</h3>
                      <p className="text-sm text-gray-600">Comparação dos resultados obtidos com as expectativas iniciais</p>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Baixar
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50">
                    <div>
                      <h3 className="font-medium">Histórico de Medições</h3>
                      <p className="text-sm text-gray-600">Registro detalhado de todas as medições realizadas</p>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Baixar
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50">
                    <div>
                      <h3 className="font-medium">Recomendações Técnicas</h3>
                      <p className="text-sm text-gray-600">Sugestões e orientações técnicas para melhores resultados</p>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Baixar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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

export default Reports;
