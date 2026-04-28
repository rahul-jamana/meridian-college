import React from 'react'
import { motion } from 'framer-motion'
import {
  HiAcademicCap, HiBookOpen, HiBeaker, HiCalculator,
  HiDesktopComputer, HiUserGroup,
} from 'react-icons/hi'

/*
 * Faculty — Clean card grid showing name, subject, designation.
 * No experience bars — just a professional listing.
 */
const faculty = [
  { name: 'Mr. Debashish Panda', subject: 'English', designation: 'Principal', qualification: 'M.A in English, M.Phil, B.Ed, M.Ed, MBA', experience: '23 Yrs', highlight: true, bio: 'Expert in communication and educational leadership, fostering holistic student development.' },
  { name: 'Mrs. Dipika Mishra', subject: 'Mathematics', designation: 'Academic Bursar, Vice Principal', qualification: 'M.Sc in Maths, B.Ed, M.Phil', experience: '15 Yrs', highlight: true, bio: 'Simplifies complex mathematical concepts to build strong analytical foundations.' },
  { name: 'Mr. Sanjib Kumar Ray', subject: 'Odia', designation: 'Administrative Officer', qualification: 'M.A in Odia, B.Ed, MBA', experience: '17 Yrs', bio: 'Ensures smooth administrative operations and promotes regional literature.' },
  { name: 'Miss Sonam Mohapatra', subject: 'Odia', designation: 'Students Counsellor, Admission In-charge', qualification: 'M.A in Odia, B.Ed, Diploma in Odia', experience: '6 Yrs', bio: 'Guides students through admissions and provides essential academic counseling.' },
  { name: 'Miss Priyanka Sahoo', subject: 'English', designation: 'Assistant Cultural In-charge', qualification: 'M.A in English, B.Ed', experience: '5 Yrs', bio: 'Enhances student creativity through language and cultural activities.' },
  { name: 'Mr. Chinmaya Kumar Panda', subject: 'Mathematics', designation: 'Lect. in Mathematics', qualification: 'M.Sc in Applied Maths, B.Ed', experience: '3 Yrs', bio: 'Focuses on applied mathematics and competitive problem-solving strategies.' },
  { name: 'Dr. Rasmita Sahoo', subject: 'Physics', designation: 'Lect. in Physics', qualification: 'M.Sc in Physics, Ph.D, B.Ed', experience: '10 Yrs', bio: 'Brings advanced physics to life through practical experiments and deep theory.' },
  { name: 'Miss Pragati Kund', subject: 'Physics', designation: 'Assistant Examination In-charge', qualification: 'M.Sc in Physics, B.Ed', experience: '4 Yrs', bio: 'Specializes in clear, structured teaching for board and entrance exams.' },
  { name: 'Mr. Bibhuti Bhusan Sahoo', subject: 'Chemistry', designation: 'Sports In-charge', qualification: 'M.Sc in Chemistry, B.Ed', experience: '3 Yrs', bio: 'Combines chemical sciences with an active approach to physical education.' },
  { name: 'Mr. Avinash Lenka', subject: 'Chemistry', designation: 'Cultural In-charge', qualification: 'M.Sc in Chemistry, B.Ed', experience: '3 Yrs', bio: 'Engages students in vibrant cultural events while teaching core chemistry.' },
  { name: 'Dr. Gyana Ranjan Prusty', subject: 'Chemistry', designation: 'Boys Hostel Superintendent', qualification: 'M.Sc in Chemistry, M.Phil, Ph.D, B.Ed', experience: '16 Yrs', bio: 'Expert in physical and organic chemistry, providing excellent student mentorship.' },
  { name: 'Mrs. Jyoti Ballhari Sahoo', subject: 'Botany', designation: 'Girls Hostel Superintendent', qualification: 'M.Sc in Botany, B.Ed, M.Phil', experience: '18 Yrs', bio: 'Dedicated to teaching plant sciences with an emphasis on ecology and genetics.' },
  { name: 'Mr. Sachidananda Behera', subject: 'Zoology', designation: 'Exam In-charge', qualification: 'M.Sc in Zoology, B.Ed', experience: '6 Yrs', bio: 'Expert in animal biology and physiology, ensuring rigorous academic assessment.' },
  { name: 'Mrs. Lipsa Tanaya Mishra', subject: 'IT & Computer Science', designation: 'Academic In-charge', qualification: 'B.Tech CS, M.Tech CS', experience: '17 Yrs', bio: 'Teaches modern programming languages and manages the academic curriculum.' },
  { name: 'Miss Bishnupriya Mohanty', subject: 'Library Science', designation: 'Librarian', qualification: 'MA in Library Science', experience: '10 Yrs', bio: 'Manages a vast collection of academic resources to support student learning.' },
]

