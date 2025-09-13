import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design',
    preview: 'bg-gradient-to-br from-blue-100 to-purple-100'
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional layout',
    preview: 'bg-gradient-to-br from-gray-100 to-blue-100'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and artistic design',
    preview: 'bg-gradient-to-br from-purple-100 to-pink-100'
  }
];

const TemplateSelector = ({ selectedTemplate, onTemplateChange }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Choose Template</h3>
      <div className="grid grid-cols-3 gap-3">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative cursor-pointer rounded-lg border-2 transition-all ${
              selectedTemplate === template.id
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onTemplateChange(template.id)}
          >
            <div className={`h-20 rounded-t-lg ${template.preview}`} />
            <div className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">{template.name}</h4>
                  <p className="text-xs text-gray-500">{template.description}</p>
                </div>
                {selectedTemplate === template.id && (
                  <Check className="w-4 h-4 text-blue-500" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;