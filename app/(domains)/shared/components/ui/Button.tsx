import { type ComponentProps } from 'react';

import { cn } from '../../utils/common';
import Spinner from './Spinner';

interface ButtonProps extends ComponentProps<'button'> {
  loading?: boolean;
}

export default function Button({
  children,
  disabled = false,
  loading = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled ?? loading}
      className={cn(
        'flex items-center justify-center',
        'text-white text-sm px-2 py-3 rounded-md bg-gray-900',
        {
          'opacity-50 cursor-not-allowed bg-gray-500': disabled,
        },
        className,
      )}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
