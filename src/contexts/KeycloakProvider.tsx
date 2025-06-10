console.log("*************************************************");
console.log("****** ARQUIVO KeycloakProvider FOI CARREGADO ******");
console.log("****** VERSÃO: ", new Date().toLocaleTimeString('pt-BR'));
console.log("*************************************************");

import { ReactNode, useEffect, useState } from "react";
import keycloak from "@/services/keycloak"; // Importa nossa instância configurada do Keycloak
import { keycloakSyncService } from "@/services/keycloakSync"; // Importa nosso serviço de sincronização

// Define a interface para as propriedades do componente
interface Props {
    children: ReactNode;
}

/**
 * Este componente Provedor gerencia o ciclo de vida da autenticação com o Keycloak.
 * Ele garante que a aplicação só seja renderizada após a verificação do status de login
 * e aciona a sincronização do usuário com o banco de dados após um login bem-sucedido.
 */
export const KeycloakProvider = ({ children }: Props) => {
    // Estado para saber se a inicialização do Keycloak já terminou
    const [isInitialized, setInitialized] = useState(false);
    // Estado para armazenar qualquer erro que ocorra durante a inicialização
    const [error, setError] = useState<string | null>(null);

    // O useEffect é o coração do componente. Ele roda apenas uma vez quando o componente é montado.
    useEffect(() => {
        console.log("KeycloakProvider montado. Iniciando processo de autenticação...");

        keycloak
            .init({
                // 'check-sso' verifica silenciosamente se o usuário já tem uma sessão ativa no Keycloak
                onLoad: "check-sso",
                // PKCE é um método de segurança recomendado para aplicações web
                pkceMethod: "S256",
                // Define a URL para a qual o Keycloak deve redirecionar após o login/logout
                // Usamos window.location.origin para funcionar tanto em localhost quanto em produção
                redirectUri: window.location.origin,
                // Desabilitar o iframe de verificação silenciosa pode resolver alguns problemas em certos navegadores
                checkLoginIframe: false,
            })
            .then(authenticated => {
                console.log(`Verificação do Keycloak concluída. Usuário autenticado: ${authenticated}`);

                // Se a autenticação for bem-sucedida (o usuário está logado)
                if (authenticated) {
                    console.log("-> Usuário está autenticado. Informações do token:", keycloak.tokenParsed);

                    // ESTA É A CHAMADA CRÍTICA PARA A SINCRONIZAÇÃO
                    console.log("-> DISPARANDO SINCRONIZAÇÃO com o banco de dados...");
                    keycloakSyncService.syncUserWithDatabase();
                }

                // Marca a inicialização como concluída para que a aplicação possa ser exibida
                setInitialized(true);
            })
            .catch(err => {
                // Se ocorrer qualquer erro durante a inicialização
                console.error("-> ERRO FATAL na inicialização do Keycloak:", err);
                setError("Não foi possível conectar ao serviço de autenticação. Tente novamente mais tarde.");

                // Marca como inicializado para sair da tela de loading e mostrar a de erro
                setInitialized(true);
            });
    }, []); // O array vazio [] garante que este efeito rode apenas uma vez

    // --- RENDERIZAÇÃO CONDICIONAL ---

    // Se ocorreu um erro, mostra uma mensagem de erro clara com uma opção para recarregar
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

    // Se a inicialização ainda não terminou, mostra uma tela de "Carregando..."
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

    // Se tudo correu bem (inicializado e sem erros), renderiza o resto da aplicação
    return <>{children}</>;
};