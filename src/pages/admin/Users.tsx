
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Users, Settings, Search, Edit, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserDropdown } from "@/components/UserDropdown";
import { InactivateUserModal } from "@/components/admin/InactivateUserModal";
import { EditUserModal } from "@/components/admin/EditUserModal";
import { AdminMobileMenu } from "@/components/admin/AdminMobileMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { graphqlService, User, UpdateUserData } from "@/services/graphqlService";
import { useAuth } from "@/contexts/AuthContext";
import keycloak from "@/services/keycloak";
import {Header} from "@/components/Header.tsx";
import {Footer} from "@/components/Footer.tsx";

const AdminUsersPage = () => {
  const { toast } = useToast();
  const { token, loading: authLoading, isAdmin } = useAuth();
  const isMobile = useIsMobile();

  const [searchTerm, setSearchTerm] = useState("");
  const [inactivatingUser, setInactivatingUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    try {
      const usersData = await graphqlService.getAllUsers(token);
      setUsers(usersData);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      toast({
        title: "Erro ao buscar usuários",
        description: "Você pode não ter permissão para esta ação.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [token, toast]);

  useEffect(() => {
    if (!authLoading && token && isAdmin) {
      fetchUsers();
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [authLoading, token, isAdmin, fetchUsers]);

  const handleEditUserInKeycloak = (userId: string) => {
    if (keycloak.authServerUrl && keycloak.realm) {
      const adminUrl = `${keycloak.authServerUrl}/admin/${keycloak.realm}/console/#/realms/${keycloak.realm}/users/${userId}`;
      window.open(adminUrl, '_blank');
    }
  };

  const handleUserUpdated = () => {
    fetchUsers();
  };

  const filteredUsers = users.filter(user =>
      (user.fullname?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  // Componente de card mobile para usuários
  const UserMobileCard = ({ user }: { user: User }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{user.fullname}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">{user.phone || '-'}</p>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-3">
          <Button variant="outline" size="sm" onClick={() => setEditingUser(user)} title="Editar no App">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleEditUserInKeycloak(user.id)} title="Editar no Keycloak">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setInactivatingUser(user)} title="Inativar Usuário">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
      <div className="min-h-screen flex flex-col bg-brand-bg">
       <Header />

        <div className="container mx-auto py-4 px-4">
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="/">Início</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="/admin">Painel Administrativo</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Usuários</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            {isMobile && <AdminMobileMenu />}
          </div>
        </div>

        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-brand-text mb-2">Gerenciamento de Usuários</h1>
            <p className="text-brand-text-light">Visualize e edite informações dos usuários do sistema</p>
          </div>
          
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-4'} gap-6`}>
            {!isMobile && (
              <div className="md:col-span-1">
                <Card className="shadow-md">
                  <CardHeader className="bg-brand-bg-beige pb-2">
                    <CardTitle className="text-lg">Menu</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <nav className="flex flex-col">
                      <Link to="/admin" className="flex items-center px-4 py-3 hover:bg-gray-50">
                        <FileText className="mr-2 text-gray-500" size={18} />
                        <span>Pedidos</span>
                      </Link>
                      <Link to="/admin/users" className="flex items-center px-4 py-3 bg-brand-accent/10 border-l-4 border-brand-accent">
                        <Users className="mr-2 text-brand-accent" size={18} />
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
            )}
            
            <div className={isMobile ? 'col-span-1' : 'md:col-span-3'}>
              <Card className="shadow-md">
                <CardHeader className="bg-brand-bg-beige pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <CardTitle className="text-lg mb-2 sm:mb-0">Lista de Usuários</CardTitle>
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input 
                      placeholder="Buscar usuários..." 
                      className="pl-8 h-9 text-sm w-full" 
                      value={searchTerm} 
                      onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                  </div>
                </CardHeader>
                <CardContent className={isMobile ? 'p-2' : undefined}>
                  {isLoading ? (
                      <div className="text-center py-16"><p>Carregando usuários...</p></div>
                  ) : isMobile ? (
                    // Layout mobile com cards
                    <div className="space-y-4">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <UserMobileCard key={user.id} user={user} />
                        ))
                      ) : (
                        <p className="text-center py-8 text-gray-500">Nenhum usuário encontrado.</p>
                      )}
                    </div>
                  ) : (
                    // Layout desktop com tabela
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Celular</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.length > 0 ? (
                              filteredUsers.map((user) => (
                                  <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.fullname}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone || '-'}</TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex justify-end space-x-2">
                                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setEditingUser(user)} title="Editar no App">
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEditUserInKeycloak(user.id)} title="Editar no Keycloak">
                                          <Settings className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => setInactivatingUser(user)} title="Inativar Usuário">
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                              ))
                          ) : (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-gray-500">Nenhum usuário encontrado.</TableCell>
                              </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
        <InactivateUserModal 
          user={inactivatingUser} 
          open={!!inactivatingUser} 
          onOpenChange={() => setInactivatingUser(null)} 
        />
        <EditUserModal 
          user={editingUser} 
          open={!!editingUser} 
          onOpenChange={() => setEditingUser(null)} 
          onUserUpdated={handleUserUpdated} 
        />
      </div>
  );

};
export default AdminUsersPage;
