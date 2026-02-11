import { useState, useEffect } from "react";

interface PopupScarcerazioneProps {
  onComplete: () => void;
}

export default function PopupScarcerazione({ onComplete }: PopupScarcerazioneProps) {
  const [scarcerazioneProgress, setScarcerazioneProgress] = useState(0);
  const [scarcerazioneComplete, setScarcerazioneComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setScarcerazioneProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScarcerazioneComplete(true);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter">
      <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-purple-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-purple-500/20 popup-enter">
        {!scarcerazioneComplete ? (
          <>
            {/* Titolo */}
            <h2 className="text-2xl font-bold text-white text-center mb-4">
              Attendere
            </h2>

            {/* Sottotitolo */}
            <p className="text-purple-300 text-center mb-6">
              Scarcerazione di Bossetti in corso...
            </p>

            {/* Barra di caricamento */}
            <div className="w-full bg-purple-900/50 rounded-full h-4 mb-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-100"
                style={{ width: `${scarcerazioneProgress}%` }}
              />
            </div>

            {/* Percentuale */}
            <p className="text-purple-400 text-center text-sm">
              {scarcerazioneProgress}%
            </p>
          </>
        ) : (
          <>
            {/* Messaggio completato */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-4xl">✓</span>
              </div>
            </div>

            <p className="text-purple-200 text-center mb-6 text-lg">
              Bossetti è finalmente in libertà, ora il mondo è un po&apos; più giusto.
            </p>

            {/* Pulsante Continua */}
            <button
              onClick={onComplete}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/30 cursor-pointer"
            >
              Continua
            </button>
          </>
        )}
      </div>
    </div>
  );
}
