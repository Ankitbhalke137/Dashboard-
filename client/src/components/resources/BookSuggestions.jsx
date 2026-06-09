import { useState, useEffect } from 'react';
import api from '../../api';

const categoryColors = {
  programming: 'text-[#3178C6] border-[#3178C6]/30',
  dsa: 'text-secondary-container border-secondary-container/30',
  web: 'text-primary-container border-primary-container/30',
  ml: 'text-tertiary-fixed-dim border-tertiary-fixed-dim/30',
  career: 'text-[#FF9900] border-[#FF9900]/30',
  'soft-skills': 'text-error border-error/30',
  other: 'text-on-surface-variant border-white/10',
};

export default function BookSuggestions() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    api.books.list({}).then(setBooks).catch(err => console.error('Failed to fetch books:', err)).finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...new Set(books.map(b => b.category))];
  const filtered = filter && filter !== 'all' ? books.filter(b => b.category === filter) : books;

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-on-surface-variant font-mono">Loading books...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-headline-lg font-mono text-on-surface pt-12">Book Suggestions</h1>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat === 'all' ? '' : cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
              (filter === cat || (!filter && cat === 'all'))
                ? 'bg-primary-container/15 text-primary-container border-primary-container/30'
                : 'border-white/10 text-on-surface-variant hover:text-on-surface'
            }`}>
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(book => {
          const knownCovers = {
            'Introduction to Algorithms': 'https://covers.openlibrary.org/b/isbn/9780262033848-L.jpg',
            'Clean Code': 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg',
            'The Pragmatic Programmer': 'https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg',
            'Designing Data-Intensive Applications': 'https://covers.openlibrary.org/b/isbn/9781449373320-L.jpg',
            'Cracking the Coding Interview': 'https://covers.openlibrary.org/b/isbn/9780984782857-L.jpg',
            'Deep Learning': 'https://covers.openlibrary.org/b/isbn/9780262035613-L.jpg',
            'Atomic Habits': 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg'
          };
          const coverUrl = knownCovers[book.title];

          return (
            <div key={book._id} className="glass-card rounded-xl p-4 holographic">
              <div className="flex gap-4">
                <div className="w-16 h-24 bg-surface-low rounded-lg flex items-center justify-center flex-shrink-0 border border-white/5 overflow-hidden shadow-lg">
                  {coverUrl ? (
                    <img src={coverUrl} alt={book.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">📖</span>
                  )}
                </div>
                <div className="flex-1 min-w-0 flex flex-col">
                  <h3 className="text-sm font-mono font-semibold text-on-surface line-clamp-2">{book.title}</h3>
                  <p className="text-xs text-on-surface-variant font-sans mt-0.5">{book.author}</p>
                  <p className="text-[10px] text-outline font-sans mt-2 line-clamp-2 flex-1">{book.description}</p>
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${categoryColors[book.category] || categoryColors.other}`}>{book.category}</span>
                    {book.link && <a href={book.link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary-container hover:underline font-mono ml-auto font-semibold">View Book &rarr;</a>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
