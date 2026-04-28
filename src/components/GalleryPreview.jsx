import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { getHomepageGallery, getGallerySettings } from '../lib/db'

/*
 * GalleryPreview — Shows images from the admin-managed homepage gallery.
 * Admin can add/remove images from /admin/media → Homepage Gallery tab.
 * Heading and tagline are also editable from admin → Gallery Settings tab.
 */

export default function GalleryPreview() {
  const [previewImages, setPreviewImages] = useState([])
  const [settings, setSettings] = useState({
    label: 'Campus Life',
    heading: 'Campus Gallery',
    tagline: 'Real moments from Meridian College — our students, faculty, labs, and events',
  })
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const gallery = getHomepageGallery()
    setTotal(gallery.length)
    setPreviewImages(gallery)
    setSettings(getGallerySettings())
  }, [])

  const headingWords = settings.heading.split(' ')
  const headingFirst = headingWords[0]
  const headingRest = headingWords.slice(1).join(' ')

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
            {headingFirst}{' '}
            <span className="gradient-text">{headingRest}</span>
          </h2>
          <p className="text-navy-500 text-lg max-w-2xl mx-auto">
            {settings.tagline}
          </p>
        </motion.div>

        {/* Preview Grid — up to 9 images from admin gallery */}
        {previewImages.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 mb-10">
            {previewImages.map((img, idx) => (
              <motion.div
                key={img.id || idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 ${
                  idx === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <img
                  src={img.url}
                  alt={img.title || img.category}
                  loading="lazy"
                  className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                    idx === 0 ? 'h-48 md:h-full' : 'h-40 lg:h-48'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="text-[10px] text-royal-300 font-semibold uppercase tracking-wider">{img.category}</span>
                    {img.title && <h3 className="text-white font-bold text-sm">{img.title}</h3>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-navy-400">
            <p className="text-lg">No gallery images yet. Add images from the admin panel.</p>
          </div>
        )}

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-royal-500 to-royal-600 text-white font-semibold text-base rounded-2xl shadow-lg shadow-royal-500/20 hover:shadow-royal-500/40 hover:-translate-y-1 transition-all duration-300 group"
          >
            View Full Gallery
            <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-navy-400 text-sm mt-3">{total}+ real campus photos</p>
        </motion.div>
      </div>
    </section>
  )
}
