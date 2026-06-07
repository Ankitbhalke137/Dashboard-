import { useState, useEffect } from 'react';
import api from '../../api';
import LeaderboardTable from './LeaderboardTable';

const categories = [
  { id: 'coding', label: 'Coding', icon: '💻' },
  { id: 'problem_solving', label: 'Problem Solving', icon: '🧩' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
];

export default function LeaderboardPage() {
  const [activeCategory, setActiveCategory] = useState('coding');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [activeCategory]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await api.leaderboard.get(activeCategory);
      setEntries(data);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-mono font-bold">
        <span className="neon-text">&gt;</span> Leaderboard
      </h1>

      <div className="flex gap-2">
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
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="neon-text text-lg animate-pulse">Loading leaderboard...</div>
        </div>
      ) : (
        <LeaderboardTable entries={entries} category={activeCategory} />
      )}
    </div>
  );
}
