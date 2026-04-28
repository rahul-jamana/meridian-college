import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SEOHead, { breadcrumbSchema } from '../components/SEOHead.jsx'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getVisionMission } from '../lib/db'
import { HiCheckCircle, HiLightBulb, HiAcademicCap, HiStar } from 'react-icons/hi'

const visionJsonLd = [
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Vision & Mission', path: '/vision-mission' }
  ])
]

export default function VisionMissionPage() {
  const [data, setData] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setData(getVisionMission())
  }, [])

  if (!data) return null;

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Vision & Mission | Meridian College Bhubaneswar | Top Science College in Odisha"
        description="Discover the vision and mission of Meridian College Bhubaneswar — one of the top private science colleges in Odisha. Our student-first approach, academic excellence focus, and holistic development philosophy make us the best choice for +2 Science & +3 Science education in Bhubaneswar."
        keywords="Meridian College vision mission, college philosophy Bhubaneswar, student development Odisha, academic excellence Bhubaneswar, best college values Odisha, Meridian College approach, holistic education Bhubaneswar"
        path="/vision-mission"
        jsonLd={visionJsonLd}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-navy-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={data.hero.image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop"}
            alt="Meridian College Bhubaneswar Campus — Top Science College in Odisha"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-gold-400 font-bold tracking-widest uppercase mb-4 text-sm bg-gold-500/10 px-4 py-1.5 rounded-full border border-gold-500/20">
              {data.hero.label}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
              {data.hero.title.split('&')[0]} & <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-yellow-200">{data.hero.title.split('&')[1]}</span>
            </h1>
            <p className="text-navy-100 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              {data.hero.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* How We Treat Students Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-royal-100 rounded-xl flex items-center justify-center">
                  <HiStar className="w-6 h-6 text-royal-600" />
                </div>
                <h3 className="text-royal-600 font-bold tracking-wider uppercase text-sm">{data.treatment.label}</h3>
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-navy-900 mb-6 leading-tight">
                {data.treatment.title.split('Our')[0]} <span className="text-royal-600">Our</span> Students
              </h2>
              <p className="text-navy-600 text-lg leading-relaxed mb-8">
                {data.treatment.content}
              </p>
              
              <ul className="space-y-5">
                {data.treatment.points.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <HiCheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                    <span className="text-navy-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src={data.treatment.image || "/vision/mentorship.png"} 
                  alt="Teacher mentoring student at Meridian College Bhubaneswar" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-royal-100 rounded-3xl"></div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-navy-50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <HiLightBulb className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-navy-400 font-bold uppercase tracking-wider">Approach</p>
                    <p className="font-bold text-navy-900">Student-First Focus</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Expect Section */}
      <section className="py-20 lg:py-28 bg-navy-50 border-y border-navy-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-navy-900 mb-6">
              {data.expectations.title.split('Expect')[0]} <span className="text-royal-600">Expect</span> {data.expectations.title.split('Expect')[1]}
            </h2>
            <p className="text-navy-600 text-lg leading-relaxed mb-12">
              {data.expectations.content}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.expectations.items.map((item, idx) => {
              const icons = [
                <HiAcademicCap className="w-8 h-8 text-royal-600" />,
                <HiStar className="w-8 h-8 text-royal-600" />,
                <HiLightBulb className="w-8 h-8 text-royal-600" />
              ];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-lg shadow-navy-900/5 border border-navy-100 hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-royal-50 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                    {icons[idx] || icons[0]}
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">{item.title}</h3>
                  <p className="text-navy-600 leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Transformation Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative order-2 lg:order-1"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src={data.transformation.image || "/vision/transformation.png"} 
                  alt="Students studying at Meridian College Bhubaneswar — Best Science College Odisha" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -z-10 top-10 -left-10 w-full h-full bg-gold-100 rounded-3xl"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl lg:text-5xl font-bold text-navy-900 mb-6 leading-tight">
                {data.transformation.title.split('Transformation')[0]} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-600 to-purple-600">Transformation</span>
              </h2>
              <p className="text-navy-600 text-lg leading-relaxed mb-6">
                {data.transformation.content1}
              </p>
              <p className="text-navy-600 text-lg leading-relaxed mb-8">
                {data.transformation.content2}
              </p>
              
              <div className="space-y-6">
                <div className="bg-navy-50 p-6 rounded-2xl border-l-4 border-royal-600">
                  <h4 className="font-bold text-navy-900 text-lg mb-2">{data.transformation.card1.title}</h4>
                  <p className="text-navy-600 text-sm">{data.transformation.card1.desc}</p>
                </div>
                <div className="bg-navy-50 p-6 rounded-2xl border-l-4 border-gold-500">
                  <h4 className="font-bold text-navy-900 text-lg mb-2">{data.transformation.card2.title}</h4>
                  <p className="text-navy-600 text-sm">{data.transformation.card2.desc}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
