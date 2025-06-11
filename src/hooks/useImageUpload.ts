
import { useState } from 'react';
import { minioService, UploadResult } from '@/services/minioService';
import { graphqlService } from '@/services/graphqlService';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface ImageUploadProgress {
  [key: string]: {
    uploading: boolean;
    progress: number;
    error?: string;
    url?: string;
  };
}

export const useImageUpload = () => {
  const { token, user } = useAuth();
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState<ImageUploadProgress>({});

  const uploadImage = async (
    file: File, 
    orderId: string, 
    imageType: string
  ): Promise<UploadResult> => {
    if (!token) {
      return { success: false, error: 'Token de autenticação não encontrado' };
    }

    if (!user?.id) {
      return { success: false, error: 'Usuário não autenticado' };
    }

    const uploadKey = `${orderId}_${imageType}`;
    
    // Atualiza o progresso
    setUploadProgress(prev => ({
      ...prev,
      [uploadKey]: { uploading: true, progress: 0 }
    }));

    try {
      // 1. Verifica se a ordem existe, se não existir, cria uma temporária
      const orderExists = await graphqlService.checkOrderExists(token, orderId);
      
      if (!orderExists) {
        console.log('useImageUpload: Ordem não existe, criando ordem temporária:', orderId);
        const tempOrder = await graphqlService.createTempOrder(token, orderId, user.id);
        
        if (!tempOrder) {
          throw new Error('Falha ao criar ordem temporária');
        }
        
        console.log('useImageUpload: Ordem temporária criada com sucesso:', tempOrder);
      }

      setUploadProgress(prev => ({
        ...prev,
        [uploadKey]: { ...prev[uploadKey], progress: 25 }
      }));

      // 2. Upload para MinIO
      const uploadResult = await minioService.uploadImage(file, orderId, imageType);
      
      if (!uploadResult.success || !uploadResult.url) {
        throw new Error(uploadResult.error || 'Falha no upload para MinIO');
      }

      setUploadProgress(prev => ({
        ...prev,
        [uploadKey]: { ...prev[uploadKey], progress: 75 }
      }));

      // 3. Salva URL no Hasura
      const imageRecord = await graphqlService.insertImage(token, orderId, uploadResult.url);
      
      if (!imageRecord) {
        throw new Error('Falha ao salvar imagem no banco de dados');
      }

      setUploadProgress(prev => ({
        ...prev,
        [uploadKey]: { 
          uploading: false, 
          progress: 100, 
          url: uploadResult.url 
        }
      }));

      toast({
        title: "Imagem enviada",
        description: `${imageType} foi enviada com sucesso!`,
      });

      return uploadResult;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      setUploadProgress(prev => ({
        ...prev,
        [uploadKey]: { 
          uploading: false, 
          progress: 0, 
          error: errorMessage 
        }
      }));

      toast({
        title: "Erro no upload",
        description: errorMessage,
        variant: "destructive",
      });

      return { success: false, error: errorMessage };
    }
  };

  const clearProgress = (orderId: string, imageType: string) => {
    const uploadKey = `${orderId}_${imageType}`;
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[uploadKey];
      return newProgress;
    });
  };

  return {
    uploadImage,
    uploadProgress,
    clearProgress,
  };
};
