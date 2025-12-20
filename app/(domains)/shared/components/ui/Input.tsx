import { type ComponentProps, useId } from 'react';

import LabelFrame from './LabelFrame';

interface InputProps extends ComponentProps<'input'> {
  id?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
}

export default function Input({
  id,
  label,
  helperText,
  error = false,
  className,
  ...props
}: InputProps) {
  const inputId = id ?? useId();

  return (
    <LabelFrame
      label={label}
      htmlFor={inputId}
      helperText={helperText}
      error={error}
    >
      <input
        type="text"
        id={inputId}
        className="w-full outline-none"
        {...props}
      />
    </LabelFrame>
  );
}
