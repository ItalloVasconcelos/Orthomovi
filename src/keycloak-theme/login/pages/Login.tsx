import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, classes } = props;
    
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;
    const { url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const [isLoginPassword, setIsLoginPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
                            <BreadcrumbPage>Login</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Main content */}
            <main className="flex-grow flex items-center justify-center px-4 py-6">
                <div className="w-full max-w-md">
                    <div className="bg-brand-white rounded-xl shadow-lg p-6 md:p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-heading font-bold text-brand-text mb-2">
                                Acesso ao Sistema
                            </h1>
                            <p className="text-brand-text-light">
                                Entre com suas credenciais para acessar o sistema
                            </p>
                        </div>
                        
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginPassword(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                            className="space-y-5 md:space-y-6"
                        >
                            {!usernameHidden && (
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <Input
                                        id="username"
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus={true}
                                        autoComplete="username"
                                        className={`pl-10 h-12 border-gray-200 focus:border-[#6EADFA] focus:ring-2 focus:ring-[#6EADFA]/20 transition-all duration-200 rounded-xl text-base md:text-lg ${messagesPerField.existsError("username") ? "border-red-500 animate-shake" : ""}`}
                                        placeholder="Email ou telefone"
                                        aria-invalid={messagesPerField.existsError("username") ? "true" : undefined}
                                    />
                                    {messagesPerField.existsError("username") && (
                                        <p className="text-red-500 text-sm mt-1 animate-fade-in">
                                            {messagesPerField.get("username")}
                                        </p>
                                    )}
                                </div>
                            )}

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    className={`pl-10 pr-10 h-12 border-gray-200 focus:border-[#6EADFA] focus:ring-2 focus:ring-[#6EADFA]/20 transition-all duration-200 rounded-xl text-base md:text-lg ${messagesPerField.existsError("password") ? "border-red-500 animate-shake" : ""}`}
                                    placeholder="Senha"
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

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <input
                                        id="rememberMe"
                                        name="rememberMe"
                                        type="checkbox"
                                        tabIndex={3}
                                        className="rounded border-gray-300 focus:ring-2 focus:ring-[#6EADFA]/40 focus:outline-none transition-all duration-200"
                                        defaultChecked={login.rememberMe === "on"}
                                    />
                                    <label htmlFor="rememberMe" className="text-sm text-brand-text-light cursor-pointer select-none">
                                        {msg("rememberMe")}
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <a href={url.loginResetCredentialsUrl} className="text-[#6EADFA] font-semibold hover:underline">
                                        {msg("doForgotPassword")}
                                    </a>
                                </div>
                            </div>

                            <input
                                type="hidden"
                                id="id-hidden-input"
                                name="credentialId"
                                value={auth?.selectedCredential ?? ""}
                            />
                            <Button
                                type="submit"
                                disabled={isLoginPassword}
                                className="w-full h-12 text-base md:text-lg mt-2 bg-[#6EADFA] hover:bg-[#6EADFA]/90 text-white font-bold rounded-xl"
                            >
                                {msg("doLogIn")}
                            </Button>

                            {!registrationDisabled && (
                                <div className="text-center mt-4">
                                    <span className="text-sm text-brand-text-light">Não tem uma conta?</span>{' '}
                                    <a href={url.registrationUrl} className="text-[#6EADFA] font-semibold hover:underline">
                                        {msg("doRegister")}
                                    </a>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
} 