"use client";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

const Sidebar = () => {
  const menuItems = [
    { path: "/admin", icon: assets.home_icon, label: "Dashboard", end: true },
    { path: "/admin/addBlog", icon: assets.add_icon, label: "Add Blog" },
    { path: "/admin/listBlog", icon: assets.list_icon, label: "Blog List" },
    { path: "/admin/comments", icon: assets.comment_icon, label: "Comments" },
  ];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col bg-white border-r border-gray-200 min-h-full w-20 md:w-64 shadow-sm"
    >
      <div className="p-6 border-b border-gray-100">
        <h2 className="hidden md:block text-lg font-semibold text-gray-900">
          Admin Panel
        </h2>
      </div>

      <nav className="flex-1 pt-6">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <NavLink
              end={item.end}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 py-4 px-6 mx-3 rounded-2xl transition-all duration-300 group ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <motion.img
                    src={item.icon}
                    alt=""
                    className={`w-5 h-5 ${
                      isActive ? "brightness-0 invert" : ""
                    }`}
                    whileHover={{ scale: 1.1 }}
                  />
                  <span className="hidden md:block font-medium">
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;
