import { cn } from '../utils/common';

interface MobileLayoutProps {
  header?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export default function MobileLayout({
  header,
  content,
  className,
  footer,
}: MobileLayoutProps) {
  return (
    <div className={cn('flex flex-col h-screen', className)}>
      {header && <header>{header}</header>}
      <main className={cn('flex flex-col', 'flex-1 overflow-y-auto h-0 px-5')}>
        {content}
      </main>
      {footer && <footer>{footer}</footer>}
    </div>
  );
}
