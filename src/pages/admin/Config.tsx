
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, Settings, Save, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { UserDropdown } from "@/components/UserDropdown";
import { graphqlService, UpdateCompanyConfigData } from "@/services/graphqlService";
import { useAuth } from "@/contexts/AuthContext";
import {Header} from "@/components/Header.tsx";
import {Footer} from "@/components/Footer.tsx";

const AdminConfigPage = () => {
  const { toast } = useToast();
  const { token, user, loading: authLoading, isAdmin } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [formData, setFormData] = useState<UpdateCompanyConfigData>({
    company_name: "",
    email: "",
    phone: "",
    cnpj: ""
  });

  useEffect(() => {
    if (!authLoading && token && isAdmin && user) {
      const fetchConfigData = async () => {
        setIsLoadingData(true);
        try {
          const data = await graphqlService.getAdminConfig(token, user.id);
          setFormData({
            company_name: data.config?.company_name || "",
            email: data.admin?.email || "",
            phone: data.admin?.phone || "",
            cnpj: data.config?.cnpj || ""
          });
        } catch (error) {
          console.error('Erro ao carregar configurações:', error);
          toast({
            title: "Erro ao carregar",
            description: "Não foi possível carregar os dados de configuração.",
            variant: "destructive",
          });
        } finally {
          setIsLoadingData(false);
        }
      };
      fetchConfigData();
    } else if (!authLoading) {
      setIsLoadingData(false);
    }
  }, [authLoading, token, isAdmin, user, toast]);

  const handleSaveSettings = async () => {
    if (!token || !user) {
      toast({ title: "Erro de autenticação", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      await graphqlService.updateCompanyConfig(token, user.id, formData);
      toast({
        title: "Configurações salvas",
        description: "As configurações do sistema foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as configurações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof UpdateCompanyConfigData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
      <div className="min-h-screen flex flex-col bg-brand-bg">
        <Header />
        <div className="container mx-auto py-4 px-4">
          <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">Início</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href="/admin">Painel Administrativo</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Configurações</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
        </div>
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="mb-8"><h1 className="text-3xl font-heading font-bold text-brand-text mb-2">Configurações do Sistema</h1><p className="text-brand-text-light">Configure os parâmetros gerais da plataforma</p></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card className="shadow-md"><CardHeader className="bg-brand-bg-beige pb-2"><CardTitle className="text-lg">Menu</CardTitle></CardHeader><CardContent className="p-0"><nav className="flex flex-col"><Link to="/admin" className="flex items-center px-4 py-3 hover:bg-gray-50"><FileText className="mr-2 text-gray-500" size={18} /><span>Pedidos</span></Link><Link to="/admin/users" className="flex items-center px-4 py-3 hover:bg-gray-50"><Users className="mr-2 text-gray-500" size={18} /><span>Usuários</span></Link><Link to="/admin/config" className="flex items-center px-4 py-3 bg-brand-accent/10 border-l-4 border-brand-accent"><Settings className="mr-2 text-brand-accent" size={18} /><span>Configurações</span></Link></nav></CardContent></Card>
            </div>
            <div className="md:col-span-3">
              <Card className="shadow-md">
                <CardHeader className="bg-brand-bg-beige pb-2"><CardTitle className="text-lg">Configurações Gerais</CardTitle></CardHeader>
                <CardContent className="pt-6 space-y-6">
                  {isLoadingData ? <div className="text-center py-16"><p>Carregando...</p></div> :
                      (
                          <>
                            <div>
                              <h3 className="text-base font-medium mb-3">Informações da Empresa</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2"><Label htmlFor="company-name">Nome da Empresa</Label><Input id="company-name" value={formData.company_name || ""} onChange={(e) => handleInputChange('company_name', e.target.value)} /></div>
                                <div className="space-y-2"><Label htmlFor="company-cnpj">CNPJ</Label><Input id="company-cnpj" value={formData.cnpj || ""} onChange={(e) => handleInputChange('cnpj', e.target.value)} /></div>
                              </div>
                            </div>
                            <Separator />
                            <div>
                              <h3 className="text-base font-medium mb-3">Contato Administrativo</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2"><Label htmlFor="contact-email">Email de Contato</Label><Input id="contact-email" value={formData.email || ""} onChange={(e) => handleInputChange('email', e.target.value)} /></div>
                                <div className="space-y-2"><Label htmlFor="contact-phone">Telefone</Label><Input id="contact-phone" value={formData.phone || ""} onChange={(e) => handleInputChange('phone', e.target.value)} /></div>
                              </div>
                            </div>
                          </>
                      )}
                </CardContent>
                <CardFooter className="flex justify-end pt-4 border-t"><Button onClick={handleSaveSettings} disabled={isLoading || isLoadingData}>{isLoading ? 'Salvando...' : 'Salvar Alterações'}</Button></CardFooter>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
  );
};
export default AdminConfigPage;
