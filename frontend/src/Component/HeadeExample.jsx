import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import useAuthToken from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

function Header() {
  const { clearAuthToken } = useAuthToken();
  const handleLogout = () => {
    const notification = toast.loading("loging out...");
    clearAuthToken();
    toast.success("Logout successful", {
      id: notification,
    });
    window.location.href = "/login";
  };
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const variants = {
    hidden: { y: "-100%" },
    visible: { y: 0 },
  };
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious();
    if (latest > prev && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const menuVariant = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
    },
    exit: {
      scaleY: 0,
    },
  };
  return (
    <motion.nav
      animate={hidden ? "hidden" : "visible"}
      variants={variants}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="w-screen z-50 sticky top-0 justify-center items-center flex flex-col "
    >
      <Toaster />
      <div className="w-[90%] max-w-[780px] flex flex-row justify-between bg-blue-200 py-5 px-4 rounded-br-xl md:rounded-br-2xl md:rounded-bl-2xl rounded-bl-xl">
        <div className="md:text-2xl text-xl font-semibold lg:text-3xl text-blue-500">
          Binary-Brigades CMS
        </div>
        <div className="flex flex-row gap-2 md:gap-4 justify-center items-center ">
          <p className="hidden md:block text-lg font-semibold text-gray-500">
            Hello Maich
          </p>

          <IoMenu
            onClick={toggleMenu}
            className="lg:text-3xl font-bold md:text-2xl text-xl hover:cursor-pointer"
          />
        </div>
        
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 origin-top w-full h-[50vh]  text-black justify-center items-center flex"
          >
            <div className="bg-blue-200 w-[90%] h-full max-w-[780px]  py-5 px-4 rounded-br-xl md:rounded-br-2xl md:rounded-bl-2xl rounded-bl-xl">
              <div className="flex flex-row justify-between">
                <div className="md:text-2xl text-xl font-semibold lg:text-3xl text-blue-500">
                  Binary-Brigades CMS
                </div>

                <IoIosAdd
                  onClick={toggleMenu}
                  className="lg:text-3xl font-bold md:text-2xl rotate-45 text-xl hover:cursor-pointer"
                />
              </div>
              <div className="w-full mt-10 capitalize justify-center items-center flex-1 p-10 gap-3 flex flex-col">
                <a
                  href="/"
                  className="hover:cursor-pointer font-semibold tracking-wider text-lg"
                >
                  Home
                </a>
                <a
                  href="/"
                  className="hover:cursor-pointer font-semibold tracking-wider text-lg"
                >
                  Add new Project
                </a>
                <button
                  onClick={handleLogout}
                  className="hover:cursor-pointer bg-blue-500 text-white w-full p-2 max-w-[200px] rounded-md font-semibold tracking-wider text-lg"
                >
                  Log Out
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
