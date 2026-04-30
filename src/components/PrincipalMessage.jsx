import React from 'react'
import { motion } from 'framer-motion'
import { HiChat } from 'react-icons/hi'
import { getImageUrl } from '../lib/cloudinary'

export default function PrincipalMessage() {
  return (
    <section id="principal" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-10 left-0 w-80 h-80 bg-royal-50/60 rounded-full -translate-x-1/3 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          {/* Principal Image / Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-80 lg:w-72 lg:h-96 rounded-3xl shadow-2xl shadow-navy-900/20 overflow-hidden border-4 border-white relative z-10">
                <img
                  src={getImageUrl('meridian/principal', { width: 600 })}
                  alt="Mr. Debashish Panda - Principal"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    if (e.target.src.includes('principal') && !e.target.src.includes('principal_photo')) {
                      e.target.src = getImageUrl('meridian/principal_photo', { width: 600 });
                    } else {
                      e.target.src = "https://ui-avatars.com/api/?name=Debashish+Panda&background=1e293b&color=fff&size=600";
                    }
                  }}
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -top-3 -left-3 w-full h-full border-2 border-royal-200 rounded-3xl -z-10"></div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border-2 border-royal-100 rounded-3xl -z-10"></div>
            </div>
          </motion.div>

          {/* Message Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-royal-100 rounded-xl flex items-center justify-center">
                <HiChat className="w-5 h-5 text-royal-600" />
              </div>
              <span className="text-royal-600 font-semibold text-sm tracking-wider uppercase">Principal's Message</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-6 leading-tight">
              From the Desk of the <span className="gradient-text">Principal</span>
            </h2>

            <div className="relative">
              <div className="absolute -top-4 -left-3 text-7xl text-royal-100 font-serif leading-none select-none">"</div>
              <div className="pl-6 space-y-4">
                <p className="text-navy-600 text-base lg:text-lg leading-relaxed italic">
                  As the Principal of Meridian College, I am proud to lead an institution that values not just academic
                  achievement, but the complete development of every student. Our mission is to create a nurturing
                  environment where students can discover their potential, develop critical thinking, and build the
                  confidence needed to succeed in today's competitive world.
                </p>
                <p className="text-navy-500 text-base leading-relaxed italic">
                  With 23 years of experience in education, I believe that every student is unique and deserves
                  individual attention. Our dedicated faculty, modern facilities, and coaching-oriented approach ensure
                  that students not only excel in board examinations but are also well-prepared for competitive exams
                  like JEE, NEET, and other entrance tests. At Meridian, we don't just teach — we inspire.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="w-px h-12 bg-royal-300"></div>
              <div>
                <h4 className="text-lg font-bold text-navy-800">Mr. Debashish Panda</h4>
                <p className="text-royal-600 text-sm font-semibold">Principal, Meridian College</p>
                <p className="text-navy-400 text-xs mt-0.5">M.A in English, M.Phil, B.Ed, M.Ed, MBA · 23 Years Experience</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
