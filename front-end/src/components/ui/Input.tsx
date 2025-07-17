import React, { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelClassName?: string;     // ✅ ajouté
  errorClassName?: string;     // ✅ ajouté
  inputClassName?: string;
}

const Input: React.FC<InputProps> = ({
  className,
  label,
  error,
  id,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-[#202124]" // textdark
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'flex h-10 w-full rounded-md border border-[#1E1B23] bg-[#FFFFFF] px-3 py-2 text-sm placeholder:text-[#5F6368] focus:outline-none focus:ring-2 focus:ring-[#A6CE39] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
          {
            'border-[#E85D04] focus:ring-[#E85D04]': error, // orangedark pour erreur
          },
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-[#E85D04]">{error}</p>} {/* orangedark */}
    </div>
  );
};

export default Input;
