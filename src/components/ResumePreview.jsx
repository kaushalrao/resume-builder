import React from 'react';
import { motion } from 'framer-motion';
import ModernTemplate from '@/components/templates/ModernTemplate';
import ClassicTemplate from '@/components/templates/ClassicTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';

const ResumePreview = ({ resumeData, template, colors, fullWidth = false }) => {
  const renderTemplate = () => {
    const templateProps = { resumeData, colors };
    
    switch (template) {
      case 'classic':
        return <ClassicTemplate {...templateProps} />;
      case 'creative':
        return <CreativeTemplate {...templateProps} />;
      default:
        return <ModernTemplate {...templateProps} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className={`${fullWidth ? 'w-full' : 'max-w-2xl mx-auto'}`}
    >
      <div className="glass-effect rounded-2xl p-6 resume-shadow">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold gradient-text">Live Preview</h3>
          <div className="text-sm text-gray-500 capitalize">
            {template} Template
          </div>
        </div>
        
        <div 
          id="resume-preview"
          className="bg-white rounded-lg shadow-lg overflow-hidden"
          style={{ minHeight: '800px' }}
        >
          {renderTemplate()}
        </div>
      </div>
    </motion.div>
  );
};

export default ResumePreview;