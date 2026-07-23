import React, { useEffect, useState } from 'react';
import { getproducts } from '../../services/api';
import { Link } from 'react-router-dom';
import BtnNavbar from '../../componts/BtnNavbar/BtnNavbar';

function ArticleAll() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getproducts().then(setArticles);
  }, []);

  return (
    <div className="px-3 sm:px-6 py-8">
      <h1 className="text-xl sm:text-4xl text-center pt-15 font-bold text-gray-800 mb-5">مقالات </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {articles.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <Link to={`/article/${item.id}`} className="block">
              {/* تصویر مقاله */}
              <div className="w-full h-36 sm:h-48 lg:h-56 overflow-hidden">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  src={`http://127.0.0.1:8000/${item.imgurl}`}
                  alt={item.title}
                />
              </div>

              {/* عنوان و متن مقاله */}
              <div className="p-3 sm:p-4 text-center">
                <h2 className="text-sm sm:text-base font-bold text-gray-800 mb-1 sm:mb-2">{item.title}</h2>
                <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">{item.body}</p>
              </div>
            </Link>
            
            {/* دکمه ادامه مطلب */}
            <div className="text-center mb-3">
              <BtnNavbar
                title="ادامه مطلب"
                url={`/article/${item.id}`}
                iconN={false}
                className="inline-block bg-purple-500 text-white text-xs sm:text-sm py-1 px-3 sm:py-2 sm:px-6 rounded-full hover:scale-105 transition-transform duration-200"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleAll;
