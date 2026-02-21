'use client';

import { motion } from 'framer-motion';
import { PAGE_TRANSITION } from '@/lib/transitions';

const variants = {
  initial: PAGE_TRANSITION.initial,
  animate: PAGE_TRANSITION.animate,
  exit: PAGE_TRANSITION.exit,
};

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={PAGE_TRANSITION.transition}
    >
      {children}
    </motion.div>
  );
}
