import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const EducationEditor = ({ data, onUpdate }) => {
  const { toast } = useToast();

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      degree: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: ''
    };
    onUpdate([...data, newEducation]);
    toast({
      title: "Education added!",
      description: "New education entry has been created."
    });
  };

  const updateEducation = (id, field, value) => {
    onUpdate(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id) => {
    onUpdate(data.filter(edu => edu.id !== id));
    toast({
      title: "Education removed",
      description: "Education entry has been deleted."
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold gradient-text flex items-center space-x-2">
          <GraduationCap className="w-5 h-5" />
          <span>Education</span>
        </h3>
        <Button onClick={addEducation} size="sm" className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Education</span>
        </Button>
      </div>

      <AnimatePresence>
        {data.map((education, index) => (
          <motion.div
            key={education.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/50 rounded-lg p-4 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-700">Education #{index + 1}</h4>
              <Button
                onClick={() => removeEducation(education.id)}
                variant="destructive"
                size="sm"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`degree-${education.id}`}>Degree *</Label>
                <Input
                  id={`degree-${education.id}`}
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor={`school-${education.id}`}>School *</Label>
                <Input
                  id={`school-${education.id}`}
                  value={education.school}
                  onChange={(e) => updateEducation(education.id, 'school', e.target.value)}
                  placeholder="University of Technology"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor={`location-${education.id}`}>Location</Label>
                <Input
                  id={`location-${education.id}`}
                  value={education.location}
                  onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                  placeholder="Boston, MA"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor={`gpa-${education.id}`}>GPA (Optional)</Label>
                <Input
                  id={`gpa-${education.id}`}
                  value={education.gpa}
                  onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                  placeholder="3.8/4.0"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${education.id}`}
                    type="month"
                    value={education.startDate}
                    onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${education.id}`}
                    type="month"
                    value={education.endDate}
                    onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor={`description-${education.id}`}>Additional Details</Label>
                <Textarea
                  id={`description-${education.id}`}
                  value={education.description}
                  onChange={(e) => updateEducation(education.id, 'description', e.target.value)}
                  placeholder="Relevant coursework, honors, activities, etc."
                  className="mt-1"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No education added yet.</p>
          <p className="text-sm">Click "Add Education" to get started!</p>
        </div>
      )}
    </motion.div>
  );
};

export default EducationEditor;