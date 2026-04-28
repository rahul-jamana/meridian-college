import React from 'react'
import { motion } from 'framer-motion'
import { HiStar } from 'react-icons/hi'

const testimonials = [
  {
    name: 'Subhankar Mohanty',
    role: 'B.Sc. Physics, Batch 2024',
    quote: 'Meridian College transformed my academic journey. The faculty here are incredibly supportive and the JEE coaching helped me crack the exam on my first attempt. The smart classrooms and lab facilities are top-notch!',
    rating: 5,
    initials: 'SM',
  },
  {
    name: 'Priyanka Das',
    role: 'Parent of +2 Science Student',
    quote: 'As a parent, I feel reassured knowing my daughter is in a safe environment with separate hostel facilities and dedicated wardens. The regular academic monitoring and parent-teacher meetings keep us updated on her progress.',
    rating: 5,
    initials: 'PD',
  },
  {
    name: 'Ankit Kumar Sahu',
    role: '+2 Science (PCM), Batch 2025',
    quote: 'The weekly tests and doubt clearing sessions really helped me stay on track. The evening study classes and NEET coaching gave me the extra edge. I am grateful to all my teachers at Meridian College.',
    rating: 5,
    initials: 'AK',
  },
]

export default function Testimonials() {
  return (
    <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-royal-50 rounded-full blur-3xl opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-royal-600 font-semibold text-sm tracking-wider uppercase mb-3">
            Student Voices
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-navy-800 mb-4">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
          <p className="text-navy-500 text-lg max-w-2xl mx-auto">
            Hear from our students and parents about their experience at Meridian College
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group relative bg-white rounded-2xl p-7 lg:p-8 border border-navy-100/50 shadow-lg shadow-navy-900/3 hover:shadow-xl hover:shadow-royal-500/10 hover:-translate-y-1 transition-all duration-500"
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-6 text-6xl text-royal-100 font-serif leading-none select-none">"</div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <HiStar key={i} className="w-5 h-5 text-gold-400" />
                ))}
              </div>

              <p className="text-navy-600 text-sm leading-relaxed mb-6 relative z-10">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-navy-100">
                <div className="w-11 h-11 bg-gradient-to-br from-royal-500 to-navy-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <h4 className="font-bold text-navy-800 text-sm">{t.name}</h4>
                  <p className="text-navy-400 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
