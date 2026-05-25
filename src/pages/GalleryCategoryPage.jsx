import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowLeft, HiX, HiChevronLeft, HiChevronRight, HiOutlinePhotograph } from 'react-icons/hi'
import SEOHead, { breadcrumbSchema, webPageSchema } from '../components/SEOHead.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import { getGallery } from '../lib/db'

export default function GalleryCategoryPage({ category, title }) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const fullGallery = await getGallery()
      // Filter images where the category matches our prop
      // Case-insensitive check to be safe
      const filtered = fullGallery.filter(
        (img) => img.category.toLowerCase() === category.toLowerCase()
      )
      setImages(filtered)
      setLoading(false)
    }
    fetchData()
  }, [category])

  const selectedIdx = selected ? images.indexOf(selected) : -1

  const goNext = (e) => {
    e.stopPropagation()
    if (selectedIdx < images.length - 1) setSelected(images[selectedIdx + 1])
  }
  const goPrev = (e) => {
    e.stopPropagation()
    if (selectedIdx > 0) setSelected(images[selectedIdx - 1])
  }

  const schemaJson = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Gallery', path: '/gallery' },
      { name: title, path: `/gallery/${category.toLowerCase()}` }
    ]),
    webPageSchema({
      name: `${title} Gallery — Meridian College`,
      description: `View photos and videos of ${title} events at Meridian College Bhubaneswar campus.`,
      path: `/gallery/${category.toLowerCase()}`
    })
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SEOHead
        title={`${title} Gallery | Meridian College Bhubaneswar | Campus Life`}
        description={`View real campus photos and moments of ${title} at Meridian College Bhubaneswar. Smart classrooms, labs, and student activities in Odisha.`}
        keywords={`Meridian College ${category}, Meridian College ${title}, Bhubaneswar college photos, campus life`}
        path={`/gallery/${category.toLowerCase()}`}
        jsonLd={schemaJson}
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
            <Link to="/gallery" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors">
              <HiArrowLeft className="w-4 h-4" /> Back to Main Gallery
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-300 to-royal-400">Gallery</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Memories and key moments from {title} at Meridian College, Bhubaneswar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative py-20 bg-gradient-to-b from-white to-navy-50/20 min-h-[40vh]">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-royal-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-navy-500 text-sm font-semibold mt-4">Loading gallery...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-navy-100 p-8 shadow-sm max-w-lg mx-auto">
              <HiOutlinePhotograph className="w-12 h-12 text-navy-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-navy-800 mb-1">No Photos Found</h3>
              <p className="text-navy-500 text-sm mb-6">There are currently no photos uploaded for {title} yet.</p>
              <Link to="/gallery" className="px-6 py-2.5 bg-royal-600 text-white text-sm font-bold rounded-xl hover:bg-royal-700 transition-colors">
                Browse Main Gallery
              </Link>
            </div>
          ) : (
            <div>
              <p className="text-sm text-navy-500 font-medium mb-8">{images.length} photos available</p>
              <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {images.map((img, idx) => (
                    <motion.div
                      key={img.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35 }}
                      className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:shadow-royal-500/15 transition-all duration-500 aspect-square"
                      onClick={() => setSelected(img)}
                    >
                      <img
                        src={img.url}
                        alt={img.title || title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <span className="text-[10px] text-royal-300 font-semibold uppercase tracking-wider">{title}</span>
                          {img.title && <h3 className="text-white font-bold text-sm truncate">{img.title}</h3>}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>

        {/* Lightbox */}
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
                  alt={selected.title || title}
                  className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain bg-black/50"
                />
                <div className="absolute bottom-4 left-4 bg-navy-900/80 backdrop-blur-sm px-4 py-2 rounded-xl">
                  <span className="text-royal-300 text-xs font-semibold uppercase">{title}</span>
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
