import React from 'react';
import { Link } from 'react-router-dom'; // If applicable

const Footer = () => {
  return (
    <footer className="body-font bg-red-300">
      <div className="container px-5 py-2 mx-auto flex items-center sm:flex-row flex-col text-red-600 ">
        <Link to="https://takeuforward.org/" className="flex title-font font-medium items-center md:justify-start justify-center">

          <span className="ml-3 text-xl" style={{ fontFamily: 'Amaranth, Roboto, sans-serif' }}>takeUforward</span>
        </Link>
        <p className="text-sm sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-red-600 sm:py-2 sm:mt-0 mt-4 font-medium">© {new Date().getFullYear()} takeUforward —
          <a href="https://twitter.com/tuf_striver" className="ml-1" rel="noopener noreferrer" target="_blank">@tuf_striver</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
