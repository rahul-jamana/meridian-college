import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../lib/auth';
import { motion } from 'framer-motion';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(id, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid ID or Password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-navy-900">Admin Portal</h2>
          <p className="text-navy-500 mt-2">Meridian College Management</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-navy-700 mb-1">Admin ID</label>
            <input 
              type="text" 
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-royal-500"
              placeholder="Enter Admin ID"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-navy-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-royal-500"
              placeholder="Enter Password"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-royal-600 text-white font-bold py-3 rounded-xl hover:bg-royal-700 transition-colors shadow-lg shadow-royal-600/30"
          >
            Login to Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
}
