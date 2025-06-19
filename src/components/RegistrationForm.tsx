import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  termsAccepted?: string;
}

const RegistrationForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone) && !/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Telefone inválido";
    }
    
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter no mínimo 6 caracteres";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmar a senha é obrigatório";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "Você deve aceitar os termos de uso";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // For now, we'll simulate a registration success
        // TODO: Implement actual registration logic with your backend
        const simulatedUser = {
          id: Math.random().toString(36).substr(2, 9),
          fullname: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        };

        toast({
          title: "Conta criada com sucesso!",
          description: `Bem-vindo ao nosso sistema, ${simulatedUser.fullname}! Você será redirecionado para a página de login.`,
        });
        
        // Reset form after successful submission
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          termsAccepted: false,
        });

        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        
      } catch (error) {
        console.error('Erro no cadastro:', error);
        const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado.';
        toast({
          title: "Erro no cadastro",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  return (
    <div className="bg-brand-white rounded-xl shadow-lg p-4 md:p-8 animate-fade-in w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-brand-text mb-2">Cadastro</h1>
        <p className="text-brand-text-light">Crie sua conta para acessar nosso sistema</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        <div className="relative">
          <User className="input-icon text-brand-text-light" size={18} />
          <Input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Nome completo"
            className={`pl-10 h-12 border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-200 rounded-lg text-base md:text-lg ${errors.fullName ? "border-red-500 animate-shake" : ""}`}
            autoComplete="name"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.fullName}</p>}
        </div>
        
        <div className="relative">
          <Mail className="input-icon text-brand-text-light" size={18} />
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            className={`pl-10 h-12 border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-200 rounded-lg text-base md:text-lg ${errors.email ? "border-red-500 animate-shake" : ""}`}
            autoComplete="email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.email}</p>}
        </div>

        <div className="relative">
          <Phone className="input-icon text-brand-text-light" size={18} />
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Telefone (com DDD)"
            className={`pl-10 h-12 border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-200 rounded-lg text-base md:text-lg ${errors.phone ? "border-red-500 animate-shake" : ""}`}
            autoComplete="tel"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.phone}</p>}
        </div>
        
        <div className="relative">
          <Lock className="input-icon text-brand-text-light" size={18} />
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Senha"
            className={`pl-10 h-12 border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-200 rounded-lg text-base md:text-lg pr-10 ${errors.password ? "border-red-500 animate-shake" : ""}`}
            autoComplete="new-password"
          />
          <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary focus:outline-none">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.password}</p>}
        </div>
        
        <div className="relative">
          <Lock className="input-icon text-brand-text-light" size={18} />
          <Input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmar senha"
            className={`pl-10 h-12 border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-200 rounded-lg text-base md:text-lg pr-10 ${errors.confirmPassword ? "border-red-500 animate-shake" : ""}`}
            autoComplete="new-password"
          />
          <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-primary focus:outline-none">
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.confirmPassword}</p>}
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
            className="rounded border-gray-300 focus:ring-2 focus:ring-brand-primary/40 focus:outline-none transition-all duration-200"
            id="termsAccepted"
          />
          <label htmlFor="termsAccepted" className="text-sm text-brand-text-light cursor-pointer select-none">
            Aceito os <Link to="/termos" className="underline hover:text-brand-primary">termos de uso</Link>
          </label>
        </div>
        {errors.termsAccepted && <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.termsAccepted}</p>}
        
        <Button
          type="submit"
          className="btn-primary w-full h-12 text-base md:text-lg mt-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Criando conta..." : "Criar conta"}
        </Button>
        <div className="text-center mt-4">
          <span className="text-sm text-brand-text-light">Já tem uma conta?</span>{' '}
          <Link to="/login" className="text-brand-primary font-semibold hover:underline">Entrar</Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
