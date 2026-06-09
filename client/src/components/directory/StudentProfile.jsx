import { useState, useEffect } from 'react';
import api from '../../api';

const tabs = ['Overview', 'Skills', 'Projects', 'Experience', 'Coding Profiles', 'Certifications'];

export default function StudentProfile({ studentId, onBack }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    if (!studentId) return;
    (async () => {
      try {
        const data = await api.students.get(studentId);
        setStudent(data);
      } catch (err) {
        console.error('Failed to fetch student:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [studentId]);

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

  // Mock data to match the design for missing fields in API
  const bio = student.about || "Passionate systems engineer focusing on high-performance distributed architecture and applied AI. Contributor to major open-source infrastructure projects. Obsessed with elegant code, minimal latency, and leveraging Web3 primitives for secure data pipelines. Currently seeking summer 2024 opportunities to tackle complex scaling challenges.";
  
  const stats = [
    { label: 'Projects', value: student.resumeData?.projects?.length || '24', color: 'primary' },
    { label: 'Certifications', value: '12', color: 'secondary' },
    { label: 'Hackathons', value: '8', color: 'tertiary' },
    { label: 'Leetcode', value: '450+', color: 'primary' },
    { label: 'Github Repos', value: '56', color: 'surface' },
    { label: 'Contributions', value: '100+', color: 'secondary' },
  ];

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-on-surface-variant font-mono text-xs mb-2">
        <span className="hover:text-primary-container cursor-pointer transition-colors">Network</span>
        <span className="text-white/20">&gt;</span>
        <button onClick={onBack} className="hover:text-primary-container transition-colors">Students</button>
        <span className="text-white/20">&gt;</span>
        <span className="text-on-surface">Profile View</span>
        <div className="ml-auto flex items-center gap-2 cursor-pointer hover:text-primary-container transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share Profile
        </div>
      </div>

      {/* Header Card */}
      <div className="glass-card rounded-xl p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
          <div className="flex-shrink-0 flex flex-col items-center gap-4 relative">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden border border-primary-container/50 shadow-[0_0_20px_rgba(0,240,255,0.15)] bg-surface-variant">
              <img
                src={student.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b1326] border border-primary-container/30 text-primary-container font-mono text-[10px] shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                Available for Internship
              </span>
            </div>
          </div>
          
          <div className="flex-1 w-full pt-2">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-mono font-bold text-on-surface mb-3 tracking-wide">{student.name}</h1>
                <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
                    {student.id || '2021CSE104'}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    Computer Science & Engineering
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    Year 3 / Sem 6
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2 bg-primary-container text-on-primary-container font-mono text-sm rounded font-semibold hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                  Message
                </button>
                <button className="px-5 py-2 border border-secondary-container text-secondary-container font-mono text-sm rounded font-semibold hover:bg-secondary-container/10 transition-all flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Resume
                </button>
                <button className="p-2 border border-white/20 text-on-surface-variant rounded hover:bg-white/5 transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                </button>
              </div>
            </div>
            <div className="w-full h-px bg-white/5 my-4" />
            <p className="text-sm font-mono text-on-surface-variant leading-relaxed max-w-4xl">
              {bio}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className={`glass-card rounded-xl p-4 flex flex-col items-center justify-center relative ${i === 0 ? 'border-t-2 border-t-primary-container' : i === 1 ? 'border-t-2 border-t-secondary-container' : i === 2 ? 'border-t-2 border-t-error' : i === 5 ? 'border-t-2 border-t-secondary-container' : 'border-t border-t-white/10'}`}>
            <span className={`text-2xl font-mono font-bold mb-1 ${stat.color === 'primary' ? 'text-primary-container' : stat.color === 'secondary' ? 'text-secondary-container' : stat.color === 'tertiary' ? 'text-error' : 'text-on-surface'}`}>
              {stat.value}
            </span>
            <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <nav className="border-b border-white/10">
        <ul className="flex items-center gap-8 font-mono text-xs overflow-x-auto">
          {tabs.map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`py-4 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-primary-container text-primary-container font-semibold'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {activeTab === 'Overview' && (
            <>
              {/* Career Objective */}
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-base font-mono text-on-surface mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-container" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  Career Objective
                </h2>
                <p className="text-xs font-mono text-on-surface-variant leading-relaxed mb-6">
                  To secure a challenging engineering position in a forward-thinking organization where I can leverage my expertise in distributed systems, machine learning, and systems architecture to build scalable, high-impact products.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-3">Areas of Interest</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Artificial Intelligence', 'Blockchain Core', 'Cloud Native', 'FinTech'].map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/5 font-mono text-[10px] text-on-surface hover:bg-white/[0.08] transition-colors cursor-default">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-3">Favorite Subjects</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Operating Systems', 'DBMS', 'Algorithm Design'].map((tag, i) => (
                        <span key={tag} className={`px-2.5 py-1 rounded bg-white/[0.03] border border-white/5 font-mono text-[10px] ${i === 2 ? 'text-secondary-container' : 'text-on-surface'} hover:bg-white/[0.08] transition-colors cursor-default`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Projects */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-base font-mono text-on-surface flex items-center gap-2">
                    <svg className="w-4 h-4 text-primary-container" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                    Featured Projects
                  </h2>
                  <button className="text-[10px] font-mono text-primary-container hover:underline uppercase tracking-wider">View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Project 1 */}
                  <div className="glass-card rounded-xl overflow-hidden flex flex-col relative border-t-2 border-t-primary-container bg-gradient-to-b from-primary-container/5 to-transparent">
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-mono font-bold text-on-surface">NeuralNet Optimizer</h3>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono border border-primary-container/30 text-primary-container bg-primary-container/10">Completed</span>
                      </div>
                      <p className="font-mono text-[10px] text-on-surface-variant leading-relaxed mb-4 flex-1">
                        A distributed framework for optimizing hyper-parameters of large scale neural networks using genetic algorithms across multi-node clusters.
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {['Python', 'PyTorch', 'Docker'].map(t => (
                          <span key={t} className="font-mono text-[9px] bg-[#1a2235] text-on-surface px-2 py-1 rounded border border-white/5">{t}</span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center gap-1 text-[10px] font-mono text-on-surface-variant">
                           <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                           GitHub
                        </div>
                        <a href="#" className="text-on-surface-variant hover:text-primary-container">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project 2 */}
                  <div className="glass-card rounded-xl overflow-hidden flex flex-col relative border-t-2 border-t-[#8B5CF6] bg-gradient-to-b from-[#8B5CF6]/5 to-transparent">
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-mono font-bold text-on-surface">Defi Protocol V2</h3>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono border border-secondary-container/30 text-secondary-container bg-secondary-container/10">In Progress</span>
                      </div>
                      <p className="font-mono text-[10px] text-on-surface-variant leading-relaxed mb-4 flex-1">
                        Smart contract architecture for a decentralized lending protocol with automated risk-assessment using zero-knowledge proofs.
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {['Solidity', 'React', 'ZK-SNARKs'].map(t => (
                          <span key={t} className="font-mono text-[9px] bg-[#1a2235] text-on-surface px-2 py-1 rounded border border-white/5">{t}</span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                        <div className="flex items-center gap-1 text-[10px] font-mono text-on-surface-variant">
                           <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                           GitHub
                        </div>
                        <a href="#" className="text-on-surface-variant hover:text-primary-container">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience & Leadership */}
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-base font-mono text-on-surface mb-6 flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-container" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Experience & Leadership
                </h2>
                <div className="relative border-l border-white/10 ml-2 space-y-8 pb-2">
                  {/* Exp 1 */}
                  <div className="relative pl-6">
                    <div className="absolute w-2.5 h-2.5 rounded-full -left-[5px] top-1.5 bg-primary-container shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                    <h3 className="font-mono text-sm font-semibold text-on-surface">Software Engineering Intern</h3>
                    <div className="flex items-center gap-2 font-mono text-[9px] text-on-surface-variant mb-3 mt-1">
                      <span className="text-primary-container">Google Summer of Code</span>
                      <span className="text-white/20">•</span>
                      <span>May 2023 - Aug 2023</span>
                    </div>
                    <p className="font-mono text-[10px] text-on-surface-variant leading-relaxed">
                      Contributed to the core compiler infrastructure. Implemented advanced dead-code elimination passes resulting in a 12% reduction in binary size for edge devices.
                    </p>
                  </div>
                  {/* Exp 2 */}
                  <div className="relative pl-6">
                    <div className="absolute w-2 h-2 rounded-full -left-[4px] top-1.5 border border-white/30 bg-surface-variant" />
                    <h3 className="font-mono text-sm font-semibold text-on-surface">Backend Developer</h3>
                    <div className="flex items-center gap-2 font-mono text-[9px] text-on-surface-variant mb-3 mt-1">
                      <span className="text-secondary-container">LocalTech Startup</span>
                      <span className="text-white/20">•</span>
                      <span>Jan 2023 - Apr 2023</span>
                    </div>
                    <p className="font-mono text-[10px] text-on-surface-variant leading-relaxed">
                      Designed and deployed RESTful APIs using Node.js and PostgreSQL. Migrated legacy monolithic architecture to microservices on AWS.
                    </p>
                  </div>
                  {/* Exp 3 */}
                  <div className="relative pl-6">
                    <div className="absolute w-2 h-2 rounded-full -left-[4px] top-1.5 border border-white/30 bg-surface-variant" />
                    <h3 className="font-mono text-sm font-semibold text-on-surface">GDSC Lead</h3>
                    <div className="flex items-center gap-2 font-mono text-[9px] text-on-surface-variant mb-3 mt-1">
                      <span className="text-on-surface">University Chapter</span>
                      <span className="text-white/20">•</span>
                      <span>Aug 2022 - Present</span>
                    </div>
                    <p className="font-mono text-[10px] text-on-surface-variant leading-relaxed">
                      Organized 15+ technical workshops and hackathons for a community of 500+ students. Facilitated study jams on Cloud computing and Machine Learning.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab !== 'Overview' && (
            <div className="glass-card rounded-xl p-8 text-center text-on-surface-variant font-mono">
              Content for {activeTab} is currently being updated to match the new design system.
            </div>
          )}
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Academic Status */}
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-4">Academic Status</h3>
            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">CGPA</span>
                <span className="text-secondary-container font-semibold">9.42 / 10</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Class Rank</span>
                <span className="text-on-surface">#3 of 240</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Graduation</span>
                <span className="text-on-surface">May 2025</span>
              </div>
            </div>
          </div>

          {/* Top Skills */}
          <div className="glass-card rounded-xl p-5">
            <h2 className="text-base font-mono text-on-surface mb-5 flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-container" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              Top Skills
            </h2>
            <div className="space-y-5">
              {[
                { name: 'C++ / Algorithms', score: 95, color: 'bg-primary-container' },
                { name: 'Python / AI', score: 88, color: 'bg-primary-container' },
                { name: 'React & TypeScript', score: 80, color: 'bg-primary-container' },
                { name: 'System Design', score: 75, color: 'bg-secondary-container' },
              ].map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between font-mono text-[10px] mb-1.5">
                    <span className="text-on-surface">{skill.name}</span>
                    <span className={skill.color.replace('bg-', 'text-')}>{skill.score}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${skill.color} rounded-full`}
                      style={{ width: `${skill.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/5">
              <h3 className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest mb-3">Languages</h3>
              <div className="flex gap-4 font-mono text-[10px]">
                 <span className="text-on-surface">ENG <span className="text-on-surface-variant">Native</span></span>
                 <span className="text-on-surface">HIN <span className="text-on-surface-variant">Native</span></span>
                 <span className="text-on-surface">GER <span className="text-on-surface-variant">A2</span></span>
              </div>
            </div>
          </div>

          {/* Activity Signals */}
          <div className="glass-card rounded-xl p-5">
             <h2 className="text-base font-mono text-on-surface mb-5 flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-container" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              Activity Signals
            </h2>
            <div className="space-y-3">
              <div className="bg-[#1a2235] rounded-lg p-3 flex items-center justify-between border border-white/5">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-[#FFA116]">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.541l4.273 4.01c.451.424 1.164.625 1.834.625.823 0 1.564-.282 2.115-.795l5.243-4.904a1.9 1.9 0 0 0 .584-1.391 1.884 1.884 0 0 0-.584-1.38l-4.553-4.27c-.452-.425-1.165-.626-1.835-.626-.822 0-1.564.282-2.114.795l-2.054 1.921L13.88 5.753l2.802-2.617c.452-.424 1.165-.625 1.835-.625.822 0 1.564.282 2.114.795l.487.457c.307.288.759.356 1.12.164.363-.191.568-.582.518-1.002-.038-.323-.178-.622-.403-.834L16.273.684A2.946 2.946 0 0 0 14.155 0H13.483zm.185 8.163c-.822 0-1.564.283-2.114.795L9.5 10.88v.001l-1.921 1.796-1.996-2.138.868-.93 4.192-4.488 4.293 4.595c.291.312.261.802-.066 1.077-.327.275-.828.243-1.119-.07L11.5 8.358l-2.585 2.766 1.488-1.391c.45-.425 1.164-.626 1.833-.626.822 0 1.564.283 2.115.796l4.552 4.269c.148.14.23.326.23.518s-.082.378-.23.518l-5.242 4.903c-.274.257-.655.398-1.057.398-.401 0-.783-.141-1.057-.398L5.276 16.1a3.642 3.642 0 0 1-1.127-2.646c0-.986.388-1.913 1.092-2.607l.001-.001 2.274-2.434 2.81-2.627c.275-.257.656-.398 1.058-.398.402 0 .783.141 1.057.398l2.054-1.92z"/></svg>
                   </div>
                   <div>
                     <p className="font-mono text-[10px] font-semibold text-on-surface">LeetCode</p>
                     <p className="font-mono text-[9px] text-on-surface-variant">Top 4% Global</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="font-mono text-[12px] font-bold text-on-surface">458</p>
                   <p className="font-mono text-[9px] text-on-surface-variant">Solved</p>
                 </div>
              </div>

              <div className="bg-[#1a2235] rounded-lg p-3 border border-white/5">
                 <div className="flex justify-between items-center mb-2">
                   <div className="flex items-center gap-2">
                     <svg className="w-3.5 h-3.5 text-on-surface-variant" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                     <span className="font-mono text-[10px] font-semibold text-on-surface">GitHub</span>
                   </div>
                   <span className="font-mono text-[9px] text-secondary-container bg-secondary-container/10 px-1.5 py-0.5 rounded border border-secondary-container/20">Active</span>
                 </div>
                 <div className="flex gap-1">
                   {[...Array(12)].map((_, i) => (
                     <div key={i} className={`flex-1 h-2 rounded-sm ${i % 3 === 0 ? 'bg-secondary-container/80' : i % 5 === 0 ? 'bg-secondary-container/40' : 'bg-white/5'}`} />
                   ))}
                 </div>
              </div>
            </div>
          </div>

          {/* Directory Contact Card */}
          <div className="glass-card rounded-xl p-4 flex gap-4 items-center">
            <div className="w-12 h-12 bg-white rounded flex flex-wrap p-1 gap-[2px]">
              {/* Fake QR pattern */}
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`w-[10px] h-[10px] ${[0,1,2,3,5,6,8].includes(i) ? 'bg-black' : 'bg-transparent'}`} />
              ))}
            </div>
            <div>
              <h3 className="font-mono text-[10px] font-semibold text-on-surface mb-1">Directory Contact Card</h3>
              <p className="font-mono text-[9px] text-on-surface-variant leading-tight">Scan to save student profile or share securely within network.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
