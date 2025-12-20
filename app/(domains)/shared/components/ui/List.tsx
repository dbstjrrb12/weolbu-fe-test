import { type ComponentProps } from 'react';
import { cn } from '../../utils/common';

interface ListProps extends ComponentProps<'ul'> {
  dir?: 'row' | 'column';
}

export default function List({
  dir = 'row',
  className,
  children,
  ...props
}: ListProps) {
  return (
    <ul
      className={cn(
        'flex',
        {
          'flex-row': dir === 'row',
          'flex-col': dir === 'column',
        },
        className,
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

function Item({ children, className, ...props }: ComponentProps<'li'>) {
  return (
    <li className={className} {...props}>
      {children}
    </li>
  );
}

List.Item = Item;
