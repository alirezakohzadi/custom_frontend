import { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { getarticle } from "../../services/api";
import { Clock, CalendarDays, ChevronLeft, RotateCcw, Link2 } from "lucide-react";
import "./Article.css";

const WORDS_PER_MINUTE = 200;

function DetailNews() {
  const [news, setNews] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // آدرس بک‌اند (قابل تغییر برای سرور واقعی)
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  const fetchArticle = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);

    try {
      const res = await getarticle(id);
      setNews(res);
    } catch {
      setError("مشکلی در بارگذاری مقاله پیش آمد.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  // نوار پیشرفت مطالعه — همان خط امضادار سایت، این‌بار به‌عنوان شاخص میزان مطالعه
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const scrollable = scrollHeight - clientHeight;
      setProgress(scrollable > 0 ? Math.min(100, (scrollTop / scrollable) * 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const readingMinutes = useMemo(() => {
    if (!news.content) return null;
    const words = news.content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  }, [news.content]);

  const processHtmlContent = (htmlContent) => {
    if (!htmlContent) return "";
    const updatedHtml = htmlContent.replace(
      /<img([^>]+)src="(\/media[^"]+)"/g,
      (match, attrs, src) => `<img${attrs} src="${BASE_URL}${src}" class="article-image"`
    );
    return DOMPurify.sanitize(updatedHtml);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl animate-pulse px-4 pt-28 sm:px-6">
        <div className="mx-auto mb-4 h-3 w-24 rounded-full bg-slate-200" />
        <div className="mx-auto mb-3 h-8 w-3/4 rounded-lg bg-slate-200" />
        <div className="mx-auto mb-8 h-8 w-1/2 rounded-lg bg-slate-200" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
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
          onClick={fetchArticle}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-2.5 text-sm font-bold text-amber-300 transition-colors hover:bg-slate-800"
        >
          <RotateCcw size={15} />
          تلاش دوباره
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* نوار پیشرفت مطالعه */}
      <div className="fixed inset-x-0 top-0 z-40 h-0.5 bg-slate-100">
        <div
          className="h-full bg-gradient-to-l from-amber-500 to-amber-300 transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <article className="mx-auto max-w-3xl px-4 pb-20 pt-24 sm:px-6 sm:pt-28">
        {/* مسیر ناوبری */}
        <nav className="mb-6 flex items-center justify-center gap-1.5 text-xs text-slate-400 sm:justify-start">
          <Link to="/" className="transition-colors hover:text-amber-600">خانه</Link>
          <ChevronLeft size={13} />
          <Link to="/articles" className="transition-colors hover:text-amber-600">مقالات</Link>
        </nav>

        <header className="text-center sm:text-right">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">مقاله</span>
          <h1 className="mt-3 text-2xl font-extrabold leading-snug text-slate-900 sm:text-3xl md:text-4xl">
            {news.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-y border-slate-100 py-3 text-xs text-slate-500 sm:justify-start">
            {news.date && (
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} className="text-amber-500" />
                {new Date(news.date).toLocaleDateString("fa-IR")}
              </span>
            )}
            {readingMinutes && (
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-amber-500" />
                {readingMinutes} دقیقه مطالعه
              </span>
            )}
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 transition-colors hover:text-amber-600"
            >
              <Link2 size={14} className="text-amber-500" />
              {copied ? "لینک کپی شد" : "کپی لینک"}
            </button>
          </div>
        </header>

        <div
          className="article-content prose prose-slate mt-8 max-w-none text-right leading-8 prose-headings:font-extrabold prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: processHtmlContent(news.content) }}
        />
      </article>
    </div>
  );
}

export default DetailNews;