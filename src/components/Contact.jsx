import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  HiLocationMarker, HiPhone, HiMail, HiGlobe, HiClock,
  HiExternalLink, HiClipboardList, HiDocumentText, HiChevronDown, HiShare
} from 'react-icons/hi'
import { FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'

const contactInfo = [
  {
    icon: HiLocationMarker,
    title: 'Our Address',
    lines: ['Meridian College', 'Bhatkhuri, Gangapada', 'Bhubaneswar – 752054, Odisha'],
  },
  {
    icon: HiPhone,
    title: 'Phone Numbers',
    lines: ['9437044215', '9777736396', '9040799627', '9040799527'],
    isPhone: true,
  },
  {
    icon: HiMail,
    title: 'Email Address',
    lines: ['principalmeridiancollege@gmail.com'],
    isEmail: true,
  },
  {
    icon: HiGlobe,
    title: 'Website',
    lines: ['www.meridiancollege.ac.in'],
    isWebsite: true,
  },
  {
    icon: HiShare,
    title: 'Social Media',
    lines: [
      { label: 'Instagram', url: 'https://www.instagram.com/meridian_college_bhubaneswar?igsh=bWJqa21zcm01YXZ4', icon: FaInstagram },
      { label: 'YouTube', url: 'https://youtube.com/@meridiancollegebhubaneswar?si=Dl_eOViOciSbfJIq', icon: FaYoutube },
      { label: 'WhatsApp', url: 'https://wa.me/919040799627', icon: FaWhatsapp },
    ],
    isSocial: true,
  },
]

// Steps removed per user request (official SAMS/CHSE process not required)

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', course: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [showProcess, setShowProcess] = useState(false)
  const [activeTab, setActiveTab] = useState('plus2')
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
      // Setup these variables in your .env file
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      // Create a foolproof payload with every possible variable name
      const emailPayload = {
        from_name: formData.name,
        to_name: formData.name, // Used for student name
        student_name: formData.name,
        user_email: formData.email,
        to_email: formData.email, // Used for student email
        college_email: 'mununial637@gmail.com',
        reply_to: 'mununial637@gmail.com',
        phone: formData.phone,
        course: formData.course,
        message: formData.message || 'No additional message.'
      };

      // Only attempt to send if configured, otherwise fallback to success animation (demo mode)
      if (serviceId && templateId && publicKey) {
        // 1) Send primary email (Notification to College)
        await emailjs.send(serviceId, templateId, emailPayload, publicKey)

        // 2) Send secondary email (Welcome Email to Student)
        if (autoReplyTemplateId) {
          try {
            await emailjs.send(serviceId, autoReplyTemplateId, emailPayload, publicKey)
          } catch (autoReplyError) {
            console.warn('Auto-reply email failed (dashboard configuration issue), but primary succeeded.')
            // We do not break the form if the auto-reply fails.
          }
        }
      } else {
        console.warn('EmailJS is not configured. Simulating email send.')
        await new Promise(resolve => setTimeout(resolve, 1500))
      }

      setSubmitted(true)
      setFormData({ name: '', phone: '', email: '', course: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Failed to send email:', error)
      const errorText = error?.text || error?.message || 'Unknown error'
      setSubmitError(`EmailJS Error: ${errorText} (Please check your EmailJS dashboard template variables or configuration)`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // activeTab and steps logic removed
  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-gradient-to-b from-navy-50/30 to-white">
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
            Admissions & Contact
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-navy-800 mb-4">
            Contact <span className="gradient-text">Us</span>
          </h2>
          <p className="text-navy-500 text-lg max-w-2xl mx-auto">
            Have questions about admissions? Reach out to us and our team will be happy to help you
          </p>
        </motion.div>

        {/* Admission Process — Collapsible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <button
            onClick={() => setShowProcess(!showProcess)}
            className="w-full flex items-center justify-between bg-gradient-to-r from-royal-500 to-royal-600 text-white px-6 py-4 rounded-2xl font-semibold text-base shadow-lg shadow-royal-500/20 hover:shadow-royal-500/30 transition-all"
          >
            <span className="flex items-center gap-2">
              <HiClipboardList className="w-5 h-5" />
              📋 How to Apply — Admission Process
            </span>
            <HiChevronDown className={`w-5 h-5 transition-transform duration-300 ${showProcess ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showProcess && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white border border-navy-100 border-t-0 rounded-b-2xl p-8 shadow-md text-center">
                  <div className="w-16 h-16 bg-royal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HiDocumentText className="w-8 h-8 text-royal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-800 mb-3">Apply Directly Through Us</h3>
                  <p className="text-navy-600 mb-6 max-w-lg mx-auto leading-relaxed">
                    You do not need to go through the official portal right now. To secure your admission or get detailed information, simply fill out the <strong>Contact Form</strong> below or call our admission office directly. Our team will collect your details and guide you through the rest of the process.
                  </p>
                  <button
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-royal-500 to-royal-600 text-white font-semibold rounded-xl shadow-lg shadow-royal-500/30 hover:-translate-y-0.5 transition-all"
                  >
                    Fill out Contact Form ↓
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="w-12 h-12 bg-royal-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-royal-100 transition-colors">
                  <info.icon className="w-6 h-6 text-royal-600" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-800 text-sm mb-1">{info.title}</h4>
                  {info.lines.map((line, lIdx) => {
                    if (info.isPhone) {
                      return <a key={lIdx} href={`tel:${line}`} className="block text-navy-500 text-sm hover:text-royal-600 transition-colors">{line}</a>
                    }
                    if (info.isEmail) {
                      return <a key={lIdx} href={`mailto:${line}`} className="block text-navy-500 text-sm hover:text-royal-600 transition-colors break-all">{line}</a>
                    }
                    if (info.isWebsite) {
                      return <a key={lIdx} href={`http://${line}`} target="_blank" rel="noopener noreferrer" className="block text-navy-500 text-sm hover:text-royal-600 transition-colors">{line}</a>
                    }
                    if (info.isSocial) {
                      return (
                        <div key={lIdx} className="flex flex-wrap gap-3 mt-1">
                          {info.lines.map((social, sIdx) => (
                            <a 
                              key={sIdx} 
                              href={social.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center gap-1.5 bg-navy-50 px-3 py-1.5 rounded-lg text-xs font-bold text-navy-700 hover:bg-royal-500 hover:text-white transition-all shadow-sm"
                            >
                              <social.icon className="w-3.5 h-3.5" />
                              {social.label}
                            </a>
                          ))}
                        </div>
                      )
                    }
                    return <p key={lIdx} className="text-navy-500 text-sm">{line}</p>
                  })}
                </div>
              </div>
            ))}

            {/* Office Hours */}
            <div className="flex gap-4 group">
              <div className="w-12 h-12 bg-royal-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-royal-100 transition-colors">
                <HiClock className="w-6 h-6 text-royal-600" />
              </div>
              <div>
                <h4 className="font-bold text-navy-800 text-sm mb-1">Office Hours</h4>
                <p className="text-navy-500 text-sm">Mon – Sat: 9:00 AM – 5:00 PM</p>
                <p className="text-navy-500 text-sm">Sunday: Closed</p>
              </div>
            </div>

            {/* Map */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-navy-100 shadow-md h-48 lg:h-56">
              <iframe
                title="Meridian College Map"
                src="https://maps.google.com/maps?q=Meridian%20College,%20Bhatkhuri,%20Gangapada,%20Bhubaneswar&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl shadow-xl shadow-navy-900/5 border border-navy-100/50 p-8 lg:p-10">
              <h3 className="text-xl font-bold text-navy-800 mb-2">Admission Enquiry Form</h3>
              <p className="text-navy-400 text-sm mb-8">Fill in your details and we'll get back to you within 24 hours</p>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium"
                >
                  ✅ Thank you! Your enquiry has been submitted successfully. We'll contact you soon.
                </motion.div>
              )}

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium"
                >
                  ❌ {submitError}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-navy-700 mb-2">Full Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl border border-navy-200 bg-navy-50/50 text-navy-800 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-500 transition-all text-sm" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-navy-700 mb-2">Phone Number *</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter your phone number"
                      className="w-full px-4 py-3 rounded-xl border border-navy-200 bg-navy-50/50 text-navy-800 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-500 transition-all text-sm" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-navy-700 mb-2">Email Address *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-xl border border-navy-200 bg-navy-50/50 text-navy-800 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-500 transition-all text-sm" />
                </div>

                <div>
                  <label htmlFor="course" className="block text-sm font-semibold text-navy-700 mb-2">Programme Interested In *</label>
                  <select id="course" name="course" value={formData.course} onChange={handleChange} required
                    className="w-full px-4 py-3 rounded-xl border border-navy-200 bg-navy-50/50 text-navy-800 focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-500 transition-all text-sm">
                    <option value="">Select a programme</option>
                    <option value="+2 Science (PCM)">+2 Science (PCM)</option>
                    <option value="+2 Science (PCB)">+2 Science (PCB)</option>
                    <option value="+3 Physics Hons">+3 Physics Honours</option>
                    <option value="+3 Chemistry Hons">+3 Chemistry Honours</option>
                    <option value="+3 Mathematics Hons">+3 Mathematics Honours</option>
                    <option value="+3 Botany Hons">+3 Botany Honours</option>
                    <option value="+3 Zoology Hons">+3 Zoology Honours</option>
                    <option value="+3 Computer Science Hons">+3 Computer Science Honours</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-navy-700 mb-2">Message (Optional)</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows="3" placeholder="Any questions or specific requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-navy-200 bg-navy-50/50 text-navy-800 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-500 transition-all text-sm resize-none"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-4 text-white font-bold text-base rounded-xl shadow-lg transition-all duration-300 ${
                    isSubmitting 
                      ? 'bg-navy-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-royal-500 to-royal-600 hover:shadow-royal-500/40 hover:-translate-y-0.5 shadow-royal-500/20'
                  }`}
                >
                  {isSubmitting ? 'Sending Request...' : 'Submit Admission Enquiry'}
                </button>

                <p className="text-navy-400 text-xs text-center">
                  By submitting, you agree to receive a confirmation email and be contacted by Meridian College regarding admissions.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* College Overview & Detailed Admission Process */}
      <div className="max-w-7xl mx-auto px-4 mt-20 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-lg border border-navy-100 p-8 lg:p-12"
        >
          <div className="text-center mb-10">
            <span className="inline-block text-royal-600 font-semibold text-sm tracking-wider uppercase mb-3">
              Learn More
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-navy-800">
              College Overview & Admission Guide
            </h2>
          </div>

          <div className="space-y-12">
            {/* Overview Section */}
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                  <HiGlobe className="text-royal-500" /> About Meridian College
                </h3>
                <p className="text-navy-600 leading-relaxed text-sm mb-4">
                  Meridian College is a premier institution dedicated to providing high-quality science education. With state-of-the-art infrastructure, fully equipped laboratories, and a team of 15+ highly qualified educators (including 4 Ph.D. holders), we strive to create an environment of academic excellence and holistic development.
                </p>
                <p className="text-navy-600 leading-relaxed text-sm">
                  Our curriculum is deeply integrated with coaching for competitive exams like JEE, NEET, and OUAT, ensuring our students are prepared for higher education challenges. We offer dedicated transportation, separate boys' and girls' hostels, and a thriving campus culture.
                </p>
              </div>
              <div className="bg-navy-50 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-navy-800 mb-3">Why Choose Us?</h4>
                <ul className="space-y-3">
                  {[
                    'Experienced faculty with Ph.D. and M.Phil qualifications',
                    'Dedicated JEE & NEET Entrance Coaching',
                    'Modern Physics, Chemistry, and Biology Laboratories',
                    'Strict academic discipline with personal mentoring',
                    'Safe and secure separate hostels for boys and girls',
                    'Rich library resources and digital classrooms'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-navy-700">
                      <span className="text-royal-500 mt-1">✔</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <hr className="border-navy-100" />

            {/* Detailed Process Section */}
            <div>
              <h3 className="text-2xl font-bold text-navy-800 mb-6 flex items-center gap-2">
                <HiDocumentText className="text-royal-500" /> How the Admission Process Works
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* +2 Process */}
                <div className="bg-white border border-navy-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="text-lg font-bold text-royal-600 mb-4 bg-royal-50 inline-block px-3 py-1 rounded-lg">
                    +2 Science Admissions (CHSE)
                  </h4>
                  <p className="text-sm text-navy-600 mb-4">
                    Admission into the +2 Science stream is completely merit-based and governed by the Directorate of Higher Education (DHE), Odisha. Here is what you need to do:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-navy-700 mb-4">
                    <li>After your Class 10 results are declared, visit <strong>dheorissa.in</strong>.</li>
                    <li>Register and open the Online Common Application Form (CAF).</li>
                    <li>During college preference selection, choose <strong>Self-Finance Tab → Khordha District → Meridian College</strong>.</li>
                    <li>Submit the form online and pay the required DHE application fees.</li>
                    <li>Once the merit list is published, if selected for Meridian College, print your intimation letter.</li>
                    <li>Report to the college campus with the applicant copy, intimation letter, original certificates, and college fees to complete enrollment.</li>
                  </ol>
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-3 text-xs text-amber-800 rounded-r-md">
                    <strong>Note:</strong> We provide full assistance at our campus Help Desk for filling out the online CAF.
                  </div>
                </div>

                {/* +3 Process */}
                <div className="bg-white border border-navy-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="text-lg font-bold text-royal-600 mb-4 bg-royal-50 inline-block px-3 py-1 rounded-lg">
                    +3 Science Honours (Utkal University)
                  </h4>
                  <p className="text-sm text-navy-600 mb-4">
                    Admission into the +3 B.Sc. Honours programs is conducted through the Student Academic Management System (SAMS) under the Higher Education Department.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-navy-700 mb-4">
                    <li>Visit the official portal: <strong>samsodisha.gov.in</strong>.</li>
                    <li>Click on the <em>Degree (+3)</em> section and register as a new student using your mobile number and email.</li>
                    <li>Log in and fill out the CAF. Select your preferred Honours subjects (Physics, Chemistry, Maths, Botany, Zoology, or CS) at Meridian College.</li>
                    <li>Pay the CAF fees online.</li>
                    <li>Upon selection in the merit rounds, download your Intimation Letter.</li>
                    <li>Visit our college with your +2 mark sheets, certificates, CLC, and required fees to secure your seat.</li>
                  </ol>
                  <div className="bg-emerald-50 border-l-4 border-emerald-400 p-3 text-xs text-emerald-800 rounded-r-md">
                    <strong>Required Docs:</strong> 10th & 12th Marksheets, Board Certificates, CLC, Conduct Certificate, Aadhaar, and Passport Photos.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  )
}
