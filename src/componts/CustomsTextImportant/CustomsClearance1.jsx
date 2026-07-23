import React from 'react';
import image from "../../assets/images/44-1024x585.jpg";
import { CheckCircle2 } from 'lucide-react';

const STEPS = [
  'ثبت اظهارنامه و دریافت مجوزهای لازم',
  'هماهنگی بازرسی کالا و تنظیم اسناد',
  'انتخاب شرکت حمل و نقل و پرداخت هزینه‌ها',
  'دریافت ترخیص نهایی کالا از گمرک',
];

const TIPS = [
  'ترخیص باید توسط ترخیص‌کاران رسمی انجام شود.',
  'مدارک معتبر و کارت بازرگانی ضروری است.',
  'آگاهی از تغییرات قوانین گمرکی برای تسهیل فرایند اهمیت دارد.',
];

function CustomArticle() {
  return (
    <div dir="rtl" className="flex flex-col items-center gap-10 p-6 sm:p-10 md:flex-row md:items-start md:gap-14 md:p-16 lg:p-20">
      {/* تصویر */}
      <div className="flex justify-center md:w-2/5">
        <img
          src={image}
          alt="ترخیص کالا از گمرک"
          className="w-full max-w-xl rounded-2xl shadow-lg shadow-slate-900/10"
        />
      </div>

      {/* متن */}
      <div className="w-full text-center md:w-3/5 md:text-right">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500">راهنمای گمرکی</span>
        <h1 className="mt-2 text-2xl font-extrabold leading-snug text-slate-900 sm:text-3xl md:text-4xl">
          ترخیص کالا از گمرک
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
          ترخیص کالا فرایندی مهم در تجارت است که شامل مراحل قانونی و پرداخت هزینه‌های گمرکی می‌شود. این فرایند نیازمند آشنایی با مقررات گمرکی و هماهنگی با نهادهای مختلف است تا از مشکلات قانونی جلوگیری شود.
        </p>

        {/* مراحل — ترتیب واقعاً معنی‌دار است، پس شماره‌گذاری می‌شود */}
        <h2 className="mt-8 text-lg font-bold text-slate-900 sm:text-xl">مراحل ترخیص کالا</h2>
        <ol className="relative mt-4 space-y-4">
          {STEPS.map((step, i) => (
            <li key={step} className="flex items-start justify-center gap-3 md:justify-start">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-amber-300">
                {i + 1}
              </span>
              <span className="text-base leading-7 text-slate-600 sm:text-lg">{step}</span>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
          این مراحل بسته به نوع کالا و کشور مبدأ ممکن است تغییر کنند. ترخیص کالا نیازمند هماهنگی دقیق است تا از بروز تأخیر جلوگیری شود.
        </p>

        {/* نکات مهم — فقط توصیه‌اند، نه دنباله؛ پس بدون شماره */}
        <h2 className="mt-8 text-lg font-bold text-slate-900 sm:text-xl">نکات مهم</h2>
        <ul className="mt-4 space-y-3">
          {TIPS.map((tip) => (
            <li key={tip} className="flex items-start justify-center gap-2.5 md:justify-start">
              <CheckCircle2 size={18} className="mt-1 shrink-0 text-amber-500" />
              <span className="text-base leading-7 text-slate-600 sm:text-lg">{tip}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
          با رعایت این نکات، می‌توانید فرآیند ترخیص کالا را سریع‌تر و بدون مشکل انجام دهید.
        </p>
      </div>
    </div>
  );
}

export default CustomArticle;