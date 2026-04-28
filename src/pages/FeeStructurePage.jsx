import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft } from 'react-icons/hi'
import SEOHead, { breadcrumbSchema } from '../components/SEOHead.jsx'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FeeStructure from '../components/FeeStructure'
import ScrollToTop from '../components/ScrollToTop'

const feeJsonLd = [
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Fee Structure', path: '/fees' }
  ])
]

export default function FeeStructurePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SEOHead
        title="Fee Structure 2026-27 | Meridian College Bhubaneswar | Affordable Top College Odisha"
        description="Check the transparent fee structure of Meridian College Bhubaneswar for +2 Science (PCM, PCB) and +3 Science Honours (B.Sc.) programmes 2026-27. Affordable fees at one of the top private science colleges in Odisha. CHSE & Utkal University affiliated."
        keywords="Meridian College fees, fee structure Bhubaneswar college, +2 science fees Odisha, +3 BSc fees Bhubaneswar, affordable college Odisha, college fees 2026 Bhubaneswar, Meridian College fee structure, private college fees Odisha"
        path="/fees"
        jsonLd={feeJsonLd}
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
              Fee <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-300 to-royal-400">Structure</span> 2026-27
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Transparent and affordable fee structure for all programmes at Meridian College Bhubaneswar — one of the top science colleges in Odisha
            </p>
          </motion.div>
        </div>
      </section>

      <div className="bg-slate-50">
        <FeeStructure />
      </div>
      
      <Footer />
      <ScrollToTop />
    </div>
  )
}
