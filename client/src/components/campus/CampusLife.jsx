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
    <div className="flex gap-4 font-mono">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="text-2xl md:text-3xl font-bold neon-text animate-glow">
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">{unit}</div>
        </div>
      ))}
    </div>
  );
}

function EventImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative overflow-hidden rounded group cursor-pointer">
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-48 object-cover transition-all duration-500 group-hover:scale-110 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      {!loaded && (
        <div className="absolute inset-0 bg-dark-700 flex items-center justify-center">
          <span className="text-gray-600 text-sm font-mono">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default function CampusLife() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

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
        <div className="neon-text text-lg animate-pulse">Loading campus life...</div>
      </div>
    );
  }

  const upcomingEvents = events.filter(e => e.type === 'upcoming');
  const pastEvents = events.filter(e => e.type === 'past');
  const allImages = pastEvents.flatMap(e => e.images.map(img => ({ src: img, event: e.title })));

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-mono font-bold">
        <span className="neon-text">&gt;</span> Campus Life
      </h1>

      <div className="glass-card rounded p-6 space-y-4">
        <h2 className="text-lg font-mono text-neon-green flex items-center gap-2">
          <span>📅</span> Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingEvents.map((event) => (
            <div key={event._id} className="bg-dark-700 rounded p-4 border border-neon-green/20 space-y-3">
              <h3 className="text-white font-mono font-semibold text-sm">{event.title}</h3>
              <p className="text-gray-400 text-xs font-mono line-clamp-2">{event.description}</p>
              <CountdownTimer targetDate={event.date} />
              {event.registrationLink && (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs text-neon-green border border-neon-green px-3 py-1 rounded hover:bg-neon-green/10 transition-colors font-mono"
                >
                  &gt; Register Now
                </a>
              )}
            </div>
          ))}
          {upcomingEvents.length === 0 && (
            <p className="text-gray-500 text-sm font-mono col-span-full">No upcoming events scheduled</p>
          )}
        </div>
      </div>

      <div className="glass-card rounded p-6 space-y-4">
        <h2 className="text-lg font-mono text-neon-green flex items-center gap-2">
          <span>📸</span> Event Memories
        </h2>
        {allImages.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {allImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img)}
                className="break-inside-avoid cursor-pointer"
              >
                <EventImage src={img.src} alt={`${img.event} - ${idx}`} />
                <p className="text-xs text-gray-500 mt-1 font-mono">{img.event}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm font-mono">No event memories available</p>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh] relative">
            <img src={selectedImage.src} alt="" className="max-w-full max-h-[90vh] object-contain" />
            <p className="text-center text-gray-400 text-sm mt-2 font-mono">{selectedImage.event}</p>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-8 right-0 text-white hover:text-neon-green transition-colors font-mono"
            >
              [close]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
