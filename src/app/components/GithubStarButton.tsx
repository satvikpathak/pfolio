'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { FaStar } from 'react-icons/fa';

export default function GithubStarButton() {
  const { theme } = useTheme();
  const [starCount, setStarCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Repository configuration
  const GITHUB_REPO = 'satvikpathak/pfolio';
  const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;

  // Fetch star count from GitHub API
  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setStarCount(data.stargazers_count);
        } else {
          console.error('Failed to fetch star count:', response.status, response.statusText);
          // Set fallback text instead of null
          setStarCount(0);
        }
      } catch (error) {
        console.error('Error fetching star count:', error);
        // Set fallback for network errors
        setStarCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchStarCount();
  }, []);

  // Format star count for display
  const formatStarCount = (count: number | null): string => {
    if (count === null) return 'Star';
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center"
    >
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        aria-label={`Star ${GITHUB_REPO} repository on GitHub`}
      >
        <FaStar className="mr-2 text-yellow-400" />
        <span className="font-medium">
          {loading ? '...' : formatStarCount(starCount)}
        </span>
      </a>
    </motion.div>
  );
}