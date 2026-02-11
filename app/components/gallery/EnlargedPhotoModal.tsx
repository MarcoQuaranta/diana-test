import Image from "next/image";

interface EnlargedPhotoModalProps {
  photo: string;
  onClose: () => void;
}

export default function EnlargedPhotoModal({ photo, onClose }: EnlargedPhotoModalProps) {
  return (
    <div
      className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer popup-stable popup-container"
      onClick={onClose}
    >
      {/* Pulsante chiudi */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-purple-900/50 border border-purple-500/30 text-purple-300 hover:text-pink-400 hover:border-pink-500/50 transition-all cursor-pointer z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Foto */}
      <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
        <Image
          src={photo}
          alt="Foto ingrandita"
          width={1200}
          height={1200}
          className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg"
        />
      </div>
    </div>
  );
}
