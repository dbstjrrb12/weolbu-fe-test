import { type ComponentProps, type PropsWithChildren } from 'react';

import { cn } from '../utils/common';
import Input from './ui/Input';
import Button from './ui/Button';

interface FormProps extends PropsWithChildren {
  className?: string;
}

export default function Form({ children, className }: FormProps) {
  return (
    <form className={cn('flex flex-col gap-4', className)}>{children}</form>
  );
}

function Submit({ ...props }: Omit<ComponentProps<'button'>, 'type'>) {
  return <Button type="submit" {...props} />;
}

Form.Input = Input;
Form.Submit = Submit;
