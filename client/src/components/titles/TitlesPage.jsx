import { useState, useEffect } from 'react';
import api from '../../api';

const rarityColors = {
  common: 'text-gray-400 border-gray-500',
  rare: 'text-blue-400 border-blue-500',
  epic: 'text-purple-400 border-purple-500',
  legendary: 'text-yellow-400 border-yellow-500 animate-glow',
};

export default function TitlesPage() {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTitles();
  }, []);

  const fetchTitles = async () => {
    try {
      const data = await api.titles.list();
      setTitles(data);
    } catch (err) {
      console.error('Failed to fetch titles:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(titles.map(t => t.category))];
  const filtered = filter === 'all' ? titles : titles.filter(t => t.category === filter);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="neon-text text-lg animate-pulse">Loading titles...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-mono font-bold">
        <span className="neon-text">&gt;</span> Titles & Badges
      </h1>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded text-xs font-mono border ${
              filter === cat
                ? 'border-neon-green text-neon-green bg-neon-green/10'
                : 'border-gray-700 text-gray-500 hover:text-white'
            }`}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(title => (
          <div
            key={title._id}
            className={`bg-dark-600 rounded border p-4 card-hover ${rarityColors[title.rarity] || 'border-gray-700'}`}
          >
            <div className="text-4xl mb-2">{title.icon}</div>
            <h3 className="text-white font-semibold font-mono text-sm">{title.name}</h3>
            <p className="text-gray-400 text-xs font-mono mt-1">{title.description}</p>
            <div className="flex items-center justify-between mt-3">
              <span className={`text-xs font-mono ${rarityColors[title.rarity] || 'text-gray-500'}`}>
                {title.rarity?.toUpperCase()}
              </span>
              <span className="text-xs text-gray-600 font-mono">{title.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
