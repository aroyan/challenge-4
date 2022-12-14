/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { EditContext } from '../../context/EditContext';
import Check from '../Icons/Check';

function Layout({ children }) {
  const year = new Date().getFullYear();
  const copyright = `© ${year} Aroyan. All Rights Reserved.`;
  const { setEditTodo } = useContext(EditContext);

  return (
    <main>
      <nav className="flex  justify-between text-white bg-blue-600 border-blue-200 px-4 md:px-16 py-5 dark:bg-gray-900 ">
        <Link
          to="/"
          className="font-bold text-xl flex items-center gap-1"
          onClick={() => setEditTodo('')}
        >
          <Check />
          To-do-do
        </Link>

        <div className="flex gap-4 items-center">
          <Link to="/" className="hover:border-b-yellow-600 hover:border-b-4">
            Home
          </Link>
          <Link
            to="/add"
            className="hover:border-b-yellow-600 hover:border-b-4"
          >
            Add
          </Link>
        </div>
      </nav>
      <section className="mx-6 lg:mx-16">{children}</section>

      <footer className="p-4 bg-blue-600 text-white shadow flex items-center justify-between dark:bg-gray-800">
        <span className="text-sm sm:text-center dark:text-gray-400">
          {copyright}
        </span>
        <Link
          to="/about"
          className="mr-4 hover:underline md:mr-6 text-sm dark:text-gray-400"
        >
          About
        </Link>
      </footer>
    </main>
  );
}

export default Layout;
