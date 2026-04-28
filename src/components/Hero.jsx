import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiAcademicCap, HiShieldCheck, HiOfficeBuilding, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dbmpqbgar'

/*
 * Hero slides — 6 images + 1 video, all from Cloudinary.
 * Uses crossfade (no slide animation) for smooth transitions,
 * especially important for video which glitches with x-translate.
 */
import { getHeroMedia } from '../lib/db'

const trustBadges = [
  { icon: HiShieldCheck, text: 'Affiliated to CHSE Odisha' },
  { icon: HiAcademicCap, text: 'Affiliated to Utkal University' },
  { icon: HiOfficeBuilding, text: 'Separate Hostels for Boys & Girls' },
]

const IMAGE_DURATION = 5000

export default function Hero() {
  const navigate = useNavigate()
  const [heroSlides, setHeroSlides] = useState([])
  const [current, setCurrent] = useState(0)
  const videoRef = useRef(null)
  const timerRef = useRef(null)

  const handleContactClick = (e) => {
    e.preventDefault();
    if (window.innerWidth <= 768) {
      window.location.href = 'tel:9437044215';
    } else {
      navigate('/directory');
    }
  };

  useEffect(() => {
    setHeroSlides(getHeroMedia())
  }, [])

  const slide = heroSlides[current] || null

  const goNext = useCallback(() => {
    if (heroSlides.length > 0) setCurrent((prev) => (prev + 1) % heroSlides.length)
  }, [heroSlides.length])

  const goPrev = useCallback(() => {
    if (heroSlides.length > 0) setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [heroSlides.length])

  useEffect(() => {
    // Pause all videos
    document.querySelectorAll('.hero-video').forEach(v => {
      if (v.id !== `hero-vid-${current}`) v.pause();
    });

    if (!slide) return;
    if (timerRef.current) clearTimeout(timerRef.current)

    if (slide.type === 'image') {
      timerRef.current = setTimeout(goNext, IMAGE_DURATION)
    } else if (slide.type === 'video') {
      const vid = document.getElementById(`hero-vid-${current}`)
      if (vid) {
        vid.currentTime = 0
        const playPromise = vid.play()
        if (playPromise) {
          playPromise.catch(() => {
            timerRef.current = setTimeout(goNext, 2000)
          })
        }
      }
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, slide, goNext])

  // Video end → next slide
  const handleVideoEnd = useCallback(() => goNext(), [goNext])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  // Touch swipe support for mobile
  const touchStartX = useRef(0)
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext()
      else goPrev()
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ===== BACKGROUND: all slides rendered, only active one is visible ===== */}
      <div className="absolute inset-0">
        {heroSlides.map((s, idx) => (
          <div
            key={idx}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: idx === current ? 1 : 0, zIndex: idx === current ? 0 : -1 }}
          >
            {s.type === 'video' ? (
              <video
                id={`hero-vid-${idx}`}
                className="w-full h-full object-cover hero-video"
                src={s.url}
                muted
                playsInline
                preload="auto"
                onEnded={handleVideoEnd}
                style={{ objectPosition: 'center center' }}
              />
            ) : (
              <img
                src={s.url}
                alt={s.title || 'Meridian College Bhubaneswar — Top Science College in Odisha'}
                className="w-full h-full object-cover"
                loading={idx <= 1 ? 'eager' : 'lazy'}
              />
            )}
          </div>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/85 via-navy-800/75 to-royal-900/65 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent z-[1]" />
      </div>

      {/* Ambient background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-20 w-72 h-72 bg-royal-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-32 left-10 w-96 h-96 bg-royal-400/10 rounded-full blur-3xl"
        />
      </div>

      {/* ◀ ▶  Navigation Arrows — repositioned for mobile */}
      <button
        onClick={goPrev}
        className="absolute left-3 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/25 active:scale-90 transition-all duration-200"
        aria-label="Previous slide"
      >
        <HiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-3 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/25 active:scale-90 transition-all duration-200"
        aria-label="Next slide"
      >
        <HiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dot indicators — placed above scroll indicator */}
      <div className="absolute bottom-20 sm:bottom-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroSlides.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === current
                ? 'w-8 h-2.5 bg-royal-400'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Image progress bar */}
      {slide && slide.type === 'image' && (
        <div className="absolute bottom-0 left-0 right-0 h-1 z-20">
          <motion.div
            key={`progress-${current}`}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: IMAGE_DURATION / 1000, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-royal-400 to-royal-500"
          />
        </div>
      )}

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-28 sm:pb-24 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-gold-500/20 backdrop-blur-sm border border-gold-400/30 text-gold-400 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Admissions Open 2026–27
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-3 sm:mb-4"
          >
            Meridian College,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-300 to-royal-400">
              Bhubaneswar
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white/80 font-light mb-6 sm:mb-8 leading-relaxed"
          >
            Build Your Future with Quality Science Education — Top College in Odisha
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
          >
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-royal-500 to-royal-600 text-white font-semibold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-2xl shadow-royal-500/30 hover:shadow-royal-500/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Apply Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-royal-400 to-royal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <button
              onClick={handleContactClick}
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-base sm:text-lg rounded-xl sm:rounded-2xl hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
            >
              📞 Contact Admission Office
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-2 sm:gap-3"
          >
            {trustBadges.map((badge, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl text-white/90 text-xs sm:text-sm font-medium"
              >
                <badge.icon className="w-4 h-4 sm:w-5 sm:h-5 text-royal-300 flex-shrink-0" />
                {badge.text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center pt-1.5 sm:pt-2"
        >
          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
