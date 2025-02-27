import React, { useState, useEffect } from 'react';
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';

interface NavItem {
  name: string;
  href: string;
}

interface Props {
  logo: ImageMetadata;
  currentPath: string;
}

const navItems: NavItem[] = [
  { name: "Strona główna", href: "/" },
  { name: "Usługi", href: "/uslugi" },
  { name: "O nas", href: "/o-nas" },
  { name: "Blog", href: "/blog" },
];

export default function Navigation({ logo, currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Text */}
          <div className="flex items-center space-x-2">
            <a href="/" className="flex-shrink-0">
              <img src={logo.src} alt="Logo" className="h-8 w-auto" />
            </a>
            <div className="flex items-center">
              <span className="text-lg font-serif font-bold text-primary-600">
                mckenzi<span className="text-gray-600">.co.uk</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Enhanced */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`
                  relative px-4 py-2 text-sm font-medium transition-all duration-200
                  group hover:text-primary-600
                  ${currentPath === item.href 
                    ? 'text-primary-600' 
                    : 'text-gray-700'
                  }
                `}
              >
                {item.name}
                {/* Animated underline effect */}
                <span className={`
                  absolute bottom-0 left-0 w-full h-0.5 rounded-full transform origin-left transition-transform duration-300
                  ${currentPath === item.href
                    ? 'bg-primary-600 scale-x-100'
                    : 'bg-primary-600/80 scale-x-0 group-hover:scale-x-100'
                  }
                `} />
              </a>
            ))}
            {/* Contact Button */}
            <a
              href="/kontakt"
              className="ml-6 px-4 py-2 text-sm font-medium text-white bg-primary-600 
                       rounded-lg hover:bg-primary-700 transition-colors duration-200
                       shadow-sm hover:shadow-md"
            >
              Kontakt
            </a>
          </div>

          {/* Improved Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 
                     hover:bg-gray-100 transition-all duration-200 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <div className="relative w-6 h-5">
              <span className={`absolute w-6 h-[2px] bg-gray-800 transform transition-all duration-300 ease-in-out
                ${isOpen ? 'top-2.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute w-6 h-[2px] bg-gray-800 transform transition-all duration-300 ease-in-out
                ${isOpen ? 'opacity-0' : 'top-[10px]'}`} />
              <span className={`absolute w-6 h-[2px] bg-gray-800 transform transition-all duration-300 ease-in-out
                ${isOpen ? 'top-2.5 -rotate-45' : 'top-[20px]'}`} />
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Navigation Overlay */}
        <div
          className={`fixed inset-0 md:hidden bg-black/30 backdrop-blur-sm transform transition-all duration-300
            ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsOpen(false)}
        >
          {/* Mobile Menu Panel */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-[320px] bg-white shadow-2xl transform transition-all duration-300
              ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            onClick={e => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="text-lg font-semibold text-gray-900">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="px-4 py-6">
              <div className="space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-base font-medium rounded-xl
                      transition-all duration-200 ease-in-out
                      ${currentPath === item.href 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Footer with Messenger Button */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-50 border-t border-gray-100">
              <a
                href="https://m.me/YOUR_FACEBOOK_USERNAME" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white 
                         bg-[#0084FF] rounded-xl hover:bg-[#0072db] transition-colors duration-200 gap-2"
              >
                <svg 
                  className="w-5 h-5" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z" />
                </svg>
                Napisz na Messenger
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 