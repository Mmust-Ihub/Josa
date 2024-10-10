import  { useEffect, useState, Suspense } from "react";
import LoadingSpinner from "../Component/LoadingSpinner";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import toast, { Toaster } from "react-hot-toast";
import BlogsSkeleton from "../Skeleton/BlogsSkeleton";
import CategoryNews from "../Component/CategoryNews";
import MainNews from "../Component/MainsNews";
import Skeleton from '../component/Skeleton';

function Homepage() {
  const [latestData, setLatestData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const [sportsData, setSportsData] = useState([]);
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestResponse = await fetch(
          `${apiBaseUrl}/api/v1/user`
          
        );
        setLoading((prevState) => {
          !prevState;
        });
        const latestData = await latestResponse.json();
        const latestNews = await latestData.News
        setLatestData(latestNews.slice(0, 1));

        const businessRequest = await fetch(
          `${apiBaseUrl}/api/v1/user/business`
        );
        const businessData = await businessRequest.json();
        
        setBusinessData(Object.values(businessData).slice(0, 3));

        const entertainmentRequest = await fetch(
          `${apiBaseUrl}/api/v1/user/entertainment`
        );
        const response = await entertainmentRequest.json();
        setEntertainmentData(Object.values(response).slice(0, 3));

        // Fetch sports data
        const sportsRequest = await fetch(
          `${apiBaseUrl}/api/v1/user/sports`
        );
        const sportsResponse = await sportsRequest.json();
       
        setSportsData(Object.values(sportsResponse).slice(0, 3));

        // Fetch news data
        const newsResponse = await fetch(
          `${apiBaseUrl}/api/v1/user/news`
        );
        const newsData = await newsResponse.json();
        setNewsData(Object.values(newsData).slice(1, 4));


       

        // Set loading to false when data is fetched
      } catch (error) {
        toast.error("Error fetching data...");
        console.error("Error fetching data:", error);
        setLoading((prevState) => {
          !prevState;
        }); 
      }
    };

    fetchData();
  }, [apiBaseUrl]);




  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton type="main" />
        <div className="mt-8 space-y-8">
          {['Sports', 'Business', 'Entertainment'].map((category) => (
            <div key={category}>
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} type="card" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }


  return   (
    <div className=" overflow-x-hidden">
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-20 lg:px-40 lg:py-12">
        <Toaster />
        <Helmet>
          <meta charset="UTF-8" />
          <meta name="description" content="MMUST JOSA DIGITAL NEWS" />
          <meta name="author" content="MMUST JOSA" />
          <link rel="icon" type="image/svg+xml" href="/images/logo.png" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>MMUST JOSA DIGITAL</title>
          <script
            type="module"
            crossOrigin
            src="/assets/index-e6276024.js"
          ></script>
          <link rel="stylesheet" href="/assets/index-8819064a.css" />
        </Helmet>
       

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            ease: "linear",
            duration: 1,
          }}
        >
          <h1 className="mt-20 flex text-2xl font-bold text-[26px] justify-left -mb-8 underline decoration-gray-400">
            Top News
          </h1>
        </motion.div>

        <Suspense fallback={<BlogsSkeleton />}>



          {latestData.map((item) => (
            <MainNews
              key={item.id}
              category={"news"}
              blog={item}
            />
          ))}
        </Suspense>

     {businessData?.length == 0 && sportsData?.length == 0 && newsData?.length == 0 && entertainmentData?.length == 0 ?(
      <>
          <div className='mt-12 gap-4 flex flex-col'>
          <BlogsSkeleton/>
          <BlogsSkeleton/>
          <BlogsSkeleton/>

          </div>
          </>     ):(
      <>
         {newsData.length > 0 ? (
          <>
            
            {loading ? (
              <BlogsSkeleton />
            ) : (
            
     <CategoryNews category={'News'} blogs={newsData}/>

                
               
            )}
          </>
        ) : null}
        
              
        
        
                
                {/* Entertainment News */}
                {entertainmentData.length > 0 ? (
          <>
             
               
        
               {loading?(
                     <BlogsSkeleton/>
                   ):
                   (
                    <CategoryNews category={'Entertainment'} blogs={entertainmentData}/>
                
                   )}
          </>
        ) : null}
              
        
                {/* SportsNews */}
          {sportsData.length > 0 ? (
          <>
              
        
        {loading ?(
              <BlogsSkeleton/>
            ):
            (
        
              <CategoryNews category={'Sports'} blogs={sportsData}/>

            )}
          </>
        ) : null}
              
        
        
        
               
                {/* News */}
        
                {businessData.length > 0 ? (
          <>
                
        
                
        
        {loading ?(
          
          <BlogsSkeleton/>
        ):
        (
          <CategoryNews category={'Business'} blogs={businessData}/>

        )}
          </>
        ) : null}
        
         </>    
        
     )}
         

      </div>
    </div>
  ) 
}
export default Homepage;
