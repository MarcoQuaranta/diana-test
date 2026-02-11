import { useState } from "react";

interface PopupRegalinoProps {
  onClose: () => void;
  onSend: (item: string) => void;
}

export default function PopupRegalino({ onClose, onSend }: PopupRegalinoProps) {
  const [regalinoInput, setRegalinoInput] = useState("");

  const handleSend = () => {
    if (!regalinoInput.trim()) return;
    onSend(regalinoInput);
    setRegalinoInput("");
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter popup-stable popup-container">
      <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-pink-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-pink-500/20 popup-enter popup-stable">
        {/* Icona regalo */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center">
            <span className="text-4xl">🎁</span>
          </div>
        </div>

        {/* Titolo */}
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-center mb-4">
          Cosa vorresti ricevere?
        </h2>

        {/* Input */}
        <input
          type="text"
          value={regalinoInput}
          onChange={(e) => setRegalinoInput(e.target.value)}
          placeholder="Es: una borsa Gucci, un iPhone..."
          className="w-full px-4 py-3 rounded-xl bg-purple-900/50 border border-purple-500/30 text-white placeholder-purple-400/50 focus:outline-none focus:border-pink-500 mb-2"
        />
        <p className="text-xs text-purple-300/50 mb-6">
          * Ricordati che sono povero come Jeff Bezos dopo aver acquistato un kilo di castagne.
        </p>

        {/* Pulsanti */}
        <div className="flex gap-3">
          <button
            onClick={() => { onClose(); setRegalinoInput(""); }}
            className="flex-1 px-6 py-3 bg-purple-900/50 border border-purple-500/30 rounded-full text-purple-300 font-semibold hover:bg-purple-900/70 transition-all duration-300 cursor-pointer"
          >
            Annulla
          </button>
          <button
            onClick={handleSend}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/30 cursor-pointer"
          >
            Invia
          </button>
        </div>
      </div>
    </div>
  );
}
