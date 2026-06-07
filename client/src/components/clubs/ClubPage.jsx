import { useState, useEffect } from 'react';
import api from '../../api';
import ClubGallery from './ClubGallery';
import ClubImageEditor from './ClubImageEditor';

const clubIcons = {
  'Tech': '💻',
  'Cultural': '🎭',
  'Sports': '⚽',
  'Social Welfare': '🤝',
  'Business': '💼',
  'Robotics': '🤖',
  'Content': '📝',
};

export default function ClubPage({ clubId, onBack }) {
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    if (clubId) fetchClub();
  }, [clubId]);

  const fetchClub = async () => {
    try {
      const data = await api.clubs.get(clubId);
      setClub(data);
    } catch (err) {
      console.error('Failed to fetch club:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImagesUpdate = (newImages) => {
    setClub(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    setShowEditor(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="neon-text text-lg animate-pulse">Loading club...</div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="text-center py-20">
        <div className="text-gray-500 font-mono">Club not found</div>
        <button onClick={onBack} className="text-neon-green font-mono mt-4">&gt; Back to clubs</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="text-gray-500 hover:text-neon-green transition-colors font-mono text-sm mb-4 inline-block"
      >
        &lt; Back to Clubs
      </button>

      <div className="relative rounded overflow-hidden h-48 bg-dark-700 border border-gray-800">
        {club.coverImage && (
          <img src={club.coverImage} alt="" className="w-full h-full object-cover opacity-60" />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-2">{clubIcons[club.category] || '🏛️'}</div>
            <h1 className="text-3xl font-bold font-mono neon-text">{club.name}</h1>
          </div>
        </div>
      </div>

      <p className="text-gray-400 font-mono text-sm leading-relaxed">{club.description}</p>

      <div className="glass-card rounded p-4 space-y-2">
        <h3 className="text-sm font-mono text-neon-green">Details</h3>
        <div className="text-sm font-mono text-gray-400">
          <p>Category: {club.category}</p>
          <p>President: {club.presidentId?.name || 'TBD'}</p>
          <p>Members: {club.members?.length || 0}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-mono font-bold text-white">Gallery</h2>
        <button
          onClick={() => setShowEditor(!showEditor)}
          className="text-xs text-neon-green border border-neon-green px-3 py-1 rounded hover:bg-neon-green/10 transition-colors font-mono"
        >
          {showEditor ? '[close editor]' : '[manage images]'}
        </button>
      </div>

      {showEditor && (
        <ClubImageEditor clubId={clubId} onSave={handleImagesUpdate} onClose={() => setShowEditor(false)} />
      )}

      <ClubGallery images={club.images || []} />

      {club.members && club.members.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-mono font-bold text-white">Members</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {club.members.map((member) => (
              <div key={member._id} className="bg-dark-700 rounded p-3 flex items-center gap-2 border border-gray-800">
                <img
                  src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                  alt={member.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-xs text-gray-300 font-mono truncate">{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
