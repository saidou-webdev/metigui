import React, { SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  selectClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  id?: string;
  className?: string; // pour compatibilité
}

const Select: React.FC<SelectProps> = ({
  selectClassName,
  labelClassName,
  errorClassName,
  label,
  error,
  id,
  options,
  className,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "block text-sm font-medium text-[#202124]", // texte sombre
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          'flex h-10 w-full rounded-md border border-[#1E1B23] bg-[#FFFFFF] px-3 py-2 text-sm placeholder:text-[#5F6368] focus:outline-none focus:ring-2 focus:ring-[#A6CE39] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
          {
            'border-[#E85D04] focus:ring-[#E85D04]': error, // orange foncé erreur
          },
          selectClassName,
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className={cn("text-sm text-[#E85D04]", errorClassName)}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
