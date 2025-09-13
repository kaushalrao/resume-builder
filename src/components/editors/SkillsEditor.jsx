import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const SkillsEditor = ({ data, onUpdate }) => {
  const { toast } = useToast();
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill = {
        id: Date.now(),
        name: newSkill.trim(),
        level: 'Intermediate'
      };
      onUpdate([...data, skill]);
      setNewSkill('');
      toast({
        title: "Skill added!",
        description: `${skill.name} has been added to your skills.`
      });
    }
  };

  const removeSkill = (id) => {
    onUpdate(data.filter(skill => skill.id !== id));
    toast({
      title: "Skill removed",
      description: "Skill has been deleted from your resume."
    });
  };

  const updateSkillLevel = (id, level) => {
    onUpdate(data.map(skill => 
      skill.id === id ? { ...skill, level } : skill
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold gradient-text flex items-center space-x-2">
          <Zap className="w-5 h-5" />
          <span>Skills</span>
        </h3>
      </div>

      <div className="flex space-x-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a skill (e.g., JavaScript, Project Management)"
          className="flex-1"
        />
        <Button onClick={addSkill} size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((skill) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white/50 rounded-lg p-4 border border-white/20"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700">{skill.name}</h4>
                <Button
                  onClick={() => removeSkill(skill.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div>
                <Label className="text-sm text-gray-600">Proficiency Level</Label>
                <select
                  value={skill.level}
                  onChange={(e) => updateSkillLevel(skill.id, e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white text-sm"
                >
                  {skillLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Proficiency</span>
                  <span>{skill.level}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: skill.level === 'Beginner' ? '25%' :
                             skill.level === 'Intermediate' ? '50%' :
                             skill.level === 'Advanced' ? '75%' : '100%'
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No skills added yet.</p>
          <p className="text-sm">Add your first skill above!</p>
        </div>
      )}
    </motion.div>
  );
};

export default SkillsEditor;