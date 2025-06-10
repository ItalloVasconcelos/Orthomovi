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
import { useAuth } from "@/contexts/AuthContext";

const AdminPanel = () => {
  const { toast } = useToast();
  const { token, loading: authLoading, isAdmin } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && token && isAdmin) {
      const fetchResults = async () => {
        setLoading(true);
        try {
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
          setLoading(false);
        }
      };
      fetchResults();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [authLoading, token, isAdmin, toast]);

  const getStatusValue = (status: any): string => (Array.isArray(status) ? status[0] : status) || 'Análise';

  const getStatusBadge = (status: any): React.ReactNode => {
    const normalizedStatus = getStatusValue(status).toLowerCase();
    if (normalizedStatus === 'análise') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />Análise</span>;
    if (normalizedStatus === 'aprovado') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Aprovado</span>;
    if (normalizedStatus === 'recusado') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Recusado</span>;
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"><AlertCircle className="w-3 h-3 mr-1" />{getStatusValue(status)}</span>;
  };

  const filteredResults = results.filter(result => {
    const patientName = result.order?.user?.fullname || '';
    const matchesSearch = patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.id.toLowerCase().includes(searchTerm.toLowerCase());
    const resultStatus = getStatusValue(result.status);
    const matchesStatus = statusFilter === "all" || resultStatus.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (result: Result) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (resultId: string, newStatus: string) => {
    if (!token) return;
    try {
      await graphqlService.updateResultStatus(token, resultId, newStatus);
      setResults(prev => prev.map(r => r.id === resultId ? { ...r, status: newStatus } : r));
      toast({ title: "Status atualizado!" });
    } catch (error) {
      toast({ title: "Erro ao atualizar status", variant: "destructive" });
      console.error(error);
    }
  };

  return (
      <div className="min-h-screen flex flex-col bg-brand-bg">
        <header className="py-4 px-4 bg-brand-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
          <div className="container mx-auto">
            <div className="flex justify-between items-center"><Link to="/" className="flex items-center space-x-2"><div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center"><span className="text-white font-bold text-sm">O</span></div><span className="text-xl font-heading font-bold text-brand-text">Orthomovi</span></Link><UserDropdown /></div>
          </div>
        </header>

        <div className="container mx-auto py-4 px-4">
          <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">Início</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Painel Administrativo</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
        </div>

        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="mb-8"><h1 className="text-3xl font-heading font-bold text-brand-text mb-2">Painel Administrativo</h1><p className="text-brand-text-light">Gerencie pedidos, usuários e configurações do sistema</p></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card className="shadow-md"><CardHeader className="bg-brand-bg-beige pb-2"><CardTitle className="text-lg">Menu</CardTitle></CardHeader><CardContent className="p-0"><nav className="flex flex-col"><Link to="/admin" className="flex items-center px-4 py-3 bg-brand-accent/10 border-l-4 border-brand-accent"><FileText className="mr-2 text-brand-accent" size={18} /><span>Pedidos</span></Link><Link to="/admin/users" className="flex items-center px-4 py-3 hover:bg-gray-50"><Users className="mr-2 text-gray-500" size={18} /><span>Usuários</span></Link><Link to="/admin/config" className="flex items-center px-4 py-3 hover:bg-gray-50"><Settings className="mr-2 text-gray-500" size={18} /><span>Configurações</span></Link></nav></CardContent></Card>
            </div>
            <div className="md:col-span-3">
              <Card className="shadow-md">
                <CardHeader className="bg-brand-bg-beige pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <CardTitle className="text-lg mb-2 sm:mb-0">Fila de Pedidos</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative"><Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} /><Input placeholder="Buscar pedidos..." className="pl-8 h-9 text-sm w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
                    <div className="relative"><select className="h-9 px-3 rounded-md border border-input bg-background text-sm w-full" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="all">Todos</option><option value="análise">Análise</option><option value="aprovado">Aprovado</option><option value="recusado">Recusado</option></select></div>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                      <div className="text-center py-16"><p className="text-gray-500">Carregando pedidos...</p></div>
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
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><Button variant="outline" size="sm" onClick={() => handleViewDetails(result)}>Ver detalhes</Button></td>
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
