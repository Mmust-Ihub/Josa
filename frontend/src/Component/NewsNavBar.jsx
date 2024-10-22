import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const NewsNavBar = () => {
    const categories = [
      { title: "Featured", link: "/news/featured" },
      { title: "MMust News", link: "/news/mmust-news" },
      { title: "County News", link: "/news/county-news" },
      { title: "National News", link: "/news/national-news" },
      { title: "International News", link: "/news/international-news" },
    ];

    const containerVariants = {
      hidden: { opacity: 0, y: -20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          staggerChildren: 0.1,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: -10 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="fixed left-0  md:px-20 lg:px-40 max-[768px]:px-10 z-40  w-full pb-1 pt-4 px-12  max-[768px]:hidden flex-row justify-bewtween text-white items-end bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-300"
      >
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className=" ml-3  hover:text-gray-300 hover:mx-4 transition-all duration-200 hover:underline"
            >
              {category.title}
            </Link>
          ))}
      </motion.nav>
    );
};

export default NewsNavBar;