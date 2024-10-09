import  { useEffect, useState } from 'react';
import MainCatNews from '../Component/Category/MainCatNews.jsx'
import OtherCatNews from '../Component/Category/OtherCatNews.jsx';
import NewsCard from '../Component/homePage/NewsCard.jsx';
import SingleBlogSkeleton from '../Skeleton/SingleBlogSkeleton';


function News  () {
 
  const [newsData, setNewsData] = useState([]);
  const [sideNews, setSideNews] = useState([]);
  const [newsOther, setNewsOther] = useState([]);
  const [loading, setLoading] = useState(true);


  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
 useEffect(() => {
   // Fetch news data from the API
   fetch(`${apiBaseUrl}/api/v1/user/news`)
     .then((response) => response.json())
     .then((data) => {
       const valuesArray = Object.values(data);

       if (valuesArray && valuesArray.length >= 4) {
         setNewsData(valuesArray[0]);
         setLoading((prevState) => {
          !prevState;
        });
         setNewsOther(valuesArray.slice(3)); // Adjust the slice to start from the fourth element
         setSideNews(valuesArray.slice(1, 3));
       }
     })
     .catch((error) => {
       console.error("Error fetching news data:", error);
       setLoading((prevState) => {
        !prevState;
      });
     });
 }, [apiBaseUrl]);

 console.log(newsOther)

  const formatToLocalTime = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false, };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return !loading? (
    <div className='flex flex-col'>     
      <h1 className='my-12 py-12 text-[24px] font-bold text-center tracking-wider'>Main News</h1>
      <div className='flex '>
      <div>
         <div className='flex justify-center  flex-row px-7 divide-x- gap-12'> 
            
          <MainCatNews
          id={newsData.id}
          title={newsData.title}
          slug={newsData.slug}
          headline={newsData.headline}
          category = {"news"}
          author_image = {newsData.author_image}
          image={newsData.image}
          published_on={formatToLocalTime(newsData.published_on)}
          />
            
            <div className='p-4 justify-center  rounded-lg border-gray-300 bg-slate-100 hidden md:block'>
              {sideNews.map((item) =>  (
                <OtherCatNews
                key={item.id}
                title={item.title}
                slug={item.slug}
                category={"news"}
                published_on={formatToLocalTime(item.published_on)}
                image={item.image}
                />
              ))}
              </div>
          </div>
      </div>
       
      </div>
      <h1 className='my-12 py-12 text-[24px] font-bold text-center tracking-wider'>Other News</h1>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-center items-top md:gap-5 lg:gap-6">
        {newsOther.map((item) => (
          <NewsCard
            key={item.id}
            id={item.id}
            title={item.title}
            slug={item.slug}
            headline={item.headline}
            category={"news"}
            published_on={formatToLocalTime(item.published_on)}
            image={item.image}
          />
          
        ))}
      </div>

      </div>   

    
    
  
  ):(
    <>
      <div className='h-[100vh] mt-24'>

    <SingleBlogSkeleton/>
      </div>
    </>
  )
}

export default News