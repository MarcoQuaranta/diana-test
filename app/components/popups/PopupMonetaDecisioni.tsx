import { useState } from "react";
import { sendNotification } from "@/app/lib/notifications";

interface PopupMonetaDecisioniProps {
  onClose: () => void;
}

export default function PopupMonetaDecisioni({ onClose }: PopupMonetaDecisioniProps) {
  const [coinResult, setCoinResult] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [coinReason, setCoinReason] = useState("");

  const lanciaMoneta = () => {
    setIsFlipping(true);
    setCoinResult(null);

    setTimeout(() => {
      const result = Math.random() < 0.5 ? "Ricciolino" : "Roscetta";
      setCoinResult(result);
      setIsFlipping(false);

      const motivoTesto = coinReason.trim() ? `per "${coinReason}"` : "";
      sendNotification(`Moneta delle Decisioni ${motivoTesto}: ha vinto ${result}!`);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter p-4 popup-stable popup-container">
      <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-yellow-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-yellow-500/20 popup-enter popup-stable">
        {/* Titolo */}
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-center mb-2">
          Moneta delle Decisioni
        </h2>

        {/* Descrizione */}
        {!coinResult && !isFlipping && (
          <p className="text-purple-300/70 text-center text-sm mb-4">
            Chi farà i piatti? Chi pagherà al sushi? Chi sconfiggerà Freezer? Lancia la moneta e lascia decidere a lei.
          </p>
        )}

        {/* Campo motivo */}
        {!isFlipping && !coinResult && (
          <input
            type="text"
            value={coinReason}
            onChange={(e) => setCoinReason(e.target.value)}
            placeholder="Per cosa lanci la moneta? (opzionale)"
            className="w-full px-4 py-3 rounded-xl bg-purple-900/50 border border-yellow-500/30 text-white placeholder-purple-400/50 focus:outline-none focus:border-yellow-500 mb-4"
          />
        )}

        {/* Mostra motivo durante/dopo il lancio */}
        {(isFlipping || coinResult) && coinReason && (
          <p className="text-yellow-300/80 text-center text-sm mb-2">
            &quot;{coinReason}&quot;
          </p>
        )}

        {/* Moneta animata */}
        <div className="flex justify-center my-6">
          <div
            className="coin-container w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/50"
            style={{
              animation: coinResult && !isFlipping ? 'none' : (isFlipping ? 'coinFlip 0.2s linear infinite' : 'coinSpin 3s linear infinite'),
            }}
          >
            {coinResult && !isFlipping ? (
              <div className="flex flex-col items-center">
                <span className="text-4xl">{coinResult === "Ricciolino" ? "🦱" : "👩‍🦰"}</span>
                <span className="text-yellow-900 font-bold text-xs text-center">
                  {coinResult}
                </span>
              </div>
            ) : (
              <span className="text-5xl font-bold text-yellow-900">$</span>
            )}
          </div>
        </div>

        {/* Risultato */}
        {coinResult && !isFlipping && (
          <div className="bg-yellow-900/30 rounded-xl p-4 mb-4">
            <p className="text-yellow-200 text-center text-lg">
              Tocca a <span className="font-bold text-yellow-400">{coinResult}</span>!
            </p>
          </div>
        )}

        {isFlipping && (
          <p className="text-yellow-300/70 text-center mb-4">Lancio in corso...</p>
        )}

        {/* Pulsanti */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-purple-900/50 border border-purple-500/30 rounded-full text-purple-300 font-semibold hover:bg-purple-900/70 transition-all duration-300 cursor-pointer"
          >
            Chiudi
          </button>
          <button
            onClick={lanciaMoneta}
            disabled={isFlipping}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-500/30 cursor-pointer disabled:opacity-50 disabled:hover:scale-100"
          >
            {coinResult ? 'Rilancia' : 'Lancia'}
          </button>
        </div>
      </div>
    </div>
  );
}
