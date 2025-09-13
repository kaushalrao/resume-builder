import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Code, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const ProjectsEditor = ({ data, onUpdate }) => {
  const { toast } = useToast();

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      name: '',
      description: '',
      technologies: '',
      url: '',
      github: '',
      startDate: '',
      endDate: ''
    };
    onUpdate([...data, newProject]);
    toast({
      title: "Project added!",
      description: "New project entry has been created."
    });
  };

  const updateProject = (id, field, value) => {
    onUpdate(data.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  const removeProject = (id) => {
    onUpdate(data.filter(project => project.id !== id));
    toast({
      title: "Project removed",
      description: "Project entry has been deleted."
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
          <Code className="w-5 h-5" />
          <span>Projects</span>
        </h3>
        <Button onClick={addProject} size="sm" className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </Button>
      </div>

      <AnimatePresence>
        {data.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/50 rounded-lg p-4 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-700">Project #{index + 1}</h4>
              <Button
                onClick={() => removeProject(project.id)}
                variant="destructive"
                size="sm"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor={`name-${project.id}`}>Project Name *</Label>
                <Input
                  id={`name-${project.id}`}
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  placeholder="E-commerce Website"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor={`url-${project.id}`}>Live URL</Label>
                <Input
                  id={`url-${project.id}`}
                  value={project.url}
                  onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                  placeholder="https://myproject.com"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor={`github-${project.id}`}>GitHub Repository</Label>
                <Input
                  id={`github-${project.id}`}
                  value={project.github}
                  onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                  placeholder="https://github.com/username/project"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor={`startDate-${project.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${project.id}`}
                    type="month"
                    value={project.startDate}
                    onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`endDate-${project.id}`}>End Date</Label>
                  <Input
                    id={`endDate-${project.id}`}
                    type="month"
                    value={project.endDate}
                    onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`technologies-${project.id}`}>Technologies Used</Label>
                <Input
                  id={`technologies-${project.id}`}
                  value={project.technologies}
                  onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
                  placeholder="React, Node.js, MongoDB, AWS"
                  className="mt-1"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor={`description-${project.id}`}>Project Description</Label>
                <Textarea
                  id={`description-${project.id}`}
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  placeholder="Describe what the project does, your role, key features, and achievements..."
                  className="mt-1 min-h-[100px]"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No projects added yet.</p>
          <p className="text-sm">Click "Add Project" to showcase your work!</p>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectsEditor;