import  { useEffect, useState } from 'react';
import MainCatNews from '../Component/Category/MainCatNews.jsx'
import OtherCatNews from '../Component/Category/OtherCatNews.jsx';
import NewsCard from '../Component/homePage/NewsCard.jsx';


function Sports  () {
 
  const [sportsData, setSportsData] = useState([]);
  const [sideSports, setSideSports] = useState([]);
  const [otherSports, setOtherSports] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
 useEffect(() => {
  // Fetch news data from the API
fetch(`${apiBaseUrl}/api/v1/user/sports`)
    .then((response) => response.json())
    .then((data) => {
        const valuesArray = Object.values(data);

        setOtherSports(valuesArray.slice(3));
        setSideSports(valuesArray.slice(1, 3));
        if (valuesArray && valuesArray.length > 0) {
            setSportsData(valuesArray[0]);
        }
    })
    .catch((error) => {
        console.error('Error fetching news data:', error);
    });
}, [apiBaseUrl]);

 

  const formatToLocalTime = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false, };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className='flex flex-col'>
      <h1 className='my-12 py-12 text-[24px] font-bold text-center tracking-wider'>Main Sports  News</h1>
      <div className='flex '>
      <div>
         <div className='flex justify-center  flex-row px-7 divide-x- gap-12'> 
            
          <MainCatNews
          id={sportsData.id}
          title={sportsData.title}
          slug={sportsData.slug}
          headline={sportsData.headline}
          category = {"sports"}
          author_image = {sportsData.author_image}
          published_on={formatToLocalTime(sportsData.published_on)}
          image={sportsData.image}
          />
            
            <div className='p-4 justify-center  rounded-lg border-gray-300 bg-slate-100 hidden md:block'>
              {sideSports.map((item) => (
                <OtherCatNews
                key={item.key}
                title={item.title}
                slug={item.slug}
                category = {"sports"}
                image={item.image}
                published_on={formatToLocalTime(item.published_on)}
                />
              ))}
              </div>
          </div>
      </div>
       
      </div>
      <h1 className='my-12 py-12 text-[24px] font-bold text-center tracking-wider'>Other Sports</h1>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-center items-top md:gap-5 lg:gap-6">
        {otherSports.map((item, key) => (
          <NewsCard
            key={key}
            id={item.id}
            title={item.title}
            slug = {item.slug}
            image = {item.image}
            category={"sports"}
            published_on={formatToLocalTime(item.published_on)}
          />
          
        ))}
      </div>

      </div>   

    
    
  
  )
}

export default Sports