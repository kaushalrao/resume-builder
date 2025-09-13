import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, ExternalLink, Github, Star } from 'lucide-react';

const CreativeTemplate = ({ resumeData, colors }) => {
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
    <div className="bg-white text-gray-900 min-h-[800px] flex">
      {/* Left Sidebar */}
      <div 
        className="w-1/3 text-white p-6 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/20 -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-white/20 translate-x-12 translate-y-12" />
          <div className="absolute top-1/2 left-1/2 w-16 h-16 rounded-full bg-white/10 -translate-x-8 -translate-y-8" />
        </div>
        
        <div className="relative z-10">
          {/* Profile Image */}
          {personalInfo.profileImage && (
            <div className="text-center mb-6">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.fullName}
                className="w-32 h-32 rounded-full mx-auto border-4 border-white/30 object-cover shadow-xl"
              />
            </div>
          )}

          {/* Contact Info */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">Contact</h3>
            {personalInfo.email && (
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center space-x-3 text-sm">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center space-x-3 text-sm">
                <Linkedin className="w-4 h-4 flex-shrink-0" />
                <span className="break-all">{personalInfo.linkedin}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4 border-b border-white/30 pb-2">Skills</h3>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < (skill.level === 'Beginner' ? 1 :
                                   skill.level === 'Intermediate' ? 2 :
                                   skill.level === 'Advanced' ? 3 : 4)
                                ? 'fill-current text-white'
                                : 'text-white/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 font-display" style={{ color: colors.primary }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.summary && (
            <p className="text-gray-700 leading-relaxed text-lg">{personalInfo.summary}</p>
          )}
        </div>

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-6 relative"
              style={{ color: colors.primary }}
            >
              Experience
              <div 
                className="absolute bottom-0 left-0 w-12 h-1 rounded"
                style={{ backgroundColor: colors.accent }}
              />
            </h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={exp.id} className="relative pl-6">
                  <div 
                    className="absolute left-0 top-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors.secondary }}
                  />
                  {index < experience.length - 1 && (
                    <div 
                      className="absolute left-1.5 top-5 w-0.5 h-full"
                      style={{ backgroundColor: colors.secondary, opacity: 0.3 }}
                    />
                  )}
                  
                  <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h3>
                        <p className="text-gray-700 font-semibold">{exp.company}</p>
                        {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mt-2 md:mt-0">
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
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-6 relative"
              style={{ color: colors.primary }}
            >
              Education
              <div 
                className="absolute bottom-0 left-0 w-12 h-1 rounded"
                style={{ backgroundColor: colors.accent }}
              />
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700 font-semibold">{edu.school}</p>
                      {edu.location && <p className="text-gray-600 text-sm">{edu.location}</p>}
                    </div>
                    <div className="text-sm text-gray-600 mt-2 md:mt-0">
                      <div>{formatDateRange(edu.startDate, edu.endDate)}</div>
                      {edu.gpa && <div className="font-semibold">GPA: {edu.gpa}</div>}
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

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-8">
            <h2 
              className="text-2xl font-bold mb-6 relative"
              style={{ color: colors.primary }}
            >
              Projects
              <div 
                className="absolute bottom-0 left-0 w-12 h-1 rounded"
                style={{ backgroundColor: colors.accent }}
              />
            </h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
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
                        <div className="flex flex-wrap gap-2 mb-2">
                          {project.technologies.split(',').map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs rounded-full text-white"
                              style={{ backgroundColor: colors.secondary }}
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {(project.startDate || project.endDate) && (
                      <div className="flex items-center text-sm text-gray-600 mt-2 md:mt-0">
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

export default CreativeTemplate;