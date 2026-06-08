import { useState, useEffect } from 'react';
import api from '../../api';

const tiers = [
  { key: 'Core', label: 'Core Command', level: 'Level 01', icon: 'shield_person' },
  { key: 'ASC', label: 'Academic Support Council', level: 'Level 02', icon: 'school' },
  { key: 'CR', label: 'Class Representatives', level: 'Level 03', icon: 'diversity_3' },
  { key: 'SOH', label: 'Student Outreach Heads', level: 'Level 04', icon: 'forum' },
];

const tierAccentClass = {
  Core: 'accent-bar-primary',
  ASC: 'accent-bar-secondary',
  CR: 'accent-bar-tertiary',
  SOH: 'accent-bar-error',
};

export default function GovernancePage() {
  const [leaders, setLeaders] = useState([]);
  const [toppers, setToppers] = useState([]);
  const [activeTier, setActiveTier] = useState('Core');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const [leadersData, toppersData] = await Promise.all([
        api.governance.leaders({}),
        api.governance.toppers(),
      ]);
      setLeaders(leadersData);
      setToppers(toppersData);
    } catch (err) {
      console.error('Failed to fetch governance data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-on-surface-variant font-mono">Loading governance...</span>
        </div>
      </div>
    );
  }

  const filtered = leaders.filter(l => l.tier === activeTier);
  const currentTier = tiers.find(t => t.key === activeTier);

  const getGridCols = (count) => {
    if (count <= 2) return 'grid-cols-1 md:grid-cols-2';
    return 'grid-cols-1 md:grid-cols-3';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-lg font-mono text-on-surface pt-12">Governance & Leadership</h1>
      </div>

      <div className="flex flex-wrap gap-2">
        {tiers.map(tier => (
          <button key={tier.key} onClick={() => setActiveTier(tier.key)}
            className={`px-4 py-2 rounded-lg text-xs font-mono border transition-all ${
              activeTier === tier.key
                ? 'bg-primary-container/15 text-primary-container border-primary-container/30'
                : 'border-white/10 text-on-surface-variant hover:text-on-surface'
            }`}>
            {tier.label}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-label-sm text-primary-container">{currentTier?.level}</span>
            <h2 className="text-headline-md font-mono text-on-surface mt-1">{currentTier?.label}</h2>
          </div>
          <span className="text-xs font-mono text-on-surface-variant">{filtered.length} members</span>
        </div>

        <div className={`grid ${getGridCols(filtered.length)} gap-4`}>
          {filtered.map(leader => (
            <div key={leader._id} className="glass-card rounded-xl p-4 flex gap-4 items-start group holographic">
              <div className={`accent-bar h-full ${tierAccentClass[leader.tier] || 'accent-bar-primary'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <img
                    src={leader.studentId?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${leader.studentId?.name}`}
                    alt={leader.studentId?.name}
                    className={`w-12 h-12 rounded-xl border-2 ${activeTier === 'Core' ? 'w-20 h-20' : 'w-12 h-12'} border-primary-container/30 bg-surface-low object-cover transition-all`}
                  />
                  <div>
                    <h3 className="text-sm font-mono font-semibold text-on-surface">{leader.studentId?.name}</h3>
                    <p className="text-xs font-mono text-primary-container">{leader.role}</p>
                    <p className="text-[10px] font-mono text-on-surface-variant">{leader.clubName}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 space-y-4">
        <h2 className="text-headline-md font-mono text-on-surface">Top Performers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {toppers.map(topper => (
            <div key={topper._id} className="glass-card rounded-xl p-4 flex items-center gap-3 holographic">
              <div className="accent-bar h-12 accent-bar-secondary" />
              <img
                src={topper.studentId?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${topper.studentId?.name}`}
                alt={topper.studentId?.name}
                className="w-12 h-12 rounded-full border-2 border-secondary-container/30"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-mono font-semibold text-on-surface truncate">{topper.studentId?.name}</h3>
                <p className="text-xs font-mono text-secondary-container">CGPA: {topper.cgpa}</p>
                <p className="text-[10px] font-mono text-on-surface-variant">Semester {topper.semester} — {topper.department}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
