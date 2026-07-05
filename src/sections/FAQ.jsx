import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const faqData = [
  {
    question: "When does the nesting season happen and when are walks conducted?",
    answer: "The Olive Ridley nesting season along the Chennai coastline runs from late December to April. Public turtle walks are conducted on Friday and Saturday nights during these months, usually starting around 11:00 PM."
  },
  {
    question: "Is there a fee to join the turtle walks?",
    answer: "No, participation in our turtle walks is completely free. We are a voluntary group and believe in environmental education for all. However, you must register in advance through email as slots are strictly limited for walk safety."
  },
  {
    question: "Where do the walks start and what distance do they cover?",
    answer: "The walks start from Neelangarai beach and conclude at Besant Nagar beach. The route covers a 7-kilometer stretch of coastline. It takes roughly 3 to 4 hours of gentle walking on the wet sand."
  },
  {
    question: "What should I wear or bring for the night walk?",
    answer: "We recommend comfortable footwear suitable for wet sand and dark-colored clothing. Do NOT bring white flashlights, torches, or cameras with flashes. Bright lights disorient nesting turtles and emerging hatchlings. Our coordinators carry specialized, non-intrusive red lights."
  },
  {
    question: "Can children participate in the night walks?",
    answer: "Yes, children are welcome! It is a fantastic educational experience. However, since the walk starts late at night (11 PM) and spans 7 km of walking on sand, parents must judge whether their children can comfortably walk the entire distance."
  },
  {
    question: "How are the collected turtle eggs protected?",
    answer: "Eggs found during the night walks are carefully gathered by trained coordinators and relocated to our secured hatchery enclosures. Here, they are buried at natural nest depths and protected from wild dogs, crabs, and poachers. After 45-50 days, the emerging hatchlings are immediately released into the sea."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-brand-gray relative overflow-hidden">
      {/* Background shape */}
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-brand-light-blue/20 blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SectionTitle
          tag="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about participating in the turtle walks, safety guidelines, and volunteering shifts."
        />

        <div className="flex flex-col gap-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-[20px] shadow-soft overflow-hidden transition-all duration-300"
              >
                {/* Header Toggle */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 pr-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? 'text-brand-teal' : 'text-gray-400'}`} />
                    <span className="font-poppins font-bold text-sm sm:text-base text-brand-dark group-hover:text-brand-blue transition-colors">
                      {item.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 p-1 bg-brand-gray rounded-full text-gray-500"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Answer body with Framer Motion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-gray-50 text-left">
                        <p className="text-xs sm:text-sm text-gray-500 font-sans leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
