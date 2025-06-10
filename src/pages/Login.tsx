// src/pages/Login.tsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Efeito para redirecionar o usuário se ele já estiver logado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
      <div className="min-h-screen flex flex-col bg-brand-bg">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-md text-center">
            <div className="bg-brand-white rounded-xl shadow-lg p-8 sm:p-12 animate-fade-in">
              <h1 className="text-3xl font-heading font-bold text-brand-text mb-2">Acesso ao Sistema</h1>
              <p className="text-brand-text-light mb-8">
                Clique abaixo para entrar ou criar sua conta em nosso portal seguro.
              </p>
              <Button
                  onClick={login}
                  className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                Entrar ou Cadastrar-se
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
  );
};

export default Login;