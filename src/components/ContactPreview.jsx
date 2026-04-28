import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiLocationMarker, HiPhone, HiMail, HiClock, HiArrowRight } from 'react-icons/hi'

/*
 * ContactPreview — Lightweight contact section on the home page.
 * Shows map, address, phone numbers, and a CTA to the full /contact page.
 */
export default function ContactPreview() {
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
            Get In Touch
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-navy-800 mb-4">
            Visit <span className="gradient-text">Us</span>
          </h2>
          <p className="text-navy-500 text-lg max-w-2xl mx-auto">
            Meridian College is located at Bhatkhuri, Gangapada, Bhubaneswar, Odisha — one of the top private science colleges, easily accessible and ready to welcome you
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-xl shadow-navy-900/5 border border-navy-100/50 h-72 lg:h-96"
          >
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
          </motion.div>

          {/* Contact Info Cards + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* Address */}
            <div className="flex gap-4 p-5 bg-white rounded-2xl border border-navy-100/50 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-royal-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-royal-100 transition-colors">
                <HiLocationMarker className="w-6 h-6 text-royal-600" />
              </div>
              <div>
                <h4 className="font-bold text-navy-800 text-sm mb-1">Our Address</h4>
                <p className="text-navy-500 text-sm">Meridian College, Bhatkhuri, Gangapada</p>
                <p className="text-navy-500 text-sm">Bhubaneswar – 752054, Odisha</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 p-5 bg-white rounded-2xl border border-navy-100/50 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-royal-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-royal-100 transition-colors">
                <HiPhone className="w-6 h-6 text-royal-600" />
              </div>
              <div>
                <h4 className="font-bold text-navy-800 text-sm mb-1">Phone Numbers</h4>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {['9437044215', '9777736396', '9040799627', '9040799527'].map((ph) => (
                    <a key={ph} href={`tel:${ph}`} className="text-navy-500 text-sm hover:text-royal-600 transition-colors">{ph}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 p-5 bg-white rounded-2xl border border-navy-100/50 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-royal-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-royal-100 transition-colors">
                <HiMail className="w-6 h-6 text-royal-600" />
              </div>
              <div>
                <h4 className="font-bold text-navy-800 text-sm mb-1">Email</h4>
                <a href="mailto:principalmeridiancollege@gmail.com" className="text-navy-500 text-sm hover:text-royal-600 transition-colors break-all">
                  principalmeridiancollege@gmail.com
                </a>
              </div>
            </div>

            {/* Office Hours */}
            <div className="flex gap-4 p-5 bg-white rounded-2xl border border-navy-100/50 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-royal-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-royal-100 transition-colors">
                <HiClock className="w-6 h-6 text-royal-600" />
              </div>
              <div>
                <h4 className="font-bold text-navy-800 text-sm mb-1">Office Hours</h4>
                <p className="text-navy-500 text-sm">Mon – Sat: 9:00 AM – 5:00 PM</p>
                <p className="text-navy-500 text-sm">Sunday: Closed</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-royal-500 to-royal-600 text-white font-semibold text-base rounded-2xl shadow-lg shadow-royal-500/20 hover:shadow-royal-500/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                Admission Enquiry
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:9437044215"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-navy-800 text-white font-semibold text-base rounded-2xl hover:bg-navy-700 transition-all duration-300 shadow-lg shadow-navy-800/20"
              >
                📞 Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
