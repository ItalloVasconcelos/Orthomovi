
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const MINIO_ENDPOINT = 'https://orthomovi-minio.t2wird.easypanel.host';
const BUCKET_NAME = 'orthomovi';

// Configuração do cliente S3 para MinIO
const s3Client = new S3Client({
  endpoint: MINIO_ENDPOINT,
  region: 'us-east-1', // MinIO aceita qualquer região
  credentials: {
    accessKeyId: 'admin',
    secretAccessKey: 'password',
  },
  forcePathStyle: true, // Necessário para MinIO
});

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export const minioService = {
  /**
   * Faz upload de uma imagem para o MinIO
   */
  async uploadImage(file: File, orderId: string, imageType: string): Promise<UploadResult> {
    try {
      const timestamp = Date.now();
      const fileName = `orders/${orderId}/${imageType}_${timestamp}.${file.name.split('.').pop()}`;
      
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: file,
        ContentType: file.type,
      });

      await s3Client.send(command);
      
      // Constrói a URL pública da imagem
      const imageUrl = `${MINIO_ENDPOINT}/${BUCKET_NAME}/${fileName}`;
      
      return {
        success: true,
        url: imageUrl,
      };
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  },

  /**
   * Gera uma URL assinada para download/visualização da imagem
   */
  async getSignedImageUrl(imageKey: string, expiresIn: number = 3600): Promise<string | null> {
    try {
      const command = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: imageKey,
      });

      const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
      return signedUrl;
    } catch (error) {
      console.error('Erro ao gerar URL assinada:', error);
      return null;
    }
  },
};
