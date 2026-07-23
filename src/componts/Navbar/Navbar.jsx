import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { getitemsBtnN, getsearch, logoutuser } from '../../services/api';
import BtnNavbar from '../BtnNavbar/BtnNavbar';
import { useLoginOrIsLogin } from '../../context/LoginOrIsLogin';
import { debounce } from 'lodash';
import { Menu, X, ChevronDown, Search, Loader2, Package } from 'lucide-react';

const NAV_LINKS = [
  { title: 'خانه', url: '/' },
  { title: 'درباره ما', url: '/aboutus' },
];

function Navbar() {
  const navigate = useNavigate();
  const { islogin, setIslogin } = useLoginOrIsLogin();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [articlesMenu, setArticlesMenu] = useState([]);
  const [showArticlesMenu, setShowArticlesMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileArticlesOpen, setMobileArticlesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const searchWrapRef = useRef(null);
  const articlesRef = useRef(null);

  // نوار وقتی روی صفحه اصلی هستیم و اسکرول کردیم، یا هر صفحه‌ی دیگری، شیشه‌ای/تیره می‌شود
  const isSolid = !isHome || scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // بستن منوی موبایل هنگام تغییر مسیر
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileArticlesOpen(false);
    setShowArticlesMenu(false);
  }, [location.pathname]);

  // قفل اسکرول صفحه وقتی منوی موبایل بازه
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const fetchArticlesMenu = useCallback(async () => {
    if (articlesMenu.length) return;
    try {
      const result = await getitemsBtnN();
      setArticlesMenu(result || []);
    } catch (error) {
      console.error('خطا در دریافت منوی مقالات:', error);
    }
  }, [articlesMenu.length]);

  const closeModal = () => {
    if (islogin) {
      logoutuser().then(() => {
        setIslogin(false);
        navigate('/');
      });
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        setLoading(true);
        getsearch(query)
          .then((res) => setSearchResults(res?.results?.slice(0, 4) || []))
          .catch((error) => console.error('خطا در جستجو:', error))
          .finally(() => setLoading(false));
      }, 350),
    []
  );

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim().length > 2) {
      debouncedSearch(value);
    } else {
      debouncedSearch.cancel();
      setSearchResults([]);
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setLoading(false);
    debouncedSearch.cancel();
  };

  // بستن جستجو/منوی مقالات با کلید Escape یا کلیک بیرون
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSearchResults([]);
        setShowArticlesMenu(false);
      }
    };
    const handleClickOutside = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setSearchResults([]);
      }
      if (articlesRef.current && !articlesRef.current.contains(e.target)) {
        setShowArticlesMenu(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navTextClass = isSolid ? 'text-slate-700 hover:text-violet-600' : 'text-white hover:text-white/80';

  const SearchBox = ({ mobile = false }) => (
    <div ref={mobile ? null : searchWrapRef} className={`relative ${mobile ? 'w-full' : 'w-64 lg:w-72'}`}>
      <Search
        size={17}
        className={`pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 ${isSolid || mobile ? 'text-slate-400' : 'text-white/70'}`}
      />
      <input
        type="text"
        className={`w-full rounded-full py-2.5 pr-10 pl-9 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-500
          ${mobile
            ? 'bg-slate-100 text-slate-800 placeholder:text-slate-400'
            : isSolid
              ? 'bg-slate-100 text-slate-800 placeholder:text-slate-400'
              : 'bg-white/15 text-white placeholder:text-white/70 backdrop-blur-sm focus:bg-white/20'
          }`}
        placeholder="جستجو در مقالات..."
        value={searchQuery}
        onChange={handleSearchInput}
        aria-label="جستجو"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={clearSearch}
          aria-label="پاک کردن جستجو"
          className={`absolute top-1/2 left-2.5 -translate-y-1/2 rounded-full p-1 transition-colors ${
            mobile || isSolid ? 'text-slate-400 hover:bg-slate-200 hover:text-slate-600' : 'text-white/80 hover:bg-white/15'
          }`}
        >
          <X size={15} />
        </button>
      )}

      {(loading || searchResults.length > 0) && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-900/10 animate-[fadeIn_0.15s_ease-out]">
          {loading ? (
            <div className="flex items-center gap-2 p-4 text-sm text-slate-400">
              <Loader2 size={15} className="animate-spin" />
              در حال جستجو...
            </div>
          ) : (
            <ul className="max-h-72 overflow-y-auto">
              {searchResults.map((article) => (
                <li key={article.id}>
                  <Link
                    to={`/article/${article.id}`}
                    onClick={() => setSearchResults([])}
                    className="block border-b border-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors last:border-none hover:bg-violet-50 hover:text-violet-700"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );

  return (
    <header
      dir="rtl"
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isSolid ? 'border-b border-slate-900/5 bg-white/80 shadow-sm backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        {/* برند / دکمه موبایل */}
        <div className="flex items-center gap-3">
          <button
            className={`-mr-1 rounded-lg p-2 transition-colors sm:hidden ${isSolid ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* لینک‌های دسکتاپ */}
        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => (
            <span key={link.url} className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${navTextClass}`}>
              <BtnNavbar title={link.title} url={link.url} />
            </span>
          ))}

          <div
            ref={articlesRef}
            className="relative"
            onMouseEnter={() => { fetchArticlesMenu(); setShowArticlesMenu(true); }}
            onMouseLeave={() => setShowArticlesMenu(false)}
          >
            <button
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${navTextClass}`}
              onClick={() => { fetchArticlesMenu(); setShowArticlesMenu((v) => !v); }}
              aria-expanded={showArticlesMenu}
            >
              مقاله‌ها
              <ChevronDown size={15} className={`transition-transform duration-200 ${showArticlesMenu ? 'rotate-180' : ''}`} />
            </button>

            <div
              className={`absolute right-1/2 top-full z-50 mt-3 w-[36rem] max-w-[90vw] translate-x-1/2 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-slate-900/10 transition-all duration-200 ${
                showArticlesMenu ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
              }`}
            >
              {articlesMenu.length === 0 ? (
                <p className="p-4 text-center text-sm text-slate-400">مقاله‌ای یافت نشد</p>
              ) : (
                <ul className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {articlesMenu.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/article/${item.id}`}
                        onClick={() => setShowArticlesMenu(false)}
                        className="block rounded-xl bg-slate-50 px-3 py-3 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-violet-50 hover:text-violet-700"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <span className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${navTextClass}`}>
            <BtnNavbar title="تماس با ما" url="/contact" />
          </span>
          <span className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${navTextClass}`}>
            <Package size={15} />
            <BtnNavbar title="رهگیری مرسولات" url="/track" />
          </span>
        </nav>

        {/* جستجو + ورود/خروج دسکتاپ */}
        <div className="hidden items-center gap-3 sm:flex">
          <SearchBox />
          {islogin ? (
            <button
              onClick={closeModal}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${
                isSolid ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-white/15 text-white backdrop-blur-sm hover:bg-white/25'
              }`}
            >
              خروج
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-violet-600/30 transition-colors hover:bg-violet-700"
            >
              ورود
            </Link>
          )}
        </div>

        {/* جستجوی موبایل کوچک (آیکن) */}
        <button
          className={`rounded-lg p-2 transition-colors sm:hidden ${isSolid ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
          onClick={() => setMobileMenuOpen(true)}
          aria-label="جستجو"
        >
          <Search size={20} />
        </button>
      </div>

      {/* پنل موبایل تمام‌صفحه */}
      <div
        className={`fixed inset-0 top-16 z-40 bg-white transition-transform duration-300 ease-out sm:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto p-5">
          <SearchBox mobile />

          <nav className="mt-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.url}
                to={link.url}
                className="rounded-xl px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                {link.title}
              </Link>
            ))}

            <button
              onClick={() => { fetchArticlesMenu(); setMobileArticlesOpen((v) => !v); }}
              className="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50"
              aria-expanded={mobileArticlesOpen}
            >
              مقاله‌ها
              <ChevronDown size={17} className={`transition-transform duration-200 ${mobileArticlesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileArticlesOpen && (
              <ul className="mr-3 flex flex-col gap-1 border-r-2 border-slate-100 pr-3">
                {articlesMenu.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`/article/${item.id}`}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            <Link to="/contact" className="rounded-xl px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50">
              تماس با ما
            </Link>
            <Link to="/track" className="rounded-xl px-3 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50">
              رهگیری مرسولات
            </Link>
          </nav>

          <div className="mt-auto pt-6">
            {islogin ? (
              <button onClick={closeModal} className="w-full rounded-full bg-slate-100 py-3 text-sm font-semibold text-slate-700">
                خروج
              </button>
            ) : (
              <Link to="/login" className="block w-full rounded-full bg-violet-600 py-3 text-center text-sm font-semibold text-white">
                ورود / ثبت‌نام
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;