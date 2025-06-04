import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react";
import { graphqlService } from "@/services/graphqlService";

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
        const user = await graphqlService.registerUser({
          fullname: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });

        toast({
          title: "Conta criada com sucesso!",
          description: `Bem-vindo ao nosso sistema, ${user.fullname}! Você será redirecionado para a página de login.`,
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
    <div className="relative w-full max-w-md mx-auto px-4 sm:px-0 animate-fade-in">
      <div className="absolute inset-0 bg-ortho-blue rounded-3xl transform rotate-1 -z-10"></div>
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transform -rotate-1">
        <div className="transform rotate-1">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Cadastro</h1>
            <p className="text-gray-600">Crie sua conta para acessar nosso sistema</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="input-icon" size={18} />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nome completo"
                className={`w-full ortho-input ${
                  errors.fullName ? "border-red-500" : ""
                }`}
              />
              {errors.fullName && <p className="error-message">{errors.fullName}</p>}
            </div>
            
            <div className="relative">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
                className={`w-full ortho-input ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="relative">
              <Phone className="input-icon" size={18} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Telefone (11) 99999-9999"
                className={`w-full ortho-input ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>
            
            <div className="relative">
              <Lock className="input-icon" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Senha (mínimo 6 caracteres)"
                className={`w-full ortho-input ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            
            <div className="relative">
              <Lock className="input-icon" size={18} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmar senha"
                className={`w-full ortho-input ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>
            
            <div className="flex items-start space-x-2">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-ortho-orange focus:ring-ortho-orange/20"
                />
              </div>
              <div className="text-sm">
                <label htmlFor="termsAccepted" className="text-gray-700">
                  Li e aceito os{" "}
                  <Link to="/terms" className="text-ortho-orange hover:underline">
                    termos de uso
                  </Link>
                </label>
                {errors.termsAccepted && (
                  <p className="error-message">{errors.termsAccepted}</p>
                )}
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="ortho-button w-full flex justify-center items-center"
            >
              {isSubmitting ? (
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
              ) : (
                "Criar Conta"
              )}
            </button>
          </form>
          
          <p className="mt-6 text-center text-gray-600">
            Já tem conta?{" "}
            <Link to="/login" className="text-ortho-orange hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
