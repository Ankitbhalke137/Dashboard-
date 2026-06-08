import { useState, useEffect } from 'react';
import api from '../../api';

const rarityColors = {
  common: 'text-on-surface-variant border-outline-variant',
  rare: 'text-primary-container border-primary-container/30',
  epic: 'text-tertiary-fixed-dim border-tertiary-fixed-dim/30',
  legendary: 'text-secondary-container border-secondary-container/30 animate-pulse-gold',
};

export default function TitlesPage() {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => { fetchTitles(); }, []);

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
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-on-surface-variant font-mono">Loading titles...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-lg font-mono text-on-surface pt-12">Titles & Badges</h1>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
              filter === cat ? 'bg-primary-container/15 text-primary-container border-primary-container/30'
                : 'border-white/10 text-on-surface-variant hover:text-on-surface'
            }`}>
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(title => (
          <div key={title._id} className={`glass-card rounded-xl p-4 holographic ${rarityColors[title.rarity] || 'border-white/10'}`}>
            <div className="text-4xl mb-2">{title.icon}</div>
            <h3 className="text-sm font-mono font-semibold text-on-surface">{title.name}</h3>
            <p className="text-xs text-on-surface-variant font-sans mt-1">{title.description}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
              <span className={`text-[10px] font-mono uppercase ${rarityColors[title.rarity]?.split(' ')[0] || 'text-outline'}`}>
                {title.rarity}
              </span>
              <span className="text-[10px] font-mono text-outline">{title.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
