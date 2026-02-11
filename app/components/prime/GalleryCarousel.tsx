import Image from "next/image";
import { useState } from "react";

interface GalleryCarouselProps {
  galleryPhotos: string[];
  onEnlargePhoto: (photo: string) => void;
  onOpenFullGallery: () => void;
}

export default function GalleryCarousel({ galleryPhotos, onEnlargePhoto, onOpenFullGallery }: GalleryCarouselProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  if (galleryPhotos.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80 border border-pink-500/30 rounded-2xl p-6 backdrop-blur-sm w-full">
      <p className="text-purple-200 text-center text-lg mb-4">I nostri ricordi</p>

      {/* Container foto - cliccabile per ingrandire */}
      <div
        onClick={() => onEnlargePhoto(galleryPhotos[currentPhotoIndex])}
        className="relative w-full aspect-square mx-auto rounded-xl overflow-hidden border-2 border-purple-500/30 cursor-pointer hover:border-pink-500/50 transition-all"
      >
        {/* Solo 3 foto nel DOM: corrente, precedente, successiva */}
        {[
          (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length,
          currentPhotoIndex,
          (currentPhotoIndex + 1) % galleryPhotos.length
        ].filter((v, i, a) => a.indexOf(v) === i).map((photoIndex) => (
          <div
            key={photoIndex}
            className={`absolute inset-0 ${photoIndex === currentPhotoIndex ? 'gallery-slide' : 'hidden'}`}
          >
            <Image
              src={galleryPhotos[photoIndex]}
              alt={`Foto ${photoIndex + 1}`}
              fill
              className="object-cover"
              priority={photoIndex === currentPhotoIndex}
              loading="eager"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAwEPwAB/8QAFBABAAAAAAAAAAAAAAAAAAAAsP/aAAgBAQABPwBmf//Z"
            />
          </div>
        ))}

        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Icona zoom */}
        <div className="absolute top-2 right-2 p-2 bg-black/50 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>

      {/* Controlli galleria */}
      {galleryPhotos.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={() => setCurrentPhotoIndex((prev) => (prev === 0 ? galleryPhotos.length - 1 : prev - 1))}
            className="p-2 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-300 hover:text-pink-400 hover:border-pink-500/50 transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Indicatori - max 5 visibili */}
          <div className="flex gap-2 items-center">
            {(() => {
              const maxDots = 5;
              const total = galleryPhotos.length;
              if (total <= maxDots) {
                return galleryPhotos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      index === currentPhotoIndex
                        ? 'bg-pink-500 w-4'
                        : 'bg-purple-500/50 hover:bg-purple-400'
                    }`}
                  />
                ));
              }
              let start = Math.max(0, currentPhotoIndex - 2);
              let end = start + maxDots;
              if (end > total) {
                end = total;
                start = Math.max(0, end - maxDots);
              }
              return Array.from({ length: end - start }, (_, i) => start + i).map(index => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    index === currentPhotoIndex
                      ? 'bg-pink-500 w-4'
                      : 'bg-purple-500/50 hover:bg-purple-400'
                  }`}
                />
              ));
            })()}
          </div>

          <button
            onClick={() => setCurrentPhotoIndex((prev) => (prev === galleryPhotos.length - 1 ? 0 : prev + 1))}
            className="p-2 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-300 hover:text-pink-400 hover:border-pink-500/50 transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Contatore e pulsante allarga */}
      <div className="flex items-center justify-between mt-3">
        <p className="text-purple-400/60 text-xs">
          {currentPhotoIndex + 1} / {galleryPhotos.length}
        </p>
        <button
          onClick={onOpenFullGallery}
          className="flex items-center gap-1 text-purple-400 hover:text-pink-400 text-xs transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          Vedi tutte
        </button>
      </div>
    </div>
  );
}
