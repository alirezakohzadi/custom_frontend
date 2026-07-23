import React from "react";

function NewsCard({ title, date, description, link, imgUrl }) {
    return (
      <div className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 duration-300">
        <a href={link} className="block">
          <img className="w-full h-48 object-cover" src={imgUrl} alt={title} />
          <div className="p-5 text-center">
            <h2 className="text-lg font-bold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-600 mt-2">{description}</p>
            <span className="text-blue-500 text-xs block mt-3">{date}</span>
          </div>
        </a>
      </div>
    );
  }

export default NewsCard;