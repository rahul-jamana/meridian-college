import React from 'react'
import { motion } from 'framer-motion'
import {
  HiDesktopComputer, HiBeaker, HiBookOpen, HiChip,
  HiOfficeBuilding, HiShieldCheck, HiStar, HiAcademicCap,
  HiChat, HiHeart, HiTruck, HiLightningBolt,
} from 'react-icons/hi'

const facilities = [
  { icon: HiDesktopComputer, title: 'Smart Classrooms', description: 'Digital boards and modern teaching aids for interactive learning' },
  { icon: HiBeaker, title: 'Science Labs', description: 'Well-equipped Physics, Chemistry & Biology laboratories' },
  { icon: HiBookOpen, title: 'Library', description: 'Extensive collection of academic books, journals & references' },
  { icon: HiChip, title: 'Computer Centre', description: 'Modern computer lab with high-speed internet connectivity' },
  { icon: HiOfficeBuilding, title: 'Boys Hostel', description: 'Safe and comfortable accommodation with all amenities' },
  { icon: HiOfficeBuilding, title: 'Girls Hostel', description: 'Secure hostel with dedicated warden and facilities' },
  { icon: HiStar, title: 'Indoor & Outdoor Games', description: 'Sports facilities for holistic development of students' },
  { icon: HiAcademicCap, title: 'JEE / NEET Coaching', description: 'Expert coaching for competitive entrance examinations' },
  { icon: HiChat, title: 'Spoken English', description: 'Communication skills training for professional readiness' },
  { icon: HiHeart, title: 'Medical Facilities', description: 'On-campus medical support and first aid for students' },
  { icon: HiTruck, title: 'Transportation', description: 'College bus service available for convenient daily commute' },
  { icon: HiLightningBolt, title: 'Personality Development', description: 'Soft skills training and personality grooming sessions' },
]

export default function Facilities() {
  return (
    <section id="facilities" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      {/* Decorative */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-royal-50 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

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
            Campus Infrastructure
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-navy-800 mb-4">
            Our <span className="gradient-text">Facilities</span>
          </h2>
          <p className="text-navy-500 text-lg max-w-2xl mx-auto">
            State-of-the-art infrastructure designed to provide the best learning environment
          </p>
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {facilities.map((facility, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative bg-white rounded-2xl p-6 border border-navy-100/50 shadow-md shadow-navy-900/3 hover:shadow-xl hover:shadow-royal-500/10 hover:-translate-y-2 hover:border-royal-200 transition-all duration-500 cursor-default"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-royal-50 to-royal-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-royal-500 group-hover:to-royal-600 transition-all duration-300">
                <facility.icon className="w-6 h-6 text-royal-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-base font-bold text-navy-800 mb-2 group-hover:text-royal-600 transition-colors duration-300">
                {facility.title}
              </h3>
              <p className="text-navy-400 text-sm leading-relaxed">
                {facility.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
