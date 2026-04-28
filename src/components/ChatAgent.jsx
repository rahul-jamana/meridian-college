import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiPaperAirplane, HiAcademicCap } from 'react-icons/hi'

/*
 * ChatAgent — Floating AI chat widget for college queries.
 * Uses a local knowledge base (no API needed) to answer common questions
 * about admissions, courses, fees, facilities, faculty, etc.
 */

// Knowledge base — college FAQs
const knowledgeBase = [
  {
    keywords: ['admission', 'apply', 'enroll', 'registration', 'join', 'seat'],
    answer: '📋 **Admissions are open for 2026-27!**\n\n**+2 Science:** Apply through dheorissa.in (CHSE portal). Choose Self-Finance → Khordha District → Meridian College.\n\n**+3 Science:** Apply through samsodisha.gov.in (SAMS portal).\n\nFor direct assistance, call **9437044215** or visit our campus at Bhatkhuri, Gangapada, Bhubaneswar.',
  },
  {
    keywords: ['course', 'programme', 'subject', 'stream', 'pcm', 'pcb', 'bsc'],
    answer: '📚 **We offer the following programmes:**\n\n**+2 Science:**\n• PCM (Physics, Chemistry, Maths)\n• PCB (Physics, Chemistry, Biology)\n\n**+3 Science Honours (B.Sc.):**\n• Physics Honours\n• Chemistry Honours\n• Mathematics Honours\n• Botany Honours\n• Zoology Honours\n• Computer Science Honours\n\nAffiliated to CHSE Odisha & Utkal University.',
  },
  {
    keywords: ['fee', 'cost', 'price', 'payment', 'scholarship', 'charges'],
    answer: '💰 **Fee Structure:**\n\nFees are competitive and affordable. For the detailed fee structure, please contact our admission office:\n\n📞 **9437044215** / **9777736396**\n📧 principalmeridiancollege@gmail.com\n\nScholarship options are available for meritorious students. Visit the campus for more details.',
  },
  {
    keywords: ['hostel', 'accommodation', 'stay', 'room', 'boarding', 'living'],
    answer: '🏠 **Hostel Facilities:**\n\nWe provide separate hostels for boys and girls with:\n• Clean and hygienic rooms\n• Nutritious meals (3 times daily)\n• Self-sufficient laundry service\n• 24/7 security and warden supervision\n• Wi-Fi connectivity\n• Common room with recreation\n\nContact us for hostel availability and fees.',
  },
  {
    keywords: ['faculty', 'teacher', 'professor', 'staff', 'lecturer', 'who teach'],
    answer: '👨‍🏫 **Our Faculty:**\n\n15+ experienced educators including:\n\n• **Mr. Debashish Panda** — Principal (M.A, M.Phil, B.Ed, M.Ed, MBA) — 23 Years\n• **Mrs. Dipika Mishra** — Vice Principal, Mathematics — 15 Years\n• **Dr. Rasmita Sahoo** — Physics (Ph.D) — 10 Years\n• **Dr. Gyana Ranjan Prusty** — Chemistry (Ph.D) — 5 Years\n\n4 Ph.D holders | 9 Departments | Coaching-oriented teaching\n\nVisit our Faculty page for the full list!',
  },
  {
    keywords: ['lab', 'laboratory', 'practical', 'science lab', 'computer lab'],
    answer: '🔬 **Our Laboratories:**\n\n• Physics Lab — Fully equipped with modern instruments\n• Chemistry Lab — Wet lab with safety equipment\n• Biology Lab — Specimens, microscopes, and models\n• Computer Lab — Latest PCs with internet\n• Language Lab\n\nAll labs are well-maintained and used for regular practical sessions.',
  },
  {
    keywords: ['jee', 'neet', 'entrance', 'competitive', 'exam', 'coaching'],
    answer: '🎯 **Competitive Exam Preparation:**\n\n• **JEE Coaching:** Dedicated classes for PCM students\n• **NEET Coaching:** Special preparation for PCB students\n• **Other Exams:** OUAT, ICAR, NISER, ISER coaching\n\n• Weekly mock tests and analysis\n• Special doubt-clearing sessions\n• Study material provided\n• Personal mentoring',
  },
  {
    keywords: ['location', 'address', 'where', 'map', 'direction', 'reach', 'campus'],
    answer: '📍 **Our Location:**\n\n**Meridian College**\nBhatkhuri, Gangapada\nBhubaneswar – 752054, Odisha\n\n📞 Phone: 9437044215, 9777736396\n📧 Email: principalmeridiancollege@gmail.com\n\n⏰ Office Hours: Mon-Sat, 9:00 AM - 5:00 PM',
  },
  {
    keywords: ['transport', 'bus', 'travel', 'commute', 'vehicle'],
    answer: '🚌 **Transportation:**\n\nMeridian College provides transportation facilities for students. College buses operate on multiple routes covering Bhubaneswar and surrounding areas.\n\nContact the administration office at **9437044215** for route details and availability.',
  },
  {
    keywords: ['library', 'book', 'reading', 'study'],
    answer: '📖 **Library:**\n\nOur library offers:\n• Textbooks and reference materials for all subjects\n• Competitive exam preparation books (JEE, NEET)\n• Magazines and journals\n• Quiet reading rooms\n• Digital resources\n\n**Librarian:** Miss Bishnupriya Mohanty (Library Science)',
  },
  {
    keywords: ['sport', 'game', 'cricket', 'football', 'volleyball', 'athletic'],
    answer: '🏏 **Sports & Games:**\n\nMeridian College encourages sports with:\n• Cricket ground and team\n• Volleyball court\n• Indoor games (chess, carrom, table tennis)\n• Annual sports day\n• Inter-college competitions\n\n**Sports In-charge:** Mr. Bibhuti Bhusan Sahoo',
  },
  {
    keywords: ['cultural', 'event', 'festival', 'function', 'celebration', 'annual'],
    answer: '🎭 **Cultural Activities:**\n\n• Annual Day celebration\n• Cultural festivals and programs\n• Farewell and fresher\'s parties\n• Debate and quiz competitions\n• Art and craft exhibitions\n• Yoga and meditation sessions\n\n**Cultural In-charge:** Mr. Avinash Lenka',
  },
  {
    keywords: ['chairman', 'founder', 'management'],
    answer: '👤 **Chairman:**\n\n**Er. Alok Ranjan Mallick**\nChairman, Meridian College\n\n"Education is not merely a destination—it is a lifelong journey of learning, growth, and transformation."',
  },
  {
    keywords: ['principal', 'head', 'director'],
    answer: '👤 **Principal:**\n\n**Mr. Debashish Panda**\nPrincipal, Meridian College\nM.A in English, M.Phil, B.Ed, M.Ed, MBA\n23 Years of Experience in Education\n\n"Every student is unique and deserves individual attention."',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'hii', 'namaste'],
    answer: '👋 **Hello! Welcome to Meridian College!**\n\nI\'m here to help you with any questions about:\n• 📋 Admissions & Application Process\n• 📚 Courses & Programmes\n• 💰 Fee Structure\n• 🏠 Hostel & Facilities\n• 👨‍🏫 Faculty & Staff\n• 🎯 JEE/NEET Coaching\n\nJust type your question!',
  },
  {
    keywords: ['thank', 'thanks', 'bye', 'goodbye'],
    answer: '😊 **You\'re welcome!** Feel free to reach out anytime.\n\nFor immediate assistance:\n📞 Call: 9437044215\n📧 Email: principalmeridiancollege@gmail.com\n\nWe look forward to welcoming you at Meridian College! 🎓',
  },
]

