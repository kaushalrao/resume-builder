import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const ExperienceEditor = ({ data, onUpdate }) => {
  const { toast } = useToast();

  const addExperience = () => {
    const newExperience = {
      id: Date.now(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onUpdate([...data, newExperience]);
    toast({
      title: "Experience added!",
      description: "New work experience entry has been created."
    });
  };

  const updateExperience = (id, field, value) => {
    onUpdate(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id) => {
    onUpdate(data.filter(exp => exp.id !== id));
    toast({
      title: "Experience removed",
      description: "Work experience entry has been deleted."
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
          <Briefcase className="w-5 h-5" />
          <span>Work Experience</span>
        </h3>
        <Button onClick={addExperience} size="sm" className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </Button>
      </div>

      <AnimatePresence>
        {data.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/50 rounded-lg p-4 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-700">Experience #{index + 1}</h4>
              <Button
                onClick={() => removeExperience(experience.id)}
                variant="destructive"
                size="sm"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`jobTitle-${experience.id}`}>Job Title *</Label>
                <Input
                  id={`jobTitle-${experience.id}`}
                  value={experience.jobTitle}
                  onChange={(e) => updateExperience(experience.id, 'jobTitle', e.target.value)}
                  placeholder="Software Engineer"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor={`company-${experience.id}`}>Company *</Label>
                <Input
                  id={`company-${experience.id}`}
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  placeholder="Tech Corp"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor={`location-${experience.id}`}>Location</Label>
                <Input
                  id={`location-${experience.id}`}
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                  placeholder="San Francisco, CA"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor={`startDate-${experience.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${experience.id}`}
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`endDate-${experience.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${experience.id}`}
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                    disabled={experience.current}
                    placeholder={experience.current ? 'Present' : ''}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    id={`current-${experience.id}`}
                    checked={experience.current}
                    onChange={(e) => {
                      updateExperience(experience.id, 'current', e.target.checked);
                      if (e.target.checked) {
                        updateExperience(experience.id, 'endDate', '');
                      }
                    }}
                    className="rounded"
                  />
                  <Label htmlFor={`current-${experience.id}`}>I currently work here</Label>
                </div>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor={`description-${experience.id}`}>Job Description</Label>
                <Textarea
                  id={`description-${experience.id}`}
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                  placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver high-quality software&#10;• Improved application performance by 30% through code optimization"
                  className="mt-1 min-h-[100px]"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started!</p>
        </div>
      )}
    </motion.div>
  );
};

export default ExperienceEditor;