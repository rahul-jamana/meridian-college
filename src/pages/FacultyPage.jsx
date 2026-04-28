import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft } from 'react-icons/hi'
import SEOHead, { breadcrumbSchema, webPageSchema } from '../components/SEOHead.jsx'
import Navbar from '../components/Navbar.jsx'
import Faculty from '../components/Faculty.jsx'
import Footer from '../components/Footer.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'

const facultyJsonLd = [
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Faculty', path: '/faculty' }
  ]),
  webPageSchema({
    name: 'Faculty — Meridian College Bhubaneswar',
    description: 'Meet the experienced and dedicated faculty of Meridian College Bhubaneswar. Ph.D and M.Phil qualified professors with years of teaching experience.',
    path: '/faculty'
  })
]

export default function FacultyPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SEOHead
        title="Faculty | Experienced Teachers at Meridian College Bhubaneswar | Top College Odisha"
        description="Meet the highly qualified faculty of Meridian College Bhubaneswar — one of the top science colleges in Odisha. Our 15+ experienced professors with Ph.D, M.Phil & M.Sc qualifications provide expert teaching in Physics, Chemistry, Mathematics, Biology & Computer Science. Best faculty in Bhubaneswar private colleges."
        keywords="Meridian College faculty, best teachers Bhubaneswar college, experienced science faculty Odisha, PhD professors Bhubaneswar, top college teachers Odisha, Meridian College professors, science teachers Bhubaneswar"
        path="/faculty"
        jsonLd={facultyJsonLd}
      />
      <Navbar />

      {/* Page Banner */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-navy-800 via-navy-900 to-royal-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-royal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-royal-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors">
              <HiArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-300 to-royal-400">Faculty</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Meet the dedicated educators who shape the future of our students at one of the best science colleges in Bhubaneswar
            </p>
          </motion.div>
        </div>
      </section>

      <Faculty />
      <Footer />
      <ScrollToTop />
    </div>
  )
}
