import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, EyeOff, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = ({ onExportPDF, isPreviewMode, onTogglePreview }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-effect border-b border-white/20 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Resume Builder</h1>
              <p className="text-sm text-gray-600">Create professional resumes in minutes</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={onTogglePreview}
              variant="outline"
              size="sm"
              className="hidden lg:flex items-center space-x-2"
            >
              {isPreviewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{isPreviewMode ? 'Edit Mode' : 'Preview Mode'}</span>
            </Button>

            <Button
              onClick={onExportPDF}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;