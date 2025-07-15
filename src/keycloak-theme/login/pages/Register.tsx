import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { useState } from "react";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

export default function Register(props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, classes } = props;
    
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;
    const { url, messagesPerField, passwordRequired, recaptchaRequired, recaptchaSiteKey } = kcContext;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-brand-bg">
            {/* Breadcrumb */}
            <div className="container mx-auto py-4 px-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Início</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Cadastro</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Main content */}
            <main className="flex-grow flex items-center justify-center px-4 py-6">
                <div className="w-full max-w-md">
                    <div className="bg-brand-white rounded-xl shadow-lg p-6 md:p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-heading font-bold text-brand-text mb-2">Cadastro</h1>
                            <p className="text-brand-text-light">Crie sua conta para acessar nosso sistema</p>
                        </div>
                        
                        <form
                            id="kc-register-form"
                            action={url.registrationAction}
                            method="post"
                            className="space-y-5 md:space-y-6"
                        >
                            {/* Nome Completo */}
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    defaultValue={""}
                                    type="text"
                                    autoComplete="name"
                                    className={`pl-10 h-12 border-gray-200 focus:border-[#6EADFA] focus:ring-2 focus:ring-[#6EADFA]/20 transition-all duration-200 rounded-xl text-base md:text-lg ${messagesPerField.existsError("firstName") ? "border-red-500 animate-shake" : ""}`}
                                    placeholder="Nome completo"
                                    aria-invalid={messagesPerField.existsError("firstName") ? "true" : undefined}
                                />
                                {messagesPerField.existsError("firstName") && (
                                    <p className="text-red-500 text-sm mt-1 animate-fade-in">
                                        {messagesPerField.get("firstName")}
                                    </p>
                                )}
                            </div>

                            {/* Campo lastName oculto - required by Keycloak */}
                            <input
                                type="hidden"
                                id="lastName"
                                name="lastName"
                                value=" "
                            />

                            {/* E-mail */}
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    id="email"
                                    name="email"
                                    defaultValue={""}
                                    type="email"
                                    autoComplete="email"
                                    className={`pl-10 h-12 border-gray-200 focus:border-[#6EADFA] focus:ring-2 focus:ring-[#6EADFA]/20 transition-all duration-200 rounded-xl text-base md:text-lg ${messagesPerField.existsError("email") ? "border-red-500 animate-shake" : ""}`}
                                    placeholder="E-mail"
                                    aria-invalid={messagesPerField.existsError("email") ? "true" : undefined}
                                />
                                {messagesPerField.existsError("email") && (
                                    <p className="text-red-500 text-sm mt-1 animate-fade-in">
                                        {messagesPerField.get("email")}
                                    </p>
                                )}
                            </div>

                            {/* Telefone */}
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    id="user.attributes.phone"
                                    name="user.attributes.phone"
                                    type="tel"
                                    autoComplete="tel"
                                    className="pl-10 h-12 border-gray-200 focus:border-[#6EADFA] focus:ring-2 focus:ring-[#6EADFA]/20 transition-all duration-200 rounded-xl text-base md:text-lg"
                                    placeholder="Telefone (11) 99999-9999"
                                />
                            </div>

                            {passwordRequired && (
                                <>
                                    {/* Senha */}
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            className={`pl-10 pr-10 h-12 border-gray-200 focus:border-[#6EADFA] focus:ring-2 focus:ring-[#6EADFA]/20 transition-all duration-200 rounded-xl text-base md:text-lg ${messagesPerField.existsError("password") ? "border-red-500 animate-shake" : ""}`}
                                            placeholder="Senha (mínimo 6 caracteres)"
                                            aria-invalid={messagesPerField.existsError("password") ? "true" : undefined}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6EADFA] focus:outline-none"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                        {messagesPerField.existsError("password") && (
                                            <p className="text-red-500 text-sm mt-1 animate-fade-in">
                                                {messagesPerField.get("password")}
                                            </p>
                                        )}
                                    </div>

                                    {/* Confirmar Senha */}
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <Input
                                            id="password-confirm"
                                            name="password-confirm"
                                            type={showConfirmPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            className={`pl-10 pr-10 h-12 border-gray-200 focus:border-[#6EADFA] focus:ring-2 focus:ring-[#6EADFA]/20 transition-all duration-200 rounded-xl text-base md:text-lg ${messagesPerField.existsError("password-confirm") ? "border-red-500 animate-shake" : ""}`}
                                            placeholder="Confirmar senha"
                                            aria-invalid={messagesPerField.existsError("password-confirm") ? "true" : undefined}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6EADFA] focus:outline-none"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                        {messagesPerField.existsError("password-confirm") && (
                                            <p className="text-red-500 text-sm mt-1 animate-fade-in">
                                                {messagesPerField.get("password-confirm")}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}

                            {/* Termos de uso */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="user.attributes.termsAccepted"
                                    className="rounded border-gray-300 focus:ring-2 focus:ring-[#6EADFA]/40 focus:outline-none transition-all duration-200"
                                    id="termsAccepted"
                                    required
                                />
                                <label htmlFor="termsAccepted" className="text-sm text-brand-text-light cursor-pointer select-none">
                                    Li e aceito os <a href="/termos" className="text-[#6EADFA] underline hover:text-[#6EADFA]/80">termos de uso</a>
                                </label>
                            </div>

                            {recaptchaRequired && (
                                <div className="g-recaptcha" data-sitekey={recaptchaSiteKey}></div>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-12 text-base md:text-lg mt-2 bg-[#6EADFA] hover:bg-[#6EADFA]/90 text-white font-bold rounded-xl"
                            >
                                Criar Conta
                            </Button>

                            <div className="text-center mt-4">
                                <span className="text-sm text-brand-text-light">Já tem conta?</span>{' '}
                                <a href={url.loginUrl} className="text-[#6EADFA] font-semibold hover:underline">
                                    Faça login
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
} 