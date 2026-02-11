import Image from "next/image";
import { useState } from "react";

interface FullGalleryModalProps {
  galleryPhotos: string[];
  onClose: () => void;
  onEnlargePhoto: (photo: string) => void;
}

export default function FullGalleryModal({ galleryPhotos, onClose, onEnlargePhoto }: FullGalleryModalProps) {
  const [visiblePhotosCount, setVisiblePhotosCount] = useState(12);

  return (
    <div className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-sm flex flex-col popup-stable popup-container">
      {/* Header fisso */}
      <div className="flex items-center justify-between p-4 bg-black/95 border-b border-purple-500/20 flex-shrink-0">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
          I nostri ricordi
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-300 hover:text-pink-400 hover:border-pink-500/50 transition-all cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Griglia foto scrollabile con lazy loading */}
      <div
        className="flex-1 overflow-y-auto scroll-container"
        onScroll={(e) => {
          const target = e.target as HTMLDivElement;
          const bottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 200;
          if (bottom && visiblePhotosCount < galleryPhotos.length) {
            setVisiblePhotosCount(prev => Math.min(prev + 6, galleryPhotos.length));
          }
        }}
      >
        <div className="grid grid-cols-2 gap-2 p-2 pb-8 max-w-lg mx-auto">
          {galleryPhotos.slice(0, visiblePhotosCount).map((photo, index) => (
            <div
              key={index}
              onClick={() => onEnlargePhoto(photo)}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-purple-500/20 hover:border-pink-500/50 contain-paint"
            >
              <Image
                src={photo}
                alt={`Foto ${index + 1}`}
                fill
                loading="lazy"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {/* Indicatore caricamento */}
        {visiblePhotosCount < galleryPhotos.length && (
          <p className="text-purple-400/60 text-center text-sm pb-4">
            Scorri per caricare altre foto...
          </p>
        )}
      </div>
    </div>
  );
}
