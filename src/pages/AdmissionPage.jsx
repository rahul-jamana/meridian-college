import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { HiArrowLeft, HiCheckCircle } from 'react-icons/hi'
import SEOHead, { breadcrumbSchema, webPageSchema } from '../components/SEOHead.jsx'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import ScrollToTop from '../components/ScrollToTop.jsx'

const admissionJsonLd = [
  breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Admission', path: '/admission' }
  ]),
  webPageSchema({
    name: 'Admission Enquiry - Meridian College Bhubaneswar',
    description: 'Direct admission enquiry form for Meridian College. Apply for +2 Science (PCM, PCB) and +3 Science Honours. Get guidance from our admission counselors.',
    path: '/admission'
  })
]

export default function AdmissionPage() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', course: '', previousSchool: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')
    
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      const emailPayload = {
        from_name: formData.name,
        to_name: formData.name,
        student_name: formData.name,
        user_email: formData.email,
        to_email: formData.email,
        college_email: 'principalmeridiancollege@gmail.com',
        reply_to: 'principalmeridiancollege@gmail.com',
        phone: formData.phone,
        course: formData.course,
        previous_school: formData.previousSchool,
        message: formData.message || 'Direct admission enquiry.'
      };

      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, emailPayload, publicKey)
        if (autoReplyTemplateId) {
          try {
            await emailjs.send(serviceId, autoReplyTemplateId, emailPayload, publicKey)
          } catch (autoReplyError) {
            console.warn('Auto-reply email failed.')
          }
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500))
      }

      setSubmitted(true)
      setFormData({ name: '', phone: '', email: '', course: '', previousSchool: '', message: '' })
    } catch (error) {
      console.error('Failed to send email:', error)
      const errorText = error?.text || error?.message || 'Unknown error'
      setSubmitError(`Error: ${errorText}. Please try again later.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-50 overflow-x-hidden flex flex-col">
      <SEOHead
        title="Admission Enquiry | Meridian College Bhubaneswar"
        description="Direct admission enquiry form for Meridian College. Apply for +2 Science (PCM, PCB) and +3 Science Honours. Get guidance from our admission counselors."
        keywords="admission Meridian College, Meridian College admission form, direct admission Bhubaneswar, apply college online Odisha"
        path="/admission"
        jsonLd={admissionJsonLd}
      />
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-center mb-10"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-royal-600 hover:text-royal-700 text-sm font-semibold mb-6 transition-colors">
              <HiArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 mb-4 tracking-tight">
              Start Your Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-500 to-royal-600">With Us</span>
            </h1>
            <p className="text-navy-600 text-lg max-w-2xl mx-auto">
              Fill out this quick admission enquiry form. Our academic counselors will contact you shortly to guide you through the process.
            </p>
          </motion.div>

          {/* Form Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2rem] shadow-2xl shadow-navy-900/5 border border-navy-100 overflow-hidden"
          >
            <div className="p-8 md:p-12">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <HiCheckCircle className="w-16 h-16 text-green-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-navy-900 mb-4">Application Received!</h2>
                  <p className="text-navy-600 text-lg mb-8 max-w-md mx-auto">
                    Thank you for your interest in Meridian College. Our admission counselor will call you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 bg-navy-50 text-navy-700 font-semibold rounded-xl hover:bg-navy-100 transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-200">
                      {submitError}
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-navy-800 mb-2">Student's Full Name *</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter full name"
                        className="w-full px-5 py-4 rounded-xl border border-navy-200 bg-navy-50/50 text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-royal-500/50 focus:border-royal-500 transition-all font-medium" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-navy-800 mb-2">Phone/WhatsApp Number *</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="10-digit mobile number"
                        className="w-full px-5 py-4 rounded-xl border border-navy-200 bg-navy-50/50 text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-royal-500/50 focus:border-royal-500 transition-all font-medium" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-navy-800 mb-2">Email Address *</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter active email ID"
                        className="w-full px-5 py-4 rounded-xl border border-navy-200 bg-navy-50/50 text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-royal-500/50 focus:border-royal-500 transition-all font-medium" />
                    </div>
                    <div>
                      <label htmlFor="course" className="block text-sm font-bold text-navy-800 mb-2">Select Programme *</label>
                      <select id="course" name="course" value={formData.course} onChange={handleChange} required
                        className="w-full px-5 py-4 rounded-xl border border-navy-200 bg-navy-50/50 text-navy-900 focus:outline-none focus:ring-2 focus:ring-royal-500/50 focus:border-royal-500 transition-all font-medium appearance-none">
                        <option value="" disabled>Select course interested in...</option>
                        <optgroup label="+2 Science">
                          <option value="+2 Science (PCM)">+2 Science (PCM)</option>
                          <option value="+2 Science (PCB)">+2 Science (PCB)</option>
                        </optgroup>
                        <optgroup label="+3 Science Honours">
                          <option value="+3 Physics Hons">+3 Physics Honours</option>
                          <option value="+3 Chemistry Hons">+3 Chemistry Honours</option>
                          <option value="+3 Mathematics Hons">+3 Mathematics Honours</option>
                          <option value="+3 Botany Hons">+3 Botany Honours</option>
                          <option value="+3 Zoology Hons">+3 Zoology Honours</option>
                          <option value="+3 Computer Science Hons">+3 Computer Science Honours</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="previousSchool" className="block text-sm font-bold text-navy-800 mb-2">Previous School / College</label>
                    <input type="text" id="previousSchool" name="previousSchool" value={formData.previousSchool} onChange={handleChange} placeholder="Name of your previous institution"
                      className="w-full px-5 py-4 rounded-xl border border-navy-200 bg-navy-50/50 text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-royal-500/50 focus:border-royal-500 transition-all font-medium" />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-navy-800 mb-2">Any Queries? (Optional)</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="3" placeholder="E.g. I want to know about hostel facilities..."
                      className="w-full px-5 py-4 rounded-xl border border-navy-200 bg-navy-50/50 text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-royal-500/50 focus:border-royal-500 transition-all font-medium resize-none"></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full py-5 text-white font-bold text-lg rounded-xl shadow-xl transition-all duration-300 ${
                      isSubmitting 
                        ? 'bg-navy-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-royal-600 to-royal-500 hover:shadow-royal-500/40 hover:-translate-y-1 shadow-royal-500/20'
                    }`}
                  >
                    {isSubmitting ? 'Submitting Form...' : 'Submit Application'}
                  </button>

                  <p className="text-center text-xs text-navy-500 pt-2 font-medium">
                    By submitting this form, you authorize Meridian College to contact you regarding admissions via Phone/WhatsApp/Email.
                  </p>
                </form>
              )}
            </div>
            
            {/* Quick Contact Banner */}
            <div className="bg-navy-900 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-white font-bold text-lg">Need immediate help?</h4>
                <p className="text-navy-300 text-sm">Call our admission desk directly.</p>
              </div>
              <a href="tel:+919437044215" className="px-6 py-3 bg-white text-navy-900 font-bold rounded-xl hover:bg-navy-50 transition-colors whitespace-nowrap">
                Call +91 94370 44215
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
