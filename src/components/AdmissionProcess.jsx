import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiExternalLink, HiClipboardList, HiDocumentText } from 'react-icons/hi'

const plusTwoSteps = [
  { step: 1, text: 'Go to "dheorissa.in" website', link: 'https://dheorissa.in/' },
  { step: 2, text: 'Click on "Online CAF" (Common Application Form) in the +2 Admission Tab' },
  { step: 3, text: 'Read through all the rules before filling out the online form' },
  { step: 4, text: 'Choose: Self-Finance Tab → Khordha District → Meridian College' },
  { step: 5, text: 'Fill in all your credentials correctly' },
  { step: 6, text: 'Print the College Copy and Applicant Copy' },
  { step: 7, text: 'Submit the College Copy to the nearest Resource Center (any Govt. College) with the requisite fees and retain the applicant copy' },
]

const plusThreeSteps = [
  { step: 1, text: 'Go to the official website of SAMS Odisha Portal', link: 'https://www.samsodisha.gov.in/' },
  { step: 2, text: 'Click on the Degree (+3) tab' },
  { step: 3, text: 'Find "New Registration for +3 Degree College" and click on the link' },
  { step: 4, text: 'Enter your Email ID and mobile number, then click submit' },
  { step: 5, text: 'Enter the OTP received on your mobile and create a password' },
  { step: 6, text: 'Fill captcha code and click on submit' },
  { step: 7, text: 'Login with your Registration No. and password' },
  { step: 8, text: 'Fill and submit the +3 application form' },
  { step: 9, text: 'Upload your photograph and click submit' },
  { step: 10, text: 'Print the confirmation page and submit it to the SAMS Center' },
]

export default function AdmissionProcess() {
  const [activeTab, setActiveTab] = useState('plus2')

  const steps = activeTab === 'plus2' ? plusTwoSteps : plusThreeSteps

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-navy-50/40 to-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-royal-50/40 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-royal-600 font-semibold text-sm tracking-wider uppercase mb-3">
            How To Apply
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-navy-800 mb-4">
            Admission <span className="gradient-text">Process</span>
          </h2>
          <p className="text-navy-500 text-lg max-w-2xl mx-auto">
            Follow these simple steps to apply for admission at Meridian College
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('plus2')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'plus2'
                ? 'bg-gradient-to-r from-royal-500 to-royal-600 text-white shadow-lg shadow-royal-500/20'
                : 'bg-white text-navy-600 border border-navy-200 hover:border-royal-300'
            }`}
          >
            <HiClipboardList className="w-4 h-4" />
            +2 Science (CHSE)
          </button>
          <button
            onClick={() => setActiveTab('plus3')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
              activeTab === 'plus3'
                ? 'bg-gradient-to-r from-royal-500 to-royal-600 text-white shadow-lg shadow-royal-500/20'
                : 'bg-white text-navy-600 border border-navy-200 hover:border-royal-300'
            }`}
          >
            <HiDocumentText className="w-4 h-4" />
            +3 Science (SAMS)
          </button>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {steps.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-navy-100/50 shadow-sm hover:shadow-md hover:border-royal-200 transition-all duration-300 group"
              >
                {/* Step number */}
                <div className="w-10 h-10 bg-gradient-to-br from-royal-500 to-royal-600 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-md shadow-royal-500/20 group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <div className="flex-1 pt-1.5">
                  <p className="text-navy-700 text-sm font-medium leading-relaxed">
                    {item.text}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-xs text-royal-600 font-semibold hover:text-royal-700 transition-colors"
                    >
                      Visit Website <HiExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Help note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-navy-400 text-sm mb-4">
            Need help with the admission process? Contact our admission office directly.
          </p>
          <a
            href="tel:9437044215"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy-800 text-white font-semibold text-sm rounded-xl hover:bg-navy-700 transition-all duration-300 shadow-lg shadow-navy-800/20"
          >
            📞 Call Admission Office: 9437044215
          </a>
        </motion.div>
      </div>
    </section>
  )
}
