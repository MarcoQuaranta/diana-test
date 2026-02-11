import { useState } from "react";
import { whatsappMessages } from "@/app/lib/data";
import { sendNotification } from "@/app/lib/notifications";

interface BenefitsPanelProps {
  onInviaRichiesta: (message: string) => void;
  onShowRegalino: () => void;
  onShowScusa: () => void;
  onShowMessaggio: () => void;
  onShowLettera: () => void;
  onShowDisdetta: () => void;
}

export default function BenefitsPanel({
  onInviaRichiesta,
  onShowRegalino,
  onShowScusa,
  onShowMessaggio,
  onShowLettera,
  onShowDisdetta,
}: BenefitsPanelProps) {
  const [showBenefits, setShowBenefits] = useState(false);

  return (
    <>
      <div className="w-full bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90 border border-purple-500/30 rounded-2xl mt-4 backdrop-blur-sm flex-shrink-0 overflow-hidden button-box-stable">
        <button
          onClick={() => setShowBenefits(!showBenefits)}
          className="w-full p-3 flex items-center justify-between cursor-pointer hover:bg-purple-500/10 transition-colors"
        >
          <h2 className="text-lg font-bold text-purple-300">
            ⚙️ Sfrutta i tuoi benefici di essere a mija
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 text-purple-400 transition-transform duration-300 ${showBenefits ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showBenefits && (
          <div className="p-3 pt-0">
            <div className="grid grid-cols-2 gap-2">
              {/* Prima parte: Bacino, Spupazzamento, Sushi */}
              {whatsappMessages.slice(0, 3).map((item, index) => (
                <button
                  key={index}
                  onClick={() => onInviaRichiesta(item.message)}
                  className="px-2 py-3 h-[70px] flex items-center justify-center text-center rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-rose-400 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              {/* Pulsante Regalino - apre popup con input */}
              <button
                onClick={onShowRegalino}
                className="px-2 py-3 h-[70px] flex items-center justify-center text-center rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-rose-400 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
              >
                Richiedi Regalino
              </button>
              {/* Resto dei pulsanti */}
              {whatsappMessages.slice(3).map((item, index) => (
                <button
                  key={index + 3}
                  onClick={() => onInviaRichiesta(item.message)}
                  className="px-2 py-3 h-[70px] flex items-center justify-center text-center rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-rose-400 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              {/* Pulsante Chiedi scusa - mostra popup invece di WhatsApp */}
              <button
                onClick={() => { sendNotification('Roscetta ha provato a chiedere scusa... HAHAHA'); onShowScusa(); }}
                className="px-2 py-3 h-[70px] flex items-center justify-center text-center rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-rose-400 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
              >
                Chiedi Scusa
              </button>
              {/* Pulsante Messaggio Personalizzato - larghezza piena */}
              <button
                onClick={onShowMessaggio}
                className="col-span-2 px-2 py-3 h-[70px] flex items-center justify-center text-center rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-600 to-rose-400 text-white hover:shadow-lg hover:shadow-purple-500/30 cursor-pointer"
              >
                Messaggio Personalizzato
              </button>
              {/* Pulsante Emergenza SOS - sempre visibile */}
              <div className="col-span-2 flex flex-col items-center gap-3 mt-4 flex-shrink-0 min-h-[120px] button-box-stable">
                <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full flex-shrink-0">
                  <span className="text-red-400 animate-pulse">⚠️</span>
                  <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
                    Attenzione: usare solo per le emergenze
                  </p>
                  <span className="text-red-400 animate-pulse">⚠️</span>
                </div>
                <button
                  onClick={() => { sendNotification('EMERGENZA: Roscetta ha bisogno di sapere quanto la ami!'); onShowLettera(); }}
                  className="px-4 py-4 bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 rounded-2xl text-white font-bold text-base shadow-lg shadow-pink-500/50 hover:scale-105 hover:shadow-red-500/50 transition-all duration-300 animate-pulse cursor-pointer flex-shrink-0 text-center w-full max-w-xs"
                >
                  Premi qui per ricordare quanto il Ricciolino ti ama
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Disdici abbonamento - fuori dal box */}
      <button
        onClick={onShowDisdetta}
        className="mt-6 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-gradient-to-r from-red-600 to-red-800 text-white hover:shadow-lg hover:shadow-red-500/30 cursor-pointer"
      >
        Disdici abbonamento Ricciolino Prime
      </button>
    </>
  );
}
