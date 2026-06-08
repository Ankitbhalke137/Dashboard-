import { useState, useEffect } from 'react';
import api from '../../api';
import TitleBadge from './TitleBadge';

export default function StudentTitles({ studentId, compact = false }) {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (studentId) fetchTitles();
  }, [studentId]);

  const fetchTitles = async () => {
    try {
      const data = await api.titles.student(studentId);
      setTitles(data);
    } catch (err) {
      console.error('Failed to fetch student titles:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || titles.length === 0) return null;

  if (compact) {
    return (
      <div className="flex gap-1">
        {titles.slice(0, 3).map(st => (
          <TitleBadge key={st._id} title={st.titleId} size="sm" />
        ))}
        {titles.length > 3 && <span className="text-xs text-gray-500 self-center">+{titles.length - 3}</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {titles.map(st => (
        <div key={st._id} className="flex items-center gap-1 bg-dark-700 rounded-full px-2 py-0.5 border border-gray-700">
          <TitleBadge title={st.titleId} size="sm" />
          <span className="text-xs text-gray-300 font-mono">{st.titleId?.name}</span>
        </div>
      ))}
    </div>
  );
}
