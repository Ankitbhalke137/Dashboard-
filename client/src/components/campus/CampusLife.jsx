import { useState, useEffect } from 'react';
import api from '../../api';

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calculate = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calculate());
    const interval = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-4 md:gap-6">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="text-3xl md:text-5xl font-mono font-bold text-primary-container animate-pulse-cyan">
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest mt-1">{unit}</div>
        </div>
      ))}
    </div>
  );
}

export default function CampusLife() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      const [upcoming, past] = await Promise.all([
        api.events.list({ type: 'upcoming' }),
        api.events.list({ type: 'past' }),
      ]);
      setEvents([...upcoming, ...past]);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary-container border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-on-surface-variant font-mono">Loading campus life...</span>
        </div>
      </div>
    );
  }

  const upcoming = events.filter(e => e.type === 'upcoming');
  const past = events.filter(e => e.type === 'past');
  const allImages = past.flatMap(e => e.images.map(img => ({ src: img, event: e.title })));
  const filteredImages = filter === 'all' ? allImages : allImages;

  return (
    <div className="space-y-8">
      <div>
        <span className="text-label-sm text-primary-container">CAMPUS LIFE</span>
        <h1 className="text-headline-lg font-mono text-on-surface mt-1">Events & Memories</h1>
      </div>

      {upcoming.length > 0 && (
        <div className="glass-card rounded-xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-primary-container w-full h-full">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
            </svg>
          </div>
          <div className="relative z-10">
            <span className="text-label-sm text-primary-container bg-primary-container/10 px-3 py-1 rounded-full border border-primary-container/20">
              Main Event Approaching
            </span>
            <h2 className="text-headline-md font-mono font-semibold text-on-surface mt-4 mb-6">
              {upcoming[0].title}
            </h2>
            <CountdownTimer targetDate={upcoming[0].date} />
            {upcoming[0].registrationLink && (
              <a href={upcoming[0].registrationLink} target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 bg-primary-container text-on-primary px-5 py-2.5 rounded-lg font-mono text-sm font-medium hover:brightness-110 transition-all">
                Secure Your Access
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
              </a>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono font-semibold text-on-surface">Event Memories</h2>
            <div className="flex gap-2">
              {['all', 'Hackathons', 'Cultural'].map(f => (
                <button key={f} onClick={() => setFilter(f.toLowerCase())}
                  className={`text-xs font-mono px-3 py-1 rounded-full transition-all ${
                    filter === f.toLowerCase() ? 'bg-primary-container/15 text-primary-container border border-primary-container/30' : 'text-on-surface-variant hover:text-on-surface'
                  }`}>
                  {f === 'all' ? 'All' : f}
                </button>
              ))}
            </div>
          </div>

          <div className="columns-1 sm:columns-2 gap-4 space-y-4">
            {filteredImages.length > 0 ? filteredImages.map((img, idx) => (
              <div key={idx} className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
                onClick={() => setSelectedImage(img)}>
                <img src={img.src} alt="" className="w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-mono">{img.event}</span>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-10 text-on-surface-variant text-sm font-mono">
                No event memories available
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-mono font-semibold text-on-surface">Upcoming Events</h2>
          {upcoming.map(event => (
            <div key={event._id} className="glass-card rounded-xl p-4 flex gap-3">
              <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-primary-container/10 border border-primary-container/20 flex-shrink-0">
                <span className="text-lg font-mono font-bold text-primary-container">
                  {new Date(event.date).getDate()}
                </span>
                <span className="text-[8px] font-mono text-on-surface-variant uppercase">
                  {new Date(event.date).toLocaleString('default', { month: 'short' })}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-mono font-medium text-on-surface truncate">{event.title}</h3>
                <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                  {event.description?.slice(0, 60)}...
                </p>
                <span className="inline-block text-[10px] font-mono text-secondary-container border border-secondary-container/20 rounded-full px-2 py-0.5 mt-2">
                  UPCOMING
                </span>
              </div>
            </div>
          ))}

          <div className="glass-card rounded-xl p-4 text-center">
            <span className="text-2xl">📅</span>
            <p className="text-sm font-mono text-on-surface mt-2">Never Miss a Byte</p>
            <p className="text-xs text-on-surface-variant font-mono mt-1">Sync events to your calendar</p>
            <button className="mt-3 text-xs font-mono text-primary-container border border-primary-container/30 px-4 py-1.5 rounded-lg hover:bg-primary-container/10 transition-all">
              Sync Calendar
            </button>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <div className="max-w-4xl max-h-[90vh] relative">
            <img src={selectedImage.src} alt="" className="max-w-full max-h-[85vh] object-contain rounded-xl" />
            <p className="text-center text-on-surface-variant text-sm mt-2 font-mono">{selectedImage.event}</p>
            <button onClick={() => setSelectedImage(null)} className="absolute -top-8 right-0 text-on-surface hover:text-primary-container transition-colors font-mono text-sm">[close]</button>
          </div>
        </div>
      )}
    </div>
  );
}
