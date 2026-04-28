import React from 'react'
import SEOHead, { organizationSchema, faqSchema, breadcrumbSchema } from '../components/SEOHead.jsx'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import NotificationTicker from '../components/NotificationTicker.jsx'
import About from '../components/About.jsx'
import ChairmanMessage from '../components/ChairmanMessage.jsx'
import PrincipalMessage from '../components/PrincipalMessage.jsx'
import StatsCounter from '../components/StatsCounter.jsx'
import Programmes from '../components/Programmes.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import GalleryPreview from '../components/GalleryPreview.jsx'
import Testimonials from '../components/Testimonials.jsx'
import AdmissionCTA from '../components/AdmissionCTA.jsx'
import ContactPreview from '../components/ContactPreview.jsx'
import Footer from '../components/Footer.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'

// Combined JSON-LD for homepage: Organization + FAQ + Breadcrumb
const homeJsonLd = [
  organizationSchema,
  faqSchema,
  breadcrumbSchema([
    { name: 'Home', path: '/' }
  ])
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <SEOHead
        title="Meridian College Bhubaneswar | Top Science College in Odisha | Admissions Open 2026-27"
        description="Meridian College Bhubaneswar — one of the top 10 private science colleges in Odisha. Admissions open 2026-27 for +2 Science (PCM, PCB) & +3 Science Honours (B.Sc.). Affiliated to CHSE Odisha & Utkal University. Best college in Bhubaneswar with JEE/NEET coaching, smart classrooms, experienced faculty, hostels, labs & transportation."
        keywords="top colleges in Odisha, best private colleges in Bhubaneswar, top 10 colleges in Odisha, best science college Bhubaneswar, +2 science college Bhubaneswar, +3 science college Bhubaneswar, best college for PCM PCB in Odisha, Meridian College Bhubaneswar, college admission 2026 Odisha, JEE coaching Bhubaneswar, NEET coaching Odisha, best +2 college Odisha, B.Sc college Bhubaneswar, top private college BBSR, science college Gangapada Bhubaneswar, best engineering coaching college Odisha, top medical coaching college Bhubaneswar, Meridian College BBSR, college with hostel Bhubaneswar"
        path="/"
        jsonLd={homeJsonLd}
      />
      <Navbar />
      <Hero />
      <NotificationTicker />
      <About />
      <ChairmanMessage />
      <PrincipalMessage />
      <StatsCounter />
      <Programmes />
      <WhyChooseUs />
      <GalleryPreview />
      <Testimonials />
      <AdmissionCTA />
      <ContactPreview />
      <Footer />
      <ScrollToTop />
    </div>
  )
}
