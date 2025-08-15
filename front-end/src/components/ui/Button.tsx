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
          // ✅ Couleurs Metigui officielles
          'bg-[#E67E22] text-white hover:bg-[#D35400] focus-visible:ring-[#E67E22]': variant === 'primary', // Orange brique
          'bg-[#2C3E50] text-white hover:bg-[#34495E] focus-visible:ring-[#2C3E50]': variant === 'secondary', // Bleu acier
          'border border-[#2C3E50] bg-transparent text-[#2C3E50] hover:bg-[#E67E22] hover:text-white focus-visible:ring-[#E67E22]': variant === 'outline', // Outline sobre
          'bg-transparent text-[#34495E] hover:bg-[#F0F0F1] focus-visible:ring-[#E67E22]': variant === 'ghost', // Léger
          'underline-offset-4 hover:underline text-[#E67E22]': variant === 'link', // Lien simple
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
