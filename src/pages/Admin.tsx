
import React, { useState } from "react";
import { ClientSubmissionCard } from "@/components/ClientSubmissionCard";
import { ClientFilters } from "@/components/admin/ClientFilters";
import { ClientDesktopTable } from "@/components/admin/ClientDesktopTable";
import { ClientPagination } from "@/components/admin/ClientPagination";
import { ClientDetailsModal } from "@/components/admin/ClientDetailsModal";
import { Button } from "@/components/ui/button";
import { useClientDataService, type ClientSubmission } from "@/services/clientDataService";

type Status = "Pendente" | "Em análise" | "Concluído";

const AdminPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClient, setSelectedClient] = useState<ClientSubmission | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { clientData, getStatusClass, handleStatusChange } = useClientDataService();
  
  const itemsPerPage = 5;

  // Filter clients based on search query and status filter
  const filteredClients = clientData.filter((client) => {
    const matchesSearch =
      searchQuery === "" ||
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "" || statusFilter === "all" || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalResults = filteredClients.length;
  const startIndex = totalResults > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalResults);

  const handleViewDetails = (client: ClientSubmission) => {
    setSelectedClient(client);
    setIsDetailsModalOpen(true);
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

        <ClientFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Desktop Table View */}
        <ClientDesktopTable 
          clients={paginatedClients}
          onViewDetails={handleViewDetails}
          handleStatusChange={handleStatusChange}
          getStatusClass={getStatusClass}
        />

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
        <ClientPagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalResults={totalResults}
          setCurrentPage={setCurrentPage}
        />
      </main>

      {/* Details Modal */}
      <ClientDetailsModal
        isOpen={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        client={selectedClient}
        onStatusChange={handleStatusChange}
        getStatusClass={getStatusClass}
      />
    </div>
  );
};

export default AdminPanel;
