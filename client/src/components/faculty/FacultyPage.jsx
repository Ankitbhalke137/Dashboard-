import { useState, useEffect } from 'react';
import api from '../../api';

export default function FacultyPage() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const data = await api.faculty.list({});
      setFaculty(data);
    } catch (err) {
      console.error('Failed to fetch faculty:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="neon-text text-lg animate-pulse">Loading faculty...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-mono font-bold">
          <span className="neon-text">&gt;</span> Faculty Directory
        </h1>
        <span className="text-gray-500 text-sm font-mono">{faculty.length} members</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {faculty.map((member) => (
          <div
            key={member._id}
            className="bg-dark-600 rounded border border-gray-800 p-5 card-hover space-y-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                alt={member.name}
                className="w-16 h-16 rounded-full border border-neon-blue/30 bg-dark-700"
              />
              <div>
                <h3 className="text-white font-semibold font-mono text-sm">{member.name}</h3>
                <p className="text-neon-blue text-xs font-mono mt-0.5">{member.designation}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm font-mono">
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-neon-blue">🏛️</span>
                <span>{member.department}</span>
              </div>
              {member.email && (
                <div className="flex items-center gap-2">
                  <span className="text-neon-blue">📧</span>
                  <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-neon-green transition-colors">
                    {member.email}
                  </a>
                </div>
              )}
              {member.officeHours && (
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="text-neon-blue">🕐</span>
                  <span>{member.officeHours}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
