"use client";

import { useState, useEffect } from "react";

interface Photo {
  url: string;
  createdAt: string;
  id: string;
}

export default function FotoDiana() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [enlarged, setEnlarged] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/photos")
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data.photos || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#1a1a2e] to-[#0a0a1a] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">📸</div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-red-400 to-pink-300 mb-2">
            Foto di Diana
          </h1>
          <p className="text-pink-200/50 text-sm">
            {photos.length} foto dal San Valentino
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="flex items-center gap-3 text-pink-200">
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Caricamento...
            </div>
          </div>
        )}

        {!loading && photos.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🫥</div>
            <p className="text-pink-200/50">Nessuna foto ancora...</p>
          </div>
        )}

        {!loading && photos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setEnlarged(photo.url)}
                className="cursor-pointer rounded-xl overflow-hidden border-2 border-white/10 hover:border-pink-500/50 transition-all hover:scale-[1.02] shadow-lg"
              >
                <img
                  src={photo.url}
                  alt=""
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
                <div className="bg-black/50 px-2 py-1">
                  <p className="text-white/50 text-xs">
                    {new Date(photo.createdAt).toLocaleString("it-IT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enlarged photo modal */}
      {enlarged && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setEnlarged(null)}
        >
          <img
            src={enlarged}
            alt=""
            className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
