import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HiUserGroup, HiAcademicCap, HiClock, HiStar } from 'react-icons/hi'

const stats = [
  { icon: HiUserGroup, value: 500, suffix: '+', label: 'Students Enrolled' },
  { icon: HiAcademicCap, value: 15, suffix: '+', label: 'Expert Faculty' },
  { icon: HiClock, value: 14, suffix: '+', label: 'Years of Excellence' },
  { icon: HiStar, value: 95, suffix: '%', label: 'Satisfaction Rate' },
]

function AnimatedCounter({ target, suffix, inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span>{count}{suffix}</span>
}

export default function StatsCounter() {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative py-16 bg-gradient-to-r from-navy-800 via-navy-900 to-navy-800 overflow-hidden">
      {/* Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 pattern-dots"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center group"
            >
              <div className="w-14 h-14 bg-royal-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-royal-500/30 group-hover:scale-110 transition-all duration-300">
                <stat.icon className="w-7 h-7 text-royal-400" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <div className="text-navy-300 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
