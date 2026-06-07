import { useState, useEffect } from 'react';
import api from '../../api';

const categories = [
  { id: 'project', label: '💡 Project Ideas', icon: '💡' },
  { id: 'career', label: '🚀 Career Prep', icon: '🚀' },
  { id: 'internship', label: '💼 Internships', icon: '💼' },
  { id: 'skill', label: '🎯 Skill Building', icon: '🎯' },
];

export default function PracticalResources() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('project');

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const data = await api.suggestions.list({});
      setSuggestions(data);
    } catch (err) {
      console.error('Failed to fetch suggestions:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = suggestions.filter(s => s.category === activeCategory);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="neon-text text-lg animate-pulse">Loading resources...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-mono font-bold">
        <span className="neon-text">&gt;</span> Practical Resources
      </h1>

      <p className="text-gray-400 text-sm font-mono">
        Curated resources to help B.Tech CSE students with projects, career prep, internships, and skill building.
      </p>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded text-sm font-mono border transition-all flex items-center gap-2 ${
              activeCategory === cat.id
                ? 'border-neon-green text-neon-green bg-neon-green/10'
                : 'border-gray-700 text-gray-500 hover:text-white'
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(item => (
          <div key={item._id} className="bg-dark-600 rounded border border-gray-800 p-4 card-hover">
            <h3 className="text-white font-semibold font-mono text-sm">{item.title}</h3>
            <p className="text-gray-400 text-xs font-mono mt-2 leading-relaxed">{item.description}</p>
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {item.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded text-xs border border-neon-green/20 text-neon-green font-mono">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            {item.link && (
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-neon-green hover:underline mt-2 inline-block font-mono">
                &gt; Learn more
              </a>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-500 font-mono text-sm">
            No resources in this category yet
          </div>
        )}
      </div>
    </div>
  );
}
