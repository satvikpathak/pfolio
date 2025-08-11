'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import LayoutWrapper from '../components/LayoutWrapper';

export default function ResumePage() {
  const { theme } = useTheme();

  // Trigger automatic download on page load
  useEffect(() => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <LayoutWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Resume
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Your resume download should have started automatically. If it didn't, click the button below.
        </p>
        <Link
          href="/resume.pdf"
          download
          className="inline-block px-6 py-3 bg-blue-500 dark:bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        >
          Download Resume
        </Link>
      </motion.div>
    </LayoutWrapper>
  );
}