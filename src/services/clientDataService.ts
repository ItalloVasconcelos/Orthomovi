
import { useState } from 'react';

export type ClientSubmission = {
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

// Mock data for demonstration
const initialClientData: ClientSubmission[] = [
  {
    id: "1",
    name: "Ana Clara Silva",
    email: "ana.silva@gmail.com",
    submissionDate: "21/04/2023",
    calculatedSize: "24",
    status: "Concluído",
    measurements: {
      a: 9.3,
      b: 13.2,
      c: 20.1,
      d: 6.1,
    },
  },
  {
    id: "2",
    name: "Lucas Oliveira",
    email: "lucas.oliveira@hotmail.com",
    submissionDate: "20/04/2023",
    calculatedSize: "23.5",
    status: "Em análise",
    measurements: {
      a: 8.9,
      b: 12.8,
      c: 19.5,
      d: 5.9,
    },
  },
  {
    id: "3",
    name: "Mariana Santos",
    email: "mariana.santos@gmail.com",
    submissionDate: "19/04/2023",
    calculatedSize: "22",
    status: "Pendente",
    measurements: {
      a: 8.2,
      b: 12.1,
      c: 18.7,
      d: 5.5,
    },
  },
  {
    id: "4",
    name: "Pedro Costa",
    email: "pedro.costa@outlook.com",
    submissionDate: "18/04/2023",
    calculatedSize: "25",
    status: "Concluído",
    measurements: {
      a: 9.8,
      b: 13.7,
      c: 21.0,
      d: 6.4,
    },
  },
  {
    id: "5",
    name: "Fernanda Lima",
    email: "fernanda.lima@gmail.com",
    submissionDate: "17/04/2023",
    calculatedSize: "23",
    status: "Em análise",
    measurements: {
      a: 8.7,
      b: 12.5,
      c: 19.2,
      d: 5.8,
    },
  },
  {
    id: "6",
    name: "Carlos Mendes",
    email: "carlos.mendes@gmail.com",
    submissionDate: "16/04/2023",
    calculatedSize: "21.5",
    status: "Pendente",
    measurements: {
      a: 7.9,
      b: 11.8,
      c: 18.2,
      d: 5.3,
    },
  },
  {
    id: "7",
    name: "Julia Rodrigues",
    email: "julia.rodrigues@hotmail.com",
    submissionDate: "15/04/2023",
    calculatedSize: "24.5",
    status: "Concluído",
    measurements: {
      a: 9.5,
      b: 13.4,
      c: 20.3,
      d: 6.2,
    },
  },
];

export const useClientDataService = () => {
  const [clientData, setClientData] = useState(initialClientData);
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Pendente":
        return "bg-yellow-100 text-yellow-800";
      case "Em análise":
        return "bg-blue-100 text-blue-800";
      case "Concluído":
        return "bg-green-100 text-green-800";
      default:
        return "";
    }
  };

  const handleStatusChange = (clientId: string, newStatus: string) => {
    setClientData((prevClients) =>
      prevClients.map((client) =>
        client.id === clientId ? { ...client, status: newStatus } : client
      )
    );
  };

  return {
    clientData,
    setClientData,
    getStatusClass,
    handleStatusChange
  };
};
