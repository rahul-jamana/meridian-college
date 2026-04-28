import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiBeaker, HiCalculator, HiChip, HiBookOpen, HiUserGroup, HiDesktopComputer, HiArrowRight } from 'react-icons/hi'
import { courses } from '../data/courses.js'

const subjectIcons = {
  'Physics': HiBeaker, 'Chemistry': HiBeaker, 'Mathematics': HiCalculator,
  'Biology': HiChip, 'Biology / IT': HiChip, 'English': HiBookOpen,
  'Odia / Alt English': HiBookOpen, 'Odia / Alt. English': HiBookOpen,
  'Botany': HiBeaker, 'Zoology': HiBeaker, 'Computer Science': HiDesktopComputer,
  'IT / Computer Science': HiDesktopComputer, 'IT / Environmental Science': HiChip,
}

/* Group courses for display: +2 and +3 */
const plusTwo = courses.filter(c => c.programme === '+2 Science')
const plusThree = courses.filter(c => c.programme === '+3 Science Honours')

export default function Programmes() {
  return (
    <section id="programmes" className="relative py-20 lg:py-28 bg-gradient-to-b from-navy-50/50 to-white">
      <div className="absolute top-0 left-0 w-full h-full pattern-dots pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-royal-600 font-semibold text-sm tracking-wider uppercase mb-3">
            Academic Programmes
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-navy-800 mb-4">
            Programmes <span className="gradient-text">Offered</span>
          </h2>
          <p className="text-navy-500 text-lg max-w-2xl mx-auto">
            Choose from our comprehensive science programmes — click any course to see full details
          </p>
        </motion.div>

        {/* +2 Science Cards */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-navy-700 uppercase tracking-wider mb-5 flex items-center gap-2">
            <HiBeaker className="w-5 h-5 text-royal-500" /> +2 Science (Higher Secondary)
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {plusTwo.map((course, idx) => (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  to={`/course/${course.slug}`}
                  className="group block bg-white rounded-3xl shadow-lg shadow-navy-900/5 border border-navy-100/50 overflow-hidden hover:shadow-2xl hover:shadow-royal-500/10 hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="h-2 bg-gradient-to-r from-royal-500 to-royal-600"></div>
                  <div className="p-7 lg:p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-navy-800 group-hover:text-royal-600 transition-colors">{course.title}</h4>
                        <p className="text-navy-400 text-sm font-medium">{course.subtitle}</p>
                      </div>
                      <span className="px-3 py-1 bg-navy-50 text-navy-600 text-xs font-semibold rounded-full border border-navy-100">{course.badge}</span>
                    </div>
                    <p className="text-navy-500 text-sm mb-5 line-clamp-2">{course.description}</p>

                    {/* Subject pills */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {course.subjects.slice(0, 4).map((s, i) => (
                        <span key={i} className="text-xs bg-navy-50 text-navy-600 px-2.5 py-1 rounded-lg font-medium">{s.name}</span>
                      ))}
                      {course.subjects.length > 4 && (
                        <span className="text-xs bg-royal-50 text-royal-600 px-2.5 py-1 rounded-lg font-medium">+{course.subjects.length - 4} more</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-navy-100">
                      <div className="flex items-center gap-2">
                        <HiUserGroup className="w-4 h-4 text-royal-500" />
                        <span className="text-sm font-semibold text-navy-600">{course.seats} Seats</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-royal-600 group-hover:gap-2 transition-all">
                        View Details <HiArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* +3 Science Honours Cards */}
        <div>
          <h3 className="text-lg font-bold text-navy-700 uppercase tracking-wider mb-5 flex items-center gap-2">
            <HiCalculator className="w-5 h-5 text-royal-500" /> +3 Science Honours (B.Sc.)
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {plusThree.map((course, idx) => (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Link
                  to={`/course/${course.slug}`}
                  className="group block bg-white rounded-2xl shadow-md border border-navy-100/50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-400 h-full"
                >
                  <div className="h-1.5 bg-gradient-to-r from-navy-600 to-navy-700"></div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-navy-800 mb-1 group-hover:text-royal-600 transition-colors">{course.title}</h4>
                    <p className="text-navy-400 text-xs font-medium mb-3">{course.badge} · {course.duration}</p>
                    <p className="text-navy-500 text-sm mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-navy-100">
                      <span className="text-xs font-semibold text-navy-500">{course.seats} Seats</span>
                      <span className="text-xs font-semibold text-royal-600 group-hover:underline">Details →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
