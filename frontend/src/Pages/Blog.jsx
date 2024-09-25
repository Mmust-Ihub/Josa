// Blog.js
import { useEffect, useState } from 'react';
import Navbar from '../Component/Navbar';
import SidePanel from '../Component/SidePanel';
import Content from '../Component/BlogChat';
import { useParams } from 'react-router-dom';
import Footer from '../Component/Footer';
import Comments from '../Component/Comments';
import ViewComment from '../Component/ViewComment';

function Blog() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  const {category, slug } = useParams(); // Destructure id from useParams
  const [postData, setPostData] = useState({});

  const formatToLocalTime = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false,  };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  useEffect(() => {
    const apiUrl = `${apiBaseUrl}/api/v1/user/${category}/${slug}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(`This is the data: ${data}`)
        if (typeof data === 'object' && !Array.isArray(data)) {
          setPostData(data);
        } else {
          console.error('API response is not an object:', data);
        }
      })
      .catch((error) => console.error(`Error fetching ${category} data:`, error));
  }, []);


  return (
    <div>
      <Navbar />
      <div className=" py-24 flex flex-col md:flex-row   ">
        <div className="md:px-5 flex-2 bg-[#f5f5f5] max-w-screen p-8  m-2    px-4">
          <div className=" justify-even">
            {/* Check if postData has data before rendering */}
            {Object.keys(postData).length > 0 && (
              <Content
                className=""
                key={slug}
                id={postData.id}
                title={postData.title}
                slug={postData.slug}
                content={postData.content}
                author={postData.author}
                author_image={postData.author_image}
                published_on={formatToLocalTime(postData.published_on)}
                image={postData.image}
              />
            )}
          </div>
        </div>
        <div className="bg-[#f5f5f5] md:block flex-1">
          <SidePanel />
        </div>
      </div>

      <Comments category={category} image_id={slug} />
      {Object.keys(postData).length > 0 && (
        <ViewComment comments={postData.comments} />
      )}

      <Footer />
    </div>
  );
}

export default Blog;