import { type ComponentProps, useId } from 'react';
import { cn } from '../../utils/common';

interface InputProps extends ComponentProps<'input'> {
  id?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
}

export default function Input({
  id,
  label,
  helperText,
  error = false,
  className,
  ...props
}: InputProps) {
  const inputId = id ?? useId();

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-600">
          {label}
        </label>
      )}

      <div className="flex justify-between border border-gray-200 rounded-md p-2 focus-within:border-gray-900">
        <input
          type="text"
          id={inputId}
          className="w-full outline-none"
          {...props}
        />
      </div>

      {helperText && (
        <span
          className={cn('text-xs text-gray-500', {
            'text-red-500': error,
          })}
        >
          {helperText}
        </span>
      )}
    </div>
  );
}
