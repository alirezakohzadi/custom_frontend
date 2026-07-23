import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const QuestionComMon = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-4 rounded-xl">
      {faqs && faqs.length > 0 ? (
        faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border border-gray-300 rounded-xl overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              className="w-full flex justify-between items-center p-4 bg-white text-right font-medium text-blue-900 border-b border-gray-200"
              onClick={() => toggleAccordion(index)}
            >
              <span>{faq.question}</span>
              <motion.div
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-600" />
              </motion.div>
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  className="p-4 bg-gray-50 text-gray-700"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <p className="text-sm">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-gray-500">سوالی برای نمایش وجود ندارد.</p>
      )}
    </div>
  );
};

export default QuestionComMon;
