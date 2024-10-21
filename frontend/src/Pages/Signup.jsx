/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import  { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function SignUpForm() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
 

 
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: "",
    password: "",
    confirm: '',  
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const notification = toast.loading("Registering...");

    let response;

    try {
     
        // Signup logic
        response = await fetch(`${apiBaseUrl}/api/v1/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            formData
          ),
        });
      
        console.log(response)
        console.log('FormData: ',formData)

      if (response.ok ) {
        toast.success("Registration successful", {
          id: notification,
        });

        const loginData = {
          email: formData.email,
          password: formData.password,
        };
  
        // Automatically log the user in after registration
        const loginResponse = await fetch(
          `${apiBaseUrl}/api/v1/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
          }
        );
  
        if (loginResponse.ok) {
          const resp = await loginResponse.json();
          const { access_token, user } = resp.data;
  
          // Store access token and user data in localStorage
          localStorage.setItem("accessToken", access_token);
          localStorage.setItem("User", JSON.stringify(user));
  
          // Redirect to admin page after successful login
          window.location.href = "/Admin";

}      } else {
        toast.error("Registration failed", { id: notification });
      }
    } catch (error) {
      toast.error("An internal error occurred", { id: notification });

    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Toaster />

      <div className="w-screen h-screen flex flex-col items-center justify-center bg-[aliceblue]">
        <form
          className="w-96 h-fit flex flex-col justify-center gap-3 px-8 py-2 shadow-lg rounded-lg bg-white"
          onSubmit={handleSubmit}
        >
              <div>
                <label htmlFor="first_name" className="text-gray-500">First Name:</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder="Byrone"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="bg-gray-100 border-b-2 px-2 w-full py-2 rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="text-gray-500">Last Name:</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  placeholder="Kingsly"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="bg-gray-100 border-b-2 px-2 w-full py-2 rounded-lg"
                />
              </div>
           

          <div>
            <label htmlFor="email" className="text-gray-500">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email e.g example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-100 border-b-2 px-2 w-full py-2 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-gray-500">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-100 border-b-2 px-2 w-full py-2 rounded-lg"
            />
          </div>

          
            <div>
              <label htmlFor="confirm" className="text-gray-500">Confirm Password:</label>
              <input
                type="password"
                id="confirm"
                name="confirm"
                placeholder="Confirm password"
                value={formData.confirm}
                onChange={handleChange}
                className="bg-gray-100 border-b-2 px-2 w-full py-2 rounded-lg"
              />
            </div>
        

          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 via-purple-700 to-pink-500 p-2 rounded-3xl text-white mt-2"
          >
           Sign Up
          </button>

         
        </form>
      </div>
    </>
  );
}

export default SignUpForm;
