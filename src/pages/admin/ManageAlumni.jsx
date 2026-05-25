import React, { useState, useEffect, useRef } from 'react';
import { getAlumniTestimonials, saveAlumniTestimonials } from '../../lib/db';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineTrash, HiUpload, HiOutlineLink, HiOutlinePhotograph, HiPlus } from 'react-icons/hi';

// Reusable upload input with toggle between URL and File (same as ManageMedia)
function UploadInput({ label, onReady }) {
  const [mode, setMode] = useState('file'); // 'file' | 'url'
  const [urlVal, setUrlVal] = useState('');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const result = await uploadToCloudinary(file);
      setPreview(result.url);
      onReady(result.url);
    } catch (err) {
      console.error('Cloudinary upload failed:', err);
      setError(err.message || 'Upload failed. Please check Cloudinary credentials.');
    }
    setLoading(false);
  };

  const handleUrl = () => {
    if (!urlVal) return;
    setPreview(urlVal);
    onReady(urlVal);
  };

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider">{label}</label>
      <div className="flex rounded-xl overflow-hidden border border-navy-200 text-sm font-semibold">
        <button
          type="button"
          onClick={() => setMode('file')}
          className={`flex-1 py-2 flex items-center justify-center gap-1.5 transition-colors ${mode === 'file' ? 'bg-royal-600 text-white' : 'bg-white text-navy-600 hover:bg-gray-50'}`}
        >
          <HiUpload className="w-4 h-4" /> Upload
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex-1 py-2 flex items-center justify-center gap-1.5 transition-colors ${mode === 'url' ? 'bg-royal-600 text-white' : 'bg-white text-navy-600 hover:bg-gray-50'}`}
        >
          <HiOutlineLink className="w-4 h-4" /> Paste URL
        </button>
      </div>

      {mode === 'file' && (
        <div
          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${loading ? 'border-amber-400 bg-amber-50' : 'border-royal-300 hover:bg-royal-50'}`}
          onClick={() => !loading && fileRef.current?.click()}
        >
          <HiOutlinePhotograph className="w-8 h-8 text-royal-400 mx-auto mb-2" />
          {loading ? (
            <>
              <p className="text-xs text-amber-700 font-semibold animate-pulse">☁️ Uploading to cloud...</p>
            </>
          ) : (
            <>
              <p className="text-xs text-navy-600 font-medium">Click to select student photo</p>
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>
      )}

      {mode === 'url' && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlVal}
            onChange={(e) => setUrlVal(e.target.value)}
            className="flex-1 px-3 py-1.5 rounded-xl border border-navy-200 focus:ring-2 focus:ring-royal-500 text-xs"
            placeholder="https://..."
          />
          <button
            type="button"
            onClick={handleUrl}
            className="px-3 py-1.5 bg-royal-600 text-white rounded-xl text-xs font-bold hover:bg-royal-700 transition-colors"
          >
            Use
          </button>
        </div>
      )}

      {error && (
        <div className="p-2.5 bg-red-50 text-red-600 rounded-xl text-[10px] font-medium border border-red-200">
          ❌ {error}
        </div>
      )}

      {preview && (
        <div className="mt-2 rounded-xl overflow-hidden border border-navy-100 flex items-center justify-center p-2 bg-navy-50">
          <img src={preview} alt="preview" className="w-16 h-16 rounded-full object-cover shadow-sm border border-white" />
        </div>
      )}
    </div>
  );
}

export default function ManageAlumni() {
  const [alumni, setAlumni] = useState([]);
  const [name, setName] = useState('');
  const [batch, setBatch] = useState('');
  const [feedback, setFeedback] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setAlumni(await getAlumniTestimonials());
    };
    fetchData();
  }, []);

  const showMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddAlumni = (e) => {
    e.preventDefault();
    if (!name || !batch || !feedback) {
      return alert('Please fill in name, batch/course, and feedback text.');
    }
    if (!imageUrl) {
      return alert('Please upload or select an image first.');
    }

    const newItem = {
      id: Date.now().toString(),
      name,
      batch,
      feedback,
      url: imageUrl
    };

    const updated = [...alumni, newItem];
    setAlumni(updated);
    saveAlumniTestimonials(updated);

    setName('');
    setBatch('');
    setFeedback('');
    setImageUrl('');
    showMsg('Alumni review added successfully.');
  };

  const handleDeleteAlumni = (id) => {
    const updated = alumni.filter(item => item.id !== id);
    setAlumni(updated);
    saveAlumniTestimonials(updated);
    showMsg('Alumni review removed.');
  };

  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-navy-900 font-sans">Manage Alumni Corner</h1>
        <p className="text-navy-500 mt-2">Manage student testimonials, reviews, and memories on the Alumni page.</p>
      </div>

      {/* Message Banner */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl text-sm font-semibold border border-green-200"
          >
            ✅ {message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form panel */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit space-y-4">
          <h2 className="text-lg font-bold text-navy-900 border-b border-gray-100 pb-2">Add New Alumnus</h2>
          <form onSubmit={handleAddAlumni} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-1">Student Name</label>
              <input
                type="text"
                placeholder="e.g. Satyajit Patnaik"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-navy-200 focus:ring-2 focus:ring-royal-500 text-sm outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-1">Batch or Course</label>
              <input
                type="text"
                placeholder="e.g. +2 Science, Batch 2022"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-navy-200 focus:ring-2 focus:ring-royal-500 text-sm outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-1">Student Feedback</label>
              <textarea
                placeholder="Write feedback/review text here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 rounded-xl border border-navy-200 focus:ring-2 focus:ring-royal-500 text-sm outline-none resize-none"
                required
              />
            </div>

            <UploadInput
              label="Student Photo"
              onReady={(url) => setImageUrl(url)}
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-royal-600 text-white font-bold py-3 rounded-xl hover:bg-royal-700 transition-colors text-sm shadow-md"
            >
              <HiPlus className="w-4 h-4" /> Add Feedback
            </button>
          </form>
        </div>

        {/* List panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-navy-900 mb-1">Active Alumni Reviews</h2>
            <p className="text-xs text-navy-400 mb-6">These feedbacks will immediately display on the dedicated /alumni page.</p>

            {alumni.length === 0 ? (
              <div className="text-center py-10 text-navy-400 text-sm font-medium">No testimonials found. Add some from the form.</div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4 max-h-[650px] overflow-y-auto pr-1">
                {alumni.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-navy-50/50 rounded-xl p-4 border border-navy-100 flex flex-col justify-between relative group hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <img src={item.url} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-white shadow-sm" />
                        <div>
                          <h4 className="font-bold text-navy-900 text-xs">{item.name}</h4>
                          <p className="text-[10px] text-royal-600 font-semibold">{item.batch}</p>
                        </div>
                      </div>
                      <p className="text-navy-600 text-xs italic leading-relaxed">"{item.feedback}"</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-navy-100/60 flex justify-end">
                      <button
                        onClick={() => handleDeleteAlumni(item.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold flex items-center gap-1 bg-white hover:bg-red-50 px-2.5 py-1 rounded-lg border border-red-100 transition-all shadow-sm"
                      >
                        <HiOutlineTrash className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
