'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import GithubStarButton from './GithubStarButton';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/achievements', label: 'Achievements' },
    { href: '/resume.pdf', label: 'Resume', download: true },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 right-0 z-20 w-full sm:w-auto  bg-opacity-80 dark:bg-opacity-80 p-4 sm:p-6"
    >
      <div className="flex items-center justify-between sm:justify-end">
        {/* Hamburger Menu for Mobile */}
        <button
          className="sm:hidden text-gray-900 dark:text-gray-100 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? 'flex' : 'hidden'
          } sm:flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 absolute sm:static top-16 left-0 w-full sm:w-auto  bg-opacity-80 dark:bg-opacity-80 sm:bg-transparent sm:dark:bg-transparent p-4 sm:p-0`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              download={link.download}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <GithubStarButton />
          <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}