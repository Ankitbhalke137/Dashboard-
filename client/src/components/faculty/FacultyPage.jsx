import { useState, useEffect } from 'react';
import api from '../../api';

export default function FacultyPage() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchFaculty(); }, []);

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
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-on-surface-variant font-mono">Loading faculty...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="pt-12">
        <h1 className="text-headline-lg font-mono text-on-surface">Faculty Directory</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {faculty.map((member) => (
          <div key={member._id} className="glass-card rounded-xl p-5 space-y-4 group">
            <div className="flex items-center gap-4">
              <img
                src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                alt={member.name}
                className="w-16 h-16 rounded-xl border-2 border-primary-container/30 bg-surface-low"
              />
      <div className="pt-12">
                <h3 className="text-base font-mono font-semibold text-on-surface">{member.name}</h3>
                <p className="text-xs font-mono text-primary-container mt-0.5">{member.designation}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm font-sans">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <svg className="w-4 h-4 text-primary-container" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <span>{member.department}</span>
              </div>
              {member.email && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary-container" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  <a href={`mailto:${member.email}`} className="text-on-surface-variant hover:text-primary-container transition-colors">{member.email}</a>
                </div>
              )}
              {member.officeHours && (
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <svg className="w-4 h-4 text-primary-container" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
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
