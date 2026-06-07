export default function LeaderboardTable({ entries, category }) {
  if (!entries || entries.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 font-mono text-sm">
        No entries yet for this category
      </div>
    );
  }

  const getRankStyle = (index) => {
    switch (index) {
      case 0: return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5';
      case 1: return 'text-gray-300 border-gray-300/30 bg-gray-300/5';
      case 2: return 'text-amber-600 border-amber-600/30 bg-amber-600/5';
      default: return 'text-gray-500 border-gray-800';
    }
  };

  const getMedal = (index) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `#${index + 1}`;
    }
  };

  return (
    <div className="space-y-2">
      {entries.map((entry, index) => (
        <div
          key={entry._id}
          className={`flex items-center gap-4 bg-dark-600 rounded border p-3 transition-all hover:bg-dark-700 ${getRankStyle(index)}`}
        >
          <div className="w-10 text-center font-mono text-sm font-bold">
            {getMedal(index)}
          </div>
          <img
            src={entry.studentId?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.studentId?.name}`}
            alt={entry.studentId?.name}
            className="w-10 h-10 rounded-full border border-gray-700"
          />
          <div className="flex-1 min-w-0">
            <div className="text-white font-mono text-sm font-semibold truncate">
              {entry.studentId?.name || 'Unknown'}
            </div>
            {entry.studentId?.batch && (
              <div className="text-gray-600 text-xs font-mono">{entry.studentId.batch}</div>
            )}
          </div>
          <div className="text-right">
            <div className="text-white font-mono font-bold text-lg">
              {entry.score.toLocaleString()}
            </div>
            <div className="text-gray-600 text-xs font-mono">points</div>
          </div>
        </div>
      ))}
    </div>
  );
}
