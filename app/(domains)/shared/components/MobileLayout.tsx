import { type PropsWithChildren } from 'react';

import { cn } from '../utils/common';
import MobileHeader from './MobileHeader';

interface MobileLayoutProps extends PropsWithChildren {
  left?: React.ReactNode;
  title: string;
  right?: React.ReactNode;
  className?: string;
}

export default function MobileLayout({
  left,
  title,
  right,
  children,
  className,
}: MobileLayoutProps) {
  return (
    <div className={cn('flex flex-col h-screen', className)}>
      <MobileHeader left={left} title={title} right={right} />

      <main className="flex-1 overflow-y-auto h-0 px-5">{children}</main>
    </div>
  );
}
