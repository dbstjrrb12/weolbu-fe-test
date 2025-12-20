import { type ComponentProps } from 'react';

import { cn } from '../../utils/common';
import Spinner from './Spinner';

interface ButtonProps extends ComponentProps<'button'> {
  loading?: boolean;
  variant?: 'primary' | 'outline';
}

export default function Button({
  children,
  disabled = false,
  loading = false,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled ?? loading}
      className={cn(
        'flex items-center justify-center',
        'text-sm px-2 py-3 rounded-md',
        {
          'opacity-50 cursor-not-allowed bg-gray-500': disabled,
          'bg-gray-900 text-white': variant === 'primary',
          'bg-white border border-gray-300 text-gray-900':
            variant === 'outline',
        },
        className,
      )}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
