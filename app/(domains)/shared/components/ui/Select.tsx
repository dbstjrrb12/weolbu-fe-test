import { ComponentProps, useId } from 'react';

import LabelFrame from './LabelFrame';

interface SelectProps extends ComponentProps<'select'> {
  id?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
}

export default function Select({
  id,
  label,
  helperText,
  error,
  ...props
}: SelectProps) {
  const selectId = id ?? useId();

  return (
    <LabelFrame
      label={label}
      htmlFor={selectId}
      helperText={helperText}
      error={error}
    >
      <select id={selectId} className="w-full outline-none" {...props} />
    </LabelFrame>
  );
}

function Option({ ...props }: ComponentProps<'option'>) {
  return <option {...props} />;
}

Select.Option = Option;
