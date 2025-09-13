import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import ResumeEditor from '@/components/ResumeEditor';
import ResumePreview from '@/components/ResumePreview';
import TemplateSelector from '@/components/TemplateSelector';
import ColorPicker from '@/components/ColorPicker';
import { useToast } from '@/components/ui/use-toast';

function App() {
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : {
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        summary: '',
        profileImage: null
      },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: []
    };
  });

  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    return localStorage.getItem('selectedTemplate') || 'modern';
  });

  const [selectedColors, setSelectedColors] = useState(() => {
    const saved = localStorage.getItem('selectedColors');
    return saved ? JSON.parse(saved) : {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#06B6D4'
    };
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  useEffect(() => {
    localStorage.setItem('selectedColors', JSON.stringify(selectedColors));
  }, [selectedColors]);

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const exportToPDF = async () => {
    try {
      const { default: html2canvas } = await import('html2canvas');
      const { default: jsPDF } = await import('jspdf');
      
      const element = document.getElementById('resume-preview');
      if (!element) {
        toast({
          title: "Export Error",
          description: "Resume preview not found. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Generating PDF...",
        description: "Please wait while we create your resume PDF."
      });

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${resumeData.personalInfo.fullName || 'Resume'}.pdf`);

      toast({
        title: "PDF Generated Successfully!",
        description: "Your resume has been downloaded as a PDF file."
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({
        title: "Export Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Resume Builder - Create Professional Resumes</title>
        <meta name="description" content="Build stunning professional resumes with our modern resume builder. Choose from multiple templates, customize colors, and export to PDF." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header 
          onExportPDF={exportToPDF}
          isPreviewMode={isPreviewMode}
          onTogglePreview={() => setIsPreviewMode(!isPreviewMode)}
        />
        
        <main className="container mx-auto px-4 py-8">
          {!isPreviewMode ? (
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="glass-effect rounded-2xl p-6">
                  <h2 className="text-2xl font-bold gradient-text mb-6">Customize Your Resume</h2>
                  
                  <div className="space-y-6">
                    <TemplateSelector
                      selectedTemplate={selectedTemplate}
                      onTemplateChange={setSelectedTemplate}
                    />
                    
                    <ColorPicker
                      selectedColors={selectedColors}
                      onColorsChange={setSelectedColors}
                    />
                  </div>
                </div>

                <ResumeEditor
                  resumeData={resumeData}
                  onUpdateData={updateResumeData}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:sticky lg:top-8"
              >
                <ResumePreview
                  resumeData={resumeData}
                  template={selectedTemplate}
                  colors={selectedColors}
                />
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <ResumePreview
                resumeData={resumeData}
                template={selectedTemplate}
                colors={selectedColors}
                fullWidth
              />
            </motion.div>
          )}
        </main>
        
        <Toaster />
      </div>
    </>
  );
}

export default App;