import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ToastContext } from './contexts/toastContext';
import Toast from '../Toast';
import { cn } from '../../utils/common';

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  const prevTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!toast) return;

    if (prevTimeout.current) clearTimeout(prevTimeout.current);

    prevTimeout.current = setTimeout(() => {
      setToast(null);
    }, 2000);
  }, [toast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}

      {toast && (
        <div className="fixed bottom-16 left-0 right-0">
          <Toast
            message={toast ?? ''}
            className={cn('mx-auto', {
              'animate-[slideup_0.2s_ease-in-out]': !!toast,
              'animate-[slidedown_0.2s_ease-in-out]': !toast,
            })}
          />
        </div>
      )}
    </ToastContext.Provider>
  );
}
