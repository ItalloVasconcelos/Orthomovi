import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

interface TemplateProps {
    displayInfo?: boolean;
    displayMessage?: boolean;
    displayRequiredFields?: boolean;
    headerNode?: React.ReactNode;
    showUsernameNode?: React.ReactNode;
    infoNode?: React.ReactNode;
    kcContext: KcContext;
    i18n: I18n;
    doUseDefaultCss: boolean;
    classes: Record<string, string>;
    children: React.ReactNode;
}

export default function Template(props: TemplateProps) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        headerNode,
        showUsernameNode = null,
        infoNode = null,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });
    const { msg, msgStr } = i18n;
    const { auth, url, message, isAppInitiatedAction } = kcContext;

    return (
        <div className="min-h-screen flex flex-col bg-brand-bg">
            <Header 
                showAuthButtons={false}
            />
            
            <main className="flex-grow flex items-center justify-center px-4 py-6">
                <div className="w-full max-w-md text-center">
                    <div className="bg-brand-white rounded-xl shadow-lg p-8 sm:p-12 animate-fade-in">
                        {/* Header Node */}
                        {headerNode && (
                            <div className="mb-6">
                                {headerNode}
                            </div>
                        )}

                        {/* Show username */}
                        {showUsernameNode && (
                            <div id="kc-username" className="mb-4">
                                {showUsernameNode}
                            </div>
                        )}

                        {/* Try another way */}
                        {isAppInitiatedAction && auth?.showTryAnotherWayLink && (
                            <form
                                id="kc-select-try-another-way-form"
                                action={url.loginAction}
                                method="post"
                                className="mb-4"
                            >
                                <div>
                                    <input type="hidden" name="tryAnotherWay" value="on" />
                                    <a
                                        href="#"
                                        id="try-another-way"
                                        onClick={() => {
                                            document.forms["kc-select-try-another-way-form" as any].submit();
                                            return false;
                                        }}
                                        className="text-blue-600 hover:text-blue-500 text-sm"
                                    >
                                        {msg("doTryAnotherWay")}
                                    </a>
                                </div>
                            </form>
                        )}

                        {/* Messages */}
                        {displayMessage && message && (message.type !== "warning" || !isAppInitiatedAction) && (
                            <div
                                className={`mb-4 p-3 rounded-lg ${
                                    message.type === "success"
                                        ? "bg-green-50 text-green-800 border border-green-200"
                                        : message.type === "warning"
                                        ? "bg-yellow-50 text-yellow-800 border border-yellow-200"
                                        : message.type === "error"
                                        ? "bg-red-50 text-red-800 border border-red-200"
                                        : "bg-blue-50 text-blue-800 border border-blue-200"
                                }`}
                            >
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: message.summary
                                    }}
                                />
                            </div>
                        )}

                        {/* Required fields */}
                        {displayRequiredFields && (
                            <div className="mb-4">
                                <div className="text-sm text-gray-600">
                                    <span className="text-red-500">*</span> {msg("requiredFields")}
                                </div>
                            </div>
                        )}

                        {/* Main content */}
                        <div id="kc-content">
                            <div id="kc-content-wrapper">
                                {children}
                            </div>
                        </div>

                        {/* Info */}
                        {displayInfo && (
                            <div id="kc-info" className="mt-6">
                                <div id="kc-info-wrapper" className="text-sm text-gray-600">
                                    {infoNode}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
} 