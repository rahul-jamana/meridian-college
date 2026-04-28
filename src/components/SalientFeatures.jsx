import React from 'react'
import { motion } from 'framer-motion'
import { HiCheckCircle } from 'react-icons/hi'

const salientFeatures = [
  'We take care of each student with personal attention and mentoring.',
  'We offer separate homely hostels for both boys and girls with dedicated wardens.',
  'Our teaching method is coaching-oriented, dispelling all doubts effectively.',
  'We provide special entrance coaching for JEE, NEET & other competitive exams.',
  'Our laboratories are fully functioning and equipped with all modern tools.',
  'We address all health issues immediately with on-campus medical facilities.',
  'A growing and competitive environment that builds confidence.',
  'A holistic atmosphere with yoga, sports, and moral education.',
  'Personal counseling for students to overcome any academic challenges.',
  'Regular evening classes and supervised study hours for consistent progress.',
]

const selfDev = {
  title: 'Self Development & Holistic Growth',
  description: 'The stimulating learning environment at Meridian is designed to enhance the learning capabilities of every student. With personal care and attention to each pupil, you will find a straight path to success. We provide quality education with dedicated doubt-clearing classes, personal counseling, and encourage our students to practice yoga and meditation for holistic development. Study tours and cultural activities help students take meaningful pauses before starting anew.',
}

const spirituality = {
  title: 'Yoga & Well-Being',
  description: 'At Meridian College, we teach and encourage our students to practice yoga daily for their all-round development. We organize meditation and wellness sessions on campus so students can reduce stress, build focus, and develop a balanced approach to academic and personal life. This holistic method helps students stay calm during exams and builds resilience for a successful career.',
}

export default function SalientFeatures() {
  return (
    <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-royal-50/50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

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
            What Makes Us Different
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-navy-800 mb-4">
            Salient <span className="gradient-text">Features</span>
          </h2>
          <p className="text-navy-500 text-lg max-w-2xl mx-auto">
            Discover what sets Meridian College apart from the rest
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-3">
              {salientFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className="flex items-start gap-3 bg-navy-50/50 px-4 py-3 rounded-xl hover:bg-royal-50 transition-colors duration-300 group"
                >
                  <HiCheckCircle className="w-5 h-5 text-royal-500 flex-shrink-0 mt-0.5 group-hover:text-royal-600 transition-colors" />
                  <span className="text-sm text-navy-600 font-medium leading-relaxed">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Self Development & Spirituality */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Self Development Card */}
            <div className="bg-gradient-to-br from-royal-50 to-navy-50 rounded-3xl p-7 lg:p-8 border border-royal-100/50">
              <div className="w-12 h-12 bg-royal-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-3">{selfDev.title}</h3>
              <p className="text-navy-500 text-sm leading-relaxed">{selfDev.description}</p>
            </div>

            {/* Yoga & Well-being Card */}
            <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-3xl p-7 lg:p-8 text-white">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🧘</span>
              </div>
              <h3 className="text-xl font-bold mb-3">{spirituality.title}</h3>
              <p className="text-navy-300 text-sm leading-relaxed">{spirituality.description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
