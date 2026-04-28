import React from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft, HiAcademicCap, HiClock, HiUserGroup, HiCheckCircle, HiChevronRight } from 'react-icons/hi'
import { courses } from '../data/courses.js'
import SEOHead, { breadcrumbSchema, courseSchema } from '../components/SEOHead.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'

export default function CourseDetailPage() {
  const { slug } = useParams()
  const course = courses.find(c => c.slug === slug)

  if (!course) return <Navigate to="/" replace />

  const courseJsonLd = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Programmes', path: '/' },
      { name: course.title, path: `/course/${slug}` }
    ]),
    courseSchema(course)
  ]

  const seoTitle = `${course.title} | ${course.programme} at Meridian College Bhubaneswar | Top College Odisha`
  const seoDesc = `${course.title} (${course.programme}) at Meridian College Bhubaneswar — ${course.badge} affiliated. ${course.duration}, ${course.seats} seats. ${course.description.slice(0, 150)}... One of the top private science colleges in Odisha.`
  const seoKeywords = `${course.title} Bhubaneswar, ${course.programme} Odisha, ${course.badge} college, ${course.title} admission 2026, best ${course.programme} college Bhubaneswar, ${course.title} Meridian College`

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        keywords={seoKeywords}
        path={`/course/${slug}`}
        jsonLd={courseJsonLd}
      />
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-br from-navy-800 via-navy-900 to-royal-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-royal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-royal-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors">
              <HiArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-royal-500/20 border border-royal-400/30 text-royal-300 text-xs font-semibold rounded-full">{course.badge}</span>
              <span className="px-3 py-1 bg-white/10 border border-white/20 text-white/70 text-xs font-semibold rounded-full">{course.duration}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              {course.title}
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">{course.subtitle}</p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              {[
                { icon: HiUserGroup, label: `${course.seats} Seats`, },
                { icon: HiClock, label: course.duration },
                { icon: HiAcademicCap, label: course.affiliation },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-white/80">
                  <s.icon className="w-5 h-5 text-royal-400" />
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-2xl font-bold text-navy-800 mb-4">About This Programme</h2>
              <p className="text-navy-600 leading-relaxed text-base">{course.description}</p>
            </motion.div>

            {/* Highlights */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-bold text-navy-800 mb-5">Programme Highlights</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 bg-royal-50/60 px-4 py-3 rounded-xl">
                    <HiCheckCircle className="w-5 h-5 text-royal-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-navy-700 font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Subjects / Curriculum */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-2xl font-bold text-navy-800 mb-5">Curriculum & Subjects</h2>
              <div className="space-y-3">
                {course.subjects.map((s, i) => (
                  <div key={i} className="bg-white border border-navy-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-navy-800">{s.name}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        s.type === 'Core' ? 'bg-royal-50 text-royal-600' :
                        s.type === 'Compulsory' ? 'bg-amber-50 text-amber-600' :
                        s.type === 'Allied' ? 'bg-emerald-50 text-emerald-600' :
                        'bg-navy-50 text-navy-500'
                      }`}>{s.type}</span>
                    </div>
                    <p className="text-sm text-navy-500">{s.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Faculty */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h2 className="text-2xl font-bold text-navy-800 mb-5">Faculty</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {course.faculty.map((f, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white border border-navy-100 rounded-2xl p-5 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-gradient-to-br from-royal-500 to-navy-600 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {f.name.split(' ').filter(w => !['Mr.','Mrs.','Miss','Dr.'].includes(w)).map(w => w[0]).join('').slice(0,2)}
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-800 text-sm">{f.name}</h4>
                      <p className="text-xs text-royal-600 font-semibold">{f.role}</p>
                      <p className="text-xs text-navy-400 mt-1">{f.qualification}</p>
                      <p className="text-xs text-navy-400">{f.experience} Experience</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-royal-500 to-royal-700 rounded-3xl p-7 text-white sticky top-28"
            >
              <h3 className="text-xl font-bold mb-2">Interested?</h3>
              <p className="text-white/80 text-sm mb-6">Apply now for {course.title} — limited seats available!</p>
              <Link
                to="/contact"
                className="block text-center py-3.5 bg-white text-royal-600 font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mb-3"
              >
                Apply Now →
              </Link>
              <a
                href="tel:9437044215"
                className="block text-center py-3.5 bg-white/15 border border-white/25 text-white font-semibold rounded-xl hover:bg-white/25 transition-all"
              >
                📞 Call: 9437044215
              </a>

              <div className="mt-8 pt-6 border-t border-white/20 space-y-4">
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-1">Eligibility</p>
                  <p className="text-white/90 text-sm">{course.eligibility}</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-1">Duration</p>
                  <p className="text-white/90 text-sm">{course.duration}</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-1">Total Seats</p>
                  <p className="text-white/90 text-sm">{course.seats} Seats</p>
                </div>
              </div>
            </motion.div>

            {/* Career Paths */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-navy-100 rounded-3xl p-7"
            >
              <h3 className="text-lg font-bold text-navy-800 mb-4">Career Paths</h3>
              <div className="space-y-2">
                {course.careerPaths.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-navy-600 font-medium">
                    <HiChevronRight className="w-4 h-4 text-royal-500" />
                    {c}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Other Courses */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-navy-50 rounded-3xl p-7"
            >
              <h3 className="text-lg font-bold text-navy-800 mb-4">Other Programmes</h3>
              <div className="space-y-2">
                {courses.filter(c => c.slug !== slug).slice(0, 5).map((c) => (
                  <Link
                    key={c.slug}
                    to={`/course/${c.slug}`}
                    className="flex items-center justify-between p-3 bg-white rounded-xl hover:shadow-md transition-all group"
                  >
                    <span className="text-sm font-medium text-navy-700 group-hover:text-royal-600 transition-colors">{c.title}</span>
                    <HiChevronRight className="w-4 h-4 text-navy-300 group-hover:text-royal-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
