import { useEffect, useRef } from 'react';
import { cn } from '../utils/common';

interface ObserverProps {
  onIntersect: () => void;
  disabled?: boolean;
  threshold?: number;
  className?: string;
}

export default function Observer({
  onIntersect,
  disabled,
  threshold = 0.1,
  className,
}: ObserverProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          onIntersect();
        }
      },
      { root: null, threshold },
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [disabled, onIntersect, threshold]);

  return <div ref={ref} className={cn('w-full h-px', className)} />;
}
