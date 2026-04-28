import React from 'react';
import { HiOutlineUsers, HiOutlinePhotograph, HiOutlineNewspaper } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const stats = [
    { title: 'Total News Items', value: '3', icon: HiOutlineNewspaper, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Gallery Photos', value: '82', icon: HiOutlinePhotograph, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Recent Enquiries', value: '12', icon: HiOutlineUsers, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-navy-900">Dashboard Overview</h1>
        <p className="text-navy-500 mt-2">Welcome to the Meridian College Admin Portal</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5"
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${stat.bg}`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <div>
              <p className="text-navy-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-navy-900 mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h2 className="text-xl font-bold text-navy-900 mb-2">Getting Started</h2>
        <p className="text-navy-600 mb-6 max-w-2xl mx-auto">
          Use the sidebar menu to navigate between different management sections. You can update the latest news ticker, modify the hero background images/video, or add new photos to the gallery.
        </p>
      </div>
    </div>
  );
}
