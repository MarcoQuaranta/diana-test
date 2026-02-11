import { Star } from "@/app/lib/hooks/useStars";
import StarsBackground from "@/app/components/landing/StarsBackground";
import TimerInsieme from "./TimerInsieme";
import ValentineCard from "./ValentineCard";
import GalleryCarousel from "./GalleryCarousel";
import RicciiolinoAIBox from "./RicciiolinoAIBox";
import BenefitsPanel from "./BenefitsPanel";

interface PrimeDashboardProps {
  stars: Star[];
  timeTogether: { days: number; hours: number; minutes: number; seconds: number };
  valentineCountdown: { days: number; hours: number; minutes: number; seconds: number };
  galleryPhotos: string[];
  onClose: () => void;
  onEnlargePhoto: (photo: string) => void;
  onOpenFullGallery: () => void;
  onOpenValentineSpecial: () => void;
  onGeneraComplimento: () => void;
  onApriMoneta: () => void;
  onInviaRichiesta: (message: string) => void;
  onShowRegalino: () => void;
  onShowScusa: () => void;
  onShowMessaggio: () => void;
  onShowLettera: () => void;
  onShowDisdetta: () => void;
}

export default function PrimeDashboard({
  stars,
  timeTogether,
  valentineCountdown,
  galleryPhotos,
  onClose,
  onEnlargePhoto,
  onOpenFullGallery,
  onOpenValentineSpecial,
  onGeneraComplimento,
  onApriMoneta,
  onInviaRichiesta,
  onShowRegalino,
  onShowScusa,
  onShowMessaggio,
  onShowLettera,
  onShowDisdetta,
}: PrimeDashboardProps) {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#0a0a1a] via-[#1a1a2e] to-[#0a0a1a] overflow-x-hidden overflow-y-auto scroll-container">
      {/* Stelle di sfondo */}
      <StarsBackground stars={stars} keyPrefix="prime-" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-2 sm:px-4 max-w-2xl mx-auto popup-enter py-12 min-h-screen justify-center">
        {/* Pulsante esci */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-purple-400 hover:text-pink-400 transition-colors cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Badge Prime */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-rose-400 px-6 py-2 rounded-full">
          <span className="text-2xl">👑</span>
          <span className="text-white font-bold text-xl">RICCIOLINO PRIME</span>
        </div>

        {/* Messaggio benvenuto */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ora sei ufficialmente un membro di<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">
              Ricciolino Prime
            </span>
          </h1>
          <p className="text-xl text-purple-200">
            Scadenza abbonamento: <span className="font-bold text-pink-400">mai.</span>
          </p>
        </div>

        {/* Timer insieme */}
        <TimerInsieme timeTogether={timeTogether} />

        {/* Speciale San Valentino - Pacco Regalo */}
        <div className="my-6">
          <ValentineCard valentineCountdown={valentineCountdown} onOpenSpecial={onOpenValentineSpecial} />
        </div>

        {/* Galleria Foto */}
        <GalleryCarousel
          galleryPhotos={galleryPhotos}
          onEnlargePhoto={onEnlargePhoto}
          onOpenFullGallery={onOpenFullGallery}
        />

        {/* Box Ricciolino AI */}
        <RicciiolinoAIBox onGeneraComplimento={onGeneraComplimento} onApriMoneta={onApriMoneta} />

        {/* Pannello Benefici */}
        <BenefitsPanel
          onInviaRichiesta={onInviaRichiesta}
          onShowRegalino={onShowRegalino}
          onShowScusa={onShowScusa}
          onShowMessaggio={onShowMessaggio}
          onShowLettera={onShowLettera}
          onShowDisdetta={onShowDisdetta}
        />

        {/* Nebulose */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-56 h-56 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
}
