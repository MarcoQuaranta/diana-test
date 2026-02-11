import { useState } from "react";
import { complimentiAI } from "@/app/lib/data";

interface PopupComplimentoAIProps {
  initialCompliment: string;
  onClose: () => void;
}

export default function PopupComplimentoAI({ initialCompliment, onClose }: PopupComplimentoAIProps) {
  const [currentCompliment, setCurrentCompliment] = useState(initialCompliment);

  const generaComplimento = () => {
    const randomIndex = Math.floor(Math.random() * complimentiAI.length);
    setCurrentCompliment(complimentiAI[randomIndex]);
  };

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter p-4 popup-stable popup-container">
      <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-cyan-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-cyan-500/20 popup-enter popup-stable">
        {/* Icona */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <span className="text-4xl">🤖</span>
          </div>
        </div>

        {/* Titolo */}
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 text-center mb-4">
          Ricciolino AI dice:
        </h2>

        {/* Complimento */}
        <div className="bg-purple-900/30 rounded-xl p-4 mb-6">
          <p className="text-purple-200 text-center text-lg italic">&quot;{currentCompliment}&quot;</p>
        </div>

        {/* Pulsanti */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-purple-900/50 border border-purple-500/30 rounded-full text-purple-300 font-semibold hover:bg-purple-900/70 transition-all duration-300 cursor-pointer"
          >
            Chiudi
          </button>
          <button
            onClick={generaComplimento}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/30 cursor-pointer"
          >
            Altro
          </button>
        </div>
      </div>
    </div>
  );
}
