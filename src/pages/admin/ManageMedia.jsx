import React, { useState, useEffect, useRef } from 'react';
import { getHeroMedia, saveHeroMedia, getGallery, saveGallery, getAboutImage, saveAboutImage, getGallerySettings, saveGallerySettings, getHomepageGallery, saveHomepageGallery, getAchievers, saveAchievers, getAchieversSettings, saveAchieversSettings } from '../../lib/db';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineTrash, HiOutlinePhotograph, HiOutlineLink, HiUpload } from 'react-icons/hi';

// Helper: read a File as a base64 data URL
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Reusable upload input with toggle between URL and File
function UploadInput({ label, onReady, accept = 'image/*', allowVideo = false }) {
  const [mode, setMode] = useState('file'); // 'file' | 'url'
  const [urlVal, setUrlVal] = useState('');
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const dataUrl = await readFileAsDataURL(file);
      setPreview(dataUrl);
      onReady(dataUrl, file.type.startsWith('video') ? 'video' : 'image');
    } catch {
      alert('Failed to read file.');
    }
    setLoading(false);
  };

  const handleUrl = () => {
    if (!urlVal) return;
    const isVideo = urlVal.match(/\.(mp4|webm|ogg)$/i);
    setPreview(urlVal);
    onReady(urlVal, isVideo ? 'video' : 'image');
  };

  return (
    <div className="space-y-3">
      {/* Toggle */}
      <div className="flex rounded-xl overflow-hidden border border-navy-200 text-sm font-semibold">
        <button
          type="button"
          onClick={() => setMode('file')}
          className={`flex-1 py-2 flex items-center justify-center gap-1.5 transition-colors ${mode === 'file' ? 'bg-royal-600 text-white' : 'bg-white text-navy-600 hover:bg-gray-50'}`}
        >
          <HiUpload className="w-4 h-4" /> Upload from Device
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`flex-1 py-2 flex items-center justify-center gap-1.5 transition-colors ${mode === 'url' ? 'bg-royal-600 text-white' : 'bg-white text-navy-600 hover:bg-gray-50'}`}
        >
          <HiOutlineLink className="w-4 h-4" /> Paste URL
        </button>
      </div>

      {/* File mode */}
      {mode === 'file' && (
        <div
          className="border-2 border-dashed border-royal-300 rounded-xl p-6 text-center cursor-pointer hover:bg-royal-50 transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          <HiOutlinePhotograph className="w-10 h-10 text-royal-400 mx-auto mb-2" />
          <p className="text-sm text-navy-600 font-medium">Click to select a file from your laptop</p>
          <p className="text-xs text-navy-400 mt-1">{allowVideo ? 'JPG, PNG, MP4 supported' : 'JPG, PNG, WEBP supported'}</p>
          {loading && <p className="text-xs text-royal-500 mt-2 animate-pulse">Processing...</p>}
          <input
            ref={fileRef}
            type="file"
            accept={allowVideo ? 'image/*,video/*' : 'image/*'}
            className="hidden"
            onChange={handleFile}
          />
        </div>
      )}

      {/* URL mode */}
      {mode === 'url' && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlVal}
            onChange={(e) => setUrlVal(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-navy-200 focus:ring-2 focus:ring-royal-500 text-sm"
            placeholder="https://res.cloudinary.com/..."
          />
          <button
            type="button"
            onClick={handleUrl}
            className="px-4 py-2 bg-royal-600 text-white rounded-xl text-sm font-bold hover:bg-royal-700 transition-colors"
          >
            Use
          </button>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="mt-2 rounded-xl overflow-hidden border border-navy-100">
          {preview.startsWith('data:video') || preview.match(/\.(mp4|webm)$/i) ? (
            <video src={preview} className="w-full h-32 object-cover" muted />
          ) : (
            <img src={preview} alt="preview" className="w-full h-32 object-cover" />
          )}
          <p className="text-xs text-green-600 font-semibold text-center py-1.5 bg-green-50">✅ Ready to add</p>
        </div>
      )}
    </div>
  );
}

