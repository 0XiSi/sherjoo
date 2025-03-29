'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true); // Controls header visibility

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Show the header when the user scrolls
      // setIsVisible(true);

      // Clear the previous timeout
      if (timeoutId) clearTimeout(timeoutId);

      // Hide the header after 3 seconds of inactivity
      timeoutId = setTimeout(() => {
        // setIsVisible(false);
      }, 3000); // 3 seconds
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Set initial timeout to hide the header
    timeoutId = setTimeout(() => {
      // setIsVisible(false);
    }, 3000);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <header
      className={`bg-white shadow-sm fixed top-0 left-0 right-0 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Sherjoo
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium ${
                pathname === '/' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium ${
                pathname === '/about' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium ${
                pathname === '/contact' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button (Optional) */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}