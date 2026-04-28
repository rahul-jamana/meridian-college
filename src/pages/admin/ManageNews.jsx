import React, { useState, useEffect } from 'react';
import { getNews, saveNews, getEvents, saveEvents } from '../../lib/db';
import { motion } from 'framer-motion';
import { HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';

export default function ManageNews() {
  const [activeTab, setActiveTab] = useState('news');
  const [items, setItems] = useState([]);
  const [date, setDate] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setItems(activeTab === 'news' ? getNews() : getEvents());
  }, [activeTab]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!date || !text) return;

    const newItem = { id: Date.now().toString(), date, text };
    const newItems = [...items, newItem];
    setItems(newItems);

    if (activeTab === 'news') {
      saveNews(newItems);
    } else {
      saveEvents(newItems);
    }

    setDate('');
    setText('');
    setMessage('Item added successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDelete = (id) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    
    if (activeTab === 'news') {
      saveNews(newItems);
    } else {
      saveEvents(newItems);
    }
  };

  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-navy-900">Manage Notices & Events</h1>
        <p className="text-navy-500 mt-2">Update the scrolling ticker on the homepage</p>
      </div>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('news')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'news' ? 'bg-royal-600 text-white shadow-lg shadow-royal-600/30' : 'bg-white text-navy-600 border border-gray-200 hover:bg-gray-50'}`}
        >
          Notices
        </button>
        <button 
          onClick={() => setActiveTab('events')}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'events' ? 'bg-royal-600 text-white shadow-lg shadow-royal-600/30' : 'bg-white text-navy-600 border border-gray-200 hover:bg-gray-50'}`}
        >
          Events
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-lg font-bold text-navy-900 mb-4">Add New {activeTab === 'news' ? 'Notice' : 'Event'}</h2>
          
          {message && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm font-medium rounded-lg border border-green-200">
              {message}
            </div>
          )}

          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-1">Date</label>
              <input 
                type="text" 
                placeholder="e.g. 15 Aug 2026"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-royal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-1">Description</label>
              <textarea 
                rows="3"
                placeholder="Enter the notice text..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-navy-200 focus:outline-none focus:ring-2 focus:ring-royal-500 resize-none"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-royal-600 text-white font-bold py-3 rounded-xl hover:bg-royal-700 transition-colors"
            >
              <HiOutlinePlus className="w-5 h-5" /> Add Item
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 bg-navy-50 border-b border-navy-100">
            <h2 className="text-lg font-bold text-navy-900">Current {activeTab === 'news' ? 'Notices' : 'Events'}</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {items.length === 0 ? (
              <div className="p-8 text-center text-navy-400">No items found. Add one!</div>
            ) : (
              items.map((item) => (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={item.id} 
                  className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <span className="inline-block px-2.5 py-1 bg-royal-50 text-royal-600 text-xs font-bold rounded-lg mb-1">
                      {item.date}
                    </span>
                    <p className="text-navy-700 text-sm font-medium">{item.text}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <HiOutlineTrash className="w-5 h-5" />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
