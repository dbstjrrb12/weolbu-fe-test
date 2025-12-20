import type { SVGProps } from 'react';

import { cn } from '../../utils/common';
import IconSpinner from '../icons/IconSpinner';

interface SpinnerProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function Spinner({
  size = 24,
  color = '#363738',
  className,
  ...props
}: SpinnerProps) {
  return (
    <IconSpinner
      size={size}
      color={color}
      className={cn('animate-spin', className)}
      {...props}
    />
  );
}