export default function ManageMedia() {
  const [activeTab, setActiveTab] = useState('homepage-gallery');
  const [heroItems, setHeroItems] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [homepageGalleryItems, setHomepageGalleryItems] = useState([]);
  const [achievers, setAchievers] = useState([]);
  const [aboutImg, setAboutImg] = useState('');
  const [message, setMessage] = useState('');
  const [gallerySettings, setGallerySettings] = useState({ label: 'Campus Life', heading: 'Campus Gallery', tagline: 'Real moments from Meridian College — our students, faculty, labs, and events' });
  const [achieversSettings, setAchieversSettings] = useState({ label: 'Student Success', heading: 'Our Achievers', tagline: 'Celebrating the outstanding accomplishments of Meridian students.' });

  // Pending media ready to be added
  const [heroReady, setHeroReady] = useState({ url: '', type: 'image' });
  const [galleryReady, setGalleryReady] = useState({ url: '', type: 'image' });
  const [homepageGalleryReady, setHomepageGalleryReady] = useState({ url: '', type: 'image' });
  const [achieverReady, setAchieverReady] = useState('');
  const [achieverName, setAchieverName] = useState('');
  const [achieverTitle, setAchieverTitle] = useState('');
  const [achieverDesc, setAchieverDesc] = useState('');
  
  const [galleryCategory, setGalleryCategory] = useState('Campus');
  const [homepageGalleryCategory, setHomepageGalleryCategory] = useState('Campus');
  const [aboutReady, setAboutReady] = useState('');

  useEffect(() => {
    setHeroItems(getHeroMedia());
    setGalleryItems(getGallery());
    setHomepageGalleryItems(getHomepageGallery());
    setAchievers(getAchievers());
    setAboutImg(getAboutImage());
    setGallerySettings(getGallerySettings());
    setAchieversSettings(getAchieversSettings());
  }, []);

  const showMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  /* ---- HERO ---- */
  const handleAddHero = () => {
    if (!heroReady.url) return alert('Please upload or paste an image/video URL first.');
    const newItem = { id: Date.now().toString(), type: heroReady.type, url: heroReady.url };
    const updated = [...heroItems, newItem];
    setHeroItems(updated);
    saveHeroMedia(updated);
    setHeroReady({ url: '', type: 'image' });
    showMsg('Hero background added!');
  };

  const handleDeleteHero = (id) => {
    const updated = heroItems.filter(i => i.id !== id);
    setHeroItems(updated);
    saveHeroMedia(updated);
  };

  /* ---- GALLERY ---- */
  const handleAddGallery = () => {
    if (!galleryReady.url) return alert('Please upload or paste an image URL first.');
    const newItem = { id: Date.now().toString(), category: galleryCategory, url: galleryReady.url, type: 'image' };
    const updated = [...galleryItems, newItem];
    setGalleryItems(updated);
    saveGallery(updated);
    setGalleryReady({ url: '', type: 'image' });
    showMsg('Gallery photo added!');
  };

  const handleDeleteGallery = (id) => {
    const updated = galleryItems.filter(i => i.id !== id);
    setGalleryItems(updated);
    saveGallery(updated);
  };

  /* ---- HOMEPAGE GALLERY ---- */
  const handleAddHomepageGallery = () => {
    if (!homepageGalleryReady.url) return alert('Please upload or paste an image URL first.');
    const newItem = { id: Date.now().toString(), category: homepageGalleryCategory, url: homepageGalleryReady.url, type: 'image' };
    const updated = [...homepageGalleryItems, newItem];
    setHomepageGalleryItems(updated);
    saveHomepageGallery(updated);
    setHomepageGalleryReady({ url: '', type: 'image' });
    showMsg('Main page gallery photo added!');
  };

  const handleDeleteHomepageGallery = (id) => {
    const updated = homepageGalleryItems.filter(i => i.id !== id);
    setHomepageGalleryItems(updated);
    saveHomepageGallery(updated);
  };

  /* ---- ACHIEVERS ---- */
  const handleAddAchiever = () => {
    if (!achieverReady) return alert('Please upload or paste an image URL first.');
    if (!achieverName || !achieverTitle || !achieverDesc) return alert('Please enter name, title, and description.');
    const newItem = { id: Date.now().toString(), name: achieverName, title: achieverTitle, description: achieverDesc, url: achieverReady };
    const updated = [...achievers, newItem];
    setAchievers(updated);
    saveAchievers(updated);
    setAchieverReady('');
    setAchieverName('');
    setAchieverTitle('');
    setAchieverDesc('');
    showMsg('Achiever added successfully!');
  };

  const handleDeleteAchiever = (id) => {
    const updated = achievers.filter(i => i.id !== id);
    setAchievers(updated);
    saveAchievers(updated);
  };

  const handleSaveAchieversSettings = (e) => {
    e.preventDefault();
    saveAchieversSettings(achieversSettings);
    showMsg('Achievers text updated!');
  };

  /* ---- ABOUT IMAGE ---- */
  const handleSaveAbout = () => {
    if (!aboutReady) return alert('Please upload or paste an image URL first.');
    saveAboutImage(aboutReady);
    setAboutImg(aboutReady);
    setAboutReady('');
    showMsg('About section image updated!');
  };

  const handleSaveGallerySettings = (e) => {
    e.preventDefault();
    saveGallerySettings(gallerySettings);
    showMsg('Gallery heading and tagline updated!');
  };

  const tabs = [
    { id: 'homepage-gallery', label: '🏠 Main Page Gallery' },
    { id: 'gallery', label: '📸 Full Gallery (Normal)' },
    { id: 'achievers', label: '🏆 Our Achievers' },
    { id: 'gallery-settings', label: '✏️ Gallery Settings' },
    { id: 'hero', label: '🖼️ Hero Backgrounds' },
    { id: 'about', label: '🏫 About Image' },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy-900">Manage Media</h1>
        <p className="text-navy-500 mt-1">Upload images from your laptop or paste a URL to update the website.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === tab.id ? 'bg-royal-600 text-white shadow-lg shadow-royal-600/30' : 'bg-white text-navy-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Success message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl text-sm font-medium border border-green-200"
          >
            ✅ {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== HOMEPAGE GALLERY ===== */}
      {activeTab === 'homepage-gallery' && (
        <div>
          <div className="grid lg:grid-cols-3 gap-8 mb-10">
            {/* Upload Panel */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
              <div>
                <h2 className="text-lg font-bold text-navy-900">Add to Main Page Gallery</h2>
                <p className="text-xs text-navy-400 mt-0.5">Images shown in the preview gallery section directly on the homepage.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-1">Category</label>
                <select
                  value={homepageGalleryCategory}
                  onChange={(e) => setHomepageGalleryCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-navy-200 focus:ring-2 focus:ring-royal-500 text-sm"
                >
                  <option value="Campus">Campus</option>
                  <option value="Students">Students</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Lab">Lab</option>
                  <option value="Classroom">Classroom</option>
                  <option value="Cultural">Cultural & Events</option>
                  <option value="Sports">Sports</option>
                  <option value="Hostel">Hostel</option>
                </select>
              </div>

              <UploadInput
                label="Gallery Image"
                onReady={(url, type) => setHomepageGalleryReady({ url, type })}
              />

              <button
                onClick={handleAddHomepageGallery}
                className="w-full bg-royal-600 text-white font-bold py-3 rounded-xl hover:bg-royal-700 transition-colors"
              >
                + Add to Main Page Gallery
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="lg:col-span-2">
              <p className="text-sm text-navy-500 mb-4 font-medium">{homepageGalleryItems.length} photos on the main page</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-1">
                {homepageGalleryItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 relative group aspect-square"
                  >
                    <img src={item.url} className="w-full h-full object-cover" alt="Gallery" loading="lazy" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                      <span className="text-white text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">{item.category}</span>
                      <button
                        onClick={() => handleDeleteHomepageGallery(item.id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs font-semibold flex items-center gap-1"
                      >
                        <HiOutlineTrash className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== ACHIEVERS ===== */}
      {activeTab === 'achievers' && (
        <div>
          <div className="grid lg:grid-cols-3 gap-8 mb-10">
            {/* Upload Panel */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
              <div>
                <h2 className="text-lg font-bold text-navy-900">Add an Achiever</h2>
                <p className="text-xs text-navy-400 mt-0.5">Upload a photo and enter their name, achievement, and description.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-1">Student Name</label>
                <input
                  type="text"
                  value={achieverName}
                  onChange={(e) => setAchieverName(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-navy-200 focus:ring-2 focus:ring-royal-500 text-sm"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-1">Achievement Title</label>
                <input
                  type="text"
                  value={achieverTitle}
                  onChange={(e) => setAchieverTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-navy-200 focus:ring-2 focus:ring-royal-500 text-sm"
                  placeholder="e.g. Top Scorer - Science (98%)"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-1">Short Description</label>
                <textarea
                  value={achieverDesc}
                  onChange={(e) => setAchieverDesc(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 rounded-xl border border-navy-200 focus:ring-2 focus:ring-royal-500 text-sm resize-none"
                  placeholder="e.g. Rahul achieved the highest aggregate score in the state board examinations..."
                />
              </div>

              <UploadInput
                label="Achiever Photo"
                onReady={(url, type) => setAchieverReady(url)}
              />

              <button
                onClick={handleAddAchiever}
                className="w-full bg-royal-600 text-white font-bold py-3 rounded-xl hover:bg-royal-700 transition-colors"
              >
                + Add Achiever
              </button>
            </div>

            {/* Achievers Grid */}
            <div className="lg:col-span-2">
              <p className="text-sm text-navy-500 mb-4 font-medium">{achievers.length} achievers in the list</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-1">
                {achievers.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 relative group flex"
                  >
                    <div className="w-1/3 aspect-[4/5] flex-shrink-0">
                      <img src={item.url} className="w-full h-full object-cover" alt={item.name} loading="lazy" />
                    </div>
                    <div className="p-4 flex-grow">
                      <p className="font-bold text-navy-900 text-sm">{item.name}</p>
                      <p className="text-xs text-royal-600 font-semibold mb-2">{item.title}</p>
                      <p className="text-xs text-navy-500 line-clamp-3">{item.description}</p>
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-3">
                      <button
                        onClick={() => handleDeleteAchiever(item.id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs font-semibold flex items-center gap-1"
                      >
                        <HiOutlineTrash className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Achievers Settings (Heading/Tagline) */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mt-8">
            <h2 className="text-xl font-bold text-navy-900 mb-1">✏️ Achievers Section Text</h2>
            <p className="text-sm text-navy-400 mb-8">
              Change the heading, label, and tagline that appear above the Our Achievers section.
            </p>

            <form onSubmit={handleSaveAchieversSettings} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-navy-700 mb-2">Small Label</label>
                <input
                  type="text"
                  value={achieversSettings.label}
                  onChange={(e) => setAchieversSettings({ ...achieversSettings, label: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm outline-none"
                  placeholder="e.g. Student Success"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy-700 mb-2">Main Heading</label>
                <input
                  type="text"
                  value={achieversSettings.heading}
                  onChange={(e) => setAchieversSettings({ ...achieversSettings, heading: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm outline-none"
                  placeholder="e.g. Our Achievers"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy-700 mb-2">Tagline / Subtitle</label>
                <textarea
                  value={achieversSettings.tagline}
                  onChange={(e) => setAchieversSettings({ ...achieversSettings, tagline: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-navy-200 text-sm outline-none resize-none"
                  placeholder="e.g. Celebrating the outstanding accomplishments..."
                />
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-royal-500 to-royal-600 text-white font-bold rounded-xl text-sm">
                  ✅ Save Achievers Text
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== FULL CAMPUS GALLERY ===== */}
      {activeTab === 'gallery' && (
        <div>
          <div className="grid lg:grid-cols-3 gap-8 mb-10">
            {/* Upload Panel */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
              <div>
                <h2 className="text-lg font-bold text-navy-900">Add to Full Gallery</h2>
                <p className="text-xs text-navy-400 mt-0.5">Real moments shown on the dedicated /gallery page.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-navy-700 mb-1">Category</label>
                <select
                  value={galleryCategory}
                  onChange={(e) => setGalleryCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-navy-200 focus:ring-2 focus:ring-royal-500 text-sm"
                >
                  <option value="Campus">Campus</option>
                  <option value="Students">Students</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Lab">Lab</option>
                  <option value="Classroom">Classroom</option>
                  <option value="Cultural">Cultural & Events</option>
                  <option value="Sports">Sports</option>
                  <option value="Hostel">Hostel</option>
                </select>
              </div>

              <UploadInput
                label="Gallery Image"
                onReady={(url, type) => setGalleryReady({ url, type })}
              />

              <button
                onClick={handleAddGallery}
                className="w-full bg-royal-600 text-white font-bold py-3 rounded-xl hover:bg-royal-700 transition-colors"
              >
                + Add to Gallery
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="lg:col-span-2">
              <p className="text-sm text-navy-500 mb-4 font-medium">{galleryItems.length} photos in full gallery</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-1">
                {galleryItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 relative group aspect-square"
                  >
                    <img src={item.url} className="w-full h-full object-cover" alt="Gallery" loading="lazy" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                      <span className="text-white text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full">{item.category}</span>
                      <button
                        onClick={() => handleDeleteGallery(item.id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs font-semibold flex items-center gap-1"
                      >
                        <HiOutlineTrash className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery Text Settings */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-2">
            <h2 className="text-lg font-bold text-navy-900 mb-1">✏️ Gallery Section Text</h2>
            <p className="text-sm text-navy-400 mb-5">Change the heading and tagline shown above the gallery on the website.</p>
            <form onSubmit={handleSaveGallerySettings} className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-600 mb-1 uppercase tracking-wider">Small Label <span className="text-navy-400 normal-case">(e.g. "Campus Life")</span></label>
                <input
                  type="text"
                  value={gallerySettings.label}
                  onChange={(e) => setGallerySettings({ ...gallerySettings, label: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-navy-200 focus:ring-2 focus:ring-royal-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy-600 mb-1 uppercase tracking-wider">Main Heading <span className="text-navy-400 normal-case">(e.g. "Campus Gallery")</span></label>
                <input
                  type="text"
                  value={gallerySettings.heading}
                  onChange={(e) => setGallerySettings({ ...gallerySettings, heading: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-navy-200 focus:ring-2 focus:ring-royal-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy-600 mb-1 uppercase tracking-wider">Tagline / Subtitle</label>
                <input
                  type="text"
                  value={gallerySettings.tagline}
                  onChange={(e) => setGallerySettings({ ...gallerySettings, tagline: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-navy-200 focus:ring-2 focus:ring-royal-500 text-sm"
                />
              </div>
              <div className="sm:col-span-3">
                <button type="submit" className="px-8 py-2.5 bg-royal-600 text-white font-bold rounded-xl hover:bg-royal-700 transition-colors text-sm">
                  Save Gallery Text
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== GALLERY SETTINGS ===== */}
      {activeTab === 'gallery-settings' && (
        <div className="max-w-2xl">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-navy-900 mb-1">✏️ Gallery Section Text</h2>
            <p className="text-sm text-navy-400 mb-8">
              Change the heading, label, and tagline that appear above the Campus Gallery section on the main website.
            </p>

            <form onSubmit={handleSaveGallerySettings} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-navy-700 mb-2">
                  Small Label <span className="text-navy-400 font-normal">(shown in blue above the heading)</span>
                </label>
                <input
                  type="text"
                  value={gallerySettings.label}
                  onChange={(e) => setGallerySettings({ ...gallerySettings, label: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:ring-2 focus:ring-royal-500 focus:border-royal-400 text-sm outline-none transition-all"
                  placeholder="e.g. Campus Life"
                />
                <p className="text-xs text-navy-400 mt-1">Currently shows: <strong className="text-royal-600">{gallerySettings.label}</strong></p>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy-700 mb-2">
                  Main Heading <span className="text-navy-400 font-normal">(big bold title)</span>
                </label>
                <input
                  type="text"
                  value={gallerySettings.heading}
                  onChange={(e) => setGallerySettings({ ...gallerySettings, heading: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:ring-2 focus:ring-royal-500 focus:border-royal-400 text-sm outline-none transition-all"
                  placeholder="e.g. Campus Gallery"
                />
                <p className="text-xs text-navy-400 mt-1">Currently shows: <strong className="text-navy-700">{gallerySettings.heading}</strong></p>
              </div>

              <div>
                <label className="block text-sm font-bold text-navy-700 mb-2">
                  Tagline / Subtitle <span className="text-navy-400 font-normal">(description text below heading)</span>
                </label>
                <textarea
                  value={gallerySettings.tagline}
                  onChange={(e) => setGallerySettings({ ...gallerySettings, tagline: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-navy-200 focus:ring-2 focus:ring-royal-500 focus:border-royal-400 text-sm outline-none transition-all resize-none"
                  placeholder="e.g. Real moments from Meridian College..."
                />
                <p className="text-xs text-navy-400 mt-1">Currently shows: <em className="text-navy-500">{gallerySettings.tagline}</em></p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-royal-500 to-royal-600 text-white font-bold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm"
                >
                  ✅ Save Gallery Text
                </button>
              </div>
            </form>
          </div>

          {/* Live Preview */}
          <div className="mt-6 bg-navy-50 rounded-2xl p-6 border border-navy-100">
            <p className="text-xs font-bold text-navy-500 uppercase tracking-wider mb-4">Live Preview (how it looks on website)</p>
            <div className="text-center">
              <span className="inline-block text-royal-600 font-semibold text-xs tracking-wider uppercase mb-2">{gallerySettings.label}</span>
              <h3 className="text-2xl font-bold text-navy-800 mb-2">
                {gallerySettings.heading.split(' ')[0]}{' '}
                <span className="text-royal-600">{gallerySettings.heading.split(' ').slice(1).join(' ')}</span>
              </h3>
              <p className="text-navy-500 text-sm max-w-sm mx-auto">{gallerySettings.tagline}</p>
            </div>
          </div>
        </div>
      )}

      {/* ===== HERO BACKGROUNDS ===== */}
      {activeTab === 'hero' && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-navy-900">Add Hero Background</h2>
              <p className="text-xs text-navy-400 mt-0.5">Images and videos shown in the main hero slider on the homepage.</p>
            </div>

            <UploadInput
              label="Hero Media"
              allowVideo={true}
              onReady={(url, type) => setHeroReady({ url, type })}
            />

            <button
              onClick={handleAddHero}
              className="w-full bg-royal-600 text-white font-bold py-3 rounded-xl hover:bg-royal-700 transition-colors"
            >
              + Add to Hero Slider
            </button>
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {heroItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative group"
              >
                <div className="h-40 bg-gray-100 relative">
                  {item.type === 'video' ? (
                    <video src={item.url} className="w-full h-full object-cover" muted />
                  ) : (
                    <img src={item.url} className="w-full h-full object-cover" alt="Hero" loading="lazy" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleDeleteHero(item.id)}
                      className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-transform hover:scale-110 shadow-lg"
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${item.type === 'video' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                    {item.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ===== ABOUT IMAGE ===== */}
      {activeTab === 'about' && (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-5">
            <div>
              <h2 className="text-lg font-bold text-navy-900">About Section Image</h2>
              <p className="text-sm text-navy-500">This image appears in the <strong>About Us</strong> section on the main homepage.</p>
            </div>

            <UploadInput
              label="About Image"
              onReady={(url) => setAboutReady(url)}
            />

            <button
              onClick={handleSaveAbout}
              className="w-full bg-royal-600 text-white font-bold py-3 rounded-xl hover:bg-royal-700 transition-colors"
            >
              Update About Image
            </button>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-navy-700 mb-3">Current Image on Website</h3>
            {aboutImg ? (
              <img src={aboutImg} alt="About section" className="w-full h-72 object-cover rounded-xl" />
            ) : (
              <div className="w-full h-72 bg-gray-100 rounded-xl flex items-center justify-center text-navy-400 text-sm">
                No image set
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
