/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import pic from '/images/profile.png'
import DOMPurify from 'dompurify'




const MainNews = ({ category,blog }) => {


  const sanitizedSlug = DOMPurify.sanitize(blog.slug, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden  space-y-8">
      <img src={blog.image} alt={blog.title} className="w-full h-64 md:h-[350px] object-cover" />
      <div className="p-6">
        <Link to={`/${category}/${blog.slug}`} className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition duration-300 ease-in-out">
          {blog.title}
        </Link>
        <p className="mt-2 text-gray-600 line-clamp-3">{sanitizedSlug}</p>
        <div className="mt-4 flex items-center">
          <img src={ pic} alt={blog.author} className="w-10 h-10 rounded-full mr-4" />
          <div>
            <p className="font-semibold text-gray-800">{blog.author}</p>
            <p className="text-sm text-gray-500 flex items-center">
              <Clock size={14} className="mr-1" />
              {new Date(blog.published_on).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNews;