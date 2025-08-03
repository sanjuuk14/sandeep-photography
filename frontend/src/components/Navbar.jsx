import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  // const navItems = ["Home", "Portfolio", "Services", "About", "Contact"];

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-black fixed top-0 left-0 shadow-md z-50 text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
          <h1
            style={{ fontFamily: "Lavishly Yours" }}
            className=" text-4xl md:text-3xl   transform  duration-500 "
          >
            <Link className="flex   hover:text-blue-400" to="/">
              Sandeep Photography
              <img src="/images/logo.png" className=" w-11 md:w-10  " alt="" />
            </Link>
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden  md:flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
              >
                <li className=" cursor-pointer hover:bg-blue-500 p-1 rounded-sm  duration-200 ">
                  {item.name}
                </li>
              </NavLink>
            ))}
          </ul>

          {/* Mobile view svg toggle*/}
          <div className="md:hidden  ">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <svg
                className="w-6 h-6 cursor-pointer  "
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menus  */}

        {menuOpen && (
          <ul className=" md:hidden mx-25 px-4 pb-4 space-y-2   animate-[fadeInDown_0.1s_ease-in_forwards]">
            {navItems.map((item) => (
              <NavLink className="" key={item.name} to={item.path}>
                <li
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer py-1 md:p-2 border rounded-xl m-2 hover:bg-blue-400 duration-200 text-center hover:animate-pulse "
                >
                  {item.name}
                </li>
              </NavLink>
            ))}
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;
