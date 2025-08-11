'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors focus:outline-none"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
    </motion.button>
  );
}