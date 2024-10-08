import { useEffect, useState } from 'react';
import MainCatNews from '../Component/Category/MainCatNews.jsx'
import OtherCatNews from '../Component/Category/OtherCatNews.jsx';
import NewsCard from '../Component/homePage/NewsCard.jsx';
import SingleBlogSkeleton from '../Skeleton/SingleBlogSkeleton';
import EmptyContainer from '../Component/EmptyContainer.jsx';


function Business  () {
 
  const [businessData, setBusinessData] = useState([]);
  const [sideBusiness, setSideBusiness] = useState([]);
  const [otherBusiness, setOtherBusiness] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
 useEffect(() => {
  // Fetch news data from the API
fetch(`${apiBaseUrl}/api/v1/user/business`)
    .then((response) => response.json())
    .then((data) => {
        const valuesArray = Object.values(data);
        setLoading((prevState) => {
          !prevState;
        });

        if (valuesArray && valuesArray.length > 0) {
          setBusinessData(valuesArray[0]);
          
          setSideBusiness(valuesArray.slice(1, 3));
          setOtherBusiness(valuesArray.slice(3,));
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
    <>
    {businessData.length == 0?(
      <EmptyContainer/>
    ):(

    <div className="flex flex-col">
      <h1 className="my-12 py-12 text-[24px] font-bold text-center tracking-wider">
        Main Business News
      </h1>
      <div className="flex ">
        <div>
          <div className="flex justify-center  flex-row px-7 divide-x- gap-12">
            <MainCatNews
              id={businessData.id}
              title={businessData.title}
              slug={businessData.slug}
              headline={businessData.headline}
              category={"business"}
              author_image={businessData.author_image}
              published_on={formatToLocalTime(businessData.published_on)}
              image={businessData.image}
            />

            <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-20 lg:px-40 lg:py-12">
              {sideBusiness.map((item) => (
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
      <h1 className="my-12 py-12 text-[24px] font-bold text-center tracking-wider">
        Other Business
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-center items-top md:gap-5 lg:gap-6">
        {otherBusiness.map((item, key) => (
          <NewsCard
            key={key}
            id={item.id}
            title={item.title}
            slug={item.slug}
            image={item.image}
            category={"business"}
            published_on={formatToLocalTime(item.published_on)}
          />
        ))}
      </div>

    </div>
    )}
    
    </>

  ):(
    <>
      <div className='h-[100vh] mt-24'>

    <SingleBlogSkeleton/>
      </div>
    </>
  );
}

export default Business