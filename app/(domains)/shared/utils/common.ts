import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const toNumber = (value?: string) => {
  return value ? Number(value.replace(/[^\d]/g, '')) : 0;
};

export const formatPrice = (price?: string) => {
  return price ? Intl.NumberFormat('ko-KR').format(toNumber(price)) : '';
};
