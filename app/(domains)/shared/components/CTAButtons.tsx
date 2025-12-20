import { ComponentProps } from 'react';
import { cn } from '../utils/common';
import Button from './ui/Button';

interface CTAButtonsProps {
  mainText: string;
  mainProps: Omit<ComponentProps<typeof Button>, 'children'>;
  subText?: string;
  subProps?: Omit<ComponentProps<typeof Button>, 'children'>;
  className?: string;
}

export default function CTAButtons({
  mainText,
  mainProps,
  subText,
  subProps,
  className,
}: CTAButtonsProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-5 py-4 w-full gap-2',
        'border-t border-gray-200',
        className,
      )}
    >
      {subText && (
        <Button
          {...subProps}
          className={cn(
            'flex-1',
            'bg-white border border-gray-900 text-gray-900',
            subProps?.className,
          )}
        >
          {subText}
        </Button>
      )}
      <Button {...mainProps} className={cn('flex-1', mainProps?.className)}>
        {mainText}
      </Button>
    </div>
  );
}
