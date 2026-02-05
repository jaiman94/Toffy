import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronDown, Search, X, Camera, ArrowRight } from 'lucide-react';
import { BREEDS, AGES } from '../data/config';

export const PetProfileScreen = ({ onNext, onBack, data, updateData }) => {
  const [name, setName] = useState(data.dogName || '');
  const [breed, setBreed] = useState(data.breed || '');
  const [age, setAge] = useState(data.age || '');
  const [showBreedDropdown, setShowBreedDropdown] = useState(false);
  const [breedSearch, setBreedSearch] = useState('');
  const dropdownRef = useRef(null);

  const isValid = name.trim() && breed && age;

  const filteredBreeds = breedSearch
    ? BREEDS.filter(b => b.toLowerCase().includes(breedSearch.toLowerCase()))
    : BREEDS;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowBreedDropdown(false);
        setBreedSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleContinue = () => {
    if (isValid) {
      updateData({ dogName: name, breed, age });
      onNext();
    }
  };

  return (
    <div className="h-full bg-bg-cream flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </motion.button>

        {/* Labeled progress steps */}
        <div className="flex items-center gap-1.5 text-[11px] font-medium">
          <span className="text-[#E07B39]">Profile</span>
          <span className="text-gray-300">›</span>
          <span className="text-gray-400">Assessment</span>
          <span className="text-gray-300">›</span>
          <span className="text-gray-400">Your plan</span>
        </div>

        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Photo Upload (Optional) */}
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500 mb-3">Got a photo of your pup? (Optional)</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-[#E07B39] hover:bg-orange-50 transition-colors"
            >
              <Camera className="w-6 h-6 text-gray-400" />
            </motion.button>
          </div>

          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              What is your pup's name? *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Max"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm focus:border-[#E07B39] focus:ring-2 focus:ring-[#E07B39]/20 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Breed Dropdown */}
          <div className="space-y-2" ref={dropdownRef}>
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              What breed is {name || 'your dog'}? *
            </label>
            <div className="relative">
              <button
                onClick={() => setShowBreedDropdown(!showBreedDropdown)}
                className={`w-full px-4 py-3 rounded-xl border text-sm text-left flex items-center justify-between transition-all ${
                  showBreedDropdown
                    ? 'border-[#E07B39] ring-2 ring-[#E07B39]/20 bg-white'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <span className={breed ? 'text-gray-800' : 'text-gray-400'}>
                  {breed || 'Start typing the breed name'}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showBreedDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showBreedDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-20 top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden"
                  >
                    {/* Search */}
                    <div className="p-3 border-b border-gray-100">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={breedSearch}
                          onChange={(e) => setBreedSearch(e.target.value)}
                          placeholder="Search breeds..."
                          className="w-full pl-9 pr-9 py-2 text-sm rounded-lg bg-gray-50 border-0 focus:ring-0"
                          autoFocus
                        />
                        {breedSearch && (
                          <button
                            onClick={() => setBreedSearch('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <X className="w-4 h-4 text-gray-400" />
                          </button>
                        )}
                      </div>
                    </div>
                    {/* Options */}
                    <div className="max-h-48 overflow-y-auto">
                      {filteredBreeds.map((b) => (
                        <button
                          key={b}
                          onClick={() => {
                            setBreed(b);
                            setShowBreedDropdown(false);
                            setBreedSearch('');
                          }}
                          className={`w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${
                            breed === b ? 'bg-orange-50 text-[#E07B39]' : 'text-gray-700'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                      {filteredBreeds.length === 0 && (
                        <p className="px-4 py-3 text-sm text-gray-400">No breeds found</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Age Chips */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              How old is {name || 'your dog'}? *
            </label>
            <div className="flex flex-wrap gap-2">
              {AGES.map((ageOption) => (
                <motion.button
                  key={ageOption.value}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAge(ageOption.value)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
                    age === ageOption.value
                      ? 'bg-[#E07B39] text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-[#E07B39]/50 hover:bg-orange-50/50'
                  }`}
                >
                  {ageOption.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 space-y-3">
        {isValid && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-xl">🐕</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{name}</p>
                <p className="text-xs text-gray-500">{breed} • {AGES.find(a => a.value === age)?.label}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-[#E07B39]" />
            </div>
            <p className="text-xs text-gray-400 mt-2">Next: 2-minute behavioral assessment</p>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: isValid ? 1.02 : 1 }}
          whileTap={{ scale: isValid ? 0.98 : 1 }}
          onClick={handleContinue}
          disabled={!isValid}
          className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all ${
            isValid
              ? 'bg-[#E07B39] text-white hover:bg-[#C86A2E] shadow-sm'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
};

export default PetProfileScreen;
