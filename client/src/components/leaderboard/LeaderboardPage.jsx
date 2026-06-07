import { useState, useEffect } from 'react';
import api from '../../api';

const categories = [
  { id: 'coding', label: 'Coding', icon: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z' },
  { id: 'problem_solving', label: 'Problem Solving', icon: 'M21 16.5c0-.38-.21-.72-.56-.9l-2.68-1.35c-.22-.13-.47-.2-.72-.2-.25 0-.5.07-.72.2l-.28.14V9.98c.55-.16 1-.63 1-1.22V7c0-.62-.47-1.11-1.05-1.19C14.82 5.04 13.01 5 12 5s-2.82.04-3.95.81C7.47 5.89 7 6.38 7 7v1.76c0 .59.45 1.06 1 1.22v6.47l-.28-.14c-.22-.13-.47-.2-.72-.2-.25 0-.5.07-.72.2L3.56 15.6c-.35.18-.56.52-.56.9 0 .37.2.7.52.88l3.4 1.7c.2.1.42.15.64.15.23 0 .46-.05.66-.16l2.33-1.16c.49-.25.73-.73.77-1.23.01-.07.04-.16.04-.23V9.98c.28.11.59.18.92.2v4.95c0 .07.03.16.04.23.04.5.28.98.77 1.23l2.33 1.16c.2.11.43.16.66.16.22 0 .44-.05.64-.15l3.4-1.7c.32-.18.52-.51.52-.88z' },
  { id: 'sports', label: 'Sports', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' },
];

export default function LeaderboardPage() {
  const [activeCategory, setActiveCategory] = useState('coding');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchLeaderboard(); }, [activeCategory]);

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

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-on-surface-variant font-mono">Loading leaderboard...</span>
        </div>
      </div>
    );
  }

  const podium = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-label-sm text-primary-container">LEADERBOARD</span>
        <h1 className="text-headline-lg font-mono text-on-surface mt-1">Global Rankings</h1>
      </div>

      <div className="flex gap-2 bg-surface-low rounded-lg p-1 border border-white/5 w-fit">
        {categories.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-mono transition-all ${
              activeCategory === cat.id ? 'bg-primary-container/15 text-primary-container' : 'text-on-surface-variant hover:text-on-surface'
            }`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={cat.icon} /></svg>
            {cat.label}
          </button>
        ))}
      </div>

      {podium.length > 0 && (
        <div className="flex items-end justify-center gap-4 mb-8">
          {podium.length > 1 && (
            <div className="glass-card rounded-xl p-5 text-center w-48 holographic">
              <div className="text-2xl font-mono font-bold text-primary-container animate-pulse-cyan">#2</div>
              <img src={podium[1]?.studentId?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${podium[1]?.studentId?.name}`}
                alt="" className="w-16 h-16 rounded-full mx-auto my-2 border-2 border-primary-container/30" />
              <div className="text-sm font-mono font-semibold text-on-surface">{podium[1]?.studentId?.name}</div>
              <div className="text-lg font-mono font-bold text-primary-container mt-1">{podium[1]?.score?.toLocaleString()}</div>
              <div className="text-[10px] font-mono text-on-surface-variant">XP</div>
            </div>
          )}
          {podium.length > 0 && (
            <div className="glass-card rounded-xl p-6 text-center w-52 scale-105 holographic">
              <div className="cyber-ring rounded-xl" />
              <div className="text-3xl font-mono font-bold text-secondary-container animate-pulse-gold">#1</div>
              <img src={podium[0]?.studentId?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${podium[0]?.studentId?.name}`}
                alt="" className="w-24 h-24 rounded-full mx-auto my-2 border-2 border-secondary-container/30" />
              <div className="text-base font-mono font-semibold text-on-surface">{podium[0]?.studentId?.name}</div>
              <div className="text-xl font-mono font-bold text-secondary-container mt-1">{podium[0]?.score?.toLocaleString()}</div>
              <div className="text-[10px] font-mono text-on-surface-variant">XP</div>
            </div>
          )}
          {podium.length > 2 && (
            <div className="glass-card rounded-xl p-5 text-center w-48 holographic">
              <div className="text-2xl font-mono font-bold text-tertiary-fixed-dim">#3</div>
              <img src={podium[2]?.studentId?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${podium[2]?.studentId?.name}`}
                alt="" className="w-16 h-16 rounded-full mx-auto my-2 border-2 border-tertiary-fixed-dim/30" />
              <div className="text-sm font-mono font-semibold text-on-surface">{podium[2]?.studentId?.name}</div>
              <div className="text-lg font-mono font-bold text-tertiary-fixed-dim mt-1">{podium[2]?.score?.toLocaleString()}</div>
              <div className="text-[10px] font-mono text-on-surface-variant">XP</div>
            </div>
          )}
        </div>
      )}

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider">Global Ranking — {categories.find(c => c.id === activeCategory)?.label}</span>
        </div>
        <div className="divide-y divide-white/5">
          {[...podium, ...rest].map((entry, idx) => (
            <div key={entry._id} className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-all group">
              <div className="w-8 text-center font-mono text-sm font-bold text-on-surface-variant">
                {idx < 3 ? ['🥇', '🥈', '🥉'][idx] : `#${idx + 1}`}
              </div>
              <img src={entry.studentId?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.studentId?.name}`}
                alt="" className="w-10 h-10 rounded-full border border-white/10" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-mono font-medium text-on-surface truncate">{entry.studentId?.name || 'Unknown'}</div>
                <div className="text-xs text-on-surface-variant font-mono">{entry.studentId?.batch || ''}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono font-bold text-primary-container">{entry.score?.toLocaleString()}</div>
                <div className="w-24 h-1.5 bg-surface-high rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-container to-secondary-container rounded-full animate-pulse" style={{ width: `${Math.min(100, (entry.score / 10000) * 100)}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
