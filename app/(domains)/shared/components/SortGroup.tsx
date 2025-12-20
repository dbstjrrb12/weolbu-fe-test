import { cn } from '../utils/common';
import Radio from './ui/Radio';

interface SortGroupProps<T extends string> {
  name: string;
  items: { label: string; value: T }[];
  defaultValue?: T;
  className?: string;
  onChange?: (value: T) => void;
}

export default function SortGroup<T extends string>({
  name,
  items,
  className,
  onChange,
  defaultValue,
}: SortGroupProps<T>) {
  return (
    <div
      className={cn(
        'flex justify-start items-center gap-2 overflow-x-auto',
        className,
      )}
    >
      {items.map((item) => (
        <Radio
          key={item.value}
          name={name}
          value={item.value}
          label={item.label}
          defaultChecked={defaultValue === item.value}
          onChange={() => onChange?.(item.value)}
          className="text-sm"
        />
      ))}
    </div>
  );
}
