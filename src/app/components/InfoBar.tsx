'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function InfoBar() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed z-10 lg:left-0 lg:top-0 lg:bottom-0 lg:w-64 w-full bottom-0 lg:h-full h-16 bg-gray-100 dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 flex lg:flex-col flex-row items-center lg:items-start justify-center lg:justify-start lg:p-6 p-4 space-y-4 lg:space-y-6 space-x-4 lg:space-x-0"
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 hidden lg:block">
        Connect
      </h2>
      <div className="flex lg:flex-col flex-row lg:space-y-4 space-x-4">
        <Link
          href="[Your GitHub URL, e.g., https://github.com/yourusername]"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <FaGithub className="mr-2 lg:mr-0 lg:mb-2" /> 
          <span className="hidden lg:inline">GitHub</span>
        </Link>
        <Link
          href="[Your LinkedIn URL, e.g., https://linkedin.com/in/yourusername]"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <FaLinkedin className="mr-2 lg:mr-0 lg:mb-2" /> 
          <span className="hidden lg:inline">LinkedIn</span>
        </Link>
        <Link
          href="[Your Twitter URL, e.g., https://twitter.com/yourusername]"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <FaTwitter className="mr-2 lg:mr-0 lg:mb-2" /> 
          <span className="hidden lg:inline">Twitter</span>
        </Link>
        <Link
          href="mailto:[Your Email, e.g., yourname@example.com]"
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          <FaEnvelope className="mr-2 lg:mr-0 lg:mb-2" /> 
          <span className="hidden lg:inline">Email</span>
        </Link>
      </div>
    </motion.div>
  );
}