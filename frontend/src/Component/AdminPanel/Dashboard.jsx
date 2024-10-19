/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { BarChart, Users, Eye, MessageSquare } from 'lucide-react';



function Dashboard() {
  const [latestNews, setLatestNews] = useState([]);
  const [totalComments, setTotalComments] = useState(null);
  const [totalBlogs, setTotalBlogs] = useState(null);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch(
         `${apiBaseUrl}/api/v1/admin/news/latest`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ` + localStorage.getItem("accessToken"),
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setLatestNews(data);

        const commentsResponse = await fetch(
          `${apiBaseUrl}/api/v1/admin/total/comments`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ` + localStorage.getItem("accessToken"),
            },
          }
        );

        if (!commentsResponse.ok) {
          throw new Error(`HTTP error! Status: ${commentsResponse.status}`);
        }

        const totalComments = await commentsResponse.json();
      
        setTotalComments(totalComments);

        const blogsResponse = await fetch(
          `${apiBaseUrl}/api/v1/admin/total/posts`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ` + localStorage.getItem("accessToken"),
            },
          }
        );

        if (!blogsResponse.ok) {
          throw new Error(`HTTP error! Status: ${blogsResponse.status}`);
        }

        const blogsData = await blogsResponse.json();
        setTotalBlogs(blogsData);
        
      } catch (error) {
        console.error("Error fetching latest news:", error);
        if (error == "Error: HTTP error! Status: 401") {
           window.location.href = "/login";
        }
      }
    };

    fetchLatestNews();
  }, [apiBaseUrl]);



 
  return (
    <div>
      {/* <h1 className="text-3xl font-bold mb-6">Dashboard</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<BarChart size={24} />} title="Total Posts" value={totalBlogs} />
        <StatCard icon={<Users size={24} />} title="Total Authors" value="25" />
        <StatCard icon={<Eye size={24} />} title="Total Views" value="45,678" />
        <StatCard icon={<MessageSquare size={24} />} title="Total Comments" value={totalComments} />
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {latestNews.map((blog) => (
         <RecentPostRow title={blog.title} author={blog.author}views={1234} comments={blog.total_comments} key={blog.id} link={`/Admin/news/${blog.slug}`} />
        ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const StatCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

const RecentPostRow= ({ title, author, views, comments,link }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">{title}</td>
      <td className="px-6 py-4 whitespace-nowrap">{author}</td>
      <td className="px-6 py-4 whitespace-nowrap">{views}</td>
      <td className="px-6 py-4 whitespace-nowrap">{comments}</td>
      <td className="px-6 py-4 whitespace-nowrap">
         <Link  to={link} >
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
              <Eye size={16} className="mr-2" /> View
            </button>
          </Link></td>
    </tr>
  );
};

export default Dashboard;
