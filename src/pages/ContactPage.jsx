import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft } from 'react-icons/hi'
import SEOHead, { breadcrumbSchema, webPageSchema } from '../components/SEOHead.jsx'
import Navbar from '../components/Navbar.jsx'
import Contact from '../components/Contact.jsx'
import Footer from '../components/Footer.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'

const contactJsonLd = [
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact Us', path: '/contact' }
  ]),
  webPageSchema({
    name: 'Contact Meridian College Bhubaneswar',
    description: 'Contact Meridian College for admission enquiries, campus visits, and general information. Top science college in Bhubaneswar, Odisha.',
    path: '/contact'
  }),
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Meridian College Bhubaneswar",
    "description": "Admission enquiries, campus visits, and general information for Meridian College — one of the best private science colleges in Bhubaneswar, Odisha.",
    "url": "https://meridiancollege.ac.in/contact",
    "mainEntity": {
      "@type": "CollegeOrUniversity",
      "name": "Meridian College Bhubaneswar",
      "telephone": ["+91-9437044215", "+91-9777736396", "+91-9040799627"],
      "email": "principalmeridiancollege@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Bhatkhuri, Gangapada",
        "addressLocality": "Bhubaneswar",
        "addressRegion": "Odisha",
        "postalCode": "752054",
        "addressCountry": "IN"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    }
  }
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SEOHead
        title="Contact Meridian College Bhubaneswar | Admission Enquiry | Top College in Odisha"
        description="Contact Meridian College Bhubaneswar for admission enquiries 2026-27. Call 9437044215 or visit our campus at Bhatkhuri, Gangapada. One of the top private science colleges in Bhubaneswar, Odisha. Admission helpdesk for +2 Science & +3 Science Honours."
        keywords="contact Meridian College, Meridian College phone number, Meridian College address, admission enquiry Bhubaneswar, college admission helpdesk Odisha, Meridian College Gangapada, visit college campus Bhubaneswar, top college admission 2026 Odisha"
        path="/contact"
        jsonLd={contactJsonLd}
      />
      <Navbar />

      {/* Page Banner */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-navy-800 via-navy-900 to-royal-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-royal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-64 h-64 bg-royal-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors">
              <HiArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-300 to-royal-400">Meridian College Bhubaneswar</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Admission enquiries, campus visits, and general information — one of the best private science colleges in Bhubaneswar, Odisha
            </p>
          </motion.div>
        </div>
      </section>

      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  )
}
