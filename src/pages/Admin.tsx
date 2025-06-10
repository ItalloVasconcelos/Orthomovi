import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, FileText, Settings, Search, Filter, ChevronDown, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { UserDropdown } from "@/components/UserDropdown";
import { ClientDetailsModal } from "@/components/admin/ClientDetailsModal";
import { graphqlService, Result } from "@/services/graphqlService";
import { formatDate } from "@/utils/dateUtils";
import { useAuth } from "@/contexts/AuthContext"; // PASSO 1: Importar o useAuth

const AdminPanel = () => {
  const { toast } = useToast();
  const { token, loading: authLoading } = useAuth(); // PASSO 2: Pegar o token e o estado de loading do contexto

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [results, setResults] = useState<Result[]>([]);
  const [pageLoading, setPageLoading] = useState(true); // Loading específico da página
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // PASSO 3: Só busca os dados se a autenticação já foi checada E se temos um token
    if (!authLoading && token) {
      const fetchResults = async () => {
        setPageLoading(true);
        try {
          // PASSO 4: Passa o token para a chamada do serviço
          const data = await graphqlService.getAllResults(token);
          setResults(data);
        } catch (error) {
          console.error('Erro ao carregar resultados:', error);
          toast({
            title: "Erro de Permissão",
            description: "Não foi possível carregar os pedidos. Verifique se você é um administrador.",
            variant: "destructive",
          });
        } finally {
          setPageLoading(false);
        }
      };
      fetchResults();
    } else if (!authLoading) {
      // Se não há token, paramos o loading da página
      setPageLoading(false);
    }
  }, [authLoading, token, toast]); // PASSO 5: O efeito depende do token

  // ... (O resto das suas funções `getStatusValue`, `filteredResults`, etc., continua igual)
  const getStatusValue = (status: any): string => (Array.isArray(status) ? status[0] : status) || 'Análise';
  const getStatusBadge = (status: any): React.ReactNode => { /* ... sua lógica de badge ... */ return <span>{getStatusValue(status)}</span> };
  const filteredResults = results.filter(r => (r.order?.user?.fullname || '').toLowerCase().includes(searchTerm.toLowerCase()));
  const handleViewDetails = (result: Result) => { setSelectedResult(result); setIsModalOpen(true); };
  const handleStatusChange = (resultId: string, newStatus: string) => { setResults(prev => prev.map(r => r.id === resultId ? { ...r, status: newStatus } : r)); };

  return (
      <div className="min-h-screen flex flex-col bg-brand-bg">
        <header className="py-4 px-4 bg-brand-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">O</span>
                </div>
                <span className="text-xl font-heading font-bold text-brand-text">Orthomovi</span>
              </Link>
              <UserDropdown />
            </div>
          </div>
        </header>

        <div className="container mx-auto py-4 px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">Início</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Painel Administrativo</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-brand-text mb-2">Painel Administrativo</h1>
            <p className="text-brand-text-light">Gerencie pedidos, usuários e configurações do sistema</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <Card className="shadow-md">
                <CardHeader className="bg-brand-bg-beige pb-2"><CardTitle className="text-lg">Menu</CardTitle></CardHeader>
                <CardContent className="p-0">
                  <nav className="flex flex-col">
                    <Link to="/admin" className="flex items-center px-4 py-3 bg-brand-accent/10 border-l-4 border-brand-accent"><FileText className="mr-2 text-brand-accent" size={18} /><span>Pedidos</span></Link>
                    <Link to="/admin/users" className="flex items-center px-4 py-3 hover:bg-gray-50"><Users className="mr-2 text-gray-500" size={18} /><span>Usuários</span></Link>
                    <Link to="/admin/config" className="flex items-center px-4 py-3 hover:bg-gray-50"><Settings className="mr-2 text-gray-500" size={18} /><span>Configurações</span></Link>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <Card className="shadow-md">
                <CardHeader className="bg-brand-bg-beige pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <CardTitle className="text-lg mb-2 sm:mb-0">Fila de Pedidos</CardTitle>
                  {/* ... Seus filtros aqui ... */}
                </CardHeader>
                <CardContent>
                  {pageLoading ? (
                      <div className="text-center py-16">
                        <p className="text-gray-500">Carregando pedidos...</p>
                      </div>
                  ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                          </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                          {filteredResults.length > 0 ? (
                              filteredResults.map((result) => (
                                  <tr key={result.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.order?.user?.fullname || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-brand-accent">{result.calculated_result || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(result.date)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(result.status)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                      <Button variant="outline" size="sm" onClick={() => handleViewDetails(result)}>Ver detalhes</Button>
                                    </td>
                                  </tr>
                              ))
                          ) : (
                              <tr><td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">Nenhum pedido encontrado.</td></tr>
                          )}
                          </tbody>
                        </table>
                      </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <ClientDetailsModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} result={selectedResult} onStatusChange={handleStatusChange} />
      </div>
  );
};

export default AdminPanel;
