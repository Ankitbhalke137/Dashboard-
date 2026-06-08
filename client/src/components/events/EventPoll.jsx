import { useState, useEffect } from 'react';

export default function EventPoll({ event }) {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (event?._id) fetchPolls();
  }, [event]);

  const fetchPolls = async () => {
    try {
      const res = await fetch(`/api/events/${event._id}/polls`);
      const data = await res.json();
      setPolls(data);
    } catch (err) {
      console.error('Failed to fetch polls:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (pollId, optionIndex) => {
    try {
      await fetch(`/api/polls/${pollId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionIndex }),
      });
      fetchPolls();
    } catch (err) {
      console.error('Failed to vote:', err);
    }
  };

  if (loading) {
    return <div className="text-gray-500 text-xs font-mono">Loading polls...</div>;
  }

  if (polls.length === 0) return null;

  return (
    <div className="space-y-4">
      {polls.map(poll => (
        <div key={poll._id} className="bg-dark-700 rounded p-4 border border-gray-800">
          <h4 className="text-sm text-white font-mono mb-3">{poll.question}</h4>
          <div className="space-y-2">
            {poll.options.map((opt, idx) => {
              const totalVotes = poll.options.reduce((sum, o) => sum + o.votes.length, 0);
              const pct = totalVotes > 0 ? Math.round((opt.votes.length / totalVotes) * 100) : 0;
              return (
                <button
                  key={idx}
                  onClick={() => handleVote(poll._id, idx)}
                  className="w-full text-left p-2 rounded border border-gray-700 hover:border-neon-green/50 transition-colors relative overflow-hidden group"
                >
                  <div
                    className="absolute inset-0 bg-neon-green/10 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                  <div className="relative flex justify-between items-center">
                    <span className="text-sm text-gray-300 font-mono">{opt.text}</span>
                    <span className="text-xs text-gray-500 font-mono">{pct}% ({opt.votes.length})</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
