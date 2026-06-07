import { useState } from 'react';

const steps = ['Personal Info', 'Skills', 'Projects', 'Achievements'];

export default function ResumeBuilder() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    portfolio: '',
    education: { degree: '', institution: '', year: '', cgpa: '' },
    skills: [''],
    projects: [{ title: '', description: '', techStack: '', link: '' }],
    achievements: [''],
    summary: '',
  });

  const update = (field, value) => setData(prev => ({ ...prev, [field]: value }));
  const updateNested = (parent, index, field, value) => {
    const arr = [...data[parent]];
    arr[index] = { ...arr[index], [field]: value };
    update(parent, arr);
  };
  const addItem = (field, template) => update(field, [...data[field], template]);
  const removeItem = (field, index) => {
    const arr = data[field].filter((_, i) => i !== index);
    update(field, arr.length ? arr : [templateFor(field)]);
  };

  const templateFor = (field) => {
    if (field === 'skills') return '';
    if (field === 'projects') return { title: '', description: '', techStack: '', link: '' };
    if (field === 'achievements') return '';
    return '';
  };

  const handlePrint = () => window.print();

  return (
    <div className="space-y-6 no-print">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-mono font-bold">
          <span className="neon-text">&gt;</span> Resume Builder
        </h1>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-neon-green/20 border border-neon-green text-neon-green rounded hover:bg-neon-green/30 transition-colors font-mono text-sm"
        >
          &gt; Generate PDF
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {steps.map((s, i) => (
          <button
            key={s}
            onClick={() => setStep(i)}
            className={`px-3 py-1 rounded text-xs font-mono border transition-all ${
              step === i
                ? 'border-neon-green text-neon-green bg-neon-green/10'
                : i < step
                ? 'border-green-800 text-green-600'
                : 'border-gray-700 text-gray-500'
            }`}
          >
            {i + 1}. {s}
          </button>
        ))}
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="flex-1 glass-card rounded p-6 space-y-4">
          {step === 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-mono neon-text">Personal Information</h3>
              <Input label="Full Name" value={data.name} onChange={v => update('name', v)} />
              <Input label="Email" value={data.email} onChange={v => update('email', v)} type="email" />
              <Input label="Phone" value={data.phone} onChange={v => update('phone', v)} />
              <Input label="Location" value={data.location} onChange={v => update('location', v)} />
              <Input label="LinkedIn URL" value={data.linkedin} onChange={v => update('linkedin', v)} />
              <Input label="GitHub URL" value={data.github} onChange={v => update('github', v)} />
              <Input label="Portfolio URL" value={data.portfolio} onChange={v => update('portfolio', v)} />
              <div>
                <label className="text-xs text-gray-500 font-mono block mb-1">Professional Summary</label>
                <textarea
                  value={data.summary}
                  onChange={e => update('summary', e.target.value)}
                  rows={3}
                  className="w-full bg-dark-700 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-neon-green focus:outline-none font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Degree" value={data.education.degree} onChange={v => setData(p => ({ ...p, education: { ...p.education, degree: v } }))} />
                <Input label="Institution" value={data.education.institution} onChange={v => setData(p => ({ ...p, education: { ...p.education, institution: v } }))} />
                <Input label="Year" value={data.education.year} onChange={v => setData(p => ({ ...p, education: { ...p.education, year: v } }))} />
                <Input label="CGPA" value={data.education.cgpa} onChange={v => setData(p => ({ ...p, education: { ...p.education, cgpa: v } }))} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <h3 className="text-sm font-mono neon-text">Technical Skills</h3>
              {data.skills.map((skill, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    value={skill}
                    onChange={e => {
                      const arr = [...data.skills];
                      arr[i] = e.target.value;
                      update('skills', arr);
                    }}
                    placeholder="e.g., React, Node.js, Python..."
                    className="flex-1 bg-dark-700 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-neon-green focus:outline-none font-mono"
                  />
                  <button onClick={() => removeItem('skills', i)} className="text-red-400 text-xs hover:text-red-300 font-mono">[x]</button>
                </div>
              ))}
              <button onClick={() => addItem('skills', '')} className="text-xs text-neon-green font-mono hover:underline">+ Add Skill</button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-mono neon-text">Projects</h3>
              {data.projects.map((proj, i) => (
                <div key={i} className="bg-dark-700 rounded p-3 space-y-2 border border-gray-800">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-mono">Project {i + 1}</span>
                    <button onClick={() => removeItem('projects', i)} className="text-red-400 text-xs font-mono">[remove]</button>
                  </div>
                  <Input label="Title" value={proj.title} onChange={v => updateNested('projects', i, 'title', v)} />
                  <div>
                    <label className="text-xs text-gray-500 font-mono block mb-1">Description</label>
                    <textarea
                      value={proj.description}
                      onChange={e => updateNested('projects', i, 'description', e.target.value)}
                      rows={2}
                      className="w-full bg-dark-600 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-neon-green focus:outline-none font-mono"
                    />
                  </div>
                  <Input label="Tech Stack" value={proj.techStack} onChange={v => updateNested('projects', i, 'techStack', v)} />
                  <Input label="Link" value={proj.link} onChange={v => updateNested('projects', i, 'link', v)} />
                </div>
              ))}
              <button onClick={() => addItem('projects', templateFor('projects'))} className="text-xs text-neon-green font-mono hover:underline">+ Add Project</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <h3 className="text-sm font-mono neon-text">Achievements</h3>
              {data.achievements.map((ach, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    value={ach}
                    onChange={e => {
                      const arr = [...data.achievements];
                      arr[i] = e.target.value;
                      update('achievements', arr);
                    }}
                    placeholder="e.g., Won Hackathon, Published Paper..."
                    className="flex-1 bg-dark-700 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-neon-green focus:outline-none font-mono"
                  />
                  <button onClick={() => removeItem('achievements', i)} className="text-red-400 text-xs hover:text-red-300 font-mono">[x]</button>
                </div>
              ))}
              <button onClick={() => addItem('achievements', '')} className="text-xs text-neon-green font-mono hover:underline">+ Add Achievement</button>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t border-gray-800">
            <button
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-sm text-gray-500 hover:text-white disabled:opacity-30 font-mono"
            >
              &lt; Previous
            </button>
            <button
              onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
              disabled={step === steps.length - 1}
              className="text-sm text-neon-green hover:underline disabled:opacity-30 font-mono"
            >
              Next &gt;
            </button>
          </div>
        </div>

        <div className="flex-1 print-area">
          <div className="bg-white text-black rounded shadow-lg p-8 min-h-[800px] font-mono text-xs leading-relaxed print:shadow-none print:rounded-none print:p-0 print:m-0" id="resume-preview">
            <div className="border-b-2 border-black pb-4 mb-4">
              <h1 className="text-2xl font-bold">{data.name || 'Your Name'}</h1>
              <div className="text-gray-600 mt-1 space-x-3">
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>| {data.phone}</span>}
                {data.location && <span>| {data.location}</span>
}              </div>
              <div className="text-gray-500 text-xs mt-1 space-x-3">
                {data.github && <span>GitHub: {data.github}</span>}
                {data.linkedin && <span>LinkedIn: {data.linkedin}</span>}
                {data.portfolio && <span>Portfolio: {data.portfolio}</span>}
              </div>
            </div>

            {data.summary && (
              <div className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-2">Summary</h2>
                <p className="text-gray-700">{data.summary}</p>
              </div>
            )}

            {(data.education.degree || data.education.institution) && (
              <div className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-2">Education</h2>
                <p><strong>{data.education.degree}</strong> — {data.education.institution} ({data.education.year})</p>
                {data.education.cgpa && <p className="text-gray-600">CGPA: {data.education.cgpa}</p>}
              </div>
            )}

            {data.skills.filter(Boolean).length > 0 && (
              <div className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-2">Skills</h2>
                <p>{data.skills.filter(Boolean).join(' • ')}</p>
              </div>
            )}

            {data.projects.filter(p => p.title).length > 0 && (
              <div className="mb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-2">Projects</h2>
                {data.projects.filter(p => p.title).map((proj, i) => (
                  <div key={i} className="mb-3">
                    <h3 className="font-semibold">{proj.title}</h3>
                    {proj.description && <p className="text-gray-700">{proj.description}</p>}
                    {proj.techStack && <p className="text-gray-500 text-xs mt-1">Tech: {proj.techStack}</p>}
                    {proj.link && <a href={proj.link} className="text-blue-600 text-xs">{proj.link}</a>}
                  </div>
                ))}
              </div>
            )}

            {data.achievements.filter(Boolean).length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-gray-300 mb-2">Achievements</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {data.achievements.filter(Boolean).map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="text-xs text-gray-500 font-mono block mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-dark-700 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-neon-green focus:outline-none font-mono"
      />
    </div>
  );
}
