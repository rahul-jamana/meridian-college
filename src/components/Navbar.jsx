import React, { useState, useEffect, useRef } from 'react'
import { getImageUrl } from '../lib/cloudinary'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX, HiPhone, HiChevronDown } from 'react-icons/hi'
import { FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'

/*
 * Navigation links — mix of hash anchors (same-page scroll) and route links (sub-pages).
 * `route` = goes to a separate page via React Router
 * `href` = hash link on the current page
 */
const navLinks = [
  { name: 'Home', href: '/' },
  {
    name: 'About Us',
    href: '#about',
    dropdown: [
      { name: 'About Meridian', href: '#about' },
      { name: 'Vision & Mission', route: '/vision-mission' },
      { name: 'Fee Structure', route: '/fees' },
      { name: "Chairman's Message", href: '#chairman' },
      { name: "Principal's Message", href: '#principal' },
    ],
  },
  {
    name: 'Academic',
    href: '#programmes',
    dropdown: [
      { name: '+2 Science (PCM)', route: '/course/plus2-pcm' },
      { name: '+2 Science (PCB)', route: '/course/plus2-pcb' },
      { name: '+3 Physics Hons', route: '/course/plus3-physics' },
      { name: '+3 Chemistry Hons', route: '/course/plus3-chemistry' },
      { name: '+3 Mathematics Hons', route: '/course/plus3-mathematics' },
      { name: '+3 Botany Hons', route: '/course/plus3-botany' },
      { name: '+3 Zoology Hons', route: '/course/plus3-zoology' },
      { name: '+3 Comp. Sci Hons', route: '/course/plus3-computer-science' },
    ],
  },
  { name: 'Facilities', route: '/facilities' },
  { name: 'Faculty', route: '/faculty' },
  {
    name: 'Gallery',
    dropdown: [
      { name: 'Photo Gallery', route: '/gallery' },
      { name: 'Our Achievers', route: '/achievers' },
    ],
  },
  { name: 'Contact', route: '/contact' },
]

function NavLink({ link, onClick, className }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (e) => {
    if (link.route) {
      // React Router navigation
      e.preventDefault()
      navigate(link.route)
      window.scrollTo(0, 0)
    } else if (link.href && link.href.startsWith('#')) {
      // Same-page hash scroll
      e.preventDefault()
      if (location.pathname !== '/') {
        // If on a sub-page, navigate home first, then scroll
        navigate('/')
        setTimeout(() => {
          const el = document.querySelector(link.href)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      } else {
        const el = document.querySelector(link.href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (link.href === '/') {
      e.preventDefault()
      navigate('/')
      window.scrollTo(0, 0)
    }
    if (onClick) onClick()
  }

  return (
    <a href={link.route || link.href || '#'} onClick={handleClick} className={className}>
      {link.name}
    </a>
  )
}

function DropdownNavLink({ sub, onClick, className }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (e) => {
    e.preventDefault()
    if (sub.route) {
      navigate(sub.route)
      window.scrollTo(0, 0)
    } else if (sub.href && sub.href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          const el = document.querySelector(sub.href)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      } else {
        const el = document.querySelector(sub.href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }
    if (onClick) onClick()
  }

  return (
    <a href={sub.route || sub.href || '#'} onClick={handleClick} className={className}>
      {sub.name}
    </a>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileDropdown, setMobileDropdown] = useState(null)
  const dropdownRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
    setMobileDropdown(null)
  }, [location.pathname])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-navy-900/5'
          : 'bg-transparent'
        }`}
    >
      {/* Top Bar */}
      <div className={`transition-all duration-500 ${scrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'}`}>
        <div className="bg-navy-800 text-white/90 text-xs py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <a href="tel:9437044215" className="flex items-center gap-1 hover:text-gold-400 transition-colors">
                <HiPhone className="w-3 h-3" /> 9437044215
              </a>
              <span className="hidden sm:inline text-white/50">|</span>
              <a href="mailto:principalmeridiancollege@gmail.com" className="hidden sm:inline hover:text-gold-400 transition-colors">
                principalmeridiancollege@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 pr-4 border-r border-white/20">
                <a href="https://www.instagram.com/meridian_college_bhubaneswar?igsh=bWJqa21zcm01YXZ4" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a href="https://youtube.com/@meridiancollegebhubaneswar?si=Dl_eOViOciSbfJIq" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                  <FaYoutube className="w-4 h-4" />
                </a>
                <a href="https://wa.me/919040799627" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                  <FaWhatsapp className="w-4 h-4" />
                </a>
              </div>
              <span className="inline-flex items-center gap-1 bg-gold-500/20 text-gold-400 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Admissions Open
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4" ref={dropdownRef}>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => window.scrollTo(0, 0)}>
            <div className={`flex items-center justify-center transition-all duration-300 ${scrolled ? 'scale-100' : 'scale-105'
              }`}>
              <div className="h-14 sm:h-16 lg:h-[72px] bg-white rounded-xl shadow-md border-2 border-white p-1 flex-shrink-0 flex items-center justify-center">
                <img
                  src={getImageUrl('meridian/meridian_logo')}
                  alt="Meridian College Logo"
                  className="h-full w-auto object-contain"
                  style={{ display: 'block', background: '#fff' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span style={{ display: 'none', color: '#222', fontWeight: 'bold', fontSize: '12px' }}>Logo Not Found</span>
              </div>
              <div style={{ display: 'none' }} className={`font-bold text-lg ${scrolled ? 'text-navy-800' : 'text-white'}`}>
                Meridian College
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isDropdownActive = link.dropdown?.some(sub => sub.route && location.pathname === sub.route)
              const isLinkActive = link.route ? location.pathname === link.route : (link.href === '/' && location.pathname === '/')

              return (
                <div key={link.name} className="relative">
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:bg-royal-50 ${isDropdownActive
                            ? 'text-royal-600 font-bold bg-royal-50/80'
                            : scrolled
                              ? 'text-navy-700 font-medium hover:text-royal-600'
                              : 'text-white/90 font-medium hover:text-white hover:bg-white/10'
                          }`}
                      >
                        {link.name}
                        <HiChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl shadow-navy-900/10 border border-navy-100/60 overflow-hidden py-2 z-50"
                          >
                            {link.dropdown.map((sub) => {
                              const isSubActive = sub.route && location.pathname === sub.route;
                              return (
                                <DropdownNavLink
                                  key={sub.name}
                                  sub={sub}
                                  onClick={() => setOpenDropdown(null)}
                                  className={`block px-5 py-2.5 text-sm transition-all duration-200 ${isSubActive
                                      ? 'bg-royal-50 text-royal-600 font-bold border-l-2 border-royal-600'
                                      : 'text-navy-700 font-medium hover:bg-royal-50 hover:text-royal-600'
                                    }`}
                                />
                              )
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink
                      link={link}
                      className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:bg-royal-50 ${isLinkActive
                          ? 'text-royal-600 font-bold bg-royal-50/80'
                          : scrolled
                            ? 'text-navy-700 font-medium hover:text-royal-600'
                            : 'text-white/90 font-medium hover:text-white hover:bg-white/10'
                        }`}
                    />
                  )}
                </div>
              )
            })}
            <NavLink
              link={{ name: 'Apply Now', route: '/contact' }}
              className="ml-3 px-5 py-2.5 bg-gradient-to-r from-royal-600 to-royal-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-royal-500/30 hover:-translate-y-0.5 transition-all duration-300"
            />
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-navy-800 hover:bg-navy-50' : 'text-white hover:bg-white/10'
              }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-navy-100 shadow-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const isDropdownActive = link.dropdown?.some(sub => sub.route && location.pathname === sub.route)
                const isLinkActive = link.route ? location.pathname === link.route : (link.href === '/' && location.pathname === '/')

                return (
                  <div key={link.name}>
                    {link.dropdown ? (
                      <>
                        <button
                          onClick={() => setMobileDropdown(mobileDropdown === link.name ? null : link.name)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isDropdownActive
                              ? 'bg-royal-50 text-royal-600 font-bold'
                              : 'text-navy-700 font-medium hover:bg-royal-50 hover:text-royal-600'
                            }`}
                        >
                          {link.name}
                          <HiChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileDropdown === link.name ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {mobileDropdown === link.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 space-y-0.5 overflow-hidden"
                            >
                              {link.dropdown.map((sub) => {
                                const isSubActive = sub.route && location.pathname === sub.route;
                                return (
                                  <DropdownNavLink
                                    key={sub.name}
                                    sub={sub}
                                    onClick={() => { setIsOpen(false); setMobileDropdown(null) }}
                                    className={`block px-4 py-2.5 rounded-lg text-sm transition-all ${isSubActive
                                        ? 'bg-royal-50 text-royal-600 font-bold border-l-2 border-royal-600'
                                        : 'text-navy-600 font-medium hover:bg-royal-50 hover:text-royal-600'
                                      }`}
                                  />
                                )
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <NavLink
                        link={link}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-xl transition-all ${isLinkActive
                            ? 'bg-royal-50 text-royal-600 font-bold'
                            : 'text-navy-700 font-medium hover:bg-royal-50 hover:text-royal-600'
                          }`}
                      />
                    )}
                  </div>
                )
              })}
              <NavLink
                link={{ name: 'Apply Now', route: '/contact' }}
                onClick={() => setIsOpen(false)}
                className="block text-center mt-3 px-5 py-3 bg-gradient-to-r from-royal-600 to-royal-500 text-white font-semibold rounded-xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
