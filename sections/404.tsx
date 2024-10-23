import React from 'react';
import Link from 'next/link';
import { FaExclamationTriangle } from 'react-icons/fa';

const Custom404 = () => {
  return (
    <section className="relative p-6 bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 primary-bg"></div>
      
      {/* Animated background circles */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-yellow-400 rounded-full opacity-30 animate-ping"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen space-y-6">
        {/* Exclamation Icon */}
        <FaExclamationTriangle className="text-yellow-500 text-6xl animate-bounce" />
        
        <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        
        {/* Home Button */}
        <Link href="/">
          <button className="inline-block px-8 py-4 bg-yellow-500 text-white text-lg font-bold rounded-full shadow-lg hover:bg-yellow-600 transition duration-300">
            Go Back to Home
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Custom404;
