import { Link } from "react-router-dom";
import { getproducts } from "../../services/api";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Projects() {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    getproducts().then((data) => {
      const randomArticles = getRandomArticles(data, 6);
      setArticle(randomArticles);
    });
  }, []);

  const getRandomArticles = (articles, count) => {
    const shuffled = [...articles].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return (
    <div className="py-10 px-5 sm:px-12">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="mb-8 text-right">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">مطالعه بیشتر</span>
          <h2 className="mt-2 text-xl font-extrabold text-slate-900 sm:text-2xl md:text-3xl">آرشیو مقالات</h2>
        </div>

        <Swiper
          dir="rtl"
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          loop={article.length > 3}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            320: { slidesPerView: 1.3 },
            640: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
          style={{ '--swiper-theme-color': '#f59e0b', '--swiper-pagination-bullet-inactive-color': '#cbd5e1' }}
          className="pb-10"
        >
          {article.map((project) => (
            <SwiperSlide key={project.id}>
              <Link to={`article/${project.id}`} className="group block">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                  <img
                    src={`http://127.0.0.1:8000/${project.imgurl}`}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                    <p className="text-sm font-bold sm:text-base md:text-lg">{project.title}</p>
                    <p className="mt-1 line-clamp-2 text-xs text-slate-300 sm:text-sm">{project.body}</p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}