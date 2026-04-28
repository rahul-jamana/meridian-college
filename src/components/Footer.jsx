import React from 'react'
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi'
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Us', href: '#about' },
  { name: 'Programmes', href: '#programmes' },
  { name: 'Facilities', href: '#facilities' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
]

const programmes = [
  '+2 Science (PCM)',
  '+2 Science (PCB)',
  '+3 Physics Honours',
  '+3 Chemistry Honours',
  '+3 Mathematics Honours',
  '+3 Computer Science Honours',
]

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/meridian_college_bhubaneswar?igsh=bWJqa21zcm01YXZ4', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://youtube.com/@meridiancollegebhubaneswar?si=Dl_eOViOciSbfJIq', label: 'YouTube' },
  { icon: FaWhatsapp, href: 'https://wa.me/919040799627', label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white/80">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* College Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-royal-500 to-royal-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">Meridian College</h3>
                <p className="text-royal-400 text-xs font-medium">Bhubaneswar</p>
              </div>
            </div>
            <p className="text-sm text-navy-300 leading-relaxed mb-5">
              One of the top private science colleges in Bhubaneswar, Odisha — offering quality +2 Science & +3 Science Honours education since 2011. Affiliated to CHSE Odisha & Utkal University. Building future scientists, doctors, and engineers.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-royal-500 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-sm text-navy-300 hover:text-royal-400 transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 bg-royal-500 rounded-full"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Programmes</h4>
            <ul className="space-y-3">
              {programmes.map((prog, idx) => (
                <li key={idx}>
                  <a href="#programmes" className="text-sm text-navy-300 hover:text-royal-400 transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 bg-royal-500 rounded-full"></span>
                    {prog}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <HiLocationMarker className="w-5 h-5 text-royal-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-navy-300">
                  Bhatkhuri, Gangapada,<br />
                  Bhubaneswar – 752054
                </p>
              </div>
              <div className="flex gap-3">
                <HiPhone className="w-5 h-5 text-royal-400 flex-shrink-0" />
                <div>
                  <a href="tel:9437044215" className="block text-sm text-navy-300 hover:text-royal-400 transition-colors">9437044215</a>
                  <a href="tel:9777736396" className="block text-sm text-navy-300 hover:text-royal-400 transition-colors">9777736396</a>
                </div>
              </div>
              <div className="flex gap-3">
                <HiMail className="w-5 h-5 text-royal-400 flex-shrink-0" />
                <a href="mailto:principalmeridiancollege@gmail.com" className="text-sm text-navy-300 hover:text-royal-400 transition-colors break-all">
                  principalmeridiancollege@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-navy-400 text-center md:text-left">
            © {new Date().getFullYear()} Meridian College, Bhubaneswar. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-navy-400">
            <a href="#" className="hover:text-royal-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-royal-400 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
