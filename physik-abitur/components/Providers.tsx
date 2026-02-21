'use client';

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useProgressStore } from '@/lib/progress';
import { PageTransition } from '@/components/layout/PageTransition';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      useProgressStore.persist?.rehydrate?.();
    } catch {
      // ignore rehydrate errors (e.g. corrupted localStorage)
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={pathname}>{children}</PageTransition>
    </AnimatePresence>
  );
}
