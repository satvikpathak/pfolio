'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function AboutPage() {
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
          About Me
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
          I'm a passionate developer with a knack for creating innovative solutions and beautiful user experiences.
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          My Journey
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          With a background in [Your Field, e.g., Computer Science], I've spent the last [X years] building projects that solve real-world problems. From [mention a key experience, e.g., contributing to open-source projects] to [another key experience, e.g., working at a tech startup], I thrive on turning ideas into reality through code.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Skills
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
          <li className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">JavaScript / TypeScript</li>
          <li className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">React / Next.js</li>
          <li className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">Node.js</li>
          <li className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">CSS / Tailwind CSS</li>
          <li className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">[Add Skill, e.g., Python]</li>
          <li className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">[Add Skill, e.g., AWS]</li>
        </ul>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Beyond Code
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
          When I'm not coding, you can find me [Your Hobby, e.g., hiking in the mountains], [Another Hobby, e.g., experimenting with new recipes], or [Personal Touch, e.g., volunteering at local tech meetups]. I believe in balancing creativity with curiosity, both in work and life.
        </p>
      </motion.section>
    </div>
  );
}