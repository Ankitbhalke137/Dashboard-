import { useState, useEffect } from 'react';
import StudentGrid from './StudentGrid';
import api from '../../api';

export default function DirectoryPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    batch: '',
    isLeapxIntern: false,
    search: '',
  });
  const [locations, setLocations] = useState([]);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, [filters.location, filters.batch, filters.isLeapxIntern, filters.search]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.location) params.location = filters.location;
      if (filters.batch) params.batch = filters.batch;
      if (filters.isLeapxIntern) params.isLeapxIntern = 'true';
      if (filters.search) params.search = filters.search;
      const data = await api.students.list(params);
      setStudents(data);
      if (data.length > 0) {
        setLocations([...new Set(data.map(s => s.location).filter(Boolean))]);
        setBatches([...new Set(data.map(s => s.batch).filter(Boolean))]);
      }
    } catch (err) {
      console.error('Failed to fetch students:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-mono font-bold">
          <span className="neon-text">&gt;</span> Student Directory
        </h1>
        <span className="text-gray-500 text-sm font-mono">
          {students.length} records found
        </span>
      </div>

      <div className="glass-card p-4 rounded space-y-3">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs text-gray-500 font-mono block mb-1">Search</label>
            <input
              type="text"
              placeholder="> search by name..."
              value={filters.search}
              onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
              className="w-full bg-dark-700 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-neon-green focus:outline-none font-mono"
            />
          </div>
          <div className="w-40">
            <label className="text-xs text-gray-500 font-mono block mb-1">Location</label>
            <select
              value={filters.location}
              onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
              className="w-full bg-dark-700 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-neon-green focus:outline-none font-mono"
            >
              <option value="">All</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="w-40">
            <label className="text-xs text-gray-500 font-mono block mb-1">Batch</label>
            <select
              value={filters.batch}
              onChange={(e) => setFilters(f => ({ ...f, batch: e.target.value }))}
              className="w-full bg-dark-700 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:border-neon-green focus:outline-none font-mono"
            >
              <option value="">All</option>
              {batches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer pb-1">
            <input
              type="checkbox"
              checked={filters.isLeapxIntern}
              onChange={(e) => setFilters(f => ({ ...f, isLeapxIntern: e.target.checked }))}
              className="w-4 h-4 accent-neon-green"
            />
            <span className="text-sm font-mono text-neon-green animate-glow">Show Leapx Interns Only</span>
          </label>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="neon-text text-lg animate-pulse">Loading directory...</div>
        </div>
      ) : (
        <StudentGrid students={students} />
      )}
    </div>
  );
}
