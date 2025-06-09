import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { KeycloakProvider } from "@/contexts/KeycloakProvider"; // 👈 Importante
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminRoute } from "@/components/AdminRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import AdminPanel from "./pages/Admin";
import AdminUsersPage from "./pages/admin/Users";
import AdminConfigPage from "./pages/admin/Config";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

const App = () => (
    <QueryClientProvider client={queryClient}>
        <KeycloakProvider> {/* 🔐 Envolvendo tudo com o KeycloakProvider */}
            <AuthProvider>
                <TooltipPrimitive.Provider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Index />} />
                            <Route
                                path="/home"
                                element={
                                    <ProtectedRoute>
                                        <Index />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/cadastro" element={<Register />} />
                            <Route path="/esqueceu-senha" element={<ForgotPassword />} />
                            <Route
                                path="/admin"
                                element={
                                    <AdminRoute>
                                        <AdminPanel />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/users"
                                element={
                                    <AdminRoute>
                                        <AdminUsersPage />
                                    </AdminRoute>
                                }
                            />
                            <Route
                                path="/admin/config"
                                element={
                                    <AdminRoute>
                                        <AdminConfigPage />
                                    </AdminRoute>
                                }
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </TooltipPrimitive.Provider>
            </AuthProvider>
        </KeycloakProvider>
    </QueryClientProvider>
);

export default App;
