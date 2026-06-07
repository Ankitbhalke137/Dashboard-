import { useState, useEffect } from 'react';
import api from '../../api';

const tierConfig = {
  Core: { label: 'Club Core', color: 'text-neon-green', border: 'border-neon-green' },
  CR: { label: 'Class Representatives', color: 'text-neon-blue', border: 'border-neon-blue' },
  ASC: { label: 'Academic Society Council', color: 'text-neon-pink', border: 'border-neon-pink' },
  SOH: { label: 'Student Outreach Heads', color: 'text-neon-yellow', border: 'border-neon-yellow' },
};

export default function GovernancePage() {
  const [leaders, setLeaders] = useState([]);
  const [toppers, setToppers] = useState([]);
  const [activeTier, setActiveTier] = useState('Core');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

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
        <div className="neon-text text-lg animate-pulse">Loading governance...</div>
      </div>
    );
  }

  const filteredLeaders = leaders.filter(l => l.tier === activeTier);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-mono font-bold">
        <span className="neon-text">&gt;</span> Governance
      </h1>

      <div className="flex flex-wrap gap-2">
        {Object.entries(tierConfig).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setActiveTier(key)}
            className={`px-4 py-2 rounded text-sm font-mono border transition-all ${
              activeTier === key
                ? `${config.border} ${config.color} bg-dark-600`
                : 'border-gray-700 text-gray-500 hover:text-white'
            }`}
          >
            {config.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeaders.map((leader) => (
          <div
            key={leader._id}
            className={`bg-dark-600 rounded border ${tierConfig[leader.tier]?.border || 'border-gray-800'} p-4 card-hover`}
          >
            <div className="flex items-center gap-3">
              <img
                src={leader.studentId?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${leader.studentId?.name}`}
                alt={leader.studentId?.name}
                className="w-12 h-12 rounded-full border border-neon-green/30"
              />
              <div>
                <h3 className="text-white font-semibold font-mono text-sm">{leader.studentId?.name}</h3>
                <p className={`text-xs font-mono ${tierConfig[leader.tier]?.color}`}>
                  {leader.role} — {leader.clubName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-mono font-bold mb-4">
          <span className="neon-text">&gt;</span> Academic Toppers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {toppers.map((topper) => (
            <div key={topper._id} className="bg-dark-600 rounded border border-neon-yellow/30 p-4 card-hover">
              <div className="flex items-center gap-3">
                <img
                  src={topper.studentId?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${topper.studentId?.name}`}
                  alt={topper.studentId?.name}
                  className="w-12 h-12 rounded-full border border-neon-yellow/30"
                />
                <div>
                  <h3 className="text-white font-semibold font-mono text-sm">{topper.studentId?.name}</h3>
                  <p className="text-neon-yellow text-xs font-mono">
                    CGPA: {topper.cgpa} | Sem {topper.semester}
                  </p>
                  <p className="text-gray-500 text-xs font-mono">{topper.department}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
