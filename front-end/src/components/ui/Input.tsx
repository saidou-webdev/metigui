import React, { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelClassName?: string;     // Pour personnaliser le style du label
  errorClassName?: string;     // Pour personnaliser le style de l'erreur
  inputClassName?: string;     // Pour personnaliser le style de l'input
  id?: string;
}

const Input: React.FC<InputProps> = ({
  className,
  label,
  error,
  id,
  labelClassName,
  errorClassName,
  inputClassName,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "block text-sm font-medium text-[#202124]", // couleur sombre Metigui
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "flex h-10 w-full rounded-md border border-[#1E1B23] bg-[#FFFFFF] px-3 py-2 text-sm placeholder:text-[#5F6368] focus:outline-none focus:ring-2 focus:ring-[#A6CE39] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          {
            "border-[#E85D04] focus:ring-[#E85D04]": error, // orange foncé si erreur
          },
          inputClassName,
          className
        )}
        {...props}
      />
      {error && (
        <p
          className={cn(
            "text-sm text-[#E85D04]", // texte orange foncé pour erreur
            errorClassName
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
