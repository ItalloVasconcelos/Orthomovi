
import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ClientMeasurements = {
  a: number;
  b: number;
  c: number;
  d: number;
};

interface ClientDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  client: {
    id: string;
    name: string;
    email: string;
    status: string;
    calculatedSize: string;
    measurements: ClientMeasurements;
  } | null;
  onStatusChange: (clientId: string, newStatus: string) => void;
  getStatusClass: (status: string) => string;
}

export const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({
  isOpen,
  onOpenChange,
  client,
  onStatusChange,
  getStatusClass,
}) => {
  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogClose className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100">
          <X className="h-4 w-4" />
          <span className="sr-only">Fechar</span>
        </DialogClose>
        
        <DialogHeader>
          <DialogTitle className="pr-6">
            Detalhes da Medição de {client.name}
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-1">{client.email}</p>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="text-center py-3">
              <div className="text-sm text-gray-500 mb-1">Nº Calculado</div>
              <div className="text-4xl font-bold text-ortho-orange">
                {client.calculatedSize}
              </div>
            </div>
            
            <div className="border-t pt-4 grid grid-cols-2 gap-3">
              <div className="border rounded-md p-3">
                <div className="text-sm text-gray-500">Medida A</div>
                <div className="font-medium">{client.measurements.a} cm</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-gray-500">Medida B</div>
                <div className="font-medium">{client.measurements.b} cm</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-gray-500">Medida C</div>
                <div className="font-medium">{client.measurements.c} cm</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm text-gray-500">Medida D</div>
                <div className="font-medium">{client.measurements.d} cm</div>
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
                defaultValue={client.status}
                onValueChange={(value) => onStatusChange(client.id, value)}
              >
                <SelectTrigger className={`w-full ${getStatusClass(client.status)}`}>
                  <SelectValue placeholder={client.status} />
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
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
