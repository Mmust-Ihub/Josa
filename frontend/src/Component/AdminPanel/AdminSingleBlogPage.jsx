import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, Calendar, Eye, MessageSquare, Edit } from 'lucide-react';
import NotFound from '../NotFound';
import Skeleton from '../Skeleton';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import toast, { Toaster } from "react-hot-toast";


const SingleBlogPage = () => {
  const { category, slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBlog, setIsBlog] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  useEffect(() => {
    if (blog) {
      setNewTitle(blog.title);
     
    }
  }, [blog]);




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

  const handleSave = async (event) => {
    setIsEditing(false);
    toast.loading("posting your blog...");
   
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("content", newContent);


    try {


      const response = await fetch(
        `${apiBaseUrl}/api/v1/admin/posts/update/${blog.slug}`,
        {
          method: "PUT",
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          body: formData,
        }
      );

      if (response?.ok) {
        toast.dismiss()
        toast.success("Blog post updated successfully");
        setNewTitle("");
        setNewContent("")

      } else {
        toast.dismiss()

        toast.error("Failed to update blog post");
        console.error("Failed to update blog post");
      }
    } catch (error) {
     
      toast.remove()

      toast.error("An error occurred");
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-5xl mx-auto mt-4 flex flex-col ">

        <div className="">
          <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-lg shadow-md md:h-[350px] p-2" />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          {isEditing ? (
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="text-3xl font-bold mb-4 w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 h-fit"
            />
          ) : (
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          )}
        
       
          <div className="flex items-center text-gray-600 mb-4 max-sm:flex-col max-sm:items-start">
            <User size={16} className="mr-2" />
            <span className="mr-4">{blog.author}</span>
            <Calendar size={16} className="mr-2" />
            <span className="mr-4">{new Date(blog.published_on).toLocaleString()}</span>
            <Eye size={16} className="mr-2" />
            <span className="mr-4">{blog.views} views</span>
            <MessageSquare size={16} className="mr-2" />
            <span>{blog.comments.length} comments</span>
          </div>
          {isEditing ? (
            <ReactQuill
              value={blog.content} onChange={(e) => setNewContent(e.target.value)}
              id='content'
              name='content'
              className="h-fit mb-4"
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
        <div className="p-2">
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
    </>
  );
};

export default SingleBlogPage;