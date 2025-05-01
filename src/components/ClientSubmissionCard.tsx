
import React from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type ClientSubmission = {
  id: string;
  name: string;
  email: string;
  submissionDate: string;
  calculatedSize: string;
  status: string;
  measurements: {
    a: number;
    b: number;
    c: number;
    d: number;
  };
};

interface ClientSubmissionCardProps {
  client: ClientSubmission;
  onViewDetails: () => void;
  statusClass: string;
}

export const ClientSubmissionCard: React.FC<ClientSubmissionCardProps> = ({
  client,
  onViewDetails,
  statusClass,
}) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-medium">{client.name}</h3>
            <p className="text-sm text-gray-500">{client.email}</p>
          </div>
          <div className="text-center">
            <span className="block text-xs text-gray-500">Nº</span>
            <span className="text-xl font-bold text-ortho-orange">{client.calculatedSize}</span>
          </div>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <div>
            <span className="text-gray-500">Data: </span>
            <span>{client.submissionDate}</span>
          </div>
          <div>
            <span className="text-gray-500">Status: </span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
              {client.status}
            </span>
          </div>
        </div>
        
        <div className="mt-3 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewDetails}
            className="flex items-center gap-1"
          >
            <Eye className="h-4 w-4" />
            Ver Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
