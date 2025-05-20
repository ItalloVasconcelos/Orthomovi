
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  LogOut, 
  History,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for orders
const mockOrders = [
  { 
    id: "ORD-001", 
    patientName: "João Silva (5 anos)", 
    date: "2025-05-15", 
    status: "completed", 
    type: "AFO Bilateral"
  },
  { 
    id: "ORD-002", 
    patientName: "Maria Oliveira (7 anos)", 
    date: "2025-05-01", 
    status: "processing", 
    type: "AFO Unilateral"
  },
  { 
    id: "ORD-003", 
    patientName: "Pedro Santos (3 anos)", 
    date: "2025-04-20", 
    status: "completed", 
    type: "SMO Bilateral"
  },
  { 
    id: "ORD-004", 
    patientName: "Ana Costa (6 anos)", 
    date: "2025-04-10", 
    status: "cancelled", 
    type: "AFO Bilateral"
  },
  { 
    id: "ORD-005", 
    patientName: "Lucas Ferreira (4 anos)", 
    date: "2025-03-28", 
    status: "completed", 
    type: "SMO Unilateral"
  },
];

const OrderHistory = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  
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
  
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesType = typeFilter === "all" || order.type.toLowerCase().includes(typeFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesType;
  });
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Em Processamento
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Concluído
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Desconhecido
          </span>
        );
    }
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
              <BreadcrumbPage>Histórico de Pedidos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            <History className="inline-block mr-2 text-ortho-orange" />
            Histórico de Pedidos
          </h1>
          <p className="text-gray-600">Visualize e acompanhe todos os seus pedidos anteriores</p>
        </div>
        
        <Card className="shadow-md">
          <CardHeader className="bg-ortho-blue/20 pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <CardTitle className="text-lg mb-2 sm:mb-0">Seus Pedidos</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  placeholder="Buscar pedidos..." 
                  className="pl-8 h-9 text-sm w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <select 
                    className="pl-8 h-9 rounded-md border border-input bg-background text-sm w-full"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Todos os status</option>
                    <option value="pending">Pendentes</option>
                    <option value="processing">Em processamento</option>
                    <option value="completed">Concluídos</option>
                    <option value="cancelled">Cancelados</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
                <div className="relative">
                  <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <select 
                    className="pl-8 h-9 rounded-md border border-input bg-background text-sm w-full"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  >
                    <option value="all">Todos os tipos</option>
                    <option value="afo">AFO</option>
                    <option value="smo">SMO</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.patientName}</TableCell>
                        <TableCell>{order.type}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {order.status === "completed" && (
                              <Button variant="outline" size="sm" className="text-green-600">
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        Nenhum pedido encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-gray-500">
              Mostrando {filteredOrders.length} de {mockOrders.length} pedidos
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm" disabled>
                Próximo
              </Button>
            </div>
          </CardFooter>
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

export default OrderHistory;
