import React, { useState } from "react";
import { motion } from "framer-motion";
import { usermessage } from "../../services/api";
function ContactUs() {
  const [name, setnName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setnBody] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  const [loading, setLoading] = useState(false); // وضعیت بارگذاری
  const [error, setError] = useState(""); // پیام خطا
  const [success, setSuccess] = useState(""); // پیام موفقیت

  const handleSubmit = (e) => {
    e.preventDefault(); // جلوگیری از رفرش شدن صفحه هنگام ارسال فرم
    setLoading(true); // شروع بارگذاری
    setError(""); // پاک کردن خطای قبلی
    setSuccess(""); // پاک کردن پیام موفقیت قبلی

    usermessage(name, email, body, mobilenumber)
      .then((res) => {
        setLoading(false); // پایان بارگذاری
        setSuccess("پیام شما با موفقیت ارسال شد."); // نمایش پیام موفقیت
        setTimeout(() => setSuccess(''), 5000); // پاک کردن پیام موفقیت بعد از 5 ثانیه
      })
      .catch((error) => {
        setLoading(false); // پایان بارگذاری در صورت بروز خطا
        setError('خطا در ارسال پیام. لطفاً دوباره تلاش کنید.'); // نمایش خطا
        setTimeout(() => setError(''), 10000); // پاک کردن خطا بعد از 10 ثانیه
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-30 px-6">
      {/* هدر صفحه */}
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        تماس با ما
      </motion.h1>

      {/* نمایش پیام خطا */}
      {error && (
        <div className="mb-4 p-3 bg-red-500 text-white rounded-lg text-center">
          {error}
        </div>
      )}

      {/* نمایش پیام موفقیت */}
      {success && (
        <div className="mb-4 p-3 bg-green-500 text-white rounded-lg text-center">
          {success}
        </div>
      )}

      {/* فرم تماس */}
      <motion.form
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">نام و نام خانوادگی</label>
          <input
            onChange={(e) => setnName(e.target.value)}
            type="text"
            className="w-full p-3 border rounded-lg"
            placeholder="نام شما"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">ایمیل</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full p-3 border rounded-lg"
            placeholder="ایمیل شما"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">شماره موبایل</label>
          <input
            type="tel"
            onChange={(e) => setMobilenumber(e.target.value)}
            className="w-full p-3 border rounded-lg text-right"
            rows="1"
            placeholder="شماره موبایل"
            pattern="[\+]?98[\-]?[0-9]{3}[\-]?[0-9]{3}[\-]?[0-9]{4}"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">پیام</label>
          <textarea
            onChange={(e) => setnBody(e.target.value)}
            className="w-full p-3 border rounded-lg"
            rows="4"
            placeholder="پیام شما"
            required
          ></textarea>
        </div>

        {/* دکمه ارسال پیام */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full"
          disabled={loading} // غیرفعال کردن دکمه در حین بارگذاری
        >
          {loading ? "در حال ارسال..." : "ارسال پیام"}
        </button>
      </motion.form>

      {/* اطلاعات تماس */}
      <motion.div
        className="mt-12 text-center bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-gray-800">اطلاعات تماس</h2>
        <p className="text-gray-600 mt-2">ایمیل: info@company.com</p>
        <p className="text-gray-600">تلفن: 021-12345678</p>
        <p className="text-gray-600">آدرس: تهران، خیابان ولیعصر، برج تجاری XYZ</p>
      </motion.div>
    </div>
  );
}

export default ContactUs;
