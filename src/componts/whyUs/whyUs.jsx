import React from "react";
import { Phone, Mail, CheckCircle } from "lucide-react";

function Services() {
  const services = [
    "ترخیص انواع کالاهای تجاری، صنعتی و شخصی",
    "پیگیری و انجام تمامی مراحل اداری گمرک",
    "دریافت مجوزهای لازم از سازمان‌های مربوطه",
    "محاسبه و پرداخت حقوق و عوارض گمرکی",
    "مشاوره تخصصی برای کاهش هزینه‌های گمرکی",
    "حمل و نقل داخلی و تحویل کالا به مقصد",
  ];

  return (
    <div className="flex justify-center items-center p-6 px-10 bg-gradient-to-r  min-h-screen">
    <div className=" bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-2xl  px-30 text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">خدمات ما</h2>
      
      <ul className="space-y-4 text-gray-700">
        {services.map((service, index) => (
          <li key={index} className="flex items-center justify-center space-x-3 bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition">
            <CheckCircle className="text-green-500 w-6 h-6" />
            <span className="text-lg">{service}</span>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default Services;
