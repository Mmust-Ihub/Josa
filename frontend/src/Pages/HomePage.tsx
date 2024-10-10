import React, { useState, useEffect } from 'react';
import MainNews from '../components/MainNews';
import CategoryNews from '../components/CategoryNews';
import Skeleton from '../components/Skeleton';
import { Blog } from '../types';
import { fetchMainNews, fetchCategoryNews } from '../api';

const HomePage: React.FC = () => {
  const [mainNews, setMainNews] = useState<Blog | null>(null);
  const [categoryNews, setCategoryNews] = useState<{ [key: string]: Blog[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const mainNewsData = await fetchMainNews();
        setMainNews(mainNewsData);

        const categories = ['Sports', 'Business', 'Entertainment'];
        const categoryNewsData: { [key: string]: Blog[] } = {};
        for (const category of categories) {
          categoryNewsData[category] = await fetchCategoryNews(category);
        }
        setCategoryNews(categoryNewsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="container mx-auto px-4 py-8">
      {mainNews && <MainNews blog={mainNews} />}
      <div className="mt-8 space-y-8">
        {Object.entries(categoryNews).map(([category, blogs]) => (
          <CategoryNews key={category} category={category} blogs={blogs} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;