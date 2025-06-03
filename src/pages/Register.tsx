
import React from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "@/components/RegistrationForm";
import { Footer } from "@/components/Footer";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-ortho-blue/20">
      <header className="py-6 px-4">
        <div className="container mx-auto">
          <div className="flex justify-center">
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
              <BreadcrumbPage>Cadastro</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <main className="flex-grow flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <RegistrationForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
