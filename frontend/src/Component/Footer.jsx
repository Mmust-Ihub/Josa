import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    window.open(
      `mailto:mmustjournalismstudentsassocia@gmail.com?subject=Message from ${name}&body=${message}`
    );
  };
  return (
    <footer className="bg-gradient-to-r from-indigo-500 via-purple-700 to-pink-500 mt-7 pb-5 text-white">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 ">
        <div className="grid row-gap-10 lg:grid-cols-6 ">
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-3">
            <div>
              <p className="font-bold tracking-wide ">Quicklinks</p>
              <ul className="mt-2 space-y-2 ">
                <li>
                  <a
                    href="/news"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    News
                  </a>
                </li>
                <li>
                  <a
                    href="/sports"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Sports
                  </a>
                </li>
                <li>
                  <a
                    href="/business"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Business
                  </a>
                </li>
                <li>
                  <a
                    href="/entertainment"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Entertainment
                  </a>
                </li>
                <li>
                  <a
                    href="/Admin"
                    className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                  >
                    Admin
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold tracking-wide ">Contacts</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <p className="">
                    Phone No:
                    <a
                      href="tel:0719130153"
                      className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                      {" "}
                      0719130153
                    </a>
                  </p>
                </li>
                <li>
                  <p className="text-sm truncate">
                    E-mail:
                    <a
                      href="mailto:mmustjournalismstudentsassocia@gmail.com"
                      className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                    >
                      {" "}
                      mmustjournalismstudentsassocia@gmail.com
                    </a>
                  </p>
                </li>
                <li>
                  <p className="">
                    Address:
                    <a
                      href="https://maps.app.goo.gl/xMzxeS7bvosvekHv6"
                      target="_blank"
                      className=" transition-colors duration-300 hover:text-deep-purple-accent-200"
                      rel="noreferrer"
                    >
                      {" "}
                      190-50100, Kakamega
                    </a>
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold tracking-wide ">Social Media</p>
              <div className="flex items-center mt-1 space-x-3">
                <a
                  href="/"
                  className=" transition-colors duration-300 hover:text-gray-300"
                >
                  <Link
                    to="https://youtube.com/@MMUSTJOURNALISMSTUDENTSASSOCIA?si=G7xSxci9J2zWtcDN"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      fill="currentColor"
                      className="h-6"
                    >
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                    </svg>
                  </Link>
                </a>
                <a
                  href="/"
                  className="transition-colors duration-300 hover:text-gray-300"
                >
                  <Link
                    to="https://www.facebook.com/profile.php?id=100086633626518"
                    target="_blank"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5"
                    >
                      <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z"></path>
                    </svg>
                  </Link>
                </a>
              </div>
              <p className="mt-4 text-sm font-bold">MMUST JOSA DIGITAL NEWS.</p>
            </div>
          </div>
          <div className="md:mx-10 md:max-w-md lg:col-span-2">
            <span className="text-sm font-semibold tracking-wide ">
              Message Us
            </span>
            <form
              className="block mt-4 "
              onSubmit={handleSubmit}
              // method="post"
              // action={`mailto:https://mmustjournalismstudentsassocia@gmail.com?subject=Message from ${name}&body=${message}`}
              // encType="multipart/form-data"
            >
              {/* <form > */}
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
                type="text"
                className="flex-grow w-full h-12 px-4 mb-3 transition duration-200 bg-white text-gray-800 border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              />
              <input
                placeholder="Email"
                required={true}
                type="email"
                className="flex-grow w-full mt-5 h-12 px-4 mb-3 transition duration-200 bg-white text-gray-800 border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              />
              <input
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required={true}
                type="textarea"
                height={100}
                className="flex-grow w-full mt-5 h-12 px-4 mb-3 transition duration-200 bg-white text-gray-800 border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              />
              <input
                type="submit"
                value="Send Email"
                className="mt-5 inline-flex items-center justify-center h-12 px-6 font-bold tracking-wide  transition duration-200 rounded shadow-md bg-deep-purple-accent-400 border-2 cursor-pointer hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
              />
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}
