
import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
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
import { Result, graphqlService } from "@/services/graphqlService";
import { formatDate } from "@/utils/dateUtils";
import { useToast } from "@/hooks/use-toast";

interface ClientDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  result: Result | null;
  onStatusChange?: (resultId: string, newStatus: string) => void;
}

export const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({
  isOpen,
  onOpenChange,
  result,
  onStatusChange,
}) => {
  const { toast } = useToast();

  if (!result) return null;

  const handleStatusChange = async (newStatus: string) => {
    try {
      const success = await graphqlService.updateResultStatus(result.id, newStatus);
      
      if (success && onStatusChange) {
        onStatusChange(result.id, newStatus);
        toast({
          title: "Status atualizado",
          description: `Status alterado para: ${newStatus}`,
        });
      } else {
        throw new Error("Falha ao atualizar status");
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="pr-6">
            Detalhes do Pedido #{result.id.slice(0, 8)}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informações do Paciente */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Informações do Paciente</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Nome</div>
                <div className="font-medium">{result.order?.user?.fullname || 'Nome não disponível'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">Email</div>
                <div className="font-medium text-sm">{result.order?.user?.email || 'Email não disponível'}</div>
              </div>
            </div>
          </div>

          {/* Resultado Calculado */}
          <div className="text-center py-4 bg-brand-accent/10 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Número Calculado</div>
            <div className="text-4xl font-bold text-brand-accent">
              {result.calculated_result}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Data: {formatDate(result.date)}
            </div>
          </div>
          
          {/* Medidas */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Medidas</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="border rounded-md p-3 text-center">
                <div className="text-sm text-gray-500 mb-1">Medida A</div>
                <div className="font-bold text-lg">
                  Em breve
                </div>
              </div>
              <div className="border rounded-md p-3 text-center">
                <div className="text-sm text-gray-500 mb-1">Medida H</div>
                <div className="font-bold text-lg">
                  Em breve
                </div>
              </div>
              <div className="border rounded-md p-3 text-center">
                <div className="text-sm text-gray-500 mb-1">Medida D</div>
                <div className="font-bold text-lg">
                  Em breve
                </div>
              </div>
            </div>
          </div>
          
          {/* Imagens (Placeholder) */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Imagens</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Medida A', 'Medida H', 'Medida D', 'Adicional'].map((label, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-gray-400 text-sm mb-1">📷</div>
                  <div className="text-gray-500 text-xs">{label}</div>
                  <div className="text-gray-400 text-xs mt-1">Em breve</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Status */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Status do Pedido</h3>
            {onStatusChange ? (
              <Select
                defaultValue={result.status}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={result.status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Análise">Em Análise</SelectItem>
                  <SelectItem value="Aprovado">Aprovado</SelectItem>
                  <SelectItem value="Recusado">Recusado</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="p-3 bg-gray-50 rounded-md">
                <span className="font-medium">{result.status}</span>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
