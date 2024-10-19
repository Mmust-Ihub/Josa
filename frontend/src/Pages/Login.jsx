/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
function LoginForm() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const notification = toast.loading("authenticating...");

    let response;
    try {
      response = await fetch(
        `${apiBaseUrl}/api/v1/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Login successful", {
          id: notification,
        });

        // Login was successful
        const resp = await response.json();

        const access_token = await resp.data.access_token;
        const user = resp.data.user;

        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("User", user);
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("User", user);

        
        window.location.href = "/Admin";
      } else if (response.status === 401) {
        toast.error("Login failed, invalid credentials", {
          id: notification,
        });
        console.error("Login failed");
      }  else {
        toast.error("An error occurred", {
          id: notification,
        });
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      toast.error("An internal error occurred", {
        id: notification,
      });
      console.error("An internal error occurred:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Toaster />

      <div className="w-screen flex flex-col items-center justify-center h-screen mx-auto relative bg-[aliceblue]">
        <form
          className="w-96  h-2/3 flex flex-col  justify-center gap-5 px-8 shadow-lg rounded-lg relative z-10 bg-white"
          onSubmit={handleSubmit}
        >
          <img
            src="/images/logo.png"
            alt=""
            className="w-[150px] h-[150px] absolute top-0 translate-x-[50%] object-cover"
          />
          <div className="mt-6">
            <label className="text-gray-500" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email e.g example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-100  border-b-2 outline-none   px-2  w-full py-2 rounded-lg"
              autoComplete="false"
            />
          </div>
          <div>
            <label className="text-gray-500" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="password"
              className="bg-gray-100  border-b-2 outline-none   px-2  w-full py-2 rounded-lg"
              autoComplete="false"
            />
          </div>

          <button
            className="bg-gradient-to-r  from-indigo-500 via-purple-700 to-pink-500 p-2 rounded-3xl text-white mt-2"
            type="submit"
          >
            Sign In
          </button>
        
        </form>
       
      </div>
    </>
  );
}
export default LoginForm;