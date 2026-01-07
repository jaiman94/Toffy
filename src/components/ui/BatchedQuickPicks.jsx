import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint, Check, ChevronDown, Search, X } from 'lucide-react';

export const BatchedQuickPicks = ({
  title = "Quick intro to your dog:",
  fields = [],
  /*
    Field types:
    - { type: 'text', id: 'name', label: 'Name', placeholder: 'e.g., Max' }
    - { type: 'dropdown', id: 'breed', label: 'Breed', options: ['Golden Retriever', ...], searchable: true }
    - { type: 'chips', id: 'age', label: 'Age', options: [{ value: 'puppy', label: 'Puppy' }, ...] }
  */
  onComplete,
}) => {
  const [values, setValues] = useState(
    fields.reduce((acc, f) => ({ ...acc, [f.id]: f.defaultValue || '' }), {})
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownSearch, setDropdownSearch] = useState('');
  const containerRef = useRef(null);
  const inputRefs = useRef({});

  // Check if all required fields are filled
  const allFilled = fields.every(f => {
    const val = values[f.id];
    if (f.required === false) return true;
    return val && val.length > 0;
  });

  const setValue = (fieldId, value) => {
    if (isSubmitted) return;
    setValues(prev => ({ ...prev, [fieldId]: value }));
  };

  // Handle keyboard scroll for mobile
  const handleInputFocus = (fieldId) => {
    setTimeout(() => {
      inputRefs.current[fieldId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 300); // Wait for keyboard to appear
  };

  const handleSubmit = () => {
    if (!allFilled) return;
    setIsSubmitted(true);
    onComplete?.(values);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (openDropdown && !e.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
        setDropdownSearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  const renderField = (field, index) => {
    switch (field.type) {
      case 'text':
        return (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="space-y-1.5"
            ref={el => inputRefs.current[field.id] = el}
          >
            <label className="text-xs font-medium text-gray-500">{field.label}</label>
            <input
              type="text"
              value={values[field.id]}
              onChange={(e) => setValue(field.id, e.target.value)}
              onFocus={() => handleInputFocus(field.id)}
              placeholder={field.placeholder}
              disabled={isSubmitted}
              className={`
                w-full px-3 py-2.5 rounded-xl border text-sm
                transition-all duration-200
                ${isSubmitted
                  ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-white border-gray-200 text-gray-800 focus:border-[#E07B39] focus:ring-2 focus:ring-[#E07B39]/20'
                }
              `}
            />
          </motion.div>
        );

      case 'dropdown':
        const filteredOptions = field.searchable && dropdownSearch
          ? field.options.filter(opt =>
              (typeof opt === 'string' ? opt : opt.label)
                .toLowerCase()
                .includes(dropdownSearch.toLowerCase())
            )
          : field.options;

        return (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="space-y-1.5 dropdown-container"
            ref={el => inputRefs.current[field.id] = el}
          >
            <label className="text-xs font-medium text-gray-500">{field.label}</label>
            <div className="relative">
              <button
                onClick={() => {
                  if (!isSubmitted) {
                    setOpenDropdown(openDropdown === field.id ? null : field.id);
                    setDropdownSearch('');
                  }
                }}
                disabled={isSubmitted}
                className={`
                  w-full px-3 py-2.5 rounded-xl border text-sm text-left
                  flex items-center justify-between
                  transition-all duration-200
                  ${isSubmitted
                    ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-white border-gray-200 text-gray-800 hover:border-gray-300'
                  }
                  ${openDropdown === field.id ? 'border-[#E07B39] ring-2 ring-[#E07B39]/20' : ''}
                `}
              >
                <span className={values[field.id] ? 'text-gray-800' : 'text-gray-400'}>
                  {values[field.id] || field.placeholder || 'Select...'}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openDropdown === field.id ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {openDropdown === field.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-20 top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden max-h-48"
                  >
                    {field.searchable && (
                      <div className="p-2 border-b border-gray-100">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            value={dropdownSearch}
                            onChange={(e) => setDropdownSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full pl-8 pr-8 py-2 text-sm rounded-lg bg-gray-50 border-0 focus:ring-0"
                            autoFocus
                          />
                          {dropdownSearch && (
                            <button
                              onClick={() => setDropdownSearch('')}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2"
                            >
                              <X className="w-4 h-4 text-gray-400" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="overflow-y-auto max-h-36">
                      {filteredOptions.map((opt) => {
                        const optValue = typeof opt === 'string' ? opt : opt.value;
                        const optLabel = typeof opt === 'string' ? opt : opt.label;
                        const isSelected = values[field.id] === optValue;

                        return (
                          <button
                            key={optValue}
                            onClick={() => {
                              setValue(field.id, optValue);
                              setOpenDropdown(null);
                              setDropdownSearch('');
                            }}
                            className={`
                              w-full px-3 py-2 text-sm text-left
                              flex items-center justify-between
                              transition-colors
                              ${isSelected
                                ? 'bg-orange-50 text-[#E07B39]'
                                : 'text-gray-700 hover:bg-gray-50'
                              }
                            `}
                          >
                            {optLabel}
                            {isSelected && <Check className="w-4 h-4" />}
                          </button>
                        );
                      })}
                      {filteredOptions.length === 0 && (
                        <p className="px-3 py-2 text-sm text-gray-400">No results</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );

      case 'chips':
        return (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="space-y-1.5"
          >
            <label className="text-xs font-medium text-gray-500">{field.label}</label>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5">
              {field.options.map((opt) => {
                const optValue = typeof opt === 'string' ? opt : opt.value;
                const optLabel = typeof opt === 'string' ? opt : opt.label;
                const isSelected = values[field.id] === optValue;

                return (
                  <button
                    key={optValue}
                    onClick={() => setValue(field.id, optValue)}
                    disabled={isSubmitted}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-medium
                      transition-all duration-200 whitespace-nowrap
                      ${isSelected
                        ? 'bg-[#E07B39] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-[#E07B39]'
                      }
                      ${isSubmitted ? 'cursor-not-allowed opacity-75' : 'active:scale-95'}
                    `}
                  >
                    {optLabel}
                  </button>
                );
              })}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="flex items-end gap-3 w-full"
      ref={containerRef}
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E07B39] to-[#C86A2E] flex items-center justify-center text-white shrink-0 shadow-md transform -translate-y-1">
        <PawPrint className="w-4 h-4" />
      </div>

      {/* Bubble */}
      <div className="max-w-[85%] p-4 shadow-sm bg-white text-gray-800 rounded-2xl rounded-bl-none border border-gray-100">
        {/* Title */}
        <p className="text-sm font-medium text-gray-700 mb-4">{title}</p>

        {/* Fields */}
        <div className="space-y-4">
          {fields.map((field, index) => renderField(field, index))}
        </div>

        {/* Submit Button */}
        {!isSubmitted && (
          <motion.button
            initial={{ opacity: 0.5, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={handleSubmit}
            disabled={!allFilled}
            className={`
              mt-4 w-full py-2.5 rounded-xl font-medium text-sm
              flex items-center justify-center gap-2 transition-all
              ${allFilled
                ? 'bg-[#E07B39] text-white hover:bg-[#C86A2E] active:scale-[0.98]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Continue
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default BatchedQuickPicks;
