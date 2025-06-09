
import { ReactNode, useEffect, useState } from "react";
import keycloak from "@/services/keycloak";

interface Props {
    children: ReactNode;
}

export const KeycloakProvider = ({ children }: Props) => {
    const [isInitialized, setInitialized] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Configurar a URL de redirect baseada na URL atual
        const currentUrl = window.location.origin;
        
        keycloak
            .init({
                onLoad: "check-sso",
                pkceMethod: "S256",
                flow: "standard",
                redirectUri: `${currentUrl}/`,
                checkLoginIframe: false,
            })
            .then(authenticated => {
                console.log('Keycloak inicializado. Autenticado:', authenticated);
                setInitialized(true);
                
                if (authenticated) {
                    console.log('Usuário autenticado via Keycloak:', keycloak.tokenParsed);
                    console.log('Token completo:', keycloak.token);
                }
            })
            .catch(error => {
                console.error('Erro na inicialização do Keycloak:', error);
                setError(`Erro de autenticação: ${error.message}`);
                setInitialized(true);
            });
    }, []);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-bg">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong className="font-bold">Erro de Autenticação: </strong>
                    <span className="block sm:inline">{error}</span>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    if (!isInitialized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-bg">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
                    <p className="text-brand-text">Carregando autenticação...</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};
