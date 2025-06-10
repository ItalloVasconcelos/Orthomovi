import React, { ReactNode, useEffect, useState, createContext, useContext, useRef } from 'react';
import Keycloak from 'keycloak-js';
import keycloakInstance from '@/services/keycloak';

// --- Contexto e Hook (sem alterações) ---
interface IKeycloakContext {
    initialized: boolean;
    keycloak: Keycloak;
}
const KeycloakContext = createContext<IKeycloakContext | undefined>(undefined);
export const useKeycloakContext = () => {
    const context = useContext(KeycloakContext);
    if (!context) {
        throw new Error('useKeycloakContext precisa ser usado dentro de um KeycloakProvider');
    }
    return context;
};

// --- O Provider à Prova de Balas ---
export const KeycloakProvider = ({ children }: { children: ReactNode }) => {
    const [initialized, setInitialized] = useState(false);

    // O "CADEADO": useRef persiste entre as renderizações sem causar novas.
    // Usamos para garantir que a inicialização só aconteça uma vez.
    const didInitialize = useRef(false);

    useEffect(() => {
        // Se o cadeado já estiver trancado, não fazemos nada.
        if (didInitialize.current) {
            return;
        }
        // Tranca o cadeado na primeira vez que entramos aqui.
        didInitialize.current = true;

        console.log("[KeycloakProvider] Iniciando conexão (AGORA SÓ UMA VEZ)...");

        keycloakInstance
            .init({
                onLoad: 'check-sso',
            })
            .finally(() => {
                // O .finally() garante que 'initialized' se torne 'true'
                // tanto em caso de sucesso quanto de falha.
                console.log(`[KeycloakProvider] Processo de inicialização finalizado.`);
                setInitialized(true);
            });

    }, []); // O array vazio continua correto, o controle é feito pelo useRef.

    // Se a inicialização ainda não terminou, a aplicação inteira espera.
    if (!initialized) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
                <h2 style={{ fontSize: '1.5rem', color: '#4A5568' }}>Carregando Sistema de Autenticação...</h2>
            </div>
        );
    }

    // Quando terminar, fornece a instância do keycloak e o status para os filhos.
    return (
        <KeycloakContext.Provider value={{ keycloak: keycloakInstance, initialized }}>
            {children}
        </KeycloakContext.Provider>
    );
};
