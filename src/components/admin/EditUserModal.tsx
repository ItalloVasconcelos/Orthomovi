
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, Save } from "lucide-react";
import { graphqlService, User as UserType } from "@/services/graphqlService";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface EditUserModalProps {
  user: UserType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserUpdated: () => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  open,
  onOpenChange,
  onUserUpdated,
}) => {
  const { toast } = useToast();
  const { token } = useAuth();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user?.id || !token) return;
    
    setIsLoading(true);
    
    try {
      await graphqlService.updateUser(token, user.id, {
        fullname: formData.fullname,
        email: formData.email,
        phone: formData.phone,
      });
      
      toast({
        title: "Usuário atualizado",
        description: "As informações do usuário foram salvas com sucesso.",
      });
      
      onUserUpdated();
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o usuário. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'max-w-[95vw] max-h-[90vh]' : 'max-w-md'} bg-white overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Editar Usuário
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  id="name" 
                  value={formData.fullname}
                  onChange={(e) => handleInputChange('fullname', e.target.value)}
                  className="pl-10 h-12" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  id="email" 
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10 h-12" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Celular</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input 
                  id="phone" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10 h-12" 
                />
              </div>
            </div>
          </div>

          <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'justify-end space-x-4'}`}>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className={isMobile ? 'w-full' : ''}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isLoading}
              className={`${isMobile ? 'w-full' : ''} bg-gradient-to-r from-brand-button-start to-brand-button-end hover:from-brand-button-start-dark hover:to-brand-button-end-dark h-12 px-6 text-white`}
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
