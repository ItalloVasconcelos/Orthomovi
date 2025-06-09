// src/contexts/KeycloakProvider.tsx
import { ReactNode, useEffect, useState } from "react";
import keycloak from "@/services/keycloak";

interface Props {
    children: ReactNode;
}

export const KeycloakProvider = ({ children }: Props) => {
    const [isInitialized, setInitialized] = useState(false);

    useEffect(() => {
        keycloak
            .init({
                onLoad: "login-required", // ou "check-sso" se quiser login opcional
                pkceMethod: "S256",
                flow: "standard",
            })
            .then(authenticated => {
                if (authenticated) {
                    setInitialized(true);
                } else {
                    keycloak.login();
                }
            });
    }, []);

    if (!isInitialized) return <div>Loading auth...</div>;

    return <>{children}</>;
};
