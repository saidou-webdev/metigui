import React, { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        {
          // Couleurs MetiGui adaptées
          'bg-[#A6CE39] text-[#FFFFFF] hover:bg-[#F28C28] focus-visible:ring-[#A6CE39]': variant === 'primary', // primary green bg + orange hover
          'bg-[#2271B1] text-[#FFFFFF] hover:bg-[#1E1B23] focus-visible:ring-[#2271B1]': variant === 'secondary', // accentblue bg + dark hover
          'border border-[#1E1B23] bg-transparent text-[#1E1B23] hover:bg-[#F28C28] hover:text-[#FFFFFF] focus-visible:ring-[#F28C28]': variant === 'outline', // outline dark border + orange hover
          'bg-transparent text-[#1E1B23] hover:bg-[#F0F0F1] focus-visible:ring-[#A6CE39]': variant === 'ghost', // transparent with light gray hover
          'underline-offset-4 hover:underline text-[#2271B1]': variant === 'link', // link with accentblue
          'h-9 px-3 text-sm': size === 'sm',
          'h-10 px-4': size === 'md',
          'h-11 px-6': size === 'lg',
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
