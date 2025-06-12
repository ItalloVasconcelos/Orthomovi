
import React, { useState, useEffect } from "react";
import { X, Save, Edit3 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Result, Image, graphqlService, UpdateResultMeasurementsData } from "@/services/graphqlService";
import { formatDate } from "@/utils/dateUtils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

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
  const { token } = useAuth();
  const [images, setImages] = useState<Image[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [editingMeasurements, setEditingMeasurements] = useState(false);
  const [measurements, setMeasurements] = useState({
    medida_a: 0,
    medida_b: 0,
    medida_c: 0,
    medida_d: 0,
  });

  useEffect(() => {
    if (result && token && isOpen) {
      const fetchImages = async () => {
        setLoadingImages(true);
        try {
          const orderImages = await graphqlService.getImagesByOrder(token, result.order.id);
          setImages(orderImages);
        } catch (error) {
          console.error('Erro ao carregar imagens:', error);
        } finally {
          setLoadingImages(false);
        }
      };
      
      fetchImages();

      // Inicializa as medidas com os valores do result
      setMeasurements({
        medida_a: result.medida_a || 0,
        medida_b: result.medida_b || 0,
        medida_c: result.medida_c || 0,
        medida_d: result.medida_d || 0,
      });
    }
  }, [result, token, isOpen]);

  if (!result) return null;

  const handleStatusChange = async (newStatus: string) => {
    if (!token) return;
    
    try {
      const success = await graphqlService.updateResultStatus(token, result.id, newStatus);
      
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

  const handleSaveMeasurements = async () => {
    if (!token) return;

    try {
      const measurementsData: UpdateResultMeasurementsData = {
        medida_a: measurements.medida_a,
        medida_b: measurements.medida_b,
        medida_c: measurements.medida_c,
        medida_d: measurements.medida_d,
      };

      const updatedResult = await graphqlService.updateResultMeasurements(
        token, 
        result.id, 
        measurementsData
      );

      if (updatedResult) {
        setEditingMeasurements(false);
        toast({
          title: "Medidas salvas",
          description: "As medidas foram atualizadas com sucesso!",
        });
      } else {
        throw new Error("Falha ao salvar medidas");
      }
    } catch (error) {
      console.error('Erro ao salvar medidas:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar as medidas. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleMeasurementChange = (field: keyof typeof measurements, value: string) => {
    const numericValue = parseFloat(value) || 0;
    setMeasurements(prev => ({
      ...prev,
      [field]: numericValue
    }));
  };

  const openImageInNewTab = (imageUrl: string) => {
    // Remove o endpoint do MinIO da URL e reconstrói uma URL pública
    const cleanUrl = imageUrl.replace('https://orthomovi-minio.t2wird.easypanel.host/', '');
    const publicUrl = `https://orthomovi-minio.t2wird.easypanel.host/orthomovi/${cleanUrl}`;
    window.open(publicUrl, '_blank');
  };

  const getImagesByType = () => {
    const imagesByType: { [key: string]: Image | undefined } = {
      'A': images.find(img => img.url.includes('foto_A')),
      'B': images.find(img => img.url.includes('foto_B')),
      'C': images.find(img => img.url.includes('foto_C')),
      'D': images.find(img => img.url.includes('foto_D')),
    };
    return imagesByType;
  };

  const imagesByType = getImagesByType();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
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
          
          {/* Imagens */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Imagens do PhotoWizard</h3>
            {loadingImages ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Carregando imagens...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { letter: 'A', label: 'Calcanhar' },
                  { letter: 'B', label: 'Largura' },
                  { letter: 'C', label: 'Comprimento' },
                  { letter: 'D', label: 'Circunferência' }
                ].map(({ letter, label }) => {
                  const image = imagesByType[letter];
                  return (
                    <div key={letter} className="aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                      {image ? (
                        <img 
                          src={image.url} 
                          alt={`Foto ${letter} - ${label}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          onClick={() => openImageInNewTab(image.url)}
                          onError={(e) => {
                            console.error('Erro ao carregar imagem:', image.url);
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                          <div className="text-gray-400 text-sm mb-1">📷</div>
                          <div className="text-gray-500 text-xs">Foto {letter}</div>
                          <div className="text-gray-500 text-xs">{label}</div>
                          <div className="text-gray-400 text-xs mt-1">Aguardando upload</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Medidas */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg">Medidas</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (editingMeasurements) {
                    handleSaveMeasurements();
                  } else {
                    setEditingMeasurements(true);
                  }
                }}
              >
                {editingMeasurements ? (
                  <>
                    <Save className="w-4 h-4 mr-1" />
                    Salvar
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 mr-1" />
                    Editar
                  </>
                )}
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'medida_a' as keyof typeof measurements, label: 'Medida A: Calcanhar', unit: 'cm' },
                { key: 'medida_b' as keyof typeof measurements, label: 'Medida B: Largura', unit: 'cm' },
                { key: 'medida_c' as keyof typeof measurements, label: 'Medida C: Comprimento', unit: 'cm' },
                { key: 'medida_d' as keyof typeof measurements, label: 'Medida D: Circunferência', unit: 'cm' }
              ].map(({ key, label, unit }) => (
                <div key={key} className="border rounded-md p-3">
                  <div className="text-sm text-gray-500 mb-2">{label}</div>
                  {editingMeasurements ? (
                    <Input
                      type="number"
                      step="0.1"
                      value={measurements[key]}
                      onChange={(e) => handleMeasurementChange(key, e.target.value)}
                      className="text-center font-bold"
                      placeholder="0.0"
                    />
                  ) : (
                    <div className="font-bold text-lg text-center">
                      {measurements[key] > 0 ? `${measurements[key]} ${unit}` : 'Não medido'}
                    </div>
                  )}
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
