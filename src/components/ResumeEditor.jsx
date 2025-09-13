import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalInfoEditor from '@/components/editors/PersonalInfoEditor';
import ExperienceEditor from '@/components/editors/ExperienceEditor';
import EducationEditor from '@/components/editors/EducationEditor';
import SkillsEditor from '@/components/editors/SkillsEditor';
import ProjectsEditor from '@/components/editors/ProjectsEditor';

const ResumeEditor = ({ resumeData, onUpdateData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass-effect rounded-2xl p-6"
    >
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalInfoEditor
            data={resumeData.personalInfo}
            onUpdate={(data) => onUpdateData('personalInfo', data)}
          />
        </TabsContent>

        <TabsContent value="experience">
          <ExperienceEditor
            data={resumeData.experience}
            onUpdate={(data) => onUpdateData('experience', data)}
          />
        </TabsContent>

        <TabsContent value="education">
          <EducationEditor
            data={resumeData.education}
            onUpdate={(data) => onUpdateData('education', data)}
          />
        </TabsContent>

        <TabsContent value="skills">
          <SkillsEditor
            data={resumeData.skills}
            onUpdate={(data) => onUpdateData('skills', data)}
          />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectsEditor
            data={resumeData.projects}
            onUpdate={(data) => onUpdateData('projects', data)}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ResumeEditor;