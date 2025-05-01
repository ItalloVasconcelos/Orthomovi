
import React, { useState } from "react";
import { Search, Eye, X } from "lucide-react";
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
  DialogClose,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  {
    id: "6",
    name: "Carlos Mendes",
    email: "carlos.mendes@gmail.com",
    submissionDate: "16/04/2023",
    calculatedSize: "21.5",
    status: "Pendente",
    measurements: {
      a: 7.9,
      b: 11.8,
      c: 18.2,
      d: 5.3,
    },
  },
  {
    id: "7",
    name: "Julia Rodrigues",
    email: "julia.rodrigues@hotmail.com",
    submissionDate: "15/04/2023",
    calculatedSize: "24.5",
    status: "Concluído",
    measurements: {
      a: 9.5,
      b: 13.4,
      c: 20.3,
      d: 6.2,
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
  const [clientData, setClientData] = useState(clientSubmissions);

  const itemsPerPage = 5;

  // Filter clients based on search query and status filter
  const filteredClients = clientData.filter((client) => {
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
  const totalResults = filteredClients.length;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalResults);

  const handleViewDetails = (client: typeof clientSubmissions[0]) => {
    setSelectedClient(client);
    setIsDetailsModalOpen(true);
  };

  const handleStatusChange = (clientId: string, newStatus: string) => {
    setClientData((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId ? { ...client, status: newStatus } : client
      )
    );
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

          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as Status | "")}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os status</SelectItem>
              <SelectItem value="Pendente">Pendente</SelectItem>
              <SelectItem value="Em análise">Em análise</SelectItem>
              <SelectItem value="Concluído">Concluído</SelectItem>
            </SelectContent>
          </Select>
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
                    <Select
                      defaultValue={client.status}
                      onValueChange={(value) => handleStatusChange(client.id, value)}
                    >
                      <SelectTrigger className={`h-8 w-32 px-2 ${getStatusClass(client.status)}`}>
                        <SelectValue placeholder={client.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                        <SelectItem value="Em análise">Em análise</SelectItem>
                        <SelectItem value="Concluído">Concluído</SelectItem>
                      </SelectContent>
                    </Select>
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
              onStatusChange={(newStatus) => handleStatusChange(client.id, newStatus)}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-col gap-2">
          <p className="text-sm text-gray-500 text-center">
            Mostrando {startIndex}–{endIndex} de {totalResults} resultados
          </p>
          
          {totalPages > 0 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                    }}
                    aria-disabled={currentPage === 1}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  >
                    Anterior
                  </PaginationPrevious>
                </PaginationItem>

                {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                  // Show at most 5 numbered pages, centering around the current page
                  let pageNum = index + 1;
                  if (totalPages > 5) {
                    if (currentPage > 3) {
                      pageNum = currentPage - 3 + index;
                      if (pageNum > totalPages - 5) {
                        pageNum = totalPages - 5 + index + 1;
                      }
                    }
                  }
                  
                  if (pageNum <= totalPages) {
                    return (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(pageNum);
                          }}
                          isActive={currentPage === pageNum}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  return null;
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    }}
                    aria-disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  >
                    Próxima
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </main>

      {/* Details Modal with improved layout */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogClose className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </DialogClose>
          
          <DialogHeader>
            <DialogTitle className="pr-6">
              Detalhes da Medição de{" "}
              {selectedClient ? selectedClient.name : ""}
            </DialogTitle>
            {selectedClient && (
              <p className="text-sm text-gray-500 mt-1">{selectedClient.email}</p>
            )}
          </DialogHeader>
          
          {selectedClient && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="text-center py-3">
                  <div className="text-sm text-gray-500 mb-1">Nº Calculado</div>
                  <div className="text-4xl font-bold text-ortho-orange">
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
                
                <div className="border-t pt-4">
                  <div className="text-sm font-medium mb-2">Status atual</div>
                  <Select
                    defaultValue={selectedClient.status}
                    onValueChange={(value) => handleStatusChange(selectedClient.id, value)}
                  >
                    <SelectTrigger className={`w-full ${getStatusClass(selectedClient.status)}`}>
                      <SelectValue placeholder={selectedClient.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Em análise">Em análise</SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
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
