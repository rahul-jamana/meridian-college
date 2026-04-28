import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiAcademicCap } from 'react-icons/hi'

/*
 * AdmissionPopup — Shows a popup after 5 seconds on the home page.
 * Appears once per session (uses sessionStorage to track).
 * Professional design with CTA to apply.
 */
export default function AdmissionPopup() {
  const [show, setShow] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Show the popup shortly after the page loads, every time it loads
    const timer = setTimeout(() => {
      setShow(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (location.pathname.startsWith('/admin')) return null
  if (!show) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-950/60 backdrop-blur-sm"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <HiX className="w-4 h-4" />
            </button>

            {/* Top gradient area */}
            <div className="bg-gradient-to-br from-royal-500 via-royal-600 to-navy-700 px-7 pt-10 pb-14 text-center relative overflow-hidden">
              <div className="absolute top-4 left-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-4 right-4 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
              
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30"
              >
                <HiAcademicCap className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-2">Admissions Open!</h3>
              <p className="text-white/80 text-sm">Session 2026–27</p>
            </div>

            {/* Content */}
            <div className="px-7 pb-7 -mt-8 relative z-10">
              <div className="bg-white rounded-2xl shadow-lg border border-navy-100/50 p-6 text-center">
                <p className="text-navy-600 text-sm mb-1 font-medium">
                  Limited seats available for
                </p>
                <div className="flex flex-wrap justify-center gap-2 my-4">
                  {['+2 Science (PCM)', '+2 Science (PCB)', '+3 Science Honours'].map((p) => (
                    <span key={p} className="text-xs bg-royal-50 text-royal-600 px-3 py-1.5 rounded-full font-semibold">{p}</span>
                  ))}
                </div>
                <p className="text-navy-400 text-xs mb-6">
                  Affiliated to CHSE Odisha & Utkal University
                </p>

                <Link
                  to="/contact"
                  onClick={() => setShow(false)}
                  className="block w-full py-3.5 bg-gradient-to-r from-royal-500 to-royal-600 text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mb-3"
                >
                  Apply Now →
                </Link>

                <button
                  onClick={() => setShow(false)}
                  className="text-navy-400 text-xs font-medium hover:text-navy-600 transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
