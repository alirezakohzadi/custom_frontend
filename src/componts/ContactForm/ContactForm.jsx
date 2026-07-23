import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("فرم ارسال شد:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-md mx-auto p-1 bg-white rounded-lg transition-all hover:shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-black">ارتباط با ما</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="نام شما"
          className="w-full p-3 border bg-[#F8F9FD] rounded-lg focus:outline-none transition"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ایمیل شما"
          className="w-full p-3 border bg-[#F8F9FD] rounded-lg focus:outline-none transition"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="پیام شما"
          rows="4"
          className="w-full p-3 border bg-[#F8F9FD] rounded-lg focus:outline-none transition"
        />
        <button
          type="submit"
          className="w-full bg-gray-800 text-white p-3 rounded-lg font-bold hover:bg-black transition-all hover:scale-105 active:scale-95"
        >
          ارسال پیام
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
