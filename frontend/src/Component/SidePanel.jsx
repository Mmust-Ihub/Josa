/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTruncate } from "../../hooks/useTruncate";
const SidePanel = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const apiUrl = "https://mmust-jowa.onrender.com/api/v1/user/blog/latest";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
      
        const extractedData = Object.keys(data).map((category) => ({
          ...data[category],
          category,
        }));
        setNewsData(extractedData);

        
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


 

  return (
    <div className="flex-2 px-10">
      <div className="h-[50px]"></div>
      {newsData.map((item, index) => (
        <div key={index} className="flex">
          <div className="">
            <Link
              to={`/blog/${item.category}/${item.id}`}
              onClick={() =>
                (window.location.href = `/blog/${item.category}/${item.id}`)
              }
            >
              <h6 className="mb-2 w-5/9 font-semibold leading-5 hover:text-purple-700">
                {useTruncate(item.title, 100)}
              </h6>
            </Link>
            <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
              <span className="text-gray-600">{item.published_on}</span>
            </p>
            <hr className="w-full my-6 border-gray-300" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidePanel;
