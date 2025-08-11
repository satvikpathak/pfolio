'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function ProjectsPage() {
  const { theme } = useTheme();

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          My Projects
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
          A showcase of my work, from innovative web apps to impactful solutions.
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            [Project Name 1]
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
            [Brief Description, e.g., A full-stack web app built with Next.js and MongoDB to streamline task management.]
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <strong>Technologies:</strong> [e.g., Next.js, TypeScript, Tailwind CSS]
          </p>
          <div className="flex space-x-4">
            <Link href="[Project Live URL, e.g., https://project1.com]" className="text-blue-500 dark:text-blue-400 hover:underline">
              Live Demo
            </Link>
            <Link href="[GitHub URL, e.g., https://github.com/yourusername/project1]" className="text-blue-500 dark:text-blue-400 hover:underline">
              Source Code
            </Link>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            [Project Name 2]
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
            [Brief Description, e.g., A machine learning model deployed with Flask to predict stock trends.]
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <strong>Technologies:</strong> [e.g., Python, Flask, TensorFlow]
          </p>
          <div className="flex space-x-4">
            <Link href="[Project Live URL, e.g., https://project2.com]" className="text-blue-500 dark:text-blue-400 hover:underline">
              Live Demo
            </Link>
            <Link href="[GitHub URL, e.g., https://github.com/yourusername/project2]" className="text-blue-500 dark:text-blue-400 hover:underline">
              Source Code
            </Link>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            [Project Name 3]
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
            [Brief Description, e.g., A mobile-responsive e-commerce platform with payment integration.]
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <strong>Technologies:</strong> [e.g., React, Node.js, Stripe]
          </p>
          <div className="flex space-x-4">
            <Link href="[Project Live URL, e.g., https://project3.com]" className="text-blue-500 dark:text-blue-400 hover:underline">
              Live Demo
            </Link>
            <Link href="[GitHub URL, e.g., https://github.com/yourusername/project3]" className="text-blue-500 dark:text-blue-400 hover:underline">
              Source Code
            </Link>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            [Project Name 4]
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
            [Brief Description, e.g., A real-time chat application using WebSockets and Firebase.]
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <strong>Technologies:</strong> [e.g., React, Firebase, WebSocket]
          </p>
          <div className="flex space-x-4">
            <Link href="[Project Live URL, e.g., https://project4.com]" className="text-blue-500 dark:text-blue-400 hover:underline">
              Live Demo
            </Link>
            <Link href="[GitHub URL, e.g., https://github.com/yourusername/project4]" className="text-blue-500 dark:text-blue-400 hover:underline">
              Source Code
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}