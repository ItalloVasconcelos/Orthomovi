
import React from 'react';

export type PhotoStep = {
  id: string;
  title: string;
  instruction: string;
  letter: 'A' | 'B' | 'C' | 'D';
  description: string;
};

const PHOTO_STEPS: PhotoStep[] = [
  {
    id: 'heel',
    title: 'Foto A – Medida do calcanhar (vista traseira)',
    instruction: 'Coloque a régua verticalmente atrás da órtese, como na imagem. Toque no botão abaixo para tirar a foto.',
    letter: 'A',
    description: 'calcanhar'
  },
  {
    id: 'width',
    title: 'Foto B – Medida da largura (vista superior)',
    instruction: 'Posicione a régua horizontalmente na parte superior da órtese. Toque no botão abaixo para tirar a foto.',
    letter: 'B',
    description: 'largura'
  },
  {
    id: 'length',
    title: 'Foto C – Medida do comprimento (vista lateral)',
    instruction: 'Alinhe a régua na lateral da órtese como mostrado. Toque no botão abaixo para tirar a foto.',
    letter: 'C',
    description: 'comprimento'
  },
  {
    id: 'circumference',
    title: 'Foto D – Medida da circunferência (parte superior)',
    instruction: 'Posicione a régua ao redor da parte superior da órtese como na imagem. Toque no botão abaixo para tirar a foto.',
    letter: 'D',
    description: 'circunferência'
  }
];

export type WizardStep = -1 | 0 | 1 | 2 | 3 | 4 | 5;

export function usePhotoWizard() {
  const [currentStep, setCurrentStep] = React.useState<WizardStep>(0);
  const [photos, setPhotos] = React.useState<Record<string, string | null>>({
    'A': null,
    'B': null,
    'C': null,
    'D': null
  });
  const [calculating, setCalculating] = React.useState(false);
  const [measurements, setMeasurements] = React.useState<Record<string, number | null> | null>(null);

  const startWizard = () => setCurrentStep(1);
  
  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as WizardStep);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => (prev - 1) as WizardStep);
    }
  };
  
  const savePhoto = (letter: 'A' | 'B' | 'C' | 'D', photoUrl: string) => {
    setPhotos(prev => ({
      ...prev,
      [letter]: photoUrl
    }));
  };
  
  const retakePhoto = (letter: 'A' | 'B' | 'C' | 'D') => {
    setPhotos(prev => ({
      ...prev,
      [letter]: null
    }));
  };
  
  const calculateMeasurements = () => {
    setCalculating(true);
    
    // Simulação de cálculo de medidas (em produção seria uma API)
    setTimeout(() => {
      setMeasurements({
        'comprimento': 13.2,
        'largura': 6.8,
        'altura_calcanhar': 9.7,
        'circunferencia_total': 20.3
      });
      setCalculating(false);
    }, 3000);
  };
  
  const getCurrentLetter = (): 'A' | 'B' | 'C' | 'D' | null => {
    if (currentStep >= 1 && currentStep <= 4) {
      return PHOTO_STEPS[currentStep - 1].letter;
    }
    return null;
  };
  
  const getCurrentPhotoStep = (): PhotoStep | null => {
    if (currentStep >= 1 && currentStep <= 4) {
      return PHOTO_STEPS[currentStep - 1];
    }
    return null;
  };
  
  const resetWizard = () => {
    setCurrentStep(0);
    setPhotos({
      'A': null,
      'B': null,
      'C': null,
      'D': null
    });
    setMeasurements(null);
    setCalculating(false);
  };

  return {
    currentStep,
    photos,
    photoSteps: PHOTO_STEPS,
    calculating,
    measurements,
    startWizard,
    nextStep,
    prevStep,
    savePhoto,
    retakePhoto,
    calculateMeasurements,
    getCurrentLetter,
    getCurrentPhotoStep,
    resetWizard
  };
}
