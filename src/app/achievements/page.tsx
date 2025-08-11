'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function AchievementsPage() {
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
          Achievements
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
          A collection of milestones and accomplishments I'm proud of.
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Professional Milestones
        </h2>
        <ul className="space-y-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
          <li className=" p-4 rounded-lg">
            <strong>[Year, e.g., 2023]</strong>: Led development of [Project Name], resulting in [specific impact, e.g., 50% increase in user engagement].
          </li>
          <li className=" p-4 rounded-lg">
            <strong>[Year, e.g., 2022]</strong>: Received [Award Name, e.g., Best Developer Award] at [Event/Organization].
          </li>
          <li className=" p-4 rounded-lg">
            <strong>[Year, e.g., 2021]</strong>: Contributed to [Open Source Project], with [specific contribution, e.g., 10+ merged pull requests].
          </li>
        </ul>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Certifications
        </h2>
        <ul className="space-y-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
          <li className=" p-4 rounded-lg">
            <strong>[Year, e.g., 2024]</strong>: [Certification Name, e.g., AWS Certified Developer] from [Issuing Organization].
          </li>
          <li className=" p-4 rounded-lg">
            <strong>[Year, e.g., 2023]</strong>: [Certification Name, e.g., Google Cloud Professional Architect] from [Issuing Organization].
          </li>
        </ul>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Personal Achievements
        </h2>
        <ul className="space-y-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
          <li className=" p-4 rounded-lg">
            <strong>[Year, e.g., 2023]</strong>: Completed [Personal Goal, e.g., a marathon] in [Location/Event].
          </li>
          <li className=" p-4 rounded-lg">
            <strong>[Year, e.g., 2022]</strong>: Organized [Event, e.g., a local tech meetup] for [Number] attendees.
          </li>
        </ul>
      </motion.section>
    </div>
  );
}