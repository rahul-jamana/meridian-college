import React, { useState } from 'react';
import { updateCredentials } from '../../lib/auth';
import { motion } from 'framer-motion';
import { HiOutlineKey } from 'react-icons/hi';

export default function Settings() {
  const [newId, setNewId] = useState(localStorage.getItem('adminId') || 'meridin college');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword && newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const passToSave = newPassword || localStorage.getItem('adminPass') || 'meridian@123';
    
    updateCredentials(newId, passToSave);
    setMessage('Credentials updated successfully!');
    setNewPassword('');
    setConfirmPassword('');
    
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="p-8 lg:p-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-navy-900">Settings</h1>
        <p className="text-navy-500 mt-2">Update your Admin ID and Password</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6 bg-navy-50 border-b border-navy-100 flex items-center gap-3">
          <HiOutlineKey className="w-6 h-6 text-navy-600" />
          <h2 className="text-lg font-bold text-navy-900">Security Credentials</h2>
        </div>

        <div className="p-8">
          {message && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-200">
              ✅ {message}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-200">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Admin ID</label>
              <input 
                type="text" 
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-royal-500 bg-gray-50"
                required
              />
            </div>
            
            <hr className="border-gray-100" />
            
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">New Password (leave blank to keep current)</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-royal-500 bg-gray-50"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Confirm New Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-royal-500 bg-gray-50"
                placeholder="Confirm new password"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-royal-600 text-white font-bold py-3 rounded-xl hover:bg-royal-700 transition-colors shadow-md shadow-royal-600/20"
            >
              Save Changes
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
