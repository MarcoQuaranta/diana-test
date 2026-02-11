interface PopupRichiestaInviataProps {
  richiestaMessage: string;
  richiestaType: "richiesta" | "messaggio";
  onClose: () => void;
}

export default function PopupRichiestaInviata({ richiestaMessage, richiestaType, onClose }: PopupRichiestaInviataProps) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter popup-stable popup-container">
      <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-green-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-green-500/20 popup-enter popup-stable">
        {/* Icona successo */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
            <span className="text-4xl">✓</span>
          </div>
        </div>

        {/* Titolo */}
        <h2 className="text-2xl font-bold text-green-400 text-center mb-4">
          {richiestaType === "messaggio" ? "Messaggio inviato!" : "Richiesta inviata!"}
        </h2>

        {/* Messaggio */}
        <div className="bg-purple-900/30 rounded-xl p-4 mb-6">
          <p className="text-purple-300/60 text-sm mb-2">
            {richiestaType === "messaggio" ? "Testo del messaggio:" : "Testo della richiesta:"}
          </p>
          <p className="text-purple-200 italic">{richiestaMessage}</p>
        </div>

        {/* Pulsante chiudi */}
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-green-500/30 cursor-pointer"
        >
          OK
        </button>
      </div>
    </div>
  );
}
