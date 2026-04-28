import React from 'react'
import { motion } from 'framer-motion'
import {
  HiUserGroup, HiClipboardCheck, HiPencil, HiQuestionMarkCircle,
  HiEye, HiClock,
} from 'react-icons/hi'

const features = [
  {
    icon: HiUserGroup,
    title: 'Experienced Faculty',
    description: 'Highly qualified and dedicated professors with years of teaching experience in their domains.',
  },
  {
    icon: HiClipboardCheck,
    title: 'Weekly Tests',
    description: 'Regular assessments to track student progress and identify areas for improvement.',
  },
  {
    icon: HiPencil,
    title: 'Monthly Assignments',
    description: 'Structured assignments ensuring continuous learning and concept reinforcement.',
  },
  {
    icon: HiQuestionMarkCircle,
    title: 'Doubt Clearing Classes',
    description: 'Dedicated sessions where students can resolve their academic doubts with faculty guidance.',
  },
  {
    icon: HiEye,
    title: 'Academic Monitoring',
    description: 'Individual student performance tracking with regular parent-teacher communication.',
  },
  {
    icon: HiClock,
    title: 'Regular Evening Classes',
    description: 'Extended study hours with supervised evening classes for additional practice and revision.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-royal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-royal-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 left-0 w-full h-full pattern-dots opacity-[0.02]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-royal-400 font-semibold text-sm tracking-wider uppercase mb-3">
            Our Strengths
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-300 to-royal-400">
              Meridian
            </span>
          </h2>
          <p className="text-navy-300 text-lg max-w-2xl mx-auto">
            At Meridian College Bhubaneswar, we go beyond textbooks to provide a nurturing academic environment that transforms students into confident achievers — making us one of the top science colleges in Odisha
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-royal-400/30 transition-all duration-500"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-royal-500/0 to-royal-600/0 group-hover:from-royal-500/5 group-hover:to-royal-600/5 transition-all duration-500"></div>

              <div className="relative">
                <div className="w-12 h-12 bg-royal-500/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-royal-500/30 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-royal-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-royal-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-navy-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
