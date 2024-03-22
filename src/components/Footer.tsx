import React from 'react';
import { Link } from 'react-router-dom'; // If applicable

const Footer = () => {
  return (
    <footer className="text-white body-font bg-red-600">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link to="/" className="flex title-font font-medium items-center md:justify-start justify-center text-white">
          {/* Logo or brand name */}
          <span className="ml-3 text-xl">takeUforward</span>
        </Link>
        <p className="text-sm text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© {new Date().getFullYear()} takeUforward —
          <a href="https://twitter.com/tuf_striver" className="text-white ml-1" rel="noopener noreferrer" target="_blank">@takeUforward</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
