'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { FaStar } from 'react-icons/fa';
import Link from 'next/link';

export default function GithubStarButton() {
  const { theme } = useTheme();
  const [starCount, setStarCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch star count from GitHub API
  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/satvikpathak/pfolio', {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStarCount(data.stargazers_count);
        } else {
          console.error('Failed to fetch star count:', response.status);
        }
      } catch (error) {
        console.error('Error fetching star count:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStarCount();
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center"
    >
      <Link
        href="https://github.com/[yourusername]/[your-repo]"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Star repository on GitHub"
      >
        <FaStar className="mr-2" />
        <span>{loading ? '...' : starCount !== null ? starCount : 'Star'}</span>
      </Link>
    </motion.div>
  );
}