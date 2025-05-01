
import React, { useState } from "react";
import { Search, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ClientSubmissionCard } from "@/components/ClientSubmissionCard";

// Mock data for demonstration
const clientSubmissions = [
  {
    id: "1",
    name: "Ana Clara Silva",
    email: "ana.silva@gmail.com",
    submissionDate: "21/04/2023",
    calculatedSize: "24",
    status: "Concluído",
    measurements: {
      a: 9.3,
      b: 13.2,
      c: 20.1,
      d: 6.1,
    },
  },
  {
    id: "2",
    name: "Lucas Oliveira",
    email: "lucas.oliveira@hotmail.com",
    submissionDate: "20/04/2023",
    calculatedSize: "23.5",
    status: "Em análise",
    measurements: {
      a: 8.9,
      b: 12.8,
      c: 19.5,
      d: 5.9,
    },
  },
  {
    id: "3",
    name: "Mariana Santos",
    email: "mariana.santos@gmail.com",
    submissionDate: "19/04/2023",
    calculatedSize: "22",
    status: "Pendente",
    measurements: {
      a: 8.2,
      b: 12.1,
      c: 18.7,
      d: 5.5,
    },
  },
  {
    id: "4",
    name: "Pedro Costa",
    email: "pedro.costa@outlook.com",
    submissionDate: "18/04/2023",
    calculatedSize: "25",
    status: "Concluído",
    measurements: {
      a: 9.8,
      b: 13.7,
      c: 21.0,
      d: 6.4,
    },
  },
  {
    id: "5",
    name: "Fernanda Lima",
    email: "fernanda.lima@gmail.com",
    submissionDate: "17/04/2023",
    calculatedSize: "23",
    status: "Em análise",
    measurements: {
      a: 8.7,
      b: 12.5,
      c: 19.2,
      d: 5.8,
    },
  },
];

type Status = "Pendente" | "Em análise" | "Concluído";

const AdminPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClient, setSelectedClient] = useState<typeof clientSubmissions[0] | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const itemsPerPage = 10;

  // Filter clients based on search query and status filter
  const filteredClients = clientSubmissions.filter((client) => {
    const matchesSearch =
      searchQuery === "" ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "" || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (client: typeof clientSubmissions[0]) => {
    setSelectedClient(client);
    setIsDetailsModalOpen(true);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      case "Em análise":
        return "bg-blue-100 text-blue-800";
      case "Concluído":
        return "bg-green-100 text-green-800";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white py-4 px-6 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-ortho-orange">Orthomovi</h1>
          <Button variant="outline">Sair</Button>
        </div>
      </header>

      <main className="flex-grow px-4 py-6 container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Painel Administrativo</h1>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por nome ou e-mail"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Status | "")}
            className="px-4 py-2 border rounded-md w-full md:w-48"
          >
            <option value="">Todos os status</option>
            <option value="Pendente">Pendente</option>
            <option value="Em análise">Em análise</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block rounded-lg border bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Cliente</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Data de Envio</TableHead>
                <TableHead>Nº Calculado</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.submissionDate}</TableCell>
                  <TableCell className="font-bold">{client.calculatedSize}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                        client.status
                      )}`}
                    >
                      {client.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(client)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {paginatedClients.map((client) => (
            <ClientSubmissionCard 
              key={client.id} 
              client={client} 
              onViewDetails={() => handleViewDetails(client)} 
              statusClass={getStatusClass(client.status)}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                  }}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(index + 1);
                    }}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>

      {/* Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Detalhes da Medição de{" "}
              {selectedClient ? selectedClient.name : ""}
            </DialogTitle>
          </DialogHeader>
          
          {selectedClient && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-sm text-gray-500">Nº Calculado</div>
                  <div className="text-3xl font-bold text-ortho-orange">
                    {selectedClient.calculatedSize}
                  </div>
                </div>
                
                <div className="border-t pt-4 grid grid-cols-2 gap-3">
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-gray-500">Medida A</div>
                    <div className="font-medium">{selectedClient.measurements.a} cm</div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-gray-500">Medida B</div>
                    <div className="font-medium">{selectedClient.measurements.b} cm</div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-gray-500">Medida C</div>
                    <div className="font-medium">{selectedClient.measurements.c} cm</div>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-gray-500">Medida D</div>
                    <div className="font-medium">{selectedClient.measurements.d} cm</div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="text-sm font-medium mb-2">Fotos Enviadas</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['A', 'B', 'C', 'D'].map((photo) => (
                      <div key={photo} className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                        <span className="text-gray-400">Foto {photo}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsDetailsModalOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
