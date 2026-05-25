import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineSparkles, HiOutlineCheckCircle } from 'react-icons/hi';
import { getAcademicYear, saveAcademicYear } from '../../lib/db';

export default function ManageAdmissions() {
  const [academicYear, setAcademicYear] = useState('2026-27');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setAcademicYear(await getAcademicYear());
      } catch (err) {
        console.error('Failed to load academic year:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const formattedYear = academicYear.trim();
    if (!formattedYear) {
      setError('Academic year cannot be empty');
      return;
    }

    try {
      const success = await saveAcademicYear(formattedYear);
      if (success) {
        setMessage('Admissions Academic Year updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setError('Failed to save to database');
      }
    } catch (err) {
      console.error('Error saving year:', err);
      setError('An unexpected error occurred while saving.');
    }
  };

  if (loading) {
    return (
      <div className="p-8 lg:p-12 text-center text-navy-500 font-medium">
        Loading admissions settings...
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-navy-900">Manage Admissions</h1>
        <p className="text-navy-500 mt-2">Update the academic year for new registrations and admissions across the website.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="md:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-6 bg-navy-50 border-b border-navy-100 flex items-center gap-3">
              <HiOutlineCalendar className="w-6 h-6 text-navy-600" />
              <h2 className="text-lg font-bold text-navy-900">Academic Year Configuration</h2>
            </div>

            <div className="p-8">
              {message && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-2xl text-sm font-medium border border-green-200 flex items-center gap-2">
                  <HiOutlineCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  {message}
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-2xl text-sm font-medium border border-red-200">
                  ❌ {error}
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-navy-700 mb-2">
                    Active Admission Year
                  </label>
                  <input 
                    type="text" 
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-royal-500 bg-gray-50 font-bold text-lg text-navy-800"
                    placeholder="e.g. 2026-27 or 2026-2027"
                    required
                  />
                  <p className="text-xs text-navy-400 mt-2">
                    Enter the academic year session for new applicants. Changing this immediately updates the text across the public website.
                  </p>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-royal-600 text-white font-bold py-3.5 rounded-xl hover:bg-royal-700 transition-colors shadow-lg shadow-royal-600/20"
                >
                  Save Year Settings
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Info Column */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-royal-600 to-royal-800 text-white p-6 rounded-3xl shadow-xl shadow-royal-900/10 space-y-4"
          >
            <div className="flex items-center gap-2">
              <HiOutlineSparkles className="w-5 h-5 text-gold-300" />
              <h3 className="font-bold text-base">Instant Updates</h3>
            </div>
            <p className="text-sm text-royal-100 leading-relaxed">
              Updating this single value will automatically change the active session in:
            </p>
            <ul className="text-xs space-y-2 text-royal-200 pl-4 list-disc">
              <li>Main Homepage Header / Slider</li>
              <li>Admissions popup dialogue box</li>
              <li>Admissions CTA dynamic banners</li>
              <li>Fee Structure page header</li>
              <li>Virtual Chatbot questions & answers</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
