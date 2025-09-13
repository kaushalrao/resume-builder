import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

const colorPresets = [
  { name: 'Ocean Blue', primary: '#3B82F6', secondary: '#8B5CF6', accent: '#06B6D4' },
  { name: 'Forest Green', primary: '#10B981', secondary: '#059669', accent: '#34D399' },
  { name: 'Sunset Orange', primary: '#F59E0B', secondary: '#EF4444', accent: '#F97316' },
  { name: 'Royal Purple', primary: '#8B5CF6', secondary: '#A855F7', accent: '#C084FC' },
  { name: 'Rose Gold', primary: '#EC4899', secondary: '#F472B6', accent: '#FB7185' },
  { name: 'Midnight', primary: '#1F2937', secondary: '#374151', accent: '#6B7280' }
];

const ColorPicker = ({ selectedColors, onColorsChange }) => {
  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Palette className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold">Color Scheme</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {colorPresets.map((preset, index) => (
          <motion.div
            key={preset.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer rounded-lg border-2 p-3 transition-all ${
              selectedColors.primary === preset.primary
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onColorsChange(preset)}
          >
            <div className="flex space-x-2 mb-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: preset.primary }}
              />
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: preset.secondary }}
              />
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: preset.accent }}
              />
            </div>
            <p className="text-sm font-medium">{preset.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;