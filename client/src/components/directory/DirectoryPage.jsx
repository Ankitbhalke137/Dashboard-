import { useState, useEffect } from 'react';
import StudentGrid from './StudentGrid';
import api from '../../api';

export default function DirectoryPage({ onViewProfile }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '', batch: '', isLeapxIntern: false, search: '',
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
        setBatches([...new Set(data.map(s => s.batch).filter(Boolean))].filter(b => parseInt(b) >= 2025).sort());
      }
    } catch (err) {
      console.error('Failed to fetch students:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pt-12">
        <div>
          <h1 className="text-headline-lg font-mono text-on-surface">Student Directory</h1>
        </div>

      </div>

      <div className="glass-card rounded-xl p-4 md:p-6">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="text-label-sm text-on-surface-variant block mb-1.5">Search</label>
            <input
              type="text"
              placeholder="Search by name..."
              value={filters.search}
              onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
              className="input-glass w-full text-sm"
            />
          </div>
          <div className="w-36">
            <label className="text-label-sm text-on-surface-variant block mb-1.5">Location</label>
            <select
              value={filters.location}
              onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
              className="input-glass w-full text-sm"
            >
              <option value="">All</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <div className="w-36">
            <label className="text-label-sm text-on-surface-variant block mb-1.5">Batch</label>
            <select
              value={filters.batch}
              onChange={(e) => setFilters(f => ({ ...f, batch: e.target.value }))}
              className="input-glass w-full text-sm"
            >
              <option value="">All</option>
              {batches.map(b => <option key={b} value={b}>{`${b}-${parseInt(b) + 1}`}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer pb-3">
            <input
              type="checkbox"
              checked={filters.isLeapxIntern}
              onChange={(e) => setFilters(f => ({ ...f, isLeapxIntern: e.target.checked }))}
              className="w-4 h-4 accent-[#00f0ff]"
            />
            <span className="text-sm font-mono text-secondary-container">LEAPX Interns Only</span>
          </label>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-on-surface-variant font-mono">Scanning directory...</span>
          </div>
        </div>
      ) : (
        <StudentGrid students={students} onViewProfile={onViewProfile} />
      )}
    </div>
  );
}
