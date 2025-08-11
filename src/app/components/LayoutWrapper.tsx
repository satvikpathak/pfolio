'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { ReactNode } from 'react';

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16  bg-opacity-80 dark:bg-opacity-80 rounded-lg"
    >
      {children}
    </motion.div>
  );
}