
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  Settings, 
  User, 
  LogOut,
  Search,
  Filter,
  ChevronDown,
  Edit,
  Trash2
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
import { UserDropdown } from "@/components/UserDropdown";
import { EditUserModal } from "@/components/admin/EditUserModal";
import { InactivateUserModal } from "@/components/admin/InactivateUserModal";

// Mock data for users
const mockUsers = [
  { 
    id: "USR-001", 
    name: "João Silva", 
    email: "joao.silva@example.com", 
    phone: "(11) 99999-9999",
    role: "Cliente",
    status: "active", 
    lastLogin: "2025-05-10" 
  },
  { 
    id: "USR-002", 
    name: "Maria Oliveira", 
    email: "maria.oliveira@example.com", 
    phone: "(11) 88888-8888",
    role: "Cliente",
    status: "active", 
    lastLogin: "2025-05-12" 
  },
  { 
    id: "USR-003", 
    name: "Pedro Santos", 
    email: "pedro.santos@example.com", 
    phone: "(11) 77777-7777",
    role: "Administrador",
    status: "active", 
    lastLogin: "2025-05-19" 
  },
  { 
    id: "USR-004", 
    name: "Ana Costa", 
    email: "ana.costa@example.com", 
    phone: "(11) 66666-6666",
    role: "Cliente",
    status: "inactive", 
    lastLogin: "2025-04-22" 
  },
  { 
    id: "USR-005", 
    name: "Lucas Ferreira", 
    email: "lucas.ferreira@example.com", 
    phone: "(11) 55555-5555",
    role: "Cliente",
    status: "active", 
    lastLogin: "2025-05-18" 
  },
];

const AdminUsersPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingUser, setEditingUser] = useState<any>(null);
  const [inactivatingUser, setInactivatingUser] = useState<any>(null);
  
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Ativo
          </span>
        );
      case "inactive":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Inativo
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Desconhecido
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
              <BreadcrumbLink href="/admin">Painel Administrativo</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Usuários</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gerenciamento de Usuários</h1>
          <p className="text-gray-600">Visualize e edite informações dos usuários do sistema</p>
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
                  <Link to="/admin/users" className="flex items-center px-4 py-3 bg-ortho-orange/10 border-l-4 border-ortho-orange">
                    <Users className="mr-2 text-ortho-orange" size={18} />
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
                <CardTitle className="text-lg mb-2 sm:mb-0">Lista de Usuários</CardTitle>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input 
                      placeholder="Buscar usuários..." 
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
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                      >
                        <option value="all">Todos os perfis</option>
                        <option value="cliente">Clientes</option>
                        <option value="administrador">Administradores</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    </div>
                    <div className="relative">
                      <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <select 
                        className="pl-8 h-9 rounded-md border border-input bg-background text-sm w-full"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">Todos os status</option>
                        <option value="active">Ativos</option>
                        <option value="inactive">Inativos</option>
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
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Celular</TableHead>
                        <TableHead>Perfil</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Último Login</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{getStatusBadge(user.status)}</TableCell>
                            <TableCell>{new Date(user.lastLogin).toLocaleDateString('pt-BR')}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setEditingUser(user)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => setInactivatingUser(user)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                            Nenhum usuário encontrado
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <p className="text-sm text-gray-500">
                  Mostrando {filteredUsers.length} de {mockUsers.length} usuários
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

      <EditUserModal 
        user={editingUser}
        open={!!editingUser}
        onOpenChange={() => setEditingUser(null)}
      />

      <InactivateUserModal 
        user={inactivatingUser}
        open={!!inactivatingUser}
        onOpenChange={() => setInactivatingUser(null)}
      />
    </div>
  );
};

export default AdminUsersPage;
