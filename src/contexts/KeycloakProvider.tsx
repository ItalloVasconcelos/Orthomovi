
console.log("*************************************************");
console.log("****** ARQUIVO KeycloakProvider FOI CARREGADO ******");
console.log("****** VERSÃO: ", new Date().toLocaleTimeString('pt-BR'));
console.log("*************************************************");

import { ReactNode, useEffect, useState } from "react";
import keycloak from "@/services/keycloak";
import { keycloakSyncService } from "@/services/keycloakSync";

interface Props {
    children: ReactNode;
}

export const KeycloakProvider = ({ children }: Props) => {
    const [isInitialized, setInitialized] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("KeycloakProvider montado. Iniciando processo de autenticação...");

        // Marcar que a inicialização começou
        (keycloak as any).didInitialize = false;

        keycloak
            .init({
                onLoad: "check-sso",
                pkceMethod: "S256",
                redirectUri: window.location.origin,
                checkLoginIframe: false,
            })
            .then(authenticated => {
                console.log(`Verificação do Keycloak concluída. Usuário autenticado: ${authenticated}`);
                
                // Marcar que a inicialização foi concluída
                (keycloak as any).didInitialize = true;

                if (authenticated) {
                    console.log("-> Usuário está autenticado. Informações do token:", keycloak.tokenParsed);
                    console.log("-> DISPARANDO SINCRONIZAÇÃO com o banco de dados...");
                    keycloakSyncService.syncUserWithDatabase();
                } else {
                    console.log("-> Usuário não está autenticado");
                }

                setInitialized(true);
            })
            .catch(err => {
                console.error("-> ERRO FATAL na inicialização do Keycloak:", err);
                (keycloak as any).didInitialize = true; // Marcar como inicializado mesmo com erro
                setError("Não foi possível conectar ao serviço de autenticação. Tente novamente mais tarde.");
                setInitialized(true);
            });
    }, []);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded text-center">
                    <strong className="font-bold text-lg">Ocorreu um Problema</strong>
                    <p className="block mt-2">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    if (!isInitialized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Verificando autenticação...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};
