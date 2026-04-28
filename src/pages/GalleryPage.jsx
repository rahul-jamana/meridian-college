import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft } from 'react-icons/hi'
import SEOHead, { breadcrumbSchema, webPageSchema } from '../components/SEOHead.jsx'
import Navbar from '../components/Navbar.jsx'
import Gallery from '../components/Gallery.jsx'
import Footer from '../components/Footer.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'

const galleryJsonLd = [
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' }
  ]),
  webPageSchema({
    name: 'Campus Gallery — Meridian College Bhubaneswar',
    description: 'View photos and videos of Meridian College Bhubaneswar campus — students, faculty, labs, sports events, cultural activities & more.',
    path: '/gallery'
  }),
  {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Meridian College Bhubaneswar Campus Gallery",
    "description": "82+ real photos from Meridian College campus showcasing students, faculty, labs, sports, cultural events, and college life in one of Bhubaneswar's top private colleges.",
    "url": "https://meridiancollege.ac.in/gallery",
    "about": {
      "@type": "CollegeOrUniversity",
      "name": "Meridian College Bhubaneswar"
    }
  }
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SEOHead
        title="Campus Gallery | Photos & Videos of Meridian College Bhubaneswar | Top College Odisha"
        description="View 82+ real photos and videos of Meridian College Bhubaneswar campus. See our smart classrooms, science labs, hostel facilities, sports events, cultural programmes, and student life. One of the top private science colleges in Bhubaneswar, Odisha."
        keywords="Meridian College photos, Meridian College gallery, Bhubaneswar college campus photos, college life Bhubaneswar, top college campus Odisha, Meridian College campus, science college photos Bhubaneswar, student life Odisha college"
        path="/gallery"
        jsonLd={galleryJsonLd}
      />
      <Navbar />

      {/* Page Banner */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-navy-800 via-navy-900 to-royal-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-96 h-96 bg-royal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-64 h-64 bg-royal-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors">
              <HiArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-300 to-royal-400">Gallery</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              82+ real moments from Meridian College Bhubaneswar — students, faculty, labs, sports, and events at one of Odisha's top colleges
            </p>
          </motion.div>
        </div>
      </section>

      <Gallery />
      <Footer />
      <ScrollToTop />
    </div>
  )
}
