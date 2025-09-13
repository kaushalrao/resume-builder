import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, ExternalLink, Github } from 'lucide-react';

const ModernTemplate = ({ resumeData, colors }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const formatDateRange = (startDate, endDate, current = false) => {
    const start = formatDate(startDate);
    const end = current ? 'Present' : formatDate(endDate);
    return `${start} - ${end}`;
  };

  return (
    <div className="bg-white text-gray-900 min-h-[800px]">
      {/* Header Section */}
      <div 
        className="px-8 py-6 text-white relative overflow-hidden"
        style={{ backgroundColor: colors.primary }}
      >
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.accent} 100%)`
          }}
        />
        
        <div className="relative z-10 flex items-center space-x-6">
          {personalInfo.profileImage && (
            <img
              src={personalInfo.profileImage}
              alt={personalInfo.fullName}
              className="w-24 h-24 rounded-full border-4 border-white/20 object-cover"
            />
          )}
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName || 'Your Name'}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm opacity-90">
              {personalInfo.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-center space-x-2 md:col-span-2">
                  <Linkedin className="w-4 h-4" />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 
              className="text-xl font-bold mb-3 pb-2 border-b-2"
              style={{ color: colors.primary, borderColor: colors.primary }}
            >
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-xl font-bold mb-4 pb-2 border-b-2"
              style={{ color: colors.primary, borderColor: colors.primary }}
            >
              Work Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="relative">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.jobTitle}</h3>
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                      {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1 md:mt-0">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-xl font-bold mb-4 pb-2 border-b-2"
              style={{ color: colors.primary, borderColor: colors.primary }}
            >
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.school}</p>
                      {edu.location && <p className="text-gray-600 text-sm">{edu.location}</p>}
                    </div>
                    <div className="text-sm text-gray-600 mt-1 md:mt-0">
                      {formatDateRange(edu.startDate, edu.endDate)}
                      {edu.gpa && <div>GPA: {edu.gpa}</div>}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 text-sm">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-xl font-bold mb-4 pb-2 border-b-2"
              style={{ color: colors.primary, borderColor: colors.primary }}
            >
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{skill.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: colors.secondary,
                          width: skill.level === 'Beginner' ? '25%' :
                                 skill.level === 'Intermediate' ? '50%' :
                                 skill.level === 'Advanced' ? '75%' : '100%'
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-16">{skill.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-xl font-bold mb-4 pb-2 border-b-2"
              style={{ color: colors.primary, borderColor: colors.primary }}
            >
              Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                        <div className="flex items-center space-x-2">
                          {project.url && (
                            <ExternalLink className="w-4 h-4 text-gray-600" />
                          )}
                          {project.github && (
                            <Github className="w-4 h-4 text-gray-600" />
                          )}
                        </div>
                      </div>
                      {project.technologies && (
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Technologies:</strong> {project.technologies}
                        </p>
                      )}
                    </div>
                    {(project.startDate || project.endDate) && (
                      <div className="flex items-center text-sm text-gray-600 mt-1 md:mt-0">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formatDateRange(project.startDate, project.endDate)}</span>
                      </div>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;