import React from 'react';
import type { HarvardCvModel } from '../../models/HarvardCvModel';
import Icon from '../ui/Icon';

interface HarvardCvPreviewProps {
  cv: HarvardCvModel;
  className?: string;
}

const HarvardCvPreview: React.FC<HarvardCvPreviewProps> = ({ cv, className = '' }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{cv.personalInfo.name}</h1>
        <div className="text-gray-600 space-y-1">
          {cv.personalInfo.email && (
            <div className="flex items-center justify-center gap-2">
              <Icon name="mail" size="sm" />
              <span>{cv.personalInfo.email}</span>
            </div>
          )}
          {cv.personalInfo.phone && (
            <div className="flex items-center justify-center gap-2">
              <Icon name="phone" size="sm" />
              <span>{cv.personalInfo.phone}</span>
            </div>
          )}
          {cv.personalInfo.address && (
            <div className="flex items-center justify-center gap-2">
              <Icon name="map-pin" size="sm" />
              <span>{cv.personalInfo.address}</span>
            </div>
          )}
          {cv.personalInfo.linkedin && (
            <div className="flex items-center justify-center gap-2">
              <Icon name="linkedin" size="sm" />
              <span>{cv.personalInfo.linkedin}</span>
            </div>
          )}
          {cv.personalInfo.website && (
            <div className="flex items-center justify-center gap-2">
              <Icon name="globe" size="sm" />
              <span>{cv.personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Education */}
      {cv.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">
            EDUCATION
          </h2>
          {cv.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{edu.institution}</h3>
                  <p className="text-gray-600">{edu.degree}</p>
                  {edu.field && <p className="text-gray-600">{edu.field}</p>}
                </div>
                <div className="text-right text-gray-600">
                  {edu.graduationDate && <p>{edu.graduationDate}</p>}
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
              </div>
              {edu.relevantCourses.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    <strong>Relevant Courses:</strong> {edu.relevantCourses.join(', ')}
                  </p>
                </div>
              )}
              {edu.honors && (
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Honors:</strong> {edu.honors}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {cv.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">
            EXPERIENCE
          </h2>
          {cv.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  {exp.location && <p className="text-gray-600">{exp.location}</p>}
                </div>
                <div className="text-right text-gray-600">
                  {exp.startDate && exp.endDate && (
                    <p>{exp.startDate} - {exp.endDate}</p>
                  )}
                </div>
              </div>
              {exp.description && (
                <p className="text-gray-700 mt-2">{exp.description}</p>
              )}
              {exp.achievements.length > 0 && (
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-sm text-gray-700">{achievement}</li>
                  ))}
                </ul>
              )}
              {exp.technologies.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    <strong>Technologies:</strong> {exp.technologies.join(', ')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(cv.skills.technical.length > 0 || cv.skills.soft.length > 0 || cv.skills.languages.length > 0) && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">
            SKILLS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cv.skills.technical.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Technical Skills</h3>
                <p className="text-gray-700">{cv.skills.technical.join(', ')}</p>
              </div>
            )}
            {cv.skills.soft.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Soft Skills</h3>
                <p className="text-gray-700">{cv.skills.soft.join(', ')}</p>
              </div>
            )}
            {cv.skills.languages.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Languages</h3>
                <p className="text-gray-700">{cv.skills.languages.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Projects */}
      {cv.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">
            PROJECTS
          </h2>
          {cv.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{project.name}</h3>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" 
                       className="text-blue-600 hover:text-blue-800 text-sm">
                      View Project
                    </a>
                  )}
                </div>
                {project.startDate && project.endDate && (
                  <div className="text-right text-gray-600">
                    <p>{project.startDate} - {project.endDate}</p>
                  </div>
                )}
              </div>
              {project.description && (
                <p className="text-gray-700 mt-2">{project.description}</p>
              )}
              {project.technologies.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {cv.certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">
            CERTIFICATIONS
          </h2>
          {cv.certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                  {cert.issuer && <p className="text-gray-600">{cert.issuer}</p>}
                </div>
                {cert.date && (
                  <div className="text-right text-gray-600">
                    <p>{cert.date}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Volunteer */}
      {cv.volunteer.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">
            VOLUNTEER EXPERIENCE
          </h2>
          {cv.volunteer.map((vol, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{vol.role}</h3>
                  <p className="text-gray-600">{vol.organization}</p>
                </div>
                {vol.startDate && vol.endDate && (
                  <div className="text-right text-gray-600">
                    <p>{vol.startDate} - {vol.endDate}</p>
                  </div>
                )}
              </div>
              {vol.description && (
                <p className="text-gray-700 mt-2">{vol.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Publications */}
      {cv.publications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2 mb-4">
            PUBLICATIONS
          </h2>
          {cv.publications.map((pub, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{pub.title}</h3>
                  {pub.authors && <p className="text-gray-600">{pub.authors}</p>}
                  {pub.journal && <p className="text-gray-600">{pub.journal}</p>}
                </div>
                {pub.date && (
                  <div className="text-right text-gray-600">
                    <p>{pub.date}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HarvardCvPreview; 