import { useState, useEffect } from 'react';
import api from '../../api';

const clubIcons = {
  'Tech': '💻', 'Cultural': '🎭', 'Sports': '⚽',
  'Social Welfare': '🤝', 'Business': '💼', 'Robotics': '🤖', 'Content': '📝',
};

export default function ClubDirectory({ onSelectClub }) {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchClubs(); }, []);

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
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-on-surface-variant font-mono">Loading clubs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="text-label-sm text-primary-container">CLUBS</span>
        <h1 className="text-headline-lg font-mono text-on-surface mt-1">Clubs & Organizations</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clubs.map(club => (
          <button key={club._id} onClick={() => onSelectClub(club._id)}
            className="glass-card rounded-xl p-6 text-left group holographic">
            <div className="text-4xl mb-3">{clubIcons[club.category] || '🏛️'}</div>
            <h3 className="text-lg font-mono font-semibold text-on-surface group-hover:text-primary-container transition-colors">{club.name}</h3>
            <p className="text-xs text-on-surface-variant font-sans mt-2 line-clamp-2">{club.description}</p>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
              <span className="text-[10px] font-mono text-outline">President: {club.presidentId?.name || 'TBD'}</span>
              <span className="text-[10px] font-mono text-primary-container opacity-0 group-hover:opacity-100 transition-opacity">Access &rarr;</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
