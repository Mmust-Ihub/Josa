import  { useEffect, useState } from 'react';
import MainCatNews from '../Component/Category/MainCatNews.jsx'
import OtherCatNews from '../Component/Category/OtherCatNews.jsx';
import NewsCard from '../Component/homePage/NewsCard.jsx';
import SingleBlogSkeleton from '../Skeleton/SingleBlogSkeleton';


function Entertainment  () {
 
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [sideEntertainment, setSideEntertainment] = useState([]);
  const [otherEntertainment, setOtherEntertainment] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

 useEffect(() => {
  // Fetch news data from the API
fetch(`${apiBaseUrl}/api/v1/user/entertainment`)
    .then((response) => response.json())
    .then((data) => {
        const valuesArray = Object.values(data);

        if (valuesArray && valuesArray.length > 0) {
          setEntertainmentData(valuesArray[0]);
          setLoading((prevState) => {
            !prevState;
          });
          setSideEntertainment(valuesArray.slice(1, 3));
          setOtherEntertainment(valuesArray.slice(4));
        }
    })
    .catch((error) => {
        console.error('Error fetching news data:', error);
        setLoading((prevState) => {
          !prevState;
        });
    });
}, [apiBaseUrl]);

 

  const formatToLocalTime = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false, };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return !loading? (
    <div className='flex flex-col'>
      <h1 className='my-12 py-12 text-[24px] font-bold text-center tracking-wider'>Main Entertainment News</h1>
      <div className='flex '>
      <div>
         <div className='flex justify-center  flex-row px-7 divide-x- gap-12'> 
            
          <MainCatNews
          id={entertainmentData.id}
          title={entertainmentData.title}
          slug={entertainmentData.slug}
          category = {"entertainment"}
          author_image = {entertainmentData.author_image}
          image={entertainmentData.image}
          published_on={formatToLocalTime(entertainmentData.published_on)}
          />
            
            <div className='p-4 justify-center  rounded-lg border-gray-300 bg-slate-100 hidden md:block'>
              {sideEntertainment.map((item) => (
                <OtherCatNews
                key={item.key}
                title={item.title}
                slug={item.slug}
                category = {"entertainment"}
                published_on={formatToLocalTime(item.published_on)}
                />
              ))}
              </div>
          </div>
      </div>
       
      </div>
      <h1 className='my-12 py-12 text-[24px] font-bold text-center tracking-wider'>Other News</h1>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-center items-top md:gap-5 lg:gap-6">
        {otherEntertainment.map((item, key) => (
          <NewsCard
            key={key}
            id={item.id}
            title={item.title}
            slug = {item.slug}
            image = {item.image}
            category={"Entertainment"}
            published_on={formatToLocalTime(item.published_on)}
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

export default Entertainment