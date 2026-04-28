import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiDownload } from 'react-icons/hi'

export default function AdmissionCTA() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-royal-600 via-royal-500 to-navy-600"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTZ2LTZoNnptMC0zMHY2aC02VjRoNnptMCAzMHY2aC02di02aDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>

      {/* Decorative blobs */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-10 right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"
      ></motion.div>
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-10 left-20 w-56 h-56 bg-white/5 rounded-full blur-3xl"
      ></motion.div>

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Urgency Badge */}
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
            Limited Seats — Don't Miss Out!
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
            Limited Seats Available for{' '}
            <span className="text-gold-400">2026–27</span>{' '}
            Admissions
          </h2>
          <p className="text-white/80 text-lg lg:text-xl max-w-2xl mx-auto mb-10">
            Secure your child's future today. Join Meridian College and get access to world-class science education, expert faculty, and a nurturing campus environment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-royal-600 font-bold text-lg rounded-2xl shadow-2xl shadow-navy-900/20 hover:shadow-navy-900/30 hover:-translate-y-1 transition-all duration-300"
            >
              Apply for Admission
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/25 text-white font-semibold text-lg rounded-2xl hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              <HiDownload className="w-5 h-5" />
              Download Prospectus
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
            {[
              { value: '256+', label: 'Seats Available' },
              { value: '14+', label: 'Years Legacy' },
              { value: '95%', label: 'Satisfaction Rate' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-white/60 text-xs lg:text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
