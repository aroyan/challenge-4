/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  const year = new Date().getFullYear();
  const copyright = `© ${year} Aroyan. All Rights Reserved.`;

  return (
    <main>
      <nav className="flex  justify-between text-white bg-blue-600 border-blue-200 px-4 md:px-16 py-5 dark:bg-gray-900 ">
        <Link to="/" className="font-bold text-xl">
          To-do-do
        </Link>
        <div className="flex gap-4 items-center">
          <Link to="/">Home</Link>
          <Link to="/add">Add</Link>
        </div>
      </nav>
      <section className="mx-6 lg:mx-16">{children}</section>

      <footer className="p-4 bg-blue-600 text-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
        <span className="text-sm sm:text-center dark:text-gray-400">
          {copyright}
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm  dark:text-gray-400 sm:mt-0">
          <li>
            <a
              href="https://github.com/aroyan"
              className="mr-4 hover:underline md:mr-6 "
            >
              About
            </a>
          </li>
        </ul>
      </footer>
    </main>
  );
}

export default Layout;
