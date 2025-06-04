import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Users, 
  FileText, 
  Settings, 
  User, 
  LogOut,
  Search,
  Filter,
  ChevronDown,
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
import { UserDropdown } from "@/components/UserDropdown";
import { ClientDetailsModal } from "@/components/admin/ClientDetailsModal";
import { graphqlService, Result } from "@/services/graphqlService";
import { formatDate } from "@/utils/dateUtils";

const AdminPanel = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const data = await graphqlService.getAllResults();
        setResults(data);
      } catch (error) {
        console.error('Erro ao carregar resultados:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os pedidos.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [toast]);

  const handleLogout = () => {
    toast({
      title: "Encerrando sessão",
      description: "Você será redirecionado para a página inicial.",
    });
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  const getStatusValue = (status: string | string[]): string => {
    if (Array.isArray(status)) {
      return status.length > 0 ? status[0] : 'Análise';
    }
    return status || 'Análise';
  };
  
  const filteredResults = results.filter(result => {
    const patientName = result.order?.user?.fullname || '';
    const matchesSearch = patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         result.id.toLowerCase().includes(searchTerm.toLowerCase());
    const resultStatus = getStatusValue(result.status);
    const matchesStatus = statusFilter === "all" || resultStatus.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: string | string[]) => {
    const normalizedStatus = getStatusValue(status);
    
    switch(normalizedStatus.toLowerCase()) {
      case "análise":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Análise
          </span>
        );
      case "aprovado":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Aprovado
          </span>
        );
      case "recusado":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Recusado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            {normalizedStatus}
          </span>
        );
    }
  };

  const handleViewDetails = (result: Result) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  const handleStatusChange = (resultId: string, newStatus: string) => {
    // Atualizar status local até implementar API
    setResults(prev => prev.map(result => 
      result.id === resultId 
        ? { ...result, status: newStatus }
        : result
    ));
    
    toast({
      title: "Status atualizado",
      description: `Status alterado para: ${newStatus}`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-ortho-blue/10">
      <header className="py-4 px-4 bg-white shadow-sm">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-ortho-orange">Orthomovi</Link>
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
              <BreadcrumbPage>Painel Administrativo</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie pedidos, usuários e configurações do sistema</p>
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
                  <Link to="/admin" className="flex items-center px-4 py-3 bg-ortho-orange/10 border-l-4 border-ortho-orange">
                    <FileText className="mr-2 text-ortho-orange" size={18} />
                    <span>Pedidos</span>
                  </Link>
                  <Link to="/admin/users" className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <Users className="mr-2 text-gray-500" size={18} />
                    <span>Usuários</span>
                  </Link>
                  <Link to="/admin/config" className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <Settings className="mr-2 text-gray-500" size={18} />
                    <span>Configurações</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-3">
            <Card className="shadow-md">
              <CardHeader className="bg-ortho-blue/20 pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <CardTitle className="text-lg mb-2 sm:mb-0">Fila de Pedidos</CardTitle>
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
                  <div className="relative">
                    <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <select 
                      className="pl-8 h-9 rounded-md border border-input bg-background text-sm w-full"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">Todos os status</option>
                      <option value="análise">Análise</option>
                      <option value="aprovado">Aprovado</option>
                      <option value="recusado">Recusado</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="text-sm text-gray-500">Carregando pedidos...</div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Paciente
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Número
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Data
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ações
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredResults.length > 0 ? (
                          filteredResults.map((result) => (
                            <tr key={result.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {result.id.slice(0, 8)}...
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {result.order?.user?.fullname || 'Nome não disponível'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-ortho-orange">
                                {result.calculated_result || 'N/A'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(result.date)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {getStatusBadge(result.status)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleViewDetails(result)}
                                >
                                  Ver detalhes
                                </Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                              {loading ? 'Carregando...' : 'Nenhum pedido encontrado'}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-gray-500">
                  Mostrando {filteredResults.length} de {results.length} pedidos
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
          </div>
        </div>
      </main>
      
      {/* Modal de Detalhes */}
      <ClientDetailsModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        result={selectedResult}
        onStatusChange={handleStatusChange}
      />
      
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

export default AdminPanel;
