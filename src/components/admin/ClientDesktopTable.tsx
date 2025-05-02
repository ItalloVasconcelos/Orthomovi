
import React from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ClientSubmission = {
  id: string;
  name: string;
  email: string;
  submissionDate: string;
  calculatedSize: string;
  status: string;
  measurements: {
    a: number;
    b: number;
    c: number;
    d: number;
  };
};

interface ClientDesktopTableProps {
  clients: ClientSubmission[];
  onViewDetails: (client: ClientSubmission) => void;
  handleStatusChange: (clientId: string, newStatus: string) => void;
  getStatusClass: (status: string) => string;
}

export const ClientDesktopTable: React.FC<ClientDesktopTableProps> = ({
  clients,
  onViewDetails,
  handleStatusChange,
  getStatusClass,
}) => {
  return (
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
          {clients.map((client) => (
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
                  onClick={() => onViewDetails(client)}
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
  );
};
