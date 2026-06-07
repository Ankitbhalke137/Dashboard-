import { useState } from 'react';

export default function ClubGallery({ images }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-sm font-mono">
        No images in gallery yet
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((src, idx) => (
          <div
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            className="relative overflow-hidden rounded cursor-pointer group aspect-video bg-dark-700 border border-gray-800"
          >
            <img
              src={src}
              alt={`Gallery ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-2xl">🔍</span>
            </div>
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="max-w-5xl max-h-[90vh] p-4 relative">
            <img
              src={images[lightboxIndex]}
              alt=""
              className="max-w-full max-h-[85vh] object-contain"
            />
            <div className="flex justify-center gap-4 mt-3">
              {lightboxIndex > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
                  className="text-neon-green font-mono text-sm hover:underline"
                >
                  &lt; prev
                </button>
              )}
              <span className="text-gray-500 font-mono text-sm">
                {lightboxIndex + 1} / {images.length}
              </span>
              {lightboxIndex < images.length - 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
                  className="text-neon-green font-mono text-sm hover:underline"
                >
                  next &gt;
                </button>
              )}
            </div>
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute -top-8 right-4 text-white hover:text-neon-green transition-colors font-mono text-sm"
            >
              [close]
            </button>
          </div>
        </div>
      )}
    </>
  );
}
