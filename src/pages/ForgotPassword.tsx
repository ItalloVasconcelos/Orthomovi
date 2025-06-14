
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
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

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!email) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, informe o seu e-mail.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulação de delay de rede
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      
      toast({
        title: "E-mail enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
      
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao solicitar a redefinição de senha. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-ortho-blue/20">
      <header className="py-6 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold text-ortho-orange">Orthomovi</Link>
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
              <BreadcrumbLink href="/login">Login</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Esqueci a Senha</BreadcrumbPage>
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
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Esqueceu sua senha?</h1>
                  {!isSubmitted ? (
                    <p className="text-gray-600">Informe seu e-mail para receber as instruções de recuperação</p>
                  ) : (
                    <p className="text-gray-600">Verifique seu e-mail para redefinir sua senha</p>
                  )}
                </div>
                
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="input-icon" size={18} />
                      <Input
                        type="email"
                        placeholder="Seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 ortho-input"
                        autoComplete="email"
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      className="ortho-button w-full flex justify-center items-center"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
                      ) : (
                        "Enviar instruções"
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center">
                    <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-4">
                      <p>Enviamos um e-mail com instruções para redefinir sua senha.</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Tentar com outro e-mail
                    </Button>
                  </div>
                )}
                
                <p className="mt-6 text-center text-gray-600">
                  <Link to="/login" className="inline-flex items-center text-ortho-orange hover:underline">
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Voltar para o login
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

export default ForgotPassword;
