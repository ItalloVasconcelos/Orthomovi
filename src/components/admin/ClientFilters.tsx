
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Status = "Pendente" | "Em análise" | "Concluído";

interface ClientFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: Status | "";
  setStatusFilter: (status: Status | "") => void;
}

export const ClientFilters: React.FC<ClientFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
}) => {
  return (
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
          <SelectItem value="all">Todos os status</SelectItem>
          <SelectItem value="Pendente">Pendente</SelectItem>
          <SelectItem value="Em análise">Em análise</SelectItem>
          <SelectItem value="Concluído">Concluído</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
