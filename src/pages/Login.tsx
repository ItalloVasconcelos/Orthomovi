
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
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
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
      const user = await graphqlService.loginUser({
        email: emailOrPhone,
        password: password,
      });
      
      if (user) {
        // Usar o contexto de autenticação
        login(user);
        
        toast({
          title: "Login bem-sucedido",
          description: `Bem-vindo, ${user.fullname}! Redirecionando...`,
        });
        
        // Redirecionar para /home após 1.5 segundos
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        });
      }
      
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
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <Mail className="input-icon text-brand-text-light" size={18} />
                <Input
                  type="text"
                  placeholder="Email"
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
