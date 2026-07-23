import React from 'react';
import { FaInstagram, FaTelegram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import BtnNavbar from '../BtnNavbar/BtnNavbar';

const CONTACT = [
  { icon: FaPhone, text: '09121211212', href: 'tel:09121211212' },
  { icon: FaPhone, text: '021456588', href: 'tel:021456588' },
  { icon: FaEnvelope, text: 'coustom@gmail.com', href: 'mailto:coustom@gmail.com' },
  { icon: FaMapMarkerAlt, text: 'تهران، خیابان ولیعصر', href: null },
];

const QUICK_LINKS = [
  { title: 'صفحه اصلی', url: '/' },
  { title: 'مقالات', url: '/articles' },
  { title: 'تماس با ما', url: '/contact' },
  { title: 'سوالات متداول', url: '#' },
];

const SOCIALS = [
  { icon: FaInstagram, href: '#', label: 'اینستاگرام' },
  { icon: FaTelegram, href: '#', label: 'تلگرام' },
  { icon: FaLinkedin, href: '#', label: 'لینکدین' },
];

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="relative inline-block pb-3 text-sm font-bold text-white">
        {title}
        <span className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-l from-amber-400 to-transparent" />
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative w-full bg-slate-950 pt-16 pb-8 text-slate-300">
      {/* نوار مسیر - همان امضای بصری صفحه اصلی */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-amber-400/70 to-transparent" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 text-center sm:grid-cols-2 sm:text-right lg:grid-cols-4">
        {/* درباره ما */}
        <FooterColumn title="درباره ما">
          <p className="text-sm leading-7 text-slate-400">
            ما در [نام شرکت شما] خدمات ترخیص کالا را با بهترین کیفیت و سرعت ارائه می‌دهیم تا کسب‌وکار شما رونق بگیرد.
          </p>
          <div className="mt-4 inline-block text-amber-300 hover:text-amber-200">
            <BtnNavbar title="بیشتر بدانید ←" url="/aboutus" />
          </div>
        </FooterColumn>

        {/* اطلاعات تماس */}
        <FooterColumn title="تماس با ما">
          <ul className="flex flex-col items-center gap-3 text-sm sm:items-start">
            {CONTACT.map(({ icon: Icon, text, href }) => (
              <li key={text} className="flex items-center gap-2 text-slate-300">
                <Icon className="shrink-0 text-amber-400" />
                {href ? (
                  <a href={href} className="transition-colors hover:text-amber-300" dir="ltr">
                    {text}
                  </a>
                ) : (
                  <span>{text}</span>
                )}
              </li>
            ))}
          </ul>
        </FooterColumn>

        {/* لینک‌های سریع */}
        <FooterColumn title="لینک‌های سریع">
          <ul className="flex flex-col items-center gap-2.5 text-sm text-slate-300 sm:items-start">
            {QUICK_LINKS.map((link) => (
              <li key={link.url} className="transition-colors hover:text-amber-300">
                <BtnNavbar title={link.title} url={link.url} />
              </li>
            ))}
          </ul>
        </FooterColumn>

        {/* شبکه‌های اجتماعی */}
        <FooterColumn title="ما را دنبال کنید">
          <div className="flex justify-center gap-3 sm:justify-start">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-lg text-slate-300 transition-all hover:-translate-y-0.5 hover:bg-amber-400 hover:text-slate-950"
              >
                <Icon />
              </a>
            ))}
          </div>
        </FooterColumn>
      </div>

      {/* کپی‌رایت */}
      <div className="mt-12 border-t border-white/10 px-6 pt-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} تمامی حقوق محفوظ است | [نام شرکت شما]
      </div>
    </footer>
  );
}

export default Footer;