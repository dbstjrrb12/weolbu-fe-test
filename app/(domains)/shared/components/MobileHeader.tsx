import { cn } from '../utils/common';
import IconChevronLeft from './icons/IconArrowLeft';
import Button from './ui/Button';

interface MobileHeaderProps {
  left?: React.ReactNode;
  title: string;
  right?: React.ReactNode;
  className?: string;
}

export default function MobileHeader({
  left,
  title,
  right,
  className,
}: MobileHeaderProps) {
  return (
    <div
      className={cn('flex items-center justify-between p-4 w-full', className)}
    >
      <div className="w-6 h-6">{left}</div>
      <div className="text-lg font-bold">{title}</div>
      <div className="min-w-6 h-6">{right}</div>
    </div>
  );
}

MobileHeader.Back = function ({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="h-6 w-6">
      <IconChevronLeft size={24} />
    </button>
  );
};

MobileHeader.Logout = function ({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="h-6 w-fit text-sm">
      로그아웃
    </Button>
  );
};
