import { useState, useEffect } from 'react';
import api from '../../api';

const cats = [
  { id: 'project', label: 'Project Ideas', icon: '💡' },
  { id: 'career', label: 'Career Prep', icon: '🚀' },
  { id: 'internship', label: 'Internships', icon: '💼' },
  { id: 'skill', label: 'Skills', icon: '🎯' },
];

export default function PracticalResources() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('project');

  useEffect(() => {
    api.suggestions.list({}).then(setSuggestions).catch(err => console.error('Failed to fetch suggestions:', err)).finally(() => setLoading(false));
  }, []);

  const filtered = suggestions.filter(s => s.category === active);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-on-surface-variant font-mono">Loading resources...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-lg font-mono text-on-surface pt-12">Practical Resources</h1>
        <p className="text-sm text-on-surface-variant font-sans mt-1">Curated resources to help B.Tech CSE students level up.</p>
      </div>

      <div className="flex gap-2 bg-surface-low rounded-lg p-1 border border-white/5 w-fit">
        {cats.map(c => (
          <button key={c.id} onClick={() => setActive(c.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-mono transition-all ${
              active === c.id ? 'bg-primary-container/15 text-primary-container' : 'text-on-surface-variant hover:text-on-surface'
            }`}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(item => (
          <div key={item._id} className="glass-card rounded-xl p-4 holographic">
            <h3 className="text-sm font-mono font-semibold text-on-surface">{item.title}</h3>
            <p className="text-xs text-on-surface-variant font-sans mt-2 leading-relaxed">{item.description}</p>
            {item.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {item.tags.map(tag => (
                  <span key={tag} className="tech-tag text-primary-container border-primary-container/20">#{tag}</span>
                ))}
              </div>
            )}
            {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-container hover:underline mt-2 inline-block font-mono">Learn more &rarr;</a>}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-10 text-on-surface-variant font-mono text-sm">No resources yet</div>
        )}
      </div>
    </div>
  );
}
