import { ComponentProps } from 'react';
import { cn } from '../utils/common';

interface ToastProps extends ComponentProps<'div'> {
  message: string;
  ref?: (element: HTMLDivElement | null) => void;
}

export default function Toast({
  message,
  className,
  ref,
  ...props
}: ToastProps) {
  return (
    <div
      ref={ref}
      className={cn(
        'px-2 py-1',
        'h-fit w-fit max-w-[calc(100vw-40px)] transition-all duration-300 ease-out',
        'rounded-full bg-black',
        className,
      )}
      {...props}
    >
      <span className="text-white text-sm">{message}</span>
    </div>
  );
}
