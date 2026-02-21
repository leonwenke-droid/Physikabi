'use client';

import { useEffect } from 'react';
import { useProgressStore } from '@/lib/progress';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      useProgressStore.persist?.rehydrate?.();
    } catch {
      // ignore rehydrate errors (e.g. corrupted localStorage)
    }
  }, []);

  return <>{children}</>;
}
