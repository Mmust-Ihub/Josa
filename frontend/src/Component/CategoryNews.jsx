/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import pic from '/images/profile.png'



const CategoryNews= ({ category, blogs }) => {

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 mt-8 space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
        <Link to={`/${category.toLowerCase()}`} className="text-blue-600 hover:text-blue-800 flex items-center">
          See More <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="border rounded-lg overflow-hidden">
            <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <Link to={`/${category.toLowerCase()}/${blog.slug}`} className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300 ease-in-out">
                {blog.title}
              </Link>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <img src={ pic} alt={blog.author} className="w-6 h-6 rounded-full mr-2" />
                <span>{blog.author}</span>
                <span className="mx-2">•</span>
                <Clock size={14} className="mr-1" />
                <span>{new Date(blog.published_on).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryNews;