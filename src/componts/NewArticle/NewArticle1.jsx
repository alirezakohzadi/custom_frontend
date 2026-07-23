import { Link } from "react-router-dom";
import { getproducts } from "../../services/api";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function Projects() {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    getproducts().then((data) => {
      const randomArticles = getRandomArticles(data, 4);
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {article.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/10"
            >
              <Link to={`article/${project.id}`}>
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000/${project.imgurl}`}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4 text-right sm:p-5">
                  <p className="line-clamp-2 text-base font-bold text-slate-900 sm:text-lg">{project.title}</p>
                  <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{project.body}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-amber-600">
                    ادامه مطلب <ArrowLeft size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center sm:mt-12">
          <Link
            to="/articles"
            className="inline-block rounded-full bg-slate-950 px-7 py-3 text-sm font-bold text-amber-300 shadow-sm transition-colors hover:bg-slate-800 sm:text-base"
          >
            مشاهده همه مقالات
          </Link>
        </div>
      </div>
    </div>
  );
}