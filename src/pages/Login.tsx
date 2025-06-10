import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { graphqlService } from "@/services/graphqlService";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, keycloakLogin } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailOrPhone || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Este bloco está mantido para compatibilidade, mas pode ser removido
      // já que agora usamos apenas Keycloak
      console.log("Login tradicional não implementado - redirecionando para Keycloak");
      keycloakLogin();
      
    } catch (error) {
      console.error('Erro no login:', error);
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado.';
      toast({
        title: "Erro no login",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeycloakLogin = () => {
    keycloakLogin();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg">
      <Header />
      
      <div className="container mx-auto py-4 px-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Início</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Login</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <main className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <div className="bg-brand-white rounded-xl shadow-lg p-8 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-heading font-bold text-brand-text mb-2">Login</h1>
              <p className="text-brand-text-light">Acesse sua conta para continuar</p>
            </div>
            
            <div className="mb-6">
              <Button 
                type="button"
                onClick={handleKeycloakLogin}
                className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 text-white"
              >
                Entrar com Keycloak
              </Button>
              
              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400 text-sm">ou</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <Mail className="input-icon text-brand-text-light" size={18} />
                <Input
                  type="text"
                  placeholder="Email ou Telefone"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-brand-primary focus:ring-brand-primary/20"
                  autoComplete="username"
                />
              </div>
              
              <div className="relative">
                <Lock className="input-icon text-brand-text-light" size={18} />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-brand-primary focus:ring-brand-primary/20"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-light hover:text-brand-text"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              <div className="flex justify-end">
                <Link to="/esqueceu-senha" className="text-sm text-brand-primary hover:underline">
                  Esqueceu sua senha?
                </Link>
              </div>
              
              <Button 
                type="submit"
                className="btn-primary w-full h-12 text-base"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
            
            <p className="mt-8 text-center text-brand-text-light">
              Não tem conta?{" "}
              <Link to="/cadastro" className="text-brand-primary hover:underline font-medium">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
