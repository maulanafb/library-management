import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 h-full bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-2xl font-semibold border-b border-gray-700">
        Library Management
      </div>
      <ul className="flex-1">
        <li className={`p-4 ${isActive("/books") ? "text-yellow-300" : ""}`}>
          <NavLink to="/books" className="hover:text-yellow-300">
            Books 📚
          </NavLink>
        </li>
        <li
          className={`p-4 ${isActive("/categories") ? "text-yellow-300" : ""}`}
        >
          <NavLink to="/categories" className="hover:text-yellow-300">
            Categories 📃
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
