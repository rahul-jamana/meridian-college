import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SEOHead, { breadcrumbSchema } from '../components/SEOHead.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import { getAchievers, getAchieversSettings } from '../lib/db'
import { HiTrophy } from 'react-icons/hi2'

const achieversJsonLd = [
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Achievers', path: '/achievers' }
  ])
]

export default function AchieversPage() {
  const [achievers, setAchievers] = useState([])
  const [settings, setSettings] = useState({
    label: 'Student Success',
    heading: 'Our Achievers',
    tagline: 'Celebrating the outstanding accomplishments of Meridian students.',
  })

  useEffect(() => {
    setAchievers(getAchievers())
    setSettings(getAchieversSettings())
  }, [])

  const headingText = settings?.heading || 'Our Achievers';
  const headingWords = headingText.split(' ')
  const headingFirst = headingWords[0]
  const headingRest = headingWords.slice(1).join(' ')

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SEOHead
        title="Student Achievers | Toppers at Meridian College Bhubaneswar | Best College Odisha"
        description="Outstanding achievements of Meridian College Bhubaneswar students. Top results in CHSE board exams, JEE, NEET. One of the top 10 science colleges in Odisha."
        keywords="Meridian College toppers, student achievements Bhubaneswar, best results college Odisha, CHSE toppers, JEE NEET results Meridian"
        path="/achievers"
        jsonLd={achieversJsonLd}
      />
      <Navbar />

      <main className="flex-grow">
        <section className="bg-navy-900 text-white pt-32 pb-20 lg:pt-40 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-royal-500/20 text-royal-400 mb-6"
            >
              <HiTrophy className="w-8 h-8" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {headingFirst} <span className="text-royal-400">{headingRest}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-navy-200 max-w-3xl mx-auto">
              {settings.tagline}
            </motion.p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {achievers?.map((achiever, idx) => (
              <motion.div
                key={achiever.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg shadow-navy-900/5 hover:shadow-2xl hover:shadow-royal-500/10 transition-all duration-300 border border-gray-100 flex flex-col"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={achiever.url} alt={`${achiever.name} — Achiever at Meridian College Bhubaneswar`} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 text-center flex-grow flex flex-col justify-start">
                  <h3 className="text-xl font-bold text-navy-900 mb-1 group-hover:text-royal-600 transition-colors">{achiever.name}</h3>
                  <p className="text-royal-600 text-sm font-semibold tracking-wide uppercase mb-3">{achiever.title}</p>
                  <p className="text-navy-500 text-sm leading-relaxed line-clamp-3">{achiever.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {achievers.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
              <HiTrophy className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-2xl font-bold text-gray-400">No achievers added yet</h3>
              <p className="text-gray-500 mt-2">Check back soon for updates!</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
