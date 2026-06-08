import { useState, useEffect } from 'react';
import api from '../../api';

const tabs = ['Overview', 'Skills', 'Projects'];

export default function StudentProfile({ studentId, onBack }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    if (studentId) fetchStudent();
  }, [studentId]);

  const fetchStudent = async () => {
    try {
      const data = await api.students.get(studentId);
      setStudent(data);
    } catch (err) {
      console.error('Failed to fetch student:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-on-surface-variant font-mono">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center py-20">
        <div className="text-on-surface-variant font-mono">Student not found</div>
        <button onClick={onBack} className="text-primary-container font-mono mt-4">&gt; Back to directory</button>
      </div>
    );
  }

  const skills = student.resumeData?.skills || [];
  const projects = student.resumeData?.projects || [];
  const achievements = student.resumeData?.achievements || [];
  const techStack = student.techStack || [];
  const stats = [
    { label: 'Projects', value: projects.length || techStack.length },
    { label: 'Skills', value: skills.length },
    { label: 'Achievements', value: achievements.length },
    { label: 'Tech Stack', value: techStack.length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-on-surface-variant font-mono text-xs">
          <button onClick={onBack} className="hover:text-primary-container transition-colors">Directory</button>
          <span className="text-white/20">/</span>
          <span className="text-on-surface">Profile</span>
        </div>
        <div className="flex items-center gap-2">
          {student.github && (
            <a href={student.github} target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary-container transition-colors p-2 rounded-lg hover:bg-white/5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          )}
          {student.linkedin && (
            <a href={student.linkedin} target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary-container transition-colors p-2 rounded-lg hover:bg-white/5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          )}
          {student.portfolio && (
            <a href={student.portfolio} target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary-container transition-colors p-2 rounded-lg hover:bg-white/5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
            </a>
          )}
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden border-2 border-primary-container/30 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
              <img
                src={student.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>
            {student.isLeapxIntern && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/10 border border-primary-container/20 text-primary-container font-mono text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
                LEAPX PLATINUM
              </span>
            )}
          </div>
          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
              <div>
                <h1 className="text-headline-lg font-mono font-bold text-on-surface mb-2">{student.name}</h1>
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-on-surface-variant">
                  {student.campus && (
                    <>
                      <span>{student.campus}</span>
                      <span className="text-white/20">•</span>
                    </>
                  )}
                  {student.location && (
                    <>
                      <span>{student.location}</span>
                      <span className="text-white/20">•</span>
                    </>
                  )}
                  {student.batch && <span>Batch {student.batch}-{parseInt(student.batch) + 1}</span>}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={onBack} className="px-4 py-2 bg-primary-container text-on-primary-container font-mono text-xs rounded font-semibold hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all">
                  &lt; Back
                </button>
              </div>
            </div>
            <div className="w-full h-px bg-white/10 my-4" />
            <p className="text-sm font-mono text-on-surface-variant leading-relaxed">
              {student.about || 'No information provided.'}
            </p>
          </div>
        </div>
      </div>

      {stats.some(s => s.value > 0) && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.filter(s => s.value > 0).map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 relative border-t border-t-white/20">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-primary-container/50" />
              <p className="text-headline-lg font-mono font-bold text-primary-container mb-1">{stat.value}</p>
              <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      <nav className="border-b border-white/10 overflow-x-auto">
        <ul className="flex items-center gap-6 min-w-max font-mono text-xs">
          {tabs.map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`py-3 border-b-2 transition-all ${
                  activeTab === tab
                    ? 'border-primary-container text-primary-container'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6">
          {activeTab === 'Overview' && (
            <>
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-label-sm text-primary-container mb-4 flex items-center gap-2">
                  Career Objective
                </h2>
                <p className="text-xs font-mono text-on-surface-variant leading-relaxed mb-6">
                  {student.about || 'No information provided.'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">Tech Stack</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {techStack.length > 0 ? techStack.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 font-mono text-[10px] text-on-surface">{t}</span>
                      )) : (
                        <span className="font-mono text-[10px] text-on-surface-variant">No tech stack listed</span>
                      )}
                    </div>
                  </div>
                  {student.resumeData?.education && (
                    <div>
                      <h3 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">Education</h3>
                      <div className="space-y-1">
                        {student.resumeData.education.degree && <p className="font-mono text-xs text-on-surface">{student.resumeData.education.degree}</p>}
                        {student.resumeData.education.institution && <p className="font-mono text-[10px] text-on-surface-variant">{student.resumeData.education.institution}</p>}
                        {student.resumeData.education.year && <p className="font-mono text-[10px] text-on-surface-variant">{student.resumeData.education.year}</p>}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {projects.length > 0 && (
                <div>
                  <h2 className="text-label-sm text-primary-container mb-4">Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.slice(0, 4).map((proj, i) => (
                      <div key={i} className="glass-card rounded-xl overflow-hidden flex flex-col border-t border-t-white/20">
                        <div className="h-24 bg-gradient-to-br from-surface-high via-surface to-surface-dim relative flex items-end p-4">
                          <h3 className="text-sm font-mono font-semibold text-on-surface">{proj.title}</h3>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          {proj.description && (
                            <p className="font-mono text-[10px] text-on-surface-variant mb-3 flex-1">{proj.description}</p>
                          )}
                          {proj.techStack?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {proj.techStack.map(t => (
                                <span key={t} className="font-mono text-[9px] bg-white/5 text-on-surface px-1.5 py-0.5 rounded border border-white/10">{t}</span>
                              ))}
                            </div>
                          )}
                          {proj.link && (
                            <a href={proj.link} target="_blank" rel="noopener noreferrer"
                              className="font-mono text-[10px] text-primary-container hover:underline self-end">
                              View Project →
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {achievements.length > 0 && (
                <div className="glass-card rounded-xl p-6">
                  <h2 className="text-label-sm text-primary-container mb-4">Achievements</h2>
                  <div className="relative border-l border-white/10 ml-2 space-y-6 pb-2">
                    {achievements.map((ach, i) => (
                      <div key={i} className="relative pl-5">
                        <div className={`absolute w-2.5 h-2.5 rounded-full -left-[5.5px] top-1 ${
                          i === 0 ? 'bg-primary-container shadow-[0_0_8px_rgba(0,240,255,0.6)]' : 'bg-surface-variant border border-white/30'
                        }`} />
                        <p className="font-mono text-xs text-on-surface-variant">{ach}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'Skills' && (
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-label-sm text-primary-container mb-4">Skills & Technologies</h2>
              {skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 rounded bg-white/5 border border-white/10 font-mono text-xs text-secondary-container">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {techStack.length > 0 && (
                <div>
                  <h3 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {techStack.map(tech => (
                      <span key={tech} className="px-3 py-1.5 rounded bg-white/5 border border-white/10 font-mono text-xs text-primary-container">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.length === 0 && techStack.length === 0 && (
                <p className="font-mono text-xs text-on-surface-variant">No skills listed.</p>
              )}
            </div>
          )}

          {activeTab === 'Projects' && (
            <div className="space-y-4">
              {projects.length > 0 ? projects.map((proj, i) => (
                <div key={i} className="glass-card rounded-xl p-5 border-t border-t-white/20">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-mono font-semibold text-on-surface">{proj.title}</h3>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer"
                        className="font-mono text-[10px] text-primary-container hover:underline">Open →</a>
                    )}
                  </div>
                  {proj.description && (
                    <p className="font-mono text-xs text-on-surface-variant mb-3">{proj.description}</p>
                  )}
                  {proj.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.map(t => (
                        <span key={t} className="font-mono text-[9px] bg-white/5 text-on-surface px-1.5 py-0.5 rounded border border-white/10">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              )) : (
                <div className="glass-card rounded-xl p-6 text-center">
                  <p className="font-mono text-xs text-on-surface-variant">No projects listed.</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          {student.resumeData?.education && (
            <div className="glass-card rounded-xl p-5 border-t-2 border-t-secondary-container">
              <h3 className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-4">Education</h3>
              <div className="space-y-3 font-mono text-xs">
                {student.resumeData.education.degree && (
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-on-surface-variant">Degree</span>
                    <span className="text-on-surface text-right">{student.resumeData.education.degree}</span>
                  </div>
                )}
                {student.resumeData.education.institution && (
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-on-surface-variant">Institution</span>
                    <span className="text-on-surface text-right">{student.resumeData.education.institution}</span>
                  </div>
                )}
                {student.resumeData.education.year && (
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-on-surface-variant">Year</span>
                    <span className="text-on-surface">{student.resumeData.education.year}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div className="glass-card rounded-xl p-5">
              <h2 className="text-label-sm text-primary-container mb-4">Skills</h2>
              <div className="space-y-3">
                {skills.slice(0, 6).map((skill, i) => (
                  <div key={skill}>
                    <div className="flex justify-between font-mono text-[10px] mb-1">
                      <span className="text-on-surface">{skill}</span>
                      <span className="text-primary-container">{100 - i * 12}%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-container rounded-full"
                        style={{ width: `${100 - i * 12}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {skills.length > 6 && (
                <p className="font-mono text-[10px] text-on-surface-variant mt-3">+{skills.length - 6} more</p>
              )}
            </div>
          )}

          <div className="glass-card rounded-xl p-5 border-t-2 border-t-primary-container">
            <h2 className="text-label-sm text-primary-container mb-4">Quick Info</h2>
            <div className="space-y-3 font-mono text-xs">
              {student.location && (
                <div className="bg-white/[0.03] border border-white/5 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-on-surface-variant">Location</span>
                  <span className="text-on-surface">{student.location}</span>
                </div>
              )}
              {student.batch && (
                <div className="bg-white/[0.03] border border-white/5 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-on-surface-variant">Batch</span>
                  <span className="text-on-surface">{student.batch}-{parseInt(student.batch) + 1}</span>
                </div>
              )}
              {student.campus && (
                <div className="bg-white/[0.03] border border-white/5 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-on-surface-variant">Campus</span>
                  <span className="text-on-surface">{student.campus}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
