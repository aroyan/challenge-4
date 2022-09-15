/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <main>
      <nav className="bg-white border-gray-200 text-black px-2 sm:px-4 py-2.5 dark:bg-gray-900 dark:text-white">
        <Link to="/" className="font-bold text-center block">
          ToDo-Lists
        </Link>
      </nav>
      <section className="mx-6 lg:mx-16">{children}</section>
    </main>
  );
}

export default Layout;
