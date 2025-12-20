import type { SVGProps } from 'react';

export default function IconChevronLeft({
  size = 24,
  color = '#141313',
  'aria-label': ariaLabel = '뒤로 가기',
  ...props
}: SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
  'aria-label'?: string;
}) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      color={color}
      aria-label={ariaLabel}
      {...props}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m12.5 19.5-8.075-7.125a.5.5 0 0 1 0-.75L12.5 4.5"
      />
    </svg>
  );
}
