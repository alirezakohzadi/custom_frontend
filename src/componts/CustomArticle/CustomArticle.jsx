import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

const SERVICES = [
  'ترخیص انواع کالا از بنادر و گمرکات کشور',
  'مشاوره تخصصی گمرکی برای کاهش هزینه‌ها و جلوگیری از مشکلات قانونی',
  'اخذ مجوزهای موردنیاز از سازمان‌های مرتبط',
  'حمل و نقل بین‌المللی و داخلی کالا',
  'ارائه راهکارهای کاهش تعرفه گمرکی بر اساس قوانین جدید',
  'استعلام سریع هزینه‌های گمرکی و عوارض',
];

const CustomsClearance = () => {
  return (
    <div className="mx-auto max-w-full p-6 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl">
      <span className="text-xs font-bold uppercase tracking-widest text-amber-500">خدمات گمرکی</span>
      <h2 className="mt-2 mb-5 text-xl font-extrabold leading-relaxed text-slate-900 sm:text-2xl">
        ترخیص سریع و مطمئن کالا از گمرک، با کمترین هزینه و بیشترین دقت
      </h2>

      <p className="mb-5 text-base leading-8 text-slate-600 sm:text-lg">
        شرکت ما با سال‌ها تجربه در زمینه ترخیص کالا از گمرک، آماده ارائه خدمات حرفه‌ای و سریع به واردکنندگان و صادرکنندگان محترم است. با بهره‌گیری از تیمی مجرب و آشنا به قوانین و مقررات گمرکی، فرآیند ترخیص کالای شما را در کوتاه‌ترین زمان و با حداقل هزینه‌های اضافی انجام می‌دهیم.
      </p>
      <p className="mb-6 text-base leading-8 text-slate-600 sm:text-lg">
        ترخیص کالا یکی از مهم‌ترین مراحل واردات و صادرات است که نیازمند دانش تخصصی و تجربه در رویارویی با چالش‌های گمرکی است. از اخذ مجوزهای لازم و تنظیم اظهارنامه گمرکی، تا محاسبه حقوق و عوارض و تحویل نهایی کالا، در کنار شما هستیم.
      </p>

      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:p-6">
        <h3 className="mb-4 text-lg font-bold text-slate-900">خدمات ما شامل:</h3>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <li key={service} className="flex items-start gap-2.5 text-sm leading-6 text-slate-700 sm:text-base">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-amber-500" />
              {service}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-center text-sm text-slate-500 sm:text-right sm:text-base">
          خیال خود را از بابت پیچیدگی‌های گمرکی راحت کنید؛ کافی است با کارشناسان ما تماس بگیرید.
        </p>
        <Link
          to="/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-amber-300 transition-colors hover:bg-slate-800"
        >
          تماس با کارشناسان
          <ArrowLeft size={15} />
        </Link>
      </div>
    </div>
  );
};

export default CustomsClearance;