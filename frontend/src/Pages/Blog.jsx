import { useEffect, useState } from 'react';
import SidePanel from '../Component/SidePanel';
import Content from '../Component/BlogChat';
import { useParams } from 'react-router-dom';
import Comments from '../Component/Comments';
import ViewComment from '../Component/ViewComment';
import SingleBlogSkeleton from '../Skeleton/SingleBlogSkeleton';
import NotFound from '../Component/NotFound';

function Blog() {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const { category, slug } = useParams(); 
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const formatToLocalTime = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  useEffect(() => {
    const apiUrl = `${apiBaseUrl}/api/v1/user/${category}/${slug}`;
    setLoading(true);
    setNotFound(false);

    fetch(apiUrl)
      .then((response) => {
        

        if (response.status === 404 || response.status === 400) {
          setNotFound(true); 
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          if (typeof data === 'object' && !Array.isArray(data)) {
            setPostData(data);
          } else {
            console.error('API response is not an object:', data);
          }
        }
      })
      .catch((error) => {
        console.error(`Error fetching ${category} data:`, error);
        setNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiBaseUrl, category, slug]);

  if (loading) {
    return <SingleBlogSkeleton />;
  }

  if (notFound) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="py-24 flex flex-col md:flex-row">
        {Object.keys(postData).length === 0 ? (
          <SingleBlogSkeleton />
        ) : (
          <div className="md:px-5 flex-2 bg-[#f5f5f5] max-w-screen p-8 m-2 px-4">
            <div className="justify-even">
              <Content
                key={slug}
                id={postData.id}
                title={postData.title}
                slug={slug}
                content={postData.content}
                author={postData.author}
                author_image={postData.author_image}
                published_on={formatToLocalTime(postData.published_on)}
                image={postData.image}
              />
            </div>
          </div>
        )}
        <div className="bg-[#f5f5f5] md:block flex-1">
          <SidePanel />
        </div>
      </div>
      <Comments category={category} image_id={slug} />
      {Object.keys(postData).length > 0 && <ViewComment comments={postData.comments} />}
    </div>
  );
}

export default Blog;
