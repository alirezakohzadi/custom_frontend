import React, { useEffect, useState, useCallback } from 'react';
import { getaboutus, getproductsLike, getquestions } from '../../services/api';
import { Link } from 'react-router-dom';
import QuestionComMon from '../../componts/QuestionComMon/QuestionComMon';
import NewArticle from '../../componts/NewArticle/NewArticle';
import { RotateCcw } from 'lucide-react';

function AboutUs() {
  const [articlelike, setArticlelike] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [aboutus, setAboutus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [aboutData, likeData, faqData] = await Promise.all([
        getaboutus(),
        getproductsLike(),
        getquestions(),
      ]);
      setArticlelike(likeData);
      setAboutus(aboutData);
      setFaqs(faqData);
    } catch (err) {
      setError("خطا در دریافت اطلاعات");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl animate-pulse px-4 pt-28 sm:px-6">
        <div className="mx-auto mb-4 h-3 w-24 rounded-full bg-slate-200" />
        <div className="mx-auto mb-8 h-8 w-1/2 rounded-lg bg-slate-200" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 rounded bg-slate-200" style={{ width: `${100 - (i % 3) * 12}%` }} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 pt-32 text-center">
        <p className="text-base font-semibold text-slate-800">{error}</p>
        <p className="mt-1 text-sm text-slate-500">اتصال خود را بررسی کنید و دوباره تلاش کنید.</p>
        <button
          onClick={fetchData}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-2.5 text-sm font-bold text-amber-300 transition-colors hover:bg-slate-800"
        >
          <RotateCcw size={15} />
          تلاش دوباره
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ===================== هدر ===================== */}
      <section className="bg-slate-950 px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">داستان ما</span>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">درباره ما</h1>
          <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
            {aboutus && aboutus.length > 0 ? aboutus[0].content : "اطلاعاتی یافت نشد"}
          </p>
        </div>
      </section>

      {/* ===================== مقالات مرتبط ===================== */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-8 text-center sm:text-right">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">مطالعه بیشتر</span>
          <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">مقالات مرتبط</h2>
        </div>

        {articlelike.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {articlelike.map((item) => (
              <Link to={`/article/${item.id}`} key={item.id}>
                <NewArticle
                  title={item.title}
                  imgurl={`http://127.0.0.1:8000/${item.imgurl}`}
                  body={item.body}
                />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400">مقاله‌ای موجود نیست</p>
        )}
      </section>

      {/* ===================== سوالات متداول ===================== */}
      <section className="bg-slate-50 px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center sm:text-right">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">راهنما</span>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">سوالات متداول</h2>
          </div>
          {faqs.length > 0 ? (
            <QuestionComMon faqs={faqs} />
          ) : (
            <p className="text-center text-slate-400">سوالی ثبت نشده است</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default AboutUs;