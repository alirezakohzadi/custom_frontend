import React from 'react';

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700">
      <div className="text-center text-white p-8 rounded-lg shadow-lg bg-opacity-80">
        <h1 className="text-6xl font-bold mb-4">خطای ۴۰۴</h1>
        <p className="text-2xl mb-6">صفحه مورد نظر شما پیدا نشد</p>
        <p className="text-xl mb-8">ممکن است آدرس وارد شده اشتباه باشد یا صفحه حذف شده باشد.</p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-purple-900 hover:bg-purple-700 text-white font-semibold rounded-full transition duration-300"
        >
          برگشت به صفحه اصلی
        </a>
      </div>
    </div>
  );
}

export default NotFound;
