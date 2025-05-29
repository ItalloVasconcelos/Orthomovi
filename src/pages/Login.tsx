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
import { UserDropdown } from "@/components/UserDropdown";
import { graphqlService } from "@/services/graphqlService";

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
        // Salvar dados do usuário no localStorage
        localStorage.setItem('user', JSON.stringify(user));
        
        toast({
          title: "Login bem-sucedido",
          description: `Bem-vindo, ${user.name}!`,
        });
        
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        });
      }
      
    } catch (error) {
      console.error('Erro no login:', error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro ao tentar fazer login. Verifique sua conexão e tente novamente.",
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-ortho-blue/20">
      <header className="py-6 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold text-ortho-orange">Orthomovi</Link>
            <div className="flex items-center space-x-4">
              <Link to="/produto">
                <Button variant="ghost">Conheça o produto</Button>
              </Link>
              <UserDropdown />
            </div>
          </div>
        </div>
      </header>
      
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
          <div className="relative w-full max-w-md mx-auto px-4 sm:px-0 animate-fade-in">
            <div className="absolute inset-0 bg-ortho-blue rounded-3xl transform rotate-1 -z-10"></div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transform -rotate-1">
              <div className="transform rotate-1">
                <div className="text-center mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Login</h1>
                  <p className="text-gray-600">Acesse sua conta para continuar</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Mail className="input-icon" size={18} />
                    <Input
                      type="text"
                      placeholder="Email"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      className="pl-10 ortho-input h-12"
                      autoComplete="username"
                    />
                  </div>
                  
                  <div className="relative">
                    <Lock className="input-icon" size={18} />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 ortho-input h-12"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  
                  <div className="flex justify-end">
                    <Link to="/esqueceu-senha" className="text-sm text-ortho-orange hover:underline">
                      Esqueceu sua senha?
                    </Link>
                  </div>
                  
                  <Button 
                    type="submit"
                    className="ortho-button w-full flex justify-center items-center h-12"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </form>
                
                <p className="mt-6 text-center text-gray-600">
                  Não tem conta?{" "}
                  <Link to="/cadastro" className="text-ortho-orange hover:underline">
                    Cadastre-se
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 bg-white border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 Orthomovi Órteses Pediátricas. Todos os direitos reservados.</p>
          <div className="flex justify-center mt-2 space-x-4">
            <Link to="/terms" className="hover:text-ortho-orange">Termos de Uso</Link>
            <Link to="/privacy" className="hover:text-ortho-orange">Política de Privacidade</Link>
            <Link to="/contact" className="hover:text-ortho-orange">Contato</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;
