
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, UserX } from "lucide-react";

interface InactivateUserModalProps {
  user: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InactivateUserModal: React.FC<InactivateUserModalProps> = ({
  user,
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleInactivate = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Usuário inativado",
        description: `${user?.name} foi inativado com sucesso.`,
      });
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
            Inativar Usuário
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <UserX className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-gray-600">
              Tem certeza que deseja inativar o usuário <strong>{user?.name}</strong>?
            </p>
            <p className="text-sm text-gray-500 mt-2">
              O usuário não poderá mais acessar o sistema até ser reativado.
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleInactivate}
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600 text-white h-12 px-6"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Inativando...
                </>
              ) : (
                <>
                  <UserX className="mr-2 h-4 w-4" />
                  Inativar
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
