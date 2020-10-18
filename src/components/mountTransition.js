import React from 'react';
import { motion } from 'framer-motion';

export function MountTransition({
  children,
  slide = 0,
  slideUp = 0,
  isMain = true,
}) {
  return (
    <motion.div
      className={isMain ? 'self-stretch w-full' : ''}
      exit={{ opacity: 0, x: slide, y: -1 * slideUp }}
      initial={{ opacity: 0, x: slide, y: slideUp }}
      animate={{ opacity: 1, x: 0, y: 0 }}>
      {children}
    </motion.div>
  );
}
