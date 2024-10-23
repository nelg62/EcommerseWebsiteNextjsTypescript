// https://stackademic.com/blog/how-to-create-a-nav-bar-component-using-react-with-typescript

import Link from "next/link";

const NavBar = () => {
  console.log("NavBar rendered");
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/products" className="text-white hover:underline">
            Products
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
