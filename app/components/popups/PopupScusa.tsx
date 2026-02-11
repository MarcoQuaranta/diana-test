interface PopupScusaProps {
  onClose: () => void;
}

export default function PopupScusa({ onClose }: PopupScusaProps) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter popup-stable popup-container">
      <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-red-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-red-500/20 popup-enter popup-stable">
        {/* Icona errore */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <span className="text-4xl text-red-400">X</span>
          </div>
        </div>

        {/* Titolo errore */}
        <h2 className="text-2xl font-bold text-red-400 text-center mb-4">
          Funzione non disponibile per l&apos;account selezionato
        </h2>

        {/* Spiegazione */}
        <p className="text-purple-300/80 text-center mb-6">
          Questa funzione non è disponibile per gli account con sesso selezionato: <span className="font-bold text-pink-400">Donna</span>.<br /><br />
          Passa ad un account maschile per sbloccare la funzionalità.
        </p>

        {/* Pulsante chiudi */}
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/30 cursor-pointer"
        >
          Ho capito
        </button>
      </div>
    </div>
  );
}
