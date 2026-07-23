import React, { useState } from "react";
import { motion } from "framer-motion";
import { usermessage } from "../../services/api";
import { Phone, Mail, MapPin, CheckCircle2, AlertCircle } from "lucide-react";

const CONTACT_INFO = [
  { icon: Phone, label: "تلفن", value: "021-12345678", href: "tel:02112345678" },
  { icon: Mail, label: "ایمیل", value: "info@company.com", href: "mailto:info@company.com" },
  { icon: MapPin, label: "آدرس", value: "تهران، خیابان ولیعصر، برج تجاری XYZ", href: null },
];

const EMPTY_FORM = { name: "", email: "", mobilenumber: "", body: "" };

function ContactUs() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    usermessage(form.name, form.email, form.body, form.mobilenumber)
      .then(() => {
        setLoading(false);
        setSuccess("پیام شما با موفقیت ارسال شد.");
        setForm(EMPTY_FORM);
        setTimeout(() => setSuccess(""), 5000);
      })
      .catch(() => {
        setLoading(false);
        setError("خطا در ارسال پیام. لطفاً دوباره تلاش کنید.");
        setTimeout(() => setError(""), 10000);
      });
  };

  return (
    <div className="w-full">
      {/* هدر */}
      <section className="bg-slate-950 px-5 pb-14 pt-28 text-center sm:px-8 sm:pt-32">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">در تماس باشید</span>
        <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">تماس با ما</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
          سوالی درباره‌ی ترخیص کالا یا ارسال مرسوله دارید؟ فرم زیر را پر کنید تا کارشناسان ما در اسرع وقت پاسخ دهند.
        </p>
      </section>

      <section className="bg-slate-50 px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
          {/* فرم */}
          <motion.form
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
          >
            {success && (
              <div className="mb-5 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                <CheckCircle2 size={18} className="shrink-0" />
                {success}
              </div>
            )}
            {error && (
              <div className="mb-5 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                <AlertCircle size={18} className="shrink-0" />
                {error}
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">نام و نام خانوادگی</label>
              <input
                id="name"
                value={form.name}
                onChange={handleChange("name")}
                type="text"
                className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                placeholder="نام شما"
                required
              />
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">ایمیل</label>
                <input
                  id="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  type="email"
                  dir="ltr"
                  className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="mobile" className="mb-1.5 block text-sm font-medium text-slate-700">شماره موبایل</label>
                <input
                  id="mobile"
                  type="tel"
                  value={form.mobilenumber}
                  onChange={handleChange("mobilenumber")}
                  className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  dir="ltr"
                  placeholder="09xxxxxxxxx"
                  pattern="(\+98|0098|0)?9\d{9}"
                  title="شماره موبایل را به‌صورت 09xxxxxxxxx وارد کنید"
                  required
                />
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700">پیام</label>
              <textarea
                id="message"
                value={form.body}
                onChange={handleChange("body")}
                className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none transition-colors focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                rows="4"
                placeholder="پیام شما"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-amber-300 transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "در حال ارسال..." : "ارسال پیام"}
            </button>
          </motion.form>

          {/* اطلاعات تماس */}
          <motion.div
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="mb-6 text-lg font-extrabold text-slate-900">اطلاعات تماس</h2>
            <ul className="flex flex-col gap-5">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-amber-300">
                    <Icon size={16} />
                  </span>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">{label}</p>
                    {href ? (
                      <a href={href} dir="ltr" className="mt-0.5 block text-sm font-medium text-slate-800 hover:text-amber-600">
                        {value}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-sm font-medium text-slate-800">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;