import { useState, useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';

export default function ContactList({ onSelectContact }) {
  const { onlineUsers } = useSocket();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/students')
      .then(r => r.json())
      .then(data => setStudents(data))
      .catch(console.error);
  }, []);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="search contacts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-dark-700 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-neon-green focus:outline-none font-mono"
      />
      <div className="space-y-1 max-h-96 overflow-y-auto">
        {filtered.map(student => (
          <button
            key={student._id}
            onClick={() => onSelectContact(student)}
            className="w-full flex items-center gap-3 p-2 rounded hover:bg-dark-700 transition-colors text-left"
          >
            <div className="relative">
              <img
                src={student.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`}
                alt=""
                className="w-8 h-8 rounded-full"
              />
              {onlineUsers?.includes(student._id) && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-neon-green rounded-full border-2 border-dark-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white font-mono truncate">{student.name}</div>
              <div className="text-xs text-gray-600 font-mono">{student.location}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
