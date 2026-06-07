import { useState, useEffect } from 'react';
import api from '../../api';

const clubIcons = {
  'Tech': '💻',
  'Cultural': '🎭',
  'Sports': '⚽',
  'Social Welfare': '🤝',
  'Business': '💼',
  'Robotics': '🤖',
  'Content': '📝',
};

export default function ClubDirectory({ onSelectClub }) {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const data = await api.clubs.list();
      setClubs(data);
    } catch (err) {
      console.error('Failed to fetch clubs:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="neon-text text-lg animate-pulse">Loading clubs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-mono font-bold">
        <span className="neon-text">&gt;</span> Clubs
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clubs.map((club) => (
          <button
            key={club._id}
            onClick={() => onSelectClub(club._id)}
            className="bg-dark-600 rounded border border-gray-800 p-6 card-hover text-left group"
          >
            <div className="text-4xl mb-3">{clubIcons[club.category] || '🏛️'}</div>
            <h3 className="text-white font-semibold font-mono text-lg group-hover:neon-text transition-colors">
              {club.name}
            </h3>
            <p className="text-gray-400 text-xs font-mono mt-2 line-clamp-2">{club.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-gray-600 font-mono">
                President: {club.presidentId?.name || 'TBD'}
              </span>
              <span className="text-xs text-neon-green font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                &gt; Enter
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
