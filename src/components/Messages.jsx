import React from 'react'
import { motion } from 'framer-motion'
import { getImageUrl } from '../lib/cloudinary'

export default function Messages() {
  return (
    <section id="chairman" className="relative py-20 lg:py-28 bg-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="relative max-w-7xl mx-auto px-4">
        
        {/* Chairman Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-5/12"
          >
            <div className="relative">
              {/* Image Frame */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                {/* 
                  Using a specific Cloudinary ID 'meridian/chairman'. 
                  Make sure to upload this photo to Cloudinary with the Public ID: meridian/chairman 
                */}
                <img 
                  src={getImageUrl('meridian/chairman', { width: 800, crop: 'fill' })} 
                  alt="Er. Alok Ranjan Mallick - Chairman" 
                  className="w-full h-auto object-cover object-top aspect-[3/4]"
                  onError={(e) => {
                    // Fallback if image is not yet uploaded to cloudinary
                    e.target.src = "https://ui-avatars.com/api/?name=Alok+Mallick&background=1e293b&color=fff&size=800"
                  }}
                />
              </div>
              
              {/* Accent shapes */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-royal-500 rounded-3xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-navy-100 rounded-full -z-10"></div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-7/12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-royal-50 text-royal-600 rounded-full text-sm font-bold tracking-wider uppercase mb-6">
              Leadership
            </div>
            
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-navy-800 mb-6">
              Chairman's <span className="gradient-text">Message</span>
            </h2>
            
            <div className="relative">
              <span className="absolute -top-6 -left-4 text-6xl text-royal-200 font-serif opacity-50">"</span>
              <p className="text-navy-600 text-lg leading-relaxed mb-6 relative z-10 italic">
                Education is not merely a destination—it is a lifelong journey of learning, growth, and transformation. At Meridian College, our vision has always been to provide a nurturing environment where students are equipped with not just academic excellence, but the character and skills needed to face the challenges of tomorrow.
              </p>
              <p className="text-navy-600 text-lg leading-relaxed mb-8 relative z-10 italic">
                Our dedicated faculty, modern infrastructure, and rigorous coaching methodologies are designed to bring out the very best in every student. We welcome you to join our family and embark on a path to success.
              </p>
            </div>
            
            <div className="border-t border-navy-100 pt-6">
              <h3 className="text-xl font-bold text-navy-800">Er. Alok Ranjan Mallick</h3>
              <p className="text-royal-600 font-medium">Chairman, Meridian College</p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
