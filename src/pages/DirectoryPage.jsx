import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowLeft, HiPhone, HiMail, HiOfficeBuilding, HiUserGroup } from 'react-icons/hi'
import SEOHead, { breadcrumbSchema } from '../components/SEOHead.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'
import Faculty from '../components/Faculty.jsx'

const directoryJsonLd = [
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Directory', path: '/directory' }
  ]),
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Meridian College Bhubaneswar — Official Directory",
    "description": "Official contact directory of Meridian College Bhubaneswar — management, principal, faculty and staff details.",
    "url": "https://meridiancollege.ac.in/directory",
    "mainEntity": {
      "@type": "CollegeOrUniversity",
      "name": "Meridian College Bhubaneswar",
      "telephone": ["+91-9437044215", "+91-9777736396", "+91-9040799627", "+91-9040799527"],
      "email": "principalmeridiancollege@gmail.com",
      "employee": [
        {
          "@type": "Person",
          "name": "Er. Alok Ranjan Mallick",
          "jobTitle": "Chairman",
          "worksFor": { "@type": "CollegeOrUniversity", "name": "Meridian College Bhubaneswar" }
        },
        {
          "@type": "Person",
          "name": "Mr. Debashish Panda",
          "jobTitle": "Principal",
          "description": "M.A in English, M.Phil, B.Ed, M.Ed, MBA — 23 years experience",
          "worksFor": { "@type": "CollegeOrUniversity", "name": "Meridian College Bhubaneswar" }
        }
      ]
    }
  }
]

export default function DirectoryPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SEOHead
        title="College Directory | Management & Staff at Meridian College Bhubaneswar | Top College Odisha"
        description="Official directory of Meridian College Bhubaneswar — contact Chairman Er. Alok Ranjan Mallick, Principal Mr. Debashish Panda, faculty members. Phone: 9437044215, 9777736396. One of the top private science colleges in Bhubaneswar, Odisha."
        keywords="Meridian College directory, Meridian College principal, Meridian College chairman, college management Bhubaneswar, Meridian College staff, Meridian College contact, Alok Ranjan Mallick, Debashish Panda principal"
        path="/directory"
        jsonLd={directoryJsonLd}
      />
      <Navbar />

      {/* Page Banner */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-navy-800 via-navy-900 to-royal-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-royal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-royal-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors">
              <HiArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              Meridian <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-300 to-royal-400">Directory</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Official contact information, management, and staff details of Meridian College Bhubaneswar
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact & Management Info Section */}
      <section className="py-16 bg-navy-50/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-navy-100 shadow-xl shadow-navy-900/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-royal-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-royal-100 rounded-xl flex items-center justify-center text-royal-600">
                  <HiPhone className="w-5 h-5" />
                </div>
                Contact Information
              </h2>
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <HiPhone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-500 uppercase tracking-wider mb-1">Admission Helpdesk</p>
                    <a href="tel:9437044215" className="block text-xl font-bold text-navy-800 hover:text-royal-600 transition-colors">94370 44215</a>
                    <a href="tel:9777736396" className="block text-xl font-bold text-navy-800 hover:text-royal-600 transition-colors mt-1">97777 36396</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <HiOfficeBuilding className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-500 uppercase tracking-wider mb-1">Office Contact</p>
                    <a href="tel:9040799627" className="block text-lg font-bold text-navy-800 hover:text-royal-600 transition-colors">90407 99627</a>
                    <a href="tel:9040799527" className="block text-lg font-bold text-navy-800 hover:text-royal-600 transition-colors mt-1">90407 99527</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <HiMail className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy-500 uppercase tracking-wider mb-1">Official Email</p>
                    <a href="mailto:principalmeridiancollege@gmail.com" className="block text-base font-bold text-navy-800 hover:text-royal-600 transition-colors">principalmeridiancollege@gmail.com</a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Management Details */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-royal-600 to-royal-800 rounded-3xl p-8 shadow-xl shadow-royal-900/20 text-white relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                  <HiUserGroup className="w-5 h-5" />
                </div>
                Meridian Group Management
              </h2>
              
              <div className="space-y-8 relative z-10">
                <div className="bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all">
                  <p className="text-royal-200 text-xs font-bold uppercase tracking-wider mb-1">Chairman</p>
                  <h3 className="text-2xl font-bold mb-2">Er. Alok Ranjan Mallick</h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Visionary leader of the Meridian Group, dedicated to bringing quality science education and modern infrastructure to the students of Odisha.
                  </p>
                </div>

                <div className="bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all">
                  <p className="text-royal-200 text-xs font-bold uppercase tracking-wider mb-1">Principal</p>
                  <h3 className="text-2xl font-bold mb-2">Mr. Debashish Panda</h3>
                  <p className="text-royal-100 text-sm font-medium mb-2">M.A in English, M.Phil, B.Ed, M.Ed, MBA</p>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">
                    With 23 years of experience in education, he is an expert in communication and educational leadership, fostering holistic student development.
                  </p>
                  <span className="inline-block bg-white/20 px-3 py-1 rounded-md text-xs font-semibold">23 Years Exp</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Include the existing Faculty Component for the rest of the staff */}
      <Faculty />

      <Footer />
      <ScrollToTop />
    </div>
  )
}
