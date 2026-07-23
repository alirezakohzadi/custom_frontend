import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getquestions, getproductsLike } from '../../services/api';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import React, { useEffect, useState } from 'react';
import NewArticle from '../../componts/NewArticle/NewArticle';
import QuestionComMon from '../../componts/QuestionComMon/QuestionComMon';
import image from "../../assets/images/image.webp";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CustomArticle from '../../componts/CustomArticle/CustomArticle';
import ContactForm from '../../componts/ContactForm/ContactForm';
import CustomsClearance1 from '../../componts/CustomsTextImportant/CustomsClearance1';
import Projects2 from '../../componts/NewArticle/NewArticle2';
import Projects from '../../componts/NewArticle/NewArticle1';
import {
  Truck, Ship, Plane, Search, FileCheck2, Stamp,
  PackageCheck, ArrowLeft, CircleCheck,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// دنباله‌ی واقعی مراحل ترخیص و ارسال — ترتیب اینجا اطلاعات‌رسانی می‌کند، نه تزیین
const PROCESS_STEPS = [
  { icon: FileCheck2, title: 'ثبت سفارش', desc: 'اطلاعات مرسوله، مبدا و مقصد را ثبت می‌کنید.' },
  { icon: Stamp, title: 'ترخیص گمرکی', desc: 'کارشناسان ما مدارک را بررسی و گمرک را طی می‌کنند.' },
  { icon: Truck, title: 'حمل و انتقال', desc: 'مرسوله با روش انتخابی شما به راه می‌افتد.' },
  { icon: PackageCheck, title: 'تحویل نهایی', desc: 'گیرنده مرسوله را دریافت و تایید می‌کند.' },
];

const TRANSPORT_MODES = [
  { icon: Truck, label: 'زمینی', note: 'مقرون‌به‌صرفه برای مسیرهای منطقه‌ای' },
  { icon: Ship, label: 'دریایی', note: 'مناسب حجم بالا و هزینه پایین' },
  { icon: Plane, label: 'هوایی', note: 'سریع‌ترین مسیر برای محموله‌های فوری' },
];

function Home() {
  const [articlelike, setArticlelike] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [trackingCode, setTrackingCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getproductsLike().then(setArticlelike);
    getquestions().then(setFaqs);
  }, []);

  const handleTrack = (e) => {
    e.preventDefault();
    navigate(trackingCode ? `/track?code=${encodeURIComponent(trackingCode)}` : '/track');
  };

  return (
    <>
      {/* ===================== هیرو ===================== */}
      <section className="relative overflow-hidden bg-slate-950 pb-24 pt-28 sm:pb-28 sm:pt-32 lg:pb-36 lg:pt-40">
        {/* نور محیطی پس‌زمینه */}
        <div className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-amber-500/20 blur-[110px]" />
        <div className="pointer-events-none absolute bottom-[-6rem] left-[-8%] h-80 w-80 rounded-full bg-teal-500/10 blur-[110px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-14 px-5 sm:px-8 lg:flex-row lg:items-center lg:gap-16 lg:px-8">
          {/* متن */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="w-full text-center lg:w-1/2 lg:text-right"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold text-amber-300">
              لجستیک بین‌المللی و ترخیص کالا
            </span>

            <h1 className="mt-6 text-3xl font-extrabold leading-[1.25] text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              از مبدا تا مقصد،
              <br className="hidden sm:block" />
              یک مسیر شفاف و قابل رهگیری
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
              ترخیص گمرکی، حمل هوایی، دریایی و زمینی؛ همه در یک پلتفرم، با وضعیت لحظه‌ای مرسوله شما.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/login"
                className="w-full rounded-full bg-amber-400 px-7 py-3 text-center text-sm font-bold text-slate-950 shadow-lg shadow-amber-400/20 transition-colors hover:bg-amber-300 sm:w-auto"
              >
                ورود به حساب
              </Link>
              <Link
                to="/track"
                className="w-full rounded-full border border-white/15 px-7 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                رهگیری مرسوله
              </Link>
            </div>
          </motion.div>

          {/* کارت رهگیری / تصویر */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="w-full max-w-md lg:w-1/2 lg:max-w-none"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40">
              <img src={image} alt="خدمات حمل و نقل" className="h-64 w-full object-cover sm:h-72 lg:h-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>کد رهگیری</span>
                  <span className="font-mono tracking-widest text-amber-300">IR-458219</span>
                </div>

                {/* مسیر - المان امضادار صفحه */}
                <div className="relative mt-4 flex items-center justify-between">
                  <div className="absolute right-2 left-2 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-l from-amber-400 via-amber-400/70 to-white/15" />
                  {['مبدا', 'گمرک', 'در مسیر', 'مقصد'].map((label, i) => (
                    <div key={label} className="relative z-10 flex flex-col items-center gap-1.5">
                      <span
                        className={`h-3 w-3 rounded-full ring-4 ${
                          i < 2 ? 'bg-amber-400 ring-amber-400/25' : i === 2 ? 'bg-white ring-white/25' : 'bg-slate-600 ring-slate-600/20'
                        }`}
                      />
                      <span className="text-[11px] text-slate-300">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* جستجوی سریع رهگیری */}
            <form onSubmit={handleTrack} className="relative mt-4">
              <Search size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="کد مرسوله خود را وارد کنید"
                className="w-full rounded-full border border-white/10 bg-white/5 py-3 pr-11 pl-24 text-sm text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-amber-400/50"
              />
              <button
                type="submit"
                className="absolute left-1.5 top-1/2 -translate-y-1/2 rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-950 transition-colors hover:bg-amber-300"
              >
                رهگیری
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ===================== روش‌های ارسال ===================== */}
      <section className="relative z-10 -mt-10 px-5 sm:px-8 lg:-mt-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-3">
          {TRANSPORT_MODES.map(({ icon: Icon, label, note }) => (
            <motion.div
              key={label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-900/5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-amber-300">
                <Icon size={20} />
              </span>
              <div>
                <p className="font-bold text-slate-800">{label}</p>
                <p className="mt-0.5 text-xs leading-5 text-slate-500">{note}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="px-5 sm:px-8">
        <div className="mx-auto max-w-6xl pt-12">
          <CustomArticle />
        </div>
      </div>

      {/* ===================== مقالات ===================== */}
      <section className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">مطالب آموزشی</span>
            <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">مقالات اصلی</h2>
          </div>
        </div>

        <Swiper
          dir="rtl"
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          breakpoints={{
            320: { slidesPerView: 1.15 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          loop={articlelike.length >= 3}
          autoplay={{ delay: 7000 }}
          pagination={{ clickable: true }}
          navigation
          className="pb-10"
        >
          {articlelike.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={`/article/${item.id}`}>
                <NewArticle
                  imgurl={`http://127.0.0.1:8000/${item.imgurl}`}
                  title={item.title}
                  body={item.body}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ===================== ترخیص کالا ===================== */}
      <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8">
        <div className="relative rounded-3xl border border-amber-200/60 bg-amber-50/50 p-1">
          <span className="absolute -top-3 right-6 flex items-center gap-1.5 rounded-full bg-slate-950 px-3 py-1 text-[11px] font-bold text-amber-300">
            <Stamp size={13} /> تخصص ما
          </span>
          <div className="rounded-[1.35rem] bg-white p-1">
            <CustomsClearance1 />
          </div>
        </div>
      </section>

      {/* ===================== روند کار ===================== */}
      <section className="bg-slate-950 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-14 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">مراحل کار</span>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">مرسوله شما چهار قدم تا مقصد فاصله دارد</h2>
          </div>

          <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute right-0 left-0 top-6 hidden h-0.5 bg-white/10 lg:block" />
            {PROCESS_STEPS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
                className="relative text-center lg:text-right"
              >
                <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-sm font-black text-slate-950 lg:mx-0">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <Icon size={20} className="mx-auto mt-4 text-amber-300 lg:mx-0" />
                <h3 className="mt-3 font-bold text-white">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== پروژه‌ها ===================== */}
      <div className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Projects2 />
        </div>
      </div>

      {/* ===================== سوالات متداول + تماس ===================== */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 sm:px-8 lg:flex-row lg:gap-16">
          <div className="w-full lg:w-1/2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">راهنما</span>
            <h2 className="mt-2 mb-6 text-2xl font-extrabold text-slate-900">سوالات متداول</h2>
            <QuestionComMon faqs={faqs} />
          </div>
          <div className="w-full lg:w-1/2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">در تماس باشید</span>
            <h2 className="mt-2 mb-6 text-2xl font-extrabold text-slate-900">فرم تماس</h2>
            <div className="rounded-2xl border border-slate-100 bg-white p-1 shadow-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;