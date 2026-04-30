import React from 'react'
import { motion } from 'framer-motion'
import { HiChat } from 'react-icons/hi'
import { getImageUrl } from '../lib/cloudinary'

export default function ChairmanMessage() {
  return (
    <section id="chairman" className="relative py-20 lg:py-28 bg-gradient-to-br from-navy-50/60 to-royal-50/30 overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-royal-100/40 rounded-full translate-x-1/3 blur-3xl"></div>
      <div className="absolute bottom-10 left-0 w-64 h-64 bg-navy-100/30 rounded-full -translate-x-1/3 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          {/* Message Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 order-2 lg:order-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-royal-100 rounded-xl flex items-center justify-center">
                <HiChat className="w-5 h-5 text-royal-600" />
              </div>
              <span className="text-royal-600 font-semibold text-sm tracking-wider uppercase">Chairman's Message</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-6 leading-tight">
              A Message from Our <span className="gradient-text">Chairman</span>
            </h2>

            <div className="relative">
              <div className="absolute -top-4 -left-3 text-7xl text-royal-100 font-serif leading-none select-none">"</div>
              <div className="pl-6 space-y-4">
                <p className="text-navy-600 text-base lg:text-lg leading-relaxed italic">
                  Education is not merely a destination—it is a lifelong journey of learning, growth, and transformation.
                  At Meridian College, our vision goes beyond delivering academic excellence. We are committed to shaping
                  young minds into confident, skilled, and responsible individuals who are prepared to face real-world challenges.
                </p>
                <p className="text-navy-500 text-base leading-relaxed italic">
                  Our focus is not just on securing certificates, but on building strong foundations for life and career success.
                  In today's rapidly evolving and competitive world, science education plays a crucial role in driving innovation,
                  critical thinking, and problem-solving abilities. With this belief, I established Meridian College—an institution
                  dedicated to nurturing future scientists, professionals, and leaders.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="w-px h-12 bg-royal-300"></div>
              <div>
                <h4 className="text-lg font-bold text-navy-800">Er. Alok Ranjan Mallick</h4>
                <p className="text-royal-600 text-sm font-semibold">Chairman, Meridian College</p>
              </div>
            </div>
          </motion.div>

          {/* Chairman Image / Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-80 lg:w-72 lg:h-96 rounded-3xl shadow-2xl shadow-navy-900/20 overflow-hidden border-4 border-white relative z-10">
                <img
                  src={getImageUrl('meridian/chairman', { width: 600 })}
                  alt="Er. Alok Ranjan Mallick - Chairman"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Image failed to load:", e.target.src)
                    e.target.src = "https://ui-avatars.com/api/?name=Alok+Mallick&background=1e293b&color=fff&size=600"
                  }}
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-royal-400 rounded-3xl z-0"></div>
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-royal-200 rounded-3xl z-0"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-royal-500 to-navy-600 rounded-full blur-2xl opacity-50 z-0"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