const defaultAnswer = '🤔 I\'m not sure about that specific question. Here are things I can help with:\n\n• **Admissions** — Application process & requirements\n• **Courses** — Available programmes\n• **Fees** — Fee structure & scholarships\n• **Hostel** — Accommodation details\n• **Faculty** — Teacher information\n• **JEE/NEET** — Coaching details\n• **Campus** — Location & facilities\n\nOr call us directly at **9437044215** for personal assistance!'

const quickQuestions = [
  'How to apply?',
  'Courses offered?',
  'Fee structure?',
  'Hostel available?',
  'JEE/NEET coaching?',
]

function findAnswer(query) {
  const lower = query.toLowerCase()
  let bestMatch = null
  let bestScore = 0

  for (const item of knowledgeBase) {
    const score = item.keywords.filter(k => lower.includes(k)).length
    if (score > bestScore) {
      bestScore = score
      bestMatch = item
    }
  }
  return bestMatch ? bestMatch.answer : defaultAnswer
}

function formatMessage(text) {
  // Convert **bold** and simple markdown-like formatting
  return text.split('\n').map((line, i) => {
    const formatted = line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/• /g, '<span class="text-royal-500 mr-1">•</span> ')
    return <p key={i} className={line === '' ? 'h-2' : 'text-sm leading-relaxed'} dangerouslySetInnerHTML={{ __html: formatted }} />
  })
}

export default function ChatAgent() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: '👋 **Hello! Welcome to Meridian College!**\n\nI\'m your virtual assistant. Ask me anything about admissions, courses, fees, hostel, faculty, or campus facilities!\n\nTap a quick question below or type your own.' },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  if (location.pathname.startsWith('/admin')) return null;

  const handleSend = (text) => {
    const query = text || input.trim()
    if (!query) return

    setMessages(prev => [...prev, { role: 'user', text: query }])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const answer = findAnswer(query)
      setMessages(prev => [...prev, { role: 'bot', text: answer }])
      setIsTyping(false)
    }, 800 + Math.random() * 500)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[90] w-14 h-14 bg-gradient-to-br from-royal-500 to-royal-700 rounded-full flex items-center justify-center text-white shadow-xl shadow-royal-500/30 hover:shadow-royal-500/50 hover:scale-110 transition-all duration-300 ${isOpen ? 'hidden' : ''}`}
        aria-label="Open chat"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {/* Notification dot */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
          <span className="text-[8px] text-white font-bold">1</span>
        </span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-[95] w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl shadow-navy-900/15 border border-navy-100/60 overflow-hidden flex flex-col"
            style={{ height: 'min(520px, calc(100vh - 6rem))' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-royal-600 to-navy-700 px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <HiAcademicCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Meridian Assistant</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/70 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <HiX className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-navy-50/30">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-royal-500 to-royal-600 text-white rounded-br-md'
                      : 'bg-white border border-navy-100 text-navy-700 shadow-sm rounded-bl-md'
                  }`}>
                    {msg.role === 'user'
                      ? <p className="text-sm">{msg.text}</p>
                      : formatMessage(msg.text)
                    }
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-navy-100 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-navy-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-navy-100/50 flex flex-wrap gap-1.5 bg-white/80 flex-shrink-0">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-xs bg-royal-50 text-royal-600 px-3 py-1.5 rounded-full font-medium hover:bg-royal-100 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-navy-100/50 bg-white flex items-center gap-2 flex-shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about admissions, courses..."
                className="flex-1 px-4 py-2.5 bg-navy-50/50 border border-navy-100 rounded-xl text-sm text-navy-700 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-royal-500/30 focus:border-royal-400 transition-all"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-10 h-10 bg-gradient-to-r from-royal-500 to-royal-600 rounded-xl flex items-center justify-center text-white disabled:opacity-40 hover:shadow-lg transition-all flex-shrink-0"
              >
                <HiPaperAirplane className="w-4 h-4 rotate-90" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
