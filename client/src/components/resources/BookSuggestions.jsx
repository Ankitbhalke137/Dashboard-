import { useState, useEffect } from 'react';
import api from '../../api';

const categoryColors = {
  programming: 'text-blue-400 border-blue-400/30',
  dsa: 'text-green-400 border-green-400/30',
  web: 'text-cyan-400 border-cyan-400/30',
  ml: 'text-purple-400 border-purple-400/30',
  career: 'text-yellow-400 border-yellow-400/30',
  'soft-skills': 'text-pink-400 border-pink-400/30',
  other: 'text-gray-400 border-gray-400/30',
};

export default function BookSuggestions() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await api.books.list({});
      setBooks(data);
    } catch (err) {
      console.error('Failed to fetch books:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(books.map(b => b.category))];
  const filtered = filter && filter !== 'all' ? books.filter(b => b.category === filter) : books;

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="neon-text text-lg animate-pulse">Loading books...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-mono font-bold">
        <span className="neon-text">&gt;</span> Book Suggestions
      </h1>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat === 'all' ? '' : cat)}
            className={`px-3 py-1 rounded text-xs font-mono border ${
              (filter === cat || (!filter && cat === 'all'))
                ? 'border-neon-green text-neon-green bg-neon-green/10'
                : 'border-gray-700 text-gray-500 hover:text-white'
            }`}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(book => (
          <div key={book._id} className="bg-dark-600 rounded border border-gray-800 p-4 card-hover">
            <div className="flex gap-3">
              <div className="w-16 h-20 bg-dark-700 rounded flex items-center justify-center flex-shrink-0 border border-gray-700">
                <span className="text-2xl">📖</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold font-mono text-sm">{book.title}</h3>
                <p className="text-gray-400 text-xs font-mono mt-0.5">{book.author}</p>
                <p className="text-gray-600 text-xs font-mono mt-2 line-clamp-2">{book.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-0.5 rounded text-xs border font-mono ${categoryColors[book.category] || categoryColors.other}`}>
                    {book.category}
                  </span>
                  {book.link && (
                    <a href={book.link} target="_blank" rel="noopener noreferrer" className="text-xs text-neon-green hover:underline font-mono ml-auto">
                      View →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
