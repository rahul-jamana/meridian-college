import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiBell, HiCalendar, HiChevronRight } from 'react-icons/hi'
import { getNews, getEvents } from '../lib/db'

export default function NotificationTicker() {
  const [activeTab, setActiveTab] = useState('notifications')
  const [currentIdx, setCurrentIdx] = useState(0)
  
  const [notifications, setNotifications] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    setNotifications(getNews())
    setEvents(getEvents())
  }, [])

  const items = activeTab === 'notifications' ? notifications : events

  useEffect(() => {
    const timer = setInterval(() => {
      if (items.length > 0) {
        setCurrentIdx((prev) => (prev + 1) % items.length)
      }
    }, 3500)
    return () => clearInterval(timer)
  }, [items.length, activeTab])

  if (items.length === 0) return null;

  return (
    <section className="relative bg-white border-b border-navy-100/50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Tab Buttons */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => { setActiveTab('notifications'); setCurrentIdx(0) }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                activeTab === 'notifications'
                  ? 'bg-royal-500 text-white shadow-md shadow-royal-500/20'
                  : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
              }`}
            >
              <HiBell className="w-3.5 h-3.5" />
              Notices
            </button>
            <button
              onClick={() => { setActiveTab('events'); setCurrentIdx(0) }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                activeTab === 'events'
                  ? 'bg-royal-500 text-white shadow-md shadow-royal-500/20'
                  : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
              }`}
            >
              <HiCalendar className="w-3.5 h-3.5" />
              Events
            </button>
          </div>

          {/* Scrolling Item */}
          <div className="flex-1 overflow-hidden h-8 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx + activeTab}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <span className="text-xs font-bold text-royal-600 bg-royal-50 px-2.5 py-1 rounded-lg flex-shrink-0">
                  {items[currentIdx].date}
                </span>
                <span className="text-sm text-navy-600 font-medium truncate">
                  {items[currentIdx].text}
                </span>
                <HiChevronRight className="w-4 h-4 text-navy-300 flex-shrink-0 animate-pulse" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="hidden sm:flex gap-1.5 flex-shrink-0">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIdx ? 'bg-royal-500 w-5' : 'bg-navy-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
