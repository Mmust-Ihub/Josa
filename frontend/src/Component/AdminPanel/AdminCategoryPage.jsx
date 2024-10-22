/* eslint-disable react/prop-types */
import { useState, useEffect,useCallback } from 'react';

import { useParams, Link } from 'react-router-dom';
import { Eye, MessageSquare, Trash2, Edit } from 'lucide-react';
import NotFound from '../NotFound';
import EmptyContainer from '../EmptyContainer';
import Skeleton from '../Skeleton';
import toast, { Toaster } from "react-hot-toast";
// import DeleteAction from '../DeleteAction';

import Swal from 'sweetalert2';
// import { TrashIcon } from '@heroicons/react/24/outline'





    

const CategoryPage = () => {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBlog, setIsBlog] = useState(true);

  



  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

  //   {{dev_base_url}}/api/v1/admin/posts/{category}

  // Mock data for demonstration

  
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      await fetch(`${apiBaseUrl}/api/v1/admin/posts/${category}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + localStorage.getItem("accessToken"),
        },

      })
        .then((response) => {
          if (response.status !== 200) {
            setIsBlog(false);
            return null;
          }
          return response.json();
        })
        .then((data) => {
          const valuesArray = Object.values(data);

          setBlogs(valuesArray);
        })
    } catch (error) {
      console.error('Error fetching category news:', error);
    } finally {
      setLoading(false);
    }
  },[apiBaseUrl, category])

  useEffect(() => {
    window.scrollTo(0, 0);

   

    fetchData();

  }, [fetchData]);

 


  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8  ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton type="main" />
          </div>
          <div className="hidden lg:block">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} type="list" />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} type="card" />
          ))}
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return <EmptyContainer category={category} />;
  }

  if (!isBlog) {
    return <NotFound />;
  }
  return (
    <>
    <Toaster/>
    <div className='md:m-20 m-10'>
      <h1 className="text-3xl font-bold mb-6 capitalize ">{category} Blogs</h1>
      <div className="grid gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} category={category} fetchData={fetchData} />
        ))}
      </div>
    </div>
    </>
  );
};

const BlogCard = ({ blog, category, fetchData }) => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL


  


  const handleDelete = () => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`${apiBaseUrl}/api/v1/admin/posts/delete/${blog.slug}`,
            {          
              method:'DELETE',
              headers: {
                Authorization: `Bearer ` + localStorage.getItem("accessToken"),
              }
            }
          )
            .then((response) => {
              if (response?.ok) {
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');

                fetchData()

              }
              return response.json();
            })



    
        } catch (error) {
    
          toast.remove()
    
          toast.error("An error occurred")
          console.error("An error occurred:", error);
    
        }
      }
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden  ">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-96" src={blog.image} alt={blog.title} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{blog.author}</div>
          <Link className="block mt-1 text-lg leading-tight font-medium text-black hover:underline" to={`/Admin/${category.toLowerCase()}/${blog.slug}`} >
            {blog.title}
          </Link>

          <p className="mt-2 text-gray-500">Created on: {new Date(blog.published_on).toLocaleDateString()}</p>
          {/* <div className="mt-4 flex items-center">
            <span className="flex items-center text-sm text-gray-500 mr-4">
              <Eye size={16} className="mr-1" /> {blog.views}
            </span>
            <span className="flex items-center text-sm text-gray-500">
              <MessageSquare size={16} className="mr-1" /> {blog.comments}
            </span>
          </div> */}
          <div className="mt-4 flex space-x-2">
            <Link to={`/Admin/${category.toLowerCase()}/${blog.slug}`} >
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
                <Eye size={16} className="mr-2" /> View
              </button>
            </Link>

           
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center" onClick={() => handleDelete()}>
              <Trash2 size={16} className="mr-2" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;