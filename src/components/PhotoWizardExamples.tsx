
import React from 'react';

export const PhotoWizardExamples = () => {
  const examples = [
    {
      letter: 'A',
      label: 'Altura do calcanhar',
      description: 'Meça a altura do calcanhar conforme indicado'
    },
    {
      letter: 'B', 
      label: 'Largura do pé',
      description: 'Meça a largura do pé na parte mais larga'
    },
    {
      letter: 'C',
      label: 'Comprimento do pé', 
      description: 'Meça o comprimento total do pé'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {examples.map((example) => (
        <div key={example.letter} className="bg-gray-50 p-4 rounded-lg border">
          <div className="text-center mb-2">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
              {example.letter}
            </div>
            <h3 className="font-semibold text-sm">{example.label}</h3>
          </div>
          <p className="text-xs text-gray-600 text-center">{example.description}</p>
        </div>
      ))}
    </div>
  );
};
