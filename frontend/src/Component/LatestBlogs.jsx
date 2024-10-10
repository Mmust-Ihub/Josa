/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

import { Clock } from 'lucide-react';


const LatestBlogs = () => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const apiUrl = "https://mmust-jowa.onrender.com/api/v1/user/blog/latest";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
      
        const extractedData = Object.keys(data).map((category) => ({
          ...data[category],
          category,
        }));
        setBlogs(extractedData);

        
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);



  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Blogs</h2>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="flex items-center space-x-4">
            {/* <img src={blog.image_id} alt={blog.title} className="w-20 h-20 object-cover rounded" /> */}
            <div>
              <Link to={`/${blog.category}/${blog.id}`} className="font-semibold text-gray-800 hover:text-blue-600 transition duration-300 ease-in-out">
                {blog.title}
              </Link>
              <p className="text-sm text-gray-500 flex items-center mt-1">
                <Clock size={14} className="mr-1" />
                {new Date(blog.published_on).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlogs;