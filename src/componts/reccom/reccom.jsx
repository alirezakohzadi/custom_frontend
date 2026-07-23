import React from 'react';

function Consultation() {
  return (
    <div className="rtl p-8 text-center bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-lg">
      <p className="text-2xl text-gray-800 mb-6 font-semibold">برای مشاوره کلیک کنید</p>
      <button className="bg-blue-600 text-white py-3 px-8 rounded-lg text-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-md">
        مشاوره
      </button>
    </div>
  );
}

export default Consultation;
