import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Calendar, Eye, MessageSquare, Edit } from 'lucide-react';
import NotFound from '../NotFound';
import Skeleton from '../Skeleton';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SingleBlogPage = () => {
  const { category, slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBlog, setIsBlog] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Mock data for demonstration
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      setLoading(true);
      try {
        await fetch(`${apiBaseUrl}/api/v1/user/${category}/${slug}`)
          .then((response) => {

            if (response.status !== 200) {
              setIsBlog(false);
              console.error(`Error: Received status ${response.status} from the server`);
              return null;
            }


            return response.json();
          })

          .then((data) => {
            setBlog(data);
          })
      } catch (error) {
        console.error('Error fetching single blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();




  }, [apiBaseUrl, slug, category]);




  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton type="main" />
            <div className="mt-8 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} type="list" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }



  if (!isBlog) {
    return <NotFound />;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Implement save logic here
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-4">
      <div className="mb-8">
        <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg shadow-md md:h-[350px]" />
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        {isEditing ? (
          <input
            type="text"
            value={blog.title}
            onChange={(e) => { e.target.value }}
            className="text-3xl font-bold mb-4 w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
        ) : (
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        )}
        <div className="flex items-center text-gray-600 mb-4">
          <User size={16} className="mr-2" />
          <span className="mr-4">{blog.author}</span>
          <Calendar size={16} className="mr-2" />
          <span className="mr-4">{blog.createdAt}</span>
          <Eye size={16} className="mr-2" />
          <span className="mr-4">{blog.views} views</span>
          <MessageSquare size={16} className="mr-2" />
          <span>{blog.comments.length} comments</span>
        </div>
        {isEditing ? (
          <ReactQuill
            value={blog.content} onChange={(e) => { e.target.value }}
            id='content'
            name='content'
            className="h-20 mb-4"
          />
        ) : (
          <p className="text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: blog.content }}></p>
        )}
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          >
            <Edit size={16} className="mr-2" /> Edit Blog
          </button>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {blog.comments.map((comment) => (
          <div key={comment.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
              <User size={16} className="mr-2 text-gray-600" />
              <span className="font-semibold">{comment.author}</span>
              <span className="text-gray-500 ml-2 text-sm">{new Date(comment.commented_on).toLocaleString()}</span>
            </div>
            <p className="text-gray-700">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleBlogPage;