import { useState } from 'react';

export default function ClubGallery({ images }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!images || images.length === 0) {
    return <div className="text-center py-10 text-on-surface-variant text-sm font-mono">No images in gallery yet</div>;
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((src, idx) => (
          <div key={idx} onClick={() => setLightboxIndex(idx)}
            className="relative overflow-hidden rounded-xl cursor-pointer group aspect-video bg-surface border border-white/5">
            <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xl">🔍</span>
            </div>
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center" onClick={() => setLightboxIndex(null)}>
          <div className="max-w-5xl max-h-[90vh] p-4 relative">
            <img src={images[lightboxIndex]} alt="" className="max-w-full max-h-[85vh] object-contain rounded-xl" />
            <div className="flex justify-center gap-4 mt-3">
              {lightboxIndex > 0 && <button onClick={e => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }} className="text-primary-container font-mono text-sm hover:underline">&lt; prev</button>}
              <span className="text-on-surface-variant font-mono text-sm">{lightboxIndex + 1} / {images.length}</span>
              {lightboxIndex < images.length - 1 && <button onClick={e => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }} className="text-primary-container font-mono text-sm hover:underline">next &gt;</button>}
            </div>
            <button onClick={() => setLightboxIndex(null)} className="absolute -top-8 right-4 text-on-surface hover:text-primary-container transition-colors font-mono text-sm">[close]</button>
          </div>
        </div>
      )}
    </>
  );
}
