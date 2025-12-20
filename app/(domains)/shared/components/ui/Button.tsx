import { type ComponentProps } from 'react';
import { cn } from '../../utils/common';

export default function Button({
  children,
  disabled = false,
  className,
  ...props
}: ComponentProps<'button'>) {
  return (
    <button
      className={cn(
        'text-white text-sm px-2 py-3 rounded-md bg-gray-900',
        {
          'opacity-50 cursor-not-allowed bg-gray-500': disabled,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
