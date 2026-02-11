import { sendNotification } from "@/app/lib/notifications";

interface PopupDisdettaProps {
  onClose: () => void;
  onConfirmDisdetta: () => void;
}

export default function PopupDisdetta({ onClose, onConfirmDisdetta }: PopupDisdettaProps) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 backdrop-blur-sm popup-backdrop-enter popup-stable popup-container">
      <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-red-500/30 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-red-500/20 popup-enter popup-stable">
        {/* Icona */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <span className="text-4xl">💔</span>
          </div>
        </div>

        {/* Titolo */}
        <h2 className="text-2xl font-bold text-red-400 text-center mb-4">
          Sei sicura?
        </h2>

        {/* Messaggio */}
        <p className="text-purple-200/80 text-center mb-6">
          Così facendo non potrai più ricevere i benefici di <span className="font-bold text-pink-400">Ricciolino Prime</span> e spezzerai il suo cuoricino in mille frantumi.
        </p>

        {/* Pulsanti */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              sendNotification("Fra che cazzo hai combinato? Stavolta ti è andata bene ma Roscetta stava per lasciarti ed è molto probabile che ti stia per staccare le palle. Mantieni un profilo basso per i prossimi giorni.");
              onClose();
            }}
            className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/30 cursor-pointer"
          >
            No, voglio restare con il Ricciolino
          </button>
          <button
            onClick={onConfirmDisdetta}
            className="w-full px-6 py-3 bg-transparent border border-red-500/50 rounded-full text-red-400 font-semibold hover:bg-red-500/10 transition-all duration-300 cursor-pointer text-sm"
          >
            Sì, sono una persona senza cuore e desidero lasciare il Ricciolino
          </button>
        </div>
      </div>
    </div>
  );
}
