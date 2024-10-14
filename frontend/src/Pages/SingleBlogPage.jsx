import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LatestBlogs from '../Component/LatestBlogs';
import CommentSection from '../Component/CommentSection';
import Skeleton from '../Component/Skeleton';
import NotFound from '../Component/NotFound';
import pic from '/images/profile.png'



const SingleBlogPage = () => {
  const { category, slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBlog, setIsBlog] = useState(true);

  

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      setLoading(true);
      try {
         await  fetch(`${apiBaseUrl}/api/v1/user/${category}/${slug}`)
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


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img src={blog.image} alt={blog.title} className="w-full h-64 md:h-[350px] object-cover rounded-lg mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
          <div className="flex items-center mb-6">
            <img src={blog.author_image || pic} alt={blog.author} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="font-semibold text-gray-800">{blog.author}</p>
              <p className="text-sm text-gray-500">{new Date(blog.published_on).toLocaleString()}</p>
            </div>
          </div>
          <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          <CommentSection comments={blog.comments || []} category={category} image_id={slug}/>
          
        </div>
        <div className="hidden lg:block">
          <LatestBlogs  />
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;