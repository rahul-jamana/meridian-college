import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiCreditCard, HiCurrencyRupee } from 'react-icons/hi';
import { getFees } from '../lib/db';

export default function FeeStructure() {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    setFees(getFees());
  }, []);

  return (
    <section id="fees" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      {/* Decorative circle - same as Facilities */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-royal-50 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header - same style as Facilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-royal-600 font-semibold text-sm tracking-wider uppercase mb-3">
            Investment for Future
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-navy-800 mb-4">
            Fee <span className="gradient-text">Structure</span>
          </h2>
          <p className="text-navy-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Transparent fee structure designed to provide world-class education at an affordable cost for every student.
          </p>
        </motion.div>

        {/* Fee Cards */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {fees.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group h-full"
            >
              <div className="relative h-full bg-white rounded-2xl p-8 lg:p-10 border border-navy-100/50 shadow-md shadow-navy-900/3 hover:shadow-2xl hover:shadow-royal-500/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-royal-600 to-royal-400"></div>
                
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-royal-50 to-royal-100 rounded-xl flex items-center justify-center text-royal-600 border border-royal-100 group-hover:bg-royal-600 group-hover:text-white transition-all duration-300">
                    {idx === 0 ? <HiCurrencyRupee className="w-8 h-8" /> : <HiCreditCard className="w-8 h-8" />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy-800 group-hover:text-royal-600 transition-colors duration-300">
                      {courseTitles[idx] || item.course}
                    </h3>
                    <p className="text-navy-400 text-xs font-bold uppercase tracking-widest mt-1">
                      {idx === 0 ? 'Integrated Package' : 'Degree Program'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {item.structure.map((row, i) => (
                    <div key={i} className="flex items-center justify-between p-5 rounded-xl bg-slate-50/50 border border-transparent hover:border-royal-100 hover:bg-royal-50/30 transition-all duration-300">
                      <div className="flex flex-col">
                        <span className="text-navy-800 font-bold text-lg">{row.year}</span>
                        <span className="text-navy-400 text-[10px] font-bold uppercase tracking-wider">{row.note}</span>
                      </div>
                      <div className="flex flex-col items-end text-right">
                        <span className="text-2xl font-black text-royal-600 tracking-tighter">
                          {row.amount}
                        </span>
                        <span className="text-[10px] text-navy-300 font-bold uppercase tracking-widest">Academic Year</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-navy-50">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[11px] font-black text-navy-400 uppercase tracking-[0.2em]">Key Inclusions</span>
                    <div className="flex-1 h-px bg-navy-50"></div>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-navy-600 text-sm font-medium">
                        <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center border border-green-100 shrink-0">
                          <HiCheckCircle className="w-3.5 h-3.5 text-green-600" />
                        </div>
                        <span className="truncate">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-navy-800 text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-royal-600 hover:shadow-2xl hover:shadow-royal-900/20 transition-all duration-300 group"
          >
            Enquire Now
            <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

const courseTitles = [
  "+2 Integrated Science",
  "+3 Science Honours"
];
