import React, { TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  textareaClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  id,
  textareaClassName,
  labelClassName,
  errorClassName,
  className,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "block text-sm font-medium text-[#202124]",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-[#1E1B23] bg-[#FFFFFF] px-3 py-2 text-sm placeholder:text-[#5F6368] focus:outline-none focus:ring-2 focus:ring-[#A6CE39] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
          {
            'border-[#E85D04] focus:ring-[#E85D04]': error,
          },
          textareaClassName,
          className
        )}
        {...props}
      />
      {error && (
        <p className={cn("text-sm text-[#E85D04]", errorClassName)}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;
