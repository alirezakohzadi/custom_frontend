import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const QuestionComMon = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) {
    return <p className="text-center text-slate-400">سوالی برای نمایش وجود ندارد.</p>;
  }

  return (
    <div className="flex w-full flex-col gap-3">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;
        const panelId = `faq-panel-${faq.id ?? index}`;
        const buttonId = `faq-button-${faq.id ?? index}`;

        return (
          <motion.div
            key={faq.id ?? index}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <button
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-3 p-4 text-right text-sm font-bold text-slate-900 transition-colors hover:bg-slate-50 sm:text-base"
              onClick={() => toggleAccordion(index)}
            >
              <span>{faq.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-amber-500"
              >
                <ChevronDown size={18} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="border-t border-slate-100"
                >
                  <p className="p-4 text-sm leading-7 text-slate-600 sm:text-base">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default QuestionComMon;