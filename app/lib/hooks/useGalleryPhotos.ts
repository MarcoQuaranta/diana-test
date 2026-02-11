import { useState, useEffect } from "react";

export function useGalleryPhotos() {
  const [galleryPhotos, setGalleryPhotos] = useState<string[]>([]);

  useEffect(() => {
    fetch('/gallery.json')
      .then(res => res.json())
      .then(data => setGalleryPhotos(data.photos || []))
      .catch(() => setGalleryPhotos([]));
  }, []);

  return galleryPhotos;
}
