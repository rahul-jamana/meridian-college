import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiCheckCircle } from 'react-icons/hi'
import { getAboutImage } from '../lib/db'

const highlights = [
  'Established in 2011',
  'Co-Educational Institution',
  '+2 Science (PCB & PCM Streams)',
  '+3 Science Honours (6 Subjects)',
  'Smart Classrooms & Science Labs',
  '15+ Experienced & Dedicated Faculty',
  'Optional JEE/NEET Coaching',
  'Separate Hostels for Boys & Girls',
  'Transportation Facility Available',
  'Spoken English & Personality Development',
]

export default function About() {
  const [aboutImg, setAboutImg] = useState('')

  useEffect(() => {
    setAboutImg(getAboutImage())
  }, [])
  return (
    <section id="about" className="relative py-10 lg:py-16 bg-white overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-royal-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-navy-900/10">
              <img
                src={aboutImg}
                alt="Meridian College Bhubaneswar Smart Classroom — One of the Top Private Science Colleges in Odisha"
                className="w-full h-80 lg:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 to-transparent"></div>
            </div>
            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 bg-white rounded-2xl shadow-xl shadow-navy-900/10 p-5 border border-navy-100"
            >
              <div className="text-3xl lg:text-4xl font-bold text-royal-600">14+</div>
              <div className="text-sm text-navy-500 font-medium">Years of Excellence</div>
            </motion.div>

          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-royal-600 font-semibold text-sm tracking-wider uppercase mb-3">
              About Us
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-navy-800 mb-6 leading-tight">
              Welcome to{' '}
              <span className="gradient-text">Meridian College, Bhubaneswar</span>
            </h2>
            <p className="text-navy-500 text-base lg:text-lg leading-relaxed mb-4">
              Meridian College, Bhatkhuri, Gangapada, Bhubaneswar is one of the <strong className="text-navy-700">top private science colleges in Odisha</strong>,
              established in 2011 under the visionary leadership of Chairman <strong className="text-navy-700">Er. Alok Ranjan Mallick</strong>. Offering +2 Science (PCM & PCB) and +3 Science Honours (B.Sc.) programmes, the college is affiliated to CHSE Odisha and Utkal University. Recognized among the <strong className="text-navy-700">best colleges in Bhubaneswar</strong>, Meridian is committed to academic excellence and holistic student development.
            </p>
            <p className="text-navy-500 text-base lg:text-lg leading-relaxed mb-8">
              The college provides PCB and PCM streams, separate hostel facilities for boys and girls, smart
              classrooms, well-equipped science labs, library, optional coaching for JEE/NEET, spoken English
              classes, transportation facility, and dedicated academic mentoring with regular evening classes.
            </p>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className="flex items-center gap-2 text-navy-600"
                >
                  <HiCheckCircle className="w-5 h-5 text-royal-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </div>

            <a
              href="#programmes"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy-800 text-white font-semibold rounded-xl hover:bg-navy-700 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-navy-800/20"
            >
              Explore Programmes
              <span className="text-lg">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
