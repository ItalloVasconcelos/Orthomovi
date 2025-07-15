import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

export default function ForgotPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, classes } = props;
    
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;
    const { url, messagesPerField, auth } = kcContext;

    const [isSubmitting, setIsSubmitting] = useState(false);

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
                            <BreadcrumbLink href="/login">Login</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Esqueci a Senha</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* Main content */}
            <main className="flex-grow flex items-center justify-center px-4 py-6">
                <div className="w-full max-w-md">
                    <div className="bg-brand-white rounded-xl shadow-lg p-6 md:p-8">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl sm:text-3xl font-bold text-brand-text mb-2">Esqueceu sua senha?</h1>
                            <p className="text-brand-text-light">Informe seu e-mail para receber as instruções de recuperação</p>
                        </div>
                        
                        <form
                            id="kc-reset-password-form"
                            action={url.loginAction}
                            method="post"
                            className="space-y-4"
                            onSubmit={() => {
                                setIsSubmitting(true);
                                return true;
                            }}
                        >
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoFocus={true}
                                    autoComplete="username"
                                    className={`pl-10 h-12 border-gray-200 focus:border-[#6EADFA] focus:ring-2 focus:ring-[#6EADFA]/20 transition-all duration-200 rounded-xl ${messagesPerField.existsError("username") ? "border-red-500" : ""}`}
                                    placeholder="Telefone ou email"
                                    aria-invalid={messagesPerField.existsError("username") ? "true" : undefined}
                                />
                                {messagesPerField.existsError("username") && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {messagesPerField.get("username")}
                                    </p>
                                )}
                            </div>
                            
                            <Button 
                                type="submit"
                                className="w-full h-12 bg-[#6EADFA] hover:bg-[#6EADFA]/90 text-white font-bold rounded-xl flex justify-center items-center"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
                                ) : (
                                    msg("doSubmit")
                                )}
                            </Button>

                            <p className="mt-6 text-center text-brand-text-light">
                                <a href={url.loginUrl} className="inline-flex items-center text-[#6EADFA] hover:underline">
                                    <ArrowLeft className="mr-1 h-4 w-4" />
                                    {msg("backToLogin")}
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
} 