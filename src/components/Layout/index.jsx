import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <main>
      <nav className="bg-white border-gray-200 text-black px-2 sm:px-4 py-2.5 dark:bg-gray-900 dark:text-white">
        <Link to="/" className="font-bold text-center block">
          ToDo-Lists
        </Link>
      </nav>
      <section className="mx-16">{children}</section>
    </main>
  );
};

export default Layout;
