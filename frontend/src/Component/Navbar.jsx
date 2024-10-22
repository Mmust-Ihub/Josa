import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import NewsNavBar from "./NewsNavBar";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const newsCategories = [
    { title: "Featured", link: "/news/featured" },
    { title: "MMust News", link: "/news/mmust-news" },
    { title: "County News", link: "/news/county-news" },
    { title: "National News", link: "/news/national-news" },
    { title: "International News", link: "/news/international-news" },
  ];

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 1,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const menuVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    exit: {
      scaleY: 0,
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const isNews = location.pathname.startsWith("/news");

  return (
    <>
      <motion.nav
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="w-full text-white flex flex-row bg-gradient-to-r from-indigo-500 via-purple-700 to-pink-500 justify-between items-center fixed top-0 left-0 px-4 md:px-20 lg:px-40 z-50"
      >
        <Link to="/" className="z-50">
          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 object-cover cursor-pointer"
            src="/images/logo.png"
            alt="Logo"
          />
        </Link>

        <div className="flex items-center">
          <ul className="hidden md:flex space-x-8">
            {["Home", "News", "Business", "Sports", "Entertainment"].map(
              (item, index) => (
                <motion.li
                  key={item}
                  custom={index}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="relative group"
                >
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-white hover:text-gray-200 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                  {item === "News" && (
                    <AnimatePresence>
                      {isMenuOpen && (
                        <motion.ul
                          variants={menuVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50"
                        >
                          {newsCategories.map((category, idx) => (
                            <motion.li
                              key={category.title}
                              variants={listItemVariants}
                              custom={idx}
                            >
                              <Link
                                to={category.link}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={closeMenu}
                              >
                                {category.title}
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  )}
                </motion.li>
              )
            )}
          </ul>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="md:hidden mr-4 text-white focus:outline-none"
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden "
            onClick={closeMenu}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-64 pt-4 bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="pt-20 px-4">
                {["Home", "News", "Business", "Sports", "Entertainment"].map(
                  (item, index) => (
                    <motion.li
                      key={item}
                      custom={index}
                      variants={listItemVariants}
                      initial="hidden"
                      animate="visible"
                      className="mb-4"
                    >
                      <Link
                        to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                        className="text-gray-800 hover:text-indigo-600 transition-colors duration-200"
                        onClick={closeMenu}
                      >
                        {item}
                      </Link>
                      {item === "News" && (
                        <ul className="ml-4 mt-2 space-y-2">
                          {newsCategories.map((category) => (
                            <li key={category.title}>
                              <Link
                                to={category.link}
                                className="text-sm text-gray-600 hover:text-indigo-600"
                                onClick={closeMenu}
                              >
                                {category.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.li>
                  )
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isNews && (
        <motion.div
          className="w-full z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ marginTop: "3rem" }} // Space below Navbar
        >
          <NewsNavBar />
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
