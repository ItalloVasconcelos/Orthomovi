
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from '@/hooks/use-mobile';
import { CheckCircle, Camera, RefreshCw, ArrowRight } from 'lucide-react';
import { usePhotoWizard, WizardStep } from '@/hooks/use-photo-wizard';

// Definição de quais etapas mostrar com base no passo atual
const WizardContent: React.FC = () => {
  const {
    currentStep,
    photoSteps,
    photos,
    startWizard,
    nextStep,
    savePhoto,
    retakePhoto,
    calculateMeasurements,
    getCurrentLetter,
    getCurrentPhotoStep,
    measurements,
    calculating
  } = usePhotoWizard();
  
  // Refs para input de arquivo e preview
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoUrl = reader.result as string;
        setPreviewImage(photoUrl);
        
        const letter = getCurrentLetter();
        if (letter) {
          savePhoto(letter, photoUrl);
        }
      };
      reader.readAsDataURL(file);
    }
    // Limpar o input para permitir selecionar o mesmo arquivo novamente
    if (event.target) {
      event.target.value = '';
    }
  };
  
  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleRetake = () => {
    const letter = getCurrentLetter();
    if (letter) {
      retakePhoto(letter);
      setPreviewImage(null);
    }
  };
  
  switch (currentStep) {
    // Tela inicial - Instruções
    case 0:
      return (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-ortho-orange">Vamos tirar as fotos da órtese?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-center">
              Você vai tirar 4 fotos específicas. Vamos te mostrar como fazer cada uma delas.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {photoSteps.map((step) => (
                <div key={step.id} className="bg-ortho-blue/30 p-3 rounded-lg">
                  <div className="relative aspect-square bg-ortho-blue mb-2 rounded-md overflow-hidden flex items-center justify-center">
                    <img 
                      src={step.letter === 'A' ? 'public/lovable-uploads/76b39874-aa23-4c6a-a410-ace0f77e9a1f.png' : 
                           step.letter === 'B' ? 'public/lovable-uploads/b0405de4-5bac-478d-93ee-f7f8460ea44e.png' :
                           step.letter === 'C' ? 'public/lovable-uploads/6af0c023-c3b5-495c-9298-d6a1a53c8a86.png' :
                           'public/lovable-uploads/6ea46f45-5818-4aee-972c-b4a1ddfc69c9.png'}
                      alt={`Exemplo de foto ${step.letter}`}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 flex items-center justify-center text-white font-bold rounded-tl-lg">
                      {step.letter}
                    </div>
                  </div>
                  <p className="text-sm text-center">Foto {step.letter}: {step.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pt-4">
            <Button 
              onClick={startWizard}
              className="w-full md:w-auto bg-ortho-orange hover:bg-ortho-orange-dark text-white font-medium py-3 px-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Começar agora
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      );
      
    // Passos de 1 a 4 - Captura de fotos
    case 1:
    case 2:
    case 3:
    case 4: {
      const photoStep = getCurrentPhotoStep();
      const letter = getCurrentLetter();
      const photoTaken = letter ? photos[letter] : false;
      
      if (!photoStep || !letter) return null;
      
      return (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-xl text-center text-ortho-orange">{photoStep.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-square bg-ortho-blue/30 rounded-lg overflow-hidden mb-4">
              {photoTaken ? (
                // Mostra a foto tirada
                <img 
                  src={photos[letter] || ''} 
                  alt={`Foto ${letter} capturada`}
                  className="w-full h-full object-contain"
                />
              ) : (
                // Mostra a imagem de referência
                <div className="relative w-full h-full">
                  <img 
                    src={letter === 'A' ? 'public/lovable-uploads/76b39874-aa23-4c6a-a410-ace0f77e9a1f.png' : 
                         letter === 'B' ? 'public/lovable-uploads/b0405de4-5bac-478d-93ee-f7f8460ea44e.png' :
                         letter === 'C' ? 'public/lovable-uploads/6af0c023-c3b5-495c-9298-d6a1a53c8a86.png' :
                         'public/lovable-uploads/6ea46f45-5818-4aee-972c-b4a1ddfc69c9.png'}
                    alt={`Exemplo de foto ${letter}`}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-2 left-2 bg-white/70 px-2 py-1 rounded text-sm font-medium">
                    Veja como posicionar a órtese
                  </div>
                </div>
              )}
            </div>
            
            <p className="text-center">{photoStep.instruction}</p>
            
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              capture="environment"
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            {photoTaken ? (
              <div className="flex w-full gap-3">
                <Button
                  variant="outline" 
                  onClick={handleRetake}
                  className="flex-1"
                >
                  <RefreshCw className="mr-2 w-4 h-4" />
                  Refazer Foto
                </Button>
                <Button 
                  onClick={nextStep}
                  className="flex-1 bg-ortho-orange hover:bg-ortho-orange-dark"
                >
                  {currentStep === 4 ? 'Finalizar' : 'Próxima Foto'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button 
                onClick={openFileSelector}
                className="w-full bg-ortho-orange hover:bg-ortho-orange-dark"
              >
                <Camera className="mr-2 w-4 h-4" />
                Abrir câmera
              </Button>
            )}
            
            <div className="flex w-full justify-between text-sm text-gray-500 mt-2">
              <span>Foto {currentStep} de 4</span>
              <span>{photoTaken && 'Foto OK'} {photoTaken && <CheckCircle className="inline-block w-4 h-4 text-green-500" />}</span>
            </div>
          </CardFooter>
        </Card>
      );
    }

    // Finalização e cálculo das medidas
    case 5:
      return (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-ortho-orange">
              Fotos capturadas com sucesso!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {calculating ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 border-4 border-ortho-orange border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg">Analisando com carinho...</p>
              </div>
            ) : measurements ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center mb-4">Resultados das Medidas</h3>
                <div className="grid gap-3">
                  <div className="bg-ortho-blue/20 p-4 rounded-lg flex justify-between items-center">
                    <span>Comprimento:</span>
                    <span className="font-bold text-lg">{measurements.comprimento} cm</span>
                  </div>
                  <div className="bg-ortho-blue/20 p-4 rounded-lg flex justify-between items-center">
                    <span>Largura:</span>
                    <span className="font-bold text-lg">{measurements.largura} cm</span>
                  </div>
                  <div className="bg-ortho-blue/20 p-4 rounded-lg flex justify-between items-center">
                    <span>Altura do calcanhar:</span>
                    <span className="font-bold text-lg">{measurements.altura_calcanhar} cm</span>
                  </div>
                  <div className="bg-ortho-blue/20 p-4 rounded-lg flex justify-between items-center">
                    <span>Circunferência total:</span>
                    <span className="font-bold text-lg">{measurements.circunferencia_total} cm</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-6">
                <div className="grid grid-cols-2 gap-3 w-full">
                  {Object.entries(photos).map(([letter, url]) => (
                    <div key={letter} className="aspect-square bg-ortho-blue/20 rounded-lg overflow-hidden relative">
                      <img 
                        src={url || undefined} 
                        alt={`Foto ${letter}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 flex items-center justify-center text-white font-bold">
                        {letter}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center pt-2">
            {!calculating && !measurements && (
              <Button 
                onClick={calculateMeasurements}
                className="w-full md:w-auto bg-ortho-orange hover:bg-ortho-orange-dark text-white font-medium py-3 px-6 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Calcular Medidas
              </Button>
            )}
          </CardFooter>
        </Card>
      );
    
    default:
      return null;
  }
};

export const PhotoWizard: React.FC = () => {
  const { resetWizard } = usePhotoWizard();
  const isMobile = useIsMobile();
  
  return (
    <div className={`w-full ${isMobile ? 'px-2' : 'container'} mx-auto`}>
      <WizardContent />
    </div>
  );
};
