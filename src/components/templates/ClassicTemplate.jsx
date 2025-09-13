import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Calendar, ExternalLink, Github } from 'lucide-react';

const ClassicTemplate = ({ resumeData, colors }) => {
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
    <div className="bg-white text-gray-900 min-h-[800px] p-8">
      {/* Header Section */}
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
        {personalInfo.profileImage && (
          <img
            src={personalInfo.profileImage}
            alt={personalInfo.fullName}
            className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-gray-300 object-cover"
          />
        )}
        
        <h1 className="text-3xl font-bold mb-4 font-display" style={{ color: colors.primary }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
          {personalInfo.email && (
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center space-x-1">
              <Linkedin className="w-4 h-4" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h2 
            className="text-lg font-bold mb-3 uppercase tracking-wide"
            style={{ color: colors.primary }}
          >
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 
            className="text-lg font-bold mb-4 uppercase tracking-wide"
            style={{ color: colors.primary }}
          >
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{exp.jobTitle}</h3>
                    <p className="text-gray-700 font-semibold">{exp.company}</p>
                    {exp.location && <p className="text-gray-600 text-sm italic">{exp.location}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                    </div>
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line ml-4">
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
            className="text-lg font-bold mb-4 uppercase tracking-wide"
            style={{ color: colors.primary }}
          >
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700 font-semibold">{edu.school}</p>
                    {edu.location && <p className="text-gray-600 text-sm italic">{edu.location}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div>{formatDateRange(edu.startDate, edu.endDate)}</div>
                    {edu.gpa && <div className="font-semibold">GPA: {edu.gpa}</div>}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700 text-sm ml-4">{edu.description}</p>
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
            className="text-lg font-bold mb-4 uppercase tracking-wide"
            style={{ color: colors.primary }}
          >
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{skill.name}</span>
                <span className="text-sm text-gray-600 font-semibold">{skill.level}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 
            className="text-lg font-bold mb-4 uppercase tracking-wide"
            style={{ color: colors.primary }}
          >
            Notable Projects
          </h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-base font-bold text-gray-900">{project.name}</h3>
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
                      <p className="text-sm text-gray-600 mb-2 italic">
                        <strong>Technologies:</strong> {project.technologies}
                      </p>
                    )}
                  </div>
                  {(project.startDate || project.endDate) && (
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formatDateRange(project.startDate, project.endDate)}</span>
                      </div>
                    </div>
                  )}
                </div>
                {project.description && (
                  <p className="text-gray-700 text-sm leading-relaxed ml-4">{project.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;