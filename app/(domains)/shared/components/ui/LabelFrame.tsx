import { ComponentProps } from 'react';
import { cn } from '../../utils/common';

interface LabelFrameProps extends ComponentProps<'div'> {
  htmlFor?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
}

export default function LabelFrame({
  htmlFor,
  label,
  children,
  className,
  helperText,
  error = false,
}: LabelFrameProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-medium text-gray-600">
          {label}
        </label>
      )}

      <div className="flex justify-between border border-gray-200 rounded-md p-2 focus-within:border-gray-900">
        {children}
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
