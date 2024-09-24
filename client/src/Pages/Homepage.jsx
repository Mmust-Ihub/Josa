import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainNews from "../Component/homePage/MainNews";
import NewsCard from "../Component/homePage/NewsCard";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import LoadingSpinner from "../Component/LoadingSpinner";
import Heading from "../Component/homePage/Heading";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import toast, { Toaster } from "react-hot-toast";
function Homepage() {
  const [latestData, setLatestData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [businessData, setBusinessData] = useState([]);
  const [moreBusinessData, setMoreBusinessData] = useState([]);
  const [sportsData, setSportsData] = useState([]);
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch latest news data
        const latestResponse = await fetch(
          `${apiBaseUrl}/api/v1/user`
        );
        setLoading((prevState) => {
          !prevState;
        });
        const latestData = await latestResponse.json();
        const latestNews = await latestData.News
        setLatestData(latestNews.slice(0, 1));

         // Fetch business data
         const businessRequest = await fetch(
          `${apiBaseUrl}/api/v1/user`
        );
        const businessData = await businessRequest.json();
        const latestBusiness = await businessData.Business
        setBusinessData(latestBusiness.slice(0, 3));

         // Fetch entertainment data
         const entertainmentRequest = await fetch(
          `${apiBaseUrl}/api/v1/user`
        );
        const response = await entertainmentRequest.json();
        const entertainmentData = await response.Entertainment
        setEntertainmentData(entertainmentData.slice(0, 3));

        // Fetch sports data
        const sportsRequest = await fetch(
          `${apiBaseUrl}/api/v1/user`
        );
        const sportsResponse = await sportsRequest.json();
        const sportsData = await sportsResponse.Sports
        setSportsData(sportsData.slice(0, 3));

        // Fetch news data
        const newsResponse = await fetch(
          `${apiBaseUrl}/api/v1/user/news`
        );
        const newsData = await newsResponse.json();
        setNewsData(newsData.slice(1, 4));

        // Fetch more business data
        const moreBusinessResponse = await fetch(
          "https://mmust-jowa.onrender.com/api/v1/user/business"
        );
        const moreBusinessData = await moreBusinessResponse.json();
        setMoreBusinessData(moreBusinessData.slice(0, 3));

        // Set loading to false when data is fetched
      } catch (error) {
        toast.error("Error fetching data...");
        console.error("Error fetching data:", error);
        setLoading((prevState) => {
          !prevState;
        }); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  const formatToLocalTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };
  return !loading ? (
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
            crossorigin
            src="/assets/index-e6276024.js"
          ></script>
          <link rel="stylesheet" href="/assets/index-8819064a.css" />
        </Helmet>
        <div className="relative mb-24">
          <Navbar />
        </div>

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

        {latestData.map((item, key) => (
          <MainNews
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
        <Heading title={"Business News"} category="business" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* <Businesss News /> */}
          {businessData.map((item, key) => (
            <NewsCard
              key={item.id}
              category={"business"}
              id={item.id}
              title={item.title}
              slug={item.slug}
              headline={item.headline}
              image={item.image}
              published_on={formatToLocalTime(item.published_on)}
            />
          ))}{" "}
        </div>
        {/* Entertainment News */}
        <Heading title={"Entertainment News"} category="entertainment" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {entertainmentData.map((item, key) => (
            <NewsCard
            key={item.id}
            category={"entertainment"}
            id={item.id}
            title={item.title}
            slug={item.slug}
            headline={item.headline}
            image={item.image}
            published_on={formatToLocalTime(item.published_on)}
            />
          ))}{" "}
        </div>
        {/* SportsNews */}
        <Heading title={"Sport News"} category="sports" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sportsData.map((item, key) => (
            <NewsCard
            key={item.id}
            category={"sports"}
            id={item.id}
            title={item.title}
            slug={item.slug}
            headline={item.headline}
            image={item.image}
            published_on={formatToLocalTime(item.published_on)}
            />
          ))}
        </div>
        {/* News */}

        <Heading title={"Other News"} category="news" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newsData.map((item, key) => (
            <NewsCard
            key={item.id}
            category={"news"}
            id={item.id}
            title={item.title}
            slug={item.slug}
            headline={item.headline}
            image={item.image}
            published_on={formatToLocalTime(item.published_on)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <LoadingSpinner />
  );
}
export default Homepage;
