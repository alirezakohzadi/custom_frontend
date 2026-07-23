import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

function NewArticle({ imgurl, body, title }) {
  return (
    <motion.div
      className="flex items-center justify-center p-2 text-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/10"
        whileHover={{ y: -4 }}
      >
        <div className="aspect-video w-full overflow-hidden">
          <img src={imgurl} alt={title} className="h-full w-full object-cover" />
        </div>

        <div className="p-4 text-right sm:p-5">
          <h3 className="line-clamp-2 text-base font-bold text-slate-900 sm:text-lg">{title}</h3>
          <p className="mt-2 line-clamp-2 text-xs leading-6 text-slate-500 sm:text-sm">{body}</p>

          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 sm:text-sm">
            بیشتر بدانید
            <ArrowLeft size={14} />
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default NewArticle;