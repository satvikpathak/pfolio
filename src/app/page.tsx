'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import LayoutWrapper from './components/LayoutWrapper';

export default function HomePage() {
  const { theme } = useTheme();

  return (
    <LayoutWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16"
      >
        <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Welcome to My Portfolio
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
          [Your Name], a passionate [Your Profession, e.g., Software Developer] creating innovative solutions.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            href="/about"
            className="px-6 py-3 bg-blue-500 dark:bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            Learn About Me
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            View Projects
          </Link>
          <Link
            href="/resume.pdf"
            download
            className="px-6 py-3 bg-green-500 dark:bg-green-600 text-white font-semibold rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
          >
            Download Resume
          </Link>
        </div>
      </motion.div>
    </LayoutWrapper>
  );
}