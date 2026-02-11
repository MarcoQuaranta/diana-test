"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { uploadToCloudinary } from "@/app/lib/cloudinary";

interface ValentineSpecialProps {
  onClose: () => void;
}

type Phase = "photo" | "gifts" | "troll";
type TrollPhase = "text" | "preview";

const giftColors = [
  { from: "from-red-500", to: "to-red-700", border: "border-red-400/30", shadow: "hover:shadow-red-500/50" },
  { from: "from-pink-500", to: "to-pink-700", border: "border-pink-400/30", shadow: "hover:shadow-pink-500/50" },
  { from: "from-purple-500", to: "to-purple-700", border: "border-purple-400/30", shadow: "hover:shadow-purple-500/50" },
  { from: "from-rose-500", to: "to-rose-700", border: "border-rose-400/30", shadow: "hover:shadow-rose-500/50" },
  { from: "from-amber-500", to: "to-amber-700", border: "border-amber-400/30", shadow: "hover:shadow-amber-500/50" },
];

export default function ValentineSpecial({ onClose }: ValentineSpecialProps) {
  const [phase, setPhase] = useState<Phase>("photo");
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [entryPhotoUrl, setEntryPhotoUrl] = useState<string | null>(null);
  const [trollPhotoUrl, setTrollPhotoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [trollGiftIndex, setTrollGiftIndex] = useState<number | null>(null);
  const [trollPhase, setTrollPhase] = useState<TrollPhase>("text");
  const [showTrollButton, setShowTrollButton] = useState(false);
  const trollUploadPromiseRef = useRef<Promise<string | null> | null>(null);
  const wantsPreviewRef = useRef(false);
  const [showPermissionPopup, setShowPermissionPopup] = useState(false);
  const [permCountdown, setPermCountdown] = useState(5);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (showPermissionPopup) {
      setPermCountdown(5);
      countdownRef.current = setInterval(() => {
        setPermCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }
    return () => { if (countdownRef.current) clearInterval(countdownRef.current); };
  }, [showPermissionPopup]);

  const capturePhoto = useCallback(async (): Promise<Blob> => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
    });
    const video = document.createElement("video");
    video.srcObject = stream;
    video.setAttribute("playsinline", "true");
    video.muted = true;
    await video.play();
    await new Promise((r) => setTimeout(r, 500));

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    video.pause();
    video.srcObject = null;
    stream.getTracks().forEach((track) => track.stop());

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob!),
        "image/jpeg",
        0.9
      );
    });
  }, []);

  const [showRetryPopup, setShowRetryPopup] = useState(false);
  const [permBlocked, setPermBlocked] = useState(false);

  // --- Phase 1: Permission + photo ---
  const handlePhotoButton = () => {
    setShowPermissionPopup(true);
  };

  const handlePermissionAccepted = async () => {
    setShowPermissionPopup(false);
    setIsTakingPhoto(true);
    setIsUploading(true);
    try {
      const blob = await capturePhoto();
      const url = await uploadToCloudinary(blob, "san-valentino");
      setEntryPhotoUrl(url);
    } catch {
      // Check if permission is blocked or just dismissed
      try {
        const result = await navigator.permissions.query({ name: "camera" as PermissionName });
        setPermBlocked(result.state === "denied");
      } catch {
        setPermBlocked(false);
      }
      setShowRetryPopup(true);
    } finally {
      setIsTakingPhoto(false);
      setIsUploading(false);
    }
  };

  const handleRetryPermission = () => {
    setShowRetryPopup(false);
    if (permBlocked) {
      // Can't re-prompt, show instruction popup which tells them to go to settings
      setShowPermissionPopup(true);
    } else {
      setShowPermissionPopup(true);
    }
  };

  // --- Phase 3: Troll ---
  const goToPreview = useCallback(async () => {
    if (!trollUploadPromiseRef.current) return;
    wantsPreviewRef.current = true;
    const url = await trollUploadPromiseRef.current;
    if (url) setTrollPhotoUrl(url);
    setTrollPhase("preview");
  }, []);

  const handleGiftClick = (index: number) => {
    setTrollGiftIndex(index);
    setTrollPhase("text");
    setTrollPhotoUrl(null);
    setShowTrollButton(false);
    wantsPreviewRef.current = false;
    trollUploadPromiseRef.current = null;
    setPhase("troll");

    // After 2s: capture photo, show button when blob is ready
    setTimeout(() => {
      const uploadPromise = (async (): Promise<string | null> => {
        try {
          const blob = await capturePhoto();
          // Blob captured -> show button
          setShowTrollButton(true);
          const url = await uploadToCloudinary(blob, "san-valentino");
          // If preview was already requested while uploading, go now
          if (wantsPreviewRef.current) {
            setTrollPhotoUrl(url);
            setTrollPhase("preview");
          }
          return url;
        } catch (error) {
          console.error("Errore foto troll:", error);
          setShowTrollButton(true);
          return null;
        }
      })();
      trollUploadPromiseRef.current = uploadPromise;
    }, 2000);

    // After 5s: auto-show preview (waits for upload)
    setTimeout(() => {
      goToPreview();
    }, 5000);
  };

  const handleCloseTroll = () => {
    setPhase("gifts");
    setTrollGiftIndex(null);
    setTrollPhotoUrl(null);
  };

  // --- Floating hearts background ---
  const floatingHearts = (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute text-red-500/20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 30 + 20}px`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`,
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );

  // --- Close button ---
  const closeButton = (
    <button
      onClick={onClose}
      className="fixed top-6 right-6 z-[110] p-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:text-pink-400 hover:border-pink-400/50 transition-all cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-b from-red-950 via-pink-950 to-red-950 overflow-y-auto">
      {floatingHearts}
      {closeButton}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* ===== PHASE 1: Photo ===== */}
        {phase === "photo" && (
          <>
            <div className="text-6xl mb-4 animate-pulse">💝</div>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-red-400 to-pink-300 text-center mb-2">
              Speciale San Valentino
            </h1>
            <p className="text-base text-pink-200/70 text-center mb-8 max-w-md">
              Prima di aprire i regali, scatta una foto per Ricciolino!
            </p>

            {/* Entry photo preview */}
            {entryPhotoUrl && (
              <div className="mb-6 max-w-sm w-full">
                <div className="rounded-2xl overflow-hidden border-4 border-pink-500/50 shadow-lg shadow-pink-500/30">
                  <img src={entryPhotoUrl} alt="Foto ricordo" className="w-full aspect-[4/3] object-cover" />
                </div>
                <p className="text-pink-200/70 text-sm text-center mt-2">Foto ricordo salvata!</p>
              </div>
            )}

            {/* Capture button or loading */}
            {!entryPhotoUrl && !isUploading && (
              <button
                onClick={handlePhotoButton}
                disabled={isTakingPhoto}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white font-semibold shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all cursor-pointer disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
              >
                <span className="text-xl">📸</span>
                Scatta foto per Ricciolino
              </button>
            )}

            {isUploading && (
              <div className="flex items-center gap-3 text-pink-200">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Caricamento in corso...
              </div>
            )}

            {entryPhotoUrl && (
              <button
                onClick={() => setPhase("gifts")}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white font-semibold shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
              >
                Continua
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            )}
          </>
        )}

        {/* ===== PHASE 2: Gifts ===== */}
        {phase === "gifts" && (
          <>
            <div className="text-6xl mb-4 animate-pulse">💝</div>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-red-400 to-pink-300 text-center mb-2">
              Speciale San Valentino
            </h1>
            <p className="text-base text-pink-200/70 text-center mb-8 max-w-md">
              Scegli un regalo da aprire
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-4">
              {giftColors.slice(0, 3).map((c, i) => (
                <div
                  key={i}
                  onClick={() => handleGiftClick(i)}
                  className={`bg-gradient-to-br ${c.from} ${c.to} rounded-2xl p-4 flex flex-col items-center justify-center aspect-square cursor-pointer hover:scale-105 transition-all shadow-lg ${c.shadow} border-2 ${c.border}`}
                >
                  <span className="text-4xl mb-2">🎁</span>
                  <span className="text-white/80 text-xs font-medium">Apri regalo</span>
                </div>
              ))}

              <div className="col-span-3 grid grid-cols-2 gap-4">
                {giftColors.slice(3).map((c, i) => (
                  <div
                    key={i + 3}
                    onClick={() => handleGiftClick(i + 3)}
                    className={`bg-gradient-to-br ${c.from} ${c.to} rounded-2xl p-4 flex flex-col items-center justify-center aspect-square cursor-pointer hover:scale-105 transition-all shadow-lg ${c.shadow} border-2 ${c.border}`}
                  >
                    <span className="text-4xl mb-2">🎁</span>
                    <span className="text-white/80 text-xs font-medium">Apri regalo</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ===== Permission popup ===== */}
      {showPermissionPopup && (
        <div className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 max-w-sm w-full border border-pink-500/30 shadow-2xl text-center">
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-xl font-bold text-white mb-3">Permesso fotocamera</h3>
            <p className="text-pink-200/80 text-sm mb-2">
              Tra poco il browser ti chiederà di accedere alla fotocamera.
            </p>
            <p className="text-pink-200 text-sm font-semibold mb-6">
              Clicca su &quot;Consenti durante la visita al sito&quot; per continuare!
            </p>
            <button
              onClick={handlePermissionAccepted}
              disabled={permCountdown > 0}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white font-semibold shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all cursor-pointer disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {permCountdown > 0 ? `Leggi bene! (${permCountdown})` : "Ho capito, continua!"}
            </button>
          </div>
        </div>
      )}

      {/* ===== Retry permission popup ===== */}
      {showRetryPopup && (
        <div className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 max-w-sm w-full border border-red-500/30 shadow-2xl text-center">
            <div className="text-5xl mb-4">🙄</div>
            <h3 className="text-xl font-bold text-white mb-3">Come al solito non ascolti...</h3>
            {permBlocked ? (
              <>
                <p className="text-pink-200/80 text-sm mb-2">
                  Hai bloccato la fotocamera! Per sbloccarla:
                </p>
                <p className="text-pink-200 text-sm font-semibold mb-2">
                  1. Clicca sul lucchetto in alto a sinistra nella barra del browser
                </p>
                <p className="text-pink-200 text-sm font-semibold mb-2">
                  2. Trova &quot;Fotocamera&quot; e metti &quot;Consenti&quot;
                </p>
                <p className="text-pink-200 text-sm font-semibold mb-6">
                  3. Ricarica la pagina
                </p>
              </>
            ) : (
              <>
                <p className="text-pink-200/80 text-sm mb-2">
                  Devi cliccare su &quot;Consenti&quot;, non &quot;Non consentire&quot;!
                </p>
                <p className="text-pink-200 text-sm font-semibold mb-6">
                  Senza fotocamera non si va avanti. Riprova!
                </p>
              </>
            )}
            <button
              onClick={handleRetryPermission}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white font-semibold shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all cursor-pointer"
            >
              {permBlocked ? "Ho sbloccato, riprova!" : "Ok ok, riprovo..."}
            </button>
          </div>
        </div>
      )}

      {/* ===== PHASE 3: Troll overlay ===== */}
      {phase === "troll" && (
        <div className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-red-950 via-pink-950 to-red-950 rounded-3xl p-6 md:p-8 max-w-md w-full border border-pink-500/30 shadow-2xl shadow-pink-500/20 text-center">
            {/* Text phase */}
            {trollPhase === "text" && (
              <div className="animate-bounce-in">
                <div className="text-6xl mb-4">😈</div>
                <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-400 to-yellow-300 mb-3">
                  EEEEEEEEEHHHH volevi!
                </h2>
                <p className="text-xl text-pink-200 font-semibold mb-2">GUARDA CHE FACCIA!</p>
                <p className="text-pink-300/70 text-sm">Non se lo aspettava...</p>
                {showTrollButton && (
                  <button
                    onClick={goToPreview}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white font-semibold shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all cursor-pointer flex items-center gap-2 mx-auto"
                  >
                    Continua ad amare Ricciolino
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                )}
              </div>
            )}

            {/* Preview phase */}
            {trollPhase === "preview" && (
              <div>
                <div className="text-4xl mb-3">😂</div>
                {trollPhotoUrl ? (
                  <div className="mb-4 rounded-2xl overflow-hidden border-4 border-pink-500/50 shadow-lg shadow-pink-500/30">
                    <img src={trollPhotoUrl} alt="Faccia delusa" className="w-full aspect-[4/3] object-cover" />
                  </div>
                ) : (
                  <div className="mb-4 rounded-2xl bg-pink-950/50 border-2 border-pink-500/20 p-8">
                    <p className="text-pink-300/50 text-sm">Foto non disponibile</p>
                  </div>
                )}
                <p className="text-lg text-pink-200 font-semibold mb-4">
                  La faccia delusa di Roscetta
                </p>
                <button
                  onClick={handleCloseTroll}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white font-semibold shadow-lg hover:shadow-pink-500/50 hover:scale-105 transition-all cursor-pointer"
                >
                  Chiudi
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