const subjectIcon = {
  'English': HiBookOpen,
  'Odia': HiBookOpen,
  'Mathematics': HiCalculator,
  'Physics': HiBeaker,
  'Chemistry': HiBeaker,
  'Botany': HiBeaker,
  'Zoology': HiBeaker,
  'IT & Computer Science': HiDesktopComputer,
  'Library Science': HiBookOpen,
}

const subjectColor = {
  'English': 'from-amber-500 to-orange-500',
  'Odia': 'from-rose-500 to-pink-500',
  'Mathematics': 'from-blue-500 to-indigo-500',
  'Physics': 'from-violet-500 to-purple-500',
  'Chemistry': 'from-emerald-500 to-teal-500',
  'Botany': 'from-green-500 to-lime-600',
  'Zoology': 'from-cyan-500 to-sky-500',
  'IT & Computer Science': 'from-slate-600 to-gray-700',
  'Library Science': 'from-yellow-500 to-amber-500',
}

function getInitials(name) {
  const parts = name.replace(/^(Mr\.|Mrs\.|Miss\.?|Dr\.)\s*/i, '').trim().split(' ')
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0].substring(0, 2).toUpperCase()
}

export default function Faculty() {
  return (
    <section id="faculty" className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-navy-50/40 overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-royal-50 rounded-full -translate-x-1/2 blur-3xl opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-royal-600 font-semibold text-sm tracking-wider uppercase mb-3">
            Our Team
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-navy-800 mb-4">
            Meet Our <span className="gradient-text">Faculty</span>
          </h2>
          <p className="text-navy-500 text-lg max-w-2xl mx-auto">
            15+ dedicated educators with extensive experience and expertise across all Science departments
          </p>
        </motion.div>

        {/* Quick Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-14"
        >
          {[
            { value: '15+', label: 'Faculty Members', icon: HiUserGroup },
            { value: '4', label: 'Ph.D Holders', icon: HiAcademicCap },
            { value: '9', label: 'Departments', icon: HiBookOpen },
          ].map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-md border border-navy-100/50">
              <div className="w-10 h-10 bg-royal-50 rounded-xl flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-royal-600" />
              </div>
              <div>
                <div className="text-lg font-bold text-navy-800">{stat.value}</div>
                <div className="text-xs text-navy-400 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Faculty Grid — Updated for more info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
          {faculty.map((member, idx) => {
            const Icon = subjectIcon[member.subject] || HiBookOpen
            const gradient = subjectColor[member.subject] || 'from-royal-500 to-royal-600'
            const initials = getInitials(member.name)

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className={`group relative bg-white rounded-3xl p-6 border hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-400 flex flex-col h-full ${
                  member.highlight
                    ? 'border-royal-200 shadow-md shadow-royal-500/10'
                    : 'border-navy-100/50 shadow-sm'
                }`}
              >
                {/* Highlight badge */}
                {member.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                      ★ {member.designation.includes('Vice') ? 'Vice Principal' : 'Principal'}
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  {/* Avatar */}
                  <div className={`w-14 h-14 shrink-0 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300`}>
                    {initials}
                  </div>
                  
                  <div>
                    {/* Name */}
                    <h3 className="text-base font-bold text-navy-800 leading-tight mb-1 group-hover:text-royal-600 transition-colors">
                      {member.name}
                    </h3>
                    
                    {/* Subject badge */}
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-600 bg-navy-50 px-2 py-0.5 rounded-md">
                      <Icon className="w-3.5 h-3.5" />
                      {member.subject}
                    </div>
                  </div>
                </div>

                <div className="flex-grow">
                  {/* Bio */}
                  <p className="text-sm text-navy-500 leading-relaxed mb-4 italic border-l-2 border-navy-100 pl-3">
                    "{member.bio}"
                  </p>
                </div>

                {/* Footer details */}
                <div className="space-y-2 mt-auto pt-4 border-t border-navy-100/50">
                  <div className="flex items-start gap-2">
                    <HiAcademicCap className="w-4 h-4 text-royal-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-navy-600 font-medium leading-tight">
                      {member.qualification}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[11px] text-navy-400 font-bold uppercase tracking-wider">
                      {member.designation}
                    </p>
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {member.experience} Exp
                    </span>
                  </div>
                </div>

              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
