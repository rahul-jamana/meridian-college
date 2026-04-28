import React, { useState, useEffect } from 'react';
import { getFees, saveFees } from '../../lib/db';
import { motion } from 'framer-motion';
import { HiOutlineSave, HiOutlineInformationCircle, HiPlus, HiOutlineTrash } from 'react-icons/hi';

export default function ManageFees() {
  const [fees, setFees] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setFees(getFees());
  }, []);

  const showMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleSave = () => {
    saveFees(fees);
    showMsg('Fee structure updated successfully!');
  };

  const updateCourseField = (id, field, value) => {
    setFees(fees.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const updateYearRow = (courseId, rowIndex, field, value) => {
    setFees(fees.map(f => {
      if (f.id === courseId) {
        const newStructure = [...f.structure];
        newStructure[rowIndex] = { ...newStructure[rowIndex], [field]: value };
        return { ...f, structure: newStructure };
      }
      return f;
    }));
  };

  const addYearRow = (courseId) => {
    setFees(fees.map(f => {
      if (f.id === courseId) {
        return { ...f, structure: [...f.structure, { year: 'New Year', amount: '₹0', note: '' }] };
      }
      return f;
    }));
  };

  const removeYearRow = (courseId, rowIndex) => {
    setFees(fees.map(f => {
      if (f.id === courseId) {
        return { ...f, structure: f.structure.filter((_, i) => i !== rowIndex) };
      }
      return f;
    }));
  };

  const updateFeature = (courseId, featureIndex, value) => {
    setFees(fees.map(f => {
      if (f.id === courseId) {
        const newFeatures = [...f.features];
        newFeatures[featureIndex] = value;
        return { ...f, features: newFeatures };
      }
      return f;
    }));
  };

  const addFeature = (courseId) => {
    setFees(fees.map(f => {
      if (f.id === courseId) {
        return { ...f, features: [...f.features, 'New feature...'] };
      }
      return f;
    }));
  };

  const removeFeature = (courseId, featureIndex) => {
    setFees(fees.map(f => {
      if (f.id === courseId) {
        return { ...f, features: f.features.filter((_, i) => i !== featureIndex) };
      }
      return f;
    }));
  };

  if (!fees) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">Manage Fee Structure</h1>
          <p className="text-navy-500 mt-1">Update course fees and inclusion details.</p>
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

      <div className="grid lg:grid-cols-2 gap-8">
        {fees.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="mb-6">
              <label className="block text-xs font-bold text-navy-400 uppercase tracking-widest mb-2">Course Name</label>
              <input
                type="text"
                value={course.course}
                onChange={(e) => updateCourseField(course.id, 'course', e.target.value)}
                className="text-xl font-bold text-navy-900 w-full outline-none focus:text-royal-600 transition-colors"
              />
              <textarea
                value={course.details}
                onChange={(e) => updateCourseField(course.id, 'details', e.target.value)}
                rows={2}
                className="text-sm text-navy-500 w-full outline-none mt-2 resize-none"
              />
            </div>

            <div className="mb-8 flex-1">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-xs font-bold text-navy-400 uppercase tracking-widest">Pricing Structure</label>
                <button onClick={() => addYearRow(course.id)} className="text-xs font-bold text-royal-600 flex items-center gap-1 hover:underline">
                  <HiPlus /> Add Row
                </button>
              </div>
              <div className="space-y-4">
                {course.structure.map((row, idx) => (
                  <div key={idx} className="flex gap-3 items-start p-3 bg-navy-50 rounded-xl border border-navy-100 group">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={row.year}
                        onChange={(e) => updateYearRow(course.id, idx, 'year', e.target.value)}
                        className="bg-transparent font-bold text-navy-900 w-full outline-none text-sm"
                        placeholder="e.g. 1st Year"
                      />
                      <input
                        type="text"
                        value={row.note}
                        onChange={(e) => updateYearRow(course.id, idx, 'note', e.target.value)}
                        className="bg-transparent text-navy-500 w-full outline-none text-[10px] mt-1"
                        placeholder="e.g. Tuition Fee"
                      />
                    </div>
                    <div className="w-24">
                      <input
                        type="text"
                        value={row.amount}
                        onChange={(e) => updateYearRow(course.id, idx, 'amount', e.target.value)}
                        className="bg-transparent font-bold text-royal-600 w-full outline-none text-right"
                        placeholder="₹0"
                      />
                    </div>
                    <button onClick={() => removeYearRow(course.id, idx)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <HiOutlineTrash />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-xs font-bold text-navy-400 uppercase tracking-widest">Inclusions</label>
                <button onClick={() => addFeature(course.id)} className="text-xs font-bold text-royal-600 flex items-center gap-1 hover:underline">
                  <HiPlus /> Add Item
                </button>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {course.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 group">
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => updateFeature(course.id, idx, e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-transparent hover:border-navy-100 focus:border-royal-500 outline-none text-sm transition-all"
                    />
                    <button onClick={() => removeFeature(course.id, idx)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <HiOutlineTrash size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
