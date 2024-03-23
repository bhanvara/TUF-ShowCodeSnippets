import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white text-black body-font w-full">
      <div className="flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <Link to="https://takeuforward.org/" className="flex title-font font-medium items-center text-black mb-4 md:mb-0">
          {/* Optional: Insert SVG logo or image here */}
          <span className="ml-3 font-semibold text-3xl" style={{ fontFamily: 'Amaranth, Roboto, sans-serif' }}>takeUforward</span>
        </Link>
        <Link to="https://www.preplaced.in/?utm_source=website_p&utm_medium=inf&utm_campaign=page_home&utm_content=striver_cta&utm_term=website_visit" className="inline-flex items-center bg-red-600 text-white border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 transition-colors duration-200">
          Get 1:1 Mentorship
        </Link>
      </div>
    </header>
  );
};

export default Header;
