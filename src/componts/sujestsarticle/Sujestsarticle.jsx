import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getproducts } from "../../services/api";

function Sujestsarticle() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getproducts().then((data) => {
            // سه مقاله تصادفی را از بین تمام مقالات انتخاب می‌کنیم
            const randomArticles = getRandomArticles(data, 10);
            setArticles(randomArticles);
        });
    }, []);

    // تابع برای انتخاب مقالات تصادفی
    const getRandomArticles = (articles, count) => {
        const shuffled = [...articles].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    return (
        <div className="max-w-full sm:max-w-6xl h-auto bg-white text-black p-6 sm:p-7 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold mb-4 border-b pb-2 text-center sm:text-left">مقالات مرتبط</h2>
            <ul className="space-y-2">
                {articles.length > 0 ? (
                    articles.map((item) => (
                        <li key={item.id}>
                            <Link
                                to={`/article/${item.id}`}
                                className="block hover:bg-gray-100 transition-all p-2 rounded-lg"
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))
                ) : (
                    <p className="text-sm text-center">هیچ مقاله مرتبطی یافت نشد.</p>
                )}
            </ul>
        </div>
    );
}

export default Sujestsarticle;
