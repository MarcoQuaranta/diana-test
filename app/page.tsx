"use client";

import { useState } from "react";
import { sendNotification } from "@/app/lib/notifications";
import { complimentiAI } from "@/app/lib/data";
import { useTimeTogether } from "@/app/lib/hooks/useTimeTogether";
import { useValentineCountdown } from "@/app/lib/hooks/useValentineCountdown";
import { useScrollLock } from "@/app/lib/hooks/useScrollLock";
import { useStars } from "@/app/lib/hooks/useStars";
import { useGalleryPhotos } from "@/app/lib/hooks/useGalleryPhotos";
import { useFirstAccess } from "@/app/lib/hooks/useFirstAccess";

import StarsBackground from "@/app/components/landing/StarsBackground";
import LandingPage from "@/app/components/landing/LandingPage";
import PopupErrore404 from "@/app/components/onboarding/PopupErrore404";
import PopupBossetti from "@/app/components/onboarding/PopupBossetti";
import PopupCaptcha from "@/app/components/onboarding/PopupCaptcha";
import PopupScarcerazione from "@/app/components/onboarding/PopupScarcerazione";
import PopupScusa from "@/app/components/popups/PopupScusa";
import PopupDisdetta from "@/app/components/popups/PopupDisdetta";
import PopupMessaggio from "@/app/components/popups/PopupMessaggio";
import PopupRegalino from "@/app/components/popups/PopupRegalino";
import PopupRichiestaInviata from "@/app/components/popups/PopupRichiestaInviata";
import PopupLettera from "@/app/components/popups/PopupLettera";
import PopupComplimentoAI from "@/app/components/popups/PopupComplimentoAI";
import PopupMonetaDecisioni from "@/app/components/popups/PopupMonetaDecisioni";
import PrimeDashboard from "@/app/components/prime/PrimeDashboard";
import FullGalleryModal from "@/app/components/gallery/FullGalleryModal";
import EnlargedPhotoModal from "@/app/components/gallery/EnlargedPhotoModal";
import ValentineSpecial from "@/app/components/valentine/ValentineSpecial";

