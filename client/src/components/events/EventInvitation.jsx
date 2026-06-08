import { useState } from 'react';

export default function EventInvitation({ event, onRsvp }) {
  const [status, setStatus] = useState(null);

  const handleRsvp = async (response) => {
    setStatus(response);
    if (onRsvp) onRsvp(event._id, response);
    try {
      await fetch(`/api/events/${event._id}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: response }),
      });
    } catch (err) {
      console.error('Failed to RSVP:', err);
    }
  };

  if (!event) return null;

  return (
    <div className="glass-card rounded p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-neon-green text-lg">📩</span>
        <h3 className="text-white font-mono text-sm font-semibold">You're Invited!</h3>
      </div>
      <p className="text-gray-300 font-mono text-sm">{event.title}</p>
      <p className="text-gray-500 text-xs font-mono">{new Date(event.date).toLocaleDateString()}</p>

      {!status ? (
        <div className="flex gap-2">
          <button
            onClick={() => handleRsvp('accepted')}
            className="px-4 py-1 rounded text-xs font-mono border border-neon-green text-neon-green hover:bg-neon-green/10 transition-colors"
          >
            ✓ Accept
          </button>
          <button
            onClick={() => handleRsvp('maybe')}
            className="px-4 py-1 rounded text-xs font-mono border border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 transition-colors"
          >
            ? Maybe
          </button>
          <button
            onClick={() => handleRsvp('declined')}
            className="px-4 py-1 rounded text-xs font-mono border border-red-500 text-red-500 hover:bg-red-500/10 transition-colors"
          >
            ✗ Decline
          </button>
        </div>
      ) : (
        <div className="text-xs font-mono">
          {status === 'accepted' && <span className="text-neon-green">✓ You're attending</span>}
          {status === 'maybe' && <span className="text-yellow-500">? Marked as maybe</span>}
          {status === 'declined' && <span className="text-red-500">✗ Declined</span>}
        </div>
      )}
    </div>
  );
}
