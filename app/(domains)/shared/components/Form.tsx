import { type ComponentProps } from 'react';

import { cn } from '../utils/common';
import Input from './ui/Input';
import Button from './ui/Button';
import UISelect from './ui/Select';

interface FormProps extends ComponentProps<'form'> {}

export default function Form({ children, className, ...props }: FormProps) {
  return (
    <form className={cn('flex flex-col gap-4', className)} {...props}>
      {children}
    </form>
  );
}

function Submit({
  children,
  ...props
}: Omit<ComponentProps<typeof Button>, 'type'>) {
  return (
    <Button type="submit" {...props}>
      {children}
    </Button>
  );
}

function Select({
  options,
  ...props
}: ComponentProps<typeof UISelect> & {
  options?: Array<{ value: string; label: string }>;
}) {
  return (
    <UISelect {...props}>
      {options?.map((option) => (
        <UISelect.Option key={option.value} value={option.value}>
          {option.label}
        </UISelect.Option>
      ))}
    </UISelect>
  );
}

Form.Input = Input;
Form.Select = Select;
Form.Submit = Submit;