export default function Home() {
  // Popup visibility states
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showPrime, setShowPrime] = useState(false);
  const [showScusaPopup, setShowScusaPopup] = useState(false);
  const [showLettera, setShowLettera] = useState(false);
  const [showRichiesta, setShowRichiesta] = useState(false);
  const [showRegalino, setShowRegalino] = useState(false);
  const [showMessaggioPersonalizzato, setShowMessaggioPersonalizzato] = useState(false);
  const [showDisdetta, setShowDisdetta] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [showScarcerazione, setShowScarcerazione] = useState(false);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [showComplimentPopup, setShowComplimentPopup] = useState(false);
  const [showCoinFlip, setShowCoinFlip] = useState(false);
  const [showValentineSpecial, setShowValentineSpecial] = useState(false);

  // Cross-popup state
  const [richiestaMessage, setRichiestaMessage] = useState("");
  const [richiestaType, setRichiestaType] = useState<"richiesta" | "messaggio">("richiesta");
  const [isDisdettaPending, setIsDisdettaPending] = useState(false);
  const [enlargedPhoto, setEnlargedPhoto] = useState<string | null>(null);
  const [currentCompliment, setCurrentCompliment] = useState("");

  // Custom hooks
  const timeTogether = useTimeTogether();
  const valentineCountdown = useValentineCountdown();
  const stars = useStars(50);
  const galleryPhotos = useGalleryPhotos();
  const [hasFirstAccess, setFirstAccess] = useFirstAccess();

  // Scroll lock
  const hasOpenPopup = showLettera || showComplimentPopup || showCoinFlip ||
    showScusaPopup || showDisdetta || showMessaggioPersonalizzato ||
    showRegalino || showRichiesta || showFullGallery || !!enlargedPhoto;
  useScrollLock(hasOpenPopup);

  // Orchestrator functions
  const inviaRichiesta = (message: string) => {
    sendNotification(message);
    setRichiestaMessage(message);
    setRichiestaType("richiesta");
    setShowRichiesta(true);
  };

  const generaComplimento = () => {
    const randomIndex = Math.floor(Math.random() * complimentiAI.length);
    setCurrentCompliment(complimentiAI[randomIndex]);
    setShowComplimentPopup(true);
  };

  const inviaRegalino = (item: string) => {
    const message = `Amo non puoi capire, ho visto ${item} in un negozio... bellissimo, peccato che non posso prenderlo... ora vedo un po' come fare, sarebbe bello se qualcuno a caso me lo regalasse... va beh prima o poi lo prenderò dai.`;
    sendNotification(message);
    setRichiestaMessage(message);
    setRichiestaType("richiesta");
    setShowRegalino(false);
    setShowRichiesta(true);
  };

  const inviaMessaggioPersonalizzato = (message: string) => {
    sendNotification(message);
    setRichiestaMessage(message);
    setRichiestaType("messaggio");
    setShowMessaggioPersonalizzato(false);
    setShowRichiesta(true);
  };

  const handleRichiestaClose = () => {
    setShowRichiesta(false);
    if (isDisdettaPending) {
      setFirstAccess(false);
      setShowPrime(false);
      setIsDisdettaPending(false);
    }
  };

  const handleConfirmDisdetta = () => {
    setShowDisdetta(false);
    setIsDisdettaPending(true);
    inviaRichiesta("Amo dobbiamo parlare... non sei tu davvero, sono io...");
  };

  const handleScarcerazioneComplete = () => {
    setShowScarcerazione(false);
    setShowPrime(true);
    setFirstAccess(true);
  };

  const handleCaptchaComplete = () => {
    setShowCaptcha(false);
    setShowScarcerazione(true);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a1a] via-[#1a1a2e] to-[#0a0a1a]">
      <StarsBackground stars={stars} />

      <LandingPage
        hasFirstAccess={hasFirstAccess}
        onStartFlow={() => setShowPopup(true)}
        onDirectAccess={() => setShowPrime(true)}
      />

      {/* Onboarding popups */}
      {showPopup && <PopupErrore404 onClose={() => { setShowPopup(false); setShowPopup2(true); }} />}
      {showPopup2 && <PopupBossetti onClose={() => { setShowPopup2(false); setShowCaptcha(true); }} />}
      {showCaptcha && <PopupCaptcha onComplete={handleCaptchaComplete} />}
      {showScarcerazione && <PopupScarcerazione onComplete={handleScarcerazioneComplete} />}

      {/* Action popups */}
      {showScusaPopup && <PopupScusa onClose={() => setShowScusaPopup(false)} />}
      {showDisdetta && <PopupDisdetta onClose={() => setShowDisdetta(false)} onConfirmDisdetta={handleConfirmDisdetta} />}
      {showMessaggioPersonalizzato && <PopupMessaggio onClose={() => setShowMessaggioPersonalizzato(false)} onSend={inviaMessaggioPersonalizzato} />}
      {showRegalino && <PopupRegalino onClose={() => setShowRegalino(false)} onSend={inviaRegalino} />}
      {showRichiesta && <PopupRichiestaInviata richiestaMessage={richiestaMessage} richiestaType={richiestaType} onClose={handleRichiestaClose} />}
      {showLettera && <PopupLettera onClose={() => setShowLettera(false)} />}
      {showComplimentPopup && <PopupComplimentoAI initialCompliment={currentCompliment} onClose={() => setShowComplimentPopup(false)} />}
      {showCoinFlip && <PopupMonetaDecisioni onClose={() => setShowCoinFlip(false)} />}

      {/* Valentine Special */}
      {showValentineSpecial && <ValentineSpecial onClose={() => setShowValentineSpecial(false)} />}

      {/* Nebulosa sfondo */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl" />

      {/* Gallery modals */}
      {showFullGallery && (
        <FullGalleryModal
          galleryPhotos={galleryPhotos}
          onClose={() => setShowFullGallery(false)}
          onEnlargePhoto={setEnlargedPhoto}
        />
      )}
      {enlargedPhoto && <EnlargedPhotoModal photo={enlargedPhoto} onClose={() => setEnlargedPhoto(null)} />}

      {/* Prime Dashboard */}
      {showPrime && (
        <PrimeDashboard
          stars={stars}
          timeTogether={timeTogether}
          valentineCountdown={valentineCountdown}
          galleryPhotos={galleryPhotos}
          onClose={() => setShowPrime(false)}
          onEnlargePhoto={setEnlargedPhoto}
          onOpenFullGallery={() => setShowFullGallery(true)}
          onOpenValentineSpecial={() => setShowValentineSpecial(true)}
          onGeneraComplimento={generaComplimento}
          onApriMoneta={() => setShowCoinFlip(true)}
          onInviaRichiesta={inviaRichiesta}
          onShowRegalino={() => setShowRegalino(true)}
          onShowScusa={() => setShowScusaPopup(true)}
          onShowMessaggio={() => setShowMessaggioPersonalizzato(true)}
          onShowLettera={() => setShowLettera(true)}
          onShowDisdetta={() => setShowDisdetta(true)}
        />
      )}
    </div>
  );
}
