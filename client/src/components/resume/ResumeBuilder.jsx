import { useState } from 'react';

const steps = ['Personal Info', 'Education', 'Experience', 'Skills', 'Projects'];

export default function ResumeBuilder() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: '', email: '', phone: '', location: '', linkedin: '', github: '', portfolio: '',
    education: { degree: '', institution: '', year: '', cgpa: '' },
    skills: [''],
    projects: [{ title: '', description: '', techStack: '', link: '' }],
    achievements: [''],
    summary: '',
  });

  const update = (f, v) => setData(p => ({ ...p, [f]: v }));
  const addItem = (f, t) => update(f, [...data[f], t]);
  const removeItem = (f, i) => { const a = data[f].filter((_, idx) => idx !== i); update(f, a.length ? a : ['']); };

  const handlePrint = () => window.print();

  const Input = ({ label, val, onChange, type = 'text', multiline }) => (
    <div>
      <label className="text-label-sm text-on-surface-variant block mb-1">{label}</label>
      {multiline ? (
        <textarea value={val} onChange={e => onChange(e.target.value)} rows={3}
          className="input-glass w-full text-sm resize-none" />
      ) : (
        <input type={type} value={val} onChange={e => onChange(e.target.value)}
          className="input-glass w-full text-sm" />
      )}
    </div>
  );

  return (
    <div className="space-y-6 no-print">
      <div className="flex items-center justify-between pt-12">
        <div>
          <h1 className="text-headline-lg font-mono text-on-surface">Resume Builder</h1>
        </div>
        <button onClick={handlePrint}
          className="bg-primary-container text-on-primary px-5 py-2.5 rounded-lg font-mono text-sm font-medium hover:brightness-110 transition-all flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>
          Export PDF
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {steps.map((s, i) => (
          <button key={s} onClick={() => setStep(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
              step === i ? 'bg-primary-container/15 text-primary-container border-primary-container/30'
                : i < step ? 'border-secondary-container/30 text-secondary-container'
                : 'border-white/10 text-on-surface-variant'
            }`}>
            {i + 1}. {s}
          </button>
        ))}
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="lg:w-2/5 glass-card rounded-xl p-6 space-y-4">
          {step === 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-mono font-semibold text-primary-container">Personal Information</h3>
              <Input label="Full Name" val={data.name} onChange={v => update('name', v)} />
              <Input label="Email" val={data.email} onChange={v => update('email', v)} type="email" />
              <Input label="Phone" val={data.phone} onChange={v => update('phone', v)} />
              <Input label="Location" val={data.location} onChange={v => update('location', v)} />
              <Input label="LinkedIn" val={data.linkedin} onChange={v => update('linkedin', v)} />
              <Input label="GitHub" val={data.github} onChange={v => update('github', v)} />
              <Input label="Portfolio" val={data.portfolio} onChange={v => update('portfolio', v)} />
              <Input label="Professional Summary" val={data.summary} onChange={v => update('summary', v)} multiline />
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <h3 className="text-sm font-mono font-semibold text-primary-container">Education</h3>
              <Input label="Degree" val={data.education.degree} onChange={v => update('education', { ...data.education, degree: v })} />
              <Input label="Institution" val={data.education.institution} onChange={v => update('education', { ...data.education, institution: v })} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Year" val={data.education.year} onChange={v => update('education', { ...data.education, year: v })} />
                <Input label="CGPA" val={data.education.cgpa} onChange={v => update('education', { ...data.education, cgpa: v })} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <h3 className="text-sm font-mono font-semibold text-primary-container">Experience</h3>
              <Input label="Achievements (one per line)" val={data.achievements.join('\n')}
                onChange={v => update('achievements', v.split('\n'))} multiline />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <h3 className="text-sm font-mono font-semibold text-primary-container">Skills</h3>
              {data.skills.map((s, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input value={s} onChange={e => { const a = [...data.skills]; a[i] = e.target.value; update('skills', a); }}
                    placeholder="e.g., React, Node.js..."
                    className="input-glass flex-1 text-sm" />
                  <button onClick={() => removeItem('skills', i)} className="text-error text-xs hover:text-error/80 font-mono">[x]</button>
                </div>
              ))}
              <button onClick={() => addItem('skills', '')} className="text-xs text-primary-container font-mono hover:underline">+ Add Skill</button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-sm font-mono font-semibold text-primary-container">Projects</h3>
              {data.projects.map((p, i) => (
                <div key={i} className="bg-surface-low rounded-lg p-3 space-y-2 border border-white/5">
                  <div className="flex justify-between">
                    <span className="text-xs text-on-surface-variant font-mono">Project {i + 1}</span>
                    <button onClick={() => removeItem('projects', i)} className="text-error text-xs font-mono">[remove]</button>
                  </div>
                  <Input label="Title" val={p.title} onChange={v => { const a = [...data.projects]; a[i] = { ...a[i], title: v }; update('projects', a); }} />
                  <Input label="Description" val={p.description} onChange={v => { const a = [...data.projects]; a[i] = { ...a[i], description: v }; update('projects', a); }} multiline />
                  <Input label="Tech Stack" val={p.techStack} onChange={v => { const a = [...data.projects]; a[i] = { ...a[i], techStack: v }; update('projects', a); }} />
                </div>
              ))}
              <button onClick={() => addItem('projects', { title: '', description: '', techStack: '', link: '' })}
                className="text-xs text-primary-container font-mono hover:underline">+ Add Project</button>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-white/5">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className="text-sm text-on-surface-variant hover:text-on-surface disabled:opacity-30 font-mono">&lt; Previous</button>
            <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1}
              className="text-sm text-primary-container hover:underline disabled:opacity-30 font-mono">Next &gt;</button>
          </div>
        </div>

        <div className="lg:w-3/5 relative">
          <div className="absolute inset-0 rounded-xl" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,219,233,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="relative bg-white text-black rounded-xl shadow-2xl p-8 md:p-10 mx-auto max-w-[595px] print:shadow-none print:rounded-none print:p-0" id="resume-preview">
            <div className="bg-primary-container text-on-primary -mx-8 -mt-8 px-8 py-6 md:-mx-10 md:-mt-10 print:bg-black print:text-white">
              <h1 className="text-3xl font-mono font-bold">{data.name || 'Your Name'}</h1>
              <div className="text-sm mt-2 opacity-80 space-x-3 font-sans">
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>| {data.phone}</span>}
                {data.location && <span>| {data.location}</span>}
              </div>
              <div className="text-xs mt-1 opacity-60 space-x-3 font-mono">
                {data.github && <span>GitHub: {data.github}</span>}
                {data.linkedin && <span>LinkedIn: {data.linkedin}</span>}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-6">
              <div className="col-span-2 space-y-4">
                {data.summary && (
                  <div>
                    <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Summary</h2>
                    <p className="text-xs text-gray-700 leading-relaxed">{data.summary}</p>
                  </div>
                )}
                {data.education.degree && (
                  <div>
                    <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Education</h2>
                    <p className="text-xs"><strong>{data.education.degree}</strong> — {data.education.institution} ({data.education.year})</p>
                    {data.education.cgpa && <p className="text-xs text-gray-600">CGPA: {data.education.cgpa}</p>}
                  </div>
                )}
                {data.projects.filter(p => p.title).length > 0 && (
                  <div>
                    <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Projects</h2>
                    {data.projects.filter(p => p.title).map((p, i) => (
                      <div key={i} className="mb-2">
                        <h3 className="text-xs font-semibold">{p.title}</h3>
                        <p className="text-xs text-gray-700">{p.description}</p>
                        {p.techStack && <p className="text-[10px] text-gray-500 mt-0.5">Tech: {p.techStack}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-4">
                {data.skills.filter(Boolean).length > 0 && (
                  <div>
                    <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-1">
                      {data.skills.filter(Boolean).map((s, i) => (
                        <span key={i} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {data.achievements.filter(Boolean).length > 0 && (
                  <div>
                    <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2">Achievements</h2>
                    <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                      {data.achievements.filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
              <span className="text-[8px] text-gray-400 font-mono">VERIFIED BY KINETIC ACADEMY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
