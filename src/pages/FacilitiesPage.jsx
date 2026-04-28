import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft } from 'react-icons/hi'
import SEOHead, { breadcrumbSchema, webPageSchema } from '../components/SEOHead.jsx'
import Navbar from '../components/Navbar.jsx'
import Facilities from '../components/Facilities.jsx'
import SalientFeatures from '../components/SalientFeatures.jsx'
import Footer from '../components/Footer.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'

const facilitiesJsonLd = [
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Facilities', path: '/facilities' }
  ]),
  webPageSchema({
    name: 'Facilities — Meridian College Bhubaneswar',
    description: 'World-class facilities at Meridian College Bhubaneswar: smart classrooms, science labs, library, hostels, computer lab, sports ground & more.',
    path: '/facilities'
  })
]

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SEOHead
        title="Facilities | Smart Classrooms, Labs & Hostels at Meridian College Bhubaneswar"
        description="Explore world-class facilities at Meridian College Bhubaneswar — one of the top private science colleges in Odisha. Smart classrooms with digital boards, well-equipped physics, chemistry & biology labs, computer lab, library, separate boys & girls hostels, sports ground, transportation, and canteen. Best infrastructure among Bhubaneswar colleges."
        keywords="Meridian College facilities, smart classroom Bhubaneswar, science lab college Odisha, hostel facility Bhubaneswar college, best infrastructure college Bhubaneswar, computer lab college Odisha, college with hostel Bhubaneswar, top facilities private college Odisha, college library Bhubaneswar, college sports ground Odisha"
        path="/facilities"
        jsonLd={facilitiesJsonLd}
      />
      <Navbar />

      {/* Page Banner */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-navy-800 via-navy-900 to-royal-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-royal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-royal-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors">
              <HiArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-300 to-royal-400">Facilities</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              World-class infrastructure designed for an exceptional learning experience at one of the top colleges in Odisha
            </p>
          </motion.div>
        </div>
      </section>

      <Facilities />
      <SalientFeatures />
      <Footer />
      <ScrollToTop />
    </div>
  )
}
