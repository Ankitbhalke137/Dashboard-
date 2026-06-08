import { useState, useEffect } from 'react';
import api from '../../api';
import ClubGallery from './ClubGallery';
import ClubImageEditor from './ClubImageEditor';

const clubIcons = {
  'Tech': '💻', 'Cultural': '🎭', 'Sports': '⚽',
  'Social Welfare': '🤝', 'Business': '💼', 'Robotics': '🤖', 'Content': '📝',
};

export default function ClubPage({ clubId, onBack }) {
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => { if (clubId) fetchClub(); }, [clubId]);

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
    setClub(prev => ({ ...prev, images: [...(prev.images || []), ...newImages] }));
    setShowEditor(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-on-surface-variant font-mono">Loading club...</span>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="text-center py-20">
        <div className="text-on-surface-variant font-mono">Club not found</div>
        <button onClick={onBack} className="text-primary-container font-mono mt-4">&gt; Back to clubs</button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-on-surface-variant hover:text-primary-container transition-colors font-mono text-sm inline-block">&lt; Back to Clubs</button>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="relative h-48 bg-gradient-to-br from-surface-high via-surface to-surface-dim flex items-center justify-center">
          {club.coverImage && <img src={club.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />}
          <div className="relative text-center">
            <div className="text-5xl mb-2">{clubIcons[club.category] || '🏛️'}</div>
            <h1 className="text-headline-lg font-mono font-bold text-primary-container">{club.name}</h1>
          </div>
        </div>
        <div className="p-6">
          <p className="text-sm text-on-surface-variant font-sans leading-relaxed">{club.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-4 space-y-2">
          <h3 className="text-label-sm text-primary-container">Details</h3>
          <div className="text-xs font-mono text-on-surface-variant space-y-1">
            <p>Category: {club.category}</p>
            <p>President: {club.presidentId?.name || 'TBD'}</p>
            <p>Members: {club.members?.length || 0}</p>
          </div>
        </div>

        <div className="lg:col-span-2 flex items-center justify-between">
          <h2 className="text-sm font-mono font-semibold text-on-surface">Gallery</h2>
          <button onClick={() => setShowEditor(!showEditor)}
            className="text-xs font-mono text-primary-container border border-primary-container/30 px-3 py-1.5 rounded-lg hover:bg-primary-container/10 transition-all">
            {showEditor ? '[close editor]' : '[manage images]'}
          </button>
        </div>
      </div>

      {showEditor && <ClubImageEditor clubId={clubId} onSave={handleImagesUpdate} onClose={() => setShowEditor(false)} />}
      <ClubGallery images={club.images || []} />

      {club.members?.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-mono font-semibold text-on-surface">Members ({club.members.length})</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {club.members.map(member => (
              <div key={member._id} className="glass-card rounded-lg p-3 flex items-center gap-2">
                <img src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} alt="" className="w-8 h-8 rounded-lg border border-white/10" />
                <span className="text-xs font-mono text-on-surface truncate">{member.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
