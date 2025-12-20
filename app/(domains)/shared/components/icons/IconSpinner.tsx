import type { SVGProps } from 'react';

interface IconSpinnerProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

export default function IconLoading({
  size = 24,
  color = '#363738',
  ...props
}: IconSpinnerProps) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      color={color}
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M13.69 1.803a.75.75 0 0 1 .92-.527c4.686 1.273 8.14 5.503 8.14 10.54 0 6.05-4.979 10.934-11.095 10.934-4.714 0-8.748-2.9-10.353-6.996a.75.75 0 1 1 1.396-.547c1.384 3.53 4.869 6.043 8.957 6.043 5.31 0 9.595-4.235 9.595-9.433 0-4.33-2.97-7.99-7.033-9.093a.75.75 0 0 1-.527-.92"
        clipRule="evenodd"
      />
    </svg>
  );
}
