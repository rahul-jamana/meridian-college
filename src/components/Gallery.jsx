import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { getGallery, getGallerySettings } from '../lib/db'

function getImgSrc(img, size) {
  if (img.url) {
    if (size) return img.url.replace('/upload/', `/upload/w_${size}/`)
    return img.url
  }
  return img.localSrc
}

export default function Gallery() {
  const [images, setImages] = useState([])
  const [categories, setCategories] = useState(['All'])
  const [selected, setSelected] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [settings, setSettings] = useState({ label: 'Campus Life', heading: 'Campus Gallery', tagline: 'Real moments from Meridian College — our students, faculty, labs, and events' })

  useEffect(() => {
    const fetchedGallery = getGallery()
    setImages(fetchedGallery)
    setCategories(['All', ...new Set(fetchedGallery.map(img => img.category))])
    setSettings(getGallerySettings())
  }, [])

  const filtered = activeFilter === 'All'
    ? images
    : images.filter(img => img.category === activeFilter)

  const selectedIdx = selected ? filtered.indexOf(selected) : -1

  const goNext = (e) => {
    e.stopPropagation()
    if (selectedIdx < filtered.length - 1) setSelected(filtered[selectedIdx + 1])
  }
  const goPrev = (e) => {
    e.stopPropagation()
    if (selectedIdx > 0) setSelected(filtered[selectedIdx - 1])
  }

  return (
    <section id="gallery" className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-navy-50/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-royal-600 font-semibold text-sm tracking-wider uppercase mb-3">
            {settings.label}
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-navy-800 mb-4">
            {settings.heading.split(' ')[0]}{' '}<span className="gradient-text">{settings.heading.split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-navy-500 text-lg max-w-2xl mx-auto">
            {settings.tagline}
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-royal-500 to-royal-600 text-white shadow-lg shadow-royal-500/20'
                  : 'bg-white text-navy-600 border border-navy-100 hover:border-royal-200 hover:text-royal-600 shadow-sm'
              }`}
            >
              {cat}
              <span className="ml-1.5 text-xs opacity-70">
                ({cat === 'All' ? images.length : images.filter(i => i.category === cat).length})
              </span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:shadow-royal-500/15 transition-all duration-500 ${
                  idx === 0 && activeFilter === 'All' ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => setSelected(img)}
              >
                <img
                  src={getImgSrc(img)}
                  alt={img.title}
                  loading="lazy"
                  className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                    idx === 0 && activeFilter === 'All' ? 'h-48 md:h-full' : 'h-40 lg:h-48'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="text-[10px] text-royal-300 font-semibold uppercase tracking-wider">{img.category}</span>
                    <h3 className="text-white font-bold text-sm">{img.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
                src={getImgSrc(selected, 1200)}
                alt={selected.title}
                className="w-full rounded-2xl shadow-2xl max-h-[80vh] object-contain bg-black/50"
              />
              <div className="absolute bottom-4 left-4 bg-navy-900/80 backdrop-blur-sm px-4 py-2 rounded-xl">
                <span className="text-royal-300 text-xs font-semibold uppercase">{selected.category}</span>
                <h3 className="text-white font-bold">{selected.title}</h3>
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
              {selectedIdx < filtered.length - 1 && (
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
  )
}
