
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CustomButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ 
  children, 
  className, 
  variant = "default",
  ...props 
}) => {
  const baseClasses = variant === "default" 
    ? "bg-blue-600 hover:bg-blue-700 text-white" 
    : "";

  return (
    <Button 
      className={cn(baseClasses, className)} 
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  );
};
