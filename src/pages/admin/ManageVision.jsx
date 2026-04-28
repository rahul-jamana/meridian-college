import React, { useState, useEffect } from 'react';
import { getVisionMission, saveVisionMission } from '../../lib/db';
import { motion } from 'framer-motion';
import { HiOutlineSave, HiOutlineInformationCircle, HiPlus, HiOutlineTrash, HiUpload } from 'react-icons/hi';

export default function ManageVision() {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setData(getVisionMission());
  }, []);

  const showMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };
  const handleFileUpload = (e, section, field) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      alert('Image size is too large (Max 1.5MB). Please use a smaller image or a URL for better performance.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      updateNested(section, field, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDeepFileUpload = (e, section, subSection, field) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      alert('Image size is too large (Max 1.5MB). Please use a smaller image or a URL.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      updateDeepNested(section, subSection, field, reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleSave = () => {
    saveVisionMission(data);
    showMsg('Vision & Mission updated successfully!');
  };

  const updateNested = (section, field, value) => {
    setData({
      ...data,
      [section]: {
        ...data[section],
        [field]: value
      }
    });
  };

  const updateDeepNested = (section, subSection, field, value) => {
    setData({
      ...data,
      [section]: {
        ...data[section],
        [subSection]: {
          ...data[section][subSection],
          [field]: value
        }
      }
    });
  };

  const addPoint = () => {
    const newPoints = [...data.treatment.points, 'New point...'];
    updateNested('treatment', 'points', newPoints);
  };

  const removePoint = (index) => {
    const newPoints = data.treatment.points.filter((_, i) => i !== index);
    updateNested('treatment', 'points', newPoints);
  };

  const updatePoint = (index, value) => {
    const newPoints = [...data.treatment.points];
    newPoints[index] = value;
    updateNested('treatment', 'points', newPoints);
  };

  const updateExpectation = (index, field, value) => {
    const newItems = [...data.expectations.items];
    newItems[index] = { ...newItems[index], [field]: value };
    updateNested('expectations', 'items', newItems);
  };

  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">Manage Vision & Mission</h1>
          <p className="text-navy-500 mt-1">Edit the content of your Vision & Mission page.</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-royal-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-royal-700 transition-all shadow-lg shadow-royal-600/20"
        >
          <HiOutlineSave className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 text-green-700 p-4 rounded-xl mb-8 font-semibold flex items-center gap-2 border border-green-200"
        >
          <HiOutlineInformationCircle className="w-5 h-5" />
          {message}
        </motion.div>
      )}

      <div className="space-y-8 pb-20">
        {/* Hero Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2 border-b pb-4">
            <span className="w-8 h-8 bg-royal-50 text-royal-600 rounded-lg flex items-center justify-center text-sm">1</span>
            Hero Section
          </h2>
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-bold text-navy-700 mb-2">Small Label</label>
              <input
                type="text"
                value={data.hero.label}
                onChange={(e) => updateNested('hero', 'label', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-navy-100 outline-none focus:border-royal-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy-700 mb-2">Page Title</label>
              <input
                type="text"
                value={data.hero.title}
                onChange={(e) => updateNested('hero', 'title', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-navy-100 outline-none focus:border-royal-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy-700 mb-2">Tagline</label>
              <textarea
                value={data.hero.tagline}
                onChange={(e) => updateNested('hero', 'tagline', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-navy-100 outline-none focus:border-royal-500 transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy-700 mb-2">Background Image</label>
              <div className="flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                  <p className="text-[10px] text-navy-400 font-bold uppercase mb-2">Option A: Paste Image URL</p>
                  <input
                    type="text"
                    value={data.hero.image}
                    onChange={(e) => updateNested('hero', 'image', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-navy-100 outline-none focus:border-royal-500 transition-colors text-sm"
                    placeholder="Enter image URL..."
                  />
                </div>
                <div className="flex-shrink-0">
                  <p className="text-[10px] text-navy-400 font-bold uppercase mb-2">Option B: Upload from PC</p>
                  <label className="flex items-center gap-2 bg-navy-50 text-navy-700 px-4 py-3 rounded-xl font-bold cursor-pointer hover:bg-navy-100 transition-all border border-navy-100">
                    <HiUpload className="w-5 h-5" />
                    Upload Image
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'hero', 'image')} />
                  </label>
                </div>
                {data.hero.image && (
                  <button 
                    onClick={() => updateNested('hero', 'image', '')}
                    className="px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors border border-transparent"
                  >
                    Remove
                  </button>
                )}
              </div>
              {data.hero.image && (
                <div className="mt-4 relative w-64 h-36 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                  <img src={data.hero.image} alt="Hero Preview" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
                    Preview
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Treatment Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2 border-b pb-4">
            <span className="w-8 h-8 bg-royal-50 text-royal-600 rounded-lg flex items-center justify-center text-sm">2</span>
            How We Treat Students
          </h2>
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-navy-700 mb-2">Small Label</label>
                <input
                  type="text"
                  value={data.treatment.label}
                  onChange={(e) => updateNested('treatment', 'label', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-navy-100 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy-700 mb-2">Section Title</label>
                <input
                  type="text"
                  value={data.treatment.title}
                  onChange={(e) => updateNested('treatment', 'title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-navy-100 outline-none"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-navy-700 mb-2">Main Content</label>
                <textarea
                  value={data.treatment.content}
                  onChange={(e) => updateNested('treatment', 'content', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-navy-100 outline-none resize-none h-[calc(100%-2rem)]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy-700 mb-2">Mentorship Image</label>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={data.treatment.image}
                      onChange={(e) => updateNested('treatment', 'image', e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-navy-100 outline-none text-sm"
                      placeholder="Paste Image URL..."
                    />
                    <label className="flex items-center justify-center bg-navy-50 text-navy-700 p-3 rounded-xl font-bold cursor-pointer hover:bg-navy-100 transition-all border border-navy-100 shadow-sm" title="Upload from PC">
                      <HiUpload className="w-5 h-5" />
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'treatment', 'image')} />
                    </label>
                    {data.treatment.image && (
                      <button 
                        onClick={() => updateNested('treatment', 'image', '')}
                        className="p-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors border border-transparent"
                        title="Remove Image"
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  {data.treatment.image && (
                    <div className="w-full h-40 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                      <img src={data.treatment.image} alt="Mentorship Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-navy-700 mb-3">Bullet Points</label>
              <div className="space-y-3">
                {data.treatment.points.map((point, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => updatePoint(idx, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-navy-100 outline-none"
                    />
                    <button
                      onClick={() => removePoint(idx)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addPoint}
                  className="flex items-center gap-2 text-royal-600 font-bold text-sm hover:underline"
                >
                  <HiPlus className="w-4 h-4" /> Add Point
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Expectations Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2 border-b pb-4">
            <span className="w-8 h-8 bg-royal-50 text-royal-600 rounded-lg flex items-center justify-center text-sm">3</span>
            What We Expect From You
          </h2>
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-bold text-navy-700 mb-2">Section Title</label>
              <input
                type="text"
                value={data.expectations.title}
                onChange={(e) => updateNested('expectations', 'title', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-navy-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy-700 mb-2">Main Content</label>
              <textarea
                value={data.expectations.content}
                onChange={(e) => updateNested('expectations', 'content', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-navy-100 outline-none resize-none"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {data.expectations.items.map((item, idx) => (
                <div key={idx} className="p-4 bg-navy-50 rounded-xl border border-navy-100">
                  <div className="mb-4">
                    <label className="block text-[10px] font-bold text-navy-400 uppercase tracking-wider mb-1">Card {idx + 1} Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateExpectation(idx, 'title', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-navy-100 outline-none text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-navy-400 uppercase tracking-wider mb-1">Card {idx + 1} Description</label>
                    <textarea
                      value={item.desc}
                      onChange={(e) => updateExpectation(idx, 'desc', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg border border-navy-100 outline-none text-sm resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transformation Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center gap-2 border-b pb-4">
            <span className="w-8 h-8 bg-royal-50 text-royal-600 rounded-lg flex items-center justify-center text-sm">4</span>
            The Complete Transformation
          </h2>
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-bold text-navy-700 mb-2">Section Title</label>
              <input
                type="text"
                value={data.transformation.title}
                onChange={(e) => updateNested('transformation', 'title', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-navy-100 outline-none"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-navy-700 mb-2">Content Paragraph 1</label>
                <textarea
                  value={data.transformation.content1}
                  onChange={(e) => updateNested('transformation', 'content1', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-navy-100 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy-700 mb-2">Content Paragraph 2</label>
                <textarea
                  value={data.transformation.content2}
                  onChange={(e) => updateNested('transformation', 'content2', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-navy-100 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy-700 mb-2">Transformation Image</label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={data.transformation.image}
                      onChange={(e) => updateNested('transformation', 'image', e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl border border-navy-100 outline-none text-xs"
                      placeholder="Image URL..."
                    />
                    <label className="flex items-center justify-center bg-navy-50 text-navy-700 p-2 rounded-xl font-bold cursor-pointer hover:bg-navy-100 transition-all border border-navy-100" title="Upload from PC">
                      <HiUpload className="w-4 h-4" />
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'transformation', 'image')} />
                    </label>
                    {data.transformation.image && (
                      <button 
                        onClick={() => updateNested('transformation', 'image', '')}
                        className="p-2 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors border border-transparent"
                        title="Remove"
                      >
                        <HiOutlineTrash className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {data.transformation.image && (
                    <div className="w-full h-24 rounded-xl overflow-hidden border-2 border-white shadow-md">
                      <img src={data.transformation.image} alt="Transformation Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-royal-50/50 rounded-2xl border border-royal-100">
                <p className="text-[10px] font-bold text-royal-600 uppercase mb-3">Blue Card</p>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={data.transformation.card1.title}
                    onChange={(e) => updateDeepNested('transformation', 'card1', 'title', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-royal-100 outline-none font-bold"
                  />
                  <textarea
                    value={data.transformation.card1.desc}
                    onChange={(e) => updateDeepNested('transformation', 'card1', 'desc', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-royal-100 outline-none text-sm resize-none"
                  />
                </div>
              </div>
              <div className="p-5 bg-gold-50/50 rounded-2xl border border-gold-100">
                <p className="text-[10px] font-bold text-gold-600 uppercase mb-3">Gold Card</p>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={data.transformation.card2.title}
                    onChange={(e) => updateDeepNested('transformation', 'card2', 'title', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gold-100 outline-none font-bold"
                  />
                  <textarea
                    value={data.transformation.card2.desc}
                    onChange={(e) => updateDeepNested('transformation', 'card2', 'desc', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gold-100 outline-none text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
