import React, { useState, useEffect,useCallback } from "react";
import pic from '/images/profile.png'


export default function Navbar() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isNavbarMenuOpen, setIsNavbarMenuOpen] = useState(false);
  const [user, setUser]  = useState(null)

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleLogOut = () => {
   
    localStorage.removeItem("accessToken");
    localStorage.removeItem("User");
    window.location.href = "/login";
  };

  const fetchUser = useCallback(async()=>{
    await fetch (`${apiBaseUrl}/api/v1/admin/get/profile`,{
      'content-type': 'application/json',
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        return null;
      }
      return response.json();
    })
    .then((data) => {
      setUser(data);



    })
  },[apiBaseUrl])

  useEffect(() => {
    fetchUser()
    console.log('User',user)
  }, [fetchUser,user]);




  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-500 via-purple-700 to-pink-500 border-gray-200  fixed w-full z-[10000] top-0 start-0  ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/images/logo.png" className="h-8" alt="Josa logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">M-JOSA</span>
          </a>
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* User Menu Button */}
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}  // Toggle user dropdown
            >
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src={user?.image || pic} alt="user photo" />
            </button>

            {/* User Dropdown */}
            {isUserDropdownOpen && (
              <div className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-4 top-16">
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">{user?.first_name}  {user.last_name}</span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user?.email || 'user@gmail.com'} </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                 
                  <li>
                    <a href="#"  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</a>
                  </li>
                  <li>
                    <a href="#" onClick={handleLogOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                  </li>
                </ul>
              </div>
            )}

            {/* Navbar Toggle Button */}
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setIsNavbarMenuOpen(!isNavbarMenuOpen)}  // Toggle mobile menu
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>

          {/* Navbar Menu */}
          <div className={`${isNavbarMenuOpen ? 'block' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4   md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0  ">
              <li>
                <a href="/" className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 " aria-current="page">Home</a>
              </li>
              <li>
                <a href="/Admin" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Dashboard</a>
              </li>
              <li className="relative">  {/* Set the parent element as relative */}
                <button
                  onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}  // Toggle categories dropdown
                  className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Categories
                  <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                  </svg>
                </button>

                {/* Categories Dropdown */}
                {isCategoriesDropdownOpen && (
                  <div id="dropdownNavbar" className="absolute left-0 top-full z-10 mt-2 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                      <li>
                        <a href="/Admin/news" onClick={()=>setIsCategoriesDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">News</a>
                      </li>
                      <li>
                        <a href="/Admin/sports" onClick={()=>setIsCategoriesDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sports</a>
                      </li>
                      <li>
                        <a href="/Admin/business" onClick={()=>setIsCategoriesDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Business</a>
                      </li>
                      <li>
                        <a href="/Admin/entertainment" onClick={()=>setIsCategoriesDropdownOpen(false)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Entertainment</a>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <a href="/Admin/CreateBlog" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Add Blog</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
