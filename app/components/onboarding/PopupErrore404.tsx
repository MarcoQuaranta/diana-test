import { useState } from "react";

interface PopupErrore404Props {
  onClose: () => void;
}

export default function PopupErrore404({ onClose }: PopupErrore404Props) {
  const [popupExiting, setPopupExiting] = useState(false);

  const handleClose = () => {
    setPopupExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm ${popupExiting ? 'popup-backdrop-exit' : 'popup-backdrop-enter'}`}>
      <div className={`relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-red-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-red-500/20 ${popupExiting ? 'popup-exit' : 'popup-enter'}`}>
        {/* Icona errore */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <span className="text-4xl text-red-400">!</span>
          </div>
        </div>

        {/* Titolo errore */}
        <h2 className="text-2xl font-bold text-red-400 text-center mb-4">
          Errore 404: Bacino non trovato
        </h2>
        <p className="text-purple-300/80 text-center mb-6">
          Dai un bacino al tuo ricciolino per proseguire.
        </p>

        {/* Pulsante conferma */}
        <button
          onClick={handleClose}
          className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/30 cursor-pointer"
        >
          Ho dato il bacino giuro.<br />Fonte: fidati.
        </button>
      </div>
    </div>
  );
}
