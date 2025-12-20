import { useId, type ComponentProps } from 'react';
import { cn } from '../../utils/common';

interface RadioProps extends ComponentProps<'input'> {
  label: string;
}

export default function Radio({ id, label, className, ...props }: RadioProps) {
  const radioId = id ?? useId();

  return (
    <div className={cn('flex items-center gap-2 shrink-0', className)}>
      <input type="radio" id={radioId} {...props} />
      <label htmlFor={radioId} className="whitespace-nowrap">
        {label}
      </label>
    </div>
  );
}
