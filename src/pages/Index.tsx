
import React from "react";
import { PhotoWizard } from "@/components/PhotoWizard";
import { usePhotoWizard } from "@/hooks/use-photo-wizard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-ortho-blue/20">
      <header className="py-6 px-4">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <h1 className="text-3xl font-bold text-ortho-orange">Orthomovi</h1>
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <PhotoWizard />
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-gray-500">
        <div className="container mx-auto">
          <p>© 2025 Orthomovi Órteses Pediátricas. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
