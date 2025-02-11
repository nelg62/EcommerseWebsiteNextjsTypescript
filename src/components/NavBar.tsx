// https://stackademic.com/blog/how-to-create-a-nav-bar-component-using-react-with-typescript

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  console.log("NavBar rendered");
  return (
    <nav className="bg-gray-300 dark:bg-gray-800 p-4 flex justify-between">
      <ul className="flex space-x-4">
        <li>
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-300 hover:underline"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            className="text-gray-600 dark:text-gray-300 hover:underline"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href="/cart"
            className="text-gray-600 dark:text-gray-300 hover:underline"
          >
            Cart
          </Link>
        </li>
      </ul>
      <div className="">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
