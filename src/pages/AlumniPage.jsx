import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowLeft, HiStar, HiX, HiChevronLeft, HiChevronRight, HiOutlinePhotograph } from 'react-icons/hi'
import SEOHead, { breadcrumbSchema, webPageSchema } from '../components/SEOHead.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import { getAlumniTestimonials, getGallery } from '../lib/db'

export default function AlumniPage() {
  const [testimonials, setTestimonials] = useState([])
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      // Fetch dynamic alumni feedback
      const dynamicTestimonials = await getAlumniTestimonials()
      setTestimonials(dynamicTestimonials)

      // Fetch dynamic alumni gallery photos
      const fullGallery = await getGallery()
      const alumniPhotos = fullGallery.filter(
        (img) => img.category.toLowerCase() === 'alumni'
      )
      setImages(alumniPhotos)

      setLoading(false)
    }
    fetchData()
  }, [])

  const selectedIdx = selected ? images.indexOf(selected) : -1

  const goNext = (e) => {
    e.stopPropagation()
    if (selectedIdx < images.length - 1) setSelected(images[selectedIdx + 1])
  }
  const goPrev = (e) => {
    e.stopPropagation()
    if (selectedIdx > 0) setSelected(images[selectedIdx - 1])
  }

  const alumniSchema = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Alumni', path: '/alumni' }
    ]),
    webPageSchema({
      name: 'Alumni Association & Student Voices — Meridian College',
      description: 'Discover success stories and feedback from Meridian College alumni. See where our students are placed and view past alumni meet highlights.',
      path: '/alumni'
    })
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SEOHead
        title="Alumni Corner & Student Feedback | Meridian College Bhubaneswar"
        description="Discover feedback and success reviews from Meridian College alumni. Explore how our graduates cracked JEE/NEET and got placed in IITs, NITs, and medical colleges."
        keywords="meridian college alumni reviews?, success stories meridian college?, JEE selections meridian college?, student testimonials bbsr college?, Meridian College alumni, student feedback Bhubaneswar, college reviews Odisha, Meridian student success stories"
        path="/alumni"
        jsonLd={alumniSchema}
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
              Alumni <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-300 to-royal-400">Corner</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Celebrating the achievements, success, and stories of our former students who continue to shine across the globe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials/Feedback Section */}
      <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-royal-50 rounded-full blur-3xl opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-royal-600 font-semibold text-sm tracking-wider uppercase mb-3">
              Student Voices
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-4">
              Alumni <span className="gradient-text">Feedback & Success Stories</span>
            </h2>
            <p className="text-navy-500 text-lg max-w-2xl mx-auto">
              Read how Meridian College helped shape the careers and futures of our graduates.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-royal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-10 text-navy-400">No alumni feedback found. Add reviews in the admin panel!</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={t.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="group relative bg-white rounded-2xl p-7 lg:p-8 border border-navy-100/50 shadow-lg shadow-navy-900/3 hover:shadow-xl hover:shadow-royal-500/10 hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Quote mark decoration */}
                    <div className="absolute top-6 right-6 text-6xl text-royal-100 font-serif leading-none select-none">"</div>

                    {/* Feedback Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <HiStar key={i} className="w-5 h-5 text-gold-400" />
                      ))}
                    </div>

                    <p className="text-navy-600 text-sm leading-relaxed mb-6 relative z-10 italic">
                      "{t.feedback}"
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-navy-100">
                    <img
                      src={t.url}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover shadow-sm border border-white flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-navy-800 text-sm">{t.name}</h4>
                      <p className="text-royal-600 text-xs font-semibold">{t.batch}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Alumni Memories Gallery (Filtered from main gallery) */}
      <section className="relative py-20 bg-gradient-to-b from-white to-navy-50/20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-royal-600 font-semibold text-sm tracking-wider uppercase mb-3">
              Alumni Life
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-800 mb-4">
              Alumni <span className="gradient-text">Memories & Events</span>
            </h2>
            <p className="text-navy-500 text-lg max-w-2xl mx-auto">
              Highlights from previous alumni meets, campus visits, and graduate convocations.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-royal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-navy-100 p-8 shadow-sm max-w-md mx-auto">
              <HiOutlinePhotograph className="w-10 h-10 text-navy-300 mx-auto mb-2" />
              <h4 className="font-bold text-navy-800 mb-1">No Memories Found</h4>
              <p className="text-xs text-navy-500">Alumni group photos and event memories will show up here once uploaded from the admin panel.</p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((img) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md aspect-square"
                    onClick={() => setSelected(img)}
                  >
                    <img src={img.url} alt={img.title || "Alumni Memory"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-3">
                      <span className="text-[10px] text-royal-300 font-semibold uppercase tracking-wider">Alumni Memories</span>
                      {img.title && <h4 className="text-white font-bold text-xs truncate">{img.title}</h4>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lightbox for Gallery */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selected.url}
                  alt={selected.title || "Alumni Memory"}
                  className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain bg-black/50"
                />
                <div className="absolute bottom-4 left-4 bg-navy-900/80 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <span className="text-royal-300 text-xs font-semibold uppercase">Alumni memories</span>
                  {selected.title && <h3 className="text-white font-bold">{selected.title}</h3>}
                </div>

                {/* Navigation Arrows */}
                {selectedIdx > 0 && (
                  <button
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <HiChevronLeft className="w-6 h-6" />
                  </button>
                )}
                {selectedIdx < images.length - 1 && (
                  <button
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <HiChevronRight className="w-6 h-6" />
                  </button>
                )}

                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  aria-label="Close"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
